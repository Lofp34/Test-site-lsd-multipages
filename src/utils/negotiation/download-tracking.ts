// Système de tracking des téléchargements de ressources techniques

export interface DownloadResource {
  id: string;
  title: string;
  description: string;
  type: 'PDF' | 'Excel' | 'Word' | 'PowerPoint';
  url: string;
  techniqueId: string;
  category: 'guide' | 'checklist' | 'template' | 'script';
  requiresEmail: boolean;
  fileSize: string;
  downloadCount?: number;
  lastUpdated: string;
}

export interface DownloadEvent {
  resourceId: string;
  userEmail?: string;
  timestamp: Date;
  userAgent: string;
  referrer?: string;
  techniqueId: string;
  conversionSource: 'technique-page' | 'blog-article' | 'formation-page' | 'email-campaign';
}

// Configuration des ressources téléchargeables par technique
export const downloadableResources: Record<string, DownloadResource[]> = {
  'effet-miroir': [
    {
      id: 'guide-effet-miroir',
      title: 'Guide de l\'effet miroir en négociation',
      description: 'Scripts et exemples concrets pour maîtriser l\'effet miroir de Chris Voss en contexte PME',
      type: 'PDF',
      url: '/ressources/downloads/techniques-negociation/guide-effet-miroir.pdf',
      techniqueId: 'effet-miroir',
      category: 'guide',
      requiresEmail: true,
      fileSize: '2.3 MB',
      lastUpdated: '2025-01-27'
    },
    {
      id: 'checklist-mots-declencheurs',
      title: 'Checklist des mots déclencheurs',
      description: 'Liste des expressions émotionnelles qui appellent un effet miroir pour maximiser la découverte',
      type: 'PDF',
      url: '/ressources/downloads/techniques-negociation/checklist-mots-declencheurs.pdf',
      techniqueId: 'effet-miroir',
      category: 'checklist',
      requiresEmail: true,
      fileSize: '1.1 MB',
      lastUpdated: '2025-01-27'
    }
  ],
  
  'silence-strategique': [
    {
      id: 'guide-silence-strategique',
      title: 'Guide du silence stratégique',
      description: 'Techniques de timing et d\'utilisation tactique du silence en négociation',
      type: 'PDF',
      url: '/ressources/downloads/techniques-negociation/guide-silence-strategique.pdf',
      techniqueId: 'silence-strategique',
      category: 'guide',
      requiresEmail: true,
      fileSize: '1.8 MB',
      lastUpdated: '2025-01-27'
    }
  ],
  
  'negociation-raisonnee': [
    {
      id: 'guide-batna',
      title: 'Guide BATNA et négociation raisonnée',
      description: 'Méthode Harvard complète avec templates d\'accords gagnant-gagnant',
      type: 'PDF',
      url: '/ressources/downloads/techniques-negociation/guide-batna.pdf',
      techniqueId: 'negociation-raisonnee',
      category: 'guide',
      requiresEmail: true,
      fileSize: '2.7 MB',
      lastUpdated: '2025-01-27'
    },
    {
      id: 'templates-accords',
      title: 'Templates d\'accords créatifs',
      description: 'Modèles d\'accords gagnant-gagnant adaptés aux PME françaises',
      type: 'Word',
      url: '/ressources/downloads/techniques-negociation/templates-accords.docx',
      techniqueId: 'negociation-raisonnee',
      category: 'template',
      requiresEmail: true,
      fileSize: '890 KB',
      lastUpdated: '2025-01-27'
    }
  ],
  
  'ancrage-tactique': [
    {
      id: 'guide-ancrage-tactique',
      title: 'Guide de l\'ancrage tactique',
      description: 'Techniques d\'influence cognitive et exploitation des biais de décision',
      type: 'PDF',
      url: '/ressources/downloads/techniques-negociation/guide-ancrage-tactique.pdf',
      techniqueId: 'ancrage-tactique',
      category: 'guide',
      requiresEmail: true,
      fileSize: '2.1 MB',
      lastUpdated: '2025-01-27'
    }
  ],
  
  'oui-progressif': [
    {
      id: 'sequences-questions',
      title: 'Séquences de questions progressives',
      description: 'Scripts et séquences de micro-engagements pour obtenir l\'adhésion',
      type: 'PDF',
      url: '/ressources/downloads/techniques-negociation/sequences-questions.pdf',
      techniqueId: 'oui-progressif',
      category: 'script',
      requiresEmail: true,
      fileSize: '1.6 MB',
      lastUpdated: '2025-01-27'
    }
  ],
  
  'recadrage-valeur': [
    {
      id: 'guide-recadrage-valeur',
      title: 'Guide du recadrage de valeur',
      description: 'Techniques de transformation d\'objections en opportunités de découverte',
      type: 'PDF',
      url: '/ressources/downloads/techniques-negociation/guide-recadrage-valeur.pdf',
      techniqueId: 'recadrage-valeur',
      category: 'guide',
      requiresEmail: true,
      fileSize: '2.0 MB',
      lastUpdated: '2025-01-27'
    }
  ],
  
  'concession-calculee': [
    {
      id: 'calculateur-concessions',
      title: 'Calculateur de concessions',
      description: 'Outil Excel pour calculer et planifier vos concessions stratégiques',
      type: 'Excel',
      url: '/ressources/downloads/techniques-negociation/calculateur-concessions.xlsx',
      techniqueId: 'concession-calculee',
      category: 'template',
      requiresEmail: true,
      fileSize: '1.3 MB',
      lastUpdated: '2025-01-27'
    }
  ]
};

