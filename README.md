# JobPrep
An autonomous browser agent that researches company culture, interviewer backgrounds, and recent news to generate high-context, personalized interview briefings.

# JobPrep — UI

Modular React UI for an autonomous agent that researches companies, interviewers, and recent news to generate personalized interview briefings.

## File structure

```
src/
├── App.jsx                          # Root — view router + sidebar
├── main.jsx                         # Vite entry (if using Vite)
│
├── styles/
│   └── globals.css                  # CSS variables, fonts, animations
│
├── data/
│   └── mockData.js                  # All mock data (briefings, agents, news, etc.)
│
├── utils/
│   ├── styles.js                    # Reusable inline style objects (buttons, inputs)
│   └── time.js                      # Date / countdown helpers
│
├── components/                      # Shared, reusable presentational components
│   ├── Sidebar.jsx
│   ├── PageHeader.jsx
│   ├── PanelHeader.jsx
│   ├── Stat.jsx
│   ├── KPI.jsx
│   ├── Field.jsx
│   ├── StatusBadge.jsx
│   ├── ConfidencePill.jsx
│   ├── OutcomeTag.jsx
│   ├── RelevanceMeter.jsx
│   └── SteerModal.jsx
│
└── views/                           # Top-level pages, one per route
    ├── Dashboard.jsx
    │   └── BriefingCard.jsx         # only used by Dashboard
    ├── Onboarding.jsx
    │   └── ResumeDropzone.jsx
    ├── RunAgent.jsx
    │   ├── AgentCard.jsx
    │   ├── LogLine.jsx
    │   └── SourceItem.jsx
    ├── Briefing.jsx                 # tab container
    │   └── tabs/
    │       ├── MemoTab.jsx
    │       ├── CompanyTab.jsx
    │       ├── InterviewerTab.jsx
    │       ├── NewsTab.jsx
    │       ├── QuestionsTab.jsx
    │       ├── StoriesTab.jsx
    │       └── CompTab.jsx
    ├── History.jsx
    └── Settings.jsx
        ├── KeyField.jsx
        ├── ToggleRow.jsx
        └── SliderRow.jsx
```

## Where to plug in your agents

| File | What to replace |
|------|-----------------|
| `data/mockData.js` | All mock arrays — swap with API fetches or props |
| `views/RunAgent.jsx` | The `useEffect` interval — replace with WebSocket / SSE stream |
| `views/Briefing/tabs/MemoTab.jsx` | The typewriter `useEffect` — replace with real LLM token stream |
| `views/Onboarding.jsx` | `onComplete` — POST form data to start an agent run |

## Running

```bash
npm create vite@latest . -- --template react
npm install lucide-react
# copy src/ over the generated src/
npm run dev
```

The CSS variables in `styles/globals.css` control the entire visual system — change one, change everything.
