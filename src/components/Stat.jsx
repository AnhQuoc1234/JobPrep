// Single stat cell used in the dashboard top strip.

export default function Stat({ label, value, delta, accent = false }) {
  return (
    <div style={{
      padding: "20px 24px",
      background: accent ? "var(--bg-elevated)" : "var(--bg-panel)",
    }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 10,
        color: "var(--fg-muted)", letterSpacing: "0.1em",
        marginBottom: 8, textTransform: "uppercase",
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 600,
        letterSpacing: "-0.02em", lineHeight: 1,
        color: accent ? "var(--accent)" : "var(--fg-primary)",
      }}>
        {value}
      </div>
      <div style={{
        fontSize: 11, color: "var(--fg-muted)", marginTop: 6,
        fontFamily: "var(--font-mono)",
      }}>
        {delta}
      </div>
    </div>
  );
}
