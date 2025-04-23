import dom from "./dom.js";
import { execUserJS } from "./runner.js";

export let currentIndex = 0;
export let currentScenarioFile = "";

export const scenarios = [
  {
    id: "add-two-numbers",
    title: "Add Two Numbers",
    difficulty: "beginner",
    defaultFile: "script.js",
    instructions:
      "Implement <code>add(a,b)</code>. The function needs to return the sum of the two arguments provided when called.",
    files: {
      "script.js": `
        function add(a, b) {
          /* TODO */
        }
        console.log(add(2, 3));
      `,
    },
    tests: [
      {
        desc: "add(2, 3) = 5",
        fn: "return add(2,3)===5;",
      },
      {
        desc: "add(5, 10) = 15",
        fn: "return add(5,10)===15;",
      },
    ],
  },
]; // await fetch("scenarios/details.json");

function getAll() {
  return scenarios;
}

function setInitialScenario() {
  setCurrentScenario(0);
}

function setCurrentScenario(scenarioIndex) {
  currentIndex = scenarioIndex;
}

function getCurrentScenario() {
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
  getCurrentScenario().files[currentScenarioFile] = content;
}

function getCurrentScenarioFileContent() {
  return getCurrentScenario().files[currentFile];
}

export function loadScenario(index = 0) {
  setCurrentScenario(index);
  const scenario = scenarios[index];
  dom.UI.setSelectedScenarioIndex(index);
  dom.UI.setInstructions(scenario.instructions);
  dom.UI.clearConsole();
  populateFileSelectorFromScenario(scenario);

  const hasHtml = scenario.files.hasOwnProperty("index.html");

  dom.UI.setButtonDisabled(dom.UI.BUTTONS.btnBrowserOutput, !hasHtml);

  if (!hasHtml) {
    dom.UI.BUTTONS.btnShowTests.click();
  }

  setCurrentScenarioFile(Object.keys(scenario.files)[0]);

  hasHtml ? updatePreview() : execUserJS();
}

function populateFileSelectorFromScenario(scenario) {
  dom.UI.clearScenarioSelectorOptions();
  Object.keys(scenario.files).forEach(dom.UI.addScenarioFilesOption);
}

export default {
  getAll,
  setInitialScenario,
  setCurrentScenario,
  getCurrentScenario,
  setCurrentScenarioFile,
  getCurrentScenarioFile,
  getCurrentScenarioFileContent,
  setCurrentScenarioFileContent,
  loadNext,
  loadPrevious,
};
