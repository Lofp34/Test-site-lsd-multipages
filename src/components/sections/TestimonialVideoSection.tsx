'use client';

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

const testimonials = [
  {
    name: "Alexis Alvarez",
    role: "CEO Queoval",
    photo: "/images/Alexis Alvarez.jpeg",
    quote: "Le parcours avec Laurent nous a permis une progression de plus de 50% des objectifs réalisés sur le dernier semestre par rapport au semestre de l'année dernière. On dit merci à Laurent !",
  },
  {
    name: "Sacha Raguet",
    role: "Responsable commercial Au fil des Toits",
    photo: "/images/Sacha Raguet.jpeg",
    quote: "LAURENT nous a donné l'amour du commerce et surtout au niveau des chiffres, on a explosé avec 40 % d'augmentation",
  },
  {
    name: "Elisa Gorbatoff",
    role: "Responsable commerciale Evolvia",
    photo: "/images/Elisa Gorbatoff.jpeg",
    quote: "L'accompagnement de Laurent nous a permis de finir l'année de manière incroyable avec une hausse de 90 % de notre chiffre d'affaires !",
  },
  {
    name: "Kristina Kovriznoh",
    role: "Responsable commerciale Creavea",
    photo: "/images/Kristina Kovriznoh.jpeg",
    quote: "Sur le deuxieme trimestre nous avons fait une progression inespérée de 39%",
  },
  {
    name: "Charles Mancini",
    role: "Directeur commercial",
    photo: "/images/Charles Manicini.jpeg",
    quote: "Laurent a mené un audit en profondeur, la méthode rigoureuse et efficace qui nous permis d'avoir des signatures plus reccurentes, des prospects plus à l'écoute, et surtout, 35% de progression du C.A.",
  },
  {
    name: "Chloé Galmes",
    role: "Dirigeante Freedom Boat club",
    photo: "/images/chloé galmes.jpeg",
    quote: "Grace à l'accompagnement de Laurent nous avons doublé notre nombre d'adhérent, au-dela de nos objectifs, la rigueur et la pertinence ont fourni leurs effets !",
  },
];

export default function TestimonialVideoSection() {
  return (
    <section id="cas-clients" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/tableau-de-bord.jpeg)',
        }}
      />
      
      {/* Overlay pour la lisibilité */}
      <div className="absolute inset-0 bg-primary-bg/90 dark:bg-blue-ink/90" />
      
      {/* Contenu par-dessus le fond */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        {/* Titre de la section */}
        <AnimatedSection animation="slide-up" delay={0}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-title font-bold text-blue-ink dark:text-primary-bg leading-tight mb-4">
              Ils témoignent de la
              <span className="block text-mint-green">transformation</span>
            </h2>
            <p className="text-lg font-body text-gray-anthracite dark:text-primary-bg/80 max-w-2xl mx-auto">
              Découvrez comment nos clients ont révolutionné leurs performances commerciales
            </p>
          </div>
        </AnimatedSection>

        {/* Slider Swiper */}
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={32}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="mb-12"
          breakpoints={{
            1024: { slidesPerView: 2 },
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <AnimatedSection animation="slide-up" delay={200 + i * 100}>
                <div className="bg-white/95 dark:bg-gray-anthracite/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col items-center h-full">
                  <div className="w-20 h-20 mb-4 relative rounded-full overflow-hidden border-4 border-mint-green shadow-lg">
                    <Image src={t.photo} alt={`Portrait professionnel de ${t.name}, ${t.role}, client satisfait de l'accompagnement commercial de Laurent Serre.`} fill style={{objectFit:'cover'}} sizes="80px" />
                  </div>
                  <blockquote className="text-gray-anthracite dark:text-primary-bg/90 font-italic text-lg leading-relaxed mb-4 text-center">"{t.quote}"</blockquote>
                  <div className="font-title font-bold text-blue-ink dark:text-primary-bg text-base text-center">
                    {t.name}
                  </div>
                  <div className="font-normal text-gray-anthracite dark:text-primary-bg/70 text-sm text-center">
                    {t.role}
                  </div>
                </div>
              </AnimatedSection>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA optionnel */}
        <AnimatedSection animation="fade-in" delay={800}>
          <div className="text-center mt-8">
            <p className="font-body text-gray-anthracite dark:text-primary-bg/70 mb-4">
              Vous aussi, transformez vos résultats commerciaux
            </p>
            <Button 
              variant="secondary"
              icon="📞"
              onClick={() => window.open('https://meetings.hubspot.com/laurent34/rdv-laurent-45-mn-clone', '_blank')}
              className="bg-mint-green text-white border-2 border-mint-green hover:bg-mint-green/90 hover:text-white shadow-lg"
            >
              Échanger avec Laurent
            </Button>
          </div>
        </AnimatedSection>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background-color: #AAB8C2; /* Gris clair pour les non-actifs */
          opacity: 0.8;
          transition: all 0.3s ease;
          margin: 0 8px !important; /* Ajoute de l'espace entre les points */
        }
        .swiper-pagination-bullet-active {
          background-color: #00BDA4; /* Couleur d'accentuation pour l'actif */
          transform: scale(1.2);
          opacity: 1;
        }

        /* Augmente la zone tactile sans changer la taille visuelle radicalement */
        .swiper-pagination-bullet::before {
          content: '';
          position: absolute;
          top: -10px;
          bottom: -10px;
          left: -10px;
          right: -10px;
        }
      `}</style>
    </section>
  );
} 