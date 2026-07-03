'use client';

import Image from 'next/image';

export default function LogoBanner() {
  // Liste des logos clients (sélection des plus beaux/lisibles)
  const clientLogos = [
    { name: "Audexcom", src: "/images/logos/audexcom.webp" },
    { name: "Bibal", src: "/images/logos/bibal.webp" },
    { name: "CBS", src: "/images/logos/cbs.webp" },
    { name: "KPMG", src: "/images/logos/kpmg.webp" },
    { name: "Mutualité Française", src: "/images/logos/mutualite-francaise.webp" },
    { name: "Myriagone", src: "/images/logos/myriagone.webp" },
    { name: "Progressium", src: "/images/logos/progressium.webp" },
    { name: "Qualisphere", src: "/images/logos/qualisphere.webp" },
    { name: "Rational Consulting", src: "/images/logos/rational-consulting.webp" },
    { name: "Roadcom", src: "/images/logos/roadcom.webp" },
    { name: "Septeo", src: "/images/logos/septeo.webp" },
    { name: "SVP", src: "/images/logos/svp.webp" },
    { name: "Synia", src: "/images/logos/synia.webp" },
    { name: "Teufelberger", src: "/images/logos/teufelberger.webp" },
    { name: "UPVD", src: "/images/logos/upvd.webp" }
  ];

  return (
    <section className="py-12 bg-white dark:bg-white border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        {/* Paragraphe contextuel */}
        <div className="text-center mb-8">
          <p className="text-base font-body text-gray-anthracite max-w-4xl mx-auto">
            J'accompagne des entreprises leaders dans des secteurs variés : <strong>conseil et expertise comptable</strong> (Audexcom, KPMG, Editions Lefebvre-Dalloz, SVP), <strong>services et logiciel</strong> (Septeo, Sequoia Soft, ESII), <strong>industrie</strong> (Teufelberger, IPO Technologies, SART von Rhor, Nidek, les Compagnons du Devoir), <strong>distribution</strong> (Bubimex, Seguret Décoration, Cafés Bibal) et <strong>santé</strong> (Mutualité Française, Groupe Demant, Fresenius Kabi).
          </p>
        </div>

        {/* Titre discret */}
        <div className="text-center mb-8">
          <p className="text-sm font-body text-gray-anthracite font-italic">
            Ils nous ont fait confiance
          </p>
        </div>

        {/* Bandeau déroulant */}
        <div className="relative overflow-hidden">
          {/* Masques de dégradé */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          {/* Container du bandeau avec animation inline */}
          <div 
            className="flex hover:pause"
            style={{
              animation: 'logoScroll 20s linear infinite'
            }}
          >
            {/* Première série de logos */}
            <div className="flex items-center gap-12 pr-12">
              {clientLogos.map((logo, index) => (
                <div 
                  key={`first-${index}`}
                  className="flex-shrink-0 w-24 h-16 relative opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                >
                  <Image
                    src={logo.src}
                    alt={`Logo de ${logo.name}, client de Laurent Serre`}
                    width={96}
                    height={64}
                    className="object-contain"
                    quality={45}
                  />
                </div>
              ))}
            </div>
            
            {/* Deuxième série de logos (duplication pour défilement continu) */}
            <div className="flex items-center gap-12 pr-12">
              {clientLogos.map((logo, index) => (
                <div 
                  key={`second-${index}`}
                  className="flex-shrink-0 w-24 h-16 relative opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                >
                  <Image
                    src={logo.src}
                    alt={`Logo de ${logo.name}, client de Laurent Serre`}
                    width={96}
                    height={64}
                    className="object-contain"
                    quality={45}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 