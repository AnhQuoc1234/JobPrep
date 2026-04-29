import { AlertTriangle } from "lucide-react";

const STATUS_BADGE = {
  active:   { label: "ACTIVE",   color: "var(--success)" },
  complete: { label: "COMPLETE", color: "var(--accent)"  },
};

export default function PlanCard({ plan, onClick, delay = 0 }) {
  const status = STATUS_BADGE[plan.status] || STATUS_BADGE.active;
  const confidencePct = Math.round(plan.confidence_score * 100);
  const confidenceColor =
    confidencePct >= 80 ? "var(--accent)" :
    confidencePct >= 60 ? "var(--warning)" : "var(--danger)";

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
      {/* Top: company + status badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.1em", marginBottom: 4 }}>
            {plan.total_weeks} WEEKS · {plan.total_estimated_hours} HRS
          </div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.15 }}>
            {plan.target_company}
          </div>
          <div style={{ fontSize: 13, color: "var(--fg-secondary)", marginTop: 2 }}>
            {plan.target_role}
          </div>
        </div>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
          padding: "3px 7px", borderRadius: 3, letterSpacing: "0.1em",
          color: status.color, background: status.color + "15", border: `1px solid ${status.color}33`,
        }}>
          {status.label}
        </span>
      </div>

      {/* Critical gaps */}
      {plan.critical_gaps_count > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, fontSize: 12, color: "var(--warning)" }}>
          <AlertTriangle size={12} />
          {plan.critical_gaps_count} critical gap{plan.critical_gaps_count !== 1 ? "s" : ""}
        </div>
      )}

      {/* Bottom: confidence + last updated */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid var(--border-subtle)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: confidenceColor }}>
          {confidencePct}% confidence
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-muted)" }}>
          {plan.last_updated}
        </span>
      </div>

      {/* Confidence bar at bottom edge */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "var(--border-subtle)" }}>
        <div style={{ height: "100%", width: `${confidencePct}%`, background: "var(--accent)", transition: "width 0.5s" }} />
      </div>
    </div>
  );
}
