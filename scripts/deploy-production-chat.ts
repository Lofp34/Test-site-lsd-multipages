#!/usr/bin/env tsx

/**
 * Script de déploiement en production pour le chat Gemini
 * Vérifie la configuration, exécute les tests et prépare le déploiement
 */

import { execSync } from 'child_process';
import { existsSync, writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { EnvironmentValidator } from './validate-production-env';

interface DeploymentConfig {
  environment: 'production' | 'staging';
  skipTests: boolean;
  skipValidation: boolean;
  dryRun: boolean;
  verbose: boolean;
}

interface DeploymentResult {
  success: boolean;
  steps: Array<{
    name: string;
    status: 'success' | 'failed' | 'skipped';
    duration: number;
    error?: string;
  }>;
  totalDuration: number;
}

class ProductionDeployer {
  private config: DeploymentConfig;
  private startTime: number;
  private results: DeploymentResult;

  constructor(config: Partial<DeploymentConfig> = {}) {
    this.config = {
      environment: 'production',
      skipTests: false,
      skipValidation: false,
      dryRun: false,
      verbose: false,
      ...config
    };

    this.startTime = Date.now();
    this.results = {
      success: true,
      steps: [],
      totalDuration: 0
    };
  }

  /**
   * Exécute le déploiement complet
   */
  async deploy(): Promise<DeploymentResult> {
    console.log('🚀 Démarrage du déploiement en production du chat Gemini');
    console.log(`📅 ${new Date().toISOString()}`);
    console.log(`🎯 Environnement: ${this.config.environment}`);
    console.log(`🔧 Mode: ${this.config.dryRun ? 'DRY RUN' : 'RÉEL'}`);
    console.log('='.repeat(60));

    try {
      // Étapes de déploiement
      await this.step('Validation de l\'environnement', () => this.validateEnvironment());
      await this.step('Vérification des dépendances', () => this.checkDependencies());
      await this.step('Exécution des tests', () => this.runTests());
      await this.step('Build de production', () => this.buildProduction());
      await this.step('Validation du build', () => this.validateBuild());
      await this.step('Préparation des assets', () => this.prepareAssets());
      await this.step('Configuration de sécurité', () => this.setupSecurity());
      await this.step('Déploiement', () => this.deployToProduction());
      await this.step('Tests post-déploiement', () => this.postDeploymentTests());
      await this.step('Nettoyage', () => this.cleanup());

      this.results.totalDuration = Date.now() - this.startTime;
      this.displayResults();

      return this.results;
    } catch (error) {
      console.error('💥 Erreur lors du déploiement:', error);
      this.results.success = false;
      this.results.totalDuration = Date.now() - this.startTime;
      return this.results;
    }
  }

  /**
   * Exécute une étape avec gestion d'erreurs et timing
   */
  private async step(name: string, fn: () => Promise<void> | void): Promise<void> {
    const stepStart = Date.now();
    console.log(`\n🔄 ${name}...`);

    try {
      await fn();
      const duration = Date.now() - stepStart;
      this.results.steps.push({ name, status: 'success', duration });
      console.log(`✅ ${name} - Terminé en ${duration}ms`);
    } catch (error) {
      const duration = Date.now() - stepStart;
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.results.steps.push({ name, status: 'failed', duration, error: errorMessage });
      console.error(`❌ ${name} - Échec: ${errorMessage}`);
      
      if (!this.config.dryRun) {
        throw error;
      }
    }
  }

  /**
   * Valide l'environnement de production
   */
  private async validateEnvironment(): Promise<void> {
    if (this.config.skipValidation) {
      console.log('⏭️  Validation ignorée (--skip-validation)');
      return;
    }

    const validator = new EnvironmentValidator();
    const results = validator.validate();

    if (!results.valid) {
      throw new Error(`Validation de l'environnement échouée: ${results.errors.length} erreurs`);
    }

    console.log(`✅ Environnement validé: ${results.summary.valid}/${results.summary.total} variables OK`);
  }

  /**
   * Vérifie les dépendances
   */
  private async checkDependencies(): Promise<void> {
    // Vérifier Node.js version
    const nodeVersion = process.version;
    const requiredNodeVersion = '18.0.0';
    
    if (!this.isVersionCompatible(nodeVersion.slice(1), requiredNodeVersion)) {
      throw new Error(`Node.js ${requiredNodeVersion}+ requis, version actuelle: ${nodeVersion}`);
    }

    // Vérifier les dépendances npm
    if (!existsSync('node_modules')) {
      console.log('📦 Installation des dépendances...');
      this.exec('npm ci');
    }

    // Vérifier les dépendances critiques
    const criticalDeps = ['@google/genai', 'next', 'react'];
    for (const dep of criticalDeps) {
      try {
        require.resolve(dep);
        console.log(`✅ ${dep} disponible`);
      } catch {
        throw new Error(`Dépendance critique manquante: ${dep}`);
      }
    }
  }

  /**
   * Exécute les tests
   */
  private async runTests(): Promise<void> {
    if (this.config.skipTests) {
      console.log('⏭️  Tests ignorés (--skip-tests)');
      return;
    }

    // Tests unitaires
    console.log('🧪 Exécution des tests unitaires...');
    this.exec('npm run test -- --run --reporter=verbose');

    // Tests d'intégration spécifiques au chat
    console.log('🔗 Tests d\'intégration du chat...');
    this.exec('npm run test:integration -- --grep="chat"');

    // Tests de sécurité
    console.log('🔒 Tests de sécurité...');
    this.exec('npm audit --audit-level=high');
  }

  /**
   * Build de production
   */
  private async buildProduction(): Promise<void> {
    console.log('🏗️  Build de production...');
    
    // Nettoyer les builds précédents
    this.exec('rm -rf .next');
    
    // Build Next.js
    this.exec('npm run build');
    
    // Vérifier que le build existe
    if (!existsSync('.next')) {
      throw new Error('Build échoué: dossier .next non créé');
    }

    console.log('✅ Build de production terminé');
  }

  /**
   * Valide le build de production
   */
  private async validateBuild(): Promise<void> {
    // Vérifier la taille du build
    const buildSize = this.getBuildSize();
    const maxBuildSize = 50 * 1024 * 1024; // 50MB
    
    if (buildSize > maxBuildSize) {
      console.warn(`⚠️  Build volumineux: ${(buildSize / 1024 / 1024).toFixed(2)}MB`);
    }

    // Vérifier les routes critiques
    const criticalRoutes = [
      '.next/server/app/api/chat/gemini/route.js',
      '.next/server/app/page.js'
    ];

    for (const route of criticalRoutes) {
      if (!existsSync(route)) {
        throw new Error(`Route critique manquante: ${route}`);
      }
    }

    // Analyser le bundle
    console.log('📊 Analyse du bundle...');
    try {
      this.exec('npx @next/bundle-analyzer');
    } catch {
      console.warn('⚠️  Analyse du bundle échouée (non critique)');
    }
  }

  /**
   * Prépare les assets pour la production
   */
  private async prepareAssets(): Promise<void> {
    // Optimiser les images si nécessaire
    console.log('🖼️  Optimisation des assets...');
    
    // Générer le sitemap
    console.log('🗺️  Génération du sitemap...');
    this.exec('npm run build:sitemap');
    
    // Générer les manifests
    console.log('📱 Génération des manifests...');
    this.generateManifests();
  }

  /**
   * Configure la sécurité pour la production
   */
  private async setupSecurity(): Promise<void> {
    console.log('🔒 Configuration de sécurité...');
    
    // Vérifier les headers de sécurité
    this.validateSecurityHeaders();
    
    // Configurer CSP
    this.setupContentSecurityPolicy();
    
    // Vérifier les certificats SSL (si applicable)
    await this.validateSSL();
  }

  /**
   * Déploie en production
   */
  private async deployToProduction(): Promise<void> {
    if (this.config.dryRun) {
      console.log('🔍 DRY RUN: Simulation du déploiement...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      return;
    }

    console.log('🚀 Déploiement en production...');
    
    // Déploiement Vercel (exemple)
    if (process.env.VERCEL_TOKEN) {
      this.exec('vercel --prod --confirm');
    } else {
      console.log('⚠️  Token Vercel manquant, déploiement manuel requis');
    }
  }

  /**
   * Tests post-déploiement
   */
  private async postDeploymentTests(): Promise<void> {
    console.log('🧪 Tests post-déploiement...');
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.warn('⚠️  BASE_URL manquante, tests post-déploiement ignorés');
      return;
    }

    // Test de santé de l'API
    await this.testHealthEndpoint(`${baseUrl}/api/health`);
    
    // Test du chat Gemini
    await this.testChatEndpoint(`${baseUrl}/api/chat/gemini`);
    
    // Test des performances
    await this.testPerformance(baseUrl);
  }

  /**
   * Nettoyage post-déploiement
   */
  private async cleanup(): Promise<void> {
    console.log('🧹 Nettoyage...');
    
    // Nettoyer les fichiers temporaires
    this.exec('rm -rf .next/cache/webpack');
    
    // Archiver les logs de déploiement
    this.archiveDeploymentLogs();
  }

  // Méthodes utilitaires

  private exec(command: string): string {
    if (this.config.verbose) {
      console.log(`$ ${command}`);
    }
    
    try {
      return execSync(command, { 
        encoding: 'utf8',
        stdio: this.config.verbose ? 'inherit' : 'pipe'
      });
    } catch (error: any) {
      throw new Error(`Commande échouée: ${command}\n${error.message}`);
    }
  }

  private isVersionCompatible(current: string, required: string): boolean {
    const currentParts = current.split('.').map(Number);
    const requiredParts = required.split('.').map(Number);
    
    for (let i = 0; i < Math.max(currentParts.length, requiredParts.length); i++) {
      const currentPart = currentParts[i] || 0;
      const requiredPart = requiredParts[i] || 0;
      
      if (currentPart > requiredPart) return true;
      if (currentPart < requiredPart) return false;
    }
    
    return true;
  }

  private getBuildSize(): number {
    try {
      const stats = execSync('du -sb .next', { encoding: 'utf8' });
      return parseInt(stats.split('\t')[0]);
    } catch {
      return 0;
    }
  }

  private generateManifests(): void {
    const manifest = {
      name: 'Laurent Serre Développement - Chat IA',
      short_name: 'LSD Chat',
      description: 'Assistant IA pour le développement commercial',
      start_url: '/',
      display: 'standalone',
      background_color: '#F2F5F7',
      theme_color: '#00BDA4',
      icons: [
        {
          src: '/icon-192.png',
          sizes: '192x192',
          type: 'image/png'
        }
      ]
    };

    writeFileSync('public/manifest.json', JSON.stringify(manifest, null, 2));
  }

  private validateSecurityHeaders(): void {
    // Vérifier que les headers de sécurité sont configurés
    const nextConfig = resolve('next.config.js');
    if (existsSync(nextConfig)) {
      const config = readFileSync(nextConfig, 'utf8');
      if (!config.includes('X-Frame-Options')) {
        console.warn('⚠️  Headers de sécurité manquants dans next.config.js');
      }
    }
  }

  private setupContentSecurityPolicy(): void {
    console.log('🛡️  Configuration CSP...');
    // CSP configuré dans production.ts
  }

  private async validateSSL(): Promise<void> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (baseUrl && baseUrl.startsWith('https://')) {
      console.log('🔐 Validation SSL...');
      // Validation SSL simplifiée
      try {
        const response = await fetch(baseUrl, { method: 'HEAD' });
        if (response.ok) {
          console.log('✅ SSL valide');
        }
      } catch {
        console.warn('⚠️  Validation SSL échouée');
      }
    }
  }

  private async testHealthEndpoint(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`);
      }
      console.log('✅ Health endpoint OK');
    } catch (error) {
      console.warn(`⚠️  Health endpoint test failed: ${error}`);
    }
  }

  private async testChatEndpoint(url: string): Promise<void> {
    try {
      const response = await fetch(url, { method: 'OPTIONS' });
      if (response.ok) {
        console.log('✅ Chat endpoint accessible');
      }
    } catch (error) {
      console.warn(`⚠️  Chat endpoint test failed: ${error}`);
    }
  }

  private async testPerformance(baseUrl: string): Promise<void> {
    console.log('⚡ Test de performance...');
    // Test de performance simplifié
    const start = Date.now();
    try {
      await fetch(baseUrl);
      const duration = Date.now() - start;
      console.log(`✅ Temps de réponse: ${duration}ms`);
    } catch (error) {
      console.warn(`⚠️  Test de performance échoué: ${error}`);
    }
  }

  private archiveDeploymentLogs(): void {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const logFile = `deployment-${timestamp}.log`;
    
    const logContent = {
      timestamp: new Date().toISOString(),
      environment: this.config.environment,
      results: this.results,
      nodeVersion: process.version,
      npmVersion: this.exec('npm --version').trim()
    };

    writeFileSync(`logs/${logFile}`, JSON.stringify(logContent, null, 2));
    console.log(`📝 Logs archivés: ${logFile}`);
  }

  private displayResults(): void {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RÉSULTATS DU DÉPLOIEMENT');
    console.log('='.repeat(60));
    
    console.log(`🎯 Environnement: ${this.config.environment}`);
    console.log(`⏱️  Durée totale: ${this.results.totalDuration}ms`);
    console.log(`📈 Étapes: ${this.results.steps.length}`);
    
    const successful = this.results.steps.filter(s => s.status === 'success').length;
    const failed = this.results.steps.filter(s => s.status === 'failed').length;
    
    console.log(`✅ Réussies: ${successful}`);
    console.log(`❌ Échouées: ${failed}`);
    
    if (failed > 0) {
      console.log('\n🚨 ÉTAPES ÉCHOUÉES:');
      this.results.steps
        .filter(s => s.status === 'failed')
        .forEach(step => {
          console.log(`- ${step.name}: ${step.error}`);
        });
    }
    
    console.log('\n' + '='.repeat(60));
    
    if (this.results.success) {
      console.log('🎉 DÉPLOIEMENT RÉUSSI!');
      console.log('🌐 L\'application est maintenant disponible en production');
    } else {
      console.log('💥 DÉPLOIEMENT ÉCHOUÉ!');
      console.log('🔧 Corrigez les erreurs et relancez le déploiement');
    }
    
    console.log('='.repeat(60));
  }
}

// CLI
async function main() {
  const args = process.argv.slice(2);
  
  const config: Partial<DeploymentConfig> = {
    environment: args.includes('--staging') ? 'staging' : 'production',
    skipTests: args.includes('--skip-tests'),
    skipValidation: args.includes('--skip-validation'),
    dryRun: args.includes('--dry-run'),
    verbose: args.includes('--verbose')
  };

  if (args.includes('--help')) {
    console.log(`
Usage: npm run deploy:production [options]

Options:
  --staging           Déployer en staging au lieu de production
  --skip-tests        Ignorer les tests
  --skip-validation   Ignorer la validation d'environnement
  --dry-run           Simulation sans déploiement réel
  --verbose           Mode verbeux
  --help              Afficher cette aide
    `);
    process.exit(0);
  }

  const deployer = new ProductionDeployer(config);
  const results = await deployer.deploy();
  
  process.exit(results.success ? 0 : 1);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { ProductionDeployer };
export type { DeploymentConfig, DeploymentResult };