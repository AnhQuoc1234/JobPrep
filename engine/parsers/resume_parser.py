from __future__ import annotations

import json
import os
from pathlib import Path

import anthropic
import pdfplumber

from engine.roadmap.schemas import CandidateProfile, WorkExperience, Education

_client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))
_MODEL = os.environ.get("FAST_MODEL", "claude-haiku-4-5-20251001")

_EXTRACT_PROMPT = """\
You are parsing a candidate's resume or CV. Extract all available information and return \
a JSON object that matches the schema below exactly. Use null for missing fields and empty \
arrays where no data is present. Normalise all skill and technology names to lowercase.

Schema:
{
  "name": string | null,
  "current_title": string | null,
  "years_of_experience": number | null,
  "skills": string[],
  "technologies": string[],
  "experience": [
    {
      "company": string,
      "title": string,
      "duration_months": number | null,
      "description": string,
      "technologies": string[]
    }
  ],
  "education": [
    {
      "institution": string,
      "degree": string,
      "field": string,
      "graduation_year": number | null
    }
  ],
  "summary": string | null
}

For "summary": write 2–3 sentences describing the candidate's background and strengths \
based solely on what is in the resume. Do not infer or embellish.

Resume text:
<resume>
{resume_text}
</resume>

Return ONLY the JSON object. No explanation, no markdown fences."""


def _extract_pdf_text(path: Path) -> str:
    """Extract raw text from a PDF file using pdfplumber."""
    with pdfplumber.open(path) as pdf:
        pages = [page.extract_text() or "" for page in pdf.pages]
    return "\n\n".join(pages).strip()


def _parse_with_llm(raw_text: str) -> dict:
    """Send raw resume text to Claude Haiku and get back structured JSON."""
    prompt = _EXTRACT_PROMPT.format(resume_text=raw_text[:12_000])  # ~3k token cap

    message = _client.messages.create(
        model=_MODEL,
        max_tokens=2048,
        messages=[{"role": "user", "content": prompt}],
    )

    content = message.content[0].text.strip()

    # Strip markdown fences if the model adds them despite instructions
    if content.startswith("```"):
        content = content.split("\n", 1)[1]
        content = content.rsplit("```", 1)[0]

    return json.loads(content)


def _build_profile(raw_text: str, data: dict) -> CandidateProfile:
    experience = [
        WorkExperience(
            company=e.get("company", ""),
            title=e.get("title", ""),
            duration_months=e.get("duration_months"),
            description=e.get("description", ""),
            technologies=e.get("technologies", []),
        )
        for e in data.get("experience", [])
    ]

    education = [
        Education(
            institution=e.get("institution", ""),
            degree=e.get("degree", ""),
            field=e.get("field", ""),
            graduation_year=e.get("graduation_year"),
        )
        for e in data.get("education", [])
    ]

    return CandidateProfile(
        raw_text=raw_text,
        name=data.get("name"),
        current_title=data.get("current_title"),
        years_of_experience=data.get("years_of_experience"),
        skills=[s.lower() for s in data.get("skills", [])],
        technologies=[t.lower() for t in data.get("technologies", [])],
        experience=experience,
        education=education,
        summary=data.get("summary"),
    )


def parse_resume(path: str | Path) -> CandidateProfile:
    """
    Parse a resume PDF into a CandidateProfile.

    Args:
        path: Absolute or relative path to a PDF file.

    Returns:
        CandidateProfile with extracted candidate data.
    """
    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(f"Resume not found: {path}")
    if path.suffix.lower() != ".pdf":
        raise ValueError(f"Expected a PDF file, got: {path.suffix}")

    raw_text = _extract_pdf_text(path)
    if not raw_text:
        raise ValueError(f"Could not extract text from PDF: {path}")

    data = _parse_with_llm(raw_text)
    return _build_profile(raw_text, data)
