import { SITE_URL } from './lib/site';

export default function sitemap() {
  const routes = [
    '',
    '/about',
    '/contact',
    '/faq',
    '/how-it-works',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/contact' ? 0.7 : 0.8,
  }));

  return routes;
}
