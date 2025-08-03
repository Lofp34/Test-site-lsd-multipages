#!/usr/bin/env tsx

/**
 * Script de test complet du système optimisé Vercel
 * 
 * Exécute tous les tests de performance, d'usage et de résilience
 * Génère un rapport consolidé des résultats
 */

import { execSync } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

interface TestSuite {
    name: string;
    file: string;
    timeout: number;
    critical: boolean;
}

interface TestResult {
    suite: string;
    passed: boolean;
    duration: number;
    details: string;
    errors?: string[];
}

interface SystemTestReport {
    timestamp: Date;
    totalSuites: number;
    passedSuites: number;
    failedSuites: number;
    totalDuration: number;
    results: TestResult[];
    summary: {
        loadPerformance: 'PASS' | 'FAIL';
        vercelUsage: 'PASS' | 'FAIL';
        fallbackResilience: 'PASS' | 'FAIL';
        overallStatus: 'PASS' | 'FAIL';
    };
    recommendations: string[];
}

const TEST_SUITES: TestSuite[] = [
    {
        name: 'Tests de charge et performance',
        file: 'src/__tests__/performance/load-performance.test.ts',
        timeout: 10 * 60 * 1000, // 10 minutes
        critical: true
    },
    {
        name: 'Tests d\'usage des ressources Vercel',
        file: 'src/__tests__/performance/vercel-usage.test.ts',
        timeout: 8 * 60 * 1000, // 8 minutes
        critical: true
    },
    {
        name: 'Tests des fallbacks et résilience',
        file: 'src/__tests__/performance/fallback-resilience.test.ts',
        timeout: 12 * 60 * 1000, // 12 minutes
        critical: true
    }
];

const COLORS = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function colorize(text: string, color: keyof typeof COLORS): string {
    return `${COLORS[color]}${text}${COLORS.reset}`;
}

