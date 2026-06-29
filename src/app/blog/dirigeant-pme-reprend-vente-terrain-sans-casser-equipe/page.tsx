import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/dirigeant-pme-reprend-vente-terrain-sans-casser-equipe';
const heroImage = '/images/blog/dirigeant-pme-reprend-vente-terrain-sans-casser-equipe/hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/dirigeant-pme-reprend-vente-terrain-sans-casser-equipe/hero.webp';

export const metadata: Metadata = {
  title: 'Le dirigeant PME qui reprend la vente en main sans casser son equipe',
  description:
    '3 moments ou le dirigeant DOIT intervenir sur un deal, 3 moments ou il ne le doit SURTOUT pas, et la methode pour le faire sans demotiver son equipe commerciale.',
  keywords: [
    'dirigeant PME vente terrain',
    'reprendre rendez-vous commercial',
    'intervention dirigeant deal important',
    'manager commercial terrain',
    'vente dirigeant PME',
    'accompagnement commercial dirigeant',
  ],
  alternates: { canonical: articleUrl },
  other: { dateModified: '2026-06-29' },
  openGraph: {
    title: 'Le dirigeant PME qui reprend la vente en main sans casser son equipe',
    description: '3 moments ou le dirigeant DOIT intervenir, 3 moments ou non, et comment le faire sans demotiver.',
    url: articleUrl, type: 'article', locale: 'fr_FR',
    images: [{ url: heroImageAbsolute, width: 1200, height: 630, alt: 'Le dirigeant reprend la vete sans casser son equipe' }],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le dirigeant PME qui reprend la vente en main sans casser son equipe',
    description: '3 moments ou le dirigeant DOIT intervenir, 3 moments ou non.',
    images: [heroImageAbsolute],
  },
};

const carouselPrefix = '/images/blog/dirigeant-pme-reprend-vente-terrain-sans-casser-equipe';
const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Cover — Le dirigeant reprend la vente', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-moment1.webp`, alt: 'Moment 1 : quand le client exige le dirigeant', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-moment2.webp`, alt: 'Moment 2 : le commercial s est trompe de cible', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-moment3.webp`, alt: 'Moment 3 : en phase de closing, deal complexe', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-nepas.webp`, alt: 'Les 3 moments a ne pas intervenir', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-sanscasser.webp`, alt: 'Comment intervenir sans demotiver', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-lecon.webp`, alt: 'Lecon : ne pas remplacer, appuyer', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-cta.webp`, alt: 'CTA — Diagnostic offert', index: 7 },
];

const faqItems = [
  { question: 'Quand un dirigeant de PME doit-il intervenir sur un deal ?', answer: 'Dans trois situations : quand le client exige de parler au dirigeant, quand le commercial est sur une cible strategique mais s\'est trompe d\'angle ou de personne, et en phase de closing sur un deal complexe qui merite l\'autorite du dirigeant pour trancher.' },
  { question: 'Quand ne surtout pas intervenir ?', answer: 'Au premier rendez-vous (le commercial doit etablir sa propre relation), en phase de qualification (le dirigeant court-circuite le diagnostic terrain), et apres avoir delegue sans brief clair (le commercial ne sait pas ce que le dirigeant va dire ou promettre).' },
  { question: 'Comment intervenir sans demotiver son commercial ?', answer: 'Trois regles : (1) le briefer avant pour qu\'il sache ce que vous allez dire, (2) valoriser son travail devant le client en le citant comme le referent, (3) redesceder immediatement apres le rendez-vous en lui rendant la main.' },
  { question: 'Quels sont les signes qu\'un dirigeant intervient trop souvent ?', answer: 'Le commercial ne prend plus d\'initiative, il attend votre validation pour chaque geste. Les clients l\'appellent directement vous. Les rendez-vous sans vous sont reportes. L\'equipe perd confiance en elle.' },
  { question: 'Comment preparer une intervention dirigeant sur un deal strategique ?', answer: 'Avant : brief de 10 minutes avec le commercial sur l\'historique, les enjeux, les objections. Pendant : le commercial mene, le dirigeant appuie. Apres : debrief de 5 minutes pour passer les prochaines etapes et rendre la main au commercial.' },
  { question: 'Quelle est la difference entre intervention et remplacement ?', answer: 'L\'intervention est ponctuelle et cadre : le dirigeant apporte son poids sur un moment cle, puis redesced. Le remplacement est structurel : le dirigeant prend la main et ne la rend pas, le commercial devient un assistant. L\'intervention renforce l\'equipe, le remplacement la detruit.' },
];

