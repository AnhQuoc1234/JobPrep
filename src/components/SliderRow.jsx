import { useState } from "react";

export default function SliderRow({ label, value: defaultValue, min, max }) {
  const [value, setValue] = useState(Number(defaultValue));

  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      paddingBottom: 12, borderBottom: "1px solid var(--border-subtle)",
    }}>
      <div style={{ fontSize: 13, fontWeight: 500 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          style={{ width: 120, accentColor: "var(--accent)" }}
        />
        <span style={{
          fontSize: 12, fontFamily: "var(--font-mono)",
          color: "var(--fg-secondary)", minWidth: 32, textAlign: "right",
        }}>
          {value}
        </span>
      </div>
    </div>
  );
}
