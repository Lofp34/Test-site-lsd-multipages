/**
 * Tests spécifiques pour l'affichage responsive mobile et tablette
 * Vérifie les breakpoints, la navigation mobile, et l'accessibilité
 */

import fs from 'fs';

interface ResponsiveTestResult {
  test: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  message: string;
  details?: any;
}

/**
 * Teste les breakpoints responsive Tailwind
 */
function testTailwindBreakpoints(filePath: string): ResponsiveTestResult {
  try {
    if (!fs.existsSync(filePath)) {
      return {
        test: 'Tailwind Breakpoints',
        status: 'FAIL',
        message: 'Fichier inexistant'
      };
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const breakpoints = {
      mobile: content.includes('sm:') || content.includes('max-sm:'),
      tablet: content.includes('md:') || content.includes('max-md:'),
      desktop: content.includes('lg:') || content.includes('xl:'),
      flexResponsive: content.includes('flex-col') && content.includes('md:flex-row'),
      gridResponsive: content.includes('grid-cols-1') && content.includes('md:grid-cols-'),
      textResponsive: content.includes('text-') && (content.includes('md:text-') || content.includes('lg:text-')),
      spacingResponsive: content.includes('px-') && content.includes('md:px-'),
      hiddenElements: content.includes('hidden') && content.includes('md:block')
    };
    
    const passedBreakpoints = Object.values(breakpoints).filter(Boolean).length;
    const totalBreakpoints = Object.keys(breakpoints).length;
    
    if (passedBreakpoints >= totalBreakpoints * 0.6) {
      return {
        test: 'Tailwind Breakpoints',
        status: 'PASS',
        message: `Breakpoints responsive détectés (${passedBreakpoints}/${totalBreakpoints})`
      };
    } else if (passedBreakpoints >= totalBreakpoints * 0.3) {
      return {
        test: 'Tailwind Breakpoints',
        status: 'WARNING',
        message: `Breakpoints partiels (${passedBreakpoints}/${totalBreakpoints})`,
        details: breakpoints
      };
    } else {
      return {
        test: 'Tailwind Breakpoints',
        status: 'FAIL',
        message: `Breakpoints insuffisants (${passedBreakpoints}/${totalBreakpoints})`,
        details: breakpoints
      };
    }
  } catch (error) {
    return {
      test: 'Tailwind Breakpoints',
      status: 'FAIL',
      message: `Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Teste l'optimisation mobile (navigation, touch, etc.)
 */
function testMobileOptimization(filePath: string): ResponsiveTestResult {
  try {
    if (!fs.existsSync(filePath)) {
      return {
        test: 'Mobile Optimization',
        status: 'FAIL',
        message: 'Fichier inexistant'
      };
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const mobileFeatures = {
      touchFriendly: content.includes('touch-') || content.includes('hover:') || content.includes('active:'),
      mobileNavigation: content.includes('mobile') || content.includes('burger') || content.includes('menu'),
      appropriateSpacing: content.includes('px-4') || content.includes('px-6') || content.includes('p-4'),
      readableText: content.includes('text-base') || content.includes('text-lg') || content.includes('leading-'),
      accessibleButtons: content.includes('py-2') || content.includes('py-3') || content.includes('min-h-'),
      mobileImages: content.includes('w-full') || content.includes('max-w-') || content.includes('object-'),
      scrollOptimized: content.includes('overflow-') || content.includes('scroll-')
    };
    
    const passedFeatures = Object.values(mobileFeatures).filter(Boolean).length;
    const totalFeatures = Object.keys(mobileFeatures).length;
    
    if (passedFeatures >= totalFeatures * 0.7) {
      return {
        test: 'Mobile Optimization',
        status: 'PASS',
        message: `Optimisation mobile détectée (${passedFeatures}/${totalFeatures})`
      };
    } else if (passedFeatures >= totalFeatures * 0.4) {
      return {
        test: 'Mobile Optimization',
        status: 'WARNING',
        message: `Optimisation mobile partielle (${passedFeatures}/${totalFeatures})`,
        details: mobileFeatures
      };
    } else {
      return {
        test: 'Mobile Optimization',
        status: 'FAIL',
        message: `Optimisation mobile insuffisante (${passedFeatures}/${totalFeatures})`,
        details: mobileFeatures
      };
    }
  } catch (error) {
    return {
      test: 'Mobile Optimization',
      status: 'FAIL',
      message: `Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Teste l'accessibilité responsive
 */
function testResponsiveAccessibility(filePath: string): ResponsiveTestResult {
  try {
    if (!fs.existsSync(filePath)) {
      return {
        test: 'Responsive Accessibility',
        status: 'FAIL',
        message: 'Fichier inexistant'
      };
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const a11yFeatures = {
      altTexts: content.includes('alt=') && content.includes('"'),
      ariaLabels: content.includes('aria-label') || content.includes('aria-describedby'),
      semanticHTML: content.includes('<main') || content.includes('<section') || content.includes('<article'),
      focusManagement: content.includes('focus:') || content.includes('focus-visible:'),
      skipLinks: content.includes('skip') || content.includes('sr-only'),
      headingHierarchy: content.includes('<h1') && content.includes('<h2'),
      colorContrast: content.includes('text-white') || content.includes('text-gray-') || content.includes('bg-')
    };
    
    const passedA11y = Object.values(a11yFeatures).filter(Boolean).length;
    const totalA11y = Object.keys(a11yFeatures).length;
    
    if (passedA11y >= totalA11y * 0.7) {
      return {
        test: 'Responsive Accessibility',
        status: 'PASS',
        message: `Accessibilité responsive validée (${passedA11y}/${totalA11y})`
      };
    } else if (passedA11y >= totalA11y * 0.5) {
      return {
        test: 'Responsive Accessibility',
        status: 'WARNING',
        message: `Accessibilité partielle (${passedA11y}/${totalA11y})`,
        details: a11yFeatures
      };
    } else {
      return {
        test: 'Responsive Accessibility',
        status: 'FAIL',
        message: `Accessibilité insuffisante (${passedA11y}/${totalA11y})`,
        details: a11yFeatures
      };
    }
  } catch (error) {
    return {
      test: 'Responsive Accessibility',
      status: 'FAIL',
      message: `Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Lance tous les tests responsive pour un fichier
 */
export function testPageResponsive(filePath: string): ResponsiveTestResult[] {
  console.log(`📱 Tests responsive pour: ${filePath}`);
  
  const results: ResponsiveTestResult[] = [];
  
  results.push(testTailwindBreakpoints(filePath));
  results.push(testMobileOptimization(filePath));
  results.push(testResponsiveAccessibility(filePath));
  
  return results;
}

/**
 * Lance les tests responsive pour toutes les pages Mindset & Performance
 */
export function testAllPagesResponsive(): void {
  console.log('📱 TESTS RESPONSIVE - Section Mindset & Performance');
  console.log('==================================================');
  
  const pages = [
    'src/app/ressources/meilleurs-livres/mindset-performance/page.tsx',
    'src/app/ressources/meilleurs-livres/mindset-performance/atomic-habits/page.tsx',
    'src/app/ressources/meilleurs-livres/mindset-performance/7-habitudes-gens-efficaces/page.tsx',
    'src/app/ressources/meilleurs-livres/mindset-performance/mindset-new-psychology-success/page.tsx',
    'src/app/ressources/meilleurs-livres/mindset-performance/grit-power-passion-perseverance/page.tsx',
    'src/app/ressources/meilleurs-livres/mindset-performance/deep-work/page.tsx'
  ];
  
  let totalTests = 0;
  let passedTests = 0;
  let warningTests = 0;
  let failedTests = 0;
  
  pages.forEach(page => {
    const results = testPageResponsive(page);
    
    console.log(`\n📄 ${page.split('/').pop()}`);
    results.forEach(result => {
      totalTests++;
      const icon = result.status === 'PASS' ? '✅' : result.status === 'WARNING' ? '⚠️' : '❌';
      console.log(`  ${icon} ${result.test}: ${result.message}`);
      
      if (result.status === 'PASS') passedTests++;
      else if (result.status === 'WARNING') warningTests++;
      else failedTests++;
      
      if (result.details) {
        console.log(`     Détails:`, result.details);
      }
    });
  });
  
  console.log('\n📊 RÉSUMÉ RESPONSIVE');
  console.log('===================');
  console.log(`✅ Tests réussis: ${passedTests}/${totalTests}`);
  console.log(`⚠️  Avertissements: ${warningTests}/${totalTests}`);
  console.log(`❌ Tests échoués: ${failedTests}/${totalTests}`);
  
  const successRate = Math.round((passedTests / totalTests) * 100);
  console.log(`📈 Taux de réussite responsive: ${successRate}%`);
  
  if (successRate >= 80) {
    console.log('🎉 Design responsive: Excellent!');
  } else if (successRate >= 60) {
    console.log('✅ Design responsive: Bon niveau');
  } else if (successRate >= 40) {
    console.log('⚠️  Design responsive: Améliorations nécessaires');
  } else {
    console.log('❌ Design responsive: Corrections urgentes');
  }
}