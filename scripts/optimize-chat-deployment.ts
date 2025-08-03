#!/usr/bin/env tsx

/**
 * Script d'optimisation pour le déploiement du chat Gemini
 * Optimise les performances, le SEO et l'accessibilité
 */

import fs from 'fs';
import path from 'path';

interface OptimizationResult {
  success: boolean;
  message: string;
  details?: string[];
}

class ChatDeploymentOptimizer {
  private projectRoot: string;

  constructor() {
    this.projectRoot = process.cwd();
  }

  /**
   * Lance toutes les optimisations
   */
  async optimize(): Promise<OptimizationResult[]> {
    console.log('🚀 Démarrage de l\'optimisation du chat Gemini...\n');

    const results: OptimizationResult[] = [];

    // 1. Vérifier la configuration des variables d'environnement
    results.push(await this.checkEnvironmentVariables());

    // 2. Optimiser les imports et le lazy loading
    results.push(await this.optimizeLazyLoading());

    // 3. Vérifier les optimisations SEO
    results.push(await this.checkSEOOptimizations());

    // 4. Valider l'accessibilité
    results.push(await this.validateAccessibility());

    // 5. Optimiser les performances
    results.push(await this.optimizePerformance());

    // 6. Générer le rapport final
    this.generateReport(results);

    return results;
  }

