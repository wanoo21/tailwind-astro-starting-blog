import rss from '@astrojs/rss';
import {getCollection} from 'astro:content';
import {SITE_METADATA} from '../consts';

const {title, description} = SITE_METADATA;

export async function GET(context) {
    const posts = await getCollection('blog');
    return rss({
        title,
        description,
        site: context.site,
        items: []
        // items: posts.map((post) => ({
        //     ...post.data,
        //     link: `/blog/${post.slug}/`,
        // })),
    });
}
