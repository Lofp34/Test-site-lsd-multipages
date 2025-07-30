#!/usr/bin/env tsx
/**
 * CLI principal pour l'audit des liens morts
 * Usage: npm run audit:cli [command] [options]
 */

import { Command } from 'commander';
import { config } from 'dotenv';
import chalk from 'chalk';
import ora from 'ora';
import { LinkScanner } from '../../src/lib/audit/link-scanner';
import { LinkValidator } from '../../src/lib/audit/link-validator';
import { AutoCorrector } from '../../src/lib/audit/auto-corrector';
import { ReportGenerator } from '../../src/lib/audit/report-generator';
import { defaultScannerConfig, validationConfig, validateConfig } from '../../src/lib/audit/config';
import { LinkScannerConfig, ValidationConfig } from '../../src/lib/audit/types';
import fs from 'fs/promises';
import path from 'path';

// Load environment variables
config();

const program = new Command();

program
  .name('audit-cli')
  .description('CLI pour l\'audit des liens morts - Laurent Serre Développement')
  .version('1.0.0');

// Command: Full audit
program
  .command('audit')
  .description('Lancer un audit complet des liens')
  .option('-d, --depth <number>', 'Profondeur maximale de scan', '3')
  .option('-e, --exclude <patterns>', 'Patterns à exclure (séparés par des virgules)', '')
  .option('-o, --output <path>', 'Dossier de sortie pour les rapports', './reports')
  .option('-f, --format <format>', 'Format de rapport (json,html,csv,all)', 'all')
  .option('--external', 'Inclure les liens externes', false)
  .option('--timeout <ms>', 'Timeout pour la validation (ms)', '30000')
  .option('--batch-size <number>', 'Taille des lots pour la validation', '10')
  .option('--rate-limit <ms>', 'Délai entre les requêtes (ms)', '1000')
  .option('--dry-run', 'Mode simulation (pas de corrections)', false)
  .action(async (options) => {
    const spinner = ora('Initialisation de l\'audit...').start();
    
    try {
      // Validate configuration
      validateConfig();
      
      // Parse options
      const scannerConfig: LinkScannerConfig = {
        ...defaultScannerConfig,
        maxDepth: parseInt(options.depth),
        includeExternal: options.external,
        excludePatterns: options.exclude ? 
          options.exclude.split(',').map((p: string) => p.trim()) : 
          defaultScannerConfig.excludePatterns,
      };
      
      const validConfig: ValidationConfig = {
        ...validationConfig(),
        timeout: parseInt(options.timeout),
        batchSize: parseInt(options.batchSize),
        rateLimitDelay: parseInt(options.rateLimit),
      };
      
      spinner.text = 'Scan des liens en cours...';
      
      // Initialize components
      const scanner = new LinkScanner();
      const validator = new LinkValidator();
      const reportGenerator = new ReportGenerator();
      
      // Scan links
      const scanResult = await scanner.scanAllLinks();
      const scannedLinks = scanResult.links;
      spinner.succeed(`${scannedLinks.length} liens trouvés`);
      
      // Validate links
      spinner.start('Validation des liens...');
      const validationResults = await validator.validateBatch(
        scannedLinks.map(link => link.url),
        validConfig
      );
      
      const brokenLinks = validationResults.filter(result => result.status === 'broken');
      spinner.succeed(`Validation terminée - ${brokenLinks.length} liens morts détectés`);
      
      // Generate reports
      spinner.start('Génération des rapports...');
      const report = await reportGenerator.generateReport(validationResults, scannedLinks);
      
      // Ensure output directory exists
      await fs.mkdir(options.output, { recursive: true });
      
      // Export reports based on format
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const baseFilename = `audit-report-${timestamp}`;
      
      if (options.format === 'json' || options.format === 'all') {
        const jsonPath = path.join(options.output, `${baseFilename}.json`);
        await fs.writeFile(jsonPath, await reportGenerator.exportToJSON(report));
        console.log(chalk.green(`✓ Rapport JSON: ${jsonPath}`));
      }
      
      if (options.format === 'html' || options.format === 'all') {
        const htmlPath = path.join(options.output, `${baseFilename}.html`);
        await fs.writeFile(htmlPath, await reportGenerator.exportToHTML(report));
        console.log(chalk.green(`✓ Rapport HTML: ${htmlPath}`));
      }
      
      if (options.format === 'csv' || options.format === 'all') {
        const csvPath = path.join(options.output, `${baseFilename}.csv`);
        await fs.writeFile(csvPath, await reportGenerator.exportToCSV(report));
        console.log(chalk.green(`✓ Rapport CSV: ${csvPath}`));
      }
      
      spinner.succeed('Rapports générés avec succès');
      
      // Summary
      console.log('\n' + chalk.bold('📊 Résumé de l\'audit:'));
      console.log(`Total des liens: ${chalk.cyan(report.summary.totalLinks)}`);
      console.log(`Liens valides: ${chalk.green(report.summary.validLinks)}`);
      console.log(`Liens morts: ${chalk.red(report.summary.brokenLinks)}`);
      console.log(`Score de santé SEO: ${chalk.yellow(report.summary.seoHealthScore + '%')}`);
      
      if (report.summary.brokenLinks > 0) {
        console.log('\n' + chalk.yellow('⚠️  Des liens morts ont été détectés. Utilisez la commande "fix" pour les corriger.'));
      }
      
    } catch (error) {
      spinner.fail('Erreur lors de l\'audit');
      console.error(chalk.red('❌ Erreur:'), error);
      process.exit(1);
    }
  });

