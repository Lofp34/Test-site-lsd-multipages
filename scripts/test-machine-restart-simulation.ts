#!/usr/bin/env tsx

/**
 * Simulation de test après redémarrage machine
 * Teste la persistance de l'environnement Next.js
 * 
 * Requirement: 3.2 - L'environnement doit rester stable dans le temps
 */

import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import chalk from 'chalk';

interface EnvironmentState {
  nodeModulesExists: boolean;
  nextBuildExists: boolean;
  packageLockExists: boolean;
  envFileExists: boolean;
  nodeVersion: string;
  npmVersion: string;
  timestamp: string;
}

class MachineRestartSimulator {
  private stateFile = path.join(process.cwd(), '.next-stability-state.json');

  async run(): Promise<void> {
    console.log(chalk.blue('🔄 Simulation de test après redémarrage machine'));
    console.log(chalk.gray('Ce test simule un redémarrage complet de la machine\n'));

    // Phase 1: Capturer l'état avant "redémarrage"
    console.log(chalk.yellow('Phase 1: Capture de l\'état actuel'));
    const beforeState = await this.captureEnvironmentState();
    await this.saveState(beforeState);
    console.log(chalk.green('✅ État capturé et sauvegardé\n'));

    // Phase 2: Simuler le redémarrage (nettoyage des processus)
    console.log(chalk.yellow('Phase 2: Simulation du redémarrage'));
    await this.simulateRestart();
    console.log(chalk.green('✅ Redémarrage simulé\n'));

    // Phase 3: Vérifier l'état après "redémarrage"
    console.log(chalk.yellow('Phase 3: Vérification après redémarrage'));
    const afterState = await this.captureEnvironmentState();
    await this.compareStates(beforeState, afterState);

    // Phase 4: Test de démarrage
    console.log(chalk.yellow('Phase 4: Test de démarrage après redémarrage'));
    const startupSuccess = await this.testStartupAfterRestart();
    
    // Phase 5: Rapport final
    await this.generateFinalReport(beforeState, afterState, startupSuccess);
  }

  private async captureEnvironmentState(): Promise<EnvironmentState> {
    const nodeModulesExists = await this.pathExists('node_modules');
    const nextBuildExists = await this.pathExists('.next');
    const packageLockExists = await this.pathExists('package-lock.json');
    const envFileExists = await this.pathExists('.env') || await this.pathExists('.env.local');
    
    const nodeVersion = process.version;
    const npmVersion = await this.getCommandOutput('npm --version');

    return {
      nodeModulesExists,
      nextBuildExists,
      packageLockExists,
      envFileExists,
      nodeVersion,
      npmVersion: npmVersion.trim(),
      timestamp: new Date().toISOString()
    };
  }

