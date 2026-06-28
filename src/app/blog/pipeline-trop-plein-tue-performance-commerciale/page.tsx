import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import BDCarousel from '@/components/BDCarousel';
import AuthorCard from '@/components/AuthorCard';

const heroImage = '/images/blog/pipeline-trop-plein-tue-performance-commerciale/hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/pipeline-trop-plein-tue-performance-commerciale/hero.webp';

export const metadata: Metadata = {
  title: 'Pipeline trop plein : pourquoi ça tue votre performance',
  description:
    'Un pipeline commercial trop plein fait plus de mal qu\'un pipeline vide. La méthode pour qualifier out sans culpabilité et retrouver un pipeline sain de 15-20 deals.',
  keywords:
    'pipeline commercial trop plein, nettoyer pipeline commercial, pipeline gonflé performance B2B, qualifier out, deals stagnants pipeline PME, pipeline bloat vente B2B',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/pipeline-trop-plein-tue-performance-commerciale',
  },
  openGraph: {
    title: 'Pipeline trop plein : pourquoi vos 62 deals ouverts tuent votre performance',
    description:
      'Un pipeline commercial trop plein coûte plus cher qu\'un pipeline vide. Chaque deal mort consomme l\'attention que vos vraies opportunités méritent.',
    url: 'https://www.laurentserre.com/blog/pipeline-trop-plein-tue-performance-commerciale',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Pipeline trop plein : pourquoi vos 62 deals ouverts tuent votre performance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pipeline trop plein : pourquoi vos 62 deals ouverts tuent votre performance',
    description:
      'Un commercial avec 62 deals ouverts ferme moins de deals qu\'un commercial avec 14. La méthode pour qualifier out sans culpabilité.',
    images: [heroImageAbsolute],
  },
};

