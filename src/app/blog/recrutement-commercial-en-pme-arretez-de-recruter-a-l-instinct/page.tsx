import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Recrutement commercial en PME : arrêtez de recruter à l\'instinct | Laurent Serre',
  description:
    'Un mauvais recrutement commercial coûte 50 000€ à 150 000€ à une PME. Voici comment recruter les bons profils, repérer les red flags et intégrer efficacement un nouveau commercial.',
  keywords:
    'recrutement commercial PME, recruter commercial B2B, processus recrutement vente, recrutement équipe commerciale, management équipe commerciale, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/recrutement-commercial-en-pme-arretez-de-recruter-a-l-instinct',
  },
  openGraph: {
    title: 'Recrutement commercial en PME : arrêtez de recruter à l\'instinct',
    description:
      'La plupart des recrutements commerciaux en PME se font encore au feeling. Pourtant, les bons profils se reconnaissent à des signaux précis — pas à leur présentation soignée.',
    url: 'https://www.laurentserre.com/blog/recrutement-commercial-en-pme-arretez-de-recruter-a-l-instinct',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-05-06-recrutement-commercial-pme-hero.webp',
        width: 1536,
        height: 864,
        alt: 'Recrutement commercial en PME — arrêtez de recruter à l\'instinct',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recrutement commercial en PME : arrêtez de recruter à l\'instinct | Laurent Serre',
    description:
      'Un mauvais recrutement commercial coûte 50 000€ à 150 000€. Guide terrain pour recruter les bons profils en PME.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-06-recrutement-commercial-pme-hero.webp'],
  },
};