  private async pathExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(path.join(process.cwd(), filePath));
      return true;
    } catch {
      return false;
    }
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

  private async saveState(state: EnvironmentState): Promise<void> {
    await fs.writeFile(this.stateFile, JSON.stringify(state, null, 2));
  }

  private async loadState(): Promise<EnvironmentState | null> {
    try {
      const content = await fs.readFile(this.stateFile, 'utf-8');
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  private async simulateRestart(): Promise<void> {
    console.log(chalk.blue('  🔄 Nettoyage des processus Node.js...'));
    
    // Tuer tous les processus Node.js liés au projet
    try {
      await this.getCommandOutput('pkill -f "next dev" || true');
      await this.getCommandOutput('pkill -f "node.*next" || true');
    } catch {
      // Ignore les erreurs, c'est normal si aucun processus n'est trouvé
    }

    console.log(chalk.blue('  ⏳ Simulation de la pause de redémarrage (5 secondes)...'));
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log(chalk.blue('  🔄 Vérification de l\'état des processus...'));
    
    // Vérifier qu'aucun processus Next.js n'est en cours
    try {
      const processes = await this.getCommandOutput('ps aux | grep -i next | grep -v grep || echo "no processes"');
      if (processes.includes('next dev')) {
        console.log(chalk.yellow('  ⚠️  Processus Next.js encore actifs détectés'));
      } else {
        console.log(chalk.green('  ✅ Aucun processus Next.js actif'));
      }
    } catch {
      console.log(chalk.green('  ✅ Environnement propre'));
    }
  }

  private async compareStates(before: EnvironmentState, after: EnvironmentState): Promise<void> {
    console.log(chalk.cyan('  📊 Comparaison des états:'));
    
    const checks = [
      { name: 'node_modules', before: before.nodeModulesExists, after: after.nodeModulesExists },
      { name: '.next build', before: before.nextBuildExists, after: after.nextBuildExists },
      { name: 'package-lock.json', before: before.packageLockExists, after: after.packageLockExists },
      { name: 'Fichiers env', before: before.envFileExists, after: after.envFileExists },
      { name: 'Version Node.js', before: before.nodeVersion, after: after.nodeVersion },
      { name: 'Version npm', before: before.npmVersion, after: after.npmVersion }
    ];

    let allPersistent = true;

    checks.forEach(check => {
      const persistent = check.before === check.after;
      const status = persistent ? chalk.green('✅') : chalk.red('❌');
      const change = persistent ? 'Inchangé' : `${check.before} → ${check.after}`;
      
      console.log(`    ${status} ${check.name}: ${change}`);
      
      if (!persistent) {
        allPersistent = false;
      }
    });

    if (allPersistent) {
      console.log(chalk.green('  ✅ Tous les éléments de l\'environnement sont persistants'));
    } else {
      console.log(chalk.yellow('  ⚠️  Certains éléments ont changé après le redémarrage'));
    }
  }

  private async testStartupAfterRestart(): Promise<boolean> {
    console.log(chalk.blue('  🚀 Test de démarrage du serveur...'));
    
    try {
      const server = spawn('npm', ['run', 'dev'], {
        stdio: 'pipe',
        detached: false
      });

      // Attendre le démarrage
      const startupSuccess = await new Promise<boolean>((resolve) => {
        let output = '';
        const timeout = setTimeout(() => resolve(false), 25000);

        server.stdout?.on('data', (data) => {
          output += data.toString();
          if (output.includes('Ready') || output.includes('started server on')) {
            clearTimeout(timeout);
            resolve(true);
          }
        });

        server.stderr?.on('data', (data) => {
          const errorOutput = data.toString();
          if (errorOutput.includes('Error') && !errorOutput.includes('warn')) {
            clearTimeout(timeout);
            resolve(false);
          }
        });

        server.on('error', () => {
          clearTimeout(timeout);
          resolve(false);
        });
      });

      if (startupSuccess) {
        console.log(chalk.green('  ✅ Serveur démarré avec succès'));
        
        // Test de réponse
        console.log(chalk.blue('  🔍 Test de réponse HTTP...'));
        let responseSuccess = false;
        
        for (let i = 0; i < 5; i++) {
          try {
            const response = await fetch('http://localhost:3000');
            if (response.ok) {
              const text = await response.text();
              if (text.includes('<html') && !text.includes('Application error')) {
                responseSuccess = true;
                break;
              }
            }
          } catch {
            // Retry
          }
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        if (responseSuccess) {
          console.log(chalk.green('  ✅ Serveur répond correctement'));
        } else {
          console.log(chalk.red('  ❌ Serveur ne répond pas correctement'));
        }

        // Arrêter le serveur
        if (server.pid) {
          try {
            process.kill(-server.pid, 'SIGTERM');
          } catch {
            server.kill('SIGTERM');
          }
        }

        return responseSuccess;
      } else {
        console.log(chalk.red('  ❌ Échec du démarrage du serveur'));
        return false;
      }

    } catch (error) {
      console.log(chalk.red(`  ❌ Erreur lors du test: ${error instanceof Error ? error.message : 'Erreur inconnue'}`));
      return false;
    }
  }

  private async generateFinalReport(before: EnvironmentState, after: EnvironmentState, startupSuccess: boolean): Promise<void> {
    const report = {
      testType: 'Machine Restart Simulation',
      timestamp: new Date().toISOString(),
      beforeState: before,
      afterState: after,
      environmentPersistent: JSON.stringify(before) === JSON.stringify(after),
      startupAfterRestart: startupSuccess,
      overallSuccess: startupSuccess && (JSON.stringify(before) === JSON.stringify(after))
    };

    // Sauvegarder le rapport
    const reportPath = path.join(process.cwd(), 'reports', `machine-restart-test-${Date.now()}.json`);
    try {
      await fs.mkdir(path.dirname(reportPath), { recursive: true });
      await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    } catch {
      // Ignore si on ne peut pas sauvegarder
    }

    // Afficher le résumé final
    console.log(chalk.blue('\n📋 RAPPORT FINAL - SIMULATION REDÉMARRAGE MACHINE'));
    console.log(chalk.cyan('================================================'));
    
    const envStatus = report.environmentPersistent ? 
      chalk.green('✅ Persistant') : 
      chalk.yellow('⚠️  Partiellement persistant');
    
    const startupStatus = startupSuccess ? 
      chalk.green('✅ Réussi') : 
      chalk.red('❌ Échec');
    
    console.log(`Persistance environnement: ${envStatus}`);
    console.log(`Démarrage après redémarrage: ${startupStatus}`);
    
    if (report.overallSuccess) {
      console.log(chalk.green('\n🎉 SUCCÈS COMPLET'));
      console.log(chalk.green('L\'environnement Next.js est stable après un redémarrage machine.'));
      console.log(chalk.green('Requirement 3.2 validé: L\'environnement reste stable dans le temps.'));
    } else {
      console.log(chalk.yellow('\n⚠️  SUCCÈS PARTIEL'));
      if (!report.environmentPersistent) {
        console.log(chalk.yellow('- Certains éléments de l\'environnement ont changé'));
      }
      if (!startupSuccess) {
        console.log(chalk.yellow('- Le démarrage après redémarrage a échoué'));
      }
      console.log(chalk.cyan('\nRecommandations:'));
      console.log('  - Vérifier la configuration des dépendances');
      console.log('  - S\'assurer que tous les fichiers critiques sont présents');
      console.log('  - Tester avec npm run recovery:full');
    }

    // Nettoyer le fichier d'état
    try {
      await fs.unlink(this.stateFile);
    } catch {
      // Ignore si le fichier n'existe pas
    }
  }
}

// Exécution
if (require.main === module) {
  const simulator = new MachineRestartSimulator();
  simulator.run().catch(error => {
    console.error(chalk.red('❌ Erreur lors de la simulation:'), error);
    process.exit(1);
  });
}

export { MachineRestartSimulator };