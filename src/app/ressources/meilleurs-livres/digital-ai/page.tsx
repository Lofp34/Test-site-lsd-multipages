import { digitalAISalesCategory } from '@/data/books-enriched';
import Link from 'next/link';
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ComparisonTable from '@/components/ui/ComparisonTable';
import BookCard from '@/components/ui/BookCard';
import CategoryBreadcrumb from '@/components/ui/CategoryBreadcrumb';
import ParticleBackground from '@/components/ui/ParticleBackground';
import AIInsight from '@/components/ui/AIInsight';
import AIIcon from '@/components/ui/AIIcon';
import { categoryBreadcrumbSuggestions } from '@/utils/cross-category-suggestions';
import React from 'react';

// Données structurées Schema.org pour la page catégorie
const categoryStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Digital & AI Sales - Meilleurs Livres",
  "description": "La transformation numérique et l'intelligence artificielle révolutionnent le métier commercial. Découvrez les références essentielles pour maîtriser l'IA en vente.",
  "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/digital-ai",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Meilleurs livres Digital & AI Sales",
    "numberOfItems": 5,
    "itemListElement": [
      {
        "@type": "Book",
        "position": 1,
        "name": "The Second Machine Age",
        "author": "Erik Brynjolfsson & Andrew McAfee",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/digital-ai/the-second-machine-age"
      },
      {
        "@type": "Book", 
        "position": 2,
        "name": "AI Superpowers",
        "author": "Kai-Fu Lee",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/digital-ai/ai-superpowers"
      },
      {
        "@type": "Book",
        "position": 3, 
        "name": "Life 3.0",
        "author": "Max Tegmark",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/digital-ai/life-3-0"
      },
      {
        "@type": "Book",
        "position": 4,
        "name": "Human + Machine", 
        "author": "Paul Daugherty & James Wilson",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/digital-ai/human-machine"
      },
      {
        "@type": "Book",
        "position": 5,
        "name": "The Lean Startup",
        "author": "Eric Ries", 
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/digital-ai/lean-startup"
      }
    ]
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://laurent-serre-developpement.fr"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Ressources",
        "item": "https://laurent-serre-developpement.fr/ressources"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Meilleurs Livres",
        "item": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Digital & AI Sales"
      }
    ]
  }
};

export const metadata: Metadata = {
  title: 'Digital & AI Sales | Meilleurs Livres | Laurent Serre',
  description: 'Les meilleurs livres sur l\'IA et la transformation digitale en vente. The Second Machine Age, AI Superpowers, Human + Machine. Résumés détaillés et conseils terrain de Laurent Serre.',
  keywords: [
    'IA vente',
    'digital sales', 
    'intelligence artificielle commercial',
    'transformation digitale',
    'vente augmentée',
    'second machine age',
    'ai superpowers',
    'human machine',
    'laurent serre'
  ],
  openGraph: {
    title: 'Digital & AI Sales | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleurs livres sur l\'IA et la transformation digitale en vente. The Second Machine Age, AI Superpowers, Human + Machine. Résumés détaillés et conseils terrain.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/digital-ai',
    images: [
      {
        url: 'https://laurent-serre-developpement.fr/images/og-digital-ai-sales.jpg',
        width: 1200,
        height: 630,
        alt: 'Digital & AI Sales - Meilleurs Livres par Laurent Serre',
      },
    ],
    siteName: 'Laurent Serre Développement',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital & AI Sales | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleurs livres sur l\'IA et la transformation digitale en vente. The Second Machine Age, AI Superpowers, Human + Machine.',
    images: ['https://laurent-serre-developpement.fr/images/og-digital-ai-sales.jpg'],
  },
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/digital-ai',
  },
  other: {
    'preload': '/ressources/meilleurs-livres/digital-ai/the-second-machine-age as document',
  },
};

