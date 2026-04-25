import { User, Eye } from "lucide-react";
import PanelHeader from "../../../components/PanelHeader";
import ConfidencePill from "../../../components/ConfidencePill";
import { MOCK_INTERVIEWER } from "../../../data/mockData";

// Interviewer dossier — left panel = identity & facts,
// right panel = scraped interview-style signals from Glassdoor.

export default function InterviewerTab() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 16 }}>
      <DossierPanel />
      <StyleSignalsPanel />
    </div>
  );
}

function DossierPanel() {
  const { name, initials, title, facts } = MOCK_INTERVIEWER;
  return (
    <div style={{
      background: "var(--bg-panel)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 8, overflow: "hidden",
    }}>
      <PanelHeader icon={User} title="Dossier" tag="LINKEDIN + ARXIV" />
      <div style={{ padding: 24 }}>
        {/* Avatar */}
        <div style={{
          width: 64, height: 64, borderRadius: 8,
          background: "linear-gradient(135deg, var(--research), var(--browser))",
          marginBottom: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 600,
        }}>
          {initials}
        </div>

        <div style={{
          fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 600,
          letterSpacing: "-0.01em",
        }}>
          {name}
        </div>
        <div style={{ fontSize: 13, color: "var(--fg-secondary)", marginBottom: 16 }}>
          {title}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {facts.map((f, i) => (
            <FactRow key={i} label={f.label} value={f.value} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FactRow({ label, value }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between",
      paddingBottom: 8, borderBottom: "1px solid var(--border-subtle)",
      fontSize: 12,
    }}>
      <span style={{
        color: "var(--fg-muted)", fontFamily: "var(--font-mono)",
        textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 10,
      }}>
        {label}
      </span>
      <span style={{ color: "var(--fg-primary)", textAlign: "right" }}>
        {value}
      </span>
    </div>
  );
}

function StyleSignalsPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{
        background: "var(--bg-panel)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 8, overflow: "hidden",
      }}>
        <PanelHeader
          icon={Eye}
          title="Interview style signals"
          tag="GLASSDOOR · 12 MENTIONS"
        />
        <div style={{
          padding: 20, display: "flex",
          flexDirection: "column", gap: 12,
        }}>
          {MOCK_INTERVIEWER.styleSignals.map((s, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between",
              gap: 12, alignItems: "flex-start",
            }}>
              <div style={{
                fontSize: 13, lineHeight: 1.5, color: "var(--fg-secondary)",
              }}>
                → {s.signal}
              </div>
              <ConfidencePill level={s.weight} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
