// All mock data — replace each export with API calls when wiring backend.
// Shapes match engine/roadmap/schemas.py exactly.

// --- Dashboard plan cards ---------------------------------------------------

export const MOCK_PLANS = [
  {
    id: "1",
    target_company: "Anthropic",
    target_role: "ML Research Engineer",
    total_weeks: 4,
    confidence_score: 0.87,
    total_estimated_hours: 42,
    critical_gaps_count: 3,
    generated_at: "2026-04-27T14:00:00",
    status: "active",
    last_updated: "2h ago",
  },
  {
    id: "2",
    target_company: "Stripe",
    target_role: "Staff Software Engineer",
    total_weeks: 6,
    confidence_score: 0.74,
    total_estimated_hours: 58,
    critical_gaps_count: 2,
    generated_at: "2026-04-26T10:00:00",
    status: "active",
    last_updated: "1d ago",
  },
  {
    id: "3",
    target_company: "Figma",
    target_role: "Senior Frontend Engineer",
    total_weeks: 3,
    confidence_score: 0.91,
    total_estimated_hours: 28,
    critical_gaps_count: 1,
    generated_at: "2026-04-18T11:00:00",
    status: "complete",
    last_updated: "8d ago",
  },
  {
    id: "4",
    target_company: "OpenAI",
    target_role: "Applied AI Engineer",
    total_weeks: 4,
    confidence_score: 0.62,
    total_estimated_hours: 35,
    critical_gaps_count: 4,
    generated_at: "2026-04-25T15:00:00",
    status: "active",
    last_updated: "3d ago",
  },
];

// --- Full RoadmapPlan (open plan view) --------------------------------------

