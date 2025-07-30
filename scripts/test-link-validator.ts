#!/usr/bin/env tsx

/**
 * Test script for the link validation system
 * Tests HTTP validation, local file validation, and batch processing
 */

import { LinkValidator } from '../src/lib/audit/link-validator';
import { LocalFileValidator } from '../src/lib/audit/local-file-validator';
import { BatchValidator } from '../src/lib/audit/batch-validator';
import { ScannedLink } from '../src/lib/audit/types';

async function testHttpValidation() {
  console.log('\n🌐 Testing HTTP Link Validation...');
  
  const validator = new LinkValidator();
  
  const testUrls = [
    'https://google.com', // Should be valid
    'https://httpstat.us/404', // Should be broken
    'https://httpstat.us/301', // Should be redirect
    'https://nonexistent-domain-12345.com', // Should be broken
    'https://httpstat.us/timeout', // Should timeout
  ];

  for (const url of testUrls) {
    try {
      console.log(`Testing: ${url}`);
      const result = await validator.validateLink(url);
      console.log(`  Status: ${result.status}`);
      console.log(`  Response time: ${result.responseTime}ms`);
      if (result.error) console.log(`  Error: ${result.error}`);
      if (result.redirectUrl) console.log(`  Redirect: ${result.redirectUrl}`);
      console.log('');
    } catch (error) {
      console.error(`  Failed: ${error}`);
    }
  }
}

async function testLocalFileValidation() {
  console.log('\n📁 Testing Local File Validation...');
  
  const validator = new LocalFileValidator();
  
  const testLinks: ScannedLink[] = [
    {
      url: '/favicon.ico',
      sourceFile: 'test',
      sourceLine: 1,
      linkType: 'download',
      context: 'test',
      priority: 'medium',
    },
    {
      url: '/nonexistent-file.pdf',
      sourceFile: 'test',
      sourceLine: 1,
      linkType: 'download',
      context: 'test',
      priority: 'medium',
    },
    {
      url: '/',
      sourceFile: 'test',
      sourceLine: 1,
      linkType: 'internal',
      context: 'test',
      priority: 'high',
    },
    {
      url: '/nonexistent-route',
      sourceFile: 'test',
      sourceLine: 1,
      linkType: 'internal',
      context: 'test',
      priority: 'medium',
    },
    {
      url: '/#hero-section',
      sourceFile: 'test',
      sourceLine: 1,
      linkType: 'anchor',
      context: 'test',
      priority: 'low',
    },
  ];

  for (const link of testLinks) {
    try {
      console.log(`Testing: ${link.url} (${link.linkType})`);
      const result = await validator.validateLocalLink(link);
      console.log(`  Status: ${result.status}`);
      console.log(`  Response time: ${result.responseTime}ms`);
      if (result.error) console.log(`  Error: ${result.error}`);
      console.log('');
    } catch (error) {
      console.error(`  Failed: ${error}`);
    }
  }
}

async function testBatchValidation() {
  console.log('\n📦 Testing Batch Validation...');
  
  const batchValidator = new BatchValidator();
  
  const testLinks: ScannedLink[] = [
    // External links
    {
      url: 'https://google.com',
      sourceFile: 'test',
      sourceLine: 1,
      linkType: 'external',
      context: 'test',
      priority: 'critical',
    },
    {
      url: 'https://httpstat.us/404',
      sourceFile: 'test',
      sourceLine: 2,
      linkType: 'external',
      context: 'test',
      priority: 'high',
    },
    // Local links
    {
      url: '/',
      sourceFile: 'test',
      sourceLine: 3,
      linkType: 'internal',
      context: 'test',
      priority: 'critical',
    },
    {
      url: '/favicon.ico',
      sourceFile: 'test',
      sourceLine: 4,
      linkType: 'download',
      context: 'test',
      priority: 'medium',
    },
    {
      url: '/nonexistent-file.pdf',
      sourceFile: 'test',
      sourceLine: 5,
      linkType: 'download',
      context: 'test',
      priority: 'low',
    },
  ];

  try {
    console.log(`Testing batch validation of ${testLinks.length} links...`);
    const results = await batchValidator.validateBatch(testLinks);
    
    console.log('\nResults:');
    for (const result of results) {
      console.log(`  ${result.url}: ${result.status}`);
      if (result.error) console.log(`    Error: ${result.error}`);
    }
    
    const summary = batchValidator.getValidationSummary(results);
    console.log('\nSummary:');
    console.log(`  Total: ${summary.total}`);
    console.log(`  Valid: ${summary.valid}`);
    console.log(`  Broken: ${summary.broken}`);
    console.log(`  Redirects: ${summary.redirects}`);
    console.log(`  Timeouts: ${summary.timeouts}`);
    console.log(`  Health Score: ${summary.healthScore}%`);
    
    const stats = batchValidator.getStats();
    console.log('\nProcessing Stats:');
    console.log(`  Total Processed: ${stats.totalProcessed}`);
    console.log(`  Cache Hits: ${stats.cacheHits}`);
    console.log(`  Valid Links: ${stats.validLinks}`);
    console.log(`  Broken Links: ${stats.brokenLinks}`);
    
    const cacheStats = batchValidator.getCacheStats();
    console.log('\nCache Stats:');
    console.log(`  Batch Cache: ${cacheStats.batchCache}`);
    console.log(`  HTTP Cache: ${cacheStats.httpCache}`);
    console.log(`  Local Cache: ${cacheStats.localCache}`);
    console.log(`  Hit Rate: ${cacheStats.hitRate.toFixed(2)}%`);
    
  } catch (error) {
    console.error('Batch validation failed:', error);
  }
}