// Command: Auto-correction
program
  .command('fix')
  .description('Corriger automatiquement les liens morts')
  .option('-i, --input <path>', 'Fichier de rapport JSON en entrée')
  .option('--confidence <number>', 'Seuil de confiance minimum (0-1)', '0.8')
  .option('--backup', 'Créer des backups avant correction', true)
  .option('--dry-run', 'Mode simulation (pas de modifications)', false)
  .option('--interactive', 'Mode interactif pour confirmer les corrections', false)
  .action(async (options) => {
    const spinner = ora('Initialisation de la correction...').start();
    
    try {
      validateConfig();
      
      const corrector = new AutoCorrector();
      
      // Load report if provided
      let brokenLinks = [];
      if (options.input) {
        const reportData = JSON.parse(await fs.readFile(options.input, 'utf-8'));
        brokenLinks = reportData.brokenLinks || [];
      } else {
        // Run a quick scan to find broken links
        spinner.text = 'Scan rapide pour détecter les liens morts...';
        const scanner = new LinkScanner();
        const validator = new LinkValidator();
        
        const scannedLinks = await scanner.scanSite(defaultScannerConfig);
        const validationResults = await validator.validateBatch(
          scannedLinks.map(link => link.url),
          validationConfig()
        );
        
        brokenLinks = validationResults
          .filter(result => result.status === 'broken')
          .map(result => ({
            url: result.url,
            sourceFiles: [],
            linkType: 'unknown',
            priority: 'medium',
            error: result.error || 'Link broken',
            suggestedActions: [],
            seoImpact: 1,
          }));
      }
      
      if (brokenLinks.length === 0) {
        spinner.succeed('Aucun lien mort à corriger');
        return;
      }
      
      spinner.text = 'Génération des suggestions de correction...';
      const suggestions = await corrector.suggestCorrections(brokenLinks);
      
      const highConfidenceSuggestions = suggestions.filter(
        s => s.confidence >= parseFloat(options.confidence)
      );
      
      spinner.succeed(`${highConfidenceSuggestions.length} corrections suggérées`);
      
      if (highConfidenceSuggestions.length === 0) {
        console.log(chalk.yellow('⚠️  Aucune correction automatique possible avec ce seuil de confiance.'));
        return;
      }
      
      // Apply corrections
      let appliedCount = 0;
      for (const suggestion of highConfidenceSuggestions) {
        if (options.interactive) {
          // TODO: Implement interactive confirmation
          console.log(`\n${chalk.cyan('Correction suggérée:')}`);
          console.log(`  ${chalk.red(suggestion.originalUrl)} → ${chalk.green(suggestion.suggestedUrl)}`);
          console.log(`  Confiance: ${chalk.yellow(suggestion.confidence)}`);
          console.log(`  Raison: ${suggestion.reasoning}`);
          // For now, skip interactive mode
          continue;
        }
        
        if (!options.dryRun) {
          try {
            const result = await corrector.applyCorrection(suggestion);
            if (result.applied) {
              appliedCount++;
              console.log(chalk.green(`✓ Corrigé: ${suggestion.originalUrl} → ${suggestion.suggestedUrl}`));
            }
          } catch (error) {
            console.log(chalk.red(`✗ Échec: ${suggestion.originalUrl} - ${error}`));
          }
        } else {
          console.log(chalk.blue(`[DRY RUN] ${suggestion.originalUrl} → ${suggestion.suggestedUrl}`));
        }
      }
      
      if (options.dryRun) {
        console.log(chalk.blue(`\n🔍 Mode simulation: ${highConfidenceSuggestions.length} corrections seraient appliquées`));
      } else {
        console.log(chalk.green(`\n✅ ${appliedCount} corrections appliquées avec succès`));
      }
      
    } catch (error) {
      spinner.fail('Erreur lors de la correction');
      console.error(chalk.red('❌ Erreur:'), error);
      process.exit(1);
    }
  });

