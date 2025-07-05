'use client';

import { Youtube, FileText, Award, Star, Briefcase, DraftingCompass, Download } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { motion } from 'framer-motion';
import { useRef } from 'react';

export default function ResourcesSection() {
  const scrollRef = useRef(null);
  
  const resources = [
    {
      icon: <Youtube className="w-10 h-10 text-red-500" />,
      title: "Dernière Vidéo YouTube",
      description: "Conseils et stratégies en direct du terrain.",
      link: "https://www.youtube.com/watch?v=k1Lz8vKSiHc",
      status: "Voir la vidéo",
      available: true,
    },
    {
      icon: <FileText className="w-10 h-10 text-blue-500" />,
      title: "Guide : Ultime de la Prospection",
      description: "Le processus complet pour générer des leads qualifiés.",
      link: "#",
      status: "Bientôt disponible",
      available: false,
    },
    {
      icon: <Award className="w-10 h-10 text-yellow-500" />,
      title: "Guide : Ultime du Closing",
      description: "Les techniques et le mindset pour conclure plus d'affaires.",
      link: "#",
      status: "Bientôt disponible",
      available: false,
    },
    {
      icon: <Star className="w-10 h-10 text-orange-400" />,
      title: "Outil : Offres 5 Étoiles",
      description: "Un générateur pour des propositions commerciales percutantes.",
      link: "#",
      status: "Bientôt disponible",
      available: false,
    },
    {
      icon: <Briefcase className="w-10 h-10 text-green-500" />,
      title: "Outil : Préparation de RDV",
      description: "Ne laissez plus rien al'hasard avant un entretien clé.",
      link: "#",
      status: "Bientôt disponible",
      available: false,
    },
    {
      icon: <DraftingCompass className="w-10 h-10 text-purple-500" />,
      title: "Outil : Stratégie Commerciale",
      description: "Construisez votre plan d'action commercial sur 1 an.",
      link: "#",
      status: "Bientôt disponible",
      available: false,
    },
  ];

  return (
    <section id="ressources" className="py-20 bg-slate-50 dark:bg-blue-ink/20 overflow-hidden">
      <div className="container mx-auto">
        <AnimatedSection animation="slide-up">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-title font-bold text-blue-ink dark:text-primary-bg leading-tight">
              Mes ressources pour votre
              <span className="block text-mint-green">performance</span>
            </h2>
            <p className="mt-4 text-lg text-gray-anthracite dark:text-primary-bg/80 max-w-2xl mx-auto">
              Des outils et guides concrets, directement issus de 20 ans de terrain, pour vous aider à passer à l'action.
            </p>
          </div>
        </AnimatedSection>

        <motion.div ref={scrollRef} className="overflow-x-auto cursor-grab active:cursor-grabbing pb-4" style={{ scrollbarWidth: 'none' }}>
          <motion.div 
            className="flex gap-8 px-4"
            drag="x"
            dragConstraints={scrollRef}
          >
            {resources.map((resource, index) => (
              <div key={index} className="flex-shrink-0 w-80">
                <a
                  href={resource.available ? resource.link : undefined}
                  target={resource.available ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`block bg-white dark:bg-gray-anthracite/60 rounded-2xl shadow-lg p-6 flex flex-col items-start justify-between h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl ${!resource.available ? 'cursor-not-allowed opacity-70' : 'hover:border-mint-green border-transparent'}`}
                >
                  <div>
                    <div className="w-20 h-20 bg-white dark:bg-gray-anthracite/80 rounded-xl flex items-center justify-center mb-4 border border-slate-200 dark:border-gray-700">
                      {resource.icon}
                    </div>
                    <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-2">{resource.title}</h3>
                    <p className="text-sm font-body text-gray-anthracite dark:text-primary-bg/80 mb-4 h-12">{resource.description}</p>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mt-4 ${
                    resource.available 
                    ? 'bg-mint-green/20 text-mint-green' 
                    : 'bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-300'
                  }`}>
                    <Download className="w-4 h-4" />
                    {resource.status}
                  </div>
                </a>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 