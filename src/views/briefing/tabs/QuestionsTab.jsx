import { MessageSquare, Target } from "lucide-react";
import PanelHeader from "../../../components/PanelHeader";
import { MOCK_QUESTIONS_TO_ASK, MOCK_LIKELY_QUESTIONS } from "../../../data/mockData";

// Two side-by-side panels:
// - Left: smart questions for the candidate to ask, with rationale
// - Right: predicted questions the interviewer will ask

export default function QuestionsTab() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <QuestionsToAskPanel />
      <LikelyQuestionsPanel />
    </div>
  );
}

function QuestionsToAskPanel() {
  return (
    <div style={{
      background: "var(--bg-panel)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 8, overflow: "hidden",
    }}>
      <PanelHeader
        icon={MessageSquare}
        title="Questions to ask"
        tag="SMART, NOT FILLER"
      />
      <div style={{ padding: 8 }}>
        {MOCK_QUESTIONS_TO_ASK.map((q, i) => (
          <AskItem
            key={i}
            index={i}
            question={q}
            isLast={i === MOCK_QUESTIONS_TO_ASK.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function AskItem({ index, question, isLast }) {
  return (
    <div style={{
      padding: 16,
      borderBottom: isLast ? "none" : "1px solid var(--border-subtle)",
    }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)",
          flexShrink: 0, paddingTop: 2,
        }}>
          Q{String(index + 1).padStart(2, "0")}
        </span>
        <div style={{ fontSize: 14, lineHeight: 1.5, fontWeight: 500 }}>
          {question.q}
        </div>
      </div>
      <div style={{
        marginLeft: 32, fontSize: 12, color: "var(--fg-muted)",
        lineHeight: 1.5, fontStyle: "italic", fontFamily: "var(--font-serif)",
      }}>
        ↳ {question.why}
      </div>
    </div>
  );
}

function LikelyQuestionsPanel() {
  return (
    <div style={{
      background: "var(--bg-panel)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 8, overflow: "hidden",
    }}>
      <PanelHeader
        icon={Target}
        title="Likely to be asked"
        tag="PREDICTED · BASED ON ROLE + STYLE"
      />
      <div style={{ padding: 8 }}>
        {MOCK_LIKELY_QUESTIONS.map((q, i) => (
          <LikelyItem
            key={i}
            question={q}
            isLast={i === MOCK_LIKELY_QUESTIONS.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function LikelyItem({ question, isLast }) {
  return (
    <div style={{
      padding: 16,
      borderBottom: isLast ? "none" : "1px solid var(--border-subtle)",
    }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
        color: "var(--strategy)", letterSpacing: "0.1em",
        marginBottom: 6, textTransform: "uppercase",
      }}>
        {question.category}
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.5 }}>
        {question.q}
      </div>
    </div>
  );
}
