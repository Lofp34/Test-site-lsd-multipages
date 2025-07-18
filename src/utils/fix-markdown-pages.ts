// Script pour corriger le rendu Markdown sur toutes les pages de livres
// Ce script identifie les patterns à corriger et génère les remplacements nécessaires

export const markdownFixes = [
  // Import du composant MarkdownRenderer
  {
    search: /import React from 'react';$/m,
    replace: `import React from 'react';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer';`
  },
  
  // Correction du résumé détaillé
  {
    search: /<div className="prose prose-lg (?:prose-invert )?max-w-none">\s*<p className="text-(?:white\/90|primary-secondary) leading-relaxed mb-6">\s*\{bookData\.detailedSummary\}\s*<\/p>\s*<\/div>/gs,
    replace: `<div className="prose prose-lg max-w-none">
              <MarkdownRenderer 
                content={bookData.detailedSummary} 
                className="text-primary-secondary"
              />
            </div>`
  },
  
  // Correction des conseils terrain
  {
    search: /<p className="text-(?:white\/90|primary-secondary) leading-relaxed whitespace-pre-line">\s*\{bookData\.terrainAdvice\}\s*<\/p>/gs,
    replace: `<MarkdownRenderer 
                content={bookData.terrainAdvice} 
                className="text-primary-secondary"
              />`
  }
];

export const filesToFix = [
  'src/app/ressources/meilleurs-livres/mindset-performance/7-habitudes-gens-efficaces/page.tsx',
  'src/app/ressources/meilleurs-livres/mindset-performance/mindset-new-psychology-success/page.tsx',
  'src/app/ressources/meilleurs-livres/mindset-performance/grit-power-passion-perseverance/page.tsx',
  'src/app/ressources/meilleurs-livres/mindset-performance/the-power-of-now/page.tsx',
  'src/app/ressources/meilleurs-livres/mindset-performance/cant-hurt-me/page.tsx',
  'src/app/ressources/meilleurs-livres/mindset-performance/peak-performance/page.tsx',
  'src/app/ressources/meilleurs-livres/mindset-performance/mindset/page.tsx',
  'src/app/ressources/meilleurs-livres/mindset-performance/the-7-habits/page.tsx',
  // Ajouter d'autres pages si nécessaire
];