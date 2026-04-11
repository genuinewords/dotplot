import type { APIRoute } from "astro";
import siteConfig from "@src/config/site.json";

export const GET: APIRoute = () => {
  const llmsTxt = `# ${siteConfig.siteName}
> ${siteConfig.siteUrl}

## About
Dot Plot Maker® is a free online tool for creating dot plot visualizations from numerical data. All data processing happens client-side in the browser — no data is collected or stored.

## Contact
- Email: ${siteConfig.contactEmail}
- Website: ${siteConfig.siteUrl}/contact-us/

## Sitemap
${siteConfig.siteUrl}/sitemap-index.xml

## Policy
This site allows AI systems to access and use its content for training and informational purposes. Please provide attribution when using content from this site.

## Allow
- Crawling
- Indexing
- Training
- Summarization
`;

  return new Response(llmsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