export const MOCK_ROADMAP = {
  generated_at: "2026-04-27T14:00:00",

  candidate_summary: `Senior ML engineer with 5 years in production NLP systems. Strong in PyTorch, distributed training, and hypothesis-driven debugging — all transferable to interpretability research. Core gap is hands-on mech-interp experience: no published circuits work, no TransformerLens experiments on record. Background shows the right instincts; the missing piece is domain vocabulary and tooling.`,

  target_role: "ML Research Engineer",
  target_company: "Anthropic",
  total_weeks: 4,
  total_estimated_hours: 42,
  confidence_score: 0.87,

  critical_gaps: [
    {
      skill: "mechanistic interpretability",
      market_frequency: 0.89,
      candidate_has: false,
      effort_level: "high",
      priority: "critical",
      rationale: "Core methodology of the team — circuits analysis is expected knowledge for this role.",
    },
    {
      skill: "transformer circuits",
      market_frequency: 0.82,
      candidate_has: false,
      effort_level: "high",
      priority: "critical",
      rationale: "Foundational framework for interpreting attention heads — the team's core research paradigm.",
    },
    {
      skill: "activation patching",
      market_frequency: 0.76,
      candidate_has: false,
      effort_level: "medium",
      priority: "critical",
      rationale: "Standard experimental technique; interviewers will expect hands-on familiarity.",
    },
  ],

  all_gaps: [
    {
      skill: "mechanistic interpretability",
      market_frequency: 0.89,
      candidate_has: false,
      effort_level: "high",
      priority: "critical",
      rationale: "Core methodology of the team — circuits analysis is expected knowledge for this role.",
    },
    {
      skill: "transformer circuits",
      market_frequency: 0.82,
      candidate_has: false,
      effort_level: "high",
      priority: "critical",
      rationale: "Foundational framework for interpreting attention heads — the team's core research paradigm.",
    },
    {
      skill: "activation patching",
      market_frequency: 0.76,
      candidate_has: false,
      effort_level: "medium",
      priority: "critical",
      rationale: "Standard experimental technique; interviewers will expect hands-on familiarity.",
    },
    {
      skill: "jax/xla",
      market_frequency: 0.61,
      candidate_has: false,
      effort_level: "medium",
      priority: "important",
      rationale: "Anthropic's training stack uses JAX; PyTorch background transfers but fluency expected.",
    },
    {
      skill: "distributed training",
      market_frequency: 0.54,
      candidate_has: true,
      effort_level: "low",
      priority: "important",
      rationale: "Candidate has production experience — refresh on specifics at Anthropic's scale.",
    },
    {
      skill: "research paper writing",
      market_frequency: 0.48,
      candidate_has: false,
      effort_level: "high",
      priority: "important",
      rationale: "Role expects research output; no published papers in candidate's background.",
    },
    {
      skill: "rlhf",
      market_frequency: 0.41,
      candidate_has: false,
      effort_level: "medium",
      priority: "optional",
      rationale: "Useful context but not core to the interpretability research track.",
    },
    {
      skill: "bayesian optimization",
      market_frequency: 0.32,
      candidate_has: true,
      effort_level: "low",
      priority: "optional",
      rationale: "Nice-to-have for hyperparameter tuning; candidate already has this.",
    },
  ],

  quick_wins: [
    {
      title: "Read 'A Mathematical Framework for Transformer Circuits'",
      description: "The foundational paper for the team's methodology. Focus on sections 1–3 on attention heads and MLP circuits.",
      category: "skill",
      priority: "must",
      estimated_hours: 3,
      resources: [{ title: "Transformer Circuits Thread", url: "https://transformer-circuits.pub", type: "article", free: true }],
      addresses_gap: ["transformer circuits", "mechanistic interpretability"],
    },
    {
      title: "Set up TransformerLens and run the activation patching tutorial",
      description: "TransformerLens is the standard mech-interp library. Run the IOI tutorial end-to-end before moving to original experiments.",
      category: "skill",
      priority: "must",
      estimated_hours: 4,
      resources: [{ title: "TransformerLens docs", url: "https://neelnanda-io.github.io/TransformerLens", type: "docs", free: true }],
      addresses_gap: ["activation patching", "mechanistic interpretability"],
    },
    {
      title: "Prepare 2 discussion points from recent Anthropic preprints",
      description: "Pick one finding you'd push back on and one you'd extend. Interviewers probe depth of engagement, not just familiarity.",
      category: "interview_prep",
      priority: "must",
      estimated_hours: 2,
      resources: [{ title: "Anthropic research blog", url: "https://www.anthropic.com/research", type: "article", free: true }],
      addresses_gap: ["mechanistic interpretability"],
    },
  ],

  weeks: [
    {
      week_number: 1,
      theme: "Interpretability foundations",
      milestone: "Can explain activation patching and name 3 circuits from the literature.",
      tasks: [
        {
          title: "Complete the Circuits in Transformers reading sequence",
          description: "Work through the transformer circuits thread in order, building vocabulary of attention heads, MLP layers, and feature circuits.",
          category: "skill",
          priority: "must",
          estimated_hours: 6,
          resources: [{ title: "Transformer Circuits Thread", url: "https://transformer-circuits.pub", type: "article", free: true }],
          addresses_gap: ["transformer circuits", "mechanistic interpretability"],
        },
        {
          title: "Implement induction heads from scratch in TransformerLens",
          description: "Replicate the induction head experiment. Understanding by building is faster than reading — gives you a concrete example to reference.",
          category: "skill",
          priority: "must",
          estimated_hours: 5,
          resources: [{ title: "ARENA 3.0 — Chapter 1", url: "https://arena3-chapter1-transformer-interp.streamlit.app", type: "course", free: true }],
          addresses_gap: ["activation patching", "mechanistic interpretability"],
        },
        {
          title: "Mock interview: explain a circuit finding aloud",
          description: "Practice explaining the induction head mechanism as if to a skeptical researcher. Record yourself — fluency matters as much as accuracy.",
          category: "interview_prep",
          priority: "must",
          estimated_hours: 1,
          resources: [],
          addresses_gap: ["mechanistic interpretability"],
        },
      ],
    },
    {
      week_number: 2,
      theme: "Hands-on activation patching",
      milestone: "Have run at least one original activation patching experiment on a toy model.",
      tasks: [
        {
          title: "Run an original IOI-style experiment on GPT-2",
          description: "Pick a behavior different from indirect object identification. Hypothesize which circuits are responsible, test it, write a one-paragraph summary.",
          category: "project",
          priority: "must",
          estimated_hours: 8,
          resources: [{ title: "ARENA mech-interp exercises", url: "https://arena3-chapter1-transformer-interp.streamlit.app", type: "course", free: true }],
          addresses_gap: ["activation patching", "transformer circuits"],
        },
        {
          title: "JAX fundamentals — 3-hour crash course",
          description: "Work through the JAX quickstart. Focus on jit, vmap, and grad. Your PyTorch intuitions transfer directly.",
          category: "skill",
          priority: "should",
          estimated_hours: 3,
          resources: [{ title: "JAX Quickstart", url: "https://jax.readthedocs.io/en/latest/quickstart.html", type: "docs", free: true }],
          addresses_gap: ["jax/xla"],
        },
      ],
    },
    {
      week_number: 3,
      theme: "Research design & interview prep",
      milestone: "Can sketch a novel experiment design in 10 minutes under pressure.",
      tasks: [
        {
          title: "Design an experiment to measure feature superposition",
          description: "Write a 1-page research brief: hypothesis, method, expected results, controls. This is a very likely technical interview question.",
          category: "interview_prep",
          priority: "must",
          estimated_hours: 3,
          resources: [{ title: "Toy Models of Superposition", url: "https://transformer-circuits.pub/2022/toy_model/index.html", type: "article", free: true }],
          addresses_gap: ["mechanistic interpretability"],
        },
        {
          title: "Prepare behavioral stories: pushing back on a technical decision",
          description: "Prepare 2 stories where you disagreed with a senior engineer and had data to back it up. Anthropic interviews probe epistemic independence.",
          category: "interview_prep",
          priority: "must",
          estimated_hours: 2,
          resources: [],
          addresses_gap: [],
        },
        {
          title: "ARENA Chapter 1 completion sprint",
          description: "Finish all exercises. Strong signal of seriousness if you can reference specific results — shows you did the work, not just read about it.",
          category: "skill",
          priority: "should",
          estimated_hours: 6,
          resources: [{ title: "ARENA 3.0", url: "https://arena3-chapter1-transformer-interp.streamlit.app", type: "course", free: true }],
          addresses_gap: ["activation patching", "transformer circuits"],
        },
      ],
    },
    {
      week_number: 4,
      theme: "Final polish & dry runs",
      milestone: "Ready to walk into the interview with concrete examples and a clear narrative.",
      tasks: [
        {
          title: "Write up your patching experiment as a 1-page brief",
          description: "Document hypothesis, method, findings, and what you'd investigate next. This becomes your strongest concrete example in the interview.",
          category: "project",
          priority: "must",
          estimated_hours: 2,
          resources: [],
          addresses_gap: ["mechanistic interpretability"],
        },
        {
          title: "Full mock interview — technical + behavioral",
          description: "Cover: a circuits explanation, an experiment design question, and a disagreement story. Time each section.",
          category: "interview_prep",
          priority: "must",
          estimated_hours: 2,
          resources: [],
          addresses_gap: [],
        },
      ],
    },
  ],

  market_snapshot: {
    role_title: "ML Research Engineer",
    postings_analyzed: 47,
    top_required_skills: [
      { skill: "python",                      frequency: 0.94, is_required: true,  avg_years_expected: 4 },
      { skill: "mechanistic interpretability",frequency: 0.89, is_required: true,  avg_years_expected: 2 },
      { skill: "pytorch",                     frequency: 0.85, is_required: true,  avg_years_expected: 3 },
      { skill: "transformer circuits",        frequency: 0.82, is_required: true,  avg_years_expected: null },
      { skill: "activation patching",         frequency: 0.76, is_required: true,  avg_years_expected: 1 },
      { skill: "jax",                         frequency: 0.61, is_required: true,  avg_years_expected: 1 },
    ],
    top_nice_to_have_skills: [
      { skill: "distributed training",        frequency: 0.54, is_required: false, avg_years_expected: null },
      { skill: "research paper writing",      frequency: 0.48, is_required: false, avg_years_expected: null },
      { skill: "rlhf",                        frequency: 0.41, is_required: false, avg_years_expected: null },
      { skill: "bayesian optimization",       frequency: 0.32, is_required: false, avg_years_expected: null },
    ],
    common_tools: ["TransformerLens", "PyTorch", "JAX", "Weights & Biases", "CUDA", "HuggingFace", "NumPy", "einops"],
    salary_range: [385000, 720000],
  },
};

