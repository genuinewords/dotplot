import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.dotplotmaker.com",
  trailingSlash: "always",
  output: "static",
  adapter: vercel(),
  redirects: {
    "/blog/dot-plot-vs-histogram": "/dot-plot-vs-histogram/",
  },
  integrations: [mdx(), sitemap()],
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
