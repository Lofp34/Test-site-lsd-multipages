#!/usr/bin/env tsx

/**
 * Script de test de stabilité pour Next.js
 * Teste la stabilité sur plusieurs redémarrages du serveur
 * 
 * Requirement: 3.2 - L'environnement doit rester stable dans le temps
 */

import { spawn, ChildProcess } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import chalk from 'chalk';

interface TestResult {
  attempt: number;
  success: boolean;
  startTime: number;
  responseTime?: number;
  error?: string;
  timestamp: string;
}

interface StabilityReport {
  totalTests: number;
  successfulStarts: number;
  failedStarts: number;
  averageStartTime: number;
  averageResponseTime: number;
  results: TestResult[];
  systemInfo: {
    nodeVersion: string;
    npmVersion: string;
    nextVersion: string;
    platform: string;
    arch: string;
    memory: string;
  };
}

class StabilityTester {
  private results: TestResult[] = [];
  private reportPath: string;

  constructor() {
    this.reportPath = path.join(process.cwd(), 'reports', `stability-test-${Date.now()}.json`);
  }

  async run(): Promise<void> {
    console.log(chalk.blue('🔄 Démarrage des tests de stabilité Next.js'));
    console.log(chalk.gray('Tests prévus: 5 redémarrages + test après redémarrage machine simulé'));
    
    // Créer le dossier reports s'il n'existe pas
    await this.ensureReportsDirectory();
    
    // Collecter les informations système
    const systemInfo = await this.getSystemInfo();
    console.log(chalk.cyan('\n📊 Informations système:'));
    console.log(`  Node.js: ${systemInfo.nodeVersion}`);
    console.log(`  npm: ${systemInfo.npmVersion}`);
    console.log(`  Next.js: ${systemInfo.nextVersion}`);
    console.log(`  Plateforme: ${systemInfo.platform} ${systemInfo.arch}`);
    console.log(`  Mémoire: ${systemInfo.memory}`);

    // Test 1: Redémarrages multiples rapides
    console.log(chalk.yellow('\n🚀 Phase 1: Tests de redémarrages multiples'));
    await this.testMultipleRestarts(5);

    // Test 2: Test de stabilité après pause (simule redémarrage machine)
    console.log(chalk.yellow('\n⏱️  Phase 2: Test après pause (simulation redémarrage machine)'));
    await this.testAfterPause();

    // Test 3: Test de charge après redémarrage
    console.log(chalk.yellow('\n🔥 Phase 3: Test de charge après redémarrage'));
    await this.testLoadAfterRestart();

    // Générer le rapport final
    await this.generateReport(systemInfo);
  }

  private async ensureReportsDirectory(): Promise<void> {
    const reportsDir = path.join(process.cwd(), 'reports');
    try {
      await fs.access(reportsDir);
    } catch {
      await fs.mkdir(reportsDir, { recursive: true });
    }
  }

  private async getSystemInfo(): Promise<StabilityReport['systemInfo']> {
    const nodeVersion = process.version;
    const npmVersion = await this.getCommandOutput('npm --version');
    const nextVersion = await this.getNextVersion();
    const platform = process.platform;
    const arch = process.arch;
    const memory = `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`;

    return {
      nodeVersion,
      npmVersion: npmVersion.trim(),
      nextVersion,
      platform,
      arch,
      memory
    };
  }

