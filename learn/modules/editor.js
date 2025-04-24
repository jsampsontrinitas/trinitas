import { debounce, modeFor, logLine } from "./utils.js";
import { analyze } from "./analyzer.js";
import { execUserJS } from "./runner.js";
import { updatePreview } from "./preview.js";
import scenarios from "./scenarios.js";
import dom from "./dom.js";

const astMarks = [];

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

// Initialize a code mirror instance
const codeMirror = CodeMirror.fromTextArea(
  document.getElementById("textAreaEditor"),
  { lineNumbers: true, mode: "javascript" }
);

codeMirror.on("change", debounce(onEdit, 400));

function init() {
  // Load scenario at index 0
  scenarios.loadScenario(0);
}

function getCodeMirrorInstance() {
  return codeMirror;
}

async function formatCurrentFile() {
  console.info("Formatting current file");
  const code = getCodeMirrorInstance().getValue();

  let parser = "babel";
  const currentScenarioFilename = scenarios.getCurrentScenarioFile();

  if (currentScenarioFilename.endsWith(".css")) {
    parser = "css";
  } else if (currentScenarioFilename.endsWith(".html")) {
    parser = "html";
  }

  try {
    const formattedCode = await prettier.format(code, {
      parser,
      plugins: prettierPlugins,
    });
    getCodeMirrorInstance().setValue(formattedCode);
  } catch (error) {
    logLine("Format error: " + error.message);
  }
}

function setCurrentScenarioFile(scenarioFileName) {
  scenarios.setCurrentScenarioFile(scenarioFileName);
  const scenario = scenarios.getCurrentScenario();
  codeMirror.setOption("mode", modeFor(scenarioFileName));
  codeMirror.setValue(scenario.files[scenarioFileName]);
  dom.UI.setSelectedScenarioFileByValue(scenarioFileName);
  clearMarks();
  setTimeout(() => dom.UI.BUTTONS.btnFormatCode.click(), 10);
  analyze();
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

export default {
  init,
  markWarn,
  clearMarks,
  formatCurrentFile,
  setCurrentScenarioFile,
  getCodeMirrorInstance,
};
