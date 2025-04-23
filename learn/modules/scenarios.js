import dom from "./dom.js";
import editor from "./editor.js";
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
  loadScenario((current - 1 + scenarios.length) % scenarios.length);
}

function loadNext() {
  loadScenario((current + 1) % scenarios.length);
}

function setCurrentScenarioFileContent(content) {
  scenarios[current].files[currentFile] = content;
}

function getCurrentScenarioFileContent() {
  return scenarios[current].files[currentFile];
}

export function loadScenario(index = 0) {
  current = index;
  const scenario = scenarios[index];
  dom.scenarioSelector.value = index;
  dom.UI.setInstructions(scenario.instructions);
  dom.UI.clearConsole();
  populateFileSelector(scenario);

  const hasHtml = scenario.files.hasOwnProperty("index.html");

  dom.btnBrowserOutput.disabled = !hasHtml;

  if (!hasHtml) {
    testsTabBtn.click();
  }

  setCurrentFile(Object.keys(scenario.files)[0]);

  hasHtml ? updatePreview() : execUserJS();
}

function populateFileSelector(scenario) {
  dom.scenarioFileSelector.innerHTML = "";
  for (const filename of Object.keys(scenario.files)) {
    dom.scenarioFileSelector.add(new Option(filename));
  }
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
