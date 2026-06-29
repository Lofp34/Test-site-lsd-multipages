import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/experience-client-post-vente-ambassadeur-pme';
const heroImage = '/images/blog/experience-client-post-vente-ambassadeur-pme/hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/experience-client-post-vente-ambassadeur-pme/hero.webp';

export const metadata: Metadata = {
  title: 'Experience client post-vente : transformer vos clients en ambassadeurs',
  description: '5 actions concretes pour transformer un client satisfait en ambassadeur dans les 90 jours apres signature. Le programme ambassadeur adapte aux PME.',
  keywords: ['experience client post-vente B2B', 'ambassadeur client PME', 'customer success PME', 'fidelisation client B2B', 'recommendation client', 'post-vente B2B'],
  alternates: { canonical: articleUrl },
  other: { dateModified: '2026-06-29' },
  openGraph: {
    title: 'Experience client post-vente : transformer vos clients en ambassadeurs',
    description: '5 actions concretes dans les 90 jours pour transformer un client satisfait en ambassadeur. Programme adapte aux PME.',
    url: articleUrl, type: 'article', locale: 'fr_FR',
    images: [{ url: heroImageAbsolute, width: 1200, height: 630, alt: 'Experience client post-vente : ambassadeur PME' }],
    siteName: 'Laurent Serre',
  },
  twitter: { card: 'summary_large_image', title: 'Experience client post-vente : ambassadeur', description: '5 actions pour transformer vos clients en ambassadeurs.', images: [heroImageAbsolute] },
};

const carouselPrefix = '/images/blog/experience-client-post-vente-ambassadeur-pme';
const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Cover — Experience client post-vente', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-paradoxe.webp`, alt: 'Le paradoxe : investir en prospection, negliger la retention', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-action1.webp`, alt: 'Action 1 : le debrief J+30', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-action2.webp`, alt: 'Action 2 : la revue de valeur trimestrielle', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-action3.webp`, alt: 'Action 3 : le cas client ecrit avec lui', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-actions45.webp`, alt: 'Actions 4 et 5 : recommandation guidee, reseau ambassadeurs', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-programme.webp`, alt: 'Le programme ambassadeur en PME', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-lecon.webp`, alt: 'Lecon : le client attend qu on lui demande', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-cta.webp`, alt: 'CTA — Diagnostic offert', index: 8 },
];

const faqItems = [
  { question: 'Pourquoi la post-vente est-elle un canal d\'acquisition ?', answer: 'Parce qu\'un client satisfait a un taux de conversion bien superieur a un prospect froid. Ses recommandations sont credible parce qu\'elles sont vecues. Une recommendation client vaut 5 fois plus qu\'un appel de prospection en termes de taux de conversion et de cycle de vente.' },
  { question: 'Quelles sont les 5 actions des 90 jours post-signature ?', answer: '1. Le debrief J+30 : appel dedie trente jours apres la signature. 2. La revue de valeur trimestrielle : le client dit ce que la solution lui apporte. 3. Le cas client ecrit avec lui : l\'histoire avec ses mots. 4. La recommandation guidee : donner au client les mots pour parler de vous. 5. Le reseau d\'ambassadeurs : inviter les clients a temoigner pour vos prospects.' },
  { question: 'Comment creer un programme ambassadeur en PME ?', answer: 'Identifiez 5 clients references, proposez-leur un appel trimestriel dedie, un tarif preferentiel, un acces anticipe aux nouveautes, et demandez-leur un temoignage par an. La cle : ne pas demander trop. Un ambassadeur n\'est pas un commercial. C\'est un client fier qui partage son experience, pas un VRP.' },
  { question: 'Quand demander un temoignage client ?', answer: 'Au moment ou la valeur percue est maximale : generalement 3 a 6 mois apres la signature, quand le client a vu les premiers resultats. Pas avant, il n\'a pas assez de recul. Pas trop tard, l\'enthousiasme retombe. Le J+90 est le bon moment pour la premiere demande.' },
  { question: 'Comment faire accepter un temoignage sans pressure ?', answer: 'Proposez-le comme un service : vous l\'aidez a valoriser son propre travail aupres de son reseau. Ecrivez le premier jet avec lui, validez chaque mot, laissez-lui le controle total. Si le temoignage est authentique et respectueux, le client sera fier de le partager.' },
  { question: 'Quelle est la difference entre satisfaction et fidelite client ?', answer: 'Un client satisfait ne repart pas. Un client fidele recommande, defend, renouvelle et augmente. La satisfaction est un prealable. La fidelite se construit dans les 90 jours post-signature avec un suivi structure. Sans ce suivi, un client satisfait peut devenir un client silencieux puis un ex-client.' },
];

