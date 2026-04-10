// Removes duplicate const API_BASE_URL declarations before the Vercel build
const fs = require("fs");
const path = require("path");

const appPath = path.join(__dirname, "..", "src", "App.js");
let src = fs.readFileSync(appPath, "utf8");

// Count occurrences
const matches = src.match(/const API_BASE_URL\b/g);
if (!matches || matches.length < 2) {
  console.log("fix-app.js: no duplicate found, nothing to do.");
  process.exit(0);
}

console.log(`fix-app.js: found ${matches.length} declarations of API_BASE_URL — removing duplicates.`);

// Keep only the FIRST declaration; remove every subsequent block:
//   const API_BASE_URL = ...;\n
//   (optional blank)\n
//   if (!API_BASE_URL) { ... }\n
let first = true;
src = src.replace(
  /const API_BASE_URL\s*=\s*[^\n]+\n(\n?if\s*\(!API_BASE_URL\)\s*\{[^}]*\}\n)?/g,
  (match) => {
    if (first) { first = false; return match; }
    return "";
  }
);

fs.writeFileSync(appPath, src, "utf8");
console.log("fix-app.js: duplicate removed.");