// Fonction pour obtenir les ressources d'une technique
export const getResourcesByTechnique = (techniqueId: string): DownloadResource[] => {
  return downloadableResources[techniqueId] || [];
};

// Fonction pour tracker un téléchargement
export const trackDownload = async (event: DownloadEvent): Promise<void> => {
  try {
    // En production, ceci enverrait les données à votre système d'analytics
    console.log('Download tracked:', event);
    
    // Exemple d'envoi vers Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'download', {
        event_category: 'Resource',
        event_label: event.resourceId,
        technique_id: event.techniqueId,
        conversion_source: event.conversionSource,
        user_email_provided: !!event.userEmail
      });
    }
    
    // Exemple d'envoi vers HubSpot
    if (typeof window !== 'undefined' && (window as any)._hsq) {
      (window as any)._hsq.push(['trackEvent', {
        id: 'resource_download',
        properties: {
          resource_id: event.resourceId,
          technique_id: event.techniqueId,
          conversion_source: event.conversionSource,
          user_email: event.userEmail
        }
      }]);
    }
    
  } catch (error) {
    console.error('Error tracking download:', error);
  }
};

// Fonction pour générer l'URL de téléchargement avec tracking
export const generateDownloadUrl = (
  resourceId: string, 
  userEmail?: string,
  conversionSource: DownloadEvent['conversionSource'] = 'technique-page'
): string => {
  const resource = Object.values(downloadableResources)
    .flat()
    .find(r => r.id === resourceId);
    
  if (!resource) {
    throw new Error(`Resource ${resourceId} not found`);
  }
  
  // Créer l'événement de tracking
  const downloadEvent: DownloadEvent = {
    resourceId,
    userEmail,
    timestamp: new Date(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
    referrer: typeof window !== 'undefined' ? window.document.referrer : '',
    techniqueId: resource.techniqueId,
    conversionSource
  };
  
  // Tracker le téléchargement
  trackDownload(downloadEvent);
  
  return resource.url;
};

// Composant React pour afficher les ressources téléchargeables
export const DownloadResourceCard = ({ 
  resource, 
  onDownload 
}: { 
  resource: DownloadResource;
  onDownload: (resourceId: string, userEmail?: string) => void;
}) => {
  const handleDownload = () => {
    if (resource.requiresEmail) {
      // Ouvrir un modal pour capturer l'email
      const email = prompt('Votre email pour recevoir cette ressource :');
      if (email) {
        onDownload(resource.id, email);
      }
    } else {
      onDownload(resource.id);
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF': return '📄';
      case 'Excel': return '📊';
      case 'Word': return '📝';
      case 'PowerPoint': return '📋';
      default: return '📁';
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'guide': return 'bg-blue-100 text-blue-800';
      case 'checklist': return 'bg-green-100 text-green-800';
      case 'template': return 'bg-purple-100 text-purple-800';
      case 'script': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return `
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">${getTypeIcon(resource.type)}</span>
          <div>
            <h3 className="font-semibold text-gray-900">${resource.title}</h3>
            <p className="text-sm text-gray-600">${resource.fileSize} • ${resource.type}</p>
          </div>
        </div>
        <span className="px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(resource.category)}">
          ${resource.category}
        </span>
      </div>
      
      <p className="text-gray-700 mb-4 text-sm leading-relaxed">
        ${resource.description}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Mis à jour le ${new Date(resource.lastUpdated).toLocaleDateString('fr-FR')}
        </span>
        <button 
          onClick={handleDownload}
          className="bg-mint-green text-white px-4 py-2 rounded-lg font-medium hover:bg-mint-green/90 transition-colors text-sm"
        >
          ${resource.requiresEmail ? 'Télécharger (email requis)' : 'Télécharger'}
        </button>
      </div>
    </div>
  `;
};

// Fonction pour intégrer les ressources dans les séquences email
export const getEmailSequenceResources = (techniqueId: string): DownloadResource[] => {
  const resources = getResourcesByTechnique(techniqueId);
  
  // Retourner les ressources dans l'ordre optimal pour les séquences email
  return resources.sort((a, b) => {
    // Guides en premier, puis checklists, puis templates/scripts
    const order = { guide: 1, checklist: 2, template: 3, script: 4 };
    return (order[a.category] || 5) - (order[b.category] || 5);
  });
};

// Configuration des séquences email par technique
export const emailSequenceConfig = {
  'effet-miroir': {
    sequence: [
      {
        day: 0,
        subject: 'Votre guide de l\'effet miroir est prêt',
        resourceIds: ['guide-effet-miroir'],
        additionalContent: 'Découvrez comment Chris Voss utilise cette technique au FBI'
      },
      {
        day: 3,
        subject: 'Checklist : les mots qui déclenchent l\'effet miroir',
        resourceIds: ['checklist-mots-declencheurs'],
        additionalContent: 'Les expressions émotionnelles à repérer absolument'
      },
      {
        day: 7,
        subject: 'Cas pratique : l\'effet miroir en action',
        resourceIds: [],
        additionalContent: 'Exemple concret d\'utilisation en négociation PME'
      }
    ]
  }
  // Ajouter les autres techniques...
};