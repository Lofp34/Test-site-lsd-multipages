#!/usr/bin/env tsx

/**
 * Task 14 Validation Runner
 * Comprehensive testing script for advanced book pages upgrade validation
 */

import { runCompleteValidation } from '../utils/comprehensive-book-pages-validation';
import { runCTAConversionTests } from '../utils/test-cta-conversion-paths';

async function main() {
  console.log('🚀 TASK 14 - TESTS ET VALIDATION FINALE');
  console.log('======================================\n');
  
  console.log('📋 Testing Requirements:');
  console.log('- ✅ Valider le responsive design mobile sur toutes les pages');
  console.log('- ✅ Tester les performances Lighthouse (objectif 95+)');
  console.log('- ✅ Vérifier les données structurées Schema.org');
  console.log('- ✅ Valider l\'accessibilité WCAG 2.1');
  console.log('- ✅ Tester la cohérence visuelle entre toutes les pages');
  console.log('- ✅ Adapter les CTAs par domaine');
  console.log('- ✅ Tester les parcours de conversion\n');

  try {
    // Run complete validation suite
    await runCompleteValidation();
    
    console.log('\n✅ Task 14 validation completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Task 14 validation failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export default main;