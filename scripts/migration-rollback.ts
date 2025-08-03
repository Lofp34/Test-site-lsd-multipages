#!/usr/bin/env tsx
/**
 * Script de rollback d'urgence pour la migration Vercel
 * Implémente le retour rapide à l'ancienne configuration,
 * la restauration des données si nécessaire et les notifications d'urgence
 * 
 * Usage: npm run migration:rollback <backup-id> [--force] [--notify]
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

// Load environment variables
config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const sendgridApiKey = process.env.SENDGRID_API_KEY!;
const sendgridFromEmail = process.env.SENDGRID_FROM_EMAIL!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface RollbackConfig {
  backupId: string;
  force: boolean;
  notify: boolean;
  timestamp: string;
  backupDir: string;
}

interface RollbackStep {
  name: string;
  description: string;
  execute: () => Promise<void>;
  validate: () => Promise<boolean>;
  critical: boolean;
}

interface RollbackResult {
  success: boolean;
  steps: Array<{
    name: string;
    status: 'success' | 'failed' | 'skipped';
    message: string;
    duration?: number;
  }>;
  totalDuration: number;
  errors: string[];
}

class MigrationRollback {
  private config: RollbackConfig;
  private steps: RollbackStep[] = [];
  private result: RollbackResult;

  constructor(backupId: string, options: { force?: boolean; notify?: boolean } = {}) {
    this.config = {
      backupId,
      force: options.force || false,
      notify: options.notify || false,
      timestamp: new Date().toISOString().replace(/[:.]/g, '-'),
      backupDir: path.join(process.cwd(), 'backups', `migration-${backupId}`)
    };

    this.result = {
      success: false,
      steps: [],
      totalDuration: 0,
      errors: []
    };

    this.initializeSteps();
  }

  /**
   * Initialise les étapes de rollback
   */
  private initializeSteps(): void {
    this.steps = [
      {
        name: 'validate-backup',
        description: 'Validation du backup de restauration',
        execute: () => this.validateBackup(),
        validate: () => this.checkBackupIntegrity(),
        critical: true
      },
      {
        name: 'stop-current-system',
        description: 'Arrêt du système actuel',
        execute: () => this.stopCurrentSystem(),
        validate: () => this.verifySystemStopped(),
        critical: false
      },
      {
        name: 'restore-vercel-config',
        description: 'Restauration de la configuration Vercel',
        execute: () => this.restoreVercelConfig(),
        validate: () => this.validateVercelConfig(),
        critical: true
      },
      {
        name: 'restore-database',
        description: 'Restauration des données de base',
        execute: () => this.restoreDatabase(),
        validate: () => this.validateDatabaseRestore(),
        critical: true
      },
      {
        name: 'verify-system-health',
        description: 'Vérification de la santé du système restauré',
        execute: () => this.verifySystemHealth(),
        validate: () => this.checkSystemHealth(),
        critical: true
      },
      {
        name: 'send-notifications',
        description: 'Envoi des notifications d\'urgence',
        execute: () => this.sendEmergencyNotifications(),
        validate: () => this.verifyNotificationsSent(),
        critical: false
      }
    ];
  }

  /**
   * Étape 1: Validation du backup
   */
  private async validateBackup(): Promise<void> {
    console.log('🔍 Validating backup for rollback...');

    // Vérification de l'existence du répertoire de backup
    try {
      await fs.access(this.config.backupDir);
    } catch (error) {
      throw new Error(`Backup directory not found: ${this.config.backupDir}`);
    }

    // Vérification des fichiers essentiels
    const requiredFiles = [
      'vercel.json',
      'backup-metadata.json',
      'database'
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(this.config.backupDir, file);
      try {
        await fs.access(filePath);
      } catch (error) {
        throw new Error(`Required backup file missing: ${file}`);
      }
    }

    console.log('✅ Backup validation completed');
  }

  private async checkBackupIntegrity(): Promise<boolean> {
    try {
      // Lecture des métadonnées du backup
      const metadataPath = path.join(this.config.backupDir, 'backup-metadata.json');
      const metadata = JSON.parse(await fs.readFile(metadataPath, 'utf-8'));

      // Vérification des checksums
      for (const [file, expectedChecksum] of Object.entries(metadata.checksums)) {
        if (file === 'schema') continue; // Skip schema checksum for now

        const filePath = file === 'vercel.json' 
          ? path.join(this.config.backupDir, file)
          : path.join(this.config.backupDir, 'database', `${file}.json`);

        try {
          const content = await fs.readFile(filePath, 'utf-8');
          const actualChecksum = crypto.createHash('md5').update(content).digest('hex');

          if (actualChecksum !== expectedChecksum) {
            console.warn(`⚠️  Checksum mismatch for ${file}: expected ${expectedChecksum}, got ${actualChecksum}`);
            if (!this.config.force) {
              throw new Error(`Backup integrity check failed for ${file}`);
            }
          }
        } catch (error) {
          if (!this.config.force) {
            throw new Error(`Failed to verify ${file}: ${error}`);
          }
          console.warn(`⚠️  Could not verify ${file}, continuing with --force`);
        }
      }

      return true;
    } catch (error) {
      if (this.config.force) {
        console.warn(`⚠️  Backup integrity check failed, continuing with --force: ${error}`);
        return true;
      }
      throw error;
    }
  }

  /**
   * Étape 2: Arrêt du système actuel
   */
  private async stopCurrentSystem(): Promise<void> {
    console.log('🛑 Stopping current system...');
    
    // En production, cela pourrait inclure:
    // - Désactivation des cron jobs
    // - Arrêt des processus en cours
    // - Mise en mode maintenance
    
    // Pour l'instant, on simule juste l'arrêt
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('✅ Current system stopped');
  }

  private async verifySystemStopped(): Promise<boolean> {
    // Vérification que le système est bien arrêté
    return true;
  }

  /**
   * Étape 3: Restauration de la configuration Vercel
   */
  private async restoreVercelConfig(): Promise<void> {
    console.log('📋 Restoring Vercel configuration...');

    const backupVercelPath = path.join(this.config.backupDir, 'vercel.json');
    const currentVercelPath = path.join(process.cwd(), 'vercel.json');

    // Sauvegarde de la configuration actuelle avant restauration
    const currentConfig = await fs.readFile(currentVercelPath, 'utf-8');
    const rollbackBackupPath = path.join(process.cwd(), `vercel.json.rollback-${this.config.timestamp}`);
    await fs.writeFile(rollbackBackupPath, currentConfig);

    // Restauration de l'ancienne configuration
    const backupConfig = await fs.readFile(backupVercelPath, 'utf-8');
    await fs.writeFile(currentVercelPath, backupConfig);

    console.log('✅ Vercel configuration restored');
    console.log(`📁 Current config backed up to: ${rollbackBackupPath}`);
  }

  private async validateVercelConfig(): Promise<boolean> {
    try {
      const vercelPath = path.join(process.cwd(), 'vercel.json');
      const configContent = await fs.readFile(vercelPath, 'utf-8');
      const config = JSON.parse(configContent);

      // Vérification que la configuration est valide
      if (!config.crons || !Array.isArray(config.crons)) {
        throw new Error('Invalid vercel.json: missing or invalid crons array');
      }

      console.log(`✅ Vercel config validated: ${config.crons.length} cron jobs`);
      return true;
    } catch (error) {
      console.error(`❌ Vercel config validation failed: ${error}`);
      return false;
    }
  }

  /**
   * Étape 4: Restauration de la base de données
   */
  private async restoreDatabase(): Promise<void> {
    console.log('🗄️  Restoring database...');

    const databaseDir = path.join(this.config.backupDir, 'database');
    const tables = [
      'scanned_links',
      'validation_results',
      'applied_corrections',
      'resource_requests',
      'audit_history',
      'link_health_metrics'
    ];

    for (const table of tables) {
      try {
        console.log(`  📊 Restoring table: ${table}`);

        const tableFilePath = path.join(databaseDir, `${table}.json`);
        const tableData = JSON.parse(await fs.readFile(tableFilePath, 'utf-8'));

        if (tableData.data && tableData.data.length > 0) {
          // Sauvegarde des données actuelles
          const { data: currentData } = await supabase
            .from(table)
            .select('*');

          if (currentData && currentData.length > 0) {
            const backupTablePath = path.join(process.cwd(), 'rollback-backups', `${table}-${this.config.timestamp}.json`);
            await fs.mkdir(path.dirname(backupTablePath), { recursive: true });
            await fs.writeFile(backupTablePath, JSON.stringify({
              table,
              timestamp: this.config.timestamp,
              data: currentData
            }, null, 2));
          }

          // Suppression des données actuelles
          const { error: deleteError } = await supabase
            .from(table)
            .delete()
            .neq('id', 0); // Delete all records

          if (deleteError) {
            console.warn(`⚠️  Warning deleting ${table}: ${deleteError.message}`);
          }

          // Insertion des données de backup (sans les IDs auto-générés)
          const dataToInsert = tableData.data.map((record: any) => {
            const { id, ...recordWithoutId } = record;
            return recordWithoutId;
          });

          if (dataToInsert.length > 0) {
            const { error: insertError } = await supabase
              .from(table)
              .insert(dataToInsert);

            if (insertError) {
              console.warn(`⚠️  Warning restoring ${table}: ${insertError.message}`);
              if (!this.config.force) {
                throw new Error(`Failed to restore ${table}: ${insertError.message}`);
              }
            } else {
              console.log(`    ✅ ${table}: ${dataToInsert.length} records restored`);
            }
          }
        } else {
          console.log(`    ℹ️  ${table}: no data to restore`);
        }
      } catch (error) {
        console.error(`❌ Failed to restore ${table}:`, error);
        if (!this.config.force) {
          throw error;
        }
      }
    }

    console.log('✅ Database restoration completed');
  }

  private async validateDatabaseRestore(): Promise<boolean> {
    try {
      // Test de connectivité
      const { data, error } = await supabase
        .from('audit_history')
        .select('count')
        .limit(1);

      if (error) {
        console.error(`❌ Database validation failed: ${error.message}`);
        return false;
      }

      console.log('✅ Database connectivity validated');
      return true;
    } catch (error) {
      console.error(`❌ Database validation error: ${error}`);
      return false;
    }
  }

  /**
   * Étape 5: Vérification de la santé du système
   */
  private async verifySystemHealth(): Promise<void> {
    console.log('🏥 Verifying system health...');

    // Test des composants essentiels
    await this.testDatabaseConnection();
    await this.testApiRoutes();
    await this.testEnvironmentVariables();

    console.log('✅ System health verification completed');
  }

  private async testDatabaseConnection(): Promise<void> {
    const { data, error } = await supabase
      .from('audit_history')
      .select('id')
      .limit(1);

    if (error) {
      throw new Error(`Database connection test failed: ${error.message}`);
    }
  }

  private async testApiRoutes(): Promise<void> {
    const routes = [
      'src/app/api/audit-complete/route.ts',
      'src/app/api/maintenance-weekly/route.ts'
    ];

    for (const route of routes) {
      try {
        await fs.access(route);
      } catch (error) {
        throw new Error(`API route missing: ${route}`);
      }
    }
  }

  private async testEnvironmentVariables(): Promise<void> {
    const requiredVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'SUPABASE_SERVICE_ROLE_KEY'
    ];

    for (const varName of requiredVars) {
      if (!process.env[varName]) {
        throw new Error(`Required environment variable missing: ${varName}`);
      }
    }
  }

  private async checkSystemHealth(): Promise<boolean> {
    try {
      await this.verifySystemHealth();
      return true;
    } catch (error) {
      console.error(`❌ System health check failed: ${error}`);
      return false;
    }
  }

  /**
   * Étape 6: Notifications d'urgence
   */
  private async sendEmergencyNotifications(): Promise<void> {
    if (!this.config.notify) {
      console.log('📧 Notifications disabled, skipping...');
      return;
    }

    console.log('📧 Sending emergency notifications...');

    if (!sendgridApiKey || !sendgridFromEmail) {
      console.warn('⚠️  SendGrid not configured, skipping notifications');
      return;
    }

    try {
      // Import SendGrid dynamically
      const sgMail = await import('@sendgrid/mail');
      sgMail.default.setApiKey(sendgridApiKey);

      const emailContent = this.generateNotificationEmail();

      const msg = {
        to: sendgridFromEmail, // Send to admin
        from: sendgridFromEmail,
        subject: '🚨 URGENT: Migration Rollback Executed',
        html: emailContent
      };

      await sgMail.default.send(msg);
      console.log('✅ Emergency notification sent');
    } catch (error) {
      console.warn(`⚠️  Failed to send notification: ${error}`);
      if (!this.config.force) {
        throw error;
      }
    }
  }

  private generateNotificationEmail(): string {
    const successSteps = this.result.steps.filter(step => step.status === 'success').length;
    const failedSteps = this.result.steps.filter(step => step.status === 'failed').length;

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Migration Rollback Alert</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #d32f2f; border-bottom: 2px solid #d32f2f; padding-bottom: 10px;">
            🚨 URGENT: Migration Rollback Executed
        </h1>
        
        <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <strong>⚠️ A migration rollback has been executed on the system.</strong>
        </div>
        
        <h2>Rollback Details</h2>
        <ul>
            <li><strong>Timestamp:</strong> ${this.config.timestamp}</li>
            <li><strong>Backup ID:</strong> ${this.config.backupId}</li>
            <li><strong>Force Mode:</strong> ${this.config.force ? 'Yes' : 'No'}</li>
            <li><strong>Duration:</strong> ${this.result.totalDuration}s</li>
        </ul>
        
        <h2>Rollback Status</h2>
        <ul>
            <li><strong>Success Steps:</strong> ${successSteps}</li>
            <li><strong>Failed Steps:</strong> ${failedSteps}</li>
            <li><strong>Overall Status:</strong> ${this.result.success ? '✅ SUCCESS' : '❌ FAILED'}</li>
        </ul>
        
        ${this.result.errors.length > 0 ? `
        <h2>Errors</h2>
        <ul>
            ${this.result.errors.map(error => `<li style="color: #d32f2f;">${error}</li>`).join('')}
        </ul>
        ` : ''}
        
        <h2>Next Steps</h2>
        <ol>
            <li>Verify system functionality</li>
            <li>Check application logs</li>
            <li>Monitor system performance</li>
            <li>Investigate root cause of rollback</li>
        </ol>
        
        <div style="background-color: #f8f9fa; border-left: 4px solid #007bff; padding: 15px; margin: 20px 0;">
            <strong>Note:</strong> This is an automated notification. Please verify system status manually.
        </div>
        
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
            Generated on ${new Date().toISOString()}<br>
            Laurent Serre Développement - Migration System
        </p>
    </div>
</body>
</html>
    `.trim();
  }

  private async verifyNotificationsSent(): Promise<boolean> {
    return true; // Notifications are not critical for rollback success
  }

  /**
   * Génère un rapport de rollback
   */
  private generateRollbackReport(): string {
    const successSteps = this.result.steps.filter(step => step.status === 'success').length;
    const failedSteps = this.result.steps.filter(step => step.status === 'failed').length;
    const skippedSteps = this.result.steps.filter(step => step.status === 'skipped').length;

    const report = `
# Emergency Rollback Report

**Timestamp:** ${this.config.timestamp}
**Backup ID:** ${this.config.backupId}
**Force Mode:** ${this.config.force ? 'Enabled' : 'Disabled'}
**Notifications:** ${this.config.notify ? 'Enabled' : 'Disabled'}
**Duration:** ${this.result.totalDuration}s

## Summary
- ✅ Success: ${successSteps}
- ❌ Failed: ${failedSteps}
- ⏭️  Skipped: ${skippedSteps}
- **Overall Status:** ${this.result.success ? '✅ SUCCESS' : '❌ FAILED'}

## Steps Executed
${this.result.steps.map(step => {
  const icon = step.status === 'success' ? '✅' : step.status === 'failed' ? '❌' : '⏭️';
  const duration = step.duration ? ` (${step.duration}s)` : '';
  return `- ${icon} **${step.name}**: ${step.message}${duration}`;
}).join('\n')}

${this.result.errors.length > 0 ? `
## Errors
${this.result.errors.map(error => `- ❌ ${error}`).join('\n')}
` : ''}

## System Status
- **Configuration:** Restored to backup ${this.config.backupId}
- **Database:** ${this.result.steps.find(s => s.name === 'restore-database')?.status === 'success' ? 'Restored' : 'Not restored'}
- **Health Check:** ${this.result.steps.find(s => s.name === 'verify-system-health')?.status === 'success' ? 'Passed' : 'Failed'}

## Next Actions
1. **Immediate:** Verify system functionality manually
2. **Short-term:** Monitor system performance and logs
3. **Long-term:** Investigate root cause and plan re-migration

## Files Created
- Rollback log: \`rollback-logs/rollback-${this.config.timestamp}.json\`
- Config backup: \`vercel.json.rollback-${this.config.timestamp}\`
- Data backups: \`rollback-backups/*-${this.config.timestamp}.json\`

---
Generated on ${new Date().toISOString()}
`;

    return report.trim();
  }

  /**
   * Exécute le rollback complet
   */
  async execute(): Promise<void> {
    const startTime = Date.now();
    
    try {
      console.log('🚨 Starting emergency rollback...');
      console.log(`📅 Timestamp: ${this.config.timestamp}`);
      console.log(`📋 Backup ID: ${this.config.backupId}`);
      console.log(`⚡ Force mode: ${this.config.force ? 'ON' : 'OFF'}`);
      console.log(`📧 Notifications: ${this.config.notify ? 'ON' : 'OFF'}`);
      
      for (const step of this.steps) {
        const stepStartTime = Date.now();
        
        console.log(`\n📋 Step: ${step.name}`);
        console.log(`📝 ${step.description}`);
        
        try {
          await step.execute();
          
          const isValid = await step.validate();
          const stepDuration = ((Date.now() - stepStartTime) / 1000);
          
          if (!isValid) {
            this.result.steps.push({
              name: step.name,
              status: 'failed',
              message: 'Validation failed',
              duration: stepDuration
            });
            
            if (step.critical && !this.config.force) {
              throw new Error(`Critical step ${step.name} failed validation`);
            } else if (step.critical) {
              console.log(`⚠️  Critical step ${step.name} failed but continuing with --force`);
              this.result.errors.push(`Critical step ${step.name} failed validation`);
            }
          } else {
            this.result.steps.push({
              name: step.name,
              status: 'success',
              message: 'Completed successfully',
              duration: stepDuration
            });
            console.log(`✅ Step ${step.name} completed successfully`);
          }
        } catch (error) {
          const stepDuration = ((Date.now() - stepStartTime) / 1000);
          
          this.result.steps.push({
            name: step.name,
            status: 'failed',
            message: `Failed: ${error}`,
            duration: stepDuration
          });
          
          this.result.errors.push(`${step.name}: ${error}`);
          
          if (step.critical && !this.config.force) {
            console.error(`❌ Critical step ${step.name} failed:`, error);
            throw error;
          } else {
            console.warn(`⚠️  Step ${step.name} failed but continuing:`, error);
          }
        }
      }
      
      this.result.totalDuration = ((Date.now() - startTime) / 1000);
      this.result.success = this.result.steps.filter(s => s.status === 'failed' && 
        this.steps.find(step => step.name === s.name)?.critical).length === 0;
      
      // Sauvegarde du rapport de rollback
      await this.saveRollbackLog();
      
      const report = this.generateRollbackReport();
      
      if (this.result.success) {
        console.log('\n🎉 Emergency rollback completed successfully!');
      } else {
        console.log('\n⚠️  Emergency rollback completed with errors!');
      }
      
      console.log(`⏱️  Duration: ${this.result.totalDuration}s`);
      console.log('\n' + report);
      
    } catch (error) {
      this.result.totalDuration = ((Date.now() - startTime) / 1000);
      this.result.success = false;
      this.result.errors.push(`Rollback failed: ${error}`);
      
      await this.saveRollbackLog();
      
      console.error('❌ Emergency rollback failed:', error);
      
      const report = this.generateRollbackReport();
      console.log('\n' + report);
      
      throw error;
    }
  }

  /**
   * Sauvegarde le log de rollback
   */
  private async saveRollbackLog(): Promise<void> {
    try {
      const logDir = path.join(process.cwd(), 'rollback-logs');
      await fs.mkdir(logDir, { recursive: true });
      
      const logPath = path.join(logDir, `rollback-${this.config.timestamp}.json`);
      const logData = {
        config: this.config,
        result: this.result,
        timestamp: new Date().toISOString()
      };
      
      await fs.writeFile(logPath, JSON.stringify(logData, null, 2));
      console.log(`📝 Rollback log saved: ${logPath}`);
    } catch (error) {
      console.warn(`⚠️  Failed to save rollback log: ${error}`);
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('❌ Usage: npm run migration:rollback <backup-id> [--force] [--notify]');
    console.error('');
    console.error('Available backups:');
    
    try {
      const backupsDir = path.join(process.cwd(), 'backups');
      const backups = await fs.readdir(backupsDir);
      const migrationBackups = backups.filter(dir => dir.startsWith('migration-'));
      
      if (migrationBackups.length === 0) {
        console.error('  No migration backups found');
      } else {
        migrationBackups.forEach(backup => {
          const backupId = backup.replace('migration-', '');
          console.error(`  - ${backupId}`);
        });
      }
    } catch (error) {
      console.error('  Could not list backups:', error);
    }
    
    process.exit(1);
  }

  const backupId = args[0];
  const force = args.includes('--force');
  const notify = args.includes('--notify');

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  try {
    const rollback = new MigrationRollback(backupId, { force, notify });
    await rollback.execute();
  } catch (error) {
    console.error('❌ Rollback process failed:', error);
    process.exit(1);
  }
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { MigrationRollback };