import { useState, useEffect } from "react";
import { Sparkles, TrendingUp, AlertTriangle } from "lucide-react";
import PanelHeader from "../../../components/PanelHeader";
import KPI from "../../../components/KPI";
import { MOCK_MEMO, MOCK_WATCHOUTS } from "../../../data/mockData";

// The headline tab — streaming strategy memo with section headers.
// Production: replace the typewriter useEffect with a real LLM token stream
// (e.g. Anthropic Messages API streaming, push tokens into setText).

export default function MemoTab() {
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i += 4;
      setText(MOCK_MEMO.slice(0, i));
      if (i >= MOCK_MEMO.length) clearInterval(t);
    }, 15);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
      <MemoPanel text={text} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <KPIBlock />
        <WatchOutsBlock />
      </div>
    </div>
  );
}

function MemoPanel({ text }) {
  const isStreaming = text.length < MOCK_MEMO.length;

  return (
    <div style={{
      background: "var(--bg-panel)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 8, overflow: "hidden",
    }}>
      <PanelHeader icon={Sparkles} title="Strategy memo" tag="STREAMING · OPUS-4.7" />
      <div style={{
        padding: 28,
        fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 1.7,
        color: "var(--fg-primary)",
        whiteSpace: "pre-wrap",
      }}>
        {text.split("\n").map((line, i) => {
          // Detect section headers (ALL CAPS lines)
          const isHeader = line.match(/^[A-Z][A-Z\s]+$/) && line.length > 3;
          if (isHeader) {
            return (
              <div key={i} style={{
                fontFamily: "var(--font-mono)", fontSize: 11,
                color: "var(--accent)", letterSpacing: "0.15em",
                marginTop: 24, marginBottom: 8, fontWeight: 600,
              }}>
                {line}
              </div>
            );
          }
          return <span key={i}>{line}{"\n"}</span>;
        })}
        {isStreaming && (
          <span style={{
            color: "var(--accent)",
            animation: "blink-caret 1s infinite",
          }}>▊</span>
        )}
      </div>
    </div>
  );
}

function KPIBlock() {
  return (
    <div style={{
      background: "var(--bg-panel)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 8, overflow: "hidden",
    }}>
      <PanelHeader icon={TrendingUp} title="Quick stats" />
      <div style={{
        padding: 16,
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
      }}>
        <KPI label="Valuation" value="$61.5B" />
        <KPI label="Headcount" value="~1,200" />
        <KPI label="Glassdoor" value="4.6 ★" />
        <KPI label="Funding" value="Series F" />
      </div>
    </div>
  );
}

function WatchOutsBlock() {
  return (
    <div style={{
      background: "var(--bg-panel)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 8, overflow: "hidden",
    }}>
      <PanelHeader icon={AlertTriangle} title="Watch-outs" />
      <div style={{
        padding: 16, display: "flex",
        flexDirection: "column", gap: 10,
      }}>
        {MOCK_WATCHOUTS.map((w, i) => (
          <div key={i} style={{
            display: "flex", gap: 8,
            fontSize: 12, color: "var(--fg-secondary)", lineHeight: 1.5,
          }}>
            <span style={{ color: "var(--warning)", flexShrink: 0 }}>!</span>
            {w}
          </div>
        ))}
      </div>
    </div>
  );
}
