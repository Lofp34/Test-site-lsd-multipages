#!/usr/bin/env tsx

/**
 * Script de configuration du monitoring pour les corrections déployées
 * 
 * Ce script configure :
 * - Les tables de monitoring dans Supabase
 * - Les triggers et fonctions de surveillance
 * - Les cron jobs pour les vérifications automatiques
 * - Les seuils d'alerte personnalisés
 */

import { createClient } from '@supabase/supabase-js';
import { getAlertManager } from '../src/lib/audit/alert-manager';

interface MonitoringSetupResult {
  success: boolean;
  errors: string[];
  warnings: string[];
  tablesCreated: string[];
  triggersCreated: string[];
}

class MonitoringSetup {
  private supabase: any;
  private alertManager: any;

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );
    this.alertManager = getAlertManager();
  }

  async setup(): Promise<MonitoringSetupResult> {
    const result: MonitoringSetupResult = {
      success: false,
      errors: [],
      warnings: [],
      tablesCreated: [],
      triggersCreated: []
    };

    console.log('🔧 Configuration du monitoring des corrections...');

    try {
      // 1. Créer les tables de monitoring
      await this.createMonitoringTables(result);

      // 2. Configurer les triggers de surveillance
      await this.setupMonitoringTriggers(result);

      // 3. Initialiser les données de base
      await this.initializeBaseData(result);

      // 4. Configurer les alertes
      await this.configureAlerts(result);

      // 5. Programmer les tâches automatiques
      await this.scheduleAutomaticTasks(result);

      result.success = result.errors.length === 0;

      if (result.success) {
        console.log('✅ Configuration du monitoring terminée avec succès !');
      } else {
        console.log('❌ Configuration du monitoring échouée');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      result.errors.push(errorMessage);
      console.error('❌ Erreur critique:', errorMessage);
    }

    return result;
  }

  /**
   * Créer les tables de monitoring
   */
  private async createMonitoringTables(result: MonitoringSetupResult): Promise<void> {
    console.log('📊 Création des tables de monitoring...');

    const tables = [
      {
        name: 'corrections_monitoring',
        sql: `
          CREATE TABLE IF NOT EXISTS corrections_monitoring (
            id BIGSERIAL PRIMARY KEY,
            correction_type VARCHAR(50) NOT NULL,
            url VARCHAR(500) NOT NULL,
            status VARCHAR(20) NOT NULL DEFAULT 'active',
            last_checked TIMESTAMPTZ DEFAULT NOW(),
            response_time INTEGER,
            status_code INTEGER,
            error_message TEXT,
            metadata JSONB DEFAULT '{}',
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
          );
        `
      },
      {
        name: 'resource_pages_metrics',
        sql: `
          CREATE TABLE IF NOT EXISTS resource_pages_metrics (
            id BIGSERIAL PRIMARY KEY,
            page_url VARCHAR(500) NOT NULL,
            page_title VARCHAR(200) NOT NULL,
            visits INTEGER DEFAULT 0,
            form_submissions INTEGER DEFAULT 0,
            conversion_rate DECIMAL(5,2) DEFAULT 0,
            avg_time_on_page INTEGER DEFAULT 0,
            bounce_rate DECIMAL(5,2) DEFAULT 0,
            date DATE NOT NULL DEFAULT CURRENT_DATE,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW(),
            UNIQUE(page_url, date)
          );
        `
      },
      {
        name: 'form_monitoring',
        sql: `
          CREATE TABLE IF NOT EXISTS form_monitoring (
            id BIGSERIAL PRIMARY KEY,
            form_type VARCHAR(50) NOT NULL,
            page_url VARCHAR(500) NOT NULL,
            submission_count INTEGER DEFAULT 0,
            success_count INTEGER DEFAULT 0,
            error_count INTEGER DEFAULT 0,
            avg_response_time INTEGER DEFAULT 0,
            last_error TEXT,
            date DATE NOT NULL DEFAULT CURRENT_DATE,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW(),
            UNIQUE(form_type, page_url, date)
          );
        `
      },
      {
        name: 'deployment_history',
        sql: `
          CREATE TABLE IF NOT EXISTS deployment_history (
            id BIGSERIAL PRIMARY KEY,
            version VARCHAR(20) NOT NULL,
            deployment_url VARCHAR(500),
            changes JSONB NOT NULL DEFAULT '[]',
            deployment_log JSONB DEFAULT '[]',
            success BOOLEAN NOT NULL DEFAULT true,
            deployed_by VARCHAR(100),
            created_at TIMESTAMPTZ DEFAULT NOW()
          );
        `
      },
      {
        name: 'monitoring_config',
        sql: `
          CREATE TABLE IF NOT EXISTS monitoring_config (
            id BIGSERIAL PRIMARY KEY,
            config_type VARCHAR(50) NOT NULL UNIQUE,
            config_data JSONB NOT NULL DEFAULT '{}',
            enabled BOOLEAN DEFAULT true,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
          );
        `
      }
    ];

    for (const table of tables) {
      try {
        const { error } = await this.supabase.rpc('exec_sql', { sql: table.sql });
        
        if (error) {
          if (error.message.includes('already exists')) {
            result.warnings.push(`Table ${table.name} existe déjà`);
          } else {
            result.errors.push(`Erreur création table ${table.name}: ${error.message}`);
          }
        } else {
          result.tablesCreated.push(table.name);
          console.log(`✅ Table créée: ${table.name}`);
        }
      } catch (error) {
        result.errors.push(`Erreur création table ${table.name}: ${error}`);
      }
    }
  }

  /**
   * Configurer les triggers de surveillance
   */
  private async setupMonitoringTriggers(result: MonitoringSetupResult): Promise<void> {
    console.log('⚡ Configuration des triggers de surveillance...');

    const triggers = [
      {
        name: 'update_corrections_monitoring_timestamp',
        sql: `
          CREATE OR REPLACE FUNCTION update_corrections_monitoring_timestamp()
          RETURNS TRIGGER AS $$
          BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
          END;
          $$ LANGUAGE plpgsql;

          DROP TRIGGER IF EXISTS update_corrections_monitoring_timestamp ON corrections_monitoring;
          CREATE TRIGGER update_corrections_monitoring_timestamp
            BEFORE UPDATE ON corrections_monitoring
            FOR EACH ROW EXECUTE FUNCTION update_corrections_monitoring_timestamp();
        `
      },
      {
        name: 'update_resource_pages_metrics_timestamp',
        sql: `
          CREATE OR REPLACE FUNCTION update_resource_pages_metrics_timestamp()
          RETURNS TRIGGER AS $$
          BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
          END;
          $$ LANGUAGE plpgsql;

          DROP TRIGGER IF EXISTS update_resource_pages_metrics_timestamp ON resource_pages_metrics;
          CREATE TRIGGER update_resource_pages_metrics_timestamp
            BEFORE UPDATE ON resource_pages_metrics
            FOR EACH ROW EXECUTE FUNCTION update_resource_pages_metrics_timestamp();
        `
      },
      {
        name: 'alert_on_broken_correction',
        sql: `
          CREATE OR REPLACE FUNCTION alert_on_broken_correction()
          RETURNS TRIGGER AS $$
          BEGIN
            -- Déclencher une alerte si un lien corrigé devient cassé
            IF NEW.status = 'broken' AND OLD.status != 'broken' THEN
              INSERT INTO audit_alerts (alert_type, message, severity, metadata)
              VALUES (
                'broken_correction',
                'Lien corrigé cassé détecté: ' || NEW.url,
                'critical',
                jsonb_build_object(
                  'url', NEW.url,
                  'correction_type', NEW.correction_type,
                  'status_code', NEW.status_code,
                  'error_message', NEW.error_message
                )
              );
            END IF;
            RETURN NEW;
          END;
          $$ LANGUAGE plpgsql;

          DROP TRIGGER IF EXISTS alert_on_broken_correction ON corrections_monitoring;
          CREATE TRIGGER alert_on_broken_correction
            AFTER UPDATE ON corrections_monitoring
            FOR EACH ROW EXECUTE FUNCTION alert_on_broken_correction();
        `
      }
    ];

    for (const trigger of triggers) {
      try {
        const { error } = await this.supabase.rpc('exec_sql', { sql: trigger.sql });
        
        if (error) {
          result.errors.push(`Erreur création trigger ${trigger.name}: ${error.message}`);
        } else {
          result.triggersCreated.push(trigger.name);
          console.log(`✅ Trigger créé: ${trigger.name}`);
        }
      } catch (error) {
        result.errors.push(`Erreur création trigger ${trigger.name}: ${error}`);
      }
    }
  }

  /**
   * Initialiser les données de base
   */
  private async initializeBaseData(result: MonitoringSetupResult): Promise<void> {
    console.log('📝 Initialisation des données de base...');

    try {
      // Ajouter les liens corrigés au monitoring
      const correctedLinks = [
        {
          correction_type: 'cta_link',
          url: '/coach-commercial-entreprise',
          status: 'active',
          metadata: {
            original_issue: 'Lien CTA "Coaching individuel" cassé',
            fixed_in_component: 'ConversionCTAs.tsx',
            priority: 'critical'
          }
        },
        {
          correction_type: 'cta_link',
          url: '/bootcamp-commercial-intensif',
          status: 'active',
          metadata: {
            original_issue: 'Lien CTA "Formation équipe" cassé',
            fixed_in_component: 'ConversionCTAs.tsx',
            priority: 'critical'
          }
        }
      ];

      for (const link of correctedLinks) {
        const { error } = await this.supabase
          .from('corrections_monitoring')
          .upsert(link, { onConflict: 'url' });

        if (error) {
          result.warnings.push(`Erreur ajout lien ${link.url}: ${error.message}`);
        }
      }

      // Ajouter les pages ressources au monitoring
      const resourcePages = [
        {
          page_url: '/ressources/outil-tableau-bord',
          page_title: 'Outil Tableau de Bord Commercial'
        },
        {
          page_url: '/ressources/grille-evaluation',
          page_title: 'Grille d\'Évaluation Performance'
        },
        {
          page_url: '/ressources/reporting-automatise',
          page_title: 'Reporting Automatisé'
        }
      ];

      for (const page of resourcePages) {
        const { error } = await this.supabase
          .from('resource_pages_metrics')
          .upsert(page, { onConflict: 'page_url,date' });

        if (error) {
          result.warnings.push(`Erreur ajout page ${page.page_url}: ${error.message}`);
        }
      }

      console.log('✅ Données de base initialisées');

    } catch (error) {
      result.errors.push(`Erreur initialisation données: ${error}`);
    }
  }

  /**
   * Configurer les alertes
   */
  private async configureAlerts(result: MonitoringSetupResult): Promise<void> {
    console.log('🚨 Configuration des alertes...');

    try {
      // Configurer les seuils d'alerte spécifiques aux corrections
      this.alertManager.updateThresholds({
        criticalLinksThreshold: 1, // Alerte immédiate si un lien corrigé casse
        healthScoreThreshold: 95,  // Seuil élevé pour les corrections
        brokenLinksIncreaseThreshold: 2, // Sensibilité élevée
        responseTimeThreshold: 2000 // 2s max pour les pages critiques
      });

      // Sauvegarder la configuration des alertes
      const alertConfig = {
        corrections_monitoring: {
          enabled: true,
          check_interval: 300, // 5 minutes
          alert_cooldown: 1800, // 30 minutes
          thresholds: {
            response_time_warning: 2000,
            response_time_critical: 5000,
            consecutive_failures: 3
          }
        },
        form_monitoring: {
          enabled: true,
          check_interval: 600, // 10 minutes
          alert_cooldown: 3600, // 1 heure
          thresholds: {
            error_rate_warning: 5, // 5%
            error_rate_critical: 10, // 10%
            response_time_warning: 3000,
            response_time_critical: 10000
          }
        }
      };

      const { error } = await this.supabase
        .from('monitoring_config')
        .upsert({
          config_type: 'corrections_alerts',
          config_data: alertConfig,
          enabled: true
        });

      if (error) {
        result.errors.push(`Erreur sauvegarde config alertes: ${error.message}`);
      } else {
        console.log('✅ Configuration des alertes sauvegardée');
      }

    } catch (error) {
      result.errors.push(`Erreur configuration alertes: ${error}`);
    }
  }

  /**
   * Programmer les tâches automatiques
   */
  private async scheduleAutomaticTasks(result: MonitoringSetupResult): Promise<void> {
    console.log('⏰ Programmation des tâches automatiques...');

    try {
      // Programmer les vérifications automatiques
      const scheduledTasks = [
        {
          task_type: 'check_corrected_links',
          schedule: '*/5 * * * *', // Toutes les 5 minutes
          priority: 'high',
          config: {
            check_response_time: true,
            check_status_code: true,
            alert_on_failure: true
          }
        },
        {
          task_type: 'check_resource_pages',
          schedule: '*/15 * * * *', // Toutes les 15 minutes
          priority: 'medium',
          config: {
            check_accessibility: true,
            check_form_functionality: true,
            update_metrics: true
          }
        },
        {
          task_type: 'generate_monitoring_report',
          schedule: '0 9 * * 1', // Tous les lundis à 9h
          priority: 'low',
          config: {
            include_trends: true,
            send_email: true,
            save_to_database: true
          }
        }
      ];

      for (const task of scheduledTasks) {
        const { error } = await this.supabase
          .from('scheduled_tasks')
          .upsert({
            ...task,
            enabled: true,
            created_at: new Date().toISOString()
          });

        if (error) {
          result.warnings.push(`Erreur programmation tâche ${task.task_type}: ${error.message}`);
        } else {
          console.log(`✅ Tâche programmée: ${task.task_type}`);
        }
      }

    } catch (error) {
      result.errors.push(`Erreur programmation tâches: ${error}`);
    }
  }

  /**
   * Tester la configuration
   */
  async testConfiguration(): Promise<boolean> {
    console.log('🧪 Test de la configuration du monitoring...');

    try {
      // Tester la connexion à la base de données
      const { data, error } = await this.supabase
        .from('corrections_monitoring')
        .select('count')
        .limit(1);

      if (error) {
        console.error('❌ Erreur connexion base de données:', error.message);
        return false;
      }

      // Tester les alertes
      const alertTest = await this.alertManager.testAlerts();
      if (!alertTest) {
        console.error('❌ Test des alertes échoué');
        return false;
      }

      console.log('✅ Configuration du monitoring testée avec succès');
      return true;

    } catch (error) {
      console.error('❌ Erreur test configuration:', error);
      return false;
    }
  }
}