export default function DigitalAISalesPage() {
  const category = digitalAISalesCategory;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryStructuredData) }}
      />
      
      <main className="relative bg-gradient-to-br from-blue-ink via-cyan-500/10 to-primary-bg min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Particle background for technological atmosphere */}
        <ParticleBackground 
          density={30}
          speed={0.3}
          color="#00BDA4"
          opacity={0.4}
          className="absolute inset-0"
        />
        {/* Breadcrumb navigation */}
        <CategoryBreadcrumb 
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Ressources', href: '/ressources' },
            { label: 'Meilleurs Livres', href: '/ressources/meilleurs-livres' },
            { label: 'Digital & AI Sales', href: '/ressources/meilleurs-livres/digital-ai', current: true }
          ]}
          relatedCategories={categoryBreadcrumbSuggestions['digital-ai']}
        />

        {/* Hero section avec présentation de la transformation digitale */}
        <section className="max-w-4xl mx-auto text-center mb-12 px-4" aria-labelledby="hero-title">
          <AnimatedSection animation="fade-in" delay={0}>
            <span 
              className="inline-block bg-cyan-500/20 text-cyan-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur"
              role="status"
              aria-label={`Catégorie ${category.title}`}
            >
              <span aria-hidden="true">{category.icon}</span> Catégorie
            </span>
            <h1 id="hero-title" className="text-4xl md:text-5xl font-bold text-primary-title mb-4 drop-shadow-lg">
              {category.title}
            </h1>
            <p className="text-lg md:text-xl text-primary-secondary/90 mb-6 leading-relaxed">
              {category.description}
            </p>
            
            {/* Message spécifique sur la transformation digitale avec effets visuels */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-8 border border-cyan-400/20 overflow-hidden group hover:bg-white/15 transition-all duration-500">
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
              
              {/* Floating tech icons */}
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <AIIcon type="robot" size="md" color="#00BDA4" animated />
              </div>
              <div className="absolute bottom-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <AIIcon type="circuit" size="sm" color="#00BDA4" animated />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <AIIcon type="future" size="md" color="#00BDA4" animated />
                  <h2 className="text-xl font-semibold text-cyan-400">
                    L'IA transforme déjà la vente
                  </h2>
                </div>
                <p className="text-primary-secondary/90 leading-relaxed mb-4">
                  Prospection automatisée, scoring prédictif, analyse conversationnelle... 
                  L'intelligence artificielle révolutionne chaque étape du processus commercial. 
                  Ces 5 livres vous donnent les clés pour comprendre, anticiper et maîtriser cette transformation.
                </p>
                
                {/* Laurent Serre positioning */}
                <div className="bg-white/10 rounded-lg p-4 mb-4 border border-cyan-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center">
                      <span className="text-blue-ink font-bold text-sm">LS</span>
                    </div>
                    <span className="text-cyan-300 font-semibold">Vision Laurent Serre</span>
                  </div>
                  <p className="text-primary-secondary/90 text-sm italic">
                    "Après 20 ans d'accompagnement PME, je vois l'IA comme le plus grand levier de transformation commerciale depuis l'arrivée d'Internet. 
                    Ces livres ne sont pas de la théorie : ils décrivent des réalités que mes clients vivent déjà. 
                    L'enjeu n'est plus de savoir si l'IA va transformer votre métier, mais comment vous allez la maîtriser."
                  </p>
                </div>
                
                {/* Tech stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-cyan-400/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">85%</div>
                    <div className="text-xs text-primary-secondary/70">des entreprises utilisent l'IA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">3x</div>
                    <div className="text-xs text-primary-secondary/70">plus de leads qualifiés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">60%</div>
                    <div className="text-xs text-primary-secondary/70">de gain de temps</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Tableau comparatif avec critères spécifiques IA/Digital */}
        <section aria-labelledby="comparison-title">
          <AnimatedSection delay={100}>
            <div className="max-w-6xl mx-auto px-4">
              <h2 id="comparison-title" className="sr-only">
                Tableau comparatif des livres Digital & AI Sales
              </h2>
              <ComparisonTable 
                books={category.books} 
                category="digital-ai" 
              />
            </div>
          </AnimatedSection>
        </section>

        {/* Grid de livres avec BookCard adaptée */}
        <section aria-labelledby="books-grid-title">
          <AnimatedSection delay={200}>
            <div className="max-w-6xl mx-auto mb-12 px-4">
              <h2 id="books-grid-title" className="sr-only">
                Liste des livres recommandés sur Digital & AI Sales
              </h2>
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                role="list"
                aria-label="Livres recommandés sur Digital & AI Sales"
              >
                {category.books.map((book, index) => (
                  <AnimatedSection key={book.slug} delay={300 + index * 100}>
                    <div role="listitem">
                      <BookCard 
                        book={book} 
                        variant="grid"
                        showRating={true}
                        showDifficulty={true}
                        showReadingTime={true}
                      />
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Section AI Insights - Nouvelles technologies */}
        <AnimatedSection delay={350}>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <div className="text-center mb-8">
              <span className="inline-block bg-purple-500/20 text-purple-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                <AIIcon type="circuit" size="sm" className="inline mr-2" />
                Technologies émergentes
              </span>
              <h3 className="text-2xl font-bold text-primary-title mb-4">
                Les innovations qui transforment la vente
              </h3>
              <p className="text-primary-secondary/90 leading-relaxed max-w-3xl mx-auto">
                Découvrez les technologies d'IA qui révolutionnent déjà le métier commercial et préparez-vous aux évolutions futures
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <AIInsight
                title="Prospection Automatisée par IA"
                description="L'intelligence artificielle révolutionne la prospection en analysant des millions de données pour identifier les prospects les plus qualifiés et personnaliser automatiquement les approches."
                businessImpact="Augmentation de 300% du taux de conversion et réduction de 70% du temps de prospection"
                implementationLevel="Intermédiaire"
                technologies={['Machine Learning', 'NLP', 'Predictive Analytics']}
                trend="rising"
              />
              
              <AIInsight
                title="Analyse Conversationnelle en Temps Réel"
                description="Les outils d'IA analysent vos appels commerciaux en temps réel pour suggérer les meilleures réponses aux objections et optimiser votre discours de vente."
                businessImpact="Amélioration de 45% du taux de closing et coaching automatique des équipes"
                implementationLevel="Avancé"
                technologies={['Speech Recognition', 'Sentiment Analysis', 'Real-time AI']}
                trend="rising"
              />
              
              <AIInsight
                title="Scoring Prédictif des Opportunités"
                description="L'IA prédit la probabilité de signature de chaque deal en analysant l'historique, les interactions et les signaux comportementaux des prospects."
                businessImpact="Priorisation optimale des efforts commerciaux et prévisions de vente précises à 85%"
                implementationLevel="Débutant"
                technologies={['Predictive Modeling', 'CRM Integration', 'Data Analytics']}
                trend="stable"
              />
              
              <AIInsight
                title="Personnalisation Dynamique du Contenu"
                description="Génération automatique de propositions commerciales, emails et présentations personnalisées selon le profil et les besoins spécifiques de chaque prospect."
                businessImpact="Gain de 60% de temps sur la création de contenu et taux d'engagement multiplié par 2"
                implementationLevel="Intermédiaire"
                technologies={['GPT/LLM', 'Content Generation', 'Dynamic Personalization']}
                trend="rising"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Section spécifique : Impact IA sur les métiers commerciaux */}
        <AnimatedSection delay={400}>
          <div className="max-w-4xl mx-auto mb-12 px-4">
            <div className="bg-white/70 rounded-2xl shadow-2xl p-8 border border-cyan-400/20 backdrop-blur-sm">
              <div className="text-center mb-6">
                <span className="inline-block bg-cyan-500/20 text-cyan-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  🎯 Focus métier
                </span>
                <h3 className="text-2xl font-bold text-blue-ink mb-4">
                  Comment l'IA transforme votre métier de commercial
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-600 flex items-center gap-2">
                    ✅ Métiers renforcés par l'IA
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700
                    <li>• Vente consultative complexe</li>
                    <li>• Négociation stratégique</li>
                    <li>• Gestion de comptes clés</li>
                    <li>• Innovation commerciale</li>
                    <li>• Coaching d'équipes</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-orange-600 flex items-center gap-2">
                    ⚠️ Tâches automatisées
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700
                    <li>• Qualification de leads basique</li>
                    <li>• Reporting et administration</li>
                    <li>• Prospection de masse</li>
                    <li>• Vente transactionnelle simple</li>
                    <li>• Suivi pipeline automatique</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-cyan-50 rounded-lg">
                <p className="text-sm text-gray-700 italic">
                  💡 <strong>Conseil Laurent Serre :</strong> L'IA ne remplace pas le commercial, 
                  elle le libère des tâches répétitives pour se concentrer sur la relation client 
                  et la création de valeur. Investissez dès maintenant dans vos compétences relationnelles !
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section : Exemples concrets PME */}
        <AnimatedSection delay={450}>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <div className="bg-white/70 rounded-2xl shadow-2xl p-8 border border-cyan-400/20 backdrop-blur-sm">
              <div className="text-center mb-8">
                <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  🏢 Cas clients PME
                </span>
                <h3 className="text-2xl font-bold text-blue-ink mb-4">
                  Exemples concrets de transformation IA en PME
                </h3>
                <p className="text-gray-700 mb-6">
                  Découvrez comment mes clients PME appliquent concrètement les concepts de ces livres
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">SaaS</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-600">PME Tech - 25 salariés</h4>
                        <p className="text-sm text-gray-600 logiciel B2B</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3 text-sm">
                      <strong>Défi :</strong> Équipe commerciale débordée, qualification manuelle des leads, 
                      taux de conversion faible (2%).
                    </p>
                    <p className="text-gray-700 mb-3 text-sm">
                      <strong>Solution IA :</strong> Scoring automatique des leads + chatbot de qualification 
                      + analyse prédictive des opportunités.
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-green-700 text-sm font-medium">
                        📈 Résultats : +180% de leads qualifiés, taux de conversion à 7%, 
                        3h/jour économisées par commercial
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">IND</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-purple-600">Industrie - 80 salariés</h4>
                        <p className="text-sm text-gray-600 industriels</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3 text-sm">
                      <strong>Défi :</strong> Cycles de vente longs (12 mois), difficulté à prioriser 
                      les opportunités, reporting manuel chronophage.
                    </p>
                    <p className="text-gray-700 mb-3 text-sm">
                      <strong>Solution IA :</strong> Analyse prédictive des cycles de vente + 
                      recommandations d'actions + automatisation du reporting.
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-green-700 text-sm font-medium">
                        📈 Résultats : -25% de durée de cycle, +40% de précision des forecasts, 
                        2 jours/mois économisés sur le reporting
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">SVC</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-emerald-600">Services - 15 salariés</h4>
                        <p className="text-sm text-gray-600 en transformation</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3 text-sm">
                      <strong>Défi :</strong> Prospection chronophage, personnalisation difficile à grande échelle, 
                      suivi client manuel.
                    </p>
                    <p className="text-gray-700 mb-3 text-sm">
                      <strong>Solution IA :</strong> Prospection automatisée + génération de contenu personnalisé + 
                      analyse de sentiment client.
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-green-700 text-sm font-medium">
                        📈 Résultats : +300% de prospects contactés, taux de réponse x2, 
                        satisfaction client +35%
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">COM</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-orange-600">E-commerce - 35 salariés</h4>
                        <p className="text-sm text-gray-600 spécialisée</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3 text-sm">
                      <strong>Défi :</strong> Gestion manuelle des comptes B2B, recommandations produits 
                      basiques, support client débordé.
                    </p>
                    <p className="text-gray-700 mb-3 text-sm">
                      <strong>Solution IA :</strong> Recommandations intelligentes + chatbot support + 
                      analyse comportementale clients.
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-green-700 text-sm font-medium">
                        📈 Résultats : +85% de ventes croisées, -50% de tickets support, 
                        NPS client +28 points
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">LS</span>
                  </div>
                  <h4 className="text-xl font-bold text-cyan-600">Retour d'expérience Laurent Serre</h4>
                </div>
                <p className="text-gray-700 mb-4">
                  "Ces transformations ne se font pas du jour au lendemain. Mes clients qui réussissent le mieux 
                  suivent une approche progressive : ils commencent par automatiser une tâche simple, mesurent l'impact, 
                  puis étendent progressivement. L'erreur classique est de vouloir tout digitaliser d'un coup."
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-white/50 rounded-lg">
                    <div className="text-2xl font-bold text-cyan-600">6 mois</div>
                    <div className="text-xs text-gray-600 moyenne de transformation</div>
                  </div>
                  <div className="text-center p-3 bg-white/50 rounded-lg">
                    <div className="text-2xl font-bold text-cyan-600">3-5x</div>
                    <div className="text-xs text-gray-600 moyen sur l'investissement IA</div>
                  </div>
                  <div className="text-center p-3 bg-white/50 rounded-lg">
                    <div className="text-2xl font-bold text-cyan-600">95%</div>
                    <div className="text-xs text-gray-600 de satisfaction clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section : Conseils d'implémentation progressive */}
        <AnimatedSection delay={475}>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <div className="bg-white/70 rounded-2xl shadow-2xl p-8 border border-cyan-400/20 backdrop-blur-sm">
              <div className="text-center mb-8">
                <span className="inline-block bg-orange-soft/20 text-orange-soft font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  🚀 Implémentation
                </span>
                <h3 className="text-2xl font-bold text-blue-ink mb-4">
                  Feuille de route pour votre transformation IA
                </h3>
                <p className="text-gray-700 mb-6">
                  Approche progressive recommandée par Laurent Serre pour intégrer l'IA dans votre équipe commerciale
                </p>
              </div>
              
              <div className="space-y-8">
                {/* Phase 1 */}
                <div className="relative">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        1
                      </div>
                      <div className="w-0.5 h-16 bg-green-500/30 mx-auto mt-2"></div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200/50">
                        <h4 className="text-xl font-bold text-green-600 mb-3">Phase 1 : Diagnostic & Quick Wins (Mois 1-2)</h4>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h5 className="font-semibold text-green-500 mb-2">📊 Audit de l'existant</h5>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li>• Cartographie des processus commerciaux</li>
                              <li>• Identification des tâches répétitives</li>
                              <li>• Analyse des données disponibles</li>
                              <li>• Évaluation de la maturité digitale</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-green-500 mb-2">⚡ Actions immédiates</h5>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li>• Automatisation du reporting basique</li>
                              <li>• Mise en place d'un CRM simple</li>
                              <li>• Templates d'emails automatisés</li>
                              <li>• Tableau de bord commercial</li>
                            </ul>
                          </div>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg">
                          <p className="text-green-700 text-sm">
                            <strong>Objectif :</strong> Gagner 2-3h/semaine par commercial et créer l'adhésion à la transformation
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="relative">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        2
                      </div>
                      <div className="w-0.5 h-16 bg-blue-500/30 mx-auto mt-2"></div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200/50">
                        <h4 className="text-xl font-bold text-blue-600 mb-3">Phase 2 : IA Assistante (Mois 3-4)</h4>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h5 className="font-semibold text-blue-500 mb-2">🤖 Outils IA simples</h5>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li>• Scoring automatique des leads</li>
                              <li>• Chatbot de qualification basique</li>
                              <li>• Analyse de sentiment des emails</li>
                              <li>• Recommandations de contenu</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-blue-500 mb-2">📚 Formation équipe</h5>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li>• Sensibilisation aux concepts IA</li>
                              <li>• Formation aux nouveaux outils</li>
                              <li>• Définition des nouveaux rôles</li>
                              <li>• Mesure des premiers impacts</li>
                            </ul>
                          </div>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <p className="text-blue-700 text-sm">
                            <strong>Objectif :</strong> Améliorer la qualification des leads de 50% et réduire le temps de prospection
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="relative">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        3
                      </div>
                      <div className="w-0.5 h-16 bg-purple-500/30 mx-auto mt-2"></div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200/50">
                        <h4 className="text-xl font-bold text-purple-600 mb-3">Phase 3 : IA Collaborative (Mois 5-6)</h4>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h5 className="font-semibold text-purple-500 mb-2">🤝 Collaboration avancée</h5>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li>• IA d'aide à la négociation</li>
                              <li>• Analyse prédictive des opportunités</li>
                              <li>• Personnalisation automatique</li>
                              <li>• Coaching IA en temps réel</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-purple-500 mb-2">📈 Optimisation continue</h5>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li>• Analyse des performances IA</li>
                              <li>• Ajustement des algorithmes</li>
                              <li>• Formation continue des équipes</li>
                              <li>• Expansion à d'autres processus</li>
                            </ul>
                          </div>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <p className="text-purple-700 text-sm">
                            <strong>Objectif :</strong> Atteindre une collaboration homme-machine optimale et mesurer le ROI complet
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 4 */}
                <div className="relative">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        4
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200/50">
                        <h4 className="text-xl font-bold text-orange-600 mb-3">Phase 4 : Excellence & Innovation (Mois 7+)</h4>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h5 className="font-semibold text-orange-500 mb-2">🚀 Innovation continue</h5>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li>• Expérimentation de nouvelles IA</li>
                              <li>• Développement d'outils sur-mesure</li>
                              <li>• Intégration écosystème complet</li>
                              <li>• Partage des bonnes pratiques</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-orange-500 mb-2">🎯 Avantage concurrentiel</h5>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li>• Différenciation par l'IA</li>
                              <li>• Culture d'innovation établie</li>
                              <li>• Équipe experte et autonome</li>
                              <li>• Évangélisation externe</li>
                            </ul>
                          </div>
                        </div>
                        <div className="bg-orange-100 p-3 rounded-lg">
                          <p className="text-orange-700 text-sm">
                            <strong>Objectif :</strong> Devenir une référence dans votre secteur et maintenir l'avance technologique
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conseils transversaux */}
              <div className="mt-8 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">LS</span>
                  </div>
                  <h4 className="text-xl font-bold text-cyan-600">Conseils transversaux Laurent Serre</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-cyan-500 mb-2">✅ Facteurs de succès</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Commencer petit et mesurer l'impact</li>
                      <li>• Impliquer les équipes dès le début</li>
                      <li>• Former avant de déployer</li>
                      <li>• Maintenir l'humain au centre</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-red-500 mb-2">❌ Pièges à éviter</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Vouloir tout automatiser d'un coup</li>
                      <li>• Négliger la formation des équipes</li>
                      <li>• Choisir des outils trop complexes</li>
                      <li>• Oublier de mesurer le ROI</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Suggestions cross-catégories */}
        <AnimatedSection delay={500}>
          <div className="max-w-6xl mx-auto px-4 mb-12">
            <div className="bg-white/70 rounded-2xl shadow-2xl p-8 border border-cyan-400/20 backdrop-blur-sm">
              <div className="text-center mb-8">
                <span className="inline-block bg-cyan-500/20 text-cyan-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  📚 Élargissez vos compétences
                </span>
                <h3 className="text-2xl font-bold text-blue-ink mb-4">
                  Livres complémentaires d'autres catégories
                </h3>
                <p className="text-gray-700 mb-6">
                  Pour maîtriser pleinement la transformation digitale, combinez IA et leadership d'équipe
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Link 
                  href="/ressources/meilleurs-livres/sales-management/good-to-great"
                  className="group p-6 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl border border-mint-green/20 hover:border-mint-green/40 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <span className="inline-block bg-mint-green/20 text-mint-green text-xs font-medium px-2 py-1 rounded-full mb-2">
                        Sales Management & Leadership
                      </span>
                      <h4 className="text-xl font-bold text-blue-ink mb-2 group-hover:text-mint-green transition-colors">
                        Good to Great
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Jim Collins • 2001
                      </p>
                    </div>
                    <span className="text-mint-green text-xl opacity-70 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3 text-sm">
                    Pour maîtriser le leadership nécessaire à la transformation digitale de votre équipe commerciale
                  </p>
                  <span className="text-mint-green font-medium group-hover:underline text-sm">
                    Découvrir ce livre
                  </span>
                </Link>
                
                <Link 
                  href="/ressources/meilleurs-livres/sales-management/high-output-management"
                  className="group p-6 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl border border-mint-green/20 hover:border-mint-green/40 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <span className="inline-block bg-mint-green/20 text-mint-green text-xs font-medium px-2 py-1 rounded-full mb-2">
                        Sales Management & Leadership
                      </span>
                      <h4 className="text-xl font-bold text-blue-ink mb-2 group-hover:text-mint-green transition-colors">
                        High Output Management
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Andy Grove • 1983
                      </p>
                    </div>
                    <span className="text-mint-green text-xl opacity-70 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3 text-sm">
                    Pour optimiser la productivité de votre équipe dans un environnement digital
                  </p>
                  <span className="text-mint-green font-medium group-hover:underline text-sm">
                    Découvrir ce livre
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTAs multiples */}
        <AnimatedSection delay={600}>
          <div className="max-w-6xl mx-auto px-4 mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              {/* CTA Diagnostic Digital */}
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl shadow-xl p-8 text-center border border-blue-300/30 backdrop-blur-sm">
                <div className="inline-block bg-blue-500/30 text-blue-300 font-semibold rounded-full px-4 py-2 text-sm mb-4 shadow-md backdrop-blur">
                  🔍 Évaluation
                </div>
                <h4 className="text-2xl font-bold text-blue-ink mb-4">
                  Diagnostic Digital Gratuit
                </h4>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Évaluez votre maturité digitale commerciale et identifiez vos opportunités d'automatisation
                </p>
                <Link 
                  href="/diagnostic" 
                  className="inline-block bg-blue-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                >
                  Faire le diagnostic
                </Link>
              </div>

              {/* CTA Formation IA */}
              <div className="bg-gradient-to-r from-orange-soft/20 to-yellow-400/20 rounded-2xl shadow-xl p-8 text-center border border-orange-soft/30 backdrop-blur-sm">
                <div className="inline-block bg-orange-soft/30 text-orange-soft font-semibold rounded-full px-4 py-2 text-sm mb-4 shadow-md backdrop-blur">
                  🤖 Formation
                </div>
                <h4 className="text-2xl font-bold text-blue-ink mb-4">
                  Formation IA & Vente
                </h4>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Maîtrisez les outils d'IA commerciale et transformez votre approche de la vente
                </p>
                <Link 
                  href="/bootcamp-commercial-intensif" 
                  className="inline-block bg-orange-soft text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-orange-soft/90 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                >
                  Découvrir la formation
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Navigation retour */}
        <div className="max-w-3xl mx-auto text-center mt-8 px-4">
          <Link 
            href="/ressources/meilleurs-livres" 
            className="text-cyan-400 underline hover:text-cyan-300 text-lg transition-colors"
          >
            ← Retour à la rubrique Meilleurs livres
          </Link>
        </div>
      </main>
    </>
  );
}