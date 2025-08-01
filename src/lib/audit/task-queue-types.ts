// Task Queue Types for Optimized Vercel System

export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';

export type TaskType = 
  | 'link_check' 
  | 'correction' 
  | 'alert' 
  | 'report'
  | 'cleanup'
  | 'maintenance';

export type TaskStatus = 
  | 'pending' 
  | 'in_progress' 
  | 'completed' 
  | 'failed' 
  | 'retrying';

export interface AuditTask {
  id: string;
  type: TaskType;
  priority: TaskPriority;
  payload: any;
  status: TaskStatus;
  attempts: number;
  maxAttempts: number;
  createdAt: Date;
  updatedAt: Date;
  scheduledFor?: Date;
  completedAt?: Date;
  error?: string;
  metadata?: Record<string, any>;
}

export interface TaskResult {
  taskId: string;
  success: boolean;
  result?: any;
  error?: string;
  executionTime: number;
  resourceUsage?: {
    memoryUsed: number;
    cpuTime: number;
  };
}

export interface BatchResult {
  batchId: string;
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  results: TaskResult[];
  executionTime: number;
  averageTaskTime: number;
}

export interface QueueMetrics {
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

export interface TaskQueueConfig {
  batchSize: number;
  maxConcurrency: number;
  retryDelayMs: number;
  maxRetryDelayMs: number;
  backoffMultiplier: number;
  cleanupIntervalMs: number;
  maxTaskAge: number; // in milliseconds
  enableMetrics: boolean;
}

export interface RetryConfig {
  maxAttempts: number;
  initialDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
  jitterMs: number;
}

// Database row types for Supabase
export interface TaskQueueRow {
  id: string;
  type: TaskType;
  priority: TaskPriority;
  payload: any;
  status: TaskStatus;
  attempts: number;
  max_attempts: number;
  created_at: string;
  updated_at: string;
  scheduled_for?: string;
  completed_at?: string;
  error?: string;
  metadata?: Record<string, any>;
}

export interface TaskExecutionLogRow {
  id: number;
  task_id: string;
  attempt: number;
  started_at: string;
  completed_at?: string;
  success: boolean;
  error?: string;
  execution_time: number;
  memory_used?: number;
  cpu_time?: number;
}

export interface QueueMetricsRow {
  id: number;
  snapshot_at: string;
  total_tasks: number;
  pending_tasks: number;
  in_progress_tasks: number;
  completed_tasks: number;
  failed_tasks: number;
  average_execution_time: number;
  success_rate: number;
}