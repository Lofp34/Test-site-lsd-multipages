#!/usr/bin/env tsx
/**
 * Utilitaires de maintenance pour le système d'audit
 */

import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

export class MaintenanceUtils {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }

  /**
   * Nettoie les anciens rapports
   */
  async cleanOldReports(daysToKeep: number = 30): Promise<number> {
    const reportsDir = './reports';
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    let cleanedCount = 0;
    
    try {
      const files = await fs.readdir(reportsDir);
      
      for (const file of files) {
        const filePath = path.join(reportsDir, file);
        const stats = await fs.stat(filePath);
        
        if (stats.mtime < cutoffDate) {
          await fs.unlink(filePath);
          cleanedCount++;
          console.log(chalk.gray(`Supprimé: ${file}`));
        }
      }
    } catch (error) {
      console.log(chalk.yellow('⚠️  Dossier reports non trouvé ou inaccessible'));
    }
    
    return cleanedCount;
  }

  /**
   * Nettoie les anciens backups
   */
  async cleanOldBackups(daysToKeep: number = 30): Promise<number> {
    const backupsDir = './backups';
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    let cleanedCount = 0;
    
    try {
      const files = await fs.readdir(backupsDir);
      
      for (const file of files) {
        const filePath = path.join(backupsDir, file);
        const stats = await fs.stat(filePath);
        
        if (stats.mtime < cutoffDate) {
          await fs.unlink(filePath);
          cleanedCount++;
          console.log(chalk.gray(`Backup supprimé: ${file}`));
        }
      }
    } catch (error) {
      console.log(chalk.yellow('⚠️  Dossier backups non trouvé ou inaccessible'));
    }
    
    return cleanedCount;
  }  /**
   *
 Nettoie les anciennes données d'audit en base
   */
  async cleanOldAuditData(daysToKeep: number = 90): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    try {
      // Clean old validation results
      const { count: validationCount } = await this.supabase
        .from('validation_results')
        .delete()
        .lt('checked_at', cutoffDate.toISOString());
      
      // Clean old scanned links (keep recent ones for reference)
      const { count: linksCount } = await this.supabase
        .from('scanned_links')
        .delete()
        .lt('created_at', cutoffDate.toISOString());
      
      console.log(chalk.gray(`Base de données nettoyée: ${validationCount + linksCount} entrées supprimées`));
      
      return validationCount + linksCount;
    } catch (error) {
      console.error(chalk.red('Erreur lors du nettoyage de la base:'), error);
      return 0;
    }
  }

  /**
   * Optimise la base de données
   */
  async optimizeDatabase(): Promise<void> {
    try {
      // Vacuum and analyze tables (PostgreSQL specific)
      await this.supabase.rpc('vacuum_analyze_audit_tables');
      console.log(chalk.green('✓ Base de données optimisée'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  Optimisation automatique non disponible'));
    }
  }

  /**
   * Vérifie l'intégrité des données
   */
  async checkDataIntegrity(): Promise<boolean> {
    try {
      // Check for orphaned records
      const { data: orphanedLinks } = await this.supabase
        .from('scanned_links')
        .select('id')
        .not('url', 'in', '(SELECT DISTINCT url FROM validation_results)');
      
      if (orphanedLinks && orphanedLinks.length > 0) {
        console.log(chalk.yellow(`⚠️  ${orphanedLinks.length} liens sans résultats de validation`));
      }
      
      // Check for duplicate entries
      const { data: duplicates } = await this.supabase
        .from('validation_results')
        .select('url, count(*)')
        .group('url')
        .having('count(*) > 1');
      
      if (duplicates && duplicates.length > 0) {
        console.log(chalk.yellow(`⚠️  ${duplicates.length} URLs avec des résultats dupliqués`));
      }
      
      return true;
    } catch (error) {
      console.error(chalk.red('Erreur lors de la vérification:'), error);
      return false;
    }
  }

  /**
   * Génère un rapport de santé du système
   */
  async generateHealthReport(): Promise<void> {
    console.log(chalk.bold('\n📊 Rapport de santé du système d\'audit\n'));
    
    try {
      // Database stats
      const { count: totalLinks } = await this.supabase
        .from('scanned_links')
        .select('*', { count: 'exact', head: true });
      
      const { count: totalValidations } = await this.supabase
        .from('validation_results')
        .select('*', { count: 'exact', head: true });
      
      const { count: brokenLinks } = await this.supabase
        .from('validation_results')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'broken');
      
      const { count: resourceRequests } = await this.supabase
        .from('resource_requests')
        .select('*', { count: 'exact', head: true });
      
      console.log(`Liens scannés: ${chalk.cyan(totalLinks || 0)}`);
      console.log(`Validations effectuées: ${chalk.cyan(totalValidations || 0)}`);
      console.log(`Liens morts: ${chalk.red(brokenLinks || 0)}`);
      console.log(`Demandes de ressources: ${chalk.yellow(resourceRequests || 0)}`);
      
      // Calculate health score
      const healthScore = totalLinks > 0 ? 
        Math.round(((totalLinks - (brokenLinks || 0)) / totalLinks) * 100) : 100;
      
      console.log(`Score de santé: ${chalk.green(healthScore + '%')}`);
      
      // File system stats
      try {
        const reportsFiles = await fs.readdir('./reports');
        console.log(`Rapports stockés: ${chalk.cyan(reportsFiles.length)}`);
      } catch {
        console.log(`Rapports stockés: ${chalk.cyan(0)}`);
      }
      
      try {
        const backupFiles = await fs.readdir('./backups');
        console.log(`Backups disponibles: ${chalk.cyan(backupFiles.length)}`);
      } catch {
        console.log(`Backups disponibles: ${chalk.cyan(0)}`);
      }
      
    } catch (error) {
      console.error(chalk.red('Erreur lors de la génération du rapport:'), error);
    }
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const utils = new MaintenanceUtils();
  
  const command = process.argv[2];
  const days = parseInt(process.argv[3]) || 30;
  
  switch (command) {
    case 'clean-reports':
      utils.cleanOldReports(days).then(count => 
        console.log(chalk.green(`✓ ${count} rapports supprimés`))
      );
      break;
    case 'clean-backups':
      utils.cleanOldBackups(days).then(count => 
        console.log(chalk.green(`✓ ${count} backups supprimés`))
      );
      break;
    case 'clean-data':
      utils.cleanOldAuditData(days).then(count => 
        console.log(chalk.green(`✓ ${count} entrées supprimées`))
      );
      break;
    case 'health':
      utils.generateHealthReport();
      break;
    case 'optimize':
      utils.optimizeDatabase();
      break;
    case 'check':
      utils.checkDataIntegrity();
      break;
    default:
      console.log('Usage: tsx maintenance-utils.ts <command> [days]');
      console.log('Commands: clean-reports, clean-backups, clean-data, health, optimize, check');
  }
}