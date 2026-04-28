import { Copy } from "lucide-react";
import { ghostBtn, starLabel } from "../../../utils/style";
import { MOCK_STAR_STORIES } from "../../../data/mockData";

// STAR-format stories matched to predicted behavioral questions.
// S = Situation, T = Task, A = Action, R = Result.

export default function StoriesTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {MOCK_STAR_STORIES.map((s, i) => (
        <StoryCard key={i} story={s} index={i} />
      ))}
    </div>
  );
}

function StoryCard({ story, index }) {
  return (
    <div style={{
      background: "var(--bg-panel)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 8, overflow: "hidden",
    }}>
      <StoryHeader story={story} index={index} />
      <StoryBody story={story} />
    </div>
  );
}

function StoryHeader({ story, index }) {
  return (
    <div style={{
      padding: "16px 20px",
      borderBottom: "1px solid var(--border-subtle)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <div>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 10,
          color: "var(--fg-muted)", letterSpacing: "0.1em", marginBottom: 4,
        }}>
          STORY / {String(index + 1).padStart(2, "0")} → MATCHED TO{" "}
          {story.matchedTo.toUpperCase()}
        </div>
        <div style={{
          fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 600,
          letterSpacing: "-0.01em",
        }}>
          {story.title}
        </div>
      </div>
      <button style={{ ...ghostBtn, padding: "6px 10px" }}>
        <Copy size={12} />
      </button>
    </div>
  );
}

function StoryBody({ story }) {
  return (
    <div style={{
      padding: 20,
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: "12px 16px",
      fontSize: 13, lineHeight: 1.6,
    }}>
      <span style={starLabel("var(--browser)")}>S</span>
      <span>{story.s}</span>

      <span style={starLabel("var(--research)")}>T</span>
      <span>{story.t}</span>

      <span style={starLabel("var(--strategy)")}>A</span>
      <span>{story.a}</span>

      <span style={starLabel("var(--accent)")}>R</span>
      <span style={{ color: "var(--accent)" }}>{story.r}</span>
    </div>
  );
}
