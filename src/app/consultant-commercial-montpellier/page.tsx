import type { Metadata } from 'next';
import { MapPin, Phone, Target, Users, Award, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Consultant Commercial Montpellier | Laurent Serre - Expert Local PME',
  description: 'Consultant commercial Montpellier pour PME. Laurent Serre intervient en région Occitanie pour formations, accompagnement et transformation commerciale.',
  keywords: 'consultant commercial Montpellier, conseil commercial Montpellier, expert commercial Occitanie, formation commerciale Montpellier, développement commercial Hérault',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://www.laurentserre.com/consultant-commercial-montpellier',
  },
  openGraph: {
    title: 'Consultant Commercial Montpellier | Laurent Serre - Expert Local PME',
    description: 'Consultant commercial Montpellier pour PME. Expert local en développement commercial région Occitanie.',
    url: 'https://www.laurentserre.com/consultant-commercial-montpellier',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ConsultantCommercialMontpellierPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* JSON-LD LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Laurent Serre Développement — Consultant Commercial Montpellier",
            "url": "https://www.laurentserre.com/consultant-commercial-montpellier",
            "image": "https://www.laurentserre.com/laurent.jpg",
            "description": "Consultant commercial Montpellier pour PME. Laurent Serre intervient en région Occitanie pour formations, accompagnement et transformation commerciale.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "FR",
              "addressRegion": "Occitanie",
              "addressLocality": "Mauguio",
              "postalCode": "34130",
              "streetAddress": "259, rue de la lavande"
            },
            "areaServed": [
              { "@type": "City", "name": "Montpellier" },
              { "@type": "City", "name": "Béziers" },
              { "@type": "City", "name": "Sète" },
              { "@type": "City", "name": "Nîmes" },
              { "@type": "City", "name": "Perpignan" },
              { "@type": "City", "name": "Toulouse" },
              { "@type": "AdministrativeArea", "name": "Occitanie" }
            ],
            "priceRange": "€€",
            "telephone": "+33 6 14 94 40 60",
            "sameAs": [
              "https://www.linkedin.com/in/laurentserre34/",
              "https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/"
            ]
          })
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
              <MapPin className="w-5 h-5 text-mint-green" />
              <span className="font-title font-semibold text-white">
                Consultant Commercial Montpellier
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-title font-extrabold text-white leading-tight mb-6">
              Consultant Commercial
              <span className="block text-mint-green">Montpellier</span>
            </h1>
            
            <p className="text-xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8">
              <Link href="/expert-developpement-commercial-pme" className="text-mint-green hover:underline">Laurent Serre, expert développement commercial PME</Link>, 
              intervient sur Montpellier et région Occitanie. Un accompagnement de proximité pour 
              <Link href="/formation-commerciale-pme" className="text-mint-green hover:underline"> former vos équipes</Link> et 
              <Link href="/transformation-commerciale" className="text-mint-green hover:underline"> transformer votre performance</Link> commerciale.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                <Target className="w-5 h-5 mr-2" />
                Diagnostic Gratuit Montpellier
              </Link>
              <Link href="/contact" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
                <Phone className="w-5 h-5 mr-2" />
                Rendez-vous Local
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Zone d'Intervention */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-title font-bold text-blue-ink mb-8">
                Intervention Région Occitanie
              </h2>
              <p className="text-xl text-gray-anthracite mb-8">
                Basé à Montpellier, j'interviens dans toute la région Occitanie pour accompagner 
                les PME dans leur développement commercial.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-mint-green" />
                  <div>
                    <strong>Montpellier et Métropole :</strong> Interventions régulières sur l'ensemble de la métropole
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-mint-green" />
                  <div>
                    <strong>Hérault (34) :</strong> Béziers, Sète, Lunel, Lodève et communes environnantes
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-mint-green" />
                  <div>
                    <strong>Région élargie :</strong> Nîmes, Perpignan, Toulouse, Marseille sur demande
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-mint-green" />
                  <div>
                    <strong>Accompagnement hybride :</strong> Présentiel local + suivi à distance optimisé
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-6">
                Avantages de l'Accompagnement Local
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white/50 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-ink mb-2">Proximité Géographique</h4>
                  <p className="text-sm text-gray-anthracite">
                    Interventions terrain facilitées, réactivité maximale et meilleure compréhension du marché local.
                  </p>
                </div>
                
                <div className="bg-white/50 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-ink mb-2">Connaissance du Marché</h4>
                  <p className="text-sm text-gray-anthracite">
                    Expertise des spécificités économiques de la région Occitanie et de ses secteurs porteurs.
                  </p>
                </div>
                
                <div className="bg-white/50 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-ink mb-2">Réseau Local</h4>
                  <p className="text-sm text-gray-anthracite">
                    Mise en relation avec des partenaires locaux et opportunités business de la région.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-mint-green/10 rounded-xl">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 text-mint-green mr-2" />
                  <span className="font-semibold text-blue-ink">Secteurs Privilégiés</span>
                </div>
                <p className="text-sm text-gray-anthracite">
                  Tech, Santé, Services, Industrie, BTP, Commerce - spécialisation PME 10 à 250 salariés
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Locaux */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-6">
              Services Consultant Commercial Montpellier
            </h2>
            <p className="text-xl text-gray-anthracite max-w-2xl mx-auto">
              Un accompagnement complet adapté aux PME de la région Occitanie
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-mint-green" />
              </div>
              <h3 className="text-lg font-semibold text-blue-ink mb-3">
                Formations Commerciales PME
              </h3>
              <p className="text-gray-anthracite mb-4">
                <Link href="/formation-commerciale-pme" className="text-mint-green hover:underline">Formations spécialisées PME</Link> 
                directement dans vos locaux à Montpellier ou en région.
              </p>
              <ul className="text-sm space-y-1">
                <li>• <Link href="/ressources/guide-prospection" className="text-mint-green hover:underline">Formation prospection</Link></li>
                <li>• <Link href="/ressources/guide-closing" className="text-mint-green hover:underline">Techniques de closing</Link></li>
                <li>• Management commercial</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-mint-green" />
              </div>
              <h3 className="text-lg font-semibold text-blue-ink mb-3">
                Accompagnement Transformation
              </h3>
              <p className="text-gray-anthracite mb-4">
                <Link href="/transformation-commerciale" className="text-mint-green hover:underline">Transformation complète</Link> 
                de votre organisation commerciale avec suivi terrain régulier.
              </p>
              <ul className="text-sm space-y-1">
                <li>• <Link href="/diagnostic" className="text-mint-green hover:underline">Diagnostic sur site</Link></li>
                <li>• Restructuration équipes</li>
                <li>• Optimisation processus</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-mint-green" />
              </div>
              <h3 className="text-lg font-semibold text-blue-ink mb-3">
                Coaching Commercial
              </h3>
              <p className="text-gray-anthracite mb-4">
                <Link href="/coach-commercial-entreprise" className="text-mint-green hover:underline">Coaching personnalisé</Link> 
                de vos commerciaux avec accompagnement terrain Montpellier.
              </p>
              <ul className="text-sm space-y-1">
                <li>• Coaching individuel</li>
                <li>• Accompagnement RDV clients</li>
                <li>• Montée en compétences</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Références Locales */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-6">
              Références Montpellier & Région
            </h2>
            <p className="text-xl text-gray-anthracite max-w-2xl mx-auto">
              Des PME locales qui ont transformé leur performance commerciale
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-xl p-8">
              <blockquote className="text-lg text-gray-anthracite italic mb-6">
                "Laurent nous a accompagnés sur 18 mois pour restructurer notre équipe commerciale. 
                Grâce à son expertise locale et sa connaissance du marché montpelliérain, 
                nous avons doublé notre CA et renforcé notre position."
              </blockquote>
              <div className="text-mint-green font-semibold mb-2">
                PME Tech Montpellier • 35 collaborateurs
              </div>
              <div className="text-sm text-gray-500">
                Secteur : Solutions digitales B2B
              </div>
            </div>

            <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-xl p-8">
              <blockquote className="text-lg text-gray-anthracite italic mb-6">
                "Formations très concrètes adaptées à notre réalité PME. 
                Laurent connaît parfaitement les enjeux des entreprises de notre région. 
                Nos commerciaux sont maintenant beaucoup plus efficaces."
              </blockquote>
              <div className="text-mint-green font-semibold mb-2">
                PME Services Béziers • 22 collaborateurs
              </div>
              <div className="text-sm text-gray-500">
                Secteur : Services aux entreprises
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-3">
              <MapPin className="w-5 h-5 text-mint-green mr-2" />
              <span className="text-gray-anthracite font-medium">
                Basé à Montpellier • Interventions régulières sur toute la région Occitanie
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Local */}
      <section className="py-20 bg-blue-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-title font-bold text-white mb-6">
            Consultant Commercial Expert à Montpellier
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Bénéficiez d'un accompagnement de proximité avec 
            <Link href="/expert-developpement-commercial-pme" className="text-mint-green hover:underline"> Laurent Serre</Link>, 
            consultant commercial expert basé sur Montpellier.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Target className="w-5 h-5 mr-2" />
              Diagnostic Gratuit sur Site
            </Link>
            <Link href="/contact" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
              <Phone className="w-5 h-5 mr-2" />
              Rendez-vous Montpellier
            </Link>
          </div>

          <div className="text-white/70 text-sm">
            📍 Montpellier • 📞 Réponse sous 24h • 🚀 Premier RDV gratuit
          </div>
        </div>
      </section>
    </main>
  );
}