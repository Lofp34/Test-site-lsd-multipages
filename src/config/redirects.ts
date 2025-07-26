/**
 * Configuration des redirections pour les liens cassés
 * Task 4: Implémenter le système de validation des liens
 */

export interface RedirectRule {
  source: string;
  destination: string;
  permanent: boolean;
}

export interface RedirectAnalyticsData {
  source: string;
  destination: string;
  userAgent?: string;
  referer?: string;
  ip?: string;
  timestamp?: Date;
}

// Redirections configurées pour les liens cassés identifiés
export const linkRedirects: RedirectRule[] = [
  {
    source: "/ressources/scripts-prospection",
    destination: "/ressources/impact-aida-script-prospection-pme",
    permanent: true
  },


  {
    source: "/ressources/scripts-impact",
    destination: "/ressources/scripts-prospection",
    permanent: true
  },
  {
    source: "/ressources/aida-scripts",
    destination: "/ressources/scripts-prospection",
    permanent: true
  },
  {
    source: "/ressources/linkedin-guide",
    destination: "/ressources/linkedin-prospection",
    permanent: true
  },
  {
    source: "/ressources/suivi-prospects",
    destination: "/ressources/systeme-suivi-prospects",
    permanent: true
  },
  {
    source: "/ressources/motivation-coaching",
    destination: "/ressources/techniques-motivation-equipe",
    permanent: true
  },
  {
    source: "/ressources/recrutement",
    destination: "/ressources/guide-recrutement-commercial",
    permanent: true
  }
];

/**
 * Trouve une redirection pour une URL donnée
 */
export function getRedirectForUrl(pathname: string): RedirectRule | null {
  return linkRedirects.find(redirect => redirect.source === pathname) || null;
}

/**
 * Service d'analytics pour les redirections
 */
export const redirectAnalytics = {
  /**
   * Log une redirection pour analyse
   */
  logRedirect(data: RedirectAnalyticsData): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 Redirect: ${data.source} → ${data.destination}`, {
        userAgent: data.userAgent?.substring(0, 50) + '...',
        referer: data.referer,
        timestamp: new Date().toISOString()
      });
    }

    // En production, on pourrait envoyer vers un service d'analytics
    // comme Google Analytics, Mixpanel, ou un service custom
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      // Exemple avec Google Analytics
      if (window.gtag) {
        window.gtag('event', 'redirect', {
          event_category: 'navigation',
          event_label: `${data.source} → ${data.destination}`,
          custom_parameter_source: data.source,
          custom_parameter_destination: data.destination
        });
      }
    }
  },

  /**
   * Obtient les statistiques de redirections (pour usage futur)
   */
  getRedirectStats(): { totalRedirects: number; topSources: string[] } {
    // Placeholder pour futures analytics
    return {
      totalRedirects: 0,
      topSources: []
    };
  }
};

/**
 * Mapping des redirections pour Next.js config
 */
export const nextConfigRedirects = linkRedirects.map(redirect => ({
  source: redirect.source,
  destination: redirect.destination,
  permanent: redirect.permanent
}));
