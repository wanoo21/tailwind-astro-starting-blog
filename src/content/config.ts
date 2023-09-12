import {defineCollection, reference, z} from 'astro:content';

const authors = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string(),
        avatar: z.string().optional(),
        occupation: z.string().optional(),
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
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        tags: z.array(z.string()).default([]),
        lastmod: z.coerce.date().optional(),
        draft: z.boolean().default(false),
        summary: z.string().optional(),
        images: z.string().optional(),
        authors: z.array(reference('authors')).default(['default']),
        layout: z.string().optional(),
        bibliography: z.string().optional(),
        canonicalUrl: z.string().optional(),
        // Add related posts
        related: z.array(reference('blog')).default([]),
    }),
});

export const collections = {blog, authors};
