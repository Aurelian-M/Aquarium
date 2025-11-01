// server/fix-imports.js
import fs from "fs";
import path from "path";

const dir = path.resolve("./dist");

function walkDir(dir) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith(".js")) {
      let content = fs.readFileSync(fullPath, "utf8");
      // Add .js to relative imports that don't already have an extension
      content = content.replace(/(from\s+['"]\.{1,2}\/[^'"]+)(['"])/g, "$1.js$2");
      fs.writeFileSync(fullPath, content, "utf8");
    }
  }
}

walkDir(dir);
console.log("Fixed relative imports with .js extensions.");
