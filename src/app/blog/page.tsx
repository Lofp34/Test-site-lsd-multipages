import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

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
        url: 'https://laurentserre.com/equipedeface.jpg',
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
    images: ['https://laurentserre.com/equipedeface.jpg'],
  },
};

const blogPosts = [
  {
    slug: '5-signes-structurer-equipe-commerciale',
    title: '5 signes qu\'il est temps de structurer votre équipe commerciale',
    description: 'Découvrez les signaux d\'alerte qui indiquent qu\'il est temps de passer à l\'étape supérieure dans l\'organisation de votre force de vente.',
    date: '2025-01-15',
    readTime: '8 min',
    category: 'Stratégie',
    image: '/equipe_bureau.jpg',
    featured: true,
  },
  {
    slug: 'ia-transforme-developpement-commercial-2025',
    title: 'Comment l\'IA transforme le développement commercial en 2025',
    description: 'L\'intelligence artificielle révolutionne la prospection, le scoring et le suivi client. Voici comment l\'intégrer efficacement.',
    date: '2025-01-10',
    readTime: '10 min',
    category: 'Innovation',
    image: '/tableau-de-bord.jpeg',
    featured: true,
  },
  {
    slug: 'erreurs-fatales-prospection-b2b',
    title: 'Les erreurs fatales dans la prospection B2B (et comment les éviter)',
    description: 'Analyse des erreurs les plus communes qui sabotent vos efforts de prospection et les solutions concrètes pour les éviter.',
    date: '2025-01-05',
    readTime: '12 min',
    category: 'Prospection',
    image: '/equipedeface.jpg',
    featured: false,
  },
  {
    slug: 'bootcamp-commercial-pourquoi-formations-echouent',
    title: 'Bootcamp commercial : pourquoi 80% des formations échouent',
    description: 'Décryptage des raisons pour lesquelles la plupart des formations commerciales n\'atteignent pas leurs objectifs et notre approche différente.',
    date: '2024-12-28',
    readTime: '9 min',
    category: 'Formation',
    image: '/equipe_bureau.jpg',
    featured: false,
  },
  {
    slug: 'vendeur-commercial-transformation-decisive',
    title: 'De vendeur à commercial : la transformation qui change tout',
    description: 'Comprendre la différence fondamentale entre un vendeur et un commercial, et comment opérer cette transformation dans votre équipe.',
    date: '2024-12-20',
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
    <main className="bg-primary-bg dark:bg-gray-dark text-gray-dark dark:text-primary-bg">
      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-6 py-3 rounded-full mb-8">
              <span className="w-3 h-3 bg-mint-green rounded-full animate-pulse"></span>
              <span className="font-title font-semibold text-mint-green text-sm md:text-base">
                Expertise & Conseils
              </span>
            </div>
            
            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink dark:text-white sm:text-6xl">
              Blog Développement Commercial
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Découvrez nos conseils d'expert pour développer votre activité commerciale, 
              structurer vos équipes et optimiser vos performances de vente.
            </p>
            <div className="mt-4 w-24 h-1.5 bg-mint-green rounded-full mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Articles en vedette */}
      <section className="py-16 bg-white dark:bg-gray-anthracite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mb-12">
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
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-mint-green text-white">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
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
                    
                    <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-white mb-3 group-hover:text-mint-green transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mb-12">
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
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-ink text-white">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-2">
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
                    
                    <h3 className="text-lg font-title font-semibold text-blue-ink dark:text-white mb-2 group-hover:text-mint-green transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
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