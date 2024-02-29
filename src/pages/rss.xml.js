import rss from '@astrojs/rss';
import {getCollection} from 'astro:content';
import { useTranslations } from '@/i18n';

const t = useTranslations();

export async function GET(context) {
    const posts = await getCollection('blog');
    return rss({
        title: t('siteMetadata.title'),
        description: t('siteMetadata.description'),
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