  private async getCommandOutput(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const [cmd, ...args] = command.split(' ');
      const child = spawn(cmd, args, { stdio: 'pipe' });
      let output = '';
      
      child.stdout?.on('data', (data) => {
        output += data.toString();
      });
      
      child.on('close', (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(new Error(`Command failed with code ${code}`));
        }
      });
    });
  }

  private async getNextVersion(): Promise<string> {
    try {
      const packageJson = JSON.parse(
        await fs.readFile(path.join(process.cwd(), 'package.json'), 'utf-8')
      );
      return packageJson.dependencies?.next || 'unknown';
    } catch {
      return 'unknown';
    }
  }

  private async testMultipleRestarts(count: number): Promise<void> {
    for (let i = 1; i <= count; i++) {
      console.log(chalk.blue(`\n  Test ${i}/${count}: Démarrage du serveur...`));
      
      const result = await this.testSingleRestart(i);
      this.results.push(result);
      
      if (result.success) {
        console.log(chalk.green(`  ✅ Succès - Temps de démarrage: ${result.startTime}ms, Réponse: ${result.responseTime}ms`));
      } else {
        console.log(chalk.red(`  ❌ Échec - ${result.error}`));
      }

      // Pause entre les tests
      if (i < count) {
        console.log(chalk.gray('  ⏳ Pause de 2 secondes...'));
        await this.sleep(2000);
      }
    }
  }

  private async testSingleRestart(attempt: number): Promise<TestResult> {
    const startTime = Date.now();
    const result: TestResult = {
      attempt,
      success: false,
      startTime: 0,
      timestamp: new Date().toISOString()
    };

    try {
      // Démarrer le serveur Next.js
      const server = await this.startNextServer();
      const serverStartTime = Date.now() - startTime;
      result.startTime = serverStartTime;

      // Attendre que le serveur soit prêt
      await this.waitForServer();

      // Tester la réponse
      const responseStart = Date.now();
      const isResponding = await this.testServerResponse();
      const responseTime = Date.now() - responseStart;
      
      result.responseTime = responseTime;
      result.success = isResponding;

      // Arrêter le serveur
      await this.stopServer(server);

      if (!isResponding) {
        result.error = 'Le serveur ne répond pas correctement';
      }

    } catch (error) {
      result.error = error instanceof Error ? error.message : 'Erreur inconnue';
      result.success = false;
    }

    return result;
  }

  private async startNextServer(): Promise<ChildProcess> {
    return new Promise((resolve, reject) => {
      const server = spawn('npm', ['run', 'dev'], {
        stdio: 'pipe',
        detached: false
      });

      let output = '';
      let resolved = false;

      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          reject(new Error('Timeout: Le serveur n\'a pas démarré dans les temps'));
        }
      }, 30000); // 30 secondes timeout

      server.stdout?.on('data', (data) => {
        output += data.toString();
        if (output.includes('Ready') || output.includes('started server on')) {
          if (!resolved) {
            resolved = true;
            clearTimeout(timeout);
            resolve(server);
          }
        }
      });

      server.stderr?.on('data', (data) => {
        const errorOutput = data.toString();
        if (errorOutput.includes('Error') || errorOutput.includes('EADDRINUSE')) {
          if (!resolved) {
            resolved = true;
            clearTimeout(timeout);
            reject(new Error(`Erreur de démarrage: ${errorOutput}`));
          }
        }
      });

      server.on('error', (error) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          reject(error);
        }
      });
    });
  }

  private async waitForServer(maxAttempts: number = 10): Promise<void> {
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const response = await fetch('http://localhost:3000');
        if (response.ok) {
          return;
        }
      } catch {
        // Serveur pas encore prêt
      }
      await this.sleep(1000);
    }
    throw new Error('Le serveur n\'est pas accessible après 10 tentatives');
  }

  private async testServerResponse(): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:3000');
      const text = await response.text();
      
      // Vérifier que la réponse contient du contenu HTML valide
      return response.ok && 
             text.includes('<html') && 
             text.includes('</html>') &&
             !text.includes('Application error');
    } catch {
      return false;
    }
  }

  private async stopServer(server: ChildProcess): Promise<void> {
    return new Promise((resolve) => {
      if (server.pid) {
        // Tuer le processus et tous ses enfants
        try {
          process.kill(-server.pid, 'SIGTERM');
        } catch {
          server.kill('SIGTERM');
        }
      }
      
      setTimeout(() => {
        if (!server.killed) {
          try {
            process.kill(-server.pid!, 'SIGKILL');
          } catch {
            server.kill('SIGKILL');
          }
        }
        resolve();
      }, 2000);
    });
  }

  private async testAfterPause(): Promise<void> {
    console.log(chalk.blue('  Simulation d\'un redémarrage machine (pause de 10 secondes)...'));
    await this.sleep(10000);
    
    console.log(chalk.blue('  Test de démarrage après "redémarrage machine"...'));
    const result = await this.testSingleRestart(this.results.length + 1);
    this.results.push(result);
    
    if (result.success) {
      console.log(chalk.green(`  ✅ Succès après redémarrage simulé - Temps: ${result.startTime}ms`));
    } else {
      console.log(chalk.red(`  ❌ Échec après redémarrage simulé - ${result.error}`));
    }
  }

  private async testLoadAfterRestart(): Promise<void> {
    console.log(chalk.blue('  Démarrage du serveur pour test de charge...'));
    
    const server = await this.startNextServer();
    await this.waitForServer();
    
    console.log(chalk.blue('  Test de charge: 10 requêtes simultanées...'));
    
    const loadTestPromises = Array.from({ length: 10 }, async (_, i) => {
      try {
        const start = Date.now();
        const response = await fetch(`http://localhost:3000?test=${i}`);
        const time = Date.now() - start;
        return { success: response.ok, time, index: i };
      } catch (error) {
        return { success: false, time: 0, index: i, error: error instanceof Error ? error.message : 'Unknown error' };
      }
    });
    
    const loadResults = await Promise.all(loadTestPromises);
    const successfulRequests = loadResults.filter(r => r.success).length;
    const averageTime = loadResults
      .filter(r => r.success)
      .reduce((sum, r) => sum + r.time, 0) / successfulRequests;
    
    console.log(chalk.green(`  ✅ Test de charge: ${successfulRequests}/10 requêtes réussies`));
    console.log(chalk.cyan(`  📊 Temps de réponse moyen: ${Math.round(averageTime)}ms`));
    
    await this.stopServer(server);
  }

  private async generateReport(systemInfo: StabilityReport['systemInfo']): Promise<void> {
    const successfulStarts = this.results.filter(r => r.success).length;
    const failedStarts = this.results.length - successfulStarts;
    const averageStartTime = this.results
      .filter(r => r.success)
      .reduce((sum, r) => sum + r.startTime, 0) / successfulStarts;
    const averageResponseTime = this.results
      .filter(r => r.success && r.responseTime)
      .reduce((sum, r) => sum + (r.responseTime || 0), 0) / successfulStarts;

    const report: StabilityReport = {
      totalTests: this.results.length,
      successfulStarts,
      failedStarts,
      averageStartTime: Math.round(averageStartTime),
      averageResponseTime: Math.round(averageResponseTime),
      results: this.results,
      systemInfo
    };

    // Sauvegarder le rapport JSON
    await fs.writeFile(this.reportPath, JSON.stringify(report, null, 2));

    // Afficher le résumé
    console.log(chalk.blue('\n📋 RAPPORT DE STABILITÉ'));
    console.log(chalk.cyan('================================'));
    console.log(`Tests effectués: ${report.totalTests}`);
    console.log(`Démarrages réussis: ${chalk.green(report.successfulStarts)}`);
    console.log(`Démarrages échoués: ${chalk.red(report.failedStarts)}`);
    console.log(`Taux de réussite: ${chalk.yellow(Math.round((successfulStarts / report.totalTests) * 100))}%`);
    console.log(`Temps de démarrage moyen: ${chalk.cyan(report.averageStartTime)}ms`);
    console.log(`Temps de réponse moyen: ${chalk.cyan(report.averageResponseTime)}ms`);
    
    if (failedStarts > 0) {
      console.log(chalk.red('\n❌ ÉCHECS DÉTECTÉS:'));
      this.results.filter(r => !r.success).forEach(result => {
        console.log(`  Test ${result.attempt}: ${result.error}`);
      });
    }

    console.log(chalk.gray(`\nRapport détaillé sauvegardé: ${this.reportPath}`));

    // Déterminer le statut final
    const stabilityThreshold = 0.8; // 80% de réussite minimum
    const isStable = (successfulStarts / report.totalTests) >= stabilityThreshold;
    
    if (isStable) {
      console.log(chalk.green('\n✅ ENVIRONNEMENT STABLE'));
      console.log(chalk.green('L\'environnement Next.js est stable sur plusieurs redémarrages.'));
    } else {
      console.log(chalk.red('\n❌ ENVIRONNEMENT INSTABLE'));
      console.log(chalk.red('L\'environnement présente des problèmes de stabilité.'));
      console.log(chalk.yellow('Recommandations:'));
      console.log('  - Vérifier les dépendances avec npm audit');
      console.log('  - Nettoyer l\'environnement avec npm run clean:environment');
      console.log('  - Réinstaller avec npm run fresh:install');
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Exécution du script
if (require.main === module) {
  const tester = new StabilityTester();
  tester.run().catch(error => {
    console.error(chalk.red('❌ Erreur lors des tests de stabilité:'), error);
    process.exit(1);
  });
}

export { StabilityTester };