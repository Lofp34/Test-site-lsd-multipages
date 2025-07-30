#!/usr/bin/env tsx

/**
 * Script de test pour le générateur de rapports d'audit
 */

import { ReportGenerator } from '../src/lib/audit/report-generator';
import { HTMLReportGenerator } from '../src/lib/audit/html-report-generator';
import { CSVExportGenerator } from '../src/lib/audit/csv-export-generator';
import { 
  AuditReport, 
  ValidationResult, 
  ScannedLink, 
  CorrectionResult,
  BrokenLinkDetail,
  SEOImpactAnalysis
} from '../src/lib/audit/types';

// Données de test
const mockValidationResults: ValidationResult[] = [
  {
    url: 'https://example.com/page1',
    status: 'valid',
    statusCode: 200,
    responseTime: 150,
    lastChecked: new Date()
  },
  {
    url: 'https://example.com/broken-page',
    status: 'broken',
    statusCode: 404,
    error: 'Page not found',
    responseTime: 300,
    lastChecked: new Date()
  },
  {
    url: '/internal/missing-page',
    status: 'broken',
    statusCode: 404,
    error: 'Internal page not found',
    responseTime: 100,
    lastChecked: new Date()
  },
  {
    url: '/downloads/missing-file.pdf',
    status: 'broken',
    statusCode: 404,
    error: 'File not found',
    responseTime: 50,
    lastChecked: new Date()
  },
  {
    url: 'https://external-site.com/timeout',
    status: 'timeout',
    error: 'Request timeout',
    responseTime: 5000,
    lastChecked: new Date()
  }
];

const mockScannedLinks: ScannedLink[] = [
  {
    url: 'https://example.com/page1',
    sourceFile: 'src/app/page.tsx',
    sourceLine: 25,
    linkType: 'external',
    context: '<Link href="https://example.com/page1">',
    priority: 'medium'
  },
  {
    url: 'https://example.com/broken-page',
    sourceFile: 'src/app/about/page.tsx',
    sourceLine: 15,
    linkType: 'external',
    context: '<a href="https://example.com/broken-page">',
    priority: 'high'
  },
  {
    url: '/internal/missing-page',
    sourceFile: 'src/components/Navigation.tsx',
    sourceLine: 42,
    linkType: 'internal',
    context: '<Link href="/internal/missing-page">',
    priority: 'critical'
  },
  {
    url: '/internal/missing-page',
    sourceFile: 'src/app/services/page.tsx',
    sourceLine: 18,
    linkType: 'internal',
    context: '<Link href="/internal/missing-page">',
    priority: 'critical'
  },
  {
    url: '/downloads/missing-file.pdf',
    sourceFile: 'src/app/resources/page.tsx',
    sourceLine: 33,
    linkType: 'download',
    context: '<a href="/downloads/missing-file.pdf" download>',
    priority: 'high'
  },
  {
    url: 'https://external-site.com/timeout',
    sourceFile: 'src/app/blog/page.tsx',
    sourceLine: 67,
    linkType: 'external',
    context: '<a href="https://external-site.com/timeout">',
    priority: 'low'
  }
];

const mockCorrections: CorrectionResult[] = [
  {
    applied: true,
    originalUrl: '/old-page',
    newUrl: '/new-page',
    filePath: 'src/app/page.tsx',
    backupCreated: true,
    rollbackId: 'rollback-001'
  },
  {
    applied: false,
    originalUrl: '/complex-broken-link',
    newUrl: '/suggested-fix',
    filePath: 'src/components/Footer.tsx',
    backupCreated: false,
    rollbackId: 'rollback-002'
  }
];

