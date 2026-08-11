import { SITE_URL } from './lib/site';
import { getAllPosts } from './lib/blog/posts';
import { TOOL_ROUTES } from './lib/tools/toolRoutes';

export default function sitemap() {
  const toolPaths = TOOL_ROUTES.map((t) => t.path);

  const staticRoutes = [
    '',
    '/about',
    '/author/elango-p',
    '/contact',
    '/faq',
    '/how-it-works',
    '/blog',
    '/privacy-policy',
    '/terms',
    '/cookie-policy',
    '/disclaimer',
    '/data-retention',
    ...toolPaths,
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === '' || route === '/blog' || toolPaths.includes(route)
        ? 'weekly'
        : 'monthly',
    priority:
      route === ''
        ? 1
        : toolPaths.includes(route)
          ? 0.95
          : route === '/blog'
            ? 0.9
            : route === '/contact'
              ? 0.7
              : route === '/privacy-policy' ||
                  route === '/terms' ||
                  route === '/cookie-policy' ||
                  route === '/disclaimer' ||
                  route === '/data-retention'
                ? 0.85
                : 0.8,
  }));

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date((post.updated || post.date) + 'T12:00:00'),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...blogRoutes];
}
