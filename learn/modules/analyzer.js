import * as dom from "./dom.js";
import { logLine } from "./utils.js";
import scenarios from "./scenarios.js";
import editor from "./editor.js";

export function analyze() {
  editor.clearMarks(); // remove previous highlights

  // We only analyze JS files
  if (!scenarios.getCurrentScenarioFile().endsWith(".js")) return;

  const code = editor.getCodeMirrorInstance().getValue();
  let ast;

  /* 1.  Parse (bail early on syntax errors) */
  try {
    ast = acorn.parse(code, { ecmaVersion: "latest", locations: true });
  } catch (err) {
    if (err.loc) editor.markWarn(err.loc.line - 1);
    logLine(`Syntax error: ${err.message}`);
    return;
  }

  /* 2.  Gather stats while walking */
  const stats = {
    lines: code.split("\n").length,
    functions: 0,
    variables: 0,
    loops: 0,
    branches: 0,
    whileTrue: 0,
    forInf: 0,
    recur: [],
    maxDepth: 0,
  };

  const state = { currentFn: null, depth: 0, maxDepth: 0 };

  const callGraph = new Map(); // fn → Set(callees)

  const addCall = (from, to) => {
    if (!from || !to) return;
    (callGraph.get(from) ?? callGraph.set(from, new Set()).get(from)).add(to);
  };

  acorn.walk.recursive(
    ast,
    state, // state that bubbles down
    {
      // track block nesting
      BlockStatement(node, st, c) {
        st.depth++;
        st.maxDepth = Math.max(st.maxDepth, st.depth);
        acorn.walk.base.BlockStatement(node, st, c);
        st.depth--;
      },

      // functions
      FunctionDeclaration(node, st, c) {
        stats.functions++;
        const prev = st.currentFn;
        st.currentFn = node.id?.name ?? null;
        c(node.body, st);
        st.currentFn = prev;
      },

      FunctionExpression(node, st, c) {
        stats.functions++;
        const prev = st.currentFn;
        st.currentFn = null;
        c(node.body, st);
        st.currentFn = prev;
      },

      ArrowFunctionExpression(node, st, c) {
        stats.functions++;
        const prev = st.currentFn;
        st.currentFn = null;
        if (node.body) c(node.body, st);
        st.currentFn = prev;
      },

      // variables
      VariableDeclaration(node, st, c) {
        stats.variables += node.declarations.length;
        acorn.walk.base.VariableDeclaration(node, st, c);
      },

      // calls (for recursion)
      CallExpression(node, st, c) {
        if (node.callee.type === "Identifier") {
          addCall(st.currentFn, node.callee.name);
        }
        acorn.walk.base.CallExpression(node, st, c);
      },

      // loops
      WhileStatement(node, st, c) {
        stats.loops++;
        if (
          !node.test ||
          (node.test.type === "Literal" && node.test.value === true)
        ) {
          stats.whileTrue++;
          editor.markWarn(node.loc.start.line - 1);
        }
        acorn.walk.base.WhileStatement(node, st, c);
      },

      ForStatement(node, st, c) {
        stats.loops++;
        if (!node.test) {
          stats.forInf++;
          editor.markWarn(node.loc.start.line - 1);
        }
        acorn.walk.base.ForStatement(node, st, c);
      },

      DoWhileStatement(node, st, c) {
        stats.loops++;
        acorn.walk.base.DoWhileStatement(node, st, c);
      },

      ForOfStatement(node, st, c) {
        stats.loops++;
        acorn.walk.base.ForOfStatement(node, st, c);
      },

      ForInStatement(node, st, c) {
        stats.loops++;
        acorn.walk.base.ForInStatement(node, st, c);
      },

      // branches
      IfStatement(node, st, c) {
        stats.branches++;
        acorn.walk.base.IfStatement(node, st, c);
      },

      SwitchCase(node, st, c) {
        stats.branches++;
        acorn.walk.base.SwitchCase(node, st, c);
      },
    }
  );

  /* 3. detect recursion */
  for (const [fn, callees] of callGraph) {
    if (callees.has(fn)) {
      stats.recur.push(fn);
      const decl = findDecl(ast, fn);
      if (decl) editor.markWarn(decl.loc.start.line - 1);
    }
  }

  stats.maxDepth = state.maxDepth;

  /* 4.  Emit summary & warnings */
  // consoleOut.textContent = JSON.stringify(stats, null, 4);
  dom.updateStatsContainer(stats);
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
