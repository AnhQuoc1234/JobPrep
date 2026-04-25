// All mock data lives here. Replace each export with an API call when wiring backend.

export const MOCK_BRIEFINGS = [
  {
    id: "1", company: "Anthropic", role: "ML Research Engineer",
    interviewer: "Chris Olah", round: "Final", format: "Onsite",
    date: "2026-04-28T14:00:00", status: "ready", completeness: 94,
    lastUpdated: "2h ago",
  },
  {
    id: "2", company: "Stripe", role: "Staff Software Engineer",
    interviewer: "Patrick Collison", round: "1st Round", format: "Video",
    date: "2026-04-26T10:00:00", status: "ready", completeness: 87,
    lastUpdated: "1d ago",
  },
  {
    id: "3", company: "Figma", role: "Senior Frontend Engineer",
    interviewer: "Dylan Field", round: "Panel", format: "Onsite",
    date: "2026-05-02T11:00:00", status: "outdated", completeness: 71,
    lastUpdated: "8d ago",
  },
  {
    id: "4", company: "OpenAI", role: "Applied AI Engineer",
    interviewer: null, round: "1st Round", format: "Video",
    date: "2026-05-08T15:00:00", status: "draft", completeness: 32,
    lastUpdated: "3d ago",
  },
];

export const MOCK_AGENT_LOG = [
  { agent: "browser",  time: "14:22:01", msg: "Initializing Firecrawl session", type: "info" },
  { agent: "browser",  time: "14:22:03", msg: "GET anthropic.com/careers → 200 OK", type: "success" },
  { agent: "browser",  time: "14:22:05", msg: "Extracting role description for ML Research Engineer", type: "info" },
  { agent: "browser",  time: "14:22:08", msg: "GET linkedin.com/in/colah → 200 OK", type: "success" },
  { agent: "browser",  time: "14:22:11", msg: "GET glassdoor.com/Reviews/Anthropic → 200 OK", type: "success" },
  { agent: "browser",  time: "14:22:14", msg: "Found 47 interview reviews mentioning interpretability", type: "info" },
  { agent: "browser",  time: "14:22:17", msg: "GET levels.fyi/companies/anthropic → 200 OK", type: "success" },
  { agent: "research", time: "14:22:22", msg: "Synthesizing 23 sources into company profile", type: "info" },
  { agent: "research", time: "14:22:28", msg: "LLM call: claude-opus-4-7 (4.2k tokens)", type: "llm" },
  { agent: "research", time: "14:22:34", msg: "Extracted 12 culture signals from Glassdoor", type: "success" },
  { agent: "research", time: "14:22:38", msg: "Ranking news by interview relevance score", type: "info" },
  { agent: "strategy", time: "14:22:45", msg: "Cross-referencing resume with job description", type: "info" },
  { agent: "strategy", time: "14:22:51", msg: "LLM call: claude-opus-4-7 (8.7k tokens)", type: "llm" },
  { agent: "strategy", time: "14:22:58", msg: "Generated 3 STAR stories matched to behavioral patterns", type: "success" },
  { agent: "strategy", time: "14:23:02", msg: "Streaming strategy memo...", type: "info" },
];

export const MOCK_SOURCES = [
  { url: "anthropic.com/careers", count: 4, agent: "browser" },
  { url: "linkedin.com/in/colah", count: 8, agent: "browser" },
  { url: "glassdoor.com/Reviews/Anthropic", count: 12, agent: "browser" },
  { url: "levels.fyi/companies/anthropic", count: 3, agent: "browser" },
  { url: "arxiv.org/abs/2401.xxxxx", count: 6, agent: "browser" },
  { url: "techcrunch.com/2026/...", count: 2, agent: "browser" },
];

export const MOCK_NEWS = [
  {
    title: "Anthropic releases Claude Opus 4.7 with breakthrough reasoning capabilities",
    source: "TechCrunch", date: "2 days ago", relevance: 96,
    tip: "Mention this when asked about staying current — shows you follow the company's research.",
  },
  {
    title: "Anthropic raises $4B Series F led by Lightspeed at $61.5B valuation",
    source: "Bloomberg", date: "5 days ago", relevance: 89,
    tip: "Use this to ask about scaling research teams — shows commercial awareness.",
  },
  {
    title: "New interpretability paper: 'Circuit-level feature attribution in transformers'",
    source: "arXiv", date: "1 week ago", relevance: 94,
    tip: "If interviewer is on this paper, reference a specific finding from section 3.2.",
  },
  {
    title: "Anthropic announces partnership with major financial institutions",
    source: "Reuters", date: "2 weeks ago", relevance: 67,
    tip: "Useful context if asked about applied research vs pure science.",
  },
];

export const MOCK_QUESTIONS_TO_ASK = [
  { q: "How does the interpretability team decide which circuits to prioritize investigating?", why: "Shows you understand the practical research bottleneck, not just the theory." },
  { q: "What's the feedback loop between safety research and product deployment?", why: "Threads research depth with commercial reality — rare combination." },
  { q: "How has the team's mental model of mech-interp changed in the last 12 months?", why: "Signals you read the recent papers and care about evolving paradigms." },
];

