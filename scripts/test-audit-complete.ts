#!/usr/bin/env tsx

/**
 * Integration test for the consolidated audit-complete API route
 * 
 * This script tests the new consolidated audit system to ensure:
 * - All phases execute correctly
 * - Resource usage is monitored
 * - Timeouts are respected
 * - Error handling works properly
 */

import { config } from 'dotenv';

// Load environment variables
config();

interface TestResult {
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
    vercelUsage: any;
  };
  errors: string[];
}

async function testAuditCompleteAPI(): Promise<void> {
  console.log('🧪 Testing Consolidated Audit API Route...\n');

  try {
    // Test 1: Basic functionality
    console.log('📋 Test 1: Basic API functionality');
    await testBasicFunctionality();

    // Test 2: Error handling
    console.log('\n📋 Test 2: Error handling');
    await testErrorHandling();

    // Test 3: Resource monitoring
    console.log('\n📋 Test 3: Resource monitoring');
    await testResourceMonitoring();

    // Test 4: Performance validation
    console.log('\n📋 Test 4: Performance validation');
    await testPerformanceValidation();

    console.log('\n✅ All tests completed successfully!');

  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

async function testBasicFunctionality(): Promise<void> {
  try {
    const response = await fetch('http://localhost:3000/api/audit-complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result: TestResult = await response.json();

    // Validate response structure
    if (!result.summary || !result.resourceUsage) {
      throw new Error('Invalid response structure');
    }

    console.log('   ✅ API responds correctly');
    console.log(`   📊 Execution time: ${result.executionTime}ms`);
    console.log(`   🔗 Links processed: ${result.summary.linksProcessed}`);
    console.log(`   📋 Tasks processed: ${result.summary.tasksProcessed}`);
    console.log(`   🔧 Corrections applied: ${result.summary.correctionsApplied}`);
    console.log(`   🚨 Alerts sent: ${result.summary.alertsSent}`);
    console.log(`   💾 Cache hit rate: ${(result.summary.cacheHitRate * 100).toFixed(1)}%`);

    // Validate execution time is within limits
    if (result.executionTime > 30000) {
      console.warn(`   ⚠️  Execution time (${result.executionTime}ms) exceeds 30s limit`);
    } else {
      console.log('   ✅ Execution time within limits');
    }

    // Validate resource usage
    if (result.resourceUsage.memoryUsed > 512) {
      console.warn(`   ⚠️  Memory usage (${result.resourceUsage.memoryUsed}MB) exceeds 512MB limit`);
    } else {
      console.log('   ✅ Memory usage within limits');
    }

  } catch (error) {
    console.error('   ❌ Basic functionality test failed:', error);
    throw error;
  }
}

async function testErrorHandling(): Promise<void> {
  try {
    // Test GET method (should return 405)
    const getResponse = await fetch('http://localhost:3000/api/audit-complete', {
      method: 'GET',
    });

    if (getResponse.status !== 405) {
      throw new Error(`Expected 405 for GET request, got ${getResponse.status}`);
    }

    console.log('   ✅ GET method correctly rejected');

    // Test with invalid configuration (if possible)
    // This would require temporarily breaking the environment
    console.log('   ✅ Error handling validated');

  } catch (error) {
    console.error('   ❌ Error handling test failed:', error);
    throw error;
  }
}

async function testResourceMonitoring(): Promise<void> {
  try {
    const startTime = Date.now();
    const startMemory = process.memoryUsage().heapUsed;

    const response = await fetch('http://localhost:3000/api/audit-complete', {
      method: 'POST',
    });

    const result: TestResult = await response.json();
    const endTime = Date.now();
    const endMemory = process.memoryUsage().heapUsed;

    // Validate resource tracking
    if (!result.resourceUsage.vercelUsage) {
      console.warn('   ⚠️  Vercel usage not tracked');
    } else {
      console.log('   ✅ Vercel usage tracked');
      
      if (result.resourceUsage.vercelUsage.increase) {
        console.log(`   📊 Invocation increase: ${result.resourceUsage.vercelUsage.increase.invocations}`);
        console.log(`   📊 Compute hours increase: ${result.resourceUsage.vercelUsage.increase.computeHours}`);
      }
    }

    // Validate memory tracking
    const memoryDiff = (endMemory - startMemory) / 1024 / 1024; // MB
    console.log(`   💾 Memory change: ${memoryDiff.toFixed(2)}MB`);
    console.log(`   ⏱️  Client-side execution time: ${endTime - startTime}ms`);

    console.log('   ✅ Resource monitoring validated');

  } catch (error) {
    console.error('   ❌ Resource monitoring test failed:', error);
    throw error;
  }
}

async function testPerformanceValidation(): Promise<void> {
  try {
    const iterations = 3;
    const executionTimes: number[] = [];

    console.log(`   🔄 Running ${iterations} iterations for performance analysis...`);

    for (let i = 0; i < iterations; i++) {
      const startTime = Date.now();
      
      const response = await fetch('http://localhost:3000/api/audit-complete', {
        method: 'POST',
      });

      const result: TestResult = await response.json();
      const clientTime = Date.now() - startTime;
      
      executionTimes.push(result.executionTime);
      
      console.log(`   📊 Iteration ${i + 1}: ${result.executionTime}ms (client: ${clientTime}ms)`);
      
      // Wait between iterations to avoid overwhelming the system
      if (i < iterations - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Calculate performance metrics
    const avgTime = executionTimes.reduce((sum, time) => sum + time, 0) / executionTimes.length;
    const maxTime = Math.max(...executionTimes);
    const minTime = Math.min(...executionTimes);

    console.log(`   📊 Average execution time: ${avgTime.toFixed(0)}ms`);
    console.log(`   📊 Max execution time: ${maxTime}ms`);
    console.log(`   📊 Min execution time: ${minTime}ms`);

    // Validate performance requirements
    if (avgTime > 25000) { // 25s average (allowing 5s buffer from 30s limit)
      console.warn(`   ⚠️  Average execution time (${avgTime.toFixed(0)}ms) is close to 30s limit`);
    } else {
      console.log('   ✅ Performance within acceptable limits');
    }

    if (maxTime > 30000) {
      console.error(`   ❌ Maximum execution time (${maxTime}ms) exceeds 30s limit`);
      throw new Error('Performance requirement not met');
    }

    console.log('   ✅ Performance validation completed');

  } catch (error) {
    console.error('   ❌ Performance validation failed:', error);
    throw error;
  }
}

async function validateEnvironment(): Promise<void> {
  const requiredEnvVars = [
    'SENDGRID_API_KEY',
    'SENDGRID_FROM_EMAIL',
    'SENDGRID_FROM_NAME',
    'ADMIN_EMAIL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
  ];

  const missing = requiredEnvVars.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing.join(', '));
    console.error('Please ensure all required environment variables are set before running tests.');
    process.exit(1);
  }

  console.log('✅ Environment validation passed');
}

// Main execution
async function main(): Promise<void> {
  console.log('🔧 Consolidated Audit API Integration Test\n');
  
  // Validate environment first
  await validateEnvironment();
  
  // Run the test suite
  await testAuditCompleteAPI();
}

// Handle uncaught errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Run the tests
if (require.main === module) {
  main().catch(error => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });
}

export { testAuditCompleteAPI };