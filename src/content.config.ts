import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Блог njxui.dev — SEO-контент (buyer-intent + how-to + build-in-public).
// Markdown в src/content/blog/*.md; листинг /blog, посты /blog/<slug>.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('njX UI'),
    /** одна целевая фраза — просто для нашей аналитики/заметок */
    keyword: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
