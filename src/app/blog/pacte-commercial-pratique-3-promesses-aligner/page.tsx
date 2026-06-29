import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/pacte-commercial-pratique-3-promesses-aligner';
const heroImage = '/images/blog/pacte-commercial-pratique-3-promesses-aligner/hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/pacte-commercial-pratique-3-promesses-aligner/hero.webp';

export const metadata: Metadata = {
  title: 'Le pacte commercial en pratique : les 3 promesses a aligner en une reunion',
  description: 'La methode operationnelle pour aligner les trois promesses : ce que le dirigeant vend, ce que le commercial dit, ce que le client recoit. Un modele de reunion point de verite.',
  keywords: ['alignement commercial dirigeant', 'promesse client PME', 'coherence vente', 'alignement equipe commerciale', 'pacte commercial pratique', 'point de verite commercial'],
  alternates: { canonical: articleUrl },
  other: { dateModified: '2026-06-29' },
  openGraph: { title: 'Le pacte commercial en pratique : les 3 promesses a aligner', description: '3 promesses a aligner en une reunion. Modele point de verite pour commercial et dirigeant.', url: articleUrl, type: 'article', locale: 'fr_FR', images: [{ url: heroImageAbsolute, width: 1200, height: 630, alt: 'Pacte commercial pratique' }], siteName: 'Laurent Serre' },
  twitter: { card: 'summary_large_image', title: 'Pacte commercial en pratique', description: '3 promesses a aligner en une reunion.', images: [heroImageAbsolute] },
};

const carouselPrefix = '/images/blog/pacte-commercial-pratique-3-promesses-aligner';
const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Cover — Pacte commercial pratique', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-promesse1.webp`, alt: 'Promesse 1 : ce que le dirigeant vend', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-promesse2.webp`, alt: 'Promesse 2 : ce que le commercial dit', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-promesse3.webp`, alt: 'Promesse 3 : ce que le client comprend', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-decalage.webp`, alt: 'Le decalage : les trois colonnes different', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-methode.webp`, alt: 'Le point de verite en une reunion', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-resultat.webp`, alt: 'Resultat : deals realignes, equipe au clair', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-cta.webp`, alt: 'CTA — Point de verite offert', index: 7 },
];

const faqItems = [
  { question: 'Comment aligner les trois promesses commerciales ?', answer: 'En une reunion d\'equipe. Chaque commercial ecrit pour ses trois deals les plus importants : (1) ce que le dirigeant a promis a ce client, (2) ce qu\'il a promis lui-meme, (3) ce que le client a compris. On compare les trois colonnes. La ou le decalage est le plus grand, on ajuste avant de signer.' },
  { question: 'Qu\'est-ce que le point de verite commercial ?', answer: 'Un rituel de 20 minutes par deal ou dirigeant et commercial mettent les trois promesses sur la table. Pas de jugement, pas de coupable. Juste les faits. L\'exercice est inconfortable la premiere fois. C\'est normal. C\'est le signe que vous regardez la realite en face.' },
  { question: 'A quelle frequence faire un point de verite ?', answer: 'Pour chaque deal au-dessus d\'un seuil defini (10K, 20K ou 50K selon votre marche). Pas de revue generale. Deal par deal. Avant d\'envoyer la proposition, au moment ou le commercial est sur le point de s\'engager, faire le point de verite avec le dirigeant.' },
  { question: 'Comment gerer un decalage entre les promesses ?', answer: 'Trois options : (1) le dirigeant ajuste son offre pour correspondre a la promesse du commercial, (2) le commercial rappelle le client pour recadrer la promesse, (3) le deal est abandonne parce que la promesse ne peut pas etre tenue. La decision est plus rapide et moins couteuse qu\'une perte de client apres signature.' },
  { question: 'Le point de verite s\'applique-t-il aux equipes de 10 commerciaux ?', answer: 'Encore plus. Plus l\'equipe est grande, plus les promesses divergent. Le point de verite devient un rituel d\'equipe : chaque commercial presente ses trois promesses, l\'equipe et le dirigeant aident a reperer les decalages. L\'exercice cree une culture de transparence qui renforce la coherence globale.' },
  { question: 'Quel est le premier signe que les promesses sont desalignees ?', answer: 'Le commercial repete en reunion ce que le client a dit. Mais le dirigeant decouvre que son offre ne correspond pas. C\'est le premier declic. Le point de verite systematise ce declic pour chaque deal, au lieu d\'attendre qu\'un client parte pour s\'en rendre compte.' },
];

