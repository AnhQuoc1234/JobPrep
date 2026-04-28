import { Clock, User } from "lucide-react";
import { getCountdown, URGENCY_COLOR } from "../utils/time";

const STATUS_BADGE = {
  ready:    { label: "READY",    color: "var(--success)" },
  draft:    { label: "DRAFT",    color: "var(--warning)" },
  outdated: { label: "OUTDATED", color: "var(--danger)" },
};

// One card on the dashboard grid. Shows company, role, countdown,
// completeness bar at the bottom, and a status pill.
export default function BriefingCard({ briefing, onClick, delay = 0 }) {
  const { urgency, label } = getCountdown(briefing.date);
  const urgencyColor = URGENCY_COLOR[urgency];
  const status = STATUS_BADGE[briefing.status];

  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--bg-panel)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 8, padding: 20,
        cursor: "pointer", transition: "all 0.2s",
        animation: `fade-in-up 0.5s ${delay}ms backwards`,
        position: "relative", overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-strong)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-subtle)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Top: title + status */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: 16,
      }}>
        <div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            color: "var(--fg-muted)", letterSpacing: "0.1em", marginBottom: 4,
          }}>
            {briefing.round.toUpperCase()} · {briefing.format.toUpperCase()}
          </div>
          <div style={{
            fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 600,
            letterSpacing: "-0.01em", lineHeight: 1.15,
          }}>
            {briefing.company}
          </div>
          <div style={{ fontSize: 13, color: "var(--fg-secondary)", marginTop: 2 }}>
            {briefing.role}
          </div>
        </div>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
          padding: "3px 7px", borderRadius: 3,
          color: status.color,
          background: status.color + "15",
          border: `1px solid ${status.color}33`,
          letterSpacing: "0.1em",
        }}>
          {status.label}
        </span>
      </div>

      {/* Optional interviewer */}
      {briefing.interviewer && (
        <div style={{
          display: "flex", alignItems: "center", gap: 6, marginBottom: 14,
          fontSize: 12, color: "var(--fg-secondary)",
        }}>
          <User size={12} /> {briefing.interviewer}
        </div>
      )}

      {/* Bottom: countdown + last updated */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingTop: 14, borderTop: "1px solid var(--border-subtle)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Clock size={12} style={{ color: urgencyColor }} />
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600,
            color: urgencyColor,
          }}>
            {label}
          </span>
        </div>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-muted)",
        }}>
          {briefing.completeness}% · {briefing.lastUpdated}
        </div>
      </div>

      {/* Completeness bar at the bottom edge of the card */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
        background: "var(--border-subtle)",
      }}>
        <div style={{
          height: "100%", width: `${briefing.completeness}%`,
          background: briefing.status === "outdated" ? "var(--danger)" : "var(--accent)",
          transition: "width 0.5s",
        }} />
      </div>
    </div>
  );
}