async function testReportGeneration() {
  console.log('🧪 Test du générateur de rapports d\'audit\n');

  try {
    // Vérifier les variables d'environnement
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.log('⚠️  Variables Supabase manquantes, test en mode mock');
      // Créer un rapport mock directement
      const mockReport: AuditReport = {
        timestamp: new Date(),
        summary: {
          totalLinks: mockValidationResults.length,
          validLinks: mockValidationResults.filter(r => r.status === 'valid').length,
          brokenLinks: mockValidationResults.filter(r => r.status === 'broken').length,
          correctedLinks: mockCorrections.filter(c => c.applied).length,
          pendingLinks: mockValidationResults.filter(r => ['timeout', 'unknown'].includes(r.status)).length,
          seoHealthScore: 75
        },
        brokenLinks: [
          {
            url: '/internal/missing-page',
            sourceFiles: ['src/components/Navigation.tsx', 'src/app/services/page.tsx'],
            linkType: 'internal',
            priority: 'critical',
            error: 'Internal page not found',
            suggestedActions: ['Vérifier si la page a été déplacée', 'Créer une redirection 301'],
            seoImpact: 24
          },
          {
            url: '/downloads/missing-file.pdf',
            sourceFiles: ['src/app/resources/page.tsx'],
            linkType: 'download',
            priority: 'high',
            error: 'File not found',
            suggestedActions: ['Vérifier si le fichier existe', 'Créer une page temporaire'],
            seoImpact: 12
          }
        ],
        corrections: mockCorrections,
        recommendations: ['Test recommendation 1', 'Test recommendation 2'],
        seoImpact: {
          criticalIssues: 1,
          estimatedTrafficLoss: 3.2,
          affectedPages: ['src/components/Navigation.tsx'],
          priorityActions: ['Corriger 1 lien critique'],
          linkHealthScore: 75
        },
        resourceRequests: {
          totalRequests: 5,
          mostRequested: [{ url: '/test-resource', count: 3 }]
        }
      };
      
      await testWithMockReport(mockReport);
      return;
    }

    // Initialiser le générateur
    const reportGenerator = new ReportGenerator();
    
    console.log('📊 Génération du rapport...');
    
    // Générer le rapport
    const report = await reportGenerator.generateReport(
      mockValidationResults,
      mockScannedLinks,
      mockCorrections
    );

    console.log('✅ Rapport généré avec succès');
    console.log(`   - Total des liens: ${report.summary.totalLinks}`);
    console.log(`   - Liens morts: ${report.summary.brokenLinks}`);
    console.log(`   - Score de santé SEO: ${report.summary.seoHealthScore}%`);
    console.log(`   - Problèmes critiques: ${report.seoImpact.criticalIssues}`);

    // Test export JSON
    console.log('\n📄 Test export JSON...');
    const jsonPath = await reportGenerator.exportToJSON(report);
    console.log(`✅ Rapport JSON exporté: ${jsonPath}`);

    // Test export HTML
    console.log('\n🌐 Test export HTML...');
    const htmlPath = await reportGenerator.exportToHTML(report);
    console.log(`✅ Rapport HTML exporté: ${htmlPath}`);

    // Test export CSV
    console.log('\n📊 Test export CSV...');
    const csvPath = await reportGenerator.exportToCSV(report);
    console.log(`✅ Rapport CSV exporté: ${csvPath}`);

    // Test génération de tous les formats
    console.log('\n🎯 Test génération complète...');
    const allFormats = await reportGenerator.generateAllFormats(report);
    console.log('✅ Tous les formats générés:');
    console.log(`   - JSON: ${allFormats.json}`);
    console.log(`   - HTML: ${allFormats.html}`);
    console.log(`   - CSV complet: ${allFormats.csv.complete}`);
    console.log(`   - CSV liens morts: ${allFormats.csv.brokenLinks}`);
    console.log(`   - CSV corrections: ${allFormats.csv.corrections}`);
    console.log(`   - CSV statistiques: ${allFormats.csv.performanceStats}`);
    console.log(`   - CSV par page: ${allFormats.csv.byPage}`);

    // Afficher les exports par priorité et type
    console.log('\n📋 Exports spécialisés:');
    Object.entries(allFormats.csv.byPriority).forEach(([priority, path]) => {
      console.log(`   - Priorité ${priority}: ${path}`);
    });
    Object.entries(allFormats.csv.byType).forEach(([type, path]) => {
      console.log(`   - Type ${type}: ${path}`);
    });

    console.log('\n🎉 Tous les tests sont passés avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
    process.exit(1);
  }
}

