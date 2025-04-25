import dom from "./modules/dom.js";
import editor from "./modules/editor.js";
import scenarios from "./modules/scenarios.js";

async function main() {
  await scenarios.init();
  dom.init();
  editor.init();
}

main();
