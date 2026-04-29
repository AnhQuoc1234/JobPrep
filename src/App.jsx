import { useState } from "react";
import "./styles/global.css";

import Sidebar from "./components/Sidebar";
import Dashboard from "./views/Dashboard";
import Onboarding from "./views/Onboarding";
import RunAgent from "./views/RunAgent";
import Briefing from "./views/briefing/Briefing";
import History from "./views/History";
import { MOCK_ROADMAPS, MOCK_ROADMAP, MOCK_PLANS } from "./data/mockData";

// Pick the best-matching mock roadmap for a role the user typed in Onboarding.
// When the backend is live this whole function goes away.
function pickMockRoadmap(company, role) {
  const co = company.toLowerCase();
  const ro = role.toLowerCase();

  // Exact or partial company match first
  const byCompany = MOCK_PLANS.find(
    (p) => p.target_company.toLowerCase().includes(co) || co.includes(p.target_company.toLowerCase())
  );
  if (byCompany) return MOCK_ROADMAPS[byCompany.id];

  // Role keyword fallback
  if (ro.includes("front") || ro.includes("ui") || ro.includes("react") || ro.includes("css"))
    return MOCK_ROADMAPS["3"];
  if (ro.includes("backend") || ro.includes("software") || ro.includes("infra") || ro.includes("platform"))
    return MOCK_ROADMAPS["2"];
  if (ro.includes("applied") || ro.includes("llm") || ro.includes("ai engineer"))
    return MOCK_ROADMAPS["4"];

  return MOCK_ROADMAP; // default
}

export default function App() {
  const [view, setView]               = useState("dashboard");
  const [currentForm, setCurrentForm] = useState(null);
  const [activePlan, setActivePlan]   = useState(null);

  const handleOnboardingComplete = (form) => {
    setCurrentForm(form);
    setView("run");
  };

  const handleRunComplete = () => {
    const base = pickMockRoadmap(currentForm.company, currentForm.role);
    setActivePlan({
      ...base,
      target_company: currentForm.company,
      target_role:    currentForm.role,
      total_weeks:    parseInt(currentForm.weeks, 10) || 4,
    });
    setView("briefing");
  };

  const openPlan = (id) => {
    const roadmap = MOCK_ROADMAPS[id] || MOCK_ROADMAP;
    const card    = MOCK_PLANS.find((x) => x.id === id);
    setActivePlan({
      ...roadmap,
      ...(card && {
        target_company:        card.target_company,
        target_role:           card.target_role,
        total_weeks:           card.total_weeks,
        total_estimated_hours: card.total_estimated_hours,
        confidence_score:      card.confidence_score,
      }),
    });
    setView("briefing");
  };

  return (
    <div style={{
      minHeight: "100vh", width: "100%",
      background: "var(--bg-base)",
      color: "var(--fg-primary)",
      fontFamily: "var(--font-body)",
    }}>
      <div className="grain" />
      <Sidebar view={view} setView={setView} />

      <main style={{ marginLeft: 220, position: "relative", zIndex: 2 }}>
        {view === "dashboard" && (
          <Dashboard onOpen={openPlan} onNew={() => setView("onboarding")} />
        )}
        {view === "onboarding" && (
          <Onboarding onComplete={handleOnboardingComplete} onBack={() => setView("dashboard")} />
        )}
        {view === "run" && (
          <RunAgent form={currentForm} onComplete={handleRunComplete} />
        )}
        {view === "briefing" && (
          <Briefing plan={activePlan || MOCK_ROADMAP} onBack={() => setView("dashboard")} />
        )}
        {view === "history" && (
          <History onOpen={openPlan} />
        )}
      </main>
    </div>
  );
}
