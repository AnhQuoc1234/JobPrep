import { Plus } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Stat from "../components/Stat";
import BriefingCard from "../components/BriefingCard";
import { primaryBtn } from "../utils/style";
import { MOCK_BRIEFINGS } from "../data/mockData";

export default function Dashboard({ onOpen, onNew }) {
  // Stats derived from the briefings list
  const upcoming = MOCK_BRIEFINGS.filter((b) => new Date(b.date) > new Date()).length;
  const thisWeek = MOCK_BRIEFINGS.filter((b) => {
    const d = new Date(b.date);
    const now = new Date();
    return d > now && d - now < 7 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div style={{ padding: "40px 48px", maxWidth: 1400 }}>
      <PageHeader
        eyebrow="DASHBOARD / 04"
        title="Active briefings"
        subtitle="Every interview, weaponized with context."
        action={
          <button onClick={onNew} style={primaryBtn}>
            <Plus size={15} /> New briefing
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
        <Stat label="Total briefings" value="24" delta="+3 this week" />
        <Stat label="Interviews upcoming" value={upcoming} delta={`${thisWeek} this week`} accent />
        <Stat label="Avg completeness" value="89%" delta="+4% vs last mo" />
        <Stat label="Win rate" value="62%" delta="based on 13 outcomes" />
      </div>

      {/* Cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: 16,
      }}>
        {MOCK_BRIEFINGS.map((b, i) => (
          <BriefingCard
            key={b.id}
            briefing={b}
            onClick={() => onOpen(b.id)}
            delay={i * 60}
          />
        ))}
        <NewBriefingTile onClick={onNew} />
      </div>
    </div>
  );
}

function NewBriefingTile({ onClick }) {
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
      Start new briefing
    </button>
  );
}
