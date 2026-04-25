// Form field wrapper: numbered eyebrow, label, optional hint.
// Children are the actual <input>, <select>, etc.

export default function Field({ label, required, mono, hint, children }) {
  return (
    <label style={{ display: "block" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
        {mono && (
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-muted)",
          }}>
            {mono}
          </span>
        )}
        <span style={{ fontSize: 13, fontWeight: 500 }}>
          {label} {required && <span style={{ color: "var(--accent)" }}>*</span>}
        </span>
      </div>
      {children}
      {hint && (
        <div style={{
          fontSize: 11, color: "var(--fg-muted)",
          marginTop: 6, fontFamily: "var(--font-mono)",
        }}>
          {hint}
        </div>
      )}
    </label>
  );
}
