'use client';

import { Youtube, FileText, Award, Star, Briefcase, DraftingCompass, Download, Target, Users, TrendingUp, ShieldCheck, Zap, Crown, Calculator, Phone, BookOpen } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

export default function ResourcesSection() {
  const scrollRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState('Tous');

  const filterCategories = [
    'Tous',
    'Commerciaux',
    'SDR',
    'Closers',
    'Négociateurs',
    'Directeurs',
    'KAM',
    'Chef des ventes',
    'Entrepreneurs'
  ];
  
  const resources = [
    {
      icon: <BookOpen className="w-10 h-10 text-mint-green" />,
      title: "Bibliothèque des Meilleurs Livres",
      description: "Découvrez ma sélection des livres incontournables en vente, négociation, management et leadership commercial.",
      link: "/ressources/meilleurs-livres",
      status: "Découvrir les livres",
      available: true,
      target: "Tous profils",
    },
    {
      icon: <FileText className="w-10 h-10 text-mint-green" />,
      title: "Le Grand Guide des Techniques de Vente & Négociation",
      description: "Panorama complet des méthodes de vente et de négociation, décryptées et applicables en PME.",
      link: "/ressources/le-grand-guide-des-techniques-de-vente",
      status: "Accéder au guide",
      available: true,
      target: "Tous profils",
    },
    {
      icon: <Youtube className="w-10 h-10 text-red-500" />,
      title: "Dernière Vidéo YouTube",
      description: "Conseils et stratégies en direct du terrain.",
      link: "https://www.youtube.com/watch?v=k1Lz8vKSiHc",
      status: "Voir la vidéo",
      available: true,
      target: "Tous profils",
    },
    {
      icon: <FileText className="w-10 h-10 text-blue-500" />,
      title: "Guide : Ultime de la Prospection",
      description: "Le processus complet pour générer des leads qualifiés.",
      link: "/ressources/guide-prospection",
      status: "Télécharger le guide",
      available: true,
      target: "SDR • Commerciaux",
    },
    {
      icon: <Award className="w-10 h-10 text-yellow-500" />,
      title: "Guide : Ultime du Closing",
      description: "Les techniques et le mindset pour conclure plus d'affaires.",
      link: "/ressources/guide-closing",
      status: "Télécharger le guide",
      available: true,
      target: "Closers • Négociateurs",
    },
    {
      icon: <Star className="w-10 h-10 text-orange-400" />,
      title: "Outil : Offres 5 Étoiles",
      description: "Un générateur pour des propositions commerciales percutantes.",
      link: "/ressources/outil-offre-5-etoiles",
      status: "Utiliser l'outil",
      available: true,
      target: "Commerciaux • Entrepreneurs",
    },
    {
      icon: <Briefcase className="w-10 h-10 text-green-500" />,
      title: "Outil : Préparation de RDV",
      description: "Ne laissez plus rien au hasard avant un entretien clé.",
      link: "/ressources/outil-preparation-rdv",
      status: "Utiliser l'outil",
      available: true,
      target: "Commerciaux • Négociateurs",
    },
          {
        icon: <DraftingCompass className="w-10 h-10 text-purple-500" />,
        title: "Outil : Stratégie Commerciale",
        description: "Construisez votre plan d'action commercial sur 1 an.",
        link: "/ressources/outil-strategie-commerciale",
        status: "Télécharger l'outil",
        available: true,
        target: "Directeurs • Entrepreneurs",
      },
      {
        icon: <Target className="w-10 h-10 text-indigo-500" />,
        title: "Kit : Gestion Grands Comptes",
        description: "Méthodes et outils pour développer vos comptes stratégiques.",
        link: "/ressources/kit-gestion-grands-comptes",
        status: "Télécharger le kit",
        available: true,
        target: "KAM • Key Account Manager",
      },
      {
        icon: <Users className="w-10 h-10 text-emerald-500" />,
        title: "Guide : Management d'Équipe",
        description: "Techniques pour motiver et développer votre équipe commerciale.",
        link: "#",
        status: "Bientôt disponible",
        available: false,
        target: "Chef des ventes • Directeurs",
      },
      {
        icon: <TrendingUp className="w-10 h-10 text-cyan-500" />,
        title: "Outil : Tableau de Bord Commercial",
        description: "Pilotez votre performance avec les bons indicateurs.",
        link: "#",
        status: "Bientôt disponible",
        available: false,
        target: "Directeurs • Chef des ventes",
      },
      {
        icon: <Phone className="w-10 h-10 text-pink-500" />,
        title: "Scripts : Prospection Téléphonique",
        description: "45 scripts éprouvés pour transformer vos appels en RDV.",
        link: "#",
        status: "Bientôt disponible",
        available: false,
        target: "SDR • Commerciaux",
      },
      {
        icon: <Zap className="w-10 h-10 text-amber-500" />,
        title: "Méthode : Closing Avancé",
        description: "Les 7 techniques de closing des top performers.",
        link: "#",
        status: "Bientôt disponible",
        available: false,
        target: "Closers • Négociateurs",
      },
      {
        icon: <Crown className="w-10 h-10 text-violet-500" />,
        title: "Stratégie : Négociation B2B",
        description: "Négociez comme un pro et préservez vos marges.",
        link: "#",
        status: "Bientôt disponible",
        available: false,
        target: "Négociateurs • KAM",
      },
      {
        icon: <Calculator className="w-10 h-10 text-teal-500" />,
        title: "Outil : ROI Commercial",
        description: "Calculez et optimisez le retour sur investissement de vos actions.",
        link: "#",
        status: "Bientôt disponible",
        available: false,
        target: "Entrepreneurs • Directeurs",
      },
      {
        icon: <ShieldCheck className="w-10 h-10 text-rose-500" />,
        title: "Playbook : Qualification BANT+",
        description: "Qualifiez mieux vos prospects avec cette méthode avancée.",
        link: "#",
        status: "Bientôt disponible",
        available: false,
        target: "SDR • Commerciaux",
            },
    {
        icon: <BookOpen className="w-10 h-10 text-orange-400" />,
        title: "BD : Fixer des objectifs efficaces",
        description: "Les fondamentaux de la vente en 11 planches illustrées — idéal pour partager avec votre équipe.",
        link: "/ressources/bandes-dessinees",
        status: "Voir la BD",
        available: true,
        target: "Tous",
            },
    ];

    // Filtrer les ressources selon le filtre sélectionné
    const filteredResources = selectedFilter === 'Tous' 
      ? resources 
      : resources.filter(resource => 
          resource.target?.toLowerCase().includes(selectedFilter.toLowerCase())
        );
  
    return (
    <section id="ressources" className="py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto">
        <AnimatedSection animation="slide-up">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-title font-bold text-blue-ink leading-tight">
              Mes ressources pour votre
              <span className="block text-mint-green">performance</span>
            </h2>
            <p className="mt-4 text-lg text-gray-anthracite max-w-2xl mx-auto mb-8">
              Des outils et guides concrets, directement issus de 20 ans de terrain, pour vous aider à passer à l'action.
            </p>
            
            {/* Filtres par profil */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {filterCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedFilter === category
                      ? 'bg-mint-green text-white shadow-lg scale-105'
                      : 'bg-white text-gray-anthracite hover:bg-mint-green/10 hover:text-mint-green hover:scale-105'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-lg text-gray-anthracite mb-2">
              Aucune ressource trouvée pour ce profil
            </p>
            <p className="text-sm text-gray-anthracite">
              Essayez un autre filtre ou sélectionnez "Tous"
            </p>
          </div>
        ) : (
          <motion.div ref={scrollRef} className="overflow-x-auto cursor-grab active:cursor-grabbing pb-4" style={{ scrollbarWidth: 'none' }}>
            <motion.div 
              className="flex gap-8 px-4"
              drag="x"
              dragConstraints={scrollRef}
            >
              {filteredResources.map((resource, index) => (
              <div key={index} className="flex-shrink-0 w-80">
                <a
                  href={resource.available ? resource.link : undefined}
                  target={resource.available ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`block bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start justify-between h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl ${!resource.available ? 'cursor-not-allowed opacity-70' : 'hover:border-mint-green border-transparent'}`}
                >
                  <div>
                    <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mb-4 border border-slate-200">
                      {resource.icon}
                    </div>
                    <h3 className="text-xl font-title font-bold text-blue-ink mb-2">{resource.title}</h3>
                    <p className="text-sm font-body text-gray-anthracite mb-3 h-12">{resource.description}</p>
                    {resource.target && (
                      <div className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-ink/10 text-blue-ink mb-3">
                        {resource.target}
                      </div>
                    )}
                  </div>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mt-4 ${
                    resource.available 
                    ? 'bg-mint-green/20 text-mint-green' 
                    : 'bg-slate-200 text-slate-500'
                  }`}>
                    <Download className="w-4 h-4" />
                    {resource.status}
                  </div>
                </a>
              </div>
                          ))}
            </motion.div>
          </motion.div>
        )}
        </div>
      </section>
    );
  } 