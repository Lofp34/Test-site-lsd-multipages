'use client';

import React, { useEffect } from 'react';
import { ClipboardCheck, Download, Users, Target, BookOpen, MessageCircle } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ParticleBackground from '@/components/ui/ParticleBackground';
import PerformanceMonitor from '@/components/ui/PerformanceMonitor';
import SkipLink from '@/components/ui/SkipLink';
import ResourceHero from '@/components/ressources/ResourceHero';
import ToolPreview from '@/components/ressources/ToolPreview';
import ResourceDownloadForm from '@/components/ressources/ResourceDownloadForm';
import ResourceCTAs from '@/components/ressources/ResourceCTAs';
import { grilleEvaluationData } from '@/data/ressources/grille-evaluation-data';
import { trackResourcePageView, trackPreviewClick, trackResourceCTA } from '@/utils/resource-analytics';
import { initializePerformanceOptimizations } from '@/utils/performance-optimization';
import { initializeAccessibilityEnhancements } from '@/utils/accessibility-enhancements';

const GrilleEvaluationPageClient: React.FC = () => {

  // Analytics tracking setup
  useEffect(() => {
    // Track page view
    trackResourcePageView({
      resourceId: grilleEvaluationData.id,
      resourceTitle: grilleEvaluationData.title,
      resourceUrl: '/ressources/grille-evaluation',
      category: grilleEvaluationData.category
    });

    // Initialize performance optimizations
    initializePerformanceOptimizations();

    // Initialize accessibility enhancements
    initializeAccessibilityEnhancements();
  }, []);

  // handlePreviewClick is defined later in the component

  const handleCTAClick = (ctaType: 'coaching' | 'formation' | 'diagnostic' | 'contact', ctaText: string) => {
    trackResourceCTA(ctaType, grilleEvaluationData.id, ctaText);
  };

  // Configuration des CTAs spécifiques à la grille d'évaluation
  const resourceCTAs = [
    {
      title: "Coaching Management",
      description: "Accompagnement personnalisé pour optimiser vos évaluations commerciales et développer vos équipes efficacement.",
      buttonText: "Réserver un appel",
      href: "/coach-commercial-entreprise",
      icon: <Target size={24} />,
      variant: "primary" as const,
      highlight: true,
      onClick: () => handleCTAClick('coaching', 'Réserver un appel')
    },
    {
      title: "Formation Management",
      description: "Formez vos managers aux techniques d'évaluation objective et au développement des compétences commerciales.",
      buttonText: "Découvrir le bootcamp",
      href: "/bootcamp",
      icon: <Users size={24} />,
      variant: "secondary" as const,
      onClick: () => handleCTAClick('formation', 'Découvrir le bootcamp')
    },
    {
      title: "Diagnostic Gratuit",
      description: "Évaluation complète de votre système d'évaluation actuel avec recommandations personnalisées.",
      buttonText: "Faire le diagnostic",
      href: "/diagnostic",
      icon: <BookOpen size={24} />,
      variant: "outline" as const,
      onClick: () => handleCTAClick('diagnostic', 'Faire le diagnostic')
    },
    {
      title: "Contact Direct",
      description: "Échangeons sur vos défis en management commercial et trouvons la solution adaptée à votre équipe.",
      buttonText: "Prendre contact",
      href: "/contact",
      icon: <MessageCircle size={24} />,
      variant: "outline" as const,
      onClick: () => handleCTAClick('contact', 'Prendre contact')
    }
  ];

  // Statistiques pour le hero
  const heroStats = [
    { label: "Téléchargements", value: grilleEvaluationData.stats?.downloads || "750+" },
    { label: "Utilisateurs", value: grilleEvaluationData.stats?.users || "400+" },
    { label: "Satisfaction", value: grilleEvaluationData.stats?.satisfaction || "4.7/5" },
    { label: "Critères", value: grilleEvaluationData.stats?.criteresEvaluation || "25" }
  ];

  const handleDownloadClick = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'grille_evaluation_download_click', {
        event_category: 'Resource',
        event_label: 'Grille Evaluation Commerciale'
      });
    }
    // Scroll to download form
    const downloadSection = document.querySelector('#download-section');
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePreviewClick = () => {
    // Track preview click
    trackPreviewClick(grilleEvaluationData.id, grilleEvaluationData.title, 'image');
    
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'grille_evaluation_preview_click', {
        event_category: 'Engagement',
        event_label: 'Grille Evaluation Preview'
      });
    }
    // Ouvrir l'aperçu dans une nouvelle fenêtre ou modal
    window.open(grilleEvaluationData.preview?.src, '_blank');
  };

  return (
    <>
      <SkipLink />
      <main id="main-content" className={`relative ${grilleEvaluationData.theme.gradient} min-h-screen overflow-hidden`} tabIndex={-1}>
        {/* Performance Monitoring */}
        <PerformanceMonitor pageName="grille-evaluation" enableReporting={true} />
      
      {/* Particle Background */}
      <ParticleBackground 
        density={30}
        speed={0.3}
        color={grilleEvaluationData.theme.particleColor}
        opacity={0.4}
        className="absolute inset-0"
      />

      {/* Hero Section */}
      <ResourceHero
        title={grilleEvaluationData.title}
        subtitle={grilleEvaluationData.subtitle || "Outil d'évaluation PME"}
        description={grilleEvaluationData.description}
        icon={ClipboardCheck}
        gradient={grilleEvaluationData.theme.gradient}
        primaryCTA={{
          text: "Télécharger gratuitement",
          onClick: handleDownloadClick,
          icon: Download
        }}
        secondaryCTA={{
          text: "Voir l'aperçu",
          href: grilleEvaluationData.preview?.src || "#",
          icon: ClipboardCheck
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
                <span className="inline-block bg-purple-600/20 text-purple-600 font-semibold rounded-full px-4 py-2 text-sm mb-4 shadow-md backdrop-blur">
                  <span className="inline mr-2">{grilleEvaluationData.theme.icon}</span>
                  Outil professionnel
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-ink mb-6">
                  Une grille d'évaluation objective et complète
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  Évaluez vos commerciaux avec 25 critères mesurables, générez automatiquement des plans 
                  de développement personnalisés et suivez les progrès dans le temps.
                </p>
              </div>
            </AnimatedSection>

            {/* Grille avec aperçu et bénéfices */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Aperçu de l'outil */}
              <AnimatedSection animation="slide-up" delay={200}>
                <ToolPreview
                  title="Grille d'Évaluation Commerciale Excel"
                  description="Outil complet avec 25 critères objectifs, système de notation automatique et génération de plans de développement personnalisés pour chaque commercial."
                  benefits={grilleEvaluationData.benefits.slice(0, 4)}
                  preview={grilleEvaluationData.preview || {
                    type: 'image',
                    src: '/ressources/previews/grille-evaluation-preview.jpg',
                    alt: 'Aperçu de la grille d\'évaluation commerciale Excel'
                  }}
                  features={grilleEvaluationData.features.slice(0, 6)}
                  difficulty={grilleEvaluationData.difficulty === 'intermédiaire' ? 'Intermédiaire' : 'Facile'}
                  estimatedTime={grilleEvaluationData.estimatedTime}
                  format="Excel (.xlsx)"
                  onPreviewClick={handlePreviewClick}
                />
              </AnimatedSection>

              {/* Bénéfices détaillés */}
              <AnimatedSection animation="slide-up" delay={400}>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold text-blue-ink mb-6">
                    Pourquoi utiliser cette grille d'évaluation ?
                  </h3>
                  
                  <div className="space-y-6">
                    {grilleEvaluationData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-purple-600 font-bold text-sm">✓</span>
                        </div>
                        <div>
                          <p className="text-gray-700 leading-relaxed">{benefit}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Vision Laurent Serre */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-purple-600/10 to-pink-500/10 rounded-xl border border-purple-600/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">LS</span>
                      </div>
                      <h4 className="text-xl font-bold text-purple-600">Vision Laurent Serre</h4>
                    </div>
                    <p className="text-gray-700 italic leading-relaxed">
                      "Trop souvent, les évaluations commerciales sont subjectives et démotivantes. Cette grille 
                      change la donne : elle apporte l'objectivité nécessaire pour des évaluations équitables et 
                      constructives. Vos commerciaux comprendront enfin précisément où progresser."
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Section Critères d'évaluation */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fade-in" delay={0}>
              <div className="text-center mb-12">
                <span className="inline-block bg-pink-500/20 text-pink-500 font-semibold rounded-full px-4 py-2 text-sm mb-4 shadow-md backdrop-blur">
                  <span className="inline mr-2">🎯</span>
                  Critères d'évaluation
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-ink mb-6">
                  25 critères pour une évaluation complète
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  Notre grille couvre tous les aspects de la performance commerciale avec des critères 
                  objectifs et mesurables.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Prospection */}
              <AnimatedSection animation="slide-up" delay={100}>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 h-full">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-ink mb-4">Prospection</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Nombre d'appels quotidiens</li>
                    <li>• Taux de prise de RDV</li>
                    <li>• Qualité du fichier prospect</li>
                    <li>• Utilisation des outils CRM</li>
                    <li>• Suivi des relances</li>
                  </ul>
                </div>
              </AnimatedSection>

              {/* Négociation */}
              <AnimatedSection animation="slide-up" delay={200}>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 h-full">
                  <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-ink mb-4">Négociation</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Taux de transformation</li>
                    <li>• Montant moyen des ventes</li>
                    <li>• Gestion des objections</li>
                    <li>• Techniques de closing</li>
                    <li>• Préservation des marges</li>
                  </ul>
                </div>
              </AnimatedSection>

              {/* Relation client */}
              <AnimatedSection animation="slide-up" delay={300}>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 h-full">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-ink mb-4">Relation Client</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Satisfaction client</li>
                    <li>• Fidélisation</li>
                    <li>• Ventes additionnelles</li>
                    <li>• Gestion des réclamations</li>
                    <li>• Recommandations obtenues</li>
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Section Témoignages PME */}
        {grilleEvaluationData.testimonials && grilleEvaluationData.testimonials.length > 0 && (
          <section className="py-16 px-4">
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
                    Découvrez comment d'autres managers utilisent cette grille pour transformer 
                    leurs évaluations commerciales.
                  </p>
                </div>
              </AnimatedSection>

              <div className="grid md:grid-cols-3 gap-8">
                {grilleEvaluationData.testimonials.map((testimonial, index) => (
                  <AnimatedSection key={index} animation="slide-up" delay={100 + index * 100}>
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
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
                      
                      <div className="bg-purple-600/10 rounded-lg p-3">
                        <p className="text-purple-600 font-semibold text-sm">
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
        {grilleEvaluationData.caseStudies && grilleEvaluationData.caseStudies.length > 0 && (
          <section className="py-16 px-4 bg-gray-50">
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
                    Découvrez comment mes clients PME utilisent concrètement cette grille 
                    pour améliorer leurs évaluations et développer leurs équipes.
                  </p>
                </div>
              </AnimatedSection>

              <div className="grid md:grid-cols-2 gap-8">
                {grilleEvaluationData.caseStudies.map((caseStudy, index) => (
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
                            <div className="text-lg font-bold text-purple-600">{value}</div>
                            <div className="text-xs text-gray-600">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* Retour d'expérience Laurent Serre */}
              <AnimatedSection animation="fade-in" delay={600}>
                <div className="mt-12 p-8 bg-gradient-to-r from-purple-600/10 to-pink-500/10 rounded-2xl border border-purple-600/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">LS</span>
                    </div>
                    <h4 className="text-2xl font-bold text-purple-600">Retour d'expérience Laurent Serre</h4>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "Après avoir accompagné plus de 200 PME, j'ai constaté que 90% des managers évaluent leurs commerciaux 
                    de façon subjective. Cette grille apporte enfin l'objectivité nécessaire pour des évaluations équitables 
                    et constructives. Mes clients voient une amélioration moyenne de 35% des performances après 6 mois d'utilisation."
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">200+</div>
                      <div className="text-sm text-gray-600">PME accompagnées</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">90%</div>
                      <div className="text-sm text-gray-600">Évaluations subjectives</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">+35%</div>
                      <div className="text-sm text-gray-600">Amélioration moyenne</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        )}

        {/* Section Formulaire de téléchargement */}
        <section id="download-section" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-in" delay={0}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-ink mb-6">
                  Téléchargez votre grille d'évaluation
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                  Recevez immédiatement votre grille d'évaluation Excel avec le guide d'utilisation 
                  et les conseils de mise en place.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={200}>
              <div className="max-w-2xl mx-auto">
                <ResourceDownloadForm
                  title="Grille d'Évaluation Commerciale Excel"
                  description="Outil complet avec 25 critères objectifs, système de notation automatique et plans de développement personnalisés."
                  resourceUrl="/ressources/downloads/grille-evaluation-commerciale.xlsx"
                  resourceId={grilleEvaluationData.id}
                  deliveryMethod={grilleEvaluationData.formConfig.deliveryMethod}
                  autoResponse={grilleEvaluationData.formConfig.autoResponse}
                  formFields={{
                    email: true,
                    firstName: grilleEvaluationData.formConfig.requiredFields.firstName,
                    company: grilleEvaluationData.formConfig.requiredFields.company,
                    message: grilleEvaluationData.formConfig.requiredFields.message
                  }}
                />
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Section CTAs vers services */}
        <ResourceCTAs
          title="Aller plus loin avec Laurent Serre"
          subtitle="Transformez vos évaluations en véritable levier de performance avec un accompagnement personnalisé"
          ctas={resourceCTAs}
          layout="grid"
          maxCTAs={4}
        />
      </div>
      </main>
    </>
  );
};

export default GrilleEvaluationPageClient;