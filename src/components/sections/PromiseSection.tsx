'use client';

import { useState } from 'react';
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function PromiseSection() {
  const [activePopup, setActivePopup] = useState<number | null>(null);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const promises = [
    {
      icon: "🎯",
      text: "Une stratégie claire, adaptée à votre secteur",
      delay: "0s",
      popup: {
        title: "Sales Playbook complet sur mesure",
        content: "Structuration d'une dynamique de prospection ambitieuse avec définition des 3 canaux de prospection adaptés à votre secteur. Création d'un script d'entretien structuré complet : prise de contact → découverte → argumentation → objections → closing → suivi.",
        highlights: ["3 canaux prospection définis", "Scripts sur mesure", "Codes vente haute valeur", "Méthodologie éprouvée"]
      }
    },
    {
      icon: "👥",
      text: "Une équipe formée, structurée, et engagée",
      delay: "0.2s",
      popup: {
        title: "Audit et structuration de votre force de vente",
        content: "Nous débutons par un audit commercial de terrain pour évaluer la performance de votre force de vente. À partir de ce diagnostic, nous structurons une dynamique d'équipe et déployons une méthodologie de vente claire et partagée, conçue pour améliorer durablement votre performance commerciale.",
        highlights: ["Audit commercial terrain", "Diagnostic des processus de vente", "Alignement de la force de vente", "Méthodologie de vente optimisée"]
      }
    },
    {
      icon: "📈",
      text: "Des résultats concrets, visibles dès les premières semaines",
      delay: "0.4s",
      popup: {
        title: "Performance = Activité × Compétence",
        content: "Suivi objectif avec indicateurs précis : nombre de RDV pris, propositions envoyées, taux de validation, panier moyen. Premier programme permettant un suivi objectif des commerciaux avec alignement continu sur la performance.",
        highlights: ["Indicateurs mesurables", "Suivi objectif", "Résultats quantifiés", "Performance optimisée"]
      }
    },
    {
      icon: "🤖",
      text: "L'intégration des outils d'IA… quand cela fait vraiment du sens",
      delay: "0.6s",
      popup: {
        title: "Agent GPT d'autocoaching intégré",
        content: "Outil IA sur mesure incluant : génération de propositions commerciales ultra-affûtées, coaching post-entretien structuré, plans de suivi personnalisés, comptes-rendus CRM enrichis, et ajustements du plan de vente selon le terrain.",
        highlights: ["Propositions IA", "Coaching automatisé", "CRM optimisé", "Booster performance"]
      }
    }
  ];

  const handleCardClick = (index: number) => {
    setActivePopup(activePopup === index ? null : index);
  };

  const handleMouseEnter = (index: number) => {
    if (window.innerWidth >= 768) { // md breakpoint
      setActivePopup(index);
    }
  };

  return (
    <section id="offre" className="py-20 relative overflow-hidden">
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/equipedeface.jpg)',
        }}
      />
      
      {/* Overlay pour la lisibilité */}
      <div className="absolute inset-0 bg-primary-bg/90 dark:bg-blue-ink/90" />
      
      {/* Contenu par-dessus le fond */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Titre */}
        <AnimatedSection animation="slide-up" delay={0}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-title font-bold text-blue-ink dark:text-primary-bg leading-tight">
              Ce que nous allons changer,
              <span className="block text-mint-green">ensemble</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* Liste des promesses */}
        <div className="space-y-6 mb-16">
          {promises.map((promise, index) => (
            <AnimatedSection key={index} animation="slide-up" delay={200 + index * 100}>
              <div 
                className="bg-white/90 dark:bg-gray-anthracite/40 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
                onClick={() => handleCardClick(index)}
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <div className="flex items-center gap-4 md:gap-6">
                  {/* Icône */}
                  <div className="text-4xl md:text-5xl animate-float" style={{ animationDelay: promise.delay }}>
                    {promise.icon}
                  </div>

                  <div className="flex-1 flex items-center justify-between">
                    <p className="text-xl md:text-2xl font-body text-blue-ink dark:text-primary-bg leading-relaxed">
                      {promise.text}
                    </p>
                    
                    {/* Indicateur de contenu détaillé - Version desktop */}
                    <div className="hidden md:flex items-center ml-4">
                      <div className={`w-8 h-8 bg-mint-green/10 border-2 border-mint-green rounded-full flex items-center justify-center text-mint-green transition-all duration-300 group-hover:bg-mint-green group-hover:text-white ${index === 0 ? 'animate-pulse' : ''}`}>
                        <span className="text-sm font-bold">ⓘ</span>
                      </div>
                    </div>
                    
                    {/* Indicateur de contenu détaillé - Version mobile */}
                    <div className="md:hidden flex items-center ml-4">
                      <div className={`w-8 h-8 bg-mint-green/10 border-2 border-mint-green rounded-full flex items-center justify-center text-mint-green transition-all duration-300 ${index === 0 ? 'animate-pulse' : ''}`}>
                        <span className="text-lg">
                          {activePopup === index ? '−' : '+'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Popup détaillé */}
                {activePopup === index && (
                  <AnimatedSection animation="fade-in" delay={100}>
                    <div className="mt-6 p-6 bg-mint-green/5 border border-mint-green/20 rounded-2xl">
                      <h3 className="font-title font-bold text-blue-ink dark:text-primary-bg text-lg mb-3">
                        {promise.popup.title}
                      </h3>
                      <p className="font-body text-gray-anthracite dark:text-primary-bg/90 leading-relaxed mb-4">
                        {promise.popup.content}
                      </p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {promise.popup.highlights.map((highlight, highlightIndex) => (
                          <div key={highlightIndex} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-mint-green rounded-full"></div>
                            <span className="font-body text-sm text-gray-anthracite dark:text-primary-bg/80">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fade-in" delay={800}>
          <div className="text-center">
            <div className="inline-block">
              <Button 
                variant="secondary"
                icon="🔍"
                onClick={() => scrollToSection('diagnostic')}
                className="bg-mint-green text-white border-2 border-mint-green hover:bg-mint-green/90 hover:text-white shadow-lg"
              >
                Faire le diagnostic
              </Button>
            </div>
            <p className="mt-4 font-italic text-gray-anthracite dark:text-primary-bg/70 text-sm">
              Découvrez où vous en êtes vraiment
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
} 