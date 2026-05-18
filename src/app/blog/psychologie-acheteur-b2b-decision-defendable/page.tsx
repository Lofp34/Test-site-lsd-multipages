import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';

export const metadata: Metadata = {
  title: 'Psychologie acheteur B2B : vendre une décision défendable | Laurent Serre',
  description:
    'Un acheteur B2B ne compare pas seulement des offres. Il compare des risques. Voici comment l\'aider à porter sa décision en interne.',
  keywords:
    'psychologie acheteur B2B, décision d\'achat B2B, vente B2B, acheteur professionnel, vente complexe, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/psychologie-acheteur-b2b-decision-defendable',
  },
  other: {
    'dateModified': '2026-05-18',
  },
  openGraph: {
    title: 'Votre prospect ne compare pas seulement des offres. Il cherche une décision qu\'il pourra défendre.',
    description:
      'Un acheteur B2B n\'achète presque jamais seul dans sa tête. Le travail du commercial, c\'est d\'aider le client à clarifier sa propre décision.',
    url: 'https://www.laurentserre.com/blog/psychologie-acheteur-b2b-decision-defendable',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-05-18-psychologie-acheteur-b2b-hero.png',
        width: 1536,
        height: 1024,
        alt: 'Laurent Serre - Psychologie acheteur B2B',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Votre prospect ne compare pas seulement des offres. Il cherche une décision qu\'il pourra défendre.',
    description:
      'Un acheteur B2B n\'achète presque jamais seul dans sa tête. Il doit pouvoir défendre son choix en interne.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-18-psychologie-acheteur-b2b-hero.png'],
  },
};

export default function PsychologieAcheteurB2BPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-8">
        <p className="text-sm text-gray-500 mb-2">18 mai 2026 · 4 min</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Votre prospect ne compare pas seulement des offres. Il cherche une décision qu&apos;il pourra défendre.
        </h1>
        <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden">
          <Image
            src="/images/blog/2026-05-18-psychologie-acheteur-b2b-hero.png"
            alt="Psychologie acheteur B2B - Décision défendable"
            fill
            className="object-cover"
            priority
          />
        </div>
      </header>

      <div className="prose prose-lg prose-gray max-w-none">
        <p>
          Dans beaucoup de ventes B2B, le commercial croit que le client compare deux solutions.
        </p>
        <p>
          En réalité, il compare surtout deux risques.
        </p>
        <p>
          Le risque de changer.<br />
          Le risque de ne rien faire.<br />
          Le risque de se tromper devant son patron.<br />
          Le risque d&apos;embarquer son équipe dans un choix qu&apos;elle ne suivra pas.<br />
          Le risque de payer trop cher pour un résultat trop flou.
        </p>
        <p>
          C&apos;est là que beaucoup de ventes se jouent.<br />
          Pas dans la dernière ligne du devis.<br />
          Pas dans la remise.<br />
          Pas dans la slide qui explique encore une fois pourquoi la solution est meilleure.
        </p>
        <p>
          Je vois souvent des commerciaux très préparés sur leur offre, mais beaucoup moins sur la situation intérieure du client. Ils savent expliquer ce qu&apos;ils vendent. Ils savent répondre aux objections. Ils savent défendre leur prix.
        </p>
        <p>
          Mais ils n&apos;ont pas assez regardé ce que l&apos;acheteur doit défendre, lui, une fois que le commercial a quitté la salle.
        </p>
        <p>
          Parce qu&apos;un acheteur B2B n&apos;achète presque jamais seul dans sa tête.
        </p>
        <p>
          Même quand il est décideur, il pense déjà aux questions qui vont arriver :
        </p>
        <blockquote>
          <p>
            « Pourquoi eux ? »<br />
            « Pourquoi maintenant ? »<br />
            « Qu&apos;est-ce qu&apos;on risque si ça ne marche pas ? »<br />
            « Qu&apos;est-ce que ça va changer pour les équipes ? »<br />
            « Est-ce qu&apos;on va vraiment s&apos;en servir ? »
          </p>
        </blockquote>
        <p>
          Si le commercial répond seulement avec des arguments, il laisse son interlocuteur seul avec le plus difficile : porter la décision en interne.
        </p>
        <p>
          Et c&apos;est souvent là que la vente ralentit.
        </p>
        <p>
          Le client dit qu&apos;il doit réfléchir. Il dit qu&apos;il doit en parler. Il dit qu&apos;il revient vers vous après le prochain comité. Parfois c&apos;est vrai. Mais parfois, ce qu&apos;il veut dire, c&apos;est : « Je ne suis pas encore assez armé pour défendre ce choix. »
        </p>
        <p>
          La psychologie de l&apos;acheteur B2B, ce n&apos;est pas manipuler ses émotions. C&apos;est comprendre que derrière une décision apparemment rationnelle, il y a toujours une personne qui cherche à ne pas se mettre en danger.
        </p>
        <p>
          Elle veut faire avancer son entreprise, bien sûr.<br />
          Mais elle veut aussi rester crédible.<br />
          Elle veut éviter le mauvais choix.<br />
          Elle veut pouvoir expliquer clairement pourquoi cette décision tient debout.
        </p>
        <p>
          Le travail du commercial, à ce moment-là, n&apos;est pas d&apos;ajouter trois arguments.
        </p>
        <p>
          C&apos;est d&apos;aider le client à clarifier sa propre décision.
        </p>
        <p>
          Qu&apos;est-ce qui coince vraiment ?<br />
          Qui devra être rassuré ?<br />
          Quelle peur n&apos;est pas encore dite ?<br />
          Quelle conséquence de l&apos;inaction est sous-estimée ?<br />
          Qu&apos;est-ce que le client devra raconter à son équipe lundi matin ?
        </p>
        <p>
          Quand ces questions ne sont pas traitées, la vente peut avoir l&apos;air avancée alors qu&apos;elle est fragile. Le client est intéressé, mais pas prêt. Le besoin existe, mais la décision n&apos;est pas encore défendable.
        </p>
        <p>
          Un bon entretien commercial ne sert donc pas seulement à convaincre.
        </p>
        <p>
          Il sert à faire émerger ce que le client devra assumer après l&apos;entretien.
        </p>
        <p>
          Et plus cette partie est claire, moins la vente dépend d&apos;un dernier effort de persuasion.
        </p>
      </div>

      {/* CTA Diagnostic */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Vous sentez que vos commerciaux préparent bien leurs offres, mais moins bien la décision intérieure du client ?
        </h2>
        <p className="text-gray-700 mb-4">
          Un diagnostic commercial permet de voir où se situent les vrais freins dans votre cycle de vente, au-delà des arguments produit.
        </p>
        <HubSpotForm />
      </div>

      {/* Author */}
      <div className="mt-8">
        <AuthorCard />
      </div>

      {/* Navigation */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
          ← Retour au blog
        </Link>
      </div>
    </article>
  );
}
