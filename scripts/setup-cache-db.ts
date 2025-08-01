#!/usr/bin/env tsx

/**
 * Setup database tables for cache system
 * 
 * Creates tables for:
 * - Cache snapshots (for persistence)
 * - Cache invalidation logs
 * - Cache statistics
 */

import { getSupabaseAdmin } from '../src/lib/audit/database';

async function createCacheSnapshotsTable(): Promise<void> {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS cache_snapshots (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- Create index for faster queries
      CREATE INDEX IF NOT EXISTS idx_cache_snapshots_created_at 
      ON cache_snapshots(created_at);
      
      -- Create trigger for updated_at
      CREATE OR REPLACE FUNCTION update_cache_snapshots_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      
      DROP TRIGGER IF EXISTS trigger_cache_snapshots_updated_at ON cache_snapshots;
      CREATE TRIGGER trigger_cache_snapshots_updated_at
        BEFORE UPDATE ON cache_snapshots
        FOR EACH ROW
        EXECUTE FUNCTION update_cache_snapshots_updated_at();
    `
  });

  if (error) {
    console.error('Error creating cache_snapshots table:', error);
    throw error;
  }

  console.log('✅ Created cache_snapshots table');
}

async function createCacheInvalidationLogTable(): Promise<void> {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS cache_invalidation_log (
        id SERIAL PRIMARY KEY,
        event_type TEXT NOT NULL,
        source TEXT NOT NULL,
        timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
        affected_urls TEXT[] DEFAULT '{}',
        rules_applied JSONB DEFAULT '[]',
        entries_invalidated INTEGER DEFAULT 0,
        metadata JSONB DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- Create indexes for faster queries
      CREATE INDEX IF NOT EXISTS idx_cache_invalidation_log_timestamp 
      ON cache_invalidation_log(timestamp);
      
      CREATE INDEX IF NOT EXISTS idx_cache_invalidation_log_event_type 
      ON cache_invalidation_log(event_type);
      
      CREATE INDEX IF NOT EXISTS idx_cache_invalidation_log_source 
      ON cache_invalidation_log(source);
      
      -- Create index on affected URLs using GIN for array operations
      CREATE INDEX IF NOT EXISTS idx_cache_invalidation_log_affected_urls 
      ON cache_invalidation_log USING GIN(affected_urls);
    `
  });

  if (error) {
    console.error('Error creating cache_invalidation_log table:', error);
    throw error;
  }

  console.log('✅ Created cache_invalidation_log table');
}

async function createCacheStatsTable(): Promise<void> {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS cache_stats (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        total_entries INTEGER NOT NULL,
        memory_usage_mb REAL NOT NULL,
        hit_rate REAL NOT NULL,
        miss_rate REAL NOT NULL,
        total_hits BIGINT NOT NULL,
        total_misses BIGINT NOT NULL,
        cache_type TEXT NOT NULL,
        metadata JSONB DEFAULT '{}'
      );
      
      -- Create indexes for faster queries
      CREATE INDEX IF NOT EXISTS idx_cache_stats_timestamp 
      ON cache_stats(timestamp);
      
      CREATE INDEX IF NOT EXISTS idx_cache_stats_cache_type 
      ON cache_stats(cache_type);
      
      -- Create composite index for time-series queries
      CREATE INDEX IF NOT EXISTS idx_cache_stats_type_timestamp 
      ON cache_stats(cache_type, timestamp);
    `
  });

  if (error) {
    console.error('Error creating cache_stats table:', error);
    throw error;
  }

  console.log('✅ Created cache_stats table');
}

async function createCacheConfigTable(): Promise<void> {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS cache_config (
        id TEXT PRIMARY KEY,
        config JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        active BOOLEAN DEFAULT TRUE
      );
      
      -- Create trigger for updated_at
      CREATE OR REPLACE FUNCTION update_cache_config_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      
      DROP TRIGGER IF EXISTS trigger_cache_config_updated_at ON cache_config;
      CREATE TRIGGER trigger_cache_config_updated_at
        BEFORE UPDATE ON cache_config
        FOR EACH ROW
        EXECUTE FUNCTION update_cache_config_updated_at();
      
      -- Insert default cache configuration
      INSERT INTO cache_config (id, config) VALUES (
        'default',
        '{
          "linkResultsTTL": 21600000,
          "sitemapDataTTL": 86400000,
          "reportDataTTL": 604800000,
          "maxMemoryUsage": 100,
          "cleanupInterval": 1800000
        }'::jsonb
      ) ON CONFLICT (id) DO NOTHING;
    `
  });

  if (error) {
    console.error('Error creating cache_config table:', error);
    throw error;
  }

  console.log('✅ Created cache_config table with default configuration');
}

async function setupCacheDatabase(): Promise<void> {
  console.log('🚀 Setting up cache database tables...');
  console.log('=====================================');
  
  try {
    await createCacheSnapshotsTable();
    await createCacheInvalidationLogTable();
    await createCacheStatsTable();
    await createCacheConfigTable();
    
    console.log('\n✅ Cache database setup completed successfully!');
    console.log('=====================================');
    
    // Test database connection
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('cache_config')
      .select('id, config')
      .eq('id', 'default')
      .single();
    
    if (error) {
      console.error('❌ Database connection test failed:', error);
      throw error;
    }
    
    console.log('✅ Database connection test passed');
    console.log('📊 Default cache config loaded:', data.config);
    
  } catch (error) {
    console.error('❌ Cache database setup failed:', error);
    process.exit(1);
  }
}

// Additional utility functions
export async function dropCacheTables(): Promise<void> {
  console.log('🗑️ Dropping cache tables...');
  
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      DROP TABLE IF EXISTS cache_stats CASCADE;
      DROP TABLE IF EXISTS cache_invalidation_log CASCADE;
      DROP TABLE IF EXISTS cache_snapshots CASCADE;
      DROP TABLE IF EXISTS cache_config CASCADE;
      
      -- Drop functions
      DROP FUNCTION IF EXISTS update_cache_snapshots_updated_at() CASCADE;
      DROP FUNCTION IF EXISTS update_cache_config_updated_at() CASCADE;
    `
  });

  if (error) {
    console.error('Error dropping cache tables:', error);
    throw error;
  }

  console.log('✅ Cache tables dropped successfully');
}

export async function resetCacheDatabase(): Promise<void> {
  console.log('🔄 Resetting cache database...');
  
  await dropCacheTables();
  await setupCacheDatabase();
  
  console.log('✅ Cache database reset completed');
}

export async function getCacheTableStats(): Promise<void> {
  console.log('📊 Getting cache table statistics...');
  
  const supabase = getSupabaseAdmin();
  
  const tables = ['cache_snapshots', 'cache_invalidation_log', 'cache_stats', 'cache_config'];
  
  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error(`Error getting stats for ${table}:`, error);
        continue;
      }
      
      console.log(`📋 ${table}: ${count} rows`);
    } catch (error) {
      console.error(`Error querying ${table}:`, error);
    }
  }
}

// Run setup if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2];
  
  switch (command) {
    case 'drop':
      dropCacheTables().catch(console.error);
      break;
    case 'reset':
      resetCacheDatabase().catch(console.error);
      break;
    case 'stats':
      getCacheTableStats().catch(console.error);
      break;
    default:
      setupCacheDatabase().catch(console.error);
  }
}

export { setupCacheDatabase };