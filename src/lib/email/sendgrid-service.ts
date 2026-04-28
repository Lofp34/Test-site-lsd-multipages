/**
 * Service SendGrid pour l'envoi d'emails dans le système d'audit des liens morts
 * 
 * Ce service gère :
 * - L'envoi d'emails de demande de ressources vers ls@laurentserre.com
 * - L'envoi d'alertes pour liens morts critiques
 * - L'envoi de réponses automatiques aux utilisateurs
 * - L'envoi de rapports hebdomadaires
 */

import sgMail from '@sendgrid/mail';
import { readFileSync } from 'fs';
import { join } from 'path';

// Types pour les emails
export interface SendGridConfig {
  apiKey: string;
  fromEmail: string;
  fromName: string;
  adminEmail: string;
}

export interface EmailTemplate {
  subject: string;
  htmlContent: string;
  textContent?: string;
}

export interface ResourceRequestEmail {
  userEmail: string;
  resourceUrl: string;
  sourceUrl: string;
  message?: string;
  requestCount: number;
  isHighPriority?: boolean;
}

export interface BrokenLinkDetail {
  url: string;
  error: string;
  seoImpact: string;
  sourceFiles: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface AuditAlertData {
  brokenLinksCount: number;
  totalLinks: number;
  healthScore: number;
  criticalLinks: BrokenLinkDetail[];
  reportUrl?: string;
  timestamp: string;
}

export interface WeeklyReportData {
  period: string;
  totalAudits: number;
  averageHealthScore: number;
  totalBrokenLinks: number;
  totalCorrections: number;
  mostRequestedResources: Array<{ url: string; count: number }>;
  trends: {
    healthScoreChange: number;
    brokenLinksChange: number;
  };
}

/**
 * Service principal pour l'envoi d'emails via SendGrid
 */
export class SendGridEmailService {
  private config: SendGridConfig;
  private isInitialized: boolean = false;

  constructor(config?: Partial<SendGridConfig>) {
    this.config = {
      apiKey: config?.apiKey || process.env.SENDGRID_API_KEY || '',
      fromEmail: config?.fromEmail || process.env.SENDGRID_FROM_EMAIL || 'ls@laurentserre.com',
      fromName: config?.fromName || process.env.SENDGRID_FROM_NAME || 'Système Audit - Laurent Serre',
      adminEmail: config?.adminEmail || process.env.ADMIN_EMAIL || 'ls@laurentserre.com'
    };

    this.initialize();
  }

  /**
   * Initialiser le service SendGrid
   */
  private initialize(): void {
    if (!this.config.apiKey) {
      throw new Error('SENDGRID_API_KEY est requis pour initialiser le service email');
    }

    sgMail.setApiKey(this.config.apiKey);
    this.isInitialized = true;
  }

  /**
   * Charger un template HTML depuis le système de fichiers
   */
  private loadTemplate(templateName: string): string {
    try {
      const templatePath = join(process.cwd(), 'src/lib/email/templates', `${templateName}.html`);
      return readFileSync(templatePath, 'utf-8');
    } catch (error) {
      console.error(`Erreur lors du chargement du template ${templateName}:`, error);
      throw new Error(`Template ${templateName} non trouvé`);
    }
  }

  /**
   * Remplacer les variables dans un template
   */
  private replaceTemplateVariables(template: string, variables: Record<string, any>): string {
    let result = template;
    
    // Remplacer les variables simples {{variable}}
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, String(value || ''));
    }
    
