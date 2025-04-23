import editor from "./editor.js";
import { runTests } from "./runner.js";
import scenarios from "./scenarios.js";

const scenarioSelector = document.getElementById("scenarioSel");
const scenarioFileSelector = document.getElementById("fileSel");

const statsContainer = document.getElementById("statsContainer");
const previousScenarioButton = document.getElementById("prevBtn");
const nextScenarioButton = document.getElementById("nextBtn");

const instructionsContainer = document.getElementById("instructions");
const consoleContainer = document.getElementById("consoleOut");
const testsContainer = document.getElementById("testsOut");

const previewContainer = document.getElementById("previewWrap");
const previewFrame = document.getElementById("previewFrame");
export const textareaElement = document.getElementById("textAreaEditor");

// Switches beteen "Tests" and "Browser Output" labels
const paneTitle = document.getElementById("paneTitle");

const btnFormatCode = document.getElementById("formatBtn");
const btnBrowserOutput = document.getElementById("previewTabBtn");
const btnShowTests = document.getElementById("testsTabBtn");
const btnRunTests = document.getElementById("runBtn");

function init() {
  setupDOM();
  setupEventListeners();
}

function setupDOM() {
  // Add scenarios to selector menu
  for (const { id, title } of scenarios.getAll()) {
    dom.scenarioSelector.add(new Option(title, id));
  }
}

function setInstructions(html) {
  instructionsContainer.innerHTML = html;
}

function clearConsole() {
  consoleContainer.innerHTML = "";
}

function setupEventListeners() {
  scenarioFileSelector.addEventListener("change", (event) => {
    editor.setCurrentScenarioFile(event.target.value);
    scenarios.setCurrentScenarioFile(event.target.value);
  });

  scenarioSelector.addEventListener("change", (event) => {
    scenarios.setCurrentScenario(event.target.value);
  });

  nextScenarioButton.addEventListener("click", scenarios.loadNext);
  previousScenarioButton.addEventListener("click", scenarios.loadPrevious);

  btnFormatCode.addEventListener("click", async () => {
    const code = editor.getCodeMirrorInstance().getValue();
    const currentFile = scenario.getCurrentScenarioFile();
    let parser = "babel";

    if (currentFile.endsWith(".css")) parser = "css";
    else if (currentFile.endsWith(".html")) parser = "html";

    try {
      const formatted = await prettier.format(code, {
        parser,
        plugins: prettierPlugins,
      });
      editor.getCodeMirrorInstance().setValue(formatted);
    } catch (e) {
      logLine("Format error: " + e.message);
    }
  });

  btnRunTests.addEventListener("click", runTests);

  btnShowTests.addEventListener("click", () => {
    previewContainer.classList.add("hidden");
    testsContainer.classList.remove("hidden");
    paneTitle.textContent = "Tests";
  });

  btnBrowserOutput.addEventListener("click", () => {
    previewContainer.classList.remove("hidden");
    testsContainer.classList.add("hidden");
    paneTitle.textContent = "Browser Output";
  });
}

export function updateStatsContainer(stats) {
  // Get current stat elements (<li> elements)
  const items = statsContainer.querySelectorAll("li");
  for (const child of items) {
    // Get their associated key and value for comparison
    const key = child.dataset.key.toLowerCase();
    const value = parseInt(child.textContent);
    // If this is an updatable key, and the value is different...
    if (stats.hasOwnProperty(key) && stats[key] !== value) {
      // Set the new value and add a value-changed effect with CSS
      child.textContent = stats[key];
      child.classList.add("changed");
      child.addEventListener(
        "animationend",
        () => child.classList.remove("changed"),
        { once: true }
      );
    }
  }
}

export default {
  init,
  UI: {
    setInstructions,
    clearConsole,
  },
};
