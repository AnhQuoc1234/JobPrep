// HIGH / MED / LOW pill used by the research agent to flag claim reliability.

const CONFIDENCE_MAP = {
  high:   { c: "var(--success)", l: "HIGH" },
  medium: { c: "var(--warning)", l: "MED"  },
  low:    { c: "var(--fg-muted)", l: "LOW" },
};

export default function ConfidencePill({ level }) {
  const { c, l } = CONFIDENCE_MAP[level];
  return (
    <span style={{
      fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
      color: c, letterSpacing: "0.1em",
      padding: "2px 6px", border: `1px solid ${c}55`, borderRadius: 3,
      flexShrink: 0,
    }}>
      {l}
    </span>
  );
}
