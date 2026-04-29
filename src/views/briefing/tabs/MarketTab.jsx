import { DollarSign, BarChart2, Wrench } from "lucide-react";
import PanelHeader from "../../../components/PanelHeader";

export default function MarketTab({ plan }) {
  const { market_snapshot } = plan;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <SalaryPanel snapshot={market_snapshot} />
        <SkillsPanel snapshot={market_snapshot} />
      </div>
      <ToolsPanel snapshot={market_snapshot} />
    </div>
  );
}

function SalaryPanel({ snapshot }) {
  const [lo, hi] = snapshot.salary_range;
  const fmt      = (n) => `$${(n / 1000).toFixed(0)}K`;
  const mid      = Math.round((lo + hi) / 2);

  const markers = [
    { pct: 15, label: "P25",    val: fmt(lo)  },
    { pct: 55, label: "MEDIAN", val: fmt(mid) },
    { pct: 95, label: "P75",    val: fmt(hi)  },
  ];

  return (
    <div style={{ background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", borderRadius: 8, overflow: "hidden" }}>
      <PanelHeader icon={DollarSign} title="Salary range" tag={`${snapshot.postings_analyzed} POSTINGS`} />
      <div style={{ padding: 28 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.1em", marginBottom: 8 }}>
          {snapshot.role_title.toUpperCase()} · TOTAL COMP
        </div>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 4 }}>
          {fmt(lo)} – {fmt(hi)}
        </div>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", marginBottom: 28 }}>
          Based on {snapshot.postings_analyzed} postings analyzed
        </div>

        <div style={{ position: "relative", height: 8, background: "var(--bg-base)", borderRadius: 4, marginBottom: 12 }}>
          <div style={{
            position: "absolute", left: "15%", right: "5%", height: "100%",
            background: "linear-gradient(90deg, var(--accent-dim), var(--accent), var(--accent-dim))",
            borderRadius: 4,
          }} />
          {markers.map((m) => (
            <div key={m.pct} style={{ position: "absolute", left: `${m.pct}%`, transform: "translateX(-50%)", top: -3, bottom: -3, width: 2, background: "var(--fg-primary)" }}>
              <div style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", textAlign: "center", whiteSpace: "nowrap" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--fg-muted)", letterSpacing: "0.1em" }}>{m.label}</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 14, fontWeight: 600 }}>{m.val}</div>
              </div>
            </div>
          ))}
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
