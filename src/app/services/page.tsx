import type { Metadata } from 'next';
import { ArrowRight, Users, TrendingUp, Target, Award, CheckCircle, Star } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services Développement Commercial PME | Laurent Serre - Formation & Coaching',
  description: 'Découvrez tous nos services spécialisés en développement commercial PME : formation, coaching, transformation commerciale et accompagnement personnalisé.',
  keywords: 'services développement commercial PME, formation commerciale, coaching commercial, transformation commerciale, consultant commercial',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://laurentserre.com/services',
  },
  openGraph: {
    title: 'Services Développement Commercial PME | Laurent Serre',
    description: 'Tous nos services spécialisés en développement commercial PME pour transformer vos performances.',
    url: 'https://laurentserre.com/services',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesPage() {
  const services = [
    {
      title: "Formation Commerciale PME",
      description: "Formations spécialisées adaptées aux enjeux et contraintes des PME. Développement des compétences commerciales avec un ROI mesurable.",
      href: "/formation-commerciale-pme",
      icon: Users,
      color: "from-blue-500 to-mint-green",
      features: ["Formation sur-mesure", "Outils pratiques", "Suivi post-formation", "ROI garanti"]
    },
    {
      title: "Coach Commercial Entreprise", 
      description: "Accompagnement personnalisé de vos commerciaux avec coaching individuel et collectif pour développer les performances durablement.",
      href: "/coach-commercial-entreprise",
      icon: Target,
      color: "from-mint-green to-orange-soft",
      features: ["Coaching individuel", "Coaching équipe", "Accompagnement terrain", "Résultats mesurables"]
    },
    {
      title: "Transformation Commerciale",
      description: "Accompagnement global pour transformer votre organisation commerciale, digitaliser vos processus et optimiser vos performances.",
      href: "/transformation-commerciale", 
      icon: TrendingUp,
      color: "from-orange-soft to-blue-500",
      features: ["Diagnostic complet", "Stratégie sur-mesure", "Digitalisation", "Transformation durable"]
    },
    {
      title: "Consultant Commercial Montpellier",
      description: "Intervention locale sur Montpellier et région Occitanie pour un accompagnement de proximité adapté à votre territoire.",
      href: "/consultant-commercial-montpellier",
      icon: Award,
      color: "from-blue-500 to-mint-green",
      features: ["Proximité géographique", "Connaissance terrain", "Intervention rapide", "Réseau local"]
    },
    {
      title: "Formateur Vente PME",
      description: "Expertise en formation commerciale spécifiquement conçue pour les PME avec méthodes éprouvées et outils adaptés.",
      href: "/formateur-vente-pme",
      icon: Star,
      color: "from-mint-green to-orange-soft",
      features: ["Expertise PME", "Méthodes éprouvées", "Formations certifiantes", "Accompagnement long terme"]
    }
  ];

  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-gray-anthracite">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
              <Users className="w-5 h-5 text-mint-green" />
              <span className="font-title font-semibold text-white">
                Services Spécialisés PME
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-title font-extrabold text-white leading-tight mb-6">
              Tous nos Services
              <span className="block text-mint-green">Développement Commercial</span>
            </h1>
            
            <p className="text-xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8">
              Découvrez notre gamme complète de services spécialement conçus pour transformer 
              la performance commerciale des PME. De la formation au coaching, en passant par 
              l'accompagnement transformation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/expert-developpement-commercial-pme" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                <Award className="w-5 h-5 mr-2" />
                Découvrir l'Expert
              </Link>
              <Link href="/diagnostic" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
                <Target className="w-5 h-5 mr-2" />
                Diagnostic Gratuit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-gray-anthracite/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
              5 Services d'Excellence
            </h2>
            <p className="text-xl text-gray-anthracite dark:text-primary-bg/80 max-w-2xl mx-auto">
              Chaque service est pensé pour répondre aux besoins spécifiques des PME 
              avec un accompagnement personnalisé et des résultats mesurables.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Link 
                  key={service.href}
                  href={service.href}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4 group-hover:text-mint-green transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-anthracite dark:text-primary-bg/80 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <CheckCircle className="w-4 h-4 text-mint-green mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-mint-green font-semibold group-hover:translate-x-2 transition-transform">
                      En savoir plus
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expert Section */}
      <section className="py-20 bg-slate-50 dark:bg-gray-anthracite/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
            Un Expert à Votre Service
          </h2>
          <p className="text-xl text-gray-anthracite dark:text-primary-bg/80 mb-8 max-w-2xl mx-auto">
            <Link href="/expert-developpement-commercial-pme" className="text-mint-green hover:underline font-semibold">
              Laurent Serre, expert développement commercial PME
            </Link>{" "}
            vous accompagne avec 20 ans d'expérience terrain pour transformer 
            durablement vos performances commerciales.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/expert-developpement-commercial-pme" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Award className="w-5 h-5 mr-2" />
              Découvrir l'Expert
            </Link>
            <Link href="/cas-clients" className="inline-flex items-center border-2 border-mint-green text-mint-green hover:bg-mint-green hover:text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Star className="w-5 h-5 mr-2" />
              Voir les Résultats
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}