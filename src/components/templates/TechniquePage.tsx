'use client';

import React, { Suspense } from 'react';
import { NegotiationTechnique } from '@/types/negotiation-technique';
import { getTechniqueTheme, useTechniqueTheme } from '@/utils/negotiation/theme-manager';
import { SEOGenerator } from '@/utils/negotiation/seo-generator';
import { ImageSEOOptimizer, SEOPerformanceOptimizer } from '@/utils/negotiation/seo-optimization';
import { PerformanceOptimizer, DEFAULT_PERFORMANCE_CONFIG } from '@/utils/negotiation/performance-optimization';

// Import des composants sections
import HeroSection from '@/components/sections/negotiation/HeroSection';
import ExpertiseSection from '@/components/sections/negotiation/ExpertiseSection';
import PracticalGuide from '@/components/sections/negotiation/PracticalGuide';
import CaseStudies from '@/components/sections/negotiation/CaseStudies';
import CommonMistakes from '@/components/sections/negotiation/CommonMistakes';
import InteractiveTools from '@/components/sections/negotiation/InteractiveTools';
import ConversionCTAs from '@/components/sections/negotiation/ConversionCTAs';
import RelatedTechniques from '@/components/sections/negotiation/RelatedTechniques';
import DownloadSection from '@/components/sections/negotiation/DownloadSection';

// Composants temporaires pour le développement
const PlaceholderSection: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <section className="py-8 px-4">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-primary-title">{title}</h2>
      <p className="text-primary-secondary">{description}</p>
    </div>
  </section>
);

export interface TechniquePageProps {
  technique: NegotiationTechnique;
  customSections?: string[];
  seoConfig?: {
    baseUrl: string;
    authorInfo: {
      name: string;
      url: string;
      image: string;
      description: string;
    };
    organizationInfo: {
      name: string;
      url: string;
      logo: string;
      description: string;
    };
  };
}

/**
 * Template principal pour les pages de techniques de négociation
 * Orchestrera l'affichage de toutes les sections avec une logique de thème dynamique
 */
