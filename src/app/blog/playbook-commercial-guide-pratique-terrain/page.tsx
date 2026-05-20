import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';

const articleUrl = 'https://www.laurentserre.com/blog/playbook-commercial-guide-pratique-terrain';
const heroImage = 'https://www.laurentserre.com/images/blog/2026-05-20-playbook-commercial-hero.webp';

export const metadata: Metadata = {
  title: 'Playbook commercial : le guide pratique pour créer celui qui va vraiment être utilisé',
  description:
    'La plupart des playbooks finissent oublies dans un Google Drive. Voici comment construire un vrai guide de terrain que vos commerciaux consulteront.',
  keywords:
    'playbook commercial, guide pratique vente, methode de vente, sales playbook PME, processus de vente, playbook de vente, Laurent Serre',
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-05-20',
  },
  openGraph: {
    title: 'Playbook commercial : construire celui qui sert vraiment sur le terrain',
    description:
      'Un playbook utile n est pas un roman de 80 pages. C est un outil de terrain consultable en 3 clics. Voici comment le construire avec votre equipe.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImage,
        width: 1536,
        height: 1024,
        alt: 'Playbook commercial - construire un outil de terrain qui sert vraiment',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Playbook commercial : le guide pratique pour creer celui qui va vraiment etre utilise',
    description:
      'Un playbook de vente ne doit pas etre un document de 80 pages. Un guide de terrain consultable en 3 clics.',
    images: [heroImage],
  },
};

