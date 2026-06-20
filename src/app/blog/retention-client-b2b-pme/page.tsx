import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/retention-client-b2b-pme';
const heroImage = '/images/blog/retention-client-b2b-pme/retention-client-hero.webp';
const ogImage = 'https://www.laurentserre.com/images/blog/retention-client-b2b-pme/retention-client-og.jpg';

export const metadata: Metadata = {
  title: 'Rétention client B2B : pourquoi vos meilleurs clients partent en silence',
  description:
    'Pourquoi vos meilleurs clients B2B partent-ils en silence ? Parce que personne ne parle au client après la signature. La méthode terrain pour boucher les fuites : revue trimestrielle, health score, responsabilité commerciale post-vente.',
  keywords:
    'rétention client B2B, churn B2B PME, fidélisation client B2B méthode, perte de client B2B causes, post-vente commerciale, customer retention PME, revue trimestrielle client QBR, health score client',
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-20',
  },
  openGraph: {
    title: 'Vos meilleurs clients partent en silence (et comment l\'éviter)',
    description:
      'La rétention n\'est pas un sujet post-vente. C\'est un design commercial. Méthode terrain pour éviter le churn silencieux en PME B2B.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Rétention client B2B : vos meilleurs clients partent en silence',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vos meilleurs clients partent en silence (et comment l\'éviter) | Laurent Serre',
    description:
      'La rétention n\'est pas un sujet post-vente. C\'est un design commercial. Méthode terrain pour éviter le churn silencieux en PME B2B.',
    images: [ogImage],
  },
};

