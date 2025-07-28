import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/static/',
          '/admin/',
          '/private/',
          '/*.json$',
          '/test-*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/static/',
          '/admin/',
          '/private/',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/static/',
          '/admin/',
          '/private/',
        ],
        crawlDelay: 2,
      }
    ],
    sitemap: 'https://laurent-serre-developpement.fr/sitemap.xml',
    host: 'https://laurent-serre-developpement.fr',
  }
}