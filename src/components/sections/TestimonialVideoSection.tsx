'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';

type VideoItem = {
  youtubeId: string;
  title: string;
  description: string;
  eyebrow?: string;
};

const videos: VideoItem[] = [
  {
    youtubeId: 'ooEf32IGpMM',
    title: 'Des résultats qui se voient dans les chiffres',
    description:
      'Une compilation centrée sur les résultats pour voir, en quelques minutes, ce que disent les clients quand la dynamique commerciale change vraiment.',
    eyebrow: 'Témoignage principal',
  },
  {
    youtubeId: '0kWjp_4g2Pk',
    title: 'Témoignage client',
    description: 'Un retour d’expérience client à lancer directement dans le player principal.',
  },
  {
    youtubeId: 'ojopxkWzXy8',
    title: 'Retour d’expérience',
    description: 'Un témoignage vidéo supplémentaire, accessible sans quitter la page.',
  },
  {
    youtubeId: 'kkU2jPspfVk',
    title: 'Transformation commerciale',
    description: 'Une autre preuve terrain à afficher dans le player principal.',
  },
  {
    youtubeId: 'LpYgrI2TPlw',
    title: 'Progression des résultats',
    description: 'Un témoignage complémentaire pour montrer la continuité des résultats.',
  },
  {
    youtubeId: 'ffegHBVorPo',
    title: 'Accompagnement terrain',
    description: 'Une séquence terrain supplémentaire consultable dans le même lecteur.',
  },
  {
    youtubeId: 'uNisunsWkn4',
    title: 'Résultats obtenus',
    description: 'Un dernier témoignage vidéo pour compléter la preuve sociale.',
  },
];

function thumbnailUrl(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

function youtubeUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export default function TestimonialVideoSection() {
  const [activeVideoId, setActiveVideoId] = useState(videos[0].youtubeId);

  const activeVideo = useMemo(
    () => videos.find((video) => video.youtubeId === activeVideoId) ?? videos[0],
    [activeVideoId],
  );

  const secondaryVideos = videos.slice(1);

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
                Ils parlent des résultats obtenus
              </span>
            </div>

            <h2 className="text-4xl font-title font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              La preuve par les clients.
              <span className="mt-2 block text-mint-green">Pas par les promesses.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/78 md:text-xl">
              Quand l’organisation commerciale tient mieux, les résultats se voient. Voici ce que racontent les clients, chiffres à l’appui.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="slide-up" delay={120}>
          <div className="mb-10 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-md lg:p-8">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-2xl">
              <div className="aspect-video">
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
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <p className="mb-4 font-title text-sm font-semibold uppercase tracking-[0.24em] text-orange-soft">
                  {activeVideo.eyebrow ?? 'Témoignage vidéo'}
                </p>
                <h3 className="text-3xl font-title font-bold leading-tight text-white md:text-4xl">
                  {activeVideo.title}
                </h3>
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/76 md:text-lg">
                  {activeVideo.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="font-title text-2xl font-bold text-mint-green">6</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/72">autres témoignages disponibles en un clic sous la vidéo principale</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="font-title text-2xl font-bold text-orange-soft">1 player</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/72">une seule zone de lecture, plus propre, plus premium, plus lisible</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="font-title text-2xl font-bold text-white">YouTube</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/72">les vidéos restent faciles à enrichir à mesure que de nouveaux témoignages arrivent</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href={youtubeUrl(activeVideo.youtubeId)} target="_blank" rel="noreferrer" className="block">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Voir sur YouTube
                </Button>
              </Link>
              <Link href="/diagnostic" className="block">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-mint-green text-mint-green hover:bg-mint-green hover:text-blue-ink sm:w-auto"
                >
                  Demander un diagnostic
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
              Cliquer sur un rectangle pour le lancer dans le player principal
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
                  onClick={() => setActiveVideoId(video.youtubeId)}
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
                      {isActive ? 'En lecture' : 'Témoignage'}
                    </div>
                    <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                      <svg width="14" height="16" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-x-[1px]">
                        <path d="M1 1.5L14 9L1 16.5V1.5Z" fill="white" />
                      </svg>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h4 className="font-title text-lg font-bold text-white">{video.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-white/75">Lire ce témoignage dans la vidéo principale</p>
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
