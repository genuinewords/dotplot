import type { APIRoute } from "astro";
import siteConfig from "@src/config/site.json";

export const GET: APIRoute = () => {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteConfig.siteUrl}/sitemap-index.xml
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
