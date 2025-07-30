import { AutoCorrector } from './auto-corrector';
import { ScannedLink, CorrectionSuggestion } from './types';

/**
 * High-level interface for managing link corrections
 */
export class CorrectionManager {
  private autoCorrector: AutoCorrector;

  constructor(baseUrl?: string, projectRoot?: string) {
    this.autoCorrector = new AutoCorrector(baseUrl, projectRoot);
  }

  /**
   * Get correction suggestions for broken links
   */
  async getSuggestions(brokenLinks: ScannedLink[]): Promise<CorrectionSuggestion[]> {
    return await this.autoCorrector.suggestCorrections(brokenLinks);
  }

  /**
   * Apply a correction with confirmation
   */
  async applyCorrection(
    suggestion: CorrectionSuggestion, 
    sourceFiles: string[],
    autoConfirm: boolean = false
  ) {
    if (!autoConfirm) {
      console.log('\n=== Correction Preview ===');
      console.log(`Original URL: ${suggestion.originalUrl}`);
      console.log(`Suggested URL: ${suggestion.suggestedUrl}`);
      console.log(`Correction Type: ${suggestion.correctionType}`);
      console.log(`Confidence: ${Math.round(suggestion.confidence * 100)}%`);
      console.log(`Reasoning: ${suggestion.reasoning}`);
      console.log(`Files to modify: ${sourceFiles.join(', ')}`);
      console.log('========================\n');

      // In a real CLI, you would prompt for user confirmation here
      // For now, we'll assume confirmation
    }

    const result = await this.autoCorrector.applyCorrection(suggestion, sourceFiles);
    
    if (result.applied) {
      console.log(`✅ Correction applied successfully!`);
      console.log(`Rollback ID: ${result.rollbackId}`);
    } else {
      console.log(`❌ Failed to apply correction`);
    }

    return result;
  }

  /**
   * List all applied corrections
   */
  async listAppliedCorrections() {
    const corrections = await this.autoCorrector.getAppliedCorrections();
    
    if (corrections.length === 0) {
      console.log('No corrections have been applied yet.');
      return corrections;
    }

    console.log('\n=== Applied Corrections ===');
    corrections.forEach((correction, index) => {
      console.log(`${index + 1}. ${correction.originalUrl} → ${correction.correctedUrl}`);
      console.log(`   Type: ${correction.correctionType} | Confidence: ${Math.round(correction.confidence * 100)}%`);
      console.log(`   Applied: ${new Date(correction.timestamp).toLocaleString()}`);
      console.log(`   Rollback ID: ${correction.rollbackId}`);
      console.log(`   Files: ${correction.sourceFiles.join(', ')}`);
      console.log('');
    });

    return corrections;
  }

  /**
   * Rollback a correction
   */
  async rollbackCorrection(rollbackId: string) {
    console.log(`Rolling back correction: ${rollbackId}`);
    
    const success = await this.autoCorrector.rollbackCorrection(rollbackId);
    
    if (success) {
      console.log(`✅ Rollback completed successfully!`);
    } else {
      console.log(`❌ Rollback failed`);
    }

    return success;
  }

  /**
   * Validate corrections
   */
  async validateCorrections(rollbackId: string) {
    console.log(`Validating corrections for: ${rollbackId}`);
    
    const report = await this.autoCorrector.validateCorrections(rollbackId);
    
    console.log('\n=== Validation Report ===');
    console.log(`Rollback ID: ${report.rollbackId}`);
    console.log(`Timestamp: ${report.timestamp.toLocaleString()}`);
    console.log(`Overall Success: ${report.success ? '✅' : '❌'}`);
    
    if (report.errors.length > 0) {
      console.log('\nErrors:');
      report.errors.forEach(error => console.log(`  ❌ ${error}`));
    }

    console.log('\nFile Validation:');
    report.validatedFiles.forEach(file => {
      const status = file.valid ? '✅' : '❌';
      console.log(`  ${status} ${file.filePath}`);
      if (!file.valid) {
        console.log(`    - Has old URL: ${file.hasOldUrl}`);
        console.log(`    - Has new URL: ${file.hasNewUrl}`);
      }
    });

    return report;
  }

  /**
   * Clean up old backups
   */
  async cleanup(daysToKeep: number = 30) {
    console.log(`Cleaning up backups older than ${daysToKeep} days...`);
    await this.autoCorrector.cleanupOldBackups(daysToKeep);
  }

  /**
   * Batch apply corrections with safety checks
   */
  async batchApplyCorrections(
    suggestions: CorrectionSuggestion[],
    sourceFilesMap: Map<string, string[]>,
    options: {
      maxConfidence?: number;
      minConfidence?: number;
      dryRun?: boolean;
      autoConfirm?: boolean;
    } = {}
  ) {
    const {
      maxConfidence = 1.0,
      minConfidence = 0.7,
      dryRun = false,
      autoConfirm = false
    } = options;

    const filteredSuggestions = suggestions.filter(
      s => s.confidence >= minConfidence && s.confidence <= maxConfidence
    );

    console.log(`\n=== Batch Correction ${dryRun ? '(DRY RUN)' : ''} ===`);
    console.log(`Total suggestions: ${suggestions.length}`);
    console.log(`Filtered suggestions: ${filteredSuggestions.length}`);
    console.log(`Confidence range: ${minConfidence} - ${maxConfidence}`);
    console.log('');

    const results = [];

    for (const suggestion of filteredSuggestions) {
      const sourceFiles = sourceFilesMap.get(suggestion.originalUrl) || [];
      
      if (sourceFiles.length === 0) {
        console.log(`⚠️  No source files found for: ${suggestion.originalUrl}`);
        continue;
      }

      if (dryRun) {
        console.log(`[DRY RUN] Would apply: ${suggestion.originalUrl} → ${suggestion.suggestedUrl}`);
        console.log(`  Confidence: ${Math.round(suggestion.confidence * 100)}%`);
        console.log(`  Files: ${sourceFiles.join(', ')}`);
        console.log('');
        continue;
      }

      try {
        const result = await this.applyCorrection(suggestion, sourceFiles, autoConfirm);
        results.push(result);
        
        // Small delay between corrections to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Error applying correction for ${suggestion.originalUrl}:`, error);
      }
    }

    if (!dryRun) {
      const successful = results.filter(r => r.applied).length;
      console.log(`\n=== Batch Correction Complete ===`);
      console.log(`Successfully applied: ${successful}/${results.length} corrections`);
    }

    return results;
  }
}