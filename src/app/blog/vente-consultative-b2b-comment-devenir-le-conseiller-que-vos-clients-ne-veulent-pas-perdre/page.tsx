import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Vente consultative B2B : comment devenir le conseiller que vos clients ne veulent pas perdre | Laurent Serre',
  description:
    'La vente consultative B2B n\'est pas une technique de manipulation. C\'est une posture : vous n\'êtes pas là pour vendre, vous êtes là pour aider le client à prendre la meilleure décision. Les 4 piliers et la méthode terrain.',
  keywords:
    'vente consultative B2B, posture consultative, vente conseil, vente complexe B2B, techniques de vente consultative, commercial consultant, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/vente-consultative-b2b-comment-devenir-le-conseiller-que-vos-clients-ne-veulent-pas-perdre',
  },
  openGraph: {
    title: 'Vente consultative B2B : comment devenir le conseiller que vos clients ne veulent pas perdre',
    description:
      'Pas une technique de manipulation. Une posture : être là pour aider le client à prendre la meilleure décision, même si ce n\'est pas chez vous. Les 4 piliers de la posture consultative.',
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
    title: 'Vente consultative B2B : comment devenir le conseiller que vos clients ne veulent pas perdre | Laurent Serre',
    description:
      'Pas une technique de manipulation. Une posture : aider le client à prendre la meilleure décision, même si ce n\'est pas chez vous.',
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
        headline:
          'Vente consultative B2B : comment devenir le conseiller que vos clients ne veulent pas perdre',
        description:
          'La vente consultative B2B, ce n\'est pas une technique de manipulation. C\'est une posture : vous n\'êtes pas là pour vendre, vous êtes là pour aider le client à prendre la meilleure décision — même si cette décision, parfois, c\'est de ne pas acheter chez vous.',
        image: 'https://www.laurentserre.com/images/blog/2026-05-08-vente-consultative-b2b-hero.webp',
        datePublished: '2026-05-07',
        dateModified: '2026-05-07',
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
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="blog-article">
        <div className="blog-article__container">
          {/* Breadcrumb */}
          <nav className="blog-article__breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span className="blog-article__breadcrumb-sep">›</span>
            <Link href="/blog">Blog</Link>
            <span className="blog-article__breadcrumb-sep">›</span>
            <span>Vente consultative B2B</span>
          </nav>

          {/* Header */}
          <header className="blog-article__header">
            <h1 className="blog-article__title">
              Vente consultative B2B : comment devenir le conseiller que vos clients ne veulent pas perdre
            </h1>
            <p className="blog-article__meta">Publié le 7 mai 2026</p>
          </header>

          {/* Hero image */}
          <div className="blog-article__hero">
            <Image
              src="/images/blog/2026-05-08-vente-consultative-b2b-hero.webp"
              alt="Vente consultative B2B — devenir le conseiller que vos clients ne veulent pas perdre"
              width={1536}
              height={864}
              priority
              className="blog-article__hero-img"
            />
          </div>

          {/* Content */}
          <div className="blog-article__content">
            <p className="blog-article__lead">
              Il y a deux types de commerciaux B2B. Ceux que les clients supportent. Et ceux que les clients cherchent à rappeler.
            </p>
            <p>
              La différence ? Les premiers vendent un produit. Les seconds résolvent des problèmes.
            </p>
            <p>
              La vente consultative B2B, c'est exactement ça. Pas une technique de manipulation. Pas un discours sophistiqué. Une posture fondamentalement différente : vous n'êtes pas là pour vendre. Vous êtes là pour aider votre client à prendre la meilleure décision — même si cette décision, parfois, c'est de ne pas acheter chez vous.
            </p>
            <p>Paradoxal ? En apparence. Terriblement efficace en pratique.</p>

            <h2>Pourquoi la vente traditionnelle ne fonctionne plus en B2B</h2>
            <p>
              Le contexte a changé. Vos prospects arrivent en entretien avec déjà 60 à 70% de leur décision faite. Ils ont cherché sur Google. Ils ont comparé sur des sites spécialisés. Ils ont lu vos avis clients.
            </p>
            <p>
              Ils n'ont pas besoin de quelqu'un qui leur explique votre produit. Ils ont besoin de quelqu'un qui les aide à valider leur analyse, à identifier les angles morts, et à prendre une décision éclairée.
            </p>
            <p>
              Le commercial qui arrive avec son pitch de 20 slides et qui parle de lui pendant 40 minutes — ce commercial est devenu obsolète. Le client le sait. Et il le supporte de moins en moins.
            </p>

            <h2>Les 4 piliers de la posture consultative</h2>

            <h3>Pilier 1 : La curiosité constructive</h3>
            <p>
              Un consultant pose des questions. Beaucoup de questions. Pas pour remplir une fiche de découverte, mais parce qu'il est sincèrement curieux de comprendre la réalité du client.
            </p>
            <p>Questions consultatives typiques :</p>
            <ul>
              <li>« Comment ce problème impacte-t-il concrètement votre activité ? »</li>
              <li>« Qu'avez-vous déjà essayé pour le résoudre ? »</li>
              <li>« Si vous ne faites rien dans les 6 prochains mois, que se passe-t-il ? »</li>
              <li>« Quel serait pour vous le résultat idéal ? »</li>
            </ul>
            <p>
              La règle : plus vous parlez, moins vous apprenez. Dans un entretien consultatif, le client devrait parler 70% du temps.
            </p>

            <h3>Pilier 2 : La compréhension de l'écosystème</h3>
            <p>
              Un vendeur connaît son produit. Un consultant connaît le business de son client.
            </p>
            <p>
              Comprenez le secteur, les enjeux actuels, les contraintes réglementaires ou concurrentielles. Quand vous montrez que vous comprenez vraiment leur réalité métier, la confiance s'installe immédiatement.
            </p>
            <p>
              Avant chaque entretien, prenez 15 minutes pour vous préparer : site web du client, actualités récentes, LinkedIn des interlocuteurs, tendances du secteur.
            </p>

            <h3>Pilier 3 : L'honnêteté sur vos limites</h3>
            <p>
              Contre-intuitif mais redoutablement efficace : si votre solution ne répond pas à un besoin spécifique du client, dites-le.
            </p>
            <p>
              « Pour cet aspect précis, je dois être honnête avec vous — ce n'est pas notre point fort. En revanche, sur vos trois enjeux principaux, voici ce que nous apportons concrètement… »
            </p>
            <p>
              Cette honnêteté distingue le consultant du vendeur. Et elle crée une confiance que les clients n'oublient pas.
            </p>

            <h3>Pilier 4 : La co-construction de la solution</h3>
            <p>
              Plutôt que de proposer une solution prête à l'emploi, co-construisez avec le client.
            </p>
            <p>
              « D'après ce que vous m'avez décrit, voici ce que je vois comme chemin possible. Est-ce que ça correspond à votre vision ? Qu'est-ce que vous modifieriez ? »
            </p>
            <p>
              Le client qui a participé à la construction de la solution en est davantage propriétaire. Il la défend en interne. Il la met en œuvre plus efficacement.
            </p>

            <h2>La phase de découverte : le cœur de la vente consultative</h2>
            <p>
              Si la vente consultative avait un seul moment clé, ce serait la phase de découverte. C'est là que tout se joue.
            </p>
            <p><strong>Ce que vous devez comprendre avant de proposer quoi que ce soit :</strong></p>
            <ol>
              <li>
                <strong>Les enjeux business</strong> : quel est l'objectif stratégique sous-jacent à ce projet ? Croissance, optimisation, réduction de risques ?
              </li>
              <li>
                <strong>Les problèmes concrets</strong> : qu'est-ce qui ne fonctionne pas aujourd'hui ? Depuis quand ? Avec quelles conséquences ?
              </li>
              <li>
                <strong>Les tentatives passées</strong> : ont-ils déjà essayé de résoudre ce problème ? Avec quels résultats ?
              </li>
              <li>
                <strong>Les contraintes</strong> : budget, délais, organisation, politique interne, décideurs impliqués
              </li>
              <li>
                <strong>Les critères de succès</strong> : comment sauront-ils que le projet a réussi ? Quels indicateurs ?
              </li>
            </ol>
            <p>
              Ne proposez rien avant d'avoir réponse à ces cinq points. C'est la discipline qui distingue le commercial consultatif du commercial qui « pitche » sans avoir écouté.
            </p>

            <h2>Structurer votre proposition en mode consultatif</h2>
            <p>
              Une proposition consultative ne commence pas par « voici notre offre ». Elle commence par « voici ce que j'ai compris de votre situation ».
            </p>
            <p><strong>Structure d'une proposition consultative :</strong></p>
            <ol>
              <li>
                <strong>Diagnostic</strong> : reformulation des enjeux et problèmes identifiés lors de la découverte (2-3 pages maximum)
              </li>
              <li>
                <strong>Enjeux</strong> : ce que ça coûte de ne rien faire — en argent, en temps, en risques
              </li>
              <li>
                <strong>Approche recommandée</strong> : votre solution, expliquée dans le langage des enjeux du client (pas dans le langage de votre catalogue)
              </li>
              <li>
                <strong>Résultats attendus</strong> : chiffrés si possible, réalistes toujours
              </li>
              <li>
                <strong>Modalités pratiques</strong> : comment on travaille ensemble, les étapes, les livrables
              </li>
            </ol>
            <p>
              Cette structure montre que vous avez écouté. Elle positionne votre solution comme une réponse à leurs enjeux — pas comme un produit que vous voulez vendre.
            </p>

            <h2>Les obstacles à la vente consultative en PME</h2>

            <p><strong>Obstacle 1 : « On n'a pas le temps »</strong></p>
            <p>
              La vente consultative prend plus de temps en phase de découverte. Mais elle génère des cycles de vente globalement plus courts, parce qu'elle élimine les allers-retours sur des propositions inadaptées.
            </p>

            <p><strong>Obstacle 2 : « Nos commerciaux sont habitués à pitcher »</strong></p>
            <p>
              Changer une habitude de vente prend du temps. Commencez par une règle simple : les 20 premières minutes de tout entretien sont dédiées aux questions. Aucun slide, aucun discours produit avant 20 minutes.
            </p>

            <p><strong>Obstacle 3 : « Le client veut qu'on lui présente notre offre tout de suite »</strong></p>
            <p>
              Parfois vrai. Dans ce cas, présentez rapidement votre offre, puis revenez rapidement aux questions : « Je vous ai donné une première vision de ce qu'on fait. Pour être sûr que ça correspond à vos besoins, j'aimerais mieux comprendre votre situation. Ça vous va si je vous pose quelques questions ? »
            </p>

            <div className="blog-article__cta-box">
              <h3>Vous souhaitez transformer votre équipe commerciale ?</h3>
              <p>
                La vente consultative ne s'improvise pas. Elle se travaille, se pratique, et s'incarne dans une équipe. Si vous voulez faire passer vos commerciaux du statut de « vendeur » à celui de « conseiller de confiance », je peux vous aider à construire ce chemin.
              </p>
              <Link href="/diagnostic" className="btn btn-primary">
                Faire un diagnostic commercial →
              </Link>
            </div>
          </div>

          {/* Footer navigation */}
          <footer className="blog-article__footer">
            <Link href="/blog" className="blog-article__back-link">
              ← Retour au blog
            </Link>
          </footer>
        </div>
      </article>
    </>
  );
}
