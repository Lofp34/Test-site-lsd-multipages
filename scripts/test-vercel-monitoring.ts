#!/usr/bin/env tsx

/**
 * Test script for Vercel resource monitoring infrastructure
 */

// Dynamic imports to avoid module loading issues

async function testVercelMonitoring() {
  console.log('🔍 Testing Vercel Resource Monitoring Infrastructure...\n');

  // Dynamic imports
  const { 
    createVercelMonitor, 
    checkVercelMonitoringHealth,
    VercelApiClient,
    VercelAlertIntegration,
    getMonitoringConfig
  } = await import('../src/lib/vercel/index.js');

  // Test 1: Health check
  console.log('1. Running health check...');
  try {
    const health = await checkVercelMonitoringHealth();
    
    if (health.success) {
      console.log('✅ Health check passed');
    } else {
      console.log('❌ Health check failed');
      health.errors.forEach(error => console.log(`   Error: ${error}`));
    }
    
    if (health.warnings.length > 0) {
      health.warnings.forEach(warning => console.log(`   Warning: ${warning}`));
    }
  } catch (error) {
    console.log(`❌ Health check error: ${error.message}`);
  }

  console.log();

  // Test 2: Configuration loading
  console.log('2. Testing configuration loading...');
  try {
    const config = getMonitoringConfig();
    console.log('✅ Configuration loaded successfully');
    console.log(`   Plan: ${config.plan.name}`);
    console.log(`   Invocation limit: ${config.plan.invocationLimit.toLocaleString()}`);
    console.log(`   Compute hours limit: ${config.plan.computeHoursLimit} GB-hours`);
    console.log(`   Alert thresholds: ${config.alertThresholds.map(t => t.percentage + '%').join(', ')}`);
  } catch (error) {
    console.log(`❌ Configuration error: ${error.message}`);
  }

  console.log();

  // Test 3: Monitor creation
  console.log('3. Testing monitor creation...');
  try {
    // Import VercelUsageMonitor directly
    const { VercelUsageMonitor } = await import('../src/lib/vercel/usage-monitor.js');
    
    // Create with mock config to avoid environment variable requirement
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
    console.log('✅ VercelUsageMonitor created successfully');
    
    // Test trend analysis with empty history
    const trend = monitor.getUsageTrend();
    console.log(`   Initial trend: ${trend.trend} (confidence: ${(trend.confidence * 100).toFixed(0)}%)`);
  } catch (error) {
    console.log(`❌ Monitor creation error: ${error.message}`);
  }

  console.log();

  // Test 4: API client (if credentials available)
  console.log('4. Testing API client...');
  if (process.env.VERCEL_API_TOKEN && process.env.VERCEL_PROJECT_ID) {
    try {
      const config = getMonitoringConfig();
      const apiClient = new VercelApiClient(config);
      
      const connectionTest = await apiClient.testConnection();
      if (connectionTest.success) {
        console.log('✅ API connection successful');
        
        // Try to fetch actual usage
        try {
          const usage = await apiClient.fetchUsage();
          console.log('✅ Usage data fetched successfully');
          console.log(`   Invocations: ${usage.usage.invocations || 0}`);
          console.log(`   Compute hours: ${usage.usage.computeHours || 0}`);
        } catch (error) {
          console.log(`⚠️  Could not fetch usage data: ${error.message}`);
        }
      } else {
        console.log(`❌ API connection failed: ${connectionTest.error}`);
      }
    } catch (error) {
      console.log(`❌ API client error: ${error.message}`);
    }
  } else {
    console.log('⚠️  Skipping API test - credentials not configured');
    console.log('   Set VERCEL_API_TOKEN and VERCEL_PROJECT_ID to test API integration');
  }

  console.log();

  // Test 5: Alert integration
  console.log('5. Testing alert integration...');
  try {
    const alertIntegration = new VercelAlertIntegration();
    
    // Create mock data for testing
    const mockUsage = {
      functionInvocations: 75000,
      computeHours: 65,
      percentageOfLimit: 75,
      projectedMonthly: 95000,
      timestamp: new Date(),
    };

    const mockPrediction = {
      predictedInvocations: 95000,
      predictedComputeHours: 82,
      confidence: 0.8,
      daysRemaining: 10,
      riskLevel: 'high' as const,
      recommendations: [
        {
          type: 'optimize' as const,
          message: 'Consider implementing caching to reduce function calls',
          priority: 'high' as const,
          action: 'Implement Redis caching for frequently accessed data',
        },
      ],
    };

    // Test threshold alert (this will log to console)
    await alertIntegration.sendUsageThresholdAlert(75, mockUsage, mockPrediction);
    console.log('✅ Threshold alert test completed (check console output above)');

  } catch (error) {
    console.log(`❌ Alert integration error: ${error.message}`);
  }

  console.log();

  // Test 6: Full monitoring workflow (if credentials available)
  console.log('6. Testing full monitoring workflow...');
  if (process.env.VERCEL_API_TOKEN && process.env.VERCEL_PROJECT_ID) {
    try {
      const monitor = createVercelMonitor();
      
      console.log('   Fetching current usage...');
      const currentUsage = await monitor.getCurrentUsage();
      console.log(`   ✅ Current usage: ${currentUsage.functionInvocations} invocations, ${currentUsage.computeHours.toFixed(2)} GB-hours`);
      
      console.log('   Generating prediction...');
      const prediction = await monitor.predictMonthlyUsage();
      console.log(`   ✅ Prediction: ${prediction.predictedInvocations.toLocaleString()} invocations (${prediction.riskLevel} risk)`);
      
      console.log('   Checking limits...');
      const limitStatuses = await monitor.checkLimits();
      const exceededLimits = limitStatuses.filter(status => status.exceeded);
      if (exceededLimits.length > 0) {
        console.log(`   ⚠️  ${exceededLimits.length} limit(s) exceeded`);
      } else {
        console.log('   ✅ All limits within thresholds');
      }
      
    } catch (error) {
      console.log(`❌ Full workflow error: ${error.message}`);
    }
  } else {
    console.log('⚠️  Skipping full workflow test - credentials not configured');
  }

  console.log();
  console.log('🎉 Vercel monitoring infrastructure test completed!');
  console.log();
  console.log('📋 Next steps:');
  console.log('   1. Configure VERCEL_API_TOKEN and VERCEL_PROJECT_ID in .env');
  console.log('   2. Set up ADMIN_EMAIL for alert notifications');
  console.log('   3. Integrate with existing audit system alert manager');
  console.log('   4. Set up automated monitoring cron jobs');
}

// Run the test
if (import.meta.url === `file://${process.argv[1]}`) {
  testVercelMonitoring().catch(console.error);
}

export { testVercelMonitoring };