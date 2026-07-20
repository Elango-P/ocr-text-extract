const fs = require("fs");
const path = require("path");

const postsFile = "./app/lib/blog/posts.js";
let content = fs.readFileSync(postsFile, "utf-8");

const blogDir = "./content/blog";
const validSlugs = fs.readdirSync(blogDir).filter(f => f.endsWith(".md")).map(f => f.replace(".md", ""));

// We will use regex to find the `export const posts = [...]` array and replace it.
// Actually, it's easier to just match each object and see if its slug is in validSlugs.
// But wait, the file is a JS module. 
// A safer way: read the file, look for slugs, and if a slug is not valid, remove the entire object.

const lines = content.split('\n');
let newLines = [];
let inObject = false;
let currentObjectLines = [];
let currentSlug = "";

for (let line of lines) {
  if (line.includes("{") && line.trim() === "{") {
    inObject = true;
    currentObjectLines = [line];
    currentSlug = "";
  } else if (inObject) {
    currentObjectLines.push(line);
    const slugMatch = line.match(/slug:\s*"([^"]+)"/);
    if (slugMatch) {
      currentSlug = slugMatch[1];
    }
    if (line.includes("},")) {
      inObject = false;
      if (validSlugs.includes(currentSlug)) {
        newLines.push(...currentObjectLines);
      } else {
        console.log("Removing slug:", currentSlug);
      }
    }
  } else {
    newLines.push(line);
  }
}

fs.writeFileSync(postsFile, newLines.join('\n'));
console.log("Done filtering posts.");
