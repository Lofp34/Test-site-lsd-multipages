#!/usr/bin/env tsx

/**
 * Script de maintenance Next.js
 * Prévention et résolution des erreurs ERR_INVALID_PACKAGE_CONFIG
 */

import { execSync, spawn } from 'child_process';
import { existsSync, statSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';

interface DiagnosticResult {
  timestamp: string;
  nodeVersion: string;
  npmVersion: string;
  nextVersion?: string;
  reactVersion?: string;
  hasNodeModules: boolean;
  hasPackageLock: boolean;
  hasNextBuild: boolean;
  cacheSize: number;
  issues: string[];
  recommendations: string[];
}

class NextJSMaintenance {
  private projectRoot: string;

  constructor() {
    this.projectRoot = process.cwd();
  }

  /**
   * Diagnostic complet de l'environnement
   */
  async diagnose(): Promise<DiagnosticResult> {
    console.log(chalk.blue('🔍 Diagnostic de l\'environnement Next.js...'));
    
    const result: DiagnosticResult = {
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      npmVersion: this.getCommandOutput('npm --version'),
      hasNodeModules: existsSync(join(this.projectRoot, 'node_modules')),
      hasPackageLock: existsSync(join(this.projectRoot, 'package-lock.json')),
      hasNextBuild: existsSync(join(this.projectRoot, '.next')),
      cacheSize: 0,
      issues: [],
      recommendations: []
    };

    // Vérifier les versions des packages critiques
    try {
      if (result.hasNodeModules) {
        const nextPkg = join(this.projectRoot, 'node_modules/next/package.json');
        const reactPkg = join(this.projectRoot, 'node_modules/react/package.json');
        
        if (existsSync(nextPkg)) {
          result.nextVersion = JSON.parse(readFileSync(nextPkg, 'utf8')).version;
        }
        
        if (existsSync(reactPkg)) {
          result.reactVersion = JSON.parse(readFileSync(reactPkg, 'utf8')).version;
        }
      }
    } catch (error) {
      result.issues.push('Impossible de lire les versions des packages');
    }

    // Vérifier la taille du cache
    try {
      const cacheDir = join(require('os').homedir(), '.npm');
      if (existsSync(cacheDir)) {
        result.cacheSize = this.getDirSize(cacheDir);
      }
    } catch (error) {
      // Ignorer les erreurs de cache
    }

    // Analyser les problèmes potentiels
    this.analyzeIssues(result);

    return result;
  }

  /**
   * Analyser les problèmes et recommandations
   */
  private analyzeIssues(result: DiagnosticResult): void {
    // Vérifier la version Node.js
    const nodeMajor = parseInt(result.nodeVersion.replace('v', '').split('.')[0]);
    if (nodeMajor < 18) {
      result.issues.push(`Version Node.js ${result.nodeVersion} obsolète`);
      result.recommendations.push('Mettre à jour vers Node.js 18+ avec nvm');
    }

    // Vérifier npm
    const npmMajor = parseInt(result.npmVersion.split('.')[0]);
    if (npmMajor < 8) {
      result.issues.push(`Version npm ${result.npmVersion} obsolète`);
      result.recommendations.push('Mettre à jour npm: npm install -g npm@latest');
    }

    // Vérifier l'absence de lock file
    if (result.hasNodeModules && !result.hasPackageLock) {
      result.issues.push('node_modules présent mais pas de package-lock.json');
      result.recommendations.push('Supprimer node_modules et réinstaller avec npm ci');
    }

    // Vérifier la taille du cache
    if (result.cacheSize > 1000000000) { // 1GB
      result.issues.push(`Cache npm volumineux (${Math.round(result.cacheSize / 1000000)}MB)`);
      result.recommendations.push('Nettoyer le cache: npm cache clean --force');
    }

    // Vérifier les modules critiques
    if (result.hasNodeModules) {
      const criticalPaths = [
        'node_modules/next',
        'node_modules/react',
        'node_modules/react-dom'
      ];

      for (const path of criticalPaths) {
        if (!existsSync(join(this.projectRoot, path))) {
          result.issues.push(`Module critique manquant: ${path}`);
          result.recommendations.push('Réinstaller les dépendances');
        }
      }

      // Vérifier spécifiquement le module conf de Next.js
      const confPath = join(this.projectRoot, 'node_modules/next/dist/compiled/conf/package.json');
      if (existsSync(join(this.projectRoot, 'node_modules/next')) && !existsSync(confPath)) {
        result.issues.push('Module conf de Next.js potentiellement corrompu');
        result.recommendations.push('Nettoyer et réinstaller Next.js');
      }
    }
  }

  /**
   * Nettoyage automatique de l'environnement
   */
  async cleanup(): Promise<void> {
    console.log(chalk.yellow('🧹 Nettoyage de l\'environnement...'));

    const itemsToClean = [
      { path: 'node_modules', description: 'Modules Node.js' },
      { path: '.next', description: 'Build Next.js' },
      { path: 'out', description: 'Export Next.js' },
      { path: '.swc', description: 'Cache SWC' },
      { path: 'package-lock.json', description: 'Lock file npm' },
      { path: 'yarn.lock', description: 'Lock file Yarn' },
      { path: 'pnpm-lock.yaml', description: 'Lock file pnpm' }
    ];

    for (const item of itemsToClean) {
      const fullPath = join(this.projectRoot, item.path);
      if (existsSync(fullPath)) {
        console.log(chalk.gray(`  🗑️  Suppression: ${item.description}`));
        try {
          execSync(`rm -rf "${fullPath}"`, { stdio: 'pipe' });
        } catch (error) {
          console.log(chalk.red(`    ❌ Erreur lors de la suppression de ${item.path}`));
        }
      }
    }

    // Nettoyer les caches
    console.log(chalk.gray('  🧽 Nettoyage des caches...'));
    try {
      execSync('npm cache clean --force', { stdio: 'pipe' });
    } catch (error) {
      console.log(chalk.red('    ⚠️  Impossible de nettoyer le cache npm'));
    }

    try {
      execSync('npx clear-npx-cache', { stdio: 'pipe' });
    } catch (error) {
      // Ignorer si npx clear-npx-cache n'existe pas
    }

    console.log(chalk.green('✅ Nettoyage terminé'));
  }

  /**
   * Installation propre des dépendances
   */
  async freshInstall(): Promise<void> {
    console.log(chalk.blue('📦 Installation propre des dépendances...'));

    // Vérifier que package.json existe
    if (!existsSync(join(this.projectRoot, 'package.json'))) {
      throw new Error('package.json introuvable!');
    }

    try {
      // Essayer npm ci d'abord
      console.log(chalk.gray('  Tentative avec npm ci...'));
      execSync('npm ci --prefer-offline=false --no-audit', { 
        stdio: 'inherit',
        cwd: this.projectRoot 
      });
      console.log(chalk.green('✅ Installation réussie avec npm ci'));
    } catch (error) {
      console.log(chalk.yellow('  npm ci a échoué, tentative avec npm install...'));
      try {
        execSync('npm install --prefer-offline=false --no-audit', { 
          stdio: 'inherit',
          cwd: this.projectRoot 
        });
        console.log(chalk.green('✅ Installation réussie avec npm install'));
      } catch (installError) {
        throw new Error('Échec de l\'installation des dépendances');
      }
    }
  }

  /**
   * Vérification post-installation
   */
  async verify(): Promise<boolean> {
    console.log(chalk.blue('🔍 Vérification de l\'installation...'));

    const checks = [
      {
        name: 'node_modules existe',
        check: () => existsSync(join(this.projectRoot, 'node_modules'))
      },
      {
        name: 'Next.js installé',
        check: () => existsSync(join(this.projectRoot, 'node_modules/next'))
      },
      {
        name: 'React installé',
        check: () => existsSync(join(this.projectRoot, 'node_modules/react'))
      },
      {
        name: 'React DOM installé',
        check: () => existsSync(join(this.projectRoot, 'node_modules/react-dom'))
      }
    ];

    let allPassed = true;

    for (const check of checks) {
      const passed = check.check();
      console.log(passed ? 
        chalk.green(`  ✅ ${check.name}`) : 
        chalk.red(`  ❌ ${check.name}`)
      );
      if (!passed) allPassed = false;
    }

    return allPassed;
  }

  /**
   * Test de démarrage rapide
   */
  async testStartup(): Promise<boolean> {
    console.log(chalk.blue('🧪 Test de démarrage Next.js...'));

    return new Promise((resolve) => {
      const child = spawn('npm', ['run', 'dev'], {
        cwd: this.projectRoot,
        stdio: 'pipe'
      });

      let started = false;
      const timeout = setTimeout(() => {
        if (!started) {
          child.kill();
          console.log(chalk.red('  ❌ Timeout - le serveur n\'a pas démarré'));
          resolve(false);
        }
      }, 30000); // 30 secondes

      child.stdout?.on('data', (data) => {
        const output = data.toString();
        if (output.includes('Ready') || output.includes('started server')) {
          started = true;
          clearTimeout(timeout);
          child.kill();
          console.log(chalk.green('  ✅ Serveur Next.js démarré avec succès'));
          resolve(true);
        }
      });

      child.stderr?.on('data', (data) => {
        const error = data.toString();
        if (error.includes('ERR_INVALID_PACKAGE_CONFIG')) {
          clearTimeout(timeout);
          child.kill();
          console.log(chalk.red('  ❌ Erreur ERR_INVALID_PACKAGE_CONFIG détectée'));
          resolve(false);
        }
      });

      child.on('error', () => {
        clearTimeout(timeout);
        console.log(chalk.red('  ❌ Erreur lors du démarrage'));
        resolve(false);
      });
    });
  }

  /**
   * Maintenance complète
   */
  async fullMaintenance(): Promise<void> {
    console.log(chalk.blue.bold('🔧 Maintenance complète Next.js'));
    console.log('='.repeat(50));

    try {
      // 1. Diagnostic initial
      const initialDiag = await this.diagnose();
      this.printDiagnostic(initialDiag);

      if (initialDiag.issues.length === 0) {
        console.log(chalk.green('✅ Aucun problème détecté, maintenance non nécessaire'));
        return;
      }

      // 2. Nettoyage
      await this.cleanup();

      // 3. Installation propre
      await this.freshInstall();

      // 4. Vérification
      const verifyResult = await this.verify();
      if (!verifyResult) {
        throw new Error('Vérification post-installation échouée');
      }

      // 5. Test de démarrage
      const startupResult = await this.testStartup();
      if (!startupResult) {
        console.log(chalk.yellow('⚠️  Test de démarrage échoué, mais l\'installation semble correcte'));
      }

      // 6. Diagnostic final
      const finalDiag = await this.diagnose();
      console.log(chalk.blue('\n📊 Diagnostic final:'));
      this.printDiagnostic(finalDiag);

      console.log(chalk.green.bold('\n🎉 Maintenance terminée avec succès!'));

    } catch (error) {
      console.log(chalk.red.bold(`\n❌ Erreur durant la maintenance: ${error}`));
      process.exit(1);
    }
  }

  /**
   * Afficher le diagnostic
   */
  private printDiagnostic(diag: DiagnosticResult): void {
    console.log(chalk.gray(`\n📋 Diagnostic (${diag.timestamp})`));
    console.log(chalk.gray('─'.repeat(40)));
    
    console.log(`Node.js: ${diag.nodeVersion}`);
    console.log(`npm: ${diag.npmVersion}`);
    if (diag.nextVersion) console.log(`Next.js: ${diag.nextVersion}`);
    if (diag.reactVersion) console.log(`React: ${diag.reactVersion}`);
    
    console.log(`\nÉtat:`);
    console.log(`  node_modules: ${diag.hasNodeModules ? '✅' : '❌'}`);
    console.log(`  package-lock.json: ${diag.hasPackageLock ? '✅' : '❌'}`);
    console.log(`  Build Next.js: ${diag.hasNextBuild ? '✅' : '❌'}`);

    if (diag.issues.length > 0) {
      console.log(chalk.red('\n⚠️  Problèmes détectés:'));
      diag.issues.forEach(issue => console.log(chalk.red(`  • ${issue}`)));
    }

    if (diag.recommendations.length > 0) {
      console.log(chalk.yellow('\n💡 Recommandations:'));
      diag.recommendations.forEach(rec => console.log(chalk.yellow(`  • ${rec}`)));
    }
  }

  /**
   * Utilitaires
   */
  private getCommandOutput(command: string): string {
    try {
      return execSync(command, { encoding: 'utf8' }).trim();
    } catch {
      return 'unknown';
    }
  }

  private getDirSize(dirPath: string): number {
    try {
      const output = execSync(`du -sb "${dirPath}" 2>/dev/null || echo "0"`, { encoding: 'utf8' });
      return parseInt(output.split('\t')[0]) || 0;
    } catch {
      return 0;
    }
  }
}

// CLI
async function main() {
  const maintenance = new NextJSMaintenance();
  const command = process.argv[2];

  switch (command) {
    case 'diagnose':
      const diag = await maintenance.diagnose();
      maintenance['printDiagnostic'](diag);
      
      // Sauvegarder si demandé
      if (process.argv.includes('--save')) {
        const filename = `diagnostic-${Date.now()}.json`;
        writeFileSync(filename, JSON.stringify(diag, null, 2));
        console.log(chalk.green(`\n💾 Diagnostic sauvegardé: ${filename}`));
      }
      break;

    case 'cleanup':
      await maintenance.cleanup();
      break;

    case 'install':
      await maintenance.freshInstall();
      break;

    case 'verify':
      const result = await maintenance.verify();
      process.exit(result ? 0 : 1);
      break;

    case 'test':
      const testResult = await maintenance.testStartup();
      process.exit(testResult ? 0 : 1);
      break;

    case 'full':
    default:
      await maintenance.fullMaintenance();
      break;
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error(chalk.red(`Erreur: ${error.message}`));
    process.exit(1);
  });
}

export default NextJSMaintenance;