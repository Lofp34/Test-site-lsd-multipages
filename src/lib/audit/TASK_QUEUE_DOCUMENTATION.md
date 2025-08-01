# Task Queue System Documentation

## Overview

The Task Queue System is a core component of the optimized Vercel audit system, designed to efficiently manage and process tasks within the constraints of the Vercel Hobby plan. It provides intelligent task prioritization, batch processing with concurrency control, retry mechanisms with exponential backoff, and comprehensive metrics tracking.

## Architecture

### Core Components

1. **TaskQueue** - Main queue management class
2. **BatchProcessor** - Optimized batch processing with backpressure management
3. **Task Types** - Comprehensive type definitions
4. **Database Integration** - Supabase persistence layer

### Key Features

- ✅ **Priority-based task scheduling** (critical, high, medium, low)
- ✅ **Batch processing** with configurable batch size (default: 10)
- ✅ **Concurrency control** with semaphore (default: 3 concurrent batches)
- ✅ **Retry mechanism** with exponential backoff
- ✅ **Memory management** with backpressure control
- ✅ **Metrics tracking** and performance monitoring
- ✅ **Database persistence** with Supabase
- ✅ **Scheduled task execution**
- ✅ **Automatic cleanup** of completed tasks

## Task Types

### Supported Task Types

```typescript
type TaskType = 
  | 'link_check'    // URL validation tasks
  | 'correction'    // Link correction tasks
  | 'alert'         // Alert/notification tasks
  | 'report'        // Report generation tasks
  | 'cleanup'       // Database cleanup tasks
  | 'maintenance'   // System maintenance tasks
```

### Priority Levels

```typescript
type TaskPriority = 'critical' | 'high' | 'medium' | 'low'
```

- **Critical**: System alerts, urgent fixes
- **High**: Important link checks, user-facing issues
- **Medium**: Regular maintenance, non-urgent corrections
- **Low**: Background cleanup, analytics

## Usage Examples

### Basic Task Queue Usage

```typescript
import { TaskQueue } from '@/lib/audit/task-queue';

const taskQueue = new TaskQueue({
  batchSize: 10,
  maxConcurrency: 3,
  enableMetrics: true
});

// Add a task
const taskId = await taskQueue.addTask(
  'link_check',
  { url: 'https://example.com', timeout: 5000 },
  'high'
);

// Process tasks in batches
const batchResult = await taskQueue.processBatch();
console.log(`Processed ${batchResult.completedTasks} tasks`);

// Get queue status
const status = await taskQueue.getQueueStatus();
console.log(`Pending tasks: ${status.pendingTasks}`);
```

### Batch Processing with Backpressure

```typescript
import { BatchProcessor } from '@/lib/audit/batch-processor';

const processor = new BatchProcessor({
  batchSize: 10,
  maxConcurrency: 3,
  memoryLimitMB: 512,
  enableBackpressure: true
});

// Process URLs with automatic backpressure management
const urls = ['https://example1.com', 'https://example2.com', ...];

const stats = await processor.processWithBackpressure(
  urls,
  async (url) => {
    // Your processing logic here
    const response = await fetch(url);
    return { url, status: response.status };
  },
  'link_check',
  'high'
);

console.log(`Processed ${stats.processedItems}/${stats.totalItems} items`);
console.log(`Throughput: ${stats.throughput.toFixed(2)} items/second`);
```

### Scheduled Tasks

```typescript
// Schedule a task for future execution
const futureTime = new Date(Date.now() + 60000); // 1 minute from now

const taskId = await taskQueue.addTask(
  'maintenance',
  { operation: 'cleanup_logs' },
  'medium',
  { 
    scheduledFor: futureTime,
    metadata: { source: 'automated_scheduler' }
  }
);
```

### Retry Configuration

