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

// --- Per-plan RoadmapPlan detail --------------------------------------------

const PLAN_1 = {
  generated_at: "2026-04-27T14:00:00",
  candidate_summary: `Senior ML engineer with 5 years in production NLP systems. Strong in PyTorch, distributed training, and hypothesis-driven debugging — all transferable to interpretability research. Core gap is hands-on mech-interp experience: no published circuits work, no TransformerLens experiments on record. Background shows the right instincts; the missing piece is domain vocabulary and tooling.`,
  target_role: "ML Research Engineer",
  target_company: "Anthropic",
  total_weeks: 4,
  total_estimated_hours: 42,
  confidence_score: 0.87,
  critical_gaps: [
    { skill: "mechanistic interpretability", market_frequency: 0.89, candidate_has: false, effort_level: "high",   priority: "critical",  rationale: "Core methodology of the team — circuits analysis is expected knowledge for this role." },
    { skill: "transformer circuits",         market_frequency: 0.82, candidate_has: false, effort_level: "high",   priority: "critical",  rationale: "Foundational framework for interpreting attention heads — the team's core research paradigm." },
    { skill: "activation patching",          market_frequency: 0.76, candidate_has: false, effort_level: "medium", priority: "critical",  rationale: "Standard experimental technique; interviewers will expect hands-on familiarity." },
  ],
  all_gaps: [
    { skill: "mechanistic interpretability", market_frequency: 0.89, candidate_has: false, effort_level: "high",   priority: "critical",  rationale: "Core methodology of the team — circuits analysis is expected knowledge for this role." },
    { skill: "transformer circuits",         market_frequency: 0.82, candidate_has: false, effort_level: "high",   priority: "critical",  rationale: "Foundational framework for interpreting attention heads — the team's core research paradigm." },
    { skill: "activation patching",          market_frequency: 0.76, candidate_has: false, effort_level: "medium", priority: "critical",  rationale: "Standard experimental technique; interviewers will expect hands-on familiarity." },
    { skill: "jax/xla",                      market_frequency: 0.61, candidate_has: false, effort_level: "medium", priority: "important", rationale: "Anthropic's training stack uses JAX; PyTorch background transfers but fluency expected." },
    { skill: "distributed training",         market_frequency: 0.54, candidate_has: true,  effort_level: "low",    priority: "important", rationale: "Candidate has production experience — refresh on specifics at Anthropic's scale." },
    { skill: "research paper writing",       market_frequency: 0.48, candidate_has: false, effort_level: "high",   priority: "important", rationale: "Role expects research output; no published papers in candidate's background." },
    { skill: "rlhf",                         market_frequency: 0.41, candidate_has: false, effort_level: "medium", priority: "optional",  rationale: "Useful context but not core to the interpretability research track." },
    { skill: "bayesian optimization",        market_frequency: 0.32, candidate_has: true,  effort_level: "low",    priority: "optional",  rationale: "Nice-to-have for hyperparameter tuning; candidate already has this." },
  ],
  quick_wins: [
    {
      title: "Read 'A Mathematical Framework for Transformer Circuits'",
      description: "The foundational paper for the team's methodology. Focus on sections 1–3 on attention heads and MLP circuits.",
      category: "skill", priority: "must", estimated_hours: 3,
      resources: [{ title: "Transformer Circuits Thread", url: "https://transformer-circuits.pub", type: "article", free: true }],
      addresses_gap: ["transformer circuits", "mechanistic interpretability"],
    },
    {
      title: "Set up TransformerLens and run the activation patching tutorial",
      description: "TransformerLens is the standard mech-interp library. Run the IOI tutorial end-to-end before moving to original experiments.",
      category: "skill", priority: "must", estimated_hours: 4,
      resources: [{ title: "TransformerLens docs", url: "https://neelnanda-io.github.io/TransformerLens", type: "docs", free: true }],
      addresses_gap: ["activation patching", "mechanistic interpretability"],
    },
    {
      title: "Prepare 2 discussion points from recent Anthropic preprints",
      description: "Pick one finding you'd push back on and one you'd extend. Interviewers probe depth of engagement, not just familiarity.",
      category: "interview_prep", priority: "must", estimated_hours: 2,
      resources: [{ title: "Anthropic research blog", url: "https://www.anthropic.com/research", type: "article", free: true }],
      addresses_gap: ["mechanistic interpretability"],
    },
  ],
  weeks: [
    {
      week_number: 1, theme: "Interpretability foundations",
      milestone: "Can explain activation patching and name 3 circuits from the literature.",
      tasks: [
        { title: "Complete the Circuits in Transformers reading sequence", description: "Work through the transformer circuits thread, building vocabulary of attention heads, MLP layers, and feature circuits.", category: "skill", priority: "must", estimated_hours: 6, resources: [{ title: "Transformer Circuits Thread", url: "https://transformer-circuits.pub", type: "article", free: true }], addresses_gap: ["transformer circuits", "mechanistic interpretability"] },
        { title: "Implement induction heads from scratch in TransformerLens", description: "Replicate the induction head experiment. Understanding by building is faster than reading — gives you a concrete example to reference.", category: "skill", priority: "must", estimated_hours: 5, resources: [{ title: "ARENA 3.0 — Chapter 1", url: "https://arena3-chapter1-transformer-interp.streamlit.app", type: "course", free: true }], addresses_gap: ["activation patching", "mechanistic interpretability"] },
        { title: "Mock interview: explain a circuit finding aloud", description: "Practice explaining the induction head mechanism as if to a skeptical researcher. Record yourself — fluency matters as much as accuracy.", category: "interview_prep", priority: "must", estimated_hours: 1, resources: [], addresses_gap: ["mechanistic interpretability"] },
      ],
    },
    {
      week_number: 2, theme: "Hands-on activation patching",
      milestone: "Have run at least one original activation patching experiment on a toy model.",
      tasks: [
        { title: "Run an original IOI-style experiment on GPT-2", description: "Pick a behavior different from indirect object identification. Hypothesize which circuits are responsible, test it, write a one-paragraph summary.", category: "project", priority: "must", estimated_hours: 8, resources: [{ title: "ARENA mech-interp exercises", url: "https://arena3-chapter1-transformer-interp.streamlit.app", type: "course", free: true }], addresses_gap: ["activation patching", "transformer circuits"] },
        { title: "JAX fundamentals — 3-hour crash course", description: "Work through the JAX quickstart. Focus on jit, vmap, and grad. Your PyTorch intuitions transfer directly.", category: "skill", priority: "should", estimated_hours: 3, resources: [{ title: "JAX Quickstart", url: "https://jax.readthedocs.io/en/latest/quickstart.html", type: "docs", free: true }], addresses_gap: ["jax/xla"] },
      ],
    },
    {
      week_number: 3, theme: "Research design & interview prep",
      milestone: "Can sketch a novel experiment design in 10 minutes under pressure.",
      tasks: [
        { title: "Design an experiment to measure feature superposition", description: "Write a 1-page research brief: hypothesis, method, expected results, controls. Very likely technical interview question.", category: "interview_prep", priority: "must", estimated_hours: 3, resources: [{ title: "Toy Models of Superposition", url: "https://transformer-circuits.pub/2022/toy_model/index.html", type: "article", free: true }], addresses_gap: ["mechanistic interpretability"] },
        { title: "Prepare behavioral stories: pushing back on a technical decision", description: "Prepare 2 stories where you disagreed with a senior engineer and had data to back it up.", category: "interview_prep", priority: "must", estimated_hours: 2, resources: [], addresses_gap: [] },
      ],
    },
    {
      week_number: 4, theme: "Final polish & dry runs",
      milestone: "Ready to walk into the interview with concrete examples and a clear narrative.",
      tasks: [
        { title: "Write up your patching experiment as a 1-page brief", description: "Document hypothesis, method, findings, and what you'd investigate next.", category: "project", priority: "must", estimated_hours: 2, resources: [], addresses_gap: ["mechanistic interpretability"] },
        { title: "Full mock interview — technical + behavioral", description: "Cover: a circuits explanation, an experiment design question, and a disagreement story. Time each section.", category: "interview_prep", priority: "must", estimated_hours: 2, resources: [], addresses_gap: [] },
      ],
    },
  ],
  market_snapshot: {
    role_title: "ML Research Engineer", postings_analyzed: 47,
    demand_trend: "growing", demand_change_pct: 41,
    top_locations: [
      { city: "San Francisco, CA", pct: 0.42 },
      { city: "Remote",            pct: 0.28 },
      { city: "New York, NY",      pct: 0.13 },
      { city: "Seattle, WA",       pct: 0.09 },
    ],
    job_type_split: { remote: 0.28, hybrid: 0.49, onsite: 0.23 },
    top_required_skills: [
      { skill: "python",                       frequency: 0.94, is_required: true  },
      { skill: "mechanistic interpretability", frequency: 0.89, is_required: true  },
      { skill: "pytorch",                      frequency: 0.85, is_required: true  },
      { skill: "transformer circuits",         frequency: 0.82, is_required: true  },
      { skill: "activation patching",          frequency: 0.76, is_required: true  },
      { skill: "jax",                          frequency: 0.61, is_required: true  },
    ],
    top_nice_to_have_skills: [
      { skill: "distributed training",   frequency: 0.54, is_required: false },
      { skill: "research paper writing", frequency: 0.48, is_required: false },
      { skill: "rlhf",                   frequency: 0.41, is_required: false },
      { skill: "bayesian optimization",  frequency: 0.32, is_required: false },
    ],
    common_tools: ["TransformerLens", "PyTorch", "JAX", "Weights & Biases", "CUDA", "HuggingFace", "NumPy", "einops"],
  },
};

