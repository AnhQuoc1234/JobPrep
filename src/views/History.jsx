import { ChevronRight, Filter, Search } from "lucide-react";
import PageHeader from "../components/PageHeader";
import OutcomeTag from "../components/OutcomeTag";
import { ghostBtn } from "../utils/style";
import { formatDate } from "../utils/time";
import { MOCK_PLANS, MOCK_ARCHIVE } from "../data/mockData";

const COLS = "2fr 2fr 1.4fr 1fr 1fr 60px";

export default function History({ onOpen }) {
  const active  = MOCK_PLANS.map((p) => ({ ...p, outcome: "active" }));
  const all     = [...active, ...MOCK_ARCHIVE];

  return (
    <div style={{ padding: "40px 48px", maxWidth: 1400 }}>
      <PageHeader
        eyebrow={`ARCHIVE / ${all.length} PLANS`}
        title="Plan archive"
        subtitle="All roadmaps generated, with outcomes when tagged."
        action={
          <div style={{ display: "flex", gap: 8 }}>
            <button style={ghostBtn}><Filter size={14} /> Filter</button>
            <button style={ghostBtn}><Search size={14} /> Search</button>
          </div>
        }
      />

      <div style={{ background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", borderRadius: 8, overflow: "hidden" }}>
        <TableHeader />
        {all.map((row, i) => (
          <TableRow key={row.id} row={row} isLast={i === all.length - 1} onClick={() => onOpen(row.id)} />
        ))}
      </div>
    </div>
  );
}

function TableHeader() {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: COLS,
      padding: "12px 20px",
      background: "var(--bg-elevated)",
      borderBottom: "1px solid var(--border-subtle)",
      fontFamily: "var(--font-mono)", fontSize: 10,
      color: "var(--fg-muted)", letterSpacing: "0.1em", fontWeight: 600,
    }}>
      <span>COMPANY</span>
      <span>ROLE</span>
      <span>GENERATED</span>
      <span>OUTCOME</span>
      <span>CONFIDENCE</span>
      <span></span>
    </div>
  );
}

function TableRow({ row, isLast, onClick }) {
  const outcome = row.outcome || "active";
  const confidencePct = Math.round((row.confidence_score || 0) * 100);

  return (
    <div
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      style={{
        display: "grid", gridTemplateColumns: COLS,
        padding: "16px 20px", alignItems: "center",
        borderBottom: isLast ? "none" : "1px solid var(--border-subtle)",
        cursor: "pointer", transition: "background 0.15s", fontSize: 13,
      }}
    >
      <span style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600 }}>
        {row.target_company}
      </span>
      <span style={{ color: "var(--fg-secondary)" }}>{row.target_role}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-muted)" }}>
        {formatDate(row.generated_at)}
      </span>
      <OutcomeTag outcome={outcome} />
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-secondary)" }}>
        {confidencePct}%
      </span>
      <ChevronRight size={14} style={{ color: "var(--fg-muted)" }} />
    </div>
  );
}
