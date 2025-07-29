'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getTechniqueTheme } from '@/utils/negotiation/theme-manager';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface RelatedTechniquesProps {
  current: string;
  relatedTechniques?: string[];
}

interface TechniqueCardProps {
  techniqueId: string;
  index: number;
  isRecommended?: boolean;
}

interface BreadcrumbProps {
  current: string;
}

interface NavigationLinksProps {
  current: string;
}

interface FormationLinksProps {
  currentCategory: string;
}

// Données des techniques (normalement importées depuis un fichier de données)
const techniquesData = {
  'effet-miroir': {
    title: 'L\'effet miroir',
    author: 'Chris Voss',
    description: 'Technique d\'empathie tactique pour faire parler l\'interlocuteur',
    category: 'psychology',
    difficulty: 'intermediate',
    successRate: '78%'
  },
  'silence-strategique': {
    title: 'Le silence stratégique',
    author: 'Approche terrain',
    description: 'Utilisation tactique du silence pour créer la tension',
    category: 'psychology',
    difficulty: 'advanced',
    successRate: '85%'
  },
  'negociation-raisonnee': {
    title: 'La négociation raisonnée',
    author: 'Fisher & Ury',
    description: 'Approche gagnant-gagnant et concept de BATNA',
    category: 'preparation',
    difficulty: 'intermediate',
    successRate: '72%'
  },
  'ancrage-tactique': {
    title: 'L\'ancrage tactique',
    author: 'Kahneman',
    description: 'Influence cognitive et biais de décision',
    category: 'psychology',
    difficulty: 'advanced',
    successRate: '68%'
  },
  'oui-progressif': {
    title: 'La technique du "Oui" progressif',
    author: 'Cialdini',
    description: 'Engagement et cohérence comportementale',
    category: 'closing',
    difficulty: 'intermediate',
    successRate: '75%'
  },
  'recadrage-valeur': {
    title: 'Le recadrage de valeur',
    author: 'Approche consultative',
    description: 'Transformation d\'objections en opportunités',
    category: 'objection-handling',
    difficulty: 'advanced',
    successRate: '82%'
  },
  'concession-calculee': {
    title: 'La concession calculée',
    author: 'Négociation stratégique',
    description: 'Échange de valeur stratégique et planifié',
    category: 'closing',
    difficulty: 'advanced',
    successRate: '79%'
  },
  'ne-jamais-couper-la-poire-en-deux': {
    title: 'Ne jamais couper la poire en deux',
    author: 'Chris Voss',
    description: 'Éviter les compromis destructeurs de valeur',
    category: 'closing',
    difficulty: 'intermediate',
    successRate: '88%'
  }
};