const carouselPrefix = '/images/blog/retention-client-b2b-pme';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Couverture : six mois sans un seul appel et le contrat est parti', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-mail.webp`, alt: 'Le mail qui annonce le non-renouvellement', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-flashback.webp`, alt: 'Flashback : la signature six mois plus tôt', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-justification.webp`, alt: 'La justification : le prix ou le concurrent', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-laurent.webp`, alt: 'Laurent pose la question qui dérange', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-silence.webp`, alt: 'Le silence gêné de Stéphane', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-laurent-creuse.webp`, alt: 'Laurent creuse : personne n\'a rappelé', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-revelation.webp`, alt: 'La révélation : elle est partie parce qu\'on a disparu', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-methode.webp`, alt: 'La méthode : rituel, indicateur, responsable', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10-action.webp`, alt: 'Stéphane rappelle Madame Lefranc', index: 9 },
  { src: `${carouselPrefix}/bd-slide-11-chute.webp`, alt: 'Chute : signer n\'est pas la fin, c\'est le début', index: 10 },
  { src: `${carouselPrefix}/bd-slide-12-cta.webp`, alt: 'CTA : diagnostic offert sur laurentserre.com', index: 11 },
];

const faqItems = [
  {
    question: 'Qu\'est-ce que le churn en B2B ?',
    answer:
      'Le churn en B2B désigne la perte de clients existants sur une période donnée. Contrairement au B2C où un client peut partir en un clic, le churn B2B est souvent silencieux : le client ne renouvelle pas son contrat, réduit ses volumes, ou change de fournisseur sans bruit. Le taux de churn se calcule en divisant le nombre de clients perdus par le nombre total de clients en début de période. Un taux de churn supérieur à 5% par an dans une PME B2B indique un problème de design commercial : personne n\'est responsable de la relation post-signature.',
  },
  {
    question: 'Comment réduire le taux de churn B2B ?',
    answer:
      'Pour réduire le churn B2B, trois leviers concrets : 1) instaurer une revue trimestrielle client (QBR) avec un ordre du jour structuré pour chaque compte stratégique, 2) mettre en place un score de santé du compte simple (fréquence des échanges, évolution de l\'usage, stabilité des contacts), 3) assigner clairement la responsabilité du client au commercial qui a signé pendant les 12 premiers mois. Le churn ne se réduit pas avec des gestes ponctuels mais avec un rituel commercial structuré.',
  },
  {
    question: 'Pourquoi perd-on ses clients B2B ?',
    answer:
      'Dans la majorité des cas en PME B2B, on perd ses clients non pas à cause du prix ou de la concurrence, mais par indifférence post-vente. Le client a signé pour une promesse, et personne n\'est venu vérifier que cette promesse tenait dans le réel. Le sentiment d\'abandon est la première cause de départ silencieux. Viennent ensuite le changement de référent côté client sans transfert de relation, et l\'absence de détection des signaux faibles (baisse d\'usage, sollicitations qui se raréfient, questions sans suite).',
  },
  {
    question: 'Quel est le rôle du commercial dans la fidélisation ?',
    answer:
      'Le commercial qui a signé doit rester le référent du client pendant au moins 12 mois. Ce n\'est pas le support ou le service client qui gère la relation, c\'est celui qui a fait la promesse. Son rôle : organiser une revue trimestrielle, détecter les signaux faibles, identifier les opportunités d\'expansion (upsell, cross-sell), et s\'assurer que la promesse initiale tient dans le réel. La fidélisation est une responsabilité commerciale, pas une fonction accessoire.',
  },
  {
    question: 'Comment mettre en place une revue trimestrielle client (QBR) ?',
    answer:
      'Une revue trimestrielle client (QBR) se met en place en 4 étapes : 1) sélectionner les comptes stratégiques (ceux qui représentent 80% du CA ou du potentiel), 2) calenderiser un rendez-vous récurrent de 45 à 60 minutes chaque trimestre, 3) structurer l\'ordre du jour : ce qui marche, ce qui ne marche pas, ce qui va changer, 4) produire un compte-rendu court avec les actions décidées. Si le client décline la QBR deux fois de suite, c\'est un signal fort de désengagement qu\'il faut traiter immédiatement.',
  },
  {
    question: 'Qu\'est-ce qu\'un health score client ?',
    answer:
      'Un health score client est un indicateur simple qui mesure la santé de la relation avec un compte donné. En PME B2B, il n\'a pas besoin d\'être sophistiqué : trois critères suffisent. Est-ce qu\'on a eu un échange réel ce mois-ci ? Est-ce que l\'usage du produit ou service monte ou descend ? Est-ce que les personnes engagées au départ sont toujours là ? Un score rouge déclenche une action immédiate du commercial référent. L\'objectif n\'est pas la précision statistique, mais la détection précoce du silence.',
  },
];

export default function RetentionClientB2BPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Vos meilleurs clients partent en silence',
        description:
          'Pourquoi vos meilleurs clients B2B partent-ils en silence ? La rétention n\'est pas un sujet post-vente, c\'est un design commercial.',
        image: heroImage,
        datePublished: '2026-06-20',
        dateModified: '2026-06-20',
        author: {
          name: 'Laurent Serre',
          url: 'https://www.laurentserre.com/a-propos',
          sameAs: [
            'https://www.linkedin.com/in/laurentserre34/',
            'https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/',
          ],
        },
        publisher: {
          name: 'Laurent Serre',
          url: 'https://www.laurentserre.com',
        },
        mainEntityOfPage: {
          '@id': articleUrl,
        },
        articleSection: 'Rétention client / Développement commercial',
        keywords: [
          'rétention client B2B',
          'churn B2B PME',
          'fidélisation client B2B',
          'revue trimestrielle client QBR',
          'health score client',
          'perte de client B2B',
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
          { '@type': 'ListItem', position: 3, name: 'Rétention client B2B', item: articleUrl },
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
              <li className="text-blue-ink font-medium" aria-current="page">Rétention client B2B</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Rétention client / Développement commercial
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Vos meilleurs clients partent en silence
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image
                  src="/laurent.jpg"
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
              <span>•</span>
              <time dateTime="2026-06-20">20 juin 2026</time>
              <span>•</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Rétention client B2B : vos meilleurs clients partent en silence"
              width={1536}
              height={1024}
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
          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">
              Ce qu&apos;il faut retenir
            </p>
            <p className="text-gray-700 leading-relaxed">
              La rétention n&apos;est pas un sujet post-vente. C&apos;est un design commercial. Trois leviers pour arrêter de perdre vos clients en silence : un rituel de revue trimestrielle, un indicateur de santé du compte, et un nom responsable pendant douze mois.
            </p>
          </div>

          {/* BD Carousel */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : Le client qui part en silence
            </p>
            <p className="text-sm text-amber-700 mb-5">
              L&apos;histoire de Stéphane, commercial qui réalise trop tard que son meilleur client est parti sans un mot. Du mail qui annonce le non-renouvellement à la méthode pour reconstruire.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Vos meilleurs clients partent en silence"
              maxPreview={2}
            />
          </div>

          {/* CTA SOFT — après carrousel */}
          <div className="mb-6 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              🔍 Vos meilleurs clients deviennent silencieux ? Faites un diagnostic →
            </Link>
          </div>

          <p className="lead text-xl text-gray-700 leading-relaxed mb-8">
            Le commercial ne finit pas à la signature. C&apos;est là qu&apos;il commence vraiment.
          </p>

          <p>
            Vos meilleurs clients partent en silence. Pas après une crise. Pas après une réclamation mal gérée. Ils partent comme on s&apos;éloigne d&apos;une conversation qui n&apos;apporte plus rien. Sans bruit. Sans motif apparent. Un jour, le contrat n&apos;est pas renouvelé. Ou le volume baisse. Ou le référent change et personne n&apos;appelle.
          </p>

          <p>
            Je vois souvent des commerciaux qui vivent la signature comme la fin du travail. Le contrat est signé. L&apos;affaire est dans le CRM. On passe au suivant.
          </p>

          <p>
            Le problème, c&apos;est que le client n&apos;a jamais considéré que c&apos;était terminé. Pour lui, la vraie relation commence juste. Il a acheté une promesse. Maintenant il veut voir ce que ça donne dans le vrai monde, avec ses équipes, dans sa vraie vie. Et pendant ce temps-là, le commercial qui l&apos;a signé est déjà sur le prochain prospect.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Le problème n&apos;est pas le prix. C&apos;est l&apos;absence.</h2>

          <p>
            Ce n&apos;est pas un problème de service client. C&apos;est un problème de design commercial. Qui appelle le client à 30 jours ? À 60 jours ? Qui vérifie que la promesse tient dans le réel ? Qui détecte les signaux faibles avant qu&apos;ils ne deviennent du silence ?
          </p>

          <p>
            Dans la plupart des PME que j&apos;accompagne, la réponse est : personne. Ou alors le support, qui n&apos;a pas la posture commerciale pour détecter une opportunité d&apos;expansion. Ou le DirCo, qui n&apos;a pas le temps.
          </p>

          <p>
            La vérité dure : la rétention ne se décrète pas. Elle se construit, ou elle n&apos;existe pas. Un client qui ne donne pas de nouvelles n&apos;est pas un client satisfait. C&apos;est un client qui n&apos;a pas encore trouvé le moment de partir.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Trois leviers pour boucher les fuites</h2>

          <p>
            La méthode n&apos;est pas compliquée. Mais elle demande de la discipline.
          </p>

          <p>
            <strong>Un rituel.</strong> Une revue trimestrielle avec chaque client stratégique. Pas un mail. Pas un message rapide. Un vrai rendez-vous calendaire, avec un ordre du jour, où on parle de ce qui marche, de ce qui ne marche pas, et de ce qui va changer. Si le client décline, c&apos;est un signal. S&apos;il vient, la relation se renforce.
          </p>

          <p>
            <strong>Un indicateur.</strong> Ne pas attendre le non-renouvellement pour réagir. Chaque compte devrait avoir un score de santé simple. Est-ce qu&apos;on a eu des échanges ce mois-ci ? Est-ce que l&apos;usage monte ou descend ? Est-ce que les personnes engagées au départ sont toujours là ?
          </p>

          <p>
            <strong>Une responsabilité.</strong> Pas un rôle flou. Un nom. Le commercial qui a signé garde le compte pendant 12 mois. Ce n&apos;est pas le support qui gère la relation. C&apos;est celui qui a promis.
          </p>

          {/* CTA MEDIUM — entre les sections */}
          <div className="bg-gradient-to-r from-mint-green/10 to-blue-ink/5 border border-mint-green/20 rounded-2xl p-6 my-10 text-center">
            <p className="text-lg font-title font-bold text-blue-ink mb-3">
              Vous ne savez pas combien de clients sont sortis par l&apos;autre bout ?
            </p>
            <p className="text-gray-600 mb-5 max-w-xl mx-auto">
              Un diagnostic terrain de 2 heures suffit pour identifier les fuites et mettre en place les rituels qui les arrêtent.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-ink hover:bg-blue-ink/90 transition-colors"
            >
              Demander un diagnostic offert
            </Link>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Arrêtez de remplir une passoire</h2>

          <p>
            J&apos;accompagne des DirCo obnubilés par le volume de prospects. Combien de nouveaux rendez-vous cette semaine. Combien d&apos;opportunités nouvelles dans le CRM.
          </p>

          <p>
            Ils ne regardent jamais combien de clients sont sortis par l&apos;autre bout.
          </p>

          <p>
            C&apos;est remplir une passoire en espérant qu&apos;elle se remplisse. Avant de prospecter plus, bouchez les fuites.
          </p>

          <p>
            Vos meilleurs clients sont ceux que vous avez déjà. Ce sont les plus rentables, les plus faciles à développer, les plus susceptibles de vous recommander. Et ce sont les premiers à partir en silence quand personne ne s&apos;en occupe.
          </p>

          <p>
            Le commercial ne finit pas à la signature. C&apos;est là qu&apos;il commence vraiment.
          </p>

          {/* ════════ POUR ALLER PLUS LOIN ════════ */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/blog/prochain-million-portefeuille-clients-expansion" className="text-mint-green hover:underline font-medium">
                  Votre prochain million est dans votre portefeuille clients
                </Link>
                <span className="text-gray-500"> — Pourquoi 70% du CA potentiel dort chez vos clients existants.</span>
              </li>
              <li>
                <Link href="/blog/comptes-strategiques-dormants-relance-dirigeant" className="text-mint-green hover:underline font-medium">
                  Comptes stratégiques dormants : comment les réveiller
                </Link>
                <span className="text-gray-500"> — Identifier et relancer les comptes endormis avant qu&apos;ils ne partent.</span>
              </li>
              <li>
                <Link href="/blog/coaching-commercial-terrain-5-leviers-transformation-equipe" className="text-mint-green hover:underline font-medium">
                  Coaching commercial terrain : 5 leviers de transformation
                </Link>
                <span className="text-gray-500"> — Transformer une équipe commerciale pour qu&apos;elle signe et garde ses clients.</span>
              </li>
              <li>
                <Link href="/blog/vente-consultative-b2b-comment-devenir-le-conseiller-que-vos-clients-ne-veulent-pas-perdre" className="text-mint-green hover:underline font-medium">
                  Devenir le conseiller que vos clients ne veulent pas perdre
                </Link>
                <span className="text-gray-500"> — La posture commerciale qui fidélise durablement.</span>
              </li>
            </ul>
          </div>

          {/* CTA FORT — bloc gradient, 2 boutons */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous perdez des clients sans savoir pourquoi ?</h3>
            <p className="mb-6">
              La plupart des dirigeants découvrent les fuites quand le chiffre baisse. Un diagnostic permet de voir où la relation coince, avant que les clients ne partent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Demander un diagnostic commercial
              </Link>
              <Link href="/bootcamp" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Découvrir le Bootcamp Méthodes de vente
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-8">
              Questions fréquentes sur la rétention client B2B
            </h2>
            <div className="space-y-8">
              {faqItems.map((item, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AuthorCard + CTA secondaire */}
          <div className="mt-12">
            <AuthorCard />
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Coach commercial terrain depuis 15 ans. J&apos;accompagne les PME B2B à structurer leur développement commercial, de la prospection à la rétention.{' '}
              <Link href="/contact" className="text-mint-green hover:text-mint-green/80 font-medium transition-colors">
                Contactez-moi
              </Link>
              .
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