```typescript
// Add task with custom retry settings
const taskId = await taskQueue.addTask(
  'link_check',
  { url: 'https://unreliable-site.com' },
  'high',
  { 
    maxAttempts: 5,  // Override default retry attempts
    metadata: { retryStrategy: 'aggressive' }
  }
);
```

## Configuration

### TaskQueue Configuration

```typescript
interface TaskQueueConfig {
  batchSize: number;           // Default: 10
  maxConcurrency: number;      // Default: 3
  retryDelayMs: number;        // Default: 1000
  maxRetryDelayMs: number;     // Default: 30000
  backoffMultiplier: number;   // Default: 2
  cleanupIntervalMs: number;   // Default: 60000
  maxTaskAge: number;          // Default: 24 hours
  enableMetrics: boolean;      // Default: true
}
```

### BatchProcessor Configuration

```typescript
interface BatchProcessorConfig {
  batchSize: number;           // Default: 10
  maxConcurrency: number;      // Default: 3
  timeoutMs: number;           // Default: 30000
  enableBackpressure: boolean; // Default: true
  memoryLimitMB: number;       // Default: 512
}
```

## Database Schema

### task_queue Table

```sql
CREATE TABLE task_queue (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  priority TEXT NOT NULL,
  payload JSONB NOT NULL,
  status TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  max_attempts INTEGER NOT NULL DEFAULT 3,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  scheduled_for TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  error TEXT,
  metadata JSONB
);
```

### task_execution_log Table

```sql
CREATE TABLE task_execution_log (
  id SERIAL PRIMARY KEY,
  task_id TEXT NOT NULL REFERENCES task_queue(id),
  attempt INTEGER NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  success BOOLEAN,
  error TEXT,
  execution_time INTEGER,
  memory_used INTEGER,
  cpu_time INTEGER
);
```

### queue_metrics Table

```sql
CREATE TABLE queue_metrics (
  id SERIAL PRIMARY KEY,
  snapshot_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  total_tasks INTEGER NOT NULL DEFAULT 0,
  pending_tasks INTEGER NOT NULL DEFAULT 0,
  in_progress_tasks INTEGER NOT NULL DEFAULT 0,
  completed_tasks INTEGER NOT NULL DEFAULT 0,
  failed_tasks INTEGER NOT NULL DEFAULT 0,
  average_execution_time REAL NOT NULL DEFAULT 0,
  success_rate REAL NOT NULL DEFAULT 0
);
```

## Performance Optimization

### Memory Management

The system includes several memory optimization features:

1. **Backpressure Control**: Automatically slows down processing when memory usage is high
2. **Garbage Collection**: Forces GC when memory limits are approached
3. **Memory Monitoring**: Continuous monitoring with warnings at 80% of limit
4. **Batch Size Optimization**: Automatic calculation of optimal batch sizes

### Concurrency Control

- **Semaphore Pattern**: Limits concurrent task execution
- **Rate Limiting**: Prevents overwhelming external services
- **Timeout Protection**: Prevents hanging tasks from blocking the queue

### Retry Strategy

- **Exponential Backoff**: Delays increase exponentially with each retry
- **Jitter**: Random delay component to prevent thundering herd
- **Max Attempts**: Configurable maximum retry attempts per task
- **Failure Tracking**: Comprehensive logging of failed attempts

## Monitoring and Metrics

### Queue Metrics

```typescript
interface QueueMetrics {
  totalTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  failedTasks: number;
  tasksByPriority: Record<TaskPriority, number>;
  tasksByType: Record<TaskType, number>;
  averageExecutionTime: number;
  successRate: number;
  lastProcessedAt?: Date;
}
```

### Performance Stats

```typescript
interface ProcessingStats {
  totalItems: number;
  processedItems: number;
  failedItems: number;
  batchCount: number;
  totalTime: number;
  averageItemTime: number;
  memoryUsage: number;
  throughput: number; // items per second
}
```

## Integration with Vercel Optimization

### Consolidated API Routes