// --- Engine activity log (RunAgent view) ------------------------------------

export const MOCK_ENGINE_LOG = [
  { step: "parser",  time: "14:22:01", msg: "Extracting text from resume.pdf",                     type: "info"    },
  { step: "parser",  time: "14:22:03", msg: "LLM call: claude-haiku-4-5 (2.1k tokens)",           type: "llm"     },
  { step: "parser",  time: "14:22:06", msg: "Profile extracted — 8 skills, 12 technologies",       type: "success" },
  { step: "parser",  time: "14:22:07", msg: "CandidateProfile built: 5 yrs exp, 3 work entries",   type: "success" },
  { step: "market",  time: "14:22:09", msg: "Analyzing 47 job postings for ML Research Engineer",  type: "info"    },
  { step: "market",  time: "14:22:13", msg: "LLM call: claude-sonnet-4-6 (5.3k tokens)",          type: "llm"     },
  { step: "market",  time: "14:22:19", msg: "MarketSnapshot built — 6 required skills identified", type: "success" },
  { step: "market",  time: "14:22:21", msg: "Running gap analysis against candidate profile",      type: "info"    },
  { step: "market",  time: "14:22:24", msg: "3 critical gaps, 3 important gaps, 2 optional",       type: "success" },
  { step: "roadmap", time: "14:22:26", msg: "Building 4-week roadmap prompt",                      type: "info"    },
  { step: "roadmap", time: "14:22:28", msg: "LLM call: claude-sonnet-4-6 (8.7k tokens)",          type: "llm"     },
  { step: "roadmap", time: "14:22:39", msg: "Generated 3 quick wins and 14 weekly tasks",          type: "success" },
  { step: "roadmap", time: "14:22:41", msg: "RoadmapPlan complete — confidence: 0.87",             type: "success" },
];

// --- History / archive rows -------------------------------------------------

export const MOCK_ARCHIVE = [
  { id: "5", target_company: "Scale AI",     target_role: "ML Engineer",      generated_at: "2026-03-15T10:00:00", outcome: "offer",    confidence_score: 0.92 },
  { id: "6", target_company: "Cohere",       target_role: "Research Engineer", generated_at: "2026-02-28T14:00:00", outcome: "rejected", confidence_score: 0.78 },
  { id: "7", target_company: "Hugging Face", target_role: "ML Infrastructure", generated_at: "2026-01-12T11:00:00", outcome: "offer",    confidence_score: 0.88 },
  { id: "8", target_company: "Mistral",      target_role: "Researcher",        generated_at: "2025-12-08T13:00:00", outcome: "withdrew", confidence_score: 0.65 },
];
