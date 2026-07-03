'use client';

import React from 'react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SocialSharing from '@/components/ui/SocialSharing';
import { NegotiationTechnique } from '@/types/negotiation-technique';

interface RelatedTechniqueCard {
  id: string;
  slug: string;
  title: string;
  author: string;
  description: string;
  category: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  keyBenefit: string;
  complementaryReason: string;
}

interface RelatedTechniquesProps {
  currentTechnique: NegotiationTechnique;
  relatedTechniques: RelatedTechniqueCard[];
  className?: string;
}

// Données des techniques liées (en attendant l'implémentation complète)
const relatedTechniquesData: Record<string, RelatedTechniqueCard> = {
  'audit-accusation': {
    id: 'audit-accusation',
    slug: 'audit-accusation',
    title: 'L\'Audit d\'Accusation',
    author: 'Chris Voss',
    description: 'Technique FBI pour désamorcer les objections en les énonçant soi-même avant que le client ne les formule.',
    category: 'psychology',
    difficultyLevel: 'intermediate',
    keyBenefit: 'Désamorce 80% des objections avant qu\'elles ne soient formulées',
    complementaryReason: 'Parfait complément pour préparer le terrain avant d\'appliquer "Ne jamais couper la poire en deux"'
  },
  'questions-calibrees': {
    id: 'questions-calibrees',
    slug: 'questions-calibrees',
    title: 'Les Questions Calibrées',
    author: 'Chris Voss',
    description: 'Art de poser des questions qui orientent la réflexion du client vers vos solutions sans paraître manipulateur.',
    category: 'psychology',
    difficultyLevel: 'advanced',
    keyBenefit: 'Fait découvrir au client ses propres besoins et solutions',
    complementaryReason: 'Technique avancée pour explorer les alternatives créatives avec votre interlocuteur'
  },
  'empathie-tactique': {
    id: 'empathie-tactique',
    slug: 'empathie-tactique',
    title: 'L\'Empathie Tactique',
    author: 'Chris Voss',
    description: 'Méthode pour comprendre et refléter les émotions du client afin de créer une connexion authentique.',
    category: 'psychology',
    difficultyLevel: 'beginner',
    keyBenefit: 'Crée une connexion émotionnelle qui facilite l\'acceptation',
    complementaryReason: 'Base essentielle pour appliquer le refus empathique avec succès'
  }
};

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 border-green-200',
  intermediate: 'bg-orange-100 text-orange-800 border-orange-200',
  advanced: 'bg-red-100 text-red-800 border-red-200'
};

const difficultyLabels = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé'
};

