import { useState, useEffect, useRef } from "react";
import { FileText, BarChart2, Map, Terminal, TrendingDown, Play, Pause, ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import AgentCard from "../components/AgentCard";
import LogLine from "../components/LogLine";
import PanelHeader from "../components/PanelHeader";
import { primaryBtn, ghostBtn } from "../utils/style";
import { MOCK_ENGINE_LOG, MOCK_ROADMAP } from "../data/mockData";

// Live engine pipeline view — Parser → Market → Roadmap.
// Production: replace setInterval with a WebSocket / SSE stream that pushes
// { step, progress, logEntry } events.

export default function RunAgent({ onComplete }) {
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState({ parser: 100, market: 55, roadmap: 15 });
  const [logIdx, setLogIdx] = useState(4);
  const logRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setLogIdx((i) => Math.min(i + 1, MOCK_ENGINE_LOG.length));
      setProgress((p) => ({
        parser:  100,
        market:  Math.min(100, p.market  + 6),
        roadmap: Math.min(100, p.roadmap + 4),
      }));
    }, 800);
    return () => clearInterval(t);
  }, [paused]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logIdx]);

  return (
    <div style={{ padding: "40px 48px", maxWidth: 1400 }}>
      <PageHeader
        eyebrow="RUNNING / PLAN_001"
        title={
          <span>
            Engine working{" "}
            <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", animation: "blink-caret 1s infinite" }}>▊</span>
          </span>
        }
        subtitle="Parser → Market → Roadmap. Pause anytime."
        action={
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setPaused(!paused)} style={ghostBtn}>
              {paused ? <><Play size={14} /> Resume</> : <><Pause size={14} /> Pause</>}
            </button>
            <button onClick={onComplete} style={primaryBtn}>
              View roadmap <ArrowRight size={14} />
            </button>
          </div>
        }
      />

      {/* Pipeline strip */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
        <AgentCard
          name="Parser"
          subtitle="pdfplumber · claude-haiku-4-5"
          color="var(--browser)"
          icon={FileText}
          progress={progress.parser}
          tasks={[
            { name: "Extract text from PDF",               done: true },
            { name: "LLM call: structure extraction",      done: true },
            { name: "Build CandidateProfile",              done: true },
            { name: "Normalise skills to lowercase",       done: true },
          ]}
        />
        <AgentCard
          name="Market"
          subtitle="gap analysis · claude-sonnet-4-6"
          color="var(--research)"
          icon={BarChart2}
          progress={progress.market}
          active={progress.market < 100}
          tasks={[
            { name: "Fetch job postings for role",         done: progress.market > 20 },
            { name: "Extract skill signals",               done: progress.market > 45, active: progress.market > 20 && progress.market < 60 },
            { name: "Build MarketSnapshot",                done: progress.market > 70 },
            { name: "Run gap analysis",                    done: progress.market > 90 },
          ]}
        />
        <AgentCard
          name="Roadmap"
          subtitle="generator · claude-sonnet-4-6"
          color="var(--strategy)"
          icon={Map}
          progress={progress.roadmap}
          active={progress.roadmap < 100}
          tasks={[
            { name: "Prioritise gaps by effort",           done: progress.roadmap > 15, active: progress.roadmap > 5 && progress.roadmap < 25 },
            { name: "Generate quick wins",                 done: progress.roadmap > 45 },
            { name: "Build week-by-week plan",             done: progress.roadmap > 75 },
            { name: "Write candidate summary",             done: progress.roadmap >= 100 },
          ]}
        />
      </div>

      {/* Activity log + gap preview */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16 }}>
        <ActivityLog logRef={logRef} logIdx={logIdx} paused={paused} />
        <GapPreview marketProgress={progress.market} />
      </div>
    </div>
  );
}

function ActivityLog({ logRef, logIdx, paused }) {
  return (
    <div style={{ background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", borderRadius: 8, overflow: "hidden" }}>
      <PanelHeader icon={Terminal} title="Activity log" tag="REAL-TIME" />
      <div
        ref={logRef}
        style={{ padding: 16, fontFamily: "var(--font-mono)", fontSize: 12, maxHeight: 380, overflowY: "auto", lineHeight: 1.7 }}
      >
        {MOCK_ENGINE_LOG.slice(0, logIdx).map((entry, i) => (
          <LogLine key={i} entry={entry} />
        ))}
        {logIdx < MOCK_ENGINE_LOG.length && !paused && (
          <div style={{ color: "var(--fg-muted)", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "var(--accent)", animation: "blink-caret 1s infinite" }}>▊</span>
            processing...
          </div>
        )}
      </div>
    </div>
  );
}

function GapPreview({ marketProgress }) {
  const gaps = MOCK_ROADMAP.all_gaps;
  const visibleCount =
    marketProgress < 50 ? 0 :
    marketProgress < 70 ? 2 :
    marketProgress < 90 ? 5 : gaps.length;

  const visible = gaps.slice(0, visibleCount);

  const PRIORITY_COLOR = {
    critical:  "var(--danger)",
    important: "var(--warning)",
    optional:  "var(--fg-muted)",
  };

  return (
    <div style={{ background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", borderRadius: 8, overflow: "hidden" }}>
      <PanelHeader icon={TrendingDown} title="Gap preview" tag={visibleCount > 0 ? `${visibleCount} FOUND` : "PENDING"} />
      <div style={{ padding: 16, maxHeight: 380, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
        {visible.length === 0 && (
          <div style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)", fontSize: 12, paddingTop: 8 }}>
            Waiting for market analysis...
          </div>
        )}
        {visible.map((g, i) => (
          <div
            key={i}
            style={{
              padding: "10px 12px",
              background: "var(--bg-base)",
              border: `1px solid ${PRIORITY_COLOR[g.priority]}22`,
              borderLeft: `2px solid ${PRIORITY_COLOR[g.priority]}`,
              borderRadius: "0 4px 4px 0",
              animation: "fade-in-up 0.3s",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{g.skill}</span>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
                color: PRIORITY_COLOR[g.priority], letterSpacing: "0.1em",
              }}>
                {g.priority.toUpperCase()}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ flex: 1, height: 3, background: "var(--border-subtle)", borderRadius: 2 }}>
                <div style={{ height: "100%", width: `${g.market_frequency * 100}%`, background: PRIORITY_COLOR[g.priority], borderRadius: 2 }} />
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-muted)" }}>
                {Math.round(g.market_frequency * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
