import { Send } from "lucide-react";
import { inputStyle, primaryBtn, ghostBtn } from "../utils/styles";

// Modal for the human-in-the-loop steering pattern.
// User pauses the agent, then injects context before research synthesizes.

export default function SteerModal({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 100, animation: "fade-in-up 0.2s",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-panel)",
          border: "1px solid var(--border-strong)",
          borderRadius: 10,
          padding: 28, width: 480,
        }}
      >
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-muted)",
          letterSpacing: "0.15em", marginBottom: 6,
        }}>
          STEER / HUMAN-IN-THE-LOOP
        </div>
        <div style={{
          fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 600,
          marginBottom: 6, letterSpacing: "-0.01em",
        }}>
          Inject context
        </div>
        <div style={{ fontSize: 13, color: "var(--fg-secondary)", marginBottom: 16 }}>
          The research agent is paused. Add steering before synthesis.
        </div>
        <textarea
          placeholder="e.g. Focus heavily on interpretability research. Skip marketing news. Weight Glassdoor signals from the last 6mo only."
          style={{
            ...inputStyle,
            minHeight: 100,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
          }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
          <button onClick={onClose} style={ghostBtn}>Cancel</button>
          <button onClick={onClose} style={primaryBtn}>
            Apply & resume <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