export default function ArticlePage() {
  const articleUrl = 'https://www.laurentserre.com/blog/recrutement-commercial-en-pme-arretez-de-recruter-a-l-instinct';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Recrutement commercial en PME : arrêtez de recruter à l\'instinct',
        description:
          'Un mauvais recrutement commercial coûte 50 000€ à 150 000€ à une PME. Voici comment recruter les bons profils, repérer les red flags et intégrer efficacement un nouveau commercial.',
        image: 'https://www.laurentserre.com/images/blog/2026-05-06-recrutement-commercial-pme-hero.webp',
        datePublished: '2026-05-06',
        dateModified: '2026-05-06',
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
          name: 'Laurent Serre Développement',
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
        articleSection: 'Recrutement / management',
        keywords: [
          'recrutement commercial PME',
          'recruter commercial B2B',
          'processus recrutement vente',
          'recrutement équipe commerciale',
          'management équipe commerciale',
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Combien coûte un mauvais recrutement commercial à une PME ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Un mauvais recrutement commercial coûte entre 50 000€ et 150 000€ à une PME. Salaire, charges, formation, opportunités manquées pendant la montée en puissance, et finalement la réembauche.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quels sont les critères qui prédisent vraiment la performance d\'un commercial ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les vrais prédicteurs de performance sont : l\'historique de résultats chiffrés et vérifiables, la capacité à apprendre et s\'adapter, la résilience face au refus, et la rigueur organisationnelle. La présentation soignée ou le beau CV ne sont pas des différenciateurs fiables.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment structurer un processus de recrutement commercial en PME ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Un processus efficace en 4 étapes : 1) entretien téléphonique de qualification (20 min), 2) entretien comportemental basé sur des situations réelles (60-90 min), 3) mise en situation commerciale avec roleplay concret, 4) vérification systématique des références auprès des anciens managers.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'Comment recruter un commercial en 4 étapes',
        description: 'Un processus structuré pour le recrutement commercial en PME, basé sur des signaux objectifs plutôt que sur l\'instinct.',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Entretien de qualification téléphonique (20 minutes)',
            text: 'Avant d\'inviter quelqu\'un pour un entretien physique, faites un premier échange téléphonique. Posez les questions clés sur le parcours, les motivations pour le poste, la disponibilité et les prétentions salariales.',
          },
          {
            '@type': 'HowToStep',
            name: 'Entretien comportemental (60 à 90 minutes)',
            text: 'Posez des questions basées sur des situations réelles passées. Demandez des exemples concrets de ventes réussies, d\'affaires perdues, de semaines difficiles. Les réponses détaillées et factuelles signalent un profil authentique.',
          },
          {
            '@type': 'HowToStep',
            name: 'Mise en situation commerciale',
            text: 'Donnez au candidat un brief réaliste : présentez un cas prospect et demandez-lui de vous prospecter. Observez comment il accroche, découvre, gère les objections et propose un prochain step.',
          },
          {
            '@type': 'HowToStep',
            name: 'Vérification systématique des références',
            text: 'Appelez les anciens managers directs. Posez 4 questions clés : évaluation de la performance sur 10, atteinte des objectifs, points de développement, et le reprendriez-vous si l\'opportunité se présentait.',
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.laurentserre.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'Recrutement commercial en PME', item: articleUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <main className="bg-primary-bg text-gray-dark">
        {/* Header */}
        <section className="py-24 sm:py-32 pb-14 sm:pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
                <span className="font-title font-semibold text-mint-green text-sm">Recrutement / management</span>
              </div>

              <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
                Recrutement commercial en PME : arrêtez de recruter à l&apos;instinct
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Les commerciaux sont professionnellement formés pour faire une bonne impression.
                Si vous recrutez au feeling, vous avez peut-être recruté le meilleur vendeur... de sa propre candidature.
                Voici comment structurer votre recrutement pour faire les bons choix.
              </p>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
                <div className="flex items-center gap-2">
                  <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                  <span>Laurent Serre</span>
                </div>
                <span>•</span>
                <time dateTime="2026-05-06">6 mai 2026</time>
                <span>•</span>
                <span>8 min de lecture</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hero image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/blog/2026-05-06-recrutement-commercial-pme-hero.webp"
              alt="Recrutement commercial en PME — arrêtez de recruter à l&apos;instinct"
              width={1536}
              height={864}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>

        {/* Sommaire */}
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Sommaire">
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 mb-8">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">📋 Au sommaire</p>
            <ol className="space-y-2 text-sm">
              <li><a href="#definir-profil" className="text-blue-ink hover:text-mint-green transition-colors">Définir précisément le profil avant de chercher</a></li>
              <li><a href="#criteres" className="text-blue-ink hover:text-mint-green transition-colors">Les critères qui comptent vraiment</a></li>
              <li><a href="#processus" className="text-blue-ink hover:text-mint-green transition-colors">Un processus de recrutement en 4 étapes</a></li>
              <li><a href="#signaux" className="text-blue-ink hover:text-mint-green transition-colors">Les signaux d&apos;alerte pendant le processus</a></li>
              <li><a href="#integration" className="text-blue-ink hover:text-mint-green transition-colors">Intégration : les 90 premiers jours</a></li>
              <li><a href="#conclusion" className="text-blue-ink hover:text-mint-green transition-colors">Conclusion : 3 actions pour votre prochain recrutement</a></li>
            </ol>
          </div>
        </nav>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="prose prose-lg max-w-none">

            {/* TL;DR */}
            <div className="bg-mint-green/10 border border-mint-green/30 rounded-2xl p-6 mb-10">
              <p className="font-title font-bold text-blue-ink text-sm uppercase tracking-wider mb-3">🎯 Ce que vous allez retenir</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Un mauvais recrutement coûte entre 50 000€ et 150 000€</strong> à une PME : salaire, charges, formation, opportunités manquées et réembauche.</li>
                <li><strong>Les vrais critères de performance</strong> sont les résultats chiffrés, la capacité d&apos;apprentissage, la résilience et la rigueur — pas le beau CV ni le discours fluide.</li>
                <li><strong>Un processus en 4 étapes</strong> : qualification téléphonique → entretien comportemental → mise en situation → vérification des références.</li>
                <li><strong>Les red flags à ne pas ignorer</strong> : absence de chiffres précis, critiques excessives des anciens employeurs, refus du variable.</li>
                <li><strong>Les 90 premiers jours sont décisifs</strong> : un plan d&apos;intégration structuré fait la différence entre un commercial qui réussit et un qui échoue.</li>
              </ul>
            </div>

            <p className="lead text-xl text-gray-600 leading-relaxed mb-8">
              Un mauvais recrutement commercial coûte entre 50 000€ et 150 000€ à une PME. Salaire, charges, formation, opportunités manquées pendant la montée en puissance, et finalement la réembauche. C&apos;est un calcul que la plupart des dirigeants n&apos;ont jamais fait — et qu&apos;ils ne veulent pas faire.
            </p>

            <p>
              Pourtant, la plupart des recrutements commerciaux en PME se font encore à l&apos;instinct. &quot;Il a de la gueule. Il a bien vendu lors de l&apos;entretien. Je sens que ça va coller.&quot;
            </p>

            <p>
              Le problème ? Les commerciaux sont professionnellement formés pour faire une bonne impression. Si vous recrutez un commercial en vous basant uniquement sur votre feeling, vous avez peut-être recruté le meilleur vendeur de sa propre candidature. Pas forcément le meilleur vendeur de votre offre.
            </p>

            <p>
              Voici comment structurer votre recrutement commercial pour faire les bons choix.
            </p>

            <h2 id="definir-profil" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Définir précisément le profil avant de chercher</h2>

            <p>
              Le recrutement raté commence toujours par la même erreur : chercher &quot;un bon commercial&quot; sans avoir défini ce que ça signifie dans votre contexte précis.
            </p>

            <p>
              Un bon commercial pour vendre des logiciels SaaS en cycle court à des TPE n&apos;a pas le même profil qu&apos;un bon commercial pour vendre des équipements industriels à des grands comptes avec un cycle de 12 mois.
            </p>

            <p><strong>Questions à vous poser avant de publier votre annonce :</strong></p>

            <ul className="space-y-2 text-sm text-gray-700">
              <li>Cycle de vente court (&lt; 3 mois) ou long (&gt; 6 mois) ?</li>
              <li>Vente transactionnelle ou consultative ?</li>
              <li>Chasse (nouveaux clients) ou élevage (développement de portefeuille existant) ?</li>
              <li>Vente solo ou en équipe avec des avant-ventes, techniciens, etc. ?</li>
              <li>Secteur spécialisé nécessitant une expertise métier, ou généraliste ?</li>
              <li>Autonomie totale ou besoin d&apos;encadrement fort ?</li>
            </ul>

            <p>
              Répondez honnêtement à ces questions. Le profil idéal en découlera naturellement.
            </p>

            <h2 id="criteres" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Les critères qui comptent vraiment</h2>

            <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">Ce qui ne prédit pas la performance</h3>

            <ul className="space-y-2 text-sm text-gray-700">
              <li>La présentation soignée et le discours fluide (c&apos;est le minimum, pas un différenciateur)</li>
              <li>Le beau CV avec des entreprises connues (le contexte change tout)</li>
              <li>Les soft skills déclarées : &quot;je suis persévérant, orienté résultats, bon communiquant&quot; (tout le monde le dit)</li>
            </ul>

            <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">Ce qui prédit réellement la performance</h3>

            <p><strong>1. L&apos;historique de résultats chiffrés et vérifiables</strong></p>

            <p>
              Un bon commercial sait exactement combien il a vendu, quel était son objectif, quel était son rang dans l&apos;équipe. Il parle en chiffres concrets.
            </p>

            <p>
              Méfiance si les réponses sont vagues : &quot;J&apos;ai fait de bons résultats&quot;, &quot;J&apos;étais dans le top de l&apos;équipe&quot;. Creusez toujours : &quot;Quel était votre objectif annuel ? Quel pourcentage avez-vous atteint ? Vous étiez en quelle position dans l&apos;équipe ?&quot;
            </p>

            <p><strong>2. La capacité à apprendre et à s&apos;adapter</strong></p>

            <p>
              Les meilleurs commerciaux ne sont pas ceux qui savent déjà tout. Ce sont ceux qui apprennent vite et s&apos;adaptent rapidement à un nouveau contexte.
            </p>

            <p><strong>3. La résilience face au refus</strong></p>

            <p>
              La prospection implique des dizaines de &quot;non&quot; par semaine. Est-ce que cette personne est capable de rester motivée et efficace malgré les refus répétés ?
            </p>

            <p><strong>4. La rigueur organisationnelle</strong></p>

            <p>
              Un commercial qui ne tient pas son CRM, ne respecte pas ses engagements de relance, n&apos;anticipe pas ses prochaines actions — c&apos;est un commercial qui sous-performe.
            </p>

            <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-5 my-8">
              <p className="text-sm text-blue-ink mb-0">
                <strong>📊 La recherche le confirme :</strong> selon une méta-analyse publiée par la Society for Industrial and Organizational Psychology, les entretiens structurés et les mises en situation sont jusqu&apos;à <strong>2,5 fois plus prédictifs</strong> de la performance future que les entretiens non structurés basés sur le feeling.
              </p>
            </div>

            <h2 id="processus" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Un processus de recrutement en 4 étapes</h2>

            <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">Étape 1 : L&apos;entretien de qualification téléphonique (20 minutes)</h3>

            <p>
              Avant d&apos;inviter quelqu&apos;un pour un entretien, faites un premier échange téléphonique. Vous gagnez du temps, et vous observez déjà comment la personne se comporte dans une situation de communication à distance.
            </p>

            <p>Questions clés : parcours rapide, motivations pour le poste, disponibilité, prétentions.</p>

            <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">Étape 2 : L&apos;entretien comportemental (60-90 minutes)</h3>

            <p>
              Posez des questions basées sur des situations réelles passées.
            </p>

            <ul className="space-y-2 text-sm text-gray-700">
              <li><em>&quot;Racontez-moi votre plus belle vente. Quelle était la situation de départ ? Qu&apos;avez-vous fait ? Quel a été le résultat ?&quot;</em></li>
              <li><em>&quot;Décrivez-moi une affaire que vous avez perdue alors que vous pensiez la signer. Qu&apos;avez-vous appris ?&quot;</em></li>
              <li><em>&quot;Comment gérez-vous une semaine où rien ne fonctionne — les prospects ne répondent pas, les rendez-vous s&apos;annulent ?&quot;</em></li>
            </ul>

            <p>
              Les réponses concrètes et détaillées signalent un profil authentique. Les réponses génériques et théoriques signalent quelqu&apos;un qui récite.
            </p>

            <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">Étape 3 : La mise en situation commerciale</h3>

            <p>
              C&apos;est l&apos;étape que la plupart des PME sautent. Pourtant, c&apos;est la plus révélatrice.
            </p>

            <p>
              Donnez au candidat un brief réaliste : &quot;Vous êtes commercial chez nous. Je suis un prospect directeur des opérations dans une entreprise de transport. Vous m&apos;appelez pour prospecter. Allez-y.&quot;
            </p>

            <p>
              Observez : comment il accroche, comment il découvre, comment il gère une objection, comment il propose un prochain step.
            </p>

            <p>Vous verrez la différence entre le &quot;bon discours en entretien&quot; et le &quot;bon commercial en action&quot;.</p>

            <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">Étape 4 : La vérification des références</h3>

            <p>Obligatoire. Appelez les anciens managers directs — pas les collègues ou les personnes proposées par le candidat.</p>

            <p>Questions à poser :</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>&quot;Sur une échelle de 1 à 10, comment évalueriez-vous sa performance commerciale ?&quot;</li>
              <li>&quot;Atteignait-il ses objectifs ? Régulièrement ?&quot;</li>
              <li>&quot;Quels étaient ses principaux points de développement ?&quot;</li>
              <li>&quot;Le reprendriez-vous si vous en aviez l&apos;opportunité ?&quot;</li>
            </ul>

            <p>Cette dernière question est souvent la plus révélatrice.</p>

            <h2 id="signaux" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Les signaux d&apos;alerte pendant le processus</h2>

            <p><strong>Red flags à prendre au sérieux :</strong></p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Ne peut pas citer de chiffres précis sur ses résultats passés</li>
              <li>Critique excessivement ses anciens employeurs</li>
              <li>Cherche à négocier une part fixe très élevée avec peu de variable (indice : peu confiant en sa capacité à performer)</li>
              <li>Répond &quot;je suis quelqu&apos;un de très organisé&quot; mais arrive en retard à l&apos;entretien</li>
              <li>Ne pose aucune question sur le poste, les clients, le marché</li>
            </ul>

            <p><strong>Bons signaux :</strong></p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Arrive avec des questions précises et pertinentes sur votre marché</li>
              <li>Sait exactement combien il a gagné, vendu, perdu et pourquoi</li>
              <li>Parle de ses clients avec respect et compréhension de leurs enjeux</li>
              <li>Est capable de décrire précisément comment il passerait ses premières semaines</li>
            </ul>

            <h2 id="integration" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Intégration : les 90 premiers jours qui font tout</h2>

            <p>
              Le recrutement ne s&apos;arrête pas à la signature du contrat. Les 90 premiers jours sont déterminants.
            </p>

            <p>Un plan d&apos;intégration efficace pour un commercial en PME comprend :</p>

            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Semaine 1</strong> : connaissance de l&apos;entreprise, des offres, des clients clés</li>
              <li><strong>Semaines 2-3</strong> : accompagnement terrain avec un commercial expérimenté ou vous-même</li>
              <li><strong>Semaines 4-8</strong> : premières prospections avec debriefing quotidien</li>
              <li><strong>Mois 3</strong> : objectifs progressifs, premier bilan de performance</li>
            </ul>

            <p>
              Ne laissez pas un nouveau commercial se noyer seul. Le temps investi dans les 90 premiers jours se récupère largement sur les 3 ans suivants.
            </p>

            <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-5 my-8">
              <p className="text-sm text-blue-ink mb-0">
                Pendant cette période, la <Link href="/formation-commerciale-pme" className="text-mint-green hover:underline">formation commerciale terrain</Link> joue un rôle clé : un recrutement bien fait n&apos;est efficace que si la montée en compétence suit. Et une fois l&apos;équipe constituée, un bon <Link href="/management-equipe-commerciale" className="text-mint-green hover:underline">management d&apos;équipe commerciale</Link> fait la différence entre une équipe qui tient ses objectifs et une équipe qui stagne.
              </p>
            </div>

            <p>
              Avant de recruter, un <Link href="/diagnostic" className="text-mint-green hover:underline">diagnostic commercial</Link> permet d&apos;identifier les vrais besoins : est-ce un recrutement, une réorganisation, ou un problème de méthode ? Beaucoup de PME recrutent pour résoudre un problème qui n&apos;est pas un problème d&apos;effectif.
            </p>

            <h2 id="conclusion" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Conclusion : 3 actions pour votre prochain recrutement</h2>

            <ol className="mb-8 space-y-3 list-decimal ml-6">
              <li><strong>Définissez précisément votre profil idéal</strong> avant de publier quoi que ce soit. Cycle de vente, type de vente, secteur, autonomie requise.</li>
              <li><strong>Intégrez une mise en situation commerciale réelle</strong> dans votre processus. 20 minutes de roleplay vous apprendront plus que 2 heures d&apos;entretien classique.</li>
              <li><strong>Vérifiez systématiquement les références</strong> avec les 4 questions listées plus haut. C&apos;est la step la plus sautée et pourtant la plus précieuse.</li>
            </ol>

            <p className="text-lg font-semibold text-blue-ink mt-8">
              Recruter vite, c&apos;est souvent recruter deux fois. Prenez le temps de bien faire — votre équipe et votre CA vous en remercieront.
            </p>

            {/* Pour aller plus loin */}
            <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
              <p className="text-lg font-title font-bold text-blue-ink mb-4">📚 Pour aller plus loin sur le recrutement et l&apos;équipe</p>
              <ul className="space-y-3 text-sm">
                <li><Link href="/blog/les-erreurs-onboarding-commercial-qui-plombent-performance-nouveau" className="text-mint-green hover:underline font-medium">Les erreurs d&apos;onboarding qui plombent la performance du nouveau commercial</Link> — Une fois recruté, éviter les 5 pièges qui sabordent les 90 premiers jours.</li>
                <li><Link href="/blog/cinq-signes-commercial-motive-va-quand-meme-echouer" className="text-mint-green hover:underline font-medium">5 signes qu&apos;un commercial motivé va quand même échouer</Link> — La motivation ne suffit pas. Les signaux faibles qui annoncent un échec même chez le commercial le plus enthousiaste.</li>
                <li><Link href="/blog/pourquoi-bons-commerciaux-deviennent-mediocres-mauvais-systeme" className="text-mint-green hover:underline font-medium">Pourquoi les bons commerciaux deviennent médiocres dans un mauvais système</Link> — Même le meilleur recrutement échouera si le cadre de travail ne suit pas.</li>
              </ul>
            </div>

            {/* E-E-A-T note */}
            <div className="border-t border-gray-200 pt-8 mt-12">
              <p className="text-gray-600 italic mb-4">
                Les principes de recrutement présentés ici sont alignés sur les recherches en psychologie organisationnelle. Voir aussi le <a href="https://hbr.org/2021/01/hiring-the-right-people-in-the-right-roles" target="_blank" rel="noopener noreferrer" className="text-mint-green hover:underline">guide Harvard Business Review sur le recrutement structuré</a>.
              </p>
              <p className="text-gray-600">
                Pour un diagnostic complet de votre organisation commerciale, venez <Link href="/diagnostic" className="text-mint-green hover:underline">parler de votre situation</Link>.
              </p>
            </div>
          </div>
        </article>

        {/* CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-4 text-center">
              Besoin d&apos;en parler plus directement ?
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Si votre situation mérite un échange plus direct, vous pouvez aussi laisser un message ici.
            </p>
            <HubSpotForm />
          </div>
        </section>
      </main>
    </>
  );
}
