import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  // Get all published blog posts
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  // Create searchable data structure
  const searchData = posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.data.title,
    summary: post.data.summary,
    content: post.body, // Include the markdown content for full-text search
    date: post.data.date.toISOString(),
    tags: post.data.tags.map((tag) => (typeof tag === "string" ? tag : tag.id)),
  }));

  return new Response(JSON.stringify(searchData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
