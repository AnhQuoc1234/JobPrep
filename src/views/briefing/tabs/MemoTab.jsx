import { useState, useEffect } from "react";
import { Sparkles, TrendingUp } from "lucide-react";
import PanelHeader from "../../../components/PanelHeader";
import KPI from "../../../components/KPI";

export default function MemoTab({ plan }) {
  const { candidate_summary, total_weeks, total_estimated_hours, confidence_score, critical_gaps, all_gaps } = plan;
  const [text, setText] = useState("");

  useEffect(() => {
    setText("");
    let i = 0;
    const t = setInterval(() => {
      i += 4;
      setText(candidate_summary.slice(0, i));
      if (i >= candidate_summary.length) clearInterval(t);
    }, 12);
    return () => clearInterval(t);
  }, [candidate_summary]);

  const confidencePct  = Math.round(confidence_score * 100);
  const importantGaps  = all_gaps.filter((g) => g.priority === "important").length;
  const confidenceColor =
    confidencePct >= 80 ? "var(--accent)" :
    confidencePct >= 60 ? "var(--warning)" : "var(--danger)";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
      {/* Summary panel */}
      <div style={{ background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", borderRadius: 8, overflow: "hidden" }}>
        <PanelHeader icon={Sparkles} title="Candidate summary" tag="RESUME PARSER · HAIKU" />
        <div style={{ padding: 28, fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 1.8, color: "var(--fg-primary)", whiteSpace: "pre-wrap" }}>
          {text}
          {text.length < candidate_summary.length && (
            <span style={{ color: "var(--accent)", animation: "blink-caret 1s infinite" }}>▊</span>
          )}
        </div>
      </div>

      {/* KPI panel */}
      <div style={{ background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", borderRadius: 8, overflow: "hidden" }}>
        <PanelHeader icon={TrendingUp} title="Plan overview" />
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>
          <KPI label="Confidence"      value={<span style={{ color: confidenceColor }}>{confidencePct}%</span>} />
          <KPI label="Total weeks"     value={`${total_weeks} weeks`} />
          <KPI label="Estimated hours" value={`${total_estimated_hours} hrs`} />
          <KPI label="Critical gaps"   value={<span style={{ color: "var(--danger)" }}>{critical_gaps.length}</span>} />
          <KPI label="Important gaps"  value={importantGaps} />
        </div>
      </div>
    </div>
  );
}
