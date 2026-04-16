'use client';

import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";

const testimonials = [
  {
    name: "Alexis Alvarez",
    role: "CEO Queoval",
    photo: "/images/Alexis Alvarez.jpeg",
    quote: "Le parcours avec Laurent nous a permis une progression de plus de 50% des objectifs réalisés sur le dernier semestre par rapport au semestre de l'année dernière.",
    metric: "+50%",
    metricLabel: "d'objectifs réalisés",
  },
  {
    name: "Alexandre",
    role: "Responsable commercial Toiture et COMPAGNIE",
    photo: "/images/Alexandre.jpeg",
    quote: "Laurent nous a donné l'amour du commerce et surtout au niveau des chiffres, on a explosé avec 40% d'augmentation.",
    metric: "+40%",
    metricLabel: "de croissance",
  },
  {
    name: "Elisa Gorbatoff",
    role: "Responsable commerciale Evolvia",
    photo: "/images/Elisa Gorbatoff.jpeg",
    quote: "L'accompagnement de Laurent nous a permis de finir l'année de manière incroyable avec une hausse de 90% de notre chiffre d'affaires !",
    metric: "+90%",
    metricLabel: "de chiffre d'affaires",
  },
  {
    name: "Charles Mancini",
    role: "Directeur commercial",
    photo: "/images/Charles Manicini.jpeg",
    quote: "La méthode rigoureuse et efficace nous a permis d'avoir des signatures plus récurrentes, des prospects plus à l'écoute, et surtout, 35% de progression du C.A.",
    metric: "+35%",
    metricLabel: "de progression CA",
  },
  {
    name: "Chloé Galmes",
    role: "Dirigeante Freedom Boat Club",
    photo: "/images/chloé galmes.jpeg",
    quote: "Grâce à l'accompagnement de Laurent nous avons doublé notre nombre d'adhérents, au-delà de nos objectifs !",
    metric: "x2",
    metricLabel: "d'adhérents",
  },
];

export default function BootcampTestimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection animation="slide-up" delay={0}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 border border-mint-green/30 px-6 py-3 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Résultats vérifiables
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-title font-bold text-blue-ink leading-tight mb-4">
              Ils ont fait le Bootcamp,
              <span className="block text-mint-green">voici leurs résultats</span>
            </h2>
            <p className="text-xl font-body text-gray-anthracite/80 max-w-3xl mx-auto">
              Des dirigeants et responsables commerciaux qui ont transformé leur performance grâce au Bootcamp.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} animation="slide-up" delay={100 + i * 100}>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 h-full flex flex-col">
                {/* Metric highlight */}
                <div className="text-center mb-4 pb-4 border-b border-mint-green/20">
                  <div className="text-3xl font-title font-bold text-mint-green">{t.metric}</div>
                  <div className="text-sm text-gray-anthracite/70">{t.metricLabel}</div>
                </div>

                {/* Quote */}
                <blockquote className="text-gray-anthracite font-body leading-relaxed mb-6 flex-grow italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-mint-green flex-shrink-0">
                    <Image
                      src={t.photo}
                      alt={`${t.name}, ${t.role}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="48px"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="font-title font-bold text-blue-ink text-sm">{t.name}</div>
                    <div className="text-xs text-gray-anthracite/70">{t.role}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
