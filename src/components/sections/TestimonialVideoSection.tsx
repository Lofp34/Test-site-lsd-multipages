'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';

type VideoItem = {
  youtubeId: string;
  badge: string;
  title: string;
  subtitle: string;
  summary: string;
  isPrimary?: boolean;
};

const sectionCopy = {
  eyebrow: 'Ils racontent ce qui a vraiment changé',
  title: 'Des témoignages qui parlent de terrain,',
  highlightedTitlePart: 'pas de promesses.',
  intro:
    'Vous pouvez lancer chaque témoignage directement ici. Ce qui m’intéresse, ce n’est pas de montrer des vidéos de plus. C’est de vous donner accès à des retours concrets, incarnés, et directement liés au travail commercial mené sur le terrain.',
  secondaryTitle: 'Cliquez sur un témoignage pour le charger dans le player principal',
};

const videos: VideoItem[] = [
  {
    youtubeId: 'ooEf32IGpMM',
    badge: 'Résultats clients',
    title: 'Des résultats qui se voient dans les chiffres',
    subtitle: 'Une sélection courte de retours clients, dont Dimitri de Cruz / Mon Coach Brico, pour voir ce qui change quand la dynamique commerciale tient mieux.',
    summary:
      'Une compilation centrée sur les résultats, avec des retours clients chiffrés et l’extrait Dimitri de Cruz / Mon Coach Brico sur le +15% observé dans la dynamique créée.',
    isPrimary: true,
  },
  {
    youtubeId: '0kWjp_4g2Pk',
    badge: 'Rendez-vous décisif',
    title: 'Pierre Vincent — transformer un rendez-vous prématuré en engagement concret',
    subtitle: 'Préparer les enjeux de l’entreprise et de l’interlocuteur pour sécuriser une vraie avancée.',
    summary:
      'Pierre Vincent raconte comment un rendez-vous qu’il jugeait trop tôt s’est transformé en lettre d’engagement grâce à une préparation beaucoup plus stratégique des enjeux et de la discussion.',
  },
  {
    youtubeId: 'ojopxkWzXy8',
    badge: 'Transformation équipe',
    title: 'Transformer une équipe commerciale plus vite que prévu',
    subtitle: 'Un témoignage sur le switch mental, le plan de vente et une accélération bien au-delà des objectifs initiaux.',
    summary:
      'Ce retour explique comment une équipe en pleine transformation a basculé plus vite vers une nouvelle dynamique commerciale, jusqu’à dépasser largement les objectifs de ventes de la première année.',
  },
  {
    youtubeId: 'kkU2jPspfVk',
    badge: 'Méthode commerciale',
    title: 'Mieux structurer ses entretiens pour gagner en confiance et en chiffre',
    subtitle: 'Un témoignage sur la méthode, la préparation des rendez-vous et une progression de 39 % du chiffre d’affaires.',
    summary:
      'Cette vidéo montre l’impact d’un accompagnement suivi dans le temps : meilleure organisation, plan de vente plus clair, entretiens mieux préparés et progression commerciale mesurable.',
  },
  {
    youtubeId: 'LpYgrI2TPlw',
    badge: 'Dirigeant PME',
    title: 'Charles — gagner en efficacité sans sacrifier la qualité',
    subtitle: 'Reprendre un pôle, structurer le développement commercial et faire progresser le chiffre d’affaires de 35 %.',
    summary:
      'Charles explique comment un accompagnement précis et adapté à son contexte métier a permis d’améliorer la prospection, de signer plus régulièrement et de faire croître le chiffre d’affaires de 35 %.',
  },
  {
    youtubeId: 'ffegHBVorPo',
    badge: 'Progression rapide',
    title: 'Sacha — passer de technicien à commercial plus vite et plus sereinement',
    subtitle: 'Une structure claire pour les entretiens, plus de confiance en rendez-vous et +40 % de chiffre d’affaires en un mois.',
    summary:
      'Sacha raconte comment une méthode commerciale concrète lui a donné des repères immédiats pour ses rendez-vous, jusqu’à gagner en aisance et faire bondir ses résultats.',
  },
  {
    youtubeId: 'uNisunsWkn4',
    badge: 'Performance commerciale',
    title: 'Elisa — booster ses compétences commerciales et faire +50 %',
    subtitle: 'Un témoignage court et net sur la structuration du plan de vente et l’impact sur la performance.',
    summary:
      'Elisa explique comment le parcours de perfectionnement a renforcé ses compétences commerciales, structuré le plan de vente de l’équipe et permis une hausse de 50 % de son chiffre sur le semestre.',
  },
];