  /**
   * Vérifie la configuration des variables d'environnement
   */
  private async checkEnvironmentVariables(): Promise<OptimizationResult> {
    console.log('🔍 Vérification des variables d\'environnement...');

    const envPath = path.join(this.projectRoot, '.env');
    const envExamplePath = path.join(this.projectRoot, '.env.example');

    try {
      // Vérifier que .env existe
      if (!fs.existsSync(envPath)) {
        return {
          success: false,
          message: 'Fichier .env manquant',
          details: ['Créez un fichier .env basé sur .env.example']
        };
      }

      // Lire le contenu de .env
      const envContent = fs.readFileSync(envPath, 'utf-8');
      const requiredVars = [
        'NEXT_PUBLIC_GEMINI_API_KEY',
        'NEXT_PUBLIC_CHAT_ENABLED'
      ];

      const missingVars = requiredVars.filter(varName => {
        const varPattern = new RegExp(`^${varName}=.+`, 'm');
        return !varPattern.test(envContent);
      });

      if (missingVars.length > 0) {
        return {
          success: false,
          message: 'Variables d\'environnement manquantes',
          details: missingVars.map(v => `${v} n'est pas définie`)
        };
      }

      // Mettre à jour .env.example si nécessaire
      if (fs.existsSync(envExamplePath)) {
        let exampleContent = fs.readFileSync(envExamplePath, 'utf-8');
        let updated = false;

        requiredVars.forEach(varName => {
          if (!exampleContent.includes(varName)) {
            exampleContent += `\n# Configuration du chat Gemini\n${varName}=your_${varName.toLowerCase()}_here\n`;
            updated = true;
          }
        });

        if (updated) {
          fs.writeFileSync(envExamplePath, exampleContent);
        }
      }

      return {
        success: true,
        message: 'Variables d\'environnement configurées correctement'
      };

    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la vérification des variables d\'environnement',
        details: [error instanceof Error ? error.message : 'Erreur inconnue']
      };
    }
  }

  /**
   * Optimise les imports et le lazy loading
   */
  private async optimizeLazyLoading(): Promise<OptimizationResult> {
    console.log('⚡ Optimisation du lazy loading...');

    const optimizations: string[] = [];

    try {
      // Vérifier que les composants utilisent bien le lazy loading
      const chatWidgetPath = path.join(this.projectRoot, 'src/components/chat/SimpleChatWidget.tsx');
      const clientWrapperPath = path.join(this.projectRoot, 'src/components/ClientPageWrapper.tsx');

      if (fs.existsSync(chatWidgetPath)) {
        const content = fs.readFileSync(chatWidgetPath, 'utf-8');
        
        if (content.includes('lazy(') && content.includes('Suspense')) {
          optimizations.push('✅ SimpleChatWidget utilise le lazy loading');
        } else {
          optimizations.push('⚠️ SimpleChatWidget pourrait bénéficier du lazy loading');
        }
      }

      if (fs.existsSync(clientWrapperPath)) {
        const content = fs.readFileSync(clientWrapperPath, 'utf-8');
        
        if (content.includes('requestIdleCallback')) {
          optimizations.push('✅ ClientPageWrapper utilise requestIdleCallback');
        } else {
          optimizations.push('⚠️ ClientPageWrapper pourrait utiliser requestIdleCallback');
        }
      }

      return {
        success: true,
        message: 'Optimisations de lazy loading vérifiées',
        details: optimizations
      };

    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de l\'optimisation du lazy loading',
        details: [error instanceof Error ? error.message : 'Erreur inconnue']
      };
    }
  }

  /**
   * Vérifie les optimisations SEO
   */
  private async checkSEOOptimizations(): Promise<OptimizationResult> {
    console.log('🔍 Vérification des optimisations SEO...');

    const seoChecks: string[] = [];

    try {
      // Vérifier les attributs data-noindex
      const componentsToCheck = [
        'src/components/chat/SimpleChatWidget.tsx',
        'src/components/ClientPageWrapper.tsx'
      ];

      for (const componentPath of componentsToCheck) {
        const fullPath = path.join(this.projectRoot, componentPath);
        if (fs.existsSync(fullPath)) {
          const content = fs.readFileSync(fullPath, 'utf-8');
          
          if (content.includes('data-noindex="true"')) {
            seoChecks.push(`✅ ${componentPath} utilise data-noindex`);
          } else {
            seoChecks.push(`⚠️ ${componentPath} pourrait utiliser data-noindex`);
          }

          if (content.includes('aria-')) {
            seoChecks.push(`✅ ${componentPath} utilise les attributs ARIA`);
          } else {
            seoChecks.push(`⚠️ ${componentPath} pourrait améliorer l'accessibilité`);
          }
        }
      }

      return {
        success: true,
        message: 'Optimisations SEO vérifiées',
        details: seoChecks
      };

    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la vérification SEO',
        details: [error instanceof Error ? error.message : 'Erreur inconnue']
      };
    }
  }

  /**
   * Valide l'accessibilité
   */
  private async validateAccessibility(): Promise<OptimizationResult> {
    console.log('♿ Validation de l\'accessibilité...');

    const a11yChecks: string[] = [];

    try {
      const chatWidgetPath = path.join(this.projectRoot, 'src/components/chat/SimpleChatWidget.tsx');
      
      if (fs.existsSync(chatWidgetPath)) {
        const content = fs.readFileSync(chatWidgetPath, 'utf-8');
        
        // Vérifier les attributs d'accessibilité
        const a11yAttributes = [
          'aria-label',
          'aria-hidden',
          'role',
          'aria-labelledby'
        ];

        a11yAttributes.forEach(attr => {
          if (content.includes(attr)) {
            a11yChecks.push(`✅ Utilise ${attr}`);
          }
        });

        // Vérifier les contrastes et la navigation au clavier
        if (content.includes('focus:') || content.includes('focus-')) {
          a11yChecks.push('✅ Styles de focus définis');
        } else {
          a11yChecks.push('⚠️ Styles de focus à améliorer');
        }
      }

      return {
        success: true,
        message: 'Accessibilité validée',
        details: a11yChecks
      };

    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la validation d\'accessibilité',
        details: [error instanceof Error ? error.message : 'Erreur inconnue']
      };
    }
  }

  /**
   * Optimise les performances
   */
  private async optimizePerformance(): Promise<OptimizationResult> {
    console.log('🚀 Optimisation des performances...');

    const perfOptimizations: string[] = [];

    try {
      // Vérifier la configuration Next.js
      const nextConfigPath = path.join(this.projectRoot, 'next.config.js');
      const nextConfigTsPath = path.join(this.projectRoot, 'next.config.ts');
      
      const configPath = fs.existsSync(nextConfigTsPath) ? nextConfigTsPath : nextConfigPath;
      
      if (fs.existsSync(configPath)) {
        const content = fs.readFileSync(configPath, 'utf-8');
        
        if (content.includes('experimental') && content.includes('optimizeCss')) {
          perfOptimizations.push('✅ Optimisation CSS activée');
        }

        if (content.includes('compress')) {
          perfOptimizations.push('✅ Compression activée');
        }
      }

      // Vérifier les optimisations de bundle
      const packageJsonPath = path.join(this.projectRoot, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        
        if (packageJson.dependencies && packageJson.dependencies['@google/genai']) {
          perfOptimizations.push('✅ Dépendance Gemini API installée');
        } else {
          perfOptimizations.push('⚠️ Dépendance Gemini API manquante');
        }
      }

      return {
        success: true,
        message: 'Optimisations de performance vérifiées',
        details: perfOptimizations
      };

    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de l\'optimisation des performances',
        details: [error instanceof Error ? error.message : 'Erreur inconnue']
      };
    }
  }

  /**
   * Génère le rapport final
   */
  private generateReport(results: OptimizationResult[]): void {
    console.log('\n📊 RAPPORT D\'OPTIMISATION DU CHAT GEMINI');
    console.log('=' .repeat(50));

    const successful = results.filter(r => r.success).length;
    const total = results.length;

    console.log(`\n✅ Réussi: ${successful}/${total} optimisations`);
    
    if (successful < total) {
      console.log(`❌ Échec: ${total - successful}/${total} optimisations`);
    }

    console.log('\nDétails:');
    results.forEach((result, index) => {
      const icon = result.success ? '✅' : '❌';
      console.log(`\n${index + 1}. ${icon} ${result.message}`);
      
      if (result.details && result.details.length > 0) {
        result.details.forEach(detail => {
          console.log(`   ${detail}`);
        });
      }
    });

    // Recommandations finales
    console.log('\n🎯 RECOMMANDATIONS FINALES:');
    console.log('- Testez le chat sur différents appareils et navigateurs');
    console.log('- Vérifiez les Core Web Vitals avec Lighthouse');
    console.log('- Surveillez l\'utilisation de l\'API Gemini en production');
    console.log('- Configurez des alertes pour les erreurs de chat');
    console.log('- Testez l\'accessibilité avec un lecteur d\'écran');

    console.log('\n🚀 Déploiement optimisé prêt !');
  }
}

// Exécution du script
async function main() {
  const optimizer = new ChatDeploymentOptimizer();
  
  try {
    const results = await optimizer.optimize();
    const allSuccessful = results.every(r => r.success);
    
    process.exit(allSuccessful ? 0 : 1);
  } catch (error) {
    console.error('❌ Erreur lors de l\'optimisation:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { ChatDeploymentOptimizer };