const PLAN_2 = {
  generated_at: "2026-04-26T10:00:00",
  candidate_summary: `Backend engineer with 6 years building high-throughput APIs in Python and PostgreSQL. Solid distributed systems fundamentals and strong API design instincts. Primary gaps are Go — Stripe's core language — and payments domain knowledge. The engineering foundations are clearly there; the language switch and financial domain depth will take deliberate effort but are very learnable given the existing systems background.`,
  target_role: "Staff Software Engineer",
  target_company: "Stripe",
  total_weeks: 6,
  total_estimated_hours: 58,
  confidence_score: 0.74,
  critical_gaps: [
    { skill: "go",                          market_frequency: 0.88, candidate_has: false, effort_level: "high",   priority: "critical",  rationale: "Stripe's primary backend language. Python transfers conceptually but Go fluency is required from day one." },
    { skill: "payments domain knowledge",   market_frequency: 0.79, candidate_has: false, effort_level: "medium", priority: "critical",  rationale: "Expected baseline at Staff level: PCI compliance, settlement flows, fraud patterns. No prior fintech experience." },
  ],
  all_gaps: [
    { skill: "go",                          market_frequency: 0.88, candidate_has: false, effort_level: "high",   priority: "critical",  rationale: "Stripe's primary backend language. Python transfers conceptually but Go fluency is required from day one." },
    { skill: "payments domain knowledge",   market_frequency: 0.79, candidate_has: false, effort_level: "medium", priority: "critical",  rationale: "Expected baseline at Staff level: PCI compliance, settlement flows, fraud patterns. No prior fintech experience." },
    { skill: "grpc/protobuf",               market_frequency: 0.61, candidate_has: false, effort_level: "medium", priority: "important", rationale: "Stripe's internal RPC layer. JSON API experience transfers but proto schema design is a separate skill." },
    { skill: "distributed tracing",         market_frequency: 0.57, candidate_has: true,  effort_level: "low",    priority: "important", rationale: "Basic logging experience exists; Stripe expects production-grade tracing and SLO ownership." },
    { skill: "database sharding",           market_frequency: 0.52, candidate_has: false, effort_level: "medium", priority: "important", rationale: "Strong PostgreSQL background, but horizontal sharding patterns for Stripe's write volume are new." },
    { skill: "incident management",         market_frequency: 0.44, candidate_has: false, effort_level: "low",    priority: "optional",  rationale: "Stripe has a high oncall bar; candidate lacks structured incident response process experience." },
    { skill: "kafka/event streaming",       market_frequency: 0.38, candidate_has: false, effort_level: "medium", priority: "optional",  rationale: "Used in parts of Stripe's async pipeline; useful context but not immediately required." },
  ],
  quick_wins: [
    {
      title: "Complete the Go Tour and build a small REST API",
      description: "Go's syntax is small — a focused day gets you to productive. Build a simple CRUD service to cement the stdlib and concurrency model.",
      category: "skill", priority: "must", estimated_hours: 4,
      resources: [{ title: "A Tour of Go", url: "https://go.dev/tour", type: "docs", free: true }],
      addresses_gap: ["go"],
    },
    {
      title: "Read Stripe's engineering blog posts on system design",
      description: "Stripe publishes detailed posts on their infrastructure. Read 3–5 recent ones — interviewers reference internal design decisions from these.",
      category: "interview_prep", priority: "must", estimated_hours: 2,
      resources: [{ title: "Stripe Engineering Blog", url: "https://stripe.com/blog/engineering", type: "article", free: true }],
      addresses_gap: ["payments domain knowledge"],
    },
    {
      title: "Map a payment authorization flow end-to-end",
      description: "Draw the flow from card swipe to settlement, including auth, capture, clearing, and dispute handling. Verify against Stripe Docs.",
      category: "skill", priority: "must", estimated_hours: 2,
      resources: [{ title: "Stripe Docs — Payments overview", url: "https://docs.stripe.com/payments", type: "docs", free: true }],
      addresses_gap: ["payments domain knowledge"],
    },
  ],
  weeks: [
    {
      week_number: 1, theme: "Go foundations",
      milestone: "Can write idiomatic Go and explain goroutines vs threads in an interview.",
      tasks: [
        { title: "Go Tour + 'Effective Go' key sections", description: "Cover interfaces, goroutines, channels, and error handling. These are the parts interviewers probe most.", category: "skill", priority: "must", estimated_hours: 5, resources: [{ title: "Effective Go", url: "https://go.dev/doc/effective_go", type: "docs", free: true }], addresses_gap: ["go"] },
        { title: "Build a concurrent job queue in Go", description: "A worker pool with goroutines, channels, and graceful shutdown. Forces you to use the language idiomatically under pressure.", category: "project", priority: "must", estimated_hours: 4, resources: [], addresses_gap: ["go"] },
        { title: "Payments domain primer", description: "Read through the Stripe Docs payments overview and map the full authorization-to-settlement lifecycle.", category: "skill", priority: "must", estimated_hours: 3, resources: [{ title: "Stripe Docs", url: "https://docs.stripe.com", type: "docs", free: true }], addresses_gap: ["payments domain knowledge"] },
      ],
    },
    {
      week_number: 2, theme: "Distributed systems deep-dive",
      milestone: "Can design a fault-tolerant payment processor and explain consistency trade-offs.",
      tasks: [
        { title: "Read DDIA chapters 5–6 on replication and partitioning", description: "These directly map to Stripe's sharding challenges. Take notes on leader election and partition strategies.", category: "skill", priority: "must", estimated_hours: 6, resources: [{ title: "Designing Data-Intensive Applications", url: null, type: "book", free: false }], addresses_gap: ["database sharding"] },
        { title: "gRPC + protobuf crash course", description: "Build a simple client-server with a .proto schema. Focus on streaming RPCs — Stripe uses them for real-time data.", category: "skill", priority: "should", estimated_hours: 3, resources: [{ title: "gRPC Quickstart (Go)", url: "https://grpc.io/docs/languages/go/quickstart/", type: "docs", free: true }], addresses_gap: ["grpc/protobuf"] },
      ],
    },
    {
      week_number: 3, theme: "System design interview prep",
      milestone: "Can confidently walk through a payment system design in 45 minutes.",
      tasks: [
        { title: "Design a payment processing system (mock interview)", description: "Scope: high availability, idempotency, exactly-once delivery, fraud hooks. Time yourself to 45 minutes.", category: "interview_prep", priority: "must", estimated_hours: 3, resources: [], addresses_gap: ["payments domain knowledge", "distributed tracing"] },
        { title: "Prepare Staff-level leadership stories", description: "Stripe interviews probe technical leadership and cross-team influence. Prepare 2 stories: one where you drove a technical direction, one where you changed course based on data.", category: "interview_prep", priority: "must", estimated_hours: 2, resources: [], addresses_gap: [] },
      ],
    },
    {
      week_number: 4, theme: "Go proficiency & code review prep",
      milestone: "Production-quality Go code, ready for Stripe's technical screen.",
      tasks: [
        { title: "Review Go performance patterns", description: "Memory allocation, goroutine leaks, pprof. Stripe's codebase is perf-sensitive — knowing how to profile matters.", category: "skill", priority: "should", estimated_hours: 4, resources: [{ title: "go pprof docs", url: "https://pkg.go.dev/runtime/pprof", type: "docs", free: true }], addresses_gap: ["go"] },
        { title: "Full mock interview", description: "Coding (Go, medium/hard), system design (payments), and a leadership round. Time all sections.", category: "interview_prep", priority: "must", estimated_hours: 3, resources: [], addresses_gap: [] },
      ],
    },
  ],
  market_snapshot: {
    role_title: "Staff Software Engineer", postings_analyzed: 62,
    demand_trend: "stable", demand_change_pct: 8,
    top_locations: [
      { city: "San Francisco, CA", pct: 0.35 },
      { city: "New York, NY",      pct: 0.22 },
      { city: "Remote",            pct: 0.18 },
      { city: "Seattle, WA",       pct: 0.14 },
    ],
    job_type_split: { remote: 0.18, hybrid: 0.57, onsite: 0.25 },
    top_required_skills: [
      { skill: "go",                    frequency: 0.88, is_required: true  },
      { skill: "distributed systems",   frequency: 0.84, is_required: true  },
      { skill: "postgresql",            frequency: 0.79, is_required: true  },
      { skill: "payments / fintech",    frequency: 0.75, is_required: true  },
      { skill: "api design",            frequency: 0.71, is_required: true  },
      { skill: "kubernetes",            frequency: 0.63, is_required: true  },
    ],
    top_nice_to_have_skills: [
      { skill: "grpc/protobuf",         frequency: 0.61, is_required: false },
      { skill: "kafka",                 frequency: 0.52, is_required: false },
      { skill: "rust",                  frequency: 0.38, is_required: false },
      { skill: "formal verification",   frequency: 0.22, is_required: false },
    ],
    common_tools: ["Go", "PostgreSQL", "Redis", "Kafka", "Kubernetes", "gRPC", "AWS", "Datadog"],
  },
};

