import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import MemoTab from "./tabs/MemoTab";
import RoadmapTab from "./tabs/RoadmapTab";
import GapsTab from "./tabs/GapsTab";
import MarketTab from "./tabs/MarketTab";
import { ghostBtn } from "../../utils/style";
import { MOCK_ROADMAP } from "../../data/mockData";

const TABS = [
  { id: "memo",    label: "Summary"  },
  { id: "roadmap", label: "Roadmap"  },
  { id: "gaps",    label: "Gaps"     },
  { id: "market",  label: "Market"   },
];

export default function Briefing({ onBack }) {
  const [tab, setTab] = useState("memo");
  const { target_company, target_role, total_weeks, total_estimated_hours, confidence_score } = MOCK_ROADMAP;
  const confidencePct = Math.round(confidence_score * 100);

  return (
    <div style={{ padding: "40px 48px", maxWidth: 1400 }}>
      <PageHeader
        eyebrow="ROADMAP / PLAN_001"
        title={`${target_company} · ${target_role}`}
        subtitle={`${total_weeks} weeks · ${total_estimated_hours} hrs · ${confidencePct}% confidence`}
        action={
          <button onClick={onBack} style={ghostBtn}>
            <ArrowLeft size={14} /> Back
          </button>
        }
      />

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--border-subtle)", marginBottom: 24 }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: "10px 16px",
              background: "none", border: "none",
              borderBottom: tab === t.id ? "2px solid var(--accent)" : "2px solid transparent",
              color: tab === t.id ? "var(--fg-primary)" : "var(--fg-muted)",
              fontSize: 13,
              fontWeight: tab === t.id ? 600 : 400,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              marginBottom: -1,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "memo"    && <MemoTab />}
      {tab === "roadmap" && <RoadmapTab />}
      {tab === "gaps"    && <GapsTab />}
      {tab === "market"  && <MarketTab />}
    </div>
  );
}
