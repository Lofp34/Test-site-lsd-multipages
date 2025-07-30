# Auto-Corrector System Documentation

## Overview

The Auto-Corrector system is a comprehensive solution for automatically detecting and fixing broken links in the Laurent Serre Développement website. It provides intelligent correction suggestions, safe application of fixes, and complete rollback capabilities.

## Features

### 🔍 Intelligent Detection
- **Typo Detection**: Identifies common French typos in URLs (développement, commercial, négociation, etc.)
- **Extension Correction**: Finds files with different extensions (PDF, DOCX, etc.)
- **Moved Page Detection**: Detects pages that have been moved to new locations
- **Similarity Matching**: Uses Levenshtein distance to find similar URLs

### 🔧 Safe Application
- **Automatic Backups**: Creates backups before applying any corrections
- **Format Preservation**: Maintains file formatting when applying corrections
- **Multi-file Support**: Handles corrections across multiple source files
- **Detailed Logging**: Logs all corrections with timestamps and metadata

### 🔄 Rollback System
- **Complete Rollback**: Restore files to their original state
- **Validation**: Verify that corrections were applied correctly
- **Cleanup**: Remove old backups to save disk space

## Architecture

```
AutoCorrector
├── Detection Engine
│   ├── Typo Detection
│   ├── Extension Detection
│   ├── Redirect Detection
│   └── Similarity Matching
├── Application Engine
│   ├── Backup Creation
│   ├── File Modification
│   └── Logging System
└── Rollback Engine
    ├── Backup Restoration
    ├── Validation
    └── Cleanup
```

## Usage

### Basic Usage

```typescript
import { AutoCorrector } from './auto-corrector';
import { CorrectionManager } from './correction-manager';

// Initialize
const corrector = new AutoCorrector();
const manager = new CorrectionManager();

// Get suggestions for broken links
const suggestions = await corrector.suggestCorrections(brokenLinks);

// Apply a correction
const result = await corrector.applyCorrection(suggestion, sourceFiles);

// Rollback if needed
await corrector.rollbackCorrection(result.rollbackId);
```

### Advanced Usage

```typescript
// Batch apply corrections with filters
await manager.batchApplyCorrections(suggestions, sourceFilesMap, {
  minConfidence: 0.8,
  maxConfidence: 1.0,
  dryRun: false,
  autoConfirm: true
});

// Validate corrections
const report = await corrector.validateCorrections(rollbackId);

// Clean up old backups
await corrector.cleanupOldBackups(30);
```

## Configuration

### Common Typos

The system includes predefined common typos for French URLs:

```typescript
const commonTypos = [
  { from: 'developement', to: 'developpement' },
  { from: 'comercial', to: 'commercial' },
  { from: 'negociation', to: 'negociation' },
  // ... more typos
];
```

### File Extensions

Supported file extensions for correction:
- Documents: `.pdf`, `.docx`, `.doc`, `.xlsx`, `.xls`, `.pptx`, `.ppt`
- Archives: `.zip`
- Images: `.png`, `.jpg`, `.jpeg`

### Page Moves

Common page moves are detected:

```typescript
const commonMoves = [
  { from: '/services/', to: '/ressources/' },
  { from: '/blog/', to: '/ressources/' },
  { from: '/formations/', to: '/formation-commerciale-pme/' },
  // ... more moves
];
```

## File Structure

```
src/lib/audit/
├── auto-corrector.ts          # Main auto-corrector class
├── correction-manager.ts      # High-level management interface
└── types.ts                   # TypeScript interfaces

scripts/
├── test-auto-corrector.ts     # Basic test script
└── demo-auto-corrector.ts     # Comprehensive demo

.audit-backups/                # Backup storage
├── rollback_123456_abc/       # Rollback-specific backups
│   └── src/app/page.tsx       # Backed up files
└── ...

.audit-logs/                   # Log storage
├── corrections.jsonl          # Correction log
└── rollbacks.jsonl           # Rollback log
```

## API Reference

### AutoCorrector Class

#### Methods

##### `suggestCorrections(brokenLinks: ScannedLink[]): Promise<CorrectionSuggestion[]>`
Analyzes broken links and returns correction suggestions.

##### `applyCorrection(suggestion: CorrectionSuggestion, sourceFiles: string[]): Promise<CorrectionResult>`
Applies a correction to the specified source files.

##### `rollbackCorrection(rollbackId: string): Promise<boolean>`
Rolls back a correction using its rollback ID.

##### `validateCorrections(rollbackId: string): Promise<ValidationReport>`
Validates that corrections were applied correctly.

##### `cleanupOldBackups(daysToKeep: number): Promise<void>`
Removes backup directories older than the specified number of days.

### CorrectionManager Class

#### Methods

##### `getSuggestions(brokenLinks: ScannedLink[]): Promise<CorrectionSuggestion[]>`
High-level interface to get correction suggestions.

##### `applyCorrection(suggestion: CorrectionSuggestion, sourceFiles: string[], autoConfirm?: boolean)`
Applies a correction with optional user confirmation.

##### `listAppliedCorrections(): Promise<CorrectionLogEntry[]>`
Lists all previously applied corrections.

##### `rollbackCorrection(rollbackId: string): Promise<boolean>`
Rolls back a correction with user-friendly output.

