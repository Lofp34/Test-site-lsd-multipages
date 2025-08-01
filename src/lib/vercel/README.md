# Vercel Resource Monitoring Infrastructure

This module provides comprehensive monitoring of Vercel resource usage to ensure the application stays within the limits of the Hobby plan while maintaining optimal performance.

## Overview

The Vercel monitoring infrastructure tracks:
- Function invocations (limit: 100k/month)
- Compute hours (limit: 100 GB-hours/month)
- Memory usage per function
- Performance trends and predictions
- Automated alerts at 70%, 80%, and 90% thresholds

## Components

### Core Classes

#### `VercelUsageMonitor`
Main monitoring class that provides:
- Real-time usage tracking
- Monthly usage predictions
- Trend analysis
- Automated alerting

```typescript
import { createVercelMonitor } from '@/lib/vercel';

const monitor = createVercelMonitor();
const usage = await monitor.getCurrentUsage();
const prediction = await monitor.predictMonthlyUsage();
```

#### `VercelApiClient`
Handles communication with Vercel API:
- Fetches usage data
- Retrieves project information
- Tests API connectivity

#### `VercelAlertIntegration`
Manages alert notifications:
- Threshold alerts (70%, 80%, 90%)
- Critical usage warnings
- Daily usage summaries
- Email notifications

### Configuration

#### Environment Variables
```bash
# Required
VERCEL_API_TOKEN=your-vercel-api-token
VERCEL_PROJECT_ID=your-project-id

# Optional
VERCEL_TEAM_ID=your-team-id
VERCEL_MONITORING_ENABLED=true
ADMIN_EMAIL=admin@example.com
```

#### Plan Configuration
The system is pre-configured for Vercel Hobby plan:
- 100k function invocations/month
- 100 GB-hours compute/month
- 2 cron jobs maximum
- 1GB memory per function

## Usage Examples

### Basic Monitoring
```typescript
import { createVercelMonitor } from '@/lib/vercel';

const monitor = createVercelMonitor();

// Get current usage
const usage = await monitor.getCurrentUsage();
console.log(`Invocations: ${usage.functionInvocations}`);
console.log(`Compute hours: ${usage.computeHours}`);

// Check if approaching limits
const limits = await monitor.checkLimits();
const exceeded = limits.filter(l => l.exceeded);
if (exceeded.length > 0) {
  console.log('⚠️ Usage limits exceeded!');
}
```

### Predictive Analytics
```typescript
// Get monthly usage prediction
const prediction = await monitor.predictMonthlyUsage();

console.log(`Risk level: ${prediction.riskLevel}`);
console.log(`Predicted invocations: ${prediction.predictedInvocations}`);
console.log(`Days remaining: ${prediction.daysRemaining}`);

// Get recommendations
prediction.recommendations.forEach(rec => {
  console.log(`${rec.priority}: ${rec.message}`);
});
```

### Alert Management
```typescript
import { VercelAlertIntegration } from '@/lib/vercel';

const alertIntegration = new VercelAlertIntegration();

// Send threshold alert
await alertIntegration.sendUsageThresholdAlert(80, usage, prediction);

// Send critical alert
if (prediction.riskLevel === 'critical') {
  await alertIntegration.sendCriticalUsageAlert(usage, prediction);
}
```

### Health Check
```typescript
import { checkVercelMonitoringHealth } from '@/lib/vercel';

const health = await checkVercelMonitoringHealth();
if (!health.success) {
  console.error('Monitoring setup issues:', health.errors);
}
```

## Integration Points

### With Existing Audit System
The Vercel monitoring integrates with the existing audit infrastructure:

```typescript
// In consolidated audit API route
import { createVercelMonitor } from '@/lib/vercel';

export async function POST() {
  const monitor = createVercelMonitor();
  
  // Check usage before running audit
  const usage = await monitor.getCurrentUsage();
  if (usage.percentageOfLimit > 90) {
    // Trigger fallback or skip non-critical tasks
    return await runMinimalAudit();
  }
  
  // Run full audit
  return await runFullAudit();
}
```