// Composant Carte de technique
const TechniqueCard: React.FC<TechniqueCardProps> = ({ techniqueId, index, isRecommended }) => {
  const technique = techniquesData[techniqueId as keyof typeof techniquesData];
  const theme = getTechniqueTheme(techniqueId);
  
  if (!technique) return null;

  const handleCardClick = () => {
    // Track related technique click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'related_technique_click', {
        event_category: 'Navigation',
        event_label: techniqueId,
        position: index + 1,
        is_recommended: isRecommended
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-orange-600 bg-orange-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Facile';
      case 'intermediate': return 'Intermédiaire';
      case 'advanced': return 'Avancé';
      default: return 'Non défini';
    }
  };

  return (
    <AnimatedSection delay={100 + index * 100} animation="slide-up">
      <Link 
        href={`/ressources/techniques-de-negociation/${techniqueId}`}
        onClick={handleCardClick}
        className="block group"
      >
        <div className="bg-white/80 dark:bg-blue-ink/60 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative">
          {/* Badge recommandé */}
          {isRecommended && (
            <div className="absolute top-4 right-4 z-10">
              <Badge variant="default" size="sm" className="bg-mint-green/20 text-mint-green border-mint-green/30">
                Recommandé
              </Badge>
            </div>
          )}

          {/* En-tête avec thème */}
          <div 
            className="h-24 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-4 left-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <span className="text-2xl">{theme.icon}</span>
              </div>
              <div className="text-white">
                <div className="font-bold text-lg leading-tight">
                  {technique.title}
                </div>
                <div className="text-white/80 text-sm">
                  {technique.author}
                </div>
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-6">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
              {technique.description}
            </p>

            {/* Métriques */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-mint-green">
                    {technique.successRate}
                  </div>
                  <div className="text-xs text-gray-500">
                    Succès
                  </div>
                </div>
                
                <Badge 
                  variant="outline" 
                  size="sm" 
                  className={getDifficultyColor(technique.difficulty)}
                >
                  {getDifficultyLabel(technique.difficulty)}
                </Badge>
              </div>

              <div className="text-right">
                <div className="text-mint-green group-hover:translate-x-1 transition-transform duration-300">
                  →
                </div>
              </div>
            </div>

            {/* Barre de progression du succès */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-1000 group-hover:animate-pulse"
                style={{ 
                  width: technique.successRate,
                  background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`
                }}
              ></div>
            </div>
          </div>
        </div>
      </Link>
    </AnimatedSection>
  );
};

// Composant Breadcrumb
const Breadcrumb: React.FC<BreadcrumbProps> = ({ current }) => {
  const currentTechnique = techniquesData[current as keyof typeof techniquesData];
  
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-mint-green transition-colors duration-200">
        Accueil
      </Link>
      <span>›</span>
      <Link href="/ressources" className="hover:text-mint-green transition-colors duration-200">
        Ressources
      </Link>
      <span>›</span>
      <Link href="/ressources/techniques-de-negociation" className="hover:text-mint-green transition-colors duration-200">
        Techniques de négociation
      </Link>
      <span>›</span>
      <span className="text-blue-ink dark:text-white font-medium">
        {currentTechnique?.title || 'Technique actuelle'}
      </span>
    </nav>
  );
};

// Composant Liens de navigation
const NavigationLinks: React.FC<NavigationLinksProps> = ({ current }) => {
  const allTechniques = Object.keys(techniquesData);
  const currentIndex = allTechniques.indexOf(current);
  const previousTechnique = currentIndex > 0 ? allTechniques[currentIndex - 1] : null;
  const nextTechnique = currentIndex < allTechniques.length - 1 ? allTechniques[currentIndex + 1] : null;

  return (
    <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
      {previousTechnique ? (
        <Link 
          href={`/ressources/techniques-de-negociation/${previousTechnique}`}
          className="flex items-center gap-3 p-4 bg-white/50 dark:bg-blue-ink/30 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 group"
        >
          <div className="text-mint-green group-hover:-translate-x-1 transition-transform duration-300">
            ←
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Technique précédente</div>
            <div className="font-semibold text-blue-ink dark:text-white">
              {techniquesData[previousTechnique as keyof typeof techniquesData]?.title}
            </div>
          </div>
        </Link>
      ) : (
        <div></div>
      )}

      {nextTechnique ? (
        <Link 
          href={`/ressources/techniques-de-negociation/${nextTechnique}`}
          className="flex items-center gap-3 p-4 bg-white/50 dark:bg-blue-ink/30 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 group text-right"
        >
          <div>
            <div className="text-xs text-gray-500 mb-1">Technique suivante</div>
            <div className="font-semibold text-blue-ink dark:text-white">
              {techniquesData[nextTechnique as keyof typeof techniquesData]?.title}
            </div>
          </div>
          <div className="text-mint-green group-hover:translate-x-1 transition-transform duration-300">
            →
          </div>
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
};

// Composant Liens vers formations
const FormationLinks: React.FC<FormationLinksProps> = ({ currentCategory }) => {
  const getFormationByCategory = () => {
    switch (currentCategory) {
      case 'psychology':
        return {
          title: 'Formation Psychologie de la Négociation',
          description: 'Maîtrisez les techniques psychologiques avancées',
          url: '/formation-psychologie-negociation'
        };
      case 'closing':
        return {
          title: 'Bootcamp Closing Commercial',
          description: 'Techniques de conclusion et signature',
          url: '/bootcamp-closing-commercial'
        };
      case 'preparation':
        return {
          title: 'Formation Préparation Négociation',
          description: 'Méthodologie et outils de préparation',
          url: '/formation-preparation-negociation'
        };
      case 'objection-handling':
        return {
          title: 'Masterclass Gestion d\'Objections',
          description: 'Transformer les objections en opportunités',
          url: '/masterclass-objections'
        };
      default:
        return {
          title: 'Formation Négociation Complète',
          description: 'Programme complet toutes techniques',
          url: '/formation-negociation-complete'
        };
    }
  };

  const formation = getFormationByCategory();

  return (
    <div className="bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-2xl p-6 border border-mint-green/20">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-bold text-blue-ink dark:text-white mb-2">
            📚 {formation.title}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {formation.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>✓ Certification incluse</span>
            <span>✓ Suivi 3 mois</span>
            <span>✓ Cas pratiques PME</span>
          </div>
        </div>
        
        <Button
          variant="primary"
          size="md"
          icon={<span>🚀</span>}
        >
          Découvrir
        </Button>
      </div>
    </div>
  );
};

// Composant principal RelatedTechniques
const RelatedTechniques: React.FC<RelatedTechniquesProps> = ({ current, relatedTechniques }) => {
  const [showAll, setShowAll] = useState(false);
  
  // Obtenir les techniques liées intelligemment
  const getSmartRelatedTechniques = () => {
    const currentTechnique = techniquesData[current as keyof typeof techniquesData];
    if (!currentTechnique) return [];

    // Si des techniques liées sont spécifiées, les utiliser
    if (relatedTechniques && relatedTechniques.length > 0) {
      return relatedTechniques.filter(id => id !== current);
    }

    // Sinon, recommander par catégorie et complémentarité
    const allTechniques = Object.entries(techniquesData);
    const sameCategory = allTechniques
      .filter(([id, tech]) => id !== current && tech.category === currentTechnique.category)
      .map(([id]) => id);
    
    const complementary = allTechniques
      .filter(([id, tech]) => {
        if (id === current) return false;
        
        // Logique de complémentarité
        if (currentTechnique.category === 'psychology' && tech.category === 'closing') return true;
        if (currentTechnique.category === 'closing' && tech.category === 'objection-handling') return true;
        if (currentTechnique.category === 'preparation' && tech.category === 'psychology') return true;
        
        return false;
      })
      .map(([id]) => id);

    // Combiner et limiter
    const related = [...sameCategory.slice(0, 2), ...complementary.slice(0, 2)];
    return related.slice(0, showAll ? 6 : 3);
  };

  const relatedIds = getSmartRelatedTechniques();
  const currentTechnique = techniquesData[current as keyof typeof techniquesData];

  return (
    <section className="py-16 bg-gradient-to-b from-primary-bg to-white/50 dark:from-blue-ink/20 dark:to-blue-ink/40">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb current={current} />

        {/* En-tête de section */}
        <AnimatedSection animation="fade-in" delay={0}>
          <div className="text-center mb-12">
            <Badge variant="default" size="md" className="mb-4">
              <span className="mr-2">🔗</span>
              Techniques complémentaires
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-ink dark:text-white mb-4">
              Enrichissez votre arsenal de négociation
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Ces techniques se combinent parfaitement avec {currentTechnique?.title} pour 
              créer une approche de négociation complète et redoutable.
            </p>
          </div>
        </AnimatedSection>

        {/* Grille des techniques liées */}
        {relatedIds.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {relatedIds.map((techniqueId, index) => (
              <TechniqueCard
                key={techniqueId}
                techniqueId={techniqueId}
                index={index}
                isRecommended={index === 0}
              />
            ))}
          </div>
        )}

        {/* Bouton voir plus */}
        {Object.keys(techniquesData).length > 4 && !showAll && (
          <AnimatedSection animation="slide-up" delay={300}>
            <div className="text-center mb-12">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAll(true)}
                icon={<span>👁️</span>}
              >
                Voir toutes les techniques
              </Button>
            </div>
          </AnimatedSection>
        )}

        {/* Lien vers formation spécialisée */}
        <AnimatedSection animation="slide-up" delay={400}>
          <FormationLinks currentCategory={currentTechnique?.category || 'closing'} />
        </AnimatedSection>

        {/* Navigation précédent/suivant */}
        <NavigationLinks current={current} />

        {/* CTA retour vers la liste */}
        <AnimatedSection animation="fade-in" delay={500}>
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-ink/10 to-mint-green/10 rounded-2xl p-8 border border-blue-ink/20">
              <h3 className="text-xl font-bold text-blue-ink dark:text-white mb-4">
                🎯 Explorez toutes nos techniques
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Découvrez notre collection complète de techniques de négociation, 
                chacune adaptée au contexte PME français avec des cas concrets et des scripts prêts à utiliser.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/ressources/techniques-de-negociation">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<span>📚</span>}
                  >
                    Toutes les techniques
                  </Button>
                </Link>
                
                <Link href="/ressources">
                  <Button
                    variant="outline"
                    size="lg"
                    icon={<span>🏠</span>}
                  >
                    Centre de ressources
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default RelatedTechniques;