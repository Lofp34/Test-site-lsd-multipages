import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Les erreurs d’onboarding commercial qui vont plomber la performance du nouveau | Laurent Serre',
  description:
    'Un recrutement commercial peut échouer dès les premières semaines. Les erreurs d’onboarding coûtent cher : pipeline fragile, posture hésitante et conversion affaiblie.',
  keywords:
    'onboarding commercial, intégration commercial B2B, manager commercial, performance commerciale, recrutement commercial, Laurent Serre, bootcamp commercial, diagnostic commercial',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/les-erreurs-onboarding-commercial-qui-plombent-performance-nouveau',
  },
  openGraph: {
    title: 'Les erreurs d’onboarding commercial qui vont plomber la performance du nouveau',
    description:
      'Le problème n’est pas le profil recruté. Le problème est souvent un onboarding flou qui retarde la montée en performance et fragilise toute l’équipe.',
    url: 'https://www.laurentserre.com/blog/les-erreurs-onboarding-commercial-qui-plombent-performance-nouveau',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-04-04-onboarding-commercial-performance-nouveau-hero.jpg',
        width: 1600,
        height: 900,
        alt: 'Manager commercial accompagnant un nouveau commercial lors de son onboarding dans un environnement premium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Les erreurs d’onboarding commercial qui vont plomber la performance du nouveau',
    description:
      'Un onboarding commercial mal structuré coûte des mois de performance. Le nouveau n’échoue pas seul, il hérite souvent d’un système flou.',
    images: ['https://www.laurentserre.com/images/blog/2026-04-04-onboarding-commercial-performance-nouveau-hero.jpg'],
  },
};