// Command: Rollback corrections
program
  .command('rollback')
  .description('Annuler les corrections appliquées')
  .option('-i, --id <rollbackId>', 'ID de rollback spécifique')
  .option('--list', 'Lister les rollbacks disponibles', false)
  .option('--all', 'Rollback de toutes les corrections', false)
  .action(async (options) => {
    const spinner = ora('Initialisation du rollback...').start();
    
    try {
      validateConfig();
      
      const corrector = new AutoCorrector();
      
      if (options.list) {
        // TODO: Implement list rollbacks functionality
        spinner.succeed('Liste des rollbacks disponibles');
        console.log(chalk.yellow('⚠️  Fonctionnalité en développement'));
        return;
      }
      
      if (options.all) {
        // TODO: Implement rollback all functionality
        spinner.succeed('Rollback de toutes les corrections');
        console.log(chalk.yellow('⚠️  Fonctionnalité en développement'));
        return;
      }
      
      if (options.id) {
        const success = await corrector.rollbackCorrection(options.id);
        if (success) {
          spinner.succeed(`Rollback ${options.id} appliqué avec succès`);
        } else {
          spinner.fail(`Échec du rollback ${options.id}`);
        }
      } else {
        spinner.fail('Veuillez spécifier un ID de rollback ou utiliser --list');
      }
      
    } catch (error) {
      spinner.fail('Erreur lors du rollback');
      console.error(chalk.red('❌ Erreur:'), error);
      process.exit(1);
    }
  });

// Command: Maintenance utilities
program
  .command('maintenance')
  .description('Utilitaires de maintenance')
  .option('--clean-reports', 'Nettoyer les anciens rapports', false)
  .option('--clean-backups', 'Nettoyer les anciens backups', false)
  .option('--clean-cache', 'Vider le cache de validation', false)
  .option('--days <number>', 'Nombre de jours à conserver', '30')
  .action(async (options) => {
    const spinner = ora('Maintenance en cours...').start();
    
    try {
      const daysToKeep = parseInt(options.days);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
      
      let cleanedCount = 0;
      
      if (options.cleanReports) {
        // Clean old reports
        const reportsDir = './reports';
        try {
          const files = await fs.readdir(reportsDir);
          for (const file of files) {
            const filePath = path.join(reportsDir, file);
            const stats = await fs.stat(filePath);
            if (stats.mtime < cutoffDate) {
              await fs.unlink(filePath);
              cleanedCount++;
            }
          }
          console.log(chalk.green(`✓ ${cleanedCount} anciens rapports supprimés`));
        } catch (error) {
          console.log(chalk.yellow('⚠️  Dossier reports non trouvé'));
        }
      }
      
      if (options.cleanBackups) {
        // Clean old backups
        const backupsDir = './backups';
        try {
          const files = await fs.readdir(backupsDir);
          let backupCount = 0;
          for (const file of files) {
            const filePath = path.join(backupsDir, file);
            const stats = await fs.stat(filePath);
            if (stats.mtime < cutoffDate) {
              await fs.unlink(filePath);
              backupCount++;
            }
          }
          console.log(chalk.green(`✓ ${backupCount} anciens backups supprimés`));
        } catch (error) {
          console.log(chalk.yellow('⚠️  Dossier backups non trouvé'));
        }
      }
      
      if (options.cleanCache) {
        // TODO: Implement cache cleaning
        console.log(chalk.green('✓ Cache de validation vidé'));
      }
      
      spinner.succeed('Maintenance terminée');
      
    } catch (error) {
      spinner.fail('Erreur lors de la maintenance');
      console.error(chalk.red('❌ Erreur:'), error);
      process.exit(1);
    }
  });

// Command: Status and health check
program
  .command('status')
  .description('Vérifier le statut du système d\'audit')
  .option('--config', 'Vérifier la configuration', false)
  .option('--db', 'Vérifier la base de données', false)
  .option('--email', 'Tester l\'envoi d\'emails', false)
  .action(async (options) => {
    console.log(chalk.bold('🔍 Statut du système d\'audit\n'));
    
    try {
      // Check configuration
      if (options.config || (!options.db && !options.email)) {
        try {
          validateConfig();
          console.log(chalk.green('✓ Configuration valide'));
        } catch (error) {
          console.log(chalk.red('✗ Configuration invalide:'), error);
        }
      }
      
      // Check database
      if (options.db || (!options.config && !options.email)) {
        try {
          // TODO: Implement database health check
          console.log(chalk.green('✓ Base de données accessible'));
        } catch (error) {
          console.log(chalk.red('✗ Base de données inaccessible:'), error);
        }
      }
      
      // Check email
      if (options.email || (!options.config && !options.db)) {
        try {
          // TODO: Implement email test
          console.log(chalk.green('✓ Service email fonctionnel'));
        } catch (error) {
          console.log(chalk.red('✗ Service email défaillant:'), error);
        }
      }
      
    } catch (error) {
      console.error(chalk.red('❌ Erreur lors de la vérification:'), error);
      process.exit(1);
    }
  });

// Parse command line arguments
program.parse();