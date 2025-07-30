import { NextResponse } from 'next/server';
import { LinkScanner } from '@/lib/audit/link-scanner';
import { LinkValidator } from '@/lib/audit/link-validator';
import { AutoCorrector } from '@/lib/audit/auto-corrector';
import { ReportGenerator } from '@/lib/audit/report-generator';
import { AuditDatabase } from '@/lib/audit/database';
import { SendGridEmailService } from '@/lib/email/sendgrid-service';
import { getAlertManager } from '@/lib/audit/alert-manager';
import { defaultScannerConfig, validationConfig } from '@/lib/audit/config';

export async function GET() {
  const startTime = Date.now();
  
  try {
    console.log('🔍 Starting link audit...');

    // Step 1: Scan all links
    const scanner = new LinkScanner();
    const scanResult = await scanner.scanAllLinks();
    const scannedLinks = scanResult.links;
    console.log(`📊 Scanned ${scannedLinks.length} links`);

    // Store scanned links in database
    if (scannedLinks.length > 0) {
      await AuditDatabase.insertScannedLinks(
        scannedLinks.map(link => ({
          url: link.url,
          source_file: link.sourceFile,
          source_line: link.sourceLine,
          link_type: link.linkType,
          priority: link.priority,
          context: link.context,
        }))
      );
    }

    // Step 2: Validate links
    const validator = new LinkValidator();
    const validationResults = await validator.validateBatch(
      scannedLinks.map(link => link.url),
      validationConfig()
    );
    console.log(`✅ Validated ${validationResults.length} links`);

    // Store validation results
    if (validationResults.length > 0) {
      await AuditDatabase.insertValidationResults(
        validationResults.map(result => ({
          url: result.url,
          status: result.status,
          status_code: result.statusCode,
          redirect_url: result.redirectUrl,
          error_message: result.error,
          response_time: result.responseTime,
        }))
      );
    }

    // Step 3: Auto-correct simple issues
    const brokenLinks = scannedLinks.filter(link => {
      const validation = validationResults.find(v => v.url === link.url);
      return validation && validation.status === 'broken';
    });

    let correctedCount = 0;
    if (brokenLinks.length > 0) {
      const autoCorrector = new AutoCorrector();
      const suggestions = await autoCorrector.suggestCorrections(brokenLinks);
      
      for (const suggestion of suggestions) {
        if (suggestion.confidence >= 0.8) {
          try {
            const result = await autoCorrector.applyCorrection(suggestion);
            if (result.applied) {
              correctedCount++;
            }
          } catch (error) {
            console.error(`Failed to apply correction for ${suggestion.originalUrl}:`, error);
          }
        }
      }
    }

    console.log(`🔧 Applied ${correctedCount} automatic corrections`);

    // Step 4: Generate report
    const reportGenerator = new ReportGenerator();
    const report = await reportGenerator.generateReport(validationResults, scannedLinks);

    // Step 5: Store audit history
    const executionTime = Math.round((Date.now() - startTime) / 1000);
    await AuditDatabase.insertAuditHistory({
      total_links: scannedLinks.length,
      broken_links: brokenLinks.length,
      corrected_links: correctedCount,
      seo_score: report.summary.seoHealthScore,
      execution_time: executionTime,
    });

    // Step 6: Analyze results and send alerts if needed
    try {
      const alertManager = getAlertManager();
      await alertManager.analyzeAuditResults();
      console.log('📧 Alert analysis completed');
    } catch (alertError) {
      console.error('Failed to analyze alerts:', alertError);
    }

    console.log(`✅ Audit completed in ${executionTime}s`);

    return NextResponse.json({
      success: true,
      summary: report.summary,
      executionTime,
      reportId: `audit-${Date.now()}`,
      details: {
        scannedLinks: scannedLinks.length,
        brokenLinks: brokenLinks.length,
        correctedLinks: correctedCount,
        criticalIssues: brokenLinks.filter(link => link.priority === 'critical').length,
      },
    });

  } catch (error) {
    console.error('Audit failed:', error);
    
    const executionTime = Math.round((Date.now() - startTime) / 1000);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Audit failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        executionTime,
      },
      { status: 500 }
    );
  }
}