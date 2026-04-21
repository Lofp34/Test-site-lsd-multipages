'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';

const heroVideo = {
  title: 'Des résultats qui se voient dans les chiffres',
  description:
    'Une compilation centrée sur les résultats pour voir, en quelques minutes, ce que disent les clients quand la dynamique commerciale change vraiment.',
  youtubeId: 'ooEf32IGpMM',
  eyebrow: 'Témoignage principal',
};

const secondaryVideos = [
  {
    youtubeId: '0kWjp_4g2Pk',
    title: 'Témoignage client',
  },
  {
    youtubeId: 'ojopxkWzXy8',
    title: 'Retour d’expérience',
  },
  {
    youtubeId: 'kkU2jPspfVk',
    title: 'Transformation commerciale',
  },
  {
    youtubeId: 'LpYgrI2TPlw',
    title: 'Progression des résultats',
  },
  {
    youtubeId: 'ffegHBVorPo',
    title: 'Accompagnement terrain',
  },
  {
    youtubeId: 'uNisunsWkn4',
    title: 'Résultats obtenus',
  },
];

function thumbnailUrl(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

function youtubeUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export default function TestimonialVideoSection() {
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
          <div className="mb-16 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-md lg:p-8">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-2xl">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${heroVideo.youtubeId}?rel=0&modestbranding=1`}
                  title={heroVideo.title}
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
                  {heroVideo.eyebrow}
                </p>
                <h3 className="text-3xl font-title font-bold leading-tight text-white md:text-4xl">
                  {heroVideo.title}
                </h3>
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/76 md:text-lg">
                  {heroVideo.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="font-title text-2xl font-bold text-mint-green">6</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/72">vidéos pour voir la variété des contextes et des résultats</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="font-title text-2xl font-bold text-orange-soft">100%</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/72">centré sur les retours clients, pas sur une promesse marketing</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="font-title text-2xl font-bold text-white">YouTube</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/72">facile à enrichir à mesure que de nouveaux témoignages arrivent</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href={youtubeUrl(heroVideo.youtubeId)} target="_blank" rel="noreferrer" className="block">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Voir la vidéo principale sur YouTube
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
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 font-title text-sm font-semibold uppercase tracking-[0.22em] text-white/60">
                Autres témoignages vidéo
              </p>
              <h3 className="text-2xl font-title font-bold text-white md:text-3xl">
                Un slider plus élégant pour parcourir les autres retours clients
              </h3>
            </div>
          </div>
        </AnimatedSection>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={24}
          slidesPerView={1.1}
          navigation
          pagination={{ clickable: true }}
          className="premium-testimonial-swiper"
          breakpoints={{
            640: { slidesPerView: 1.5 },
            900: { slidesPerView: 2.2 },
            1200: { slidesPerView: 3.1 },
          }}
        >
          {secondaryVideos.map((video, index) => (
            <SwiperSlide key={video.youtubeId}>
              <AnimatedSection animation="slide-up" delay={320 + index * 80}>
                <Link
                  href={youtubeUrl(video.youtubeId)}
                  target="_blank"
                  rel="noreferrer"
                  className="group block overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={thumbnailUrl(video.youtubeId)}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={80}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                    <div className="absolute left-5 top-5 inline-flex items-center rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
                      Témoignage
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                      <div>
                        <h4 className="font-title text-xl font-bold text-white">{video.title}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-white/75">Cliquer pour ouvrir la vidéo sur YouTube</p>
                      </div>
                      <div className="ml-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-x-[1px]">
                          <path d="M1 1.5L14 9L1 16.5V1.5Z" fill="white" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .premium-testimonial-swiper {
          padding-bottom: 3.5rem;
        }

        .premium-testimonial-swiper .swiper-button-prev,
        .premium-testimonial-swiper .swiper-button-next {
          color: #ffffff;
          width: 48px;
          height: 48px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(10px);
        }

        .premium-testimonial-swiper .swiper-button-prev:after,
        .premium-testimonial-swiper .swiper-button-next:after {
          font-size: 18px;
          font-weight: 700;
        }

        .premium-testimonial-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.35);
          opacity: 1;
          margin: 0 6px !important;
        }

        .premium-testimonial-swiper .swiper-pagination-bullet-active {
          background: #00bda4;
          transform: scale(1.15);
        }
      `}</style>
    </section>
  );
}
