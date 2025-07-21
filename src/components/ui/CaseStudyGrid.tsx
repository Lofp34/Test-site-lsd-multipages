import React from 'react';

export interface CaseStudyProps {
  industry: string;
  companySize: string;
  challenge: string;
  solution: string;
  results: string;
  metrics?: {
    before: string;
    after: string;
    timeline: string;
  };
}

interface CaseStudyGridProps {
  caseStudies: CaseStudyProps[];
  title?: string;
  subtitle?: string;
  domainColor?: string;
}

const CaseStudyGrid: React.FC<CaseStudyGridProps> = ({
  caseStudies,
  title = "Cas clients PME",
  subtitle = "Découvrez comment mes clients appliquent concrètement ces concepts",
  domainColor = "#00BDA4"
}) => {
  const getIndustryIcon = (industry: string) => {
    const icons: { [key: string]: string } = {
      'Services B2B': '💼',
      'Distribution spécialisée': '📦',
      'Technologie': '💻',
      'Industrie': '🏭',
      'SaaS': '☁️',
      'Conseil': '🎯',
      'E-commerce': '🛒',
      'Manufacturing': '⚙️'
    };
    return icons[industry] || '🏢';
  };

  const getCompanySizeColor = (size: string) => {
    const sizeNum = parseInt(size);
    if (sizeNum <= 15) return 'bg-green-100 text-green-700 border-green-200';
    if (sizeNum <= 50) return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-purple-100 text-purple-700 border-purple-200';
  };

  return (
    <div className="max-w-6xl mx-auto mb-12 px-4">
      <div className="bg-white/70 dark:bg-gray-800/80 rounded-2xl shadow-2xl p-8 border border-gray-200/50 backdrop-blur-sm">
        <div className="text-center mb-8">
          <span 
            className="inline-block font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur"
            style={{ 
              backgroundColor: `${domainColor}20`, 
              color: domainColor,
              border: `1px solid ${domainColor}30`
            }}
          >
            🏢 {title}
          </span>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Exemples concrets de transformation en PME
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((caseStudy, index) => (
            <div 
              key={index}
              className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-md"
                  style={{ backgroundColor: `${domainColor}20` }}
                >
                  {getIndustryIcon(caseStudy.industry)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {caseStudy.industry}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getCompanySizeColor(caseStudy.companySize)}`}>
                    {caseStudy.companySize}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-red-600 dark:text-red-400 text-sm mb-2">
                    🚨 Défi initial
                  </h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {caseStudy.challenge}
                  </p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-blue-600 dark:text-blue-400 text-sm mb-2">
                    💡 Solution mise en place
                  </h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {caseStudy.solution}
                  </p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200/50">
                  <h5 className="font-semibold text-green-700 dark:text-green-300 text-sm mb-2">
                    📈 Résultats obtenus
                  </h5>
                  <p className="text-green-700 dark:text-green-300 text-sm font-medium">
                    {caseStudy.results}
                  </p>
                </div>
                
                {caseStudy.metrics && (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200/50">
                    <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                      <div className="text-xs text-red-600 dark:text-red-400 font-medium">Avant</div>
                      <div className="text-xs text-gray-700 dark:text-gray-300">{caseStudy.metrics.before}</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                      <div className="text-xs text-green-600 dark:text-green-400 font-medium">Après</div>
                      <div className="text-xs text-gray-700 dark:text-gray-300">{caseStudy.metrics.after}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl border border-orange-200/50">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
              style={{ backgroundColor: domainColor }}
            >
              <span className="text-white font-bold text-sm">LS</span>
            </div>
            <h4 className="text-xl font-bold" style={{ color: domainColor }}>
              Retour d'expérience Laurent Serre
            </h4>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            "Ces transformations mindset ne se font pas du jour au lendemain. Mes clients qui réussissent le mieux 
            suivent une approche progressive : ils commencent par développer une habitude simple, mesurent l'impact, 
            puis étendent progressivement. L'erreur classique est de vouloir tout changer d'un coup."
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="text-center p-3 bg-white/50 dark:bg-gray-800/30 rounded-lg">
              <div className="text-2xl font-bold" style={{ color: domainColor }}>3-6 mois</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Durée moyenne de transformation</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-gray-800/30 rounded-lg">
              <div className="text-2xl font-bold" style={{ color: domainColor }}>5-8x</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">ROI moyen sur l'investissement mindset</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-gray-800/30 rounded-lg">
              <div className="text-2xl font-bold" style={{ color: domainColor }}>92%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Taux de satisfaction clients</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyGrid;