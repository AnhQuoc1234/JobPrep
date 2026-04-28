import { Layers, Plus, Archive, Settings } from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: Layers },
  { id: "onboarding", label: "New Briefing", icon: Plus },
  { id: "history", label: "Archive", icon: Archive },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ view, setView }) {
  return (
    <aside style={{
      position: "fixed", left: 0, top: 0, bottom: 0, width: 220,
      background: "var(--bg-panel)",
      borderRight: "1px solid var(--border-subtle)",
      padding: "24px 16px",
      display: "flex", flexDirection: "column",
      zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{ marginBottom: 32, paddingLeft: 8 }}>
        <div style={{
          fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600,
          color: "var(--fg-muted)", letterSpacing: "0.15em", marginBottom: 4,
        }}>
          AGENT.V1
        </div>
        <div style={{
          fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 600,
          letterSpacing: "-0.02em", lineHeight: 1.1,
        }}>
          interview<br />
          <span style={{ fontStyle: "italic", color: "var(--accent)" }}>recon</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = view === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px",
                background: active ? "var(--bg-elevated)" : "transparent",
                border: "1px solid",
                borderColor: active ? "var(--border-strong)" : "transparent",
                borderRadius: 6,
                color: active ? "var(--fg-primary)" : "var(--fg-secondary)",
                fontSize: 13, fontWeight: 500,
                cursor: "pointer", textAlign: "left",
                transition: "all 0.15s",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--bg-hover)"; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
            >
              <Icon size={15} strokeWidth={2} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Status footer */}
      <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 10,
          color: "var(--fg-muted)", lineHeight: 1.6,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--success)",
              animation: "pulse-dot 2s infinite",
            }} />
            <span>3 agents online</span>
          </div>
          <div>opus-4.7 · firecrawl</div>
        </div>
      </div>
    </aside>
  );
}
