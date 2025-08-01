-- Task Queue System Database Setup
-- Run these commands in your Supabase SQL editor

-- 1. Create task_queue table
CREATE TABLE IF NOT EXISTS task_queue (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('link_check', 'correction', 'alert', 'report', 'cleanup', 'maintenance')),
  priority TEXT NOT NULL CHECK (priority IN ('critical', 'high', 'medium', 'low')),
  payload JSONB NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'failed', 'retrying')),
  attempts INTEGER NOT NULL DEFAULT 0,
  max_attempts INTEGER NOT NULL DEFAULT 3,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  scheduled_for TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  error TEXT,
  metadata JSONB
);

-- 2. Create task_execution_log table
CREATE TABLE IF NOT EXISTS task_execution_log (
  id SERIAL PRIMARY KEY,
  task_id TEXT NOT NULL REFERENCES task_queue(id) ON DELETE CASCADE,
  attempt INTEGER NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  success BOOLEAN,
  error TEXT,
  execution_time INTEGER, -- in milliseconds
  memory_used INTEGER, -- in MB
  cpu_time INTEGER -- in milliseconds
);

-- 3. Create queue_metrics table
CREATE TABLE IF NOT EXISTS queue_metrics (
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

-- 4. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_task_queue_status ON task_queue(status);
CREATE INDEX IF NOT EXISTS idx_task_queue_priority ON task_queue(priority);
CREATE INDEX IF NOT EXISTS idx_task_queue_type ON task_queue(type);
CREATE INDEX IF NOT EXISTS idx_task_queue_scheduled ON task_queue(scheduled_for) WHERE scheduled_for IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_task_queue_created ON task_queue(created_at);
CREATE INDEX IF NOT EXISTS idx_task_queue_pending ON task_queue(status, priority, created_at) WHERE status IN ('pending', 'retrying');

CREATE INDEX IF NOT EXISTS idx_task_execution_log_task_id ON task_execution_log(task_id);
CREATE INDEX IF NOT EXISTS idx_task_execution_log_started ON task_execution_log(started_at);
CREATE INDEX IF NOT EXISTS idx_task_execution_log_success ON task_execution_log(success);

CREATE INDEX IF NOT EXISTS idx_queue_metrics_snapshot ON queue_metrics(snapshot_at);

-- 5. Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Create trigger for task_queue
DROP TRIGGER IF EXISTS update_task_queue_updated_at ON task_queue;
CREATE TRIGGER update_task_queue_updated_at
  BEFORE UPDATE ON task_queue
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 7. Enable Row Level Security
ALTER TABLE task_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_execution_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE queue_metrics ENABLE ROW LEVEL SECURITY;

-- 8. Create RLS policies for service role (full access)
CREATE POLICY IF NOT EXISTS "Service role can manage task_queue" ON task_queue
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS "Service role can manage task_execution_log" ON task_execution_log
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS "Service role can manage queue_metrics" ON queue_metrics
  FOR ALL USING (auth.role() = 'service_role');

-- 9. Create RLS policies for authenticated users (read-only for admin dashboard)
CREATE POLICY IF NOT EXISTS "Authenticated users can read task_queue" ON task_queue
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Authenticated users can read task_execution_log" ON task_execution_log
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Authenticated users can read queue_metrics" ON queue_metrics
  FOR SELECT USING (auth.role() = 'authenticated');

-- 10. Insert sample data for testing (optional)
-- INSERT INTO task_queue (id, type, priority, payload, status) VALUES
-- ('test-1', 'link_check', 'high', '{"url": "https://example.com"}', 'pending'),
-- ('test-2', 'cleanup', 'low', '{"retentionDays": 30}', 'pending');

-- Verification queries
SELECT 'task_queue table created' as status, count(*) as row_count FROM task_queue;
SELECT 'task_execution_log table created' as status, count(*) as row_count FROM task_execution_log;
SELECT 'queue_metrics table created' as status, count(*) as row_count FROM queue_metrics;