async function testPriorityValidation() {
  console.log('\n⚡ Testing Priority-Based Validation...');
  
  const batchValidator = new BatchValidator();
  
  const testLinks: ScannedLink[] = [
    {
      url: 'https://google.com',
      sourceFile: 'test',
      sourceLine: 1,
      linkType: 'external',
      context: 'test',
      priority: 'low',
    },
    {
      url: 'https://httpstat.us/404',
      sourceFile: 'test',
      sourceLine: 2,
      linkType: 'external',
      context: 'test',
      priority: 'critical',
    },
    {
      url: '/',
      sourceFile: 'test',
      sourceLine: 3,
      linkType: 'internal',
      context: 'test',
      priority: 'high',
    },
    {
      url: '/favicon.ico',
      sourceFile: 'test',
      sourceLine: 4,
      linkType: 'download',
      context: 'test',
      priority: 'medium',
    },
  ];

  try {
    console.log('Testing priority-based validation...');
    const results = await batchValidator.validateWithPriority(testLinks);
    
    console.log('\nResults (processed by priority):');
    for (const result of results) {
      const link = testLinks.find(l => l.url === result.url);
      console.log(`  ${result.url} (${link?.priority}): ${result.status}`);
    }
    
  } catch (error) {
    console.error('Priority validation failed:', error);
  }
}

async function testRetryLogic() {
  console.log('\n🔄 Testing Retry Logic...');
  
  const validator = new LinkValidator({
    retryAttempts: 2,
    timeout: 5000,
  });
  
  // Test with a URL that might be flaky
  const testUrl = 'https://httpstat.us/500';
  
  try {
    console.log(`Testing retry logic with: ${testUrl}`);
    const startTime = Date.now();
    const result = await validator.validateLink(testUrl);
    const totalTime = Date.now() - startTime;
    
    console.log(`  Status: ${result.status}`);
    console.log(`  Total time: ${totalTime}ms`);
    console.log(`  Response time: ${result.responseTime}ms`);
    if (result.error) console.log(`  Error: ${result.error}`);
    
  } catch (error) {
    console.error('Retry test failed:', error);
  }
}

async function testSuggestions() {
  console.log('\n💡 Testing Suggestions for Broken Links...');
  
  const localValidator = new LocalFileValidator();
  
  const brokenLinks = [
    '/ressources/guide-prospection.pdf', // Might suggest similar files
    '/about-us', // Might suggest /a-propos
    '/contact-form', // Might suggest /contact
  ];

  for (const url of brokenLinks) {
    try {
      console.log(`Getting suggestions for: ${url}`);
      const suggestions = await localValidator.getSuggestionsForBrokenLink(url);
      
      if (suggestions.length > 0) {
        console.log('  Suggestions:');
        suggestions.forEach(suggestion => console.log(`    - ${suggestion}`));
      } else {
        console.log('  No suggestions found');
      }
      console.log('');
    } catch (error) {
      console.error(`  Failed to get suggestions: ${error}`);
    }
  }
}

async function main() {
  console.log('🔍 Link Validator Test Suite');
  console.log('============================');
  
  try {
    await testHttpValidation();
    await testLocalFileValidation();
    await testBatchValidation();
    await testPriorityValidation();
    await testRetryLogic();
    await testSuggestions();
    
    console.log('\n✅ All tests completed!');
    
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

// Run tests if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { main as runValidatorTests };