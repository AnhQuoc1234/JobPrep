from __future__ import annotations

import json
import os
from typing import Literal

import anthropic

from engine.roadmap.schemas import CandidateProfile, Gap, MarketSnapshot, SkillSignal

_MODEL = os.environ.get("FAST_MODEL", "claude-haiku-4-5-20251001")

_GAP_PROMPT = """\
You are a career coach assessing skill gaps for a candidate applying to a job.

Candidate background:
{candidate_summary}

Target role: {role}

For each skill below, the candidate does NOT currently have it. Assess:
- effort_level: how hard it is for THIS candidate to close the gap
    "low"    = days to ~2 weeks (syntax, a library they'd pick up fast given their background)
    "medium" = 2 weeks to 2 months (new paradigm or framework requiring a real project)
    "high"   = 2+ months (fundamentally different domain or deep specialisation)
- rationale: one sentence — why this effort level given their specific background

Skills to assess:
{skills_json}

Return ONLY a JSON array, one object per skill, same order as input:
[
  {{"skill": "...", "effort_level": "low|medium|high", "rationale": "one sentence"}}
]"""


def _get_anthropic() -> anthropic.Anthropic:
    return anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))


def _candidate_has_skill(skill: str, candidate: CandidateProfile) -> bool:
    """Return True if the candidate's skills or technologies cover this skill."""
    needle = skill.lower().strip()
    pool = {s.lower().strip() for s in candidate.skills + candidate.technologies}

    if needle in pool:
        return True

    # substring match in either direction (e.g. "postgres" ↔ "postgresql")
    for cs in pool:
        if needle in cs or cs in needle:
            return True

    return False


def _derive_priority(
    signal: SkillSignal,
) -> Literal["critical", "important", "optional"]:
    if signal.is_required and signal.frequency >= 0.7:
        return "critical"
    if signal.is_required or signal.frequency >= 0.6:
        return "important"
    return "optional"


def _assess_missing_with_llm(
    missing: list[SkillSignal],
    role: str,
    candidate_summary: str,
) -> dict[str, tuple[str, str]]:
    """
    Single LLM call that returns effort_level + rationale for each missing skill.
    Returns a dict: skill_name → (effort_level, rationale).
    """
    skills_json = json.dumps(
        [{"skill": s.skill, "frequency": s.frequency} for s in missing],
        indent=2,
    )
    prompt = _GAP_PROMPT.format(
        candidate_summary=candidate_summary or "No summary available.",
        role=role,
        skills_json=skills_json,
    )

    client = _get_anthropic()
    message = client.messages.create(
        model=_MODEL,
        max_tokens=2048,
        messages=[{"role": "user", "content": prompt}],
    )

    content = message.content[0].text.strip()
    if content.startswith("```"):
        content = content.split("\n", 1)[1].rsplit("```", 1)[0]

    assessments: list[dict] = json.loads(content)
    return {
        a["skill"]: (a["effort_level"], a["rationale"])
        for a in assessments
    }


def analyze_gaps(
    candidate: CandidateProfile,
    market: MarketSnapshot,
    role: str,
) -> list[Gap]:
    """
    Compare a candidate's skills against market requirements and return a
    prioritised list of Gap objects.

    Gaps the candidate already covers get effort_level='low' and a short
    rationale. Missing gaps are assessed in a single LLM batch call so the
    effort estimate is grounded in the candidate's actual background.

    Args:
        candidate: Parsed candidate profile.
        market:    MarketSnapshot for the target role.
        role:      Job title string used to give the LLM context.

    Returns:
        All gaps sorted by priority (critical → important → optional).
    """
    all_signals = market.top_required_skills + market.top_nice_to_have_skills
    missing: list[SkillSignal] = []
    present: list[SkillSignal] = []

    for signal in all_signals:
        if _candidate_has_skill(signal.skill, candidate):
            present.append(signal)
        else:
            missing.append(signal)

    # Batch-assess missing skills via LLM
    assessments: dict[str, tuple[str, str]] = {}
    if missing:
        assessments = _assess_missing_with_llm(
            missing, role, candidate.summary or ""
        )

    _priority_order = {"critical": 0, "important": 1, "optional": 2}

    gaps: list[Gap] = []

    for signal in present:
        gaps.append(
            Gap(
                skill=signal.skill,
                market_frequency=signal.frequency,
                candidate_has=True,
                effort_level="low",
                priority=_derive_priority(signal),
                rationale="Candidate already has this skill.",
            )
        )

    for signal in missing:
        effort, rationale = assessments.get(
            signal.skill, ("medium", "No assessment available.")
        )
        gaps.append(
            Gap(
                skill=signal.skill,
                market_frequency=signal.frequency,
                candidate_has=False,
                effort_level=effort,
                priority=_derive_priority(signal),
                rationale=rationale,
            )
        )

    gaps.sort(key=lambda g: (_priority_order[g.priority], not g.candidate_has))
    return gaps
