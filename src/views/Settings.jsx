import { Database, Globe, Brain } from "lucide-react";
import PageHeader from "../components/PageHeader";
import PanelHeader from "../components/PanelHeader";
import KeyField from "../components/KeyField";
import ToggleRow from "../components/ToggleRow";
import SliderRow from "../components/SliderRow";

// Settings view. Three sections: API keys, browser sources, agent depth.

export default function Settings() {
  return (
    <div style={{ padding: "40px 48px", maxWidth: 800 }}>
      <PageHeader
        eyebrow="SETTINGS"
        title="Configuration"
        subtitle="Keys, sources, output."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Section icon={Database} title="API keys" tag="REQUIRED">
          <KeyField label="Anthropic API key" placeholder="sk-ant-..." set />
          <KeyField label="Firecrawl API key" placeholder="fc-..." set />
        </Section>

        <Section icon={Globe} title="Browser agent sources">
          <ToggleRow label="LinkedIn"   desc="Resolve interviewer profiles"  on />
          <ToggleRow label="Glassdoor"  desc="Reviews + interview signals"   on />
          <ToggleRow label="Levels.fyi" desc="Compensation data"             on />
          <ToggleRow label="Crunchbase" desc="Funding & company data"        on />
          <ToggleRow label="arXiv"      desc="Papers by interviewer"         on />
        </Section>

        <Section icon={Brain} title="Agent depth">
          <SliderRow label="Max pages per source" value="12"  min="1"  max="50" />
          <SliderRow label="Per-agent timeout (s)" value="180" min="30" max="600" />
        </Section>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, tag, children }) {
  return (
    <div style={{
      background: "var(--bg-panel)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 8, overflow: "hidden",
    }}>
      <PanelHeader icon={Icon} title={title} tag={tag} />
      <div style={{
        padding: 20,
        display: "flex", flexDirection: "column", gap: 16,
      }}>
        {children}
      </div>
    </div>
  );
}