export default function ErreursOnboardingCommercialPage() {
  const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Les erreurs d’onboarding commercial qui vont plomber la performance du nouveau",
  "description": "Un recrutement commercial peut échouer dès les premières semaines. Les erreurs d’onboarding coûtent cher : pipeline fragile, posture hésitante et conversion affaiblie.",
  "image": "https://www.laurentserre.com/images/blog/2026-04-04-onboarding-commercial-performance-nouveau-hero.jpg",
  "datePublished": "2026-04-04",
  "dateModified": "2026-04-04",
  "author": {
    "@type": "Person",
    "name": "Laurent Serre",
    "url": "https://www.laurentserre.com/a-propos",
    "sameAs": [
      "https://www.linkedin.com/in/laurentserre34/",
      "https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/"
    ]
  },
  "publisher": {
    "@type": "Organization",
    "name": "Laurent Serre Développement",
    "url": "https://www.laurentserre.com"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.laurentserre.com/blog/les-erreurs-onboarding-commercial-qui-plombent-performance-nouveau"
  },
  "articleSection": "Management / transformation commerciale",
  "keywords": [
    "onboarding commercial",
    "intégration commercial B2B",
    "manager commercial",
    "performance commerciale",
    "recrutement commercial",
    "Laurent Serre",
    "bootcamp commercial",
    "diagnostic commercial"
  ]
};

  return (
<main className="bg-primary-bg text-gray-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Management / transformation commerciale</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Les erreurs d’onboarding commercial qui vont plomber la performance du nouveau
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-04-04">4 avril 2026</time>
              <span>•</span>
              <span>10 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-04-04-onboarding-commercial-performance-nouveau-hero.jpg"
              alt="Manager commercial accompagnant un nouveau commercial lors de son onboarding dans un environnement premium"
              width={1600}
              height={900}
              className="w-full h-80 object-cover object-center rounded-2xl shadow-lg"
              quality={78}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Beaucoup de dirigeants pensent qu’un recrutement commercial se joue à l’entretien. En réalité, il se joue surtout dans les 45 premiers jours. Vous pouvez signer un bon profil… puis le faire échouer avec un onboarding mal construit.
          </p>

          <p className="mb-8">
            <strong>Quand un nouveau commercial démarre sans cadre net, il n’apprend pas à vendre mieux. Il apprend à survivre dans le flou.</strong> Il produit de l’activité, mais pas de progression fiable. Et toute l’équipe paie l’addition : coaching dispersé, pipeline fragile, temps managérial aspiré, confiance abîmée.
          </p>

          <p className="mb-8">
            Le plus coûteux dans cette histoire, c’est que l’échec est souvent attribué à la personne : “pas le bon profil”, “pas assez chasseur”, “pas assez autonome”. Alors que le problème était souvent structurel : l’entreprise n’avait pas défini ce qu’un démarrage réussi devait produire semaine après semaine.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Pourquoi l’onboarding commercial est un sujet de performance — pas d’accueil</h2>
          <p className="mb-4">
            Un onboarding n’est pas une visite guidée du CRM, une présentation de l’offre et trois rendez-vous en doublon. C’est une séquence de transformation. Elle doit amener un nouveau commercial d’un statut “informé” à un statut “opérationnel, lisible et coachable”.
          </p>
          <p className="mb-6">
            Sans cette logique, vous obtenez des signaux trompeurs : beaucoup d’efforts visibles, peu de résultats solides. Le commercial “fait des choses”, mais ne sait pas encore qualifier correctement, tenir une découverte exigeante, sécuriser la prochaine étape et poser une vraie valeur.
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>Règle simple :</strong> un onboarding commercial réussi ne se mesure pas au confort du nouveau, mais à la qualité de sa montée en compétence observable sur le terrain.
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Les 5 erreurs d’onboarding qui plombent la performance du nouveau</h2>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-4">1. On transmet de l’information, pas un standard d’exécution</h3>
          <p className="mb-6">
            Beaucoup d’entreprises noient le nouveau dans des slides, des documents et des process. Résultat : il connaît “ce qu’il faut faire”, mais pas “comment bien le faire”. Il lui manque la grammaire réelle de la vente attendue chez vous.
          </p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-4">2. Aucun jalon clair sur les 30-60-90 jours</h3>
          <p className="mb-6">
            Sans jalons concrets, le manager ne sait pas coacher utilement et le nouveau ne sait pas se situer. L’onboarding devient une zone grise. On attend des résultats avant d’avoir construit les compétences qui les rendent possibles.
          </p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-4">3. Le manager suit l’activité mais ne coache pas la mécanique de vente</h3>
          <p className="mb-6">
            Le nouveau envoie ses relances, remplit son CRM, participe aux réunions… mais personne ne travaille vraiment la qualité de ses conversations commerciales. C’est exactement le piège d’un management qui suit sans transformer, déjà visible dans{' '}
            <Link href="/blog/pourquoi-manager-commercial-suit-sans-coacher-plombe-equipe" className="text-blue-ink font-semibold underline hover:text-mint-green">
              ce pattern managérial
            </Link>
            .
          </p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-4">4. On veut de la vitesse avant de sécuriser les fondamentaux</h3>
          <p className="mb-6">
            Pressé de “rentabiliser” le recrutement, on pousse vite vers des propositions et du closing. Sauf qu’un nouveau qui n’a pas encore une découverte solide finit souvent par compenser avec des relances faibles et des opportunités mal qualifiées, comme on le voit aussi dans{' '}
            <Link href="/blog/pourquoi-beaucoup-relances-commerciales-affaiblissent-vente" className="text-blue-ink font-semibold underline hover:text-mint-green">
              ce mécanisme de relance qui affaiblit la vente
            </Link>
            .
          </p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-4">5. L’onboarding est pensé RH, pas business</h3>
          <p className="mb-8">
            L’intégration administrative peut être impeccable, et la montée en performance pourtant médiocre. Parce que le cœur du sujet n’a pas été traité : quelles compétences commerciales doivent être visibles à J+15, J+30, J+60 ? Quel niveau de qualité attend-on, et comment va-t-on le coacher ?
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Ce que doit contenir un onboarding commercial vraiment utile</h2>
          <ul className="list-disc pl-6 mb-8">
            <li><strong>Un plan 30-60-90 explicite :</strong> objectifs de progression, pas seulement objectifs de volume.</li>
            <li><strong>Des standards observables :</strong> qualité de découverte, lecture du décideur, sécurisation des prochaines étapes.</li>
            <li><strong>Un coaching hebdomadaire structuré :</strong> débriefs d’entretiens, feedback précis, plan de correction court.</li>
            <li><strong>Des critères de réussite partagés :</strong> le manager et le commercial savent ce qui valide une vraie montée en niveau.</li>
            <li><strong>Une logique d’équipe :</strong> l’onboarding sert aussi à renforcer la cohérence commerciale collective, pas seulement le nouveau.</li>
          </ul>

          <p className="mb-8">
            Ce cadre évite un biais fréquent : confondre autonomie et abandon. Un nouveau devient autonome quand il a été suffisamment guidé sur les bons standards, pas quand on le laisse seul avec un objectif et un CRM.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Ce que les dirigeants doivent arbitrer maintenant</h2>
          <p className="mb-4">
            Si vous recrutez en 2026, l’enjeu n’est plus seulement d’attirer des commerciaux. L’enjeu est de fiabiliser leur montée en performance. Sinon, vous allez recruter pour compenser des sorties, puis rerrecruter pour compenser les intégrations ratées.
          </p>
          <p className="mb-8">
            Posez-vous une question brutale mais utile : votre dernier onboarding commercial était-il un vrai système de progression, ou une succession de bonnes intentions ? La réponse explique souvent pourquoi vos nouveaux mettent six mois à produire ce qu’ils auraient pu produire en trois.
          </p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous voulez fiabiliser l’onboarding de vos commerciaux pour accélérer la performance sans brûler les profils ?</h3>
            <p className="mb-6">
              Le Bootcamp aide les dirigeants et managers à structurer un système commercial où les nouveaux montent vite en compétence, avec des standards clairs, du coaching utile et des résultats plus reproductibles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/bootcamp" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Découvrir le Bootcamp
              </Link>
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Demander un diagnostic commercial
              </Link>
            </div>
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
