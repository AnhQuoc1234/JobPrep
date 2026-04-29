import { Plus } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Stat from "../components/Stat";
import PlanCard from "../components/BriefingCard";
import { primaryBtn } from "../utils/style";
import { MOCK_PLANS } from "../data/mockData";

export default function Dashboard({ onOpen, onNew }) {
  const totalHours = MOCK_PLANS.reduce((s, p) => s + p.total_estimated_hours, 0);
  const totalGaps  = MOCK_PLANS.reduce((s, p) => s + p.critical_gaps_count, 0);
  const avgConf    = Math.round(MOCK_PLANS.reduce((s, p) => s + p.confidence_score, 0) / MOCK_PLANS.length * 100);

  return (
    <div style={{ padding: "40px 48px", maxWidth: 1400 }}>
      <PageHeader
        eyebrow="DASHBOARD / 04"
        title="Prep plans"
        subtitle="Every target role, analyzed and roadmapped."
        action={
          <button onClick={onNew} style={primaryBtn}>
            <Plus size={15} /> New plan
          </button>
        }
      />

      {/* Stats strip */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1,
        background: "var(--border-subtle)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 8, overflow: "hidden",
        marginBottom: 32,
      }}>
        <Stat label="Total plans"    value={MOCK_PLANS.length}           delta="across all targets" />
        <Stat label="Critical gaps"  value={totalGaps}                   delta="across active plans" accent />
        <Stat label="Hours planned"  value={`${totalHours}h`}            delta="total prep time" />
        <Stat label="Avg confidence" value={`${avgConf}%`}               delta="based on market data" />
      </div>

      {/* Cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: 16,
      }}>
        {MOCK_PLANS.map((p, i) => (
          <PlanCard key={p.id} plan={p} onClick={() => onOpen(p.id)} delay={i * 60} />
        ))}
        <NewPlanTile onClick={onNew} />
      </div>
    </div>
  );
}

function NewPlanTile({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        minHeight: 220,
        background: "transparent",
        border: "1px dashed var(--border-strong)",
        borderRadius: 8,
        color: "var(--fg-muted)",
        cursor: "pointer",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 8,
        fontFamily: "var(--font-body)", fontSize: 13,
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.color = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-strong)";
        e.currentTarget.style.color = "var(--fg-muted)";
      }}
    >
      <Plus size={24} strokeWidth={1.5} />
      Start new plan
    </button>
  );
}
