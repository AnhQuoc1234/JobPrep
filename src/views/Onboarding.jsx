import { useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Field from "../components/Field";
import ResumeDropzone from "../components/ResumeDropzone";
import { inputStyle, primaryBtn, ghostBtn } from "../utils/styles";

// 3-step onboarding wizard. State is local — on submit, POST `form`
// to your /agents/run endpoint and call onComplete().

export default function Onboarding({ onComplete, onBack }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    company: "", role: "", date: "",
    interviewer: "", round: "1st Round", format: "Video",
    focus: "", resume: null,
  });

  const titles = {
    1: "Job context",
    2: "Interview details",
    3: "Your background",
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(form); // pass form data up when done
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
        subtitle="The agents need this to do real work, not generic prep."
      />

      {/* Stepper */}
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
        {step === 1 && <Step1 form={form} setForm={setForm} />}
        {step === 2 && <Step2 form={form} setForm={setForm} />}
        {step === 3 && <Step3 form={form} setForm={setForm} />}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
        <button onClick={handleBack} style={ghostBtn}>
          {step > 1 ? "Back" : "Cancel"}
        </button>
        <button onClick={handleNext} style={primaryBtn}>
          {step < 3 ? <>Continue <ArrowRight size={14} /></> : <>Run agents <Zap size={14} /></>}
        </button>
      </div>
    </div>
  );
}

// --- Steps ------------------------------------------------------------------

function Step1({ form, setForm }) {
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
      <Field label="Role / title" required mono="02">
        <input
          type="text" placeholder="e.g. ML Research Engineer"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          style={inputStyle}
        />
      </Field>
      <Field label="Interview date & time" required mono="03">
        <input
          type="datetime-local"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          style={inputStyle}
        />
      </Field>
    </div>
  );
}

function Step2({ form, setForm }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Field
        label="Interviewer"
        mono="04"
        hint="Name or LinkedIn URL — agent resolves automatically"
      >
        <input
          type="text"
          placeholder="e.g. linkedin.com/in/colah  or  Chris Olah"
          value={form.interviewer}
          onChange={(e) => setForm({ ...form, interviewer: e.target.value })}
          style={inputStyle}
        />
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Round" mono="05">
          <select
            value={form.round}
            onChange={(e) => setForm({ ...form, round: e.target.value })}
            style={inputStyle}
          >
            <option>1st Round</option>
            <option>Technical</option>
            <option>Behavioral</option>
            <option>Panel</option>
            <option>Final</option>
          </select>
        </Field>
        <Field label="Format" mono="06">
          <select
            value={form.format}
            onChange={(e) => setForm({ ...form, format: e.target.value })}
            style={inputStyle}
          >
            <option>Video</option>
            <option>Phone</option>
            <option>Onsite</option>
          </select>
        </Field>
      </div>
      <Field
        label="Declared focus area"
        mono="07"
        hint="What did the recruiter say this round will cover?"
      >
        <input
          type="text"
          placeholder="e.g. system design, leadership, ML infra"
          value={form.focus}
          onChange={(e) => setForm({ ...form, focus: e.target.value })}
          style={inputStyle}
        />
      </Field>
    </div>
  );
}

function Step3({ form, setForm }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Field
        label="Resume"
        required
        mono="08"
        hint="PDF or LinkedIn export. Used to match your background to talking points."
      >
        <ResumeDropzone
          resume={form.resume}
          setResume={(r) => setForm({ ...form, resume: r })}
        />
      </Field>
    </div>
  );
}
