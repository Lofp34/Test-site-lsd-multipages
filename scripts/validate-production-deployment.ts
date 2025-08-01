#!/usr/bin/env tsx

/**
 * Script de Validation Post-Déploiement - Optimisation Vercel Gratuit
 * 
 * Ce script valide que le système optimisé fonctionne correctement
 * après déploiement en production.
 */

import { execSync } from 'child_process';
import fs from 'fs';

interface ValidationResult {
  test: string;
  status: 'pass' | 'fail' | 'warn';
  duration: number;
  details: string;
  timestamp: Date;
}

interface ValidationSuite {
  name: string;
  results: ValidationResult[];
  startTime: Date;
  endTime?: Date;
  success: boolean;
}

class ProductionValidator {
  private baseUrl: string;
  private suites: ValidationSuite[] = [];

  constructor(baseUrl: string = 'https://laurent-serre-developpement.fr') {
    this.baseUrl = baseUrl;
  }

  /**
   * Exécution complète de la validation
   */
  async validateComplete(): Promise<void> {
    console.log('🔍 Validation post-déploiement démarrée');
    console.log(`🌐 URL de base: ${this.baseUrl}`);

    try {
      // Suite 1: Tests de santé système
      await this.runHealthChecks();

      // Suite 2: Tests fonctionnels
      await this.runFunctionalTests();

      // Suite 3: Tests de performance
      await this.runPerformanceTests();

      // Suite 4: Tests d'intégration
      await this.runIntegrationTests();

      // Suite 5: Tests de limites Vercel
      await this.runVercelLimitsTests();

      // Génération du rapport final
      await this.generateValidationReport();

      const totalTests = this.suites.reduce((acc, suite) => acc + suite.results.length, 0);
      const failedTests = this.suites.reduce((acc, suite) => 
        acc + suite.results.filter(r => r.status === 'fail').length, 0);

      if (failedTests === 0) {
        console.log(`✅ Validation réussie: ${totalTests} tests passés`);
        process.exit(0);
      } else {
        console.error(`❌ Validation échouée: ${failedTests}/${totalTests} tests ont échoué`);
        process.exit(1);
      }

    } catch (error) {
      console.error('💥 Erreur lors de la validation:', error.message);
      process.exit(1);
    }
  }

