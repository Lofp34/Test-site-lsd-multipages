-- Setup database tables for continuous monitoring system
-- This script creates the necessary tables for storing monitoring metrics,
-- alert logs, and fallback activations

-- Table for storing monitoring metrics
CREATE TABLE IF NOT EXISTS monitoring_metrics (
    id BIGSERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Vercel usage metrics
    vercel_invocations INTEGER NOT NULL DEFAULT 0,
    vercel_compute_hours DECIMAL(10,3) NOT NULL DEFAULT 0,
    vercel_percentage_used DECIMAL(5,2) NOT NULL DEFAULT 0,
    vercel_projected_monthly INTEGER NOT NULL DEFAULT 0,
    
    -- Performance metrics
    average_response_time INTEGER NOT NULL DEFAULT 0, -- in milliseconds
    error_rate DECIMAL(5,2) NOT NULL DEFAULT 0, -- percentage
    memory_usage INTEGER NOT NULL DEFAULT 0, -- in MB
    slow_functions_count INTEGER NOT NULL DEFAULT 0,
    
    -- System health status
    vercel_status VARCHAR(20) NOT NULL DEFAULT 'unknown' CHECK (vercel_status IN ('healthy', 'warning', 'critical', 'unknown')),
    database_status VARCHAR(20) NOT NULL DEFAULT 'unknown' CHECK (database_status IN ('healthy', 'slow', 'unhealthy', 'unknown')),
    fallback_status VARCHAR(20) NOT NULL DEFAULT 'ready' CHECK (fallback_status IN ('ready', 'active', 'failed')),
    last_audit_time TIMESTAMPTZ,
    
    -- Alert metrics
    active_alerts INTEGER NOT NULL DEFAULT 0,
    critical_alerts INTEGER NOT NULL DEFAULT 0,
    alerts_sent_today INTEGER NOT NULL DEFAULT 0,
    
    -- Additional metadata
    metadata JSONB,
    
    CONSTRAINT monitoring_metrics_timestamp_idx UNIQUE (timestamp)
);

-- Index for efficient time-based queries
CREATE INDEX IF NOT EXISTS idx_monitoring_metrics_timestamp ON monitoring_metrics (timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_monitoring_metrics_vercel_status ON monitoring_metrics (vercel_status);
CREATE INDEX IF NOT EXISTS idx_monitoring_metrics_fallback_status ON monitoring_metrics (fallback_status);

-- Table for storing alert logs
CREATE TABLE IF NOT EXISTS monitoring_alerts (
    id BIGSERIAL PRIMARY KEY,
    alert_id VARCHAR(100) NOT NULL,
    alert_name VARCHAR(255) NOT NULL,
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('info', 'warning', 'error', 'critical')),
    message TEXT NOT NULL,
    triggered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    
    -- Associated metrics at the time of alert
    metrics_snapshot JSONB,
    
    -- Alert rule information
    rule_id VARCHAR(100),
    cooldown_minutes INTEGER DEFAULT 30,
    
    -- Notification status
    notification_sent BOOLEAN DEFAULT FALSE,
    notification_method VARCHAR(50), -- 'email', 'slack', 'webhook'
    notification_error TEXT,
    
    -- Resolution information
    resolved_by VARCHAR(100),
    resolution_notes TEXT,
    
    CONSTRAINT monitoring_alerts_alert_id_triggered_at_idx UNIQUE (alert_id, triggered_at)
);

-- Indexes for alert queries
CREATE INDEX IF NOT EXISTS idx_monitoring_alerts_triggered_at ON monitoring_alerts (triggered_at DESC);
CREATE INDEX IF NOT EXISTS idx_monitoring_alerts_severity ON monitoring_alerts (severity);
CREATE INDEX IF NOT EXISTS idx_monitoring_alerts_resolved ON monitoring_alerts (resolved_at) WHERE resolved_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_monitoring_alerts_rule_id ON monitoring_alerts (rule_id);

-- Table for storing fallback activation logs
CREATE TABLE IF NOT EXISTS fallback_logs (
    id BIGSERIAL PRIMARY KEY,
    activated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deactivated_at TIMESTAMPTZ,
    
    -- Fallback details
    fallback_type VARCHAR(50) NOT NULL DEFAULT 'github_actions',
    trigger_reason TEXT NOT NULL,
    activation_method VARCHAR(50) NOT NULL DEFAULT 'automatic', -- 'automatic', 'manual'
    
    -- GitHub Actions details
    github_run_id BIGINT,
    workflow_name VARCHAR(255),
    workflow_url TEXT,
    
    -- System status at activation
    vercel_status VARCHAR(20),
    system_health JSONB,
    
    -- Activation result
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'activated', 'failed', 'completed')),
    error_message TEXT,
    
    -- Performance metrics
    activation_duration_ms INTEGER,
    success_rate DECIMAL(5,2),
    
    -- Additional metadata
    metadata JSONB
);

