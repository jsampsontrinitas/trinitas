/***** Sample Scenarios *****/
const scenarios = [
  {
    id: "add-two-numbers",
    title: "Add Two Numbers",
    difficulty: "beginner",
    instructions: `Implement <code>add(a,b)</code>. The function needs to return the sum of the two arguments provided when called.`,
    files: {
      "script.js": `
        function add (a, b) {
          /* TODO */
        }

        console.log(add(2,3));
      `,
    },
    defaultFile: "script.js",
    tests: [
      {
        desc: "add(2, 3) = 5",
        fn: `return add(2,3)===5;`,
      },
      {
        desc: "add(5, 10) = 15",
        fn: `return add(5,10)===15;`,
      },
    ],
  },
  {
    id: "toggle-box",
    title: "Toggle Box",
    difficulty: "beginner",
    instructions: "Toggle class active on click.",
    files: {
      "index.html": `
        <div id=box>Click me</div>
      `,
      "style.css": `
        #box{
          width: 120px;
          border: 4px solid red;
        }
          
        #box.active{
          border-color: green
        }
      `,
      "script.js": `
        function setup() {
          const box = document.getElementById('box');
          box.addEventListener('click', () => box.classlist.toggle('active'));
        }
        
        setup();
      `,
    },
    defaultFile: "index.html",
    tests: [
      {
        desc: "toggle works",
        fn: `
          const box = document.getElementById('box');
          box.click();
          return box.classList.contains('active');
        `,
      },
    ],
  },
  {
    id: "reverse-a-string",
    title: "Reverse a String",
    difficulty: "beginner",
    instructions: `
      <p>Write <code>reverse(str)</code> so it returns <em>str</em> backwards.<br>
      Hints: split the string into an array (<code>String.prototype.split</code>),
      reverse it (<code>Array.prototype.reverse</code>), then join it back
      together.</p>`,
    files: {
      "script.js": `
        // Return a new string that is the reverse of 'str'
        function reverse (str) {
          /* TODO */
        }
  
        console.log(reverse("hello")); // "olleh"
      `,
    },
    defaultFile: "script.js",
    tests: [
      {
        desc: `reverse("racecar") → "racecar"`,
        fn: `return reverse("racecar")==="racecar";`,
      },
      {
        desc: `reverse("JavaScript") → "tpircSavaJ"`,
        fn: `return reverse("JavaScript")==="tpircSavaJ";`,
      },
    ],
  },
  {
    id: "filter-even-numbers",
    title: "Filter Even Numbers",
    difficulty: "beginner",
    instructions: `
      <p>Complete <code>filterEven(nums)</code> so it returns a <strong>new</strong>
      array containing only the even numbers in <em>nums</em>.<br>
      Try <code>Array.prototype.filter</code> with a modulus check
      (<code>n % 2 === 0</code>).</p>`,
    files: {
      "script.js": `
        function filterEven (nums) {
          /* TODO */
        }
  
        console.log(filterEven([1,2,3,4])); // [2,4]
      `,
    },
    defaultFile: "script.js",
    tests: [
      {
        desc: `[1,2,3] → [2]`,
        fn: `return JSON.stringify(filterEven([1,2,3]))==='[2]';`,
      },
      {
        desc: `[4,5,6,7] → [4,6]`,
        fn: `return JSON.stringify(filterEven([4,5,6,7]))==='[4,6]';`,
      },
    ],
  },
  {
    id: "factorial",
    title: "Factorial",
    difficulty: "beginner",
    instructions: `
      <p>Implement <code>factorial(n)</code> recursively or with a loop.<br>
      Remember: <code>0!</code> is <code>1</code>.</p>`,
    files: {
      "script.js": `
        function factorial (n) {
          /* TODO */
        }
  
        console.log(factorial(5)); // 120
      `,
    },
    defaultFile: "script.js",
    tests: [
      { desc: "factorial(0) = 1", fn: `return factorial(0)===1;` },
      { desc: "factorial(5) = 120", fn: `return factorial(5)===120;` },
    ],
  },
  {
    id: "sum-object-values",
    title: "Sum Object Values",
    difficulty: "beginner",
    instructions: `
      <p>Create <code>sumValues(obj)</code> that adds up all
      <em>own</em> numeric properties of <em>obj</em>.<br>
      Use <code>Object.values</code> and <code>Array.prototype.reduce</code>.</p>`,
    files: {
      "script.js": `
        function sumValues (obj) {
          /* TODO */
        }
  
        console.log(sumValues({a:1,b:2,c:3})); // 6
      `,
    },
    defaultFile: "script.js",
    tests: [
      { desc: `{x:2,y:8} → 10`, fn: `return sumValues({x:2,y:8})===10;` },
      {
        desc: `{a:1,b:'two',c:3} → 4`,
        fn: `return sumValues({a:1,b:'two',c:3})===4;`,
      },
    ],
  },
  {
    id: "click-counter",
    title: "Click Counter",
    difficulty: "beginner",
    instructions: `
      <p>When the button is clicked, increment the number inside the <code>&lt;span id="count"&gt;</code>.</p>
      <p class="hint">You can convert the current text to a number with <code>parseInt</code>, <code>Number()</code>, or unary&nbsp;<code>+</code>, then set/update the <code>.textContent</code> property.</p>`,
    files: {
      "index.html": `
        <button id="btn">Clicked <span id="count">0</span> times</button>
      `,
      "script.js": `
        function setup () {
          const btn   = document.getElementById('btn');
          const count = document.getElementById('count');
          btn.addEventListener('click', () => {
            /* TODO */
          });
        }
        setup();
      `,
    },
    defaultFile: "index.html",
    tests: [
      {
        desc: "increments after click",
        fn: `
          const btn = document.getElementById('btn');
          const span = document.getElementById('count');
          btn.click();  // 1
          btn.click();  // 2
          return span.textContent === "2";
        `,
      },
    ],
  },
  {
    id: "highlight-long-words",
    title: "Highlight Long Words",
    difficulty: "intermediate",
    instructions: `
      <p>On button click, wrap every word <strong>longer than 6 letters</strong>
      inside each <code>&lt;p&gt;</code> with a <code>&lt;span
      class="highlight"&gt;</code>.<br>
      Use <code>Element.querySelectorAll</code>, string
      <code>.split()</code>, and <code>Array.prototype.map</code>.</p>
      <style>
        .highlight { background: yellow; }
      </style>`,
    files: {
      "index.html": `
        <button id="doit">Highlight!</button>
        <p id="text">JavaScript enables interactive web applications effortlessly.</p>
      `,
      "script.js": `
        function setup () {
          const btn  = document.getElementById('doit');
          const text = document.getElementById('text');
          btn.addEventListener('click', () => {
            /* TODO */
          });
        }
        setup();
      `,
    },
    defaultFile: "index.html",
    tests: [
      {
        desc: "words >6 chars are wrapped",
        fn: `
          document.getElementById('doit').click();
          return document.querySelectorAll('#text .highlight').length === 3; // JavaScript, enables, applications
        `,
      },
    ],
  },
];

