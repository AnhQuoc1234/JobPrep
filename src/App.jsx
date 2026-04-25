import { useState } from "react";
import "./styles/globals.css";

import Sidebar from "./components/Sidebar";
import Dashboard from "./views/Dashboard";
import Onboarding from "./views/Onboarding";
import RunAgent from "./views/RunAgent";
import Briefing from "./views/briefing/Briefing";
import History from "./views/History";
import Settings from "./views/Settings";

// Top-level view router. In production, swap this for React Router or
// Next.js routing — the structure (one component per view) stays the same.

export default function App() {
  const [view, setView] = useState("dashboard");
  // eslint-disable-next-line no-unused-vars
  const [activeBriefingId, setActiveBriefingId] = useState(null);

  // Open a briefing from any view that has briefing IDs (Dashboard, History)
  const openBriefing = (id) => {
    setActiveBriefingId(id);
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

      <main style={{
        marginLeft: 220,
        position: "relative", zIndex: 2,
      }}>
        {view === "dashboard" && (
          <Dashboard
            onOpen={openBriefing}
            onNew={() => setView("onboarding")}
          />
        )}
        {view === "onboarding" && (
          <Onboarding
            onComplete={() => setView("run")}
            onBack={() => setView("dashboard")}
          />
        )}
        {view === "run" && (
          <RunAgent onComplete={() => setView("briefing")} />
        )}
        {view === "briefing" && (
          <Briefing onBack={() => setView("dashboard")} />
        )}
        {view === "history" && (
          <History onOpen={openBriefing} />
        )}
        {view === "settings" && <Settings />}
      </main>
    </div>
  );
}