### With Alert Manager
```typescript
// Integration with existing AlertManager
import { AlertManager } from '@/lib/audit/alert-manager';
import { VercelAlertIntegration } from '@/lib/vercel';

const alertManager = new AlertManager();
const vercelAlerts = new VercelAlertIntegration();

// Custom alert handler
vercelAlerts.onAlert = async (alertData) => {
  await alertManager.sendAlert({
    type: 'vercel_usage',
    severity: alertData.severity,
    message: alertData.message,
    data: alertData.data,
  });
};
```

## Monitoring Workflow

### Automated Monitoring
1. **Real-time tracking**: Monitor usage every 15 minutes
2. **Threshold alerts**: Send alerts at 70%, 80%, 90% usage
3. **Daily summaries**: Send usage reports with trends
4. **Predictive warnings**: Alert when monthly projections exceed limits

### Manual Monitoring
```bash
# Run monitoring test
npm run test:vercel-monitoring

# Check current status
npm run vercel:status

# Generate usage report
npm run vercel:report
```

## Alert Types

### Threshold Alerts (70%, 80%, 90%)
- **Frequency**: Based on cooldown periods
- **Content**: Current usage, projections, recommendations
- **Actions**: Optimization suggestions

### Critical Alerts (>95%)
- **Frequency**: Immediate
- **Content**: Urgent warnings, immediate actions required
- **Actions**: Fallback activation, upgrade recommendations

### Daily Summaries
- **Frequency**: Daily at 9 AM
- **Content**: Usage trends, predictions, status overview
- **Actions**: Proactive optimization suggestions

## Performance Optimization

### Caching Strategy
- **Usage data**: Cached for 5 minutes
- **Predictions**: Cached for 1 hour
- **Trend analysis**: Updated every 15 minutes

### API Rate Limiting
- **Vercel API**: Max 1 request per minute
- **Batch operations**: Process multiple metrics in single call
- **Error handling**: Exponential backoff on failures

## Troubleshooting

### Common Issues

#### API Connection Failures
```bash
# Test API connectivity
npm run test:vercel-monitoring

# Check environment variables
echo $VERCEL_API_TOKEN
echo $VERCEL_PROJECT_ID
```

#### Missing Alerts
1. Check `ADMIN_EMAIL` configuration
2. Verify SendGrid integration
3. Check alert cooldown periods

#### Inaccurate Predictions
1. Ensure sufficient usage history (>5 data points)
2. Check for seasonal usage patterns
3. Verify API data accuracy

### Debug Mode
```typescript
// Enable debug logging
process.env.VERCEL_MONITORING_DEBUG = 'true';

const monitor = createVercelMonitor();
// Will log detailed information
```

## Testing

### Unit Tests
```bash
npm run test src/lib/vercel
```

### Integration Tests
```bash
npm run test:vercel-monitoring
```

### Manual Testing
```bash
# Test with mock data
npm run test:vercel-mock

# Test API integration
npm run test:vercel-api
```

## Security Considerations

### API Token Security
- Store in environment variables only
- Use read-only tokens when possible
- Rotate tokens regularly

### Data Privacy
- Usage data is not stored permanently
- Only aggregated metrics are logged
- No sensitive project data is exposed

## Future Enhancements

### Planned Features
1. **Advanced Analytics**: Machine learning predictions
2. **Cost Optimization**: Automatic function optimization
3. **Multi-Project Support**: Monitor multiple Vercel projects
4. **Custom Dashboards**: Real-time usage visualization

### Integration Roadmap
1. **GitHub Actions Fallback**: Automatic failover
2. **Slack Notifications**: Team alerts
3. **Grafana Dashboard**: Advanced monitoring
4. **Auto-scaling**: Dynamic resource management

## Support

For issues or questions:
1. Check the troubleshooting section
2. Run the health check: `npm run vercel:health`
3. Review logs in the monitoring dashboard
4. Contact the development team

---

This monitoring infrastructure ensures your Vercel application stays within plan limits while maintaining optimal performance and reliability.