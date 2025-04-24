import { gatherJS } from "./utils.js";
import scenarios from "./scenarios.js";
import dom from "./dom.js";
import preview from "./preview.js";

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

      // We post these to the parent window for logging in the UI
      // The parent window contains the following listener:
      // window.addEventListener("message", (event) => {
      //    if (event.data?.type === "console") {
      //      const { kind, args } = event.data;
      //      logLine(`${kind}: ${args.join(" ")}`);
      //    }
      // });
      //
      // This is in index.js

      window.parent.postMessage(
        { type: "console", kind: key, args: [...args] },
        "*"
      );
    };
  }

  try {
    userCodeExecutorFunction();
  } finally {
    Object.assign(console, orig);
  }
}

export function runTests() {
  dom.UI.CONTAINERS.testsContainer.textContent = "Running…";
  const currentScenario = scenarios.getCurrentScenario();

  // TODO: We need to inject into the iframe our
  // "capture console" logic so that we can capture console
  // messages from the tests.
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
    iframe.srcdoc = preview.buildDoc(currentScenario);
    iframe.onload = () => finish(evalTests(iframe.contentWindow));
  } else {
    iframe.contentWindow.eval(gatherJS(currentScenario));
    finish(evalTests(iframe.contentWindow));
  }
}

function displayTestResults(results) {
  const container = dom.UI.CONTAINERS.testsContainer;
  const fragment = document.createDocumentFragment();

  for (const result of results) {
    const element = document.createElement("div");
    const className = result.pass ? "pass" : "fail";
    const description = (result.pass ? "✔" : "✖") + result.desc;

    element.classList.add(className);
    element.textContent = description;
    fragment.appendChild(element);
  }

  // Remove all elements from within the test container
  for (const child of container.childNodes) {
    child.remove();
  }

  // Add our document fragment as the only child
  container.append(fragment);
}
