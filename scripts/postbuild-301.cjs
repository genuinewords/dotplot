const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "..", ".vercel", "output", "config.json");
const staticDir = path.join(__dirname, "..", ".vercel", "output", "static");
const distDir = path.join(__dirname, "..", "dist");

// 1. Ensure no static content file exists for /dot-plot-vs-histogram
const oldBlogPaths = [
  path.join(staticDir, "dot-plot-vs-histogram"),
  path.join(distDir, "dot-plot-vs-histogram"),
  path.join(staticDir, "about-us"),
  path.join(distDir, "about-us"),
  path.join(staticDir, "contact-us"),
  path.join(distDir, "contact-us"),
];

// Clean any leftover locale output folders
const foreignLocales = [
  "hi", "es", "ru", "fr", "de", "it", "pt",
  "bn", "ja", "ko", "ms", "pl", "id", "ar", "bg", "tr", "sv"
];

for (const loc of foreignLocales) {
  oldBlogPaths.push(path.join(staticDir, loc));
  oldBlogPaths.push(path.join(distDir, loc));
}

for (const p of oldBlogPaths) {
  if (fs.existsSync(p)) {
    try {
      fs.rmSync(p, { recursive: true, force: true });
      console.log(`Deleted static directory to prevent duplicate content / locale pages: ${p}`);
    } catch (e) {
      console.warn(`Could not remove ${p}:`, e.message);
    }
  }
}

// 2. Configure authoritative 301 redirects at the top of Vercel config.json
try {
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    
    // Change any existing 308 to 301
    for (const route of config.routes || []) {
      if (route.status === 308) {
        route.status = 301;
      }
    }

    // Explicit redirects that must match BEFORE the trailing slash rule
    // and match both with and without trailing slash
    const mandatoryRedirects = [
      {
        src: "^/dot-plot-vs-histogram(?:/)?$",
        headers: { Location: "/blog/dot-plot-vs-histogram/" },
        status: 301,
      },
      {
        src: "^/about-us(?:/)?$",
        headers: { Location: "/about/" },
        status: 301,
      },
      {
        src: "^/contact-us(?:/)?$",
        headers: { Location: "/contact/" },
        status: 301,
      },
    ];

    // Filter out existing partial/duplicate rules for these paths
    const filteredRoutes = (config.routes || []).filter((r) => {
      if (r.src && (
        r.src.includes("dot-plot-vs-histogram") ||
        r.src.includes("about-us") ||
        r.src.includes("contact-us")
      )) {
        return false;
      }
      return true;
    });

    // Prepend the mandatory redirects right after .well-known (or at the very top)
    const wellKnownIndex = filteredRoutes.findIndex((r) => r.src && r.src.includes(".well-known"));
    const insertIndex = wellKnownIndex >= 0 ? wellKnownIndex + 1 : 0;
    filteredRoutes.splice(insertIndex, 0, ...mandatoryRedirects);

    config.routes = filteredRoutes;
    fs.writeFileSync(configPath, JSON.stringify(config, null, "\t"));
    console.log("Successfully configured server-level 301 redirects in Vercel config.json");
  }
} catch (e) {
  console.error("Error updating Vercel config.json in postbuild:", e.message);
}
