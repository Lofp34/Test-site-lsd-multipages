#!/usr/bin/env ts-node

/**
 * Script de validation des corrections du chat Gemini
 * Vérifie que les erreurs ont été corrigées
 */

import { readFileSync } from 'fs';
import { join } from 'path';

interface ValidationResult {
  test: string;
  passed: boolean;
  message: string;
}

class ChatHotfixValidator {
  private results: ValidationResult[] = [];

  async validateAll(): Promise<void> {
    console.log('🔍 Validation des corrections Chat Gemini...\n');

    await this.validateGeminiApiKey();
    await this.validateTrackSectionViewExport();
    await this.validateUseEffectDependencies();
    await this.validateEnvironmentVariables();

    this.displayResults();
  }

  private async validateGeminiApiKey(): Promise<void> {
    try {
      const hookContent = readFileSync(
        join(process.cwd(), 'src/hooks/useGeminiChatSimple.ts'),
        'utf-8'
      );

      const hasApiKeyInit = hookContent.includes('apiKey: apiKey');
      const hasCorrectInit = hookContent.includes('new GoogleGenAI({') && 
                            hookContent.includes('apiKey: apiKey');

      this.results.push({
        test: 'Initialisation API Gemini avec clé',
        passed: hasApiKeyInit && hasCorrectInit,
        message: hasApiKeyInit && hasCorrectInit 
          ? '✅ GoogleGenAI initialisé avec apiKey'
          : '❌ GoogleGenAI non initialisé correctement avec apiKey'
      });
    } catch (error) {
      this.results.push({
        test: 'Initialisation API Gemini avec clé',
        passed: false,
        message: `❌ Erreur lecture fichier: ${error}`
      });
    }
  }

  private async validateTrackSectionViewExport(): Promise<void> {
    try {
      const ctaTrackingContent = readFileSync(
        join(process.cwd(), 'src/utils/cta-tracking.ts'),
        'utf-8'
      );

      const hasExport = ctaTrackingContent.includes('export function trackSectionView');
      const hasImplementation = ctaTrackingContent.includes('section_view');

      this.results.push({
        test: 'Export trackSectionView',
        passed: hasExport && hasImplementation,
        message: hasExport && hasImplementation
          ? '✅ trackSectionView exporté et implémenté'
          : '❌ trackSectionView manquant ou mal implémenté'
      });
    } catch (error) {
      this.results.push({
        test: 'Export trackSectionView',
        passed: false,
        message: `❌ Erreur lecture fichier: ${error}`
      });
    }
  }

  private async validateUseEffectDependencies(): Promise<void> {
    try {
      const hookContent = readFileSync(
        join(process.cwd(), 'src/hooks/useGeminiChatSimple.ts'),
        'utf-8'
      );

      const hasApiKeyDependency = hookContent.includes('}, [apiKey]);');

      this.results.push({
        test: 'Dépendances useEffect correctes',
        passed: hasApiKeyDependency,
        message: hasApiKeyDependency
          ? '✅ apiKey dans les dépendances useEffect'
          : '❌ apiKey manquant dans les dépendances useEffect'
      });
    } catch (error) {
      this.results.push({
        test: 'Dépendances useEffect correctes',
        passed: false,
        message: `❌ Erreur lecture fichier: ${error}`
      });
    }
  }

  private async validateEnvironmentVariables(): Promise<void> {
    try {
      const envContent = readFileSync(
        join(process.cwd(), '.env'),
        'utf-8'
      );

      const hasPublicGeminiKey = envContent.includes('NEXT_PUBLIC_GEMINI_API_KEY=');
      const hasGeminiKey = envContent.includes('GEMINI_API_KEY=');
      const hasChatEnabled = envContent.includes('NEXT_PUBLIC_CHAT_ENABLED=true');

      const allEnvVarsPresent = hasPublicGeminiKey && hasGeminiKey && hasChatEnabled;

      this.results.push({
        test: 'Variables d\'environnement',
        passed: allEnvVarsPresent,
        message: allEnvVarsPresent
          ? '✅ Toutes les variables d\'environnement présentes'
          : `❌ Variables manquantes: ${!hasPublicGeminiKey ? 'NEXT_PUBLIC_GEMINI_API_KEY ' : ''}${!hasGeminiKey ? 'GEMINI_API_KEY ' : ''}${!hasChatEnabled ? 'NEXT_PUBLIC_CHAT_ENABLED' : ''}`
      });
    } catch (error) {
      this.results.push({
        test: 'Variables d\'environnement',
        passed: false,
        message: `❌ Erreur lecture .env: ${error}`
      });
    }
  }

  private displayResults(): void {
    console.log('\n📊 Résultats de validation:\n');
    
    this.results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.test}`);
      console.log(`   ${result.message}\n`);
    });

    const passedTests = this.results.filter(r => r.passed).length;
    const totalTests = this.results.length;
    
    console.log(`\n🎯 Score: ${passedTests}/${totalTests} tests réussis`);
    
    if (passedTests === totalTests) {
      console.log('🎉 Toutes les corrections sont validées !');
      console.log('✅ Le chat Gemini devrait fonctionner correctement');
    } else {
      console.log('⚠️  Certaines corrections nécessitent une attention');
      console.log('🔧 Vérifiez les points en échec ci-dessus');
    }

    console.log('\n📝 Prochaines étapes:');
    console.log('1. Redémarrer le serveur de développement');
    console.log('2. Tester le chat sur la page d\'accueil');
    console.log('3. Vérifier la console navigateur');
  }
}

// Exécution du script
if (require.main === module) {
  const validator = new ChatHotfixValidator();
  validator.validateAll().catch(console.error);
}

export { ChatHotfixValidator };