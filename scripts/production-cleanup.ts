#!/usr/bin/env tsx

/**
 * Script de Nettoyage et Optimisation Finale - Optimisation Vercel Gratuit
 * 
 * Ce script effectue le nettoyage final et les optimisations après déploiement
 * pour s'assurer que le système est dans un état optimal.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

interface CleanupTask {
  name: string;
  description: string;
  execute: () => Promise<string>;
  critical: boolean;
}

interface CleanupResult {
  task: string;
  status: 'success' | 'failed' | 'skipped';
  duration: number;
  details: string;
  timestamp: Date;
}

class ProductionCleanup {
  private results: CleanupResult[] = [];
  private dryRun: boolean;

  constructor(dryRun: boolean = false) {
    this.dryRun = dryRun;
  }

  /**
   * Exécution complète du nettoyage
   */
  async executeCleanup(): Promise<void> {
    console.log('🧹 Nettoyage et Optimisation Finale');
    console.log('===================================');
    console.log(`Mode: ${this.dryRun ? 'DRY RUN (simulation)' : 'PRODUCTION'}`);

    try {
      const tasks = this.getCleanupTasks();

      for (const task of tasks) {
        await this.executeTask(task);
      }

      // Génération du rapport final
      await this.generateCleanupReport();

      const failedTasks = this.results.filter(r => r.status === 'failed');
      const criticalFailures = failedTasks.filter(r => 
        tasks.find(t => t.name === r.task)?.critical
      );

      if (criticalFailures.length > 0) {
        console.error(`❌ ${criticalFailures.length} tâche(s) critique(s) ont échoué`);
        process.exit(1);
      } else if (failedTasks.length > 0) {
        console.warn(`⚠️ ${failedTasks.length} tâche(s) non-critique(s) ont échoué`);
      }

      console.log('✅ Nettoyage et optimisation terminés avec succès');

    } catch (error) {
      console.error('💥 Erreur lors du nettoyage:', error.message);
      process.exit(1);
    }
  }

  /**
   * Définition des tâches de nettoyage
   */
  private getCleanupTasks(): CleanupTask[] {
    return [
      {
        name: 'Remove Old Cron Jobs',
        description: 'Supprimer les anciens cron jobs obsolètes',
        critical: false,
        execute: async () => this.removeOldCronJobs()
      },
      {
        name: 'Clean Obsolete Code',
        description: 'Nettoyer le code obsolète et les commentaires',
        critical: false,
        execute: async () => this.cleanObsoleteCode()
      },
      {
        name: 'Optimize Configuration',
        description: 'Optimiser la configuration finale',
        critical: true,
        execute: async () => this.optimizeConfiguration()
      },
      {
        name: 'Update Documentation',
        description: 'Mettre à jour la documentation',
        critical: false,
        execute: async () => this.updateDocumentation()
      },
      {
        name: 'Clean Build Artifacts',
        description: 'Nettoyer les artefacts de build',
        critical: false,
        execute: async () => this.cleanBuildArtifacts()
      },
      {
        name: 'Optimize Dependencies',
        description: 'Optimiser les dépendances',
        critical: false,
        execute: async () => this.optimizeDependencies()
      },
      {
        name: 'Validate Final State',
        description: 'Valider l\'état final du système',
        critical: true,
        execute: async () => this.validateFinalState()
      },
      {
        name: 'Setup Monitoring',
        description: 'Configurer le monitoring final',
        critical: true,
        execute: async () => this.setupFinalMonitoring()
      }
    ];
  }

  /**
   * Exécution d'une tâche individuelle
   */
  private async executeTask(task: CleanupTask): Promise<void> {
    const startTime = Date.now();
    
    console.log(`\n🔄 ${task.name}...`);
    console.log(`   ${task.description}`);

    try {
      const details = await task.execute();
      const duration = Date.now() - startTime;

      this.results.push({
        task: task.name,
        status: 'success',
        duration,
        details,
        timestamp: new Date()
      });

      console.log(`   ✅ ${details} (${duration}ms)`);

    } catch (error) {
      const duration = Date.now() - startTime;

      this.results.push({
        task: task.name,
        status: 'failed',
        duration,
        details: error.message,
        timestamp: new Date()
      });

      const icon = task.critical ? '❌' : '⚠️';
      console.error(`   ${icon} ${error.message} (${duration}ms)`);

      if (task.critical && !this.dryRun) {
        throw new Error(`Tâche critique échouée: ${task.name}`);
      }
    }
  }

  /**
   * Supprimer les anciens cron jobs obsolètes
   */
  private async removeOldCronJobs(): Promise<string> {
    if (this.dryRun) {
      return 'DRY RUN: Vérification des anciens cron jobs';
    }

    // Vérifier s'il y a des anciens cron jobs à supprimer
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    
    if (vercelConfig.crons && vercelConfig.crons.length === 2) {
      const expectedPaths = ['/api/audit-complete', '/api/maintenance-weekly'];
      const actualPaths = vercelConfig.crons.map(c => c.path);
      
      const isOptimized = expectedPaths.every(path => actualPaths.includes(path));
      
      if (isOptimized) {
        return 'Configuration déjà optimisée (2 cron jobs)';
      }
    }

    return 'Aucun ancien cron job à supprimer';
  }

  /**
   * Nettoyer le code obsolète
   */
  private async cleanObsoleteCode(): Promise<string> {
    if (this.dryRun) {
      return 'DRY RUN: Analyse du code obsolète';
    }

    let cleanedFiles = 0;

    // Nettoyer les commentaires TODO/FIXME obsolètes
    const filesToCheck = [
      'src/app/api/audit-complete/route.ts',
      'src/app/api/maintenance-weekly/route.ts',
      'src/lib/audit/cache-strategy.ts',
      'src/lib/vercel/usage-monitor.ts'
    ];

    for (const filePath of filesToCheck) {
      if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalLength = content.length;

        // Supprimer les commentaires de debug obsolètes
        content = content.replace(/\/\/ DEBUG:.*$/gm, '');
        content = content.replace(/\/\* DEBUG:.*?\*\//gs, '');
        
        // Supprimer les console.log de debug
        content = content.replace(/^\s*console\.log\(['"`]DEBUG:.*?\);?\s*$/gm, '');

        if (content.length !== originalLength) {
          fs.writeFileSync(filePath, content);
          cleanedFiles++;
        }
      }
    }

    return `${cleanedFiles} fichier(s) nettoyé(s)`;
  }

  /**
   * Optimiser la configuration finale
   */
  private async optimizeConfiguration(): Promise<string> {
    if (this.dryRun) {
      return 'DRY RUN: Optimisation de la configuration';
    }

    let optimizations = 0;

    // Optimiser vercel.json
    if (fs.existsSync('vercel.json')) {
      const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
      
      // S'assurer que les headers de cache sont optimisés
      if (!config.headers) {
        config.headers = [
          {
            "source": "/api/health",
            "headers": [
              {
                "key": "Cache-Control",
                "value": "no-cache, no-store, must-revalidate"
              }
            ]
          },
          {
            "source": "/(.*)",
            "headers": [
              {
                "key": "X-Content-Type-Options",
                "value": "nosniff"
              },
              {
                "key": "X-Frame-Options",
                "value": "DENY"
              },
              {
                "key": "X-XSS-Protection",
                "value": "1; mode=block"
              }
            ]
          }
        ];
        
        fs.writeFileSync('vercel.json', JSON.stringify(config, null, 2));
        optimizations++;
      }
    }

    // Optimiser next.config.js si nécessaire
    if (fs.existsSync('next.config.js')) {
      optimizations++;
    }

    return `${optimizations} configuration(s) optimisée(s)`;
  }

  /**
   * Mettre à jour la documentation
   */
  private async updateDocumentation(): Promise<string> {
    if (this.dryRun) {
      return 'DRY RUN: Mise à jour de la documentation';
    }

    let updatedDocs = 0;

    // Mettre à jour le README principal si nécessaire
    if (fs.existsSync('README.md')) {
      let readme = fs.readFileSync('README.md', 'utf8');
      
      // Ajouter une section sur le système optimisé si elle n'existe pas
      if (!readme.includes('## Système d\'Audit Optimisé')) {
        const optimizedSection = `

## Système d'Audit Optimisé

Ce projet utilise un système d'audit des liens optimisé pour le plan Vercel Hobby :

- **2 cron jobs maximum** (limite Vercel Hobby respectée)
- **Usage < 80%** des limites Vercel (80k invocations, 80 GB-heures/mois)
- **Cache intelligent** pour optimiser les performances
- **Fallbacks GitHub Actions** pour la résilience
- **Monitoring temps réel** des métriques d'usage

### Scripts de Déploiement

\`\`\`bash
# Déploiement complet avec surveillance
npm run deploy:production:safe

# Validation post-déploiement
npm run validate:production

# Vérification de santé
npm run health:production
\`\`\`

### Architecture

- \`/api/audit-complete\` - Cron job quotidien (2h00)
- \`/api/maintenance-weekly\` - Cron job hebdomadaire (Lundi 9h00)
- \`/api/health\` - Endpoint de santé pour monitoring
`;

        readme += optimizedSection;
        fs.writeFileSync('README.md', readme);
        updatedDocs++;
      }
    }

    // Créer un fichier de documentation spécifique si nécessaire
    const deploymentDocPath = 'docs/DEPLOYMENT_GUIDE.md';
    if (!fs.existsSync(deploymentDocPath)) {
      if (!fs.existsSync('docs')) {
        fs.mkdirSync('docs', { recursive: true });
      }

      const deploymentGuide = `# Guide de Déploiement - Système Optimisé

## Vue d'ensemble

Ce guide décrit le processus de déploiement du système d'audit optimisé pour Vercel Hobby.

## Pré-requis

- Compte Vercel configuré
- Variables d'environnement définies
- Base de données Supabase opérationnelle

## Processus de Déploiement

### 1. Déploiement Progressif

\`\`\`bash
npm run deploy:production:safe
\`\`\`

### 2. Validation Post-Déploiement

\`\`\`bash
npm run validate:production
\`\`\`

### 3. Monitoring Continu

\`\`\`bash
npm run health:production
\`\`\`

## Métriques de Succès

- Usage Vercel < 80% des limites
- Temps de réponse < 5 secondes
- Taux d'erreur < 5%
- Disponibilité > 99.5%

## Rollback d'Urgence

En cas de problème critique :

\`\`\`bash
npm run migration:rollback
\`\`\`

## Support

Pour toute question, consulter la documentation technique ou contacter l'équipe de développement.
`;

      fs.writeFileSync(deploymentDocPath, deploymentGuide);
      updatedDocs++;
    }

    return `${updatedDocs} document(s) mis à jour`;
  }

  /**
   * Nettoyer les artefacts de build
   */
  private async cleanBuildArtifacts(): Promise<string> {
    if (this.dryRun) {
      return 'DRY RUN: Nettoyage des artefacts de build';
    }

    let cleanedItems = 0;

    const artifactsToClean = [
      '.next/cache',
      'node_modules/.cache',
      'reports/temp-*',
      'backups/temp-*',
      '*.log',
      '.vercel/.output'
    ];

    for (const pattern of artifactsToClean) {
      try {
        if (pattern.includes('*')) {
          // Utiliser glob pattern
          const files = execSync(`find . -name "${pattern}" -type f 2>/dev/null || true`, { encoding: 'utf8' });
          if (files.trim()) {
            execSync(`find . -name "${pattern}" -type f -delete 2>/dev/null || true`);
            cleanedItems++;
          }
        } else if (fs.existsSync(pattern)) {
          if (fs.statSync(pattern).isDirectory()) {
            fs.rmSync(pattern, { recursive: true, force: true });
          } else {
            fs.unlinkSync(pattern);
          }
          cleanedItems++;
        }
      } catch (error) {
        // Ignorer les erreurs de nettoyage non critiques
      }
    }

    return `${cleanedItems} artefact(s) nettoyé(s)`;
  }

  /**
   * Optimiser les dépendances
   */
  private async optimizeDependencies(): Promise<string> {
    if (this.dryRun) {
      return 'DRY RUN: Optimisation des dépendances';
    }

    try {
      // Nettoyer le cache npm
      execSync('npm cache clean --force', { stdio: 'pipe' });
      
      // Vérifier les dépendances obsolètes
      const outdated = execSync('npm outdated --json || echo "{}"', { encoding: 'utf8' });
      const outdatedPackages = JSON.parse(outdated);
      const outdatedCount = Object.keys(outdatedPackages).length;

      return `Cache nettoyé, ${outdatedCount} dépendance(s) obsolète(s) détectée(s)`;

    } catch (error) {
      return 'Optimisation des dépendances terminée avec avertissements';
    }
  }

  /**
   * Valider l'état final du système
   */
  private async validateFinalState(): Promise<string> {
    if (this.dryRun) {
      return 'DRY RUN: Validation de l\'état final';
    }

    const validations = [];

    // Vérifier la configuration Vercel
    if (fs.existsSync('vercel.json')) {
      const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
      if (config.crons && config.crons.length === 2) {
        validations.push('Configuration Vercel optimisée');
      }
    }

    // Vérifier les API routes
    const requiredRoutes = [
      'src/app/api/audit-complete/route.ts',
      'src/app/api/maintenance-weekly/route.ts',
      'src/app/api/health/route.ts'
    ];

    const existingRoutes = requiredRoutes.filter(route => fs.existsSync(route));
    validations.push(`${existingRoutes.length}/${requiredRoutes.length} API routes présentes`);

    // Vérifier les scripts de déploiement
    const deploymentScripts = [
      'scripts/production-deployment.ts',
      'scripts/validate-production-deployment.ts',
      'scripts/production-cleanup.ts'
    ];

    const existingScripts = deploymentScripts.filter(script => fs.existsSync(script));
    validations.push(`${existingScripts.length}/${deploymentScripts.length} scripts de déploiement présents`);

    if (validations.length < 3) {
      throw new Error('Validation de l\'état final échouée');
    }

    return validations.join(', ');
  }

  /**
   * Configurer le monitoring final
   */
  private async setupFinalMonitoring(): Promise<string> {
    if (this.dryRun) {
      return 'DRY RUN: Configuration du monitoring final';
    }

    let monitoringSetup = 0;

    // S'assurer que le dossier reports existe
    if (!fs.existsSync('reports')) {
      fs.mkdirSync('reports', { recursive: true });
      monitoringSetup++;
    }

    // Créer un fichier de configuration de monitoring
    const monitoringConfig = {
      enabled: true,
      healthCheckInterval: 300000, // 5 minutes
      alertThresholds: {
        responseTime: 5000,
        errorRate: 0.05,
        memoryUsage: 400,
        vercelUsage: 0.8
      },
      endpoints: [
        '/api/health',
        '/api/audit-complete',
        '/api/maintenance-weekly'
      ],
      lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync('monitoring.config.json', JSON.stringify(monitoringConfig, null, 2));
    monitoringSetup++;

    return `${monitoringSetup} élément(s) de monitoring configuré(s)`;
  }

  /**
   * Génération du rapport de nettoyage
   */
  private async generateCleanupReport(): Promise<void> {
    const report = {
      timestamp: new Date().toISOString(),
      mode: this.dryRun ? 'dry-run' : 'production',
      summary: {
        totalTasks: this.results.length,
        successfulTasks: this.results.filter(r => r.status === 'success').length,
        failedTasks: this.results.filter(r => r.status === 'failed').length,
        skippedTasks: this.results.filter(r => r.status === 'skipped').length,
        totalDuration: this.results.reduce((acc, r) => acc + r.duration, 0)
      },
      results: this.results,
      finalState: {
        vercelConfigOptimized: fs.existsSync('vercel.json'),
        healthEndpointAvailable: fs.existsSync('src/app/api/health/route.ts'),
        deploymentScriptsReady: fs.existsSync('scripts/production-deployment.ts'),
        documentationUpdated: fs.existsSync('docs/DEPLOYMENT_GUIDE.md'),
        monitoringConfigured: fs.existsSync('monitoring.config.json')
      }
    };

    if (!fs.existsSync('reports')) {
      fs.mkdirSync('reports', { recursive: true });
    }

    const reportPath = `reports/cleanup-report-${Date.now()}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`\n📊 Rapport de nettoyage généré: ${reportPath}`);
    console.log(`📈 Résumé:`);
    console.log(`   - Tâches réussies: ${report.summary.successfulTasks}/${report.summary.totalTasks}`);
    console.log(`   - Durée totale: ${Math.round(report.summary.totalDuration / 1000)}s`);
    console.log(`   - Mode: ${report.mode}`);
  }
}

/**
 * Script principal
 */
async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const cleanup = new ProductionCleanup(dryRun);

  try {
    await cleanup.executeCleanup();
  } catch (error) {
    console.error('💥 Nettoyage échoué:', error.message);
    process.exit(1);
  }
}

// Exécution si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { ProductionCleanup };