async function testWithMockReport(report: AuditReport) {
  console.log('✅ Rapport mock créé');
  console.log(`   - Total des liens: ${report.summary.totalLinks}`);
  console.log(`   - Liens morts: ${report.summary.brokenLinks}`);
  console.log(`   - Score de santé SEO: ${report.summary.seoHealthScore}%`);
  console.log(`   - Problèmes critiques: ${report.seoImpact.criticalIssues}`);

  // Test export HTML
  console.log('\n🌐 Test export HTML...');
  const htmlGenerator = new HTMLReportGenerator();
  const htmlPath = await htmlGenerator.generateHTMLReport(report);
  console.log(`✅ Rapport HTML exporté: ${htmlPath}`);

  // Test export CSV
  console.log('\n📊 Test export CSV...');
  const csvGenerator = new CSVExportGenerator();
  const csvPath = await csvGenerator.exportToCSV(report);
  console.log(`✅ Rapport CSV exporté: ${csvPath}`);

  // Test export JSON
  console.log('\n📄 Test export JSON...');
  const timestamp = report.timestamp.toISOString().replace(/[:.]/g, '-');
  const jsonPath = `reports/mock-audit-report-${timestamp}.json`;
  const fs = await import('fs/promises');
  const path = await import('path');
  
  const dir = path.dirname(jsonPath);
  await fs.mkdir(dir, { recursive: true });
  const jsonContent = JSON.stringify(report, null, 2);
  await fs.writeFile(jsonPath, jsonContent, 'utf-8');
  console.log(`✅ Rapport JSON exporté: ${jsonPath}`);
}

async function testCSVExportOnly() {
  console.log('\n🧪 Test spécifique des exports CSV\n');

  try {
    const csvGenerator = new CSVExportGenerator();
    
    // Créer des données de test pour les liens morts
    const mockBrokenLinks: BrokenLinkDetail[] = [
      {
        url: '/internal/missing-page',
        sourceFiles: ['src/components/Navigation.tsx', 'src/app/services/page.tsx'],
        linkType: 'internal',
        priority: 'critical',
        error: 'Page not found (404)',
        suggestedActions: [
          'Vérifier si la page a été déplacée',
          'Créer une redirection 301',
          'PRIORITÉ CRITIQUE - Corriger immédiatement'
        ],
        seoImpact: 24,
        lastWorking: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Il y a 7 jours
      },
      {
        url: '/downloads/missing-file.pdf',
        sourceFiles: ['src/app/resources/page.tsx'],
        linkType: 'download',
        priority: 'high',
        error: 'File not found (404)',
        suggestedActions: [
          'Vérifier si le fichier existe dans le dossier public',
          'Créer une page temporaire "Ressource en développement"'
        ],
        seoImpact: 12
      },
      {
        url: 'https://example.com/broken-page',
        sourceFiles: ['src/app/about/page.tsx'],
        linkType: 'external',
        priority: 'medium',
        error: 'Page not found (404)',
        suggestedActions: [
          'Vérifier si la page a été déplacée',
          'Rechercher une URL alternative'
        ],
        seoImpact: 6
      }
    ];

    // Test export par priorité
    console.log('📊 Test export par priorité...');
    const criticalPath = await csvGenerator.exportByPriorityToCSV(
      mockBrokenLinks, 
      'critical'
    );
    console.log(`✅ Export priorité critique: ${criticalPath}`);

    // Test export par type
    console.log('\n📊 Test export par type...');
    const internalPath = await csvGenerator.exportByTypeToCSV(
      mockBrokenLinks, 
      'internal'
    );
    console.log(`✅ Export liens internes: ${internalPath}`);

    // Test export par page
    console.log('\n📊 Test export par page...');
    const byPagePath = await csvGenerator.exportByPageToCSV(mockBrokenLinks);
    console.log(`✅ Export par page: ${byPagePath}`);

    // Test avec options personnalisées
    console.log('\n📊 Test avec options personnalisées...');
    const customPath = await csvGenerator.exportBrokenLinksToCSV(
      mockBrokenLinks,
      'reports/custom-export.csv',
      {
        delimiter: ';',
        dateFormat: 'iso',
        includeHeaders: true
      }
    );
    console.log(`✅ Export personnalisé: ${customPath}`);

    console.log('\n🎉 Tests CSV terminés avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors du test CSV:', error);
    process.exit(1);
  }
}

