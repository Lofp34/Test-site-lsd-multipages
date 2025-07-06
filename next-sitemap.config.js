/** @type {import('next-sitemap').IConfig} */
export default {
    siteUrl: process.env.SITE_URL || 'https://laurentserre.com',
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.7,
    // Ajoute d'autres options si besoin
  }