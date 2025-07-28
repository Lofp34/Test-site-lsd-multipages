'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Download, Play, RotateCcw, BookOpen, Target, Brain, Users } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import NegotiationButton from '@/components/ui/NegotiationButton';
import NegotiationBadge from '@/components/ui/NegotiationBadge';
import DownloadableResource from '@/components/ui/DownloadableResource';
import ResourcePreview from '@/components/ui/ResourcePreview';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface ChecklistCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  items: ChecklistItem[];
}

interface DownloadableResourceData {
  id: string;
  title: string;
  description: string;
  format: string;
  downloadUrl: string;
  preview?: string;
  size?: string;
  pages?: number;
  highlights?: string[];
}

interface InteractiveToolsProps {
  checklist: {
    category: string;
    items: string[];
  }[];
  downloadableResources: {
    title: string;
    description: string;
    format: string;
    downloadUrl: string;
  }[];
}

interface UserProgress {
  checklistProgress: Record<string, boolean>;
  timeSpent: number;
  sectionsCompleted: string[];
  resourcesDownloaded: string[];
}

interface UserInfo {
  email: string;
  firstName: string;
  company?: string;
  role?: string;
}

const InteractiveTools: React.FC<InteractiveToolsProps> = ({
  checklist,
  downloadableResources
}) => {
  // État pour la progression utilisateur
  const [userProgress, setUserProgress] = useState<UserProgress>({
    checklistProgress: {},
    timeSpent: 0,
    sectionsCompleted: [],
    resourcesDownloaded: []
  });

  // État pour la checklist interactive
  const [checklistData, setChecklistData] = useState<ChecklistCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [showSimulation, setShowSimulation] = useState(false);
  
  // État pour les ressources et preview
  const [showPreview, setShowPreview] = useState(false);
  const [previewResource, setPreviewResource] = useState<DownloadableResourceData | null>(null);

  // Initialisation des données de checklist
  useEffect(() => {
    const transformedChecklist: ChecklistCategory[] = checklist.map((cat, index) => ({
      id: `category-${index}`,
      title: cat.category,
      description: `Maîtrisez ${cat.category.toLowerCase()} avec cette checklist interactive`,
      icon: getIconForCategory(cat.category),
      items: cat.items.map((item, itemIndex) => ({
        id: `item-${index}-${itemIndex}`,
        text: item,
        completed: userProgress.checklistProgress[`item-${index}-${itemIndex}`] || false
      }))
    }));

    setChecklistData(transformedChecklist);
    if (transformedChecklist.length > 0) {
      setActiveCategory(transformedChecklist[0].id);
    }
  }, [checklist, userProgress.checklistProgress]);

  // Chargement de la progression depuis localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('negotiation-technique-progress');
    if (savedProgress) {
      try {
        setUserProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Erreur lors du chargement de la progression:', error);
      }
    }
  }, []);

  // Sauvegarde de la progression
  const saveProgress = (newProgress: UserProgress) => {
    setUserProgress(newProgress);
    localStorage.setItem('negotiation-technique-progress', JSON.stringify(newProgress));
  };

  // Fonction pour obtenir l'icône selon la catégorie
  function getIconForCategory(category: string): string {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('préparation')) return '🎯';
    if (categoryLower.includes('empathie')) return '🧠';
    if (categoryLower.includes('alternative')) return '💡';
    if (categoryLower.includes('clôture')) return '✅';
    return '📋';
  }

  // Gestion du clic sur un item de checklist
  const handleChecklistItemToggle = (categoryId: string, itemId: string) => {
    const newProgress = {
      ...userProgress,
      checklistProgress: {
        ...userProgress.checklistProgress,
        [itemId]: !userProgress.checklistProgress[itemId]
      }
    };
    saveProgress(newProgress);

    // Mise à jour de l'état local
    setChecklistData(prev => prev.map(cat => 
      cat.id === categoryId 
        ? {
            ...cat,
            items: cat.items.map(item => 
              item.id === itemId 
                ? { ...item, completed: !item.completed }
                : item
            )
          }
        : cat
    ));

    // Tracking de l'événement
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'checklist_item_toggle', {
        event_category: 'Interactive Tools',
        event_label: itemId,
        value: !userProgress.checklistProgress[itemId] ? 1 : 0
      });
    }
  };

  // Calcul du pourcentage de progression
  const getProgressPercentage = (category: ChecklistCategory): number => {
    const completedItems = category.items.filter(item => item.completed).length;
    return Math.round((completedItems / category.items.length) * 100);
  };

  // Calcul de la progression globale
  const getOverallProgress = (): number => {
    const totalItems = checklistData.reduce((sum, cat) => sum + cat.items.length, 0);
    const completedItems = checklistData.reduce((sum, cat) => 
      sum + cat.items.filter(item => item.completed).length, 0
    );
    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  };

  // Gestion du téléchargement de ressource
  const handleResourceDownload = (resourceId: string, userInfo?: UserInfo) => {
    const newProgress = {
      ...userProgress,
      resourcesDownloaded: [...userProgress.resourcesDownloaded, resourceId]
    };
    saveProgress(newProgress);

    const resource = transformedResources.find(r => r.id === resourceId);
    if (resource) {
      // Tracking de l'événement
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'resource_download', {
          event_category: 'Interactive Tools',
          event_label: resource.title,
          value: 1
        });
      }

      // Si des informations utilisateur sont fournies, les envoyer à l'API
      if (userInfo) {
        // Ici, dans un vrai projet, on enverrait les données à HubSpot ou un CRM
        console.log('Lead généré:', { ...userInfo, resource: resource.title });
        
        // Tracking de la génération de lead
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', {
            event_category: 'Lead Generation',
            event_label: resource.title,
            value: 10 // Valeur estimée d'un lead
          });
        }
      }

      // Simulation du téléchargement
      window.open(resource.downloadUrl, '_blank');
    }
  };

  // Gestion de la prévisualisation
  const handleResourcePreview = (resourceId: string) => {
    const resource = transformedResources.find(r => r.id === resourceId);
    if (resource) {
      setPreviewResource(resource);
      setShowPreview(true);
    }
  };

  // Reset de la progression
  const handleResetProgress = () => {
    const resetProgress: UserProgress = {
      checklistProgress: {},
      timeSpent: 0,
      sectionsCompleted: [],
      resourcesDownloaded: []
    };
    saveProgress(resetProgress);
    
    // Reset de l'état local
    setChecklistData(prev => prev.map(cat => ({
      ...cat,
      items: cat.items.map(item => ({ ...item, completed: false }))
    })));
  };

  // Transformation des ressources téléchargeables
  const transformedResources: DownloadableResourceData[] = downloadableResources.map((resource, index) => ({
    id: `resource-${index}`,
    title: resource.title,
    description: resource.description,
    format: resource.format,
    downloadUrl: resource.downloadUrl,
    size: getResourceSize(resource.title),
    pages: getResourcePages(resource.title),
    preview: `preview-${index}`,
    highlights: getResourceHighlights(resource.title)
  }));

  function getResourceSize(title: string): string {
    if (title.includes('Checklist')) return '2.1 MB';
    if (title.includes('Scripts')) return '3.4 MB';
    if (title.includes('Guide')) return '4.7 MB';
    return '2.5 MB';
  }

  function getResourcePages(title: string): number {
    if (title.includes('Checklist')) return 8;
    if (title.includes('Scripts')) return 15;
    if (title.includes('Guide')) return 24;
    return 12;
  }

  function getResourceHighlights(title: string): string[] {
    if (title.includes('Checklist')) {
      return [
        'Checklist complète en 4 étapes',
        'Scripts prêts à utiliser',
        'Méthode de préparation mentale',
        'Techniques d\'ancrage de valeur',
        'Gestion des objections courantes'
      ];
    }
    if (title.includes('Scripts')) {
      return [
        '15 scripts de négociation testés',
        'Formulations pour chaque étape',
        'Réponses aux objections types',
        'Adaptations selon le profil client',
        'Exemples concrets PME'
      ];
    }
    if (title.includes('Guide')) {
      return [
        'Méthode complète en 24 pages',
        'Cas pratiques détaillés',
        'Alternatives créatives',
        'Psychologie de la négociation',
        'Outils d\'entraînement'
      ];
    }
    return [
      'Contenu expert validé',
      'Méthodes éprouvées',
      'Exemples concrets',
      'Application immédiate'
    ];
  }

  return (
    <AnimatedSection delay={400}>
      <div className="max-w-6xl mx-auto mb-16 px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <NegotiationBadge 
            text="Outils interactifs"
            icon="🛠️"
            className="mb-6"
          />
          <h3 className="text-3xl md:text-4xl font-bold text-primary-title mb-6">
            Maîtrisez la technique avec nos outils pratiques
          </h3>
          <p className="text-lg text-primary-secondary/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Checklist interactive, ressources téléchargeables et outils d'entraînement 
            pour appliquer immédiatement la technique "Ne jamais couper la poire en deux"
          </p>

          {/* Progression globale */}
          <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl p-6 mb-8 border border-red-500/20 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold text-blue-ink dark:text-red-400">
                Votre progression
              </h4>
              <span className="text-2xl font-bold text-red-600">
                {getOverallProgress()}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
              <motion.div
                className="bg-gradient-to-r from-red-600 to-orange-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getOverallProgress()}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-red-600">
                  {Object.values(userProgress.checklistProgress).filter(Boolean).length}
                </div>
                <div className="text-sm text-primary-secondary/70">Items complétés</div>
              </div>
              <div>
                <div className="text-lg font-bold text-orange-600">
                  {userProgress.resourcesDownloaded.length}
                </div>
                <div className="text-sm text-primary-secondary/70">Ressources téléchargées</div>
              </div>
              <div>
                <div className="text-lg font-bold text-amber-600">
                  {Math.floor(userProgress.timeSpent / 60)}min
                </div>
                <div className="text-sm text-primary-secondary/70">Temps d'étude</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checklist Interactive */}
          <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-8 border border-red-500/20 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-2xl font-bold text-blue-ink dark:text-red-400 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-red-600" />
                Checklist Interactive
              </h4>
              <NegotiationButton
                variant="outline"
                size="sm"
                onClick={handleResetProgress}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </NegotiationButton>
            </div>

            {/* Onglets des catégories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {checklistData.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.title}
                  <span className="ml-2 text-xs opacity-75">
                    {getProgressPercentage(category)}%
                  </span>
                </button>
              ))}
            </div>

            {/* Contenu de la catégorie active */}
            <AnimatePresence mode="wait">
              {checklistData.map((category) => (
                activeCategory === category.id && (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-4">
                      <h5 className="text-lg font-semibold text-blue-ink dark:text-white mb-2">
                        {category.title}
                      </h5>
                      <p className="text-sm text-primary-secondary/80 mb-4">
                        {category.description}
                      </p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                        <motion.div
                          className="bg-gradient-to-r from-red-600 to-orange-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${getProgressPercentage(category)}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <motion.div
                          key={item.id}
                          className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                            item.completed
                              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                              : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-red-50 dark:hover:bg-red-900/10 border border-gray-200 dark:border-gray-700'
                          }`}
                          onClick={() => handleChecklistItemToggle(category.id, item.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {item.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                          )}
                          <span className={`text-sm leading-relaxed ${
                            item.completed 
                              ? 'text-green-800 dark:text-green-300 line-through' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {item.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Ressources Téléchargeables */}
          <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-8 border border-orange-500/20 backdrop-blur-sm">
            <h4 className="text-2xl font-bold text-blue-ink dark:text-orange-400 mb-6 flex items-center gap-3">
              <Download className="w-8 h-8 text-orange-600" />
              Ressources Téléchargeables
            </h4>

            <div className="space-y-6">
              {transformedResources.map((resource) => (
                <DownloadableResource
                  key={resource.id}
                  id={resource.id}
                  title={resource.title}
                  description={resource.description}
                  format={resource.format}
                  downloadUrl={resource.downloadUrl}
                  preview={resource.preview}
                  size={resource.size}
                  pages={resource.pages}
                  downloadCount={Math.floor(Math.random() * 500) + 100} // Simulation
                  isDownloaded={userProgress.resourcesDownloaded.includes(resource.id)}
                  requiresEmail={true}
                  onDownload={handleResourceDownload}
                  onPreview={handleResourcePreview}
                />
              ))}
            </div>

            {/* CTA vers plus de ressources */}
            <div className="mt-8 p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20">
              <h5 className="text-lg font-semibold text-orange-600 mb-2">
                Besoin de plus de ressources ?
              </h5>
              <p className="text-sm text-primary-secondary/80 mb-4">
                Accédez à notre bibliothèque complète de guides, scripts et outils de négociation
              </p>
              <NegotiationButton
                variant="outline"
                size="sm"
                className="text-orange-600 border-orange-600 hover:bg-orange-50"
              >
                <Target className="w-4 h-4 mr-2" />
                Voir toutes les ressources
              </NegotiationButton>
            </div>
          </div>
        </div>

        {/* Outil de simulation (bonus) */}
        <div className="mt-12 bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-8 border border-amber-500/20 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-blue-ink dark:text-amber-400 mb-4 flex items-center justify-center gap-3">
              <Brain className="w-8 h-8 text-amber-600" />
              Simulateur de Négociation
            </h4>
            <p className="text-primary-secondary/80 mb-6">
              Entraînez-vous avec des scénarios réalistes basés sur les cas clients de Laurent Serre
            </p>
            
            {!showSimulation ? (
              <NegotiationButton
                variant="primary"
                onClick={() => setShowSimulation(true)}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
              >
                <Play className="w-5 h-5 mr-2" />
                Lancer la simulation
              </NegotiationButton>
            ) : (
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-amber-600" />
                  <h5 className="text-lg font-semibold text-amber-800 dark:text-amber-300">
                    Scénario : PME Industrie - Demande de remise 30%
                  </h5>
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-4">
                  "Votre concurrent propose 30% moins cher. Il faut couper la poire en deux sinon on va voir ailleurs."
                </p>
                <div className="text-center">
                  <p className="text-sm text-amber-600 mb-4">
                    🚧 Simulateur en développement - Disponible prochainement
                  </p>
                  <NegotiationButton
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSimulation(false)}
                    className="text-amber-600 border-amber-600 hover:bg-amber-50"
                  >
                    Fermer
                  </NegotiationButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resource Preview Modal */}
      {previewResource && (
        <ResourcePreview
          isOpen={showPreview}
          onClose={() => {
            setShowPreview(false);
            setPreviewResource(null);
          }}
          resource={{
            id: previewResource.id,
            title: previewResource.title,
            description: previewResource.description,
            format: previewResource.format,
            pages: previewResource.pages || 12,
            size: previewResource.size || '2.5 MB',
            preview: previewResource.preview || '',
            highlights: previewResource.highlights || []
          }}
          onDownload={handleResourceDownload}
        />
      )}
    </AnimatedSection>
  );
};

export default InteractiveTools;