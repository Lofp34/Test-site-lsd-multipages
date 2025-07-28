'use client';

import React, { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { NegotiationTechnique } from '@/types/negotiation-technique';
import TechniqueBreadcrumb from '@/components/ui/TechniqueBreadcrumb';
import HeroSection from '@/components/sections/HeroSection';
import { LazySection, useMemoryOptimization, measurePerformance } from '@/utils/performance-optimization';

// Lazy load non-critical sections for better performance
const ExpertiseSection = dynamic(() => import('@/components/sections/ExpertiseSection'), {
  loading: () => <div className="h-96 bg-white/10 rounded-xl animate-pulse mx-4 mb-8" />,
});

const CredibilitySection = dynamic(() => import('@/components/sections/CredibilitySection'), {
  loading: () => <div className="h-64 bg-white/10 rounded-xl animate-pulse mx-4 mb-8" />,
});

const PracticalGuide = dynamic(() => import('@/components/sections/PracticalGuide'), {
  loading: () => <div className="h-96 bg-white/10 rounded-xl animate-pulse mx-4 mb-8" />,
});

const CommonMistakes = dynamic(() => import('@/components/sections/CommonMistakes'), {
  loading: () => <div className="h-64 bg-white/10 rounded-xl animate-pulse mx-4 mb-8" />,
});

const CaseStudies = dynamic(() => import('@/components/sections/CaseStudies'), {
  loading: () => <div className="h-96 bg-white/10 rounded-xl animate-pulse mx-4 mb-8" />,
});

const InteractiveTools = dynamic(() => import('@/components/sections/InteractiveTools'), {
  loading: () => <div className="h-64 bg-white/10 rounded-xl animate-pulse mx-4 mb-8" />,
});

const ConversionCTAs = dynamic(() => import('@/components/sections/ConversionCTAs'), {
  loading: () => <div className="h-48 bg-white/10 rounded-xl animate-pulse mx-4 mb-8" />,
});

const RelatedTechniques = dynamic(() => import('@/components/sections/RelatedTechniques'), {
  loading: () => <div className="h-48 bg-white/10 rounded-xl animate-pulse mx-4 mb-8" />,
});

const StickyCTA = dynamic(() => import('@/components/ui/StickyCTA'), {
  loading: () => null,
});

const InlineCTA = dynamic(() => import('@/components/ui/InlineCTA'), {
  loading: () => <div className="h-32 bg-white/10 rounded-xl animate-pulse mx-4 mb-8" />,
});

const SocialSharing = dynamic(() => import('@/components/ui/SocialSharing'), {
  loading: () => <div className="h-12 bg-white/10 rounded-xl animate-pulse" />,
});

const SectionSharing = dynamic(() => import('@/components/ui/SectionSharing'), {
  loading: () => <div className="h-8 bg-white/10 rounded-xl animate-pulse" />,
});

interface TechniquePageProps {
  technique: NegotiationTechnique;
}

export default function TechniquePage({ technique }: TechniquePageProps) {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>('');

  // Enable memory optimization
  useMemoryOptimization();

  useEffect(() => {
    // Initialize advanced analytics for this technique with performance measurement
    const initializeAnalytics = async () => {
      measurePerformance('analytics-init', async () => {
        const { initializeAdvancedAnalytics } = await import('@/utils/analytics-init');
        initializeAdvancedAnalytics(technique.title);
      });
    };
    
    initializeAnalytics();

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show sticky CTA after scrolling 50% of the page
      const showThreshold = (documentHeight - windowHeight) * 0.5;
      setShowStickyCTA(scrollPosition > showThreshold);

      // Track current section for social sharing
      const sections = ['hero', 'expertise', 'credibility', 'guide', 'mistakes', 'cases', 'tools'];
      const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean);
      
      for (const element of sectionElements) {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setCurrentSection(element.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [technique.title]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      
      {/* Breadcrumb Navigation */}
      <div className="relative z-20 pt-24 bg-gradient-to-br from-red-600 via-orange-500/10 to-primary-bg">
        <TechniqueBreadcrumb 
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Ressources', href: '/ressources' },
            { label: 'Techniques de Négociation', href: '/ressources/techniques-de-negociation' },
            { label: technique.title, href: `/ressources/techniques-de-negociation/${technique.slug}`, current: true }
          ]}
        />
      </div>

      {/* Hero Section */}
      <div id="hero">
        <HeroSection technique={technique} />
        
        {/* Social Sharing après le Hero */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="text-sm text-primary-secondary/70">
              📖 Temps de lecture : ~15 minutes
            </div>
            <SocialSharing 
              technique={technique}
              currentSection="hero"
              className="ml-auto"
            />
          </div>
        </div>
      </div>

      {/* Content Sections with proper background */}
      <div className="relative bg-gradient-to-br from-red-600 via-orange-500/10 to-primary-bg">
        {/* Expertise Section - Laurent Serre Vision & Psychology Insights */}
        <LazySection 
          fallback={<div className="h-96 bg-white/10 rounded-xl animate-pulse mx-4 mb-8" />}
          className="relative z-10"
        >
          <div id="expertise">
            <Suspense fallback={<div className="h-96 bg-white/10 rounded-xl animate-pulse mx-4 mb-8" />}>
              <ExpertiseSection 
                data={{
                  laurentVision: technique.laurentVision,
                  pmeAdaptation: technique.pmeAdaptation,
                  successMetrics: technique.successMetrics,
                  psychologyPrinciples: technique.psychologyPrinciples
                }}
              />
            </Suspense>
            
            {/* Section Sharing pour l'expertise */}
            <div className="max-w-4xl mx-auto px-4 py-6">
              <Suspense fallback={<div className="h-8 bg-white/10 rounded-xl animate-pulse" />}>
                <SectionSharing
                  technique={technique}
                  sectionId="expertise"
                  sectionTitle="Vision Laurent Serre"
                  keyQuote={technique.laurentVision}
                  compact={true}
                />
              </Suspense>
            </div>
          </div>
        </LazySection>

        {/* Credibility Section - Performance Metrics & Social Proof */}
        <LazySection 
          fallback={<div className="h-64 bg-white/10 rounded-xl animate-pulse mx-4 mb-8" />}
          className="relative z-10"
        >
          <div id="credibility">
            <Suspense fallback={<div className="h-64 bg-white/10 rounded-xl animate-pulse mx-4 mb-8" />}>
              <CredibilitySection 
                metrics={[
                  {
                    label: 'Préservation des marges',
                    value: '85%',
                    description: 'Des négociations sans remise significative',
                    icon: '💰',
                    color: '#DC2626'
                  },
                  {
                    label: 'Satisfaction client',
                    value: '92%',
                    description: 'Maintenue malgré la fermeté',
                    icon: '😊',
                    color: '#EA580C'
                  },
                  {
                    label: 'Durabilité des accords',
                    value: '95%',
                    description: 'Taux de renouvellement des contrats',
                    icon: '🤝',
                    color: '#F59E0B'
                  }
                ]}
                testimonials={technique.testimonials}
                badges={technique.credibilityBadges || [
                  {
                    title: 'Technique FBI Validée',
                    description: 'Développée par Chris Voss, négociateur en chef du FBI',
                    icon: '🎯',
                    color: '#DC2626'
                  },
                  {
                    title: '20 ans d\'Expérience PME',
                    description: 'Adaptée au contexte français par Laurent Serre',
                    icon: '🇫🇷',
                    color: '#EA580C'
                  },
                  {
                    title: '500+ Négociations Testées',
                    description: 'Prouvée sur le terrain avec des résultats mesurés',
                    icon: '📊',
                    color: '#F59E0B'
                  }
                ]}
                showAnimatedCounters={true}
              />
            </Suspense>
          </div>
        </LazySection>

        {/* Guide pratique étape par étape - Composant avancé */}
        <div id="guide">
          <PracticalGuide steps={technique.stepByStepGuide} />
          
          {/* Section Sharing pour le guide */}
          <div className="max-w-4xl mx-auto px-4 py-6">
            <SectionSharing
              technique={technique}
              sectionId="guide"
              sectionTitle="Guide Pratique Étape par Étape"
              keyQuote="Guide complet avec scripts et formulations pour appliquer cette technique FBI en contexte PME français"
              compact={true}
            />
          </div>
        </div>

        {/* Section Pièges à éviter */}
        <div id="mistakes">
          <CommonMistakes mistakes={technique.commonMistakes} />
          
          {/* Section Sharing pour les pièges */}
          <div className="max-w-4xl mx-auto px-4 py-6">
            <SectionSharing
              technique={technique}
              sectionId="mistakes"
              sectionTitle="Pièges à Éviter"
              keyQuote="Les erreurs courantes qui sabotent cette technique et comment les éviter"
              compact={true}
            />
          </div>
        </div>

        {/* Cas clients PME avec preuves de résultats */}
        <div id="cases">
          <CaseStudies 
            caseStudies={technique.caseStudies}
            laurentVision={technique.laurentVision}
            successMetrics={technique.successMetrics}
          />
          
          {/* Section Sharing pour les cas clients */}
          <div className="max-w-4xl mx-auto px-4 py-6">
            <SectionSharing
              technique={technique}
              sectionId="cases"
              sectionTitle="Cas Clients PME"
              keyQuote="85% de préservation des marges, 92% de satisfaction client maintenue - Résultats mesurés sur 500+ négociations PME"
              compact={true}
            />
          </div>
        </div>

        {/* Inline CTA après les cas clients */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <InlineCTA
            variant="diagnostic"
            context="after-case-studies"
            title="Vous voulez des résultats similaires ?"
            description="Découvrez comment adapter cette technique à votre secteur avec un diagnostic personnalisé gratuit."
            buttonText="Mon diagnostic gratuit"
            href="/diagnostic"
            icon={<span>📊</span>}
            className="mb-8"
          />
        </div>

        {/* Outils interactifs et ressources téléchargeables */}
        <div id="tools">
          <InteractiveTools 
            checklist={technique.interactiveChecklist || []}
            downloadableResources={technique.downloadableResources}
          />
          
          {/* Section Sharing pour les outils */}
          <div className="max-w-4xl mx-auto px-4 py-6">
            <SectionSharing
              technique={technique}
              sectionId="tools"
              sectionTitle="Outils et Ressources"
              keyQuote="Checklist interactive, templates et guides PDF pour maîtriser cette technique FBI"
              compact={true}
            />
          </div>
        </div>

        {/* Inline CTA après les outils */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <InlineCTA
            variant="bootcamp"
            context="after-tools"
            title="Maîtrisez 8 techniques de négociation"
            description="Formation intensive de 3 jours pour transformer votre approche commerciale. Prochaine session à Montpellier."
            buttonText="Découvrir le bootcamp"
            href="/bootcamp-commercial-intensif"
            icon={<span>🚀</span>}
            compact={true}
          />
        </div>

        {/* Section CTAs de conversion principale */}
        <ConversionCTAs 
          techniqueName={technique.title}
          className="py-16"
        />

        {/* Techniques liées et navigation */}
        <RelatedTechniques 
          currentTechnique={technique}
          relatedTechniques={[]}
          className="py-16"
        />

        {/* Social Sharing final - Version complète */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-red-600/20">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-red-600 mb-2">
                Partagez cette technique avec votre réseau
              </h3>
              <p className="text-primary-secondary/90">
                Aidez d'autres entrepreneurs à découvrir cette technique FBI adaptée aux PME françaises
              </p>
            </div>
            
            <SocialSharing 
              technique={technique}
              currentSection={currentSection}
              className="flex justify-center"
              showPreview={true}
            />
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <StickyCTA 
        isVisible={showStickyCTA}
        techniqueName={technique.title}
      />
    </main>
  );
}