const TechniquePage: React.FC<TechniquePageProps> = ({ 
  technique, 
  customSections = [],
  seoConfig 
}) => {
  // Récupération du thème spécifique à la technique
  const techniqueTheme = getTechniqueTheme(technique.id);
  const { theme, cssVars } = useTechniqueTheme(technique.id);

  // Génération des données structurées si la config SEO est fournie
  const structuredData = seoConfig ? SEOGenerator.generateStructuredData({
    technique,
    baseUrl: seoConfig.baseUrl,
    authorInfo: seoConfig.authorInfo,
    organizationInfo: seoConfig.organizationInfo
  }) : null;

  // Sections par défaut à afficher
  const defaultSections = [
    'hero',
    'expertise', 
    'practical-guide',
    'case-studies',
    'common-mistakes',
    'interactive-tools',
    'downloads',
    'conversion-ctas',
    'related-techniques'
  ];

  const sectionsToRender = customSections.length > 0 ? customSections : defaultSections;

  // Génération des directives de préchargement
  const preloadDirectives = seoConfig ? SEOPerformanceOptimizer.generatePreloadDirectives(technique, seoConfig.baseUrl) : [];
  const preconnectDirectives = SEOPerformanceOptimizer.generatePreconnectDirectives();

  // Initialisation de l'optimiseur de performance
  React.useEffect(() => {
    const performanceOptimizer = new PerformanceOptimizer(DEFAULT_PERFORMANCE_CONFIG);
    performanceOptimizer.optimizeTechniqueLoading(technique);
    
    return () => {
      performanceOptimizer.cleanup();
    };
  }, [technique]);

  return (
    <>
      {/* Préchargement des ressources critiques */}
      {preloadDirectives.map((directive, index) => (
        <link
          key={index}
          rel="preload"
          href={directive.href}
          as={directive.as}
          type={directive.type}
        />
      ))}
      
      {/* Préconnexion aux domaines externes */}
      {preconnectDirectives.map((domain, index) => (
        <link key={index} rel="preconnect" href={domain} />
      ))}

      {/* Données structurées Schema.org */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {/* Container principal avec thème spécifique */}
      <main 
        className={`technique-page ${techniqueTheme.className} relative min-h-screen pt-24 pb-16 overflow-hidden`}
        style={cssVars}
        itemScope
        itemType="https://schema.org/Article"
      >
        {/* Fond de particules thématique */}
        <div className="technique-particles absolute inset-0 pointer-events-none z-0">
          {/* Les particules seront générées dynamiquement */}
        </div>

        {/* Contenu principal */}
        <div className="relative z-10">
          {sectionsToRender.map((sectionId) => (
            <Suspense 
              key={sectionId} 
              fallback={
                <div className="py-8 px-4">
                  <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse bg-gray-200 h-32 rounded"></div>
                  </div>
                </div>
              }
            >
              <div data-section={sectionId}>
                {renderSection(sectionId, technique, techniqueTheme)}
              </div>
            </Suspense>
          ))}
        </div>

        {/* Tracking analytics */}
        <TechniqueAnalyticsTracker technique={technique} />
      </main>
    </>
  );
};

/**
 * Fonction pour rendre une section spécifique
 */
function renderSection(sectionId: string, technique: NegotiationTechnique, theme: any) {
  switch (sectionId) {
    case 'hero':
      // return <HeroSection technique={technique} theme={theme} />;
      return (
        <PlaceholderSection 
          title={`Hero: ${technique.title}`}
          description={`Section hero pour ${technique.title} avec thème ${theme.name}`}
        />
      );
      
    case 'expertise':
      // return <ExpertiseSection technique={technique} />;
      return (
        <PlaceholderSection 
          title="Vision Laurent Serre"
          description={technique.laurentVision}
        />
      );
      
    case 'practical-guide':
      // return <PracticalGuide steps={technique.stepByStepGuide} technique={technique} />;
      return (
        <PlaceholderSection 
          title="Guide Pratique"
          description={`${technique.stepByStepGuide.length} étapes pour maîtriser ${technique.title}`}
        />
      );
      
    case 'case-studies':
      // return <CaseStudies cases={technique.caseStudies} laurentFeedback={technique.laurentVision} />;
      return (
        <PlaceholderSection 
          title="Cas Clients PME"
          description={`${technique.caseStudies.length} exemples concrets d'application`}
        />
      );
      
    case 'common-mistakes':
      // return <CommonMistakes mistakes={technique.commonMistakes} />;
      return (
        <PlaceholderSection 
          title="Erreurs Courantes"
          description={`${technique.commonMistakes.length} erreurs à éviter`}
        />
      );
      
    case 'interactive-tools':
      return <InteractiveTools technique={technique} />;
      
    case 'downloads':
      return <DownloadSection techniqueId={technique.id} techniqueName={technique.title} />;
      
    case 'conversion-ctas':
      // return <ConversionCTAs technique={technique} />;
      return (
        <PlaceholderSection 
          title="CTAs de Conversion"
          description="Propositions de formation et coaching personnalisé"
        />
      );
      
    case 'related-techniques':
      // return <RelatedTechniques current={technique.id} />;
      return (
        <PlaceholderSection 
          title="Techniques Liées"
          description={`${technique.relatedTechniques.length} techniques complémentaires`}
        />
      );
      
    default:
      return (
        <PlaceholderSection 
          title={`Section: ${sectionId}`}
          description={`Section personnalisée: ${sectionId}`}
        />
      );
  }
}

/**
 * Composant de tracking analytics avancé pour les techniques
 */
const TechniqueAnalyticsTracker: React.FC<{ technique: NegotiationTechnique }> = ({ technique }) => {
  React.useEffect(() => {
    // Importer dynamiquement les trackers pour éviter les erreurs SSR
    Promise.all([
      import('@/utils/negotiation/analytics-tracking'),
      import('@/utils/negotiation/conversion-tracking')
    ]).then(([{ TechniqueAnalyticsTracker }, { ConversionTracker }]) => {
      const sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Initialiser le tracker analytics
      const analyticsTracker = new TechniqueAnalyticsTracker(technique);
      
      // Initialiser le tracker de conversions
      const conversionTracker = new ConversionTracker(technique, sessionId);
      
      // Stocker les trackers globalement pour accès depuis d'autres composants
      if (typeof window !== 'undefined') {
        (window as any).techniqueTracker = analyticsTracker;
        (window as any).conversionTracker = conversionTracker;
      }
      
      // Cleanup à la fermeture
      return () => {
        if (typeof window !== 'undefined') {
          delete (window as any).techniqueTracker;
          delete (window as any).conversionTracker;
        }
      };
    });
  }, [technique]);

  return null;
};

export default TechniquePage;