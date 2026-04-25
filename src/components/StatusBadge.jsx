// Tiny status pill for agent state (queued/running/done).
// The "running" variant gets a pulsing dot.

const STATUS_MAP = {
  waiting: { label: "QUEUED", getColor: () => "var(--fg-muted)" },
  running: { label: "RUNNING", getColor: (color) => color },
  done:    { label: "DONE",    getColor: () => "var(--success)" },
};

export default function StatusBadge({ status, color }) {
  const cfg = STATUS_MAP[status];
  const c = cfg.getColor(color);

  return (
    <span style={{
      fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
      letterSpacing: "0.1em", color: c,
      padding: "3px 7px", borderRadius: 3,
      background: c + "12", border: `1px solid ${c}33`,
      display: "inline-flex", alignItems: "center", gap: 5,
    }}>
      {status === "running" && (
        <span style={{
          width: 5, height: 5, borderRadius: "50%", background: c,
          animation: "pulse-dot 1s infinite",
        }} />
      )}
      {cfg.label}
    </span>
  );
}
