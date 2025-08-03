#!/usr/bin/env tsx

/**
 * Script de validation pour vérifier que toutes les références GoogleGenAI ont été corrigées
 */

import { readFileSync, existsSync } from 'fs';
import { glob } from 'glob';
import chalk from 'chalk';

interface ValidationResult {
  file: string;
  hasOldReference: boolean;
  hasCorrectImport: boolean;
  issues: string[];
}

async function validateGeminiApiReferences(): Promise<void> {
  console.log(chalk.blue('🔍 Validation des références API Gemini...'));
  
  // Fichiers à vérifier (production uniquement)
  const productionFiles = [
    'src/app/api/chat/files/upload/route.ts',
    'src/app/api/chat/gemini/route.ts',
    'src/app/api/chat/gemini/route-complex.ts',
    'src/lib/gemini/service.ts',
    'src/hooks/useGeminiChatSimple.ts',
    'src/hooks/useGeminiChat.ts',
    'src/components/chat/ChatWidget.tsx',
    'src/components/chat/SimpleChatWidget.tsx'
  ];

  const results: ValidationResult[] = [];
  let hasErrors = false;

  for (const file of productionFiles) {
    if (!existsSync(file)) {
      console.log(chalk.yellow(`⚠️  Fichier non trouvé: ${file}`));
      continue;
    }

    const content = readFileSync(file, 'utf-8');
    const issues: string[] = [];

    // Vérifier les anciennes références
    if (content.includes('GoogleGenAI')) {
      issues.push('Contient encore des références à GoogleGenAI');
      hasErrors = true;
    }

    // Vérifier les imports corrects
    const hasCorrectImport = content.includes('GoogleGenerativeAI') && 
                            content.includes('@google/generative-ai');

    if (content.includes('@google/generative-ai') && !hasCorrectImport) {
      issues.push('Import incorrect de @google/generative-ai');
      hasErrors = true;
    }

    // Vérifier les constructeurs
    if (content.includes('new GoogleGenAI(')) {
      issues.push('Constructeur GoogleGenAI encore présent');
      hasErrors = true;
    }

    results.push({
      file,
      hasOldReference: content.includes('GoogleGenAI'),
      hasCorrectImport,
      issues
    });
  }

  // Afficher les résultats
  console.log('\n📋 Résultats de validation:');
  
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

  // Recherche globale dans tous les fichiers TypeScript
  console.log('\n🔍 Recherche globale des références GoogleGenAI...');
  
  const allTsFiles = await glob('src/**/*.{ts,tsx}', { ignore: ['src/**/*.test.ts', 'src/**/*.test.tsx'] });
  const globalIssues: string[] = [];

  for (const file of allTsFiles) {
    const content = readFileSync(file, 'utf-8');
    if (content.includes('GoogleGenAI') && !content.includes('GoogleGenerativeAI')) {
      globalIssues.push(file);
    }
  }

  if (globalIssues.length > 0) {
    console.log(chalk.red('\n❌ Fichiers avec des références GoogleGenAI restantes:'));
    globalIssues.forEach(file => console.log(chalk.red(`   - ${file}`)));
    hasErrors = true;
  } else {
    console.log(chalk.green('\n✅ Aucune référence GoogleGenAI trouvée dans les fichiers de production'));
  }

  // Résumé final
  if (hasErrors) {
    console.log(chalk.red('\n❌ ÉCHEC: Des références GoogleGenAI subsistent'));
    console.log(chalk.yellow('   Corrigez les fichiers listés ci-dessus avant le déploiement'));
    process.exit(1);
  } else {
    console.log(chalk.green('\n✅ SUCCÈS: Toutes les références API Gemini sont correctes'));
    console.log(chalk.green('   Le build Vercel devrait maintenant réussir'));
  }
}

// Exécution
validateGeminiApiReferences().catch(console.error);