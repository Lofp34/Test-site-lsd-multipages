'use client';

import Button from "@/components/ui/Button";
import ABTestButton from "@/components/ui/ABTestButton";
import TrackedLink from "@/components/ui/TrackedLink";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ResourcesPMESection() {
  const resources = [
    {
      title: "Scripts IMPACT et AIDA+",
      description: "Modèles de scripts de prospection éprouvés pour PME",
      href: "/ressources/impact-aida-script-prospection-pme",
      icon: "📝",
      category: "Prospection"
    },
    {
      title: "LinkedIn et Réseaux Sociaux",
      description: "Guide complet pour la prospection digitale PME",
      href: "/ressources/linkedin-prospection",
      icon: "💼",
      category: "Digital"
    },
    {
      title: "Système de Suivi Prospects",
      description: "Outil de suivi et tableaux de bord pour PME",
      href: "/ressources/systeme-suivi-prospects",
      icon: "📊",
      category: "Outils"
    },
    {
      title: "Techniques de Motivation",
      description: "Guide de coaching et motivation d'équipe commerciale",
      href: "/ressources/techniques-motivation-equipe",
      icon: "🎯",
      category: "Management"
    },
    {
      title: "Guide Recrutement Commercial",
      description: "Méthodes et grilles d'évaluation pour recruter",
      href: "/ressources/guide-recrutement-commercial",
      icon: "👥",
      category: "RH"
    },
    {
      title: "Techniques de Négociation",
      description: "Stratégies de closing adaptées aux PME",
      href: "/ressources/techniques-de-negociation",
      icon: "🤝",
      category: "Closing"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-bg via-white to-mint-green/5 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-mint-green/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-orange-soft/10 rounded-full blur-xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* En-tête de section */}
        <AnimatedSection animation="fade-in" delay={0}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-6 py-3 rounded-full mb-6">
              <span className="w-3 h-3 bg-mint-green rounded-full animate-pulse"></span>
              <span className="font-title font-semibold text-mint-green text-sm md:text-base">
                Ressources Spécialisées PME
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-title font-bold text-blue-ink leading-tight mb-6">
              Outils pratiques pour
              <span className="block text-mint-green">structurer votre commercial</span>
            </h2>
            
            <p className="text-xl md:text-2xl font-body text-gray-anthracite/80 leading-relaxed max-w-4xl mx-auto">
              Découvrez mes ressources gratuites, conçues spécifiquement pour les PME qui veulent 
              professionnaliser leur approche commerciale sans perdre leur agilité.
            </p>
          </div>
        </AnimatedSection>

        {/* Grille des ressources */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {resources.map((resource, index) => (
            <AnimatedSection key={index} animation="slide-up" delay={100 + index * 100}>
              <TrackedLink 
                href={resource.href}
                ctaId={`resource-${resource.title.toLowerCase().replace(/\s+/g, '-')}`}
                ctaText={resource.title}
                ctaType="secondary"
                section="resources-grid"
                position={index + 1}
              >
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-mint-green/10 hover:border-mint-green/30">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-mint-green/20 to-mint-green/10 rounded-xl flex items-center justify-center group-hover:from-mint-green/30 group-hover:to-mint-green/20 transition-all duration-300">
                      <span className="text-2xl">{resource.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="inline-block bg-mint-green/10 text-mint-green text-xs font-semibold px-3 py-1 rounded-full mb-2">
                        {resource.category}
                      </div>
                      <h3 className="text-xl font-title font-bold text-blue-ink group-hover:text-mint-green transition-colors duration-300">
                        {resource.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="font-body text-gray-anthracite/80 leading-relaxed mb-4">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center text-mint-green font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm">Télécharger gratuitement</span>
                    <span className="ml-2">→</span>
                  </div>
                </div>
              </TrackedLink>
            </AnimatedSection>
          ))}
        </div>

        {/* Section de conversion vers le bootcamp */}
        <AnimatedSection animation="fade-in" delay={800}>
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Éléments décoratifs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-mint-green/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-soft/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 bg-mint-green/20 backdrop-blur-sm border border-mint-green/30 px-6 py-3 rounded-full mb-6">
                <span className="text-2xl">🚀</span>
                <span className="font-title font-semibold text-mint-green text-sm md:text-base">
                  Prêt pour l'étape suivante ?
                </span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-title font-bold text-white mb-6">
                Transformez ces outils en 
                <span className="block text-mint-green">résultats concrets</span>
              </h3>
              
              <p className="text-xl font-body text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto">
                Ces ressources sont un excellent point de départ. Pour une transformation complète 
                de votre performance commerciale, découvrez mon Bootcamp Commercial intensif.
              </p>
              
              <div className="cta-group-mobile">
                <div className="cta-container-mobile sm:flex-row sm:max-w-none sm:gap-4">
                  <TrackedLink 
                    href="/bootcamp"
                    ctaId="resources-bootcamp"
                    ctaText="Découvrir le Bootcamp Commercial"
                    ctaType="primary"
                    section="resources-conversion"
                    position={1}
                    enableABTest={true}
                    abTestId="resources-bootcamp-color"
                    className="block"
                  >
                    <ABTestButton
                      variant="primary" 
                      size="lg" 
                      icon="🎯" 
                      testId="resources-bootcamp-color"
                      defaultText="Découvrir le Bootcamp Commercial"
                      defaultClassName="cta-mobile cta-primary-mobile sm:w-auto sm:min-w-[260px]"
                      className="bg-mint-green hover:bg-mint-green/90 text-blue-ink"
                    />
                  </TrackedLink>
                  <TrackedLink 
                    href="/contact"
                    ctaId="resources-contact"
                    ctaText="Échanger avec Laurent Serre"
                    ctaType="secondary"
                    section="resources-conversion"
                    position={2}
                    className="block"
                  >
                    <Button 
                      variant="outline" 
                      size="lg" 
                      icon="💬" 
                      className="cta-mobile cta-secondary-mobile sm:w-auto sm:min-w-[240px] border-white text-white hover:bg-white hover:text-blue-ink"
                    >
                      Échanger avec Laurent Serre
                    </Button>
                  </TrackedLink>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}