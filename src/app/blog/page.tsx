import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Blog Développement Commercial - Conseils d\'Expert | Laurent Serre',
  description: 'Découvrez nos articles d\'expert sur le développement commercial, la formation des équipes de vente et les stratégies B2B. Conseils pratiques pour PME.',
  keywords: 'blog développement commercial, formation commerciale, stratégies vente B2B, conseils PME, expert commercial',
  alternates: {
    canonical: 'https://laurentserre.com/blog',
  },
  openGraph: {
    title: 'Blog Développement Commercial - Conseils d\'Expert',
    description: 'Découvrez nos articles d\'expert sur le développement commercial, la formation des équipes de vente et les stratégies B2B.',
    url: 'https://laurentserre.com/blog',
    type: 'website',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://laurentserre.com/erreurs-fatales.png',
        width: 1200,
        height: 630,
        alt: 'Blog développement commercial Laurent Serre',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Développement Commercial - Conseils d\'Expert',
    description: 'Découvrez nos articles d\'expert sur le développement commercial, la formation des équipes de vente et les stratégies B2B.',
    images: ['https://laurentserre.com/erreurs-fatales.png'],
  },
};

const blogPosts = [
  {
    slug: 'arrete-sur-mesure-tues-ton-business',
    title: 'Arrête le sur-mesure (tu tues ton business)',
    description: 'Le sur-mesure paralyse vos ventes. Découvrez comment packager votre expertise pour scaler avec 3 étapes actionnables.',
    date: '2026-01-12',
    readTime: '10 min',
    category: 'Stratégie',
    image: '/equipe_bureau.jpg',
    featured: true
  },
  {
    slug: 'closing-b2b-7-techniques',
    title: 'Closing B2B : 7 techniques qui marchent (+ scripts à copier)',
    description: 'Augmentez votre taux de closing en 90 jours sans forcer grâce au MAP, trial close, business case, POC cadré et 5 scripts copiables.',
    date: '2025-10-13',
    readTime: '12 min',
    category: 'Techniques de vente',
    image: '/images/closing_post.png',
    featured: true
  },
  {
    slug: 'accompagnement-equipes-commerciales-6-leviers-2025',
    title: 'Accompagnement des équipes commerciales : 6 leviers d\'expert pour booster vos ventes en 2025',
    description: 'Structuration, coaching, outils et méthode pour faire monter votre équipe en compétences et en performance, avec un guide pratique d\'externalisation.',
    date: '2025-09-30',
    readTime: '10 min',
    category: 'Management',
    image: '/accompagnement_commercial.png',
    featured: true
  },
  {
    slug: '7-etapes-transformer-non-en-oui-performant-2025',
    title: '7 étapes pour transformer un « non » frustrant en « oui » performant en 2025',
    description: 'Une méthode claire et moderne pour transformer chaque refus client en opportunité commerciale durable et efficace. Conseils pratiques, techniques d’écoute et outils IA pour performer en 2025.',
    date: '2025-07-11',
    readTime: '9 min',
    category: 'Techniques de vente',
    image: '/equipe_bureau.jpg',
    featured: true
  },
  {
    slug: '5-signes-structurer-equipe-commerciale',
    title: '5 signes qu\'il est temps de structurer votre équipe commerciale',
    description: 'Découvrez les signaux d\'alerte qui indiquent qu\'il est temps de passer à l\'étape supérieure dans l\'organisation de votre force de vente.',
    date: '2025-06-16',
    readTime: '8 min',
    category: 'Stratégie',
    image: '/equipe_bureau.jpg',
    featured: true,
  },
  {
    slug: 'ia-transforme-developpement-commercial-2025',
    title: 'Comment l\'IA transforme le développement commercial en 2025',
    description: 'L\'intelligence artificielle révolutionne la prospection, le scoring et le suivi client. Voici comment l\'intégrer efficacement.',
    date: '2025-06-03',
    readTime: '10 min',
    category: 'Innovation',
    image: '/tableau-de-bord.jpeg',
    featured: true,
  },
  {
    slug: 'erreurs-fatales-prospection-b2b',
    title: 'Les erreurs fatales dans la prospection B2B (et comment les éviter)',
    description: 'Analyse des erreurs les plus communes qui sabotent vos efforts de prospection et les solutions concrètes pour les éviter.',
    date: '2025-05-21',
    readTime: '12 min',
    category: 'Prospection',
    image: '/erreurs-fatales.png',
    featured: false,
  },
  {
    slug: 'bootcamp-commercial-pourquoi-formations-echouent',
    title: 'Bootcamp commercial : pourquoi 80% des formations échouent',
    description: 'Décryptage des raisons pour lesquelles la plupart des formations commerciales n\'atteignent pas leurs objectifs et notre approche différente.',
    date: '2025-05-03',
    readTime: '9 min',
    category: 'Formation',
    image: '/photo-formation.png',
    featured: false,
  },
  {
    slug: 'vendeur-commercial-transformation-decisive',
    title: 'De vendeur à commercial : la transformation qui change tout',
    description: 'Comprendre la différence fondamentale entre un vendeur et un commercial, et comment opérer cette transformation dans votre équipe.',
    date: '2025-04-18',
    readTime: '11 min',
    category: 'Management',
    image: '/equipedeface.jpg',
    featured: false,
  },
];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <main className="bg-primary-bg text-gray-dark">
      {/* Hero Section conforme */}
      <section className="min-h-screen relative overflow-hidden flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-ink via-blue-ink/95 to-mint-green/20"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-6 py-3 rounded-full">
              <span className="w-3 h-3 bg-mint-green rounded-full animate-pulse"></span>
              <span className="font-title font-semibold text-mint-green text-sm md:text-base">
                Expertise & Conseils
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-title font-extrabold text-white leading-tight drop-shadow-lg">
              <span className="text-white">Blog</span> <span className="text-mint-green">Développement Commercial</span>
            </h1>
            <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-body text-white/95 leading-relaxed drop-shadow-md px-2">
                Découvrez nos conseils d'expert pour développer votre activité commerciale, structurer vos équipes et optimiser vos performances de vente.
              </p>
              <p className="text-base sm:text-lg md:text-xl font-italic text-white/90 leading-relaxed drop-shadow-sm px-2">
                Analyses, méthodes, retours terrain et innovations pour booster votre business B2B.
              </p>
            </div>
            {/* Boutons d'appel à l'action */}
            <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row justify-center items-center pt-6 sm:pt-8 pb-12 sm:pb-16 px-4">
              <Link href="/diagnostic">
                <Button 
                  variant="primary"
                  size="lg"
                  icon="🎯"
                  className="w-full sm:w-auto"
                >
                  Diagnostic gratuit
                </Button>
              </Link>
              <Link href="/bootcamp">
                <Button 
                  variant="outline"
                  size="lg"
                  icon="🚀"
                  className="w-full sm:w-auto"
                >
                  Découvrir le bootcamp
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Articles en vedette */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-12">
            Articles en vedette
          </h2>
          
          <div className="grid gap-8 lg:grid-cols-2">
            {featuredPosts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative overflow-hidden rounded-2xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-mint-green text-white">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('fr-FR', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </time>
                      <span>•</span>
                      <span>{post.readTime} de lecture</span>
                    </div>
                    
                    <h3 className="text-xl font-title font-semibold text-blue-ink mb-3 group-hover:text-mint-green transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tous les articles */}
      <section className="py-16 bg-primary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-12">
            Tous les articles
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-ink text-white">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('fr-FR', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </time>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-lg font-title font-semibold text-blue-ink mb-2 group-hover:text-mint-green transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-8 text-center">
            Prendre contact avec Laurent Serre
          </h2>
          <HubSpotForm />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-ink to-blue-ink/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-title font-bold text-white mb-4">
            Prêt à transformer votre équipe commerciale ?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Découvrez comment notre approche peut améliorer durablement 
            les performances commerciales de votre entreprise.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/diagnostic" 
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors"
            >
              Diagnostic gratuit
            </Link>
            <Link 
              href="/bootcamp" 
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors"
            >
              Découvrir le bootcamp
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
