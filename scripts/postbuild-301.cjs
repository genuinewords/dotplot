const fs = require("fs");
const path = require("path");
const configPath = path.join(__dirname, "..", ".vercel", "output", "config.json");

try {
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  let changed = false;
  for (const route of config.routes) {
    if (route.status === 308) {
      route.status = 301;
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(configPath, JSON.stringify(config, null, "\t"));
    console.log("Replaced 308 redirects with 301 in Vercel config.json");
  } else {
    console.log("No 308 redirects found in Vercel config.json");
  }
} catch (e) {
  console.error("Could not modify Vercel config.json:", e.message);
}
