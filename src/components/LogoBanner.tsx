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
    <section className="py-12 bg-primary-bg
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold font-title text-primary-title mb-4">
          Ils m'ont fait confiance
        </h2>
        <p className="text-base font-body text-primary-secondary max-w-4xl mx-auto">
          Des PME ambitieuses, des startups en croissance et des équipes qui veulent passer au niveau supérieur.
        </p>
        <div className="mt-8 flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
          {/* Logos des clients */}
        </div>
        <p className="text-sm font-body text-primary-secondary font-italic">
          Et des dizaines d'autres entreprises accompagnées en conseil et formation.
        </p>
      </div>
    </section>
  );
} 