##### `validateCorrections(rollbackId: string): Promise<ValidationReport>`
Validates corrections with detailed reporting.

##### `batchApplyCorrections(suggestions, sourceFilesMap, options): Promise<CorrectionResult[]>`
Applies multiple corrections with filtering and safety options.

## Data Types

### CorrectionSuggestion
```typescript
interface CorrectionSuggestion {
  originalUrl: string;
  suggestedUrl: string;
  confidence: number;          // 0.0 to 1.0
  correctionType: 'typo' | 'extension' | 'redirect' | 'moved' | 'similar';
  reasoning: string;
}
```

### CorrectionResult
```typescript
interface CorrectionResult {
  applied: boolean;
  originalUrl: string;
  newUrl: string;
  filePath: string;
  backupCreated: boolean;
  rollbackId: string;
}
```

### ValidationReport
```typescript
interface ValidationReport {
  rollbackId: string;
  timestamp: Date;
  validatedFiles: {
    filePath: string;
    hasOldUrl: boolean;
    hasNewUrl: boolean;
    valid: boolean;
  }[];
  errors: string[];
  success: boolean;
}
```

## Safety Features

### Automatic Backups
- Every correction creates a complete backup of affected files
- Backups are stored with unique rollback IDs
- Original file structure is preserved

### Validation
- Post-correction validation ensures changes were applied correctly
- Checks that old URLs are removed and new URLs are present
- Reports any inconsistencies

### Rollback Protection
- Complete rollback capability for any correction
- Validates rollback success
- Maintains rollback history

### Confidence Scoring
- All suggestions include confidence scores (0.0 to 1.0)
- Batch operations can filter by confidence levels
- High-confidence corrections can be auto-applied

## Best Practices

### Before Running Corrections
1. **Backup your repository**: Always have a git backup before running corrections
2. **Test on a subset**: Start with a small number of corrections
3. **Review suggestions**: Check correction suggestions before applying
4. **Set confidence thresholds**: Use appropriate confidence levels for batch operations

### During Corrections
1. **Monitor progress**: Watch for errors during batch operations
2. **Validate results**: Run validation after applying corrections
3. **Test functionality**: Verify that corrected links work as expected

### After Corrections
1. **Commit changes**: Commit corrected files to version control
2. **Clean up backups**: Remove old backups periodically
3. **Document changes**: Keep track of major corrections applied

## Troubleshooting

### Common Issues

#### No Suggestions Found
- Check that broken links are actually broken
- Verify that similar URLs exist in the system
- Ensure the base URL is configured correctly

#### Corrections Not Applied
- Check file permissions
- Verify that source files exist
- Review error logs for specific issues

#### Rollback Failed
- Ensure backup directory exists
- Check file permissions
- Verify rollback ID is correct

### Debugging

Enable detailed logging:
```typescript
const corrector = new AutoCorrector(baseUrl, projectRoot);
// Logs are automatically written to .audit-logs/
```

Check log files:
- `.audit-logs/corrections.jsonl` - Correction history
- `.audit-logs/rollbacks.jsonl` - Rollback history

## Integration

### With Link Scanner
```typescript
import { LinkScanner } from './link-scanner';
import { AutoCorrector } from './auto-corrector';

const scanner = new LinkScanner();
const corrector = new AutoCorrector();

// Scan for broken links
const brokenLinks = await scanner.scanSite(config);

// Get correction suggestions
const suggestions = await corrector.suggestCorrections(brokenLinks);
```

### With Audit System
```typescript
import { AuditSystem } from './audit-system';

const auditSystem = new AuditSystem();

// Run full audit with auto-correction
const report = await auditSystem.runAuditWithCorrections({
  autoCorrect: true,
  minConfidence: 0.8
});
```

## Performance Considerations

### Memory Usage
- Large sites may require batch processing
- Consider processing links in chunks
- Clean up old backups regularly

### File I/O
- Corrections involve multiple file operations
- Use appropriate delays between batch corrections
- Monitor disk space usage

### Network Requests
- URL validation may involve network requests
- Implement rate limiting for external URL checks
- Cache validation results when possible

## Security Considerations

### File Access
- Only modify files within the project directory
- Validate file paths to prevent directory traversal
- Use appropriate file permissions

### Backup Security
- Backup directories contain sensitive file contents
- Implement appropriate access controls
- Clean up backups regularly

### Logging
- Log files may contain sensitive URLs
- Implement log rotation
- Consider log file permissions

## Future Enhancements

### Planned Features
- Database integration for correction history
- Web interface for correction management
- Integration with CI/CD pipelines
- Machine learning for better suggestions

### Possible Improvements
- Support for more file types
- Advanced similarity algorithms
- Bulk correction templates
- Integration with external link checkers

## Support

For issues or questions about the Auto-Corrector system:

1. Check the troubleshooting section
2. Review log files for error details
3. Test with the demo script
4. Consult the API reference

## Testing

Run the test suite:
```bash
npx tsx scripts/test-auto-corrector.ts
```

Run the comprehensive demo:
```bash
npx tsx scripts/demo-auto-corrector.ts
```

Both scripts provide detailed output about system functionality and can help diagnose issues.