-- Indexes for fallback logs
CREATE INDEX IF NOT EXISTS idx_fallback_logs_activated_at ON fallback_logs (activated_at DESC);
CREATE INDEX IF NOT EXISTS idx_fallback_logs_status ON fallback_logs (status);
CREATE INDEX IF NOT EXISTS idx_fallback_logs_github_run_id ON fallback_logs (github_run_id) WHERE github_run_id IS NOT NULL;

-- Table for storing monitoring reports
CREATE TABLE IF NOT EXISTS monitoring_reports (
    id BIGSERIAL PRIMARY KEY,
    report_type VARCHAR(20) NOT NULL CHECK (report_type IN ('daily', 'weekly', 'monthly')),
    generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    period_start TIMESTAMPTZ NOT NULL,
    period_end TIMESTAMPTZ NOT NULL,
    
    -- Report data
    report_data JSONB NOT NULL,
    
    -- Delivery status
    sent_to VARCHAR(255),
    sent_at TIMESTAMPTZ,
    delivery_status VARCHAR(20) DEFAULT 'pending' CHECK (delivery_status IN ('pending', 'sent', 'failed')),
    delivery_error TEXT,
    
    -- Report metrics
    metrics_count INTEGER DEFAULT 0,
    alerts_count INTEGER DEFAULT 0,
    fallback_activations INTEGER DEFAULT 0,
    
    CONSTRAINT monitoring_reports_type_period_idx UNIQUE (report_type, period_start, period_end)
);

-- Indexes for reports
CREATE INDEX IF NOT EXISTS idx_monitoring_reports_generated_at ON monitoring_reports (generated_at DESC);
CREATE INDEX IF NOT EXISTS idx_monitoring_reports_type ON monitoring_reports (report_type);
CREATE INDEX IF NOT EXISTS idx_monitoring_reports_delivery_status ON monitoring_reports (delivery_status);

-- Table for storing alert rules configuration
CREATE TABLE IF NOT EXISTS monitoring_alert_rules (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Rule configuration
    condition_type VARCHAR(50) NOT NULL, -- 'threshold', 'trend', 'custom'
    condition_config JSONB NOT NULL,
    
    -- Alert settings
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('info', 'warning', 'error', 'critical')),
    message_template TEXT NOT NULL,
    cooldown_minutes INTEGER NOT NULL DEFAULT 30,
    
    -- Rule status
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_triggered TIMESTAMPTZ,
    trigger_count INTEGER NOT NULL DEFAULT 0,
    
    -- Notification settings
    notification_channels JSONB, -- ['email', 'slack', 'webhook']
    notification_config JSONB
);

-- Indexes for alert rules
CREATE INDEX IF NOT EXISTS idx_monitoring_alert_rules_enabled ON monitoring_alert_rules (enabled);
CREATE INDEX IF NOT EXISTS idx_monitoring_alert_rules_severity ON monitoring_alert_rules (severity);
CREATE INDEX IF NOT EXISTS idx_monitoring_alert_rules_last_triggered ON monitoring_alert_rules (last_triggered DESC);

-- Table for storing sync metrics between systems
CREATE TABLE IF NOT EXISTS sync_metrics (
    id VARCHAR(100) PRIMARY KEY,
    last_sync TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
    
    -- Sync details
    sync_type VARCHAR(50) NOT NULL, -- 'fallback_sync', 'metrics_sync', 'config_sync'
    source_system VARCHAR(50) NOT NULL,
    target_system VARCHAR(50) NOT NULL,
    
    -- Sync results
    records_processed INTEGER DEFAULT 0,
    records_synced INTEGER DEFAULT 0,
    errors_count INTEGER DEFAULT 0,
    
    -- Performance metrics
    duration_ms INTEGER,
    data_size_bytes BIGINT,
    
    -- Error details
    error_message TEXT,
    error_details JSONB,
    
    -- Metadata
    metadata JSONB
);

-- Indexes for sync metrics
CREATE INDEX IF NOT EXISTS idx_sync_metrics_last_sync ON sync_metrics (last_sync DESC);
CREATE INDEX IF NOT EXISTS idx_sync_metrics_status ON sync_metrics (status);
CREATE INDEX IF NOT EXISTS idx_sync_metrics_sync_type ON sync_metrics (sync_type);

