#!/usr/bin/env tsx

/**
 * Simple test for Vercel monitoring imports
 */

console.log('Testing imports...');

try {
  const { VercelUsageMonitor } = await import('../src/lib/vercel/usage-monitor.js');
  console.log('✅ VercelUsageMonitor imported successfully');
  
  const { VercelApiClient } = await import('../src/lib/vercel/api-client.js');
  console.log('✅ VercelApiClient imported successfully');
  
  const { VercelAlertIntegration } = await import('../src/lib/vercel/alert-integration.js');
  console.log('✅ VercelAlertIntegration imported successfully');
  
  const { createVercelMonitor } = await import('../src/lib/vercel/index.js');
  console.log('✅ createVercelMonitor imported successfully');
  
  // Test basic functionality without API calls
  console.log('\nTesting basic functionality...');
  
  // Test with mock config
  const mockConfig = {
    apiToken: 'mock-token',
    projectId: 'mock-project',
    alertThresholds: [
      { percentage: 70, enabled: true, cooldownMinutes: 60 },
      { percentage: 80, enabled: true, cooldownMinutes: 30 },
      { percentage: 90, enabled: true, cooldownMinutes: 15 },
    ],
    plan: {
      name: 'hobby' as const,
      invocationLimit: 100000,
      computeHoursLimit: 100,
      cronJobsLimit: 2,
      memoryLimit: 1024,
    },
    monitoringInterval: 15,
  };
  
  const monitor = new VercelUsageMonitor(mockConfig);
  console.log('✅ VercelUsageMonitor instance created');
  
  // Test trend analysis with empty history
  const trend = monitor.getUsageTrend();
  console.log(`✅ Trend analysis: ${trend.trend} (confidence: ${(trend.confidence * 100).toFixed(0)}%)`);
  
  console.log('\n🎉 All imports and basic functionality working!');
  
} catch (error) {
  console.error('❌ Import or functionality error:', error.message);
  console.error(error.stack);
}