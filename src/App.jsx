import { useState } from "react";
import "./styles/global.css";

import Sidebar from "./components/Sidebar";
import Dashboard from "./views/Dashboard";
import Onboarding from "./views/Onboarding";
import RunAgent from "./views/RunAgent";
import Briefing from "./views/briefing/Briefing";
import History from "./views/History";
import { MOCK_ROADMAP, MOCK_PLANS } from "./data/mockData";

function buildPlan(overrides) {
  return { ...MOCK_ROADMAP, ...overrides };
}

export default function App() {
  const [view, setView]           = useState("dashboard");
  const [currentForm, setCurrentForm] = useState(null);
  const [activePlan, setActivePlan]   = useState(null);

  const handleOnboardingComplete = (form) => {
    setCurrentForm(form);
    setView("run");
  };

  const handleRunComplete = () => {
    setActivePlan(buildPlan({
      target_company: currentForm.company,
      target_role:    currentForm.role,
      total_weeks:    parseInt(currentForm.weeks, 10) || 4,
    }));
    setView("briefing");
  };

  const openPlan = (id) => {
    const p = MOCK_PLANS.find((x) => x.id === id);
    if (p) {
      setActivePlan(buildPlan({
        target_company:        p.target_company,
        target_role:           p.target_role,
        total_weeks:           p.total_weeks,
        total_estimated_hours: p.total_estimated_hours,
        confidence_score:      p.confidence_score,
      }));
    }
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
