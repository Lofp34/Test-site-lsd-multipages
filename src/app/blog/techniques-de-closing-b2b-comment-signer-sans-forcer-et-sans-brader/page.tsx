import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Techniques de closing B2B : signer sans forcer ni brader',
  description:
    '5 techniques de closing B2B pour conclure une vente sans manipulation et sans brader vos marges. Ce qui fonctionne vraiment en PME, avec exemples concrets.',
  keywords:
    'closing B2B, techniques de closing, conclure une vente, taux de closing, objections commerciales, closing commercial PME, vente B2B, Laurent Serre',
  openGraph: {
    title: 'Techniques de closing B2B : signer sans forcer ni brader',
    description:
      '5 techniques de closing B2B pour conclure une vente sans manipulation et sans brader vos marges. Ce qui fonctionne vraiment en PME.',
    url: 'https://www.laurentserre.com/blog/techniques-de-closing-b2b-comment-signer-sans-forcer-et-sans-brader',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-05-02-closing-b2b-signer-sans-brader-hero.jpg',
        width: 1536,
        height: 1024,
        alt: 'Deux hommes d\'affaires se serrant la main autour d\'une table de réunion, document de signature visible',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Techniques de closing B2B : signer sans forcer ni brader',
    description:
      '5 techniques de closing B2B pour conclure une vente sans manipulation. Ce qui marche vraiment en PME.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-02-closing-b2b-signer-sans-brader-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/techniques-de-closing-b2b-comment-signer-sans-forcer-et-sans-brader',
  },
};

