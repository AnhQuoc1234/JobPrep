// Compute the remaining time until an interview and an "urgency" level
// used to color-shift the countdown timer (amber < 24h, red < 2h).

export function getCountdown(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = date - now;
  const diffH = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));
  const diffD = Math.floor(diffH / 24);
  const diffM = Math.floor((diffMs / 60000) % 60);

  let urgency = "normal";
  if (diffH < 2) urgency = "critical";
  else if (diffH < 24) urgency = "warning";

  const label =
    diffD > 0 ? `${diffD}d ${diffH % 24}h` : `${diffH}h ${diffM}m`;

  return { diffMs, diffH, diffD, urgency, label };
}

export const URGENCY_COLOR = {
  normal: "var(--fg-secondary)",
  warning: "var(--warning)",
  critical: "var(--danger)",
};

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
