'use client';

import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ProblemSection() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/equipe_bureau.jpg)',
        }}
      />
      
      {/* Overlay sombre pour la lisibilité */}
      <div className="absolute inset-0 bg-gray-anthracite/85 dark:bg-gray-anthracite/90" />
      
      {/* Contenu par-dessus le fond */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Titre */}
        <AnimatedSection animation="slide-up" delay={0}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-title font-bold text-white leading-tight">
              Votre équipe commerciale donne beaucoup…
              <span className="block text-orange-soft">mais obtient peu ?</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* 3 bullets illustrées */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <AnimatedSection animation="slide-up" delay={200}>
            <div className="text-center space-y-6 animate-slide-in-left group">
              <div className="w-20 h-20 bg-orange-soft/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto group-hover:bg-orange-soft/30 transition-all duration-300">
                <span className="text-4xl animate-float">💸</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-title font-bold text-white">
                  Prospection inefficace
                </h3>
                <p className="font-body text-white/90 leading-relaxed">
                  Votre force de vente passe des heures à prospecter, mais le portefeuille de nouvelles affaires peine à se remplir.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-up" delay={400}>
            <div className="text-center space-y-6 animate-slide-in-right group" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 bg-mint-green/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto group-hover:bg-mint-green/30 transition-all duration-300">
                <span className="text-4xl animate-float" style={{ animationDelay: '0.5s' }}>😰</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-title font-bold text-white">
                  Cycle de vente épuisant
                </h3>
                <p className="font-body text-white/90 leading-relaxed">
                  Les cycles de vente s&apos;éternisent, les négociations sont difficiles, et le taux de closing stagne, créant de la frustration.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-up" delay={600}>
            <div className="text-center space-y-6 animate-slide-in-right group" style={{ animationDelay: '0.4s' }}>
              <div className="w-20 h-20 bg-blue-ink/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-ink/30 transition-all duration-300">
                <span className="text-4xl animate-float" style={{ animationDelay: '1s' }}>🎯</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-title font-bold text-white">
                  Manque de prévisions fiables
                </h3>
                <p className="font-body text-white/90 leading-relaxed">
                  Sans méthodologie de vente claire, il est impossible d&apos;avoir des prévisions de vente fiables et de piloter la croissance.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Accroche finale */}
        <AnimatedSection animation="fade-in" delay={800}>
          <div className="text-center max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm border-l-4 border-mint-green rounded-r-2xl p-8 mb-8">
              <p className="text-2xl md:text-3xl font-body text-white leading-relaxed mb-4">
                Vous n&apos;avez pas un problème de{" "}
                <span className="font-bold text-orange-soft">motivation</span>.
              </p>
              <p className="text-2xl md:text-3xl font-body text-white leading-relaxed">
                Vous avez un problème de{" "}
                <span className="font-bold text-mint-green">structuration</span>.
                <span className="block mt-2 font-italic text-xl">
                  Et cela se corrige.
                </span>
              </p>
            </div>

            {/* CTA incitatif */}
            <div>
              <Button
                variant="primary"
                size="lg"
                icon="🚀"
                onClick={() => scrollToSection('contact')}
                className="px-12 py-5 text-xl"
              >
                Parlons-en maintenant !
              </Button>
              <p className="mt-4 font-italic text-white/80">
                Échange gratuit • Sans engagement • Solution sur mesure
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
} 