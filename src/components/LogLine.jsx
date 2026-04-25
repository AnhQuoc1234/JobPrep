// One line in the terminal-style activity log.
// Color-codes by agent (browser/research/strategy) and message type.

const AGENT_COLOR = {
  browser:  "var(--browser)",
  research: "var(--research)",
  strategy: "var(--strategy)",
};

const TYPE_COLOR = {
  info:    "var(--fg-secondary)",
  success: "var(--success)",
  llm:     "var(--accent)",
  error:   "var(--danger)",
};

export default function LogLine({ entry }) {
  return (
    <div style={{
      display: "flex", gap: 12, alignItems: "flex-start",
      animation: "fade-in-up 0.2s",
    }}>
      <span style={{ color: "var(--fg-muted)", flexShrink: 0 }}>
        {entry.time}
      </span>
      <span style={{
        color: AGENT_COLOR[entry.agent], flexShrink: 0,
        fontWeight: 600, width: 60,
      }}>
        {entry.agent}
      </span>
      <span style={{ color: TYPE_COLOR[entry.type] }}>
        {entry.msg}
      </span>
    </div>
  );
}
