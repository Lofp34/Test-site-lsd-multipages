'use client';

import React, { useState, useEffect } from 'react';
import { NegotiationTechnique } from '@/types/negotiation-technique';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface InteractiveToolsProps {
  technique: NegotiationTechnique;
}

interface InteractiveChecklistProps {
  checklist: {
    category: string;
    items: string[];
  }[];
  techniqueId: string;
}

interface DownloadableResourcesProps {
  resources: {
    title: string;
    description?: string;
    type: string;
    url: string;
  }[];
  techniqueTitle: string;
}

interface NegotiationSimulatorProps {
  technique: NegotiationTechnique;
}

interface ProgressTrackerProps {
  techniqueId: string;
  totalItems: number;
  completedItems: number;
}

// Composant Checklist Interactive
const InteractiveChecklist: React.FC<InteractiveChecklistProps> = ({ checklist, techniqueId }) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`checklist-${techniqueId}`);
    if (saved) {
      setCheckedItems(new Set(JSON.parse(saved)));
    }
    
    // Expand first category by default
    if (checklist.length > 0) {
      setExpandedCategories(new Set([checklist[0].category]));
    }
  }, [techniqueId, checklist]);

  // Save progress to localStorage
  const toggleItem = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
      
      // Track checklist interaction
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'checklist_item_checked', {
          event_category: 'Interactive Tools',
          event_label: itemId,
          technique_id: techniqueId
        });
      }
    }
    
    setCheckedItems(newChecked);
    localStorage.setItem(`checklist-${techniqueId}`, JSON.stringify([...newChecked]));
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const totalItems = checklist.reduce((sum, cat) => sum + cat.items.length, 0);
  const completedItems = checkedItems.size;
  const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div className="bg-white/80 dark:bg-blue-ink/60 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-xl font-bold text-blue-ink dark:text-white mb-2">
            📋 Checklist de maîtrise
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Suivez votre progression dans l'apprentissage de la technique
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-mint-green">
            {completedItems}/{totalItems}
          </div>
          <div className="text-xs text-gray-500">
            {Math.round(progressPercentage)}% complété
          </div>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-mint-green to-blue-ink h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Catégories de checklist */}
      <div className="space-y-4">
        {checklist.map((category, categoryIndex) => {
          const isExpanded = expandedCategories.has(category.category);
          const categoryItems = category.items.map((item, itemIndex) => 
            `${category.category}-${itemIndex}`
          );
          const categoryCompleted = categoryItems.filter(id => checkedItems.has(id)).length;
          
          return (
            <div key={categoryIndex} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleCategory(category.category)}
                className="w-full p-4 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 hover:from-mint-green/15 hover:to-blue-ink/15 transition-all duration-300 flex items-center justify-between"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-mint-green/20 rounded-lg flex items-center justify-center">
                    <span className="text-mint-green font-bold text-sm">
                      {categoryCompleted}/{category.items.length}
                    </span>
                  </div>
                  <h5 className="font-semibold text-blue-ink dark:text-white text-left">
                    {category.category}
                  </h5>
                </div>
                
                <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-mint-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-4 space-y-3">
                  {category.items.map((item, itemIndex) => {
                    const itemId = `${category.category}-${itemIndex}`;
                    const isChecked = checkedItems.has(itemId);
                    
                    return (
                      <label
                        key={itemIndex}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-blue-ink/30 transition-colors duration-200 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(itemId)}
                          className="mt-1 w-5 h-5 text-mint-green bg-gray-100 border-gray-300 rounded focus:ring-mint-green focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className={`text-sm leading-relaxed transition-all duration-200 ${
                          isChecked 
                            ? 'text-gray-500 dark:text-gray-400 line-through' 
                            : 'text-gray-700 dark:text-gray-300 group-hover:text-blue-ink dark:group-hover:text-white'
                        }`}>
                          {item}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message de félicitations */}
      {progressPercentage === 100 && (
        <AnimatedSection animation="scale-in" delay={200}>
          <div className="mt-6 p-4 bg-gradient-to-r from-mint-green/20 to-blue-ink/20 rounded-xl border border-mint-green/30 text-center">
            <div className="text-2xl mb-2">🎉</div>
            <h5 className="font-bold text-blue-ink dark:text-white mb-2">
              Félicitations !
            </h5>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Vous avez complété toute la checklist. Vous êtes prêt à appliquer la technique !
            </p>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
};

// Composant Ressources Téléchargeables
const DownloadableResources: React.FC<DownloadableResourcesProps> = ({ resources, techniqueTitle }) => {
  const handleDownload = (resource: any) => {
    // Track download
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'resource_download', {
        event_category: 'Interactive Tools',
        event_label: resource.title,
        resource_type: resource.type
      });
    }
    
    // In a real implementation, this would trigger the actual download
    console.log('Downloading:', resource.title);
  };

  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return '📄';
      case 'checklist': return '✅';
      case 'template': return '📋';
      case 'guide': return '📚';
      case 'script': return '💬';
      default: return '📁';
    }
  };

  return (
    <div className="bg-white/80 dark:bg-blue-ink/60 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="mb-6">
        <h4 className="text-xl font-bold text-blue-ink dark:text-white mb-2">
          📥 Ressources à télécharger
        </h4>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Outils pratiques pour appliquer {techniqueTitle}
        </p>
      </div>

      <div className="space-y-4">
        {resources.map((resource, index) => (
          <AnimatedSection key={index} delay={100 + index * 50} animation="slide-left">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white dark:from-blue-ink/30 dark:to-blue-ink/20 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-mint-green/20 rounded-xl flex items-center justify-center group-hover:bg-mint-green/30 transition-colors duration-300">
                  <span className="text-2xl">{getResourceIcon(resource.type)}</span>
                </div>
                
                <div>
                  <h5 className="font-semibold text-blue-ink dark:text-white mb-1">
                    {resource.title}
                  </h5>
                  {resource.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {resource.description}
                    </p>
                  )}
                  <Badge variant="outline" size="sm" className="mt-2 border-mint-green/30 text-mint-green">
                    {resource.type.toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleDownload(resource)}
                className="bg-mint-green hover:bg-mint-green/90"
                icon={<span>⬇️</span>}
              >
                Télécharger
              </Button>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Note sur l'utilisation */}
      <div className="mt-6 p-4 bg-blue-ink/10 dark:bg-blue-ink/20 rounded-xl border border-blue-ink/20">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-ink/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-blue-ink text-sm">💡</span>
          </div>
          <div>
            <h5 className="font-semibold text-blue-ink dark:text-white mb-2">
              Conseil d'utilisation
            </h5>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Imprimez ces ressources et gardez-les à portée de main pendant vos négociations. 
              La pratique régulière avec ces outils vous aidera à maîtriser rapidement la technique.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant Simulateur de Négociation
const NegotiationSimulator: React.FC<NegotiationSimulatorProps> = ({ technique }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const scenarios = [
    {
      situation: `Un client dit: "Votre prix est 30% plus élevé que la concurrence."`,
      context: `PME de 50 salariés, secteur industrie, négociation d'un contrat de 80K€`,
      options: [
        `"30% plus élevé ?" (Effet miroir)`,
        `"Je comprends votre préoccupation sur le budget..."`,
        `"Laissez-moi vous expliquer pourquoi nous sommes plus chers..."`
      ],
      bestResponse: 0,
      feedback: `Excellent ! L'effet miroir "${technique.title}" permet de faire préciser le client et découvrir ses vraies préoccupations derrière l'objection prix.`
    },
    {
      situation: `Le client hésite: "Il faut que j'en parle à mon associé..."`,
      context: `Startup tech, 15 salariés, décision sur un service de 25K€`,
      options: [
        `"Quand pensez-vous avoir sa réponse ?"`,
        `"Votre associé ?" (Effet miroir)`,
        `"Je peux lui présenter directement si vous voulez."`
      ],
      bestResponse: 1,
      feedback: `Parfait ! Le miroir sur "associé" va révéler la vraie dynamique décisionnelle et les préoccupations non exprimées.`
    }
  ];

  const handleResponseSelect = (optionIndex: number) => {
    setUserResponse(scenarios[currentScenario].options[optionIndex]);
    setShowFeedback(true);
    
    // Track simulator interaction
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'simulator_response', {
        event_category: 'Interactive Tools',
        event_label: `Scenario ${currentScenario + 1}`,
        response_quality: optionIndex === scenarios[currentScenario].bestResponse ? 'excellent' : 'good',
        technique_id: technique.id
      });
    }
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setShowFeedback(false);
      setUserResponse('');
    }
  };

  const resetSimulator = () => {
    setCurrentScenario(0);
    setShowFeedback(false);
    setUserResponse('');
  };

  const scenario = scenarios[currentScenario];

  return (
    <div className="bg-white/80 dark:bg-blue-ink/60 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="mb-6">
        <h4 className="text-xl font-bold text-blue-ink dark:text-white mb-2">
          🎭 Simulateur de négociation
        </h4>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Entraînez-vous avec des scénarios réels d'application de {technique.title}
        </p>
      </div>

      {/* Progression */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Scénario {currentScenario + 1} sur {scenarios.length}
        </div>
        <div className="flex gap-2">
          {scenarios.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentScenario 
                  ? 'bg-mint-green' 
                  : index < currentScenario 
                    ? 'bg-mint-green/50' 
                    : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scénario */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-blue-ink/10 to-mint-green/10 rounded-xl p-4 border border-blue-ink/20 mb-4">
          <h5 className="font-semibold text-blue-ink dark:text-white mb-2">
            Situation
          </h5>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            {scenario.situation}
          </p>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Contexte:</strong> {scenario.context}
          </div>
        </div>

        {!showFeedback ? (
          <div>
            <h5 className="font-semibold text-blue-ink dark:text-white mb-3">
              Comment réagissez-vous ?
            </h5>
            <div className="space-y-3">
              {scenario.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleResponseSelect(index)}
                  className="w-full p-4 text-left bg-white dark:bg-blue-ink/40 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-mint-green hover:bg-mint-green/5 transition-all duration-300"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-mint-green/10 rounded-xl p-4 border border-mint-green/20 mb-4">
              <h5 className="font-semibold text-mint-green mb-2">
                Votre réponse
              </h5>
              <p className="text-gray-700 dark:text-gray-300">
                {userResponse}
              </p>
            </div>

            <div className="bg-blue-ink/10 rounded-xl p-4 border border-blue-ink/20 mb-4">
              <h5 className="font-semibold text-blue-ink dark:text-white mb-2">
                💡 Feedback
              </h5>
              <p className="text-gray-700 dark:text-gray-300">
                {scenario.feedback}
              </p>
            </div>

            <div className="flex gap-3">
              {currentScenario < scenarios.length - 1 ? (
                <Button
                  variant="primary"
                  onClick={nextScenario}
                  icon={<span>→</span>}
                  iconPosition="right"
                >
                  Scénario suivant
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={resetSimulator}
                  icon={<span>🔄</span>}
                >
                  Recommencer
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Composant Tracker de Progression
const ProgressTracker: React.FC<ProgressTrackerProps> = ({ techniqueId, totalItems, completedItems }) => {
  const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  
  const getMasteryLevel = () => {
    if (progressPercentage >= 90) return { level: 'Expert', color: 'text-green-600', icon: '🏆' };
    if (progressPercentage >= 70) return { level: 'Avancé', color: 'text-blue-600', icon: '🎯' };
    if (progressPercentage >= 40) return { level: 'Intermédiaire', color: 'text-orange-600', icon: '📈' };
    return { level: 'Débutant', color: 'text-gray-600', icon: '🌱' };
  };

  const mastery = getMasteryLevel();

  return (
    <div className="bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-2xl p-6 border border-mint-green/20">
      <div className="text-center">
        <div className="w-16 h-16 bg-mint-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">{mastery.icon}</span>
        </div>
        
        <h4 className="text-xl font-bold text-blue-ink dark:text-white mb-2">
          Niveau de maîtrise
        </h4>
        
        <div className={`text-2xl font-bold mb-2 ${mastery.color}`}>
          {mastery.level}
        </div>
        
        <div className="text-gray-600 dark:text-gray-400 mb-4">
          {Math.round(progressPercentage)}% de progression
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-mint-green to-blue-ink h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          {completedItems} sur {totalItems} éléments complétés
        </p>
      </div>
    </div>
  );
};

// Composant principal InteractiveTools
const InteractiveTools: React.FC<InteractiveToolsProps> = ({ technique }) => {
  const [activeTab, setActiveTab] = useState<'checklist' | 'resources' | 'simulator'>('checklist');

  // Calculate total progress
  const totalChecklistItems = technique.interactiveChecklist?.reduce((sum, cat) => sum + cat.items.length, 0) || 0;
  const [completedItems, setCompletedItems] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(`checklist-${technique.id}`);
    if (saved) {
      setCompletedItems(JSON.parse(saved).length);
    }
  }, [technique.id]);

  const tabs = [
    { id: 'checklist', label: 'Checklist', icon: '📋' },
    { id: 'resources', label: 'Ressources', icon: '📥' },
    { id: 'simulator', label: 'Simulateur', icon: '🎭' }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-primary-bg to-white/50 dark:from-blue-ink/20 dark:to-blue-ink/40">
      <div className="max-w-6xl mx-auto px-4">
        {/* En-tête de section */}
        <AnimatedSection animation="fade-in" delay={0}>
          <div className="text-center mb-12">
            <Badge variant="default" size="md" className="mb-4">
              <span className="mr-2">🛠️</span>
              Outils Interactifs
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-ink dark:text-white mb-4">
              Maîtrisez {technique.title} avec nos outils
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Checklists interactives, ressources téléchargeables et simulateur de négociation 
              pour une application pratique immédiate.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar avec progression */}
          <div className="lg:col-span-1">
            <AnimatedSection animation="slide-right" delay={100}>
              <div className="sticky top-24 space-y-6">
                {/* Tracker de progression */}
                <ProgressTracker
                  techniqueId={technique.id}
                  totalItems={totalChecklistItems}
                  completedItems={completedItems}
                />

                {/* Navigation des onglets */}
                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        activeTab === tab.id
                          ? 'border-mint-green bg-mint-green/10 shadow-lg'
                          : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-blue-ink/30 hover:border-mint-green/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{tab.icon}</span>
                        <span className={`font-semibold ${
                          activeTab === tab.id ? 'text-mint-green' : 'text-blue-ink dark:text-white'
                        }`}>
                          {tab.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            <AnimatedSection animation="slide-left" delay={200} key={activeTab}>
              {activeTab === 'checklist' && technique.interactiveChecklist && (
                <InteractiveChecklist
                  checklist={technique.interactiveChecklist}
                  techniqueId={technique.id}
                />
              )}

              {activeTab === 'resources' && technique.downloadableResources && (
                <DownloadableResources
                  resources={technique.downloadableResources}
                  techniqueTitle={technique.title}
                />
              )}

              {activeTab === 'simulator' && (
                <NegotiationSimulator technique={technique} />
              )}
            </AnimatedSection>
          </div>
        </div>

        {/* CTA vers formation */}
        <AnimatedSection animation="slide-up" delay={400}>
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-ink/10 to-mint-green/10 rounded-2xl p-8 border border-blue-ink/20">
              <h3 className="text-xl font-bold text-blue-ink dark:text-white mb-4">
                Besoin d'un accompagnement personnalisé ?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Ces outils vous donnent les bases, mais rien ne remplace un coaching personnalisé 
                pour maîtriser parfaitement {technique.title} dans votre contexte.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    // Track coaching CTA click
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'coaching_cta_click', {
                        event_category: 'Interactive Tools',
                        event_label: 'Coaching individuel',
                        technique_id: technique.id
                      });
                    }
                    // Redirect to coaching page
                    window.location.href = '/coach-commercial-entreprise';
                  }}
                  icon={<span>🎯</span>}
                >
                  Coaching individuel
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    // Track formation CTA click
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'formation_cta_click', {
                        event_category: 'Interactive Tools',
                        event_label: 'Formation équipe',
                        technique_id: technique.id
                      });
                    }
                    // Redirect to bootcamp page
                    window.location.href = '/bootcamp-commercial-intensif';
                  }}
                  icon={<span>👥</span>}
                >
                  Formation équipe
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default InteractiveTools;