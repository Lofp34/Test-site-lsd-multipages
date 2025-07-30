// Utility pour intégrer les liens vers les techniques de négociation dans l'écosystème du site

export interface TechniqueLinkSuggestion {
  techniqueSlug: string;
  techniqueTitle: string;
  context: string;
  description: string;
  icon: string;
}

// Suggestions de liens par contexte/mot-clé
export const techniqueLinkSuggestions: Record<string, TechniqueLinkSuggestion[]> = {
  // Contextes liés à l'empathie et l'écoute
  'empathie': [
    {
      techniqueSlug: 'effet-miroir',
      techniqueTitle: 'L\'effet miroir',
      context: 'empathie tactique',
      description: 'Créer une connexion instantanée en reflétant les derniers mots de votre interlocuteur',
      icon: '🪞'
    }
  ],
  
  'ecoute': [
    {
      techniqueSlug: 'effet-miroir',
      techniqueTitle: 'L\'effet miroir',
      context: 'écoute active',
      description: 'Technique FBI pour faire parler et découvrir les vraies motivations',
      icon: '🪞'
    }
  ],
  
  // Contextes liés au silence et à la tension
  'silence': [
    {
      techniqueSlug: 'silence-strategique',
      techniqueTitle: 'Le silence stratégique',
      context: 'gestion de la tension',
      description: 'Utiliser le silence pour créer la pression et obtenir des informations',
      icon: '🤫'
    }
  ],
  
  'tension': [
    {
      techniqueSlug: 'silence-strategique',
      techniqueTitle: 'Le silence stratégique',
      context: 'création de tension',
      description: 'Maîtriser l\'art du silence pour influencer la négociation',
      icon: '🤫'
    }
  ],
  
  // Contextes liés à la négociation et aux compromis
  'negociation': [
    {
      techniqueSlug: 'negociation-raisonnee',
      techniqueTitle: 'La négociation raisonnée',
      context: 'approche Harvard',
      description: 'Méthode gagnant-gagnant avec BATNA pour des accords durables',
      icon: '⚖️'
    },
    {
      techniqueSlug: 'ne-jamais-couper-la-poire-en-deux',
      techniqueTitle: 'Ne jamais couper la poire en deux',
      context: 'ancrage fort',
      description: 'Technique d\'ancrage absolu pour éviter les compromis perdants',
      icon: '🚫'
    }
  ],
  
  'compromis': [
    {
      techniqueSlug: 'ne-jamais-couper-la-poire-en-deux',
      techniqueTitle: 'Ne jamais couper la poire en deux',
      context: 'refus de compromis',
      description: 'Pourquoi les compromis sont souvent perdants et comment les éviter',
      icon: '🚫'
    }
  ],
  
  // Contextes liés à l'influence et à la persuasion
  'influence': [
    {
      techniqueSlug: 'ancrage-tactique',
      techniqueTitle: 'L\'ancrage tactique',
      context: 'influence cognitive',
      description: 'Exploiter les biais de décision pour orienter la négociation',
      icon: '⚓'
    },
    {
      techniqueSlug: 'oui-progressif',
      techniqueTitle: 'La technique du "Oui" progressif',
      context: 'engagement progressif',
      description: 'Obtenir l\'adhésion par micro-engagements successifs',
      icon: '✅'
    }
  ],
  
  'persuasion': [
    {
      techniqueSlug: 'oui-progressif',
      techniqueTitle: 'La technique du "Oui" progressif',
      context: 'persuasion progressive',
      description: 'Technique Cialdini pour créer l\'engagement et la cohérence',
      icon: '✅'
    }
  ],
  
  // Contextes liés aux objections
  'objection': [
    {
      techniqueSlug: 'recadrage-valeur',
      techniqueTitle: 'Le recadrage de valeur',
      context: 'transformation d\'objections',
      description: 'Transformer chaque objection en opportunité de découverte',
      icon: '🔄'
    }
  ],
  
  'objections': [
    {
      techniqueSlug: 'recadrage-valeur',
      techniqueTitle: 'Le recadrage de valeur',
      context: 'gestion des objections',
      description: 'Approche consultative pour recadrer les objections prix',
      icon: '🔄'
    }
  ],
  
  // Contextes liés aux concessions
  'concession': [
    {
      techniqueSlug: 'concession-calculee',
      techniqueTitle: 'La concession calculée',
      context: 'échange de valeur',
      description: 'Stratégie d\'échange planifié pour des concessions gagnant-gagnant',
      icon: '🎯'
    }
  ],
  
  'concessions': [
    {
      techniqueSlug: 'concession-calculee',
      techniqueTitle: 'La concession calculée',
      context: 'négociation stratégique',
      description: 'Éviter les concessions gratuites par un calcul stratégique',
      icon: '🎯'
    }
  ]
};

