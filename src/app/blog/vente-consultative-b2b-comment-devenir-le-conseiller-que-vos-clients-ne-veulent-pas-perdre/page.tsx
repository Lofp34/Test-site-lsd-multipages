import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Vente consultative B2B : les 4 piliers | Laurent Serre',
  description:
    'La vente consultative B2B transforme le commercial en conseiller de confiance : 4 piliers, découverte, proposition et obstacles à traiter.',
  keywords:
    'vente consultative B2B, posture consultative, vente conseil, vente complexe B2B, techniques de vente consultative, commercial consultant, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/vente-consultative-b2b-comment-devenir-le-conseiller-que-vos-clients-ne-veulent-pas-perdre',
  },
  openGraph: {
    title: 'Vente consultative B2B : devenir le conseiller que vos clients gardent',
    description:
      'Pas une technique de manipulation. Une posture : aider le client à prendre la meilleure décision, même si ce n\'est pas chez vous.',
    url: 'https://www.laurentserre.com/blog/vente-consultative-b2b-comment-devenir-le-conseiller-que-vos-clients-ne-veulent-pas-perdre',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-05-08-vente-consultative-b2b-hero.webp',
        width: 1536,
        height: 864,
        alt: 'Vente consultative B2B — devenir le conseiller que vos clients ne veulent pas perdre',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vente consultative B2B : les 4 piliers | Laurent Serre',
    description:
      'La posture commerciale qui transforme un vendeur B2B en conseiller de confiance.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-08-vente-consultative-b2b-hero.webp'],
  },
};