export default function PipelineTropPleinPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Pipeline trop plein : pourquoi vos 62 deals ouverts tuent votre performance',
    description:
      'Un pipeline commercial trop plein coûte plus cher qu\'un pipeline vide. La méthode pour qualifier out sans culpabilité et retrouver un pipeline sain.',
    image: heroImageAbsolute,
    datePublished: '2026-06-28',
    dateModified: '2026-06-28',
    author: {
      '@type': 'Person',
      name: 'Laurent Serre',
      url: 'https://www.laurentserre.com/a-propos',
      sameAs: [
        'https://www.linkedin.com/in/laurentserre34/',
        'https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Laurent Serre',
      url: 'https://www.laurentserre.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.laurentserre.com/blog/pipeline-trop-plein-tue-performance-commerciale',
    },
    articleSection: 'Pilotage commercial / Pipeline',
    keywords: [
      'pipeline commercial',
      'pipeline trop plein',
      'qualifier out',
      'nettoyer pipeline',
      'deals stagnants',
      'performance commerciale PME',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "C'est quoi un pipeline commercial trop plein ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Un pipeline contenant plus de 20-25 deals actifs par commercial, dont la majorité n'a pas de prochaine étape datée dans les 14 jours. Au-delà, la qualité de suivi s'effondre et les vraies opportunités sont négligées."
        }
      },
      {
        '@type': 'Question',
        name: 'Pourquoi un pipeline plein est-il dangereux ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Parce qu'il crée une fausse sensation de sécurité. Chaque deal mort consomme de l'attention, des relances, du reporting, qui devraient être investis sur les vrais deals. Un commercial avec 62 deals ouverts performe presque toujours moins bien qu'avec 15-20 bien qualifiés."
        }
      },
      {
        '@type': 'Question',
        name: 'Comment qualifier out un deal sans le perdre ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "En posant 3 questions : le client sait-il qu'il a un problème ? Y a-t-il une prochaine étape datée dans les 14 jours ? Si j'arrête de relancer, que se passe-t-il ? Si les réponses sont non, le deal n'est pas perdu, il n'a jamais existé. Archivez et revenez dans 90 jours."
        }
      },
      {
        '@type': 'Question',
        name: 'Combien de deals un commercial B2B peut-il gérer efficacement ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Au-delà de 20-25 deals actifs, la qualité de suivi s'effondre. La zone optimale est de 15-20 deals segmentés : 5 en closing, 5-10 en avancement, 5 en qualification active."
        }
      },
      {
        '@type': 'Question',
        name: 'À quelle fréquence nettoyer son pipeline commercial ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Chaque semaine, 30 minutes lors de la revue de pipeline, et en profondeur une fois par mois. Tout deal sans activité depuis 30 jours ou sans prochaine étape datée doit être qualifié out ou archivé."
        }
      },
      {
        '@type': 'Question',
        name: 'Le pipeline bloat est-il un problème spécifique aux PME ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Non, il touche toutes les tailles d'entreprise. Mais en PME, l'impact est plus brutal car le commercial gère souvent seul tout son cycle de vente, sans SDR pour pré-qualifier. La discipline de qualification out est donc encore plus critique."
        }
      },
    ],
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-title font-bold text-blue-ink mb-4 leading-tight">
          Pipeline trop plein : pourquoi vos 62 deals ouverts tuent votre performance
        </h1>
        <p className="text-lg text-slate-600 mb-4">
          Un commercial avec 62 deals ouverts ferme moins de deals qu'un commercial avec 14.
          Ce n'est pas une question de motivation. C'est mathématique.
          Chaque deal mort consomme de l'attention.
          Le remède : qualifier out sans culpabilité.
        </p>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span>Laurent Serre</span>
          <span>28 juin 2026</span>
          <span>8 min de lecture</span>
        </div>
      </div>

      <div className="relative w-full aspect-[1200/630] mb-8 rounded-xl overflow-hidden">
        <Image
          src={heroImage}
          alt="Pipeline commercial trop plein : un dirigeant de PME face à son CRM saturé de deals stagnants"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* BDCarousel */}
      <section className="mb-12">
        <div className="bg-orange-light/30 rounded-xl p-6 border border-orange-warm/20">
          <h2 className="text-2xl font-title font-bold text-blue-ink mb-4">
            🎬 Carrousel BD : Le commercial qui voulait sauver tous ses deals
          </h2>
          <BDCarousel
            slides={[
              { src: '/images/blog/pipeline-trop-plein-tue-performance-commerciale/bd-slide-01-cover.webp', alt: 'Cover - Le commercial qui voulait sauver tous ses deals', index: 0 },
              { src: '/images/blog/pipeline-trop-plein-tue-performance-commerciale/bd-slide-02-constat.webp', alt: 'Stéphane et ses 62 deals ouverts', index: 1 },
              { src: '/images/blog/pipeline-trop-plein-tue-performance-commerciale/bd-slide-03-piege.webp', alt: 'Le piège du pipeline rassurant', index: 2 },
              { src: '/images/blog/pipeline-trop-plein-tue-performance-commerciale/bd-slide-04-cout.webp', alt: 'Le coût caché d'un deal mort', index: 3 },
              { src: '/images/blog/pipeline-trop-plein-tue-performance-commerciale/bd-slide-05-revelation.webp', alt: 'Le manager montre les chiffres', index: 4 },
              { src: '/images/blog/pipeline-trop-plein-tue-performance-commerciale/bd-slide-06-nettoyage.webp', alt: 'Le grand nettoyage du pipeline', index: 5 },
              { src: '/images/blog/pipeline-trop-plein-tue-performance-commerciale/bd-slide-07-3questions.webp', alt: 'Les 3 questions pour qualifier out', index: 6 },
              { src: '/images/blog/pipeline-trop-plein-tue-performance-commerciale/bd-slide-08-apres.webp', alt: 'Après le nettoyage : 14 deals', index: 7 },
              { src: '/images/blog/pipeline-trop-plein-tue-performance-commerciale/bd-slide-09-resultats.webp', alt: '3 deals closés en 1 mois', index: 8 },
              { src: '/images/blog/pipeline-trop-plein-tue-performance-commerciale/bd-slide-10-regle.webp', alt: 'La règle du pipeline sain : 15-20 deals max', index: 9 },
              { src: '/images/blog/pipeline-trop-plein-tue-performance-commerciale/bd-slide-11-lecon.webp', alt: 'La leçon de Stéphane', index: 10 },
              { src: '/images/blog/pipeline-trop-plein-tue-performance-commerciale/bd-slide-12-cta.webp', alt: 'CTA - Diagnostic offert sur laurentserre.com', index: 11 },
            ]}
            pdfUrl="/downloads/carrousel-pipeline-trop-plein.pdf"
          />
        </div>
      </section>

      {/* CTA SOFT */}
      <div className="mb-12 p-6 bg-blue-ink/5 rounded-lg border-l-4 border-blue-ink">
        <p className="text-slate-700">
          <strong>Votre pipeline est-il plein de deals morts ?</strong>{' '}
          Le diagnostic commercial identifie les 3 premières fissures en 5 minutes.{' '}
          <Link href="/diagnostic" className="text-orange-warm font-semibold hover:underline">
            Commencer le diagnostic →
          </Link>
        </p>
      </div>

      {/* Article body */}
      <div className="prose prose-lg max-w-none">
        <p className="text-lg leading-relaxed mb-6">
          Stéphane gère un portefeuille de 62 affaires en cours. Il est à 58% de son objectif trimestriel.
          Chaque lundi matin, il ouvre son CRM, voit les 62 lignes, et se dit que ça va finir par signer.
          Trois mois plus tard, il est à 51%.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Le problème n'est pas sa motivation. Le problème n'est pas le marché.
          Le problème, c'est qu'il passe ses journées à nourrir des affaires qui n'existent pas.
          Et pendant ce temps, les 5 vrais deals de son portefeuille reçoivent un suivi de surface.
        </p>

        <h2 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">
          Le piège du pipeline rassurant
        </h2>

        <p className="mb-4">
          J'ai vu ce scénario des dizaines de fois dans les PME que j'accompagne.
          Un commercial qui a beaucoup de deals ouverts se sent en sécurité.
          Son cerveau lui dit : plus j'ai d'affaires en cours, plus j'ai de chances d'en signer.
          C'est faux. Et c'est le mensonge le plus coûteux de la vente B2B.
        </p>

        <p className="mb-4">
          La réalité, c'est qu'un pipeline chargé divise l'attention.
          Chaque affaire demande un minimum de suivi : une relance, un mail, un point en réunion commerciale.
          Quand vous avez 60 dossiers, vous donnez 5 minutes à chacun.
          Quand vous en avez 15, vous donnez 30 minutes à chacun.
          Les vraies affaires, celles qui peuvent vraiment signer, ont besoin de ces 30 minutes.
          Pas de votre présence fantôme sur 60 lignes.
        </p>

        <p className="mb-4">
          C'est exactement ce que je décris dans mon test du{' '}
          <Link href="/blog/pipeline-fantome-lundi-matin-test-9-minutes" className="text-orange-warm font-semibold hover:underline">
            pipeline fantôme du lundi matin
          </Link>.
          Mais il y a une nuance importante. Le pipeline fantôme, ce sont les affaires imaginaires, celles qui n'ont jamais existé.
          Ici, on parle d'autre chose. Des affaires réelles, qui ont commencé vraiment, mais qui sont mortes en route sans que personne ne le dise.
        </p>

        <h2 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">
          Le coût caché d'un deal mort
        </h2>

        <p className="mb-4">
          Prenons le calcul. Une affaire sans prochaine étape datée consomme environ 30 minutes par semaine.
          Un mail de relance, un passage en revue de pipeline, une ligne dans le reporting, une pensée pendant la nuit.
          30 minutes multipliées par 48 affaires mortes, ça fait 24 heures par mois.
          Trois journées complètes passées à entretenir des illusions.
        </p>

        <p className="mb-4">
          Et ce n'est pas le pire. Le pire, c'est l'effet sur l'acheteur.
          Plus un deal reste longtemps sans avancer, moins l'acheteur est motivé.
          L'enthousiasme du début s'éteint. La décision recule.
          Un deal qui stagne pendant trois mois a beaucoup moins de chances de signer qu'un deal traité en trois semaines.
          En gardant vos affaires mortes, vous ne les sauvez pas. Vous les enterrez plus lentement.
        </p>

        {/* CTA MEDIUM */}
        <div className="my-8 p-6 bg-gradient-to-r from-orange-warm/10 to-orange-warm/5 rounded-lg text-center">
          <p className="text-slate-700 mb-3">
            Apprendre à qualifier sans détruire : le Bootcamp commercial inclut le module pipeline chirurgie.
          </p>
          <Link
            href="/bootcamp"
            className="inline-block px-6 py-3 bg-orange-warm text-white rounded-lg font-semibold hover:bg-orange-warm/90 transition-colors"
          >
            Découvrir le Bootcamp
          </Link>
        </div>

        <h2 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">
          Le cas réel : 62 deals, 58% de quota, puis 14 deals et 3 signés en un mois
        </h2>

        <p className="mb-4">
          Un commercial que j'ai accompagné l'an dernier m'a dit une phrase qui résume tout.
          Il avait 62 affaires ouvertes, était à 58% de son objectif, et se sentait débordé.
          On a pris chaque affaire, une par une, et on a posé une seule question :
          quel est le coût de l'inaction pour ce client ?
        </p>

        <p className="mb-4">
          Sur 62 affaires, 48 n'avaient pas de réponse claire.
          Pas de coût de l'inaction identifiable, pas de prochaine étape datée, pas de vrai décideur impliqué.
          On les a sorties du pipeline. Archivées. Pas supprimées, juste mises de côté pour 90 jours.
        </p>

        <p className="mb-4">
          Il lui restait 14 affaires. La semaine suivante, il a fermé 3 deals.
          Un mois plus tard, 4 autres avaient avancé concrètement.
          Les 48 affaires éliminées n'étaient pas des pertes. C'étaient des illusions.
          Des dossiers quioccupaient de la place dans son CRM et dans sa tête, sans aucune intention d'achat réelle derrière.
        </p>

        <h2 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">
          Comment qualifier out sans culpabilité : 3 questions
        </h2>

        <p className="mb-4">
          La culpabilité, c'est ce qui retient la plupart des commerciaux.
          Sortir un deal du pipeline, ça ressemble à un échec. Ça fait mal à l'ego.
          Mais garder une affaire morte n'est pas de la persévérance. C'est de l'évitement.
        </p>

        <p className="mb-4">
          Voici les trois questions que j'utilise en coaching pour aider les commerciaux à qualifier out sans se tromper :
        </p>

        <div className="bg-slate-50 rounded-lg p-6 my-6 border border-slate-200">
          <p className="mb-3">
            <strong>1. Est-ce que le client sait qu'il a un problème ?</strong>
          </p>
          <p className="mb-4 text-slate-700">
            Si le client ne ressent pas de problème, vous ne vendez pas. Vous faites du marketing.
            Et le marketing ne devrait pas être dans votre pipeline commercial.
          </p>

          <p className="mb-3">
            <strong>2. Est-ce qu'il y a une prochaine étape datée dans les 14 jours ?</strong>
          </p>
          <p className="mb-4 text-slate-700">
            Pas « après les vacances », pas « on se recontacte la semaine prochaine ».
            Une date précise, dans un calendrier, avec un objet.
            Si cette date n'existe pas, l'affaire est morte. Elle ne le sait pas encore.
          </p>

          <p className="mb-3">
            <strong>3. Si j'arrête de relancer, que se passe-t-il ?</strong>
          </p>
          <p className="text-slate-700">
            Si la réponse est « rien », le deal n'existe pas.
            Vous êtes le seul à le faire vivre. C'est vous qui poussez, pas le client qui tire.
            Et en vente B2B, si le client ne tire pas, il n'y a pas de vente.
          </p>
        </div>

        <p className="mb-4">
          Ces trois questions viennent directement du travail que je fais sur la{' '}
          <Link href="/blog/qualification-commerciale-b2b-7-erreurs" className="text-orange-warm font-semibold hover:underline">
            qualification commerciale en B2B
          </Link>.
          La qualification n'est pas un formulaire à remplir au début de la vente.
          C'est un réflexe permanent. À chaque étape, vous devez savoir si l'affaire mérite votre temps.
        </p>

        <h2 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">
          La règle du pipeline sain : 15 à 20 deals maximum par commercial
        </h2>

        <p className="mb-4">
          Au-delà de 20 affaires actives, la qualité de suivi s'effondre. C'est un fait, pas une opinion.
          La zone optimale, celle que je vois fonctionner dans toutes les PME performantes que j'accompagne, c'est 15 à 20 deals segmentés en trois niveaux :
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>5 affaires en closing : le travailprioritaire, celles qui peuvent signer ce mois-ci</li>
          <li>5 à 10 affaires en avancement : le travail de fond, celles qui avancent vers une décision</li>
          <li>5 affaires en qualification active : le futur, celles où vous testez la réalité de l'opportunité</li>
        </ul>

        <p className="mb-4">
          Tout ce qui dépasse ce chiffre doit avoir une date d'expiration automatique.
          Pas d'exception. Pas de « oui mais celle-là, c'est différent ».
          Parce qu'elles sont toutes différentes, et c'est comme ça qu'on se retrouve à 62.
        </p>

        <p className="mb-4">
          C'est aussi l'un des principes clés du{' '}
          <Link href="/blog/systeme-90-jours-anti-yo-yo-ca" className="text-orange-warm font-semibold hover:underline">
            système 90 jours anti-yo-yo
          </Link>.
          Un pipeline sain n'est pas un pipeline plein. C'est un pipeline où chaque affaire a une probabilité réelle de signer, un prochain pas daté, et toute l'attention qu'elle mérite.
        </p>

        <h2 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">
          Ce que vous devez faire lundi matin
        </h2>

        <p className="mb-4">
          Ouvrez votre pipeline. Comptez vos affaires en cours.
          Si vous êtes au-delà de 25, vous avez un problème.
          Prenez chaque affaire et posez les trois questions.
          Celles qui n'ont pas de réponse claire, sortez-les. Archivez-les pour 90 jours.
        </p>

        <p className="mb-4">
          Vous allez ressentir de la peur. C'est normal.
          Votre cerveau va vous dire que vous perdez des opportunités.
          Mais un pipeline sain fait peur au début et rassure à la fin.
          Un pipeline trop plein rassure au début et fait mal à la fin.
        </p>

        <p className="mb-4">
          Stéphane l'a fait. Il est passé de 62 deals à 14.
          Le mois suivant, il a signé 3 affaires. Son meilleur mois de l'année.
          Pas parce qu'il travaillait plus. Parce qu'il travaillait les bonnes affaires.
        </p>

        <p className="text-xl font-semibold text-blue-ink mt-8 mb-4">
          Le vrai luxe en vente, ce n'est pas d'avoir beaucoup de deals.
          C'est de savoir lesquels méritent votre temps.
        </p>
      </div>

      {/* Pour aller plus loin */}
      <section className="mt-12 p-6 bg-slate-50 rounded-lg">
        <h3 className="text-xl font-title font-bold text-blue-ink mb-4">Pour aller plus loin</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/blog/pipeline-fantome-lundi-matin-test-9-minutes" className="text-orange-warm hover:underline">
              → Pipeline fantôme : le test 9 minutes du lundi matin
            </Link>
          </li>
          <li>
            <Link href="/blog/qualification-commerciale-b2b-7-erreurs" className="text-orange-warm hover:underline">
              → Qualification commerciale B2B : 7 erreurs qui tuent vos ventes
            </Link>
          </li>
          <li>
            <Link href="/blog/pourquoi-vos-commerciaux-confondent-interet-et-decision" className="text-orange-warm hover:underline">
              → Pourquoi vos commerciaux confondent intérêt et décision
            </Link>
          </li>
        </ul>
      </section>

      {/* CTA FORT */}
      <section className="mt-12 p-8 bg-gradient-to-r from-blue-ink to-blue-ink/80 rounded-xl text-center text-white">
        <h2 className="text-2xl font-title font-bold mb-4">
          Votre pipeline a besoin d'un vrai diagnostic
        </h2>
        <p className="mb-6 text-blue-50">
          Le diagnostic commercial identifie les deals morts qui encombrent votre pipeline
          et les vraies opportunités que vous négligez. 5 minutes pour changer votre trimestre.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/diagnostic"
            className="px-8 py-4 bg-orange-warm text-white rounded-lg font-bold hover:bg-orange-warm/90 transition-colors"
          >
            Faire le diagnostic gratuit
          </Link>
          <Link
            href="/bootcamp"
            className="px-8 py-4 bg-white/10 text-white rounded-lg font-bold hover:bg-white/20 transition-colors border border-white/20"
          >
            Découvrir le Bootcamp
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <h2 id="faq" className="text-3xl font-title font-bold text-blue-ink mb-6">
          Questions fréquentes
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-blue-ink mb-2">
              C'est quoi un pipeline commercial trop plein ?
            </h3>
            <p className="text-slate-700">
              Un pipeline contenant plus de 20-25 deals actifs par commercial, dont la majorité n'a pas de prochaine étape datée dans les 14 jours. Au-delà, la qualité de suivi s'effondre et les vraies opportunités sont négligées.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-ink mb-2">
              Pourquoi un pipeline plein est-il dangereux ?
            </h3>
            <p className="text-slate-700">
              Parce qu'il crée une fausse sensation de sécurité. Chaque deal mort consomme de l'attention, des relances, du reporting, qui devraient être investis sur les vrais deals. Un commercial avec 62 deals ouverts performe presque toujours moins bien qu'avec 15-20 bien qualifiés.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-ink mb-2">
              Comment qualifier out un deal sans le perdre ?
            </h3>
            <p className="text-slate-700">
              En posant 3 questions : le client sait-il qu'il a un problème ? Y a-t-il une prochaine étape datée dans les 14 jours ? Si j'arrête de relancer, que se passe-t-il ? Si les réponses sont non, le deal n'est pas perdu, il n'a jamais existé. Archivez et revenez dans 90 jours.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-ink mb-2">
              Combien de deals un commercial B2B peut-il gérer efficacement ?
            </h3>
            <p className="text-slate-700">
              Au-delà de 20-25 deals actifs, la qualité de suivi s'effondre. La zone optimale est de 15-20 deals segmentés : 5 en closing, 5-10 en avancement, 5 en qualification active.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-ink mb-2">
              À quelle fréquence nettoyer son pipeline commercial ?
            </h3>
            <p className="text-slate-700">
              Chaque semaine, 30 minutes lors de la revue de pipeline, et en profondeur une fois par mois. Tout deal sans activité depuis 30 jours ou sans prochaine étape datée doit être qualifié out ou archivé.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-ink mb-2">
              Le pipeline bloat est-il un problème spécifique aux PME ?
            </h3>
            <p className="text-slate-700">
              Non, il touche toutes les tailles d'entreprise. Mais en PME, l'impact est plus brutal car le commercial gère souvent seul tout son cycle de vente, sans SDR pour pré-qualifier. La discipline de qualification out est donc encore plus critique.
            </p>
          </div>
        </div>
      </section>

      <AuthorCard />
    </article>
  );
}