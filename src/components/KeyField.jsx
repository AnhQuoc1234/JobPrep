import { inputStyle } from "../utils/style";

// Password-style input for API keys. Shows a SET badge when populated.
// In production, keys should be stored in localStorage (per spec: "never sent to a server").

export default function KeyField({ label, placeholder, set }) {
  return (
    <div>
      <div style={{
        display: "flex", justifyContent: "space-between", marginBottom: 6,
      }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>{label}</span>
        {set && (
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
            color: "var(--success)", letterSpacing: "0.1em",
            padding: "2px 6px", borderRadius: 3,
            background: "var(--success)" + "12",
            border: "1px solid var(--success)33",
          }}>
            SET
          </span>
        )}
      </div>
      <input
        type="password"
        placeholder={placeholder}
        defaultValue={set ? "••••••••••••••••••" : ""}
        style={inputStyle}
      />
    </div>
  );
}
