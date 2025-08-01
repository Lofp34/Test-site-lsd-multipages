#!/usr/bin/env tsx

/**
 * Test script for the weekly maintenance API route
 * 
 * This script tests the /api/maintenance-weekly endpoint to ensure
 * all components work correctly together.
 */

import { config } from 'dotenv';

// Load environment variables
config();

interface MaintenanceResult {
  success: boolean;
  executionTime: number;
  summary: {
    reportsGenerated: number;
    recordsCleaned: number;
    analyticsCalculated: number;
    optimizationsApplied: number;
    diskSpaceFreed: number;
  };
  vercelUsage: {
    current: any;
    projections: any;
    recommendations: any[];
  };
  systemHealth: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
  errors: string[];
  nextExecution?: Date;
}

async function testMaintenanceWeekly() {
  console.log('🧪 Testing Weekly Maintenance API Route...\n');

  try {
    // Test the maintenance endpoint
    console.log('📡 Calling /api/maintenance-weekly...');
    const startTime = Date.now();

    const response = await fetch('http://localhost:3000/api/maintenance-weekly', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const executionTime = Date.now() - startTime;
    console.log(`⏱️ Request completed in ${executionTime}ms`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result: MaintenanceResult = await response.json();

    // Display results
    console.log('\n📊 Maintenance Results:');
    console.log('='.repeat(50));
    
    console.log(`✅ Success: ${result.success}`);
    console.log(`⏱️ Execution Time: ${result.executionTime}ms`);
    
    console.log('\n📈 Summary:');
    console.log(`  - Reports Generated: ${result.summary.reportsGenerated}`);
    console.log(`  - Records Cleaned: ${result.summary.recordsCleaned}`);
    console.log(`  - Analytics Calculated: ${result.summary.analyticsCalculated}`);
    console.log(`  - Optimizations Applied: ${result.summary.optimizationsApplied}`);
    console.log(`  - Disk Space Freed: ${(result.summary.diskSpaceFreed / 1024 / 1024).toFixed(2)}MB`);

    if (result.vercelUsage.current) {
      console.log('\n🔧 Vercel Usage:');
      console.log(`  - Function Invocations: ${result.vercelUsage.current.functionInvocations}`);
      console.log(`  - Compute Hours: ${result.vercelUsage.current.computeHours}`);
      console.log(`  - Percentage of Limit: ${result.vercelUsage.current.percentageOfLimit.toFixed(1)}%`);
    }

    if (result.vercelUsage.projections) {
      console.log('\n📊 Monthly Projections:');
      console.log(`  - Predicted Invocations: ${Math.round(result.vercelUsage.projections.predictedInvocations)}`);
      console.log(`  - Predicted Compute Hours: ${result.vercelUsage.projections.predictedComputeHours.toFixed(1)}`);
      console.log(`  - Risk Level: ${result.vercelUsage.projections.riskLevel}`);
      console.log(`  - Confidence: ${(result.vercelUsage.projections.confidence * 100).toFixed(1)}%`);
    }

    console.log('\n🏥 System Health:');
    console.log(`  - Health Score: ${result.systemHealth.score}/100`);
    
    if (result.systemHealth.issues.length > 0) {
      console.log('  - Issues:');
      result.systemHealth.issues.forEach(issue => {
        console.log(`    • ${issue}`);
      });
    }

    if (result.systemHealth.recommendations.length > 0) {
      console.log('  - Recommendations:');
      result.systemHealth.recommendations.forEach(rec => {
        console.log(`    • ${rec}`);
      });
    }

    if (result.vercelUsage.recommendations.length > 0) {
      console.log('\n💡 Vercel Recommendations:');
      result.vercelUsage.recommendations.forEach(rec => {
        console.log(`  - [${rec.priority.toUpperCase()}] ${rec.message}`);
        if (rec.action) {
          console.log(`    Action: ${rec.action}`);
        }
      });
    }

    if (result.errors.length > 0) {
      console.log('\n❌ Errors:');
      result.errors.forEach(error => {
        console.log(`  • ${error}`);
      });
    }

    if (result.nextExecution) {
      console.log(`\n⏰ Next Execution: ${new Date(result.nextExecution).toLocaleString()}`);
    }

    // Validate key requirements
    console.log('\n🔍 Validation Checks:');
    console.log('='.repeat(50));

    // Check execution time (should be under 45 seconds)
    const executionTimeOk = result.executionTime < 45000;
    console.log(`⏱️ Execution Time < 45s: ${executionTimeOk ? '✅' : '❌'} (${result.executionTime}ms)`);

    // Check that reports were generated
    const reportsOk = result.summary.reportsGenerated > 0;
    console.log(`📊 Reports Generated: ${reportsOk ? '✅' : '❌'} (${result.summary.reportsGenerated})`);

    // Check that analytics were calculated
    const analyticsOk = result.summary.analyticsCalculated > 0;
    console.log(`📈 Analytics Calculated: ${analyticsOk ? '✅' : '❌'} (${result.summary.analyticsCalculated})`);

    // Check system health score
    const healthOk = result.systemHealth.score >= 70;
    console.log(`🏥 System Health Score ≥ 70: ${healthOk ? '✅' : '❌'} (${result.systemHealth.score})`);

    // Check for critical errors
    const criticalErrorsOk = result.errors.length === 0;
    console.log(`❌ No Critical Errors: ${criticalErrorsOk ? '✅' : '❌'} (${result.errors.length} errors)`);

    // Overall success
    const overallSuccess = result.success && executionTimeOk && reportsOk && analyticsOk;
    console.log(`\n🎯 Overall Test Result: ${overallSuccess ? '✅ PASSED' : '❌ FAILED'}`);

    if (!overallSuccess) {
      process.exit(1);
    }

  } catch (error) {
    console.error('\n❌ Test Failed:');
    console.error(error instanceof Error ? error.message : String(error));
    
    if (error instanceof Error && error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }
    
    process.exit(1);
  }
}

async function testMaintenanceComponents() {
  console.log('🧪 Testing Individual Maintenance Components...\n');

  try {
    // Test OptimizedReportGenerator
    console.log('📊 Testing OptimizedReportGenerator...');
    const { OptimizedReportGenerator } = await import('../src/lib/audit/optimized-report-generator');
    const { CacheStrategy } = await import('../src/lib/audit/cache-strategy');
    const { VercelUsageMonitor } = await import('../src/lib/vercel/usage-monitor');

    const cacheStrategy = new CacheStrategy();
    const usageMonitor = new VercelUsageMonitor();
    const reportGenerator = new OptimizedReportGenerator(cacheStrategy, usageMonitor);

    console.log('✅ OptimizedReportGenerator initialized successfully');

    // Test DatabaseCleanup
    console.log('🧹 Testing DatabaseCleanup...');
    const { DatabaseCleanup } = await import('../src/lib/audit/database-cleanup');
    
    const databaseCleanup = new DatabaseCleanup({
      retentionDays: 30,
      batchSize: 100,
      maxExecutionTime: 10000,
      enableVacuum: false, // Disable for testing
      enableIndexOptimization: false, // Disable for testing
    });

    console.log('✅ DatabaseCleanup initialized successfully');

    // Test BusinessAnalytics
    console.log('📈 Testing BusinessAnalytics...');
    const { BusinessAnalytics } = await import('../src/lib/audit/business-analytics');
    
    const businessAnalytics = new BusinessAnalytics(usageMonitor);
    console.log('✅ BusinessAnalytics initialized successfully');

    console.log('\n✅ All components initialized successfully!');

  } catch (error) {
    console.error('\n❌ Component Test Failed:');
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

async function main() {
  console.log('🚀 Weekly Maintenance Test Suite');
  console.log('='.repeat(50));

  // Test individual components first
  await testMaintenanceComponents();

  console.log('\n' + '='.repeat(50));

  // Test the full API endpoint
  await testMaintenanceWeekly();

  console.log('\n🎉 All tests passed successfully!');
}

// Run the tests
if (require.main === module) {
  main().catch(error => {
    console.error('Test suite failed:', error);
    process.exit(1);
  });
}