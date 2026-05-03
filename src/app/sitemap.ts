import { MetadataRoute } from 'next'
import { readdirSync, existsSync } from 'fs'
import { join } from 'path'

const baseUrl = 'https://www.laurentserre.com'
const currentDate = new Date()

// Chemins des dossiers de contenu
const BLOG_DIR = join(process.cwd(), 'src', 'app', 'blog')
const RESSOURCES_DIR = join(process.cwd(), 'src', 'app', 'ressources')
const BOOKS_DIR_BASE = join(RESSOURCES_DIR, 'meilleurs-livres')

/**
 * Récupère les slugs des articles de blog en lisant le filesystem
 */
function getBlogSlugs(): string[] {
  try {
    if (!existsSync(BLOG_DIR)) return []
    const entries = readdirSync(BLOG_DIR, { withFileTypes: true })
    return entries
      .filter(e => e.isDirectory() && e.name !== 'article-test-publication-openclaw')
      .map(e => e.name)
      .sort()
  } catch {
    return []
  }
}

/**
 * Récupère les slugs des sous-pages de livres
 */
function getBookSubPages(): string[] {
  try {
    if (!existsSync(BOOKS_DIR_BASE)) return []
    const categories = readdirSync(BOOKS_DIR_BASE, { withFileTypes: true })
      .filter(e => e.isDirectory())
      .map(e => e.name)
    const slugs: string[] = []
    for (const cat of categories) {
      const catPath = join(BOOKS_DIR_BASE, cat)
      const subDirs = readdirSync(catPath, { withFileTypes: true })
        .filter(e => e.isDirectory())
        .map(e => `meilleurs-livres/${cat}/${e.name}`)
      slugs.push(...subDirs)
    }
    return slugs.sort()
  } catch {
    return []
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getBlogSlugs()
  const bookSubPages = getBookSubPages()

  return [
    // PAGE PRINCIPALE
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },

    // === COCON SÉMANTIQUE — PAGES PRODUIT ===
    {
      url: `${baseUrl}/expert-developpement-commercial-pme`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/formation-commerciale-pme`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/transformation-commerciale`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/diagnostic`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ia-commercial-pme`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/suivi-performance`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // === PAGES SPÉCIALISÉES ===
    {
      url: `${baseUrl}/consultant-commercial-montpellier`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/coach-commercial-entreprise`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/management-equipe-commerciale`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },

    // === MANAGEMENT SOUS-PAGES ===
    {
      url: `${baseUrl}/management/recruter-integrer`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/management/motiver-engager`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/management/piloter-performance`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/management/former-coacher`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/management/structurer-organiser`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // === CLOSING B2B (HUB) ===
    {
      url: `${baseUrl}/closing-b2b`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // === BOOTCAMP ===
    {
      url: `${baseUrl}/bootcamp`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bootcamp-commercial-intensif`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // === BLOG — INDEX + TOUS LES ARTICLES ===
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogSlugs.map(slug => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    // === PAGES LÉGALES ===
    {
      url: `${baseUrl}/cgv`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-de-confidentialite`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },

    // === RESSOURCES ===
    {
      url: `${baseUrl}/ressources`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cas-clients`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // === GUIDES RESSOURCES ===
    {
      url: `${baseUrl}/ressources/guide-prospection`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/guide-closing`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/guide-recrutement-commercial`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/le-grand-guide-des-techniques-de-vente`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/impact-aida-script-prospection-pme`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // === OUTILS RESSOURCES ===
    {
      url: `${baseUrl}/ressources/outil-offre-5-etoiles`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/outil-preparation-rdv`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ressources/outil-strategie-commerciale`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ressources/outil-tableau-bord`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ressources/kit-gestion-grands-comptes`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ressources/scripts-prospection`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ressources/grille-evaluation`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ressources/reporting-automatise`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ressources/systeme-suivi-prospects`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/techniques-motivation-equipe`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/linkedin-prospection`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // === TECHNIQUES DE VENTE ===
    {
      url: `${baseUrl}/ressources/techniques-de-vente`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // === TECHNIQUES DE NÉGOCIATION ===
    {
      url: `${baseUrl}/ressources/techniques-de-negociation`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/techniques-de-negociation/effet-miroir`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/techniques-de-negociation/silence-strategique`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/techniques-de-negociation/negociation-raisonnee`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/techniques-de-negociation/ancrage-tactique`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/techniques-de-negociation/oui-progressif`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/techniques-de-negociation/recadrage-valeur`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/techniques-de-negociation/concession-calculee`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // === SECTION MEILLEURS LIVRES ===
    {
      url: `${baseUrl}/ressources/meilleurs-livres`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },

    // CATÉGORIES DE LIVRES
    {
      url: `${baseUrl}/ressources/meilleurs-livres/prospection-sdr`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/meilleurs-livres/negociation-closing`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/meilleurs-livres/psychologie-influence`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/meilleurs-livres/methodes-process`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/meilleurs-livres/methodes-processus`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/meilleurs-livres/enterprise-account`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/meilleurs-livres/sales-management`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/meilleurs-livres/digital-ai`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources/meilleurs-livres/mindset-performance`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // LIVRES INDIVIDUELS (générés depuis le filesystem)
    ...bookSubPages.map(slug => ({
      url: `${baseUrl}/ressources/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  ]
}
