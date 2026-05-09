import { bookCategories } from '@/data/books';
import Link from 'next/link';
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import ParticleBackground from '@/components/ui/ParticleBackground';
import DomainStats from '@/components/ui/DomainStats';
import React from 'react';

const categoryIcons: Record<string, string> = {
  'prospection-sdr': '📞',
  'negociation-closing': '🤝',
  'psychologie-influence': '🧠',
  'methodes-process': '🛠️',
  'enterprise-account': '🏢',
  'sales-management': '👥',
  'management-leadership': '👔',
  'digital-ai': '🤖',
  'mindset-performance': '🔥',
};

// Données structurées Schema.org pour la page principale
const mainPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Meilleurs Livres de Vente - Guide Complet Laurent Serre",
  "description": "La sélection complète des meilleurs livres de vente, négociation, prospection, management et développement commercial. Résumés détaillés et conseils terrain par Laurent Serre.",
  "url": "https://www.laurentserre.com/ressources/meilleurs-livres",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Catégories de livres commerciaux",
    "numberOfItems": 9,
    "itemListElement": [
      {
        "@type": "Thing",
        "position": 1,
        "name": "Prospection & SDR",
        "url": "https://www.laurentserre.com/ressources/meilleurs-livres/prospection-sdr"
      },
      {
        "@type": "Thing",
        "position": 2,
        "name": "Négociation & Closing",
        "url": "https://www.laurentserre.com/ressources/meilleurs-livres/negociation-closing"
      },
      {
        "@type": "Thing",
        "position": 3,
        "name": "Psychologie & Influence",
        "url": "https://www.laurentserre.com/ressources/meilleurs-livres/psychologie-influence"
      },
      {
        "@type": "Thing",
        "position": 4,
        "name": "Méthodes & Process",
        "url": "https://www.laurentserre.com/ressources/meilleurs-livres/methodes-process"
      },
      {
        "@type": "Thing",
        "position": 5,
        "name": "Enterprise Account",
        "url": "https://www.laurentserre.com/ressources/meilleurs-livres/enterprise-account"
      },
      {
        "@type": "Thing",
        "position": 6,
        "name": "Sales Management",
        "url": "https://www.laurentserre.com/ressources/meilleurs-livres/sales-management"
      },
      {
        "@type": "Thing",
        "position": 7,
        "name": "Digital & AI Sales",
        "url": "https://www.laurentserre.com/ressources/meilleurs-livres/digital-ai"
      },
      {
        "@type": "Thing",
        "position": 8,
        "name": "Mindset & Performance",
        "url": "https://www.laurentserre.com/ressources/meilleurs-livres/mindset-performance"
      },
      {
        "@type": "Thing",
        "position": 9,
        "name": "Management & Leadership",
        "url": "https://www.laurentserre.com/ressources/meilleurs-livres/management-leadership"
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
        "item": "https://www.laurentserre.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Ressources",
        "item": "https://www.laurentserre.com/ressources"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Meilleurs Livres"
      }
    ]
  }
};

