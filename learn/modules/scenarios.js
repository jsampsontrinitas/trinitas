import dom from "./dom.js";
import editor from "./editor.js";
import cache from "./scenarioCache.js";
import preview from "./preview.js";

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
  data.forEach((scenario) => scenarios.push(scenario));
  console.info("Loaded scenarios:", scenarios.length);
}

function getAll() {
  return scenarios;
}

function setScenarioIndex(scenarioIndex) {
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
  const scenario = getCurrent();
  const filename = currentFile;

  cache.setCached(scenario.id, filename, content);
}

function getCurrentScenarioFileContent() {
  const scenario = getCurrent();
  const filename = currentScenarioFile;

  return cache.getCached(scenario.id, filename) ?? scenario.files[filename];
}

function hasHTML(scenario) {
  return Object.keys(scenario.files).some((key) => key.endsWith(".html"));
}

export function loadScenario(index = 0) {
  console.debug(`Loading scenario: ${index}`);
  setScenarioIndex(index);
  const scenario = scenarios[index];
  dom.UI.setSelectedScenarioIndex(index);
  dom.UI.setInstructions(scenario.instructions);
  dom.UI.clearConsole();
  populateFileSelectorFromScenario(scenario);

  const hasHtml = scenario.files.hasOwnProperty("index.html");
  const filename = scenario.defaultFile ?? Object.keys(scenario.files)[0];

  editor.setCurrentScenarioFile(filename);
  dom.UI.updateHTMLPreviewTabEnabled();

  if (hasHtml) {
    dom.UI.selectPreviewTabPane();
    preview.refresh();
    return;
  }

  dom.UI.buildTestsList();
  dom.UI.selectJSTestsPane();
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
  setScenarioIndex,
  getCurrent,
  setCurrentScenarioFile,
  getCurrentScenarioFile,
  getCurrentScenarioFileContent,
  setCurrentScenarioFileContent,
  hasHTML,
  loadNext,
  loadPrevious,
  loadScenario,
};