export const MOCK_LIKELY_QUESTIONS = [
  { q: "Walk me through how you'd reverse-engineer a small transformer's behavior on a specific task.", category: "Technical Deep-Dive" },
  { q: "Tell me about a time you disagreed with a senior researcher's approach.", category: "Behavioral" },
  { q: "What recent paper has changed how you think about LLM internals?", category: "Research Awareness" },
  { q: "How would you design an experiment to measure feature superposition?", category: "Research Design" },
];

export const MOCK_STAR_STORIES = [
  {
    title: "Reverse-engineered attention pattern in production model",
    s: "Production sentiment classifier was misclassifying sarcasm 31% of the time.",
    t: "Identify the failure mode at the circuit level, not just retrain.",
    a: "Used activation patching across 800 examples, found a single attention head over-weighting negation tokens. Patched the head's output and validated.",
    r: "Reduced sarcasm error rate to 8%. Wrote internal post that became standard debug methodology.",
    matchedTo: "Technical Deep-Dive question",
  },
  {
    title: "Pushed back on premature scaling decision",
    s: "Team wanted to 10x training compute on architecture I believed was flawed.",
    t: "Convince senior staff without burning political capital.",
    a: "Ran small-scale ablation in 48hrs showing the bottleneck. Presented data, not opinion. Proposed alternative.",
    r: "Saved ~$2M in compute. Alternative architecture became the basis for next quarter's roadmap.",
    matchedTo: "Behavioral question on disagreement",
  },
];

export const MOCK_INTERVIEWER = {
  name: "Chris Olah",
  initials: "CO",
  title: "Co-founder, Interpretability Lead",
  facts: [
    { label: "Tenure", value: "~4 yrs at Anthropic" },
    { label: "Prior", value: "OpenAI, Google Brain" },
    { label: "Notable", value: "Distill.pub founder" },
    { label: "Recent paper", value: '"Circuits in superposition" (2026)' },
  ],
  styleSignals: [
    { signal: "Asks about a paper, then probes one finding deeply", weight: "high" },
    { signal: "Tests epistemic honesty — says 'I don't know' often, expects you to also", weight: "high" },
    { signal: "Dislikes hype words: 'AGI', 'revolutionary', 'paradigm shift'", weight: "medium" },
    { signal: "Likely to ask about a recent failed experiment of yours", weight: "medium" },
  ],
};

export const MOCK_CULTURE_KEYWORDS = [
  "Research-first", "Direct feedback", "High autonomy", "Slow hiring",
  "Safety-focused", "Long context", "Async-friendly", "Paper-driven",
];

export const MOCK_KPIS = [
  { label: "Valuation", value: "$61.5B" },
  { label: "Headcount", value: "~1,200" },
  { label: "Founded", value: "2021" },
  { label: "Funding raised", value: "$8.6B" },
  { label: "Glassdoor", value: "4.6 ★" },
  { label: "Interview difficulty", value: "4.4 / 5" },
];

export const MOCK_MEMO = `Anthropic is interviewing for an interpretability-focused ML Research Engineer role, and Chris Olah will be your final-round interviewer. The bar is research depth, not breadth.

POSITIONING ANGLE
Lead with your reverse-engineering of the sentiment classifier — it's the closest thing in your background to mech-interp work and demonstrates the exact mode of thinking Olah's team values: surgical, hypothesis-driven, willing to go past "it works" into "I know why."

WHAT THE INTERVIEWER WILL PROBE
Olah's interview style, based on Glassdoor patterns and his published talks, is to start broad ("what paper changed how you think?") then pull on a specific thread until you hit the limit of your understanding. He's not testing whether you know everything — he's testing whether you know where your knowledge ends.

HOW TO STAND OUT
Reference the recent circuits work (specifically the feature attribution paper from this month) — but only if you've actually read it. Don't bluff. The way to differentiate: when he asks the inevitable "what would you do differently?" question on a paper, give a concrete experimental design, not a critique.

ONE RISK TO MITIGATE
Your background skews applied/production. Frame this as an asset (you've debugged real models under pressure) but be ready for the implicit question: "why research now?" Have a 30-second answer that's about the work, not the credentialing.`;

export const MOCK_WATCHOUTS = [
  "Don't oversell academic credentials — Olah values output over pedigree.",
  "If asked about safety, avoid corporate-speak. Be specific.",
  "Final round = compensation discussion likely. Have a number ready.",
];

export const MOCK_ARCHIVE = [
  { id: "5", company: "Scale AI", role: "ML Engineer", date: "2026-03-15T10:00:00", outcome: "offer", completeness: 92 },
  { id: "6", company: "Cohere", role: "Research Engineer", date: "2026-02-28T14:00:00", outcome: "rejected", completeness: 78 },
  { id: "7", company: "Hugging Face", role: "ML Infrastructure", date: "2026-01-12T11:00:00", outcome: "offer", completeness: 88 },
  { id: "8", company: "Mistral", role: "Researcher", date: "2025-12-08T13:00:00", outcome: "withdrew", completeness: 65 },
];