async function testHTMLReportOnly() {
  console.log('\n🧪 Test spécifique du rapport HTML\n');

  try {
    const htmlGenerator = new HTMLReportGenerator();
    
    // Créer un rapport de test
    const mockReport: AuditReport = {
      timestamp: new Date(),
      summary: {
        totalLinks: 100,
        validLinks: 85,
        brokenLinks: 12,
        correctedLinks: 2,
        pendingLinks: 1,
        seoHealthScore: 87
      },
      brokenLinks: [
        {
          url: '/internal/missing-page',
          sourceFiles: ['src/components/Navigation.tsx', 'src/app/services/page.tsx'],
          linkType: 'internal',
          priority: 'critical',
          error: 'Page not found (404)',
          suggestedActions: [
            'Vérifier si la page a été déplacée',
            'Créer une redirection 301',
            'PRIORITÉ CRITIQUE - Corriger immédiatement'
          ],
          seoImpact: 24
        },
        {
          url: '/downloads/guide.pdf',
          sourceFiles: ['src/app/resources/page.tsx'],
          linkType: 'download',
          priority: 'high',
          error: 'File not found (404)',
          suggestedActions: [
            'Vérifier si le fichier existe',
            'Créer une page temporaire'
          ],
          seoImpact: 12
        }
      ],
      corrections: mockCorrections,
      recommendations: [
        'Score de santé des liens acceptable mais peut être amélioré',
        'Liens critiques détectés - intervention immédiate requise',
        'Mettre en place des redirections 301 pour les liens internes cassés'
      ],
      seoImpact: {
        criticalIssues: 1,
        estimatedTrafficLoss: 3.2,
        affectedPages: ['src/components/Navigation.tsx', 'src/app/services/page.tsx'],
        priorityActions: [
          'Corriger immédiatement 1 liens critiques',
          'Réparer 1 liens internes cassés (impact SEO élevé)'
        ],
        linkHealthScore: 87
      },
      resourceRequests: {
        totalRequests: 5,
        mostRequested: [
          { url: '/downloads/guide.pdf', count: 3 },
          { url: '/resources/template.docx', count: 2 }
        ]
      }
    };

    console.log('🌐 Génération du rapport HTML...');
    const htmlPath = await htmlGenerator.generateHTMLReport(mockReport);
    console.log(`✅ Rapport HTML généré: ${htmlPath}`);
    console.log('💡 Ouvrez le fichier dans votre navigateur pour voir le rapport interactif');

    console.log('\n🎉 Test HTML terminé avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors du test HTML:', error);
    process.exit(1);
  }
}

// Exécuter les tests
async function runAllTests() {
  await testReportGeneration();
  await testCSVExportOnly();
  await testHTMLReportOnly();
  
  console.log('\n🏆 Tous les tests du générateur de rapports sont passés !');
  console.log('\n📁 Vérifiez le dossier "reports/" pour voir tous les fichiers générés');
}

// Exécuter directement
runAllTests().catch(console.error);