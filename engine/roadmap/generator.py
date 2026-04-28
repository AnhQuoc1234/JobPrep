from __future__ import annotations

import json
import os
from datetime import datetime

import anthropic

from engine.roadmap.schemas import (
    CandidateProfile,
    Gap,
    MarketSnapshot,
    Resource,
    RoadmapPlan,
    RoadmapTask,
    Week,
)

_MODEL = os.environ.get("SMART_MODEL", "claude-sonnet-4-6")

_ROADMAP_PROMPT = """\
You are a senior career coach generating a {weeks}-week interview preparation roadmap.

CANDIDATE
{candidate_context}

TARGET
Role: {target_role}{company_line}

SKILL GAPS (pre-analyzed, sorted by priority)
Critical — must close before the interview:
{critical_gaps}

Important — high value if time allows:
{important_gaps}

Optional — nice to have:
{optional_gaps}

MARKET CONTEXT
Common tools: {common_tools}
Salary range: {salary_range}

Generate a {weeks}-week preparation plan. Return ONLY valid JSON matching this exact schema \
(no markdown fences, no extra keys):
{{
  "candidate_summary": "<2-3 sentence candidate summary>",
  "quick_wins": [
    {{
      "title": "<task title>",
      "description": "<what to do and why>",
      "category": "skill|project|interview_prep|networking",
      "priority": "must|should|nice_to_have",
      "estimated_hours": <int>,
      "resources": [
        {{"title": "<name>", "url": "<url or null>", "type": "course|book|docs|project|article|video", "free": true}}
      ],
      "addresses_gap": ["<skill1>", "<skill2>"]
    }}
  ],
  "weeks": [
    {{
      "week_number": <int>,
      "theme": "<week theme>",
      "milestone": "<what you can show or say by end of week>",
      "tasks": [ ...same structure as quick_wins... ]
    }}
  ],
  "total_estimated_hours": <int>,
  "confidence_score": <0.0-1.0>
}}

Rules:
- quick_wins: 3–5 tasks completable in the NEXT 3 DAYS, maximum ROI for near-term interview prep.
- Each week: 3–6 tasks totalling 6–12 hours.
- Address critical gaps in weeks 1–2, important gaps in weeks 2–3.
- At least one "interview_prep" category task per week.
- Resources must be real, specific titles. Prefer free resources.
- confidence_score: based on how well the plan covers all critical gaps (0.9 = full coverage).
- Return ONLY the JSON."""


def _get_anthropic() -> anthropic.Anthropic:
    return anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))


def _format_gaps(gaps: list[Gap]) -> str:
    if not gaps:
        return "  (none)"
    lines = []
    for g in gaps:
        status = "✓ has" if g.candidate_has else "✗ missing"
        lines.append(
            f"  - {g.skill} [{status}] freq={g.market_frequency:.0%}"
            f" effort={g.effort_level} | {g.rationale}"
        )
    return "\n".join(lines)


def _build_prompt(
    candidate: CandidateProfile,
    market: MarketSnapshot,
    gaps: list[Gap],
    target_role: str,
    target_company: str | None,
    weeks: int,
) -> str:
    critical = [g for g in gaps if g.priority == "critical"]
    important = [g for g in gaps if g.priority == "important"]
    optional = [g for g in gaps if g.priority == "optional"]

    candidate_context = "\n".join(
        filter(
            None,
            [
                f"Name: {candidate.name}" if candidate.name else None,
                f"Title: {candidate.current_title}" if candidate.current_title else None,
                f"Experience: {candidate.years_of_experience} years"
                if candidate.years_of_experience
                else None,
                f"Skills: {', '.join(candidate.skills[:15])}" if candidate.skills else None,
                f"Technologies: {', '.join(candidate.technologies[:15])}"
                if candidate.technologies
                else None,
                f"Summary: {candidate.summary}" if candidate.summary else None,
            ],
        )
    )

    salary_str = (
        f"${market.salary_range[0]:,} – ${market.salary_range[1]:,}"
        if market.salary_range
        else "not available"
    )

    return _ROADMAP_PROMPT.format(
        weeks=weeks,
        candidate_context=candidate_context,
        target_role=target_role,
        company_line=f"\nCompany: {target_company}" if target_company else "",
        critical_gaps=_format_gaps(critical),
        important_gaps=_format_gaps(important),
        optional_gaps=_format_gaps(optional),
        common_tools=", ".join(market.common_tools[:10]) or "not available",
        salary_range=salary_str,
    )


def _parse_task(raw: dict) -> RoadmapTask:
    resources = [
        Resource(
            title=r.get("title", ""),
            url=r.get("url") or None,
            type=r.get("type", "article"),
            free=bool(r.get("free", True)),
        )
        for r in raw.get("resources", [])
    ]
    return RoadmapTask(
        title=raw["title"],
        description=raw.get("description", ""),
        category=raw.get("category", "skill"),
        priority=raw.get("priority", "should"),
        estimated_hours=int(raw.get("estimated_hours", 2)),
        resources=resources,
        addresses_gap=raw.get("addresses_gap", []),
    )


def _build_plan(
    candidate: CandidateProfile,
    market: MarketSnapshot,
    gaps: list[Gap],
    target_role: str,
    target_company: str | None,
    weeks: int,
    data: dict,
) -> RoadmapPlan:
    parsed_weeks = [
        Week(
            week_number=w["week_number"],
            theme=w.get("theme", ""),
            milestone=w.get("milestone", ""),
            tasks=[_parse_task(t) for t in w.get("tasks", [])],
        )
        for w in data.get("weeks", [])
    ]

    quick_wins = [_parse_task(t) for t in data.get("quick_wins", [])]

    all_tasks = quick_wins + [t for w in parsed_weeks for t in w.tasks]
    total_hours = sum(t.estimated_hours for t in all_tasks)

    return RoadmapPlan(
        generated_at=datetime.utcnow(),
        candidate_summary=data.get("candidate_summary", candidate.summary or ""),
        target_role=target_role,
        target_company=target_company,
        total_weeks=weeks,
        market_snapshot=market,
        interview_process=None,
        critical_gaps=[g for g in gaps if g.priority == "critical"],
        all_gaps=gaps,
        quick_wins=quick_wins,
        weeks=parsed_weeks,
        total_estimated_hours=data.get("total_estimated_hours", total_hours),
        confidence_score=float(data.get("confidence_score", 0.7)),
        sources=market.sources if hasattr(market, "sources") else [],
    )


def generate_roadmap(
    candidate: CandidateProfile,
    market: MarketSnapshot,
    gaps: list[Gap],
    target_role: str,
    target_company: str | None = None,
    weeks: int = 4,
) -> RoadmapPlan:
    """
    Generate a time-boxed preparation roadmap from pre-computed inputs.

    Args:
        candidate:      Parsed candidate profile.
        market:         MarketSnapshot for the target role.
        gaps:           Pre-computed gaps from analyze_gaps().
        target_role:    Job title the candidate is preparing for.
        target_company: Optional company name for extra context.
        weeks:          Length of the prep plan (default 4).

    Returns:
        RoadmapPlan with weekly tasks, quick wins, and resource links.
    """
    prompt = _build_prompt(candidate, market, gaps, target_role, target_company, weeks)

    client = _get_anthropic()
    message = client.messages.create(
        model=_MODEL,
        max_tokens=4096,
        messages=[{"role": "user", "content": prompt}],
    )

    content = message.content[0].text.strip()
    if content.startswith("```"):
        content = content.split("\n", 1)[1].rsplit("```", 1)[0]

    data = json.loads(content)
    return _build_plan(candidate, market, gaps, target_role, target_company, weeks, data)
