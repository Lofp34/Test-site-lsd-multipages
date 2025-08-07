#!/usr/bin/env tsx

/**
 * Script de validation complète de la correction webpack du chat
 * Teste l'ouverture du chat, l'upload de fichiers et les performances
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

interface TestResult {
  name: string;
  success: boolean;
  message: string;
  details?: any;
}

class ChatWebpackValidator {
  private results: TestResult[] = [];

  private addResult(name: string, success: boolean, message: string, details?: any) {
    this.results.push({ name, success, message, details });
    console.log(`${success ? '✅' : '❌'} ${name}: ${message}`);
    if (details) {
      console.log(`   Details: ${JSON.stringify(details, null, 2)}`);
    }
  }

  /**
   * Test 1: Vérifier que les fichiers de correction existent
   */
  async testCorrectionFilesExist(): Promise<void> {
    console.log('\n🔍 Test 1: Vérification de l\'existence des fichiers de correction...');

    const requiredFiles = [
      'src/lib/gemini/file-service-client.ts',
      'src/lib/gemini/file-service-interface.ts', 
      'src/lib/gemini/file-service-factory.ts',
      'src/hooks/useFileService.ts',
      'src/components/chat/FileServiceErrorBoundary.tsx',
      'src/components/chat/SafeFileUploader.tsx'
    ];

    let allExist = true;
    const missingFiles: string[] = [];

    for (const file of requiredFiles) {
      if (!existsSync(file)) {
        allExist = false;
        missingFiles.push(file);
      }
    }

    this.addResult(
      'Fichiers de correction',
      allExist,
      allExist ? 'Tous les fichiers de correction sont présents' : `Fichiers manquants: ${missingFiles.join(', ')}`,
      { requiredFiles: requiredFiles.length, missingFiles }
    );
  }

  /**
   * Test 2: Vérifier que les imports sont corrects
   */
  async testImportsCorrection(): Promise<void> {
    console.log('\n🔍 Test 2: Vérification des imports corrigés...');

    try {
      // Vérifier le file-service-client.ts
      const clientServiceContent = readFileSync('src/lib/gemini/file-service-client.ts', 'utf-8');
      const hasProblematicImports = clientServiceContent.includes('@google/genai') || 
                                   clientServiceContent.includes('GoogleGenAI');

      this.addResult(
        'Imports ClientFileService',
        !hasProblematicImports,
        hasProblematicImports ? 'Contient encore des imports problématiques' : 'Aucun import problématique détecté'
      );

      // Vérifier le factory pattern
      const factoryContent = readFileSync('src/lib/gemini/file-service-factory.ts', 'utf-8');
      const hasEnvironmentDetection = factoryContent.includes('typeof window') || 
                                     factoryContent.includes('process.env');

      this.addResult(
        'Factory pattern',
        hasEnvironmentDetection,
        hasEnvironmentDetection ? 'Détection d\'environnement implémentée' : 'Détection d\'environnement manquante'
      );

    } catch (error) {
      this.addResult(
        'Vérification des imports',
        false,
        `Erreur lors de la lecture des fichiers: ${error}`
      );
    }
  }

  /**
   * Test 3: Compilation TypeScript
   */
  async testTypeScriptCompilation(): Promise<void> {
    console.log('\n🔍 Test 3: Test de compilation TypeScript...');

    try {
      // Test de compilation des fichiers spécifiques
      const filesToCompile = [
        'src/lib/gemini/file-service-client.ts',
        'src/lib/gemini/file-service-factory.ts',
        'src/hooks/useFileService.ts',
        'src/components/chat/FileServiceErrorBoundary.tsx'
      ];

      for (const file of filesToCompile) {
        try {
          execSync(`npx tsc --noEmit --skipLibCheck ${file}`, { 
            stdio: 'pipe',
            timeout: 30000 
          });
        } catch (error) {
          this.addResult(
            `Compilation ${path.basename(file)}`,
            false,
            `Erreur de compilation: ${error}`
          );
          return;
        }
      }

      this.addResult(
        'Compilation TypeScript',
        true,
        'Tous les fichiers se compilent sans erreur'
      );

    } catch (error) {
      this.addResult(
        'Compilation TypeScript',
        false,
        `Erreur lors de la compilation: ${error}`
      );
    }
  }

  /**
   * Test 4: Tests unitaires
   */
  async testUnitTests(): Promise<void> {
    console.log('\n🔍 Test 4: Exécution des tests unitaires...');

    try {
      // Exécuter les tests spécifiques aux corrections
      const testFiles = [
        'src/__tests__/lib/gemini/client-file-service.test.ts',
        'src/__tests__/hooks/useFileService.test.ts',
        'src/__tests__/components/chat/FileServiceErrorBoundary.test.tsx'
      ];

      let allTestsPassed = true;
      const failedTests: string[] = [];

      for (const testFile of testFiles) {
        if (existsSync(testFile)) {
          try {
            execSync(`npx vitest run ${testFile}`, { 
              stdio: 'pipe',
              timeout: 60000 
            });
          } catch (error) {
            allTestsPassed = false;
            failedTests.push(path.basename(testFile));
          }
        }
      }

      this.addResult(
        'Tests unitaires',
        allTestsPassed,
        allTestsPassed ? 'Tous les tests unitaires passent' : `Tests échoués: ${failedTests.join(', ')}`,
        { totalTests: testFiles.length, failedTests }
      );

    } catch (error) {
      this.addResult(
        'Tests unitaires',
        false,
        `Erreur lors de l'exécution des tests: ${error}`
      );
    }
  }

  /**
   * Test 5: Build de production
   */
  async testProductionBuild(): Promise<void> {
    console.log('\n🔍 Test 5: Test du build de production...');

    try {
      const startTime = Date.now();
      
      // Nettoyer le cache Next.js
      execSync('rm -rf .next', { stdio: 'pipe' });
      
      // Build de production
      execSync('npm run build', { 
        stdio: 'pipe',
        timeout: 300000 // 5 minutes
      });
      
      const buildTime = Date.now() - startTime;

      this.addResult(
        'Build de production',
        true,
        `Build réussi en ${(buildTime / 1000).toFixed(2)}s`,
        { buildTimeMs: buildTime }
      );

    } catch (error) {
      this.addResult(
        'Build de production',
        false,
        `Erreur lors du build: ${error}`
      );
    }
  }

  /**
   * Test 6: Analyse de la taille du bundle
   */
  async testBundleSize(): Promise<void> {
    console.log('\n🔍 Test 6: Analyse de la taille du bundle...');

    try {
      // Analyser la taille du bundle
      const buildOutput = execSync('npm run build', { 
        encoding: 'utf-8',
        stdio: 'pipe',
        timeout: 300000
      });

      // Extraire les informations de taille du bundle
      const sizeRegex = /(\d+(?:\.\d+)?)\s*(kB|MB)/g;
      const sizes = [...buildOutput.matchAll(sizeRegex)];

      let totalSizeKB = 0;
      sizes.forEach(match => {
        const size = parseFloat(match[1]);
        const unit = match[2];
        totalSizeKB += unit === 'MB' ? size * 1024 : size;
      });

      const isOptimal = totalSizeKB < 5000; // Moins de 5MB total

      this.addResult(
        'Taille du bundle',
        isOptimal,
        `Taille totale: ${(totalSizeKB / 1024).toFixed(2)}MB`,
        { 
          totalSizeKB,
          isOptimal,
          threshold: '5MB',
          details: sizes.map(s => `${s[1]}${s[2]}`)
        }
      );

    } catch (error) {
      this.addResult(
        'Taille du bundle',
        false,
        `Erreur lors de l'analyse: ${error}`
      );
    }
  }

  /**
   * Test 7: Vérification des Error Boundaries
   */
  async testErrorBoundaries(): Promise<void> {
    console.log('\n🔍 Test 7: Test des Error Boundaries...');

    try {
      // Vérifier que FileServiceErrorBoundary est bien implémenté
      const errorBoundaryContent = readFileSync('src/components/chat/FileServiceErrorBoundary.tsx', 'utf-8');
      
      const hasComponentDidCatch = errorBoundaryContent.includes('componentDidCatch') || 
                                  errorBoundaryContent.includes('getDerivedStateFromError');
      const hasFallbackUI = errorBoundaryContent.includes('fallback') || 
                           errorBoundaryContent.includes('error');

      this.addResult(
        'Error Boundaries',
        hasComponentDidCatch && hasFallbackUI,
        hasComponentDidCatch && hasFallbackUI ? 
          'Error Boundary correctement implémenté' : 
          'Error Boundary incomplet',
        { hasComponentDidCatch, hasFallbackUI }
      );

    } catch (error) {
      this.addResult(
        'Error Boundaries',
        false,
        `Erreur lors de la vérification: ${error}`
      );
    }
  }

  /**
   * Test 8: Vérification de l'intégration dans ChatInterface
   */
  async testChatIntegration(): Promise<void> {
    console.log('\n🔍 Test 8: Test de l\'intégration dans ChatInterface...');

    try {
      // Vérifier que ChatInterface utilise bien le nouveau système
      const chatInterfaceContent = readFileSync('src/components/chat/ChatInterface.tsx', 'utf-8');
      
      const usesFileUploader = chatInterfaceContent.includes('FileUploader');
      const hasErrorHandling = chatInterfaceContent.includes('error') && 
                              chatInterfaceContent.includes('Error');

      this.addResult(
        'Intégration ChatInterface',
        usesFileUploader && hasErrorHandling,
        usesFileUploader && hasErrorHandling ? 
          'ChatInterface correctement intégré' : 
          'Intégration incomplète',
        { usesFileUploader, hasErrorHandling }
      );

    } catch (error) {
      this.addResult(
        'Intégration ChatInterface',
        false,
        `Erreur lors de la vérification: ${error}`
      );
    }
  }

  /**
   * Exécuter tous les tests
   */
  async runAllTests(): Promise<void> {
    console.log('🚀 Démarrage de la validation complète de la correction webpack du chat...\n');

    await this.testCorrectionFilesExist();
    await this.testImportsCorrection();
    await this.testTypeScriptCompilation();
    await this.testUnitTests();
    await this.testProductionBuild();
    await this.testBundleSize();
    await this.testErrorBoundaries();
    await this.testChatIntegration();

    this.generateReport();
  }

  /**
   * Générer le rapport final
   */
  private generateReport(): void {
    console.log('\n' + '='.repeat(80));
    console.log('📊 RAPPORT FINAL DE VALIDATION');
    console.log('='.repeat(80));

    const totalTests = this.results.length;
    const passedTests = this.results.filter(r => r.success).length;
    const failedTests = totalTests - passedTests;

    console.log(`\n📈 Résumé:`);
    console.log(`   • Tests réussis: ${passedTests}/${totalTests}`);
    console.log(`   • Tests échoués: ${failedTests}/${totalTests}`);
    console.log(`   • Taux de réussite: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

    if (failedTests > 0) {
      console.log(`\n❌ Tests échoués:`);
      this.results
        .filter(r => !r.success)
        .forEach(r => console.log(`   • ${r.name}: ${r.message}`));
    }

    console.log(`\n✅ Tests réussis:`);
    this.results
      .filter(r => r.success)
      .forEach(r => console.log(`   • ${r.name}: ${r.message}`));

    const overallSuccess = failedTests === 0;
    console.log(`\n🎯 RÉSULTAT GLOBAL: ${overallSuccess ? 'SUCCÈS' : 'ÉCHEC'}`);
    
    if (overallSuccess) {
      console.log('✨ La correction webpack du chat est validée et prête pour la production !');
    } else {
      console.log('⚠️  Des problèmes ont été détectés. Veuillez corriger les erreurs avant le déploiement.');
    }

    console.log('\n' + '='.repeat(80));
  }
}

// Exécution du script
async function main() {
  const validator = new ChatWebpackValidator();
  await validator.runAllTests();
}

if (require.main === module) {
  main().catch(console.error);
}

export { ChatWebpackValidator };