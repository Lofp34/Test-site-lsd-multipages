import Link from 'next/link';
import { Download, Brain } from 'lucide-react';

const guides = [
  {
    icon: <Brain className="w-8 h-8 text-mint-green" />,
    title: 'Psychologie de la décision B2B',
    description:
      'Les 7 ressorts psychologiques qui poussent un prospect à signer — ou à trouver une raison de dire non.',
    href: '/guide-psychologie-decision-b2b',
    cta: 'Télécharger le guide',
  },
  {
    icon: <Download className="w-8 h-8 text-mint-green" />,
    title: '12 questions avant d\'acheter un coaching',
    description:
      'Les questions précises pour évaluer un coach, un formateur ou un consultant avant d\'investir.',
    href: '/guide-acheteurs-b2b',
    cta: 'Télécharger le guide',
  },
];

export default function LeadMagnetResources() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-3">
            Ressources gratuites
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            Deux guides concrets pour vous aider à mieux vendre et mieux acheter en B2B.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {guides.map((guide, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 flex flex-col"
            >
              <div className="w-14 h-14 bg-mint-green/10 rounded-xl flex items-center justify-center mb-5">
                {guide.icon}
              </div>
              <h3 className="text-lg font-title font-bold text-blue-ink mb-2">
                {guide.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                {guide.description}
              </p>
              <Link
                href={guide.href}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-mint-green to-mint-green/90 text-blue-ink font-semibold text-sm px-5 py-2.5 rounded-xl hover:from-mint-green/90 hover:to-mint-green/80 transition-all w-fit"
              >
                {guide.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
