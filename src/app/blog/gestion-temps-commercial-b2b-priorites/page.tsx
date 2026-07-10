import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';
import HubSpotForm from '@/components/HubSpotForm';

const articleUrl = 'https://www.laurentserre.com/blog/gestion-temps-commercial-b2b-priorites';
const heroImage = '/images/blog/gestion-temps-commercial-b2b-priorites/hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/gestion-temps-commercial-b2b-priorites/hero.webp';
const carouselPrefix = '/images/blog/gestion-temps-commercial-b2b-priorites/carrousel';

const carouselAltTexts = [
  'Le commercial débordé devant un agenda plein et des ventes immobiles',
  'Le manager constate que tout le monde travaille mais que rien ne décide',
  'Les urgences internes prennent la place de la prospection',
  'Le commercial remplit le CRM sans prochaine action claire',
  'Le manager classe le temps commercial en trois catégories',
  'Le commercial protège un vrai créneau de prospection',
  'La réunion commerciale tranche les priorités au lieu de commenter',
  "L'équipe sort les affaires mortes du pipe",
  "Le manager refuse une intrusion inutile dans l'agenda",
  'Le commercial obtient une prochaine étape claire avec le client',
  "L'équipe retrouve du temps pour les actions qui font avancer les ventes",
  "La question finale sur ce qui ne doit plus entrer dans l'agenda",
  'Laurent pose la question sur les ventes qui avancent vraiment',
  'Invitation au diagnostic commercial offert Laurent Serre',
];

const carouselImages = Array.from({ length: 14 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return {
    src: `${carouselPrefix}/bd-slide-${num}.webp`,
    alt: carouselAltTexts[i] || `Carrousel BD gestion du temps commercial slide ${i + 1}`,
    index: i,
  };
});

const faqItems = [
  {
    question: 'Comment prioriser ses tâches en tant que commercial ?',
    answer:
      "Commencez par distinguer trois temps : ce qui fait avancer une vente réelle, ce qui prépare une vente future, et ce qui occupe seulement l'agenda. Une tâche prioritaire doit rapprocher l'entreprise d'une décision client, d'une qualification plus nette ou d'une prochaine étape datée.",
  },
  {
    question: 'Comment protéger le temps de prospection ?',
    answer:
      "Le temps de prospection ne se protège pas avec une simple intention dans l'agenda. Il faut une règle managériale claire : pas de réunion interne, de demande secondaire ou de dossier flou qui prend la place d'un créneau de prospection sans arbitrage explicite.",
  },
  {
    question: 'Quelles tâches commerciales sont à faible valeur ajoutée ?',
    answer:
      "Les tâches à faible valeur ajoutée sont celles qui donnent l'impression d'avancer sans produire de décision : remplir le CRM pour être tranquille, relancer sans objectif, refaire une proposition non qualifiée, assister à une réunion sans décision, ou garder une affaire morte dans le pipe.",
  },
  {
    question: 'Comment organiser une semaine commerciale efficace ?',
    answer:
      'Une semaine commerciale efficace commence par les actions qui font avancer les ventes : prospection sérieuse, préparation des rendez-vous importants, relances avec objectif clair, rendez-vous clients, et revue des affaires qui doivent vraiment bouger. Le reste doit venir après, pas avant.',
  },
  {
    question: 'Pourquoi les commerciaux manquent-ils toujours de temps ?',
    answer:
      "Ils manquent souvent de temps parce que l'entreprise laisse entrer trop de choses dans leur agenda : urgences internes, comptes historiques, reporting inutile, propositions mal qualifiées, réunions sans décision. Le problème est moins individuel que collectif.",
  },
  {
    question: 'Comment réduire le temps perdu en CRM et reporting ?',
    answer:
      'Demandez moins de remplissage et plus de clarté commerciale. Le CRM doit dire qui décide, ce qui bloque, quelle prochaine action est prévue et quand elle aura lieu. Si le reporting ne change aucune action, il prend du temps sans aider la vente.',
  },
];

