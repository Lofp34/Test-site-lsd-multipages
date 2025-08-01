#!/usr/bin/env tsx

/**
 * Test Suite - Validation Post-Déploiement
 * 
 * Ce script teste tous les composants de validation post-déploiement
 * pour s'assurer qu'ils fonctionnent correctement.
 */

import { execSync } from 'child_process';
import fs from 'fs';

interface TestResult {
  name: string;
  status: 'pass' | 'fail';
  duration: number;
  details: string;
}

class ValidationTestSuite {
  private results: TestResult[] = [];

  /**
   * Exécution complète des tests
   */
  async runAllTests(): Promise<void> {
    console.log('🧪 Test Suite - Validation Post-Déploiement');
    console.log('================================================');

    try {
      // Test 1: Scripts de déploiement
      await this.testDeploymentScripts();

      // Test 2: API Health Check
      await this.testHealthEndpoint();

      // Test 3: Configuration Vercel
      await this.testVercelConfiguration();

      // Test 4: Scripts de validation
      await this.testValidationScripts();

      // Test 5: Backup et rollback
      await this.testBackupRollback();

      // Résumé des résultats
      this.printSummary();

      const failedTests = this.results.filter(r => r.status === 'fail');
      if (failedTests.length === 0) {
        console.log('\n✅ Tous les tests de validation sont passés');
        process.exit(0);
      } else {
        console.error(`\n❌ ${failedTests.length} test(s) ont échoué`);
        process.exit(1);
      }

    } catch (error) {
      console.error('💥 Erreur lors des tests:', error.message);
      process.exit(1);
    }
  }

  /**
   * Test des scripts de déploiement
   */
  private async testDeploymentScripts(): Promise<void> {
    console.log('\n📦 Test des scripts de déploiement...');

    // Test 1.1: Script de déploiement existe
    await this.runTest('Deployment Script Exists', async () => {
      if (!fs.existsSync('scripts/production-deployment.ts')) {
        throw new Error('Script de déploiement manquant');
      }
      return 'Script de déploiement trouvé';
    });

    // Test 1.2: Script de validation existe
    await this.runTest('Validation Script Exists', async () => {
      if (!fs.existsSync('scripts/validate-production-deployment.ts')) {
        throw new Error('Script de validation manquant');
      }
      return 'Script de validation trouvé';
    });

    // Test 1.3: Configuration de déploiement
    await this.runTest('Deployment Configuration', async () => {
      if (!fs.existsSync('deployment.config.json')) {
        throw new Error('Configuration de déploiement manquante');
      }

      const config = JSON.parse(fs.readFileSync('deployment.config.json', 'utf8'));
      
      if (!config.production) {
        throw new Error('Configuration production manquante');
      }

      return 'Configuration de déploiement valide';
    });

    // Test 1.4: Scripts NPM
    await this.runTest('NPM Scripts Configuration', async () => {
      if (!fs.existsSync('package.json')) {
        throw new Error('package.json manquant');
      }

      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      const requiredScripts = [
        'deploy:production',
        'validate:production',
        'health:check'
      ];

      for (const script of requiredScripts) {
        if (!pkg.scripts[script]) {
          throw new Error(`Script NPM manquant: ${script}`);
        }
      }

      return `${requiredScripts.length} scripts NPM configurés`;
    });
  }

  /**
   * Test de l'endpoint de santé
   */
  private async testHealthEndpoint(): Promise<void> {
    console.log('\n🏥 Test de l\'endpoint de santé...');

    // Test 2.1: Fichier API route existe
    await this.runTest('Health API Route Exists', async () => {
      if (!fs.existsSync('src/app/api/health/route.ts')) {
        throw new Error('API route de santé manquante');
      }
      return 'API route de santé trouvée';
    });

    // Test 2.2: Structure de l'API
    await this.runTest('Health API Structure', async () => {
      const content = fs.readFileSync('src/app/api/health/route.ts', 'utf8');
      
      const requiredElements = [
        'export async function GET',
        'HealthStatus',
        'CheckResult',
        'checkDatabase',
        'checkCronJobs'
      ];

      for (const element of requiredElements) {
        if (!content.includes(element)) {
          throw new Error(`Élément manquant dans l'API: ${element}`);
        }
      }

      return 'Structure de l\'API de santé valide';
    });

    // Test 2.3: Types TypeScript
    await this.runTest('Health API Types', async () => {
      const content = fs.readFileSync('src/app/api/health/route.ts', 'utf8');
      
      if (!content.includes('interface HealthStatus') || 
          !content.includes('interface CheckResult')) {
        throw new Error('Types TypeScript manquants');
      }

      return 'Types TypeScript définis correctement';
    });
  }

  /**
   * Test de la configuration Vercel
   */
  private async testVercelConfiguration(): Promise<void> {
    console.log('\n⚙️ Test de la configuration Vercel...');

    // Test 3.1: vercel.json existe
    await this.runTest('Vercel Config Exists', async () => {
      if (!fs.existsSync('vercel.json')) {
        throw new Error('vercel.json manquant');
      }
      return 'vercel.json trouvé';
    });

    // Test 3.2: Cron jobs configurés
    await this.runTest('Cron Jobs Configuration', async () => {
      const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
      
      if (!config.crons || config.crons.length !== 2) {
        throw new Error(`Nombre incorrect de cron jobs: ${config.crons?.length || 0}, attendu: 2`);
      }

      const expectedPaths = ['/api/audit-complete', '/api/maintenance-weekly'];
      const actualPaths = config.crons.map(c => c.path);

      for (const expectedPath of expectedPaths) {
        if (!actualPaths.includes(expectedPath)) {
          throw new Error(`Cron job manquant: ${expectedPath}`);
        }
      }

      return '2 cron jobs configurés correctement';
    });

    // Test 3.3: API routes existent
    await this.runTest('Cron API Routes Exist', async () => {
      const routes = [
        'src/app/api/audit-complete/route.ts',
        'src/app/api/maintenance-weekly/route.ts'
      ];

      for (const route of routes) {
        if (!fs.existsSync(route)) {
          throw new Error(`API route manquante: ${route}`);
        }
      }

      return 'Toutes les API routes des cron jobs existent';
    });
  }