// Script principal
async function main() {
  console.log('🔧 Démarrage de la configuration du monitoring...');

  const setup = new MonitoringSetup();
  const result = await setup.setup();

  console.log('\n📊 Résumé de la configuration:');
  console.log(`✅ Tables créées: ${result.tablesCreated.length}`);
  console.log(`⚡ Triggers créés: ${result.triggersCreated.length}`);
  console.log(`⚠️ Avertissements: ${result.warnings.length}`);
  console.log(`❌ Erreurs: ${result.errors.length}`);

  if (result.warnings.length > 0) {
    console.log('\n⚠️ Avertissements:');
    result.warnings.forEach(warning => console.log(`  - ${warning}`));
  }

  if (result.errors.length > 0) {
    console.log('\n❌ Erreurs:');
    result.errors.forEach(error => console.log(`  - ${error}`));
  }

  // Tester la configuration
  if (result.success) {
    const testSuccess = await setup.testConfiguration();
    if (testSuccess) {
      console.log('\n✅ Configuration du monitoring terminée avec succès !');
      process.exit(0);
    } else {
      console.log('\n❌ Tests de configuration échoués');
      process.exit(1);
    }
  } else {
    console.log('\n❌ Configuration du monitoring échouée');
    process.exit(1);
  }
}

// Exécuter le script si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { MonitoringSetup };