export const metadata: Metadata = {
  title: "Gestion du temps commercial B2B : protégez l'agenda | Laurent Serre",
  description:
    "La gestion du temps commercial ne consiste pas à remplir mieux l'agenda. Elle consiste à protéger les actions qui font avancer une vente réelle en PME B2B.",
  keywords: [
    'gestion du temps commercial',
    'gestion du temps commercial B2B',
    'productivité commerciale',
    'priorités commerciales',
    'organisation commerciale B2B',
    'time blocking commercial',
    'protéger le temps de prospection',
  ],
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-07-10',
  },
  openGraph: {
    title: "Gestion du temps commercial B2B : votre équipe n'a pas un problème d'agenda",
    description:
      "Le vrai sujet n'est pas de mieux remplir l'agenda. C'est de décider ce qu'on accepte encore d'y laisser entrer.",
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Un manager commercial de PME observe un agenda rempli où les vraies actions de vente disparaissent',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Gestion du temps commercial B2B : votre équipe n'a pas un problème d'agenda",
    description:
      "Tout le monde est occupé, mais les bonnes affaires n'avancent pas. Le problème est peut-être ce que l'entreprise laisse entrer dans l'agenda.",
    images: [heroImageAbsolute],
  },
};

export default function GestionTempsCommercialPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: "Gestion du temps commercial B2B : votre équipe n'a pas un problème d'agenda",
        description:
          "La gestion du temps commercial ne consiste pas seulement à mieux organiser l'agenda. Elle consiste à protéger les activités qui font avancer une vente réelle.",
        image: heroImageAbsolute,
        datePublished: '2026-07-10',
        dateModified: '2026-07-10',
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
          '@id': articleUrl,
        },
        articleSection: 'Management commercial',
        keywords: [
          'gestion du temps commercial',
          'gestion du temps commercial B2B',
          'productivité commerciale',
          'priorités commerciales',
          'organisation commerciale B2B',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${articleUrl}#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.laurentserre.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'Gestion du temps commercial B2B', item: articleUrl },
        ],
      },
    ],
  };

  return (
    <main className="bg-primary-bg text-gray-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-mint-green transition-colors">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-mint-green transition-colors">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-blue-ink font-medium" aria-current="page">Gestion du temps commercial B2B</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Management commercial
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Gestion du temps commercial B2B : votre équipe n&apos;a pas un problème d&apos;agenda
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/blog/Laurent-Serre-avatar.webp"
                  alt="Laurent Serre"
                  width={32}
                  height={32}
                  className="rounded-full"
                  quality={60}
                  sizes="32px"
                  loading="lazy"
                />
                <span>Laurent Serre</span>
              </div>
              <span>&bull;</span>
              <time dateTime="2026-07-10">10 juillet 2026</time>
              <span>&bull;</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="relative w-full aspect-[1200/630] rounded-3xl overflow-hidden shadow-2xl mb-12">
            <Image
              src={heroImage}
              alt="Un manager commercial de PME observe un agenda rempli où les vraies actions de vente disparaissent"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>

          <AuthorCard
            author={{
              name: 'Laurent Serre',
              role: 'Coach commercial',
              image: '/images/blog/Laurent-Serre-avatar.webp',
            }}
          />

          <div className="mt-10 p-6 bg-mint-green/10 rounded-2xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">Ce qu&apos;il faut retenir</p>
            <p className="text-gray-700 leading-relaxed">
              La gestion du temps commercial ne consiste pas à mieux remplir l&apos;agenda. Elle consiste à protéger les actions qui font avancer une vente réelle, et à refuser ce qui donne seulement l&apos;impression de travailler.
            </p>
          </div>

          {/* BD Carrousel */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : Le vrai problème d&apos;agenda commercial
            </p>
            <p className="text-sm text-amber-700 mb-5">
              L&apos;histoire de Nadia, directrice commerciale convaincue que son équipe fait le maximum. Jusqu&apos;au jour où elle classe chaque bloc de l&apos;agenda en trois colonnes : vente réelle, vente future, activité de façade. Ce qu&apos;elle découvre change tout.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Gestion du temps commercial B2B"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-gestion-temps-commercial-b2b-priorites.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (14 planches)
              </Link>
            </div>
          </div>

          {/* CTA SOFT */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Votre agenda commercial est-il rempli de choses qui ne font avancer aucune vente ?
            </Link>
          </div>

          <div className="prose prose-lg max-w-none prose-a:text-mint-green prose-a:no-underline hover:prose-a:underline prose-strong:text-blue-ink">
            <p>
              Dans beaucoup d&apos;équipes commerciales, tout le monde est occupé.
            </p>

            <p>
              Les agendas sont pleins. Les mails arrivent en continu. Les réunions s&apos;enchaînent. Les relances se mélangent aux devis, aux comptes-rendus, aux demandes internes, aux urgences qui n&apos;en sont pas toujours.
            </p>

            <p>
              Et quand on regarde les résultats, quelque chose ne colle pas.
            </p>

            <p>
              L&apos;équipe a travaillé. Mais les bonnes affaires n&apos;ont pas assez avancé.
            </p>

            <h2>Le vrai symptôme : des journées pleines, des ventes immobiles</h2>

            <p>
              Le problème n&apos;est pas seulement que les commerciaux manquent de temps. Tout le monde manque de temps.
            </p>

            <p>
              Le vrai problème, c&apos;est que le temps commercial se fait manger par des choses qui donnent l&apos;impression de travailler, sans rapprocher l&apos;entreprise d&apos;une décision client.
            </p>

            <p>
              Un commercial peut passer une journée entière à répondre, ranger, chercher, mettre à jour, relancer vaguement, assister à une réunion, préparer un document, refaire un devis, compléter le CRM.
            </p>

            <p>
              À la fin de la journée, il est fatigué. Mais quelle affaire a réellement avancé ? Quel prospect a été mieux qualifié ? Quel décideur a été joint ? Quelle prochaine étape a été obtenue ? Quelle vente morte a enfin été sortie du pipe ?
            </p>

            <p>
              Ce sont ces questions-là qui dérangent.
            </p>

            <h2>Les trois types de temps commercial</h2>

            <p>
              Toutes les activités ne se valent pas.
            </p>

            <p>
              Il y a d&apos;abord ce qui fait avancer une vente réelle : joindre le bon décideur, clarifier ce qui bloque, obtenir une prochaine étape datée, préparer un rendez-vous important, reprendre une proposition avant qu&apos;elle ne dorme trois semaines.
            </p>

            <p>
              Il y a ensuite ce qui prépare une vente future : prospecter sérieusement, travailler une cible, rappeler un contact encore froid, nourrir une relation utile sans raconter que c&apos;est déjà une affaire.
            </p>

            <p>
              Et il y a ce qui occupe l&apos;agenda sans produire de décision : remplir des cases pour être tranquille en réunion, relancer sans savoir ce qu&apos;on cherche à obtenir, refaire une présentation qui ne sera peut-être jamais lue, garder dans le pipe une affaire qui ne bouge plus.
            </p>

            <p>
              Quand cette distinction n&apos;est pas faite, l&apos;équipe finit par confondre activité et progression.
            </p>

            <h2>Pourquoi le time blocking ne suffit pas</h2>

            <p>
              On parle souvent de gestion du temps comme s&apos;il suffisait d&apos;avoir une meilleure méthode personnelle : bloquer des créneaux, fermer sa boîte mail, regrouper les appels, organiser sa semaine.
            </p>

            <p>
              Tout cela peut aider. Mais dans une PME B2B, si le manager ne regarde pas ce que l&apos;équipe protège vraiment, les méthodes d&apos;organisation deviennent vite de jolies intentions.
            </p>

            <p>
              Le lundi matin devait être réservé à la prospection. Puis une réunion interne arrive. Puis un client historique demande juste un petit point. Puis une proposition pas prioritaire prend deux heures. Puis un commercial répond à trois demandes qui auraient pu attendre.
            </p>

            <p>
              Et la prospection sérieuse repasse à plus tard. Encore une fois.
            </p>

            <p>
              Ce n&apos;est pas un problème de discipline individuelle seulement. C&apos;est un problème de hiérarchie commerciale.
            </p>

            <div className="not-prose my-12 rounded-2xl bg-blue-ink text-white p-8">
              <p className="text-sm font-semibold text-mint-green mb-3">Bootcamp commercial</p>
              <p className="text-2xl font-title font-bold mb-4">
                Vos commerciaux ont besoin d&apos;un rythme commercial qui tient sur le terrain ?
              </p>
              <p className="text-white/85 mb-6">
                Le bootcamp aide l&apos;équipe à protéger les bons gestes : prospection, qualification, préparation, relance et décisions en réunion commerciale.
              </p>
              <Link
                href="/bootcamp"
                className="inline-flex items-center rounded-full bg-mint-green px-6 py-3 font-semibold text-blue-ink hover:bg-mint-green/90 transition-colors"
              >
                Découvrir le bootcamp
              </Link>
            </div>

            <h2>Ce que le manager doit protéger</h2>

            <p>
              Un bon manager commercial ne demande pas seulement : tu as travaillé sur quoi cette semaine ?
            </p>

            <p>
              Il demande plutôt : qu&apos;est-ce qui a fait avancer une vente réelle ? Qu&apos;est-ce qui a préparé une vente future ? Qu&apos;est-ce qui a seulement occupé l&apos;agenda ?
            </p>

            <p>
              Les vrais créneaux de prospection doivent être protégés. Pas déclarés importants, puis sacrifiés au premier sujet interne.
            </p>

            <p>
              La préparation des rendez-vous importants doit être protégée, parce qu&apos;un rendez-vous avec un vrai décideur ne se traite pas entre deux mails.
            </p>

            <p>
              Les relances doivent être protégées quand elles ont un objectif clair : obtenir une date, faire entrer le vrai décideur, lever un point bloqué, reprendre une proposition. Une relance automatique pour se rassurer ne vaut pas une action commerciale.
            </p>

            <p>
              La réunion commerciale doit aussi être protégée contre le commentaire. Elle doit produire des décisions. Sur ce point, l&apos;article sur la <Link href="/blog/reunion-commerciale-hebdomadaire-format-performance">réunion commerciale hebdomadaire</Link> pose une règle simple : on ne se réunit pas pour raconter le passé, mais pour choisir quoi faire maintenant.
            </p>

            <p>
              Et le CRM doit servir la prochaine action, pas la tranquillité administrative. C&apos;est exactement le sujet de l&apos;article sur le <Link href="/blog/crm-b2b-pme-prochaine-action">CRM B2B en PME</Link> : un outil rempli ne vaut rien s&apos;il ne dit pas quoi faire ensuite.
            </p>

            <h2>Audit en 15 minutes : ce que l&apos;agenda révèle vraiment</h2>

            <p>
              Prenez une semaine d&apos;agenda d&apos;un commercial. Pas une semaine idéale. Une vraie semaine.
            </p>

            <p>
              Classez chaque bloc en trois colonnes : vente réelle, vente future, activité de façade. Puis regardez froidement ce qui prend les meilleurs moments de la semaine.
            </p>

            <p>
              Si les créneaux les plus frais partent dans des réunions internes, du reporting, des dossiers mal qualifiés ou des clients qui demandent toujours un petit point, vous avez votre diagnostic.
            </p>

            <p>
              Ensuite, identifiez trois intrusions récurrentes. Celles qui reviennent toutes les semaines, qui semblent normales, et qui repoussent toujours les actions commerciales qui comptent.
            </p>

            <p>
              La décision managériale commence là : qu&apos;est-ce qui ne rentre plus dans l&apos;agenda sans arbitrage ?
            </p>

            <h2>Ce qu&apos;il faut arrêter de laisser entrer</h2>

            <p>
              Pas de réunion interne qui prend la place d&apos;un vrai créneau de vente sans raison solide.
            </p>

            <p>
              Pas de proposition longue si le besoin, le décideur et la suite ne sont pas clairs.
            </p>

            <p>
              Pas de relance automatique quand on ne sait pas ce qu&apos;on cherche à obtenir.
            </p>

            <p>
              Pas de pipe rempli d&apos;affaires qui occupent l&apos;esprit mais ne bougent plus. Un <Link href="/blog/pipeline-trop-plein-tue-performance-commerciale">pipe trop plein</Link> mange aussi du temps, parce qu&apos;il donne au manager et au commercial l&apos;impression qu&apos;il y a plus de ventes en cours qu&apos;il n&apos;y en a vraiment.
            </p>

            <p>
              Pas de reporting qui consomme plus d&apos;énergie qu&apos;il n&apos;apporte de lucidité.
            </p>

            <p>
              Ce n&apos;est pas une chasse aux tâches administratives. Une équipe commerciale a besoin de rigueur, de CRM, de suivi, de préparation. Mais chaque tâche doit supporter la vente, pas la remplacer.
            </p>

            <h2>La question qui remet l&apos;agenda à sa place</h2>

            <p>
              Le temps commercial est précieux parce qu&apos;il est limité.
            </p>

            <p>
              Dans une PME, on ne peut pas se permettre que les meilleurs moments de la semaine partent dans du flou, du confort ou de l&apos;activité de façade.
            </p>

            <p>
              La vraie question n&apos;est donc pas : comment rendre les commerciaux plus productifs ?
            </p>

            <p>
              La vraie question est plus simple, et souvent plus dure : qu&apos;est-ce qu&apos;on laisse encore entrer dans l&apos;agenda alors que ça ne fait avancer aucune vente ?
            </p>

            {/* Pour aller plus loin */}
            <div className="not-prose bg-blue-ink/5 border border-blue-ink/10 rounded-xl p-6 my-12">
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Pour aller plus loin
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>
                  <Link href="/blog/crm-b2b-pme-prochaine-action" className="text-mint-green hover:underline">
                    → CRM B2B PME : la prochaine action avant le remplissage
                  </Link>
                </li>
                <li>
                  <Link href="/blog/pipeline-trop-plein-tue-performance-commerciale" className="text-mint-green hover:underline">
                    → Pipeline trop plein : comment le nettoyer pour retrouver de la performance
                  </Link>
                </li>
                <li>
                  <Link href="/blog/reunion-commerciale-hebdomadaire-format-performance" className="text-mint-green hover:underline">
                    → Réunion commerciale hebdomadaire : un format qui produit des décisions
                  </Link>
                </li>
              </ul>
            </div>

            {/* CTA gradient */}
            <div className="not-prose my-12 rounded-2xl bg-blue-ink text-white p-8 text-center">
              <p className="text-sm font-semibold text-mint-green mb-3">Diagnostic commercial</p>
              <p className="text-2xl font-title font-bold mb-4">
                Votre agenda commercial est plein, mais vos ventes n&apos;avancent pas assez ?
              </p>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Un diagnostic permet de regarder ce que votre équipe protège vraiment : prospection, relances, rendez-vous, réunions, CRM et arbitrages managériaux.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/diagnostic"
                  className="inline-flex items-center justify-center gap-2 bg-mint-green text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-mint-green/90 transition-colors"
                >
                  Demander un diagnostic offert
                </Link>
                <Link
                  href="/bootcamp"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/20 transition-colors"
                >
                  Découvrir le Bootcamp
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-8" id="faq">
              Questions fréquentes
            </h2>
            <div className="space-y-8">
              {faqItems.map((item, index) => (
                <div key={index}>
                  <h3 className="text-lg font-title font-semibold text-blue-ink mb-3">
                    {item.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* HubSpot Form */}
          <div className="mt-16">
            <HubSpotForm />
          </div>

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link href="/blog" className="text-mint-green hover:underline text-sm">
              ← Retour au blog
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