-- Create a view for monitoring dashboard
CREATE OR REPLACE VIEW monitoring_dashboard_view AS
SELECT 
    -- Latest metrics
    m.timestamp as last_update,
    m.vercel_invocations,
    m.vercel_compute_hours,
    m.vercel_percentage_used,
    m.vercel_status,
    m.database_status,
    m.fallback_status,
    m.average_response_time,
    m.error_rate,
    m.memory_usage,
    
    -- Alert counts
    (SELECT COUNT(*) FROM monitoring_alerts WHERE resolved_at IS NULL) as active_alerts,
    (SELECT COUNT(*) FROM monitoring_alerts WHERE severity = 'critical' AND resolved_at IS NULL) as critical_alerts,
    (SELECT COUNT(*) FROM monitoring_alerts WHERE triggered_at >= CURRENT_DATE) as alerts_today,
    
    -- Fallback status
    (SELECT COUNT(*) FROM fallback_logs WHERE status = 'activated' AND deactivated_at IS NULL) as active_fallbacks,
    (SELECT MAX(activated_at) FROM fallback_logs) as last_fallback_activation,
    
    -- System health trends (last 24h)
    (SELECT AVG(vercel_percentage_used) FROM monitoring_metrics WHERE timestamp >= NOW() - INTERVAL '24 hours') as avg_usage_24h,
    (SELECT MAX(vercel_percentage_used) FROM monitoring_metrics WHERE timestamp >= NOW() - INTERVAL '24 hours') as max_usage_24h,
    (SELECT AVG(average_response_time) FROM monitoring_metrics WHERE timestamp >= NOW() - INTERVAL '24 hours') as avg_response_time_24h
    
FROM monitoring_metrics m
WHERE m.timestamp = (SELECT MAX(timestamp) FROM monitoring_metrics)
LIMIT 1;

-- Create a function to clean up old monitoring data
CREATE OR REPLACE FUNCTION cleanup_monitoring_data(retention_days INTEGER DEFAULT 30)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER := 0;
    cutoff_date TIMESTAMPTZ;
BEGIN
    cutoff_date := NOW() - (retention_days || ' days')::INTERVAL;
    
    -- Clean up old metrics (keep daily aggregates)
    WITH daily_aggregates AS (
        SELECT 
            DATE_TRUNC('day', timestamp) as day,
            MIN(id) as keep_id
        FROM monitoring_metrics 
        WHERE timestamp < cutoff_date
        GROUP BY DATE_TRUNC('day', timestamp)
    )
    DELETE FROM monitoring_metrics 
    WHERE timestamp < cutoff_date 
    AND id NOT IN (SELECT keep_id FROM daily_aggregates);
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    -- Clean up resolved alerts older than retention period
    DELETE FROM monitoring_alerts 
    WHERE resolved_at IS NOT NULL 
    AND resolved_at < cutoff_date;
    
    -- Clean up completed fallback logs older than retention period
    DELETE FROM fallback_logs 
    WHERE status = 'completed' 
    AND deactivated_at < cutoff_date;
    
    -- Clean up old reports
    DELETE FROM monitoring_reports 
    WHERE generated_at < cutoff_date;
    
    -- Clean up old sync metrics
    DELETE FROM sync_metrics 
    WHERE last_sync < cutoff_date 
    AND status IN ('completed', 'failed');
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Create a function to get system health summary
CREATE OR REPLACE FUNCTION get_system_health_summary()
RETURNS TABLE (
    overall_status VARCHAR(20),
    vercel_usage_percent DECIMAL(5,2),
    last_audit_hours_ago DECIMAL(5,2),
    active_alerts INTEGER,
    fallback_active BOOLEAN,
    recommendations TEXT[]
) AS $$
DECLARE
    latest_metrics RECORD;
    health_status VARCHAR(20) := 'healthy';
    recommendations_array TEXT[] := ARRAY[]::TEXT[];
BEGIN
    -- Get latest metrics
    SELECT * INTO latest_metrics
    FROM monitoring_metrics 
    ORDER BY timestamp DESC 
    LIMIT 1;
    
    IF latest_metrics IS NULL THEN
        RETURN QUERY SELECT 'unknown'::VARCHAR(20), 0::DECIMAL(5,2), 0::DECIMAL(5,2), 0, FALSE, ARRAY['No monitoring data available']::TEXT[];
        RETURN;
    END IF;
    
    -- Determine overall status
    IF latest_metrics.vercel_status = 'critical' OR latest_metrics.database_status = 'unhealthy' THEN
        health_status := 'critical';
    ELSIF latest_metrics.vercel_status = 'warning' OR latest_metrics.database_status = 'slow' THEN
        health_status := 'warning';
    END IF;
    
    -- Generate recommendations
    IF latest_metrics.vercel_percentage_used > 80 THEN
        recommendations_array := array_append(recommendations_array, 'Consider upgrading to Vercel Pro plan');
    END IF;
    
    IF latest_metrics.average_response_time > 3000 THEN
        recommendations_array := array_append(recommendations_array, 'Optimize function performance and response times');
    END IF;
    
    IF latest_metrics.error_rate > 3 THEN
        recommendations_array := array_append(recommendations_array, 'Investigate and fix recurring errors');
    END IF;
    
    IF latest_metrics.database_status = 'slow' THEN
        recommendations_array := array_append(recommendations_array, 'Optimize database queries and indexes');
    END IF;
    
    RETURN QUERY SELECT 
        health_status,
        latest_metrics.vercel_percentage_used,
        CASE 
            WHEN latest_metrics.last_audit_time IS NOT NULL 
            THEN EXTRACT(EPOCH FROM (NOW() - latest_metrics.last_audit_time)) / 3600
            ELSE NULL 
        END,
        (SELECT COUNT(*)::INTEGER FROM monitoring_alerts WHERE resolved_at IS NULL),
        latest_metrics.fallback_status = 'active',
        CASE 
            WHEN array_length(recommendations_array, 1) IS NULL 
            THEN ARRAY['System operating normally']::TEXT[]
            ELSE recommendations_array 
        END;
