import * as dom from "./dom.js";
import { scenarios } from "./scenarios.js";

export function updatePreview() {
  dom.previewFrame.srcdoc = buildDoc(scenarios[current]);
}

/**
 * Constructs an HTML document by combining provided HTML, CSS, and JavaScript files.
 *
 * @param {Object} scenario - The source context containing files to build the document.
 * @param {Object.<string, string>} scenario.files - A mapping of file names to their content.
 * @returns {string} The constructed HTML document as a string.
 *
 * @description
 * This function takes a collection of files and builds a complete HTML document.
 * - The `index.html` file (if present) is used as the `<body>` content.
 * - CSS files are converted into `<style>` tags and injected into the `<head>`.
 * - JavaScript files are converted into `<script>` tags and injected into the `<body>`.
 * - A script is added to pipe console messages to the parent window for UI integration.
 */
export function buildDoc(scenario) {
  // Construct the document around the body content
  let html = `<!DOCTYPE html><html><head></head><body>${
    scenario.files["index.html"] ?? ""
  }</body></html>`;

  // Convert our CSS files into style tags
  const styles = Object.entries(scenario.files)
    .filter(([name]) => name.endsWith(".css"))
    .map(([, content]) => `<style>${content}</style>`)
    .join("\n");

  // Convert our JavaScript into script tags
  const scripts = Object.entries(scenario.files)
    .filter(([name]) => name.endsWith(".js"))
    .map(([, content]) => `<script>${content}</script>`)
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
