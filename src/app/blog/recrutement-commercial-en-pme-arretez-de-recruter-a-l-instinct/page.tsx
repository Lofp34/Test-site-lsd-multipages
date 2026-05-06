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
        url: 'https://www.laurentserre.com/images/blog/2026-05-06-recrutement-commercial-pme-hero.png',
        width: 1536,
        height: 1024,
        alt: 'Recrutement commercial en PME — arrêtez de recruter à l\'instinct',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recrutement commercial en PME : arrêtez de recruter à l\'instinct | Laurent Serre',
    description:
      'Un mauvais recrutement commercial coûte 50 000€ à 150 000€. Guide terrain pour recruter les bons profils en PME.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-06-recrutement-commercial-pme-hero.png'],
  },
};

const article = {
  title: 'Recrutement commercial en PME : arrêtez de recruter à l\'instinct',
  date: '2026-05-06',
  readTime: '8 min',
  category: 'Recrutement / management',
  image: '/images/blog/2026-05-06-recrutement-commercial-pme-hero.png',
};

export default function ArticlePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Article Header */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
              {article.category}
            </span>
            <span className="text-xs text-gray-500 self-center">{article.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
            <span>Publié le {article.date}</span>
            <span>·</span>
            <span>Par <Link href="/" className="text-blue-700 hover:underline">Laurent Serre</Link></span>
          </div>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-li:text-gray-700">
            <p className="lead text-xl text-gray-600 leading-relaxed mb-8">
              Un mauvais recrutement commercial coûte entre 50 000€ et 150 000€ à une PME. Salaire, charges, formation, opportunités manquées pendant la montée en puissance, et finalement la réembauche. C'est un calcul que la plupart des dirigeants n'ont jamais fait — et qu'ils ne veulent pas faire.
            </p>

            <p>
              Pourtant, la plupart des recrutements commerciaux en PME se font encore à l'instinct. "Il a de la gueule. Il a bien vendu lors de l'entretien. Je sens que ça va coller."
            </p>

            <p>
              Le problème ? Les commerciaux sont professionnellement formés pour faire une bonne impression. Si vous recrutez un commercial en vous basant uniquement sur votre feeling, vous avez peut-être recruté le meilleur vendeur de sa propre candidature. Pas forcément le meilleur vendeur de votre offre.
            </p>

            <p>
              Voici comment structurer votre recrutement commercial pour faire les bons choix.
            </p>

            <h2>Définir précisément le profil avant de chercher</h2>

            <p>
              Le recrutement raté commence toujours par la même erreur : chercher "un bon commercial" sans avoir défini ce que ça signifie dans votre contexte précis.
            </p>

            <p>
              Un bon commercial pour vendre des logiciels SaaS en cycle court à des TPE n'a pas le même profil qu'un bon commercial pour vendre des équipements industriels à des grands comptes avec un cycle de 12 mois.
            </p>

            <p><strong>Questions à vous poser avant de publier votre annonce :</strong></p>

            <ul>
              <li>Cycle de vente court (&lt; 3 mois) ou long (&gt; 6 mois) ?</li>
              <li>Vente transactionnelle ou consultative ?</li>
              <li>Chasse (nouveaux clients) ou élevage (développement de portefeuille existant) ?</li>
              <li>Vente solo ou en équipe avec des avant-ventes, techniciens, etc. ?</li>
              <li>Secteur spécialisé nécessitant une expertise métier, ou généraliste ?</li>
              <li>Autonomie totale ou besoin d'encadrement fort ?</li>
            </ul>

            <p>
              Répondez honnêtement à ces questions. Le profil idéal en découlera naturellement.
            </p>

            <h2>Les critères qui comptent vraiment</h2>

            <h3>Ce qui ne prédit pas la performance</h3>

            <ul>
              <li>La présentation soignée et le discours fluide (c'est le minimum, pas un différenciateur)</li>
              <li>Le beau CV avec des entreprises connues (le contexte change tout)</li>
              <li>Les soft skills déclarées : "je suis persévérant, orienté résultats, bon communiquant" (tout le monde le dit)</li>
            </ul>

            <h3>Ce qui prédit réellement la performance</h3>

            <p><strong>1. L'historique de résultats chiffrés et vérifiables</strong></p>

            <p>
              Un bon commercial sait exactement combien il a vendu, quel était son objectif, quel était son rang dans l'équipe. Il parle en chiffres concrets.
            </p>

            <p>
              Méfiance si les réponses sont vagues : "J'ai fait de bons résultats", "J'étais dans le top de l'équipe". Creusez toujours : "Quel était votre objectif annuel ? Quel pourcentage avez-vous atteint ? Vous étiez en quelle position dans l'équipe ?"
            </p>

            <p><strong>2. La capacité à apprendre et à s'adapter</strong></p>

            <p>
              Les meilleurs commerciaux ne sont pas ceux qui savent déjà tout. Ce sont ceux qui apprennent vite et s'adaptent rapidement à un nouveau contexte.
            </p>

            <p><strong>3. La résilience face au refus</strong></p>

            <p>
              La prospection implique des dizaines de "non" par semaine. Est-ce que cette personne est capable de rester motivée et efficace malgré les refus répétés ?
            </p>

            <p><strong>4. La rigueur organisationnelle</strong></p>

            <p>
              Un commercial qui ne tient pas son CRM, ne respecte pas ses engagements de relance, n'anticipe pas ses prochaines actions — c'est un commercial qui sous-performe.
            </p>

            <h2>Un processus de recrutement en 4 étapes</h2>

            <h3>Étape 1 : L'entretien de qualification téléphonique (20 minutes)</h3>

            <p>
              Avant d'inviter quelqu'un pour un entretien, faites un premier échange téléphonique. Vous gagnez du temps, et vous observez déjà comment la personne se comporte dans une situation de communication à distance.
            </p>

            <p>Questions clés : parcours rapide, motivations pour le poste, disponibilité, prétentions.</p>

            <h3>Étape 2 : L'entretien comportemental (60-90 minutes)</h3>

            <p>
              Posez des questions basées sur des situations réelles passées.
            </p>

            <ul>
              <li><em>"Racontez-moi votre plus belle vente. Quelle était la situation de départ ? Qu'avez-vous fait ? Quel a été le résultat ?"</em></li>
              <li><em>"Décrivez-moi une affaire que vous avez perdue alors que vous pensiez la signer. Qu'avez-vous appris ?"</em></li>
              <li><em>"Comment gérez-vous une semaine où rien ne fonctionne — les prospects ne répondent pas, les rendez-vous s'annulent ?"</em></li>
            </ul>

            <p>
              Les réponses concrètes et détaillées signalent un profil authentique. Les réponses génériques et théoriques signalent quelqu'un qui récite.
            </p>

            <h3>Étape 3 : La mise en situation commerciale</h3>

            <p>
              C'est l'étape que la plupart des PME sautent. Pourtant, c'est la plus révélatrice.
            </p>

            <p>
              Donnez au candidat un brief réaliste : "Vous êtes commercial chez nous. Je suis un prospect directeur des opérations dans une entreprise de transport. Vous m'appelez pour prospecter. Allez-y."
            </p>

            <p>
              Observez : comment il accroche, comment il découvre, comment il gère une objection, comment il propose un prochain step.
            </p>

            <p>Vous verrez la différence entre le "bon discours en entretien" et le "bon commercial en action".</p>

            <h3>Étape 4 : La vérification des références</h3>

            <p>Obligatoire. Appelez les anciens managers directs — pas les collègues ou les personnes proposées par le candidat.</p>

            <p>Questions à poser :</p>
            <ul>
              <li>"Sur une échelle de 1 à 10, comment évalueriez-vous sa performance commerciale ?"</li>
              <li>"Atteignait-il ses objectifs ? Régulièrement ?"</li>
              <li>"Quels étaient ses principaux points de développement ?"</li>
              <li>"Le reprendriez-vous si vous en aviez l'opportunité ?"</li>
            </ul>

            <p>Cette dernière question est souvent la plus révélatrice.</p>

            <h2>Les signaux d'alerte pendant le processus</h2>

            <p><strong>Red flags à prendre au sérieux :</strong></p>
            <ul>
              <li>Ne peut pas citer de chiffres précis sur ses résultats passés</li>
              <li>Critique excessivement ses anciens employeurs</li>
              <li>Cherche à négocier une part fixe très élevée avec peu de variable (indice : peu confiant en sa capacité à performer)</li>
              <li>Répond "je suis quelqu'un de très organisé" mais arrive en retard à l'entretien</li>
              <li>Ne pose aucune question sur le poste, les clients, le marché</li>
            </ul>

            <p><strong>Bons signaux :</strong></p>
            <ul>
              <li>Arrive avec des questions précises et pertinentes sur votre marché</li>
              <li>Sait exactement combien il a gagné, vendu, perdu et pourquoi</li>
              <li>Parle de ses clients avec respect et compréhension de leurs enjeux</li>
              <li>Est capable de décrire précisément comment il passerait ses premières semaines</li>
            </ul>

            <h2>Intégration : les 90 premiers jours qui font tout</h2>

            <p>
              Le recrutement ne s'arrête pas à la signature du contrat. Les 90 premiers jours sont déterminants.
            </p>

            <p>Un plan d'intégration efficace pour un commercial en PME comprend :</p>

            <ul>
              <li><strong>Semaine 1</strong> : connaissance de l'entreprise, des offres, des clients clés</li>
              <li><strong>Semaines 2-3</strong> : accompagnement terrain avec un commercial expérimenté ou vous-même</li>
              <li><strong>Semaines 4-8</strong> : premières prospections avec debriefing quotidien</li>
              <li><strong>Mois 3</strong> : objectifs progressifs, premier bilan de performance</li>
            </ul>

            <p>
              Ne laissez pas un nouveau commercial se noyer seul. Le temps investi dans les 90 premiers jours se récupère largement sur les 3 ans suivants.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-6 my-8">
              <p className="text-gray-700 mb-0">
                Pendant cette période, la <Link href="/formation-commerciale-pme">formation commerciale terrain</Link> joue un rôle clé : un recrutement bien fait n'est efficace que si la montée en compétence suit. Et une fois l'équipe constituée, un bon <Link href="/management-equipe-commerciale">management d'équipe commerciale</Link> fait la différence entre une équipe qui tient ses objectifs et une équipe qui stagne.
              </p>
            </div>

            <p>
              Avant de recruter, un <Link href="/diagnostic">diagnostic commercial</Link> permet d'identifier les vrais besoins : est-ce un recrutement, une réorganisation, ou un problème de méthode ? Beaucoup de PME recrutent pour résoudre un problème qui n'est pas un problème d'effectif.
            </p>

            <h2>Conclusion : 3 actions pour votre prochain recrutement</h2>

            <ol>
              <li><strong>Définissez précisément votre profil idéal</strong> avant de publier quoi que ce soit. Cycle de vente, type de vente, secteur, autonomie requise.</li>
              <li><strong>Intégrez une mise en situation commerciale réelle</strong> dans votre processus. 20 minutes de roleplay vous apprendront plus que 2 heures d'entretien classique.</li>
              <li><strong>Vérifiez systématiquement les références</strong> avec les 4 questions listées plus haut. C'est la step la plus sautée et pourtant la plus précieuse.</li>
            </ol>

            <p className="text-lg font-semibold text-gray-900 mt-8">
              Recruter vite, c'est souvent recruter deux fois. Prenez le temps de bien faire — votre équipe et votre CA vous en remercieront.
            </p>
          </div>
        </div>
      </section>

      {/* Bio CTA */}
      <section className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center">
            <Image
              src="/laurent-serre-avatar.jpg"
              alt="Laurent Serre"
              width={80}
              height={80}
              className="rounded-full mx-auto mb-4"
            />
            <p className="text-sm text-gray-500 mb-1">Écrit par</p>
            <p className="text-lg font-semibold text-gray-900 mb-2">Laurent Serre</p>
            <p className="text-gray-600 text-sm max-w-lg mx-auto mb-6">
              Accompagne les dirigeants de PME et leurs équipes commerciales à transformer leur développement commercial depuis 25 ans. Formation, diagnostic, organisation — toujours sur le terrain.
            </p>
            <div className="flex justify-center gap-3">
              <Link href="/diagnostic" className="inline-block bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
                Demander un diagnostic
              </Link>
              <Link href="/blog" className="inline-block border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
                Tous les articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HubSpot Form */}
      <HubSpotForm />
    </main>
  );
}
