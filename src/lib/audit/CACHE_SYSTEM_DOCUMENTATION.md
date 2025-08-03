# Intelligent Cache System Documentation

## Overview

The intelligent cache system is designed to optimize the Vercel audit system by reducing redundant operations and improving performance while staying within the limits of the Vercel Hobby plan.

## Architecture

### Core Components

1. **CacheStrategy** - Main cache management with configurable TTL
2. **CacheIntegration** - Integration layer with existing audit components
3. **CacheInvalidation** - Smart invalidation and refresh mechanisms
4. **Database Persistence** - Optional persistence for cache durability

### Cache Types

| Cache Type | TTL | Purpose | Size Estimate |
|------------|-----|---------|---------------|
| Link Results | 6 hours | Validation results | ~1KB per entry |
| Sitemap Data | 24 hours | Sitemap parsing results | ~2KB per entry |
| Report Data | 7 days | Generated audit reports | ~5KB per entry |

## Configuration

### Default Configuration

```typescript
const defaultConfig: CacheConfig = {
  linkResultsTTL: 6 * 60 * 60 * 1000,      // 6 hours
  sitemapDataTTL: 24 * 60 * 60 * 1000,     // 24 hours
  reportDataTTL: 7 * 24 * 60 * 60 * 1000,  // 7 days
  maxMemoryUsage: 100,                      // 100 MB
  cleanupInterval: 30 * 60 * 1000,          // 30 minutes
};
```

### Environment Variables

```bash
# Optional: Override default TTL values
CACHE_LINK_TTL=21600000          # 6 hours in milliseconds
CACHE_SITEMAP_TTL=86400000       # 24 hours in milliseconds
CACHE_REPORT_TTL=604800000       # 7 days in milliseconds
CACHE_MAX_MEMORY=100             # Maximum memory usage in MB
CACHE_CLEANUP_INTERVAL=1800000   # Cleanup interval in milliseconds
```

## Usage Examples

### Basic Cache Operations

```typescript
import { cacheStrategy, createCacheKey } from '@/lib/audit/cache-strategy';

// Cache a link validation result
const result: ValidationResult = {
  url: 'https://example.com',
  status: 'valid',
  statusCode: 200,
  responseTime: 150,
  lastChecked: new Date(),
};

cacheStrategy.setLinkResult(result.url, result);

// Retrieve cached result
const cached = cacheStrategy.getLinkResult(result.url);
```

### Batch Operations

```typescript
// Cache multiple results
const results: ValidationResult[] = [/* ... */];
cacheStrategy.setLinkResultsBatch(results);

// Retrieve multiple results
const urls = ['https://example1.com', 'https://example2.com'];
const { cached, missing } = cacheStrategy.getLinkResultsBatch(urls);
```

### Using Cached Components

```typescript
import { cachedLinkValidator, cachedSitemapProcessor } from '@/lib/audit/cache-integration';

// Cached link validation
const result = await cachedLinkValidator.validateLink('https://example.com');

// Cached sitemap processing
const sitemapData = await cachedSitemapProcessor.processSitemap('https://example.com/sitemap.xml');
```

## Cache Invalidation

### Automatic Invalidation

The system automatically invalidates cache entries based on:

- **TTL Expiration**: Entries are automatically removed when they expire
- **Memory Pressure**: LRU eviction when memory limits are reached
- **Content Changes**: Event-driven invalidation on content updates

### Manual Invalidation

```typescript
import { cacheInvalidationManager } from '@/lib/audit/cache-invalidation';

// Invalidate specific URL
await cacheInvalidationManager.invalidateUrl('https://example.com');

// Invalidate by pattern
await cacheInvalidationManager.invalidateManually(
  ['https://example\\.com/.*'],
  ['links'],
  'Content update'
);

// Invalidate entire domain
await cacheInvalidationManager.invalidateDomain('example.com');
```

### Event-Based Invalidation

```typescript
import { invalidationUtils } from '@/lib/audit/cache-invalidation';

// On deployment
await invalidationUtils.onDeployment(['https://example.com/page1', 'https://example.com/page2']);

// On content change
await invalidationUtils.onContentChange(['src/pages/about.tsx']);

// On error recovery
await invalidationUtils.onErrorRecovery(['https://example.com/broken-link']);
```