const PLAN_3 = {
  generated_at: "2026-04-18T11:00:00",
  candidate_summary: `Frontend engineer with 4 years in React and TypeScript. Strong component architecture, state management, and CSS-in-JS fundamentals. The critical gap is graphics programming — Figma's product is built on a custom WebGL renderer, and no canvas or GPU experience is a real barrier. Real-time collaboration and performance at Figma's document scale (millions of nodes) are secondary but important gaps.`,
  target_role: "Senior Frontend Engineer",
  target_company: "Figma",
  total_weeks: 3,
  total_estimated_hours: 28,
  confidence_score: 0.91,
  critical_gaps: [
    { skill: "webgl / canvas rendering", market_frequency: 0.92, candidate_has: false, effort_level: "high", priority: "critical", rationale: "Figma's entire UI canvas is a custom WebGL renderer. Expected to contribute to it within the first 90 days." },
  ],
  all_gaps: [
    { skill: "webgl / canvas rendering",       market_frequency: 0.92, candidate_has: false, effort_level: "high",   priority: "critical",  rationale: "Figma's entire UI canvas is a custom WebGL renderer. Expected to contribute to it within the first 90 days." },
    { skill: "real-time collaboration/crdts",  market_frequency: 0.68, candidate_has: false, effort_level: "medium", priority: "important", rationale: "Figma's multiplayer is built on CRDTs. Required context for any feature touching shared document state." },
    { skill: "browser performance profiling",  market_frequency: 0.61, candidate_has: true,  effort_level: "medium", priority: "important", rationale: "React DevTools experience exists; GPU profiling and rendering pipeline analysis are new territory." },
    { skill: "webassembly",                    market_frequency: 0.44, candidate_has: false, effort_level: "high",   priority: "optional",  rationale: "Figma ships WASM for performance-critical paths; helpful context but not immediately required." },
    { skill: "accessibility at scale",         market_frequency: 0.38, candidate_has: true,  effort_level: "low",    priority: "optional",  rationale: "Standard a11y knowledge exists; large-scale design system a11y at Figma's breadth is different." },
  ],
  quick_wins: [
    {
      title: "Complete WebGL Fundamentals — first 5 chapters",
      description: "Covers the GPU pipeline, shaders, and buffer objects. By chapter 5 you can render 2D shapes with custom shaders — exactly what Figma's canvas does.",
      category: "skill", priority: "must", estimated_hours: 4,
      resources: [{ title: "WebGL Fundamentals", url: "https://webglfundamentals.org", type: "article", free: true }],
      addresses_gap: ["webgl / canvas rendering"],
    },
    {
      title: "Build a basic canvas drawing tool with mouse tracking",
      description: "Implement freehand drawing, shape rendering, and a simple selection tool using Canvas 2D API. Forces you to think about coordinate transforms and hit detection — core Figma problems.",
      category: "project", priority: "must", estimated_hours: 3,
      resources: [],
      addresses_gap: ["webgl / canvas rendering"],
    },
    {
      title: "Read Figma's engineering blog posts on multiplayer and WASM",
      description: "Figma has published detailed articles on how they built LiveGraph (multiplayer) and their WASM rendering pipeline. These come up directly in interviews.",
      category: "interview_prep", priority: "must", estimated_hours: 2,
      resources: [{ title: "Figma Engineering Blog", url: "https://www.figma.com/blog/section/engineering/", type: "article", free: true }],
      addresses_gap: ["real-time collaboration/crdts", "webassembly"],
    },
  ],
  weeks: [
    {
      week_number: 1, theme: "WebGL crash course",
      milestone: "Can explain the GPU rendering pipeline and write basic fragment shaders.",
      tasks: [
        { title: "WebGL Fundamentals — complete all chapters", description: "Work through the full tutorial. The later chapters on textures and framebuffers map directly to how Figma handles image fills and effects.", category: "skill", priority: "must", estimated_hours: 8, resources: [{ title: "WebGL Fundamentals", url: "https://webglfundamentals.org", type: "article", free: true }], addresses_gap: ["webgl / canvas rendering"] },
        { title: "Implement a simple 2D scene graph", description: "Nodes with transforms, parent-child relationships, and a flat render loop. This is Figma's document model in miniature.", category: "project", priority: "must", estimated_hours: 4, resources: [], addresses_gap: ["webgl / canvas rendering"] },
      ],
    },
    {
      week_number: 2, theme: "Performance & collaboration",
      milestone: "Can build a performant canvas renderer with dirty rect optimization and explain CRDT trade-offs.",
      tasks: [
        { title: "Add dirty rect optimization to your canvas project", description: "Only re-render changed regions. Figma's performance relies heavily on this pattern — being able to implement it shows you understand rendering cost.", category: "project", priority: "must", estimated_hours: 5, resources: [], addresses_gap: ["browser performance profiling", "webgl / canvas rendering"] },
        { title: "Read the CRDT primer and Figma's LiveGraph post", description: "Understand operation-based vs state-based CRDTs. Figma built their own — the blog post explains why off-the-shelf solutions didn't work.", category: "skill", priority: "must", estimated_hours: 3, resources: [{ title: "CRDT.tech", url: "https://crdt.tech", type: "article", free: true }], addresses_gap: ["real-time collaboration/crdts"] },
      ],
    },
    {
      week_number: 3, theme: "Interview preparation",
      milestone: "Can discuss Figma's rendering architecture and a real-time collab design from first principles.",
      tasks: [
        { title: "Mock interview: design a collaborative vector editor", description: "Scope the data model, rendering loop, sync layer, and conflict resolution. This is the hardest likely system design question.", category: "interview_prep", priority: "must", estimated_hours: 2, resources: [], addresses_gap: ["real-time collaboration/crdts"] },
        { title: "Prepare frontend performance war stories", description: "Prepare 2 examples: one where you identified and fixed a significant performance bottleneck, one where you made a component dramatically simpler.", category: "interview_prep", priority: "must", estimated_hours: 2, resources: [], addresses_gap: ["browser performance profiling"] },
      ],
    },
  ],
  market_snapshot: {
    role_title: "Senior Frontend Engineer", postings_analyzed: 38,
    demand_trend: "growing", demand_change_pct: 22,
    top_locations: [
      { city: "San Francisco, CA", pct: 0.31 },
      { city: "Remote",            pct: 0.34 },
      { city: "New York, NY",      pct: 0.18 },
      { city: "Austin, TX",        pct: 0.09 },
    ],
    job_type_split: { remote: 0.34, hybrid: 0.44, onsite: 0.22 },
    top_required_skills: [
      { skill: "typescript",             frequency: 0.95, is_required: true  },
      { skill: "react",                  frequency: 0.92, is_required: true  },
      { skill: "webgl / canvas",         frequency: 0.88, is_required: true  },
      { skill: "performance optimization",frequency: 0.74, is_required: true  },
      { skill: "css / design systems",   frequency: 0.69, is_required: true  },
    ],
    top_nice_to_have_skills: [
      { skill: "real-time / crdts",      frequency: 0.68, is_required: false },
      { skill: "webassembly",            frequency: 0.44, is_required: false },
      { skill: "rust",                   frequency: 0.35, is_required: false },
    ],
    common_tools: ["TypeScript", "React", "WebGL", "WebAssembly", "Figma", "Storybook", "Chrome DevTools", "Jest"],
  },
};

