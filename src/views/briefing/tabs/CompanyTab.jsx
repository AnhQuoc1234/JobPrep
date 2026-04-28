import { Sparkles, TrendingUp } from "lucide-react";
import PanelHeader from "../../../components/PanelHeader";
import KPI from "../../../components/KPI";
import { MOCK_CULTURE_KEYWORDS, MOCK_KPIS } from "../../../data/mockData";

// Company profile tab. Two side-by-side panels:
// 1) Culture signals (keyword pills + summary)
// 2) Numbers (KPI grid)

export default function CompanyTab() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <CultureSignalsPanel />
      <NumbersPanel />
    </div>
  );
}

function CultureSignalsPanel() {
  return (
    <div style={{
      background: "var(--bg-panel)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 8, overflow: "hidden",
    }}>
      <PanelHeader icon={Sparkles} title="Culture signals" tag="GLASSDOOR + CAREERS" />

      {/* Keyword pills */}
      <div style={{ padding: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
        {MOCK_CULTURE_KEYWORDS.map((c, i) => (
          <span key={i} style={{
            padding: "6px 12px",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-strong)",
            borderRadius: 100,
            fontSize: 12, fontWeight: 500,
          }}>
            {c}
          </span>
        ))}
      </div>

      {/* Mission / summary text */}
      <div style={{
        padding: "0 20px 20px",
        fontSize: 13, color: "var(--fg-secondary)", lineHeight: 1.6,
      }}>
        <strong style={{ color: "var(--fg-primary)" }}>Mission:</strong>{" "}
        Build reliable, interpretable, and steerable AI systems. The team
        values precise reasoning over fast iteration.{" "}
        <span style={{ color: "var(--accent)" }}>4.6★</span> Glassdoor across
        184 reviews; common positive themes are research depth and quality
        of colleagues. Common friction: slow decision-making, narrow focus.
      </div>
    </div>
  );
}

function NumbersPanel() {
  return (
    <div style={{
      background: "var(--bg-panel)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 8, overflow: "hidden",
    }}>
      <PanelHeader icon={TrendingUp} title="By the numbers" />
      <div style={{
        padding: 20,
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
      }}>
        {MOCK_KPIS.map((k) => (
          <KPI key={k.label} label={k.label} value={k.value} />
        ))}
      </div>
    </div>
  );
}