/***** DOM refs *****/
const scenarioSelectorElement = document.getElementById("scenarioSel");
const fileSelectorElement = document.getElementById("fileSel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const formatBtn = document.getElementById("formatBtn");
const instructionsDiv = document.getElementById("instructions");
const consoleOut = document.getElementById("consoleOut");
const testsOut = document.getElementById("testsOut");
const previewWrap = document.getElementById("previewWrap");
const previewFrame = document.getElementById("previewFrame");
const testsTabBtn = document.getElementById("testsTabBtn");
const previewTabBtn = document.getElementById("previewTabBtn");
const runBtn = document.getElementById("runBtn");
const paneTitle = document.getElementById("paneTitle");

/***** CodeMirror *****/
const cm = CodeMirror.fromTextArea(document.getElementById("textAreaEditor"), {
  lineNumbers: true,
  mode: "javascript",
});

cm.on("change", debounce(onEdit, 400));

let astMarks = [];

/***** Init *****/
scenarios.forEach((s, i) =>
  scenarioSelectorElement.add(new Option(s.title, i))
);

let current = 0;
let currentFile = "";

loadScenario(0);

/***** Event wiring *****/
scenarioSelectorElement.addEventListener("change", (e) =>
  loadScenario(+e.target.value)
);

prevBtn.addEventListener("click", () =>
  loadScenario((current - 1 + scenarios.length) % scenarios.length)
);

nextBtn.addEventListener("click", () =>
  loadScenario((current + 1) % scenarios.length)
);

formatBtn.addEventListener("click", async () => {
  const code = cm.getValue();
  let parser = "babel";

  if (currentFile.endsWith(".css")) parser = "css";
  else if (currentFile.endsWith(".html")) parser = "html";

  try {
    const formatted = await prettier.format(code, {
      parser,
      plugins: prettierPlugins,
    });
    cm.setValue(formatted);
  } catch (e) {
    logLine("Format error: " + e.message);
  }
});

fileSelectorElement.addEventListener("change", (e) =>
  setCurrentFile(e.target.value)
);

runBtn.addEventListener("click", runTests);

testsTabBtn.addEventListener("click", () => {
  previewWrap.classList.add("hidden");
  testsOut.classList.remove("hidden");
  paneTitle.textContent = "Tests";
});

previewTabBtn.addEventListener("click", () => {
  previewWrap.classList.remove("hidden");
  testsOut.classList.add("hidden");
  paneTitle.textContent = "Browser Output";
});

window.addEventListener("message", (e) => {
  if (e.data?.type === "console") {
    logLine(`${e.data.kind}: ${e.data.args.join(" ")}`);
  }
});

/***** Scenario load *****/
function loadScenario(index) {
  current = index;
  const scenario = scenarios[index];
  scenarioSelectorElement.value = index;
  instructionsDiv.innerHTML = scenario.instructions;
  consoleOut.textContent = "";
  testsOut.textContent = "Press Run Tests";
  populateFileSelector(scenario);

  const hasHtml = hasIndexHtmlFile(scenario);
  previewTabBtn.disabled = !hasHtml;
  if (!hasHtml) testsTabBtn.click();

  setCurrentFile(Object.keys(scenario.files)[0]);

  hasHtml ? updatePreview() : execUserJS();
}

function populateFileSelector(scenario) {
  fileSelectorElement.innerHTML = "";
  for (const filename of Object.keys(scenario.files)) {
    fileSelectorElement.add(new Option(filename));
  }
}

function setCurrentFile(name) {
  currentFile = name;
  const sc = scenarios[current];
  cm.setOption("mode", modeFor(name));
  cm.setValue(sc.files[name]);
  fileSelectorElement.value = name;
  clearMarks();
  setTimeout(() => {
    formatBtn.click();
  }, 10);
  analyze();
}

function modeFor(filename) {
  return filename.endsWith(".css")
    ? "css"
    : filename.endsWith(".html")
    ? "htmlmixed"
    : "javascript";
}

/***** Editor change *****/
function onEdit() {
  scenarios[current].files[currentFile] = cm.getValue();
  analyze();
  hasIndexHtmlFile(scenarios[current]) ? updatePreview() : execUserJS();
}

/***** AST analysis *****/
function analyze() {
  clearMarks(); // remove previous highlights
  if (!currentFile.endsWith(".js")) return;

  const code = cm.getValue();
  let ast;

  /* 1.  Parse (bail early on syntax errors) */
  try {
    ast = acorn.parse(code, { ecmaVersion: "latest", locations: true });
  } catch (err) {
    if (err.loc) markWarn(err.loc.line - 1);
    logLine(`Syntax error: ${err.message}`);
    return;
  }

  /* 2.  Gather stats while walking */
  const stats = { loops: 0, whileTrue: 0, forInf: 0, recur: [] };
  const callGraph = new Map(); // fn → Set(callees)

  const addCall = (from, to) => {
    if (!from || !to) return;
    (callGraph.get(from) ?? callGraph.set(from, new Set()).get(from)).add(to);
  };

  acorn.walk.recursive(
    ast,
    { currentFn: null }, // state that bubbles down
    {
      /* ─── functions ───────────────────────────────────────────── */
      FunctionDeclaration(node, st, c) {
        const prev = st.currentFn;
        st.currentFn = node.id?.name ?? null;
        c(node.body, st);
        st.currentFn = prev;
      },
      FunctionExpression(node, st, c) {
        const prev = st.currentFn;
        st.currentFn = null; // anonymous / not tracked
        c(node.body, st);
        st.currentFn = prev;
      },
      ArrowFunctionExpression(node, st, c) {
        const prev = st.currentFn;
        st.currentFn = null;
        if (node.body) c(node.body, st);
        st.currentFn = prev;
      },

      /* ─── calls ──────────────────────────────────────────────── */
      CallExpression(node, st, c) {
        if (node.callee.type === "Identifier") {
          addCall(st.currentFn, node.callee.name);
        }
        acorn.walk.base.CallExpression(node, st, c);
      },

      /* ─── loops ──────────────────────────────────────────────── */
      WhileStatement(node, st, c) {
        stats.loops++;
        if (
          !node.test ||
          (node.test.type === "Literal" && node.test.value === true)
        ) {
          stats.whileTrue++;
          markWarn(node.loc.start.line - 1);
        }
        acorn.walk.base.WhileStatement(node, st, c);
      },
      ForStatement(node, st, c) {
        stats.loops++;
        if (!node.test) {
          // for(;;)
          stats.forInf++;
          markWarn(node.loc.start.line - 1);
        }
        acorn.walk.base.ForStatement(node, st, c);
      },
      DoWhileStatement(node, st, c) {
        stats.loops++;
        acorn.walk.base.DoWhileStatement(node, st, c);
      },
    }
  );

  /* 3.  Self‑recursion detection */
  for (const [fn, callees] of callGraph) {
    if (callees.has(fn)) {
      stats.recur.push(fn);
      const decl = findDecl(ast, fn);
      if (decl) markWarn(decl.loc.start.line - 1);
    }
  }

  /* 4.  Emit summary & warnings */
  consoleOut.textContent = `Functions: ${callGraph.size}   Loops: ${stats.loops}\n`;
  if (stats.whileTrue) logLine("⚠ while(true) detected");
  if (stats.forInf) logLine("⚠ for(;;) detected");
  if (stats.recur.length) logLine("⚠ recursion: " + stats.recur.join(", "));
}

function findDecl(ast, name) {
  let out = null;
  acorn.walk.simple(ast, {
    FunctionDeclaration: (n) => {
      if (n.id?.name === name) out = n;
    },
  });
  return out;
}

function markWarn(line) {
  astMarks.push(cm.addLineClass(line, "background", "ast-warn"));
}

function clearMarks() {
  astMarks.forEach((m) => cm.removeLineClass(m, "background", "ast-warn"));
  astMarks.length = 0;
}

/***** JS execution (non‑HTML) *****/
function execUserJS() {
  const js = gatherJS(scenarios[current]);
  captureConsole(() => {
    try {
      new Function(js)();
    } catch (e) {
      console.error(e);
    }
  });
}

function gatherJS(scenario) {
  return Object.entries(scenario.files)
    .filter(([n]) => n.endsWith(".js"))
    .map(([, c]) => c)
    .join("\n");
}

function captureConsole(userCodeExecutorFunction) {
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

function logLine(text) {
  consoleOut.appendChild(
    document.createElement("div")
  ).textContent = text;
}

/***** Preview build *****/
function updatePreview() {
  previewFrame.srcdoc = buildDoc(scenarios[current]);
}

/**
 * Constructs an HTML document by combining provided HTML, CSS, and JavaScript files.
 *
 * @param {Object} sc - The source context containing files to build the document.
 * @param {Object.<string, string>} sc.files - A mapping of file names to their content.
 * @returns {string} The constructed HTML document as a string.
 *
 * @description
 * This function takes a collection of files and builds a complete HTML document.
 * - The `index.html` file (if present) is used as the `<body>` content.
 * - CSS files are converted into `<style>` tags and injected into the `<head>`.
 * - JavaScript files are converted into `<script>` tags and injected into the `<body>`.
 * - A script is added to pipe console messages to the parent window for UI integration.
 */
function buildDoc(sc) {
  // Find out index.html and use it as our <body> content
  const htmlName = Object.keys(sc.files).find((f) => f.endsWith("index.html"));

  // Construct the rest of the document around the body content
  let html = `<!DOCTYPE html><html><head></head><body>${
    htmlName ? sc.files[htmlName] : ""
  }</body></html>`;

  // Convert our CSS files into style tags
  const styles = Object.entries(sc.files)
    .filter(([name, content]) => name.endsWith(".css"))
    .map(([name, content]) => `<style>${content}</style>`)
    .join("\n");

  // Convert our JavaScript into script tags
  const scripts = Object.entries(sc.files)
    .filter(([name, content]) => name.endsWith(".js"))
    .map(([name, content]) => `<script>${content}</script>`)
    .join("\n");

  // Pipe any console messages to the parent so we can rely to use in UI
  const bridge = `<script>(() => {
      ['log','info','warn','error'].forEach( k => {
        const original = console[k];
        console[k] = (...a) => {
          parent.postMessage({ type: 'console', kind: k, args: a },'*');        
          original(...a);
        };
      });
    })();
  </script>`;

  // Inject styles, console-piping logic, and scripts into the HTML
  html = html
    .replace(/<\/head>/i, (match) => styles + bridge + match)
    .replace(/<\/body>/i, (match) => scripts + match);

  // Return the result
  return html;
}

function hasIndexHtmlFile(sc) {
  return Object.keys(sc.files).some((f) => f.endsWith("index.html"));
}

/***** Test Runner *****/
function runTests() {
  testsOut.textContent = "Running…";
  const currentScenario = scenarios[current];
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.append(iframe);

  const finish = (res) => {
    document.body.removeChild(iframe);
    displayTestResults(res);
  };

  const evalTests = (win) => {
    const res = [];
    for (const t of currentScenario.tests) {
      let pass = false;
      try {
        pass = win.eval(`(()=>{${t.fn}})()`);
      } catch {}
      res.push({ desc: t.desc, pass });
    }
    return res;
  };

  if (hasIndexHtmlFile(currentScenario)) {
    iframe.srcdoc = buildDoc(currentScenario);
    iframe.onload = () => finish(evalTests(iframe.contentWindow));
  } else {
    iframe.contentWindow.eval(gatherJS(currentScenario));
    finish(evalTests(iframe.contentWindow));
  }
}

function displayTestResults(results) {
  testsOut.innerHTML = results
    .map(
      (r) =>
        `<div class="${r.pass ? "pass" : "fail"}">${r.pass ? "✔" : "✖"} ${
          r.desc
        }</div>`
    )
    .join("");
}

/***** helpers *****/
function debounce(fn, ms) {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}
