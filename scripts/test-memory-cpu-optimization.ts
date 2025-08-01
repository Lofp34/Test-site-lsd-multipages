#!/usr/bin/env tsx

/**
 * Test script for memory and CPU optimizations
 * Tests the new memory optimizer, CPU optimizer, and advanced batch processing
 */

import { memoryOptimizer, MemoryUtils } from '../src/lib/audit/memory-optimizer';
import { cpuOptimizer, CPUUtils } from '../src/lib/audit/cpu-optimizer';
import { streamingProcessor, StreamingUtils } from '../src/lib/audit/streaming-processor';
import { batchProcessor } from '../src/lib/audit/batch-processor';
import { lazyLoader, LazyModules } from '../src/lib/audit/lazy-loader';
import { databaseOptimizer } from '../src/lib/audit/database-optimizer';

async function testMemoryOptimizer() {
  console.log('\n🧠 Testing Memory Optimizer...');
  
  // Start monitoring
  memoryOptimizer.startMonitoring();
  
  // Test current memory stats
  const stats = memoryOptimizer.getCurrentMemoryStats();
  console.log(`Current memory usage: ${stats.heapUsed}MB (${stats.percentageUsed}%)`);
  
  // Test memory safety check
  const isSafe = memoryOptimizer.isMemorySafe();
  console.log(`Memory is safe: ${isSafe}`);
  
  // Test garbage collection
  const gcResult = memoryOptimizer.forceGarbageCollection();
  console.log(`Garbage collection available: ${gcResult}`);
  
  // Test streaming processing
  const testData = Array.from({ length: 100 }, (_, i) => ({ id: i, data: `item-${i}` }));
  
  console.log('\n📦 Testing streaming processing...');
  let processedCount = 0;
  
  for await (const chunk of memoryOptimizer.streamProcess(
    testData,
    async (items) => {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 10));
      return items.map(item => ({ ...item, processed: true }));
    },
    10 // chunk size
  )) {
    processedCount += chunk.length;
    console.log(`Processed chunk: ${chunk.length} items (total: ${processedCount})`);
  }
  
  // Test memory trend
  const trend = memoryOptimizer.getMemoryTrend();
  console.log(`Memory trend: ${trend.trend} (current: ${trend.current.heapUsed}MB, peak: ${trend.peak}MB)`);
  
  memoryOptimizer.stopMonitoring();
  console.log('✅ Memory optimizer tests completed');
}

async function testCPUOptimizer() {
  console.log('\n⚡ Testing CPU Optimizer...');
  
  // Start monitoring
  cpuOptimizer.startMonitoring();
  
  // Test function profiling
  const testFunction = async (input: number) => {
    // Simulate CPU-intensive work
    let result = 0;
    for (let i = 0; i < input * 1000; i++) {
      result += Math.sqrt(i);
    }
    return result;
  };
  
  console.log('Testing function profiling...');
  const result1 = await cpuOptimizer.profileFunction(
    'testFunction',
    () => testFunction(100),
    { enableMemoization: true }
  );
  
  // Test memoization (should be faster)
  const result2 = await cpuOptimizer.profileFunction(
    'testFunction',
    () => testFunction(100),
    { enableMemoization: true }
  );
  
  console.log(`First call result: ${result1}`);
  console.log(`Second call result: ${result2} (should be memoized)`);
  
  // Test optimized function creation
  const optimizedFunction = cpuOptimizer.optimize(
    'optimizedTest',
    testFunction,
    { enableMemoization: true, enableBatching: true, batchSize: 5 }
  );
  
  console.log('Testing optimized function...');
  const optimizedResults = await Promise.all([
    optimizedFunction(50),
    optimizedFunction(75),
    optimizedFunction(100),
    optimizedFunction(50), // Should be memoized
  ]);
  
  console.log(`Optimized results: ${optimizedResults.map(r => Math.round(r))}`);
  
  // Get performance profiles
  const profiles = cpuOptimizer.getProfiles();
  console.log(`Performance profiles: ${profiles.length} functions tracked`);
  profiles.forEach(profile => {
    console.log(`  ${profile.functionName}: ${profile.callCount} calls, ${Math.round(profile.averageTime)}ms avg`);
  });
  
  // Get CPU trend
  const cpuTrend = cpuOptimizer.getCPUTrend();
  console.log(`CPU trend: ${cpuTrend.trend} (current: ${cpuTrend.current.cpuUsage}%)`);
  
  // Get optimization recommendations
  const recommendations = cpuOptimizer.getOptimizationRecommendations();
  console.log(`Optimization recommendations: ${recommendations.length}`);
  recommendations.forEach(rec => {
    console.log(`  ${rec.priority.toUpperCase()}: ${rec.functionName} - ${rec.recommendation}`);
  });
  
  cpuOptimizer.stopMonitoring();
  console.log('✅ CPU optimizer tests completed');
}

