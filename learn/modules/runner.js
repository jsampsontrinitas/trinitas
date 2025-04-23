import { gatherJS } from "./utils.js";
import scenarios from "./scenarios.js";
import { logLine } from "./utils.js";
import * as dom from "./dom.js";

export function execUserJS() {
  const js = gatherJS(scenarios.getCurrentScenario());
  captureConsole(() => {
    try {
      new Function(js)();
    } catch (e) {
      console.error(e);
    }
  });
}

export function captureConsole(userCodeExecutorFunction) {
  const orig = {};

  for (const key of ["log", "warn", "error", "info"]) {
    orig[key] = console[key];
    console[key] = (...args) => {
      orig[key](...args);
      logLine(`${key}: ${args.join(" ")}`);
    };
  }

  try {
    userCodeExecutorFunction();
  } finally {
    Object.assign(console, orig);
  }
}

export function runTests() {
  dom.testsContainer.textContent = "Running…";
  const currentScenario = scenarios.getCurrentScenario();
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.append(iframe);

  const finish = (res) => {
    document.body.removeChild(iframe);
    displayTestResults(res);
  };

  const evalTests = (win) => {
    const res = [];
    for (const test of currentScenario.tests) {
      let pass = false;
      try {
        pass = win.eval(`(()=>{${test.fn}})()`);
      } catch {}
      res.push({ desc: test.desc, pass });
    }
    return res;
  };

  if (currentScenario.files.hasOwnProperty("index.html")) {
    iframe.srcdoc = buildDoc(currentScenario);
    iframe.onload = () => finish(evalTests(iframe.contentWindow));
  } else {
    iframe.contentWindow.eval(gatherJS(currentScenario));
    finish(evalTests(iframe.contentWindow));
  }
}

function displayTestResults(results) {
  dom.testsContainer.innerHTML = results
    .map(
      (r) =>
        `<div class="${r.pass ? "pass" : "fail"}">${r.pass ? "✔" : "✖"} ${
          r.desc
        }</div>`
    )
    .join("");
}
