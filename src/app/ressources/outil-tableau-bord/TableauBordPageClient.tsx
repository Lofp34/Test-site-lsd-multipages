'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, Download, Users, Target, BookOpen, MessageCircle } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ParticleBackground from '@/components/ui/ParticleBackground';
import PerformanceMonitor from '@/components/ui/PerformanceMonitor';
import SkipLink from '@/components/ui/SkipLink';
import ResourceHero from '@/components/ressources/ResourceHero';
import ToolPreview from '@/components/ressources/ToolPreview';
import ResourceDownloadForm from '@/components/ressources/ResourceDownloadForm';
import ResourceCTAs from '@/components/ressources/ResourceCTAs';
import { tableauBordData } from '@/data/ressources/tableau-bord-data';
import { trackResourcePageView, trackPreviewClick, trackResourceCTA, useResourcePageTracking } from '@/utils/resource-analytics';
import { initializePerformanceOptimizations } from '@/utils/performance-optimization';
import { initializeAccessibilityEnhancements } from '@/utils/accessibility-enhancements';

const TableauBordPageClient: React.FC = () => {
  const [showDownloadForm, setShowDownloadForm] = useState(false);

  // Analytics tracking setup
  useEffect(() => {
    // Track page view
    trackResourcePageView({
      resourceId: tableauBordData.id,
      resourceTitle: tableauBordData.title,
      resourceUrl: '/ressources/outil-tableau-bord',
      category: tableauBordData.category
    });

    // Initialize performance optimizations
    initializePerformanceOptimizations();

    // Initialize accessibility enhancements
    initializeAccessibilityEnhancements();
  }, []);

  // Configuration des CTAs spécifiques au tableau de bord
  const resourceCTAs = [
    {
      title: "Coaching Personnalisé",
      description: "Accompagnement individuel pour optimiser l'utilisation de votre tableau de bord et améliorer vos performances commerciales.",
      buttonText: "Réserver un appel",
      href: "/coach-commercial-entreprise",
      icon: <Target size={24} />,
      variant: "primary" as const,
      highlight: true,
      onClick: () => handleCTAClick('coaching', 'Réserver un appel')
    },
    {
      title: "Formation Équipe",
      description: "Formez votre équipe commerciale à l'utilisation efficace des tableaux de bord et au pilotage par les données.",
      buttonText: "Découvrir le bootcamp",
      href: "/bootcamp-commercial-intensif",
      icon: <Users size={24} />,
      variant: "secondary" as const,
      onClick: () => handleCTAClick('formation', 'Découvrir le bootcamp')
    },
    {
      title: "Diagnostic Gratuit",
      description: "Évaluation complète de votre organisation commerciale avec recommandations d'outils personnalisées.",
      buttonText: "Faire le diagnostic",
      href: "/diagnostic",
      icon: <BookOpen size={24} />,
      variant: "outline" as const,
      onClick: () => handleCTAClick('diagnostic', 'Faire le diagnostic')
    },
    {
      title: "Contact Direct",
      description: "Échangeons sur vos besoins spécifiques en pilotage commercial et trouvons la solution adaptée.",
      buttonText: "Prendre contact",
      href: "/contact",
      icon: <MessageCircle size={24} />,
      variant: "outline" as const,
      onClick: () => handleCTAClick('contact', 'Prendre contact')
    }
  ];

  // Statistiques pour le hero
  const heroStats = [
    { label: "Téléchargements", value: tableauBordData.stats?.downloads || "1000+" },
    { label: "Utilisateurs", value: tableauBordData.stats?.users || "500+" },
    { label: "Satisfaction", value: tableauBordData.stats?.satisfaction || "4.8/5" }
  ];

  const handleDownloadClick = () => {
    setShowDownloadForm(true);
    // Analytics tracking handled by ResourceDownloadForm
  };

  const handlePreviewClick = () => {
    // Track preview click
    trackPreviewClick(tableauBordData.id, tableauBordData.title, 'image');
    // Ouvrir l'aperçu dans une nouvelle fenêtre ou modal
    window.open(tableauBordData.preview?.src, '_blank');
  };

  const handleCTAClick = (ctaType: 'coaching' | 'formation' | 'diagnostic' | 'contact', ctaText: string) => {
    trackResourceCTA(ctaType, tableauBordData.id, ctaText);
  };

  return (
    <>
      <SkipLink />
      <main id="main-content" className="relative bg-gradient-to-br from-mint-green via-mint-green/90 to-blue-ink min-h-screen overflow-hidden" tabIndex={-1}>
        {/* Performance Monitoring */}
        <PerformanceMonitor pageName="tableau-bord" enableReporting={true} />
      
      {/* Particle Background */}
      <ParticleBackground 
        density={30}
        speed={0.3}
        color={tableauBordData.theme.particleColor || "#00BDA4"}
        opacity={0.4}
        className="absolute inset-0"
      />

      {/* Hero Section */}
      <ResourceHero
        title={tableauBordData.title}
        subtitle={tableauBordData.subtitle || "Outil de pilotage PME"}
        description={tableauBordData.description}
        icon={BarChart3}
        gradient="bg-gradient-to-br from-mint-green via-mint-green/90 to-blue-ink"
        primaryCTA={{
          text: "Télécharger gratuitement",
          onClick: handleDownloadClick,
          icon: Download
        }}
        secondaryCTA={{
          text: "Voir l'aperçu",
          href: tableauBordData.preview?.src || "#",
          icon: BarChart3
        }}
        stats={heroStats}
        className="pt-24 pb-16"
      />

      {/* Container pour le contenu */}
      <div className="relative bg-primary-bg">
        {/* Section Présentation de l'outil */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fade-in" delay={0}>
              <div className="text-center mb-12">
                <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-2 text-sm mb-4 shadow-md backdrop-blur">
                  <span className="inline mr-2">📊</span>
                  Outil professionnel
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-ink mb-6">
                  Un tableau de bord simple et efficace
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  Conçu spécialement pour les PME, cet outil Excel vous permet de suivre vos performances commerciales 
                  en temps réel avec des KPIs essentiels et des graphiques automatiques.
                </p>
              </div>
            </AnimatedSection>

            {/* Grille avec aperçu et bénéfices */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Aperçu de l'outil */}
              <AnimatedSection animation="slide-up" delay={200}>
                <ToolPreview
                  title="Tableau de Bord Commercial Excel"
                  description="Dashboard complet avec KPIs automatiques, graphiques dynamiques et alertes personnalisables pour piloter efficacement votre activité commerciale."
                  benefits={tableauBordData.benefits.slice(0, 4)}
                  preview={tableauBordData.preview || {
                    type: 'image',
                    src: '/ressources/previews/tableau-bord-preview.jpg',
                    alt: 'Aperçu du tableau de bord commercial Excel'
                  }}
                  features={tableauBordData.features.slice(0, 6)}
                  difficulty={tableauBordData.difficulty === 'intermédiaire' ? 'Intermédiaire' : 'Facile'}
                  estimatedTime={tableauBordData.estimatedTime}
                  format="Excel (.xlsx)"
                  onPreviewClick={handlePreviewClick}
                />
              </AnimatedSection>

              {/* Bénéfices détaillés */}
              <AnimatedSection animation="slide-up" delay={400}>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold text-blue-ink mb-6">
                    Pourquoi utiliser ce tableau de bord ?
                  </h3>
                  
                  <div className="space-y-6">
                    {tableauBordData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-mint-green/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-mint-green font-bold text-sm">✓</span>
                        </div>
                        <div>
                          <p className="text-gray-700 leading-relaxed">{benefit}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Vision Laurent Serre */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl border border-mint-green/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-mint-green rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">LS</span>
                      </div>
                      <h4 className="text-xl font-bold text-mint-green">Vision Laurent Serre</h4>
                    </div>
                    <p className="text-gray-700 italic leading-relaxed">
                      "Après 20 ans d'expérience, j'ai constaté que 80% des PME pilotent leur activité commerciale 
                      'au feeling'. Ce tableau de bord change la donne : il vous donne enfin une vision claire et 
                      objective de votre performance, pour prendre les bonnes décisions au bon moment."
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Section Témoignages PME */}
        {tableauBordData.testimonials && tableauBordData.testimonials.length > 0 && (
          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <AnimatedSection animation="fade-in" delay={0}>
                <div className="text-center mb-12">
                  <span className="inline-block bg-orange-soft/20 text-orange-soft font-semibold rounded-full px-4 py-2 text-sm mb-4 shadow-md backdrop-blur">
                    <span className="inline mr-2">💬</span>
                    Témoignages clients
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-blue-ink mb-6">
                    Ce que disent nos clients PME
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                    Découvrez comment d'autres dirigeants utilisent ce tableau de bord pour transformer 
                    leur pilotage commercial.
                  </p>
                </div>
              </AnimatedSection>

              <div className="grid md:grid-cols-3 gap-8">
                {tableauBordData.testimonials.map((testimonial, index) => (
                  <AnimatedSection key={index} animation="slide-up" delay={100 + index * 100}>
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-mint-green rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-ink">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                          <p className="text-xs text-gray-500">{testimonial.company}</p>
                        </div>
                      </div>
                      
                      <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="bg-mint-green/10 rounded-lg p-3">
                        <p className="text-mint-green font-semibold text-sm">
                          📈 Résultat : {testimonial.result}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section Cas d'usage PME */}
        {tableauBordData.caseStudies && tableauBordData.caseStudies.length > 0 && (
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <AnimatedSection animation="fade-in" delay={0}>
                <div className="text-center mb-12">
                  <span className="inline-block bg-blue-ink/20 text-blue-ink font-semibold rounded-full px-4 py-2 text-sm mb-4 shadow-md backdrop-blur">
                    <span className="inline mr-2">🏢</span>
                    Cas clients PME
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-blue-ink mb-6">
                    Exemples concrets d'utilisation
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                    Découvrez comment mes clients PME utilisent concrètement ce tableau de bord 
                    pour améliorer leurs performances.
                  </p>
                </div>
              </AnimatedSection>

              <div className="grid md:grid-cols-2 gap-8">
                {tableauBordData.caseStudies.map((caseStudy, index) => (
                  <AnimatedSection key={index} animation="slide-up" delay={200 + index * 100}>
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 h-full">
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-blue-ink mb-2">{caseStudy.company}</h3>
                        <p className="text-sm text-gray-600 mb-4">{caseStudy.industry}</p>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="font-semibold text-red-600 mb-2">🎯 Défi</h4>
                          <p className="text-gray-700 text-sm leading-relaxed">{caseStudy.challenge}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-blue-ink mb-2">💡 Solution</h4>
                          <p className="text-gray-700 text-sm leading-relaxed">{caseStudy.solution}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-green-600 mb-2">📈 Résultats</h4>
                          <p className="text-gray-700 text-sm leading-relaxed mb-3">{caseStudy.results}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(caseStudy.metrics).map(([key, value], metricIndex) => (
                          <div key={metricIndex} className="bg-gray-50 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-mint-green">{value}</div>
                            <div className="text-xs text-gray-600">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section Formulaire de téléchargement */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-in" delay={0}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-ink mb-6">
                  Téléchargez votre tableau de bord
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                  Recevez immédiatement votre tableau de bord Excel avec le guide d'utilisation 
                  et les conseils de mise en place.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={200}>
              <div className="max-w-2xl mx-auto">
                <ResourceDownloadForm
                  title="Tableau de Bord Commercial Excel"
                  description="Outil complet avec KPIs automatiques, graphiques dynamiques et guide d'utilisation détaillé."
                  resourceUrl="/ressources/downloads/tableau-bord-commercial.xlsx"
                  resourceId={tableauBordData.id}
                  deliveryMethod={tableauBordData.formConfig.deliveryMethod}
                  autoResponse={tableauBordData.formConfig.autoResponse}
                  formFields={{
                    email: true,
                    firstName: tableauBordData.formConfig.requiredFields.firstName,
                    company: tableauBordData.formConfig.requiredFields.company,
                    message: tableauBordData.formConfig.requiredFields.message
                  }}
                />
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Section CTAs vers services */}
        <ResourceCTAs
          title="Aller plus loin avec Laurent Serre"
          subtitle="Transformez vos données en résultats concrets avec un accompagnement personnalisé"
          ctas={resourceCTAs}
          layout="grid"
          maxCTAs={4}
        />
      </div>
      </main>
    </>
  );
};

export default TableauBordPageClient;