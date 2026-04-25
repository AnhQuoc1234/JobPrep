import { useState } from "react";

// Labelled toggle switch row. Used for source toggles in Settings.

export default function ToggleRow({ label, desc, on: defaultOn }) {
  const [on, setOn] = useState(defaultOn);

  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      paddingBottom: 12, borderBottom: "1px solid var(--border-subtle)",
    }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 11, color: "var(--fg-muted)", marginTop: 2 }}>
          {desc}
        </div>
      </div>
      <button
        onClick={() => setOn(!on)}
        style={{
          width: 36, height: 20, borderRadius: 10,
          background: on ? "var(--accent)" : "var(--border-strong)",
          border: "none", padding: 2, cursor: "pointer",
          position: "relative", transition: "background 0.15s",
        }}
      >
        <div style={{
          width: 16, height: 16, borderRadius: "50%",
          background: on ? "var(--accent-text)" : "var(--fg-secondary)",
          transform: on ? "translateX(16px)" : "translateX(0)",
          transition: "transform 0.15s",
        }} />
      </button>
    </div>
  );
}