const PLAN_4 = {
  generated_at: "2026-04-25T15:00:00",
  candidate_summary: `ML engineer with 3 years building and deploying NLP pipelines. Comfortable with PyTorch and HuggingFace for inference and small-model fine-tuning. Significant gaps in production LLM systems: no RLHF implementation, no evals infrastructure, and limited experience shipping models at OpenAI's throughput. Strong engineering foundations, but the delta to Applied AI Engineer is substantial and will require deliberate preparation across 4 weeks.`,
  target_role: "Applied AI Engineer",
  target_company: "OpenAI",
  total_weeks: 4,
  total_estimated_hours: 35,
  confidence_score: 0.62,
  critical_gaps: [
    { skill: "rlhf / instruction tuning", market_frequency: 0.84, candidate_has: false, effort_level: "high",   priority: "critical",  rationale: "Core alignment methodology. No implementation experience despite familiarity with the concept from papers." },
    { skill: "evals framework design",    market_frequency: 0.81, candidate_has: false, effort_level: "high",   priority: "critical",  rationale: "OpenAI treats evals as infrastructure. Expected to own eval suites for any model shipped." },
    { skill: "production llm serving",    market_frequency: 0.77, candidate_has: true,  effort_level: "medium", priority: "critical",  rationale: "Deployed small models; never managed inference at OpenAI's scale (latency SLOs, KV cache, batching)." },
    { skill: "prompt engineering at scale",market_frequency: 0.71, candidate_has: true,  effort_level: "medium", priority: "critical",  rationale: "Ad-hoc prompting experience; systematic, versioned prompt pipelines at product scale are new." },
  ],
  all_gaps: [
    { skill: "rlhf / instruction tuning", market_frequency: 0.84, candidate_has: false, effort_level: "high",   priority: "critical",  rationale: "Core alignment methodology. No implementation experience despite familiarity with the concept from papers." },
    { skill: "evals framework design",    market_frequency: 0.81, candidate_has: false, effort_level: "high",   priority: "critical",  rationale: "OpenAI treats evals as infrastructure. Expected to own eval suites for any model shipped." },
    { skill: "production llm serving",    market_frequency: 0.77, candidate_has: true,  effort_level: "medium", priority: "critical",  rationale: "Deployed small models; never managed inference at OpenAI's scale (latency SLOs, KV cache, batching)." },
    { skill: "prompt engineering at scale",market_frequency: 0.71, candidate_has: true,  effort_level: "medium", priority: "critical",  rationale: "Ad-hoc prompting experience; systematic, versioned prompt pipelines at product scale are new." },
    { skill: "multi-modal models",        market_frequency: 0.58, candidate_has: false, effort_level: "medium", priority: "important", rationale: "GPT-4V context expected; no hands-on experience with vision-language model architectures or evals." },
    { skill: "llm safety / alignment basics",market_frequency: 0.52, candidate_has: false, effort_level: "medium", priority: "important", rationale: "Alignment awareness expected at this level; red-teaming and refusal tuning are unfamiliar domains." },
    { skill: "jax / tpu training",        market_frequency: 0.41, candidate_has: false, effort_level: "high",   priority: "optional",  rationale: "OpenAI uses custom training infra; JAX context is useful but not a near-term requirement." },
    { skill: "distributed training",      market_frequency: 0.39, candidate_has: true,  effort_level: "medium", priority: "optional",  rationale: "Has PyTorch DDP experience; multi-node large-scale training at OpenAI's parameter counts is a stretch." },
  ],
  quick_wins: [
    {
      title: "Read the InstructGPT paper and summarise the RLHF pipeline",
      description: "Write a 1-page summary of the 3-stage pipeline: SFT, reward model training, PPO fine-tuning. Use your own words. This is the most-referenced paper in Applied AI interviews.",
      category: "skill", priority: "must", estimated_hours: 2,
      resources: [{ title: "InstructGPT paper (arXiv)", url: "https://arxiv.org/abs/2203.02155", type: "article", free: true }],
      addresses_gap: ["rlhf / instruction tuning"],
    },
    {
      title: "Build a minimal evals harness for a GPT-4o task",
      description: "Pick a task (e.g. summarization), write 20 test cases with expected outputs, implement a scoring function, and run it. Small but concrete — shows you understand evals as code.",
      category: "project", priority: "must", estimated_hours: 3,
      resources: [{ title: "OpenAI Evals (GitHub)", url: "https://github.com/openai/evals", type: "docs", free: true }],
      addresses_gap: ["evals framework design"],
    },
    {
      title: "Set up a versioned prompt pipeline for a multi-turn task",
      description: "Use a config file to manage prompt versions, track outputs, and diff results between prompt changes. This is what 'prompt engineering at scale' means in practice.",
      category: "skill", priority: "must", estimated_hours: 2,
      resources: [],
      addresses_gap: ["prompt engineering at scale"],
    },
  ],
  weeks: [
    {
      week_number: 1, theme: "RLHF & alignment foundations",
      milestone: "Can explain the full RLHF pipeline and compare it to DPO in a technical conversation.",
      tasks: [
        { title: "Read InstructGPT, DPO, and Constitutional AI papers", description: "These three papers cover the landscape of instruction tuning. Note where they agree and disagree on the reward model's role.", category: "skill", priority: "must", estimated_hours: 5, resources: [{ title: "InstructGPT", url: "https://arxiv.org/abs/2203.02155", type: "article", free: true }, { title: "DPO paper", url: "https://arxiv.org/abs/2305.18290", type: "article", free: true }], addresses_gap: ["rlhf / instruction tuning", "llm safety / alignment basics"] },
        { title: "Implement a toy reward model training loop", description: "Use a small HuggingFace model and 50 preference pairs. The goal is to touch the code, not build production-quality infra.", category: "project", priority: "must", estimated_hours: 4, resources: [{ title: "TRL library", url: "https://huggingface.co/docs/trl", type: "docs", free: true }], addresses_gap: ["rlhf / instruction tuning"] },
      ],
    },
    {
      week_number: 2, theme: "Evals infrastructure",
      milestone: "Have a working evals harness with at least 3 task types and automated scoring.",
      tasks: [
        { title: "Build a production-grade evals harness", description: "Cover: task definition, dataset management, model runner, scoring functions, and a result dashboard. This is the project to show in interviews.", category: "project", priority: "must", estimated_hours: 8, resources: [{ title: "OpenAI Evals", url: "https://github.com/openai/evals", type: "docs", free: true }], addresses_gap: ["evals framework design"] },
        { title: "Study LLM serving architecture", description: "KV caching, continuous batching, speculative decoding, and quantization. These come up in system design rounds for Applied AI roles.", category: "skill", priority: "should", estimated_hours: 3, resources: [{ title: "vLLM paper", url: "https://arxiv.org/abs/2309.06180", type: "article", free: true }], addresses_gap: ["production llm serving"] },
      ],
    },
    {
      week_number: 3, theme: "Applied projects & multi-modal",
      milestone: "Have shipped a fine-tuned model with end-to-end evals. Can discuss vision-language architecture trade-offs.",
      tasks: [
        { title: "Fine-tune a small model end-to-end on a custom task", description: "Use LoRA + TRL. The task doesn't matter — what matters is going through the full SFT loop with evals before and after.", category: "project", priority: "must", estimated_hours: 6, resources: [{ title: "TRL SFT Trainer", url: "https://huggingface.co/docs/trl/sft_trainer", type: "docs", free: true }], addresses_gap: ["rlhf / instruction tuning", "evals framework design"] },
        { title: "Multi-modal models primer", description: "Read the LLaVA and GPT-4V technical reports. Focus on the vision encoder + language model interface — that's where interview questions land.", category: "skill", priority: "should", estimated_hours: 3, resources: [{ title: "LLaVA paper", url: "https://arxiv.org/abs/2304.08485", type: "article", free: true }], addresses_gap: ["multi-modal models"] },
      ],
    },
    {
      week_number: 4, theme: "Interview prep & positioning",
      milestone: "Can confidently walk through an LLM fine-tuning pipeline from data to deployment in any format.",
      tasks: [
        { title: "Write up your fine-tuning project as a technical case study", description: "Document: task definition, data, training decisions, eval results, and what you'd do differently. This is your anchor example for every technical question.", category: "project", priority: "must", estimated_hours: 2, resources: [], addresses_gap: ["rlhf / instruction tuning", "evals framework design"] },
        { title: "Full mock interview — ML design + evals + coding", description: "Cover: design an RLHF pipeline, walk through your evals harness, solve a prompt-engineering problem live.", category: "interview_prep", priority: "must", estimated_hours: 2, resources: [], addresses_gap: [] },
      ],
    },
  ],
  market_snapshot: {
    role_title: "Applied AI Engineer", postings_analyzed: 54,
    demand_trend: "growing", demand_change_pct: 67,
    top_locations: [
      { city: "San Francisco, CA", pct: 0.44 },
      { city: "Remote",            pct: 0.31 },
      { city: "New York, NY",      pct: 0.11 },
      { city: "Boston, MA",        pct: 0.07 },
    ],
    job_type_split: { remote: 0.31, hybrid: 0.52, onsite: 0.17 },
    top_required_skills: [
      { skill: "python",                    frequency: 0.97, is_required: true  },
      { skill: "pytorch",                   frequency: 0.91, is_required: true  },
      { skill: "llm fine-tuning / rlhf",    frequency: 0.84, is_required: true  },
      { skill: "evals design",              frequency: 0.81, is_required: true  },
      { skill: "prompt engineering",        frequency: 0.76, is_required: true  },
      { skill: "distributed training",      frequency: 0.63, is_required: true  },
    ],
    top_nice_to_have_skills: [
      { skill: "multi-modal models",        frequency: 0.58, is_required: false },
      { skill: "llm safety / alignment",    frequency: 0.52, is_required: false },
      { skill: "jax",                       frequency: 0.41, is_required: false },
      { skill: "quantization / serving",    frequency: 0.38, is_required: false },
    ],
    common_tools: ["Python", "PyTorch", "HuggingFace", "TRL", "Weights & Biases", "OpenAI API", "Ray", "CUDA"],
  },
};