export default function PactePratiquePage() {
  const jsonLd = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'BlogPosting', headline: 'Le pacte commercial en pratique : les 3 promesses a aligner', description: '3 promesses a aligner en une reunion. Modele point de verite.', image: heroImageAbsolute, datePublished: '2026-06-29', dateModified: '2026-06-29', author: { '@type': 'Person', name: 'Laurent Serre' }, publisher: { '@type': 'Organization', name: 'Laurent Serre' }, mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl }, articleSection: 'Vente B2B / Methode' },
      { '@type': 'FAQPage', '@id': `${articleUrl}#faq`, mainEntity: faqItems.map(i => ({ '@type': 'Question', name: i.question, acceptedAnswer: { '@type': 'Answer', text: i.answer } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.laurentserre.com' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.laurentserre.com/blog' }, { '@type': 'ListItem', position: 3, name: 'Pacte commercial pratique', item: articleUrl }] },
    ],
  };

  return (
    <main className="bg-primary-bg text-gray-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-mint-green">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-mint-green">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-blue-ink font-medium">Pacte commercial en pratique</li>
            </ol>
          </nav>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Vente B2B / Methode</span>
            </div>
            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">Le pacte commercial en pratique : les 3 promesses a aligner en une reunion</h1>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
              <span>Laurent Serre</span>
              <span>&bull;</span>
              <time dateTime="2026-06-29">29 juin 2026</time>
              <span>&bull;</span>
              <span>5 min de lecture</span>
            </div>
          </div>
        </div>
      </section>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <div className="mb-8"><AuthorCard /></div>
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">Ce qu'il faut retenir</p>
            <p className="text-gray-700">La methode operationnelle du pacte commercial. Chaque commercial ecrit les trois promesses pour ses deals : ce que le dirigeant vend, ce qu'il promet, ce que le client comprend. On compare. On ajuste. En vingt minutes par deal.</p>
          </div>
          <div className="mb-8 text-center">
            <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20">Faire un point de verite offert</Link>
          </div>

          {/* BD Carrousel */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : Le pacte commercial en pratique
            </p>
            <p className="text-sm text-amber-700 mb-5">
              La methode du point de verite en BD. Trois promesses, une reunion, vingt minutes par deal. Le rituel qui change tout.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Le pacte commercial en pratique"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-pacte-commercial-pratique.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Telecharger le PDF (8 planches)
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Promesse 1 : Ce que le dirigeant vend</h2>
          <p className="mb-8">Prenez une feuille. Ecrivez l'offre de votre entreprise en une phrase. Pas la phrase marketing. La phrase vraie. Celle que vous diriez a un client autour d'un cafe. « Nous livrons des solutions fiables sous 48 heures. » C'est votre promesse. Celle que vous avez construite avec votre equipe, votre histoire, vos contraintes.</p>
          <p className="mb-8">Maintenant, demandez a votre commercial d'ecrire la meme chose. Souvent, les deux phrases ne correspondent pas. Pas parce que le commercial ment. Parce qu'il n'a jamais entendu la promesse exacte formulatee ainsi.</p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Promesse 2 : Ce que le commercial dit</h2>
          <p className="mb-8">Prenez trois deals en cours. Pour chacun, demandez a votre commercial : « Qu'as-tu promis exactement a ce client ? » Pas ce que l'offre contient. Ce que le commercial a dit, avec ses mots, dans le feu de l'echange. « Je vous livre en 24 heures. » C'est different de « Nous livrons en 48 heures. »</p>
          <p className="mb-8">Le commercial a promis plus court parce qu'il voulait gagner le deal. Pas par malhonnetete. Par reflexe de survie. Mais cette promesse supplementaire est une bombe a retardement si l'entreprise ne peut pas la tenir.</p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Promesse 3 : Ce que le client recoit</h2>
          <p className="mb-8">C'est la promesse la plus importante et la plus souvent ignoree. Appelez le client. Demandez-lui : « Qu'avez-vous compris de notre offre ? Qu'attendez-vous exactement de nous ? »</p>
          <p className="mb-8">La reponse est souvent une surprise. Le dirigeant promet de la fiabilite, le commercial promet de la rapidite, et le client comprend... de la securite. Trois promesses differentes pour le meme deal. Et personne ne s'en rend compte avant que le client ne dise « ce n'est pas ce que j'avais compris ».</p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Le point de verite : realigner en une reunion</h2>
          <p className="mb-8">La methode est simple. Elle prend 20 minutes par deal. Elle se fait en reunion d'equipe, une fois par semaine, sur les deals les plus importants.</p>
          <div className="bg-slate-50 rounded-lg p-6 my-6 border border-slate-200">
            <p className="mb-3"><strong>Etape 1 : Ecrire les trois promesses.</strong> Le commercial ecrit sur une feuille : ce que le dirigeant promet, ce qu'il a promis, ce que le client a compris.</p>
            <p className="mb-3"><strong>Etape 2 : Comparer.</strong> Le dirigeant lit les trois phrases. La ou le decalage est le plus grand, on pose la question : « Est-ce qu'on peut tenir cette promesse ? »</p>
            <p className="mb-3"><strong>Etape 3 : Decider.</strong> Trois options : ajuster l'offre, recadrer le client, ou abandonner le deal. Chaque option est plus rapide et moins couteuse qu'une perte de client apres signature.</p>
            <p><strong>Etape 4 : Verifier.</strong> Avant d'envoyer la proposition, un appel au client pour valider que la promesse est comprise. Pas d'ambiguite.</p>
          </div>
          <p className="mb-8">Ce rituel, je le mets en place avec les equipes que j'accompagne. La premiere fois, c'est toujours le choc. La deuxieme fois, l'equipe commence a anticiper les decalages. La troisieme fois, les commerciaux ajustent leurs promesses avant le point de verite.</p>

          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">Aller plus loin sur le pacte commercial</p>
            <p className="text-sm text-teal-700 mb-4">Le Bootcamp Methodes de vente integre le module pacte commercial : modele de point de verite, grille d'alignement, protocole d'equipe.</p>
            <Link href="/bootcamp" className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700">Decouvrir le Bootcamp Methodes de vente</Link>
          </div>

          <div className="bg-gradient-to-br from-blue-ink to-blue-700 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vos promesses tiennent-elles la route ?</h3>
            <p className="text-blue-100 mb-6">Testez votre pacte commercial avec un diagnostic offert. 5 minutes.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="inline-flex items-center justify-center gap-2 bg-mint-green text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-mint-green/90">Demander un diagnostic offert</Link>
              <Link href="/bootcamp" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/20">Decouvrir le Bootcamp</Link>
            </div>
          </div>

          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-xl p-6 my-12">
            <h3 className="text-xl font-title font-bold text-blue-ink mb-4">Pour aller plus loin</h3>
            <ul className="space-y-3 text-gray-700">
              <li><Link href="/blog/pacte-commercial-aligner-dirigeant-commercial-client-pme" className="text-mint-green hover:underline">→ Le pacte commercial : aligner dirigeant, commercial et client</Link></li>
              <li><Link href="/blog/strategie-commerciale-pme-cadre-une-page" className="text-mint-green hover:underline">→ Strategie commerciale PME : cadre en une page</Link></li>
              <li><Link href="/blog/blocages-dirigeant-performance-commerciale" className="text-mint-green hover:underline">→ Les vrais blocages du dirigeant face a la performance commerciale</Link></li>
            </ul>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-8" id="faq">Questions frequentes</h2>
            <div className="space-y-8">{faqItems.map((item, idx) => (<div key={idx}><h3 className="text-lg font-title font-semibold text-blue-ink mb-3">{item.question}</h3><p className="text-gray-700">{item.answer}</p></div>))}</div>
          </div>
          <div className="mt-16"><HubSpotForm /></div>
          <div className="mt-8 text-center"><Link href="/blog" className="text-mint-green hover:underline text-sm">← Retour au blog</Link></div>
        </div>
      </article>
    </main>
  );
}
