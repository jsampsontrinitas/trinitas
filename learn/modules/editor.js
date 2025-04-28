import { debounce, modeFor, logLine } from "./utils.js";
import analyzer from "./analyzer.js";
import runner from "./runner.js";
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
  runner.createCapturedConsoleListener();
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
  const scenario = scenarios.getCurrent();
  codeMirror.setOption("mode", modeFor(scenarioFileName));
  codeMirror.setValue(scenario.files[scenarioFileName]);
  dom.UI.setSelectedScenarioFileByValue(scenarioFileName);
  clearMarks();
  dom.UI.clearConsole();
  setTimeout(async () => {
    await formatCurrentFile();
  }, 10);
}

function onEdit() {
  // Updates the scenario file source so the changes persist across
  // file-selection changes
  scenarios.setCurrentScenarioFileContent(codeMirror.getValue());
  analyzer.analyze();

  const scenario = scenarios.getCurrent();
  const hasIndexHtml = scenario.files.hasOwnProperty("index.html");

  if (hasIndexHtml) updatePreview();
  else runner.execUserJS();
}

export default {
  init,
  markWarn,
  clearMarks,
  formatCurrentFile,
  setCurrentScenarioFile,
  getCodeMirrorInstance,
};
