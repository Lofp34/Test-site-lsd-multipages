import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Pipeline H2 2026 : 5 décisions dirigeant PME avant juillet | Laurent Serre',
  description: 'Dirigeants de PME : 5 décisions commerciales structurelles à prendre avant le 30 juin pour préparer le second semestre et éviter le creux d\'été.',
  keywords: 'pipeline commercial H2 2026, préparer pipeline commercial été pme, pipeline commercial juillet août dirigeant, décisions commerciales mi-année pme, prospection été b2b',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/pipeline-commercial-h2-2026-5-decisions-dirigeant',
  },
  openGraph: {
    title: 'Pipeline H2 2026 : 5 décisions que les dirigeants de PME doivent prendre maintenant',
    description: 'Les 5 décisions structurelles à prendre avant le 30 juin pour sécuriser le second semestre. Les concurrents ne couvrent pas la transition Q2-H2.',
    url: 'https://www.laurentserre.com/blog/pipeline-commercial-h2-2026-5-decisions-dirigeant',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-06-16-pipeline-h2-hero.webp',
        width: 1600,
        height: 900,
        alt: 'Préparer son pipeline commercial H2 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pipeline H2 2026 : 5 décisions de dirigeant',
    description: '5 décisions à prendre avant le 30 juin pour sécuriser le second semestre.',
    images: ['https://www.laurentserre.com/images/blog/2026-06-16-pipeline-h2-hero.webp'],
  },
};

