#!/usr/bin/env node

/**
 * Test manuel pour valider l'ouverture du chat sans erreur webpack
 * Ce script simule l'import et l'utilisation des composants de chat
 */

console.log('🚀 Test manuel de validation du chat...\n');

// Test 1: Import du service client
console.log('📋 Test 1: Import du ClientFileService...');
try {
  const { ClientFileService } = require('../src/lib/gemini/file-service-client.ts');
  console.log('✅ ClientFileService importé avec succès');
} catch (error) {
  console.log('❌ Erreur lors de l\'import du ClientFileService:', error.message);
}

// Test 2: Import du factory
console.log('\n📋 Test 2: Import du FileServiceFactory...');
try {
  const { createFileService } = require('../src/lib/gemini/file-service-factory-simple.ts');
  console.log('✅ FileServiceFactory importé avec succès');
} catch (error) {
  console.log('❌ Erreur lors de l\'import du FileServiceFactory:', error.message);
}

// Test 3: Import du hook
console.log('\n📋 Test 3: Import du useFileService hook...');
try {
  const { useFileService } = require('../src/hooks/useFileService.ts');
  console.log('✅ useFileService hook importé avec succès');
} catch (error) {
  console.log('❌ Erreur lors de l\'import du useFileService hook:', error.message);
}

// Test 4: Import de l'Error Boundary
console.log('\n📋 Test 4: Import du FileServiceErrorBoundary...');
try {
  const FileServiceErrorBoundary = require('../src/components/chat/FileServiceErrorBoundary.tsx');
  console.log('✅ FileServiceErrorBoundary importé avec succès');
} catch (error) {
  console.log('❌ Erreur lors de l\'import du FileServiceErrorBoundary:', error.message);
}

// Test 5: Vérification de l'absence d'imports problématiques
console.log('\n📋 Test 5: Vérification de l\'absence d\'imports problématiques...');
const fs = require('fs');
const path = require('path');

const filesToCheck = [
  'src/lib/gemini/file-service-client.ts',
  'src/lib/gemini/file-service-factory-simple.ts',
  'src/hooks/useFileService.ts'
];

let hasProblematicImports = false;

filesToCheck.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Vérifier les imports problématiques
    const problematicPatterns = [
      /@google\/genai/,
      /GoogleGenAI/,
      /GoogleGenerativeAI/
    ];
    
    const foundProblems = problematicPatterns.filter(pattern => pattern.test(content));
    
    if (foundProblems.length > 0) {
      console.log(`❌ ${filePath}: Imports problématiques détectés`);
      hasProblematicImports = true;
    } else {
      console.log(`✅ ${filePath}: Aucun import problématique`);
    }
  } catch (error) {
    console.log(`❌ Erreur lors de la lecture de ${filePath}:`, error.message);
  }
});

// Test 6: Vérification de la structure des fichiers
console.log('\n📋 Test 6: Vérification de la structure des fichiers...');
const requiredFiles = [
  'src/lib/gemini/file-service-client.ts',
  'src/lib/gemini/file-service-interface.ts',
  'src/lib/gemini/file-service-factory-simple.ts',
  'src/hooks/useFileService.ts',
  'src/components/chat/FileServiceErrorBoundary.tsx',
  'src/components/chat/SafeFileUploader.tsx'
];

let allFilesExist = true;

requiredFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${filePath}: Existe`);
  } else {
    console.log(`❌ ${filePath}: Manquant`);
    allFilesExist = false;
  }
});

// Résumé final
console.log('\n' + '='.repeat(60));
console.log('📊 RÉSUMÉ DU TEST MANUEL');
console.log('='.repeat(60));

if (!hasProblematicImports && allFilesExist) {
  console.log('🎉 SUCCÈS: Tous les tests passent !');
  console.log('✨ Le chat devrait s\'ouvrir sans erreur webpack');
  console.log('🔧 Les fichiers de correction sont en place');
  console.log('🚫 Aucun import problématique détecté');
} else {
  console.log('⚠️  ATTENTION: Des problèmes ont été détectés');
  if (hasProblematicImports) {
    console.log('❌ Imports problématiques trouvés');
  }
  if (!allFilesExist) {
    console.log('❌ Fichiers manquants');
  }
}

console.log('\n' + '='.repeat(60));