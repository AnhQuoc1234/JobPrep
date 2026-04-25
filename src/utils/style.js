// Shared inline style objects used across the app.
// Kept as JS objects (not CSS classes) so each component can spread/override easily.

export const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  background: "var(--bg-base)",
  border: "1px solid var(--border-strong)",
  borderRadius: 6,
  color: "var(--fg-primary)",
  fontSize: 14,
  fontFamily: "var(--font-body)",
  outline: "none",
};

export const primaryBtn = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "10px 16px",
  background: "var(--accent)",
  color: "var(--accent-text)",
  border: "none",
  borderRadius: 6,
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "var(--font-body)",
  transition: "transform 0.1s",
};

export const ghostBtn = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "10px 14px",
  background: "var(--bg-elevated)",
  color: "var(--fg-primary)",
  border: "1px solid var(--border-strong)",
  borderRadius: 6,
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: "var(--font-body)",
};

// STAR story label (S/T/A/R color blocks)
export const starLabel = (color) => ({
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  fontWeight: 700,
  color,
  padding: "2px 8px",
  borderRadius: 3,
  background: color + "12",
  border: `1px solid ${color}33`,
  height: "fit-content",
  letterSpacing: "0.05em",
});