export const metadata: Metadata = {
  title: 'Meilleurs Livres de Vente | Guide Complet | Laurent Serre',
  description: 'La sélection complète des meilleurs livres de vente, négociation, prospection, management et développement commercial. Résumés détaillés et conseils terrain par Laurent Serre.',
  keywords: [
    'meilleurs livres vente',
    'livres développement commercial',
    'livres négociation',
    'livres prospection',
    'livres management commercial',
    'résumés livres business',
    'laurent serre',
    'développement commercial PME'
  ],
  openGraph: {
    title: 'Meilleurs Livres de Vente | Guide Complet | Laurent Serre',
    description: 'La sélection complète des meilleurs livres de vente, négociation, prospection, management et développement commercial. Résumés détaillés et conseils terrain.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.laurentserre.com/ressources/meilleurs-livres',
    images: [
      {
        url: 'https://www.laurentserre.com/images/og-meilleurs-livres.jpg',
        width: 1200,
        height: 630,
        alt: 'Meilleurs Livres de Vente - Guide Complet par Laurent Serre',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meilleurs Livres de Vente | Guide Complet | Laurent Serre',
    description: 'La sélection complète des meilleurs livres de vente, négociation, prospection, management et développement commercial.',
    images: ['https://www.laurentserre.com/images/og-meilleurs-livres.jpg'],
  },
  alternates: {
    canonical: 'https://www.laurentserre.com/ressources/meilleurs-livres',
  },
  other: {
    'preload': '/ressources/meilleurs-livres/digital-ai as document',
  },
};

// Statistiques globales de la bibliothèque
const libraryStats = [
  {
    value: "45+",
    label: "Livres analysés",
    description: "Sélection rigoureuse des références incontournables"
  },
  {
    value: "9",
    label: "Domaines couverts",
    description: "De la prospection au management, tous les aspects du commercial"
  },
  {
    value: "20 ans",
    label: "D'expérience terrain",
    description: "Conseils pratiques basés sur l'accompagnement de centaines de PME"
  },
  {
    value: "100%",
    label: "Actionnable",
    description: "Chaque livre avec résumé, points clés et conseils d'application"
  }
];

export default function MeilleursLivresPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mainPageStructuredData) }}
      />
      
      <main className="relative bg-gradient-to-br from-white via-mint-green/10 to-gray-50 min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Particle background for bibliothèque atmosphere */}
        <ParticleBackground 
          density={25}
          speed={0.2}
          color="#00BDA4"
          opacity={0.3}
          className="absolute inset-0"
        />
        
        {/* Hero section avec vision Laurent Serre */}
        <section className="max-w-4xl mx-auto text-center mb-12 px-4" aria-labelledby="hero-title">
          <AnimatedSection animation="fade-in" delay={0}>
            <span 
              className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur"
              role="status"
              aria-label="Catégorie Meilleurs Livres"
            >
              📚 Catégorie
            </span>
            <h1 id="hero-title" className="text-4xl md:text-5xl font-bold text-blue-ink mb-4 drop-shadow-lg">
              Meilleurs Livres de Vente
            </h1>
            <p className="text-lg md:text-xl text-gray-anthracite/90 mb-6 leading-relaxed">
              La sélection complète des références incontournables pour exceller en développement commercial. Plus de 45 livres analysés, résumés et enrichis de conseils terrain.
            </p>
            
            {/* Message spécifique bibliothèque avec vision Laurent Serre */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-8 border border-mint-green/20 overflow-hidden group hover:bg-white/15 transition-all duration-500">
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-mint-green/20 to-blue-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
              
              {/* Floating book icons */}
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <span className="text-2xl">📖</span>
              </div>
              <div className="absolute bottom-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <span className="text-xl">💡</span>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-mint-green to-blue-500 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h2 className="text-xl font-semibold text-blue-ink">
                    Une bibliothèque qui transforme les performances
                  </h2>
                </div>
                <p className="text-gray-anthracite/90 leading-relaxed mb-4">
                  En 20 ans d'accompagnement PME, j'ai testé des centaines de livres business. Cette sélection regroupe uniquement ceux qui ont un impact réel sur le terrain : techniques éprouvées, méthodes actionnables, résultats mesurables.
                </p>
                
                {/* Laurent Serre positioning */}
                <div className="bg-white/10 rounded-lg p-4 mb-4 border border-mint-green/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-mint-green rounded-full flex items-center justify-center">
                      <span className="text-blue-ink font-bold text-sm">LS</span>
                    </div>
                    <span className="text-blue-ink font-semibold">Vision Laurent Serre</span>
                  </div>
                  <p className="text-gray-anthracite/90 text-sm italic">
                    "Trop de commerciaux lisent des livres sans jamais les appliquer. Ma sélection privilégie l'actionnable : chaque ouvrage est accompagné de conseils concrets pour passer de la théorie à la pratique. Parce qu'un livre qui ne change pas vos résultats ne vaut pas le temps investi."
                  </p>
                </div>
                
                {/* Stats bibliothèque */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-mint-green/20">
                  {libraryStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-mint-green">{stat.value}</div>
                      <div className="text-xs text-gray-anthracite/70">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Section statistiques globales */}
        <AnimatedSection delay={100}>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <DomainStats 
              stats={libraryStats}
              title="La bibliothèque en chiffres"
              subtitle="Une sélection rigoureuse basée sur 20 ans d'expérience terrain"
              domainColor="#00BDA4"
            />
          </div>
        </AnimatedSection>

        {/* Grid catégories améliorée */}
        <section className="max-w-6xl mx-auto px-4 mb-12" aria-labelledby="categories-title">
          <AnimatedSection delay={200}>
            <div className="text-center mb-8">
              <span className="inline-block bg-blue-500/20 text-blue-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                <span className="inline mr-2">🎯</span>
                Domaines d'expertise
              </span>
              <h2 id="categories-title" className="text-2xl font-bold text-blue-ink mb-4">
                9 domaines pour maîtriser tous les aspects du commercial
              </h2>
              <p className="text-gray-anthracite/90 leading-relaxed max-w-3xl mx-auto">
                De la prospection au management, chaque catégorie regroupe les références 
                incontournables avec résumés détaillés et conseils d'application terrain.
              </p>
            </div>
            
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              role="list"
              aria-label="Catégories de livres commerciaux"
            >
              {bookCategories.map((cat, i) => (
                <AnimatedSection key={cat.slug} delay={300 + i * 100}>
                  <div role="listitem">
                    <Link
                      href={`/ressources/meilleurs-livres/${cat.slug}`}
                      className="group relative rounded-2xl bg-white/70 backdrop-blur-sm border border-mint-green/20 shadow-xl hover:shadow-2xl p-6 flex flex-col items-center transition-all duration-300 hover:scale-[1.02] overflow-hidden min-h-[320px]"
                    >
                      {/* Icône catégorie avec animation */}
                      <div className="mb-4 w-16 h-16 flex items-center justify-center rounded-2xl bg-mint-green/10 group-hover:bg-mint-green/20 shadow-lg transition-all duration-300 group-hover:scale-110">
                        <span className="text-4xl filter drop-shadow-sm">{categoryIcons[cat.slug] || '📚'}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-blue-ink group-hover:text-mint-green text-center mb-2 transition-colors">
                        {cat.title}
                      </h3>
                      
                      <p className="text-center text-sm text-gray-anthracite mb-4 leading-relaxed">
                        {cat.pitch}
                      </p>
                      
                      {/* Aperçu des livres */}
                      <div className="flex flex-wrap gap-1 justify-center mt-auto mb-4">
                        {cat.books.slice(0, 3).map((book) => (
                          <span key={book.slug} className="bg-mint-green/10 text-mint-green text-xs px-2 py-1 rounded-full font-medium">
                            {book.title.length > 15 ? book.title.substring(0, 15) + '...' : book.title}
                          </span>
                        ))}
                        {cat.books.length > 3 && (
                          <span className="bg-mint-green/10 text-mint-green text-xs px-2 py-1 rounded-full font-medium">
                            +{cat.books.length - 3} autres
                          </span>
                        )}
                      </div>
                      
                      {/* Indicateur d'action */}
                      <div className="flex items-center gap-2 text-mint-green text-sm font-medium group-hover:text-mint-green/80 transition-colors">
                        <span>Découvrir</span>
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                      
                      {/* Effet de survol */}
                      <div className="absolute inset-0 bg-gradient-to-br from-mint-green/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    </Link>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* Section pourquoi cette sélection */}
        <AnimatedSection delay={400}>
          <div className="max-w-4xl mx-auto mb-12 px-4">
            <div className="bg-white/70 rounded-2xl shadow-2xl p-8 border border-mint-green/20 backdrop-blur-sm">
              <div className="text-center mb-6">
                <span className="inline-block bg-orange-soft/20 text-orange-soft font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  🎯 Méthodologie
                </span>
                <h3 className="text-2xl font-bold text-blue-ink mb-4">
                  Pourquoi ces livres et pas d'autres ?
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-700 flex items-center gap-2">
                    ✅ Critères de sélection
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-anthracite">
                    <li>• Techniques testées et validées</li>
                    <li>• Méthodes actionnables immédiatement</li>
                    <li>• Résultats mesurables et quantifiables</li>
                    <li>• Adaptées aux enjeux PME françaises</li>
                    <li>• Conseils terrain de Laurent Serre</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-red-700 flex items-center gap-2">
                    ❌ Livres écartés
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-anthracite">
                    <li>• Théories sans application pratique</li>
                    <li>• Méthodes non adaptées aux PME</li>
                    <li>• Approches trop génériques</li>
                    <li>• Livres obsolètes ou dépassés</li>
                    <li>• Contenu non actionnable</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-mint-green/10 rounded-lg">
                <p className="text-sm text-gray-anthracite italic">
                  💡 <strong>Conseil Laurent Serre :</strong> Ne lisez pas tous ces livres d'un coup ! 
                  Choisissez 1-2 ouvrages par trimestre, appliquez les techniques, mesurez les résultats, 
                  puis passez au suivant. La transformation durable vient de l'application, pas de l'accumulation.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTAs multiples */}
        <AnimatedSection delay={500}>
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/70 rounded-2xl shadow-2xl p-6 border border-mint-green/20 backdrop-blur-sm">
                <div className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  🎓 Formation
                </div>
                <h4 className="text-xl font-bold text-blue-ink mb-3">
                  Bootcamp Commercial
                </h4>
                <p className="text-gray-anthracite mb-4 text-sm">
                  Appliquez concrètement les meilleures techniques de ces livres 
                  dans une formation intensive adaptée aux PME.
                </p>
                <Link 
                  href="/bootcamp-commercial-intensif" 
                  className="inline-block bg-mint-green text-blue-ink font-semibold px-6 py-3 rounded-full shadow hover:bg-mint-green/80 transition-colors duration-300"
                >
                  Découvrir le Bootcamp
                </Link>
              </div>
              
              <div className="bg-white/70 rounded-2xl shadow-2xl p-6 border border-blue-400/20 backdrop-blur-sm">
                <div className="inline-block bg-blue-500/20 text-blue-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  🤝 Accompagnement
                </div>
                <h4 className="text-xl font-bold text-blue-ink mb-3">
                  Coaching Personnalisé
                </h4>
                <p className="text-gray-anthracite mb-4 text-sm">
                  Transformez vos performances avec un accompagnement sur-mesure. Débriefing de vos négociations réelles, techniques avancées, mindset gagnant.
                </p>
                <Link 
                  href="/coach-commercial-entreprise"
                  className="inline-block bg-mint-green text-blue-ink font-semibold px-6 py-3 rounded-full shadow hover:bg-mint-green/80 transition-colors duration-300"
                >
                  Découvrir le Coaching
                </Link>
              </div>
              
              <div className="bg-white/70 rounded-2xl shadow-2xl p-6 border border-orange-400/20 backdrop-blur-sm">
                <div className="inline-block bg-orange-soft/20 text-orange-soft font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  📚 Ressources
                </div>
                <h4 className="text-xl font-bold text-blue-ink mb-3">
                  Guides Gratuits
                </h4>
                <p className="text-gray-anthracite mb-4 text-sm">
                  Synthèses pratiques et outils téléchargeables basés sur 
                  les meilleures techniques de ces livres.
                </p>
                <Link 
                  href="/ressources" 
                  className="inline-block bg-orange-soft text-blue-ink font-semibold px-6 py-3 rounded-full shadow hover:bg-orange-soft/80 transition-colors duration-300"
                >
                  Accéder aux Ressources
                </Link>
              </div>
            </div>
            
            <div className="mt-8">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-mint-green hover:text-mint-green/80 transition-colors duration-300"
              >
                <span>📝</span>
                <span>Voir aussi les articles du blog pour approfondir</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </main>
    </>
  );
}