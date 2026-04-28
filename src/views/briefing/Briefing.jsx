import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import MemoTab from "./tabs/MemoTab";
import CompanyTab from "./tabs/CompanyTab";
import CompTab from "./tabs/CompTab";
import InterviewerTab from "./tabs/InterviewerTab";
import QuestionsTab from "./tabs/QuestionsTab";
import StoriesTab from "./tabs/StoriesTab";
import NewsTab from "./tabs/NewsTab";
import { ghostBtn } from "../../utils/style";

const TABS = [
  { id: "memo",        label: "Strategy memo" },
  { id: "company",     label: "Company" },
  { id: "comp",        label: "Compensation" },
  { id: "interviewer", label: "Interviewer" },
  { id: "questions",   label: "Questions" },
  { id: "stories",     label: "STAR stories" },
  { id: "news",        label: "News" },
];

export default function Briefing({ onBack }) {
  const [tab, setTab] = useState("memo");

  return (
    <div style={{ padding: "40px 48px", maxWidth: 1400 }}>
      <PageHeader
        eyebrow="BRIEFING / RUN_24A7B"
        title="Anthropic · ML Research Engineer"
        subtitle="Final round · Chris Olah · Onsite"
        action={
          <button onClick={onBack} style={ghostBtn}>
            <ArrowLeft size={14} /> Back
          </button>
        }
      />

      {/* Tab bar */}
      <div style={{
        display: "flex", gap: 4,
        borderBottom: "1px solid var(--border-subtle)",
        marginBottom: 24,
      }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: "10px 16px",
              background: "none",
              border: "none",
              borderBottom: tab === t.id
                ? "2px solid var(--accent)"
                : "2px solid transparent",
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

      {/* Tab content */}
      {tab === "memo"        && <MemoTab />}
      {tab === "company"     && <CompanyTab />}
      {tab === "comp"        && <CompTab />}
      {tab === "interviewer" && <InterviewerTab />}
      {tab === "questions"   && <QuestionsTab />}
      {tab === "stories"     && <StoriesTab />}
      {tab === "news"        && <NewsTab />}
    </div>
  );
}
