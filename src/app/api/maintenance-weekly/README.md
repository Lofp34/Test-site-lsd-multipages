# Weekly Maintenance API Route

## Overview

The `/api/maintenance-weekly` endpoint is the second of two consolidated cron jobs designed to respect Vercel Hobby plan limits. It handles all weekly maintenance tasks in a single, optimized execution.

## Schedule

- **Frequency**: Weekly (every Monday)
- **Time**: 9:00 AM
- **Max Execution Time**: 45 seconds
- **Vercel Cron Configuration**: `0 9 * * 1` (Monday at 9 AM)

## Responsibilities

### 1. Vercel Quota Verification (Phase 1)
- Monitor current usage metrics (invocations, compute hours)
- Calculate monthly projections with confidence levels
- Check usage limits and send alerts if thresholds exceeded
- Analyze usage trends (increasing/decreasing/stable)
- Generate upgrade recommendations if needed

### 2. Report Generation (Phase 2)
- Generate comprehensive weekly reports (JSON, HTML, CSV)
- Use cached data when available (7-day TTL)
- Create trend analysis for the last 30 days
- Export multiple formats for different use cases
- Optimize memory usage with garbage collection

### 3. Database Cleanup (Phase 3)
- Remove old audit logs (>30 days retention)
- Clean old validation results (keep most recent per URL)
- Clear completed tasks from task queue
- Remove fulfilled resource requests (>30 days)
- Optimize database indexes when possible

### 4. Business Analytics (Phase 4)
- Calculate weekly link health statistics
- Analyze resource request patterns and fulfillment rates
- Generate performance optimization recommendations
- Store analytics data for trend analysis
- Identify high-demand resources for prioritization

### 5. System Health Monitoring (Phase 5)
- Check system component health (memory, environment)
- Monitor database connectivity
- Verify Vercel usage health
- Send health alerts if issues detected
- Update resource usage metrics

## Configuration

```typescript
const MAINTENANCE_CONFIG = {
  maxExecutionTime: 45000,        // 45 seconds max
  cleanupRetentionDays: 30,       // Keep data for 30 days
  reportCacheTTL: 7 * 24 * 60 * 60 * 1000, // 7 days cache
  batchSize: 100,                 // Larger batches for cleanup
  maxReportSize: 10 * 1024 * 1024, // 10MB max report size
};
```

## Response Format

### Success Response (200)

```json
{
  "success": true,
  "executionTime": 32450,
  "summary": {
    "reportsGenerated": 4,
    "recordsCleaned": 1250,
    "analyticsCalculated": 3,
    "optimizationsApplied": 2,
    "diskSpaceFreed": 1280000
  },
  "vercelUsage": {
    "current": {
      "functionInvocations": 45230,
      "computeHours": 12.5,
      "percentageOfLimit": 45.2
    },
    "projections": {
      "predictedInvocations": 89000,
      "predictedComputeHours": 24.8,
      "riskLevel": "medium",
      "confidence": 0.85
    },
    "recommendations": [
      {
        "type": "optimize",
        "message": "Consider implementing more aggressive caching",
        "priority": "medium"
      }
    ]
  },
  "systemHealth": {
    "score": 92,
    "issues": [],
    "recommendations": [
      "System running optimally"
    ]
  },
  "errors": [],
  "nextExecution": "2024-01-08T09:00:00.000Z"
}
```

### Error Response (500)

```json
{
  "success": false,
  "executionTime": 15230,
  "summary": {
    "reportsGenerated": 0,
    "recordsCleaned": 0,
    "analyticsCalculated": 0,
    "optimizationsApplied": 0,
    "diskSpaceFreed": 0
  },
  "vercelUsage": {
    "current": null,
    "projections": null,
    "recommendations": []
  },
  "systemHealth": {
    "score": 0,
    "issues": ["Maintenance execution failed: Database connection timeout"],
    "recommendations": ["Check system logs and retry maintenance"]
  },
  "errors": ["Database connection timeout"]
}
```

## Integration with Other Systems

### Vercel Usage Monitor
- Monitors real-time usage metrics
- Calculates monthly projections
- Sends usage alerts when thresholds exceeded
- Provides upgrade recommendations