function thumbnailUrl(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

export default function TestimonialVideoSection() {
  const defaultVideo = videos.find((video) => video.isPrimary) ?? videos[0];
  const [activeVideoId, setActiveVideoId] = useState(defaultVideo.youtubeId);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const activeVideo = useMemo(
    () => videos.find((video) => video.youtubeId === activeVideoId) ?? defaultVideo,
    [activeVideoId, defaultVideo],
  );

  const secondaryVideos = videos.filter((video) => video.youtubeId !== activeVideo.youtubeId);

  return (
    <section id="cas-clients" className="relative overflow-hidden bg-[#07111B] py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,189,164,0.12),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,122,89,0.14),_transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <AnimatedSection animation="slide-up" delay={0}>
          <div className="mx-auto mb-14 max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2 backdrop-blur-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-mint-green" />
              <span className="font-title text-sm font-semibold uppercase tracking-wide text-white/85">
                {sectionCopy.eyebrow}
              </span>
            </div>

            <h2 className="text-4xl font-title font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              {sectionCopy.title}
              <span className="mt-2 block text-mint-green">{sectionCopy.highlightedTitlePart}</span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/78 md:text-xl">
              {sectionCopy.intro}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="slide-up" delay={120}>
          <div className="mb-10 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-md lg:p-8">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-2xl">
              <div className="relative aspect-video">
                {playingVideoId === activeVideo.youtubeId ? (
                  <iframe
                    key={activeVideo.youtubeId}
                    src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?rel=0&modestbranding=1&autoplay=1`}
                    title={activeVideo.title}
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlayingVideoId(activeVideo.youtubeId)}
                    className="group relative block h-full w-full overflow-hidden text-left"
                    aria-label={`Lire la vidéo : ${activeVideo.title}`}
                  >
                    <Image
                      src={thumbnailUrl(activeVideo.youtubeId)}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 1200px"
                      quality={70}
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/15 shadow-2xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                        <svg width="28" height="32" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-x-0.5">
                          <path d="M1 1.5L14 9L1 16.5V1.5Z" fill="white" />
                        </svg>
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                      <p className="mb-2 font-title text-sm font-semibold uppercase tracking-[0.24em] text-mint-green">
                        Vidéo chargée au clic
                      </p>
                      <p className="max-w-2xl text-xl font-title font-bold text-white md:text-2xl">
                        {activeVideo.title}
                      </p>
                    </div>
                  </button>
                )}
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <p className="mb-4 font-title text-sm font-semibold uppercase tracking-[0.24em] text-orange-soft">
                  {activeVideo.badge}
                </p>
                <h3 className="text-3xl font-title font-bold leading-tight text-white md:text-4xl">
                  {activeVideo.title}
                </h3>
                <p className="mt-4 max-w-3xl text-base font-semibold leading-relaxed text-white/90 md:text-lg">
                  {activeVideo.subtitle}
                </p>
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/76 md:text-lg">
                  {activeVideo.summary}
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
                <p className="text-sm leading-relaxed text-white/72">
                  Lancez le témoignage qui vous parle le plus et regardez-le directement ici. Chaque vignette charge la vidéo correspondante dans le player principal, sans quitter la page.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/diagnostic" className="block">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Demander un diagnostic
                </Button>
              </Link>
              <Link href="/bootcamp" className="block">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-mint-green text-mint-green hover:bg-mint-green hover:text-blue-ink sm:w-auto"
                >
                  Découvrir le Bootcamp
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-in" delay={240}>
          <div className="mb-8">
            <p className="mb-3 font-title text-sm font-semibold uppercase tracking-[0.22em] text-white/60">
              Autres témoignages vidéo
            </p>
            <h3 className="text-2xl font-title font-bold text-white md:text-3xl">
              {sectionCopy.secondaryTitle}
            </h3>
          </div>
        </AnimatedSection>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {secondaryVideos.map((video, index) => {
            const isActive = activeVideo.youtubeId === video.youtubeId;

            return (
              <AnimatedSection key={video.youtubeId} animation="slide-up" delay={320 + index * 80}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveVideoId(video.youtubeId);
                    setPlayingVideoId(null);
                  }}
                  className={`group block w-full overflow-hidden rounded-[1.4rem] border text-left shadow-[0_20px_60px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 ${
                    isActive
                      ? 'border-mint-green bg-white/[0.09] ring-1 ring-mint-green/40'
                      : 'border-white/10 bg-white/[0.05] hover:border-white/20 hover:bg-white/[0.07]'
                  }`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={thumbnailUrl(video.youtubeId)}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      quality={80}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
                      {isActive ? 'En lecture' : video.badge}
                    </div>
                    <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                      <svg width="14" height="16" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-x-[1px]">
                        <path d="M1 1.5L14 9L1 16.5V1.5Z" fill="white" />
                      </svg>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h4 className="font-title text-lg font-bold text-white">{video.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-white/80">{video.subtitle}</p>
                    </div>
                  </div>
                </button>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