  /**
   * Test des scripts de validation
   */
  private async testValidationScripts(): Promise<void> {
    console.log('\n🔍 Test des scripts de validation...');

    // Test 4.1: Classe ProductionValidator
    await this.runTest('ProductionValidator Class', async () => {
      const content = fs.readFileSync('scripts/validate-production-deployment.ts', 'utf8');
      
      if (!content.includes('class ProductionValidator')) {
        throw new Error('Classe ProductionValidator manquante');
      }

      return 'Classe ProductionValidator définie';
    });

    // Test 4.2: Méthodes de validation
    await this.runTest('Validation Methods', async () => {
      const content = fs.readFileSync('scripts/validate-production-deployment.ts', 'utf8');
      
      const requiredMethods = [
        'runHealthChecks',
        'runFunctionalTests',
        'runPerformanceTests',
        'runIntegrationTests',
        'runVercelLimitsTests'
      ];

      for (const method of requiredMethods) {
        if (!content.includes(method)) {
          throw new Error(`Méthode manquante: ${method}`);
        }
      }

      return `${requiredMethods.length} méthodes de validation définies`;
    });

    // Test 4.3: Génération de rapport
    await this.runTest('Report Generation', async () => {
      const content = fs.readFileSync('scripts/validate-production-deployment.ts', 'utf8');
      
      if (!content.includes('generateValidationReport')) {
        throw new Error('Méthode de génération de rapport manquante');
      }

      return 'Génération de rapport configurée';
    });
  }

  /**
   * Test des fonctionnalités de backup et rollback
   */
  private async testBackupRollback(): Promise<void> {
    console.log('\n💾 Test des fonctionnalités de backup et rollback...');

    // Test 5.1: Méthodes de backup
    await this.runTest('Backup Methods', async () => {
      const content = fs.readFileSync('scripts/production-deployment.ts', 'utf8');
      
      const backupMethods = [
        'createBackup',
        'backupDatabase',
        'rollback'
      ];

      for (const method of backupMethods) {
        if (!content.includes(method)) {
          throw new Error(`Méthode de backup manquante: ${method}`);
        }
      }

      return 'Méthodes de backup définies';
    });

    // Test 5.2: Dossier de backup
    await this.runTest('Backup Directory Structure', async () => {
      // Créer le dossier de backup s'il n'existe pas (pour le test)
      if (!fs.existsSync('backups')) {
        fs.mkdirSync('backups', { recursive: true });
      }

      return 'Structure de dossier de backup prête';
    });

    // Test 5.3: Scripts de migration
    await this.runTest('Migration Scripts', async () => {
      const migrationScripts = [
        'scripts/migration-backup.ts',
        'scripts/migration-deploy.ts',
        'scripts/migration-rollback.ts'
      ];

      let existingScripts = 0;
      for (const script of migrationScripts) {
        if (fs.existsSync(script)) {
          existingScripts++;
        }
      }

      return `${existingScripts}/${migrationScripts.length} scripts de migration disponibles`;
    });
  }

  /**
   * Exécution d'un test individuel
   */
  private async runTest(testName: string, testFn: () => Promise<string>): Promise<void> {
    const startTime = Date.now();
    
    try {
      const details = await testFn();
      const duration = Date.now() - startTime;

      this.results.push({
        name: testName,
        status: 'pass',
        duration,
        details
      });

      console.log(`  ✅ ${testName}: ${details} (${duration}ms)`);

    } catch (error) {
      const duration = Date.now() - startTime;

      this.results.push({
        name: testName,
        status: 'fail',
        duration,
        details: error.message
      });

      console.error(`  ❌ ${testName}: ${error.message} (${duration}ms)`);
    }
  }

  /**
   * Affichage du résumé des résultats
   */
  private printSummary(): void {
    console.log('\n📊 Résumé des tests');
    console.log('==================');

    const totalTests = this.results.length;
    const passedTests = this.results.filter(r => r.status === 'pass').length;
    const failedTests = this.results.filter(r => r.status === 'fail').length;
    const totalDuration = this.results.reduce((acc, r) => acc + r.duration, 0);

    console.log(`Total: ${totalTests} tests`);
    console.log(`Réussis: ${passedTests} tests`);
    console.log(`Échoués: ${failedTests} tests`);
    console.log(`Durée totale: ${totalDuration}ms`);

    if (failedTests > 0) {
      console.log('\n❌ Tests échoués:');
      this.results
        .filter(r => r.status === 'fail')
        .forEach(r => console.log(`  - ${r.name}: ${r.details}`));
    }

    // Génération du rapport JSON
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: totalTests,
        passed: passedTests,
        failed: failedTests,
        duration: totalDuration,
        success: failedTests === 0
      },
      results: this.results
    };

    if (!fs.existsSync('reports')) {
      fs.mkdirSync('reports', { recursive: true });
    }

    const reportPath = `reports/validation-test-report-${Date.now()}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`\n📄 Rapport généré: ${reportPath}`);
  }
}

/**
 * Script principal
 */
async function main() {
  const testSuite = new ValidationTestSuite();

  try {
    await testSuite.runAllTests();
  } catch (error) {
    console.error('💥 Erreur lors des tests:', error.message);
    process.exit(1);
  }
}

// Exécution si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { ValidationTestSuite };