/**
 * Tests SEO complets pour la section Mindset & Performance
 * Vérifie les métadonnées, sitemap, robots.txt, données structurées
 */

import fs from 'fs';
import path from 'path';

interface SEOTestResult {
  test: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  message: string;
  details?: any;
}

/**
 * Teste la génération du sitemap
 */
export function testSitemap(): SEOTestResult {
  try {
    // Vérifier si le fichier sitemap.ts existe
    const sitemapPath = 'src/app/sitemap.ts';
    
    if (!fs.existsSync(sitemapPath)) {
      return {
        test: 'Sitemap Generation',
        status: 'FAIL',
        message: 'Fichier sitemap.ts manquant'
      };
    }
    
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    
    const checks = {
      hasMindsetPerformance: sitemapContent.includes('mindset-performance'),
      hasBookPages: sitemapContent.includes('atomic-habits') || sitemapContent.includes('grit') || sitemapContent.includes('mindset'),
      hasMetadata: sitemapContent.includes('lastModified') || sitemapContent.includes('changeFrequency'),
      hasPriority: sitemapContent.includes('priority')
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    if (passedChecks >= totalChecks * 0.75) {
      return {
        test: 'Sitemap Generation',
        status: 'PASS',
        message: `Sitemap configuré (${passedChecks}/${totalChecks})`
      };
    } else if (passedChecks >= totalChecks * 0.5) {
      return {
        test: 'Sitemap Generation',
        status: 'WARNING',
        message: `Sitemap partiel (${passedChecks}/${totalChecks})`,
        details: checks
      };
    } else {
      return {
        test: 'Sitemap Generation',
        status: 'FAIL',
        message: `Sitemap insuffisant (${passedChecks}/${totalChecks})`,
        details: checks
      };
    }
  } catch (error) {
    return {
      test: 'Sitemap Generation',
      status: 'FAIL',
      message: `Erreur lors du test sitemap: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Teste les données structurées Schema.org
 */
export function testStructuredData(): SEOTestResult {
  try {
    const mainPagePath = 'src/app/ressources/meilleurs-livres/mindset-performance/page.tsx';
    
    if (!fs.existsSync(mainPagePath)) {
      return {
        test: 'Structured Data',
        status: 'FAIL',
        message: 'Page principale manquante'
      };
    }
    
    const content = fs.readFileSync(mainPagePath, 'utf-8');
    
    const checks = {
      hasSchemaOrg: content.includes('@context') && content.includes('schema.org'),
      hasCollectionPage: content.includes('CollectionPage'),
      hasItemList: content.includes('ItemList'),
      hasBookSchema: content.includes('"@type": "Book"'),
      hasBreadcrumb: content.includes('BreadcrumbList'),
      hasStructuredDataScript: content.includes('application/ld+json')
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    if (passedChecks >= totalChecks * 0.8) {
      return {
        test: 'Structured Data',
        status: 'PASS',
        message: `Données structurées complètes (${passedChecks}/${totalChecks})`
      };
    } else if (passedChecks >= totalChecks * 0.6) {
      return {
        test: 'Structured Data',
        status: 'WARNING',
        message: `Données structurées partielles (${passedChecks}/${totalChecks})`,
        details: checks
      };
    } else {
      return {
        test: 'Structured Data',
        status: 'FAIL',
        message: `Données structurées insuffisantes (${passedChecks}/${totalChecks})`,
        details: checks
      };
    }
  } catch (error) {
    return {
      test: 'Structured Data',
      status: 'FAIL',
      message: `Erreur lors du test données structurées: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Teste les URLs canoniques
 */
export function testCanonicalUrls(): SEOTestResult {
  try {
    const mainPagePath = 'src/app/ressources/meilleurs-livres/mindset-performance/page.tsx';
    
    if (!fs.existsSync(mainPagePath)) {
      return {
        test: 'Canonical URLs',
        status: 'FAIL',
        message: 'Page principale manquante'
      };
    }
    
    const content = fs.readFileSync(mainPagePath, 'utf-8');
    
    const checks = {
      hasCanonical: content.includes('canonical') || content.includes('alternates'),
      hasCorrectUrl: content.includes('www.laurentserre.com/ressources/meilleurs-livres/mindset-performance'),
      hasMetadataExport: content.includes('export const metadata'),
      hasAlternates: content.includes('alternates:')
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    if (passedChecks >= totalChecks * 0.75) {
      return {
        test: 'Canonical URLs',
        status: 'PASS',
        message: `URLs canoniques configurées (${passedChecks}/${totalChecks})`
      };
    } else if (passedChecks >= totalChecks * 0.5) {
      return {
        test: 'Canonical URLs',
        status: 'WARNING',
        message: `URLs canoniques partielles (${passedChecks}/${totalChecks})`,
        details: checks
      };
    } else {
      return {
        test: 'Canonical URLs',
        status: 'FAIL',
        message: `URLs canoniques manquantes (${passedChecks}/${totalChecks})`,
        details: checks
      };
    }
  } catch (error) {
    return {
      test: 'Canonical URLs',
      status: 'FAIL',
      message: `Erreur lors du test URLs canoniques: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Teste les métadonnées Open Graph
 */
export function testOpenGraph(): SEOTestResult {
  try {
    const mainPagePath = 'src/app/ressources/meilleurs-livres/mindset-performance/page.tsx';
    
    if (!fs.existsSync(mainPagePath)) {
      return {
        test: 'Open Graph',
        status: 'FAIL',
        message: 'Page principale manquante'
      };
    }
    
    const content = fs.readFileSync(mainPagePath, 'utf-8');
    
    const checks = {
      hasOpenGraph: content.includes('openGraph:'),
      hasOgTitle: content.includes('title:') && content.includes('openGraph'),
      hasOgDescription: content.includes('description:') && content.includes('openGraph'),
      hasOgImage: content.includes('images:') || content.includes('og-mindset-performance'),
      hasOgType: content.includes('type:') && content.includes('website'),
      hasOgUrl: content.includes('url:') && content.includes('mindset-performance'),
      hasTwitterCard: content.includes('twitter:') && content.includes('card:')
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    if (passedChecks >= totalChecks * 0.8) {
      return {
        test: 'Open Graph',
        status: 'PASS',
        message: `Open Graph complet (${passedChecks}/${totalChecks})`
      };
    } else if (passedChecks >= totalChecks * 0.6) {
      return {
        test: 'Open Graph',
        status: 'WARNING',
        message: `Open Graph partiel (${passedChecks}/${totalChecks})`,
        details: checks
      };
    } else {
      return {
        test: 'Open Graph',
        status: 'FAIL',
        message: `Open Graph insuffisant (${passedChecks}/${totalChecks})`,
        details: checks
      };
    }
  } catch (error) {
    return {
      test: 'Open Graph',
      status: 'FAIL',
      message: `Erreur lors du test Open Graph: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Teste les mots-clés SEO
 */
export function testSEOKeywords(): SEOTestResult {
  try {
    const mainPagePath = 'src/app/ressources/meilleurs-livres/mindset-performance/page.tsx';
    const dataPath = 'src/data/books-enriched.ts';
    
    if (!fs.existsSync(mainPagePath) || !fs.existsSync(dataPath)) {
      return {
        test: 'SEO Keywords',
        status: 'FAIL',
        message: 'Fichiers manquants pour le test'
      };
    }
    
    const pageContent = fs.readFileSync(mainPagePath, 'utf-8');
    const dataContent = fs.readFileSync(dataPath, 'utf-8');
    
    const targetKeywords = [
      'mindset commercial',
      'performance personnelle',
      'développement personnel',
      'habitudes performance',
      'atomic habits',
      'carol dweck',
      'stephen covey'
    ];
    
    const keywordsFound = targetKeywords.filter(keyword => 
      pageContent.toLowerCase().includes(keyword.toLowerCase()) ||
      dataContent.toLowerCase().includes(keyword.toLowerCase())
    );
    
    const keywordCoverage = keywordsFound.length / targetKeywords.length;
    
    if (keywordCoverage >= 0.8) {
      return {
        test: 'SEO Keywords',
        status: 'PASS',
        message: `Mots-clés SEO bien couverts (${keywordsFound.length}/${targetKeywords.length})`,
        details: { found: keywordsFound, missing: targetKeywords.filter(k => !keywordsFound.includes(k)) }
      };
    } else if (keywordCoverage >= 0.6) {
      return {
        test: 'SEO Keywords',
        status: 'WARNING',
        message: `Couverture partielle des mots-clés (${keywordsFound.length}/${targetKeywords.length})`,
        details: { found: keywordsFound, missing: targetKeywords.filter(k => !keywordsFound.includes(k)) }
      };
    } else {
      return {
        test: 'SEO Keywords',
        status: 'FAIL',
        message: `Couverture insuffisante des mots-clés (${keywordsFound.length}/${targetKeywords.length})`,
        details: { found: keywordsFound, missing: targetKeywords.filter(k => !keywordsFound.includes(k)) }
      };
    }
  } catch (error) {
    return {
      test: 'SEO Keywords',
      status: 'FAIL',
      message: `Erreur lors du test mots-clés: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
}

/**
 * Lance tous les tests SEO
 */
export function runSEOTests(): SEOTestResult[] {
  console.log('🔍 Tests SEO et métadonnées');
  console.log('===========================');
  
  const tests = [
    testSitemap(),
    testStructuredData(),
    testCanonicalUrls(),
    testOpenGraph(),
    testSEOKeywords()
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
  
  console.log('\n📊 Résumé SEO:');
  console.log(`✅ Réussis: ${passed}/${tests.length}`);
  console.log(`⚠️  Avertissements: ${warnings}/${tests.length}`);
  console.log(`❌ Échoués: ${failed}/${tests.length}`);
  
  const successRate = Math.round((passed / tests.length) * 100);
  console.log(`📈 Taux de réussite SEO: ${successRate}%`);
  
  return tests;
}