function formatDuration(ms: number): string {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}min`;
}

async function runTestSuite(suite: TestSuite): Promise<TestResult> {
    console.log(colorize(`\n🧪 Exécution: ${suite.name}`, 'cyan'));
    console.log(colorize(`📁 Fichier: ${suite.file}`, 'blue'));
    console.log(colorize(`⏱️  Timeout: ${formatDuration(suite.timeout)}`, 'yellow'));

    const startTime = Date.now();

    try {
        // Exécution du test avec vitest
        const command = `npx vitest run "${suite.file}" --reporter=verbose --timeout=${suite.timeout}`;
        const output = execSync(command, {
            encoding: 'utf-8',
            timeout: suite.timeout + 30000, // +30s de marge
            maxBuffer: 10 * 1024 * 1024 // 10MB buffer
        });

        const duration = Date.now() - startTime;

        console.log(colorize(`✅ ${suite.name} - RÉUSSI`, 'green'));
        console.log(colorize(`⏱️  Durée: ${formatDuration(duration)}`, 'blue'));

        return {
            suite: suite.name,
            passed: true,
            duration,
            details: output
        };

    } catch (error: any) {
        const duration = Date.now() - startTime;
        const errorOutput = error.stdout || error.stderr || error.message;

        console.log(colorize(`❌ ${suite.name} - ÉCHEC`, 'red'));
        console.log(colorize(`⏱️  Durée: ${formatDuration(duration)}`, 'blue'));
        console.log(colorize(`💥 Erreur: ${error.message}`, 'red'));

        return {
            suite: suite.name,
            passed: false,
            duration,
            details: errorOutput,
            errors: [error.message]
        };
    }
}

function generateRecommendations(results: TestResult[]): string[] {
    const recommendations: string[] = [];

    const failedSuites = results.filter(r => !r.passed);

    if (failedSuites.length === 0) {
        recommendations.push('✅ Tous les tests sont passés - Le système est prêt pour la production');
        recommendations.push('🔄 Planifier des tests de régression mensuels');
        recommendations.push('📊 Surveiller les métriques en production pendant les 30 premiers jours');
    } else {
        recommendations.push('⚠️  Des tests critiques ont échoué - Ne pas déployer en production');

        failedSuites.forEach(suite => {
            if (suite.suite.includes('charge et performance')) {
                recommendations.push('🚀 Optimiser les performances: réduire la taille des batches ou augmenter le cache');
            }
            if (suite.suite.includes('ressources Vercel')) {
                recommendations.push('💰 Considérer un upgrade vers Vercel Pro ou optimiser l\'usage');
            }
            if (suite.suite.includes('fallbacks')) {
                recommendations.push('🛡️  Renforcer les mécanismes de fallback et de récupération');
            }
        });
    }

    // Recommandations générales
    recommendations.push('📈 Mettre en place un monitoring continu des métriques de performance');
    recommendations.push('🔧 Automatiser l\'exécution de ces tests dans la CI/CD');
    recommendations.push('📚 Former l\'équipe sur les procédures de fallback et de récupération');

    return recommendations;
}

function generateHTMLReport(report: SystemTestReport): string {
    const statusColor = report.summary.overallStatus === 'PASS' ? '#10B981' : '#EF4444';
    const statusIcon = report.summary.overallStatus === 'PASS' ? '✅' : '❌';

    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapport de Tests Système - Optimisation Vercel</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f8fafc; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); margin-bottom: 20px; }
        .status { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; color: white; background: ${statusColor}; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 20px; }
        .card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .metric { text-align: center; padding: 20px; }
        .metric-value { font-size: 2.5rem; font-weight: bold; color: #1f2937; }
        .metric-label { color: #6b7280; font-size: 0.9rem; }
        .test-result { padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid; }
        .test-pass { background: #f0fdf4; border-color: #10b981; }
        .test-fail { background: #fef2f2; border-color: #ef4444; }
        .recommendations { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; }
        .recommendations ul { margin: 0; padding-left: 20px; }
        .timestamp { color: #6b7280; font-size: 0.9rem; }
        pre { background: #f3f4f6; padding: 15px; border-radius: 8px; overflow-x: auto; font-size: 0.85rem; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${statusIcon} Rapport de Tests Système - Optimisation Vercel</h1>
            <div class="status">${report.summary.overallStatus}</div>
            <p class="timestamp">Généré le ${report.timestamp.toLocaleString('fr-FR')}</p>
        </div>

        <div class="grid">
            <div class="card">
                <div class="metric">
                    <div class="metric-value">${report.passedSuites}/${report.totalSuites}</div>
                    <div class="metric-label">Suites de tests réussies</div>
                </div>
            </div>
            <div class="card">
                <div class="metric">
                    <div class="metric-value">${formatDuration(report.totalDuration)}</div>
                    <div class="metric-label">Durée totale</div>
                </div>
            </div>
            <div class="card">
                <div class="metric">
                    <div class="metric-value">${Math.round((report.passedSuites / report.totalSuites) * 100)}%</div>
                    <div class="metric-label">Taux de réussite</div>
                </div>
            </div>
        </div>

        <div class="card">
            <h2>📊 Résumé par Catégorie</h2>
            <div class="test-result ${report.summary.loadPerformance === 'PASS' ? 'test-pass' : 'test-fail'}">
                <strong>🚀 Tests de charge et performance:</strong> ${report.summary.loadPerformance}
            </div>
            <div class="test-result ${report.summary.vercelUsage === 'PASS' ? 'test-pass' : 'test-fail'}">
                <strong>📊 Tests d'usage Vercel:</strong> ${report.summary.vercelUsage}
            </div>
            <div class="test-result ${report.summary.fallbackResilience === 'PASS' ? 'test-pass' : 'test-fail'}">
                <strong>🛡️ Tests de fallback et résilience:</strong> ${report.summary.fallbackResilience}
            </div>
        </div>

        <div class="card">
            <h2>📋 Détails des Tests</h2>
            ${report.results.map(result => `
                <div class="test-result ${result.passed ? 'test-pass' : 'test-fail'}">
                    <h3>${result.passed ? '✅' : '❌'} ${result.suite}</h3>
                    <p><strong>Durée:</strong> ${formatDuration(result.duration)}</p>
                    ${result.errors ? `<p><strong>Erreurs:</strong> ${result.errors.join(', ')}</p>` : ''}
                </div>
            `).join('')}
        </div>

        <div class="recommendations">
            <h2>💡 Recommandations</h2>
            <ul>
                ${report.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
    </div>
</body>
</html>`;
}

