/**
 * Tests de fonctionnement pour la section Mindset & Performance
 * Vérifie l'existence des fichiers, la structure et la cohérence
 * Inclut des tests de navigation, responsive et fonctionnalité
 */

import fs from 'fs';
import path from 'path';

interface TestResult {
  test: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  message: string;
  details?: any;
}

interface PageTestResult {
  url: string;
  filePath: string;
  results: TestResult[];
}

// Pages à tester avec leurs chemins de fichiers
const MINDSET_PERFORMANCE_PAGES = [
  {
    url: '/ressources/meilleurs-livres/mindset-performance',
    filePath: 'src/app/ressources/meilleurs-livres/mindset-performance/page.tsx'
  },
  {
    url: '/ressources/meilleurs-livres/mindset-performance/atomic-habits',
    filePath: 'src/app/ressources/meilleurs-livres/mindset-performance/atomic-habits/page.tsx'
  },
  {
    url: '/ressources/meilleurs-livres/mindset-performance/7-habitudes-gens-efficaces',
    filePath: 'src/app/ressources/meilleurs-livres/mindset-performance/7-habitudes-gens-efficaces/page.tsx'
  },
  {
    url: '/ressources/meilleurs-livres/mindset-performance/mindset',
    filePath: 'src/app/ressources/meilleurs-livres/mindset-performance/mindset-new-psychology-success/page.tsx'
  },
  {
    url: '/ressources/meilleurs-livres/mindset-performance/grit-power-passion-perseverance',
    filePath: 'src/app/ressources/meilleurs-livres/mindset-performance/grit-power-passion-perseverance/page.tsx'
  },
  {
    url: '/ressources/meilleurs-livres/mindset-performance/deep-work',
    filePath: 'src/app/ressources/meilleurs-livres/mindset-performance/deep-work/page.tsx'
  },
  {
    url: '/ressources/meilleurs-livres/mindset-performance/cant-hurt-me',
    filePath: 'src/app/ressources/meilleurs-livres/mindset-performance/cant-hurt-me/page.tsx'
  },
  {
    url: '/ressources/meilleurs-livres/mindset-performance/the-power-of-now',
    filePath: 'src/app/ressources/meilleurs-livres/mindset-performance/the-power-of-now/page.tsx'
  },
  {
    url: '/ressources/meilleurs-livres/mindset-performance/peak-performance',
    filePath: 'src/app/ressources/meilleurs-livres/mindset-performance/peak-performance/page.tsx'
  }
];

/**
 * Teste l'existence et la structure d'un fichier de page
 */