export default function RelatedTechniques({ 
  currentTechnique, 
  relatedTechniques,
  className = '' 
}: RelatedTechniquesProps) {
  // Récupérer les données des techniques liées
  const relatedTechniquesWithData = currentTechnique.relatedTechniques
    .map(techniqueId => relatedTechniquesData[techniqueId])
    .filter(Boolean)
    .slice(0, 3); // Limiter à 3 techniques maximum

  if (relatedTechniquesWithData.length === 0) {
    return null;
  }

  return (
    <section className={`py-16 ${className}`} aria-labelledby="related-techniques-title">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection delay={0}>
          <div className="text-center mb-12">
            <span className="inline-block bg-red-600/20 text-red-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
              <span className="inline mr-2">🔗</span>
              Techniques complémentaires
            </span>
            <h2 id="related-techniques-title" className="text-3xl md:text-4xl font-bold text-primary-title mb-4">
              Maîtrisez l'arsenal complet de Chris Voss
            </h2>
            <p className="text-lg text-primary-secondary/90 leading-relaxed max-w-3xl mx-auto">
              Ces techniques FBI se complètent parfaitement avec "{currentTechnique.title}" pour vous donner 
              une maîtrise totale de la négociation commerciale.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {relatedTechniquesWithData.map((technique, index) => (
            <AnimatedSection key={technique.id} delay={100 + index * 100}>
              <Link 
                href={`/ressources/techniques-de-negociation/${technique.slug}`}
                className="group block h-full"
                aria-label={`Découvrir la technique ${technique.title}`}
              >
                <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-xl p-6 border border-red-600/20 backdrop-blur-sm h-full transition-all duration-300 hover:shadow-2xl hover:bg-white/80 dark:hover:bg-blue-ink/90 hover:border-red-600/40 hover:-translate-y-1">
                  {/* Header avec difficulté */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${difficultyColors[technique.difficultyLevel]}`}>
                      {difficultyLabels[technique.difficultyLevel]}
                    </span>
                    <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-lg">🎯</span>
                    </div>
                  </div>

                  {/* Titre et auteur */}
                  <h3 className="text-xl font-bold text-blue-ink dark:text-red-600 mb-2 group-hover:text-red-600 dark:group-hover:text-orange-500 transition-colors duration-300">
                    {technique.title}
                  </h3>
                  <p className="text-sm text-primary-secondary/70 mb-3 font-medium">
                    par {technique.author}
                  </p>

                  {/* Description */}
                  <p className="text-primary-secondary/90 text-sm leading-relaxed mb-4">
                    {technique.description}
                  </p>

                  {/* Bénéfice clé */}
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-red-600 text-sm">✨</span>
                      <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">
                        Bénéfice clé
                      </span>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                      {technique.keyBenefit}
                    </p>
                  </div>

                  {/* Raison de complémentarité */}
                  <div className="border-t border-red-600/20 pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-orange-500 text-sm">🔗</span>
                      <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
                        Pourquoi cette technique ?
                      </span>
                    </div>
                    <p className="text-sm text-primary-secondary/80 italic">
                      {technique.complementaryReason}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 pt-4 border-t border-red-600/10">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-red-600 group-hover:text-orange-500 transition-colors duration-300">
                        Découvrir la technique
                      </span>
                      <div className="w-6 h-6 bg-red-600 group-hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* Navigation vers la page principale */}
        <AnimatedSection delay={400}>
          <div className="text-center">
            <div className="bg-gradient-to-r from-red-600/10 via-orange-500/10 to-red-600/10 rounded-2xl p-8 border border-red-600/20 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-red-600">
                  Découvrez toutes les techniques
                </h3>
              </div>
              <p className="text-primary-secondary/90 mb-6 leading-relaxed max-w-2xl mx-auto">
                Explorez l'arsenal complet des 8 techniques de négociation les plus puissantes, 
                adaptées au contexte PME français par Laurent Serre.
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <Link 
                  href="/ressources/techniques-de-negociation"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-red-700 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  aria-label="Retourner à la page principale des techniques de négociation"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Voir toutes les techniques</span>
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">8</span>
                  </div>
                </Link>
                
                {/* Social Sharing */}
                <SocialSharing 
                  technique={currentTechnique}
                  currentSection="related-techniques"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Maillage interne SEO */}
        <AnimatedSection delay={500}>
          <div className="mt-12 pt-8 border-t border-red-600/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
                  <span>📚</span>
                  Ressources complémentaires
                </h4>
                <div className="space-y-3">
                  <Link 
                    href="/ressources/meilleurs-livres/negociation-closing"
                    className="block text-primary-secondary hover:text-red-600 transition-colors duration-300 text-sm"
                  >
                    → Meilleurs livres sur la négociation et le closing
                  </Link>
                  <Link 
                    href="/ressources/meilleurs-livres/psychologie-influence"
                    className="block text-primary-secondary hover:text-red-600 transition-colors duration-300 text-sm"
                  >
                    → Livres de psychologie et influence commerciale
                  </Link>
                  <Link 
                    href="/bootcamp"
                    className="block text-primary-secondary hover:text-red-600 transition-colors duration-300 text-sm"
                  >
                    → Formation intensive en négociation commerciale
                  </Link>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
                  <span>🎯</span>
                  Aller plus loin
                </h4>
                <div className="space-y-3">
                  <Link 
                    href="/diagnostic"
                    className="block text-primary-secondary hover:text-red-600 transition-colors duration-300 text-sm"
                  >
                    → Diagnostic commercial gratuit
                  </Link>
                  <Link 
                    href="/coach-commercial-entreprise"
                    className="block text-primary-secondary hover:text-red-600 transition-colors duration-300 text-sm"
                  >
                    → Coaching en négociation personnalisé
                  </Link>
                  <Link 
                    href="/contact"
                    className="block text-primary-secondary hover:text-red-600 transition-colors duration-300 text-sm"
                  >
                    → Consultation stratégique
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}