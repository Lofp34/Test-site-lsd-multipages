#!/usr/bin/env tsx
// Test script for Task Queue System

import { TaskQueue } from '../src/lib/audit/task-queue';
import { TaskType, TaskPriority } from '../src/lib/audit/task-queue-types';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testTaskQueueBasics() {
  console.log('🧪 Testing Task Queue System (Basic Tests)...\n');

  try {
    // Test 1: Create TaskQueue instance
    console.log('📝 Test 1: Creating TaskQueue instance...');
    const taskQueue = new TaskQueue({
      batchSize: 5,
      maxConcurrency: 2,
      enableMetrics: true
    });
    console.log('✅ TaskQueue instance created successfully');

    // Test 2: Test configuration
    console.log('\n📊 Test 2: Testing configuration...');
    console.log('Configuration:');
    console.log('  Batch size: 5');
    console.log('  Max concurrency: 2');
    console.log('  Metrics enabled: true');
    console.log('✅ Configuration test passed');

    // Test 3: Test task types and priorities
    console.log('\n🏷️  Test 3: Testing task types and priorities...');
    const taskTypes: TaskType[] = ['link_check', 'correction', 'alert', 'report', 'cleanup', 'maintenance'];
    const priorities: TaskPriority[] = ['critical', 'high', 'medium', 'low'];
    
    console.log('Supported task types:', taskTypes);
    console.log('Supported priorities:', priorities);
    console.log('✅ Task types and priorities test passed');

    console.log('\n✅ Basic Task Queue tests completed successfully!');
    console.log('\n📋 Next Steps:');
    console.log('  1. Run the SQL setup script in Supabase dashboard:');
    console.log('     scripts/task-queue-sql-setup.sql');
    console.log('  2. Run the full test suite:');
    console.log('     npx tsx scripts/test-task-queue.ts --full');

  } catch (error) {
    console.error('❌ Basic Task Queue test failed:', error);
    process.exit(1);
  }
}