The task queue integrates with the consolidated API routes:

1. **`/api/audit-complete`** (Daily cron)
   - Adds link check tasks for all URLs
   - Processes correction tasks
   - Handles critical alerts

2. **`/api/maintenance-weekly`** (Weekly cron)
   - Adds cleanup tasks
   - Processes report generation tasks
   - Handles maintenance operations

### Resource Usage Optimization

- **Batch Size**: Optimized for Vercel function limits
- **Concurrency**: Limited to prevent memory exhaustion
- **Timeout**: Respects Vercel function timeout limits
- **Memory**: Stays within Vercel memory constraints

## Error Handling

### Task Execution Errors

1. **Retry Logic**: Automatic retry with exponential backoff
2. **Error Logging**: Comprehensive error tracking in database
3. **Failure Notifications**: Critical failures trigger alerts
4. **Graceful Degradation**: System continues operating despite individual task failures

### System Errors

1. **Database Connectivity**: Automatic reconnection attempts
2. **Memory Exhaustion**: Backpressure and garbage collection
3. **Timeout Handling**: Graceful timeout with state preservation
4. **Concurrency Issues**: Semaphore-based protection

## Testing

### Unit Tests

Run the task queue tests:

```bash
npm run tsx scripts/test-task-queue.ts
```

### Performance Tests

The test suite includes performance testing with:
- 50+ concurrent tasks
- Memory usage monitoring
- Throughput measurement
- Failure rate analysis

### Database Setup

Initialize the database tables:

```bash
npm run tsx scripts/setup-task-queue-db.ts
```

## Best Practices

### Task Design

1. **Idempotent Tasks**: Design tasks to be safely retryable
2. **Small Payloads**: Keep task payloads minimal for better performance
3. **Appropriate Priorities**: Use priority levels effectively
4. **Timeout Handling**: Design tasks to handle timeouts gracefully

### Performance

1. **Batch Size**: Adjust based on task complexity and memory usage
2. **Concurrency**: Monitor system resources and adjust accordingly
3. **Cleanup**: Regularly clean up completed tasks
4. **Monitoring**: Use metrics to identify bottlenecks

### Error Handling

1. **Retry Strategy**: Configure appropriate retry attempts for each task type
2. **Error Logging**: Log errors with sufficient context for debugging
3. **Alerting**: Set up alerts for critical failures
4. **Fallback**: Implement fallback mechanisms for critical operations

## Troubleshooting

### Common Issues

1. **High Memory Usage**
   - Reduce batch size
   - Enable backpressure control
   - Check for memory leaks in task processors

2. **Low Throughput**
   - Increase concurrency (within limits)
   - Optimize task processors
   - Check database performance

3. **High Failure Rate**
   - Review retry configuration
   - Check external service availability
   - Analyze error logs

4. **Queue Backlog**
   - Increase processing frequency
   - Optimize task priorities
   - Scale processing capacity

### Debugging

1. **Enable Metrics**: Set `enableMetrics: true` in configuration
2. **Check Logs**: Review task execution logs in database
3. **Monitor Memory**: Watch memory usage during processing
4. **Analyze Patterns**: Look for patterns in failed tasks

## Future Enhancements

### Planned Features

1. **Dead Letter Queue**: For permanently failed tasks
2. **Task Dependencies**: Support for task chains and dependencies
3. **Dynamic Scaling**: Automatic adjustment of batch size and concurrency
4. **Advanced Metrics**: More detailed performance analytics
5. **Task Scheduling**: Cron-like scheduling for recurring tasks

### Integration Opportunities

1. **Webhook Support**: Trigger tasks via webhooks
2. **API Endpoints**: REST API for task management
3. **Dashboard**: Web interface for queue monitoring
4. **Alerting Integration**: Integration with external alerting systems

This task queue system provides a robust foundation for the optimized Vercel audit system, ensuring efficient resource utilization while maintaining high performance and reliability.