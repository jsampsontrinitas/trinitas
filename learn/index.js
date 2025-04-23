import dom from "./modules/dom.js";
import editor from "./modules/editor.js";

window.addEventListener("message", (event) => {
  if (event.data?.type === "console") {
    const { kind, args } = event.data;
    logLine(`${kind}: ${args.join(" ")}`);
  }
});

async function main() {
  dom.init();
  editor.init();
}

main();
