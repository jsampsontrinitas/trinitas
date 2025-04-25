import { createElementWithAttributes, gatherJS, logLine } from "./utils.js";
import scenarios from "./scenarios.js";
import dom from "./dom.js";
import preview from "./preview.js";

let testFrame;

function testFrameExists() {
  return testFrame?.isConnected;
}

function createTestFrame() {
  // Remove any existing iframe
  if (testFrameExists()) {
    testFrame.remove();
  }

  // Create and attach the new iframe
  testFrame = document.body.appendChild(
    createElementWithAttributes("iframe", { hidden: true })
  );

  return testFrame;
}

function destroyTestFrame() {
  if (testFrameExists()) {
    testFrame.remove();
  }

  testFrame = null;
}

function setTestFrameSrcDoc(html) {
  // Make sure our testing frame exists
  if (!testFrameExists()) {
    createTestFrame();
  }

  // TODO: We need to inject into the iframe our
  // "capture console" logic so that we can capture console
  // messages from the tests.

  testFrame.srcdoc = html;
}

export function execUserJS() {
  const userCodeAsString = gatherJS(scenarios.getCurrent());
  // We call captureConsole here just incase the user's
  // code contains console method calls. We have our own
  // `logLine` call for when the user's code throws an
  // exception, but we have to wrap everything within a
  // captured console so that we can relay non-exceptions
  // too (e.g., `console.info`, `console.log`, etc.);

  // TODO: What to do about `console.group`, etc.?
  captureConsole(() => {
    try {
      new Function(userCodeAsString)();
    } catch (e) {
      logLine(e);
    }
  });
}

// captures the main window console so that we can intercept calls
// to `console.log`, `console.error`, etc., and show the output to
// the user via our in-page "Console Output" window. No present
// support for capturing the console of a testing iframe.
export function captureConsole(userCodeRunner) {
  // A place to store original console method implementations
  const original = {};
  const replacer = (kind) => {
    return (...args) => {
      // Uncomment to invoke original implementation
      // original[kind](...args);

      // When executing in an iframe, send messages to parent
      if (typeof window === "object" && window !== window.parent) {
        window.parent.postMessage({ type: "console", kind, args }, "*");
        return;
      }

      // When executing in the main window, use direct calls
      logLine(`${kind}: ${args.join(" ")}`);
    };
  };

  // Cycle over methods we'd like to replace with our own
  for (const kind of ["log", "warn", "error", "info"]) {
    // Store original implementations, replace with our own
    original[kind] = console[kind];
    console[kind] = replacer(kind);
  }

  try {
    createCapturedConsoleListener();
    userCodeRunner();
  } finally {
    // Restore the original console methods
    destroyCapturedConsoleListener();
    Object.assign(console, original);
  }
}

/**
 * Handles captured console messages emitted from a testing iframe.
 * Intercepts the event, evaluates the data, and logs the message if it is of type "console".
 *
 * @param {MessageEvent} event - The message event containing console data from the iframe.
 */
function onCapturedConsoleMessage(event) {
  if (event.data?.type === "console") {
    const { kind, args } = event.data;
    logLine(`${kind}: ${args.join(" ")}`);
  }
}

function createCapturedConsoleListener() {
  window.addEventListener("message", onCapturedConsoleMessage);
}

function destroyCapturedConsoleListener() {
  window.removeEventListener("message", onCapturedConsoleMessage);
}

export function runTests(scenario = scenarios.getCurrent()) {
  onTestFrameLoadEvent(() => {
    const results = runTestsInFrame(scenario);
    displayTestResults(results);
    destroyTestFrame();
  });

  setTestFrameSrcDoc(preview.buildDoc(scenario));
}

function onTestFrameLoadEvent(callback) {
  const iframe = createTestFrame();
  iframe.addEventListener("load", callback, { once: true });
}

function runTestsInFrame(scenario) {
  const results = [];
  const iframe = createTestFrame();
  const contentWindow = iframe.contentWindow;

  for (const test of scenario.tests) {
    let pass = false;
    const desc = test.desc;
    const source = `(()=>{${test.fn}})()`;
    try {
      pass = contentWindow.eval(source);
    } catch {}
    results.push({ desc, pass });
  }

  return results;
}

function displayTestResults(results) {
  const container = dom.UI.CONTAINERS.testsContainer;
  const fragment = document.createDocumentFragment();

  for (const result of results) {
    const element = document.createElement("div");
    const className = result.pass ? "pass" : "fail";
    const description = (result.pass ? "✔" : "✖") + result.desc;

    element.classList.add(className);
    element.textContent = description;
    fragment.appendChild(element);
  }

  // Remove all elements from within the test container
  for (const child of container.childNodes) {
    child.remove();
  }

  // Add our document fragment as the only child
  container.append(fragment);
}

export default { execUserJS, runTests };
