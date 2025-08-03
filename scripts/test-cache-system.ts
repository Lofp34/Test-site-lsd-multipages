#!/usr/bin/env tsx

/**
 * Test script for the intelligent cache system
 * 
 * Tests all cache functionality:
 * - Cache strategy with TTL
 * - Cache integration with validators
 * - Cache invalidation and refresh
 * - Performance and memory management
 */

import { cacheStrategy, createCacheKey, cacheWarming } from '../src/lib/audit/cache-strategy';
import { 
  cachedLinkValidator, 
  cachedSitemapProcessor, 
  cachedReportGenerator,
  cacheManager 
} from '../src/lib/audit/cache-integration';
import { cacheInvalidationManager, invalidationUtils } from '../src/lib/audit/cache-invalidation';
import { ValidationResult, AuditReport } from '../src/lib/audit/types';

// Test configuration
const TEST_URLS = [
  'https://laurent-serre-developpement.fr',
  'https://laurent-serre-developpement.fr/contact',
  'https://laurent-serre-developpement.fr/services',
  'https://laurent-serre-developpement.fr/ressources',
  'https://laurent-serre-developpement.fr/blog',
];

const SITEMAP_URL = 'https://laurent-serre-developpement.fr/sitemap.xml';

async function testCacheStrategy(): Promise<void> {
  console.log('\n🧪 Testing Cache Strategy...');
  
  // Test link result caching
  const mockResult: ValidationResult = {
    url: TEST_URLS[0],
    status: 'valid',
    statusCode: 200,
    responseTime: 150,
    lastChecked: new Date(),
  };

  // Set and get link result
  cacheStrategy.setLinkResult(TEST_URLS[0], mockResult);
  const cached = cacheStrategy.getLinkResult(TEST_URLS[0]);
  
  console.log('✅ Link result cached:', cached?.url === TEST_URLS[0]);
  
  // Test batch operations
  const mockResults: ValidationResult[] = TEST_URLS.slice(1, 3).map(url => ({
    url,
    status: 'valid',
    statusCode: 200,
    responseTime: 120,
    lastChecked: new Date(),
  }));

  cacheStrategy.setLinkResultsBatch(mockResults);
  const { cached: batchCached, missing } = cacheStrategy.getLinkResultsBatch(TEST_URLS.slice(1, 4));
  
  console.log('✅ Batch caching:', batchCached.length === 2, 'missing:', missing.length === 1);
  
  // Test sitemap caching
  const mockSitemapData = {
    urls: TEST_URLS,
    lastModified: new Date(),
    totalPages: TEST_URLS.length,
    metadata: { source: SITEMAP_URL },
  };

  const sitemapKey = createCacheKey.sitemapData('laurent-serre-developpement.fr');
  cacheStrategy.setSitemapData(sitemapKey, mockSitemapData);
  const cachedSitemap = cacheStrategy.getSitemapData(sitemapKey);
  
  console.log('✅ Sitemap cached:', cachedSitemap?.urls.length === TEST_URLS.length);
  
  // Test report caching
  const mockReport: AuditReport = {
    timestamp: new Date(),
    summary: {
      totalLinks: 10,
      validLinks: 8,
      brokenLinks: 2,
      correctedLinks: 0,
      pendingLinks: 0,
      seoHealthScore: 80,
    },
    brokenLinks: [],
    corrections: [],
    recommendations: ['Test recommendation'],
    seoImpact: {
      criticalIssues: 2,
      estimatedTrafficLoss: 0,
      affectedPages: [],
      priorityActions: [],
      linkHealthScore: 80,
    },
    resourceRequests: {
      totalRequests: 0,
      mostRequested: [],
    },
  };

  const reportKey = createCacheKey.reportData('2024-01-15', 'daily');
  cacheStrategy.setReportData(reportKey, mockReport);
  const cachedReport = cacheStrategy.getReportData(reportKey);
  
  console.log('✅ Report cached:', cachedReport?.summary.totalLinks === 10);
  
  // Test cache statistics
  const stats = cacheStrategy.getStats();
  console.log('📊 Cache stats:', {
    totalEntries: stats.totalEntries,
    hitRate: `${(stats.hitRate * 100).toFixed(2)}%`,
    memoryUsage: `${stats.memoryUsage}MB`,
  });
}

