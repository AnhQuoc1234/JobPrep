import { TrendingUp, TrendingDown, Minus, BarChart2, Wrench, MapPin } from "lucide-react";
import PanelHeader from "../../../components/PanelHeader";

export default function MarketTab({ plan }) {
  const { market_snapshot } = plan;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <DemandPanel snapshot={market_snapshot} />
        <SkillsPanel snapshot={market_snapshot} />
      </div>
      <ToolsPanel snapshot={market_snapshot} />
    </div>
  );
}

function DemandPanel({ snapshot }) {
  const { demand_trend, demand_change_pct, postings_analyzed, top_locations, job_type_split } = snapshot;

  const TrendIcon = demand_trend === "growing" ? TrendingUp : demand_trend === "declining" ? TrendingDown : Minus;
  const trendColor =
    demand_trend === "growing" ? "var(--accent)" :
    demand_trend === "declining" ? "#e05a5a" : "var(--fg-muted)";

  const typeSegments = [
    { label: "Remote", key: "remote", color: "var(--accent)" },
    { label: "Hybrid",  key: "hybrid",  color: "var(--fg-secondary)" },
    { label: "On-site", key: "onsite",  color: "var(--fg-muted)" },
  ];

  return (
    <div style={{ background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", borderRadius: 8, overflow: "hidden" }}>
      <PanelHeader icon={MapPin} title="Job availability" tag={`${postings_analyzed} POSTINGS ANALYZED`} />
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Headline count + trend */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.1em", marginBottom: 4 }}>
              {snapshot.role_title.toUpperCase()} · OPEN ROLES
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 40, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1 }}>
              {postings_analyzed}
            </div>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 4, marginBottom: 6,
            padding: "4px 10px", borderRadius: 100,
            background: demand_trend === "growing" ? "var(--accent-dim)" : "var(--bg-elevated)",
            border: `1px solid ${trendColor}`,
            color: trendColor, fontSize: 12, fontWeight: 600,
          }}>
            <TrendIcon size={13} />
            {demand_trend === "stable" ? "Stable" : `+${demand_change_pct}% YoY`}
          </div>
        </div>

        {/* Job type split */}
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.1em", marginBottom: 8 }}>
            WORK FORMAT
          </div>
          <div style={{ height: 8, borderRadius: 4, overflow: "hidden", display: "flex", marginBottom: 10 }}>
            {typeSegments.map((seg) => (
              <div key={seg.key} style={{ flex: job_type_split[seg.key], background: seg.color }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {typeSegments.map((seg) => (
              <div key={seg.key} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--fg-secondary)" }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: seg.color, flexShrink: 0 }} />
                {seg.label} <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: seg.color }}>
                  {Math.round(job_type_split[seg.key] * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top locations */}
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.1em", marginBottom: 8 }}>
            TOP LOCATIONS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {top_locations.map((loc) => (
              <div key={loc.city} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, color: "var(--fg-secondary)", width: 148, flexShrink: 0 }}>{loc.city}</span>
                <div style={{ flex: 1, height: 4, background: "var(--bg-base)", borderRadius: 2 }}>
                  <div style={{ height: "100%", width: `${Math.round(loc.pct * 100)}%`, background: "var(--accent)", borderRadius: 2 }} />
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", width: 34, textAlign: "right" }}>
                  {Math.round(loc.pct * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function SkillsPanel({ snapshot }) {
  return (
    <div style={{ background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", borderRadius: 8, overflow: "hidden" }}>
      <PanelHeader icon={BarChart2} title="Skill signals" tag="BY FREQUENCY" />
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.1em", marginBottom: 4 }}>REQUIRED</div>
        {snapshot.top_required_skills.map((s) => (
          <SkillBar key={s.skill} skill={s} color="var(--accent)" />
        ))}
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.1em", marginTop: 12, marginBottom: 4 }}>NICE TO HAVE</div>
        {snapshot.top_nice_to_have_skills.map((s) => (
          <SkillBar key={s.skill} skill={s} color="var(--fg-muted)" />
        ))}
      </div>
    </div>
  );
}

function SkillBar({ skill, color }) {
  const pct = Math.round(skill.frequency * 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 12, color: "var(--fg-secondary)", width: 160, flexShrink: 0 }}>{skill.skill}</span>
      <div style={{ flex: 1, height: 4, background: "var(--bg-base)", borderRadius: 2 }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 2 }} />
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color, width: 34, textAlign: "right" }}>{pct}%</span>
    </div>
  );
}

function ToolsPanel({ snapshot }) {
  return (
    <div style={{ background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", borderRadius: 8, overflow: "hidden" }}>
      <PanelHeader icon={Wrench} title="Common tools" tag="FROM JOB POSTINGS" />
      <div style={{ padding: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
        {snapshot.common_tools.map((tool) => (
          <span key={tool} style={{
            padding: "6px 12px",
            background: "var(--bg-elevated)", border: "1px solid var(--border-strong)",
            borderRadius: 100, fontSize: 12, fontWeight: 500,
          }}>
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}
