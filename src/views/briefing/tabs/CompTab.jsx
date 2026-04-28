import { DollarSign } from "lucide-react";
import PanelHeader from "../../../components/PanelHeader";

// Compensation tab — single big panel with a P25/median/P75 range bar
// scraped from Levels.fyi + Glassdoor.

const PERCENTILES = [
  { p: 15, label: "P25", v: "$385K" },
  { p: 50, label: "MEDIAN", v: "$520K" },
  { p: 90, label: "P75", v: "$720K" },
];

const BREAKDOWN = [
  { label: "Base salary", value: "$280K – $360K" },
  { label: "Equity (4yr)", value: "$80K – $300K /yr" },
  { label: "Bonus / sign-on", value: "$25K – $60K" },
];

export default function CompTab() {
  return (
    <div style={{
      background: "var(--bg-panel)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 8, overflow: "hidden",
    }}>
      <PanelHeader
        icon={DollarSign}
        title="Compensation intel"
        tag="LEVELS.FYI + GLASSDOOR"
      />
      <div style={{ padding: 32 }}>
        <Headline />
        <RangeBar />
        <Breakdown />
      </div>
    </div>
  );
}

function Headline() {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 11,
        color: "var(--fg-muted)", letterSpacing: "0.1em", marginBottom: 8,
      }}>
        ML RESEARCH ENGINEER · TOTAL COMPENSATION
      </div>
      <div style={{
        fontFamily: "var(--font-serif)", fontSize: 36, fontWeight: 600,
        letterSpacing: "-0.02em",
      }}>
        $385K – $720K
      </div>
      <div style={{ fontSize: 13, color: "var(--fg-secondary)", marginTop: 4 }}>
        Based on 31 reported offers in the last 18 months
      </div>
    </div>
  );
}

function RangeBar() {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{
        position: "relative", height: 10,
        background: "var(--bg-base)", borderRadius: 5,
        marginBottom: 28,
      }}>
        {/* Filled gradient between P25 and P75 */}
        <div style={{
          position: "absolute", left: "15%", right: "10%", height: "100%",
          background: "linear-gradient(90deg, var(--accent-dim), var(--accent), var(--accent-dim))",
          borderRadius: 5,
        }} />

        {/* Markers */}
        {PERCENTILES.map((m) => (
          <PercentileMarker key={m.p} marker={m} />
        ))}
      </div>
    </div>
  );
}

function PercentileMarker({ marker }) {
  return (
    <div style={{
      position: "absolute", left: `${marker.p}%`,
      transform: "translateX(-50%)",
      top: -4, bottom: -4, width: 2,
      background: "var(--fg-primary)",
    }}>
      <div style={{
        position: "absolute", top: 18, left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center", whiteSpace: "nowrap",
      }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 10,
          color: "var(--fg-muted)", letterSpacing: "0.1em",
        }}>
          {marker.label}
        </div>
        <div style={{
          fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600,
        }}>
          {marker.v}
        </div>
      </div>
    </div>
  );
}

function Breakdown() {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
      gap: 16, marginTop: 56,
    }}>
      {BREAKDOWN.map((b) => (
        <BreakdownCell key={b.label} label={b.label} value={b.value} />
      ))}
    </div>
  );
}

function BreakdownCell({ label, value }) {
  return (
    <div style={{
      padding: 16,
      background: "var(--bg-base)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 6,
    }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 10,
        color: "var(--fg-muted)", letterSpacing: "0.1em", marginBottom: 6,
      }}>
        {label.toUpperCase()}
      </div>
      <div style={{
        fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 600,
      }}>
        {value}
      </div>
    </div>
  );
}
