import { SITE_URL } from './lib/site';
import { getAllPosts } from './lib/blog/posts';

export default function sitemap() {
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/faq',
    '/how-it-works',
    '/blog',
    '/privacy-policy',
    '/terms',
    '/cookie-policy',
    '/disclaimer',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/blog' ? 'weekly' : 'monthly',
    priority:
      route === ''
        ? 1
        : route === '/blog'
          ? 0.9
          : route === '/contact'
            ? 0.7
            : route === '/privacy-policy' ||
                route === '/terms' ||
                route === '/cookie-policy' ||
                route === '/disclaimer'
              ? 0.85
              : 0.8,
  }));

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date + 'T12:00:00'),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...blogRoutes];
}
