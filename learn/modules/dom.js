import editor from "./editor.js";
import preview from "./preview.js";
import runner from "./runner.js";
import scenarios from "./scenarios.js";

// const scenarioSelector = document.getElementById("scenarioSel");
const scenarioFileSelector = document.getElementById("fileSel");

const statsContainer = document.getElementById("statsContainer");
const previousScenarioButton = document.getElementById("prevBtn");
const nextScenarioButton = document.getElementById("nextBtn");

const instructionsPanel = document.getElementById("instructionsPanel");
const instructionsContainer = document.getElementById("instructions");
const consoleContainer = document.getElementById("consoleOut");
const testsContainer = document.getElementById("testsList");

const previewContainer = document.getElementById("previewWrapper");
const previewFrame = document.getElementById("previewFrame");

// Switches beteen "Tests" and "Browser Output" labels
const paneTitle = {}; // document.getElementById("paneTitle");

const btnFormatCode = document.getElementById("formatBtn");
const btnBrowserOutput = document.getElementById("previewTabBtn");
const btnShowTests = document.getElementById("testsTabBtn");
const btnRunTests = document.getElementById("runTestsBtn");
const btnRunCode = document.getElementById("runCodeBtn");
const btnResetFile = document.getElementById("resetBtn");
const btnToggleInstructions = document.getElementById("toggleInstructions");

const btnJSTestsTab = document.getElementById("js-tests-tab");
const btnHTMLPageTab = document.getElementById("html-page-tab");
const paneJSTestsTab = document.getElementById("js-tests-tab-pane");
const paneHTMLPageTab = document.getElementById("html-page-tab-pane");

const scenarioSelector = document.getElementById("scenarioSelector");

function setPreviewFrameSourceHTML(html) {
  previewFrame.srcdoc = html;
}

const buttons = {
  btnFormatCode,
  btnBrowserOutput,
  btnShowTests,
  btnRunTests,
  btnResetFile,
  btnToggleInstructions,
  btnRunCode,
};

const containers = {
  consoleContainer,
  instructionsContainer,
  testsContainer,
};

const dropdowns = {
  scenarioSelector,
  scenarioFileSelector,
};

function init() {
  setupDOM();
  setupEventListeners();
  // Load feather icons
  if (typeof feather !== "undefined") {
    feather.replace({ width: "16px" });
  }
}

function setupDOM() {
  // Add scenarios to selector menu
  for (const { id, title } of scenarios.getAll()) {
    scenarioSelector.add(new Option(title, id));
  }
}

function clickButton(button) {
  if (Object.values(buttons).includes(button)) {
    button.click();
  }
}

function setButtonEnabled(button, enabled) {
  if (Object.values(buttons).includes(button)) {
    button.disabled = !enabled;
  }
}

function setBrowserOutputButtonEnabled(enabled) {
  btnBrowserOutput.disabled = !enabled;
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

function getScenarioFileSelectorOptions() {
  return Array.from(scenarioFileSelector.options);
}

function clearScenarioFileSelectorOptions() {
  console.log("Clearing scenario selector options");
  scenarioFileSelector.innerHTML = "";
}

/**
 * Sets the selected option in the scenario file selector based on the provided value.
 *
 * @param {string} value - The value of the scenario file to select.
 * @throws {Error} Throws an error if the scenario file is not found in the selector.
 */
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
  consoleContainer.innerHTML = "";
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

  btnFormatCode.addEventListener("click", editor.formatContent);
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

  btnToggleInstructions.addEventListener("click", () => {
    const { display } = getComputedStyle(instructionsPanel);
    instructionsPanel.style.display = display == "none" ? "" : "none";
  });

  btnResetFile.addEventListener("click", () => {
    editor.resetCurrentFile();
  });

  btnRunCode.addEventListener("click", () => {
    const scenario = scenarios.getCurrent();
    if (scenarios.hasHTML(scenario)) {
      preview.refresh();
      setSelectedTabAndPane(paneHTMLPageTab);
    } else {
      runner.execUserJS();
    }
  });
}

function setSelectedTabAndPane(pane) {
  const tabPanes = [paneHTMLPageTab, paneJSTestsTab];
  const tabButtons = [btnHTMLPageTab, btnJSTestsTab];

  for (const _pane of tabPanes) {
    // Determine whether we are enabling this pane/button pair or not
    let enabling = false;
    const button = tabButtons.find(({ id }) => _pane.id.startsWith(id));

    if (_pane == pane) {
      enabling = true;
    }

    // button.disabled = !enabling;
    button.setAttribute("aria-selected", enabling);
    button.classList[enabling ? "add" : "remove"]("active");
    _pane.classList[enabling ? "add" : "remove"]("active", "show");
  }
}

function buildTestsList () {

  const buildTestButton = (config) => {
    const button = document.createElement("li");
    button.classList.add("list-group-item");
    new bootstrap.Tooltip(button, {
      html: true,
      title: "Test: " + config.fn
    });
    button.innerHTML = config.desc;
    return button;
  }

  testsContainer.innerHTML = "";

  const scenario = scenarios.getCurrent();

  for ( const test of scenario.tests ) {
    const button = buildTestButton(test);
    testsContainer.appendChild(button);
  }

}

function selectPreviewTabPane () {
  setSelectedTabAndPane(paneHTMLPageTab);
}

function selectJSTestsPane () {
  setSelectedTabAndPane(paneJSTestsTab);
}

function updateHTMLPreviewTabEnabled() {
  let enabled = false;
  const scenario = scenarios.getCurrent();
  if (scenarios.hasHTML(scenario)) {
    enabled = true;
    btnHTMLPageTab.disabled = false;
    setSelectedTabAndPane(paneHTMLPageTab);
  } else {
    btnHTMLPageTab.disabled = true;
    setSelectedTabAndPane(paneJSTestsTab);
  }

  return enabled;
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
      child.dataset.value = stats[key];
      child.classList.add("changed");
      child.addEventListener(
        "animationend",
        () => child.classList.remove("changed"),
        { once: true }
      );
    }
  }
}

function hideStatsContainer() {
  statsContainer.hidden = true;
}

function showStatsContainer() {
  statsContainer.hidden = false;
}

export default {
  init,
  setPreviewFrameSourceHTML,
  UI: {
    buttons,
    containers,
    setButtonEnabled,
    clickButton,
    setInstructions,
    setSelectedScenarioIndex,
    setSelectedScenarioFileByValue,
    getScenarioFileSelectorOptions,
    clearScenarioFileSelectorOptions,
    addScenarioFilesOption,
    setBrowserOutputButtonEnabled,
    hideStatsContainer,
    showStatsContainer,
    updateStatsContainer,
    updateHTMLPreviewTabEnabled,
    selectPreviewTabPane,
    selectJSTestsPane,
    clearConsole,
    buildTestsList,
  },
};
