'use client';

import Image from 'next/image';

export default function LogoBanner() {
  // Liste des logos clients (sélection des plus beaux/lisibles)
  const clientLogos = [
    { name: "Audexcom", src: "/images/Audexcom.png" },
    { name: "Bibal", src: "/images/Bibal.png" },
    { name: "CBS", src: "/images/CBS.png" },
    { name: "KPMG", src: "/images/KPMGjpeg.jpeg" },
    { name: "Mutualité Française", src: "/images/1200px-Mutualite-française.png" },
    { name: "Myriagone", src: "/images/Myriagone.png" },
    { name: "Progressium", src: "/images/progressium.png" },
    { name: "Qualisphere", src: "/images/Qualisphere.png" },
    { name: "Rational Consulting", src: "/images/rational consulting.png" },
    { name: "Roadcom", src: "/images/Roadcom.png" },
    { name: "Septeo", src: "/images/septeo.png" },
    { name: "SVP", src: "/images/SVP.png" },
    { name: "Synia", src: "/images/synia.png" },
    { name: "Teufelberger", src: "/images/Teufelberger.png" },
    { name: "UPVD", src: "/images/UPVD.png" }
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
                    alt={`Logo de ${logo.name}, client de Laurent Serre Développement`}
                    width={96}
                    height={64}
                    className="object-contain"
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
                    alt={`Logo de ${logo.name}, client de Laurent Serre Développement`}
                    width={96}
                    height={64}
                    className="object-contain"
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