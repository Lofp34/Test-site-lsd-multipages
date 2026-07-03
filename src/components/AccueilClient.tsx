'use client';
import ProblemSection from '@/components/sections/ProblemSection';
import ResourcesPMESection from '@/components/sections/ResourcesPMESection';
import TestimonialVideoSection from '@/components/sections/TestimonialVideoSection';
import HubSpotForm from '@/components/HubSpotForm';
import Link from 'next/link';

export default function AccueilClient() {
  const articles = [
    {
      title: "5 signes qu'il est temps de structurer votre équipe commerciale",
      href: "/blog/5-signes-structurer-equipe-commerciale",
      cat: "Management"
    },
    {
      title: "Les erreurs fatales en prospection B2B",
      href: "/blog/erreurs-fatales-prospection-b2b",
      cat: "Prospection"
    },
    {
      title: "Closing B2B : 7 techniques pour signer sans brader",
      href: "/blog/closing-b2b-7-techniques",
      cat: "Closing"
    },
    {
      title: "Commission Breath : 3 mécanismes qui tuent le closing",
      href: "/blog/commission-breath-3-mecanismes-tuent-closing",
      cat: "Closing"
    },
    {
      title: "Gestion des objections : transformer le non en opportunité",
      href: "/blog/gestion-des-objections-commerciales-transformer-le-non-en-opportunite",
      cat: "Négociation"
    },
    {
      title: "LinkedIn prospection B2B : 50 messages par jour, zéro rendez-vous ?",
      href: "/blog/linkedin-prospection-b2b-50-messages-par-jour",
      cat: "Digital"
    },
    {
      title: "Vente consultative B2B : devenir le conseiller que vos clients ne veulent pas perdre",
      href: "/blog/vente-consultative-b2b-comment-devenir-le-conseiller-que-vos-clients-ne-veulent-pas-perdre",
      cat: "Vente"
    },
    {
      title: "Gap Selling : la méthode terrain qui change tout en B2B",
      href: "/blog/gap-selling-methode-b2b",
      cat: "Méthode"
    }
  ];

  return (
    <>
      <ProblemSection />
      <TestimonialVideoSection />
      <ResourcesPMESection />

      {/* Section articles blog pour maillage interne */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-ink/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-title font-bold text-blue-ink mb-4">
              Articles récents
            </h2>
            <p className="text-lg text-gray-anthracite/70 max-w-3xl mx-auto">
              Méthodes terrain, retours d'expérience et techniques commerciales
              pour dirigeants et managers commerciaux.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {articles.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="group bg-white rounded-xl p-6 shadow-sm border border-blue-ink/10 hover:shadow-lg hover:border-mint-green/30 transition-all duration-300"
              >
                <span className="inline-block text-xs font-semibold text-mint-green bg-mint-green/10 px-3 py-1 rounded-full mb-3">
                  {a.cat}
                </span>
                <h3 className="font-title font-semibold text-blue-ink text-sm leading-relaxed group-hover:text-mint-green transition-colors">
                  {a.title}
                </h3>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-mint-green font-semibold hover:underline"
            >
              Voir tous les articles →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-8 text-center">
            Prendre contact avec Laurent Serre
          </h2>
          <HubSpotForm />
        </div>
      </section>
    </>
  );
} 