## Performance Optimization

### Memory Management

- **Automatic Cleanup**: Expired entries are removed every 30 minutes
- **LRU Eviction**: Least recently used entries are removed when memory limit is reached
- **Memory Monitoring**: Real-time memory usage tracking

### Cache Warming

```typescript
import { cacheManager } from '@/lib/audit/cache-integration';

// Warm up critical caches
await cacheManager.warmupCaches();

// Warm specific URLs
const criticalUrls = ['https://example.com', 'https://example.com/contact'];
await cachedLinkValidator.preloadCriticalLinks(
  criticalUrls.map(url => ({ url, priority: 'critical' }))
);
```

### Performance Metrics

```typescript
// Get cache statistics
const stats = cacheStrategy.getStats();
console.log({
  totalEntries: stats.totalEntries,
  memoryUsage: `${stats.memoryUsage}MB`,
  hitRate: `${(stats.hitRate * 100).toFixed(2)}%`,
  totalHits: stats.totalHits,
  totalMisses: stats.totalMisses,
});

// Get cache health
const health = cacheManager.getCacheHealth();
console.log(`Cache status: ${health.status}`);
```

## Database Integration

### Setup

```bash
# Run database setup
npx tsx scripts/setup-cache-db.ts

# Reset database (drops and recreates tables)
npx tsx scripts/setup-cache-db.ts reset

# Get table statistics
npx tsx scripts/setup-cache-db.ts stats
```

### Persistence

```typescript
// Persist cache to database
await cacheStrategy.persistToDatabase();

// Restore cache from database
const restored = await cacheStrategy.restoreFromDatabase();
```

## Monitoring and Debugging

### Cache Statistics

```typescript
// Real-time statistics
const stats = cacheStrategy.getStats();

// Invalidation statistics
const invalidationStats = await cacheInvalidationManager.getInvalidationStats(7); // Last 7 days
```

### Health Checks

```typescript
const health = cacheManager.getCacheHealth();

switch (health.status) {
  case 'healthy':
    console.log('Cache is operating normally');
    break;
  case 'warning':
    console.log('Cache has minor issues:', health.details.issues);
    break;
  case 'critical':
    console.log('Cache needs immediate attention:', health.details.issues);
    break;
}
```

### Debugging

```typescript
// Enable debug logging
process.env.DEBUG = 'cache:*';

// Clear all caches for testing
cacheStrategy.clearAll();

// Force refresh specific URLs
await cacheInvalidationManager.forceRefresh(['https://example.com']);
```

## Integration with Vercel Optimization

### Cron Job Integration

The cache system is designed to work with the consolidated cron jobs:

#### Daily Audit (`/api/audit-complete`)

```typescript
// Use cached validator for daily audits
const validator = new CachedLinkValidator();
const results = await validator.validateBatch(urls);

// Cache results are automatically managed
// Fresh validations only for cache misses
```

#### Weekly Maintenance (`/api/maintenance-weekly`)

```typescript
// Perform cache maintenance
await cacheManager.performMaintenance();

// Generate cached reports
const report = await cachedReportGenerator.generateWeeklyReport(weekStart);
```

### Resource Usage Optimization

- **Memory Efficient**: Configurable memory limits with LRU eviction
- **CPU Efficient**: Reduces redundant HTTP requests and processing
- **Network Efficient**: Minimizes external API calls

## Best Practices

### Cache Key Design

```typescript
// Use consistent cache key patterns
const linkKey = createCacheKey.linkResult(url);
const sitemapKey = createCacheKey.sitemapData(domain);
const reportKey = createCacheKey.reportData(date, type);
```

### Error Handling

```typescript
try {
  const result = await cachedLinkValidator.validateLink(url);
} catch (error) {
  // Cache errors are handled gracefully
  // Falls back to direct validation
  console.error('Cache error:', error);
}
```

### Cache Warming Strategy

1. **Critical URLs First**: Warm cache with most important URLs
2. **Batch Operations**: Use batch operations for efficiency
3. **Background Processing**: Warm cache during low-traffic periods

### Invalidation Strategy

1. **Event-Driven**: Invalidate on content changes
2. **Time-Based**: Regular cleanup of expired entries
3. **Manual Override**: Admin controls for emergency invalidation

## Troubleshooting

### Common Issues

#### High Memory Usage

```typescript
// Check memory usage
const stats = cacheStrategy.getStats();
if (stats.memoryUsage > 80) {
  // Force cleanup
  cacheStrategy.clearExpired();
  
  // Reduce memory limit
  cacheStrategy.config.maxMemoryUsage = 50;
}
```

#### Low Hit Rate

```typescript
// Check hit rate
const stats = cacheStrategy.getStats();
if (stats.hitRate < 0.3) {
  // Increase TTL values
  // Improve cache warming
  // Check invalidation patterns
}
```

#### Database Connection Issues

```typescript
// Test database connection
try {
  await cacheStrategy.persistToDatabase();
  console.log('Database connection OK');
} catch (error) {
  console.error('Database connection failed:', error);
  // Cache will work in memory-only mode
}
```

### Performance Tuning

#### Optimize TTL Values

```typescript
// Adjust based on content change frequency
const config = {
  linkResultsTTL: 4 * 60 * 60 * 1000,  // 4 hours for frequently changing content
  sitemapDataTTL: 12 * 60 * 60 * 1000, // 12 hours for dynamic sitemaps
  reportDataTTL: 3 * 24 * 60 * 60 * 1000, // 3 days for faster report updates
};
```

#### Optimize Memory Usage

```typescript
// Reduce memory footprint
const config = {
  maxMemoryUsage: 50,           // 50MB limit
  cleanupInterval: 15 * 60 * 1000, // More frequent cleanup
};
```

## Testing

### Run Cache Tests

```bash
# Run comprehensive cache tests
npx tsx scripts/test-cache-system.ts

# Test specific components
npx tsx scripts/test-cache-system.ts --component=strategy
npx tsx scripts/test-cache-system.ts --component=integration
npx tsx scripts/test-cache-system.ts --component=invalidation
```

### Load Testing

```typescript
// Test with high load
const testUrls = Array.from({ length: 1000 }, (_, i) => `https://example.com/page-${i}`);

const startTime = Date.now();
const results = await cachedLinkValidator.validateBatch(testUrls);
const duration = Date.now() - startTime;

console.log(`Validated ${results.length} URLs in ${duration}ms`);
```

## Migration Guide

### From Existing System

1. **Install Dependencies**: No additional dependencies required
2. **Update Imports**: Replace direct validator usage with cached versions
3. **Configure TTL**: Set appropriate TTL values for your use case
4. **Setup Database**: Run database setup script for persistence
5. **Test Integration**: Run test suite to verify functionality

### Rollback Plan

```typescript
// Disable cache temporarily
const validator = new LinkValidator(); // Use original validator
const results = await validator.validateBatch(urls);

// Or clear cache and force refresh
cacheStrategy.clearAll();
await cacheInvalidationManager.forceRefresh(urls);
```

## API Reference

### CacheStrategy

- `setLinkResult(url, result)` - Cache link validation result
- `getLinkResult(url)` - Retrieve cached result
- `setLinkResultsBatch(results)` - Cache multiple results
- `getLinkResultsBatch(urls)` - Retrieve multiple results
- `clearAll()` - Clear all caches
- `clearExpired()` - Clear expired entries
- `getStats()` - Get cache statistics

### CacheInvalidationManager

- `invalidateUrl(url)` - Invalidate specific URL
- `invalidateDomain(domain)` - Invalidate entire domain
- `forceRefresh(urls)` - Force refresh URLs
- `processInvalidationEvent(event)` - Process invalidation event

### CacheManager

- `warmupCaches()` - Warm up critical caches
- `performMaintenance()` - Perform cache maintenance
- `getCacheHealth()` - Get cache health status

This cache system provides a robust, efficient, and scalable solution for optimizing the Vercel audit system while maintaining excellent performance and staying within resource limits.