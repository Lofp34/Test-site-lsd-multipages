// Utilitaires pour le tracking des téléchargements et génération de leads

export interface DownloadEvent {
  resourceId: string;
  resourceTitle: string;
  userId?: string;
  userEmail?: string;
  timestamp: number;
  source: 'technique-page' | 'resource-library' | 'email-campaign';
  userAgent: string;
}

export interface LeadData {
  email: string;
  firstName: string;
  company?: string;
  role?: string;
  source: string;
  resourceDownloaded: string;
  timestamp: number;
}

class DownloadTracker {
  private static instance: DownloadTracker;
  private downloads: DownloadEvent[] = [];

  private constructor() {
    // Charger les téléchargements depuis localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('download-history');
      if (saved) {
        try {
          this.downloads = JSON.parse(saved);
        } catch (error) {
          console.error('Erreur lors du chargement de l\'historique:', error);
        }
      }
    }
  }

  public static getInstance(): DownloadTracker {
    if (!DownloadTracker.instance) {
      DownloadTracker.instance = new DownloadTracker();
    }
    return DownloadTracker.instance;
  }

  // Enregistrer un téléchargement
  public trackDownload(
    resourceId: string,
    resourceTitle: string,
    source: DownloadEvent['source'] = 'technique-page',
    userEmail?: string
  ): void {
    const event: DownloadEvent = {
      resourceId,
      resourceTitle,
      userEmail,
      timestamp: Date.now(),
      source,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : ''
    };

    this.downloads.push(event);
    this.saveToStorage();

    // Tracking Google Analytics
    this.trackToGA(event);

    // Envoyer à l'API backend (simulation)
    this.sendToAPI(event);
  }

  // Générer un lead
  public generateLead(leadData: LeadData): void {
    // Tracking de la génération de lead
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        event_category: 'Lead Generation',
        event_label: leadData.resourceDownloaded,
        value: this.getLeadValue(leadData.resourceDownloaded),
        custom_parameters: {
          lead_source: leadData.source,
          lead_email: leadData.email,
          lead_company: leadData.company || 'Unknown'
        }
      });
    }

    // Envoyer à HubSpot (simulation)
    this.sendLeadToHubSpot(leadData);

    // Envoyer à l'API backend
    this.sendLeadToAPI(leadData);
  }

  // Obtenir les statistiques de téléchargement
  public getDownloadStats(): {
    totalDownloads: number;
    uniqueUsers: number;
    topResources: { resourceId: string; title: string; count: number }[];
    downloadsBySource: Record<string, number>;
  } {
    const totalDownloads = this.downloads.length;
    const uniqueUsers = new Set(this.downloads.map(d => d.userEmail).filter(Boolean)).size;

    // Top ressources
    const resourceCounts = this.downloads.reduce((acc, download) => {
      const key = download.resourceId;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topResources = Object.entries(resourceCounts)
      .map(([resourceId, count]) => ({
        resourceId,
        title: this.downloads.find(d => d.resourceId === resourceId)?.resourceTitle || resourceId,
        count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Téléchargements par source
    const downloadsBySource = this.downloads.reduce((acc, download) => {
      acc[download.source] = (acc[download.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalDownloads,
      uniqueUsers,
      topResources,
      downloadsBySource
    };
  }

  // Vérifier si un utilisateur a déjà téléchargé une ressource
  public hasUserDownloaded(resourceId: string, userEmail?: string): boolean {
    if (!userEmail) return false;
    return this.downloads.some(d => d.resourceId === resourceId && d.userEmail === userEmail);
  }

  // Obtenir l'historique des téléchargements d'un utilisateur
  public getUserDownloads(userEmail: string): DownloadEvent[] {
    return this.downloads.filter(d => d.userEmail === userEmail);
  }

  private saveToStorage(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('download-history', JSON.stringify(this.downloads));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
      }
    }
  }

  private trackToGA(event: DownloadEvent): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'file_download', {
        event_category: 'Resource Download',
        event_label: event.resourceTitle,
        value: 1,
        custom_parameters: {
          resource_id: event.resourceId,
          download_source: event.source,
          user_email: event.userEmail || 'anonymous'
        }
      });
    }
  }

  private getLeadValue(resourceTitle: string): number {
    // Valeur estimée d'un lead selon le type de ressource
    if (resourceTitle.includes('Guide')) return 25;
    if (resourceTitle.includes('Scripts')) return 20;
    if (resourceTitle.includes('Checklist')) return 15;
    return 10;
  }

  private async sendToAPI(event: DownloadEvent): Promise<void> {
    try {
      // Dans un vrai projet, cela enverrait à votre API
      console.log('Envoi du téléchargement à l\'API:', event);
      
      // Simulation d'appel API
      // await fetch('/api/downloads', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(event)
      // });
    } catch (error) {
      console.error('Erreur lors de l\'envoi à l\'API:', error);
    }
  }

  private async sendLeadToHubSpot(leadData: LeadData): Promise<void> {
    try {
      // Dans un vrai projet, cela enverrait à HubSpot
      console.log('Envoi du lead à HubSpot:', leadData);
      
      // Simulation d'appel HubSpot API
      // const hubspotData = {
      //   properties: {
      //     email: leadData.email,
      //     firstname: leadData.firstName,
      //     company: leadData.company,
      //     jobtitle: leadData.role,
      //     lead_source: leadData.source,
      //     first_resource_downloaded: leadData.resourceDownloaded
      //   }
      // };
      
      // await fetch(`https://api.hubapi.com/crm/v3/objects/contacts`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`
      //   },
      //   body: JSON.stringify(hubspotData)
      // });
    } catch (error) {
      console.error('Erreur lors de l\'envoi à HubSpot:', error);
    }
  }

  private async sendLeadToAPI(leadData: LeadData): Promise<void> {
    try {
      // Dans un vrai projet, cela enverrait à votre API backend
      console.log('Envoi du lead à l\'API:', leadData);
      
      // Simulation d'appel API
      // await fetch('/api/leads', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(leadData)
      // });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du lead à l\'API:', error);
    }
  }
}

// Export de l'instance singleton
export const downloadTracker = DownloadTracker.getInstance();

// Fonctions utilitaires
export const trackResourceDownload = (
  resourceId: string,
  resourceTitle: string,
  userEmail?: string,
  source: DownloadEvent['source'] = 'technique-page'
) => {
  downloadTracker.trackDownload(resourceId, resourceTitle, source, userEmail);
};

export const generateLead = (leadData: Omit<LeadData, 'timestamp'>) => {
  downloadTracker.generateLead({
    ...leadData,
    timestamp: Date.now()
  });
};

export const getDownloadStats = () => {
  return downloadTracker.getDownloadStats();
};

export const hasUserDownloadedResource = (resourceId: string, userEmail?: string) => {
  return downloadTracker.hasUserDownloaded(resourceId, userEmail);
};