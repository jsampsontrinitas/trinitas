import path from "node:path";
import fs from "node:fs/promises";

// Build our JSON file for all scenarios
async function readFile(filename, defaultValue) {
  try {
    return await fs.readFile(filename, "utf-8");
  } catch (e) {
    // If the file doesn't exist, return the default value
    return defaultValue;
  }
}

// Start with a refernce to our details.json file in the current directory
const details = path.join(process.cwd(), "scenarios", "details.json");

// Now cycle over all folders in this same directory
const scenarios = [];

for (const dir of await fs.readdir(path.join(process.cwd(), "scenarios"))) {
  // Check if the folder is a directory
  const stat = await fs.stat(path.join(process.cwd(), "scenarios", dir));

  if (!stat.isDirectory()) {
    continue;
  }

  // Load base exported JSON details from _.js file. This file MUST exist.
  const detailsFile = path.join(process.cwd(), "scenarios", dir, "_.mjs");
  const details = (await import(detailsFile)).default;

  // Get the folder name, as this serves as the scenario identifier
  const folderName = path.basename(dir);

  // Read-in instructions from instructions.html (or use empty string if not found)
  const instructions = await readFile(
    path.join(process.cwd(), "scenarios", dir, "instructions.html"),
    ""
  );

  details.instructions = instructions;
  details.id = folderName;

  // Convert all files (other than _.js and instructions.html, e.g., 'script.js', 'style.css', 'index.html') to a JSON object where the key is the filename, and the value is the file content
  const files = await fs.readdir(path.join(process.cwd(), "scenarios", dir));
  const scenarioFiles = {};

  for (const file of files) {
    if (file === "_.mjs" || file === "instructions.html") {
      continue;
    }

    const filePath = path.join(process.cwd(), "scenarios", dir, file);
    const fileContent = await fs.readFile(filePath, "utf-8");
    scenarioFiles[file] = fileContent;
  }

  // Add the scenario to our array
  scenarios.push(Object.assign(details, { instructions, files: scenarioFiles }));
}

// Now overwrite the details.json file with our new scenarios
const detailsFilePath = path.join(process.cwd(), "scenarios", "details.json");
await fs.writeFile(
  detailsFilePath,
  JSON.stringify(scenarios, null, 2),
  "utf-8"
);

console.log(`Wrote ${detailsFilePath} with ${scenarios.length} scenarios`);
