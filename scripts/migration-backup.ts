#!/usr/bin/env tsx
/**
 * Script de backup complet pour la migration Vercel
 * Sauvegarde la configuration vercel.json actuelle, exporte toutes les données d'audit
 * et crée un snapshot de la base de données
 * 
 * Usage: npm run migration:backup
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

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface BackupConfig {
  timestamp: string;
  backupDir: string;
  vercelConfigPath: string;
  databaseBackupPath: string;
  metadataPath: string;
}

interface BackupMetadata {
  timestamp: string;
  version: string;
  vercelConfig: any;
  databaseTables: string[];
  totalRecords: Record<string, number>;
  backupSize: Record<string, number>;
  checksums: Record<string, string>;
}

class MigrationBackup {
  private config: BackupConfig;
  private metadata: BackupMetadata;

  constructor() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(process.cwd(), 'backups', `migration-${timestamp}`);
    
    this.config = {
      timestamp,
      backupDir,
      vercelConfigPath: path.join(backupDir, 'vercel.json'),
      databaseBackupPath: path.join(backupDir, 'database'),
      metadataPath: path.join(backupDir, 'backup-metadata.json')
    };

    this.metadata = {
      timestamp,
      version: '1.0.0',
      vercelConfig: null,
      databaseTables: [],
      totalRecords: {},
      backupSize: {},
      checksums: {}
    };
  }

  /**
   * Crée le répertoire de backup
   */
  private async createBackupDirectory(): Promise<void> {
    try {
      await fs.mkdir(this.config.backupDir, { recursive: true });
      await fs.mkdir(this.config.databaseBackupPath, { recursive: true });
      console.log(`📁 Backup directory created: ${this.config.backupDir}`);
    } catch (error) {
      throw new Error(`Failed to create backup directory: ${error}`);
    }
  }

  /**
   * Sauvegarde la configuration vercel.json actuelle
   */
  private async backupVercelConfig(): Promise<void> {
    try {
      console.log('📋 Backing up vercel.json configuration...');
      
      const vercelConfigPath = path.join(process.cwd(), 'vercel.json');
      const configContent = await fs.readFile(vercelConfigPath, 'utf-8');
      const configJson = JSON.parse(configContent);
      
      // Sauvegarde du fichier original
      await fs.writeFile(this.config.vercelConfigPath, configContent);
      
      // Stockage dans les métadonnées
      this.metadata.vercelConfig = configJson;
      
      // Calcul du checksum
      this.metadata.checksums['vercel.json'] = this.calculateChecksum(configContent);
      this.metadata.backupSize['vercel.json'] = Buffer.byteLength(configContent, 'utf-8');
      
      console.log('✅ Vercel configuration backed up successfully');
    } catch (error) {
      throw new Error(`Failed to backup vercel.json: ${error}`);
    }
  }

  /**
   * Exporte toutes les données d'audit de la base de données
   */
  private async exportAuditData(): Promise<void> {
    console.log('🗄️  Exporting audit data from database...');
    
    const tables = [
      'scanned_links',
      'validation_results', 
      'applied_corrections',
      'resource_requests',
      'audit_history',
      'link_health_metrics'
    ];

    this.metadata.databaseTables = tables;

    for (const table of tables) {
      try {
        console.log(`  📊 Exporting table: ${table}`);
        
        // Récupération de toutes les données de la table
        const { data, error, count } = await supabase
          .from(table)
          .select('*', { count: 'exact' });

        if (error) {
          console.warn(`⚠️  Warning exporting ${table}: ${error.message}`);
          continue;
        }

        // Sauvegarde des données en JSON
        const tableData = {
          table,
          timestamp: this.config.timestamp,
          count: count || 0,
          data: data || []
        };

        const tableFilePath = path.join(this.config.databaseBackupPath, `${table}.json`);
        const tableContent = JSON.stringify(tableData, null, 2);
        
        await fs.writeFile(tableFilePath, tableContent);
        
        // Métadonnées
        this.metadata.totalRecords[table] = count || 0;
        this.metadata.backupSize[table] = Buffer.byteLength(tableContent, 'utf-8');
        this.metadata.checksums[table] = this.calculateChecksum(tableContent);
        
        console.log(`    ✅ ${table}: ${count || 0} records exported`);
      } catch (error) {
        console.error(`❌ Failed to export ${table}:`, error);
        throw error;
      }
    }
  }

  /**
   * Crée un snapshot de la structure de la base de données
   */
  private async createDatabaseSnapshot(): Promise<void> {
    try {
      console.log('📸 Creating database schema snapshot...');
      
      // Récupération de la structure des tables
      const { data: tables, error } = await supabase.rpc('get_table_schema');
      
      if (error) {
        console.warn('⚠️  Warning getting schema, using fallback method');
        // Fallback: récupération manuelle de la structure
        await this.createFallbackSnapshot();
        return;
      }

      const schemaSnapshot = {
        timestamp: this.config.timestamp,
        tables: tables || [],
        version: this.metadata.version
      };

      const snapshotPath = path.join(this.config.databaseBackupPath, 'schema-snapshot.json');
      const snapshotContent = JSON.stringify(schemaSnapshot, null, 2);
      
      await fs.writeFile(snapshotPath, snapshotContent);
      
      this.metadata.checksums['schema'] = this.calculateChecksum(snapshotContent);
      this.metadata.backupSize['schema'] = Buffer.byteLength(snapshotContent, 'utf-8');
      
      console.log('✅ Database schema snapshot created');
    } catch (error) {
      console.error('❌ Failed to create database snapshot:', error);
      await this.createFallbackSnapshot();
    }
  }

  /**
   * Méthode de fallback pour créer un snapshot de base
   */
  private async createFallbackSnapshot(): Promise<void> {
    const fallbackSchema = {
      timestamp: this.config.timestamp,
      note: 'Fallback schema - contains table structure from setup script',
      tables: this.metadata.databaseTables,
      setupScript: 'scripts/setup-audit-db.ts'
    };

    const snapshotPath = path.join(this.config.databaseBackupPath, 'schema-snapshot.json');
    const snapshotContent = JSON.stringify(fallbackSchema, null, 2);
    
    await fs.writeFile(snapshotPath, snapshotContent);
    
    this.metadata.checksums['schema'] = this.calculateChecksum(snapshotContent);
    this.metadata.backupSize['schema'] = Buffer.byteLength(snapshotContent, 'utf-8');
    
    console.log('✅ Fallback database schema snapshot created');
  }

  /**
   * Sauvegarde les métadonnées du backup
   */
  private async saveMetadata(): Promise<void> {
    try {
      console.log('📝 Saving backup metadata...');
      
      const metadataContent = JSON.stringify(this.metadata, null, 2);
      await fs.writeFile(this.config.metadataPath, metadataContent);
      
      console.log('✅ Backup metadata saved');
    } catch (error) {
      throw new Error(`Failed to save metadata: ${error}`);
    }
  }

  /**
   * Calcule un checksum simple pour vérifier l'intégrité
   */
  private calculateChecksum(content: string): string {
    return crypto.createHash('md5').update(content).digest('hex');
  }

  /**
   * Génère un rapport de backup
   */
  private async generateBackupReport(): Promise<void> {
    const totalSize = Object.values(this.metadata.backupSize).reduce((sum, size) => sum + size, 0);
    const totalRecords = Object.values(this.metadata.totalRecords).reduce((sum, count) => sum + count, 0);

    const report = `
# Migration Backup Report

**Timestamp:** ${this.metadata.timestamp}
**Backup Directory:** ${this.config.backupDir}
**Total Size:** ${(totalSize / 1024 / 1024).toFixed(2)} MB
**Total Records:** ${totalRecords}

## Files Backed Up

### Configuration
- ✅ vercel.json (${(this.metadata.backupSize['vercel.json'] / 1024).toFixed(2)} KB)

### Database Tables
${this.metadata.databaseTables.map(table => 
  `- ✅ ${table}: ${this.metadata.totalRecords[table]} records (${(this.metadata.backupSize[table] / 1024).toFixed(2)} KB)`
).join('\n')}

### Schema
- ✅ Database schema snapshot (${(this.metadata.backupSize['schema'] / 1024).toFixed(2)} KB)

## Checksums
${Object.entries(this.metadata.checksums).map(([file, checksum]) => 
  `- ${file}: ${checksum}`
).join('\n')}

## Restoration
To restore this backup, use:
\`\`\`bash
npm run migration:restore ${this.config.timestamp}
\`\`\`

---
Generated on ${new Date().toISOString()}
`;

    const reportPath = path.join(this.config.backupDir, 'BACKUP_REPORT.md');
    await fs.writeFile(reportPath, report.trim());
    
    console.log('📊 Backup report generated');
  }

  /**
   * Exécute le backup complet
   */
  async execute(): Promise<void> {
    const startTime = Date.now();
    
    try {
      console.log('🚀 Starting migration backup...');
      console.log(`📅 Timestamp: ${this.config.timestamp}`);
      
      await this.createBackupDirectory();
      await this.backupVercelConfig();
      await this.exportAuditData();
      await this.createDatabaseSnapshot();
      await this.saveMetadata();
      await this.generateBackupReport();
      
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      const totalSize = Object.values(this.metadata.backupSize).reduce((sum, size) => sum + size, 0);
      
      console.log('\n🎉 Migration backup completed successfully!');
      console.log(`⏱️  Duration: ${duration}s`);
      console.log(`💾 Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`📁 Backup location: ${this.config.backupDir}`);
      console.log(`📋 Backup ID: ${this.config.timestamp}`);
      
    } catch (error) {
      console.error('❌ Migration backup failed:', error);
      throw error;
    }
  }
}

async function main() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  try {
    const backup = new MigrationBackup();
    await backup.execute();
  } catch (error) {
    console.error('❌ Backup process failed:', error);
    process.exit(1);
  }
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { MigrationBackup };