### Report Generator
- Generates comprehensive audit reports
- Supports multiple export formats (JSON, HTML, CSV)
- Uses intelligent caching to optimize performance
- Creates trend analysis reports

### Cache Strategy
- Caches report data for 7 days
- Reduces database load for repeated requests
- Invalidates cache when new data available
- Optimizes memory usage

### Task Queue
- Cleans completed tasks
- Maintains queue performance
- Provides cleanup statistics
- Optimizes database storage

### Alert Manager
- Sends maintenance completion alerts
- Notifies about system health issues
- Escalates critical problems
- Groups similar alerts to avoid spam

## Database Operations

### Tables Accessed
- `audit_history` - Audit execution logs
- `validation_results` - Link validation data
- `scanned_links` - Discovered links data
- `correction_results` - Applied corrections
- `resource_requests` - User resource requests
- `weekly_analytics` - Business metrics
- `task_queue` - Pending tasks

### Cleanup Operations
- Delete records older than 30 days
- Keep most recent validation result per URL
- Remove completed tasks from queue
- Clean fulfilled resource requests
- Optimize database indexes

## Performance Optimizations

### Memory Management
- Force garbage collection after report generation
- Use streaming for large data processing
- Limit report size to 10MB maximum
- Batch database operations

### Execution Time
- 45-second maximum execution time
- Phase-based execution with time checks
- Skip non-critical phases if time constrained
- Timeout protection with graceful degradation

### Caching Strategy
- 7-day TTL for report data
- Week-based cache keys
- Intelligent cache invalidation
- Memory-efficient storage

## Monitoring and Alerts

### Health Scoring
- 100-point system health score
- Deductions for errors, high usage, memory issues
- Recommendations based on score
- Trend tracking over time

### Alert Conditions
- System health score < 80
- Execution errors occurred
- High Vercel usage (>80%)
- Critical usage risk level
- Database connectivity issues

### Metrics Tracked
- Execution time and success rate
- Records cleaned and disk space freed
- Reports generated and cached
- System resource usage
- Vercel quota consumption

## Error Handling

### Graceful Degradation
- Continue execution if non-critical phases fail
- Log errors without stopping maintenance
- Send alerts about failures
- Provide detailed error information

### Recovery Mechanisms
- Retry failed operations once
- Skip problematic data and continue
- Use cached data when fresh data unavailable
- Fallback to basic operations if advanced features fail

## Usage Examples

### Manual Execution (Testing)
```bash
curl -X POST https://your-domain.com/api/maintenance-weekly \
  -H "Content-Type: application/json"
```

### Vercel Cron Configuration
```json
{
  "crons": [
    {
      "path": "/api/maintenance-weekly",
      "schedule": "0 9 * * 1"
    }
  ]
}
```

### Environment Variables Required
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SENDGRID_API_KEY=your_sendgrid_key
VERCEL_API_TOKEN=your_vercel_token
VERCEL_TEAM_ID=your_team_id
```

## Best Practices

### Resource Management
- Monitor execution time closely
- Use batch operations for database cleanup
- Implement proper error handling
- Cache expensive operations

### Data Retention
- Keep 30 days of historical data
- Archive important reports before cleanup
- Maintain referential integrity during cleanup
- Document data retention policies

### Performance Monitoring
- Track execution metrics
- Monitor memory and CPU usage
- Analyze trends over time
- Optimize based on real usage patterns

## Troubleshooting

### Common Issues
1. **Timeout Errors**: Reduce batch sizes or skip non-critical operations
2. **Memory Issues**: Implement more aggressive garbage collection
3. **Database Errors**: Check connection limits and query optimization
4. **Vercel Limits**: Monitor usage and implement fallback mechanisms

### Debug Information
- Check execution logs for detailed phase information
- Monitor system health scores over time
- Review error patterns and frequencies
- Analyze resource usage trends

## Future Enhancements

### Planned Features
- Advanced analytics dashboard
- Predictive maintenance recommendations
- Automated optimization suggestions
- Integration with external monitoring tools

### Scalability Considerations
- Support for larger datasets
- More sophisticated caching strategies
- Distributed processing capabilities
- Enhanced error recovery mechanisms