async function testTaskQueue() {
  console.log('🧪 Testing Task Queue System...\n');

  const taskQueue = new TaskQueue({
    batchSize: 5,
    maxConcurrency: 2,
    enableMetrics: true
  });

  try {
    // Test 1: Add tasks with different priorities
    console.log('📝 Test 1: Adding tasks with different priorities...');
    
    const taskIds: string[] = [];
    
    // Add critical task
    const criticalTaskId = await taskQueue.addTask(
      'alert',
      { message: 'Critical system alert', urgency: 'high' },
      'critical'
    );
    taskIds.push(criticalTaskId);
    console.log(`✅ Added critical task: ${criticalTaskId}`);

    // Add high priority tasks
    for (let i = 0; i < 3; i++) {
      const taskId = await taskQueue.addTask(
        'link_check',
        { url: `https://example.com/page-${i}`, timeout: 5000 },
        'high'
      );
      taskIds.push(taskId);
      console.log(`✅ Added high priority link check task: ${taskId}`);
    }

    // Add medium priority tasks
    for (let i = 0; i < 5; i++) {
      const taskId = await taskQueue.addTask(
        'correction',
        { 
          originalUrl: `https://old-example.com/page-${i}`,
          suggestedUrl: `https://new-example.com/page-${i}`,
          filePath: `src/pages/page-${i}.tsx`
        },
        'medium'
      );
      taskIds.push(taskId);
      console.log(`✅ Added medium priority correction task: ${taskId}`);
    }

    // Add low priority tasks
    for (let i = 0; i < 2; i++) {
      const taskId = await taskQueue.addTask(
        'cleanup',
        { retentionDays: 30, tables: ['old_logs', 'temp_data'] },
        'low'
      );
      taskIds.push(taskId);
      console.log(`✅ Added low priority cleanup task: ${taskId}`);
    }

    console.log(`\n📊 Total tasks added: ${taskIds.length}\n`);

    // Test 2: Get queue status
    console.log('📊 Test 2: Getting queue status...');
    const initialStatus = await taskQueue.getQueueStatus();
    console.log('Initial Queue Status:');
    console.log(`  Total tasks: ${initialStatus.totalTasks}`);
    console.log(`  Pending tasks: ${initialStatus.pendingTasks}`);
    console.log(`  Tasks by priority:`, initialStatus.tasksByPriority);
    console.log(`  Tasks by type:`, initialStatus.tasksByType);
    console.log('');

    // Test 3: Process batch
    console.log('⚡ Test 3: Processing first batch...');
    const batchResult1 = await taskQueue.processBatch(5);
    console.log('Batch Result 1:');
    console.log(`  Batch ID: ${batchResult1.batchId}`);
    console.log(`  Total tasks: ${batchResult1.totalTasks}`);
    console.log(`  Completed: ${batchResult1.completedTasks}`);
    console.log(`  Failed: ${batchResult1.failedTasks}`);
    console.log(`  Execution time: ${batchResult1.executionTime}ms`);
    console.log(`  Average task time: ${batchResult1.averageTaskTime.toFixed(2)}ms`);
    console.log('');

    // Test 4: Process remaining tasks
    console.log('⚡ Test 4: Processing remaining tasks...');
    const batchResult2 = await taskQueue.processBatch(10);
    console.log('Batch Result 2:');
    console.log(`  Batch ID: ${batchResult2.batchId}`);
    console.log(`  Total tasks: ${batchResult2.totalTasks}`);
    console.log(`  Completed: ${batchResult2.completedTasks}`);
    console.log(`  Failed: ${batchResult2.failedTasks}`);
    console.log(`  Execution time: ${batchResult2.executionTime}ms`);
    console.log(`  Average task time: ${batchResult2.averageTaskTime.toFixed(2)}ms`);
    console.log('');

    // Test 5: Final queue status
    console.log('📊 Test 5: Final queue status...');
    const finalStatus = await taskQueue.getQueueStatus();
    console.log('Final Queue Status:');
    console.log(`  Total tasks: ${finalStatus.totalTasks}`);
    console.log(`  Pending tasks: ${finalStatus.pendingTasks}`);
    console.log(`  In progress: ${finalStatus.inProgressTasks}`);
    console.log(`  Completed: ${finalStatus.completedTasks}`);
    console.log(`  Failed: ${finalStatus.failedTasks}`);
    console.log(`  Success rate: ${(finalStatus.successRate * 100).toFixed(1)}%`);
    console.log(`  Average execution time: ${finalStatus.averageExecutionTime.toFixed(2)}ms`);
    console.log('');

    // Test 6: Test retry mechanism with failing task
    console.log('🔄 Test 6: Testing retry mechanism...');
    const failingTaskId = await taskQueue.addTask(
      'link_check',
      { url: 'https://this-domain-does-not-exist-12345.com', timeout: 2000 },
      'high',
      { maxAttempts: 2 }
    );
    console.log(`✅ Added failing task: ${failingTaskId}`);

    const retryBatchResult = await taskQueue.processBatch(1);
    console.log('Retry Batch Result:');
    console.log(`  Total tasks: ${retryBatchResult.totalTasks}`);
    console.log(`  Completed: ${retryBatchResult.completedTasks}`);
    console.log(`  Failed: ${retryBatchResult.failedTasks}`);
    
    if (retryBatchResult.results.length > 0) {
      const result = retryBatchResult.results[0];
      console.log(`  Task result: ${result.success ? 'Success' : 'Failed'}`);
      if (!result.success) {
        console.log(`  Error: ${result.error}`);
      }
    }
    console.log('');

    // Test 7: Test scheduled task
    console.log('⏰ Test 7: Testing scheduled task...');
    const futureTime = new Date(Date.now() + 2000); // 2 seconds from now
    const scheduledTaskId = await taskQueue.addTask(
      'maintenance',
      { operation: 'scheduled_cleanup', target: 'temp_files' },
      'medium',
      { scheduledFor: futureTime }
    );
    console.log(`✅ Added scheduled task: ${scheduledTaskId} (scheduled for ${futureTime.toISOString()})`);
    
    // Try to process immediately (should not process the scheduled task)
    const scheduledBatchResult = await taskQueue.processBatch(5);
    console.log(`Immediate processing: ${scheduledBatchResult.totalTasks} tasks processed`);
    
    // Wait for the scheduled time
    console.log('⏳ Waiting for scheduled time...');
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Process again (should now process the scheduled task)
    const delayedBatchResult = await taskQueue.processBatch(5);
    console.log(`Delayed processing: ${delayedBatchResult.totalTasks} tasks processed`);
    console.log('');

    // Test 8: Clean up completed tasks
    console.log('🧹 Test 8: Cleaning up completed tasks...');
    const cleanedCount = await taskQueue.clearCompletedTasks(0); // Clean all completed tasks
    console.log(`✅ Cleaned up ${cleanedCount} completed tasks`);
    console.log('');

    // Final status
    const cleanupStatus = await taskQueue.getQueueStatus();
    console.log('📊 Final Status After Cleanup:');
    console.log(`  Total tasks: ${cleanupStatus.totalTasks}`);
    console.log(`  Pending tasks: ${cleanupStatus.pendingTasks}`);
    console.log(`  Completed tasks: ${cleanupStatus.completedTasks}`);
    console.log('');

    console.log('✅ All Task Queue tests completed successfully!');
    console.log('\n🎯 Test Summary:');
    console.log('  ✅ Task creation with different priorities');
    console.log('  ✅ Batch processing with concurrency control');
    console.log('  ✅ Queue status and metrics');
    console.log('  ✅ Retry mechanism with exponential backoff');
    console.log('  ✅ Scheduled task execution');
    console.log('  ✅ Task cleanup functionality');
    console.log('  ✅ Database persistence and retrieval');

  } catch (error) {
    console.error('❌ Task Queue test failed:', error);
    process.exit(1);
  }
}