async function testStreamingProcessor() {
  console.log('\n🌊 Testing Streaming Processor...');
  
  const testItems = Array.from({ length: 200 }, (_, i) => ({ id: i, value: Math.random() * 100 }));
  
  // Test basic streaming
  console.log('Testing basic streaming...');
  const results = await streamingProcessor.processStream(
    testItems,
    async (item) => {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 5));
      return { ...item, processed: true, timestamp: Date.now() };
    },
    {
      onProgress: (stats) => {
        if (stats.processedItems % 50 === 0) {
          console.log(`Progress: ${stats.processedItems}/${stats.totalItems} (${Math.round(stats.throughput)} items/sec)`);
        }
      }
    }
  );
  
  console.log(`Streaming completed: ${results.length} items processed`);
  
  // Test streaming with callback (memory efficient)
  console.log('Testing streaming with callback...');
  const callbackResults: any[] = [];
  
  const stats = await streamingProcessor.processStreamWithCallback(
    testItems.slice(0, 100),
    async (item) => ({ ...item, doubled: item.value * 2 }),
    async (chunkResults) => {
      callbackResults.push(...chunkResults);
    },
    {
      onProgress: (stats) => {
        console.log(`Callback progress: ${stats.processedItems}/${stats.totalItems}`);
      }
    }
  );
  
  console.log(`Callback streaming completed: ${callbackResults.length} items, ${stats.chunksProcessed} chunks`);
  
  // Test streaming utilities
  console.log('Testing streaming utilities...');
  const mappedResults = await StreamingUtils.streamMap(
    testItems.slice(0, 50),
    async (item) => item.value * 3,
    { chunkSize: 10, maxConcurrency: 2 }
  );
  
  console.log(`Stream map completed: ${mappedResults.length} results`);
  
  const filteredResults = await StreamingUtils.streamFilter(
    testItems.slice(0, 50),
    async (item) => item.value > 50,
    { chunkSize: 10 }
  );
  
  console.log(`Stream filter completed: ${filteredResults.length} items passed filter`);
  
  console.log('✅ Streaming processor tests completed');
}

async function testAdvancedBatchProcessor() {
  console.log('\n📦 Testing Advanced Batch Processor...');
  
  const testItems = Array.from({ length: 150 }, (_, i) => ({ 
    id: i, 
    data: `item-${i}`,
    processingTime: Math.random() * 100 + 10 // 10-110ms
  }));
  
  // Test advanced batch processing
  console.log('Testing advanced batch processing...');
  const stats = await batchProcessor.processAdvancedBatch(
    testItems,
    async (item) => {
      // Simulate variable processing time
      await new Promise(resolve => setTimeout(resolve, item.processingTime));
      
      // Simulate occasional failures
      if (Math.random() < 0.05) { // 5% failure rate
        throw new Error(`Simulated error for item ${item.id}`);
      }
      
      return { ...item, processed: true, timestamp: Date.now() };
    },
    {
      enableRetry: true,
      enableCircuitBreaker: true,
      onProgress: (stats) => {
        if (stats.processedItems % 25 === 0) {
          console.log(`Advanced progress: ${stats.processedItems}/${stats.totalItems} (${stats.failedItems} failed, ${stats.retriedItems} retried)`);
        }
      },
      onError: (error, item, attempt) => {
        console.log(`Error processing item ${item.id} (attempt ${attempt}): ${error.message}`);
      },
      onBackpressure: (memoryUsage, queueSize) => {
        console.log(`Backpressure: memory ${memoryUsage}MB, queue ${queueSize}`);
      }
    }
  );
  
  console.log('Advanced batch processing results:');
  console.log(`  Total items: ${stats.totalItems}`);
  console.log(`  Processed: ${stats.processedItems}`);
  console.log(`  Failed: ${stats.failedItems}`);
  console.log(`  Retried: ${stats.retriedItems}`);
  console.log(`  Throughput: ${Math.round(stats.throughput)} items/sec`);
  console.log(`  Backpressure events: ${stats.backpressureEvents}`);
  console.log(`  Circuit breaker trips: ${stats.circuitBreakerTrips}`);
  console.log(`  Error types:`, stats.errorsByType);
  
  // Test adaptive batch processing
  console.log('\nTesting adaptive batch processing...');
  const adaptiveStats = await batchProcessor.processAdaptiveBatch(
    testItems.slice(0, 100),
    async (item) => {
      await new Promise(resolve => setTimeout(resolve, item.processingTime));
      return { ...item, adaptive: true };
    },
    {
      initialBatchSize: 5,
      minBatchSize: 2,
      maxBatchSize: 20,
      targetLatencyMs: 500
    }
  );
  
  console.log('Adaptive batch processing results:');
  console.log(`  Processed: ${adaptiveStats.processedItems}/${adaptiveStats.totalItems}`);
  console.log(`  Batches: ${adaptiveStats.batchCount}`);
  console.log(`  Average time: ${Math.round(adaptiveStats.averageItemTime)}ms/item`);
  
  console.log('✅ Advanced batch processor tests completed');
}

