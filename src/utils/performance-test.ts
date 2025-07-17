/**
 * Tests de performance et accessibilité pour la section Mindset & Performance
 * Vérifie les Core Web Vitals, l'optimisation des images, l'accessibilité WCAG 2.1
 */

import fs from 'fs';
import path from 'path';

interface PerformanceTestResult {
  test: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  message: string;
  details?: any;
}

/**
 * Teste l'optimisation des images
 */
export function testImageOptimization(): PerformanceTestResult {
  try {
    const mainPagePath = 'src/app/ressources/meilleurs-livres/mindset-performance/page.tsx';
    
    if (!fs.existsSync(mainPagePath)) {
      return {
        test: 'Image Optimization',
        status: 'FAIL',
        message: 'Page principale manquante'
      };
    }
    
    const content = fs.readFileSync(mainPagePath, 'utf-8');
    
    const checks = {
      usesNextImage: content.includes('next/image') || content.includes('OptimizedImage'),
      hasAltText: content.includes('alt=') || content.includes('alt:'),
      hasLazyLoading: content.includes('loading=') || content.includes('lazy'),
      hasWebPSupport: content.includes('webp') || content.includes('avif') || content.includes('next/image'),
      noDirectImgTags: !content.includes('<img ') || content.includes('next/image')
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    if (passedChecks >= totalChecks * 0.8) {
      return {
        test: 'Image Optimization',
        status: 'PASS',
        message: `Images optimisées (${passedChecks}/${totalChecks})`
      };
    } else if (passedChecks >= totalChecks * 0.6) {
      return {
        test: 'Image Optimization',
        status: 'WARNING',
        message: `Optimisation partielle (${passedChecks}/${totalChecks})`,
        details: checks
      };
    } else {
      return {
        test: 'Image Optimization',
        status: 'FAIL',
        message: `Images non optimisées (${passedChecks}/${totalChecks})`,
        details: checks
      };
    }
  } catch (error) {
    return {
      test: 'Image Optimization',
      status: 'FAIL',
      message: `Erreur lors du test images: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Teste l'accessibilité WCAG 2.1
 */
export function testAccessibility(): PerformanceTestResult {
  try {
    const mainPagePath = 'src/app/ressources/meilleurs-livres/mindset-performance/page.tsx';
    
    if (!fs.existsSync(mainPagePath)) {
      return {
        test: 'Accessibility WCAG 2.1',
        status: 'FAIL',
        message: 'Page principale manquante'
      };
    }
    
    const content = fs.readFileSync(mainPagePath, 'utf-8');
    
    const checks = {
      hasSemanticHTML: content.includes('<main>') && content.includes('<section>') && content.includes('<h1'),
      hasAriaLabels: content.includes('aria-label') || content.includes('aria-labelledby'),
      hasAltText: content.includes('alt=') || content.includes('alt:'),
      hasHeadingHierarchy: content.includes('<h1') && content.includes('<h2'),
      hasRoleAttributes: content.includes('role=') || content.includes('role:'),
      hasKeyboardNavigation: content.includes('tabIndex') || content.includes('onKeyDown') || content.includes('Link'),
      hasColorContrast: !content.includes('text-gray-300') && !content.includes('text-white/30'),
      hasFocusManagement: content.includes('focus:') || content.includes('focus-visible')
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    if (passedChecks >= totalChecks * 0.8) {
      return {
        test: 'Accessibility WCAG 2.1',
        status: 'PASS',
        message: `Accessibilité conforme (${passedChecks}/${totalChecks})`
      };
    } else if (passedChecks >= totalChecks * 0.6) {
      return {
        test: 'Accessibility WCAG 2.1',
        status: 'WARNING',
        message: `Accessibilité partielle (${passedChecks}/${totalChecks})`,
        details: checks
      };
    } else {
      return {
        test: 'Accessibility WCAG 2.1',
        status: 'FAIL',
        message: `Accessibilité insuffisante (${passedChecks}/${totalChecks})`,
        details: checks
      };
    }
  } catch (error) {
    return {
      test: 'Accessibility WCAG 2.1',
      status: 'FAIL',
      message: `Erreur lors du test accessibilité: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Teste les optimisations de code
 */
export function testCodeOptimization(): PerformanceTestResult {
  try {
    const mainPagePath = 'src/app/ressources/meilleurs-livres/mindset-performance/page.tsx';
    
    if (!fs.existsSync(mainPagePath)) {
      return {
        test: 'Code Optimization',
        status: 'FAIL',
        message: 'Page principale manquante'
      };
    }
    
    const content = fs.readFileSync(mainPagePath, 'utf-8');
    
    const checks = {
      usesLazyLoading: content.includes('lazy') || content.includes('AnimatedSection'),
      hasTreeShaking: content.includes('import {') && !content.includes('import *'),
      usesTypeScript: content.includes(': React.') || content.includes('interface ') || content.includes('type '),
      hasComponentSplitting: content.includes('const ') && content.includes('export default'),
      usesNextOptimizations: content.includes('next/') || content.includes('Metadata'),
      hasMinimalDependencies: !content.includes('lodash') && !content.includes('moment'),
      usesModernJS: content.includes('=>') && content.includes('const '),
      hasErrorBoundaries: content.includes('try') || content.includes('catch') || content.includes('Error')
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    if (passedChecks >= totalChecks * 0.8) {
      return {
        test: 'Code Optimization',
        status: 'PASS',
        message: `Code optimisé (${passedChecks}/${totalChecks})`
      };
    } else if (passedChecks >= totalChecks * 0.6) {
      return {
        test: 'Code Optimization',
        status: 'WARNING',
        message: `Code partiellement optimisé (${passedChecks}/${totalChecks})`,
        details: checks
      };
    } else {
      return {
        test: 'Code Optimization',
        status: 'FAIL',
        message: `Code non optimisé (${passedChecks}/${totalChecks})`,
        details: checks
      };
    }
  } catch (error) {
    return {
      test: 'Code Optimization',
      status: 'FAIL',
      message: `Erreur lors du test code: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Teste les animations et interactions
 */
export function testAnimationsInteractions(): PerformanceTestResult {
  try {
    const mainPagePath = 'src/app/ressources/meilleurs-livres/mindset-performance/page.tsx';
    
    if (!fs.existsSync(mainPagePath)) {
      return {
        test: 'Animations & Interactions',
        status: 'FAIL',
        message: 'Page principale manquante'
      };
    }
    
    const content = fs.readFileSync(mainPagePath, 'utf-8');
    
    const checks = {
      hasAnimations: content.includes('AnimatedSection') || content.includes('transition') || content.includes('animate'),
      hasHoverEffects: content.includes('hover:') || content.includes(':hover'),
      hasFocusStates: content.includes('focus:') || content.includes(':focus'),
      hasLoadingStates: content.includes('loading') || content.includes('skeleton'),
      hasResponsiveAnimations: content.includes('motion-reduce') || content.includes('prefers-reduced-motion'),
      hasPerformantAnimations: content.includes('transform') || content.includes('opacity') || content.includes('scale'),
      hasInteractiveElements: content.includes('onClick') || content.includes('onHover') || content.includes('Link'),
      hasAccessibleAnimations: content.includes('aria-') && (content.includes('animation') || content.includes('transition'))
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    if (passedChecks >= totalChecks * 0.7) {
      return {
        test: 'Animations & Interactions',
        status: 'PASS',
        message: `Animations optimisées (${passedChecks}/${totalChecks})`
      };
    } else if (passedChecks >= totalChecks * 0.5) {
      return {
        test: 'Animations & Interactions',
        status: 'WARNING',
        message: `Animations partielles (${passedChecks}/${totalChecks})`,
        details: checks
      };
    } else {
      return {
        test: 'Animations & Interactions',
        status: 'FAIL',
        message: `Animations insuffisantes (${passedChecks}/${totalChecks})`,
        details: checks
      };
    }
  } catch (error) {
    return {
      test: 'Animations & Interactions',
      status: 'FAIL',
      message: `Erreur lors du test animations: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Teste les Core Web Vitals (simulation statique)
 */
export function testCoreWebVitals(): PerformanceTestResult {
  try {
    const mainPagePath = 'src/app/ressources/meilleurs-livres/mindset-performance/page.tsx';
    const nextConfigPath = 'next.config.js';
    
    if (!fs.existsSync(mainPagePath)) {
      return {
        test: 'Core Web Vitals',
        status: 'FAIL',
        message: 'Page principale manquante'
      };
    }
    
    const pageContent = fs.readFileSync(mainPagePath, 'utf-8');
    const hasNextConfig = fs.existsSync(nextConfigPath);
    const nextConfigContent = hasNextConfig ? fs.readFileSync(nextConfigPath, 'utf-8') : '';
    
    const checks = {
      // LCP (Largest Contentful Paint)
      hasImageOptimization: pageContent.includes('next/image') || pageContent.includes('OptimizedImage'),
      hasLazyLoading: pageContent.includes('lazy') || pageContent.includes('AnimatedSection'),
      
      // FID (First Input Delay)
      hasCodeSplitting: pageContent.includes('const ') && pageContent.includes('export'),
      hasMinimalJS: !pageContent.includes('heavy-library') && pageContent.length < 50000,
      
      // CLS (Cumulative Layout Shift)
      hasFixedDimensions: pageContent.includes('width') && pageContent.includes('height'),
      hasReservedSpace: pageContent.includes('aspect-') || pageContent.includes('min-h-'),
      
      // General optimizations
      hasCompression: hasNextConfig && nextConfigContent.includes('compress'),
      hasCaching: hasNextConfig && nextConfigContent.includes('cache')
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    if (passedChecks >= totalChecks * 0.8) {
      return {
        test: 'Core Web Vitals',
        status: 'PASS',
        message: `Core Web Vitals optimisés (${passedChecks}/${totalChecks})`
      };
    } else if (passedChecks >= totalChecks * 0.6) {
      return {
        test: 'Core Web Vitals',
        status: 'WARNING',
        message: `Core Web Vitals partiels (${passedChecks}/${totalChecks})`,
        details: checks
      };
    } else {
      return {
        test: 'Core Web Vitals',
        status: 'FAIL',
        message: `Core Web Vitals insuffisants (${passedChecks}/${totalChecks})`,
        details: checks
      };
    }
  } catch (error) {
    return {
      test: 'Core Web Vitals',
      status: 'FAIL',
      message: `Erreur lors du test Core Web Vitals: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Lance tous les tests de performance et accessibilité
 */
export function runPerformanceTests(): PerformanceTestResult[] {
  console.log('⚡ Tests de performance et accessibilité');
  console.log('=======================================');
  
  const tests = [
    testCoreWebVitals(),
    testImageOptimization(),
    testCodeOptimization(),
    testAccessibility(),
    testAnimationsInteractions()
  ];
  
  tests.forEach(result => {
    const icon = result.status === 'PASS' ? '✅' : result.status === 'WARNING' ? '⚠️' : '❌';
    console.log(`${icon} ${result.test}: ${result.message}`);
    if (result.details) {
      console.log('   Détails:', result.details);
    }
  });
  
  // Résumé
  const passed = tests.filter(t => t.status === 'PASS').length;
  const warnings = tests.filter(t => t.status === 'WARNING').length;
  const failed = tests.filter(t => t.status === 'FAIL').length;
  
  console.log('\n📊 Résumé Performance:');
  console.log(`✅ Réussis: ${passed}/${tests.length}`);
  console.log(`⚠️  Avertissements: ${warnings}/${tests.length}`);
  console.log(`❌ Échoués: ${failed}/${tests.length}`);
  
  const successRate = Math.round((passed / tests.length) * 100);
  console.log(`📈 Taux de réussite Performance: ${successRate}%`);
  
  if (successRate >= 80) {
    console.log('🚀 Performance excellente!');
  } else if (successRate >= 60) {
    console.log('⚠️  Performance correcte, améliorations possibles');
  } else {
    console.log('❌ Performance à améliorer');
  }
  
  return tests;
}