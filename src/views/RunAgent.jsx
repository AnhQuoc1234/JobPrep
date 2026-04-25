import { useState, useEffect, useRef } from "react";
import {
  Globe, Brain, Sparkles, Terminal, Link2,
  Play, Pause, Edit3, ArrowRight, RotateCw,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import AgentCard from "../components/AgentCard";
import LogLine from "../components/LogLine";
import SourceItem from "../components/SourceItem";
import PanelHeader from "../components/PanelHeader";
import SteerModal from "../components/SteerModal";
import { primaryBtn, ghostBtn } from "../utils/styles";
import { MOCK_AGENT_LOG, MOCK_SOURCES } from "../data/mockData";

// Live agent pipeline view. Shows the three-step flow:
// Browser → Research → Strategy.
//
// Production wiring: replace the setInterval below with a WebSocket / SSE
// stream that pushes { agent, progress, taskUpdates, logEntry } events.

export default function RunAgent({ onComplete }) {
  const [paused, setPaused] = useState(false);
  const [steerOpen, setSteerOpen] = useState(false);
  const [progress, setProgress] = useState({
    browser: 100, research: 65, strategy: 20,
  });
  const [logIdx, setLogIdx] = useState(8);
  const logRef = useRef(null);

  // Simulated progress tick — swap for real event stream
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setLogIdx((i) => Math.min(i + 1, MOCK_AGENT_LOG.length));
      setProgress((p) => ({
        browser: 100,
        research: Math.min(100, p.research + 5),
        strategy: Math.min(100, p.strategy + 4),
      }));
    }, 800);
    return () => clearInterval(t);
  }, [paused]);

  // Auto-scroll the log feed
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logIdx]);

  return (
    <div style={{ padding: "40px 48px", maxWidth: 1400 }}>
      <PageHeader
        eyebrow="LIVE / RUN_24A7B"
        title={
          <span>
            Agents working{" "}
            <span style={{
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
              animation: "blink-caret 1s infinite",
            }}>▊</span>
          </span>
        }
        subtitle="Browser → Research → Strategy. Pause to steer."
        action={
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setPaused(!paused)} style={ghostBtn}>
              {paused ? <><Play size={14} /> Resume</> : <><Pause size={14} /> Pause</>}
            </button>
            <button onClick={() => setSteerOpen(true)} style={ghostBtn}>
              <Edit3 size={14} /> Steer
            </button>
            <button onClick={onComplete} style={primaryBtn}>
              View briefing <ArrowRight size={14} />
            </button>
          </div>
        }
      />

      {/* Pipeline strip */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        gap: 16, marginBottom: 24,
      }}>
        <AgentCard
          name="Browser"
          subtitle="Firecrawl · 23 sources"
          color="var(--browser)"
          icon={Globe}
          progress={progress.browser}
          tasks={[
            { name: "Fetch company careers page", done: true },
            { name: "Resolve interviewer LinkedIn", done: true },
            { name: "Scrape Glassdoor reviews", done: true },
            { name: "Pull Levels.fyi compensation", done: true },
            { name: "Fetch recent news (60d window)", done: true },
          ]}
        />
        <AgentCard
          name="Research"
          subtitle="Synthesis · opus-4.7"
          color="var(--research)"
          icon={Brain}
          progress={progress.research}
          active={progress.research < 100}
          tasks={[
            { name: "Cluster sources by topic", done: progress.research > 30 },
            { name: "Extract culture signals", done: progress.research > 50 },
            { name: "Rank news by relevance", done: progress.research > 70, active: progress.research > 50 && progress.research < 90 },
            { name: "Compute confidence scores", done: progress.research > 90 },
          ]}
        />
        <AgentCard
          name="Strategy"
          subtitle="Streaming · opus-4.7"
          color="var(--strategy)"
          icon={Sparkles}
          progress={progress.strategy}
          active={progress.strategy < 100}
          tasks={[
            { name: "Match resume to role", done: progress.strategy > 20, active: progress.strategy > 5 && progress.strategy < 30 },
            { name: "Generate STAR stories", done: progress.strategy > 50 },
            { name: "Predict likely questions", done: progress.strategy > 75 },
            { name: "Write strategy memo", done: progress.strategy >= 100 },
          ]}
        />
      </div>

      {/* Activity log + source citations */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16 }}>
        <ActivityLog logRef={logRef} logIdx={logIdx} paused={paused} />
        <SourcePanel />
      </div>

      {steerOpen && <SteerModal onClose={() => setSteerOpen(false)} />}
    </div>
  );
}

// --- Sub-panels -------------------------------------------------------------

function ActivityLog({ logRef, logIdx, paused }) {
  return (
    <div style={{
      background: "var(--bg-panel)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 8, overflow: "hidden",
    }}>
      <PanelHeader icon={Terminal} title="Activity log" tag="REAL-TIME" />
      <div
        ref={logRef}
        style={{
          padding: 16, fontFamily: "var(--font-mono)", fontSize: 12,
          maxHeight: 380, overflowY: "auto", lineHeight: 1.7,
        }}
      >
        {MOCK_AGENT_LOG.slice(0, logIdx).map((entry, i) => (
          <LogLine key={i} entry={entry} />
        ))}
        {logIdx < MOCK_AGENT_LOG.length && !paused && (
          <div style={{
            color: "var(--fg-muted)",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <RotateCw size={11} style={{ animation: "spin-slow 1s linear infinite" }} />
            processing...
          </div>
        )}
      </div>
    </div>
  );
}

function SourcePanel() {
  return (
    <div style={{
      background: "var(--bg-panel)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 8, overflow: "hidden",
    }}>
      <PanelHeader icon={Link2} title="Source citations" tag="23 SOURCES" />
      <div style={{
        padding: 16, maxHeight: 380, overflowY: "auto",
        display: "flex", flexDirection: "column", gap: 10,
      }}>
        {MOCK_SOURCES.map((s, i) => (
          <SourceItem key={i} {...s} />
        ))}
      </div>
    </div>
  );
}
