import { useState, useEffect } from "react";
import { Sparkles, TrendingUp } from "lucide-react";
import PanelHeader from "../../../components/PanelHeader";
import KPI from "../../../components/KPI";
import { MOCK_ROADMAP } from "../../../data/mockData";

// Summary tab — streams the candidate summary with section-aware formatting.
// Right column shows plan-level KPIs from the RoadmapPlan schema.

const { candidate_summary, total_weeks, total_estimated_hours, confidence_score, critical_gaps, all_gaps } = MOCK_ROADMAP;

export default function MemoTab() {
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i += 4;
      setText(candidate_summary.slice(0, i));
      if (i >= candidate_summary.length) clearInterval(t);
    }, 12);
    return () => clearInterval(t);
  }, []);

  const confidencePct = Math.round(confidence_score * 100);
  const importantGaps = all_gaps.filter((g) => g.priority === "important").length;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
      <SummaryPanel text={text} full={candidate_summary} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <PlanKPIs confidencePct={confidencePct} importantGaps={importantGaps} />
      </div>
    </div>
  );
}

function SummaryPanel({ text, full }) {
  const isStreaming = text.length < full.length;
  return (
    <div style={{ background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", borderRadius: 8, overflow: "hidden" }}>
      <PanelHeader icon={Sparkles} title="Candidate summary" tag="RESUME PARSER · HAIKU" />
      <div style={{
        padding: 28,
        fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 1.8,
        color: "var(--fg-primary)", whiteSpace: "pre-wrap",
      }}>
        {text}
        {isStreaming && (
          <span style={{ color: "var(--accent)", animation: "blink-caret 1s infinite" }}>▊</span>
        )}
      </div>
    </div>
  );
}

function PlanKPIs({ confidencePct, importantGaps }) {
  const confidenceColor =
    confidencePct >= 80 ? "var(--accent)" :
    confidencePct >= 60 ? "var(--warning)" : "var(--danger)";

  return (
    <div style={{ background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", borderRadius: 8, overflow: "hidden" }}>
      <PanelHeader icon={TrendingUp} title="Plan overview" />
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>
        <KPI label="Confidence" value={<span style={{ color: confidenceColor }}>{confidencePct}%</span>} />
        <KPI label="Total weeks"         value={`${total_weeks} weeks`} />
        <KPI label="Estimated hours"     value={`${total_estimated_hours} hrs`} />
        <KPI label="Critical gaps"       value={<span style={{ color: "var(--danger)" }}>{critical_gaps.length}</span>} />
        <KPI label="Important gaps"      value={importantGaps} />
      </div>
    </div>
  );
}