export default function PipelineCommercialH22026Page() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': 'https://www.laurentserre.com/blog/pipeline-commercial-h2-2026-5-decisions-dirigeant#posting',
        headline: 'Pipeline H2 2026 : 5 décisions que les dirigeants de PME doivent prendre maintenant (avant que juillet n\'aspire leur chiffre)',
        description: 'Les 5 décisions structurelles à prendre avant le 30 juin pour sécuriser le second semestre.',
        image: 'https://www.laurentserre.com/images/blog/2026-06-16-pipeline-h2-hero.webp',
        datePublished: '2026-06-16',
        dateModified: '2026-06-16',
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
          '@id': 'https://www.laurentserre.com/blog/pipeline-commercial-h2-2026-5-decisions-dirigeant',
        },
        keywords: ['pipeline commercial H2 2026', 'préparer pipeline commercial été pme', 'décisions commerciales mi-année pme', 'prospection été b2b', 'commercial PME'],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.laurentserre.com/blog/pipeline-commercial-h2-2026-5-decisions-dirigeant#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Comment maintenir l\'activité commerciale pendant l\'été ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'En sanctuarisant juillet plutôt qu\'en l\'abandonnant. Réduisez les rendez-vous de qualification classiques et remplacez-les par des rendez-vous de décision ou des ateliers de cadrage. Ce sont les mois calmes qui préparent les rentrées fortes.'
            }
          },
          {
            '@type': 'Question',
            name: 'Quelles décisions commerciales prendre en juin pour préparer septembre ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vider le pipeline des affaires fantômes, recalibrer les objectifs H2 sur la base du réalisé S1, et structurer dès juin les campagnes de prospection de septembre. Ne pas attendre la rentrée.'
            }
          },
          {
            '@type': 'Question',
            name: 'Comment éviter le creux d\'été en prospection B2B ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'En acceptant que juillet n\'est pas un mois de prospection massive, mais en l\'utilisant pour des rendez-vous de décision, des ateliers de cadrage ou des visites terrains. L\'été peut produire des cycles plus courts car les vrais décideurs sont souvent disponibles.'
            }
          },
          {
            '@type': 'Question',
            name: 'Quel budget prospection prévoir pour le deuxième semestre ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Un budget calibré sur vos vrais leviers de conversion, pas sur une reconduction aveugle du S1. Analysez ce qui a fonctionné (types de rendez-vous, canaux, profils) avant d\'allouer les ressources H2.'
            }
          },
          {
            '@type': 'Question',
            name: 'Comment motiver son équipe commerciale avant les vacances d\'été ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'En fixant des objectifs clairs à horizon septembre, pas en tirant sur la corde en juin. Un commercial qui sait qu\'une prospection bien préparée en juin lui garantit des rendez-vous en septembre est plus mobilisé qu\'un commercial qui court après des deals impossibles.'
            }
          }
        ]
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', 'position': 3, 'name': 'Pipeline H2 2026', 'item': 'https://www.laurentserre.com/blog/pipeline-commercial-h2-2026-5-decisions-dirigeant' },
        ],
      }
    ]
  };

  return (
    <main className="bg-primary-bg text-gray-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-orange-soft/10 backdrop-blur-sm border border-orange-soft/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-orange-soft text-sm">Pilotage commercial</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Pipeline H2 2026 : les 5 décisions que les dirigeants de PME doivent prendre maintenant (avant que juillet n&apos;aspire leur chiffre)
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-06-16">16 juin 2026</time>
              <span>•</span>
              <span>8 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-06-16-pipeline-h2-hero.webp"
              alt="Préparer son pipeline commercial H2 2026"
              width={1600}
              height={900}
              className="w-full h-80 object-cover object-center rounded-2xl shadow-lg"
              quality={72}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Juin est le mois le plus dangereux de l&apos;année commerciale. Pas parce qu&apos;il manque de volume, mais
            parce qu&apos;il donne l&apos;illusion que tout va bien. On finit des deals, on prépare la trêve estivale,
            on remplit le calendrier de septembre comme on jette des cailloux dans un puits. Et on se réveille en
            octobre en constatant que le deuxième semestre a déjà trois mois de retard.
          </p>

          <p className="mb-8">
            J&apos;ai vu ce scénario se répéter dans des dizaines de PME. Des dirigeants intelligents, des équipes motivées,
            et pourtant un trou d&apos;air systématique entre juillet et octobre. La cause n&apos;est pas le marché.
            <strong> La cause est l&apos;absence de décisions structurelles en juin.</strong>
            Voici les cinq que je recommande avant le 30 juin.
          </p>

          <div className="bg-mint-green/10 border border-mint-green/30 rounded-2xl p-6 mb-10">
            <p className="font-title font-bold text-blue-ink text-sm uppercase tracking-wider mb-3">Pourquoi juin est le mois décisif</p>
            <p className="text-sm text-gray-700">
              Ce que vous décidez en juin conditionne tout le second semestre. Attendre septembre pour
              redresser le cap, c&apos;est perdre deux mois. Juillet aspire l&apos;énergie, août la disperse.
              Seul un pipeline préparé en juin tient la route en octobre.
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            1) Vider le pipeline des affaires fantômes avant l&apos;été
          </h2>
          <p className="mb-4">
            La première erreur que je vois chaque année : des équipes qui partent en vacances avec un pipeline
            gonflé artificiellement. Des affaires en « attente de retour », des devis envoyés sans relance,
            des prospects « très intéressés mais pas maintenant ». Ce n&apos;est pas du pipeline, c&apos;est de
            l&apos;auto-rassurance.
          </p>
          <p className="mb-6">
            En juin, faites le ménage. Supprimez tout ce qui n&apos;a pas de prochaine étape datée avec un vrai décideur.
            Vous allez perdre 30 à 50% de votre volume apparent. Tant mieux. Vous saurez exactement sur quoi
            vous pouvez compter pour septembre.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            2) Recalibrer les objectifs H2 sur la base du réalisé S1
          </h2>
          <p className="mb-4">
            Beaucoup de PME fixent leurs objectifs annuels en janvier et ne les regardent plus jusqu&apos;en décembre.
            Résultat : en juin, l&apos;écart entre le prévisionnel et le réalisé est déjà visible, mais personne
            ne veut l&apos;admettre. On repousse l&apos;ajustement à septembre.
          </p>
          <p className="mb-6">
            Ne faites pas ça. Prenez une heure avec votre directeur commercial ou votre équipe pour recalibrer
            les objectifs du second semestre. Pas pour baisser la barre. Pour qu&apos;elle reste crédible.
            Un objectif irréaliste en juin démobilise plus qu&apos;un objectif exigeant mais juste.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            3) Protéger juillet (pas l&apos;abandonner)
          </h2>
          <p className="mb-4">
            La tentation en juin est de tout donner sur les dernières signatures et d&apos;abandonner juillet.
            « On rattrapera en septembre. » Sauf que septembre est toujours plus long à démarrer qu&apos;on
            ne le croit. Le vrai piège, c&apos;est de considérer juillet comme un mois mort.
          </p>
          <p className="mb-6">
            Ce n&apos;est pas un mois de prospection massive, mais c&apos;est un mois de rendez-vous utiles.
            Les vrais décideurs sont souvent plus disponibles en juillet. Moins de comités, moins d&apos;urgence,
            plus de temps pour réfléchir. Transformez vos rendez-vous de juillet en ateliers de cadrage
            ou en visites terrain. Les cycles de décision y sont parfois plus courts.
          </p>

          <div className="bg-mint-green/10 border border-mint-green/30 rounded-2xl p-6 mb-10">
            <p className="font-title font-bold text-blue-ink text-sm uppercase tracking-wider mb-3">Point terrain</p>
            <p className="text-sm text-gray-700">
              Un dirigeant avec qui je travaille a pris l&apos;habitude de programmer ses rendez-vous de
              juillet en « sessions de cadrage stratégique ». Pas de pitching, pas de relance.
              Juste une heure pour poser les enjeux du second semestre avec ses prospects.
              Son taux de conversion de septembre a doublé.
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            4) Structurer la prospection de septembre en juin
          </h2>
          <p className="mb-4">
            Si vous attendez le 1er septembre pour relancer la machine, vous perdez trois semaines
            de préparation. Les campagnes d&apos;e-mails, les séquences de relance, les scenarii
            d&apos;appels : tout cela se construit en juin, se teste en juillet et se déploie
            automatiquement à la rentrée.
          </p>
          <p className="mb-6">
            Je vois trop d&apos;équipes passer août à bricoler des listes de prospection alors que
            ce temps pourrait être consacré à la vente réelle. Structurez vos campagnes avant l&apos;été.
            Envoyez vos premiers messages de teasing dès fin août. Le jour de la rentrée, votre
            équipe doit avoir des rendez-vous déjà calés.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            5) Armer l&apos;équipe pour la reprise
          </h2>
          <p className="mb-4">
            La dernière décision, la plus négligée : préparer les commerciaux eux-mêmes. Juillet
            et août sont des mois où le rythme change. Moins d&apos;appels, moins de rendez-vous,
            mais un risque de dispersion. Sans cadre, un commercial peut passer deux mois à
            faire semblant de travailler.
          </p>
          <p className="mb-6">
            Donnez à chacun un plan de travail pour juillet-août : quels comptes travailler,
            quelle formation suivre, quel objectif de prise de rendez-vous maintenir.
            Et fixez le premier rendez-vous collectif de la rentrée dès maintenant.
            Le 1er septembre, tout le monde doit savoir exactement ce qu&apos;il a à faire.
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>Question qui change tout :</strong> si vous partiez trois semaines demain,
              votre équipe saurait-elle exactement quoi vendre, à qui et comment en septembre ?
              Si la réponse est non, le problème n&apos;est pas l&apos;été. Le problème est
              votre système de pilotage.
            </p>
          </div>

          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin sur le pilotage de pipeline</p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/blog/pipeline-commercial-q2-2026-5-decisions-dirigeant" className="text-mint-green hover:underline font-medium">
                  Pipeline Q2 2026 : 5 décisions dirigeant
                </Link>
                {' '}— Les décisions pour sécuriser le premier semestre.
              </li>
              <li>
                <Link href="/blog/pipeline-commercial-pme-comment-construire-un-outil-qui-predit-vraiment-votre-chiffre" className="text-mint-green hover:underline font-medium">
                  Construire un pipeline commercial PME fiable
                </Link>
                {' '}— Les fondamentaux pour un outil de pilotage qui tient la route.
              </li>
              <li>
                <Link href="/blog/pipeline-fantome-lundi-matin-test-9-minutes" className="text-mint-green hover:underline font-medium">
                  Pipeline fantôme : le test des 9 minutes
                </Link>
                {' '}— Identifier les faux deals qui polluent votre forecast.
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vous voulez préparer votre pipeline H2 avec un regard extérieur ?
            </h3>
            <p className="mb-6">
              Un diagnostic commercial de 2 heures permet de faire le point sur votre pipeline,
              vos objectifs et vos leviers avant l&apos;été. Pas de pitch, pas d&apos;engagement.
              Juste une lecture lucide de votre situation réelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Faire un diagnostic
              </Link>
              <Link href="/bootcamp" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Découvrir le Bootcamp
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
