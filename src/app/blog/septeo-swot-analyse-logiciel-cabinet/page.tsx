import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import BDCarousel from '@/components/BDCarousel';
import AuthorCard from '@/components/AuthorCard';

const heroImage = '/images/blog/septeo-swot/septeo-swot-hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/septeo-swot/septeo-swot-hero.webp';
const ogImageAbsolute = 'https://www.laurentserre.com/images/blog/septeo-swot/septeo-swot-og.jpg';

export const metadata: Metadata = {
  title: 'Septeo analyse SWOT 2026 : forces, faiblesses, verdict',
  description:
    'Une analyse SWOT Septeo vue par un commercial terrain, pas par leur marketing. Forces réelles, faiblesses franches, opportunités, menaces et verdict par Laurent Serre.',
  keywords:
    'Septeo analyse SWOT, Septeo forces faiblesses, Septeo avis, Septeo STP One acquisition, analyse SWOT logiciel cabinet, Septeo concurrents, editeur legaltech français',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/septeo-swot-analyse-logiciel-cabinet',
  },
  openGraph: {
    title: 'Septeo : analyse SWOT de l\'éditeur legaltech français',
    description:
      'Vous êtes dirigeant de PME, on vous parle de Septeo. Voici l\'analyse qu\'aucun commercial Septeo ne vous fera : forces, faiblesses, opportunités, menaces.',
    url: 'https://www.laurentserre.com/blog/septeo-swot-analyse-logiciel-cabinet',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: ogImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Analyse SWOT Septeo - forces, faiblesses, opportunités, menaces',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Septeo : analyse SWOT de l\'éditeur legaltech français',
    description:
      'Analyse SWOT complète de Septeo : tableau 4 quadrants, analyse terrain, verdict pour votre cabinet ou direction juridique.',
    images: [ogImageAbsolute],
  },
};

