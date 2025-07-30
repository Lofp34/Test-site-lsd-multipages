-- Database schema for the audit system
-- This file contains all the SQL commands to set up the Supabase database

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
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role can manage scanned_links') THEN
        CREATE POLICY "Service role can manage scanned_links" ON scanned_links FOR ALL USING (auth.role() = 'service_role');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role can manage validation_results') THEN
        CREATE POLICY "Service role can manage validation_results" ON validation_results FOR ALL USING (auth.role() = 'service_role');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role can manage applied_corrections') THEN
        CREATE POLICY "Service role can manage applied_corrections" ON applied_corrections FOR ALL USING (auth.role() = 'service_role');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role can manage resource_requests') THEN
        CREATE POLICY "Service role can manage resource_requests" ON resource_requests FOR ALL USING (auth.role() = 'service_role');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role can manage audit_history') THEN
        CREATE POLICY "Service role can manage audit_history" ON audit_history FOR ALL USING (auth.role() = 'service_role');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role can manage link_health_metrics') THEN
        CREATE POLICY "Service role can manage link_health_metrics" ON link_health_metrics FOR ALL USING (auth.role() = 'service_role');
    END IF;
END $$;