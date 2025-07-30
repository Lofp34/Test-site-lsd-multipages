'use client';

import React, { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface CommonMistakesProps {
  mistakes: {
    mistake: string;
    consequence: string;
    solution: string;
  }[];
  techniqueTitle?: string;
}

interface MistakeCardProps {
  mistake: {
    mistake: string;
    consequence: string;
    solution: string;
  };
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

interface MistakeAlertProps {
  type: 'critical' | 'warning' | 'info';
  children: React.ReactNode;
}

interface PreventionTipsProps {
  techniqueTitle?: string;
}

// Composant Alerte de type erreur
const MistakeAlert: React.FC<MistakeAlertProps> = ({ type, children }) => {
  const getAlertStyles = () => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          icon: '🚨',
          iconBg: 'bg-red-100 dark:bg-red-800/30',
          iconColor: 'text-red-600 dark:text-red-400'
        };
      case 'warning':
        return {
          bg: 'bg-orange-50 dark:bg-orange-900/20',
          border: 'border-orange-200 dark:border-orange-800',
          icon: '⚠️',
          iconBg: 'bg-orange-100 dark:bg-orange-800/30',
          iconColor: 'text-orange-600 dark:text-orange-400'
        };
      case 'info':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          icon: 'ℹ️',
          iconBg: 'bg-blue-100 dark:bg-blue-800/30',
          iconColor: 'text-blue-600 dark:text-blue-400'
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-900/20',
          border: 'border-gray-200 dark:border-gray-800',
          icon: '💡',
          iconBg: 'bg-gray-100 dark:bg-gray-800/30',
          iconColor: 'text-gray-600 dark:text-gray-400'
        };
    }
  };

  const styles = getAlertStyles();

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-xl p-4 flex items-start gap-3`}>
      <div className={`${styles.iconBg} w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0`}>
        <span className="text-lg">{styles.icon}</span>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

// Composant Carte d'erreur
const MistakeCard: React.FC<MistakeCardProps> = ({ mistake, index, isExpanded, onToggle }) => {
  const getSeverityLevel = (mistake: string): 'critical' | 'warning' | 'info' => {
    const mistakeLower = mistake.toLowerCase();
    
    if (mistakeLower.includes('mécaniquement') || mistakeLower.includes('robotique') || mistakeLower.includes('agaçant')) {
      return 'critical';
    }
    if (mistakeLower.includes('timing') || mistakeLower.includes('agressif') || mistakeLower.includes('harcelé')) {
      return 'warning';
    }
    return 'info';
  };

  const severity = getSeverityLevel(mistake.mistake);

  const handleToggle = () => {
    onToggle();
    
    // Track mistake interaction
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'mistake_interaction', {
        event_category: 'Common Mistakes',
        event_label: `Mistake ${index + 1}`,
        action: isExpanded ? 'collapse' : 'expand'
      });
    }
  };

  return (
    <AnimatedSection delay={100 + index * 100} animation="slide-up">
      <div className="bg-white/80 dark:bg-blue-ink/60 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* En-tête de la carte */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 dark:text-red-400 text-xl">❌</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold text-blue-ink dark:text-white text-lg">
                    Erreur #{index + 1}
                  </h4>
                  <Badge 
                    variant="outline" 
                    size="sm" 
                    className={`
                      ${severity === 'critical' ? 'border-red-300 text-red-600 bg-red-50 dark:bg-red-900/20' : ''}
                      ${severity === 'warning' ? 'border-orange-300 text-orange-600 bg-orange-50 dark:bg-orange-900/20' : ''}
                      ${severity === 'info' ? 'border-blue-300 text-blue-600 bg-blue-50 dark:bg-blue-900/20' : ''}
                    `}
                  >
                    {severity === 'critical' ? 'Critique' : severity === 'warning' ? 'Attention' : 'À éviter'}
                  </Badge>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {mistake.mistake}
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggle}
              className="text-mint-green hover:bg-mint-green/10 ml-4"
              icon={
                <span className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                  ↓
                </span>
              }
            >
              {isExpanded ? 'Réduire' : 'Solution'}
            </Button>
          </div>
        </div>

        {/* Contenu extensible */}
        <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-6 pb-6 space-y-4">
            {/* Conséquences */}
            <MistakeAlert type={severity}>
              <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Conséquences
              </h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {mistake.consequence}
              </p>
            </MistakeAlert>

            {/* Solution */}
            <div className="bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl p-4 border border-mint-green/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-mint-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-mint-green text-lg">✅</span>
                </div>
                <div>
                  <h5 className="font-semibold text-blue-ink dark:text-white mb-2">
                    Solution recommandée
                  </h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {mistake.solution}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// Composant Conseils de prévention
const PreventionTips: React.FC<PreventionTipsProps> = ({ techniqueTitle }) => {
  const getPreventionTips = () => {
    return [
      {
        icon: '🎯',
        title: 'Pratiquez d\'abord en sécurité',
        description: 'Testez la technique avec des collègues ou sur des négociations à faible enjeu avant de l\'utiliser sur des clients importants.'
      },
      {
        icon: '📝',
        title: 'Préparez vos scripts',
        description: 'Ayez toujours des formulations alternatives prêtes pour éviter la répétition mécanique et garder la spontanéité.'
      },
      {
        icon: '👂',
        title: 'Écoutez les signaux',
        description: 'Observez les réactions de votre interlocuteur et adaptez votre approche si vous sentez de l\'agacement ou de la fermeture.'
      },
      {
        icon: '⏰',
        title: 'Respectez le timing',
        description: 'Chaque technique a son moment optimal. Forcer au mauvais moment peut détruire la relation commerciale.'
      },
      {
        icon: '🤝',
        title: 'Gardez l\'authenticité',
        description: 'La technique doit servir la relation, pas la remplacer. Restez sincère dans votre volonté d\'aider le client.'
      },
      {
        icon: '📊',
        title: 'Mesurez vos résultats',
        description: 'Suivez l\'efficacité de vos applications pour identifier vos points d\'amélioration et ajuster votre approche.'
      }
    ];
  };

  const tips = getPreventionTips();

  return (
    <AnimatedSection animation="fade-in" delay={400}>
      <div className="mt-12 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-2xl p-8 border border-mint-green/20">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-blue-ink dark:text-white mb-4">
            🛡️ Conseils de prévention
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comment éviter ces erreurs et appliquer {techniqueTitle || 'la technique'} avec succès
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <AnimatedSection key={index} delay={500 + index * 100} animation="scale-in">
              <div className="bg-white/70 dark:bg-blue-ink/40 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-mint-green/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-mint-green/30 transition-colors duration-300">
                  <span className="text-2xl">{tip.icon}</span>
                </div>
                <h4 className="font-bold text-blue-ink dark:text-white mb-3">
                  {tip.title}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

// Composant principal CommonMistakes
const CommonMistakes: React.FC<CommonMistakesProps> = ({ mistakes, techniqueTitle }) => {
  const [expandedMistake, setExpandedMistake] = useState<number | null>(null);

  const handleMistakeToggle = (index: number) => {
    setExpandedMistake(expandedMistake === index ? null : index);
  };

  // Statistiques des erreurs
  const criticalMistakes = mistakes.filter(m => 
    m.mistake.toLowerCase().includes('mécaniquement') || 
    m.mistake.toLowerCase().includes('robotique') ||
    m.mistake.toLowerCase().includes('agaçant')
  ).length;

  return (
    <section className="py-16 bg-gradient-to-b from-white/50 to-primary-bg dark:from-blue-ink/40 dark:to-blue-ink/20">
      <div className="max-w-6xl mx-auto px-4">
        {/* En-tête de section */}
        <AnimatedSection animation="fade-in" delay={0}>
          <div className="text-center mb-12">
            <Badge variant="default" size="md" className="mb-4 bg-red-100 text-red-600 border-red-200">
              <span className="mr-2">⚠️</span>
              Erreurs à éviter
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-ink dark:text-white mb-4">
              Erreurs courantes avec {techniqueTitle || 'cette technique'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
              Apprenez des erreurs les plus fréquentes pour éviter les pièges et maximiser 
              l'efficacité de votre application de la technique.
            </p>

            {/* Statistiques des erreurs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/70 dark:bg-blue-ink/60 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {mistakes.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Erreurs identifiées
                </div>
              </div>
              
              <div className="bg-white/70 dark:bg-blue-ink/60 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {criticalMistakes}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Erreurs critiques
                </div>
              </div>
              
              <div className="bg-white/70 dark:bg-blue-ink/60 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-mint-green mb-1">
                  100%
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Évitables
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Liste des erreurs */}
        <div className="space-y-6 mb-12">
          {mistakes.map((mistake, index) => (
            <MistakeCard
              key={index}
              mistake={mistake}
              index={index}
              isExpanded={expandedMistake === index}
              onToggle={() => handleMistakeToggle(index)}
            />
          ))}
        </div>

        {/* Message d'encouragement */}
        <AnimatedSection animation="slide-up" delay={300}>
          <div className="bg-gradient-to-r from-blue-ink/10 to-mint-green/10 rounded-2xl p-8 border border-blue-ink/20 text-center">
            <div className="w-16 h-16 bg-mint-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-blue-ink dark:text-white mb-4">
              La maîtrise vient avec la pratique
            </h3>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
              Ces erreurs sont normales dans l'apprentissage. Même les experts les ont commises ! 
              L'important est de les identifier rapidement et d'ajuster son approche.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={<span>📚</span>}
              >
                Guide de pratique
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                icon={<span>🎯</span>}
              >
                Coaching personnalisé
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Conseils de prévention */}
        <PreventionTips techniqueTitle={techniqueTitle} />

        {/* Citation motivante */}
        <AnimatedSection animation="fade-in" delay={600}>
          <div className="mt-12 text-center">
            <blockquote className="text-xl italic text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              "L'erreur n'est pas de tomber, mais de ne pas se relever et apprendre de sa chute."
            </blockquote>
            <cite className="text-mint-green font-semibold mt-4 block">
              — Laurent Serre, Expert développement commercial PME
            </cite>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CommonMistakes;