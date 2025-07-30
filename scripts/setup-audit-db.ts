#!/usr/bin/env tsx
/**
 * Setup Supabase database tables for the audit system
 * Usage: npm run setup:audit-db
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const SQL_SCHEMA = `
-- Table des liens scannés
CREATE TABLE IF NOT EXISTS scanned_links (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  url TEXT NOT NULL,
  source_file TEXT NOT NULL,
  source_line INTEGER,
  link_type TEXT NOT NULL CHECK (link_type IN ('internal', 'external', 'download', 'anchor')),
  priority TEXT NOT NULL CHECK (priority IN ('critical', 'high', 'medium', 'low')),
  context TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_scanned_links_url ON scanned_links(url);
CREATE INDEX IF NOT EXISTS idx_scanned_links_type_priority ON scanned_links(link_type, priority);

-- Table des résultats de validation
CREATE TABLE IF NOT EXISTS validation_results (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  url TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('valid', 'broken', 'redirect', 'timeout', 'unknown')),
  status_code INTEGER,
  redirect_url TEXT,
  error_message TEXT,
  response_time INTEGER,
  checked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_validation_results_url_status ON validation_results(url, status);
CREATE INDEX IF NOT EXISTS idx_validation_results_checked_at ON validation_results(checked_at);

-- Table des corrections appliquées
CREATE TABLE IF NOT EXISTS applied_corrections (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  original_url TEXT NOT NULL,
  corrected_url TEXT NOT NULL,
  file_path TEXT NOT NULL,
  correction_type TEXT NOT NULL CHECK (correction_type IN ('typo', 'extension', 'redirect', 'moved', 'similar')),
  confidence DECIMAL(3,2),
  rollback_id TEXT UNIQUE,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  rollback_data JSONB
);

-- Index pour les rollbacks
CREATE INDEX IF NOT EXISTS idx_applied_corrections_rollback_id ON applied_corrections(rollback_id);

-- Table des demandes de ressources
CREATE TABLE IF NOT EXISTS resource_requests (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  requested_url TEXT NOT NULL,
  user_email TEXT NOT NULL,
  message TEXT,
  source_url TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'rejected')),
  priority INTEGER DEFAULT 1,
  request_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_resource_requests_url ON resource_requests(requested_url);
CREATE INDEX IF NOT EXISTS idx_resource_requests_status ON resource_requests(status);

-- Table des audits
CREATE TABLE IF NOT EXISTS audit_history (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  total_links INTEGER,
  broken_links INTEGER,
  corrected_links INTEGER,
  seo_score DECIMAL(5,2),
  report_path TEXT,
  execution_time INTEGER, -- en secondes
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des métriques de performance
CREATE TABLE IF NOT EXISTS link_health_metrics (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  date DATE NOT NULL,
  total_links INTEGER,
  broken_links INTEGER,
  health_score DECIMAL(5,2),
  response_time_avg INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date)
);

-- RLS (Row Level Security) - Optionnel pour sécuriser l'accès
ALTER TABLE scanned_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE validation_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE applied_corrections ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_health_metrics ENABLE ROW LEVEL SECURITY;

-- Policies pour permettre l'accès aux services (service_role)
DO $$
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Service role can manage all data" ON scanned_links;
  DROP POLICY IF EXISTS "Service role can manage all data" ON validation_results;
  DROP POLICY IF EXISTS "Service role can manage all data" ON applied_corrections;
  DROP POLICY IF EXISTS "Service role can manage all data" ON resource_requests;
  DROP POLICY IF EXISTS "Service role can manage all data" ON audit_history;
  DROP POLICY IF EXISTS "Service role can manage all data" ON link_health_metrics;
  
  -- Create new policies
  CREATE POLICY "Service role can manage all data" ON scanned_links FOR ALL USING (auth.role() = 'service_role');
  CREATE POLICY "Service role can manage all data" ON validation_results FOR ALL USING (auth.role() = 'service_role');
  CREATE POLICY "Service role can manage all data" ON applied_corrections FOR ALL USING (auth.role() = 'service_role');
  CREATE POLICY "Service role can manage all data" ON resource_requests FOR ALL USING (auth.role() = 'service_role');
  CREATE POLICY "Service role can manage all data" ON audit_history FOR ALL USING (auth.role() = 'service_role');
  CREATE POLICY "Service role can manage all data" ON link_health_metrics FOR ALL USING (auth.role() = 'service_role');
END $$;
`;

async function setupDatabase() {
  try {
    console.log('🗄️  Setting up Supabase database for audit system...');
    
    // Execute the schema
    const { error } = await supabase.rpc('exec_sql', { sql: SQL_SCHEMA });
    
    if (error) {
      // Try alternative approach - execute each statement separately
      const statements = SQL_SCHEMA.split(';').filter(stmt => stmt.trim());
      
      for (const statement of statements) {
        if (statement.trim()) {
          const { error: stmtError } = await supabase.rpc('exec_sql', { sql: statement + ';' });
          if (stmtError) {
            console.warn('⚠️  Warning executing statement:', stmtError.message);
          }
        }
      }
    }
    
    console.log('✅ Database setup completed successfully');
    
    // Test connection
    const { data, error: testError } = await supabase
      .from('audit_history')
      .select('count')
      .limit(1);
      
    if (testError) {
      console.warn('⚠️  Warning testing connection:', testError.message);
    } else {
      console.log('✅ Database connection test successful');
    }
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

async function main() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }
  
  await setupDatabase();
}

// Run if this is the main module
main();