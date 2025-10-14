'use client';

import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ResultsSection() {
  const stats = [
    { icon: '😊', value: '97%', label: 'Taux de satisfaction du programme' },
    { icon: '👥', value: '27', label: "Nombre d'apprenants du programme" },
    { icon: '✅', value: '100%', label: 'Taux de réussite du programme' },
    { icon: '🚫', value: '0%', label: "Taux d'abandon" },
  ];

  return (
    <section id="resultats" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection animation="slide-up" delay={0}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-title font-bold text-blue-ink leading-tight">
              Résultats du programme
            </h2>
            <p className="mt-3 text-primary-secondary font-body">
              Des indicateurs concrets et vérifiables
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} animation="fade-in" delay={100 + i * 100}>
              <div className="bg-gradient-to-br from-mint-green/5 to-blue-ink/5 border border-mint-green/20 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-4xl md:text-5xl font-title text-blue-ink">{s.value}</div>
                <p className="mt-2 text-sm font-body text-primary-secondary">{s.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

