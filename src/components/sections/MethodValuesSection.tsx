'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const MethodValuesSection = () => {
  const values = [
    {
      icon: "🎯",
      title: "Le Terrain Avant Tout",
      description: "Moins de slides, plus d'action. J'interviens sur le terrain avec vos équipes.",
    },
    {
      icon: "📈",
      title: "La Data au Service de la Performance",
      description: "Nous mesurons tout. Chaque action est pilotée par des KPIs clairs.",
    },
    {
      icon: "🤝",
      title: "Co-construction & Transfert",
      description: "Mon objectif est de vous rendre autonome, pas dépendant.",
    },
  ];

  return (
    <section className="py-16 bg-bg-main
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-title text-primary-title mb-4">
            Ma méthode : Pragmatisme, Data & Terrain
          </h2>
          <p className="text-lg font-body text-primary-secondary leading-relaxed">
            Pas de recettes miracles, mais des méthodes éprouvées et adaptées à votre réalité.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* ... (partie gauche avec les valeurs) ... */}
          
          {/* Partie droite avec le manifeste */}
          <div>
            <h3 className="text-2xl font-bold text-mint-green mb-4">
              Mon Manifeste Commercial
            </h3>
            <p className="text-lg font-body text-primary-secondary leading-relaxed">
              Je crois en une vente éthique, intelligente et centrée sur la valeur.
            </p>
            {/* ... (liste du manifeste) ... */}
            <blockquote className="mt-6 border-l-4 border-mint-green pl-4 italic">
              <p className="text-xl md:text-2xl font-italic text-primary-secondary leading-relaxed">
                "Le meilleur vendeur n'est pas celui qui a la meilleure réponse, mais celui qui pose la meilleure question."
              </p>
            </blockquote>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="font-body text-primary-secondary mb-6">
            Cette approche vous parle ? Découvrez comment l'appliquer à votre entreprise.
          </p>
          <Button href="/services" variant="primary" size="lg">
            Découvrir mes services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MethodValuesSection; 