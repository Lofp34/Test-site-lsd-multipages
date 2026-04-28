import type { Metadata } from 'next';
import { ArrowRight, Target, Users, TrendingUp, Award, CheckCircle, Star, Crown, Zap, Phone, Mail, Calendar, BarChart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import StructuredData from '@/components/StructuredData';
import FAQ from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'Expert Développement Commercial PME | Laurent Serre - 20 ans d\'Expérience Terrain',
  description: 'Laurent Serre, expert développement commercial PME depuis 20 ans. Formation, accompagnement et transformation des équipes commerciales. Méthodes terrain éprouvées, résultats mesurables.',
  keywords: 'expert développement commercial PME, consultant commercial PME, formation commerciale PME, accompagnement commercial PME, structuration équipe commerciale, Laurent Serre expert commercial',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://www.laurentserre.com/expert-developpement-commercial-pme',
  },
  openGraph: {
    title: 'Expert Développement Commercial PME | Laurent Serre - 20 ans d\'Expérience Terrain',
    description: 'Expert développement commercial PME depuis 20 ans. Formation, accompagnement et transformation des équipes commerciales avec résultats mesurables.',
    url: 'https://www.laurentserre.com/expert-developpement-commercial-pme',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
    images: [
      {
        url: 'https://www.laurentserre.com/laurent.jpg',
        width: 1200,
        height: 630,
        alt: 'Laurent Serre - Expert Développement Commercial PME',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Développement Commercial PME | Laurent Serre',
    description: 'Expert développement commercial PME depuis 20 ans. Méthodes terrain éprouvées, résultats mesurables.',
    images: ['https://www.laurentserre.com/laurent.jpg'],
    creator: '@laurentserre',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

export default function ExpertDeveloppementCommercialPMEPage() {
  return (
    <>
      <StructuredData type="person" />
      <StructuredData type="organization" />
      <StructuredData 
        type="service" 
        data={{
          name: "Expert Développement Commercial PME",
          description: "Accompagnement complet pour transformer la performance commerciale des PME avec formation, coaching et stratégies sur-mesure",
          price: "Sur devis"
        }}
      />
      <StructuredData 
        type="breadcrumb" 
        data={[
          { name: "Accueil", url: "/" },
          { name: "Expert Développement Commercial PME", url: "/expert-developpement-commercial-pme" }
        ]}
      />
      
      <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-[80vh] relative overflow-hidden flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/laurent.jpg"
            alt="Laurent Serre, expert développement commercial PME"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-blue-ink/70"></div>
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-mint-green rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-soft rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex justify-center lg:justify-start">
                <div className="flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-6 py-3 rounded-full text-center">
                  <Award className="w-5 h-5 text-mint-green" />
                  <span className="font-title font-semibold text-mint-green">
                    Expert Développement Commercial • 20 ans d'Expérience
                  </span>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-title font-extrabold text-white leading-tight text-center lg:text-left">
                Expert Développement Commercial
                <span className="block text-mint-green">PME</span>
              </h1>
              
              <p className="text-xl text-white/95 leading-relaxed text-center lg:text-left">
                Laurent Serre accompagne les PME dans leur transformation commerciale depuis 20 ans. 
                De la <Link href="/formation-commerciale-pme" className="text-mint-green hover:underline">formation des équipes</Link> à la 
                <Link href="/transformation-commerciale" className="text-mint-green hover:underline"> structuration des processus</Link>, 
                des méthodes terrain éprouvées pour des résultats mesurables.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                  <Target className="w-5 h-5 mr-2" />
                  Diagnostic Gratuit
                </Link>
                <Link href="/cas-clients" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
                  <Star className="w-5 h-5 mr-2" />
                  Voir les Résultats
                </Link>
              </div>
            </div>
            
            <div className="lg:pl-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-title font-bold text-white mb-6">En Chiffres</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-mint-green">20</div>
                    <div className="text-white/80">Ans d'Expérience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-mint-green">500+</div>
                    <div className="text-white/80">PME Accompagnées</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-mint-green">+17%</div>
                    <div className="text-white/80">CA Moyen Client</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-mint-green">98%</div>
                    <div className="text-white/80">Taux Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Domaines d'Expertise */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink mb-6">
              4 Domaines d'Expertise Reconnus
            </h2>
            <p className="text-xl text-gray-anthracite max-w-3xl mx-auto">
              Une approche complète du développement commercial, de la formation individuelle 
              à la transformation organisationnelle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Formation & Développement */}
            <div className="bg-white rounded-2xl p-8 text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-mint-green/20 transition-colors">
                <Users className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Formation & Développement
              </h3>
              <p className="text-gray-anthracite mb-6">
                Découvrez notre <Link href="/bootcamp" className="text-mint-green hover:underline">bootcamp commercial intensif</Link> 
                et nos <Link href="/ressources" className="text-mint-green hover:underline">guides pratiques</Link> pour transformer vos équipes.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/ressources/guide-prospection" className="hover:text-mint-green">Formation prospection avancée</Link>
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/ressources/guide-closing" className="hover:text-mint-green">Techniques de closing</Link>
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/formation-commerciale-pme#management-details" className="hover:text-mint-green">Management commercial</Link>
                </div>
              </div>
            </div>

            {/* Accompagnement & Transformation */}
            <div className="bg-white rounded-2xl p-8 text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-mint-green/20 transition-colors">
                <TrendingUp className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Accompagnement & Transformation
              </h3>
              <p className="text-gray-anthracite mb-6">
                De l'<Link href="/diagnostic" className="text-mint-green hover:underline">audit initial</Link> à la mise en place 
                de <Link href="/ressources/outil-strategie-commerciale" className="text-mint-green hover:underline">stratégies sur-mesure</Link>, 
                un accompagnement complet pour transformer votre performance.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/diagnostic" className="hover:text-mint-green">Diagnostic commercial gratuit</Link>
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/transformation-commerciale" className="hover:text-mint-green">Transformation processus</Link>
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/suivi-performance" className="hover:text-mint-green">Suivi performance</Link>
                </div>
              </div>
            </div>

            {/* Spécialisations Métier */}
            <div className="bg-white rounded-2xl p-8 text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-mint-green/20 transition-colors">
                <Crown className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Spécialisations Métier
              </h3>
              <p className="text-gray-anthracite mb-6">
                Expertise <Link href="/ressources/kit-gestion-grands-comptes" className="text-mint-green hover:underline">grands comptes</Link>, 
                <Link href="/ressources/guide-prospection" className="text-mint-green hover:underline"> génération de leads</Link> et 
                <Link href="/ressources/guide-closing" className="text-mint-green hover:underline"> techniques de closing</Link> avancées.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/ressources/kit-gestion-grands-comptes" className="hover:text-mint-green">Gestion grands comptes</Link>
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/ressources/outil-preparation-rdv" className="hover:text-mint-green">Préparation RDV</Link>
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/ressources/outil-offre-5-etoiles" className="hover:text-mint-green">Offres percutantes</Link>
                </div>
              </div>
            </div>

            {/* Innovation & Technologies */}
            <div className="bg-white rounded-2xl p-8 text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-mint-green/20 transition-colors">
                <Zap className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Innovation & Technologies
              </h3>
              <p className="text-gray-anthracite mb-6">
                Intégration de l'<Link href="/blog/ia-transforme-developpement-commercial-2025" className="text-mint-green hover:underline">IA dans la vente</Link> et 
                <Link href="/suivi-performance" className="text-mint-green hover:underline"> approches data-driven</Link> pour 
                optimiser vos performances commerciales.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/blog/ia-transforme-developpement-commercial-2025" className="hover:text-mint-green">IA & Commercial 2025</Link>
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/ressources/outil-strategie-commerciale" className="hover:text-mint-green">CRM intelligent</Link>
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/ressources/guide-prospection" className="hover:text-mint-green">Automation prospection</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Méthode & Résultats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-title font-bold text-blue-ink mb-8">
                Une Méthode Terrain Éprouvée
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-mint-green font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-ink mb-2">Diagnostic Complet</h3>
                    <p className="text-gray-anthracite">
                      Audit approfondi de votre organisation commerciale, processus et équipes pour identifier 
                      les leviers de performance prioritaires.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-mint-green font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-ink mb-2">Stratégie Sur-Mesure</h3>
                    <p className="text-gray-anthracite">
                      Conception d'un plan d'action adapté à votre secteur, vos enjeux et vos objectifs de croissance. 
                      Aucune solution générique.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-mint-green font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-ink mb-2">Implémentation Guidée</h3>
                    <p className="text-gray-anthracite">
                      Accompagnement terrain pour la mise en œuvre : formation, coaching, suivi des résultats 
                      et ajustements en temps réel.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-mint-green font-bold text-lg">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-ink mb-2">Autonomisation</h3>
                    <p className="text-gray-anthracite">
                      Transfert de compétences et d'outils pour rendre vos équipes autonomes et maintenir 
                      la performance dans le temps.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-6">
                Résultats Clients Moyens
              </h3>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-mint-green mb-2">+26%</div>
                  <div className="text-gray-anthracite">Chiffre d'Affaires</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-mint-green mb-2">-40%</div>
                  <div className="text-gray-anthracite">Cycle Vente</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-mint-green mb-2">+32%</div>
                  <div className="text-gray-anthracite">Leads Qualifiés</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-mint-green mb-2">98%</div>
                  <div className="text-gray-anthracite">Satisfaction</div>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-6">
                <h4 className="font-semibold text-blue-ink mb-3">Témoignage Client</h4>
                <p className="text-gray-anthracite italic mb-3">
                  "En 18 mois, Laurent a transformé notre approche commerciale. Notre CA a doublé 
                  et nos équipes sont enfin autonomes et motivées."
                </p>
                <div className="text-sm text-mint-green font-semibold">
                  Direction PME Industrie • 45 collaborateurs
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Autres Services */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-title font-bold text-blue-ink text-center mb-12">
            Nos Autres Expertises Complémentaires
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/consultant-commercial-montpellier" className="group cursor-pointer">
              <div className="bg-white rounded-xl p-6 hover:shadow-xl hover:bg-mint-green/5 border-2 border-transparent hover:border-mint-green/20 transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02]">
                <div className="flex items-center mb-4">
                  <Phone className="w-6 h-6 text-mint-green mr-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green transition-colors">
                    Consultant Commercial Montpellier
                  </h3>
                  <ArrowRight className="w-5 h-5 text-mint-green ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-gray-anthracite group-hover:text-gray-800:text-primary-bg">
                  Intervention locale sur Montpellier et région Occitanie pour un accompagnement de proximité.
                </p>
                <div className="mt-4 text-mint-green font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  → Découvrir l'expertise locale
                </div>
              </div>
            </Link>

            <Link href="/formateur-vente-pme" className="group cursor-pointer">
              <div className="bg-white rounded-xl p-6 hover:shadow-xl hover:bg-mint-green/5 border-2 border-transparent hover:border-mint-green/20 transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02]">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-mint-green mr-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green transition-colors">
                    Formateur Vente PME
                  </h3>
                  <ArrowRight className="w-5 h-5 text-mint-green ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-gray-anthracite group-hover:text-gray-800:text-primary-bg">
                  Formations spécialisées adaptées aux spécificités et contraintes des PME.
                </p>
                <div className="mt-4 text-mint-green font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  → Voir les formations disponibles
                </div>
              </div>
            </Link>

            <Link href="/coach-commercial-entreprise" className="group cursor-pointer">
              <div className="bg-white rounded-xl p-6 hover:shadow-xl hover:bg-mint-green/5 border-2 border-transparent hover:border-mint-green/20 transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02]">
                <div className="flex items-center mb-4">
                  <Target className="w-6 h-6 text-mint-green mr-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green transition-colors">
                    Coach Commercial Entreprise
                  </h3>
                  <ArrowRight className="w-5 h-5 text-mint-green ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-gray-anthracite group-hover:text-gray-800:text-primary-bg">
                  Coaching individuel et collectif pour développer les performances de vos commerciaux.
                </p>
                <div className="mt-4 text-mint-green font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  → Découvrir le coaching commercial
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ 
        title="Questions Fréquentes sur l'Expert Développement Commercial PME"
        description="Trouvez toutes les réponses à vos questions sur notre accompagnement en développement commercial spécialisé PME"
        items={[
          {
            question: "Qu'est-ce qui différencie un expert développement commercial PME d'un consultant généraliste ?",
            answer: "Un expert développement commercial PME maîtrise spécifiquement les enjeux, contraintes et opportunités des PME : budgets limités, équipes restreintes, besoin de résultats rapides. Laurent Serre développe des méthodes adaptées aux ressources PME, avec un ROI mesurable et une approche terrain pragmatique, contrairement aux consultants généralistes qui appliquent souvent des méthodes standardisées."
          },
          {
            question: "Combien de temps faut-il pour voir les premiers résultats en développement commercial PME ?",
            answer: "Les premiers résultats apparaissent généralement sous 2-3 mois avec l'augmentation du nombre de prospects qualifiés et l'amélioration du taux de conversion. Les résultats significatifs sur le chiffre d'affaires se concrétisent entre 6 et 12 mois. La formation des équipes et l'optimisation des processus permettent des gains immédiats en efficacité commerciale."
          },
          {
            question: "Quelle est la différence entre formation commerciale et accompagnement en développement commercial ?",
            answer: "La formation commerciale transmet des compétences et techniques de vente. L'accompagnement en développement commercial est plus global : diagnostic, stratégie, structuration des processus, formation, coaching terrain et suivi des résultats. C'est une transformation complète de votre approche commerciale, pas seulement un transfert de compétences."
          },
          {
            question: "Comment mesurer le ROI d'un accompagnement en développement commercial PME ?",
            answer: "Le ROI se mesure sur plusieurs indicateurs : augmentation du chiffre d'affaires, amélioration du taux de conversion, réduction du cycle de vente, augmentation du panier moyen, amélioration de la fidélisation client. En moyenne, nos clients PME observent un ROI de 300-500% sur 18 mois avec un retour sur investissement dès les 6 premiers mois."
          },
          {
            question: "L'expert développement commercial peut-il intervenir dans tous les secteurs d'activité PME ?",
            answer: "Laurent Serre a accompagné des PME dans plus de 50 secteurs différents : industrie, services B2B, nouvelles technologies, commerce, artisanat. La méthodologie de développement commercial s'adapte à chaque secteur avec des spécificités techniques et commerciales. L'expertise PME transcende les secteurs d'activité."
          },
          {
            question: "Quelle est la taille d'équipe idéale pour faire appel à un expert développement commercial PME ?",
            answer: "L'accompagnement est pertinent dès 1 commercial et jusqu'à 50 commerciaux. Pour les équipes de 1-5 commerciaux, l'accent est mis sur l'efficacité individuelle et les processus. Pour 5-20 commerciaux, on ajoute le management et la structuration. Au-delà de 20, on intègre la stratégie organisationnelle et le pilotage de la performance."
          },
          {
            question: "Comment se déroule concrètement un accompagnement avec l'expert développement commercial PME ?",
            answer: "L'accompagnement débute par un diagnostic gratuit de 30 minutes, suivi d'un audit approfondi sur 2-3 jours. Puis conception d'un plan d'action sur-mesure avec phases de formation, coaching terrain, mise en place d'outils et suivi des résultats. Intervention mensuelle avec points réguliers et ajustements selon les résultats obtenus."
          },
          {
            question: "Quels outils et méthodes utilise l'expert développement commercial pour les PME ?",
            answer: "Utilisation d'outils adaptés aux PME : CRM simplifié, tableaux de bord visuels, scripts de prospection, grilles de qualification, méthodes de closing éprouvées, outils de préparation RDV, kits grands comptes. Tous les outils sont pensés pour être facilement appropriables par les équipes PME sans formation technique complexe."
          }
        ]}
      />

      {/* CTA Final */}
      <section className="py-20 bg-blue-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-title font-bold text-white mb-6">
            Prêt à Transformer Votre Performance Commerciale ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Bénéficiez de 20 ans d'expérience terrain pour développer durablement votre chiffre d'affaires.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Calendar className="w-5 h-5 mr-2" />
              Diagnostic Gratuit 30min
            </Link>
            <Link href="/contact" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
              <Mail className="w-5 h-5 mr-2" />
              Nous Contacter
            </Link>
          </div>
          
          <div className="mt-8 text-white/70 text-sm">
            🏆 95% de clients satisfaits • ⚡ Résultats en moins de 6 mois • 💎 Méthodes exclusives terrain
          </div>
        </div>
      </section>
    </main>
    </>
  );
}