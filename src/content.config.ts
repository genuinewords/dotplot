import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    date: z.coerce.date(),
    author: z.string().default("Dot Plot Maker® Team"),
    category: z.string().default("Data Visualization"),
  }),
});

export const collections = { blog };