    // Gérer les conditions {{#if condition}}...{{/if}}
    result = result.replace(/{{#if\s+(\w+)}}(.*?){{\/if}}/gs, (match, condition, content) => {
      return variables[condition] ? content : '';
    });

    // Gérer les boucles {{#each array}}...{{/each}}
    result = result.replace(/{{#each\s+(\w+)}}(.*?){{\/each}}/gs, (match, arrayName, content) => {
      const array = variables[arrayName];
      if (!Array.isArray(array)) return '';
      
      return array.map(item => {
        let itemContent = content;
        for (const [key, value] of Object.entries(item)) {
          const regex = new RegExp(`{{${key}}}`, 'g');
          itemContent = itemContent.replace(regex, String(value || ''));
        }
        return itemContent;
      }).join('');
    });
    
    return result;
  }

  /**
   * Générer le template pour une demande de ressource
   */
  private generateResourceRequestTemplate(request: ResourceRequestEmail): EmailTemplate {
    const template = this.loadTemplate('resource-request');
    
    const variables = {
      userEmail: request.userEmail,
      resourceUrl: request.resourceUrl,
      sourceUrl: request.sourceUrl,
      message: request.message,
      requestCount: request.requestCount,
      isHighPriority: request.isHighPriority || request.requestCount >= 3,
      timestamp: new Date().toLocaleString('fr-FR')
    };

    const htmlContent = this.replaceTemplateVariables(template, variables);
    
    return {
      subject: `🚨 Nouvelle demande de ressource - ${request.resourceUrl}`,
      htmlContent,
      textContent: `Nouvelle demande de ressource reçue:
      
Email: ${request.userEmail}
Ressource: ${request.resourceUrl}
Page source: ${request.sourceUrl}
Nombre de demandes: ${request.requestCount}
${request.message ? `Message: ${request.message}` : ''}

Cette ressource a été demandée ${request.requestCount} fois ce mois-ci.`
    };
  }

  /**
   * Générer le template pour une alerte de liens morts
   */
  private generateAlertTemplate(alertData: AuditAlertData): EmailTemplate {
    const template = this.loadTemplate('audit-alert');
    
    // Déterminer la classe CSS selon le score de santé
    let healthScoreClass = 'health-score';
    if (alertData.healthScore < 70) {
      healthScoreClass += ' critical';
    } else if (alertData.healthScore < 90) {
      healthScoreClass += ' warning';
    }

    const variables = {
      brokenLinksCount: alertData.brokenLinksCount,
      totalLinks: alertData.totalLinks,
      healthScore: alertData.healthScore,
      healthScoreClass,
      criticalLinks: alertData.criticalLinks.filter(link => link.priority === 'critical').slice(0, 5),
      reportUrl: alertData.reportUrl,
      timestamp: alertData.timestamp
    };

    const htmlContent = this.replaceTemplateVariables(template, variables);
    
    return {
      subject: `🚨 Alerte: ${alertData.brokenLinksCount} liens morts détectés (Score: ${alertData.healthScore}%)`,
      htmlContent,
      textContent: `ALERTE: ${alertData.brokenLinksCount} liens morts détectés sur votre site.

Score de santé: ${alertData.healthScore}%
Total des liens: ${alertData.totalLinks}

Liens critiques à corriger:
${alertData.criticalLinks.filter(link => link.priority === 'critical').map(link => 
  `- ${link.url}: ${link.error}`
).join('\n')}

${alertData.reportUrl ? `Rapport complet: ${alertData.reportUrl}` : ''}`
    };
  }

  /**
   * Générer le template pour une réponse automatique
   */
  private generateAutoResponseTemplate(userEmail: string, resourceUrl: string): EmailTemplate {
    const template = this.loadTemplate('auto-response');
    
    const variables = {
      resourceUrl
    };

    const htmlContent = this.replaceTemplateVariables(template, variables);
    
    return {
      subject: '✅ Confirmation de votre demande de ressource - Laurent Serre',
      htmlContent,
      textContent: `Bonjour,

Merci d'avoir manifesté votre intérêt pour une ressource sur notre site Laurent Serre Développement.

Ressource demandée: ${resourceUrl}

Votre demande a été transmise à Laurent Serre et sera traitée dans les plus brefs délais.

En attendant, découvrez nos ressources disponibles:
- Formations commerciales: https://www.laurentserre.com/formation-commerciale-pme
- Ressources gratuites: https://www.laurentserre.com/ressources
- Bootcamp intensif: https://www.laurentserre.com/bootcamp-commercial-intensif

Vous serez automatiquement notifié(e) dès que la ressource sera disponible.

Cordialement,
Laurent Serre
Expert en développement commercial PME`
    };
  }

  /**
   * Envoyer un email de demande de ressource à l'administrateur
   */
  async sendResourceRequest(request: ResourceRequestEmail): Promise<boolean> {
    if (!this.isInitialized) {
      throw new Error('Service SendGrid non initialisé');
    }

    try {
      const emailTemplate = this.generateResourceRequestTemplate(request);
      
      const msg = {
        to: this.config.adminEmail,
        from: {
          email: this.config.fromEmail,
          name: this.config.fromName
        },
        subject: emailTemplate.subject,
        html: emailTemplate.htmlContent,
        text: emailTemplate.textContent
      };

      await sgMail.send(msg);
      console.log(`✅ Email de demande de ressource envoyé vers ${this.config.adminEmail}`);
      return true;
    } catch (error: any) {
      console.error('❌ Erreur lors de l\'envoi de l\'email de demande de ressource:', error.message);
      if (error.response) {
        console.error('Détails:', error.response.body);
      }
      return false;
    }
  }

  /**
   * Envoyer une alerte pour liens morts critiques
   */
  async sendAuditAlert(alertData: AuditAlertData): Promise<boolean> {
    if (!this.isInitialized) {
      throw new Error('Service SendGrid non initialisé');
    }

    try {
      const emailTemplate = this.generateAlertTemplate(alertData);
      
      const msg = {
        to: this.config.adminEmail,
        from: {
          email: this.config.fromEmail,
          name: this.config.fromName
        },
        subject: emailTemplate.subject,
        html: emailTemplate.htmlContent,
        text: emailTemplate.textContent
      };

      await sgMail.send(msg);
      console.log(`✅ Alerte liens morts envoyée vers ${this.config.adminEmail}`);
      return true;
    } catch (error: any) {
      console.error('❌ Erreur lors de l\'envoi de l\'alerte liens morts:', error.message);
      if (error.response) {
        console.error('Détails:', error.response.body);
      }
      return false;
    }
  }

  /**
   * Envoyer une réponse automatique à l'utilisateur
   */
  async sendAutoResponse(userEmail: string, resourceUrl: string): Promise<boolean> {
    if (!this.isInitialized) {
      throw new Error('Service SendGrid non initialisé');
    }

    try {
      const emailTemplate = this.generateAutoResponseTemplate(userEmail, resourceUrl);
      
      const msg = {
        to: userEmail,
        from: {
          email: this.config.fromEmail,
          name: this.config.fromName
        },
        subject: emailTemplate.subject,
        html: emailTemplate.htmlContent,
        text: emailTemplate.textContent
      };

      await sgMail.send(msg);
      console.log(`✅ Réponse automatique envoyée vers ${userEmail}`);
      return true;
    } catch (error: any) {
      console.error('❌ Erreur lors de l\'envoi de la réponse automatique:', error.message);
      if (error.response) {
        console.error('Détails:', error.response.body);
      }
      return false;
    }
  }

  /**
   * Envoyer un rapport hebdomadaire
   */
  async sendWeeklyReport(reportData: WeeklyReportData): Promise<boolean> {
    if (!this.isInitialized) {
      throw new Error('Service SendGrid non initialisé');
    }

    try {
      const subject = `📊 Rapport hebdomadaire - Audit des liens (${reportData.period})`;
      
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1B365D, #00BDA4); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
            <h1 style="margin: 0;">📊 Rapport hebdomadaire</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Audit des liens - ${reportData.period}</p>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
            <div style="background: #F8F9FA; padding: 15px; border-radius: 8px; text-align: center;">
              <div style="font-size: 24px; font-weight: bold; color: #00BDA4;">${reportData.totalAudits}</div>
              <div style="font-size: 12px; color: #6C757D;">Audits effectués</div>
            </div>
            <div style="background: #F8F9FA; padding: 15px; border-radius: 8px; text-align: center;">
              <div style="font-size: 24px; font-weight: bold; color: #00BDA4;">${reportData.averageHealthScore}%</div>
              <div style="font-size: 12px; color: #6C757D;">Score moyen</div>
            </div>
          </div>
          
          <div style="background: #F2F5F7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1B365D; margin: 0 0 15px 0;">📈 Tendances</h3>
            <p>Score de santé: ${reportData.trends.healthScoreChange > 0 ? '📈' : '📉'} ${reportData.trends.healthScoreChange > 0 ? '+' : ''}${reportData.trends.healthScoreChange}%</p>
            <p>Liens morts: ${reportData.trends.brokenLinksChange > 0 ? '📈' : '📉'} ${reportData.trends.brokenLinksChange > 0 ? '+' : ''}${reportData.trends.brokenLinksChange}</p>
          </div>
          
          ${reportData.mostRequestedResources.length > 0 ? `
          <div style="background: #E8F5E8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #059669; margin: 0 0 15px 0;">🔥 Ressources les plus demandées</h3>
            <ul style="margin: 0; padding-left: 20px;">
              ${reportData.mostRequestedResources.map(resource => 
                `<li style="margin: 5px 0;">${resource.url} (${resource.count} demandes)</li>`
              ).join('')}
            </ul>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #1B365D;">Système d'audit automatique - Laurent Serre Développement</p>
          </div>
        </div>
      `;

      const textContent = `Rapport hebdomadaire - Audit des liens (${reportData.period})

Statistiques:
- Audits effectués: ${reportData.totalAudits}
- Score moyen: ${reportData.averageHealthScore}%
- Liens morts détectés: ${reportData.totalBrokenLinks}
- Corrections appliquées: ${reportData.totalCorrections}

Tendances:
- Score de santé: ${reportData.trends.healthScoreChange > 0 ? '+' : ''}${reportData.trends.healthScoreChange}%
- Liens morts: ${reportData.trends.brokenLinksChange > 0 ? '+' : ''}${reportData.trends.brokenLinksChange}

${reportData.mostRequestedResources.length > 0 ? `
Ressources les plus demandées:
${reportData.mostRequestedResources.map(resource => 
  `- ${resource.url} (${resource.count} demandes)`
).join('\n')}
` : ''}`;

      const msg = {
        to: this.config.adminEmail,
        from: {
          email: this.config.fromEmail,
          name: this.config.fromName
        },
        subject,
        html: htmlContent,
        text: textContent
      };

      await sgMail.send(msg);
      console.log(`✅ Rapport hebdomadaire envoyé vers ${this.config.adminEmail}`);
      return true;
    } catch (error: any) {
      console.error('❌ Erreur lors de l\'envoi du rapport hebdomadaire:', error.message);
      if (error.response) {
        console.error('Détails:', error.response.body);
      }
      return false;
    }
  }

  /**
   * Tester la configuration du service
   */
  async testConfiguration(): Promise<boolean> {
    if (!this.isInitialized) {
      throw new Error('Service SendGrid non initialisé');
    }

    try {
      const msg = {
        to: this.config.adminEmail,
        from: {
          email: this.config.fromEmail,
          name: this.config.fromName
        },
        subject: '🧪 Test de configuration SendGrid',
        text: 'Test de configuration du service SendGrid pour l\'audit des liens morts.',
        html: '<p>Test de configuration du service SendGrid pour l\'audit des liens morts.</p>'
      };

      await sgMail.send(msg);
      console.log('✅ Test de configuration réussi');
      return true;
    } catch (error: any) {
      console.error('❌ Échec du test de configuration:', error.message);
      return false;
    }
  }
}

/**
 * Instance singleton du service SendGrid (lazy-loaded)
 */
let _sendGridServiceInstance: SendGridEmailService | null = null;

export function getSendGridService(): SendGridEmailService {
  if (!_sendGridServiceInstance) {
    _sendGridServiceInstance = new SendGridEmailService();
  }
  return _sendGridServiceInstance;
}