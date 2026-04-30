from __future__ import annotations

import json
import os
from datetime import datetime

import anthropic
from tavily import TavilyClient

from engine.roadmap.schemas import MarketSnapshot, SkillSignal

_MODEL = os.environ.get("FAST_MODEL", "claude-haiku-4-5-20251001")

_QUERIES = [
    "{role} required skills qualifications job posting 2025",
    "{role} years experience technical requirements must have",
    "{role} preferred nice to have skills",
    "{role} salary compensation range",
    "{role} interview process technical assessment",
]

_EXTRACT_PROMPT = """\
You are analyzing job market data for the role: {role}

Below are excerpts from job postings and market research. Extract a structured market snapshot.

Return a JSON object with this exact schema:
{{
  "postings_analyzed": <integer estimate of how many distinct postings are represented>,
  "top_required_skills": [
    {{
      "skill": "<lowercase skill name>",
      "frequency": <0.0–1.0, fraction of postings mentioning it>,
      "is_required": true,
      "avg_years_expected": <number or null>
    }}
  ],
  "top_nice_to_have_skills": [
    {{
      "skill": "<lowercase skill name>",
      "frequency": <0.0–1.0>,
      "is_required": false,
      "avg_years_expected": <number or null>
    }}
  ],
  "common_tools": ["<lowercase tool/framework/language>"],
  "salary_range": [<min_usd_int>, <max_usd_int>] or null
}}

Rules:
- List up to 15 required skills and 10 nice-to-have skills, sorted by frequency descending.
- common_tools should be distinct from skills — focus on specific technologies, frameworks, platforms.
- salary_range: annual USD integers. Use null if no reliable data found.
- Normalise all names to lowercase (e.g. "Python", "python" → "python").
- Return ONLY the JSON. No markdown, no explanation.

Market research excerpts:
<excerpts>
{excerpts}
</excerpts>"""


def _get_tavily() -> TavilyClient:
    key = os.environ.get("TAVILY_API_KEY")
    if not key:
        raise RuntimeError("TAVILY_API_KEY environment variable is not set")
    return TavilyClient(key)


def _get_anthropic() -> anthropic.Anthropic:
    return anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))


def _run_searches(role: str) -> list[dict]:
    """Run all query templates and return deduplicated Tavily results."""
    client = _get_tavily()
    seen_urls: set[str] = set()
    results: list[dict] = []

    for query_template in _QUERIES:
        query = query_template.format(role=role)
        try:
            response = client.search(query, search_depth="basic")
            for result in response.get("results", []):
                url = result.get("url")
                if url and url not in seen_urls:
                    seen_urls.add(url)
                    results.append(result)
        except Exception:
            pass

    return results


def _build_excerpts(results: list[dict], char_budget: int = 24_000) -> str:
    """Concatenate result content into a single string, respecting a char budget."""
    parts: list[str] = []
    used = 0

    for result in results:
        url = result.get("url", "")
        title = result.get("title", "")
        content = result.get("content", "")
        chunk = "\n".join(filter(None, [url, title, content]))

        if used + len(chunk) > char_budget:
            break

        parts.append(chunk)
        used += len(chunk)

    return "\n\n---\n\n".join(parts)


def _extract_snapshot(role: str, results: list[dict]) -> dict:
    """Send aggregated search content to Claude and parse the returned JSON."""
    excerpts = _build_excerpts(results)
    prompt = _EXTRACT_PROMPT.format(role=role, excerpts=excerpts)

    client = _get_anthropic()
    message = client.messages.create(
        model=_MODEL,
        max_tokens=2048,
        messages=[{"role": "user", "content": prompt}],
    )

    content = message.content[0].text.strip()
    if content.startswith("```"):
        content = content.split("\n", 1)[1]
        content = content.rsplit("```", 1)[0]

    return json.loads(content)


def _skill(raw: dict) -> SkillSignal:
    return SkillSignal(
        skill=raw.get("skill", "").lower(),
        frequency=float(raw.get("frequency", 0.0)),
        is_required=bool(raw.get("is_required", True)),
        avg_years_expected=raw.get("avg_years_expected"),
    )


def _build_market_snapshot(
    role: str,
    data: dict,
    results: list[dict] | None = None,
) -> MarketSnapshot:
    salary = data.get("salary_range")
    salary_range: tuple[int, int] | None = None
    if isinstance(salary, (list, tuple)) and len(salary) == 2:
        salary_range = (int(salary[0]), int(salary[1]))

    postings_analyzed = data.get("postings_analyzed") or (
        len(results) if results else 0
    )

    return MarketSnapshot(
        role_title=role,
        postings_analyzed=postings_analyzed,
        top_required_skills=[_skill(s) for s in data.get("top_required_skills", [])],
        top_nice_to_have_skills=[
            _skill(s) for s in data.get("top_nice_to_have_skills", [])
        ],
        common_tools=[t.lower() for t in data.get("common_tools", [])],
        salary_range=salary_range,
        scraped_at=datetime.utcnow(),
    )


def research_market(role: str) -> MarketSnapshot:
    """
    Research the job market for a given role using Tavily search.

    Runs 5 targeted queries, aggregates the results, and uses Claude to
    extract structured skill signals into a MarketSnapshot.

    Args:
        role: Job title to research (e.g. "Senior Backend Engineer").

    Returns:
        MarketSnapshot with required/nice-to-have skills, tools, and salary range.
    """
    results = _run_searches(role)
    if not results:
        raise RuntimeError(f"No search results returned for role: {role}")

    data = _extract_snapshot(role, results)
    return _build_market_snapshot(role, data, results)
