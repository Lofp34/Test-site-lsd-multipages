'use client';

import React from 'react';
import { PMECaseStudy as PMECaseStudyType } from '@/types/category-templates';
import { CategoryTheme } from '@/types/category-templates';

interface PMECaseStudyProps extends PMECaseStudyType {
  categoryTheme?: CategoryTheme;
}

export default function PMECaseStudy({
  industry,
  companySize,
  sector,
  challenge,
  solutionApplied,
  results,
  metrics,
  timeline,
  businessImpact,
  laurentQuote,
  icon,
  themeColor,
  categoryTheme
}: PMECaseStudyProps) {
  const primaryColor = categoryTheme?.primaryColor || themeColor;
  const secondaryColor = categoryTheme?.secondaryColor || '#6B7280';

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50">
      <div className="flex items-center gap-3 mb-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: primaryColor }}
        >
          <span className="text-white font-bold text-sm">{icon}</span>
        </div>
        <div>
          <h4 className="font-bold" style={{ color: primaryColor }}>
            {sector} - {companySize}
          </h4>
          <p className="text-sm text-gray-600">{industry}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-gray-700 mb-3 text-sm">
            <strong>Défi :</strong> {challenge}
          </p>
        </div>
        
        <div>
          <p className="text-gray-700 mb-3 text-sm">
            <strong>Solution :</strong> {solutionApplied}
          </p>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-green-700 text-sm font-medium mb-2">
            📈 Résultats : {results}
          </p>
          
          {/* Métriques détaillées */}
          {Object.keys(metrics).length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {Object.entries(metrics).map(([key, value], index) => (
                <div key={index} className="text-center p-2 bg-white/50 rounded">
                  <div className="text-sm font-bold" style={{ color: primaryColor }}>
                    {value}
                  </div>
                  <div className="text-xs text-gray-600">{key}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Timeline et impact business */}
        <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
          <span>⏱️ {timeline}</span>
          <span>💼 {businessImpact}</span>
        </div>
        
        {/* Quote Laurent Serre si disponible */}
        {laurentQuote && (
          <div className="mt-3 p-3 bg-white/50 rounded-lg border-l-4" style={{ borderLeftColor: primaryColor }}>
            <div className="flex items-center gap-2 mb-1">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: primaryColor }}
              >
                <span className="text-white font-bold text-xs">LS</span>
              </div>
              <span className="text-xs font-semibold" style={{ color: primaryColor }}>
                Laurent Serre
              </span>
            </div>
            <p className="text-gray-700 text-xs italic">
              "{laurentQuote}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}