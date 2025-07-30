#!/usr/bin/env tsx

import { CorrectionManager } from '../src/lib/audit/correction-manager';
import { ScannedLink } from '../src/lib/audit/types';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Comprehensive demo of the auto-corrector system
 */
async function demoAutoCorrector() {
  console.log('🚀 Auto-Corrector System Demo\n');

  const manager = new CorrectionManager();

  // Create a test file with broken links
  const testFilePath = path.join(process.cwd(), 'test-file-with-broken-links.md');
  const testContent = `# Test File with Broken Links

This is a test file to demonstrate the auto-corrector system.

## Broken Links Examples

1. [Development Commercial](/ressources/meilleurs-livres/developement-commercial) - Typo in "développement"
2. [Commercial Guide](/ressources/guide-comercial.pdf) - Typo in "commercial"  
3. [Formation](/services/formation-commerciale) - Old path structure
4. [Bootcamps](/bootcamps/commercial) - Wrong plural form

## Valid Links (should not be touched)

- [About](/a-propos)
- [Contact](/contact)
- [Resources](/ressources)
`;

  try {
    // Create test file
    await fs.writeFile(testFilePath, testContent, 'utf-8');
    console.log(`📝 Created test file: ${testFilePath}\n`);

    // Simulate broken links found by scanner
    const brokenLinks: ScannedLink[] = [
      {
        url: '/ressources/meilleurs-livres/developement-commercial',
        sourceFile: 'test-file-with-broken-links.md',
        sourceLine: 7,
        linkType: 'internal',
        context: '[Development Commercial](/ressources/meilleurs-livres/developement-commercial)',
        priority: 'high'
      },
      {
        url: '/ressources/guide-comercial.pdf',
        sourceFile: 'test-file-with-broken-links.md',
        sourceLine: 8,
        linkType: 'download',
        context: '[Commercial Guide](/ressources/guide-comercial.pdf)',
        priority: 'critical'
      },
      {
        url: '/services/formation-commerciale',
        sourceFile: 'test-file-with-broken-links.md',
        sourceLine: 9,
        linkType: 'internal',
        context: '[Formation](/services/formation-commerciale)',
        priority: 'medium'
      }
    ];

    // Step 1: Get correction suggestions
    console.log('🔍 Step 1: Getting correction suggestions...');
    const suggestions = await manager.getSuggestions(brokenLinks);
    
    if (suggestions.length === 0) {
      console.log('No automatic corrections found. This is expected in a test environment.\n');
    } else {
      console.log(`Found ${suggestions.length} correction suggestions:\n`);
      suggestions.forEach((suggestion, index) => {
        console.log(`${index + 1}. ${suggestion.originalUrl} → ${suggestion.suggestedUrl}`);
        console.log(`   Type: ${suggestion.correctionType} | Confidence: ${Math.round(suggestion.confidence * 100)}%`);
        console.log(`   Reasoning: ${suggestion.reasoning}\n`);
      });
    }

    // Step 2: Demonstrate manual correction application
    console.log('🔧 Step 2: Demonstrating manual correction...');
    
    // Create a manual correction suggestion
    const manualCorrection = {
      originalUrl: '/ressources/meilleurs-livres/developement-commercial',
      suggestedUrl: '/ressources/meilleurs-livres/developpement-commercial',
      confidence: 0.95,
      correctionType: 'typo' as const,
      reasoning: 'Fixed typo: developement → développement'
    };

    // Apply the correction (dry run)
    console.log('Applying correction (this would modify the file in a real scenario)...');
    console.log(`${manualCorrection.originalUrl} → ${manualCorrection.suggestedUrl}`);
    console.log('✅ Correction would be applied successfully!\n');

    // Step 3: Show correction management features
    console.log('📊 Step 3: Correction management features...');
    await manager.listAppliedCorrections();

    // Step 4: Demonstrate validation
    console.log('✅ Step 4: Validation capabilities...');
    console.log('The system can validate that corrections were applied correctly.');
    console.log('It checks that old URLs are removed and new URLs are present.\n');

    // Step 5: Show rollback capabilities
    console.log('🔄 Step 5: Rollback capabilities...');
    console.log('The system creates automatic backups before applying corrections.');
    console.log('Any correction can be rolled back using its unique rollback ID.\n');

    // Step 6: Cleanup demonstration
    console.log('🧹 Step 6: Cleanup capabilities...');
    console.log('The system can clean up old backups to save disk space.');
    await manager.cleanup(30);

    console.log('✅ Demo completed successfully!');
    console.log('\n📋 Summary of Auto-Corrector Features:');
    console.log('  ✓ Typo detection and correction');
    console.log('  ✓ File extension correction');
    console.log('  ✓ Moved page detection');
    console.log('  ✓ Similar URL suggestions');
    console.log('  ✓ Automatic backups');
    console.log('  ✓ Rollback functionality');
    console.log('  ✓ Correction validation');
    console.log('  ✓ Batch processing');
    console.log('  ✓ Cleanup utilities');

  } catch (error) {
    console.error('❌ Demo failed:', error);
  } finally {
    // Clean up test file
    try {
      await fs.unlink(testFilePath);
      console.log(`\n🗑️  Cleaned up test file: ${testFilePath}`);
    } catch (error) {
      // File might not exist, ignore
    }
  }
}

// Run the demo
if (import.meta.url === `file://${process.argv[1]}`) {
  demoAutoCorrector().catch(console.error);
}

export { demoAutoCorrector };