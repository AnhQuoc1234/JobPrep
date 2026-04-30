import { useState } from "react";
import { Zap, Calendar, ExternalLink, ChevronDown, ChevronRight } from "lucide-react";
import PanelHeader from "../../../components/PanelHeader";

const CATEGORY_COLOR = {
  skill:          "var(--browser)",
  project:        "var(--research)",
  interview_prep: "var(--strategy)",
  networking:     "var(--success)",
};

const PRIORITY_BADGE = {
  must:         { label: "MUST",   color: "var(--danger)"  },
  should:       { label: "SHOULD", color: "var(--warning)" },
  nice_to_have: { label: "NICE",   color: "var(--fg-muted)"},
};

export default function RoadmapTab({ plan }) {
  const [openWeek, setOpenWeek] = useState(1);
  const { quick_wins, weeks } = plan;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Quick wins */}
      <div style={{ background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", borderRadius: 8, overflow: "hidden" }}>
        <PanelHeader icon={Zap} title="Quick wins" tag="NEXT 3 DAYS" />
        <div style={{ padding: 8 }}>
          {quick_wins.map((task, i) => (
            <TaskRow key={i} task={task} isLast={i === quick_wins.length - 1} />
          ))}
        </div>
      </div>

      {/* Week accordion */}
      <div style={{ background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", borderRadius: 8, overflow: "hidden" }}>
        <PanelHeader icon={Calendar} title="Week-by-week" tag={`${weeks.length} WEEKS`} />
        <div style={{ padding: 8 }}>
          {weeks.map((week) => (
            <WeekAccordion
              key={week.week_number}
              week={week}
              open={openWeek === week.week_number}
              onToggle={() => setOpenWeek(openWeek === week.week_number ? null : week.week_number)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function WeekAccordion({ week, open, onToggle }) {
  const totalHours = week.tasks.reduce((s, t) => s + t.estimated_hours, 0);

  return (
    <div style={{ borderBottom: "1px solid var(--border-subtle)" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%", padding: "16px 20px",
          background: open ? "var(--bg-elevated)" : "none",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 12,
          fontFamily: "var(--font-body)", textAlign: "left",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => { if (!open) e.currentTarget.style.background = "var(--bg-hover)"; }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.background = "none"; }}
      >
        {open
          ? <ChevronDown  size={14} style={{ color: "var(--accent)",    flexShrink: 0 }} />
          : <ChevronRight size={14} style={{ color: "var(--fg-muted)", flexShrink: 0 }} />
        }
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.1em" }}>
              WEEK {week.week_number}
            </span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fg-primary)" }}>{week.theme}</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 2 }}>{week.milestone}</div>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-muted)", flexShrink: 0 }}>
          {totalHours}h · {week.tasks.length} tasks
        </span>
      </button>

      {open && (
        <div style={{ padding: "4px 0 8px 0" }}>
          {week.tasks.map((task, i) => (
            <TaskRow key={i} task={task} isLast={i === week.tasks.length - 1} indent />
          ))}
        </div>
      )}
    </div>
  );
}

function TaskRow({ task, isLast, indent }) {
  const catColor = CATEGORY_COLOR[task.category] || "var(--fg-muted)";
  const badge    = PRIORITY_BADGE[task.priority]  || PRIORITY_BADGE.should;

  return (
    <div style={{ padding: indent ? "12px 20px 12px 44px" : "16px 20px", borderBottom: isLast ? "none" : "1px solid var(--border-subtle)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: catColor, flexShrink: 0 }} />
          <span style={{ fontSize: 14, fontWeight: 500 }}>{task.title}</span>
        </div>
        <div style={{ display: "flex", gap: 6, flexShrink: 0, alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600, color: badge.color, letterSpacing: "0.1em", padding: "2px 5px", border: `1px solid ${badge.color}44`, borderRadius: 3 }}>
            {badge.label}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-muted)" }}>{task.estimated_hours}h</span>
        </div>
      </div>

      <p style={{ fontSize: 12, color: "var(--fg-secondary)", lineHeight: 1.5, margin: "0 0 8px 14px" }}>
        {task.description}
      </p>

      {task.resources.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginLeft: 14 }}>
          {task.resources.map((r, i) => (
            <a
              key={i}
              href={r.url || "#"}
              target={r.url ? "_blank" : undefined}
              rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                fontFamily: "var(--font-mono)", fontSize: 10,
                color: "var(--accent)", textDecoration: "none",
                padding: "2px 6px", border: "1px solid var(--accent)33", borderRadius: 3,
              }}
            >
              {r.title} {r.url && <ExternalLink size={9} />}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
