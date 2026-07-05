import Link from 'next/link';
import BDCarousel from '@/components/BDCarousel';
import AuthorCard from '@/components/AuthorCard';

const articleUrl = 'https://www.laurentserre.com/blog/psychologie-acheteur-b2b';
const heroImage = 'https://www.laurentserre.com/images/blog/psychologie-acheteur-b2b/hero.webp';
const ogImage = 'https://www.laurentserre.com/images/blog/psychologie-acheteur-b2b/hero.webp';

const carouselImages = [
  { src: '/images/blog/psychologie-acheteur-b2b/carrousel/bd-slide-01.webp', alt: 'Karim, commercial, présente son pitch parfait à Laurent', index: 1 },
  { src: '/images/blog/psychologie-acheteur-b2b/carrousel/bd-slide-02.webp', alt: 'Karim frustré : l\'acheteur a dit qu\'il allait en parler à son directeur', index: 2 },
  { src: '/images/blog/psychologie-acheteur-b2b/carrousel/bd-slide-03.webp', alt: 'Laurent explique que l\'acheteur n\'a pas refusé la solution mais le risque', index: 3 },
  { src: '/images/blog/psychologie-acheteur-b2b/carrousel/bd-slide-04.webp', alt: 'Laurent au paperboard : peur de l\'erreur, peur du changement, peur du regard', index: 4 },
  { src: '/images/blog/psychologie-acheteur-b2b/carrousel/bd-slide-05.webp', alt: 'Karim comprend que l\'acheteur a peur de se mouiller devant son CODIR', index: 5 },
  { src: '/images/blog/psychologie-acheteur-b2b/carrousel/bd-slide-06.webp', alt: 'Laurent : ton acheteur veut quelqu\'un qui lui tient la main jusqu\'à la signature', index: 6 },
  { src: '/images/blog/psychologie-acheteur-b2b/carrousel/bd-slide-07.webp', alt: 'Karim réalise qu\'il n\'a jamais demandé à un acheteur ce qui l\'inquiétait', index: 7 },
  { src: '/images/blog/psychologie-acheteur-b2b/carrousel/bd-slide-08.webp', alt: 'Karim écrit au paperboard : demander, écouter, sécuriser', index: 8 },
  { src: '/images/blog/psychologie-acheteur-b2b/carrousel/bd-slide-09.webp', alt: 'Karim : vendre c\'est aider l\'autre à dire oui sans perdre la face', index: 9 },
  { src: '/images/blog/psychologie-acheteur-b2b/carrousel/bd-slide-10.webp', alt: 'Laurent face caméra : vos commerciaux perdent les ventes sur ce qu\'ils ne voient pas', index: 10 },
];

export const metadata = {
  title: 'Psychologie de l\'acheteur B2B : ce qui se passe dans la tête de votre prospect',
  description: 'Vos commerciaux perdent des ventes qu\'ils auraient dû gagner. Pas à cause du prix. À cause de ce qu\'ils ne voient pas : la peur réelle de l\'acheteur B2B.',
  keywords: 'psychologie acheteur B2B, décision d\'achat B2B, peur de l\'acheteur, vente consultative, commercial B2B PME',
  alternates: { canonical: articleUrl },
  openGraph: {
    title: 'Psychologie de l\'acheteur B2B : ce qui se passe vraiment dans la tête de votre prospect',
    description: 'Vos commerciaux perdent des ventes qu\'ils auraient dû gagner. Pas à cause du prix. À cause de la peur de l\'acheteur.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Psychologie de l\'acheteur B2B' }],
  },
};