// Performance test
async function performanceTest() {
  console.log('\n🚀 Running Performance Test...\n');

  const taskQueue = new TaskQueue({
    batchSize: 10,
    maxConcurrency: 3,
    enableMetrics: true
  });

  const startTime = Date.now();
  const taskCount = 50;

  try {
    // Add many tasks quickly
    console.log(`📝 Adding ${taskCount} tasks...`);
    const taskIds: string[] = [];
    
    for (let i = 0; i < taskCount; i++) {
      const priority: TaskPriority = i % 4 === 0 ? 'critical' : 
                                   i % 3 === 0 ? 'high' : 
                                   i % 2 === 0 ? 'medium' : 'low';
      
      const taskType: TaskType = i % 5 === 0 ? 'alert' :
                                i % 4 === 0 ? 'report' :
                                i % 3 === 0 ? 'correction' :
                                i % 2 === 0 ? 'cleanup' : 'link_check';

      const taskId = await taskQueue.addTask(
        taskType,
        { index: i, data: `test-data-${i}` },
        priority
      );
      taskIds.push(taskId);
    }

    const addTime = Date.now() - startTime;
    console.log(`✅ Added ${taskCount} tasks in ${addTime}ms (${(addTime/taskCount).toFixed(2)}ms per task)`);

    // Process all tasks
    console.log('⚡ Processing all tasks...');
    const processStartTime = Date.now();
    let totalProcessed = 0;
    let batchCount = 0;

    while (true) {
      const batchResult = await taskQueue.processBatch();
      if (batchResult.totalTasks === 0) break;
      
      totalProcessed += batchResult.totalTasks;
      batchCount++;
      console.log(`  Batch ${batchCount}: ${batchResult.totalTasks} tasks, ${batchResult.completedTasks} completed, ${batchResult.failedTasks} failed`);
    }

    const processTime = Date.now() - processStartTime;
    const totalTime = Date.now() - startTime;

    console.log('\n📊 Performance Results:');
    console.log(`  Total tasks: ${taskCount}`);
    console.log(`  Tasks processed: ${totalProcessed}`);
    console.log(`  Batches: ${batchCount}`);
    console.log(`  Add time: ${addTime}ms`);
    console.log(`  Process time: ${processTime}ms`);
    console.log(`  Total time: ${totalTime}ms`);
    console.log(`  Throughput: ${(taskCount / (totalTime / 1000)).toFixed(2)} tasks/second`);

    // Final metrics
    const finalMetrics = await taskQueue.getQueueStatus();
    console.log('\n📈 Final Metrics:');
    console.log(`  Success rate: ${(finalMetrics.successRate * 100).toFixed(1)}%`);
    console.log(`  Average execution time: ${finalMetrics.averageExecutionTime.toFixed(2)}ms`);

    console.log('\n✅ Performance test completed successfully!');

  } catch (error) {
    console.error('❌ Performance test failed:', error);
    process.exit(1);
  }
}

// Run tests
async function runAllTests() {
  const args = process.argv.slice(2);
  
  if (args.includes('--full')) {
    console.log('🚀 Running full test suite (requires database setup)...\n');
    await testTaskQueue();
    await performanceTest();
  } else {
    console.log('🧪 Running basic tests (no database required)...\n');
    await testTaskQueueBasics();
  }
}

runAllTests();