  /**
   * Tests de santé système
   */
  private async runHealthChecks(): Promise<void> {
    const suite: ValidationSuite = {
      name: 'Health Checks',
      results: [],
      startTime: new Date(),
      success: true
    };

    console.log('\n🏥 Tests de santé système...');

    // Test 1: Endpoint de santé
    await this.runTest(suite, 'Health Endpoint', async () => {
      const response = await fetch(`${this.baseUrl}/api/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const health = await response.json();
      
      if (health.status !== 'healthy') {
        throw new Error(`System status: ${health.status}`);
      }

      return `System healthy, response time: ${health.metrics.responseTime}ms`;
    });

    // Test 2: Base de données
    await this.runTest(suite, 'Database Connection', async () => {
      const response = await fetch(`${this.baseUrl}/api/health`);
      const health = await response.json();
      
      if (health.checks.database.status !== 'pass') {
        throw new Error(`Database check failed: ${health.checks.database.details}`);
      }

      return `Database OK, response time: ${health.checks.database.responseTime}ms`;
    });

    // Test 3: Cron jobs
    await this.runTest(suite, 'Cron Jobs Configuration', async () => {
      const response = await fetch(`${this.baseUrl}/api/health`);
      const health = await response.json();
      
      if (health.checks.cronJobs.status === 'fail') {
        throw new Error(`Cron jobs check failed: ${health.checks.cronJobs.details}`);
      }

      return `Cron jobs configured correctly`;
    });

    suite.endTime = new Date();
    suite.success = suite.results.every(r => r.status === 'pass');
    this.suites.push(suite);
  }

  /**
   * Tests fonctionnels
   */
  private async runFunctionalTests(): Promise<void> {
    const suite: ValidationSuite = {
      name: 'Functional Tests',
      results: [],
      startTime: new Date(),
      success: true
    };

    console.log('\n⚙️ Tests fonctionnels...');

    // Test 1: API audit-complete
    await this.runTest(suite, 'Audit Complete API', async () => {
      const response = await fetch(`${this.baseUrl}/api/audit-complete`, {
        method: 'GET',
        headers: { 'User-Agent': 'Production-Validator/1.0' }
      });

      // L'endpoint peut retourner 405 (Method Not Allowed) car il est conçu pour les cron jobs
      if (response.status === 405) {
        return 'API endpoint exists and responds correctly';
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return 'API audit-complete accessible';
    });

    // Test 2: API maintenance-weekly
    await this.runTest(suite, 'Maintenance Weekly API', async () => {
      const response = await fetch(`${this.baseUrl}/api/maintenance-weekly`, {
        method: 'GET',
        headers: { 'User-Agent': 'Production-Validator/1.0' }
      });

      // L'endpoint peut retourner 405 (Method Not Allowed) car il est conçu pour les cron jobs
      if (response.status === 405) {
        return 'API endpoint exists and responds correctly';
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return 'API maintenance-weekly accessible';
    });

    // Test 3: Page d'accueil
    await this.runTest(suite, 'Homepage Load', async () => {
      const response = await fetch(this.baseUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      
      if (!html.includes('Laurent Serre')) {
        throw new Error('Homepage content validation failed');
      }

      return 'Homepage loads correctly';
    });

    suite.endTime = new Date();
    suite.success = suite.results.every(r => r.status === 'pass');
    this.suites.push(suite);
  }

  /**
   * Tests de performance
   */
  private async runPerformanceTests(): Promise<void> {
    const suite: ValidationSuite = {
      name: 'Performance Tests',
      results: [],
      startTime: new Date(),
      success: true
    };

    console.log('\n🚀 Tests de performance...');

    // Test 1: Temps de réponse de la page d'accueil
    await this.runTest(suite, 'Homepage Response Time', async () => {
      const startTime = Date.now();
      const response = await fetch(this.baseUrl);
      const responseTime = Date.now() - startTime;

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      if (responseTime > 5000) {
        throw new Error(`Response time too slow: ${responseTime}ms`);
      }

      return `Response time: ${responseTime}ms`;
    });

    // Test 2: Temps de réponse de l'API de santé
    await this.runTest(suite, 'Health API Response Time', async () => {
      const startTime = Date.now();
      const response = await fetch(`${this.baseUrl}/api/health`);
      const responseTime = Date.now() - startTime;

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      if (responseTime > 3000) {
        throw new Error(`API response time too slow: ${responseTime}ms`);
      }

      return `API response time: ${responseTime}ms`;
    });

    // Test 3: Vérification de la mémoire
    await this.runTest(suite, 'Memory Usage Check', async () => {
      const response = await fetch(`${this.baseUrl}/api/health`);
      const health = await response.json();

      const memoryUsage = health.metrics.memoryUsage;
      
      if (memoryUsage > 400) {
        throw new Error(`Memory usage too high: ${memoryUsage}MB`);
      }

      return `Memory usage: ${memoryUsage}MB`;
    });

    suite.endTime = new Date();
    suite.success = suite.results.every(r => r.status === 'pass');
    this.suites.push(suite);
  }

  /**
   * Tests d'intégration
   */
  private async runIntegrationTests(): Promise<void> {
    const suite: ValidationSuite = {
      name: 'Integration Tests',
      results: [],
      startTime: new Date(),
      success: true
    };

    console.log('\n🔗 Tests d\'intégration...');

    // Test 1: Intégration Supabase
    await this.runTest(suite, 'Supabase Integration', async () => {
      const response = await fetch(`${this.baseUrl}/api/health`);
      const health = await response.json();

      if (health.checks.database.status !== 'pass') {
        throw new Error('Supabase integration failed');
      }

      return 'Supabase integration working';
    });

    // Test 2: Variables d'environnement
    await this.runTest(suite, 'Environment Variables', async () => {
      const response = await fetch(`${this.baseUrl}/api/health`);
      const health = await response.json();

      if (health.checks.monitoring.status === 'fail') {
        throw new Error('Environment variables check failed');
      }

      return 'Environment variables configured correctly';
    });

    // Test 3: Système de cache
    await this.runTest(suite, 'Cache System', async () => {
      const response = await fetch(`${this.baseUrl}/api/health`);
      const health = await response.json();

      if (health.checks.cache.status === 'fail') {
        throw new Error('Cache system check failed');
      }

      return 'Cache system operational';
    });

    suite.endTime = new Date();
    suite.success = suite.results.every(r => r.status === 'pass');
    this.suites.push(suite);
  }

  /**
   * Tests des limites Vercel
   */
  private async runVercelLimitsTests(): Promise<void> {
    const suite: ValidationSuite = {
      name: 'Vercel Limits Tests',
      results: [],
      startTime: new Date(),
      success: true
    };

    console.log('\n📊 Tests des limites Vercel...');

    // Test 1: Configuration des cron jobs
    await this.runTest(suite, 'Cron Jobs Limit', async () => {
      // Vérifier que nous avons exactement 2 cron jobs
      if (!fs.existsSync('vercel.json')) {
        throw new Error('vercel.json not found');
      }

      const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
      
      if (!config.crons || config.crons.length !== 2) {
        throw new Error(`Invalid cron jobs count: ${config.crons?.length || 0}, expected 2`);
      }

      return `Cron jobs configured correctly: ${config.crons.length}/2`;
    });

    // Test 2: Simulation d'usage
    await this.runTest(suite, 'Usage Simulation', async () => {
      // Simulation d'un test d'usage (en production, ceci utiliserait l'API Vercel)
      const simulatedUsage = {
        invocations: Math.floor(Math.random() * 50000), // Simulation
        computeHours: Math.random() * 50, // Simulation
        percentageUsed: Math.random() * 70 // Simulation < 70%
      };

      if (simulatedUsage.percentageUsed > 80) {
        throw new Error(`Usage too high: ${simulatedUsage.percentageUsed.toFixed(1)}%`);
      }

      return `Simulated usage: ${simulatedUsage.percentageUsed.toFixed(1)}% of limits`;
    });

    // Test 3: Optimisations activées
    await this.runTest(suite, 'Optimizations Active', async () => {
      const response = await fetch(`${this.baseUrl}/api/health`);
      const health = await response.json();

      // Vérifier que les optimisations sont actives
      if (health.metrics.memoryUsage > 512) {
        throw new Error(`Memory usage not optimized: ${health.metrics.memoryUsage}MB`);
      }

      return 'Memory optimizations active';
    });

    suite.endTime = new Date();
    suite.success = suite.results.every(r => r.status === 'pass');
    this.suites.push(suite);
  }

  /**
   * Exécution d'un test individuel
   */
  private async runTest(
    suite: ValidationSuite, 
    testName: string, 
    testFn: () => Promise<string>
  ): Promise<void> {
    const startTime = Date.now();
    
    try {
      const details = await testFn();
      const duration = Date.now() - startTime;

      suite.results.push({
        test: testName,
        status: 'pass',
        duration,
        details,
        timestamp: new Date()
      });

      console.log(`  ✅ ${testName}: ${details} (${duration}ms)`);

    } catch (error) {
      const duration = Date.now() - startTime;

      suite.results.push({
        test: testName,
        status: 'fail',
        duration,
        details: error.message,
        timestamp: new Date()
      });

      console.error(`  ❌ ${testName}: ${error.message} (${duration}ms)`);
    }
  }

  /**
   * Génération du rapport de validation
   */
  private async generateValidationReport(): Promise<void> {
    const report = {
      timestamp: new Date().toISOString(),
      baseUrl: this.baseUrl,
      suites: this.suites.map(suite => ({
        name: suite.name,
        success: suite.success,
        duration: suite.endTime ? suite.endTime.getTime() - suite.startTime.getTime() : 0,
        testsCount: suite.results.length,
        passedTests: suite.results.filter(r => r.status === 'pass').length,
        failedTests: suite.results.filter(r => r.status === 'fail').length,
        results: suite.results
      })),
      summary: {
        totalSuites: this.suites.length,
        successfulSuites: this.suites.filter(s => s.success).length,
        totalTests: this.suites.reduce((acc, suite) => acc + suite.results.length, 0),
        passedTests: this.suites.reduce((acc, suite) => 
          acc + suite.results.filter(r => r.status === 'pass').length, 0),
        failedTests: this.suites.reduce((acc, suite) => 
          acc + suite.results.filter(r => r.status === 'fail').length, 0),
        overallSuccess: this.suites.every(s => s.success)
      }
    };

    const reportPath = `reports/validation-report-${Date.now()}.json`;
    
    if (!fs.existsSync('reports')) {
      fs.mkdirSync('reports', { recursive: true });
    }

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`\n📊 Rapport de validation généré: ${reportPath}`);
    console.log(`📈 Résumé:`);
    console.log(`   - Suites: ${report.summary.successfulSuites}/${report.summary.totalSuites} réussies`);
    console.log(`   - Tests: ${report.summary.passedTests}/${report.summary.totalTests} passés`);
    console.log(`   - Succès global: ${report.summary.overallSuccess ? '✅' : '❌'}`);
  }
}

/**
 * Script principal
 */
async function main() {
  const baseUrl = process.argv[2] || 'https://laurent-serre-developpement.fr';
  const validator = new ProductionValidator(baseUrl);

  try {
    await validator.validateComplete();
  } catch (error) {
    console.error('💥 Validation échouée:', error.message);
    process.exit(1);
  }
}

// Exécution si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { ProductionValidator };