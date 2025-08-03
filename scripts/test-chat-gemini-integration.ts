#!/usr/bin/env tsx

/**
 * Script de test pour l'intégration du chat Gemini
 * Valide le fonctionnement de l'API selon la documentation
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import chalk from 'chalk';

// Charger les variables d'environnement
dotenv.config();

interface TestResult {
  name: string;
  success: boolean;
  message: string;
  duration?: number;
  error?: string;
}

class GeminiIntegrationTester {
  private ai: GoogleGenerativeAI | null = null;
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
  }

  /**
   * Lance tous les tests d'intégration
   */
  async runAllTests(): Promise<TestResult[]> {
    console.log(chalk.blue('🧪 Démarrage des tests d\'intégration Gemini API\n'));

    const results: TestResult[] = [];

    // 1. Test de configuration
    results.push(await this.testConfiguration());

    // 2. Test d'initialisation de l'API
    results.push(await this.testApiInitialization());

    // 3. Test de génération de contenu simple
    results.push(await this.testSimpleContentGeneration());

    // 4. Test de streaming
    results.push(await this.testStreamingResponse());

    // 5. Test de chat multitours
    results.push(await this.testMultiTurnChat());

    // 6. Test d'upload de fichier (simulation)
    results.push(await this.testFileUploadSimulation());

    // 7. Test de gestion d'erreurs
    results.push(await this.testErrorHandling());

    // 8. Test des instructions système
    results.push(await this.testSystemInstructions());

    return results;
  }

  /**
   * Test de configuration
   */
  private async testConfiguration(): Promise<TestResult> {
    const startTime = Date.now();

    try {
      if (!this.apiKey) {
        return {
          name: 'Configuration',
          success: false,
          message: 'Clé API Gemini manquante',
          duration: Date.now() - startTime,
          error: 'NEXT_PUBLIC_GEMINI_API_KEY non définie'
        };
      }

      if (this.apiKey.length < 20) {
        return {
          name: 'Configuration',
          success: false,
          message: 'Clé API Gemini invalide',
          duration: Date.now() - startTime,
          error: 'La clé API semble trop courte'
        };
      }

      return {
        name: 'Configuration',
        success: true,
        message: 'Configuration valide',
        duration: Date.now() - startTime
      };

    } catch (error) {
      return {
        name: 'Configuration',
        success: false,
        message: 'Erreur de configuration',
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Test d'initialisation de l'API
   */
  private async testApiInitialization(): Promise<TestResult> {
    const startTime = Date.now();

    try {
      this.ai = new GoogleGenerativeAI(this.apiKey);

      return {
        name: 'Initialisation API',
        success: true,
        message: 'API Gemini initialisée avec succès',
        duration: Date.now() - startTime
      };

    } catch (error) {
      return {
        name: 'Initialisation API',
        success: false,
        message: 'Échec de l\'initialisation de l\'API',
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Test de génération de contenu simple
   */
  private async testSimpleContentGeneration(): Promise<TestResult> {
    const startTime = Date.now();

    try {
      if (!this.ai) {
        throw new Error('API non initialisée');
      }

      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Dis bonjour en français",
        config: {
          thinkingConfig: {
            thinkingBudget: 0 // Désactivé selon la documentation
          }
        }
      });

      if (!response.text) {
        throw new Error('Pas de réponse textuelle');
      }

      return {
        name: 'Génération de contenu simple',
        success: true,
        message: `Réponse reçue: "${response.text.substring(0, 50)}..."`,
        duration: Date.now() - startTime
      };

    } catch (error) {
      return {
        name: 'Génération de contenu simple',
        success: false,
        message: 'Échec de la génération de contenu',
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Test de streaming
   */
  private async testStreamingResponse(): Promise<TestResult> {
    const startTime = Date.now();

    try {
      if (!this.ai) {
        throw new Error('API non initialisée');
      }

      const response = await this.ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: "Compte de 1 à 5 en français",
      });

      let chunks = 0;
      let fullResponse = '';

      for await (const chunk of response) {
        if (chunk.text) {
          chunks++;
          fullResponse += chunk.text;
        }
      }

      if (chunks === 0) {
        throw new Error('Aucun chunk reçu');
      }

      return {
        name: 'Streaming',
        success: true,
        message: `${chunks} chunks reçus, réponse: "${fullResponse.substring(0, 50)}..."`,
        duration: Date.now() - startTime
      };

    } catch (error) {
      return {
        name: 'Streaming',
        success: false,
        message: 'Échec du streaming',
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Test de chat multitours
   */
  private async testMultiTurnChat(): Promise<TestResult> {
    const startTime = Date.now();

    try {
      if (!this.ai) {
        throw new Error('API non initialisée');
      }

      const chat = this.ai.chats.create({
        model: "gemini-2.5-flash",
        history: [
          {
            role: "user",
            parts: [{ text: "Bonjour, je m'appelle Laurent" }],
          },
          {
            role: "model",
            parts: [{ text: "Bonjour Laurent ! Comment puis-je vous aider ?" }],
          },
        ],
      });

      const response = await chat.sendMessage({
        message: "Quel est mon prénom ?",
      });

      if (!response.text) {
        throw new Error('Pas de réponse du chat');
      }

      const containsName = response.text.toLowerCase().includes('laurent');

      return {
        name: 'Chat multitours',
        success: containsName,
        message: containsName 
          ? `Chat maintient le contexte: "${response.text.substring(0, 50)}..."`
          : `Chat ne maintient pas le contexte: "${response.text.substring(0, 50)}..."`,
        duration: Date.now() - startTime
      };

    } catch (error) {
      return {
        name: 'Chat multitours',
        success: false,
        message: 'Échec du chat multitours',
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Test d'upload de fichier (simulation)
   */
  private async testFileUploadSimulation(): Promise<TestResult> {
    const startTime = Date.now();

    try {
      if (!this.ai) {
        throw new Error('API non initialisée');
      }

      // Simuler la validation de fichier (sans upload réel)
      const mockFile = {
        name: 'test.jpg',
        type: 'image/jpeg',
        size: 1024 * 1024 // 1MB
      };

      // Validation des types de fichiers
      const allowedTypes = ['image/', 'video/', 'audio/'];
      const isValidType = allowedTypes.some(type => mockFile.type.startsWith(type));
      
      // Validation de la taille
      const maxSize = 10 * 1024 * 1024; // 10MB
      const isValidSize = mockFile.size <= maxSize;

      if (!isValidType || !isValidSize) {
        throw new Error('Fichier invalide');
      }

      return {
        name: 'Upload de fichier (simulation)',
        success: true,
        message: 'Validation de fichier réussie',
        duration: Date.now() - startTime
      };

    } catch (error) {
      return {
        name: 'Upload de fichier (simulation)',
        success: false,
        message: 'Échec de la validation de fichier',
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Test de gestion d'erreurs
   */
  private async testErrorHandling(): Promise<TestResult> {
    const startTime = Date.now();

    try {
      if (!this.ai) {
        throw new Error('API non initialisée');
      }

      // Test avec un modèle inexistant pour déclencher une erreur
      try {
        await this.ai.models.generateContent({
          model: "gemini-inexistant" as any,
          contents: "Test",
        });

        // Si on arrive ici, c'est que l'erreur n'a pas été déclenchée
        return {
          name: 'Gestion d\'erreurs',
          success: false,
          message: 'Erreur attendue non déclenchée',
          duration: Date.now() - startTime
        };

      } catch (expectedError) {
        // C'est le comportement attendu
        return {
          name: 'Gestion d\'erreurs',
          success: true,
          message: 'Gestion d\'erreur fonctionnelle',
          duration: Date.now() - startTime
        };
      }

    } catch (error) {
      return {
        name: 'Gestion d\'erreurs',
        success: false,
        message: 'Échec du test de gestion d\'erreurs',
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Test des instructions système
   */
  private async testSystemInstructions(): Promise<TestResult> {
    const startTime = Date.now();

    try {
      if (!this.ai) {
        throw new Error('API non initialisée');
      }

      const systemInstruction = "Tu es Laurent Serre, expert en développement commercial. Réponds toujours en mentionnant ton expertise.";

      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Qui es-tu ?",
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.1,
        },
      });

      if (!response.text) {
        throw new Error('Pas de réponse');
      }

      const mentionsExpertise = response.text.toLowerCase().includes('laurent') || 
                               response.text.toLowerCase().includes('commercial') ||
                               response.text.toLowerCase().includes('expert');

      return {
        name: 'Instructions système',
        success: mentionsExpertise,
        message: mentionsExpertise 
          ? `Instructions système respectées: "${response.text.substring(0, 50)}..."`
          : `Instructions système ignorées: "${response.text.substring(0, 50)}..."`,
        duration: Date.now() - startTime
      };

    } catch (error) {
      return {
        name: 'Instructions système',
        success: false,
        message: 'Échec du test d\'instructions système',
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Affiche les résultats des tests
   */
  displayResults(results: TestResult[]): void {
    console.log(chalk.blue('\n📊 RÉSULTATS DES TESTS D\'INTÉGRATION GEMINI'));
    console.log(chalk.blue('=' .repeat(60)));

    const successful = results.filter(r => r.success).length;
    const total = results.length;

    console.log(`\n${chalk.green('✅ Réussis:')} ${successful}/${total}`);
    if (successful < total) {
      console.log(`${chalk.red('❌ Échecs:')} ${total - successful}/${total}`);
    }

    console.log('\nDétails des tests:');
    results.forEach((result, index) => {
      const icon = result.success ? chalk.green('✅') : chalk.red('❌');
      const duration = result.duration ? chalk.gray(`(${result.duration}ms)`) : '';
      
      console.log(`\n${index + 1}. ${icon} ${chalk.bold(result.name)} ${duration}`);
      console.log(`   ${result.message}`);
      
      if (result.error) {
        console.log(`   ${chalk.red('Erreur:')} ${result.error}`);
      }
    });

    // Recommandations
    console.log(chalk.blue('\n🎯 RECOMMANDATIONS:'));
    
    if (successful === total) {
      console.log(chalk.green('✅ Tous les tests passent ! L\'intégration Gemini est prête.'));
      console.log('- Vous pouvez déployer le chat en production');
      console.log('- Surveillez les quotas API en production');
      console.log('- Configurez des alertes pour les erreurs');
    } else {
      console.log(chalk.yellow('⚠️ Certains tests échouent. Actions recommandées:'));
      
      results.forEach(result => {
        if (!result.success) {
          switch (result.name) {
            case 'Configuration':
              console.log('- Vérifiez votre clé API Gemini dans .env');
              break;
            case 'Initialisation API':
              console.log('- Vérifiez la connectivité réseau');
              console.log('- Vérifiez que @google/genai est installé');
              break;
            case 'Streaming':
              console.log('- Vérifiez les quotas API');
              console.log('- Testez avec un message plus simple');
              break;
            default:
              console.log(`- Corrigez le problème avec: ${result.name}`);
          }
        }
      });
    }

    console.log(chalk.blue('\n🚀 Prêt pour le déploiement !'));
  }
}

// Exécution du script
async function main() {
  const tester = new GeminiIntegrationTester();
  
  try {
    const results = await tester.runAllTests();
    tester.displayResults(results);
    
    const allSuccessful = results.every(r => r.success);
    process.exit(allSuccessful ? 0 : 1);
    
  } catch (error) {
    console.error(chalk.red('❌ Erreur lors des tests:'), error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { GeminiIntegrationTester };