export default function PsychologieAcheteurB2B() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-title font-bold text-blue-ink mb-4 leading-tight">
          Psychologie de l\'acheteur B2B : ce qui se passe vraiment dans la tête de votre prospect
        </h1>
        <p className="text-lg text-gray-600 font-body">
          Vos commerciaux perdent des ventes qu\'ils auraient dû gagner. Pas à cause du prix. À cause de ce qu\'ils ne voient pas.
        </p>
      </header>

      {/* Hero */}
      <div className="mb-8">
        <img
          src={heroImage}
          alt="Un acheteur B2B face à un commercial, le non-dit derrière la décision"
          className="w-full rounded-xl shadow-lg"
        />
      </div>

      {/* BD Carrousel */}
      <div className="mt-10 mb-8">
        <p className="text-sm font-semibold text-blue-ink mb-4">
          Le carrousel BD du jour
        </p>
        <BDCarousel
          images={carouselImages}
          title="Carrousel BD : La psychologie de l'acheteur B2B"
          maxPreview={4}
        />
        <div className="mt-4 text-center">
          <Link
            href="/images/blog/psychologie-acheteur-b2b/carrousel/carrousel-psychologie-acheteur-b2b.pdf"
            className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
          >
            Télécharger le carrousel PDF (10 planches)
          </Link>
        </div>
        <p className="mt-3 text-sm text-gray-500 italic">
          Karim est commercial dans une PME. Il fait le parfait pitch. Il perd la vente. Voici pourquoi.
        </p>
      </div>

      {/* Article body */}
      <div className="prose prose-lg max-w-none">
        <p>
          Vos commerciaux connaissent toutes les méthodes. SPIN, MEDDIC, Challenger. Ils ont les scripts, les outils, le training.
        </p>
        <p>
          Et pourtant, ils perdent des ventes qu'ils auraient dû gagner.
        </p>
        <p>
          Pas parce que la méthode est mauvaise. Parce que la méthode ne dit pas l'essentiel : ce qui se passe dans la tête de l'acheteur au moment où il décide.
        </p>
        <p>
          La décision B2B n'est pas rationnelle. Pas seulement.
        </p>
        <p>
          J'ai vu un acheteur refuser une solution évidemment meilleure, plus fiable, moins chère sur la durée. Pourquoi ? Parce que le commercial de l'autre camp lui avait donné une chose que personne n'avait pensé à lui donner : un argumentaire tout prêt pour défendre son choix en interne.
        </p>
        <p>
          L'acheteur n'avait pas choisi la meilleure solution. Il avait choisi la solution la plus facile à faire valider par son CODIR.
        </p>
        <p>
          C'est ça, la psychologie de l'acheteur B2B. Ce n'est pas de la manipulation. C'est de la lucidité.
        </p>

        <h2 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">
          Ce que votre acheteur ne vous dit jamais
        </h2>
        <p>
          Derrière chaque décision d'achat, il y a quelqu'un qui se pose une question qu'il ne formulera jamais à voix haute : qu'est-ce que je risque, moi, personnellement, si je dis oui ?
        </p>
        <p>
          Si la solution marche, il brille. Si elle rate, c'est lui qui écope.
        </p>
        <p>
          Cette peur-là ne disparaît pas avec un beau ROI. Elle se dissout quand votre commercial lui donne les moyens de se couvrir : références dans le même secteur, pilote visible, accompagnement post-vente réel. Pas des promesses. Des preuves que s'il se trompe, il ne sera pas seul.
        </p>
        <p>
          J'ai vu des ventes se jouer à 80% sur la confiance en la personne et à 20% sur la solution technique. Ce n'est pas triste. C'est juste le métier.
        </p>

        <h2 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">
          Le moment où tout se joue
        </h2>
        <p>
          Le moment décisif, ce n'est pas le closing. C'est avant.
        </p>
        <p>
          C'est le moment où votre commercial sent un flottement. L'acheteur hésite, reformule, demande un détail qui semble mineur. Ce détail n'est pas mineur. C'est le signe qu'un calcul se fait dans sa tête : est-ce que je prends un risque en disant oui ?
        </p>
        <p>
          Un commercial qui rate ce signal continue de pitcher. Un commercial qui le voit s'arrête, pose une question ouverte, et laisse l'acheteur exprimer sa vraie préoccupation.
        </p>
        <p>
          La plupart des ventes perdues le sont à ce moment précis. Pas sur le prix. Sur le non-dit.
        </p>

        <h2 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">
          Ce que votre interlocuteur cherche vraiment
        </h2>
        <p>
          Pas ce qu'il dit en réunion. Ce qu'il cherche vraiment.
        </p>
        <p>
          Il veut arriver en CODIR avec un dossier béton. Il veut que son N+1 lui fasse confiance. Il veut montrer qu'il a été clairvoyant. Il veut dormir tranquille six mois après la signature, sans mauvaise surprise.
        </p>
        <p>
          Si votre commercial lui donne ça, il gagne. Pas avant.
        </p>
        <p>
          La question que vos commerciaux devraient se poser avant chaque rendez-vous n'est pas : comment vais-je présenter ma solution ? C'est : comment est-ce que je vais aider mon interlocuteur à arriver devant son boss avec un dossier imbattable ?
        </p>

        <h2 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">
          Les signaux qu'il faut savoir lire
        </h2>
        <p>
          Votre acheteur donne des signaux en temps réel. Il faut savoir les lire.
        </p>
        <p>
          Quand il commence à dire « nous » au lieu de « vous », quand il pose des questions sur les modalités pratiques, quand il prend des notes : il est engagé. Il se projette.
        </p>
        <p>
          Quand il se redresse, quand son regard change au moment où on parle prix, quand il répond de plus en plus court : il se retire. Il calcule.
        </p>
        <p>
          C'est là, à ce moment-là, que le commercial doit s'arrêter de présenter et poser une question simple : comment voyez-vous les choses de votre côté ?
        </p>
        <p>
          La réponse à cette question vaut plus que tous les slides du monde.
        </p>

        <h2 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">
          Ce que ça change pour vos commerciaux
        </h2>
        <p>
          La psychologie de l'acheteur B2B ne remplace pas les techniques de vente. Elle les rend efficaces.
        </p>
        <p>
          Un commercial qui comprend que son acheteur a peur de se tromper ne vend plus pareil. Il ne pousse. Il sécurise. Il ne pitch. Il accompagne. Il ne cherche à convaincre. Il cherche à rendre le oui facile et le non difficile.
        </p>
        <p>
          C'est ça, vendre en B2B. Pas imposer une solution. Aider quelqu'un à prendre la bonne décision sans perdre la face.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-12 mb-8 p-6 bg-mint-green/5 rounded-xl border border-mint-green/20">
        <p className="text-center text-blue-ink font-body">
          Vos commerciaux perdent des ventes sur le non-dit ?
        </p>
        <p className="text-center text-gray-600 text-sm mt-2 mb-4">
          Le diagnostic commercial identifie les signaux que votre équipe ne voit pas.
        </p>
        <div className="text-center">
          <Link
            href="/diagnostic"
            className="inline-flex items-center gap-2 bg-mint-green text-white px-6 py-3 rounded-lg font-medium hover:bg-mint-green/90 transition-colors"
          >
            Démarrer le diagnostic
          </Link>
        </div>
      </div>

      <AuthorCard />
    </article>
  );
}
