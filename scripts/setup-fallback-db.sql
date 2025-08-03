-- Script de création des tables pour le système de fallback
-- À exécuter dans Supabase SQL Editor

-- Table pour enregistrer les activations de fallback
CREATE TABLE IF NOT EXISTS fallback_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reason TEXT NOT NULL,
  fallback_type VARCHAR(50) NOT NULL DEFAULT 'github_actions',
  status VARCHAR(20) NOT NULL DEFAULT 'activated',
  resolved_at TIMESTAMPTZ,
  resolution_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table pour les métriques de synchronisation
CREATE TABLE IF NOT EXISTS sync_metrics (
  id VARCHAR(50) PRIMARY KEY,
  last_sync TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  sync_duration_ms INTEGER,
  data_size_bytes INTEGER,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table pour l'historique de santé du système
CREATE TABLE IF NOT EXISTS system_health_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  check_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  vercel_api_status VARCHAR(20) NOT NULL,
  vercel_crons_status VARCHAR(20) NOT NULL,
  database_status VARCHAR(20) NOT NULL,
  last_audit_time TIMESTAMPTZ,
  time_since_last_audit_hours DECIMAL(5,2),
  overall_health_score INTEGER NOT NULL DEFAULT 100,
  needs_attention BOOLEAN NOT NULL DEFAULT FALSE,
  severity VARCHAR(20) NOT NULL DEFAULT 'info',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_fallback_logs_activated_at ON fallback_logs(activated_at DESC);
CREATE INDEX IF NOT EXISTS idx_fallback_logs_status ON fallback_logs(status);
CREATE INDEX IF NOT EXISTS idx_sync_metrics_last_sync ON sync_metrics(last_sync DESC);
CREATE INDEX IF NOT EXISTS idx_system_health_check_time ON system_health_history(check_time DESC);
CREATE INDEX IF NOT EXISTS idx_system_health_needs_attention ON system_health_history(needs_attention, severity);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_fallback_logs_updated_at 
  BEFORE UPDATE ON fallback_logs 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sync_metrics_updated_at 
  BEFORE UPDATE ON sync_metrics 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Politique de sécurité RLS (Row Level Security)
ALTER TABLE fallback_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_health_history ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'accès avec la clé de service
CREATE POLICY "Service role can manage fallback_logs" ON fallback_logs
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage sync_metrics" ON sync_metrics
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage system_health_history" ON system_health_history
  FOR ALL USING (auth.role() = 'service_role');

-- Vue pour les statistiques de fallback
CREATE OR REPLACE VIEW fallback_stats AS
SELECT 
  COUNT(*) as total_activations,
  COUNT(CASE WHEN status = 'activated' THEN 1 END) as active_fallbacks,
  COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved_fallbacks,
  AVG(EXTRACT(EPOCH FROM (resolved_at - activated_at))/60) as avg_resolution_time_minutes,
  MAX(activated_at) as last_activation,
  COUNT(CASE WHEN activated_at > NOW() - INTERVAL '24 hours' THEN 1 END) as activations_last_24h,
  COUNT(CASE WHEN activated_at > NOW() - INTERVAL '7 days' THEN 1 END) as activations_last_week
FROM fallback_logs;

-- Vue pour l'historique de santé récent
CREATE OR REPLACE VIEW recent_system_health AS
SELECT 
  check_time,
  vercel_api_status,
  vercel_crons_status,
  database_status,
  overall_health_score,
  needs_attention,
  severity,
  time_since_last_audit_hours
FROM system_health_history
WHERE check_time > NOW() - INTERVAL '7 days'
ORDER BY check_time DESC;

-- Fonction pour nettoyer les anciens logs (à appeler périodiquement)
CREATE OR REPLACE FUNCTION cleanup_old_fallback_data()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER := 0;
BEGIN
  -- Supprimer les logs de fallback résolus de plus de 90 jours
  DELETE FROM fallback_logs 
  WHERE status = 'resolved' 
    AND resolved_at < NOW() - INTERVAL '90 days';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  -- Supprimer l'historique de santé de plus de 30 jours
  DELETE FROM system_health_history 
  WHERE check_time < NOW() - INTERVAL '30 days';
  
  -- Nettoyer les métriques de sync anciennes (garder seulement les 100 dernières)
  DELETE FROM sync_metrics 
  WHERE id NOT IN (
    SELECT id FROM sync_metrics 
    ORDER BY last_sync DESC 
    LIMIT 100
  );
  
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Commentaires pour la documentation
COMMENT ON TABLE fallback_logs IS 'Enregistre les activations du système de fallback GitHub Actions';
COMMENT ON TABLE sync_metrics IS 'Métriques de synchronisation entre Vercel et GitHub Actions';
COMMENT ON TABLE system_health_history IS 'Historique des vérifications de santé du système';
COMMENT ON VIEW fallback_stats IS 'Statistiques agrégées des activations de fallback';
COMMENT ON VIEW recent_system_health IS 'Historique récent de la santé du système (7 derniers jours)';
COMMENT ON FUNCTION cleanup_old_fallback_data() IS 'Nettoie les anciennes données de fallback pour optimiser les performances';

-- Insérer une entrée initiale dans sync_metrics
INSERT INTO sync_metrics (id, status) 
VALUES ('fallback_sync', 'initialized')
ON CONFLICT (id) DO NOTHING;

-- Message de confirmation
SELECT 'Base de données du système de fallback initialisée avec succès!' as message;