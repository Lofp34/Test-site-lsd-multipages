/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://laurentserre.com',
    generateRobotsTxt: true,
    exclude: [
      '/cas-clients',
      '/a-propos', 
      '/contact'
    ],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    },
    changefreq: 'weekly',
    priority: 0.8,
    // Configuration des priorités par page
    transform: async (config, path) => {
      // Page d'accueil
      if (path === '/') {
        return {
          loc: path,
          changefreq: 'daily',
          priority: 1.0,
          lastmod: new Date().toISOString(),
        }
      }
      
      // Pages principales
      if (path === '/bootcamp' || path === '/diagnostic') {
        return {
          loc: path,
          changefreq: 'weekly',
          priority: 0.9,
          lastmod: new Date().toISOString(),
        }
      }
      
      // Pages légales
      if (path === '/cgv' || path === '/mentions-legales' || path === '/politique-de-confidentialite' || path === '/cookies') {
        return {
          loc: path,
          changefreq: 'yearly',
          priority: 0.3,
          lastmod: new Date().toISOString(),
        }
      }
      
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: new Date().toISOString(),
      }
    },
  }