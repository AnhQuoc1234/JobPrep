// Compact relevance score with a small bar — used on news cards.

export default function RelevanceMeter({ score }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "flex-end",
      gap: 4, flexShrink: 0,
    }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-muted)",
      }}>
        RELEVANCE
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{
          width: 60, height: 4, background: "var(--bg-base)", borderRadius: 2,
        }}>
          <div style={{
            height: "100%", width: `${score}%`,
            background: "var(--accent)", borderRadius: 2,
          }} />
        </div>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600,
          color: "var(--accent)",
        }}>
          {score}
        </span>
      </div>
    </div>
  );
}
