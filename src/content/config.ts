import {defineCollection, reference, z} from 'astro:content';
import {POST_METADATA} from "@/consts.ts";

const authors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    avatar: z.string().optional(),
    occupation: z.string().optional(),
    shortBio: z.string().optional(),
    company: z.string().optional(),
    email: z.string().email(),
    twitter: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    layout: z.string().url().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: ({image}) => z.object({
    title: z.string(),
    cover: image().optional(),
    date: z.coerce.date(),
    tags: z.array(reference('tags')).default(['default']),
    lastmod: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    summary: z.string(),
    images: z.string().optional(),
    authors: z.array(reference('authors')).default(['default']),
    postLayout: z.enum(['simple', 'column']).default(POST_METADATA.defaultLayout as 'simple' | 'column'),
    canonicalUrl: z.string().optional(), // Maybe remove later, as Astro provide a better solution for canonical urls
    // Add related posts
    related: z.array(reference('blog')).default([]),
  }),
});

const tags = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    // TODO: Add support for images and layout
    // image: z.string().optional(),
    // layout: z.string().optional(),
  }),
});

export const collections = {blog, authors, tags};