async function testLazyLoader() {
  console.log('\n⏳ Testing Lazy Loader...');
  
  // Test lazy module registration
  const testModule = lazyLoader.register('testModule', async () => {
    console.log('Loading test module...');
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate loading time
    return {
      name: 'TestModule',
      version: '1.0.0',
      methods: {
        hello: () => 'Hello from lazy module!',
        calculate: (x: number, y: number) => x + y
      }
    };
  });
  
  console.log(`Module registered. Is loaded: ${testModule.isLoaded()}`);
  
  // Load the module
  const module = await testModule.load();
  console.log(`Module loaded: ${module.name} v${module.version}`);
  console.log(`Hello method: ${module.methods.hello()}`);
  console.log(`Calculate method: ${module.methods.calculate(5, 3)}`);
  
  console.log(`Module is now loaded: ${testModule.isLoaded()}`);
  
  // Test predefined lazy modules
  console.log('Testing predefined lazy modules...');
  
  try {
    // This will fail because the actual modules don't exist in test environment
    // but it demonstrates the lazy loading mechanism
    console.log('Attempting to load linkValidator...');
    // const linkValidator = await LazyModules.linkValidator.load();
    console.log('LinkValidator would be loaded here');
  } catch (error) {
    console.log('Expected error loading linkValidator in test environment');
  }
  
  // Get loading metrics
  const metrics = lazyLoader.getMetrics();
  console.log('Loading metrics:');
  metrics.forEach(metric => {
    console.log(`  ${metric.moduleName}: ${metric.loadCount} loads, ${metric.loadTime}ms, ${metric.memoryUsage} bytes`);
  });
  
  // Get summary
  const summary = lazyLoader.getSummary();
  console.log('Lazy loader summary:');
  console.log(`  Total modules: ${summary.totalModules}`);
  console.log(`  Loaded modules: ${summary.loadedModules}`);
  console.log(`  Average load time: ${Math.round(summary.averageLoadTime)}ms`);
  console.log(`  Total memory usage: ${summary.totalMemoryUsage} bytes`);
  
  console.log('✅ Lazy loader tests completed');
}

async function testDatabaseOptimizer() {
  console.log('\n🗄️ Testing Database Optimizer...');
  
  // Test query statistics (mock data since we don't have real DB in test)
  const stats = databaseOptimizer.getQueryStats();
  console.log('Query statistics:');
  console.log(`  Total queries: ${stats.totalQueries}`);
  console.log(`  Average execution time: ${stats.averageExecutionTime}ms`);
  console.log(`  Cache hit rate: ${stats.cacheHitRate}%`);
  console.log(`  Slow queries: ${stats.slowQueries.length}`);
  
  // Test indexing recommendations
  const recommendations = databaseOptimizer.getIndexingRecommendations();
  console.log(`Indexing recommendations: ${recommendations.length}`);
  recommendations.forEach(rec => {
    console.log(`  ${rec.priority.toUpperCase()}: ${rec.table}.${rec.columns.join(', ')} - ${rec.reason}`);
  });
  
  // Test cache statistics
  const cacheStats = databaseOptimizer.getCacheStats();
  console.log('Cache statistics:');
  console.log(`  Size: ${cacheStats.size}/${cacheStats.maxSize}`);
  console.log(`  Hit rate: ${cacheStats.hitRate}%`);
  console.log(`  Memory usage: ${cacheStats.memoryUsage}KB`);
  
  console.log('✅ Database optimizer tests completed');
}

async function runAllTests() {
  console.log('🚀 Starting Memory and CPU Optimization Tests...\n');
  
  try {
    await testMemoryOptimizer();
    await testCPUOptimizer();
    await testStreamingProcessor();
    await testAdvancedBatchProcessor();
    await testLazyLoader();
    await testDatabaseOptimizer();
    
    console.log('\n🎉 All tests completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  }
}

// Run tests if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests();
}

export { runAllTests };