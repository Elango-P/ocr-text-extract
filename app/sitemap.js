export default function sitemap() {
  const baseUrl = 'https://ocr.elangodev.com';
  
  const routes = [
    '',
    '/about',
    '/faq',
    '/how-it-works',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
