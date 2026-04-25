import { CheckCircle2, RotateCw } from "lucide-react";
import StatusBadge from "../../interview-recon/src/components/StatusBadge";

// One of the three pipeline cards (Browser / Research / Strategy).
// Shows a progress bar, sub-tasks ticking off, and a status pill.

export default function AgentCard({ name, subtitle, color, icon: Icon, progress, tasks, active }) {
  const status = progress >= 100 ? "done" : progress > 0 ? "running" : "waiting";

  return (
    <div style={{
      background: "var(--bg-panel)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 8, padding: 18,
      position: "relative", overflow: "hidden",
    }}>
      {/* Animated shimmer when actively working */}
      {active && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s linear infinite",
        }} />
      )}

      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: 14,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 6,
            background: color + "15",
            border: `1px solid ${color}33`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color,
          }}>
            <Icon size={16} strokeWidth={2} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
            <div style={{
              fontSize: 11, color: "var(--fg-muted)",
              fontFamily: "var(--font-mono)",
            }}>
              {subtitle}
            </div>
          </div>
        </div>
        <StatusBadge status={status} color={color} />
      </div>

      {/* Progress bar */}
      <div style={{
        height: 4, background: "var(--bg-base)", borderRadius: 2,
        overflow: "hidden", marginBottom: 14,
      }}>
        <div style={{
          height: "100%", width: `${progress}%`,
          background: progress >= 100 ? color : `linear-gradient(90deg, ${color}88, ${color})`,
          transition: "width 0.5s",
          backgroundSize: "32px 32px",
          animation: active ? "progress-stripe 1s linear infinite" : "none",
        }} />
      </div>

      {/* Sub-tasks */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {tasks.map((t, i) => (
          <TaskRow key={i} task={t} color={color} />
        ))}
      </div>
    </div>
  );
}

function TaskRow({ task, color }) {
  const colorVal = task.done
    ? "var(--fg-secondary)"
    : task.active
    ? "var(--fg-primary)"
    : "var(--fg-muted)";

  let icon;
  if (task.done) {
    icon = <CheckCircle2 size={12} style={{ color }} />;
  } else if (task.active) {
    icon = <RotateCw size={12} style={{ color, animation: "spin-slow 1.5s linear infinite" }} />;
  } else {
    icon = (
      <div style={{
        width: 12, height: 12,
        border: "1px solid var(--border-strong)",
        borderRadius: "50%",
      }} />
    );
  }

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      fontSize: 12, color: colorVal,
    }}>
      {icon}
      <span style={{
        textDecoration: task.done ? "line-through" : "none",
        textDecorationColor: "var(--fg-muted)",
      }}>
        {task.name}
      </span>
    </div>
  );
}
