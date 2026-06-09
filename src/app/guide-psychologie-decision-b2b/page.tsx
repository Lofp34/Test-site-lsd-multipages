import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import LeadMagnetForm from './LeadMagnetForm';

const pageUrl = 'https://www.laurentserre.com/guide-psychologie-decision-b2b';

export const metadata: Metadata = {
  title: 'Psychologie de décision B2B : guide gratuit des 7 ressorts qui font signer | Laurent Serre',
  description:
    'Un prospect ne compare pas des offres, il compare des risques. Téléchargez le guide complet des 7 ressorts psychologiques de la décision d\'achat B2B.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Psychologie de décision B2B — Les 7 ressorts qui poussent un prospect à signer',
    description:
      'Guide gratuit : les 7 ressorts psychologiques qui influencent toute décision d\'achat B2B. Téléchargez-le maintenant.',
    url: pageUrl,
    type: 'website',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://raw.githubusercontent.com/Lofp34/Test-site-lsd-multipages/main/public/images/guide-cover-thumb-psychologie-decision-b2b.webp',
        width: 1080,
        height: 1080,
        alt: 'Guide psychologie décision B2B - 7 ressorts',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Psychologie de décision B2B — Les 7 ressorts qui font signer',
    description:
      'Guide gratuit : les 7 ressorts psychologiques de la décision d\'achat B2B.',
    images: ['https://raw.githubusercontent.com/Lofp34/Test-site-lsd-multipages/main/public/images/guide-cover-thumb-psychologie-decision-b2b.webp'],
  },
};

export default function GuidePsychologieDecisionPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-ink via-blue-ink/95 to-blue-ink/90 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <div className="inline-block bg-mint-green/20 text-mint-green text-xs font-semibold px-4 py-2 rounded-full mb-6">
            guide gratuit &bull; 11 pages
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold leading-tight mb-6">
            Psychologie de décision B2B : les 7 ressorts qui poussent un prospect à signer
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Un acheteur B2B ne compare pas des offres. Il compare des risques. 
            Comprenez les vrais mécanismes psychologiques qui font qu&apos;un prospect dit oui — 
            ou trouve une raison de dire non.
          </p>

          {/* Cover thumb */}
          <div className="max-w-xs mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src="/images/guide-cover-thumb-psychologie-decision-b2b.webp"
              alt="Guide psychologie décision B2B - couverture"
              width={400}
              height={400}
              className="w-full"
              priority
            />
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-12">

          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-8 text-center">
            Dans ce guide de 11 pages
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {[
              { icon: '🧠', title: '7 ressorts psychologiques décodés', desc: 'Aversion au risque, biais de statu quo, preuve sociale, autorité, rareté, réciprocité, ancrage — expliqués dans le contexte B2B.' },
              { icon: '🛡️', title: 'La décision défendable', desc: 'Pourquoi un acheteur choisit rarement la meilleure option — et toujours celle qu\'il peut justifier en interne.' },
              { icon: '🗣️', title: 'Les vrais critères d\'achat', desc: 'Ce que vos prospects ne vous diront jamais en face, mais qui pèse 80% dans leur décision finale.' },
              { icon: '📋', title: 'Grille d\'analyse des objections', desc: 'Comment distinguer une vraie objection d\'un prétexte psychologique — et y répondre sans forcer.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-2xl flex-shrink-0 mt-1">{item.icon}</span>
                <div>
                  <h3 className="font-title font-bold text-blue-ink mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-mint-green/5 border border-mint-green/20 rounded-xl p-6 text-center mb-10">
            <p className="text-blue-ink font-semibold mb-2">
              Un guide conçu pour les commerciaux et dirigeants qui veulent comprendre pourquoi leurs prospects disent non.
            </p>
            <p className="text-sm text-gray-600">
              15 ans d&apos;observation terrain condensés en 11 pages. Pas de théorie universitaire — du B2B réel.
            </p>
          </div>

          {/* Formulaire */}
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-6">
              <p className="text-lg font-bold text-blue-ink">Téléchargez le guide gratuitement</p>
              <p className="text-sm text-gray-500 mt-1">Recevez le PDF par email immédiatement</p>
            </div>
            <LeadMagnetForm />
          </div>

        </div>
      </section>

      {/* Lien vers l'article */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="text-sm text-gray-500 mb-3">Vous voulez aller plus loin ?</p>
        <Link
          href="/blog/psychologie-decision-b2b-7-ressorts-guide"
          className="text-mint-green font-medium hover:underline"
        >
          Lire l&apos;article complet sur les 7 ressorts de décision B2B →
        </Link>
      </section>

      {/* À propos */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 text-center">
        <div className="w-20 h-20 bg-blue-ink/10 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
          LS
        </div>
        <h2 className="text-xl font-title font-bold text-blue-ink mb-2">Laurent Serre</h2>
        <p className="text-sm text-gray-500 mb-4">Coach commercial — 15 ans de terrain PME</p>
        <p className="text-gray-600 max-w-xl mx-auto text-sm leading-relaxed">
          J&apos;ai accompagné plus de 50 entreprises dans la structuration de leur force de vente. 
          Ce guide est le fruit de 15 ans d&apos;observation des mécanismes psychologiques qui font qu&apos;un 
          prospect B2B choisit — ou pas — de travailler avec vous.
        </p>
      </section>

      {/* Trust */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 text-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">Ils nous font confiance</p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <span className="px-4 py-2 bg-gray-50 rounded-lg">Septeo</span>
          <span className="px-4 py-2 bg-gray-50 rounded-lg">KPMG</span>
          <span className="px-4 py-2 bg-gray-50 rounded-lg">Bernafon</span>
          <span className="px-4 py-2 bg-gray-50 rounded-lg">OVEA</span>
          <span className="px-4 py-2 bg-gray-50 rounded-lg">UPVD</span>
          <span className="px-4 py-2 bg-gray-50 rounded-lg">Compagnons du Devoir</span>
        </div>
      </section>

      {/* CTA diagnostic */}
      <section className="bg-gradient-to-br from-blue-ink to-blue-ink/95 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-title font-bold mb-4">
            Vous voulez appliquer ces ressorts avec votre équipe ?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            Le guide est un bon début. Pour transformer ces connaissances en résultats concrets, 
            un diagnostic de 45 minutes vous montrera par où commencer.
          </p>
          <Link
            href="/diagnostic"
            className="inline-flex items-center justify-center gap-2 bg-mint-green text-blue-ink font-semibold px-6 py-3 rounded-xl hover:bg-mint-green/90 transition-colors"
          >
            Prendre rendez-vous →
          </Link>
        </div>
      </section>

    </main>
  );
}
