import { useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Field from "../components/Field";
import ResumeDropzone from "../components/ResumeDropzone";
import { inputStyle, primaryBtn, ghostBtn } from "../utils/style";

// 3-step onboarding. Captures exactly what the engine needs:
// Step 1 → target_role + target_company (market_research + generator)
// Step 2 → weeks (generator)
// Step 3 → resume PDF (resume_parser)

export default function Onboarding({ onComplete, onBack }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    company: "", role: "",
    weeks: "4", goal: "",
    resume: null,
  });

  const titles = { 1: "Target", 2: "Timeline", 3: "Your resume" };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(form);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  return (
    <div style={{ padding: "40px 48px", maxWidth: 720 }}>
      <PageHeader
        eyebrow={`STEP ${step} OF 3`}
        title={titles[step]}
        subtitle="The engine needs this to build a real roadmap, not a generic one."
      />

      {/* Progress bar */}
      <div style={{ display: "flex", gap: 4, marginBottom: 32 }}>
        {[1, 2, 3].map((n) => (
          <div key={n} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: n <= step ? "var(--accent)" : "var(--border-subtle)",
            transition: "background 0.3s",
          }} />
        ))}
      </div>

      <div style={{
        background: "var(--bg-panel)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 8,
        padding: 28,
      }}>
        {step === 1 && <StepTarget form={form} setForm={setForm} />}
        {step === 2 && <StepTimeline form={form} setForm={setForm} />}
        {step === 3 && <StepResume form={form} setForm={setForm} />}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
        <button onClick={handleBack} style={ghostBtn}>
          {step > 1 ? "Back" : "Cancel"}
        </button>
        <button onClick={handleNext} style={primaryBtn}>
          {step < 3 ? <>Continue <ArrowRight size={14} /></> : <>Run engine <Zap size={14} /></>}
        </button>
      </div>
    </div>
  );
}

function StepTarget({ form, setForm }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Field label="Company" required mono="01">
        <input
          type="text" placeholder="e.g. Anthropic"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          style={inputStyle}
        />
      </Field>
      <Field label="Role / title" required mono="02" hint="Used to pull market data and skill signals for this specific role.">
        <input
          type="text" placeholder="e.g. ML Research Engineer"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          style={inputStyle}
        />
      </Field>
    </div>
  );
}

const WEEK_OPTIONS = [
  { value: "2", label: "2 weeks" },
  { value: "3", label: "3 weeks" },
  { value: "4", label: "4 weeks" },
  { value: "6", label: "6 weeks" },
  { value: "8", label: "8 weeks" },
];

function StepTimeline({ form, setForm }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Field label="Prep time available" required mono="03" hint="The roadmap will fit all tasks within this window.">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {WEEK_OPTIONS.map(({ value, label }) => {
            const active = form.weeks === value;
            return (
              <button
                key={value}
                onClick={() => setForm({ ...form, weeks: value })}
                style={{
                  padding: "8px 16px",
                  background: active ? "var(--accent)" : "var(--bg-base)",
                  color: active ? "var(--accent-text)" : "var(--fg-secondary)",
                  border: `1px solid ${active ? "var(--accent)" : "var(--border-strong)"}`,
                  borderRadius: 6, cursor: "pointer",
                  fontFamily: "var(--font-mono)", fontSize: 12,
                  transition: "all 0.15s",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </Field>
      <Field label="Goal or context" mono="04" hint="Optional. Any extra context that should shape the roadmap.">
        <textarea
          placeholder="e.g. focusing on system design, already know Python well, interview is in 3 weeks"
          value={form.goal}
          onChange={(e) => setForm({ ...form, goal: e.target.value })}
          rows={3}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
        />
      </Field>
    </div>
  );
}

function StepResume({ form, setForm }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Field
        label="Resume"
        required
        mono="05"
        hint="PDF only. The parser extracts skills, experience, and education to run the gap analysis."
      >
        <ResumeDropzone
          resume={form.resume}
          setResume={(r) => setForm({ ...form, resume: r })}
        />
      </Field>
    </div>
  );
}
