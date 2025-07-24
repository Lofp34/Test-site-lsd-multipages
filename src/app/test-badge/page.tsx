import React from 'react';
import Badge from '@/components/ui/Badge';

export default function TestBadgePage() {
  return (
    <div className="min-h-screen bg-bg-main p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-ink mb-8">
          Test du composant Badge
        </h1>

        {/* Difficulty variants */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-ink mb-4">
            Variants de difficulté
          </h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <Badge variant="difficulty" difficulty="Facile">Facile</Badge>
            <Badge variant="difficulty" difficulty="Intermédiaire">Intermédiaire</Badge>
            <Badge variant="difficulty" difficulty="Avancé">Avancé</Badge>
          </div>
          
          <h3 className="text-lg font-medium text-blue-ink mb-2">
            Tailles différentes
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="difficulty" difficulty="Facile" size="sm">Facile (sm)</Badge>
            <Badge variant="difficulty" difficulty="Intermédiaire" size="md">Intermédiaire (md)</Badge>
            <Badge variant="difficulty" difficulty="Avancé" size="lg">Avancé (lg)</Badge>
          </div>
        </section>

        {/* Outline variant */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-ink mb-4">
            Variant outline
          </h2>
          <div className="flex flex-wrap gap-4">
            <Badge variant="outline" size="sm">6h de lecture</Badge>
            <Badge variant="outline" size="md">8h de lecture</Badge>
            <Badge variant="outline" size="lg">10h de lecture</Badge>
          </div>
        </section>

        {/* Category variants */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-ink mb-4">
            Variants de catégorie
          </h2>
          <div className="flex flex-wrap gap-4">
            <Badge variant="category" category="prospection-sdr">Prospection</Badge>
            <Badge variant="category" category="negociation-closing">Négociation</Badge>
            <Badge variant="category" category="psychologie-influence">Psychologie</Badge>
            <Badge variant="category" category="enterprise-account">Grands comptes</Badge>
            <Badge variant="category" category="sales-management">Management</Badge>
            <Badge variant="category" category="digital-ai">Digital & IA</Badge>
            <Badge variant="category" category="mindset-performance">Mindset</Badge>
          </div>
        </section>

        {/* Default variant */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-ink mb-4">
            Variant par défaut
          </h2>
          <div className="flex flex-wrap gap-4">
            <Badge size="sm">Default (sm)</Badge>
            <Badge size="md">Default (md)</Badge>
            <Badge size="lg">Default (lg)</Badge>
          </div>
        </section>

        {/* Mixed examples */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-ink mb-4">
            Exemples d'utilisation mixte
          </h2>
          <div className="bg-white/70 rounded-xl p-6 border border-mint-green/20">
            <h3 className="text-lg font-medium mb-4">Livre exemple</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="difficulty" difficulty="Intermédiaire" size="sm">Intermédiaire</Badge>
              <Badge variant="outline" size="sm">6h</Badge>
              <Badge variant="category" category="enterprise-account" size="sm">Grands comptes</Badge>
            </div>
            <p className="text-gray-700
              Exemple d'utilisation des badges dans un contexte réel.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}