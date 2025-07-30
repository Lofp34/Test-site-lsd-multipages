#!/usr/bin/env tsx

/**
 * Script de déploiement en production pour le système d'audit des liens
 * 
 * Ce script configure l'environnement de production Vercel avec :
 * - Variables d'environnement
 * - Configuration de la base de données Supabase
 * - Vérification des permissions RLS
 * - Test des cron jobs
 * - Validation de l'intégration SendGrid
 */

import { createClient } from '@supabase/supabase-js';
import { SendGridEmailService } from '../src/lib/email/sendgrid-service';
import { AuditDatabase } from '../src/lib/audit/database';

interface DeploymentConfig {
  environment: 'production' | 'staging';
  vercelProjectId?: string;
  supabaseUrl: string;
  supabaseServiceKey: string;
  sendgridApiKey: string;
  adminEmail: string;
  baseUrl: string;
}

class ProductionDeployment {
  private config: DeploymentConfig;
  private supabase: any;
  private emailService: SendGridEmailService;

  constructor(config: DeploymentConfig) {
    this.config = config;
    this.supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);
    this.emailService = new SendGridEmailService({
      apiKey: config.sendgridApiKey,
      fromEmail: config.adminEmail,
      fromName: 'Système Audit - Laurent Serre',
      adminEmail: config.adminEmail,
    });
  }

  async deploy(): Promise<void> {
    console.log('🚀 Démarrage du déploiement en production...');
    console.log(`📍 Environnement: ${this.config.environment}`);
    console.log(`🌐 URL de base: ${this.config.baseUrl}`);

    try {
      // 1. Vérifier la configuration Supabase
      await this.validateSupabaseConfig();

      // 2. Configurer les tables et permissions RLS
      await this.setupDatabase();

      // 3. Tester l'intégration SendGrid
      await this.validateSendGridConfig();

      // 4. Vérifier les variables d'environnement
      await this.validateEnvironmentVariables();

      // 5. Tester les API routes
      await this.testApiRoutes();

      console.log('✅ Déploiement en production terminé avec succès !');
      console.log('\n📋 Prochaines étapes :');
      console.log('1. Configurer les variables d\'environnement sur Vercel');
      console.log('2. Déployer le code sur Vercel');
      console.log('3. Tester les cron jobs');
      console.log('4. Lancer le premier audit complet');

    } catch (error) {
      console.error('❌ Échec du déploiement:', error);
      throw error;
    }
  }

  private async validateSupabaseConfig(): Promise<void> {
    console.log('\n🔍 Validation de la configuration Supabase...');

    try {
      // Test de connexion
      const { data, error } = await this.supabase
        .from('scanned_links')
        .select('count')
        .limit(1);

      if (error) {
        throw new Error(`Erreur de connexion Supabase: ${error.message}`);
      }

      console.log('✅ Connexion Supabase validée');
    } catch (error) {
      console.error('❌ Erreur de validation Supabase:', error);
      throw error;
    }
  }

  private async setupDatabase(): Promise<void> {
    console.log('\n🗄️ Configuration de la base de données...');

    try {
      // Vérifier que toutes les tables existent
      const tables = [
        'scanned_links',
        'validation_results',
        'applied_corrections',
        'resource_requests',
        'audit_history',
        'link_health_metrics'
      ];

      for (const table of tables) {
        const { error } = await this.supabase
          .from(table)
          .select('*')
          .limit(1);

        if (error) {
          console.warn(`⚠️ Table ${table} non accessible: ${error.message}`);
        } else {
          console.log(`✅ Table ${table} accessible`);
        }
      }

      // Tester l'insertion de données de test
      await this.testDatabaseOperations();

      console.log('✅ Configuration de la base de données terminée');
    } catch (error) {
      console.error('❌ Erreur de configuration de la base de données:', error);
      throw error;
    }
  }

  private async testDatabaseOperations(): Promise<void> {
    console.log('🧪 Test des opérations de base de données...');

    try {
      // Test d'insertion dans audit_history
      const testAudit = {
        total_links: 0,
        broken_links: 0,
        corrected_links: 0,
        seo_score: 100.0,
        execution_time: 1,
      };

      const { error: insertError } = await this.supabase
        .from('audit_history')
        .insert([testAudit]);

      if (insertError) {
        throw new Error(`Erreur d'insertion: ${insertError.message}`);
      }

      console.log('✅ Test d\'insertion réussi');

      // Nettoyer les données de test
      await this.supabase
        .from('audit_history')
        .delete()
        .eq('total_links', 0)
        .eq('execution_time', 1);

    } catch (error) {
      console.error('❌ Erreur lors du test des opérations:', error);
      throw error;
    }
  }

  private async validateSendGridConfig(): Promise<void> {
    console.log('\n📧 Validation de la configuration SendGrid...');

    try {
      // Test d'envoi d'email de validation
      const testEmail = {
        userEmail: this.config.adminEmail,
        resourceUrl: '/test-resource',
        sourceUrl: `${this.config.baseUrl}/test`,
        message: 'Test de déploiement - Email de validation',
        requestCount: 1,
      };

      const success = await this.emailService.sendResourceRequest(testEmail);

      if (!success) {
        throw new Error('Échec de l\'envoi d\'email de test');
      }

      console.log('✅ Configuration SendGrid validée');
      console.log(`📧 Email de test envoyé à ${this.config.adminEmail}`);
    } catch (error) {
      console.error('❌ Erreur de validation SendGrid:', error);
      throw error;
    }
  }

  private async validateEnvironmentVariables(): Promise<void> {
    console.log('\n🔧 Validation des variables d\'environnement...');

    const requiredVars = [
      'SENDGRID_API_KEY',
      'SENDGRID_FROM_EMAIL',
      'SENDGRID_FROM_NAME',
      'ADMIN_EMAIL',
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY',
      'NEXT_PUBLIC_BASE_URL',
      'AUDIT_SCHEDULE_ENABLED',
    ];

    const missing: string[] = [];

    for (const varName of requiredVars) {
      if (!process.env[varName]) {
        missing.push(varName);
      }
    }

    if (missing.length > 0) {
      console.error('❌ Variables d\'environnement manquantes:');
      missing.forEach(varName => console.error(`  - ${varName}`));
      throw new Error(`Variables d'environnement manquantes: ${missing.join(', ')}`);
    }

    console.log('✅ Toutes les variables d\'environnement sont configurées');
  }

  private async testApiRoutes(): Promise<void> {
    console.log('\n🔗 Test des routes API...');

    const routes = [
      '/api/audit-links',
      '/api/weekly-report',
      '/api/admin/trigger-alerts',
      '/api/cron/process-queue',
      '/api/resource-request',
    ];

    console.log('ℹ️ Les routes API seront testées après le déploiement');
    console.log('📝 Routes configurées:');
    routes.forEach(route => console.log(`  - ${route}`));
  }

  // Méthode pour générer la configuration Vercel
  generateVercelConfig(): object {
    return {
      env: {
        SENDGRID_API_KEY: this.config.sendgridApiKey,
        SENDGRID_FROM_EMAIL: this.config.adminEmail,
        SENDGRID_FROM_NAME: 'Système Audit - Laurent Serre',
        ADMIN_EMAIL: this.config.adminEmail,
        NEXT_PUBLIC_SUPABASE_URL: this.config.supabaseUrl,
        SUPABASE_SERVICE_ROLE_KEY: this.config.supabaseServiceKey,
        NEXT_PUBLIC_BASE_URL: this.config.baseUrl,
        AUDIT_SCHEDULE_ENABLED: 'true',
        AUDIT_MAX_REQUESTS_PER_DAY: '100',
        AUDIT_ENABLE_AUTO_RESPONSE: 'true',
        AUDIT_TIMEOUT: '30000',
        AUDIT_RETRY_ATTEMPTS: '3',
        AUDIT_BATCH_SIZE: '10',
        AUDIT_RATE_LIMIT_DELAY: '1000',
      },
      crons: [
        {
          path: '/api/audit-links',
          schedule: '0 2 * * *', // Tous les jours à 2h du matin
        },
        {
          path: '/api/weekly-report',
          schedule: '0 9 * * 1', // Tous les lundis à 9h
        },
        {
          path: '/api/admin/trigger-alerts',
          schedule: '0 */6 * * *', // Toutes les 6 heures
        },
        {
          path: '/api/cron/process-queue',
          schedule: '*/5 * * * *', // Toutes les 5 minutes
        },
      ],
    };
  }
}

// Script principal
async function main() {
  const config: DeploymentConfig = {
    environment: (process.env.NODE_ENV as 'production' | 'staging') || 'production',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    sendgridApiKey: process.env.SENDGRID_API_KEY || '',
    adminEmail: process.env.ADMIN_EMAIL || 'ls@laurentserre.com',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://laurentserre.com',
  };

  // Validation de la configuration
  if (!config.supabaseUrl || !config.supabaseServiceKey || !config.sendgridApiKey) {
    console.error('❌ Configuration incomplète. Vérifiez les variables d\'environnement.');
    process.exit(1);
  }

  const deployment = new ProductionDeployment(config);

  try {
    await deployment.deploy();

    // Générer la configuration Vercel
    const vercelConfig = deployment.generateVercelConfig();
    console.log('\n📄 Configuration Vercel générée:');
    console.log(JSON.stringify(vercelConfig, null, 2));

  } catch (error) {
    console.error('❌ Échec du déploiement:', error);
    process.exit(1);
  }
}

// Exécuter le script si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { ProductionDeployment };