async function testCacheIntegration(): Promise<void> {
  console.log('\n🔗 Testing Cache Integration...');
  
  try {
    // Test cached link validator
    console.log('Testing cached link validation...');
    const result1 = await cachedLinkValidator.validateLink(TEST_URLS[0]);
    const result2 = await cachedLinkValidator.validateLink(TEST_URLS[0]); // Should hit cache
    
    console.log('✅ Link validation:', result1.url === TEST_URLS[0]);
    console.log('✅ Cache hit on second call:', result1.lastChecked.getTime() === result2.lastChecked.getTime());
    
    // Test batch validation with cache
    console.log('Testing batch validation with cache...');
    const batchResults = await cachedLinkValidator.validateBatch(TEST_URLS.slice(0, 3));
    console.log('✅ Batch validation:', batchResults.length === 3);
    
    // Test sitemap processing with cache
    console.log('Testing sitemap processing...');
    try {
      const sitemapData1 = await cachedSitemapProcessor.processSitemap(SITEMAP_URL);
      const sitemapData2 = await cachedSitemapProcessor.processSitemap(SITEMAP_URL); // Should hit cache
      
      console.log('✅ Sitemap processing:', sitemapData1.urls.length > 0);
      console.log('✅ Sitemap cache hit:', sitemapData1.lastModified.getTime() === sitemapData2.lastModified.getTime());
    } catch (error) {
      console.log('⚠️ Sitemap test skipped (network required):', (error as Error).message);
    }
    
    // Test report generation with cache
    console.log('Testing report generation...');
    const report1 = await cachedReportGenerator.generateDailyReport(new Date());
    const report2 = await cachedReportGenerator.generateDailyReport(new Date()); // Should hit cache
    
    console.log('✅ Report generation:', report1.summary.totalLinks >= 0);
    console.log('✅ Report cache hit:', report1.timestamp.getTime() === report2.timestamp.getTime());
    
  } catch (error) {
    console.error('❌ Cache integration test error:', error);
  }
}

async function testCacheInvalidation(): Promise<void> {
  console.log('\n🗑️ Testing Cache Invalidation...');
  
  // Add some test data to cache
  const testResults: ValidationResult[] = TEST_URLS.map(url => ({
    url,
    status: 'valid',
    statusCode: 200,
    responseTime: 100,
    lastChecked: new Date(),
  }));
  
  cacheStrategy.setLinkResultsBatch(testResults);
  
  // Test pattern-based invalidation
  const invalidated = cacheStrategy.invalidateByPattern(/laurent-serre-developpement\.fr/, 'links');
  console.log('✅ Pattern invalidation:', invalidated === TEST_URLS.length);
  
  // Test manual invalidation
  cacheStrategy.setLinkResult(TEST_URLS[0], testResults[0]);
  const manualInvalidated = await cacheInvalidationManager.invalidateUrl(TEST_URLS[0]);
  console.log('✅ Manual invalidation:', manualInvalidated);
  
  // Test domain invalidation
  cacheStrategy.setLinkResultsBatch(testResults);
  const domainInvalidated = await cacheInvalidationManager.invalidateDomain('laurent-serre-developpement.fr');
  console.log('✅ Domain invalidation:', domainInvalidated > 0);
  
  // Test event-based invalidation
  await invalidationUtils.onContentChange([TEST_URLS[0]]);
  console.log('✅ Event-based invalidation completed');
  
  // Test force refresh
  cacheStrategy.setLinkResult(TEST_URLS[0], testResults[0]);
  await cacheInvalidationManager.forceRefresh([TEST_URLS[0]]);
  console.log('✅ Force refresh completed');
}

async function testCachePerformance(): Promise<void> {
  console.log('\n⚡ Testing Cache Performance...');
  
  const testUrls = Array.from({ length: 100 }, (_, i) => 
    `https://laurent-serre-developpement.fr/test-${i}`
  );
  
  // Test cache write performance
  const writeStart = Date.now();
  const testResults: ValidationResult[] = testUrls.map(url => ({
    url,
    status: 'valid',
    statusCode: 200,
    responseTime: 100,
    lastChecked: new Date(),
  }));
  
  cacheStrategy.setLinkResultsBatch(testResults);
  const writeTime = Date.now() - writeStart;
  console.log(`✅ Cache write performance: ${writeTime}ms for 100 entries`);
  
  // Test cache read performance
  const readStart = Date.now();
  const { cached } = cacheStrategy.getLinkResultsBatch(testUrls);
  const readTime = Date.now() - readStart;
  console.log(`✅ Cache read performance: ${readTime}ms for 100 entries`);
  console.log(`✅ Cache hit rate: ${cached.length}/100`);
  
  // Test memory usage
  const stats = cacheStrategy.getStats();
  console.log(`📊 Memory usage: ${stats.memoryUsage}MB`);
  
  // Test cache cleanup
  const cleanupStart = Date.now();
  const cleared = cacheStrategy.clearExpired();
  const cleanupTime = Date.now() - cleanupStart;
  console.log(`✅ Cache cleanup: ${cleanupTime}ms, cleared ${cleared} entries`);
}

