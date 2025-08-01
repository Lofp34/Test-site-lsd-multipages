/**
 * Vercel Resource Monitoring Infrastructure
 * 
 * This module provides comprehensive monitoring of Vercel resource usage
 * including real-time tracking, predictive analytics, and automated alerts.
 */

// Types
export type {
  UsageMetrics,
  UsagePrediction,
  LimitStatus,
  VercelPlan,
  AlertThreshold,
  MonitoringConfig,
  UsageRecommendation,
  VercelUsageResponse,
} from './types';

// Configuration
export {
  VERCEL_HOBBY_PLAN,
  DEFAULT_ALERT_THRESHOLDS,
  SAFE_USAGE_TARGETS,
  getMonitoringConfig,
  VERCEL_API_ENDPOINTS,
} from './config';

// Core monitoring class
export { VercelUsageMonitor } from './usage-monitor';

// API client
export { VercelApiClient } from './api-client';

// Alert integration
export { VercelAlertIntegration } from './alert-integration';

/**
 * Factory function to create a configured VercelUsageMonitor instance
 */
export function createVercelMonitor(config?: MonitoringConfig): VercelUsageMonitor {
  return new VercelUsageMonitor(config);
}

/**
 * Quick health check for Vercel monitoring setup
 */
export async function checkVercelMonitoringHealth(): Promise<{
  success: boolean;
  errors: string[];
  warnings: string[];
}> {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check environment variables
  if (!process.env.VERCEL_API_TOKEN) {
    errors.push('VERCEL_API_TOKEN environment variable is missing');
  }

  if (!process.env.VERCEL_PROJECT_ID) {
    errors.push('VERCEL_PROJECT_ID environment variable is missing');
  }

  if (!process.env.ADMIN_EMAIL) {
    warnings.push('ADMIN_EMAIL not configured - alerts will not be sent');
  }

  // Test API connection if credentials are available
  if (errors.length === 0) {
    try {
      const monitor = createVercelMonitor();
      const config = getMonitoringConfig();
      const apiClient = new VercelApiClient(config);
      
      const connectionTest = await apiClient.testConnection();
      if (!connectionTest.success) {
        errors.push(`Vercel API connection failed: ${connectionTest.error}`);
      }
    } catch (error) {
      errors.push(`Failed to test Vercel API connection: ${error.message}`);
    }
  }

  return {
    success: errors.length === 0,
    errors,
    warnings,
  };
}