export default function PostVenteAmbassadeurPage() {
  const jsonLd = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'BlogPosting', headline: 'Experience client post-vente : ambassadeur', description: '5 actions pour transformer vos clients en ambassadeurs dans les 90 jours apres la signature.', image: heroImageAbsolute, datePublished: '2026-06-29', dateModified: '2026-06-29', author: { '@type': 'Person', name: 'Laurent Serre' }, publisher: { '@type': 'Organization', name: 'Laurent Serre' }, mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl }, articleSection: 'Customer Success / Retention' },
      { '@type': 'FAQPage', '@id': `${articleUrl}#faq`, mainEntity: faqItems.map(i => ({ '@type': 'Question', name: i.question, acceptedAnswer: { '@type': 'Answer', text: i.answer } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.laurentserre.com' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.laurentserre.com/blog' }, { '@type': 'ListItem', position: 3, name: 'Experience client post-vente', item: articleUrl }] },
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
              <li className="text-blue-ink font-medium">Experience client post-vente</li>
            </ol>
          </nav>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Customer Success / Retention</span>
            </div>
            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">Experience client post-vente : transformer vos clients en ambassadeurs</h1>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>&bull;</span>
              <time dateTime="2026-06-29">29 juin 2026</time>
              <span>&bull;</span>
              <span>6 min de lecture</span>
            </div>
          </div>
          <div className="relative mb-12">
            <Image src={heroImage} alt="Experience client post-vente" width={1200} height={630} className="w-full h-80 object-cover rounded-2xl shadow-lg" quality={78} priority />
          </div>
        </div>
      </section>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <div className="mb-8"><AuthorCard /></div>
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">Ce qu'il faut retenir</p>
            <p className="text-gray-700 leading-relaxed">Vos clients satisfaits sont votre meilleur canal d'acquisition. 5 actions concretes dans les 90 jours post-signature pour les transformer en ambassadeurs : debrief J+30, revue de valeur trimestrielle, cas client ecrit avec lui, recommandation guidee, reseau d'ambassadeurs.</p>
          </div>
          <div className="mb-8 text-center">
            <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20">Vos clients recommandent-ils votre entreprise ? Diagnostic offert</Link>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">Carrousel BD : Les 5 actions post-vente</p>
            <p className="text-sm text-amber-700 mb-5">L'histoire d'un dirigeant qui depensait 50 000 euros par an en prospection sans jamais demander a ses meilleurs clients de recommander.</p>
            <BDCarousel images={carouselImages} title="Carrousel BD : Ambassadeur client" maxPreview={2} />
            <div className="mt-4 text-center">
              <Link href="/downloads/carrousel-ambassadeur.pdf" className="inline-flex items-center gap-2 text-amber-700 text-xs underline underline-offset-2 hover:text-amber-900">Telecharger le PDF (9 planches)</Link>
            </div>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Pourquoi la post-vente est votre meilleur canal d'acquisition</h2>
          <p className="mb-8">Je vois des dirigeants investir des sommes importantes en prospection, publicite, salons. Et en meme temps, laisser leurs meilleurs clients sans aucune sollicitation. Le client signe, on l'oublie. Jusqu'au renouvellement. Ou jusqu'a ce qu'il parte.</p>
          <p className="mb-8">La question que je pose systematiquement : « Combien depensez-vous par an pour acquerir un nouveau client ? » La reponse est souvent entre 5 000 et 15 000 euros. « Et combien investissez-vous pour qu'un client satisfait parle de vous a ses confreres ? » Le silence est la reponse la plus frequente.</p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Les 5 actions des 90 premiers jours</h2>
          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">1. Le debrief J+30</h3>
          <p className="mb-8">Trente jours apres la signature, un appel dedie. Pas pour vendre. Pour ecouter. « Qu'est-ce qui s'est bien passe depuis l'installation ? Qu'est-ce qui a ete plus dur que prevu ? » Ce debrief est le moment ou le client se sent ecoute. Et ou vous detectez les premiers signaux faibles.</p>
          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">2. La revue de valeur trimestrielle</h3>
          <p className="mb-8">Un rendez-vous ou le client dit ce que la solution lui apporte vraiment. Pas ce que vous voulez entendre. C'est le moment de mesurer la valeur percue. Si elle baisse, vous le savez avant qu'il ne parte.</p>
          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">3. Le cas client ecrit avec lui</h3>
          <p className="mb-8">Proposez a votre client de co-ecrire son temoignage. Pas un cas marketing ecrit par votre equipe. L'histoire avec ses mots, ses chiffres, son contexte. Le client est fier de le partager. Vous avez un contenu credible.</p>
          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">4. La recommandation guidee</h3>
          <p className="mb-8">Donnez a vos clients les mots pour parler de vous. Un modele de mail, un argumentaire simple. Beaucoup de clients seraient prets a recommander mais ne savent pas comment s'y prendre.</p>
          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">5. Le reseau d'ambassadeurs</h3>
          <p className="mb-8">Invitez vos clients les plus satisfaits a temoigner pour vos prospects. Pas une corvee. Un evenement, un apres-midi, un appel dedie. Les clients qui participent en retirent de la fierte et renforcent leur propre sentiment de faire partie de votre communaute.</p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Le programme ambassadeur modele PME</h2>
          <p className="mb-8">Cinq clients references. Un appel trimestriel dedie avec le dirigeant. Un tarif preferentiel ou un acces anticipe aux nouveautes. Un temoignage par an. C'est tout ce qu'il faut pour creer un reseau d'ambassadeurs en PME.</p>
          <p className="mb-8">Dans les PME que j'accompagne, je vois que les clients acceptent volontiers de participer. Pas pour l'avantage tarifaire. Pour la reconnaissance. On leur demande leur avis, on les traite en partenaires, on valorise leur expertise.</p>

          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">Approfondir la retention client</p>
            <p className="text-sm text-teal-700 mb-4">Le Bootcamp Methodes de vente integre un module retention : programme ambassadeur, revue trimestrielle, plan de recommandation.</p>
            <Link href="/bootcamp" className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700">Decouvrir le Bootcamp Methodes de vente</Link>
          </div>

          <div className="bg-gradient-to-br from-blue-ink to-blue-700 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vos clients sont-ils prets a vous recommander ?</h3>
            <p className="text-blue-100 mb-6">Le diagnostic commercial identifie si votre post-vente est un levier de croissance ou un angle mort.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="inline-flex items-center justify-center gap-2 bg-mint-green text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-mint-green/90">Demander un diagnostic offert</Link>
              <Link href="/bootcamp" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/20">Decouvrir le Bootcamp</Link>
            </div>
          </div>

          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-xl p-6 my-12">
            <h3 className="text-xl font-title font-bold text-blue-ink mb-4">Pour aller plus loin</h3>
            <ul className="space-y-3 text-gray-700">
              <li><Link href="/blog/retention-client-b2b-pme" className="text-mint-green hover:underline">→ Retention client B2B en PME : 5 leviers</Link></li>
              <li><Link href="/blog/signaux-faibles-churn-b2b-pme" className="text-mint-green hover:underline">→ Signaux faibles churn B2B : les 7 alertes</Link></li>
              <li><Link href="/blog/prochain-million-portefeuille-clients-expansion" className="text-mint-green hover:underline">→ Trouver votre prochain million dans votre portefeuille existant</Link></li>
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
