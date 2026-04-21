'use client';

import Button from "@/components/ui/Button";
import TrackedLink from "@/components/ui/TrackedLink";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useSectionTracking } from "@/hooks/useSectionTracking";

const problems = [
  {
    number: '01',
    title: 'Prospection qui fatigue plus qu’elle ne donne de résultats',
    description:
      'Vos commerciaux s’activent, mais le pipe ne se remplit pas au bon niveau. Beaucoup d’effort, trop peu d’affaires vraiment qualifiées.',
    accent: 'orange',
  },
  {
    number: '02',
    title: 'Cycle de vente long, usant, mal maîtrisé',
    description:
      'Les affaires traînent, les négociations s’étirent, l’énergie se disperse. L’équipe donne beaucoup, mais le rythme commercial s’érode.',
    accent: 'mint',
  },
  {
    number: '03',
    title: 'Vision fragile, management peu efficace',
    description:
      'Sans cadre clair, vous pilotez plus au ressenti qu’avec une vraie lecture. Et quand la vision commerciale se fragilise, la croissance devient instable.',
    accent: 'blue',
  },
];

const accentClasses = {
  orange: {
    badge: 'text-orange-soft border-orange-soft/40 bg-orange-soft/10',
    line: 'from-orange-soft/70 to-orange-soft/10',
    glow: 'group-hover:shadow-orange-soft/20',
  },
  mint: {
    badge: 'text-mint-green border-mint-green/40 bg-mint-green/10',
    line: 'from-mint-green/70 to-mint-green/10',
    glow: 'group-hover:shadow-mint-green/20',
  },
  blue: {
    badge: 'text-white border-white/30 bg-white/10',
    line: 'from-white/70 to-white/10',
    glow: 'group-hover:shadow-white/10',
  },
};

export default function ProblemSection() {
  const sectionRef = useSectionTracking({
    sectionName: 'problem-section',
    trackTimeSpent: true,
  });

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/equipe_bureau.jpg)',
        }}
      />

      <div className="absolute inset-0 bg-gray-anthracite/90" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-ink/30 via-transparent to-blue-ink/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <AnimatedSection animation="slide-up" delay={0}>
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2 mb-6 backdrop-blur-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-soft" />
              <span className="text-sm font-title font-semibold tracking-wide text-white/85 uppercase">
                Là où beaucoup d’équipes commerciales s’usent
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-title font-bold text-white leading-tight">
              Votre organisation commerciale
              <span className="block text-orange-soft mt-2">est-elle à la hauteur ?</span>
            </h2>

            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              Le problème n’est pas toujours l’énergie, ni même la bonne volonté. Très souvent, c’est l’organisation commerciale qui laisse l’effort se perdre.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {problems.map((problem, index) => {
            const accents = accentClasses[problem.accent as keyof typeof accentClasses];

            return (
              <AnimatedSection key={problem.number} animation="slide-up" delay={150 + index * 120}>
                <div className={`group h-full rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-8 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 ${accents.glow}`}>
                  <div className="flex items-center justify-between gap-4 mb-8">
                    <div className={`inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-title font-bold tracking-[0.2em] ${accents.badge}`}>
                      {problem.number}
                    </div>
                    <div className={`h-px flex-1 bg-gradient-to-r ${accents.line}`} />
                  </div>

                  <div className="space-y-5">
                    <h3 className="text-2xl font-title font-bold text-white leading-snug max-w-xs">
                      {problem.title}
                    </h3>
                    <p className="text-base md:text-lg text-white leading-relaxed max-w-sm">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection animation="fade-in" delay={650}>
          <div className="max-w-5xl mx-auto rounded-[2rem] border border-white/10 bg-white/[0.07] backdrop-blur-md px-8 py-10 md:px-10 md:py-12 shadow-2xl">
            <div className="grid lg:grid-cols-[1.2fr_auto] gap-8 items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-mint-green font-title font-semibold mb-4">
                  Le vrai sujet
                </p>
                <p className="text-2xl md:text-3xl font-body text-white leading-relaxed">
                  Vous n’avez pas un problème de motivation de votre équipe.
                  <span className="block mt-2 font-semibold text-white">Vous avez un problème d’organisation commerciale.</span>
                </p>
                <p className="mt-4 text-white/78 text-base md:text-lg leading-relaxed max-w-3xl">
                  Et tant que ce cadre n’est pas renforcé, l’équipe continue à donner, sans transformer cet effort en dynamique commerciale solide et prévisible.
                </p>
              </div>

              <div className="cta-group-mobile w-full lg:w-auto">
                <div className="cta-container-mobile sm:flex-row sm:max-w-none sm:gap-4 lg:flex-col lg:min-w-[300px]">
                  <TrackedLink
                    href="/bootcamp"
                    ctaId="problem-bootcamp"
                    ctaText="Découvrir le Bootcamp Commercial"
                    ctaType="primary"
                    section="problem"
                    position={1}
                    className="block"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      className="cta-mobile cta-primary-mobile sm:w-auto lg:w-full"
                    >
                      Découvrir le Bootcamp Commercial
                    </Button>
                  </TrackedLink>
                  <TrackedLink
                    href="/diagnostic"
                    ctaId="problem-diagnostic"
                    ctaText="Faire le Diagnostic Gratuit"
                    ctaType="secondary"
                    section="problem"
                    position={2}
                    className="block"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="cta-mobile cta-secondary-mobile sm:w-auto lg:w-full border-mint-green text-mint-green hover:bg-mint-green hover:text-blue-ink"
                    >
                      Faire le Diagnostic Gratuit
                    </Button>
                  </TrackedLink>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