export default function PlaybookCommercialGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': articleUrl + '#posting',
        headline: 'Playbook commercial : le guide pratique pour creer celui qui va vraiment etre utilise',
        description:
          'La plupart des playbooks finissent oublies dans un Google Drive. Voici comment construire un vrai guide de terrain que vos commerciaux consulteront.',
        image: heroImage,
        datePublished: '2026-05-20',
        dateModified: '2026-05-20',
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
        articleSection: 'Methode de vente / outils terrain',
        keywords: [
          'playbook commercial',
          'guide pratique vente',
          'methode de vente',
          'sales playbook PME',
          'processus de vente',
          'outils commerciaux terrain',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': articleUrl + '#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Un playbook commercial, c est quoi concretement ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'C est un guide de terrain qui documente les meilleures pratiques commerciales : ICP, processus de vente, scripts, objections, questions de decouverte, arguments concurrentiels. Il se lit en situation, pas en theorie.',
            },
          },
          {
            '@type': 'Question',
            name: 'Combien de temps faut-il pour creer un playbook qui serve vraiment ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Deux semaines pour une V1 utilisable. L essentiel est de commencer par les situations terrain qui coutent le plus cher, pas de vouloir tout documenter du premier coup.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment faire en sorte que l equipe utilise le playbook ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Trois conditions : 1) il est construit avec l equipe, pas par un consultant isole 2) il est accessible en 3 clics depuis le terrain 3) il est reference en reunion et mis a jour trimestriellement avec l equipe.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': articleUrl + '#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: 'https://www.laurentserre.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://www.laurentserre.com/blog',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Playbook commercial',
            item: articleUrl,
          },
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

      <section className="relative min-h-[70vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/blog/2026-05-20-playbook-commercial-hero.webp"
            alt="Playbook commercial - construire un outil de terrain qui sert vraiment"
            fill
            className="object-cover object-top brightness-[0.3]"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-mint-green text-white">
              Methode de vente / outils terrain
            </span>
            <span className="text-white/60 text-sm">• 20 mai 2026</span>
            <span className="text-white/60 text-sm">• 7 min</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold mb-6 leading-tight">
            Playbook commercial : le guide pratique pour creer celui qui va vraiment etre utilise
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            La plupart des playbooks ont le meme destin : crees avec enthousiasme, partages avec l'equipe, puis oublies dans un dossier que personne ne rouvrira jamais.
          </p>
        </div>
      </section>  
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <div className="bg-mint-green/10 border border-mint-green/30 rounded-2xl p-6 mb-10">
            <p className="font-title font-bold text-blue-ink text-sm uppercase tracking-wider mb-3">Ce que vous allez retenir</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Un playbook n est pas un document</strong> - c est un outil de terrain consultable en situation.</li>
              <li><strong>7 sections cles</strong> pour couvrir l essentiel sans faire 80 pages.</li>
              <li><strong>2 semaines suffisent</strong> pour une V1 utilisable, si on commence par l essentiel.</li>
              <li><strong>L usage depend du terrain</strong> : construire avec l equipe, pas depuis un bureau.</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10">
            <p className="text-sm text-amber-700">
              J ai mis en images les situations decrites dans cet article dans un carrousel BD consultez-le avant de commencer la lecture :
              <br />
              <a href="/downloads/carrousel-playbook-commercial-terrain.pdf" className="text-mint-green hover:underline font-medium" target="_blank">
                → Telecharger le carrousel Playbook Commercial Terrain (PDF, 12 slides)
              </a>
            </p>
          </div>

          <nav className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 mb-10" aria-label="Sommaire">
            <p className="font-title font-bold text-blue-ink text-sm uppercase tracking-wider mb-3">Sommaire</p>
            <ul className="space-y-1.5 text-sm">
              <li><a href="#mauvais-reflexe" className="text-mint-green hover:underline">1. Le mauvais reflexe du playbook de 80 pages</a></li>
              <li><a href="#qu-est-ce-qu-un-bon-playbook" className="text-mint-green hover:underline">2. Qu est-ce qu un bon playbook commercial ?</a></li>
              <li><a href="#contenu-cles" className="text-mint-green hover:underline">3. Les contenus qui servent vraiment</a></li>
              <li><a href="#methode-de-construction" className="text-mint-green hover:underline">4. Le sprint de construction en 2 semaines</a></li>
              <li><a href="#faire-utiliser" className="text-mint-green hover:underline">5. Faire en sorte qu il soit vraiment utilise</a></li>
              <li><a href="#faq" className="text-mint-green hover:underline">6. FAQ playbook commercial</a></li>
            </ul>
          </nav>

          <h2 id="mauvais-reflexe" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le mauvais reflexe du playbook de 80 pages
          </h2>

          <p className="mb-8">
            La plupart des equipes de vente n ont pas vraiment de methode de travail structuree.
          </p>
          <p className="mb-8">
            Jusqu au jour ou le directeur commercial en a marre des pratiques dispersees, epuisantes et peu productives.
          </p>
          <p className="mb-8">
            Et il fait ce qui semble logique : il ecrit ou commande un "sales playbook".
          </p>
          <p className="mb-8">
            Le probleme, c est que dans huit cas sur dix, ce playbook finit au fond d un Google Drive que personne ne rouvre jamais.
          </p>
          <p className="mb-8">
            Pourquoi ? Parce qu on a construit un document, pas un outil de terrain.
          </p>
          <p className="mb-8">
            Je vois regulierement des PME investir des semaines a produire des playbooks exhaustifs, beaux, complets, bien organises et decouvrir trois mois plus tard que personne ne les a ouverts.
          </p>
          <p className="mb-8">
            Le piege, c est de croire que l effort de production garantit l utilite.
          </p>
          <p className="mb-8">
            Un playbook de 80 pages qui dort vaut zero. Une fiche de 3 pages consultee chaque semaine change la performance de l equipe.
          </p>

          <h2 id="qu-est-ce-qu-un-bon-playbook" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Qu est-ce qu un bon playbook commercial ?
          </h2>

          <p className="mb-8">
            Un playbook commercial, c est le manuel de terrain de votre equipe de vente.
          </p>
          <p className="mb-8">
            Il documente et standardise les meilleures pratiques pour votre contexte specifique.
          </p>
          <p className="mb-8">
            Il repond a ces questions :
          </p>
          <ul className="list-disc list-inside space-y-2 mb-8">
            <li>Qui sont nos clients ideaux et comment les reconnaitre ?</li>
            <li>Quel est notre processus de vente etape par etape ?</li>
            <li>Quels messages fonctionnent pour chaque profil de prospect ?</li>
            <li>Comment repondre aux objections les plus frequentes ?</li>
            <li>Quels outils utiliser a chaque etape ?</li>
          </ul>
          <p className="mb-8">
            L objectif : permettre a un nouveau commercial d etre operationnel trois fois plus vite, et a un commercial experimente d avoir toujours acces au meilleur de l intelligence collective de l equipe.
          </p>
          <p className="mb-8">
            Mais attention : un playbook n est pas une bible qu on lit une fois. C est un guide qu on consulte en situation de vente.
          </p>

          <h2 id="contenu-cles" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les contenus qui servent vraiment
          </h2>

          <p className="mb-8">
            Un playbook qui sert sur le terrain couvre sept zones.
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mb-3">
            1. ICP et qualification
          </h3>
          <p className="mb-8">
            Decrivez votre client ideal avec precision : secteur, taille, poste du decideur, signaux declencheurs, points de douleur typiques. Ajoutez votre grille de qualification : quels criteres doivent etre reunis pour qu une opportunite merite d avancer dans le pipeline ? Une matrice BANT adaptee a votre contexte fait tres bien l affaire.
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mb-3">
            2. Le processus de vente
          </h3>
          <p className="mb-8">
            Chaque etape de votre cycle de vente doit avoir : un critere d entree, des actions cles, des questions a poser, des livrables attendus et un critere de passage a l etape suivante. Ce schema rend le processus reproductible.
            Il permet aussi d identifier precisement ou les affaires stagnent dans le pipeline.
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mb-3">
            3. Les scripts et messages par canal
          </h3>
          <p className="mb-8">
            Telephone : script d accroche, script de decouverte, guide de gestion des gardiens.<br />
            Email : templates de prise de contact, de relance, de suivi apres rendez-vous, de proposition, de break-up.<br />
            LinkedIn : messages de connexion, de premier contact, de relance.
          </p>
          <p className="mb-8">
            Important : ce sont des guides, pas des textes a reciter mot a mot. L equilibre est entre cadre et personnalisation.
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mb-3">
            4. Les questions de decouverte
          </h3>
          <p className="mb-8">
            Les 15 a 20 meilleures questions, organisees par theme : enjeux business, contexte actuel, problemes existants, tentatives passees, criteres de decision, budget, decideurs. Cette section est souvent la colonne vertebrale du playbook.
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mb-3">
            5. La bibliotheque des objections
          </h3>
          <p className="mb-8">
            Les 10 a 15 objections les plus frequentes, avec pour chacune : ce que l objection signifie vraiment, la reponse recommandee (methode en 4 etapes : reception, creuser, reformuler, repondre), des exemples de formulations qui fonctionnent.
            C est souvent la section la plus consultee du playbook.
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mb-3">
            6. Arguments concurrentiels
          </h3>
          <p className="mb-8">
            Pour chacun de vos 3 a 5 principaux concurrents : leurs points forts reels, leurs faiblesses reelles, votre positionnement face a eux. Regle d or : ne denigrez jamais un concurrent. Differenciez-vous positivement.
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mb-3">
            7. Outils et ressources
          </h3>
          <p className="mb-8">
            La liste des outils de l equipe, des guides de prise en main rapide, des ressources de formation, des templates de propositions, des etudes de cas clients par secteur.
          </p>

          <h2 id="methode-de-construction" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le sprint de construction en 2 semaines
          </h2>

          <p className="mb-8">
            Le playbook parfait est l ennemi du playbook utilisable. Commencez simple.
          </p>

          <p className="mb-8">
            <strong>Semaine 1 :</strong><br />
            Jour 1-2 : ICP et processus de vente (sections 1 et 2).<br />
            Jour 3-4 : les 5 meilleurs scripts que vous utilisez deja (section 3).<br />
            Jour 5 : les 10 objections les plus frequentes (section 5, ebauche).
          </p>

          <p className="mb-8">
            <strong>Semaine 2 :</strong><br />
            Jour 1-2 : finaliser la bibliotheque des objections avec l equipe.<br />
            Jour 3 : ajouter les questions de decouverte (section 4).<br />
            Jour 4 : section concurrence (section 6).<br />
            Jour 5 : review collective avec l equipe, ajustements.
          </p>

          <p className="mb-8">
            Vous avez un playbook V1 en 2 semaines. Il sera imparfait. C est normal. Il s ameliorera dans l utilisation.
          </p>

          <h2 id="faire-utiliser" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Faire en sorte qu il soit vraiment utilise
          </h2>

          <p className="mb-8">
            C est la que la plupart des playbooks meurent : apres la creation.
          </p>

          <p className="mb-8">
            <strong>Regle 1 : accessible en 3 clics maximum.</strong> Google Slides, Notion, un PDF bien structure, le format importe moins que l accessibilite immediate depuis le terrain.
          </p>

          <p className="mb-8">
            <strong>Regle 2 : integre dans l onboarding.</strong> Tout nouveau commercial doit passer par le playbook dans ses premieres semaines. C est le premier outil de formation.
          </p>

          <p className="mb-8">
            <strong>Regle 3 : reference en reunion commerciale.</strong> "On a une bonne pratique sur ce sujet dans le playbook, section objections." Chaque reference cree un reflexe de consultation.
          </p>

          <p className="mb-8">
            <strong>Regle 4 : mis a jour trimestriellement avec l equipe.</strong> Un playbook obselete devient vite credible. Bloquez une heure par trimestre pour l enrichir des nouvelles pratiques et objections rencontrees.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-amber-800 mb-4">L essentiel en 3 actions cette semaine</p>
            <ul className="space-y-3 text-sm text-amber-700">
              <li><strong>1.</strong> Creez votre ICP en une page secteur, taille, poste du decideur, 3 problemes principaux, 3 signaux declencheurs. Une heure de travail.</li>
              <li><strong>2.</strong> Listez les 10 objections les plus frequentes de votre equipe. Pour chacune, redigez votre meilleure reponse actuelle.</li>
              <li><strong>3.</strong> Choisissez un format (Notion, Google Slides, PDF). Creez la structure vide avec les 7 sections et commencez a la remplir.</li>
            </ul>
          </div>

          <p className="text-lg font-title font-semibold text-blue-ink my-8">
            Un playbook V1 imparfait qui est utilise vaut infiniment plus qu un playbook parfait qui reste en brouillon.
          </p>

          <p className="text-xs text-gray-400 mb-8">
            Cet article s appuie sur mon experience d accompagnement d equipes commerciales PME depuis 2016. Les references methodologiques incluent les travaux de Neil Rackham (SPIN Selling) et les retours de terrain de plusieurs centaines d entreprises accompagnees sur la structuration de leur force de vente.
          </p>

          <h2 id="faq" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            FAQ playbook commercial
          </h2>
          <div className="space-y-6 mb-10">
            <div>
              <h3 className="text-2xl font-title font-semibold text-blue-ink mb-3">
                Un playbook commercial, c est quoi concretement ?
              </h3>
              <p className="mb-0">
                C est un guide de terrain qui documente les meilleures pratiques commerciales : ICP, processus de vente, scripts, objections, questions de decouverte, arguments concurrentiels. Il se lit en situation, pas en theorie.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-title font-semibold text-blue-ink mb-3">
                Combien de temps faut-il pour creer un playbook qui serve vraiment ?
              </h3>
              <p className="mb-0">
                Deux semaines pour une V1 utilisable. L essentiel est de commencer par les situations terrain qui coutent le plus cher, pas de vouloir tout documenter du premier coup.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-title font-semibold text-blue-ink mb-3">
                Comment faire en sorte que l equipe utilise le playbook ?
              </h3>
              <p className="mb-0">
                Trois conditions : 1) il est construit avec l equipe, pas par un consultant isole 2) il est accessible en 3 clics depuis le terrain 3) il est reference en reunion et mis a jour trimestriellement avec l equipe.
              </p>
            </div>
          </div>

          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/blog/methodes-vente-comparees-spin-bant-bebedc" className="text-mint-green hover:underline font-medium">
                  Methodes de vente comparees : SPIN, BANT, BEBEDC
                </Link>
                <span className="text-gray-500"> Pour choisir la methode qui structurera votre playbook.</span>
              </li>
              <li>
                <Link href="/blog/gestion-des-objections-commerciales-transformer-le-non-en-opportunite" className="text-mint-green hover:underline font-medium">
                  Gestion des objections commerciales
                </Link>
                <span className="text-gray-500"> La section la plus consultee de tout playbook, en detail.</span>
              </li>
              <li>
                <Link href="/blog/plan-prospection-commerciale-machine-leads-annee" className="text-mint-green hover:underline font-medium">
                  Plan de prospection commerciale
                </Link>
                <span className="text-gray-500"> Pour integrer la prospection dans votre playbook.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h2 className="text-2xl font-title font-bold mb-4">
              Vous sentez que votre equipe commerciale manque de methode commune ?
            </h2>
            <p className="mb-6">
              Un accompagnement terrain permet de construire un playbook qui part du reel de votre equipe, pas d un template generique. Je travaille avec vos commerciaux sur les situations qui font la difference : qualification, objections, decouverte, closing.
            </p>
            <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
              Faire un diagnostic commercial →
            </Link>
          </div>

          <div className="mt-12">
            <AuthorCard />
          </div>

          <section className="mt-12 pt-10 border-t border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-8 text-center">
              Prendre contact avec Laurent Serre
            </h2>
            <HubSpotForm />
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/blog" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
              ← Tous les articles du blog
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