function testFileExists(filePath: string): TestResult {
  try {
    const fullPath = path.resolve(filePath);
    
    if (!fs.existsSync(fullPath)) {
      return {
        test: 'File Existence',
        status: 'FAIL',
        message: `Fichier manquant: ${filePath}`
      };
    }
    
    const stats = fs.statSync(fullPath);
    if (stats.size === 0) {
      return {
        test: 'File Existence',
        status: 'FAIL',
        message: `Fichier vide: ${filePath}`
      };
    }
    
    return {
      test: 'File Existence',
      status: 'PASS',
      message: `Fichier présent (${Math.round(stats.size / 1024)}KB)`
    };
  } catch (error) {
    return {
      test: 'File Existence',
      status: 'FAIL',
      message: `Erreur d'accès au fichier: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Teste les métadonnées SEO dans le code source
 */
function testSEOMetadata(filePath: string): TestResult {
  try {
    if (!fs.existsSync(filePath)) {
      return {
        test: 'SEO Metadata',
        status: 'FAIL',
        message: 'Fichier inexistant'
      };
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const checks = {
      hasMetadata: content.includes('export const metadata') || content.includes('Metadata'),
      hasTitle: content.includes('title:') || content.includes('<title>'),
      hasDescription: content.includes('description:') || content.includes('name="description"'),
      hasOpenGraph: content.includes('openGraph:') || content.includes('og:'),
      hasStructuredData: content.includes('application/ld+json') || content.includes('structuredData'),
      hasCanonical: content.includes('canonical') || content.includes('alternates')
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    if (passedChecks >= totalChecks * 0.8) {
      return {
        test: 'SEO Metadata',
        status: 'PASS',
        message: `Métadonnées SEO présentes (${passedChecks}/${totalChecks})`
      };
    } else if (passedChecks >= totalChecks * 0.5) {
      return {
        test: 'SEO Metadata',
        status: 'WARNING',
        message: `Métadonnées partielles (${passedChecks}/${totalChecks})`,
        details: checks
      };
    } else {
      return {
        test: 'SEO Metadata',
        status: 'FAIL',
        message: `Métadonnées insuffisantes (${passedChecks}/${totalChecks})`,
        details: checks
      };
    }
  } catch (error) {
    return {
      test: 'SEO Metadata',
      status: 'FAIL',
      message: `Erreur lors du test SEO: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Teste la navigation et les liens internes dans le code source
 */
function testNavigation(filePath: string): TestResult {
  try {
    if (!fs.existsSync(filePath)) {
      return {
        test: 'Navigation',
        status: 'FAIL',
        message: 'Fichier inexistant'
      };
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const checks = {
      breadcrumb: content.includes('CategoryBreadcrumb') || content.includes('breadcrumb'),
      internalLinks: content.includes('href="/ressources/meilleurs-livres/') || content.includes('Link'),
      backToCategory: content.includes('/mindset-performance') || content.includes('category'),
      crossCategorySuggestions: content.includes('suggestions') || content.includes('CrossCategory') || content.includes('relatedCategories')
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    if (passedChecks >= totalChecks * 0.7) {
      return {
        test: 'Navigation',
        status: 'PASS',
        message: `Navigation implémentée (${passedChecks}/${totalChecks})`
      };
    } else if (passedChecks >= totalChecks * 0.5) {
      return {
        test: 'Navigation',
        status: 'WARNING',
        message: `Navigation partielle (${passedChecks}/${totalChecks})`,
        details: checks
      };
    } else {
      return {
        test: 'Navigation',
        status: 'FAIL',
        message: `Navigation insuffisante (${passedChecks}/${totalChecks})`,
        details: checks
      };
    }
  } catch (error) {
    return {
      test: 'Navigation',
      status: 'FAIL',
      message: `Erreur lors du test de navigation: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Teste l'affichage responsive dans le code source
 */
function testResponsive(filePath: string): TestResult {
  try {
    if (!fs.existsSync(filePath)) {
      return {
        test: 'Responsive Design',
        status: 'FAIL',
        message: 'Fichier inexistant'
      };
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const checks = {
      viewport: content.includes('viewport') || content.includes('responsive'),
      tailwindResponsive: content.includes('md:') || content.includes('lg:') || content.includes('sm:'),
      flexboxGrid: content.includes('flex') || content.includes('grid'),
      mobileOptimized: content.includes('mobile') || content.includes('max-w-') || content.includes('px-4')
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    if (passedChecks >= totalChecks * 0.7) {
      return {
        test: 'Responsive Design',
        status: 'PASS',
        message: `Design responsive implémenté (${passedChecks}/${totalChecks})`
      };
    } else if (passedChecks >= totalChecks * 0.5) {
      return {
        test: 'Responsive Design',
        status: 'WARNING',
        message: `Design partiellement responsive (${passedChecks}/${totalChecks})`,
        details: checks
      };
    } else {
      return {
        test: 'Responsive Design',
        status: 'FAIL',
        message: `Design non responsive (${passedChecks}/${totalChecks})`,
        details: checks
      };
    }
  } catch (error) {
    return {
      test: 'Responsive Design',
      status: 'FAIL',
      message: `Erreur lors du test responsive: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Teste la cohérence du contenu et la structure de la page
 */
function testContentStructure(filePath: string): TestResult {
  try {
    if (!fs.existsSync(filePath)) {
      return {
        test: 'Content Structure',
        status: 'FAIL',
        message: 'Fichier inexistant'
      };
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const checks = {
      hasMainElement: content.includes('<main') || content.includes('main className'),
      hasHeadings: content.includes('<h1') || content.includes('<h2') || content.includes('text-'),
      hasArticleStructure: content.includes('<article') || content.includes('<section'),
      hasAccessibleContent: content.includes('alt=') || content.includes('aria-') || content.includes('role='),
      hasProperExport: content.includes('export default') && content.includes('function'),
      hasImports: content.includes('import') && (content.includes('next/') || content.includes('react'))
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    if (passedChecks >= totalChecks * 0.8) {
      return {
        test: 'Content Structure',
        status: 'PASS',
        message: `Structure de contenu valide (${passedChecks}/${totalChecks})`
      };
    } else if (passedChecks >= totalChecks * 0.6) {
      return {
        test: 'Content Structure',
        status: 'WARNING',
        message: `Structure partiellement valide (${passedChecks}/${totalChecks})`,
        details: checks
      };
    } else {
      return {
        test: 'Content Structure',
        status: 'FAIL',
        message: `Structure de contenu insuffisante (${passedChecks}/${totalChecks})`,
        details: checks
      };
    }
  } catch (error) {
    return {
      test: 'Content Structure',
      status: 'FAIL',
      message: `Erreur lors du test de structure: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Teste la cohérence thématique Mindset & Performance
 */
function testThematicConsistency(filePath: string): TestResult {
  try {
    if (!fs.existsSync(filePath)) {
      return {
        test: 'Thematic Consistency',
        status: 'FAIL',
        message: 'Fichier inexistant'
      };
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const lowerContent = content.toLowerCase();
    
    // Mots-clés spécifiques à la thématique Mindset & Performance
    const mindsetKeywords = [
      'mindset', 'performance', 'habitudes', 'développement personnel',
      'psychologie', 'résilience', 'motivation', 'efficacité',
      'croissance', 'état d\'esprit', 'persévérance', 'concentration'
    ];
    
    const foundKeywords = mindsetKeywords.filter(keyword => 
      lowerContent.includes(keyword.toLowerCase())
    );
    
    const checks = {
      hasThematicKeywords: foundKeywords.length >= 3,
      hasCommercialApplication: lowerContent.includes('commercial') || lowerContent.includes('vente') || lowerContent.includes('équipe'),
      hasLaurentSerreContext: lowerContent.includes('laurent serre') || lowerContent.includes('terrain') || lowerContent.includes('pme'),
      hasActionableContent: lowerContent.includes('conseil') || lowerContent.includes('application') || lowerContent.includes('pratique'),
      hasBookReference: lowerContent.includes('livre') || lowerContent.includes('auteur') || lowerContent.includes('résumé')
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    if (passedChecks >= totalChecks * 0.8) {
      return {
        test: 'Thematic Consistency',
        status: 'PASS',
        message: `Cohérence thématique validée (${foundKeywords.length} mots-clés trouvés)`
      };
    } else if (passedChecks >= totalChecks * 0.6) {
      return {
        test: 'Thematic Consistency',
        status: 'WARNING',
        message: `Cohérence partielle (${foundKeywords.length} mots-clés)`,
        details: { foundKeywords, checks }
      };
    } else {
      return {
        test: 'Thematic Consistency',
        status: 'FAIL',
        message: `Cohérence thématique insuffisante (${foundKeywords.length} mots-clés)`,
        details: { foundKeywords, checks }
      };
    }
  } catch (error) {
    return {
      test: 'Thematic Consistency',
      status: 'FAIL',
      message: `Erreur lors du test thématique: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Teste une page complètement
 */
function testPage(pageInfo: { url: string; filePath: string }): PageTestResult {
  console.log(`🧪 Test de la page: ${pageInfo.url}`);
  
  const results: TestResult[] = [];
  
  // Tests séquentiels
  results.push(testFileExists(pageInfo.filePath));
  results.push(testSEOMetadata(pageInfo.filePath));
  results.push(testNavigation(pageInfo.filePath));
  results.push(testResponsive(pageInfo.filePath));
  results.push(testContentStructure(pageInfo.filePath));
  results.push(testThematicConsistency(pageInfo.filePath));
  
  return {
    url: pageInfo.url,
    filePath: pageInfo.filePath,
    results
  };
}

/**
 * Lance tous les tests pour la section Mindset & Performance
 */
export function runMindsetPerformanceTests(): PageTestResult[] {
  console.log('🚀 Début des tests Mindset & Performance');
  console.log('=====================================');
  
  const allResults: PageTestResult[] = [];
  
  for (const pageInfo of MINDSET_PERFORMANCE_PAGES) {
    const pageResult = testPage(pageInfo);
    allResults.push(pageResult);
    
    // Affichage des résultats
    console.log(`\n📄 ${pageInfo.url}`);
    console.log(`   📁 ${pageInfo.filePath}`);
    pageResult.results.forEach(result => {
      const icon = result.status === 'PASS' ? '✅' : result.status === 'WARNING' ? '⚠️' : '❌';
      console.log(`  ${icon} ${result.test}: ${result.message}`);
      if (result.details) {
        console.log(`     Détails:`, result.details);
      }
    });
  }
  
  // Résumé global
  console.log('\n📊 RÉSUMÉ GLOBAL');
  console.log('================');
  
  let totalTests = 0;
  let passedTests = 0;
  let warningTests = 0;
  let failedTests = 0;
  
  allResults.forEach(pageResult => {
    pageResult.results.forEach(result => {
      totalTests++;
      if (result.status === 'PASS') passedTests++;
      else if (result.status === 'WARNING') warningTests++;
      else failedTests++;
    });
  });
  
  console.log(`✅ Tests réussis: ${passedTests}/${totalTests}`);
  console.log(`⚠️  Avertissements: ${warningTests}/${totalTests}`);
  console.log(`❌ Tests échoués: ${failedTests}/${totalTests}`);
  
  const successRate = Math.round((passedTests / totalTests) * 100);
  console.log(`📈 Taux de réussite: ${successRate}%`);
  
  if (successRate >= 80) {
    console.log('🎉 Section Mindset & Performance: Tests globalement réussis!');
  } else if (successRate >= 60) {
    console.log('⚠️  Section Mindset & Performance: Améliorations nécessaires');
  } else {
    console.log('❌ Section Mindset & Performance: Corrections urgentes requises');
  }
  
  return allResults;
}

/**
 * Fonction utilitaire pour tester une page spécifique
 */
export function testSpecificPage(url: string): void {
  const pageInfo = MINDSET_PERFORMANCE_PAGES.find(p => p.url === url);
  
  if (!pageInfo) {
    console.log(`❌ URL non trouvée: ${url}`);
    console.log('URLs disponibles:');
    MINDSET_PERFORMANCE_PAGES.forEach(p => console.log(`  - ${p.url}`));
    return;
  }
  
  const result = testPage(pageInfo);
  
  console.log(`\n📄 Test de: ${url}`);
  console.log(`📁 Fichier: ${pageInfo.filePath}`);
  console.log('='.repeat(50));
  
  result.results.forEach(test => {
    const icon = test.status === 'PASS' ? '✅' : test.status === 'WARNING' ? '⚠️' : '❌';
    console.log(`${icon} ${test.test}: ${test.message}`);
    if (test.details) {
      console.log('   Détails:', test.details);
    }
  });
}

/**
 * Teste la navigation entre les pages de la section
 */
function testCrossPageNavigation(): TestResult {
  try {
    const categoryPage = MINDSET_PERFORMANCE_PAGES[0]; // Page principale
    const bookPages = MINDSET_PERFORMANCE_PAGES.slice(1); // Pages des livres
    
    if (!fs.existsSync(categoryPage.filePath)) {
      return {
        test: 'Cross-Page Navigation',
        status: 'FAIL',
        message: 'Page catégorie manquante'
      };
    }
    
    const categoryContent = fs.readFileSync(categoryPage.filePath, 'utf-8');
    
    // Vérifier que la page catégorie contient des liens vers les livres
    const bookLinksFound = bookPages.filter(book => {
      const bookSlug = book.url.split('/').pop();
      return categoryContent.includes(bookSlug || '');
    });
    
    // Vérifier les liens retour vers la catégorie dans les pages de livres
    const backLinksFound = bookPages.filter(book => {
      if (!fs.existsSync(book.filePath)) return false;
      const bookContent = fs.readFileSync(book.filePath, 'utf-8');
      return bookContent.includes('/mindset-performance') || bookContent.includes('CategoryBreadcrumb');
    });
    
    const checks = {
      categoryLinksToBooks: bookLinksFound.length >= bookPages.length * 0.8,
      booksLinkBackToCategory: backLinksFound.length >= bookPages.length * 0.5,
      hasConsistentNavigation: categoryContent.includes('Link') || categoryContent.includes('href=')
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    if (passedChecks >= totalChecks * 0.8) {
      return {
        test: 'Cross-Page Navigation',
        status: 'PASS',
        message: `Navigation inter-pages fonctionnelle (${bookLinksFound.length}/${bookPages.length} liens trouvés)`
      };
    } else if (passedChecks >= totalChecks * 0.5) {
      return {
        test: 'Cross-Page Navigation',
        status: 'WARNING',
        message: `Navigation partielle (${bookLinksFound.length}/${bookPages.length} liens)`,
        details: { bookLinksFound: bookLinksFound.length, backLinksFound: backLinksFound.length, checks }
      };
    } else {
      return {
        test: 'Cross-Page Navigation',
        status: 'FAIL',
        message: `Navigation insuffisante (${bookLinksFound.length}/${bookPages.length} liens)`,
        details: { bookLinksFound: bookLinksFound.length, backLinksFound: backLinksFound.length, checks }
      };
    }
  } catch (error) {
    return {
      test: 'Cross-Page Navigation',
      status: 'FAIL',
      message: `Erreur lors du test de navigation: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Teste l'intégration avec la structure globale du site
 */
function testSiteIntegration(): TestResult {
  try {
    // Vérifier l'intégration dans les données de livres
    const booksDataPath = 'src/data/books.ts';
    const booksEnrichedPath = 'src/data/books-enriched.ts';
    
    const checks = {
      booksDataExists: fs.existsSync(booksDataPath),
      booksEnrichedExists: fs.existsSync(booksEnrichedPath),
      categoryInBooksData: false,
      categoryInEnrichedData: false
    };
    
    if (checks.booksDataExists) {
      const booksContent = fs.readFileSync(booksDataPath, 'utf-8');
      checks.categoryInBooksData = booksContent.includes('mindset-performance') || booksContent.includes('Mindset');
    }
    
    if (checks.booksEnrichedExists) {
      const enrichedContent = fs.readFileSync(booksEnrichedPath, 'utf-8');
      checks.categoryInEnrichedData = enrichedContent.includes('mindset-performance') || enrichedContent.includes('Mindset');
    }
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    if (passedChecks >= totalChecks * 0.8) {
      return {
        test: 'Site Integration',
        status: 'PASS',
        message: `Intégration site validée (${passedChecks}/${totalChecks})`
      };
    } else if (passedChecks >= totalChecks * 0.5) {
      return {
        test: 'Site Integration',
        status: 'WARNING',
        message: `Intégration partielle (${passedChecks}/${totalChecks})`,
        details: checks
      };
    } else {
      return {
        test: 'Site Integration',
        status: 'FAIL',
        message: `Intégration insuffisante (${passedChecks}/${totalChecks})`,
        details: checks
      };
    }
  } catch (error) {
    return {
      test: 'Site Integration',
      status: 'FAIL',
      message: `Erreur lors du test d'intégration: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Teste la performance et l'optimisation des pages
 */
function testPerformanceOptimization(): TestResult {
  try {
    const results = {
      totalSize: 0,
      pageCount: 0,
      largePages: 0,
      emptyPages: 0,
      optimizedImages: 0,
      totalImages: 0
    };
    
    MINDSET_PERFORMANCE_PAGES.forEach(page => {
      if (fs.existsSync(page.filePath)) {
        const stats = fs.statSync(page.filePath);
        const content = fs.readFileSync(page.filePath, 'utf-8');
        
        results.totalSize += stats.size;
        results.pageCount++;
        
        if (stats.size > 50000) results.largePages++; // Pages > 50KB
        if (stats.size === 0) results.emptyPages++;
        
        // Compter les images et vérifier l'optimisation
        const imageMatches = content.match(/\.(jpg|jpeg|png|webp|avif)/gi) || [];
        results.totalImages += imageMatches.length;
        
        const optimizedMatches = content.match(/\.(webp|avif)/gi) || [];
        results.optimizedImages += optimizedMatches.length;
      }
    });
    
    const avgSize = results.pageCount > 0 ? results.totalSize / results.pageCount : 0;
    const optimizationRate = results.totalImages > 0 ? (results.optimizedImages / results.totalImages) * 100 : 100;
    
    const checks = {
      reasonableSize: avgSize < 100000, // Taille moyenne < 100KB
      noEmptyPages: results.emptyPages === 0,
      goodImageOptimization: optimizationRate >= 50,
      noOversizedPages: results.largePages <= results.pageCount * 0.2
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    if (passedChecks >= totalChecks * 0.8) {
      return {
        test: 'Performance Optimization',
        status: 'PASS',
        message: `Performance optimisée (taille moy: ${Math.round(avgSize/1024)}KB)`
      };
    } else if (passedChecks >= totalChecks * 0.6) {
      return {
        test: 'Performance Optimization',
        status: 'WARNING',
        message: `Performance acceptable (${results.emptyPages} pages vides)`,
        details: { ...results, avgSizeKB: Math.round(avgSize/1024), optimizationRate: Math.round(optimizationRate) }
      };
    } else {
      return {
        test: 'Performance Optimization',
        status: 'FAIL',
        message: `Performance insuffisante (${results.emptyPages} pages vides)`,
        details: { ...results, avgSizeKB: Math.round(avgSize/1024), optimizationRate: Math.round(optimizationRate) }
      };
    }
  } catch (error) {
    return {
      test: 'Performance Optimization',
      status: 'FAIL',
      message: `Erreur lors du test de performance: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Lance des tests globaux sur la section complète
 */
export function runGlobalSectionTests(): TestResult[] {
  console.log('\n🌐 Tests globaux de la section Mindset & Performance');
  console.log('===================================================');
  
  const globalTests: TestResult[] = [];
  
  // Tests globaux
  globalTests.push(testCrossPageNavigation());
  globalTests.push(testSiteIntegration());
  globalTests.push(testPerformanceOptimization());
  
  // Affichage des résultats
  globalTests.forEach(result => {
    const icon = result.status === 'PASS' ? '✅' : result.status === 'WARNING' ? '⚠️' : '❌';
    console.log(`${icon} ${result.test}: ${result.message}`);
    if (result.details) {
      console.log('   Détails:', result.details);
    }
  });
  
  return globalTests;
}

/**
 * Lance tous les tests complets (pages individuelles + tests globaux)
 */
export function runCompleteTests(): { pageResults: PageTestResult[], globalResults: TestResult[] } {
  const pageResults = runMindsetPerformanceTests();
  const globalResults = runGlobalSectionTests();
  
  // Résumé final
  console.log('\n🎯 RÉSUMÉ FINAL COMPLET');
  console.log('======================');
  
  let totalPageTests = 0;
  let passedPageTests = 0;
  
  pageResults.forEach(pageResult => {
    pageResult.results.forEach(result => {
      totalPageTests++;
      if (result.status === 'PASS') passedPageTests++;
    });
  });
  
  const passedGlobalTests = globalResults.filter(r => r.status === 'PASS').length;
  const totalGlobalTests = globalResults.length;
  
  const overallSuccess = Math.round(((passedPageTests + passedGlobalTests) / (totalPageTests + totalGlobalTests)) * 100);
  
  console.log(`📄 Tests de pages: ${passedPageTests}/${totalPageTests} réussis`);
  console.log(`🌐 Tests globaux: ${passedGlobalTests}/${totalGlobalTests} réussis`);
  console.log(`🎯 Taux de réussite global: ${overallSuccess}%`);
  
  if (overallSuccess >= 85) {
    console.log('🎉 Section Mindset & Performance: Excellente qualité!');
  } else if (overallSuccess >= 70) {
    console.log('✅ Section Mindset & Performance: Bonne qualité, quelques améliorations possibles');
  } else if (overallSuccess >= 50) {
    console.log('⚠️  Section Mindset & Performance: Qualité correcte, améliorations nécessaires');
  } else {
    console.log('❌ Section Mindset & Performance: Qualité insuffisante, corrections urgentes');
  }
  
  return { pageResults, globalResults };
}

// Export des constantes pour utilisation externe
export { MINDSET_PERFORMANCE_PAGES };