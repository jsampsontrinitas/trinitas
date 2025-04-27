import dom from "./dom.js";
import editor from "./editor.js";
import { updatePreview } from "./preview.js";
import runner from "./runner.js";

export let currentIndex = 0;
export let currentScenarioFile = "";

const scenarios = [];

async function init() {
  console.info("Loading scenarios...");
  // Run `node scenarios/build.js` from /learn to generate the
  // scenarios file. This will create a `scenarios/details.json`
  // file that contains all the scenarios in JSON format.
  const response = await fetch("./scenarios/details.json");
  const data = await response.json();
  for (const scenario of data) {
    scenarios.push(scenario);
  }
  console.info("Loaded scenarios:", scenarios.length);
}

function getAll() {
  return scenarios;
}

function setInitialScenario() {
  setCurrentScenario(0);
}

function setCurrentScenario(scenarioIndex) {
  currentIndex = scenarioIndex;
}

function getCurrent() {
  return scenarios[currentIndex];
}

function setCurrentScenarioFile(scenarioFileName) {
  currentScenarioFile = scenarioFileName;
}

function getCurrentScenarioFile() {
  return currentScenarioFile;
}

function loadPrevious() {
  loadScenario((currentIndex - 1 + scenarios.length) % scenarios.length);
}

function loadNext() {
  loadScenario((currentIndex + 1) % scenarios.length);
}

function setCurrentScenarioFileContent(content) {
  getCurrent().files[currentScenarioFile] = content;
}

function getCurrentScenarioFileContent() {
  return getCurrent().files[currentFile];
}

export function loadScenario(index = 0) {
  setCurrentScenario(index);
  const scenario = scenarios[index];
  dom.UI.setSelectedScenarioIndex(index);
  dom.UI.setInstructions(scenario.instructions);
  dom.UI.clearConsole();
  populateFileSelectorFromScenario(scenario);

  const hasHtml = scenario.files.hasOwnProperty("index.html");

  dom.UI.setButtonEnabled(dom.UI.buttons.btnBrowserOutput, hasHtml);

  if (!hasHtml) {
    dom.UI.clickButton(dom.UI.buttons.btnShowTests);
  }

  editor.setCurrentScenarioFile(
    scenario.defaultFile ?? Object.keys(scenario.files)[0]
  );

  hasHtml ? updatePreview() : runner.execUserJS();
}

function populateFileSelectorFromScenario(scenario) {
  if (dom.UI.getScenarioFileSelectorOptions().length > 0) {
    // Clear scenario files from previous scenario
    dom.UI.clearScenarioFileSelectorOptions();
  }

  Object.keys(scenario.files).forEach((filename) => {
    dom.UI.addScenarioFilesOption(filename, filename);
  });
}

export default {
  init,
  getAll,
  setInitialScenario,
  setCurrentScenario,
  getCurrent,
  setCurrentScenarioFile,
  getCurrentScenarioFile,
  getCurrentScenarioFileContent,
  setCurrentScenarioFileContent,
  loadNext,
  loadPrevious,
  loadScenario,
};
