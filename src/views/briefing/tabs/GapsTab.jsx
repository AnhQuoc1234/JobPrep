import { AlertTriangle, CheckCircle2 } from "lucide-react";
import PanelHeader from "../../../components/PanelHeader";

const PRIORITY_SECTIONS = [
  { key: "critical",  label: "Critical",  color: "var(--danger)",  icon: AlertTriangle, tag: "MUST CLOSE"   },
  { key: "important", label: "Important", color: "var(--warning)", icon: AlertTriangle, tag: "HIGH VALUE"    },
  { key: "optional",  label: "Optional",  color: "var(--fg-muted)",icon: null,          tag: "NICE TO HAVE" },
];

const EFFORT_MAP = {
  high:   { label: "HIGH EFFORT", color: "var(--danger)"  },
  medium: { label: "MED EFFORT",  color: "var(--warning)" },
  low:    { label: "LOW EFFORT",  color: "var(--success)" },
};

export default function GapsTab({ plan }) {
  const { all_gaps } = plan;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {PRIORITY_SECTIONS.map(({ key, label, color, icon: Icon, tag }) => {
        const gaps = all_gaps.filter((g) => g.priority === key);
        if (gaps.length === 0) return null;
        return (
          <div key={key} style={{ background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", borderRadius: 8, overflow: "hidden" }}>
            <PanelHeader icon={Icon || CheckCircle2} title={label} tag={`${gaps.length} GAPS · ${tag}`} />
            <div style={{ padding: 8 }}>
              {gaps.map((g, i) => (
                <GapRow key={i} gap={g} color={color} isLast={i === gaps.length - 1} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function GapRow({ gap, color, isLast }) {
  const effort = EFFORT_MAP[gap.effort_level] || EFFORT_MAP.medium;

  return (
    <div style={{ padding: "16px 20px", borderBottom: isLast ? "none" : "1px solid var(--border-subtle)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: gap.candidate_has ? "var(--success)" : color, flexShrink: 0 }} />
          <span style={{ fontSize: 15, fontWeight: 600 }}>{gap.skill}</span>
          {gap.candidate_has && (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--success)", letterSpacing: "0.1em" }}>✓ HAVE</span>
          )}
        </div>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
          color: effort.color, letterSpacing: "0.1em",
          padding: "2px 6px", border: `1px solid ${effort.color}44`, borderRadius: 3, flexShrink: 0,
        }}>
          {effort.label}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-muted)", width: 110 }}>MARKET FREQ</span>
        <div style={{ flex: 1, height: 4, background: "var(--bg-base)", borderRadius: 2 }}>
          <div style={{ height: "100%", width: `${gap.market_frequency * 100}%`, background: color, borderRadius: 2, transition: "width 0.5s" }} />
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color, width: 34, textAlign: "right" }}>
          {Math.round(gap.market_frequency * 100)}%
        </span>
      </div>

      <p style={{ fontSize: 12, color: "var(--fg-secondary)", lineHeight: 1.5, margin: 0 }}>{gap.rationale}</p>
    </div>
  );
}
