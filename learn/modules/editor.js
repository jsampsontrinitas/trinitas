import { debounce, modeFor } from "./utils.js";
import { analyze } from "./analyzer.js";
import { execUserJS } from "./runner.js";
import scenarios from "./scenarios.js";

const astMarks = [];

// Initialize a code mirror instance
const options = { lineNumbers: true, mode: "javascript" };
const codeMirror = CodeMirror.fromTextArea(
  document.getElementById("textAreaEditor"),
  options
);

codeMirror.on("change", debounce(onEdit, 400));

function init() {
  scenarios.setInitialScenario();
}

function getCodeMirrorInstance() {
  return codeMirror;
}

function setActiveScenarioFile(scenarioFileName) {
  currentFile = scenarioFileName;
  const sc = scenarios[current];
  codeMirror.setOption("mode", modeFor(name));
  codeMirror.setValue(sc.files[name]);
  dom.scenarioFileSelector.value = name;
  clearMarks();
  setTimeout(() => {
    dom.btnFormatCode.click();
  }, 10);
  analyze();
}

function markWarn(line) {
  astMarks.push(codeMirror.addLineClass(line, "background", "ast-warn"));
}

function clearMarks() {
  for (const mark of astMarks) {
    codeMirror.removeLineClass(mark, "background", "ast-warn");
  }
  // Empties out the array
  astMarks.length = 0;
}

function onEdit() {
  // Updates the scenario file source so the changes persist across
  // file-selection changes
  scenarios.setCurrentScenarioFileContent(codeMirror.getValue());
  analyze();
  if (scenarios.getCurrentScenario().files.hasOwnProperty("index.html")) {
    updatePreview();
  } else {
    execUserJS();
  }
}

export default { init, markWarn, clearMarks, getCodeMirrorInstance };
