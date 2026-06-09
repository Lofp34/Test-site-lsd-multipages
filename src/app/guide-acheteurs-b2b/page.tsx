import type { Metadata } from 'next';
import Link from 'next/link';
import LeadMagnetForm from './LeadMagnetForm';

const pageUrl = 'https://www.laurentserre.com/guide-acheteurs-b2b';

export const metadata: Metadata = {
  title: 'Guide Acheteurs B2B : les questions à poser avant d\'acheter un coaching commercial | Laurent Serre',
  description:
    'Comment éviter les mauvais choix ? Ce guide vous donne les 12 questions à poser à tout coach commercial avant de signer. Téléchargement gratuit.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Guide Acheteurs B2B — Les 12 questions avant de choisir un coach commercial',
    description:
      'Évitez les mauvais investissements. 12 questions concrètes pour évaluer un coaching commercial avant de signer.',
    url: pageUrl,
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guide Acheteurs B2B — Les 12 questions à poser avant de signer',
    description:
      'Évitez les mauvais investissements coaching. 12 questions concrètes pour faire le bon choix.',
  },
};

export default function GuideAcheteursB2BPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-ink via-blue-ink/95 to-blue-ink/90 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <div className="inline-block bg-mint-green/20 text-mint-green text-xs font-semibold px-4 py-2 rounded-full mb-6">
            guide gratuit
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold leading-tight mb-6">
            Les 12 questions à poser à un coach commercial avant de signer
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Un mauvais accompagnement coûte plus cher qu&apos;aucun accompagnement. Ce guide vous donne 
            les questions précises pour évaluer un coach, un formateur ou un consultant avant d&apos;investir.
          </p>
        </div>
      </section>

      {/* Value proposition */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-12">
          
          {/* Ce que vous allez découvrir */}
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-8 text-center">
            Dans ce guide de 12 pages
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {[
              { icon: '🎯', title: 'Poser les bonnes questions', desc: 'Les 12 questions clés à poser pour évaluer la méthode, l\'expérience et les résultats d\'un coach.' },
              { icon: '🔍', title: 'Repérer les signaux d\'alerte', desc: 'Les réponses qui doivent vous faire fuir (et celles qui montrent un vrai professionnel).' },
              { icon: '📋', title: 'Comparer les propositions', desc: 'Une grille d\'évaluation pour comparer objectivement plusieurs accompagnements.' },
              { icon: '💶', title: 'Évaluer le retour sur investissement', desc: 'Comment calculer le vrai ROI d\'un coaching commercial avant de signer le chèque.' },
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
              Ce guide est conçu pour les dirigeants et DRH qui veulent un accompagnement qui tient ses promesses.
            </p>
            <p className="text-sm text-gray-600">
              Pas de théorie — uniquement des questions terrain, testées auprès de 50+ entreprises accompagnées.
            </p>
          </div>

          {/* Formulaire */}
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-6">
              <p className="text-lg font-bold text-blue-ink">Téléchargez le guide gratuitement</p>
              <p className="text-sm text-gray-500 mt-1">Recevez le PDF par email immédiatement</p>
            </div>
            <LeadMagnetForm />
            <p className="text-xs text-gray-400 text-center mt-4">
              Vos données sont traitées conformément à notre{' '}
              <Link href="/politique-de-confidentialite" className="underline hover:text-mint-green">politique de confidentialité</Link>.
              Pas de spam, désinscription à tout moment.
            </p>
          </div>

        </div>
      </section>

      {/* À propos */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="w-20 h-20 bg-blue-ink/10 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
          LS
        </div>
        <h2 className="text-xl font-title font-bold text-blue-ink mb-2">Laurent Serre</h2>
        <p className="text-sm text-gray-500 mb-4">Coach commercial — 15 ans de terrain PME</p>
        <p className="text-gray-600 max-w-xl mx-auto text-sm leading-relaxed">
          J&apos;ai accompagné plus de 50 entreprises dans la structuration de leur force de vente. 
          Ce guide est le fruit de 15 ans d&apos;observation des erreurs les plus fréquentes côté acheteur 
          comme côté vendeur. Il vous évitera de signer un accompagnement qui ne vous apportera rien.
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

      {/* CTA final */}
      <section className="bg-gradient-to-br from-blue-ink to-blue-ink/95 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-title font-bold mb-4">
            Vous préférez un diagnostic personnalisé ?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            Le guide est un bon point de départ. Mais si vous voulez savoir précisément 
            par où commencer avec votre équipe, un diagnostic de 45 minutes est plus efficace.
          </p>
          <Link
            href="/diagnostic"
            className="inline-flex items-center justify-center gap-2 bg-mint-green text-blue-ink font-semibold px-6 py-3 rounded-xl hover:bg-mint-green/90 transition-colors"
          >
            Prendre rendez-vous pour un diagnostic offert →
          </Link>
        </div>
      </section>
    </main>
  );
}
