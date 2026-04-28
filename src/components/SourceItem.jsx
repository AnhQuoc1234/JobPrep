import { Link2 } from "lucide-react";

export default function SourceItem({ url, count, agent }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "8px 10px",
      background: "var(--bg-base)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 6,
    }}>
      <Link2 size={12} style={{ color: "var(--fg-muted)", flexShrink: 0 }} />
      <span style={{
        flex: 1, fontSize: 12, fontFamily: "var(--font-mono)",
        color: "var(--fg-secondary)", overflow: "hidden",
        textOverflow: "ellipsis", whiteSpace: "nowrap",
      }}>
        {url}
      </span>
      <span style={{
        fontSize: 10, fontFamily: "var(--font-mono)",
        color: "var(--fg-muted)", flexShrink: 0,
      }}>
        {count}p
      </span>
    </div>
  );
}
