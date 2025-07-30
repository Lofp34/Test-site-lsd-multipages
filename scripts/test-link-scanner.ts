#!/usr/bin/env tsx

import { LinkScanner } from '../src/lib/audit/link-scanner';
import { baseUrl } from '../src/lib/audit/config';

async function testLinkScanner() {
  console.log('🔍 Testing Link Scanner...\n');

  try {
    // Initialize scanner
    const scanner = new LinkScanner({
      baseUrl,
      maxDepth: 2,
      includeExternal: true,
      excludePatterns: [
        'node_modules/**',
        '.git/**',
        '.next/**',
        'dist/**',
        'build/**',
        '*.log',
        '*.tmp',
      ],
      followRedirects: true,
    });

    console.log('📋 Scanner Configuration:');
    console.log(JSON.stringify(scanner.getConfig(), null, 2));
    console.log('\n');

    // Test file type scanning
    console.log('🔍 Testing TypeScript file scanning...');
    const tsResult = await scanner.scanFileType('typescript');
    console.log(`Found ${tsResult.links.length} links in TypeScript files`);
    if (tsResult.errors.length > 0) {
      console.log(`Errors: ${tsResult.errors.length}`);
      tsResult.errors.slice(0, 3).forEach(error => console.log(`  - ${error}`));
    }
    console.log('\n');

    // Test sitemap scanning
    console.log('🗺️ Testing sitemap scanning...');
    const sitemapResult = await scanner.scanSitemap();
    console.log(`Found ${sitemapResult.links.length} links in sitemap`);
    console.log(`Discovered ${sitemapResult.pages.length} pages`);
    if (sitemapResult.errors.length > 0) {
      console.log(`Errors: ${sitemapResult.errors.length}`);
      sitemapResult.errors.forEach(error => console.log(`  - ${error}`));
    }
    console.log('\n');

    // Test full scan (limited for testing)
    console.log('🚀 Running limited full scan...');
    const fullResult = await scanner.scanAllLinks();
    
    console.log('📊 Scan Results Summary:');
    console.log(`Total Links: ${fullResult.summary.totalLinks}`);
    console.log(`Internal: ${fullResult.summary.internalLinks}`);
    console.log(`External: ${fullResult.summary.externalLinks}`);
    console.log(`Downloads: ${fullResult.summary.downloadLinks}`);
    console.log(`Anchors: ${fullResult.summary.anchorLinks}`);
    console.log(`Critical: ${fullResult.summary.criticalLinks}`);
    console.log(`High Priority: ${fullResult.summary.highPriorityLinks}`);
    console.log(`Average SEO Impact: ${fullResult.summary.averageSeoImpact.toFixed(2)}`);
    console.log(`Risk Score: ${fullResult.summary.riskScore.toFixed(2)}`);
    console.log('\n');

    if (fullResult.errors.length > 0) {
      console.log('⚠️ Errors encountered:');
      fullResult.errors.slice(0, 5).forEach(error => console.log(`  - ${error}`));
      if (fullResult.errors.length > 5) {
        console.log(`  ... and ${fullResult.errors.length - 5} more errors`);
      }
      console.log('\n');
    }

    // Show some example links by priority
    console.log('🔥 Critical Links:');
    const criticalLinks = scanner.getLinksbyPriority(fullResult, 'critical');
    criticalLinks.slice(0, 5).forEach(link => {
      const linkKey = `${link.url}|${link.sourceFile}|${link.sourceLine}`;
      const classification = fullResult.classifications.get(linkKey);
      console.log(`  - ${link.url} (${classification?.category}) from ${link.sourceFile}:${link.sourceLine}`);
    });
    console.log('\n');

    // Show statistics
    console.log('📈 Classification Statistics:');
    console.log('By Type:');
    Object.entries(fullResult.statistics.byType).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
    console.log('By Priority:');
    Object.entries(fullResult.statistics.byPriority).forEach(([priority, count]) => {
      console.log(`  ${priority}: ${count}`);
    });
    console.log('Top Categories:');
    fullResult.statistics.topCategories.forEach(({ category, count }) => {
      console.log(`  ${category}: ${count}`);
    });
    console.log('\n');

    // Test specific functionality
    console.log('🎯 High SEO Impact Links:');
    const highSeoLinks = scanner.getHighSeoImpactLinks(fullResult, 8);
    highSeoLinks.slice(0, 3).forEach(link => {
      const linkKey = `${link.url}|${link.sourceFile}|${link.sourceLine}`;
      const classification = fullResult.classifications.get(linkKey);
      console.log(`  - ${link.url} (Impact: ${classification?.seoImpact}) - ${classification?.reasoning}`);
    });

    console.log('\n✅ Link Scanner test completed successfully!');
    
    return {
      success: true,
      totalLinks: fullResult.summary.totalLinks,
      errors: fullResult.errors.length
    };

  } catch (error) {
    console.error('❌ Link Scanner test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

// Run the test
testLinkScanner()
  .then(result => {
    if (result.success) {
      console.log(`\n🎉 Test passed! Found ${result.totalLinks} links with ${result.errors} errors.`);
      process.exit(0);
    } else {
      console.error(`\n💥 Test failed: ${result.error}`);
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('💥 Unexpected error:', error);
    process.exit(1);
  });

export { testLinkScanner };