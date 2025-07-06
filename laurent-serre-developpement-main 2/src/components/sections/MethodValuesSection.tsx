'use client';

import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function MethodValuesSection() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const values = [
    {
      title: "Responsabilité",
      description: "Je valorise les personnes qui prennent leur part. Qu'il s'agisse d'un dirigeant, d'un commercial ou de moi-même, chacun est responsable de la qualité de la relation et de la performance commerciale.",
      icon: "🤝",
      color: "mint-green"
    },
    {
      title: "Clarté",
      description: "Je cherche à rendre simple ce qui est complexe. Pas de jargon inutile, pas de process ésotérique. Juste des outils qui marchent, et une pédagogie directe.",
      icon: "💎",
      color: "blue-ink"
    },
    {
      title: "Engagement",
      description: "Je suis à fond dans ce que je fais. Et j'attends la même chose de mes clients. Je préfère former moins de gens, mais aller au bout avec eux.",
      icon: "🔥",
      color: "orange-soft"
    },
    {
      title: "Croissance",
      description: "Personnelle, professionnelle, économique. Ce que je propose doit faire grandir ceux qui y participent, sans bullshit.",
      icon: "📈",
      color: "mint-green"
    },
    {
      title: "Sincérité",
      description: "Je dis ce que je pense, même quand c'est inconfortable. Je préfère un \"non\" franc qu'un \"oui\" tiède.",
      icon: "💭",
      color: "blue-ink"
    }
  ];

  return (
    <section className="py-20 bg-primary-bg dark:bg-blue-ink">
      <div className="max-w-6xl mx-auto px-6">
        {/* Titre */}
        <AnimatedSection animation="slide-up" delay={0}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-title font-bold text-blue-ink dark:text-primary-bg leading-tight">
              Mission, Vision &
              <span className="block text-mint-green">Valeurs</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* Mission & Vision - Grandes cartes */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <AnimatedSection animation="slide-left" delay={200}>
            <div className="bg-white/90 dark:bg-gray-anthracite/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-mint-green/10 rounded-2xl flex items-center justify-center">
                  <span className="text-4xl">🧭</span>
                </div>
                <div>
                  <h3 className="text-3xl font-title font-bold text-mint-green mb-2">
                    MISSION
                  </h3>
                  <div className="w-16 h-1 bg-mint-green rounded-full"></div>
                </div>
              </div>
              <p className="text-lg font-body text-gray-anthracite dark:text-primary-bg leading-relaxed">
                Ma mission est d&apos;améliorer la performance commerciale des PME en aidant leurs dirigeants et leurs équipes de vente à vendre mieux, 
                plus humainement et plus efficacement, en combinant 20 ans de terrain avec la puissance des outils modernes (IA, automatisation, structuration). 
                Je transforme leur chaos commercial en clarté d&apos;action et en résultats concrets.
              </p>
            </div>
          </AnimatedSection>

          {/* Vision */}
          <AnimatedSection animation="slide-right" delay={400}>
            <div className="bg-white/90 dark:bg-gray-anthracite/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-ink/10 rounded-2xl flex items-center justify-center">
                  <span className="text-4xl">🔭</span>
                </div>
                <div>
                  <h3 className="text-3xl font-title font-bold text-blue-ink dark:text-mint-green mb-2">
                    VISION
                  </h3>
                  <div className="w-16 h-1 bg-blue-ink dark:bg-mint-green rounded-full"></div>
                </div>
              </div>
              <p className="text-lg font-body text-gray-anthracite dark:text-primary-bg leading-relaxed">
                Je veux réhabiliter le métier de commercial comme un métier noble, stratégique et profondément humain. 
                Dans un monde saturé d&apos;automatisation et de bullshit, je veux prouver qu&apos;une approche rigoureuse, intelligente et sincère peut générer de la croissance durable. 
                Mon objectif : créer la référence de l&apos;accompagnement commercial hybride, qui allie exigence, simplicité et outils augmentés.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Valeurs - 3 cartes centrées */}
        <div className="flex justify-center mb-8">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full">
            {values.slice(0, 3).map((value, index) => (
              <AnimatedSection key={index} animation="slide-up" delay={600 + index * 100}>
                <div className="bg-white/90 dark:bg-gray-anthracite/40 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 bg-${value.color}/10 rounded-xl flex items-center justify-center group-hover:bg-${value.color}/20 transition-colors`}>
                      <span className="text-2xl">{value.icon}</span>
                    </div>
                    <div>
                      <h4 className={`text-xl font-title font-bold text-${value.color}`}>
                        {value.title}
                      </h4>
                      <div className={`w-8 h-1 bg-${value.color} rounded-full mt-1`}></div>
                    </div>
                  </div>
                  <p className="text-sm font-body text-gray-anthracite dark:text-primary-bg/90 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Valeurs - 2 cartes centrées en dessous */}
        <div className="flex justify-center mb-16">
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl w-full">
            {values.slice(3, 5).map((value, index) => (
              <AnimatedSection key={index + 3} animation="slide-up" delay={900 + index * 100}>
                <div className="bg-white/90 dark:bg-gray-anthracite/40 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 bg-${value.color}/10 rounded-xl flex items-center justify-center group-hover:bg-${value.color}/20 transition-colors`}>
                      <span className="text-2xl">{value.icon}</span>
                    </div>
                    <div>
                      <h4 className={`text-xl font-title font-bold text-${value.color}`}>
                        {value.title}
                      </h4>
                      <div className={`w-8 h-1 bg-${value.color} rounded-full mt-1`}></div>
                    </div>
                  </div>
                  <p className="text-sm font-body text-gray-anthracite dark:text-primary-bg/90 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Section philosophie */}
        <AnimatedSection animation="fade-in" delay={1100}>
          <div className="text-center">
            <div className="bg-white/80 dark:bg-gray-anthracite/30 rounded-3xl p-8 shadow-xl max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
                Ma philosophie en une phrase
              </h3>
              <blockquote className="text-xl md:text-2xl font-italic text-gray-anthracite dark:text-primary-bg leading-relaxed">
                &quot;Le succès commercial ne vient pas de techniques magiques, mais de{" "}
                <span className="font-bold text-mint-green">méthodes éprouvées</span>{" "}
                appliquées avec{" "}
                <span className="font-bold text-orange-soft">constance</span>{" "}
                et{" "}
                <span className="font-bold text-blue-ink dark:text-mint-green">authenticité</span>.&quot;
              </blockquote>
              <footer className="mt-6">
                <cite className="font-title font-bold text-blue-ink dark:text-primary-bg not-italic">
                  Laurent Serre
                </cite>
              </footer>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA subtil */}
        <AnimatedSection animation="fade-in" delay={1300}>
          <div className="text-center mt-12">
            <p className="font-body text-gray-anthracite dark:text-primary-bg/80 mb-6">
              Ces valeurs guident chaque mission, chaque conseil, chaque transformation.
            </p>
            <Button 
              variant="secondary"
              icon="🎯"
              onClick={() => scrollToSection('contact')}
              className="bg-mint-green text-white border-2 border-mint-green hover:bg-mint-green/90 hover:text-white shadow-lg"
            >
              Parlons de vos défis commerciaux
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
} 