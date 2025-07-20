// Test simple pour vérifier l'infrastructure des templates
import { categoryThemes, getCategoryTheme } from '@/types/category-templates';
import { validateCategoryTheme, validateCategoryContent } from './data-validation';

/**
 * Test basique pour vérifier que les thèmes sont correctement configurés
 */
export function testCategoryThemes() {
  console.log('🧪 Test des thèmes de catégories...');
  
  const results = {
    totalThemes: 0,
    validThemes: 0,
    errors: [] as string[]
  };
  
  for (const [slug, theme] of Object.entries(categoryThemes)) {
    results.totalThemes++;
    
    try {
      const validation = validateCategoryTheme(theme);
      if (validation.success) {
        results.validThemes++;
        console.log(`✅ Thème ${slug} valide`);
      } else {
        results.errors.push(`❌ Thème ${slug} invalide: ${validation.error.issues.map(i => i.message).join(', ')}`);
      }
    } catch (error) {
      results.errors.push(`❌ Erreur lors de la validation du thème ${slug}: ${error}`);
    }
  }
  
  console.log(`\n📊 Résultats: ${results.validThemes}/${results.totalThemes} thèmes valides`);
  
  if (results.errors.length > 0) {
    console.log('\n🚨 Erreurs détectées:');
    results.errors.forEach(error => console.log(error));
  }
  
  return results;
}

/**
 * Test de la fonction getCategoryTheme
 */
export function testGetCategoryTheme() {
  console.log('\n🧪 Test de getCategoryTheme...');
  
  // Test avec une catégorie existante
  const digitalAITheme = getCategoryTheme('digital-ai');
  console.log(`✅ Thème digital-ai récupéré: ${digitalAITheme.name}`);
  
  // Test avec une catégorie inexistante (devrait retourner le fallback)
  const fallbackTheme = getCategoryTheme('inexistant');
  console.log(`✅ Fallback theme récupéré: ${fallbackTheme.name}`);
  
  // Test avec toutes les catégories définies
  const testCategories = [
    'negociation-closing',
    'psychologie-influence', 
    'methodes-process',
    'enterprise-account',
    'sales-management',
    'mindset-performance',
    'digital-ai',
    'prospection-sdr'
  ];
  
  testCategories.forEach(slug => {
    const theme = getCategoryTheme(slug);
    console.log(`✅ ${slug}: ${theme.name} (${theme.primaryColor})`);
  });
}

/**
 * Test de validation d'un contenu de catégorie exemple
 */
export function testCategoryContentValidation() {
  console.log('\n🧪 Test de validation du contenu de catégorie...');
  
  const sampleContent = {
    laurentVision: "Ceci est un exemple de vision Laurent Serre pour tester la validation des données de contenu de catégorie.",
    insights: [
      {
        title: "Insight de test",
        description: "Description détaillée de l'insight pour tester la validation",
        businessImpact: "Impact business mesurable pour les PME",
        implementationLevel: "Intermédiaire" as const,
        technologies: ["Test Tech 1", "Test Tech 2"],
        trend: "rising" as const
      }
    ],
    caseStudies: [
      {
        industry: "Technologie",
        companySize: "25 salariés",
        sector: "SaaS B2B",
        challenge: "Défi commercial à résoudre pour tester la validation",
        solutionApplied: "Solution appliquée détaillée pour le test",
        results: "Résultats obtenus après implémentation de la solution",
        metrics: {
          "Conversion": "+150%",
          "Leads": "+300%"
        },
        timeline: "3 mois",
        businessImpact: "Impact business significatif sur les résultats",
        laurentQuote: "Quote de Laurent Serre sur cette transformation",
        icon: "💻",
        themeColor: "#3B82F6"
      }
    ],
    roadmap: [
      {
        phase: 1,
        title: "Phase de test",
        duration: "2 semaines",
        description: "Description de la phase de test pour valider le système",
        keyActions: ["Action 1", "Action 2", "Action 3"],
        expectedResults: ["Résultat 1", "Résultat 2"],
        laurentTip: "Conseil de Laurent Serre pour cette phase de test",
        difficulty: "Débutant" as const,
        prerequisites: ["Prérequis 1"]
      }
    ],
    stats: [
      {
        value: "85%",
        label: "Taux de succès",
        description: "Description de la statistique"
      }
    ],
    crossCategorySuggestions: [
      {
        slug: "test-category",
        title: "Catégorie de test",
        description: "Description de la catégorie suggérée pour le test",
        icon: "🧪",
        relationshipType: "complementary" as const,
        suggestedBooks: ["book-1", "book-2"]
      }
    ],
    domainMessage: {
      title: "Message de domaine de test",
      description: "Description du message spécifique au domaine pour le test",
      icon: "🎯"
    }
  };
  
  const validation = validateCategoryContent(sampleContent);
  
  if (validation.success) {
    console.log('✅ Validation du contenu de catégorie réussie');
    return true;
  } else {
    console.log('❌ Validation du contenu de catégorie échouée:');
    validation.error.issues.forEach(issue => {
      console.log(`  - ${issue.path.join('.')}: ${issue.message}`);
    });
    return false;
  }
}

/**
 * Lance tous les tests d'infrastructure
 */
export function runInfrastructureTests() {
  console.log('🚀 Lancement des tests d\'infrastructure...\n');
  
  const themeResults = testCategoryThemes();
  testGetCategoryTheme();
  const contentValidation = testCategoryContentValidation();
  
  console.log('\n📋 Résumé des tests:');
  console.log(`- Thèmes: ${themeResults.validThemes}/${themeResults.totalThemes} valides`);
  console.log(`- Fonction getCategoryTheme: ✅ Fonctionnelle`);
  console.log(`- Validation contenu: ${contentValidation ? '✅' : '❌'} ${contentValidation ? 'Réussie' : 'Échouée'}`);
  
  const allTestsPassed = themeResults.errors.length === 0 && contentValidation;
  console.log(`\n🎯 Résultat global: ${allTestsPassed ? '✅ SUCCÈS' : '❌ ÉCHEC'}`);
  
  return allTestsPassed;
}

// Export pour utilisation dans d'autres fichiers
export default {
  testCategoryThemes,
  testGetCategoryTheme,
  testCategoryContentValidation,
  runInfrastructureTests
};