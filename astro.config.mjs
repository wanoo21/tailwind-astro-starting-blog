import { defineConfig, passthroughImageService} from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import solidJs from "@astrojs/solid-js";
import { SITE_METADATA } from "./src/consts.ts";
import metaTags from "astro-meta-tags";
import tailwindcss from "@tailwindcss/vite";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  site: SITE_METADATA.siteUrl,
  image: {
    service: passthroughImageService(),
  },
  integrations: [mdx(), sitemap(), solidJs(), metaTags(), robotsTxt()],
  vite: {
    plugins: [tailwindcss()],
  },
});