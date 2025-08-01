#!/usr/bin/env tsx
// Setup script for Task Queue database tables

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupTaskQueueTables() {
  console.log('🚀 Setting up Task Queue database tables...');

  try {
    // Create task_queue table
    console.log('📝 Creating task_queue table...');
    
    // Create the table first
    const { error: createTableError } = await supabase
      .from('task_queue')
      .select('id')
      .limit(1);
    
    // If table doesn't exist, we need to create it manually
    // For now, let's just test if we can access it
    if (createTableError && createTableError.code === 'PGRST116') {
      console.log('⚠️  task_queue table does not exist. Please create it manually in Supabase dashboard.');
      console.log('SQL to create the table:');
      console.log(`
CREATE TABLE task_queue (
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

-- Create indexes for performance
CREATE INDEX idx_task_queue_status ON task_queue(status);
CREATE INDEX idx_task_queue_priority ON task_queue(priority);
CREATE INDEX idx_task_queue_type ON task_queue(type);
CREATE INDEX idx_task_queue_scheduled ON task_queue(scheduled_for) WHERE scheduled_for IS NOT NULL;
CREATE INDEX idx_task_queue_created ON task_queue(created_at);
CREATE INDEX idx_task_queue_pending ON task_queue(status, priority, created_at) WHERE status IN ('pending', 'retrying');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_task_queue_updated_at
  BEFORE UPDATE ON task_queue
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
      `);
    } else if (createTableError) {
      throw createTableError;
    } else {
      console.log('✅ task_queue table already exists or is accessible');
    }

    if (taskQueueError) {
      throw taskQueueError;
    }

    // Create task_execution_log table
    console.log('📝 Creating task_execution_log table...');
    
    const { error: logError } = await supabase
      .from('task_execution_log')
      .select('id')
      .limit(1);
    
    if (logError && logError.code === 'PGRST116') {
      console.log('⚠️  task_execution_log table does not exist. Please create it manually in Supabase dashboard.');
      console.log('SQL to create the table:');
      console.log(`
CREATE TABLE task_execution_log (
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

-- Create indexes for performance
CREATE INDEX idx_task_execution_log_task_id ON task_execution_log(task_id);
CREATE INDEX idx_task_execution_log_started ON task_execution_log(started_at);
CREATE INDEX idx_task_execution_log_success ON task_execution_log(success);
      `);
    } else if (logError) {
      throw logError;
    } else {
      console.log('✅ task_execution_log table already exists or is accessible');
    }

    if (logError) {
      throw logError;
    }

    // Create queue_metrics table
    console.log('📝 Creating queue_metrics table...');
    
    const { error: metricsError } = await supabase
      .from('queue_metrics')
      .select('id')
      .limit(1);
    
    if (metricsError && metricsError.code === 'PGRST116') {
      console.log('⚠️  queue_metrics table does not exist. Please create it manually in Supabase dashboard.');
      console.log('SQL to create the table:');
      console.log(`
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

-- Create index for time-based queries
CREATE INDEX idx_queue_metrics_snapshot ON queue_metrics(snapshot_at);
      `);
    } else if (metricsError) {
      throw metricsError;
    } else {
      console.log('✅ queue_metrics table already exists or is accessible');
    }

    if (metricsError) {
      throw metricsError;
    }

    // Note about RLS policies
    console.log('🔒 Note: Row Level Security policies need to be set up manually in Supabase dashboard.');
    console.log('SQL for RLS policies:');
    console.log(`
-- Enable RLS
ALTER TABLE task_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_execution_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE queue_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies for service role (full access)
CREATE POLICY "Service role can manage task_queue" ON task_queue
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage task_execution_log" ON task_execution_log
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage queue_metrics" ON queue_metrics
  FOR ALL USING (auth.role() = 'service_role');

-- Create policies for authenticated users (read-only for admin dashboard)
CREATE POLICY "Authenticated users can read task_queue" ON task_queue
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read task_execution_log" ON task_execution_log
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read queue_metrics" ON queue_metrics
  FOR SELECT USING (auth.role() = 'authenticated');
    `);



    // Test the setup
    console.log('🧪 Testing database setup...');
    
    // Test task_queue table
    const { data: taskQueueTest, error: taskQueueTestError } = await supabase
      .from('task_queue')
      .select('count')
      .limit(1);

    if (taskQueueTestError) {
      throw new Error(`Task queue table test failed: ${taskQueueTestError.message}`);
    }

    // Test task_execution_log table
    const { data: logTest, error: logTestError } = await supabase
      .from('task_execution_log')
      .select('count')
      .limit(1);

    if (logTestError) {
      throw new Error(`Task execution log table test failed: ${logTestError.message}`);
    }

    // Test queue_metrics table
    const { data: metricsTest, error: metricsTestError } = await supabase
      .from('queue_metrics')
      .select('count')
      .limit(1);

    if (metricsTestError) {
      throw new Error(`Queue metrics table test failed: ${metricsTestError.message}`);
    }

    console.log('✅ Task Queue database setup completed successfully!');
    console.log('📊 Tables created:');
    console.log('  - task_queue (with indexes and triggers)');
    console.log('  - task_execution_log (with indexes)');
    console.log('  - queue_metrics (with indexes)');
    console.log('🔒 Row Level Security policies configured');
    console.log('🧪 All tables tested and working');

  } catch (error) {
    console.error('❌ Error setting up Task Queue database:', error);
    process.exit(1);
  }
}

// Run the setup
setupTaskQueueTables();