END;
$$ LANGUAGE plpgsql;

-- Insert default alert rules
INSERT INTO monitoring_alert_rules (id, name, description, condition_type, condition_config, severity, message_template, cooldown_minutes, enabled) VALUES
('vercel_usage_warning', 'Vercel Usage Warning', 'Alert when Vercel usage exceeds 70%', 'threshold', '{"metric": "vercel_percentage_used", "operator": ">=", "value": 70}', 'warning', 'Vercel usage at {vercel_percentage_used}% (threshold: 70%)', 60, TRUE),
('vercel_usage_error', 'Vercel Usage Error', 'Alert when Vercel usage exceeds 80%', 'threshold', '{"metric": "vercel_percentage_used", "operator": ">=", "value": 80}', 'error', 'Vercel usage critical at {vercel_percentage_used}% (threshold: 80%)', 30, TRUE),
('vercel_usage_critical', 'Vercel Usage Critical', 'Alert when Vercel usage exceeds 90%', 'threshold', '{"metric": "vercel_percentage_used", "operator": ">=", "value": 90}', 'critical', 'Vercel usage CRITICAL at {vercel_percentage_used}% (threshold: 90%) - Risk of service interruption', 15, TRUE),
('high_response_time', 'High Response Time', 'Alert when average response time exceeds 5 seconds', 'threshold', '{"metric": "average_response_time", "operator": ">", "value": 5000}', 'warning', 'High response time: {average_response_time}ms (threshold: 5000ms)', 30, TRUE),
('high_error_rate', 'High Error Rate', 'Alert when error rate exceeds 5%', 'threshold', '{"metric": "error_rate", "operator": ">", "value": 5}', 'error', 'High error rate: {error_rate}% (threshold: 5%)', 15, TRUE),
('database_unhealthy', 'Database Unhealthy', 'Alert when database is inaccessible', 'threshold', '{"metric": "database_status", "operator": "=", "value": "unhealthy"}', 'critical', 'Database inaccessible - Immediate intervention required', 10, TRUE),
('fallback_active', 'Fallback System Active', 'Alert when fallback system is active', 'threshold', '{"metric": "fallback_status", "operator": "=", "value": "active"}', 'error', 'GitHub Actions fallback system is active - Vercel may be down', 30, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_monitoring_metrics_vercel_percentage ON monitoring_metrics (vercel_percentage_used);
CREATE INDEX IF NOT EXISTS idx_monitoring_metrics_response_time ON monitoring_metrics (average_response_time);
CREATE INDEX IF NOT EXISTS idx_monitoring_metrics_error_rate ON monitoring_metrics (error_rate);

-- Add comments for documentation
COMMENT ON TABLE monitoring_metrics IS 'Stores real-time monitoring metrics for the Vercel optimization system';
COMMENT ON TABLE monitoring_alerts IS 'Logs all alerts triggered by the monitoring system';
COMMENT ON TABLE fallback_logs IS 'Tracks activation and deactivation of fallback systems';
COMMENT ON TABLE monitoring_reports IS 'Stores generated monitoring reports (daily, weekly, monthly)';
COMMENT ON TABLE monitoring_alert_rules IS 'Configuration for monitoring alert rules';
COMMENT ON TABLE sync_metrics IS 'Tracks synchronization between different systems';

COMMENT ON VIEW monitoring_dashboard_view IS 'Provides a real-time view of system health for dashboards';
COMMENT ON FUNCTION cleanup_monitoring_data IS 'Cleans up old monitoring data while preserving daily aggregates';
COMMENT ON FUNCTION get_system_health_summary IS 'Returns a comprehensive system health summary with recommendations';

-- Grant necessary permissions (adjust as needed for your setup)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO monitoring_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO monitoring_user;
-- GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO monitoring_user;