// Fonction pour générer un composant de lien vers une technique
export const generateTechniqueLinkComponent = (suggestion: TechniqueLinkSuggestion): string => {
  return `
    <div className="bg-mint-green/10 border border-mint-green/30 rounded-lg p-4 my-6">
      <p className="text-sm text-gray-700">
        ${suggestion.icon} <strong>Technique avancée :</strong> Découvrez <Link href="/ressources/techniques-de-negociation/${suggestion.techniqueSlug}" className="text-mint-green font-semibold hover:underline">${suggestion.techniqueTitle}</Link> - ${suggestion.description}.
      </p>
    </div>
  `;
};

// Fonction pour obtenir des suggestions de techniques basées sur le contenu
export const getTechniqueSuggestions = (content: string, maxSuggestions: number = 2): TechniqueLinkSuggestion[] => {
  const suggestions: TechniqueLinkSuggestion[] = [];
  const contentLower = content.toLowerCase();
  
  // Parcourir les mots-clés et trouver les correspondances
  Object.entries(techniqueLinkSuggestions).forEach(([keyword, techniqueSuggestions]) => {
    if (contentLower.includes(keyword) && suggestions.length < maxSuggestions) {
      // Éviter les doublons
      techniqueSuggestions.forEach(suggestion => {
        if (!suggestions.find(s => s.techniqueSlug === suggestion.techniqueSlug)) {
          suggestions.push(suggestion);
        }
      });
    }
  });
  
  return suggestions.slice(0, maxSuggestions);
};

// Mapping des pages/articles vers les techniques recommandées
export const pageToTechniqueMapping: Record<string, string[]> = {
  // Pages de formation
  '/formation-commerciale-pme': ['effet-miroir', 'negociation-raisonnee', 'silence-strategique'],
  '/bootcamp-commercial-intensif': ['ne-jamais-couper-la-poire-en-deux', 'ancrage-tactique', 'oui-progressif'],
  '/coach-commercial-entreprise': ['recadrage-valeur', 'concession-calculee', 'effet-miroir'],
  
  // Pages de services
  '/consultant-commercial-montpellier': ['negociation-raisonnee', 'silence-strategique'],
  '/expert-developpement-commercial-pme': ['effet-miroir', 'recadrage-valeur'],
  '/transformation-commerciale': ['ancrage-tactique', 'oui-progressif', 'concession-calculee'],
  
  // Articles de blog (exemples)
  '/blog/7-etapes-transformer-non-en-oui-performant-2025': ['effet-miroir', 'recadrage-valeur', 'silence-strategique'],
  '/blog/erreurs-fatales-prospection-b2b': ['ancrage-tactique', 'oui-progressif'],
  '/blog/bootcamp-commercial-pourquoi-formations-echouent': ['negociation-raisonnee', 'effet-miroir'],
  '/blog/ia-transforme-developpement-commercial-2025': ['silence-strategique', 'ancrage-tactique'],
  '/blog/vendeur-commercial-transformation-decisive': ['recadrage-valeur', 'concession-calculee']
};

// Fonction pour obtenir les techniques recommandées pour une page
export const getRecommendedTechniques = (pagePath: string): string[] => {
  return pageToTechniqueMapping[pagePath] || [];
};

// Composant React pour afficher les techniques liées
export const TechniqueLinksSection = ({ techniques }: { techniques: string[] }) => {
  if (techniques.length === 0) return null;
  
  return `
    <div className="bg-gradient-to-r from-mint-green/5 to-blue-ink/5 rounded-2xl p-6 my-8 border border-mint-green/20">
      <h3 className="text-lg font-title font-bold text-blue-ink mb-4 flex items-center gap-2">
        🎯 Techniques de négociation complémentaires
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        ${techniques.map(slug => {
          const suggestion = Object.values(techniqueLinkSuggestions)
            .flat()
            .find(s => s.techniqueSlug === slug);
          
          if (!suggestion) return '';
          
          return `
            <Link 
              href="/ressources/techniques-de-negociation/${suggestion.techniqueSlug}"
              className="block bg-white/80 rounded-lg p-4 hover:bg-white transition-colors border border-gray-200 hover:border-mint-green/40"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">${suggestion.icon}</span>
                <div>
                  <h4 className="font-semibold text-blue-ink mb-1">${suggestion.techniqueTitle}</h4>
                  <p className="text-sm text-gray-600">${suggestion.description}</p>
                </div>
              </div>
            </Link>
          `;
        }).join('')}
      </div>
    </div>
  `;
};