export default function ArticlePage() {
  const articleUrl =
    'https://www.laurentserre.com/blog/vente-consultative-b2b-comment-devenir-le-conseiller-que-vos-clients-ne-veulent-pas-perdre';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': articleUrl + '#posting',
        headline:
          'Vente consultative B2B : comment devenir le conseiller que vos clients ne veulent pas perdre',
        description:
          'La vente consultative B2B transforme le commercial en conseiller de confiance : 4 piliers, découverte, proposition et obstacles à traiter.',
        image: 'https://www.laurentserre.com/images/blog/2026-05-08-vente-consultative-b2b-hero.webp',
        datePublished: '2026-05-07',
        dateModified: '2026-05-11',
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
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.laurentserre.com/logo.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl,
        },
        keywords: [
          'vente consultative B2B',
          'posture consultative',
          'vente conseil',
          'vente complexe B2B',
          'techniques de vente consultative',
          'commercial consultant',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': articleUrl + '#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Qu\'est-ce que la vente consultative B2B ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La vente consultative B2B est une posture commerciale qui consiste à aider le client à comprendre sa situation, ses risques et ses options avant de proposer une solution. Le commercial agit comme un conseiller de confiance, pas comme un simple présentateur de produit.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quelle est la différence entre vente consultative et vente traditionnelle ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La vente traditionnelle part souvent du produit et du pitch. La vente consultative part du diagnostic client : enjeux business, contraintes, critères de succès, risques du statu quo et décision interne.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment former une équipe commerciale à la posture consultative ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Commencez par ritualiser la découverte : 20 premières minutes sans pitch, questions d\'impact, reformulation écrite, proposition structurée autour des enjeux client et entraînement régulier en revue de deals.',
            },
          },
        ],
      },
    
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', 'position': 3, 'name': 'Vente consultative B2B', 'item': 'https://www.laurentserre.com/blog/vente-consultative-b2b-comment-devenir-le-conseiller-que-vos-clients-ne-veulent-pas-perdre' },
        ],
      }
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
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/blog" className="hover:text-mint-green transition-colors">
                ← Retour au blog
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Vente B2B / posture consultative</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Vente consultative B2B : comment devenir le conseiller que vos clients ne veulent pas perdre
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
              <time dateTime="2026-05-07">7 mai 2026</time>
              <span>•</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-05-08-vente-consultative-b2b-hero.webp"
              alt="Vente consultative B2B — devenir le conseiller que vos clients ne veulent pas perdre"
              width={1536}
              height={864}
              priority
              className="w-full h-80 object-cover object-center rounded-2xl shadow-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
            Il y a deux types de commerciaux B2B. Ceux que les clients supportent. Et ceux que les clients cherchent à rappeler.
          </p>
          <p className="mb-8">
            La différence ? Les premiers vendent un produit. Les seconds résolvent des problèmes.
          </p>
          <p className="mb-8">
            La <strong>vente consultative B2B</strong>, c&apos;est exactement ça. Pas une technique de manipulation. Pas un discours sophistiqué. Une posture fondamentalement différente : vous n&apos;êtes pas là pour vendre. Vous êtes là pour aider votre client à prendre la meilleure décision — même si cette décision, parfois, c&apos;est de ne pas acheter chez vous.
          </p>
          <p className="mb-8">Paradoxal ? En apparence. Terriblement efficace en pratique.</p>

          <div className="bg-mint-green/10 border border-mint-green/30 rounded-2xl p-6 mb-10">
            <p className="font-title font-bold text-blue-ink text-sm uppercase tracking-wider mb-3">🎯 Ce que vous allez retenir</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>La vente consultative B2B</strong> commence par un diagnostic, pas par un pitch produit.</li>
              <li><strong>4 piliers</strong> structurent la posture : curiosité, compréhension métier, honnêteté, co-construction.</li>
              <li><strong>La découverte</strong> est le cœur du processus : enjeux, problèmes, tentatives, contraintes, critères de succès.</li>
              <li><strong>La proposition</strong> doit reformuler la situation client avant de présenter l&apos;offre.</li>
              <li><strong>Le vrai changement</strong> se joue dans les habitudes de l&apos;équipe, pas dans une formation isolée.</li>
            </ul>
          </div>

          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 mb-10">
            <p className="font-title font-bold text-blue-ink text-sm uppercase tracking-wider mb-3">📋 Sommaire</p>
            <ul className="space-y-1.5 text-sm">
              <li><a href="#vente-traditionnelle" className="text-mint-green hover:underline">1. Pourquoi la vente traditionnelle ne fonctionne plus</a></li>
              <li><a href="#piliers" className="text-mint-green hover:underline">2. Les 4 piliers de la posture consultative</a></li>
              <li><a href="#decouverte" className="text-mint-green hover:underline">3. La phase de découverte</a></li>
              <li><a href="#proposition" className="text-mint-green hover:underline">4. Structurer une proposition consultative</a></li>
              <li><a href="#obstacles" className="text-mint-green hover:underline">5. Les obstacles en PME</a></li>
              <li><a href="#faq" className="text-mint-green hover:underline">6. FAQ vente consultative B2B</a></li>
            </ul>
          </div>

          <h2 id="vente-traditionnelle" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Pourquoi la vente traditionnelle ne fonctionne plus en B2B</h2>
          <p className="mb-8">
            Le contexte a changé. Vos prospects arrivent en entretien avec déjà une grande partie de leur décision faite. Ils ont cherché sur Google. Ils ont comparé sur des sites spécialisés. Ils ont lu vos avis clients. Ils ont parfois même testé vos concurrents avant de vous parler.
          </p>
          <p className="mb-8">
            Ils n&apos;ont pas besoin de quelqu&apos;un qui leur explique votre produit. Ils ont besoin de quelqu&apos;un qui les aide à valider leur analyse, à identifier les angles morts, et à prendre une décision éclairée.
          </p>
          <p className="mb-8">
            Le commercial qui arrive avec son pitch de 20 slides et qui parle de lui pendant 40 minutes est devenu obsolète. Le client le sait. Et il le supporte de moins en moins. C&apos;est aussi pour cette raison que certaines méthodes de vente doivent être choisies selon la maturité du client : voir le comparatif{' '}
            <Link href="/blog/methodes-vente-comparees-spin-bant-bebedc" className="text-mint-green hover:underline font-medium">
              SPIN, BANT et BEBEDC
            </Link>
            .
          </p>

          <h2 id="piliers" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Les 4 piliers de la posture consultative</h2>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mt-8 mb-4">Pilier 1 : la curiosité constructive</h3>
          <p className="mb-6">
            Un consultant pose des questions. Beaucoup de questions. Pas pour remplir une fiche de découverte, mais parce qu&apos;il est sincèrement curieux de comprendre la réalité du client.
          </p>
          <p className="mb-4">Questions consultatives typiques :</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>« Comment ce problème impacte-t-il concrètement votre activité ? »</li>
            <li>« Qu&apos;avez-vous déjà essayé pour le résoudre ? »</li>
            <li>« Si vous ne faites rien dans les 6 prochains mois, que se passe-t-il ? »</li>
            <li>« Quel serait pour vous le résultat idéal ? »</li>
          </ul>
          <p className="mb-8">
            La règle : plus vous parlez, moins vous apprenez. Dans un entretien consultatif, le client devrait parler la majorité du temps. Si vos commerciaux répondent trop vite aux objections, travaillez d&apos;abord cette discipline d&apos;écoute avec{' '}
            <Link href="/blog/pourquoi-vos-commerciaux-repondent-trop-vite-aux-objections" className="text-mint-green hover:underline font-medium">
              cette analyse sur les réponses trop rapides aux objections
            </Link>
            .
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mt-8 mb-4">Pilier 2 : la compréhension de l&apos;écosystème</h3>
          <p className="mb-6">
            Un vendeur connaît son produit. Un consultant connaît le business de son client.
          </p>
          <p className="mb-6">
            Comprenez le secteur, les enjeux actuels, les contraintes réglementaires ou concurrentielles. Quand vous montrez que vous comprenez vraiment leur réalité métier, la confiance s&apos;installe immédiatement.
          </p>
          <p className="mb-8">
            Avant chaque entretien, prenez 15 minutes pour vous préparer : site web du client, actualités récentes, LinkedIn des interlocuteurs, tendances du secteur.
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mt-8 mb-4">Pilier 3 : l&apos;honnêteté sur vos limites</h3>
          <p className="mb-6">
            Contre-intuitif mais redoutablement efficace : si votre solution ne répond pas à un besoin spécifique du client, dites-le.
          </p>
          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              « Pour cet aspect précis, je dois être honnête avec vous — ce n&apos;est pas notre point fort. En revanche, sur vos trois enjeux principaux, voici ce que nous apportons concrètement… »
            </p>
          </div>
          <p className="mb-8">
            Cette honnêteté distingue le consultant du vendeur. Et elle crée une confiance que les clients n&apos;oublient pas. Elle aide aussi à éviter les discussions de prix mal cadrées, où le commercial défend une offre que le client n&apos;a pas encore reliée à ses vrais enjeux.
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mt-8 mb-4">Pilier 4 : la co-construction de la solution</h3>
          <p className="mb-6">
            Plutôt que de proposer une solution prête à l&apos;emploi, co-construisez avec le client.
          </p>
          <p className="mb-6">
            « D&apos;après ce que vous m&apos;avez décrit, voici ce que je vois comme chemin possible. Est-ce que ça correspond à votre vision ? Qu&apos;est-ce que vous modifieriez ? »
          </p>
          <p className="mb-8">
            Le client qui a participé à la construction de la solution en est davantage propriétaire. Il la défend en interne. Il la met en œuvre plus efficacement.
          </p>

          <h2 id="decouverte" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">La phase de découverte : le cœur de la vente consultative</h2>
          <p className="mb-8">
            Si la vente consultative avait un seul moment clé, ce serait la phase de découverte. C&apos;est là que tout se joue.
          </p>
          <p className="mb-4"><strong>Ce que vous devez comprendre avant de proposer quoi que ce soit :</strong></p>
          <ol className="list-decimal pl-6 mb-8 space-y-3">
            <li><strong>Les enjeux business</strong> : quel est l&apos;objectif stratégique sous-jacent à ce projet ? Croissance, optimisation, réduction de risques ?</li>
            <li><strong>Les problèmes concrets</strong> : qu&apos;est-ce qui ne fonctionne pas aujourd&apos;hui ? Depuis quand ? Avec quelles conséquences ?</li>
            <li><strong>Les tentatives passées</strong> : ont-ils déjà essayé de résoudre ce problème ? Avec quels résultats ?</li>
            <li><strong>Les contraintes</strong> : budget, délais, organisation, politique interne, décideurs impliqués.</li>
            <li><strong>Les critères de succès</strong> : comment sauront-ils que le projet a réussi ? Quels indicateurs ?</li>
          </ol>
          <p className="mb-8">
            Ne proposez rien avant d&apos;avoir réponse à ces cinq points. C&apos;est la discipline qui distingue le commercial consultatif du commercial qui « pitche » sans avoir écouté. Pour transformer ces réponses en arbitrage commercial, le bon réflexe consiste ensuite à passer par une{' '}
            <Link href="/blog/revue-deal-avant-proposition-3-verifications" className="text-mint-green hover:underline font-medium">
              revue de deal avant proposition
            </Link>
            .
          </p>

          <h2 id="proposition" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Structurer votre proposition en mode consultatif</h2>
          <p className="mb-8">
            Une proposition consultative ne commence pas par « voici notre offre ». Elle commence par « voici ce que j&apos;ai compris de votre situation ».
          </p>
          <p className="mb-4"><strong>Structure d&apos;une proposition consultative :</strong></p>
          <ol className="list-decimal pl-6 mb-8 space-y-3">
            <li><strong>Diagnostic</strong> : reformulation des enjeux et problèmes identifiés lors de la découverte.</li>
            <li><strong>Enjeux</strong> : ce que ça coûte de ne rien faire — en argent, en temps, en risques.</li>
            <li><strong>Approche recommandée</strong> : votre solution, expliquée dans le langage des enjeux du client.</li>
            <li><strong>Résultats attendus</strong> : chiffrés si possible, réalistes toujours.</li>
            <li><strong>Modalités pratiques</strong> : comment on travaille ensemble, les étapes, les livrables.</li>
          </ol>
          <p className="mb-8">
            Cette structure montre que vous avez écouté. Elle positionne votre solution comme une réponse à leurs enjeux — pas comme un produit que vous voulez vendre. C&apos;est aussi ce qui rend le closing plus naturel : quand la décision a été co-construite, il y a moins besoin de forcer. Sur ce point, lisez aussi{' '}
            <Link href="/blog/closing-b2b-7-techniques" className="text-mint-green hover:underline font-medium">
              les 7 techniques de closing B2B
            </Link>
            .
          </p>

          <h2 id="obstacles" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Les obstacles à la vente consultative en PME</h2>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mt-8 mb-4">Obstacle 1 : « On n&apos;a pas le temps »</h3>
          <p className="mb-8">
            La vente consultative prend plus de temps en phase de découverte. Mais elle génère des cycles de vente globalement plus courts, parce qu&apos;elle élimine les allers-retours sur des propositions inadaptées.
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mt-8 mb-4">Obstacle 2 : « Nos commerciaux sont habitués à pitcher »</h3>
          <p className="mb-8">
            Changer une habitude de vente prend du temps. Commencez par une règle simple : les 20 premières minutes de tout entretien sont dédiées aux questions. Aucun slide, aucun discours produit avant 20 minutes.
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mt-8 mb-4">Obstacle 3 : « Le client veut qu&apos;on lui présente notre offre tout de suite »</h3>
          <p className="mb-8">
            Parfois vrai. Dans ce cas, présentez rapidement votre offre, puis revenez rapidement aux questions : « Je vous ai donné une première vision de ce qu&apos;on fait. Pour être sûr que ça correspond à vos besoins, j&apos;aimerais mieux comprendre votre situation. Ça vous va si je vous pose quelques questions ? »
          </p>

          <p className="text-xs text-gray-400 mb-8">
            Source E-E-A-T : cette bascule du pitch produit vers l&apos;accompagnement de décision est cohérente avec les analyses publiées par Harvard Business Review sur l&apos;évolution de la vente complexe, notamment{' '}
            <a href="https://hbr.org/2012/07/the-end-of-solution-sales" target="_blank" rel="noopener noreferrer" className="text-mint-green hover:underline">
              The End of Solution Sales
            </a>
            .
          </p>

          <h2 id="faq" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">FAQ — vente consultative B2B</h2>
          <div className="space-y-6 mb-10">
            <div>
              <h3 className="text-2xl font-title font-semibold text-blue-ink mb-3">Qu&apos;est-ce que la vente consultative B2B ?</h3>
              <p className="mb-0">
                C&apos;est une posture commerciale qui consiste à aider le client à comprendre sa situation, ses risques et ses options avant de proposer une solution. Le commercial agit comme un conseiller de confiance, pas comme un simple présentateur de produit.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-title font-semibold text-blue-ink mb-3">Quelle différence avec la vente traditionnelle ?</h3>
              <p className="mb-0">
                La vente traditionnelle part souvent du produit et du pitch. La vente consultative part du diagnostic client : enjeux business, contraintes, critères de succès, risques du statu quo et décision interne.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-title font-semibold text-blue-ink mb-3">Comment former une équipe commerciale à cette posture ?</h3>
              <p className="mb-0">
                Commencez par ritualiser la découverte : 20 premières minutes sans pitch, questions d&apos;impact, reformulation écrite, proposition structurée autour des enjeux client et entraînement régulier en revue de deals.
              </p>
            </div>
          </div>

          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">📖 Pour aller plus loin</p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/blog/methodes-vente-comparees-spin-bant-bebedc" className="text-mint-green hover:underline font-medium">
                  Méthodes de vente comparées : SPIN, BANT, BEBEDC
                </Link>
                <span className="text-gray-500"> — Pour choisir la bonne grille de qualification selon le niveau de maturité du prospect.</span>
              </li>
              <li>
                <Link href="/blog/gestion-des-objections-commerciales-transformer-le-non-en-opportunite" className="text-mint-green hover:underline font-medium">
                  Gestion des objections commerciales : transformer le non en opportunité
                </Link>
                <span className="text-gray-500"> — Le prolongement naturel de l&apos;écoute consultative en situation de résistance.</span>
              </li>
              <li>
                <Link href="/blog/revue-deal-avant-proposition-3-verifications" className="text-mint-green hover:underline font-medium">
                  Revue de deal avant proposition : 3 vérifications
                </Link>
                <span className="text-gray-500"> — Pour éviter d&apos;envoyer une offre avant d&apos;avoir vraiment qualifié la décision.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous souhaitez transformer votre équipe commerciale ?</h3>
            <p className="mb-6">
              La vente consultative ne s&apos;improvise pas. Elle se travaille, se pratique, et s&apos;incarne dans une équipe. Si vous voulez faire passer vos commerciaux du statut de « vendeur » à celui de « conseiller de confiance », je peux vous aider à construire ce chemin.
            </p>
            <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
              Faire un diagnostic commercial →
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/blog" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
              ← Tous les articles du blog
            </Link>
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