// Lookup map — keyed by MOCK_PLANS id
export const MOCK_ROADMAPS = { "1": PLAN_1, "2": PLAN_2, "3": PLAN_3, "4": PLAN_4 };

// Keep as named export for any direct import that still uses it
export const MOCK_ROADMAP = PLAN_1;

// --- Engine activity log (RunAgent view) ------------------------------------

export const MOCK_ENGINE_LOG = [
  { step: "parser",  time: "14:22:01", msg: "Extracting text from resume.pdf",                     type: "info"    },
  { step: "parser",  time: "14:22:03", msg: "LLM call: claude-haiku-4-5 (2.1k tokens)",           type: "llm"     },
  { step: "parser",  time: "14:22:06", msg: "Profile extracted — 8 skills, 12 technologies",       type: "success" },
  { step: "parser",  time: "14:22:07", msg: "CandidateProfile built: 5 yrs exp, 3 work entries",   type: "success" },
  { step: "market",  time: "14:22:09", msg: "Analyzing job postings for target role",              type: "info"    },
  { step: "market",  time: "14:22:13", msg: "LLM call: claude-sonnet-4-6 (5.3k tokens)",          type: "llm"     },
  { step: "market",  time: "14:22:19", msg: "MarketSnapshot built — required skills identified",   type: "success" },
  { step: "market",  time: "14:22:21", msg: "Running gap analysis against candidate profile",      type: "info"    },
  { step: "market",  time: "14:22:24", msg: "Gaps computed — critical, important, and optional",   type: "success" },
  { step: "roadmap", time: "14:22:26", msg: "Building roadmap prompt",                             type: "info"    },
  { step: "roadmap", time: "14:22:28", msg: "LLM call: claude-sonnet-4-6 (8.7k tokens)",          type: "llm"     },
  { step: "roadmap", time: "14:22:39", msg: "Generated quick wins and weekly tasks",               type: "success" },
  { step: "roadmap", time: "14:22:41", msg: "RoadmapPlan complete",                                type: "success" },
];

// --- History / archive rows -------------------------------------------------

export const MOCK_ARCHIVE = [
  { id: "5", target_company: "Scale AI",     target_role: "ML Engineer",      generated_at: "2026-03-15T10:00:00", outcome: "offer",    confidence_score: 0.92 },
  { id: "6", target_company: "Cohere",       target_role: "Research Engineer", generated_at: "2026-02-28T14:00:00", outcome: "rejected", confidence_score: 0.78 },
  { id: "7", target_company: "Hugging Face", target_role: "ML Infrastructure", generated_at: "2026-01-12T11:00:00", outcome: "offer",    confidence_score: 0.88 },
  { id: "8", target_company: "Mistral",      target_role: "Researcher",        generated_at: "2025-12-08T13:00:00", outcome: "withdrew", confidence_score: 0.65 },
];
