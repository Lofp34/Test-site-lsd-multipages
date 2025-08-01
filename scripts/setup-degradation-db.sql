-- Setup script pour les tables de dégradation gracieuse
-- Ce script crée les tables nécessaires pour le système de dégradation

-- Table pour enregistrer les changements de niveau de service
CREATE TABLE IF NOT EXISTS degradation_logs (
  id SERIAL PRIMARY KEY,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  previous_level TEXT NOT NULL CHECK (previous_level IN ('full', 'essential', 'minimal', 'fallback')),
  new_level TEXT NOT NULL CHECK (new_level IN ('full', 'essential', 'minimal', 'fallback')),
  reason TEXT NOT NULL,
  system_load JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour les requêtes par date
CREATE INDEX IF NOT EXISTS idx_degradation_logs_changed_at ON degradation_logs(changed_at DESC);
CREATE INDEX IF NOT EXISTS idx_degradation_logs_level ON degradation_logs(new_level);

-- Table pour l'historique des métriques système
CREATE TABLE IF NOT EXISTS system_metrics (
  id SERIAL PRIMARY KEY,
  measured_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  cpu_usage DECIMAL(5,2) NOT NULL CHECK (cpu_usage >= 0 AND cpu_usage <= 100),
  memory_usage DECIMAL(5,2) NOT NULL CHECK (memory_usage >= 0 AND memory_usage <= 100),
  vercel_usage DECIMAL(5,2) NOT NULL CHECK (vercel_usage >= 0 AND vercel_usage <= 100),
  error_rate DECIMAL(5,2) NOT NULL CHECK (error_rate >= 0),
  response_time INTEGER NOT NULL CHECK (response_time >= 0),
  active_connections INTEGER NOT NULL CHECK (active_connections >= 0),
  service_level TEXT NOT NULL CHECK (service_level IN ('full', 'essential', 'minimal', 'fallback')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour les requêtes par date et niveau de service
CREATE INDEX IF NOT EXISTS idx_system_metrics_measured_at ON system_metrics(measured_at DESC);
CREATE INDEX IF NOT EXISTS idx_system_metrics_service_level ON system_metrics(service_level);

-- Table pour l'état des circuit breakers
CREATE TABLE IF NOT EXISTS circuit_breaker_states (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  state TEXT NOT NULL CHECK (state IN ('CLOSED', 'OPEN', 'HALF_OPEN')),
  failure_count INTEGER NOT NULL DEFAULT 0 CHECK (failure_count >= 0),
  last_failure_time TIMESTAMPTZ,
  last_success_time TIMESTAMPTZ,
  next_retry_time TIMESTAMPTZ,
  threshold INTEGER NOT NULL DEFAULT 5 CHECK (threshold > 0),
  timeout_ms INTEGER NOT NULL DEFAULT 60000 CHECK (timeout_ms > 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour les requêtes par nom et état
CREATE INDEX IF NOT EXISTS idx_circuit_breaker_name ON circuit_breaker_states(name);
CREATE INDEX IF NOT EXISTS idx_circuit_breaker_state ON circuit_breaker_states(state);

-- Table pour l'historique des événements de circuit breaker
CREATE TABLE IF NOT EXISTS circuit_breaker_events (
  id SERIAL PRIMARY KEY,
  circuit_breaker_name TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('OPENED', 'CLOSED', 'HALF_OPENED', 'FAILURE', 'SUCCESS', 'TIMEOUT')),
  previous_state TEXT CHECK (previous_state IN ('CLOSED', 'OPEN', 'HALF_OPEN')),
  new_state TEXT CHECK (new_state IN ('CLOSED', 'OPEN', 'HALF_OPEN')),
  failure_count INTEGER,
  error_message TEXT,
  execution_time_ms INTEGER,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour les requêtes par circuit breaker et date
CREATE INDEX IF NOT EXISTS idx_circuit_breaker_events_name ON circuit_breaker_events(circuit_breaker_name);
CREATE INDEX IF NOT EXISTS idx_circuit_breaker_events_occurred_at ON circuit_breaker_events(occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_circuit_breaker_events_type ON circuit_breaker_events(event_type);

-- Table pour les notifications de dégradation
CREATE TABLE IF NOT EXISTS degradation_notifications (
  id SERIAL PRIMARY KEY,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('level_change', 'circuit_breaker', 'system_overload')),
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'critical')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  service_level TEXT CHECK (service_level IN ('full', 'essential', 'minimal', 'fallback')),
  circuit_breaker_name TEXT,
  system_load JSONB,
  sent_at TIMESTAMPTZ,
  delivery_status TEXT CHECK (delivery_status IN ('pending', 'sent', 'failed', 'skipped')),
  delivery_error TEXT,
  recipients TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour les requêtes par type et statut
CREATE INDEX IF NOT EXISTS idx_degradation_notifications_type ON degradation_notifications(notification_type);
CREATE INDEX IF NOT EXISTS idx_degradation_notifications_severity ON degradation_notifications(severity);
CREATE INDEX IF NOT EXISTS idx_degradation_notifications_status ON degradation_notifications(delivery_status);
CREATE INDEX IF NOT EXISTS idx_degradation_notifications_created_at ON degradation_notifications(created_at DESC);

-- Table pour la configuration de dégradation
CREATE TABLE IF NOT EXISTS degradation_config (
  id SERIAL PRIMARY KEY,
  config_key TEXT NOT NULL UNIQUE,
  config_value JSONB NOT NULL,
  description TEXT,
  updated_by TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insérer la configuration par défaut
INSERT INTO degradation_config (config_key, config_value, description) VALUES
('thresholds', '{
  "full": {
    "cpuUsage": 70,
    "memoryUsage": 70,
    "vercelUsage": 60,
    "errorRate": 2,
    "responseTime": 5000
  },
  "essential": {
    "cpuUsage": 85,
    "memoryUsage": 85,
    "vercelUsage": 75,
    "errorRate": 5,
    "responseTime": 10000
  },
  "minimal": {
    "cpuUsage": 95,
    "memoryUsage": 95,
    "vercelUsage": 90,
    "errorRate": 10,
    "responseTime": 15000
  },
  "fallback": {
    "cpuUsage": 100,
    "memoryUsage": 100,
    "vercelUsage": 95,
    "errorRate": 20,
    "responseTime": 30000
  }
}', 'Seuils de dégradation pour chaque niveau de service'),

('intervals', '{
  "checkInterval": 30000,
  "stabilityPeriod": 120000,
  "notificationCooldown": 300000
}', 'Intervalles de temps pour le système de dégradation'),

('circuit_breakers', '{
  "database": {"threshold": 3, "timeout": 30000},
  "vercel_api": {"threshold": 5, "timeout": 60000},
  "link_validation": {"threshold": 10, "timeout": 120000},
  "email_service": {"threshold": 3, "timeout": 300000}
}', 'Configuration des circuit breakers par service')

ON CONFLICT (config_key) DO NOTHING;

-- Vue pour les statistiques de dégradation
CREATE OR REPLACE VIEW degradation_stats AS
SELECT 
  DATE_TRUNC('hour', changed_at) as hour,
  new_level,
  COUNT(*) as change_count,
  AVG(CASE 
    WHEN system_load->>'cpuUsage' IS NOT NULL 
    THEN (system_load->>'cpuUsage')::DECIMAL 
    ELSE NULL 
  END) as avg_cpu_usage,
  AVG(CASE 
    WHEN system_load->>'memoryUsage' IS NOT NULL 
    THEN (system_load->>'memoryUsage')::DECIMAL 
    ELSE NULL 
  END) as avg_memory_usage,
  AVG(CASE 
    WHEN system_load->>'vercelUsage' IS NOT NULL 
    THEN (system_load->>'vercelUsage')::DECIMAL 
    ELSE NULL 
  END) as avg_vercel_usage
FROM degradation_logs 
WHERE changed_at >= NOW() - INTERVAL '24 hours'
GROUP BY DATE_TRUNC('hour', changed_at), new_level
ORDER BY hour DESC, new_level;

-- Vue pour l'état actuel des circuit breakers
CREATE OR REPLACE VIEW circuit_breaker_status AS
SELECT 
  cb.name,
  cb.state,
  cb.failure_count,
  cb.threshold,
  cb.last_failure_time,
  cb.last_success_time,
  cb.next_retry_time,
  cb.updated_at,
  CASE 
    WHEN cb.state = 'OPEN' AND cb.next_retry_time <= NOW() THEN 'ready_for_retry'
    WHEN cb.state = 'OPEN' THEN 'cooling_down'
    WHEN cb.failure_count >= cb.threshold * 0.8 THEN 'warning'
    ELSE 'healthy'
  END as health_status,
  recent_events.recent_failures
FROM circuit_breaker_states cb
LEFT JOIN (
  SELECT 
    circuit_breaker_name,
    COUNT(*) as recent_failures
  FROM circuit_breaker_events 
  WHERE event_type = 'FAILURE' 
    AND occurred_at >= NOW() - INTERVAL '1 hour'
  GROUP BY circuit_breaker_name
) recent_events ON cb.name = recent_events.circuit_breaker_name;

-- Vue pour les métriques système récentes
CREATE OR REPLACE VIEW recent_system_metrics AS
SELECT 
  measured_at,
  cpu_usage,
  memory_usage,
  vercel_usage,
  error_rate,
  response_time,
  active_connections,
  service_level,
  CASE 
    WHEN cpu_usage > 90 OR memory_usage > 90 OR vercel_usage > 90 THEN 'critical'
    WHEN cpu_usage > 80 OR memory_usage > 80 OR vercel_usage > 80 THEN 'warning'
    ELSE 'normal'
  END as load_status
FROM system_metrics 
WHERE measured_at >= NOW() - INTERVAL '1 hour'
ORDER BY measured_at DESC;

-- Fonction pour nettoyer les anciennes données
CREATE OR REPLACE FUNCTION cleanup_degradation_data(retention_days INTEGER DEFAULT 30)
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER := 0;
BEGIN
  -- Nettoyer les logs de dégradation anciens
  DELETE FROM degradation_logs 
  WHERE created_at < NOW() - (retention_days || ' days')::INTERVAL;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  -- Nettoyer les métriques système anciennes (garder seulement les données agrégées)
  DELETE FROM system_metrics 
  WHERE created_at < NOW() - (retention_days || ' days')::INTERVAL;
  
  -- Nettoyer les événements de circuit breaker anciens
  DELETE FROM circuit_breaker_events 
  WHERE created_at < NOW() - (retention_days || ' days')::INTERVAL;
  
  -- Nettoyer les notifications anciennes
  DELETE FROM degradation_notifications 
  WHERE created_at < NOW() - (retention_days || ' days')::INTERVAL;
  
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour obtenir le niveau de service recommandé
CREATE OR REPLACE FUNCTION get_recommended_service_level(
  p_cpu_usage DECIMAL,
  p_memory_usage DECIMAL,
  p_vercel_usage DECIMAL,
  p_error_rate DECIMAL,
  p_response_time INTEGER
)
RETURNS TEXT AS $$
DECLARE
  config_thresholds JSONB;
  level TEXT;
BEGIN
  -- Récupérer la configuration des seuils
  SELECT config_value INTO config_thresholds 
  FROM degradation_config 
  WHERE config_key = 'thresholds';
  
  -- Vérifier chaque niveau dans l'ordre
  FOR level IN SELECT unnest(ARRAY['full', 'essential', 'minimal', 'fallback']) LOOP
    IF p_cpu_usage <= (config_thresholds->level->>'cpuUsage')::DECIMAL
       AND p_memory_usage <= (config_thresholds->level->>'memoryUsage')::DECIMAL
       AND p_vercel_usage <= (config_thresholds->level->>'vercelUsage')::DECIMAL
       AND p_error_rate <= (config_thresholds->level->>'errorRate')::DECIMAL
       AND p_response_time <= (config_thresholds->level->>'responseTime')::INTEGER
    THEN
      RETURN level;
    END IF;
  END LOOP;
  
  -- Si aucun seuil n'est respecté, retourner fallback
  RETURN 'fallback';
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour automatiquement les timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer le trigger aux tables appropriées
DROP TRIGGER IF EXISTS update_circuit_breaker_states_updated_at ON circuit_breaker_states;
CREATE TRIGGER update_circuit_breaker_states_updated_at
  BEFORE UPDATE ON circuit_breaker_states
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_degradation_config_updated_at ON degradation_config;
CREATE TRIGGER update_degradation_config_updated_at
  BEFORE UPDATE ON degradation_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Commentaires sur les tables
COMMENT ON TABLE degradation_logs IS 'Historique des changements de niveau de service';
COMMENT ON TABLE system_metrics IS 'Métriques système collectées périodiquement';
COMMENT ON TABLE circuit_breaker_states IS 'État actuel des circuit breakers';
COMMENT ON TABLE circuit_breaker_events IS 'Historique des événements de circuit breaker';
COMMENT ON TABLE degradation_notifications IS 'Notifications de dégradation envoyées';
COMMENT ON TABLE degradation_config IS 'Configuration du système de dégradation';

-- Permissions (ajuster selon vos besoins)
-- GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO your_app_user;
-- GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO your_app_user;

COMMIT;