import editor from "./editor.js";
import runner from "./runner.js";
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

// Switches beteen "Tests" and "Browser Output" labels
const paneTitle = document.getElementById("paneTitle");

const btnFormatCode = document.getElementById("formatBtn");
const btnBrowserOutput = document.getElementById("previewTabBtn");
const btnShowTests = document.getElementById("testsTabBtn");
const btnRunTests = document.getElementById("runBtn");

function setPreviewFrameSourceHTML(html) {
  previewFrame.srcdoc = html;
}

const buttons = {
  btnFormatCode,
  btnBrowserOutput,
  btnShowTests,
  btnRunTests,
};

const containers = {
  consoleContainer,
  instructionsContainer,
  testsContainer,
};

function init() {
  setupDOM();
  setupEventListeners();
}

function setupDOM() {
  // Add scenarios to selector menu
  for (const { id, title } of scenarios.getAll()) {
    scenarioSelector.add(new Option(title, id));
  }
}

function setButtonDisabled(button, disabled) {
  if (Object.values(buttons).includes(button)) {
    button.disabled = disabled;
  }
}

function setInstructions(html) {
  instructionsContainer.innerHTML = html;
}

function setSelectedScenarioIndex(index) {
  scenarioSelector.options[index].selected = true;
}

function addScenarioFilesOption(text, value) {
  scenarioFileSelector.add(new Option(text, value));
}

function clearScenarioFileSelectorOptions() {
  console.log("Clearing scenario selector options");
  // Remove all options from the scenario selector
  while (scenarioFileSelector.options.length > 0) {
    scenarioFileSelector.remove(0);
  }
}

function setSelectedScenarioFileByValue(value) {
  // Set the selected scenario file in the selector
  for (const option of scenarioFileSelector.options) {
    if (option.value === value) {
      scenarioFileSelector.selectedIndex = option.index;
      return;
    }
  }
  throw new Error("Scenario file not found in selector");
}

function clearConsole() {
  for (const entry of consoleContainer.childNodes) entry.remove();
}

function setupEventListeners() {
  scenarioFileSelector.addEventListener("change", (event) => {
    console.log("Scenario file changed to: " + event.target.value);
    editor.setCurrentScenarioFile(event.target.value);
    scenarios.setCurrentScenarioFile(event.target.value);
  });

  scenarioSelector.addEventListener("change", (event) => {
    scenarios.loadScenario(event.target.selectedIndex);
  });

  nextScenarioButton.addEventListener("click", scenarios.loadNext);
  previousScenarioButton.addEventListener("click", scenarios.loadPrevious);

  btnFormatCode.addEventListener("click", editor.formatCurrentFile);
  btnRunTests.addEventListener("click", () => runner.runTests());

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
  setPreviewFrameSourceHTML,
  UI: {
    setInstructions,
    setSelectedScenarioIndex,
    setSelectedScenarioFileByValue,
    clearScenarioFileSelectorOptions,
    addScenarioFilesOption,
    setButtonDisabled,
    clearConsole,
    BUTTONS: buttons,
    CONTAINERS: containers,
  },
};