export default function TechniquesDeClosingB2B() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': 'Techniques de closing B2B : comment signer sans forcer et sans brader',
    'author': { '@type': 'Person', 'name': 'Laurent Serre', 'url': 'https://www.laurentserre.com/a-propos' },
    'datePublished': '2026-05-02',
    'dateModified': '2026-05-02',
    'image': 'https://www.laurentserre.com/images/blog/2026-05-02-closing-b2b-signer-sans-brader-hero.jpg',
    'description': '5 techniques de closing B2B pour conclure une vente sans manipulation et sans brader vos marges. Ce qui fonctionne vraiment en PME, avec exemples concrets.',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': 'https://www.laurentserre.com/blog/techniques-de-closing-b2b-comment-signer-sans-forcer-et-sans-brader'
    }
  };

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'Techniques de closing B2B : signer sans forcer ni brader',
    'description': '5 techniques de closing B2B pour conclure une vente sans manipulation en PME.',
    'author': { '@type': 'Person', 'name': 'Laurent Serre', 'url': 'https://www.laurentserre.com/a-propos' },
    'step': [
      { '@type': 'HowToStep', 'position': 1, 'name': 'Le closing direct', 'text': 'Demander directement si le prospect est prêt à avancer après avoir confirmé la valeur apportée.' },
      { '@type': 'HowToStep', 'position': 2, 'name': 'Le closing par résumé', 'text': 'Récapituler les enjeux identifiés pendant la découverte et proposer de conclure immédiatement.' },
      { '@type': 'HowToStep', 'position': 3, 'name': 'Le closing par alternative', 'text': 'Proposer deux options concrètes, toutes deux menant à la signature.' },
      { '@type': 'HowToStep', 'position': 4, 'name': 'Le closing de l\'urgence légitime', 'text': 'Utiliser une contrainte calendaire réelle pour accélérer la décision sans fausse pression.' },
      { '@type': 'HowToStep', 'position': 5, 'name': 'Le closing sur objection finale', 'text': 'Lever la dernière objection explicitement, puis enchaîner sur une conclusion conditionnelle.' }
    ],
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': 'https://www.laurentserre.com/blog/techniques-de-closing-b2b-comment-signer-sans-forcer-et-sans-brader'
    }
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Que faire quand un prospect dit "je vais réfléchir" ?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Répondre : "Je comprends tout à fait. Pour vous aider dans votre réflexion, pouvez-vous me dire sur quoi porte principalement votre hésitation ?" Cette question rouvre le dialogue et permet de traiter le vrai blocage.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Quels sont les signaux d\'achat en B2B ?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Les signaux verbaux incluent des questions sur les modalités pratiques, l\'utilisation du futur ("quand on travaillera ensemble") et des demandes de garanties. Les signaux comportementaux : implication accrue dans les échanges, introduction d\'autres décideurs, questions sur les conditions de paiement.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Comment améliorer son taux de closing en B2B PME ?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Identifier les affaires perdues en "je vais réfléchir", maîtriser 2 à 3 techniques de closing adaptées à son contexte, confirmer systématiquement par écrit dans les 2 heures après un accord verbal, et travailler sa posture de découverte en amont.'
        }
      }
    ]
  };

  const videoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Kristina Creavea — mieux structurer ses entretiens pour gagner en confiance et en chiffre',
    description: 'Kristina montre l\'impact d\'un accompagnement suivi dans le temps : meilleure organisation, plan de vente plus clair, entretiens mieux préparés et +39% de chiffre d\'affaires.',
    thumbnailUrl: 'https://img.youtube.com/vi/kkU2jPspfVk/maxresdefault.jpg',
    uploadDate: '2026-04-21',
    embedUrl: 'https://www.youtube-nocookie.com/embed/kkU2jPspfVk',
    contentUrl: 'https://www.youtube.com/watch?v=kkU2jPspfVk',
    author: { '@type': 'Person', name: 'Laurent Serre', url: 'https://www.laurentserre.com/a-propos' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
      <main className="bg-primary-bg text-gray-dark">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Closing / vente B2B</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Techniques de closing B2B : comment signer sans forcer et sans brader
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-05-02">2 mai 2026</time>
              <span>•</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-05-02-closing-b2b-signer-sans-brader-hero.jpg"
              alt="Deux hommes d'affaires se serrant la main autour d'une table de réunion"
              width={1536}
              height={1024}
              className="w-full h-80 object-cover object-center rounded-2xl shadow-lg"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      {/* Sommaire interactif */}
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8" aria-label="Sommaire de l'article">
        <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6">
          <h2 className="text-lg font-title font-bold text-blue-ink mb-4">📋 Au sommaire de cet article</h2>
          <ol className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-mint-green font-bold mt-0.5">1.</span>
              <a href="#pourquoi-commerciaux-ratent" className="text-blue-ink hover:text-mint-green transition-colors">Pourquoi la plupart des commerciaux ratent le closing</a>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mint-green font-bold mt-0.5">2.</span>
              <a href="#signaux-achat" className="text-blue-ink hover:text-mint-green transition-colors">Les signaux d'achat : savoir quand le prospect est prêt</a>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mint-green font-bold mt-0.5">3.</span>
              <a href="#5-techniques" className="text-blue-ink hover:text-mint-green transition-colors">Les 5 techniques de closing commercial qui fonctionnent en B2B</a>
              <ol className="ml-4 mt-1 space-y-1 text-gray-500">
                <li>3.1 Le closing direct</li>
                <li>3.2 Le closing par résumé</li>
                <li>3.3 Le closing par alternative</li>
                <li>3.4 Le closing de l'urgence légitime</li>
                <li>3.5 Le closing sur objection finale</li>
              </ol>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mint-green font-bold mt-0.5">4.</span>
              <a href="#apres-le-oui" className="text-blue-ink hover:text-mint-green transition-colors">Ce qui se passe après le « oui »</a>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mint-green font-bold mt-0.5">5.</span>
              <a href="#gerer-je-reflechis" className="text-blue-ink hover:text-mint-green transition-colors">Gérer le « je vais réfléchir »</a>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mint-green font-bold mt-0.5">6.</span>
              <a href="#etat-esprit" className="text-blue-ink hover:text-mint-green transition-colors">L'état d'esprit du bon closer</a>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mint-green font-bold mt-0.5">7.</span>
              <a href="#3-actions" className="text-blue-ink hover:text-mint-green transition-colors">3 actions concrètes pour améliorer votre taux de closing cette semaine</a>
            </li>
          </ol>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="mb-8">Le closing. Ce mot fait peur à beaucoup de commerciaux. Il évoque pression, manipulation, forcing.</p>

          <p className="mb-8">Et pourtant, sans closing, il n'y a pas de vente.</p>

          <p className="mb-8">La réalité, c'est que si vous avez bien travaillé en amont - bien qualifié, bien découvert les besoins, bien construit votre proposition de valeur - le closing n'est pas un combat. C'est une conclusion logique.</p>

          <p className="mb-8">Mais savoir comment et quand <strong>conclure une vente</strong>, ça s’apprend. Voici les techniques de closing B2B qui fonctionnent vraiment en PME pour améliorer votre <strong>taux de closing</strong>, sans manipuler et sans casser vos marges.</p>

          <h2 id="pourquoi-commerciaux-ratent" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Pourquoi la plupart des commerciaux ratent le closing</h2>

          <p className="mb-8">La cause numéro un : ils n'osent pas demander.</p>

          <p className="mb-8">Ils présentent, ils répondent aux objections, ils attendent. Et le prospect dit « je vais y réfléchir ». Et l'affaire disparaît dans le pipeline comme dans un trou noir.</p>

          <p className="mb-8">Demander la signature n'est pas une agression. C'est votre droit, si vous avez apporté de la valeur tout au long du processus.</p>

          <p className="mb-8">La cause numéro deux : ils closent trop tôt - avant d'avoir réellement compris les enjeux du client.</p>

          <p className="mb-8">Un closing prématuré déclenche l'objection. Un closing au bon moment, après une vraie découverte, obtient le « oui ».</p>

          <h2 id="signaux-achat" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Les signaux d'achat : savoir quand le prospect est prêt</h2>

          <p className="mb-8">Avant de tenter de conclure, apprenez à lire les signaux. Un prospect prêt à signer vous envoie des signaux clairs - si vous savez les détecter.</p>

          <p className="mb-4 font-semibold">Signaux verbaux :</p>
          <ul className="list-disc pl-6 mb-8">
            <li className="mb-2">Il pose des questions sur les modalités pratiques : « Comment ça se passe pour la mise en place ? »</li>
            <li className="mb-2">Il utilise le futur : « Quand on travaillera ensemble... »</li>
            <li className="mb-2">Il demande des références clients ou des garanties</li>
          </ul>

          <p className="mb-4 font-semibold">Signaux comportementaux :</p>
          <ul className="list-disc pl-6 mb-8">
            <li className="mb-2">Il s'implique davantage dans les échanges, répond vite à vos emails</li>
            <li className="mb-2">Il fait intervenir d'autres décideurs dans la conversation</li>
            <li className="mb-2">Il demande des détails sur le contrat ou les conditions de paiement</li>
          </ul>

          <p className="mb-8">Quand vous percevez ces signaux, c'est le moment. N'attendez pas.</p>

          <h2 id="5-techniques" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Les 5 techniques de closing commercial qui fonctionnent en B2B</h2>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-10 mb-4">1. Le closing direct</h3>
          <p className="mb-8">Simple, honnête, efficace.</p>
          <blockquote className="border-l-4 border-mint-green pl-4 italic mb-8">
            « D'après notre échange, il me semble que notre solution répond bien à vos enjeux. Est-ce que vous êtes prêt à avancer ? »
          </blockquote>
          <p className="mb-8">Beaucoup de commerciaux redoutent cette question. Pourtant, c'est souvent la plus efficace. Elle respecte l'interlocuteur et force une réponse claire.</p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-10 mb-4">2. Le closing par résumé</h3>
          <p className="mb-8">Vous récapitulez les points de valeur identifiés pendant la découverte, puis vous proposez de conclure.</p>
          <blockquote className="border-l-4 border-mint-green pl-4 italic mb-8">
            « Si je résume : vous cherchez à réduire votre délai de prospection, améliorer la qualification de vos leads et donner plus d'autonomie à votre équipe. Notre programme répond à ces trois enjeux. Qu'est-ce qui vous empêche de démarrer aujourd'hui ? »
          </blockquote>
          <p className="mb-8">Cette technique est particulièrement efficace après une longue phase de découverte. Elle montre que vous avez écouté, et elle rappelle au prospect pourquoi il envisage de signer.</p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-10 mb-4">3. Le closing par alternative</h3>
          <p className="mb-8">Vous ne demandez pas « oui ou non ». Vous proposez deux options, les deux menant à la signature.</p>
          <blockquote className="border-l-4 border-mint-green pl-4 italic mb-8">
            « Vous préférez démarrer en janvier ou attendre la rentrée de mars ? »
          </blockquote>
          <p className="mb-8">Cette technique fonctionne bien quand le prospect est convaincu mais procrastine. Elle l'aide à décider sans le brusquer.</p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-10 mb-4">4. Le closing de l'urgence légitime</h3>
          <p className="mb-8">Pas de fausse urgence. Pas de « l'offre expire ce soir » fabriqué. Mais si une vraie contrainte existe, utilisez-la.</p>
          <blockquote className="border-l-4 border-mint-green pl-4 italic mb-8">
            « On a une session de démarrage le 15 du mois. Si vous confirmez avant vendredi, vous intégrez ce groupe. Sinon, le prochain démarrage est en mars. »
          </blockquote>
          <p className="mb-8">L'urgence légitime accélère la décision. La fausse urgence détruit la confiance.</p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-10 mb-4">5. Le closing sur objection finale</h3>
          <p className="mb-8">Quand le prospect soulève une dernière objection, traitez-la et enchaînez immédiatement sur une proposition de conclusion.</p>
          <blockquote className="border-l-4 border-mint-green pl-4 italic mb-8">
            « Si je comprends bien, votre seule hésitation porte sur le délai de mise en place. Si je vous confirme que nous pouvons démarrer en 2 semaines plutôt que 4, est-ce que vous êtes prêt à signer ? »
          </blockquote>
          <p className="mb-8">Cette technique isole l'objection, la lève, et transforme le mouvement de résistance en accord conditionnel.</p>

          <h2 id="apres-le-oui" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Ce qui se passe après le « oui »</h2>

          <p className="mb-8">Beaucoup de commerciaux relâchent leur attention après le « oui » verbal. Grosse erreur — et l’une des principales causes d’effondrement du taux de closing réel.</p>

          <p className="mb-8">Entre le « oui » oral et la signature effective, il peut se passer beaucoup de choses. Un concurrent qui relance. Un associé qui soulève des objections. Un changement de priorité interne.</p>

          <p className="mb-4 font-semibold">Ce qu'il faut faire immédiatement après le « oui » :</p>
          <ol className="list-decimal pl-6 mb-8">
            <li className="mb-2">Confirmez par écrit dans les 24 heures - email de récapitulatif, proposition formalisée</li>
            <li className="mb-2">Proposez une date de signature ou de démarrage concrète</li>
            <li className="mb-2">Identifiez les autres décideurs qui pourraient bloquer et adressez-les pro-activement</li>
          </ol>

          <h2 id="gerer-je-reflechis" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Gérer le « je vais réfléchir »</h2>

          <p className="mb-8">C'est la réponse qui fait couler le plus d'affaires. Et pourtant, elle se gère.</p>

          <p className="mb-8">« Je vais réfléchir » signifie rarement « non définitif ». Ça signifie souvent :</p>
          <ul className="list-disc pl-6 mb-8">
            <li className="mb-2">« Je n'ai pas encore assez confiance »</li>
            <li className="mb-2">« Il me manque une information »</li>
            <li className="mb-2">« Je dois consulter quelqu'un »</li>
            <li className="mb-2">« Le prix me pose problème »</li>
          </ul>

          <p className="mb-4 font-semibold">La bonne réponse :</p>
          <blockquote className="border-l-4 border-mint-green pl-4 italic mb-8">
            « Je comprends tout à fait. Pour vous aider dans votre réflexion, pouvez-vous me dire sur quoi porte principalement votre hésitation ? »
          </blockquote>
          <p className="mb-8">Cette question rouvre le dialogue. Elle vous donne l'information nécessaire pour traiter le vrai blocage plutôt que de disparaître en espérant un retour qui ne viendra jamais.</p>

          <h2 id="etat-esprit" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">L'état d'esprit du bon closer</h2>

          <p className="mb-8">Les meilleurs closers que j'ai croisés en PME ont un point commun : ils ne cherchent pas à vendre à tout prix. Ils cherchent à aider.</p>

          <p className="mb-8">Cette posture change tout. Quand vous vous demandez sincèrement « est-ce que ma solution est la bonne pour ce client ? » plutôt que « comment est-ce que je vais signer cette affaire ? », votre interlocuteur le sent. Et il vous fait confiance.</p>

          <p className="mb-8">Un closing bien conduit n'est pas une technique de manipulation. C'est une conversation honnête sur la valeur que vous apportez et sur la décision que votre prospect a à prendre.</p>

          <p className="mb-8">Votre travail : rendre cette décision aussi claire et facile que possible.</p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <p className="mb-6">
              Si vos équipes peinent à conclure ou laissent trop d’affaires en « je réfléchis », on peut travailler ensemble dans le cadre d’une{' '}
              <Link href="/formation-commerciale-pme" className="text-mint-green font-semibold underline">formation commerciale sur-mesure pour PME</Link>{' '}
              ou d’un{' '}
              <Link href="/coach-commercial-entreprise" className="text-mint-green font-semibold underline">accompagnement commercial individualisé</Link>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Demander un diagnostic commercial
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Échanger sur votre situation
              </Link>
            </div>
          </div>

          <h2 id="3-actions" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">3 actions concrètes pour améliorer votre taux de closing cette semaine</h2>

          <ol className="list-decimal pl-6 mb-8">
            <li className="mb-4"><strong>Identifiez les 3 dernières affaires perdues</strong> en « je vais réfléchir ». Analysez ce qui s'est passé. Avez-vous détecté les signaux d'achat ? Avez-vous osé demander la signature ?</li>
            <li className="mb-4"><strong>Choisissez deux techniques parmi celles listées</strong> et préparez votre formulation exacte pour votre prochain entretien. Entraînez-vous à voix haute.</li>
            <li className="mb-4"><strong>Après votre prochain « oui » verbal</strong> : envoyez un email de confirmation dans les 2 heures et proposez une date de démarrage dans le même message.</li>
          </ol>

          <p className="mb-8">Le closing, ce n’est pas une question de talent naturel. C’est une compétence qui s’apprend, se pratique et s’améliore. Si vous souhaitez aller plus loin, consultez notre guide complet sur la{' '}
          <Link href="/expert-developpement-commercial-pme" className="text-mint-green hover:underline">transformation commerciale des PME</Link>.</p>
        </div>
      </article>

      {/* Video temoignage */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6">
          <p className="font-title font-bold text-blue-ink text-lg mb-3">🎬 Pour aller plus loin</p>
          <p className="text-gray-600 mb-5">
            Le closing ne s&apos;apprend pas seulement en lisant. Regardez comment Kristina, de Creavea, a structuré sa méthode d&apos;entretien pour gagner en confiance et en chiffre (+39% de CA).
          </p>
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <iframe
              src="https://www.youtube-nocookie.com/embed/kkU2jPspfVk?rel=0&modestbranding=1"
              title="Kristina Creavea — mieux structurer ses entretiens pour gagner en confiance et en chiffre"
              className="w-full h-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-4 text-center">
            Besoin d'en parler plus directement ?
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Si votre cas mérite un échange plus direct, vous pouvez aussi laisser un message ici.
          </p>
          <HubSpotForm />
        </div>
      </section>
    </main>
    </>
  );
}
