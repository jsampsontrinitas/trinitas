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
  const container = dom.UI.containers.consoleContainer;
  const mostRecentEntry = container.firstElementChild;

  const newEntry = createElementWithAttributes("div", {
    style: "white-space: pre"
  });

  newEntry.textContent = text;

  if (mostRecentEntry) {
    container.insertBefore(newEntry, mostRecentEntry);
    return;
  }

  container.appendChild(newEntry);
}

export function logError (error) {
  throw new Error('Not Implemented');
}

export function gatherJS(scenario) {
  return Object.entries(scenario.files)
    .filter(([n]) => n.endsWith(".js"))
    .map(([, c]) => c)
    .join("\n");
}

/**
 * Creates a new DOM element with the specified tag name and sets the given attributes.
 *
 * @param {string} tagname - The name of the HTML tag to create (e.g., 'div', 'span').
 * @param {Object} [attributes={}] - An object containing attribute key-value pairs to set on the element.
 * @returns {HTMLElement} The newly created DOM element with the specified attributes.
 */
export function createElementWithAttributes(tagname, attributes = {}) {
  const element = document.createElement(tagname);

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  return element;
}
