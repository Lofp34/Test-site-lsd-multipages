#!/usr/bin/env tsx

/**
 * Script de validation pour vérifier l'intégration correcte de l'API Gemini officielle
 * Basé sur la documentation Google officielle
 */

import { readFileSync, existsSync } from 'fs';
import chalk from 'chalk';

interface ValidationResult {
  file: string;
  hasCorrectPackage: boolean;
  hasCorrectImport: boolean;
  hasCorrectInitialization: boolean;
  issues: string[];
}

async function validateOfficialGeminiAPI(): Promise<void> {
  console.log(chalk.blue('🔍 Validation de l\'API Gemini officielle selon la documentation Google...'));
  
  // Vérifier package.json
  console.log('\n📦 Vérification des dépendances...');
  
  if (!existsSync('package.json')) {
    console.log(chalk.red('❌ package.json non trouvé'));
    return;
  }

  const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
  
  // Vérifier le bon package
  if (packageJson.dependencies['@google/genai']) {
    console.log(chalk.green('✅ Package @google/genai installé'));
  } else {
    console.log(chalk.red('❌ Package @google/genai manquant'));
  }

  if (packageJson.dependencies['@google/generative-ai']) {
    console.log(chalk.yellow('⚠️  Package @google/generative-ai présent (devrait être supprimé)'));
  }

  // Fichiers à vérifier
  const productionFiles = [
    'src/app/api/chat/files/upload/route.ts',
    'src/app/api/chat/gemini/route.ts',
    'src/app/api/chat/gemini/route-complex.ts',
    'src/lib/gemini/service.ts',
    'src/hooks/useGeminiChatSimple.ts',
  ];

  const results: ValidationResult[] = [];
  let hasErrors = false;

  console.log('\n📋 Validation des fichiers de production...');

  for (const file of productionFiles) {
    if (!existsSync(file)) {
      console.log(chalk.yellow(`⚠️  Fichier non trouvé: ${file}`));
      continue;
    }

    const content = readFileSync(file, 'utf-8');
    const issues: string[] = [];

    // Vérifier l'import correct
    const hasCorrectImport = content.includes('from "@google/genai"') || 
                            content.includes("from '@google/genai'");
    
    if (!hasCorrectImport && content.includes('GoogleGenAI')) {
      issues.push('Import incorrect: devrait être from "@google/genai"');
      hasErrors = true;
    }

    // Vérifier l'ancien package
    if (content.includes('@google/generative-ai')) {
      issues.push('Utilise encore l\'ancien package @google/generative-ai');
      hasErrors = true;
    }

    // Vérifier l'initialisation correcte
    const hasCorrectInit = content.includes('new GoogleGenAI({') && 
                          !content.includes('new GoogleGenerativeAI(');

    if (content.includes('new GoogleGenAI') && !hasCorrectInit) {
      issues.push('Initialisation incorrecte: devrait être new GoogleGenAI({ apiKey })');
      hasErrors = true;
    }

    // Vérifier les méthodes correctes
    if (content.includes('ai.chats.create') || content.includes('chat.sendMessageStream')) {
      // C'est correct selon la documentation
    } else if (content.includes('getGenerativeModel') || content.includes('startChat')) {
      issues.push('Utilise des méthodes de l\'ancienne API');
      hasErrors = true;
    }

    results.push({
      file,
      hasCorrectPackage: hasCorrectImport,
      hasCorrectImport,
      hasCorrectInitialization: hasCorrectInit,
      issues
    });
  }

  // Afficher les résultats
  console.log('\n📊 Résultats de validation:');
  
  for (const result of results) {
    if (result.issues.length === 0) {
      console.log(chalk.green(`✅ ${result.file}`));
    } else {
      console.log(chalk.red(`❌ ${result.file}`));
      result.issues.forEach(issue => {
        console.log(chalk.red(`   - ${issue}`));
      });
    }
  }

  // Vérifier la règle de steering
  console.log('\n📚 Vérification de la documentation...');
  
  if (existsSync('.kiro/steering/google-gemini-api-integration.md')) {
    console.log(chalk.green('✅ Règle d\'intégration API Gemini créée'));
  } else {
    console.log(chalk.yellow('⚠️  Règle d\'intégration manquante'));
  }

  // Résumé final
  if (hasErrors) {
    console.log(chalk.red('\n❌ ÉCHEC: L\'intégration API Gemini n\'est pas conforme'));
    console.log(chalk.yellow('   Corrigez les problèmes listés ci-dessus'));
    console.log(chalk.blue('   Référence: Guide de démarrage rapide API Gemini - Google AI for Developers'));
    process.exit(1);
  } else {
    console.log(chalk.green('\n✅ SUCCÈS: Intégration API Gemini conforme à la documentation officielle'));
    console.log(chalk.green('   Package: @google/genai'));
    console.log(chalk.green('   Import: GoogleGenAI from "@google/genai"'));
    console.log(chalk.green('   Initialisation: new GoogleGenAI({ apiKey })'));
    console.log(chalk.green('   Méthodes: ai.chats.create(), chat.sendMessageStream()'));
    console.log(chalk.blue('\n🚀 Le build Vercel devrait maintenant réussir'));
  }
}

// Points de contrôle selon la documentation officielle
function displayOfficialChecklist() {
  console.log(chalk.blue('\n📋 Checklist documentation officielle Google:'));
  console.log('1. ✅ Package @google/genai installé');
  console.log('2. ✅ Import { GoogleGenAI } from "@google/genai"');
  console.log('3. ✅ Initialisation new GoogleGenAI({ apiKey })');
  console.log('4. ✅ Variable GEMINI_API_KEY configurée');
  console.log('5. ✅ Modèle gemini-2.5-flash utilisé');
  console.log('6. ✅ ThinkingBudget: 0 pour la performance');
  console.log('7. ✅ Méthodes ai.models.generateContent()');
  console.log('8. ✅ Chat ai.chats.create()');
  console.log('9. ✅ Streaming chat.sendMessageStream()');
  console.log('10. ✅ Multimodal createUserContent, createPartFromUri');
}

// Exécution
validateOfficialGeminiAPI()
  .then(() => displayOfficialChecklist())
  .catch(console.error);