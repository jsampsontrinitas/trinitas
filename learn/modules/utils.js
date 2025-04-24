import dom from "./dom.js";

export function debounce(fn, ms) {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}

export function modeFor(filename) {
  return filename.endsWith(".css")
    ? "css"
    : filename.endsWith(".html")
    ? "htmlmixed"
    : "javascript";
}

export function logLine(text) {
  const newEntry = document.createElement("div");
  newEntry.textContent = text;

  const container = dom.UI.CONTAINERS.consoleContainer;
  const mostRecentEntry = container.firstElementChild;

  if (mostRecentEntry) {
    container.insertBefore(newEntry, mostRecentEntry);
    return;
  }

  container.appendChild(newEntry);
}

export function gatherJS(scenario) {
  return Object.entries(scenario.files)
    .filter(([n]) => n.endsWith(".js"))
    .map(([, c]) => c)
    .join("\n");
}
