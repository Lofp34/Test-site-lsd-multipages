import Image from 'next/image';
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function AboutSection() {
  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-gray-anthracite/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Titre */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-title font-bold text-blue-ink dark:text-primary-bg leading-tight">
            Laurent Serre –
            <span className="block text-amber-600 dark:text-orange-soft">20 ans dans les bottes du commercial</span>
          </h2>
        </div>

        {/* Contenu principal */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Portrait */}
          <AnimatedSection animation="slide-left" delay={200}>
            <div className="order-1 lg:order-1">
              <div className="relative">
                {/* Photo de Laurent */}
                <div className="w-full max-w-sm sm:max-w-md mx-auto aspect-square rounded-3xl overflow-hidden border-4 border-mint-green/30 shadow-2xl">
                  <Image
                    src="/laurentserre2.png" 
                    alt="Portrait de Laurent Serre, expert en stratégie commerciale pour PME"
                    width={400}
                    height={400}
                    sizes="(max-width: 640px) 384px, 448px"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Éléments décoratifs */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-soft rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-mint-green rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </AnimatedSection>

          {/* Texte de présentation */}
          <AnimatedSection animation="slide-right" delay={400}>
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-2">
              <div className="space-y-4 sm:space-y-6">
                <p className="text-lg sm:text-xl md:text-2xl font-body text-gray-anthracite dark:text-primary-bg leading-relaxed">
                  Depuis plus de 20 ans, ma mission est de transformer la performance commerciale des PME. 
                  J&apos;interviens sur le terrain pour structurer, former et coacher votre force de vente, 
                  en créant des processus clairs et une dynamique d&apos;équipe engagée.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-body text-gray-anthracite dark:text-primary-bg leading-relaxed">
                  Mon approche est directe, sans jargon, et axée sur l&apos;action. 
                  Je ne vends pas de théories, mais un accompagnement commercial pragmatique qui produit des résultats mesurables.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-body text-gray-anthracite dark:text-primary-bg leading-relaxed">
                  Je combine une méthodologie de vente éprouvée avec les outils modernes (IA, automatisation) 
                  pour optimiser chaque étape de votre cycle de vente, de la prospection au closing.
                </p>
              </div>

              {/* Points clés de l'expertise */}
              <AnimatedSection animation="fade-in" delay={600}>
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-mint-green/20 rounded-full flex items-center justify-center">
                      <span className="text-mint-green text-sm">✓</span>
                    </div>
                    <span className="font-body text-gray-anthracite dark:text-primary-bg">Audit Commercial</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-mint-green/20 rounded-full flex items-center justify-center">
                      <span className="text-mint-green text-sm">✓</span>
                    </div>
                    <span className="font-body text-gray-anthracite dark:text-primary-bg">Coaching d&apos;Équipe</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-mint-green/20 rounded-full flex items-center justify-center">
                      <span className="text-mint-green text-sm">✓</span>
                    </div>
                    <span className="font-body text-gray-anthracite dark:text-primary-bg">Structuration des Ventes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-mint-green/20 rounded-full flex items-center justify-center">
                      <span className="text-mint-green text-sm">✓</span>
                    </div>
                    <span className="font-body text-gray-anthracite dark:text-primary-bg">Performance Mesurable</span>
                  </div>
                </div>
              </AnimatedSection>
              {/* Social links */}
              <AnimatedSection animation="fade-in" delay={800}>
                <div className="mt-8">
                  <p className="font-title font-semibold text-gray-anthracite dark:text-primary-bg text-center md:text-left">
                    Retrouvez-moi sur :
                  </p>
                  <div className="flex items-center justify-center md:justify-start space-x-6 mt-4">
                    <a href="https://www.linkedin.com/in/laurentserre34/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
                      <Image
                        src="/linkedin-logo.png"
                        alt="Logo LinkedIn - Profil de Laurent Serre"
                        width={140}
                        height={40}
                        className="object-contain"
                      />
                    </a>
                    <a href="https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
                      <Image
                        src="/youtube-logo.png"
                        alt="Logo YouTube - Chaîne de Laurent Serre"
                        width={140}
                        height={40}
                        className="object-contain"
                      />
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
} 