'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { reportingData } from '@/data/ressources/reporting-data';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ParticleBackground from '@/components/ui/ParticleBackground';
import PerformanceMonitor from '@/components/ui/PerformanceMonitor';
import SkipLink from '@/components/ui/SkipLink';
import ResourceDownloadForm from '@/components/ressources/ResourceDownloadForm';
import ResourceCTAs from '@/components/ressources/ResourceCTAs';
import { trackResourcePageView, trackPreviewClick, trackResourceCTA } from '@/utils/resource-analytics';
import { initializePerformanceOptimizations } from '@/utils/performance-optimization';
import { initializeAccessibilityEnhancements } from '@/utils/accessibility-enhancements';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileSpreadsheet, 
  Presentation, 
  Target,
  Clock,
  CheckCircle,
  ArrowRight,
  Download,
  Star,
  Building2,
  Award,
  Zap
} from 'lucide-react';

export default function ReportingPageClient() {
  const [activePreview, setActivePreview] = useState(0);

  // Analytics tracking setup
  useEffect(() => {
    // Track page view
    trackResourcePageView({
      resourceId: reportingData.id,
      resourceTitle: reportingData.title,
      resourceUrl: '/ressources/reporting-automatise',
      category: reportingData.category
    });

    // Initialize performance optimizations
    initializePerformanceOptimizations();

    // Initialize accessibility enhancements
    initializeAccessibilityEnhancements();
  }, []);

  const handlePreviewClick = (templateName: string) => {
    // Track preview click
    trackPreviewClick(reportingData.id, `${reportingData.title} - ${templateName}`, 'image');
  };

  const handleCTAClick = (ctaType: 'coaching' | 'formation' | 'diagnostic' | 'contact', ctaText: string) => {
    trackResourceCTA(ctaType, reportingData.id, ctaText);
  };

  const reportingTemplates = [
    {
      name: 'Dashboard CRM Automatisé',
      description: 'Tableau de bord complet avec KPIs automatiques',
      icon: BarChart3,
      preview: '/ressources/previews/crm-dashboard.jpg',
      features: ['Connexion CRM automatique', 'Graphiques dynamiques', 'Alertes seuils']
    },
    {
      name: 'Analyse Mensuelle Performances',
      description: 'Rapport mensuel détaillé avec tendances',
      icon: TrendingUp,
      preview: '/ressources/previews/monthly-analysis.jpg',
      features: ['Analyse comparative', 'Prévisions automatiques', 'Recommandations']
    },
    {
      name: 'Pilotage Équipe Commerciale',
      description: 'Suivi individuel et collectif des performances',
      icon: Users,
      preview: '/ressources/previews/team-management.jpg',
      features: ['Classement équipe', 'Objectifs individuels', 'Plans d\'action']
    },
    {
      name: 'Présentation Direction',
      description: 'Template PowerPoint professionnel',
      icon: Presentation,
      preview: '/ressources/previews/executive-presentation.jpg',
      features: ['Slides prêtes à l\'emploi', 'Graphiques automatiques', 'Synthèse exécutive']
    }
  ];

  const implementationSteps = [
    {
      phase: 'Phase 1',
      title: 'Configuration initiale',
      duration: '30 minutes',
      tasks: [
        'Téléchargement et extraction du pack',
        'Configuration des connexions CRM',
        'Personnalisation des templates',
        'Test des automatisations'
      ]
    },
    {
      phase: 'Phase 2',
      title: 'Déploiement équipe',
      duration: '1 semaine',
      tasks: [
        'Formation des managers',
        'Standardisation des processus',
        'Premier reporting automatisé',
        'Ajustements et optimisations'
      ]
    },
    {
      phase: 'Phase 3',
      title: 'Optimisation continue',
      duration: 'En continu',
      tasks: [
        'Analyse des retours utilisateurs',
        'Amélioration des templates',
        'Nouvelles automatisations',
        'Évolution des KPIs'
      ]
    }
  ];

  return (
    <>
      <SkipLink />
      <main id="main-content" className="relative bg-gradient-to-br from-blue-600 via-cyan-500/10 to-primary-bg min-h-screen pt-24 pb-16 overflow-hidden" tabIndex={-1}>
        {/* Performance Monitoring */}
        <PerformanceMonitor pageName="reporting-automatise" enableReporting={true} />
      
      {/* Particle Background */}
      <ParticleBackground 
        density={30}
        speed={0.3}
        color="#3B82F6"
        opacity={0.4}
        className="absolute inset-0"
      />

      {/* Breadcrumb Navigation */}
      <AnimatedSection animation="fade-in" delay={0}>
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <nav className="flex items-center space-x-2 text-sm text-primary-secondary/70">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/ressources" className="hover:text-blue-600 transition-colors">
              Ressources
            </Link>
            <span>/</span>
            <span className="text-blue-600 font-medium">Pack Reporting Automatisé</span>
          </nav>
        </div>
      </AnimatedSection>

      {/* Hero Section */}
      <AnimatedSection animation="fade-in" delay={100}>
        <section className="max-w-4xl mx-auto text-center mb-12 px-4" aria-labelledby="hero-title">
          <span 
            className="inline-block bg-blue-600/20 text-blue-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur"
            role="status"
            aria-label={`Catégorie ${reportingData.category}`}
          >
            <span aria-hidden="true">{reportingData.theme.icon}</span> Ressource
          </span>
          <h1 id="hero-title" className="text-4xl md:text-5xl font-bold text-primary-title mb-4 drop-shadow-lg">
            {reportingData.title}
          </h1>
          <p className="text-lg md:text-xl text-primary-secondary/90 mb-6 leading-relaxed">
            {reportingData.description}
          </p>
          
          {/* Message spécifique au reporting avec Vision Laurent Serre */}
          <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-8 border border-blue-600/20 overflow-hidden group hover:bg-white/15 transition-all duration-500">
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
                <h2 className="text-xl font-semibold text-blue-600">
                  Reporting Commercial Automatisé
                </h2>
              </div>
              <p className="text-primary-secondary/90 leading-relaxed mb-4">
                Transformez votre reporting commercial avec ce pack complet de 8 templates professionnels. 
                Automatisation CRM, analyses prédictives, pilotage équipe et présentations direction inclus.
              </p>
              
              {/* Vision Laurent Serre */}
              <div className="bg-white/10 rounded-lg p-4 mb-4 border border-blue-600/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-blue-ink font-bold text-sm">LS</span>
                  </div>
                  <span className="text-blue-600 font-semibold">Vision Laurent Serre</span>
                </div>
                <p className="text-primary-secondary/90 text-sm italic">
                  "Après 20 ans d'accompagnement PME, j'ai constaté que 80% du temps des managers commerciaux était perdu dans des tâches de reporting manuel. Ce pack automatise complètement ces processus et libère du temps pour ce qui compte vraiment : coacher les équipes et développer le business."
                </p>
              </div>
              
              {/* Stats spécifiques au reporting */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-blue-600/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">8h/mois</div>
                  <div className="text-xs text-primary-secondary/70">Temps économisé</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">8</div>
                  <div className="text-xs text-primary-secondary/70">Templates inclus</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">90%</div>
                  <div className="text-xs text-primary-secondary/70">Amélioration visibilité</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <button
              onClick={() => document.getElementById('download-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Télécharger le pack gratuit
            </button>
            <button
              onClick={() => document.getElementById('templates-preview')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <FileSpreadsheet className="w-5 h-5" />
              Voir les templates
            </button>
          </div>
        </section>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection delay={200}>
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-8 border border-blue-600/20 backdrop-blur-sm">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{reportingData.stats.downloads}</div>
                <div className="text-sm text-primary-secondary/70">Téléchargements</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{reportingData.stats.templatesInclus}</div>
                <div className="text-sm text-primary-secondary/70">Templates inclus</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{reportingData.stats.tempsEconomise}</div>
                <div className="text-sm text-primary-secondary/70">Temps économisé</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{reportingData.stats.satisfaction}</div>
                <div className="text-sm text-primary-secondary/70">Satisfaction client</div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Templates Preview Section */}
      <AnimatedSection delay={250}>
        <div id="templates-preview" className="max-w-6xl mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <span className="inline-block bg-cyan-500/20 text-cyan-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
              <FileSpreadsheet className="inline w-4 h-4 mr-2" />
              Templates inclus
            </span>
            <h2 className="text-3xl font-bold text-primary-title mb-4">
              8 Templates Professionnels Prêts à l'Emploi
            </h2>
            <p className="text-lg text-primary-secondary/90 max-w-3xl mx-auto">
              Chaque template est conçu pour automatiser une partie spécifique de votre reporting commercial. 
              Connexions CRM, analyses automatiques, graphiques dynamiques inclus.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {reportingTemplates.map((template, index) => (
              <AnimatedSection key={index} delay={300 + index * 100}>
                <div className="bg-white/70 dark:bg-blue-ink/80 rounded-xl p-6 border border-blue-600/20 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-blue-ink/90 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <template.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-600 mb-2">{template.name}</h3>
                      <p className="text-primary-secondary/90 mb-4">{template.description}</p>
                      <div className="space-y-2">
                        {template.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-mint-green" />
                            <span className="text-sm text-primary-secondary/80">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection delay={350}>
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-8 border border-blue-600/20 backdrop-blur-sm">
            <div className="text-center mb-8">
              <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                <Zap className="inline w-4 h-4 mr-2" />
                Bénéfices concrets
              </span>
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                Transformez votre reporting commercial
              </h3>
              <p className="text-primary-secondary/90 leading-relaxed max-w-3xl mx-auto">
                Automatisez complètement votre reporting et gagnez un temps précieux pour vous concentrer sur l'essentiel : développer votre business.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {reportingData.benefits.slice(0, 6).map((benefit, index) => (
                <AnimatedSection key={index} delay={400 + index * 50}>
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-600/5 to-cyan-500/5 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-mint-green mt-0.5 flex-shrink-0" />
                    <span className="text-primary-secondary/90 text-sm">{benefit}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Case Studies PME Section */}
      <AnimatedSection delay={450}>
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-8 border border-blue-600/20 backdrop-blur-sm">
            <div className="text-center mb-8">
              <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                <Building2 className="inline w-4 h-4 mr-2" />
                Cas clients PME
              </span>
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                Résultats concrets en PME
              </h3>
              <p className="text-primary-secondary/90 mb-6">
                Découvrez comment mes clients PME ont transformé leur reporting commercial avec ce pack
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {reportingData.caseStudies.map((caseStudy, index) => (
                <AnimatedSection key={index} delay={500 + index * 100}>
                  <div className="bg-gradient-to-r from-blue-600/5 to-cyan-500/5 rounded-xl p-6 border border-blue-600/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-600">{caseStudy.company}</h4>
                        <p className="text-sm text-primary-secondary/70">{caseStudy.industry}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div>
                        <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Défi</span>
                        <p className="text-sm text-primary-secondary/90">{caseStudy.challenge}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Solution</span>
                        <p className="text-sm text-primary-secondary/90">{caseStudy.solution}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-mint-green uppercase tracking-wide">Résultats</span>
                        <p className="text-sm text-primary-secondary/90">{caseStudy.results}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-600/20">
                      {Object.entries(caseStudy.metrics).map(([key, value], idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-lg font-bold text-blue-600">{value}</div>
                          <div className="text-xs text-primary-secondary/70">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            
            {/* Laurent Serre Experience */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 rounded-xl border border-blue-600/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">LS</span>
                </div>
                <h4 className="text-xl font-bold text-blue-600">Retour d'expérience Laurent Serre</h4>
              </div>
              <p className="text-primary-secondary/90 mb-4 italic">
                "Après 20 ans d'accompagnement PME, j'ai constaté que 80% du temps des managers commerciaux était perdu dans des tâches de reporting manuel. Ce pack automatise complètement ces processus et libère du temps pour ce qui compte vraiment : coacher les équipes et développer le business. Les résultats sont spectaculaires : mes clients gagnent en moyenne 8h par mois et améliorent leur visibilité de 90%."
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">350+</div>
                  <div className="text-xs text-primary-secondary/70">PME accompagnées</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">8h/mois</div>
                  <div className="text-xs text-primary-secondary/70">Temps économisé</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">90%</div>
                  <div className="text-xs text-primary-secondary/70">Amélioration visibilité</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Implementation Roadmap */}
      <AnimatedSection delay={550}>
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <span className="inline-block bg-orange-500/20 text-orange-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
              <Target className="inline w-4 h-4 mr-2" />
              Feuille de route
            </span>
            <h3 className="text-2xl font-bold text-primary-title mb-4">
              Implémentation Progressive en 3 Phases
            </h3>
            <p className="text-primary-secondary/90 leading-relaxed max-w-3xl mx-auto">
              Suivez notre méthode éprouvée pour déployer efficacement le reporting automatisé dans votre PME
            </p>
          </div>
          
          <div className="space-y-8">
            {implementationSteps.map((step, index) => (
              <AnimatedSection key={index} delay={600 + index * 100}>
                <div className="bg-white/70 dark:bg-blue-ink/80 rounded-xl p-6 border border-blue-600/20 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h4 className="text-xl font-bold text-blue-600">{step.phase}: {step.title}</h4>
                        <span className="bg-orange-500/20 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                          <Clock className="inline w-3 h-3 mr-1" />
                          {step.duration}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {step.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-mint-green flex-shrink-0" />
                            <span className="text-sm text-primary-secondary/90">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection delay={650}>
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <span className="inline-block bg-yellow-500/20 text-yellow-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
              <Star className="inline w-4 h-4 mr-2" />
              Témoignages clients
            </span>
            <h3 className="text-2xl font-bold text-primary-title mb-4">
              Ce que disent nos clients
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {reportingData.testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} delay={700 + index * 100}>
                <div className="bg-white/70 dark:bg-blue-ink/80 rounded-xl p-6 border border-blue-600/20 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-blue-600">{testimonial.name}</div>
                      <div className="text-sm text-primary-secondary/70">{testimonial.role}</div>
                      <div className="text-xs text-primary-secondary/60">{testimonial.company}</div>
                    </div>
                  </div>
                  <p className="text-primary-secondary/90 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="bg-mint-green/10 rounded-lg p-3">
                    <div className="text-sm font-semibold text-mint-green">Résultat obtenu :</div>
                    <div className="text-sm text-primary-secondary/90">{testimonial.result}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Download Form Section */}
      <AnimatedSection delay={750}>
        <div id="download-form" className="max-w-4xl mx-auto px-4 mb-16">
          <ResourceDownloadForm 
            title="Téléchargez votre pack reporting gratuit"
            description="Recevez immédiatement les 8 templates par email + guide d'implémentation"
            resourceUrl="/ressources/reporting-automatise"
            resourceId={reportingData.id}
            deliveryMethod={reportingData.formConfig.deliveryMethod}
            autoResponse={reportingData.formConfig.autoResponse}
            formFields={{
              email: reportingData.formConfig.requiredFields.email,
              firstName: reportingData.formConfig.requiredFields.firstName,
              lastName: reportingData.formConfig.requiredFields.lastName,
              company: reportingData.formConfig.requiredFields.company,
              phone: reportingData.formConfig.requiredFields.phone,
              message: reportingData.formConfig.requiredFields.message
            }}
          />
        </div>
      </AnimatedSection>

      {/* Cross-Category Suggestions */}
      <AnimatedSection delay={800}>
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div className="text-center mb-8">
            <span className="inline-block bg-purple-500/20 text-purple-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
              <Award className="inline w-4 h-4 mr-2" />
              Ressources complémentaires
            </span>
            <h3 className="text-2xl font-bold text-primary-title mb-4">
              Complétez votre boîte à outils commerciale
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/ressources/outil-tableau-bord" className="group">
              <div className="bg-white/70 dark:bg-blue-ink/80 rounded-xl p-6 border border-blue-600/20 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-blue-ink/90 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-500 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-emerald-600 mb-1">Tableau de Bord Commercial</h4>
                    <p className="text-sm text-primary-secondary/80">Dashboard simple pour suivre vos KPIs essentiels</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary-secondary/40 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </Link>
            
            <Link href="/ressources/grille-evaluation" className="group">
              <div className="bg-white/70 dark:bg-blue-ink/80 rounded-xl p-6 border border-blue-600/20 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-blue-ink/90 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-purple-600 mb-1">Grille d'Évaluation</h4>
                    <p className="text-sm text-primary-secondary/80">Évaluez et développez vos commerciaux efficacement</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary-secondary/40 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* CTAs Section */}
      <ResourceCTAs 
        title="Aller plus loin avec Laurent Serre"
        subtitle="Transformez vos connaissances en résultats concrets"
        ctas={[
          {
            title: "Coaching Individuel",
            description: "Accompagnement personnalisé pour optimiser votre reporting commercial et développer votre performance.",
            buttonText: "Réserver un appel",
            href: "/coach-commercial-entreprise",
            icon: <Users size={24} />,
            variant: "primary",
            highlight: true
          },
          {
            title: "Formation Équipe",
            description: "Bootcamp commercial intensif pour transformer les performances de votre équipe de vente.",
            buttonText: "Découvrir le programme",
            href: "/bootcamp",
            icon: <Award size={24} />,
            variant: "secondary"
          },
          {
            title: "Diagnostic Gratuit",
            description: "Évaluation complète de votre organisation commerciale avec recommandations personnalisées.",
            buttonText: "Faire le diagnostic",
            href: "/diagnostic",
            icon: <Target size={24} />,
            variant: "outline"
          },
          {
            title: "Contact Direct",
            description: "Échangeons directement sur vos enjeux de reporting et trouvons la meilleure solution ensemble.",
            buttonText: "Prendre contact",
            href: "/contact",
            icon: <Users size={24} />,
            variant: "outline"
          }
        ]}
        layout="grid"
        maxCTAs={4}
      />
      </main>
    </>
  );
}