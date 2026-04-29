// Page header used at the top of every view: small mono eyebrow, big serif title,
// optional subtitle and right-aligned action slot.

export default function PageHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "flex-end",
      marginBottom: 32, gap: 24, flexWrap: "wrap",
    }}>
      <div>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600,
          color: "var(--fg-muted)", letterSpacing: "0.15em", marginBottom: 8,
        }}>
          {eyebrow}
        </div>
        <h1 style={{
          fontFamily: "var(--font-serif)", fontSize: 44, fontWeight: 600,
          margin: 0, letterSpacing: "-0.025em", lineHeight: 1,
        }}>
          {title}
        </h1>
        {subtitle && (
          <div style={{ fontSize: 14, color: "var(--fg-secondary)", marginTop: 10 }}>
            {subtitle}
          </div>
        )}
      </div>
      {action}
    </div>
  );
}
