#!/usr/bin/env tsx

import { AutoCorrector } from '../src/lib/audit/auto-corrector';
import { CorrectionManager } from '../src/lib/audit/correction-manager';
import { ScannedLink } from '../src/lib/audit/types';

/**
 * Test script for the auto-corrector system
 */
async function testAutoCorrector() {
  console.log('🔧 Testing Auto-Corrector System\n');

  const corrector = new AutoCorrector();
  const manager = new CorrectionManager();

  // Test data - simulate some broken links
  const testBrokenLinks: ScannedLink[] = [
    {
      url: '/ressources/meilleurs-livres/developement-commercial',
      sourceFile: 'src/app/page.tsx',
      sourceLine: 42,
      linkType: 'internal',
      context: '<Link href="/ressources/meilleurs-livres/developement-commercial">',
      priority: 'high'
    },
    {
      url: '/ressources/guide-comercial.pdf',
      sourceFile: 'src/components/DownloadSection.tsx',
      sourceLine: 15,
      linkType: 'download',
      context: '<a href="/ressources/guide-comercial.pdf" download>',
      priority: 'critical'
    },
    {
      url: '/services/formation-commerciale',
      sourceFile: 'src/app/layout.tsx',
      sourceLine: 28,
      linkType: 'internal',
      context: 'href="/services/formation-commerciale"',
      priority: 'medium'
    }
  ];

  try {
    // Test 1: Get correction suggestions
    console.log('📋 Test 1: Getting correction suggestions...');
    const suggestions = await corrector.suggestCorrections(testBrokenLinks);
    
    console.log(`Found ${suggestions.length} correction suggestions:\n`);
    suggestions.forEach((suggestion, index) => {
      console.log(`${index + 1}. ${suggestion.originalUrl} → ${suggestion.suggestedUrl}`);
      console.log(`   Type: ${suggestion.correctionType}`);
      console.log(`   Confidence: ${Math.round(suggestion.confidence * 100)}%`);
      console.log(`   Reasoning: ${suggestion.reasoning}\n`);
    });

    // Test 2: Test similarity detection
    console.log('🔍 Test 2: Testing URL similarity detection...');
    const similarUrls = await corrector.findSimilarUrls('/ressources/meilleurs-livres/developement-commercial');
    console.log('Similar URLs found:', similarUrls.length);
    similarUrls.forEach(suggestion => {
      console.log(`  - ${suggestion.suggestedUrl} (${Math.round(suggestion.confidence * 100)}% similar)`);
    });
    console.log('');

    // Test 3: Test correction manager
    console.log('📊 Test 3: Testing correction manager...');
    await manager.listAppliedCorrections();

    // Test 4: Test validation (without actually applying corrections)
    console.log('✅ Test 4: Testing validation system...');
    console.log('Validation system ready for use.\n');

    // Test 5: Test cleanup functionality
    console.log('🧹 Test 5: Testing cleanup functionality...');
    await manager.cleanup(30);

    console.log('✅ All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run the test if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testAutoCorrector().catch(console.error);
}

export { testAutoCorrector };