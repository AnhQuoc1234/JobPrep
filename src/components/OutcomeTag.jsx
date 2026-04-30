// Outcome pill for the archive view.

const OUTCOME_MAP = {
  offer:    { c: "var(--success)",   l: "OFFER" },
  rejected: { c: "var(--danger)",    l: "REJECTED" },
  withdrew: { c: "var(--fg-muted)",  l: "WITHDREW" },
  upcoming: { c: "var(--accent)",    l: "UPCOMING" },
  pending:  { c: "var(--warning)",   l: "PENDING" },
};

export default function OutcomeTag({ outcome }) {
  const { c, l } = OUTCOME_MAP[outcome] || OUTCOME_MAP.pending;
  return (
    <span style={{
      fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
      color: c, letterSpacing: "0.1em",
      padding: "3px 7px", borderRadius: 3,
      background: c + "12", border: `1px solid ${c}33`,
      width: "fit-content",
    }}>
      {l}
    </span>
  );
}
