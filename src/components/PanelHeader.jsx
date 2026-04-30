// Small header bar used at the top of inner panels (icon + title + optional tag).

export default function PanelHeader({ icon: Icon, title, tag }) {
  return (
    <div style={{
      padding: "12px 16px",
      borderBottom: "1px solid var(--border-subtle)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      background: "var(--bg-elevated)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Icon size={13} style={{ color: "var(--fg-secondary)" }} />
        <span style={{ fontSize: 12, fontWeight: 600 }}>{title}</span>
      </div>
      {tag && (
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
          color: "var(--fg-muted)", letterSpacing: "0.1em",
        }}>
          {tag}
        </span>
      )}
    </div>
  );
}