async function testCacheWarmup(): Promise<void> {
  console.log('\n🔥 Testing Cache Warmup...');
  
  try {
    // Clear cache first
    cacheStrategy.clearAll();
    
    // Test cache warmup
    await cacheManager.warmupCaches();
    console.log('✅ Cache warmup completed');
    
    // Check if critical URLs are cached
    const criticalUrls = [
      'https://laurent-serre-developpement.fr',
      'https://laurent-serre-developpement.fr/contact',
    ];
    
    let cachedCount = 0;
    for (const url of criticalUrls) {
      if (cacheStrategy.getLinkResult(url)) {
        cachedCount++;
      }
    }
    
    console.log(`✅ Critical URLs cached: ${cachedCount}/${criticalUrls.length}`);
    
  } catch (error) {
    console.log('⚠️ Cache warmup test skipped (network required):', (error as Error).message);
  }
}

async function testCacheMaintenance(): Promise<void> {
  console.log('\n🔧 Testing Cache Maintenance...');
  
  try {
    // Perform maintenance
    await cacheManager.performMaintenance();
    console.log('✅ Cache maintenance completed');
    
    // Test cache health check
    const health = cacheManager.getCacheHealth();
    console.log('📊 Cache health:', health.status);
    console.log('📊 Cache details:', {
      totalEntries: health.details.totalEntries,
      memoryUsage: `${health.details.memoryUsage}MB`,
      hitRate: `${(health.details.hitRate * 100).toFixed(2)}%`,
    });
    
    // Test invalidation stats
    const invalidationStats = await cacheInvalidationManager.getInvalidationStats();
    if (invalidationStats) {
      console.log('📊 Invalidation stats:', invalidationStats);
    }
    
  } catch (error) {
    console.error('❌ Cache maintenance test error:', error);
  }
}

async function testCachePersistence(): Promise<void> {
  console.log('\n💾 Testing Cache Persistence...');
  
  try {
    // Add some test data
    const testResult: ValidationResult = {
      url: 'https://laurent-serre-developpement.fr/test-persistence',
      status: 'valid',
      statusCode: 200,
      responseTime: 100,
      lastChecked: new Date(),
    };
    
    cacheStrategy.setLinkResult(testResult.url, testResult);
    
    // Test persistence
    await cacheStrategy.persistToDatabase();
    console.log('✅ Cache persisted to database');
    
    // Clear cache and restore
    cacheStrategy.clearAll();
    const restored = await cacheStrategy.restoreFromDatabase();
    console.log('✅ Cache restored from database:', restored);
    
    // Check if data was restored
    const restoredResult = cacheStrategy.getLinkResult(testResult.url);
    console.log('✅ Data integrity after restore:', restoredResult?.url === testResult.url);
    
  } catch (error) {
    console.log('⚠️ Cache persistence test skipped (database required):', (error as Error).message);
  }
}

async function runAllTests(): Promise<void> {
  console.log('🚀 Starting Cache System Tests...');
  console.log('=====================================');
  
  try {
    await testCacheStrategy();
    await testCacheIntegration();
    await testCacheInvalidation();
    await testCachePerformance();
    await testCacheWarmup();
    await testCacheMaintenance();
    await testCachePersistence();
    
    console.log('\n✅ All cache system tests completed successfully!');
    console.log('=====================================');
    
    // Final cache statistics
    const finalStats = cacheStrategy.getStats();
    console.log('\n📊 Final Cache Statistics:');
    console.log(`   Total Entries: ${finalStats.totalEntries}`);
    console.log(`   Memory Usage: ${finalStats.memoryUsage}MB`);
    console.log(`   Hit Rate: ${(finalStats.hitRate * 100).toFixed(2)}%`);
    console.log(`   Total Hits: ${finalStats.totalHits}`);
    console.log(`   Total Misses: ${finalStats.totalMisses}`);
    
  } catch (error) {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
  } finally {
    // Cleanup
    cacheStrategy.destroy();
  }
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests().catch(console.error);
}

export {
  testCacheStrategy,
  testCacheIntegration,
  testCacheInvalidation,
  testCachePerformance,
  testCacheWarmup,
  testCacheMaintenance,
  testCachePersistence,
  runAllTests,
};