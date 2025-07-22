#!/usr/bin/env tsx

/**
 * Link Validation Script
 * Validates all internal links and generates a report
 */

import { linkValidator } from '../utils/link-validation';
import { linkExtractor } from '../utils/link-extractor';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('🔍 Starting link validation...\n');

  try {
    // Extract all links from the project
    console.log('📋 Extracting links from project...');
    const extractedLinks = await linkExtractor.extractAllLinks();
    const uniqueUrls = [...new Set(extractedLinks.map(link => link.url))];
    
    console.log(`Found ${extractedLinks.length} link references (${uniqueUrls.length} unique URLs)\n`);

    // Show link summary
    const summary = linkExtractor.getLinkSummary(extractedLinks);
    console.log('📊 Link categories:');
    Object.entries(summary).forEach(([category, count]) => {
      console.log(`  ${category}: ${count}`);
    });
    console.log();

    // Validate links
    console.log('🔍 Validating links...');
    const report = await linkValidator.generateValidationReport(uniqueUrls);

    // Display results
    console.log('\n📈 Validation Results:');
    console.log(`  Total links: ${report.totalLinks}`);
    console.log(`  Valid links: ${report.validLinks} (${Math.round(report.validLinks / report.totalLinks * 100)}%)`);
    console.log(`  Broken links: ${report.brokenLinks} (${Math.round(report.brokenLinks / report.totalLinks * 100)}%)`);
    console.log(`  With redirects: ${report.redirectedLinks}`);

    // Show broken links
    if (report.brokenLinks > 0) {
      console.log('\n❌ Broken Links:');
      report.results
        .filter(r => !r.isValid)
        .forEach(result => {
          console.log(`  ${result.url}`);
          if (result.statusCode) {
            console.log(`    Status: ${result.statusCode}`);
          }
          if (result.error) {
            console.log(`    Error: ${result.error}`);
          }
          if (result.suggestedRedirect) {
            console.log(`    Suggested redirect: ${result.suggestedRedirect}`);
            console.log(`    Reason: ${result.redirectReason}`);
          }
          console.log();
        });
    }

    // Show redirect mapping
    console.log('\n🔄 Current Redirect Mapping:');
    const redirectMapping = linkValidator.getRedirectMapping();
    Object.entries(redirectMapping).forEach(([from, to]) => {
      console.log(`  ${from} → ${to.redirectTo}`);
      console.log(`    Reason: ${to.reason}`);
      console.log(`    Status: ${to.statusCode}`);
      console.log();
    });

    // Save report to file
    const reportPath = path.join(process.cwd(), 'link-validation-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Report saved to: ${reportPath}`);

    // Generate redirect configuration for Next.js
    await generateNextJSRedirects(redirectMapping);

    console.log('\n✅ Link validation completed!');
    
    // Exit with error code if there are broken links
    if (report.brokenLinks > 0) {
      console.log(`\n⚠️  Found ${report.brokenLinks} broken links. Please fix them or add redirects.`);
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Error during link validation:', error);
    process.exit(1);
  }
}

async function generateNextJSRedirects(redirectMapping: any) {
  const redirects = Object.entries(redirectMapping).map(([source, target]: [string, any]) => ({
    source,
    destination: target.redirectTo,
    permanent: target.statusCode === 301
  }));

  const redirectsConfig = `// Auto-generated redirects from link validation
// Generated at: ${new Date().toISOString()}

export const linkRedirects = ${JSON.stringify(redirects, null, 2)};
`;

  const configPath = path.join(process.cwd(), 'src/config/redirects.ts');
  fs.writeFileSync(configPath, redirectsConfig);
  console.log(`🔄 Redirects configuration saved to: ${configPath}`);
}

// Run the script
main().catch(console.error);