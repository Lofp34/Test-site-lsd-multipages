'use client';

import React from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import NegotiationBadge from '@/components/ui/NegotiationBadge';
import MetricsVisualization from '@/components/ui/MetricsVisualization';
import ROIIndicator from '@/components/ui/ROIIndicator';
import BeforeAfterChart from '@/components/ui/BeforeAfterChart';
import { NegotiationTechnique } from '@/types/negotiation-technique';

interface CaseStudiesProps {
  caseStudies: NegotiationTechnique['caseStudies'];
  laurentVision: string;
  successMetrics: NegotiationTechnique['successMetrics'];
}

interface MetricCardProps {
  label: string;
  value: string;
  color?: string;
  icon?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  label, 
  value, 
  color = '#DC2626',
  icon = '📊' 
}) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-sm">{icon}</span>
      <span className="text-xs text-primary-secondary/70 font-medium">{label}</span>
    </div>
    <div 
      className="text-lg font-bold"
      style={{ color }}
    >
      {value}
    </div>
  </div>
);

interface CaseStudyCardProps {
  caseStudy: NegotiationTechnique['caseStudies'][0];
  index: number;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ caseStudy, index }) => {
  // Convertir les métriques en format pour MetricCard
  const formatMetrics = (metrics: { [key: string]: string }) => {
    const metricConfigs = [
      { key: 'marginPreservation', label: 'Marge préservée', icon: '💰' },
      { key: 'fullPriceWin', label: 'Prix obtenu', icon: '🎯' },
      { key: 'priceIntegrity', label: 'Intégrité prix', icon: '🎯' },
      { key: 'clientSatisfaction', label: 'Satisfaction', icon: '😊' },
      { key: 'projectSuccess', label: 'Succès projet', icon: '✅' },
      { key: 'deliveryAdvance', label: 'Avance livraison', icon: '⚡' },
      { key: 'referralGenerated', label: 'Recommandations', icon: '👥' },
      { key: 'maintenanceContract', label: 'Maintenance', icon: '🔧' },
      { key: 'longTermValue', label: 'Valeur LT', icon: '📈' },
      { key: 'annualContract', label: 'Contrat annuel', icon: '📋' },
      { key: 'pilotSuccess', label: 'Succès pilote', icon: '🚀' },
      { key: 'trustBuilding', label: 'Confiance', icon: '🤝' },
      { key: 'ambassadorStatus', label: 'Ambassadeur', icon: '⭐' }
    ];

    return Object.entries(metrics)
      .map(([key, value]) => {
        const config = metricConfigs.find(c => c.key === key);
        return config ? {
          label: config.label,
          value,
          icon: config.icon
        } : null;
      })
      .filter(Boolean)
      .slice(0, 6); // Limiter à 6 métriques pour l'affichage
  };

  const displayMetrics = formatMetrics(caseStudy.metrics);

  return (
    <AnimatedSection delay={200 + index * 100}>
      <div className="bg-white/70 dark:bg-blue-ink/80 rounded-xl p-6 border border-red-500/20 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-blue-ink/90 transition-all duration-500 group">
        {/* Header avec industrie */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">#{index + 1}</span>
          </div>
          <div>
            <h4 className="font-bold text-blue-ink dark:text-red-400 text-lg">
              Cas Client #{index + 1}
            </h4>
            <p className="text-sm text-primary-secondary/80">
              {caseStudy.industry}
            </p>
          </div>
        </div>

        {/* Challenge */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-red-500">⚠️</span>
            <h5 className="font-semibold text-blue-ink dark:text-white">Défi initial</h5>
          </div>
          <p className="text-sm text-primary-secondary/90 bg-red-50/50 dark:bg-red-900/20 rounded-lg p-3 border-l-4 border-red-500">
            {caseStudy.challenge}
          </p>
        </div>

        {/* Application */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-orange-500">🎯</span>
            <h5 className="font-semibold text-blue-ink dark:text-white">Application de la technique</h5>
          </div>
          <p className="text-sm text-primary-secondary/90 bg-orange-50/50 dark:bg-orange-900/20 rounded-lg p-3 border-l-4 border-orange-500">
            {caseStudy.application}
          </p>
        </div>

        {/* Résultats */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-500">✅</span>
            <h5 className="font-semibold text-blue-ink dark:text-white">Résultats obtenus</h5>
          </div>
          <p className="text-sm text-primary-secondary/90 bg-green-50/50 dark:bg-green-900/20 rounded-lg p-3 border-l-4 border-green-500">
            {caseStudy.results}
          </p>
        </div>

        {/* Métriques de performance avec visualisations avancées */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-500">📊</span>
            <h5 className="font-semibold text-blue-ink dark:text-white">Métriques de performance</h5>
          </div>
          
          {/* Métriques principales */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {displayMetrics.map((metric, idx) => (
              <MetricCard
                key={idx}
                label={metric!.label}
                value={metric!.value}
                icon={metric!.icon}
                color="#DC2626"
              />
            ))}
          </div>

          {/* ROI Indicator pour les cas avec métriques financières */}
          {(caseStudy.metrics.annualContract || caseStudy.metrics.longTermValue) && (
            <div className="mt-4">
              <ROIIndicator
                data={{
                  investment: 50000, // Estimation basée sur le contexte
                  returns: caseStudy.metrics.annualContract 
                    ? parseInt(caseStudy.metrics.annualContract.replace(/[^\d]/g, '')) 
                    : 85000,
                  timeframe: "12 mois",
                  currency: "€",
                  description: `ROI calculé sur la base du contrat ${caseStudy.industry}`
                }}
                showBreakdown={false}
                showProjection={false}
                className="text-xs"
              />
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
};

const CaseStudies: React.FC<CaseStudiesProps> = ({ 
  caseStudies, 
  laurentVision,
  successMetrics 
}) => {
  return (
    <section className="max-w-6xl mx-auto mb-16 px-4" aria-labelledby="case-studies-title">
      <AnimatedSection delay={100}>
        <div className="text-center mb-12">
          <NegotiationBadge 
            text="Cas clients PME"
            icon="🏢"
            className="mb-4"
          />
          <h2 id="case-studies-title" className="text-3xl md:text-4xl font-bold text-primary-title mb-4">
            Preuves de résultats en PME
          </h2>
          <p className="text-lg text-primary-secondary/90 leading-relaxed max-w-3xl mx-auto">
            Découvrez comment mes clients PME appliquent concrètement la technique "Ne jamais couper la poire en deux" 
            avec des résultats mesurés et des témoignages authentiques.
          </p>
        </div>
      </AnimatedSection>

      {/* Métriques globales de succès */}
      <AnimatedSection delay={150}>
        <div className="bg-gradient-to-r from-red-600/10 to-orange-500/10 rounded-2xl p-6 mb-12 border border-red-500/20 backdrop-blur-sm">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-red-600 mb-2">
              Résultats moyens de la technique
            </h3>
            <p className="text-primary-secondary/80">
              Basés sur 50+ négociations PME accompagnées par Laurent Serre
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {successMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-1">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-blue-ink dark:text-white mb-1">
                  {metric.metric}
                </div>
                <div className="text-xs text-primary-secondary/70">
                  {metric.context}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Cas clients */}
      <div className="space-y-8 mb-12">
        {caseStudies.map((caseStudy, index) => (
          <CaseStudyCard 
            key={index} 
            caseStudy={caseStudy} 
            index={index} 
          />
        ))}
      </div>

      {/* Métriques de performance globales avec visualisations avancées */}
      <AnimatedSection delay={350}>
        <MetricsVisualization
          title="Performance globale de la technique"
          subtitle="Analyse comparative des résultats obtenus par les clients PME"
          metrics={[
            {
              label: "Préservation des marges",
              value: "85%",
              previousValue: "45%",
              improvement: "+40%",
              color: "#DC2626",
              icon: "💰",
              description: "Vs négociations traditionnelles avec compromis"
            },
            {
              label: "Satisfaction client",
              value: "92%",
              previousValue: "78%",
              improvement: "+14%",
              color: "#EA580C",
              icon: "😊",
              description: "Maintenue malgré la fermeté sur les prix"
            },
            {
              label: "Durabilité des accords",
              value: "95%",
              previousValue: "65%",
              improvement: "+30%",
              color: "#F59E0B",
              icon: "🤝",
              description: "Taux de renouvellement des contrats"
            },
            {
              label: "Temps de négociation",
              value: "3.2 jours",
              previousValue: "8.5 jours",
              improvement: "-62%",
              color: "#10B981",
              icon: "⚡",
              description: "Durée moyenne pour conclure"
            },
            {
              label: "Taux de conversion",
              value: "78%",
              previousValue: "52%",
              improvement: "+26%",
              color: "#8B5CF6",
              icon: "🎯",
              description: "Prospects convertis en clients"
            },
            {
              label: "ROI moyen",
              value: "240%",
              previousValue: "120%",
              improvement: "+120%",
              color: "#EF4444",
              icon: "📈",
              description: "Retour sur investissement formation"
            }
          ]}
          showComparison={true}
          showAnimatedCounters={true}
          layout="grid"
          className="mb-12"
        />
      </AnimatedSection>

      {/* Graphique comparatif avant/après */}
      <AnimatedSection delay={400}>
        <BeforeAfterChart
          title="Comparaison avant/après la technique"
          subtitle="Impact mesurable de l'application de la méthode Chris Voss adaptée PME"
          data={[
            {
              label: "Préservation des marges",
              before: 45,
              after: 85,
              unit: "%",
              color: "#DC2626",
              icon: "💰"
            },
            {
              label: "Satisfaction client",
              before: 78,
              after: 92,
              unit: "%",
              color: "#EA580C",
              icon: "😊"
            },
            {
              label: "Durée négociation",
              before: 8.5,
              after: 3.2,
              unit: " jours",
              color: "#10B981",
              icon: "⚡"
            },
            {
              label: "Taux de conversion",
              before: 52,
              after: 78,
              unit: "%",
              color: "#8B5CF6",
              icon: "🎯"
            },
            {
              label: "Renouvellement contrats",
              before: 65,
              after: 95,
              unit: "%",
              color: "#F59E0B",
              icon: "🤝"
            },
            {
              label: "ROI formation",
              before: 120,
              after: 240,
              unit: "%",
              color: "#EF4444",
              icon: "📈"
            }
          ]}
          showPercentageImprovement={true}
          className="mb-12"
        />
      </AnimatedSection>

      {/* Retour d'expérience Laurent Serre */}
      <AnimatedSection delay={400}>
        <div className="bg-gradient-to-r from-red-600/10 to-orange-500/10 rounded-2xl p-8 border border-red-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">LS</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-1">
                Retour d'expérience Laurent Serre
              </h3>
              <p className="text-primary-secondary/80">
                20 ans d'accompagnement PME • 500+ négociations
              </p>
            </div>
          </div>
          
          <blockquote className="text-primary-secondary/90 leading-relaxed mb-6 text-lg italic">
            "{laurentVision}"
          </blockquote>

          {/* Métriques d'expérience Laurent */}
          <div className="grid md:grid-cols-4 gap-4 pt-6 border-t border-red-500/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">500+</div>
              <div className="text-xs text-primary-secondary/70">Négociations accompagnées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">85%</div>
              <div className="text-xs text-primary-secondary/70">Marges préservées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">92%</div>
              <div className="text-xs text-primary-secondary/70">Satisfaction maintenue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">20 ans</div>
              <div className="text-xs text-primary-secondary/70">D'expérience terrain</div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Call-to-action vers formation */}
      <AnimatedSection delay={500}>
        <div className="text-center mt-12">
          <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl p-8 border border-red-500/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-blue-ink dark:text-red-400 mb-4">
              Prêt à appliquer cette technique dans vos négociations ?
            </h3>
            <p className="text-primary-secondary/90 mb-6 max-w-2xl mx-auto">
              Rejoignez les dirigeants PME qui ont transformé leurs négociations avec l'accompagnement personnalisé de Laurent Serre.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/diagnostic"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold rounded-xl hover:from-red-700 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="mr-2">🎯</span>
                Diagnostic gratuit
              </a>
              <a
                href="/bootcamp-commercial-intensif"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-red-600 font-semibold rounded-xl border-2 border-red-500/30 hover:bg-red-50/50 hover:border-red-500/50 transition-all duration-300"
              >
                <span className="mr-2">🚀</span>
                Formation intensive
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default CaseStudies;