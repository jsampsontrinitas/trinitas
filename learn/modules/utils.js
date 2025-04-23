import * as dom from "./dom.js";

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
  const logEntry = document.createElement("div");
  dom.consoleContainer.appendChild(logEntry).textContent = text;
}

export function gatherJS(scenario) {
  return Object.entries(scenario.files)
    .filter(([n]) => n.endsWith(".js"))
    .map(([, c]) => c)
    .join("\n");
}
