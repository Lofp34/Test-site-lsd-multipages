#!/usr/bin/env tsx

/**
 * Test de stabilité rapide pour Next.js
 * Version simplifiée pour validation rapide
 * 
 * Requirement: 3.2 - L'environnement doit rester stable dans le temps
 */

import { spawn, ChildProcess } from 'child_process';
import chalk from 'chalk';

class QuickStabilityTester {
  private async testSingleRestart(): Promise<{ success: boolean; time: number; error?: string }> {
    const startTime = Date.now();
    
    try {
      console.log(chalk.blue('  🚀 Démarrage du serveur...'));
      
      // Démarrer le serveur
      const server = spawn('npm', ['run', 'dev'], {
        stdio: 'pipe',
        detached: false
      });

      // Attendre que le serveur soit prêt
      await new Promise<void>((resolve, reject) => {
        let output = '';
        const timeout = setTimeout(() => {
          reject(new Error('Timeout: serveur non démarré'));
        }, 20000);

        server.stdout?.on('data', (data) => {
          output += data.toString();
          if (output.includes('Ready') || output.includes('started server on')) {
            clearTimeout(timeout);
            resolve();
          }
        });

        server.stderr?.on('data', (data) => {
          const errorOutput = data.toString();
          if (errorOutput.includes('Error')) {
            clearTimeout(timeout);
            reject(new Error(`Erreur: ${errorOutput}`));
          }
        });
      });

      console.log(chalk.green('  ✅ Serveur démarré'));

      // Tester la réponse
      console.log(chalk.blue('  🔍 Test de réponse...'));
      let attempts = 0;
      let responding = false;
      
      while (attempts < 5 && !responding) {
        try {
          const response = await fetch('http://localhost:3000');
          if (response.ok) {
            const text = await response.text();
            responding = text.includes('<html') && !text.includes('Application error');
          }
        } catch {
          // Retry
        }
        attempts++;
        if (!responding && attempts < 5) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      // Arrêter le serveur
      if (server.pid) {
        try {
          process.kill(-server.pid, 'SIGTERM');
        } catch {
          server.kill('SIGTERM');
        }
      }

      const totalTime = Date.now() - startTime;
      
      if (!responding) {
        return { success: false, time: totalTime, error: 'Serveur ne répond pas correctement' };
      }

      console.log(chalk.green(`  ✅ Test réussi en ${totalTime}ms`));
      return { success: true, time: totalTime };

    } catch (error) {
      const totalTime = Date.now() - startTime;
      return { 
        success: false, 
        time: totalTime, 
        error: error instanceof Error ? error.message : 'Erreur inconnue' 
      };
    }
  }

  async run(): Promise<void> {
    console.log(chalk.blue('🔄 Test de stabilité rapide Next.js'));
    console.log(chalk.gray('Tests: 3 redémarrages consécutifs\n'));

    const results = [];
    let successCount = 0;

    for (let i = 1; i <= 3; i++) {
      console.log(chalk.yellow(`Test ${i}/3:`));
      
      const result = await this.testSingleRestart();
      results.push(result);
      
      if (result.success) {
        successCount++;
        console.log(chalk.green(`  ✅ Succès\n`));
      } else {
        console.log(chalk.red(`  ❌ Échec: ${result.error}\n`));
      }

      // Pause entre les tests
      if (i < 3) {
        console.log(chalk.gray('  ⏳ Pause de 3 secondes...\n'));
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }

    // Résumé
    console.log(chalk.blue('📋 RÉSUMÉ'));
    console.log(chalk.cyan('=========='));
    console.log(`Tests réussis: ${chalk.green(successCount)}/3`);
    console.log(`Taux de réussite: ${chalk.yellow(Math.round((successCount / 3) * 100))}%`);
    
    const avgTime = results
      .filter(r => r.success)
      .reduce((sum, r) => sum + r.time, 0) / successCount;
    
    if (successCount > 0) {
      console.log(`Temps moyen: ${chalk.cyan(Math.round(avgTime))}ms`);
    }

    if (successCount === 3) {
      console.log(chalk.green('\n✅ ENVIRONNEMENT STABLE'));
      console.log(chalk.green('Tous les tests de redémarrage ont réussi.'));
    } else if (successCount >= 2) {
      console.log(chalk.yellow('\n⚠️  ENVIRONNEMENT PARTIELLEMENT STABLE'));
      console.log(chalk.yellow('La plupart des tests ont réussi, mais il y a eu des échecs.'));
    } else {
      console.log(chalk.red('\n❌ ENVIRONNEMENT INSTABLE'));
      console.log(chalk.red('Plusieurs échecs détectés. Environnement instable.'));
      console.log(chalk.yellow('\nRecommandations:'));
      console.log('  - Exécuter: npm run clean:environment');
      console.log('  - Puis: npm run fresh:install');
      console.log('  - Vérifier: npm run diagnose');
    }
  }
}

// Exécution
if (require.main === module) {
  const tester = new QuickStabilityTester();
  tester.run().catch(error => {
    console.error(chalk.red('❌ Erreur lors du test:'), error);
    process.exit(1);
  });
}

export { QuickStabilityTester };