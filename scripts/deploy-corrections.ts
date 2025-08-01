#!/usr/bin/env tsx

/**
 * Script de déploiement et monitoring des corrections de liens cassés
 * 
 * Ce script gère :
 * - Le déploiement des corrections de liens CTA
 * - La publication des nouvelles pages ressources
 * - La configuration du monitoring des erreurs 404
 * - La mise en place des alertes pour les formulaires
 * - La documentation des changements
 */

import { execSync } from 'child_process';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { createClient } from '@supabase/supabase-js';
import { SendGridEmailService } from '../src/lib/email/sendgrid-service';
import { getAlertManager } from '../src/lib/audit/alert-manager';

interface DeploymentResult {
  success: boolean;
  deploymentUrl?: string;
  errors: string[];
  warnings: string[];
}

interface MonitoringConfig {
  enabled: boolean;
  alertThresholds: {
    errorRate: number;
    responseTime: number;
    formFailureRate: number;
  };
  notificationEmail: string;
}

class CorrectionsDeployment {
  private supabase: any;
  private emailService: SendGridEmailService;
  private alertManager: any;
  private deploymentLog: string[] = [];

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );
    
    this.emailService = new SendGridEmailService();
    this.alertManager = getAlertManager();
  }

  /**
   * Déployer toutes les corrections
   */
  async deploy(): Promise<DeploymentResult> {
    const result: DeploymentResult = {
      success: false,
      errors: [],
      warnings: []
    };

    try {
      this.log('🚀 Démarrage du déploiement des corrections...');

      // 1. Vérifier l'état du projet avant déploiement
      await this.preDeploymentChecks(result);

      // 2. Déployer les corrections de liens
      await this.deployLinkCorrections(result);

      // 3. Publier les nouvelles pages ressources
      await this.publishResourcePages(result);

      // 4. Configurer le monitoring des erreurs 404
      await this.setupErrorMonitoring(result);

      // 5. Mettre en place les alertes pour les formulaires
      await this.setupFormAlerts(result);

      // 6. Documenter les changements
      await this.documentChanges(result);

      // 7. Tests post-déploiement
      await this.postDeploymentTests(result);

      result.success = result.errors.length === 0;
      
      if (result.success) {
        this.log('✅ Déploiement des corrections terminé avec succès !');
        await this.sendDeploymentNotification(true, result);
      } else {
        this.log('❌ Déploiement échoué avec des erreurs');
        await this.sendDeploymentNotification(false, result);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      result.errors.push(errorMessage);
      this.log(`❌ Erreur critique: ${errorMessage}`);
      await this.sendDeploymentNotification(false, result);
    }

    return result;
  }

  /**
   * Vérifications pré-déploiement
   */
  private async preDeploymentChecks(result: DeploymentResult): Promise<void> {
    this.log('🔍 Vérifications pré-déploiement...');

    try {
      // Vérifier que les pages ressources existent
      const resourcePages = [
        'src/app/ressources/outil-tableau-bord/page.tsx',
        'src/app/ressources/grille-evaluation/page.tsx',
        'src/app/ressources/reporting-automatise/page.tsx'
      ];

      for (const page of resourcePages) {
        if (!existsSync(page)) {
          result.errors.push(`Page ressource manquante: ${page}`);
        } else {
          this.log(`✅ Page trouvée: ${page}`);
        }
      }

      // Vérifier les composants de correction des liens
      const conversionCTAsPath = 'src/components/sections/negotiation/ConversionCTAs.tsx';
      if (!existsSync(conversionCTAsPath)) {
        result.errors.push(`Composant ConversionCTAs manquant: ${conversionCTAsPath}`);
      } else {
        // Vérifier que les liens sont corrigés
        const content = readFileSync(conversionCTAsPath, 'utf-8');
        if (!content.includes('/coach-commercial-entreprise') || !content.includes('/bootcamp-commercial-intensif')) {
          result.warnings.push('Les liens dans ConversionCTAs pourraient ne pas être corrigés');
        } else {
          this.log('✅ Liens CTA corrigés détectés');
        }
      }

      // Vérifier la configuration de l'environnement
      const requiredEnvVars = [
        'NEXT_PUBLIC_SUPABASE_URL',
        'SUPABASE_SERVICE_ROLE_KEY',
        'SENDGRID_API_KEY',
        'ADMIN_EMAIL'
      ];

      for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
          result.errors.push(`Variable d'environnement manquante: ${envVar}`);
        }
      }

      this.log('✅ Vérifications pré-déploiement terminées');

    } catch (error) {
      result.errors.push(`Erreur lors des vérifications: ${error}`);
    }
  }

  /**
   * Déployer les corrections de liens
   */
  private async deployLinkCorrections(result: DeploymentResult): Promise<void> {
    this.log('🔗 Déploiement des corrections de liens...');

    try {
      // Vérifier que le build fonctionne
      this.log('📦 Construction du projet...');
      execSync('npm run build', { stdio: 'pipe' });
      this.log('✅ Build réussi');

      // Déployer sur Vercel (ou autre plateforme)
      if (process.env.VERCEL_TOKEN) {
        this.log('🚀 Déploiement sur Vercel...');
        const deployOutput = execSync('vercel --prod --token $VERCEL_TOKEN', { 
          stdio: 'pipe',
          encoding: 'utf-8'
        });
        
        // Extraire l'URL de déploiement
        const urlMatch = deployOutput.match(/https:\/\/[^\s]+/);
        if (urlMatch) {
          result.deploymentUrl = urlMatch[0];
          this.log(`✅ Déployé sur: ${result.deploymentUrl}`);
        }
      } else {
        result.warnings.push('Token Vercel non configuré, déploiement manuel requis');
      }

    } catch (error) {
      result.errors.push(`Erreur lors du déploiement: ${error}`);
    }
  }

  /**
   * Publier les nouvelles pages ressources
   */
  private async publishResourcePages(result: DeploymentResult): Promise<void> {
    this.log('📄 Publication des pages ressources...');

    try {
      // Enregistrer les nouvelles pages dans la base de données pour le monitoring
      const resourcePages = [
        {
          url: '/ressources/outil-tableau-bord',
          title: 'Outil Tableau de Bord Commercial',
          type: 'resource_page',
          priority: 'high'
        },
        {
          url: '/ressources/grille-evaluation',
          title: 'Grille d\'Évaluation Performance',
          type: 'resource_page',
          priority: 'high'
        },
        {
          url: '/ressources/reporting-automatise',
          title: 'Reporting Automatisé',
          type: 'resource_page',
          priority: 'high'
        }
      ];

      for (const page of resourcePages) {
        // Ajouter à la table de monitoring des liens
        const { error } = await this.supabase
          .from('scanned_links')
          .upsert({
            url: page.url,
            source_file: `src/app${page.url}/page.tsx`,
            link_type: 'internal',
            priority: page.priority,
            last_scanned: new Date().toISOString()
          });

        if (error) {
          result.warnings.push(`Erreur lors de l'enregistrement de ${page.url}: ${error.message}`);
        } else {
          this.log(`✅ Page enregistrée pour monitoring: ${page.url}`);
        }
      }

    } catch (error) {
      result.errors.push(`Erreur lors de la publication des pages: ${error}`);
    }
  }

  /**
   * Configurer le monitoring des erreurs 404
   */
  private async setupErrorMonitoring(result: DeploymentResult): Promise<void> {
    this.log('📊 Configuration du monitoring des erreurs 404...');

    try {
      // Créer une table pour tracker les erreurs 404 si elle n'existe pas
      const { error: createTableError } = await this.supabase.rpc('create_404_monitoring_table');
      
      if (createTableError && !createTableError.message.includes('already exists')) {
        result.warnings.push(`Erreur création table monitoring: ${createTableError.message}`);
      }

      // Configurer les alertes pour les erreurs 404
      this.alertManager.updateThresholds({
        criticalLinksThreshold: 3, // Alerte si 3+ liens critiques cassés
        healthScoreThreshold: 90,  // Alerte si score < 90%
        brokenLinksIncreaseThreshold: 5 // Alerte si +5 liens cassés
      });

      // Programmer un audit immédiat pour vérifier les nouvelles pages
      const { error: auditError } = await this.supabase
        .from('audit_queue')
        .insert({
          task_type: 'full_audit',
          priority: 'high',
          scheduled_for: new Date().toISOString(),
          created_by: 'deployment_script'
        });

      if (auditError) {
        result.warnings.push(`Erreur programmation audit: ${auditError.message}`);
      } else {
        this.log('✅ Audit programmé pour vérifier les nouvelles pages');
      }

    } catch (error) {
      result.errors.push(`Erreur configuration monitoring: ${error}`);
    }
  }

  /**
   * Mettre en place les alertes pour les formulaires
   */
  private async setupFormAlerts(result: DeploymentResult): Promise<void> {
    this.log('📧 Configuration des alertes formulaires...');

    try {
      // Configurer le monitoring des formulaires de ressources
      const monitoringConfig: MonitoringConfig = {
        enabled: true,
        alertThresholds: {
          errorRate: 5, // Alerte si > 5% d'erreurs
          responseTime: 3000, // Alerte si > 3s de réponse
          formFailureRate: 10 // Alerte si > 10% d'échecs de formulaire
        },
        notificationEmail: process.env.ADMIN_EMAIL || 'ls@laurentserre.com'
      };

      // Sauvegarder la configuration
      const { error } = await this.supabase
        .from('monitoring_config')
        .upsert({
          config_type: 'form_monitoring',
          config_data: monitoringConfig,
          updated_at: new Date().toISOString()
        });

      if (error) {
        result.warnings.push(`Erreur sauvegarde config monitoring: ${error.message}`);
      } else {
        this.log('✅ Configuration des alertes formulaires sauvegardée');
      }

      // Tester l'envoi d'alertes
      const testSuccess = await this.alertManager.testAlerts();
      if (!testSuccess) {
        result.warnings.push('Test des alertes échoué');
      } else {
        this.log('✅ Test des alertes réussi');
      }

    } catch (error) {
      result.errors.push(`Erreur configuration alertes formulaires: ${error}`);
    }
  }

  /**
   * Documenter les changements
   */
  private async documentChanges(result: DeploymentResult): Promise<void> {
    this.log('📝 Documentation des changements...');

    try {
      const changelogEntry = {
        date: new Date().toISOString(),
        version: this.getVersionFromPackage(),
        changes: [
          {
            type: 'fix',
            description: 'Correction des liens CTA dans les pages de techniques de négociation',
            files: ['src/components/sections/negotiation/ConversionCTAs.tsx'],
            impact: 'Résolution des erreurs 404 sur les liens "Coaching individuel" et "Formation équipe"'
          },
          {
            type: 'feature',
            description: 'Création des pages ressources manquantes',
            files: [
              'src/app/ressources/outil-tableau-bord/page.tsx',
              'src/app/ressources/grille-evaluation/page.tsx',
              'src/app/ressources/reporting-automatise/page.tsx'
            ],
            impact: 'Résolution des erreurs 404 sur les liens de ressources de la page suivi-performance'
          },
          {
            type: 'enhancement',
            description: 'Mise en place du monitoring avancé des erreurs 404',
            files: ['scripts/deploy-corrections.ts', 'src/lib/audit/alert-manager.ts'],
            impact: 'Détection proactive des liens cassés et alertes automatiques'
          }
        ],
        deploymentUrl: result.deploymentUrl,
        deploymentLog: this.deploymentLog
      };

      // Sauvegarder dans la base de données
      const { error } = await this.supabase
        .from('deployment_history')
        .insert({
          version: changelogEntry.version,
          changes: changelogEntry.changes,
          deployment_url: changelogEntry.deploymentUrl,
          deployment_log: changelogEntry.deploymentLog,
          success: result.errors.length === 0,
          created_at: new Date().toISOString()
        });

      if (error) {
        result.warnings.push(`Erreur sauvegarde changelog: ${error.message}`);
      }

      // Créer un fichier de documentation
      const changelogPath = join(process.cwd(), 'DEPLOYMENT_CHANGELOG.md');
      const changelogContent = this.generateChangelogMarkdown(changelogEntry);
      
      // Ajouter au changelog existant ou créer un nouveau
      let existingChangelog = '';
      if (existsSync(changelogPath)) {
        existingChangelog = readFileSync(changelogPath, 'utf-8');
      }

      const updatedChangelog = changelogContent + '\n\n' + existingChangelog;
      writeFileSync(changelogPath, updatedChangelog);

      this.log(`✅ Changelog mis à jour: ${changelogPath}`);

    } catch (error) {
      result.errors.push(`Erreur documentation: ${error}`);
    }
  }

  /**
   * Tests post-déploiement
   */
  private async postDeploymentTests(result: DeploymentResult): Promise<void> {
    this.log('🧪 Tests post-déploiement...');

    try {
      const baseUrl = result.deploymentUrl || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

      // Tester les pages ressources
      const pagesToTest = [
        '/ressources/outil-tableau-bord',
        '/ressources/grille-evaluation',
        '/ressources/reporting-automatise'
      ];

      for (const page of pagesToTest) {
        try {
          const response = await fetch(`${baseUrl}${page}`);
          if (response.ok) {
            this.log(`✅ Page accessible: ${page}`);
          } else {
            result.warnings.push(`Page non accessible (${response.status}): ${page}`);
          }
        } catch (error) {
          result.warnings.push(`Erreur test page ${page}: ${error}`);
        }
      }

      // Tester l'API de demande de ressources
      try {
        const testData = {
          userEmail: 'test@example.com',
          resourceUrl: '/test-resource',
          sourceUrl: `${baseUrl}/test`,
          message: 'Test post-déploiement'
        };

        const response = await fetch(`${baseUrl}/api/resource-request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testData)
        });

        if (response.ok) {
          this.log('✅ API resource-request fonctionnelle');
        } else {
          result.warnings.push(`API resource-request non fonctionnelle: ${response.status}`);
        }
      } catch (error) {
        result.warnings.push(`Erreur test API: ${error}`);
      }

    } catch (error) {
      result.errors.push(`Erreur tests post-déploiement: ${error}`);
    }
  }

  /**
   * Envoyer une notification de déploiement
   */
  private async sendDeploymentNotification(success: boolean, result: DeploymentResult): Promise<void> {
    try {
      const subject = success 
        ? '✅ Déploiement des corrections réussi'
        : '❌ Déploiement des corrections échoué';

      const htmlContent = `
        <h2>${subject}</h2>
        <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
        <p><strong>URL de déploiement:</strong> ${result.deploymentUrl || 'Non disponible'}</p>
        
        ${result.errors.length > 0 ? `
          <h3>❌ Erreurs (${result.errors.length}):</h3>
          <ul>
            ${result.errors.map(error => `<li>${error}</li>`).join('')}
          </ul>
        ` : ''}
        
        ${result.warnings.length > 0 ? `
          <h3>⚠️ Avertissements (${result.warnings.length}):</h3>
          <ul>
            ${result.warnings.map(warning => `<li>${warning}</li>`).join('')}
          </ul>
        ` : ''}
        
        <h3>📋 Changements déployés:</h3>
        <ul>
          <li>✅ Correction des liens CTA dans les pages de négociation</li>
          <li>✅ Création des pages ressources manquantes</li>
          <li>✅ Configuration du monitoring des erreurs 404</li>
          <li>✅ Mise en place des alertes pour les formulaires</li>
        </ul>
        
        <h3>📊 Log de déploiement:</h3>
        <pre>${this.deploymentLog.join('\n')}</pre>
      `;

      await this.emailService.sendEmail({
        to: process.env.ADMIN_EMAIL || 'ls@laurentserre.com',
        subject,
        html: htmlContent
      });

    } catch (error) {
      console.error('Erreur envoi notification:', error);
    }
  }

  /**
   * Utilitaires
   */
  private log(message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    this.deploymentLog.push(logMessage);
  }

  private getVersionFromPackage(): string {
    try {
      const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
      return packageJson.version || '1.0.0';
    } catch {
      return '1.0.0';
    }
  }

  private generateChangelogMarkdown(entry: any): string {
    return `# Déploiement ${entry.version} - ${new Date(entry.date).toLocaleDateString('fr-FR')}

## 🚀 Changements déployés

${entry.changes.map((change: any) => `
### ${change.type === 'fix' ? '🐛' : change.type === 'feature' ? '✨' : '🔧'} ${change.description}

**Fichiers modifiés:**
${change.files.map((file: string) => `- \`${file}\``).join('\n')}

**Impact:** ${change.impact}
`).join('\n')}

## 📊 Informations de déploiement

- **URL de déploiement:** ${entry.deploymentUrl || 'Non disponible'}
- **Date:** ${new Date(entry.date).toLocaleString('fr-FR')}
- **Statut:** ${entry.deploymentLog.some((log: string) => log.includes('❌')) ? '❌ Échec' : '✅ Succès'}

---`;
  }
}

// Script principal
async function main() {
  console.log('🚀 Démarrage du script de déploiement des corrections...');

  const deployment = new CorrectionsDeployment();
  const result = await deployment.deploy();

  if (result.success) {
    console.log('\n✅ Déploiement terminé avec succès !');
    console.log(`📊 Erreurs: ${result.errors.length}`);
    console.log(`⚠️ Avertissements: ${result.warnings.length}`);
    if (result.deploymentUrl) {
      console.log(`🌐 URL: ${result.deploymentUrl}`);
    }
    process.exit(0);
  } else {
    console.log('\n❌ Déploiement échoué');
    console.log('Erreurs:');
    result.errors.forEach(error => console.log(`  - ${error}`));
    process.exit(1);
  }
}

// Exécuter le script si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { CorrectionsDeployment };