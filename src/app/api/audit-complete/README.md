# Consolidated Audit API Route

## Overview

The `/api/audit-complete` route is a consolidated daily cron job that combines multiple audit tasks into a single endpoint to respect Vercel Hobby plan limits (maximum 2 cron jobs).

## Purpose

This route consolidates the following previously separate cron jobs:
- `/api/audit-links` (daily link checking)
- `/api/admin/trigger-alerts` (alert processing)
- `/api/cron/process-queue` (task queue processing)
- Automatic corrections and critical alerts

## Schedule

- **Frequency**: Daily at 2:00 AM UTC
- **Cron Expression**: `0 2 * * *`
- **Max Execution Time**: 30 seconds

## Functionality

### Phase 1: Link Audit with Optimizations
- Scans all links in the project (TypeScript, Markdown, JSON, sitemap)
- Uses intelligent caching (6-hour TTL) to avoid redundant checks
- Processes links in batches of 10 with 3 concurrent batches
- Reduced timeout per request (5s instead of 30s)
- Memory optimization with streaming and garbage collection

### Phase 2: Task Queue Processing
- Processes pending tasks by priority (critical → high → medium → low)
- Implements retry logic with exponential backoff
- Saves execution state for recovery after timeout
- Batch processing with concurrency control

### Phase 3: Automatic Corrections
- Limited to 5 corrections per execution to prevent overload
- Uses existing AutoCorrector with cache integration
- Validates corrections before applying
- Invalidates cache for corrected URLs

### Phase 4: Critical Alerts
- Detects critical broken links (CTAs, important resources)
- Groups similar alerts to prevent spam
- Sends immediate alerts via SendGrid
- Focuses on high-impact issues only

### Phase 5: Resource Monitoring
- Monitors Vercel usage (invocations, compute hours)
- Sends preventive alerts at 70%, 80%, 90% thresholds
- Tracks memory and CPU usage
- Provides usage projections and recommendations

## Configuration

```typescript
const AUDIT_CONFIG = {
  maxExecutionTime: 30000, // 30 seconds max
  batchSize: 10,           // 10 links per batch
  maxConcurrency: 3,       // 3 batches simultaneous
  requestTimeout: 5000,    // 5s per request
  maxCorrections: 5,       // Max 5 corrections per execution
  cacheTimeout: 6 * 60 * 60 * 1000, // 6 hours cache TTL
};
```

## Response Format

```typescript
interface AuditCompleteResult {
  success: boolean;
  executionTime: number;
  summary: {
    linksProcessed: number;
    tasksProcessed: number;
    correctionsApplied: number;
    alertsSent: number;
    cacheHitRate: number;
  };
  resourceUsage: {
    memoryUsed: number;
    cpuTime: number;
    vercelUsage: {
      before: UsageMetrics;
      after: UsageMetrics;
      increase: {
        invocations: number;
        computeHours: number;
      };
    };
  };
  errors: string[];
  nextExecution?: Date;
}
```

## Error Handling

- **Timeout Protection**: Execution automatically stops after 30 seconds
- **Phase Isolation**: Errors in one phase don't prevent others from executing
- **Graceful Degradation**: Partial results are returned even if some phases fail
- **Critical Alerts**: System failures trigger immediate alerts to administrators

## Optimizations

### Memory Management
- Streaming processing for large datasets
- Forced garbage collection after each batch
- Memory usage limited to 512MB per function
- Least Recently Used (LRU) cache eviction

### Performance
- Lazy loading of non-critical modules
- Database query optimization with indexes
- Reduced redundant calculations with intelligent caching
- Batch processing with backpressure management

### Resource Usage
- Intelligent caching reduces API calls by ~60%
- Batch processing reduces function invocations
- Optimized timeouts reduce compute hours
- Proactive monitoring prevents limit overruns

## Monitoring

### Metrics Tracked
- Execution time per phase
- Memory usage throughout execution
- Cache hit/miss rates
- Vercel resource consumption
- Error rates and types

### Alerts
- **Critical**: System failures, timeout exceeded
- **Warning**: High resource usage (>70% of limits)
- **Info**: Execution summaries, performance metrics

## Testing

### Unit Tests
```bash
npm test src/__tests__/api/audit-complete.test.ts
```

### Integration Tests
```bash
tsx scripts/test-audit-complete.ts
```

### Performance Tests
```bash
# Run multiple iterations to test consistency
tsx scripts/test-audit-complete.ts --iterations=5
```

## Dependencies

- `@/lib/vercel/usage-monitor` - Vercel resource monitoring
- `@/lib/audit/task-queue` - Task queue management
- `@/lib/audit/cache-strategy` - Intelligent caching
- `@/lib/audit/link-scanner` - Link discovery
- `@/lib/audit/link-validator` - Link validation
- `@/lib/audit/auto-corrector` - Automatic corrections
- `@/lib/audit/alert-manager` - Alert management

## Environment Variables

Required environment variables:
- `SENDGRID_API_KEY` - SendGrid API key for alerts
- `SENDGRID_FROM_EMAIL` - From email address
- `SENDGRID_FROM_NAME` - From name
- `ADMIN_EMAIL` - Administrator email for alerts
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service key

Optional configuration:
- `AUDIT_TIMEOUT` - Request timeout (default: 5000ms)
- `AUDIT_BATCH_SIZE` - Batch size (default: 10)
- `AUDIT_MAX_CORRECTIONS` - Max corrections (default: 5)

## Fallback Strategy

If this consolidated route fails or times out:
1. GitHub Actions fallback system activates
2. Critical alerts are sent via alternative channels
3. Essential monitoring continues via backup systems
4. Manual intervention procedures are triggered

## Migration Notes

This route replaces the following legacy endpoints:
- `/api/audit-links` → Integrated into Phase 1
- `/api/admin/trigger-alerts` → Integrated into Phase 4
- `/api/cron/process-queue` → Integrated into Phase 2

The legacy endpoints should be removed after successful migration and testing.

## Performance Targets

- **Execution Time**: < 25 seconds average (5s buffer from 30s limit)
- **Memory Usage**: < 400MB average (100MB buffer from 512MB limit)
- **Cache Hit Rate**: > 60% for link validations
- **Success Rate**: > 95% successful executions
- **Resource Usage**: < 80% of Vercel Hobby limits

## Troubleshooting

### Common Issues

1. **Timeout Errors**
   - Check if too many links are being processed
   - Verify cache is working correctly
   - Consider increasing batch processing efficiency

2. **Memory Errors**
   - Ensure garbage collection is working
   - Check for memory leaks in link processing
   - Verify cache size limits are enforced

3. **High Resource Usage**
   - Monitor Vercel usage dashboard
   - Check for inefficient queries or operations
   - Verify caching is reducing redundant work

### Debug Mode

Set `DEBUG=audit:*` environment variable for detailed logging:

```bash
DEBUG=audit:* npm run dev
```

### Health Checks

The route includes built-in health checks:
- Configuration validation
- Resource usage monitoring
- Performance metrics tracking
- Error rate monitoring

## Future Enhancements

- **Adaptive Batching**: Adjust batch sizes based on performance
- **Predictive Caching**: Pre-cache likely-to-be-requested URLs
- **Smart Scheduling**: Adjust execution time based on usage patterns
- **Advanced Monitoring**: Integration with external monitoring services