export default function DirigeantVentePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'BlogPosting', headline: 'Le dirigeant PME qui reprend la vente en main sans casser son equipe', description: '3 moments ou le dirigeant DOIT intervenir, 3 ou non, et comment le faire sans demotiver.', image: heroImageAbsolute, datePublished: '2026-06-29', dateModified: '2026-06-29', author: { '@type': 'Person', name: 'Laurent Serre', url: 'https://www.laurentserre.com/a-propos' }, publisher: { '@type': 'Organization', name: 'Laurent Serre', url: 'https://www.laurentserre.com' }, mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl }, articleSection: 'Management / Dirigeant' },
      { '@type': 'FAQPage', '@id': `${articleUrl}#faq`, mainEntity: faqItems.map(i => ({ '@type': 'Question', name: i.question, acceptedAnswer: { '@type': 'Answer', text: i.answer } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.laurentserre.com' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.laurentserre.com/blog' }, { '@type': 'ListItem', position: 3, name: 'Dirigeant reprend la vente', item: articleUrl }] },
    ],
  };

  return (
    <main className="bg-primary-bg text-gray-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-mint-green transition-colors">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-mint-green transition-colors">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-blue-ink font-medium" aria-current="page">Le dirigeant reprend la vente</li>
            </ol>
          </nav>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Management / Dirigeant</span>
            </div>
            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">Le dirigeant PME qui reprend la vente en main sans casser son equipe</h1>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>&bull;</span>
              <time dateTime="2026-06-29">29 juin 2026</time>
              <span>&bull;</span>
              <span>7 min de lecture</span>
            </div>
          </div>
          <div className="relative mb-12">
            <Image src={heroImage} alt="Le dirigeant reprend la vente" width={1200} height={630} className="w-full h-80 object-cover object-center rounded-2xl shadow-lg" quality={78} priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw" />
          </div>
        </div>
      </section>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <div className="mb-8"><AuthorCard /></div>
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">Ce qu'il faut retenir</p>
            <p className="text-gray-700 leading-relaxed">3 moments ou le dirigeant DOIT intervenir sur un deal : client exigeant, cible strategique mal adressee, closing complexe. 3 moments ou il ne le doit SURTOUT pas : premier rdv, qualification, apres delegation sans brief. La methode pour intervenir sans casser la motivation de son equipe.</p>
          </div>
          <div className="mb-8 text-center">
            <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors">Vous intervenez au bon moment sur les deals ? Diagnostic offert</Link>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">Carrousel BD : Les 3 moments oui, les 3 moments non</p>
            <p className="text-sm text-amber-700 mb-5">L'histoire d'un dirigeant qui reprendait tous les rendez-vous de ses commerciaux, jusqu'a ce qu'il decouvre pourquoi son equipe ne prenait plus aucune initiative.</p>
            <BDCarousel images={carouselImages} title="Carrousel BD : Le dirigeant reprend la vente" maxPreview={2} />
            <div className="mt-4 text-center">
              <Link href="/downloads/carrousel-dirigeant-vente.pdf" className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2">Telecharger le PDF (8 planches)</Link>
            </div>
          </div>
          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Les 3 moments ou vous DEVEZ intervenir</h2>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">1. Quand le client exige le dirigeant</h3>
          <p className="mb-8">Certains clients, notamment les decideurs de PME, veulent parler au patron. Pas par ego. Parce qu'ils veulent une garantie que l'engagement pris par le commercial sera tenu au plus haut niveau. Si vous restez en retrait, vous envoyez un signal de desinteret. Le bon geste : venir au rendez-vous avec le commercial, le presenter comme votre referent, et valider les engagements ensemble.</p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">2. Quand le commercial s'est trompe de cible</h3>
          <p className="mb-8">Un bon commercial peut passer trois mois sur un deal qui n'aboutira jamais parce qu'il n'a pas acces au vrai decideur, ou qu'il defend une mauvaise proposition de valeur pour ce client. Le dirigeant, avec sa vision plus large, peut le voir en une heure de debrief. Dans ce cas, intervenir n'est pas un contournement. C'est un gain de temps pour tout le monde.</p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">3. En phase de closing sur un deal complexe</h3>
          <p className="mb-8">Quand le deal est strategique, que les enjeux sont eleves et que le client hesite, la presence du dirigeant peut faire la difference. Pas pour conclure a la place du commercial. Pour apporter la vision, la garantie, la perspective long terme que seul le dirigeant peut incarner. Le commercial garde la main sur le terrain.</p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Les 3 moments ou vous ne devez SURTOUT pas intervenir</h2>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">1. Au premier rendez-vous</h3>
          <p className="mb-8">Le premier rendez-vous est le moment ou le commercial etablit sa relation propre avec le prospect. Si le dirigeant est la, le commercial devient un accompagnateur. Le client comprend que le commercial n'est pas autonome. Vous venez de casser son autorite pour les 10 prochains rendez-vous.</p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">2. En phase de qualification</h3>
          <p className="mb-8">C'est le moment ou le commercial decouvre le besoin, le budget, le processus de decision. Si le dirigeant intervient, le client pense que la decision peut etre prise sans passer par le commercial. Resultat : il saute les etapes de qualification et appelle directement le patron la prochaine fois.</p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">3. Apres avoir delegue sans brief</h3>
          <p className="mb-8">Si vous avez confie un dossier a un commercial sans lui donner de cadre, et que vous intervenez parce que 'ca n'avance pas', vous etes le probleme. Pas lui. Le commercial ne sait pas ce que vous attendiez. Votre intervention est percue comme une sanction injuste.</p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Comment intervenir sans demotiver</h2>
          <p className="mb-8">La methode que j'utilise avec les dirigeants que j'accompagne tient en trois regles :</p>
          <div className="bg-slate-50 rounded-lg p-6 my-6 border border-slate-200">
            <p className="mb-3"><strong>1. Briefez avant.</strong> Expliquez au commercial ce que vous allez dire et ce que vous attendez de lui pendant le rendez-vous. Il doit savoir quel role vous jouez : appui, caution, ou conclusion.</p>
            <p className="mb-3"><strong>2. Valorisez le commercial pendant le rendez-vous.</strong> Citez-le comme le referent du dossier. « C'est [commercial] qui suit ce dossier, il connait votre situation mieux que moi. Je suis la pour appuyer sa recommandation. »</p>
            <p className="text-slate-700"><strong>3. Redescedez immediatement apres.</strong> Une fois le rendez-vous termine, repassez la main. Le prochain point se fait sans vous. Si le client vous rappelle, renvoyez-le vers le commercial.</p>
          </div>
          <p className="mb-8">Je vois des dirigeants qui hesitent a intervenir de peur de casser la motivation de leur equipe. Et d'autres qui interviennent tout le temps sans se rendre compte qu'ils detruisent l'autonomie de leurs commerciaux. L'equilibre est simple : intervenir au bon moment, avec les bonnes regles, rend l'equipe plus forte.</p>

          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">Approfondir le management commercial</p>
            <p className="text-sm text-teal-700 mb-4">Le Bootcamp Methodes de vente integre un module management commercial : quand intervenir, comment deleguer, comment developper l'autonomie de votre equipe.</p>
            <Link href="/bootcamp" className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors">Decouvrir le Bootcamp Methodes de vente</Link>
          </div>

          <div className="bg-gradient-to-br from-blue-ink to-blue-700 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous intervenez trop ou pas assez sur les deals ?</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">Le diagnostic commercial identifie si votre mode d'intervention sur les deals renforce ou affaiblit votre equipe. 5 minutes pour le savoir.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="inline-flex items-center justify-center gap-2 bg-mint-green text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-mint-green/90 transition-colors">Demander un diagnostic offert</Link>
              <Link href="/bootcamp" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/20 transition-colors">Decouvrir le Bootcamp</Link>
            </div>
          </div>

          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-xl p-6 my-12">
            <h3 className="text-xl font-title font-bold text-blue-ink mb-4">Pour aller plus loin</h3>
            <ul className="space-y-3 text-gray-700">
              <li><Link href="/blog/blocages-dirigeant-performance-commerciale" className="text-mint-green hover:underline">→ Les vrais blocages du dirigeant face a la performance commerciale</Link></li>
              <li><Link href="/blog/performance-commerciale-pme-5-leviers-dirigeant" className="text-mint-green hover:underline">→ Performance commerciale PME : les 5 leviers du dirigeant</Link></li>
              <li><Link href="/blog/pourquoi-un-manager-commercial-reprend-trop-souvent-les-rendez-vous-a-la-place-de-lequipe" className="text-mint-green hover:underline">→ Pourquoi le manager reprend trop souvent les rendez-vous</Link></li>
            </ul>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-8" id="faq">Questions frequentes</h2>
            <div className="space-y-8">{faqItems.map((item, index) => (<div key={index}><h3 className="text-lg font-title font-semibold text-blue-ink mb-3">{item.question}</h3><p className="text-gray-700 leading-relaxed">{item.answer}</p></div>))}</div>
          </div>
          <div className="mt-16"><HubSpotForm /></div>
          <div className="mt-8 text-center"><Link href="/blog" className="text-mint-green hover:underline text-sm">← Retour au blog</Link></div>
        </div>
      </article>
    </main>
  );
}