async function main() {
    console.log(colorize('🚀 DÉMARRAGE DES TESTS SYSTÈME COMPLETS', 'bright'));
    console.log(colorize('==========================================', 'bright'));
    console.log(`📅 Date: ${new Date().toLocaleString('fr-FR')}`);
    console.log(`🧪 Suites de tests: ${TEST_SUITES.length}`);
    console.log(`⚠️  Tests critiques: ${TEST_SUITES.filter(s => s.critical).length}`);

    const startTime = Date.now();
    const results: TestResult[] = [];

    // Exécution séquentielle des tests
    for (const suite of TEST_SUITES) {
        const result = await runTestSuite(suite);
        results.push(result);

        // Arrêt immédiat si un test critique échoue
        if (suite.critical && !result.passed) {
            console.log(colorize(`\n💥 ARRÊT: Test critique échoué - ${suite.name}`, 'red'));
            break;
        }
    }

    const totalDuration = Date.now() - startTime;
    const passedSuites = results.filter(r => r.passed).length;
    const failedSuites = results.length - passedSuites;

    // Génération du rapport
    const report: SystemTestReport = {
        timestamp: new Date(),
        totalSuites: results.length,
        passedSuites,
        failedSuites,
        totalDuration,
        results,
        summary: {
            loadPerformance: results.find(r => r.suite.includes('charge'))?.passed ? 'PASS' : 'FAIL',
            vercelUsage: results.find(r => r.suite.includes('Vercel'))?.passed ? 'PASS' : 'FAIL',
            fallbackResilience: results.find(r => r.suite.includes('fallback'))?.passed ? 'PASS' : 'FAIL',
            overallStatus: failedSuites === 0 ? 'PASS' : 'FAIL'
        },
        recommendations: generateRecommendations(results)
    };

    // Affichage du résumé
    console.log(colorize('\n📊 RÉSUMÉ DES TESTS SYSTÈME', 'bright'));
    console.log(colorize('===============================', 'bright'));
    console.log(`${report.summary.overallStatus === 'PASS' ? '✅' : '❌'} Statut global: ${colorize(report.summary.overallStatus, report.summary.overallStatus === 'PASS' ? 'green' : 'red')}`);
    console.log(`📈 Tests réussis: ${colorize(`${passedSuites}/${results.length}`, passedSuites === results.length ? 'green' : 'yellow')}`);
    console.log(`⏱️  Durée totale: ${colorize(formatDuration(totalDuration), 'blue')}`);

    console.log(colorize('\n🔍 Détail par catégorie:', 'bright'));
    console.log(`🚀 Performance: ${report.summary.loadPerformance === 'PASS' ? colorize('PASS', 'green') : colorize('FAIL', 'red')}`);
    console.log(`📊 Usage Vercel: ${report.summary.vercelUsage === 'PASS' ? colorize('PASS', 'green') : colorize('FAIL', 'red')}`);
    console.log(`🛡️  Résilience: ${report.summary.fallbackResilience === 'PASS' ? colorize('PASS', 'green') : colorize('FAIL', 'red')}`);

    // Sauvegarde des rapports
    const reportsDir = join(process.cwd(), 'reports');
    mkdirSync(reportsDir, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const jsonReportPath = join(reportsDir, `system-tests-${timestamp}.json`);
    const htmlReportPath = join(reportsDir, `system-tests-${timestamp}.html`);

    writeFileSync(jsonReportPath, JSON.stringify(report, null, 2));
    writeFileSync(htmlReportPath, generateHTMLReport(report));

    console.log(colorize('\n📄 Rapports générés:', 'bright'));
    console.log(`📊 JSON: ${jsonReportPath}`);
    console.log(`🌐 HTML: ${htmlReportPath}`);

    // Recommandations
    console.log(colorize('\n💡 RECOMMANDATIONS', 'bright'));
    console.log(colorize('==================', 'bright'));
    report.recommendations.forEach(rec => {
        console.log(`   ${rec}`);
    });

    // Code de sortie
    const exitCode = report.summary.overallStatus === 'PASS' ? 0 : 1;

    if (exitCode === 0) {
        console.log(colorize('\n🎉 TOUS LES TESTS SONT PASSÉS - SYSTÈME PRÊT POUR LA PRODUCTION!', 'green'));
    } else {
        console.log(colorize('\n⚠️  DES TESTS ONT ÉCHOUÉ - NE PAS DÉPLOYER EN PRODUCTION', 'red'));
    }

    process.exit(exitCode);
}

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
    console.error(colorize('💥 Erreur non gérée:', 'red'), reason);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error(colorize('💥 Exception non capturée:', 'red'), error);
    process.exit(1);
});

// Exécution
if (require.main === module) {
    main().catch(error => {
        console.error(colorize('💥 Erreur fatale:', 'red'), error);
        process.exit(1);
    });
}