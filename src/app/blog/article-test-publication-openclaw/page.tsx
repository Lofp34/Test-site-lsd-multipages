import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Article test de publication OpenClaw | Laurent Serre',
  description:
    'Article de test publié automatiquement depuis le dépôt GitHub pour valider le workflow de publication du blog Laurent Serre.',
  keywords:
    'test publication blog, github, openclaw, workflow, article test, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/article-test-publication-openclaw',
  },
  openGraph: {
    title: 'Article test de publication OpenClaw',
    description:
      'Validation du flux de publication automatique du blog via commit et push GitHub.',
    url: 'https://www.laurentserre.com/blog/article-test-publication-openclaw',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-04-07-test-publication-openclaw-hero.jpg',
        width: 1600,
        height: 900,
        alt: 'Visuel de test pour la publication automatique du blog Laurent Serre',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Article test de publication OpenClaw',
    description:
      'Test technique pour valider la publication automatique d’un article de blog via GitHub.',
    images: ['https://www.laurentserre.com/images/blog/2026-04-07-test-publication-openclaw-hero.jpg'],
  },
};

export default function ArticleTestPublicationOpenClawPage() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-orange-soft/10 backdrop-blur-sm border border-orange-soft/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-orange-soft text-sm">Test technique</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Article test de publication OpenClaw
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-04-07">7 avril 2026</time>
              <span>•</span>
              <span>3 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-04-07-test-publication-openclaw-hero.jpg"
              alt="Visuel de test pour la publication automatique du blog Laurent Serre"
              width={1600}
              height={900}
              className="w-full h-80 object-cover object-center rounded-2xl shadow-lg"
              quality={75}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Cet article est un <strong>test de publication</strong>. Son but est simple : vérifier qu’un nouvel article ajouté dans le dépôt GitHub est bien pris en compte par le site et déclenche correctement la mise en ligne automatique après un commit et un push.
          </p>

          <p className="mb-8">
            Si tu lis cette page en ligne, cela veut dire que le flux de base fonctionne : structure du dépôt comprise, ajout d’une page de blog, commit Git, push GitHub, puis déploiement automatique.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Ce que valide ce test</h2>
          <ul className="list-disc pl-6 mb-8">
            <li>la possibilité d’ajouter un nouvel article dans la structure actuelle du site,</li>
            <li>la prise en compte de l’article dans la page index du blog,</li>
            <li>le déclenchement du déploiement automatique après push,</li>
            <li>la possibilité, ensuite, de publier de vrais articles directement depuis ici.</li>
          </ul>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Étape suivante</h2>
          <p className="mb-8">
            Une fois ce test validé, je pourrai publier des articles complets dans le même format, avec titre, métadonnées SEO, image, maillage interne et appel à l’action vers le{' '}
            <Link href="/bootcamp" className="text-blue-ink font-semibold underline hover:text-mint-green">
              Bootcamp commercial
            </Link>
            {' '}ou le{' '}
            <Link href="/diagnostic" className="text-blue-ink font-semibold underline hover:text-mint-green">
              diagnostic commercial
            </Link>
            .
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>Note :</strong> cet article est volontairement court. Il sert uniquement à valider le workflow éditorial technique avant publication d’articles de production.
            </p>
          </div>
        </div>
      </article>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-8 text-center">
            Prendre contact avec Laurent Serre
          </h2>
          <HubSpotForm />
        </div>
      </section>
    </main>
  );
}
