import { debounce, modeFor, logLine } from "./utils.js";
import analyzer from "./analyzer.js";
import runner from "./runner.js";
import preview from "./preview.js";
import scenarios from "./scenarios.js";
import dom from "./dom.js";
import scenarioCache from "./scenarioCache.js";

const astMarks = [];

// Initialize a code mirror instance
const codeMirror = CodeMirror.fromTextArea(
  document.getElementById("textAreaEditor"),
  { lineNumbers: true, mode: "javascript" }
);

const debouncedOnEdit = debounce(onEdit, 400);

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

/**
 * When onEdit is called, we trigger analysis of the code.
 * This can be annoying, since it might populate the console
 * with log ouput and more. As such, we provide two methods
 * to enable/disable the onEdit analysis. With these, the
 * behavior can be disabled when we are loading/formatting
 * a new file into the editor, and re-enabled after that
 * action has been completed.
 */
function enableOnEditAnalysis() {
  codeMirror.on("change", debouncedOnEdit);
}

function disableOnEditAnalysis() {
  codeMirror.off("change", debouncedOnEdit);
}

function init() {
  // Load our first scenario
  scenarios.loadScenario(0);
}

function getCodeMirrorInstance() {
  return codeMirror;
}

function resetCurrentFile() {
  const scenario = scenarios.getCurrent();
  const scenarioFile = scenarios.getCurrentScenarioFile();
  const content = scenario.files[scenarioFile];

  setContent(content, false);
}

function setContent(content, doImmediateAnalysis = true) {
  const codeMirror = getCodeMirrorInstance();

  if (!doImmediateAnalysis) {
    disableOnEditAnalysis();
  }

  clearMarks();
  codeMirror.setValue(content);

  if (!doImmediateAnalysis) {
    enableOnEditAnalysis();
  }
}

async function formatContent() {
  const codeMirror = getCodeMirrorInstance();
  const unformatted_code = codeMirror.getValue();

  const scenario = scenarios.getCurrent();
  const scenarioFile = scenarios.getCurrentScenarioFile();

  // Determine proper parser engine (defaulting to babel for JS)
  let parser = "babel";

  if (scenarioFile.endsWith(".css")) {
    parser = "css";
  } else if (scenarioFile.endsWith(".html")) {
    parser = "html";
  }

  // Attempt to format the code
  try {
    const options = { parser, plugins: prettierPlugins };
    const formatted_code = await prettier.format(unformatted_code, options);

    if (formatted_code === unformatted_code) {
      logLine(`Code is already formatted.`);
      return;
    }

    setContent(formatted_code, false);
    scenarioCache.setCached(scenario.id, scenarioFile, formatted_code);
  } catch (error) {
    logLine("Format error: " + error.message);
  }
}

/**
 * Sets the current scenario file in the editor environment.
 * Updates the scenario context, configures the editor mode, loads the file content,
 * updates the UI selection, clears editor marks, and resets the console.
 *
 * @param {string} scenarioFileName - The name of the scenario file (e.g., 'scripts.js') to set as current.
 */
function setCurrentScenarioFile(scenarioFileName) {
  scenarios.setCurrentScenarioFile(scenarioFileName);

  const scenario = scenarios.getCurrent();

  codeMirror.setOption("mode", modeFor(scenarioFileName));
  codeMirror.setValue(scenario.files[scenarioFileName]);

  dom.UI.setSelectedScenarioFileByValue(scenarioFileName);
  dom.UI.clearConsole();
  clearMarks();
}

function onEdit() {
  console.debug(`File edited`);
  const content = codeMirror.getValue();
  const scenario = scenarios.getCurrent();
  const scenarioFile = scenarios.getCurrentScenarioFile();

  scenarioCache.setCached(scenario.id, scenarioFile, content);

  analyzer.analyze();

  if (scenario.files["index.html"]) {
    preview.refresh();
    return;
  }

  runner.execUserJS();
}

export default {
  init,
  markWarn,
  clearMarks,
  formatContent,
  setCurrentScenarioFile,
  getCodeMirrorInstance,
  resetCurrentFile,
};
