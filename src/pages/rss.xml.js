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
        items: posts.map(({slug, data: {title, summary, tags, date}}) => ({
            title,
            categories: tags.map(({slug}) => slug), // TODO: add tags name in the future
            pubDate: date,
            description: summary,
            link: `/blog/${slug}/`,
        })),
    });
}
