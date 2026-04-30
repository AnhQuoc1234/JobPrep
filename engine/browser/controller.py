from __future__ import annotations

import asyncio
import os
import random
from dataclasses import dataclass, field
from datetime import datetime

from playwright.async_api import (
    Browser,
    BrowserContext,
    Page,
    Playwright,
    async_playwright,
)

# ---------------------------------------------------------------------------
# Data objects
# ---------------------------------------------------------------------------

@dataclass
class PageSnapshot:
    """Immutable snapshot of a fetched page — passed between all engine layers."""
    url: str
    title: str
    text: str           # cleaned readable text (no nav/footer boilerplate)
    html: str           # full raw HTML for extractor fallback
    screenshot: bytes   # PNG bytes
    status_code: int
    fetched_at: datetime = field(default_factory=datetime.utcnow)


# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

_USER_AGENTS = [
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
]

_VIEWPORTS = [
    {"width": 1440, "height": 900},
    {"width": 1920, "height": 1080},
    {"width": 1280, "height": 800},
]

_BLOCKED_RESOURCE_TYPES = {"image", "media", "font"}  # skip non-text resources


# ---------------------------------------------------------------------------
# Browser Controller
# ---------------------------------------------------------------------------

class BrowserController:
    """
    Async Playwright wrapper. Owns the browser lifecycle.

    Usage:
        async with BrowserController() as browser:
            snapshot = await browser.fetch("https://example.com")
    """

    def __init__(
        self,
        headless: bool = True,
        proxy: str | None = None,
        slow_mo: int = 0,
    ) -> None:
        self._headless = headless
        self._proxy = proxy or os.environ.get("BROWSER_PROXY") or None
        self._slow_mo = slow_mo
        self._playwright: Playwright | None = None
        self._browser: Browser | None = None

    # ------------------------------------------------------------------
    # Lifecycle
    # ------------------------------------------------------------------

    async def start(self) -> None:
        self._playwright = await async_playwright().start()
        launch_kwargs: dict = {
            "headless": self._headless,
            "slow_mo": self._slow_mo,
        }
        if self._proxy:
            launch_kwargs["proxy"] = {"server": self._proxy}

        self._browser = await self._playwright.chromium.launch(**launch_kwargs)

    async def stop(self) -> None:
        if self._browser:
            await self._browser.close()
        if self._playwright:
            await self._playwright.stop()

    async def __aenter__(self) -> "BrowserController":
        await self.start()
        return self

    async def __aexit__(self, *_) -> None:
        await self.stop()

    # ------------------------------------------------------------------
    # Context factory
    # ------------------------------------------------------------------

    async def _new_context(self) -> BrowserContext:
        """Create a fresh browser context with randomised fingerprint."""
        assert self._browser, "Call start() before creating contexts"
        context = await self._browser.new_context(
            user_agent=random.choice(_USER_AGENTS),
            viewport=random.choice(_VIEWPORTS),
            locale="en-US",
            timezone_id="America/New_York",
            java_script_enabled=True,
        )

        # Block unnecessary resource types to speed up page loads
        async def _block_resources(route, request):
            if request.resource_type in _BLOCKED_RESOURCE_TYPES:
                await route.abort()
            else:
                await route.continue_()

        await context.route("**/*", _block_resources)
        return context

    # ------------------------------------------------------------------
    # Core fetch
    # ------------------------------------------------------------------

    async def fetch(
        self,
        url: str,
        wait_until: str = "domcontentloaded",
        timeout: int = 30_000,
        delay_ms: int | None = None,
    ) -> PageSnapshot:
        """
        Navigate to a URL and return a PageSnapshot.

        Args:
            url:        Target URL.
            wait_until: Playwright load event — 'domcontentloaded' | 'networkidle'.
            timeout:    Navigation timeout in milliseconds.
            delay_ms:   Optional fixed delay after load (randomised ±20% if None).

        Returns:
            PageSnapshot with text, HTML, and screenshot.
        """
        context = await self._new_context()
        page: Page = await context.new_page()
        status_code = 200

        try:
            # Capture HTTP status
            response = await page.goto(url, wait_until=wait_until, timeout=timeout)
            if response:
                status_code = response.status

            # Human-like delay
            ms = delay_ms if delay_ms is not None else random.randint(800, 2000)
            await asyncio.sleep(ms / 1000)

            title = await page.title()
            html = await page.content()
            text = await _extract_readable_text(page)
            screenshot = await page.screenshot(type="png", full_page=False)

        finally:
            await context.close()

        return PageSnapshot(
            url=url,
            title=title,
            text=text,
            html=html,
            screenshot=screenshot,
            status_code=status_code,
        )

    async def fetch_many(
        self,
        urls: list[str],
        concurrency: int = 3,
        **kwargs,
    ) -> list[PageSnapshot]:
        """
        Fetch multiple URLs with bounded concurrency.

        Args:
            urls:        List of URLs to fetch.
            concurrency: Max simultaneous browser pages.
        """
        semaphore = asyncio.Semaphore(concurrency)

        async def _bounded_fetch(url: str) -> PageSnapshot:
            async with semaphore:
                return await self.fetch(url, **kwargs)

        return await asyncio.gather(*[_bounded_fetch(u) for u in urls])


# ---------------------------------------------------------------------------
# Text extraction helpers
# ---------------------------------------------------------------------------

async def _extract_readable_text(page: Page) -> str:
    """
    Extract clean readable text from a page, stripping nav, footer,
    script, style elements that pollute the content signal.
    """
    text: str = await page.evaluate("""() => {
        // Remove noise elements
        const noisy = document.querySelectorAll(
            'nav, footer, header, script, style, noscript, ' +
            'aside, [role="navigation"], [role="banner"], [role="contentinfo"]'
        );
        noisy.forEach(el => el.remove());

        // Prefer <main> or <article> if present
        const main = document.querySelector('main') ||
                     document.querySelector('article') ||
                     document.body;

        return main ? main.innerText : document.body.innerText;
    }""")

    # Collapse excessive whitespace
    lines = [line.strip() for line in text.splitlines()]
    cleaned = "\n".join(line for line in lines if line)
    return cleaned
