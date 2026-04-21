from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


# ---------------------------------------------------------------------------
# Candidate
# ---------------------------------------------------------------------------

class WorkExperience(BaseModel):
    company: str
    title: str
    duration_months: int | None = None
    description: str
    technologies: list[str] = []


class Education(BaseModel):
    institution: str
    degree: str
    field: str
    graduation_year: int | None = None


class CandidateProfile(BaseModel):
    """Parsed representation of a candidate — sourced from resume PDF or LinkedIn."""
    raw_text: str = Field(exclude=True)  # kept for LLM re-analysis, excluded from output
    name: str | None = None
    current_title: str | None = None
    years_of_experience: float | None = None
    skills: list[str] = []              # flat list, normalised lowercase
    technologies: list[str] = []        # tools, frameworks, languages
    experience: list[WorkExperience] = []
    education: list[Education] = []
    summary: str | None = None          # LLM-generated 2-3 sentence profile summary


# ---------------------------------------------------------------------------
# Market research
# ---------------------------------------------------------------------------

class SkillSignal(BaseModel):
    skill: str
    frequency: float        # 0–1: fraction of postings that mention it
    is_required: bool       # True = typically required, False = nice-to-have
    avg_years_expected: float | None = None


class MarketSnapshot(BaseModel):
    """Aggregated signal from N job postings for a target role."""
    role_title: str
    postings_analyzed: int
    top_required_skills: list[SkillSignal]
    top_nice_to_have_skills: list[SkillSignal]
    common_tools: list[str]
    salary_range: tuple[int, int] | None = None  # (min, max) USD
    scraped_at: datetime = Field(default_factory=datetime.utcnow)


# ---------------------------------------------------------------------------
# Company interview intelligence
# ---------------------------------------------------------------------------

class InterviewStage(BaseModel):
    stage_number: int
    name: str                   # e.g. "Recruiter screen", "System design", "Onsite"
    format: Literal["phone", "video", "onsite", "take_home", "async"]
    duration_minutes: int | None = None
    focus: str                  # e.g. "Behavioural + motivation", "LC medium/hard"
    tips: list[str] = []


class InterviewProcess(BaseModel):
    company: str
    role_title: str
    total_stages: int
    stages: list[InterviewStage]
    typical_duration_weeks: int | None = None  # total pipeline length
    notes: str | None = None
    sources: list[str] = []     # Glassdoor/Blind URLs used
    confidence: float = 0.0     # 0–1, based on number of data points


# ---------------------------------------------------------------------------
# Gap analysis
# ---------------------------------------------------------------------------

class Gap(BaseModel):
    skill: str
    market_frequency: float         # how often it appears in postings
    candidate_has: bool
    effort_level: Literal["low", "medium", "high"]  # rough estimate to close
    priority: Literal["critical", "important", "optional"]
    rationale: str                  # one sentence explaining the priority score


# ---------------------------------------------------------------------------
# Roadmap output
# ---------------------------------------------------------------------------

class Resource(BaseModel):
    title: str
    url: str | None = None
    type: Literal["course", "book", "docs", "project", "article", "video"]
    free: bool = True


class RoadmapTask(BaseModel):
    title: str
    description: str
    category: Literal["skill", "project", "interview_prep", "networking"]
    priority: Literal["must", "should", "nice_to_have"]
    estimated_hours: int
    resources: list[Resource] = []
    addresses_gap: list[str] = []   # skill names this task closes


class Week(BaseModel):
    week_number: int
    theme: str                      # e.g. "Close core skill gaps"
    tasks: list[RoadmapTask]
    milestone: str                  # what you can show/say by end of week


class RoadmapPlan(BaseModel):
    """Primary output of JobPrep — a time-boxed, prioritised preparation plan."""
    generated_at: datetime = Field(default_factory=datetime.utcnow)

    # Context
    candidate_summary: str
    target_role: str
    target_company: str | None = None
    total_weeks: int

    # Research inputs (attached for transparency)
    market_snapshot: MarketSnapshot | None = None
    interview_process: InterviewProcess | None = None

    # Gap analysis
    critical_gaps: list[Gap]
    all_gaps: list[Gap]

    # The plan
    quick_wins: list[RoadmapTask]   # actionable this week regardless of timeline
    weeks: list[Week]

    # Meta
    total_estimated_hours: int
    confidence_score: float         # 0–1: how much data backed this plan
    sources: list[str] = []
