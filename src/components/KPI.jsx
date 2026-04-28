// Compact label + value pair for KPI grids inside panels.

export default function KPI({ label, value }) {
  return (
    <div>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 9,
        color: "var(--fg-muted)", letterSpacing: "0.1em", marginBottom: 4,
      }}>
        {label.toUpperCase()}
      </div>
      <div style={{
        fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 600,
        letterSpacing: "-0.01em",
      }}>
        {value}
      </div>
    </div>
  );
}