export default function SepteoSwotPage() {
  const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: 'Septeo : analyse SWOT de l\'editeur legaltech francais',
          description:
            'Analyse SWOT complete de Septeo avec tableau 4 quadrants. Forces, faiblesses, opportunites, menaces. Verdict : Septeo est-il fait pour vous ?',
          image: heroImageAbsolute,
          datePublished: '2026-06-10',
          dateModified: '2026-06-10',
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
            '@id': 'https://www.laurentserre.com/blog/septeo-swot-analyse-logiciel-cabinet',
          },
          articleSection: 'Logiciels métier / Analyse éditeur',
          keywords: [
            'Septeo',
            'SWOT',
            'logiciel cabinet juridique',
            'legaltech',
            'analyse éditeur',
          ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.laurentserre.com/blog/septeo-swot-analyse-logiciel-cabinet"
    },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.laurentserre.com/blog/septeo-swot-analyse-logiciel-cabinet#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Le tableau SWOT en un coup d&rsquo;oeil',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Forces (Strengths) Faiblesses (Weaknesses) Leader francais et europeen de la legaltech Suite logicielle integree (gestion dossiers, facturation, CRM, IA) IA native embarquee (Septeo Brain, automatisation documentaire) Presence forte dans les professions reglementees (notaires, avocats) Classements independants favorables (ELM Vendor Matrix 2024 n°1) Support client note (NPS ~48) Coût eleve, surtout pour les petits cabinets Courbe d&rsquo;apprentissage significative Integration post-acquisitions ',
            },
          },
          {
            '@type': 'Question',
            name: 'Forces : ce que Septeo fait vraiment bien',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La premiere chose qui frappe quand on regarde Septeo, c&rsquo;est la coherence de la pile. Peu d&rsquo;editeurs en France proposent une suite aussi integree : gestion des dossiers, facturation, CRM, portail client, et maintenant IA. Quand tout marche ensemble, le gain de temps est reel. J&rsquo;ai vu un cabinet de 40 avocats passer de six outils separes a une seule plateforme. Leur temps administratif est passe de 30% a 12% du temps facturable. C&rsquo;est concret. L&rsquo;IA native est un vrai ',
            },
          },
          {
            '@type': 'Question',
            name: 'Faiblesses : ce qu&rsquo;on ne vous dit pas en demo',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le prix d&rsquo;abord. Septeo n&rsquo;est pas l&rsquo;outil le plus cher du marche, mais l&rsquo;ecart avec des solutions plus legeres est significatif et les couts de migration initiaux sont rarement mentionnes dans le premier entretien. La courbe d&rsquo;apprentissage, ensuite. J&rsquo;ai accompagne un cabinet ou la mise en oeuvre a dure six mois au lieu des trois prevus, parce que la formation avait ete sous-estimee par le commercial. Ce n&rsquo;est pas un probleme de produit, c&rsquo;est un ',
            },
          },
          {
            '@type': 'Question',
            name: 'Opportunites : le marche bouge en leur faveur',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le marche de la legaltech francaise croit d&rsquo;environ 15% par an. La digitalisation des cabinets n&rsquo;en est qu&rsquo;a 40% de penetration. Il y a de la place pour tout le monde. L&rsquo;IA generative est l&rsquo;opportunite la plus nette pour Septeo. Les editeurs qui ont deja l&rsquo;IA en production, pas en powerpoint, partent avec un train d&rsquo;avance. Septeo en fait partie. L&rsquo;internationalisation via stp.one est une bonne carte. Le marche DACH (Allemagne, Autriche, Suisse) es',
            },
          },
          {
            '@type': 'Question',
            name: 'Menaces : ce qui pourrait les rattraper',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La premiere menace, c&rsquo;est la consolidation elle-meme. Chaque acquisition ajoute une couche de complexite technique et humaine. Les clients stp.one vont devoir migrer. Les clients Septeo vont voir leur feuille de route perturbee. C&rsquo;est le moment ou des concurrents plus agiles peuvent grignoter des parts. La deuxieme, ce sont les alternatives plus legeres et moins cheres. Des editeurs comme Clio commencent a s&rsquo;implanter serieusement en Europe. Et du cote open-source, des solution',
            },
          }
        ],
      },
  
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', 'position': 3, 'name': 'Septeo : l&rsquo;analyse SWOT qu&rsquo', 'item': 'https://www.laurentserre.com/blog/septeo-swot-analyse-logiciel-cabinet' },
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
            <div className="inline-flex items-center gap-3 bg-orange-soft/10 backdrop-blur-sm border border-orange-soft/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-orange-soft text-sm">
                Logiciels metier / Analyse editeur
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Septeo : l&rsquo;analyse SWOT qu&rsquo;aucun commercial ne vous fera
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
              <time dateTime="2026-06-10">10 juin 2026</time>
              <span>•</span>
              <span>8 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Analyse SWOT Septeo - editeur legaltech francais"
              width={1536}
              height={1024}
              className="w-full h-80 object-cover object-top rounded-2xl shadow-lg"
              quality={60}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          {/* AuthorCard */}
          <div className="not-prose mb-8">
            <AuthorCard />
          </div>

          {/* BDCarousel */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : le piège du leader legaltech
            </p>
            <p className="text-sm text-amber-700 mb-5">
              Jean, directeur d&rsquo;un cabinet de 30 avocats, doit choisir son logiciel metier. Septeo semble la solution evidente. Trop evidente. Sa rencontre avec Laurent, consultant, l&rsquo;aide a construire sa propre analyse SWOT. Ce qu&rsquo;on ne vous dit pas dans une demo Septeo.
            </p>
            <BDCarousel
              images={[
                { src: '/images/blog/septeo-swot/bd-slide-01-cover.webp', alt: 'Cover - Le piège du leader', index: 0 },
                { src: '/images/blog/septeo-swot/bd-slide-02-demo-parfaite.webp', alt: 'Jean assiste à une démo Septeo parfaite', index: 1 },
                { src: '/images/blog/septeo-swot/bd-slide-03-doute.webp', alt: 'Le doute s installe après la démo', index: 2 },
                { src: '/images/blog/septeo-swot/bd-slide-04-regard-exterieur.webp', alt: 'Jean rencontre Laurent pour un regard extérieur', index: 3 },
                { src: '/images/blog/septeo-swot/bd-slide-05-force-integree.webp', alt: 'Jean identifie les forces de Septeo seul', index: 4 },
                { src: '/images/blog/septeo-swot/bd-slide-06-faiblesses-cachees.webp', alt: 'Les faiblesses que la démo ne montre pas', index: 5 },
                { src: '/images/blog/septeo-swot/bd-slide-07-opportunites-marche.webp', alt: 'Opportunités du marché legaltech', index: 6 },
                { src: '/images/blog/septeo-swot/bd-slide-08-chainon-manquant.webp', alt: 'Le chaînon manquant : Laurent aide à voir les angles morts', index: 7 },
                { src: '/images/blog/septeo-swot/bd-slide-09-menaces.webp', alt: 'Les menaces à ne pas sous-estimer', index: 8 },
                { src: '/images/blog/septeo-swot/bd-slide-10-verdict-se-dessine.webp', alt: 'Le verdict se dessine', index: 9 },
                { src: '/images/blog/septeo-swot/bd-slide-11-decision.webp', alt: 'Jean prend sa décision', index: 10 },
                { src: '/images/blog/septeo-swot/bd-slide-12-septeo-pour-vous-si.webp', alt: 'Septeo est pour vous si', index: 11 },
                { src: '/images/blog/septeo-swot/bd-slide-13-vraie-lecon.webp', alt: 'La vraie leçon', index: 12 },
                { src: '/images/blog/septeo-swot/bd-slide-14-cta.webp', alt: 'Diagnostic offert', index: 13 },
              ]}
              title="Le piège du leader legaltech"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-septeo-swot.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (14 planches)
              </Link>
            </div>
          </div>

          {/* TL;DR */}
          <div className="bg-gradient-to-r from-amber-50 via-amber-50/80 to-transparent border-l-4 border-amber-400 p-6 rounded-r-xl mb-8">
            <p className="text-lg font-semibold text-amber-800 mb-2">Ce que vous allez retenir</p>
            <p className="text-gray-700 leading-relaxed">
              Septeo est le leader francais de la legaltech. Mais un leader n&rsquo;est pas toujours le bon choix pour votre structure. Cette analyse SWOT vous donne les vrais criteres de decision : forces reelles, faiblesses cachees, opportunites a saisir, menaces a ne pas sous-estimer.
            </p>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            J&rsquo;ai accompagne une quinzaine de directions juridiques et de cabinets d&rsquo;avocats dans le choix de leur logiciel metier. Septeo revient dans 100% des appels d&rsquo;offres. C&rsquo;est un reflexe, pas toujours un choix eclaire. Voici l&rsquo;analyse que personne ne vous fera en demo.
          </p>

          {/* SWOT TABLE */}
          <h2 id="tableau-swot" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le tableau SWOT en un coup d&rsquo;oeil
          </h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="bg-green-600 text-white p-4 font-title font-bold text-left rounded-tl-xl">Forces (Strengths)</th>
                  <th className="bg-red-500 text-white p-4 font-title font-bold text-left rounded-tr-xl">Faiblesses (Weaknesses)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-green-200 bg-green-50 p-4 align-top">
                    <ul className="list-disc pl-4 space-y-2 text-gray-700">
                      <li>Leader francais et europeen de la legaltech</li>
                      <li>Suite logicielle integree (gestion dossiers, facturation, CRM, IA)</li>
                      <li>IA native embarquee (Septeo Brain, automatisation documentaire)</li>
                      <li>Presence forte dans les professions reglementees (notaires, avocats)</li>
                      <li>Classements independants favorables (ELM Vendor Matrix 2024 n°1)</li>
                      <li>Support client note (NPS ~48)</li>
                    </ul>
                  </td>
                  <td className="border border-red-200 bg-red-50 p-4 align-top">
                    <ul className="list-disc pl-4 space-y-2 text-gray-700">
                      <li>Coût eleve, surtout pour les petits cabinets</li>
                      <li>Courbe d&rsquo;apprentissage significative</li>
                      <li>Integration post-acquisitions incertaine (stp.one, Bylaw)</li>
                      <li>Personnalisation parfois limitee</li>
                      <li>Turn-over interne eleve (Glassdoor ~3,9/5)</li>
                      <li>Dependance au format SaaS cloud</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th className="bg-blue-600 text-white p-4 font-title font-bold text-left rounded-bl-xl">Opportunites (Opportunities)</th>
                  <th className="bg-amber-600 text-white p-4 font-title font-bold text-left rounded-br-xl">Menaces (Threats)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-blue-200 bg-blue-50 p-4 align-top">
                    <ul className="list-disc pl-4 space-y-2 text-gray-700">
                      <li>Marche legaltech en croissance forte (+15% par an)</li>
                      <li>IA generative : nouvelle vague d&rsquo;automatisation juridique</li>
                      <li>Internationalisation Europe (rachat stp.one)</li>
                      <li>Besoin de conformite reglementaire accru (RGPD, facture electronique)</li>
                      <li>Partenariats avec les ordres professionnels</li>
                    </ul>
                  </td>
                  <td className="border border-amber-200 bg-amber-50 p-4 align-top">
                    <ul className="list-disc pl-4 space-y-2 text-gray-700">
                      <li>Concurrents agiles (Clio, LegalSuite alternatives open-source)</li>
                      <li>Risque de bulle legaltech et correction du marche</li>
                      <li>Dette technique post-fusion (stp.one)</li>
                      <li>Regulation IA europeenne pouvant freiner l&rsquo;innovation</li>
                      <li>Couts de migration eleves pour les clients</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-8">
            <p className="text-gray-700 leading-relaxed italic">
              &laquo; Un tableau SWOT ne fait pas une decision. C&rsquo;est un cadre pour regarder honnetement ce qu&rsquo;on gagne et ce qu&rsquo;on risque. Le vrai travail commence apres. &raquo;
            </p>
          </div>

          <h2 id="forces" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Forces : ce que Septeo fait vraiment bien
          </h2>

          <p className="mb-4">
            La premiere chose qui frappe quand on regarde Septeo, c&rsquo;est la coherence de la pile. Peu d&rsquo;editeurs en France proposent une suite aussi integree : gestion des dossiers, facturation, CRM, portail client, et maintenant IA. Quand tout marche ensemble, le gain de temps est reel.
          </p>

          <p className="mb-4">
            J&rsquo;ai vu un cabinet de 40 avocats passer de six outils separes a une seule plateforme. Leur temps administratif est passe de 30% a 12% du temps facturable. C&rsquo;est concret.
          </p>

          <p className="mb-4">
            L&rsquo;IA native est un vrai differentiateur. Septeo Brain permet de faire de l&rsquo;analyse documentaire, de la generation d&rsquo;actes et de la recherche intelligente sans sortir de l&rsquo;outil. La plupart des concurrents ajoutent l&rsquo;IA en surcouche. Septeo l&rsquo;a integree en profondeur. La difference se sent a l&rsquo;usage.
          </p>

          <p className="mb-8">
            Cote finances, le groupe est solide. Soutenu par Hg Capital, avec 80 millions d&rsquo;euros investis en R&D en 2025 et le rachat de stp.one pour 550 millions. Ce n&rsquo;est pas un editeur qui va disparaitre dans deux ans.
          </p>

          <h2 id="faiblesses" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Faiblesses : ce qu&rsquo;on ne vous dit pas en demo
          </h2>

          <p className="mb-4">
            Le prix d&rsquo;abord. Septeo n&rsquo;est pas l&rsquo;outil le plus cher du marche, mais l&rsquo;ecart avec des solutions plus legeres est significatif et les couts de migration initiaux sont rarement mentionnes dans le premier entretien.
          </p>

          <p className="mb-4">
            La courbe d&rsquo;apprentissage, ensuite. J&rsquo;ai accompagne un cabinet ou la mise en oeuvre a dure six mois au lieu des trois prevus, parce que la formation avait ete sous-estimee par le commercial. Ce n&rsquo;est pas un probleme de produit, c&rsquo;est un probleme de promesse commerciale.
          </p>

          <p className="mb-4">
            Le point qui revient le plus dans les retours que j&rsquo;entends : la personnalisation. Septeo est un produit tres standardise, ce qui est une force pour la scalabilite mais une faiblesse pour les cabinets qui ont des specificites metier fortes. Si votre processus sort du cadre prevu par l&rsquo;editeur, vous allez devoir vous adapter. Pas l&rsquo;inverse.
          </p>

          <p className="mb-8">
            Et il y a un signal qui merite d&rsquo;etre surveille : le turn-over interne. Les avis Glassdoor et les echanges que j&rsquo;ai pu avoir avec d&rsquo;anciens collaborateurs pointent une pression elevee sur les equipes. Quand une boite grossit vite par acquisitions, la culture interne prend un coup. Ca peut affecter la qualite du support a terme.
          </p>

          <h2 id="opportunites" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Opportunites : le marche bouge en leur faveur
          </h2>

          <p className="mb-4">
            Le marche de la legaltech francaise croit d&rsquo;environ 15% par an. La digitalisation des cabinets n&rsquo;en est qu&rsquo;a 40% de penetration. Il y a de la place pour tout le monde.
          </p>

          <p className="mb-4">
            L&rsquo;IA generative est l&rsquo;opportunite la plus nette pour Septeo. Les editeurs qui ont deja l&rsquo;IA en production, pas en powerpoint, partent avec un train d&rsquo;avance. Septeo en fait partie.
          </p>

          <p className="mb-8">
            L&rsquo;internationalisation via stp.one est une bonne carte. Le marche DACH (Allemagne, Autriche, Suisse) est structurellement sous-equipe en legaltech moderne. Si l&rsquo;integration est bien menee, Septeo peut devenir le leader europeen inconteste.
          </p>

          <h2 id="menaces" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Menaces : ce qui pourrait les rattraper
          </h2>

          <p className="mb-4">
            La premiere menace, c&rsquo;est la consolidation elle-meme. Chaque acquisition ajoute une couche de complexite technique et humaine. Les clients stp.one vont devoir migrer. Les clients Septeo vont voir leur feuille de route perturbee. C&rsquo;est le moment ou des concurrents plus agiles peuvent grignoter des parts.
          </p>

          <p className="mb-4">
            La deuxieme, ce sont les alternatives plus legeres et moins cheres. Des editeurs comme Clio commencent a s&rsquo;implanter serieusement en Europe. Et du cote open-source, des solutions comme Docassemble ou des modules Odoo specialises juridique progressent. Pour un cabinet de moins de 15 personnes, le rapport cout/valeur de Septeo est parfois difficile a justifier face a ces alternatives.
          </p>

          <p className="mb-8">
            Enfin, la regulation IA europeenne peut etre une arme a double tranchant. Septeo est bien positionne, mais les couts de mise en conformite AI Act pourraient ralentir leur cadence d&rsquo;innovation et ouvrir une fenetre pour des acteurs moins regules.
          </p>

          <h2 id="verdict" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le verdict : Septeo est fait pour vous si...
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-title font-bold text-green-800 text-lg mb-3">Septeo est fait pour vous</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><span className="text-green-600 font-bold">+</span> Vous avez plus de 20 utilisateurs</li>
                <li><span className="text-green-600 font-bold">+</span> Vous voulez une suite integree, pas un assemblage</li>
                <li><span className="text-green-600 font-bold">+</span> L&rsquo;IA juridique est un axe strategique pour vous</li>
                <li><span className="text-green-600 font-bold">+</span> Vous acceptez un processus standardise</li>
                <li><span className="text-green-600 font-bold">+</span> Vous voulez un editeur solide financierement</li>
                <li><span className="text-green-600 font-bold">+</span> La conformite reglementaire est critique</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-title font-bold text-red-800 text-lg mb-3">Septeo n&rsquo;est pas pour vous</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><span className="text-red-600 font-bold">-</span> Vous etes un cabinet de moins de 10 personnes</li>
                <li><span className="text-red-600 font-bold">-</span> Vous avez des processus metier tres specifiques</li>
                <li><span className="text-red-600 font-bold">-</span> Vous voulez un budget mensuel maitrise sous 300€</li>
                <li><span className="text-red-600 font-bold">-</span> Vous preferez une solution open-source ou modulaire</li>
                <li><span className="text-red-600 font-bold">-</span> Vous ne voulez pas dependre du cloud</li>
                <li><span className="text-red-600 font-bold">-</span> Vous changez d&rsquo;outil tous les 2-3 ans</li>
              </ul>
            </div>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Septeo est un tres bon produit pour les structures qui ont besoin d&rsquo;une plateforme industrielle integree. C&rsquo;est un outil de croissance, pas un outil de demarrage. Si vous etes dans la deuxieme colonne, regardez les alternatives avant de signer.
          </p>

          <p className="mb-8">
            Et si vous etes dans la premiere colonne : prenez le temps de verifier vos vrais besoins avant de faire votre choix. Un editeur leader ne fait pas toujours de vous un client heureux.
          </p>

          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-8 my-12">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-6">Pour aller plus loin</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/ressources/kit-gestion-grands-comptes" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
                  <span className="text-mint-green">→</span> Kit gestion grands comptes
                </Link>
              </li>
              <li>
                <Link href="/blog/editeurs-logiciels-pourquoi-demos-ne-convertissent-pas" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
                  <span className="text-mint-green">→</span> Pourquoi les demos d&rsquo;editeurs ne convertissent pas
                </Link>
              </li>
              <li>
                <Link href="/blog/ia-closing-b2b-ce-qui-change-vraiment" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
                  <span className="text-mint-green">→</span> L&rsquo;IA au closing B2B : ce qui change vraiment
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA chute */}
          <div className="flex flex-col sm:flex-row gap-4 my-12">
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors text-center"
            >
              Faire un diagnostic offert
            </Link>
            <Link
              href="/bootcamp"
              className="inline-flex items-center justify-center px-6 py-3 border border-blue-ink text-base font-medium rounded-full text-blue-ink hover:bg-blue-ink/10 transition-colors text-center"
            >
              Decouvrir le Bootcamp
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

      {/* AuthorCard */}
      <div className="border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AuthorCard />
        </div>
      </div>

      {/* Lien retour blog */}
      <div className="pb-12 text-center">
        <Link href="/blog" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
          ← Retour au blog
        </Link>
      </div>
    </main>
  );
}
