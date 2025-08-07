#!/usr/bin/env ts-node

/**
 * Script de diagnostic préventif pour l'environnement Next.js
 * Vérifie l'état du système et identifie les problèmes potentiels
 * avant qu'ils ne causent des erreurs de démarrage
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

interface DiagnosticResult {
  category: string;
  status: 'success' | 'warning' | 'error';
  message: string;
  details?: string;
  recommendation?: string;
}

interface VersionInfo {
  node: string;
  npm: string;
  next?: string;
  react?: string;
  typescript?: string;
}

class EnvironmentDiagnostic {
  private results: DiagnosticResult[] = [];
  private projectRoot: string;

  constructor() {
    this.projectRoot = process.cwd();
  }

  /**
   * Lance tous les diagnostics
   */
  async runDiagnostics(): Promise<DiagnosticResult[]> {
    console.log('🔍 Diagnostic de l\'environnement Next.js en cours...\n');

    // Vérifications des versions
    await this.checkVersions();
    
    // Vérifications des fichiers critiques
    await this.checkCriticalFiles();
    
    // Vérifications des dépendances
    await this.checkDependencies();
    
    // Vérifications de l'intégrité des modules
    await this.checkNodeModules();
    
    // Vérifications des caches
    await this.checkCaches();
    
    // Vérifications des permissions
    await this.checkPermissions();

    return this.results;
  }

  /**
   * Vérifie les versions des outils critiques
   */
  private async checkVersions(): Promise<void> {
    try {
      const versions = this.getVersions();
      
      // Vérification Node.js
      const nodeVersion = versions.node;
      const nodeMajor = parseInt(nodeVersion.split('.')[0]);
      
      if (nodeMajor >= 18) {
        this.addResult('Versions', 'success', `Node.js ${nodeVersion} ✓`);
      } else if (nodeMajor >= 16) {
        this.addResult('Versions', 'warning', `Node.js ${nodeVersion} - Version supportée mais ancienne`, 
          'Node.js 16 est supporté mais Node.js 18+ est recommandé pour Next.js 15');
      } else {
        this.addResult('Versions', 'error', `Node.js ${nodeVersion} - Version trop ancienne`,
          'Next.js 15 nécessite Node.js 16+ (18+ recommandé)');
      }

      // Vérification npm
      const npmVersion = versions.npm;
      const npmMajor = parseInt(npmVersion.split('.')[0]);
      
      if (npmMajor >= 8) {
        this.addResult('Versions', 'success', `npm ${npmVersion} ✓`);
      } else {
        this.addResult('Versions', 'warning', `npm ${npmVersion} - Version ancienne`,
          'npm 8+ est recommandé pour une meilleure gestion des dépendances');
      }

      // Vérification Next.js
      if (versions.next) {
        const nextMajor = parseInt(versions.next.split('.')[0]);
        if (nextMajor >= 14) {
          this.addResult('Versions', 'success', `Next.js ${versions.next} ✓`);
        } else {
          this.addResult('Versions', 'warning', `Next.js ${versions.next} - Version ancienne`,
            'Considérez une mise à jour vers Next.js 14+ pour les dernières fonctionnalités');
        }
      }

    } catch (error) {
      this.addResult('Versions', 'error', 'Erreur lors de la vérification des versions',
        `Détails: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }

  /**
   * Récupère les versions des outils installés
   */
  private getVersions(): VersionInfo {
    const versions: VersionInfo = {
      node: process.version.replace('v', ''),
      npm: execSync('npm --version', { encoding: 'utf8' }).trim()
    };

    try {
      // Vérification Next.js
      const packageJsonPath = join(this.projectRoot, 'package.json');
      if (existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
        
        if (deps.next) {
          versions.next = deps.next.replace(/[\^~]/, '');
        }
        if (deps.react) {
          versions.react = deps.react.replace(/[\^~]/, '');
        }
        if (deps.typescript) {
          versions.typescript = deps.typescript.replace(/[\^~]/, '');
        }
      }
    } catch (error) {
      // Ignore les erreurs de lecture du package.json
    }

    return versions;
  }

  /**
   * Vérifie la présence des fichiers critiques
   */
  private async checkCriticalFiles(): Promise<void> {
    const criticalFiles = [
      { path: 'package.json', required: true },
      { path: 'next.config.js', required: false },
      { path: 'next.config.ts', required: false },
      { path: 'tsconfig.json', required: false },
      { path: 'tailwind.config.ts', required: false }
    ];

    let hasNextConfig = false;

    for (const file of criticalFiles) {
      const filePath = join(this.projectRoot, file.path);
      const exists = existsSync(filePath);

      if (file.path.startsWith('next.config')) {
        if (exists) hasNextConfig = true;
      }

      if (exists) {
        try {
          const stats = statSync(filePath);
          if (stats.size === 0) {
            this.addResult('Fichiers', 'warning', `${file.path} est vide`,
              'Un fichier vide peut causer des erreurs de parsing');
          } else {
            this.addResult('Fichiers', 'success', `${file.path} ✓`);
          }
        } catch (error) {
          this.addResult('Fichiers', 'error', `Erreur d'accès à ${file.path}`,
            'Vérifiez les permissions du fichier');
        }
      } else if (file.required) {
        this.addResult('Fichiers', 'error', `${file.path} manquant`,
          'Ce fichier est requis pour le fonctionnement du projet');
      }
    }

    if (!hasNextConfig) {
      this.addResult('Fichiers', 'warning', 'Aucun fichier next.config trouvé',
        'Un fichier de configuration Next.js peut être nécessaire selon votre setup');
    }
  }

  /**
   * Vérifie l'état des dépendances
   */
  private async checkDependencies(): Promise<void> {
    try {
      const packageJsonPath = join(this.projectRoot, 'package.json');
      const packageLockPath = join(this.projectRoot, 'package-lock.json');
      const yarnLockPath = join(this.projectRoot, 'yarn.lock');

      if (!existsSync(packageJsonPath)) {
        this.addResult('Dépendances', 'error', 'package.json manquant');
        return;
      }

      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

      // Vérification des dépendances critiques Next.js
      const criticalDeps = ['next', 'react', 'react-dom'];
      const missingDeps = criticalDeps.filter(dep => !deps[dep]);

      if (missingDeps.length > 0) {
        this.addResult('Dépendances', 'error', `Dépendances critiques manquantes: ${missingDeps.join(', ')}`,
          'Ces dépendances sont requises pour Next.js');
      } else {
        this.addResult('Dépendances', 'success', 'Dépendances critiques présentes ✓');
      }

      // Vérification des lock files
      const hasPackageLock = existsSync(packageLockPath);
      const hasYarnLock = existsSync(yarnLockPath);

      if (hasPackageLock && hasYarnLock) {
        this.addResult('Dépendances', 'warning', 'Plusieurs lock files détectés',
          'package-lock.json et yarn.lock présents - utilisez un seul gestionnaire de packages');
      } else if (!hasPackageLock && !hasYarnLock) {
        this.addResult('Dépendances', 'warning', 'Aucun lock file trouvé',
          'Un lock file garantit la reproductibilité des installations');
      } else {
        const lockFile = hasPackageLock ? 'package-lock.json' : 'yarn.lock';
        this.addResult('Dépendances', 'success', `Lock file présent: ${lockFile} ✓`);
      }

    } catch (error) {
      this.addResult('Dépendances', 'error', 'Erreur lors de la vérification des dépendances',
        `Détails: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }

  /**
   * Vérifie l'intégrité du dossier node_modules
   */
  private async checkNodeModules(): Promise<void> {
    const nodeModulesPath = join(this.projectRoot, 'node_modules');

    if (!existsSync(nodeModulesPath)) {
      this.addResult('Node Modules', 'error', 'Dossier node_modules manquant',
        'Exécutez "npm install" pour installer les dépendances');
      return;
    }

    try {
      const stats = statSync(nodeModulesPath);
      if (!stats.isDirectory()) {
        this.addResult('Node Modules', 'error', 'node_modules n\'est pas un dossier');
        return;
      }

      // Vérification des modules critiques
      const criticalModules = ['next', 'react', 'react-dom'];
      const missingModules = [];

      for (const module of criticalModules) {
        const modulePath = join(nodeModulesPath, module);
        if (!existsSync(modulePath)) {
          missingModules.push(module);
        }
      }

      if (missingModules.length > 0) {
        this.addResult('Node Modules', 'error', `Modules critiques manquants: ${missingModules.join(', ')}`,
          'Réinstallez les dépendances avec "npm install"');
      } else {
        this.addResult('Node Modules', 'success', 'Modules critiques présents ✓');
      }

      // Vérification de l'intégrité du module Next.js
      const nextModulePath = join(nodeModulesPath, 'next');
      const nextPackageJsonPath = join(nextModulePath, 'package.json');
      
      if (existsSync(nextPackageJsonPath)) {
        try {
          const nextPackageJson = JSON.parse(readFileSync(nextPackageJsonPath, 'utf8'));
          if (nextPackageJson.name === 'next') {
            this.addResult('Node Modules', 'success', `Module Next.js v${nextPackageJson.version} intègre ✓`);
          } else {
            this.addResult('Node Modules', 'warning', 'Module Next.js potentiellement corrompu',
              'Le package.json du module Next.js semble incorrect');
          }
        } catch (error) {
          this.addResult('Node Modules', 'warning', 'Erreur de lecture du module Next.js',
            'Le module Next.js pourrait être corrompu');
        }
      }

    } catch (error) {
      this.addResult('Node Modules', 'error', 'Erreur lors de la vérification de node_modules',
        `Détails: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }

  /**
   * Vérifie l'état des caches
   */
  private async checkCaches(): Promise<void> {
    const nextCachePath = join(this.projectRoot, '.next');
    
    if (existsSync(nextCachePath)) {
      try {
        const stats = statSync(nextCachePath);
        const ageInHours = (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60);
        
        if (ageInHours > 24) {
          this.addResult('Caches', 'warning', `Cache Next.js ancien (${Math.round(ageInHours)}h)`,
            'Un cache ancien peut causer des problèmes - considérez "rm -rf .next"');
        } else {
          this.addResult('Caches', 'success', 'Cache Next.js récent ✓');
        }
      } catch (error) {
        this.addResult('Caches', 'warning', 'Erreur d\'accès au cache Next.js');
      }
    } else {
      this.addResult('Caches', 'success', 'Pas de cache Next.js (normal pour un premier démarrage) ✓');
    }

    // Vérification du cache npm
    try {
      const npmCacheInfo = execSync('npm config get cache', { encoding: 'utf8' }).trim();
      if (npmCacheInfo && existsSync(npmCacheInfo)) {
        this.addResult('Caches', 'success', 'Cache npm accessible ✓');
      } else {
        this.addResult('Caches', 'warning', 'Cache npm non trouvé ou inaccessible');
      }
    } catch (error) {
      this.addResult('Caches', 'warning', 'Impossible de vérifier le cache npm');
    }
  }

  /**
   * Vérifie les permissions des fichiers critiques
   */
  private async checkPermissions(): Promise<void> {
    const criticalPaths = [
      this.projectRoot,
      join(this.projectRoot, 'package.json'),
      join(this.projectRoot, 'node_modules')
    ];

    for (const path of criticalPaths) {
      if (existsSync(path)) {
        try {
          // Test de lecture
          statSync(path);
          this.addResult('Permissions', 'success', `Accès en lecture OK: ${path.split('/').pop()} ✓`);
        } catch (error) {
          this.addResult('Permissions', 'error', `Problème d'accès: ${path}`,
            'Vérifiez les permissions du fichier/dossier');
        }
      }
    }
  }

  /**
   * Ajoute un résultat de diagnostic
   */
  private addResult(category: string, status: 'success' | 'warning' | 'error', message: string, details?: string, recommendation?: string): void {
    this.results.push({
      category,
      status,
      message,
      details,
      recommendation
    });
  }

  /**
   * Affiche les résultats du diagnostic
   */
  displayResults(): void {
    console.log('\n📊 Résultats du diagnostic:\n');

    const categories = [...new Set(this.results.map(r => r.category))];
    
    for (const category of categories) {
      console.log(`\n🔍 ${category}:`);
      const categoryResults = this.results.filter(r => r.category === category);
      
      for (const result of categoryResults) {
        const icon = result.status === 'success' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
        console.log(`  ${icon} ${result.message}`);
        
        if (result.details) {
          console.log(`     💡 ${result.details}`);
        }
        
        if (result.recommendation) {
          console.log(`     🔧 Recommandation: ${result.recommendation}`);
        }
      }
    }

    // Résumé
    const successCount = this.results.filter(r => r.status === 'success').length;
    const warningCount = this.results.filter(r => r.status === 'warning').length;
    const errorCount = this.results.filter(r => r.status === 'error').length;

    console.log('\n📈 Résumé:');
    console.log(`  ✅ Succès: ${successCount}`);
    console.log(`  ⚠️  Avertissements: ${warningCount}`);
    console.log(`  ❌ Erreurs: ${errorCount}`);

    if (errorCount > 0) {
      console.log('\n🚨 Actions recommandées pour corriger les erreurs:');
      console.log('  1. Vérifiez les versions de Node.js et npm');
      console.log('  2. Réinstallez les dépendances: rm -rf node_modules package-lock.json && npm install');
      console.log('  3. Nettoyez les caches: rm -rf .next && npm cache clean --force');
      console.log('  4. Vérifiez les permissions des fichiers');
    } else if (warningCount > 0) {
      console.log('\n💡 Optimisations suggérées:');
      console.log('  - Mettez à jour les versions anciennes');
      console.log('  - Nettoyez les caches anciens si nécessaire');
      console.log('  - Résolvez les conflits de gestionnaires de packages');
    } else {
      console.log('\n🎉 Environnement en parfait état ! Next.js devrait démarrer sans problème.');
    }
  }

  /**
   * Génère un rapport JSON pour l'intégration avec d'autres outils
   */
  generateReport(): string {
    const report = {
      timestamp: new Date().toISOString(),
      projectRoot: this.projectRoot,
      summary: {
        total: this.results.length,
        success: this.results.filter(r => r.status === 'success').length,
        warnings: this.results.filter(r => r.status === 'warning').length,
        errors: this.results.filter(r => r.status === 'error').length
      },
      results: this.results,
      healthScore: Math.round((this.results.filter(r => r.status === 'success').length / this.results.length) * 100)
    };

    return JSON.stringify(report, null, 2);
  }
}

/**
 * Fonction principale
 */
async function main() {
  const diagnostic = new EnvironmentDiagnostic();
  
  try {
    await diagnostic.runDiagnostics();
    diagnostic.displayResults();

    // Génération du rapport si demandé
    if (process.argv.includes('--json')) {
      const report = diagnostic.generateReport();
      console.log('\n📄 Rapport JSON:');
      console.log(report);
    }

    // Sauvegarde du rapport si demandé
    if (process.argv.includes('--save')) {
      const fs = require('fs');
      const report = diagnostic.generateReport();
      const filename = `diagnostic-${Date.now()}.json`;
      fs.writeFileSync(filename, report);
      console.log(`\n💾 Rapport sauvegardé: ${filename}`);
    }

  } catch (error) {
    console.error('❌ Erreur lors du diagnostic:', error);
    process.exit(1);
  }
}

// Exécution si appelé directement
if (require.main === module) {
  main();
}

export { EnvironmentDiagnostic };