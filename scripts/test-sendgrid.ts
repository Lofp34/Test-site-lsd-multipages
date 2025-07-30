#!/usr/bin/env tsx

/**
 * Script de test pour vérifier la configuration SendGrid
 * et tester l'envoi d'emails vers ls@laurentserre.com
 */

import sgMail from '@sendgrid/mail';
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Configuration SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'ls@laurentserre.com';
const SENDGRID_FROM_NAME = process.env.SENDGRID_FROM_NAME || 'Système Audit - Laurent Serre';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ls@laurentserre.com';

if (!SENDGRID_API_KEY) {
  console.error('❌ SENDGRID_API_KEY non configurée dans .env');
  process.exit(1);
}

// Initialiser SendGrid
sgMail.setApiKey(SENDGRID_API_KEY);

/**
 * Charger un template HTML
 */
function loadTemplate(templateName: string): string {
  try {
    const templatePath = join(process.cwd(), 'src/lib/email/templates', `${templateName}.html`);
    return readFileSync(templatePath, 'utf-8');
  } catch (error) {
    console.error(`❌ Erreur lors du chargement du template ${templateName}:`, error);
    throw error;
  }
}

/**
 * Remplacer les variables dans un template
 */
function replaceTemplateVariables(template: string, variables: Record<string, any>): string {
  let result = template;
  
  // Remplacer les variables simples {{variable}}
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, String(value));
  }
  
  // Gérer les conditions {{#if condition}}...{{/if}}
  result = result.replace(/{{#if\s+(\w+)}}(.*?){{\/if}}/gs, (match, condition, content) => {
    return variables[condition] ? content : '';
  });
  
  return result;
}

/**
 * Test 1: Vérifier la configuration SendGrid
 */
async function testSendGridConfig(): Promise<boolean> {
  console.log('\n🔧 Test 1: Vérification de la configuration SendGrid...');
  
  try {
    // Test simple avec l'API SendGrid
    const testMsg = {
      to: ADMIN_EMAIL,
      from: {
        email: SENDGRID_FROM_EMAIL,
        name: SENDGRID_FROM_NAME
      },
      subject: '🧪 Test de configuration SendGrid',
      text: 'Ceci est un test de configuration SendGrid pour le système d\'audit des liens morts.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1B365D;">🧪 Test de configuration SendGrid</h2>
          <p>Ceci est un test de configuration SendGrid pour le système d'audit des liens morts.</p>
          <div style="background: #F2F5F7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Configuration testée :</strong></p>
            <ul>
              <li>API Key: ${SENDGRID_API_KEY.substring(0, 10)}...</li>
              <li>From Email: ${SENDGRID_FROM_EMAIL}</li>
              <li>From Name: ${SENDGRID_FROM_NAME}</li>
              <li>Admin Email: ${ADMIN_EMAIL}</li>
            </ul>
          </div>
          <p style="color: #00BDA4; font-weight: bold;">✅ Si vous recevez cet email, la configuration SendGrid fonctionne correctement !</p>
        </div>
      `
    };

    await sgMail.send(testMsg);
    console.log('✅ Email de test envoyé avec succès vers', ADMIN_EMAIL);
    return true;
  } catch (error: any) {
    console.error('❌ Erreur lors de l\'envoi de l\'email de test:', error.message);
    if (error.response) {
      console.error('Détails de l\'erreur:', error.response.body);
    }
    return false;
  }
}

/**
 * Test 2: Tester le template de demande de ressource
 */
async function testResourceRequestTemplate(): Promise<boolean> {
  console.log('\n📧 Test 2: Template de demande de ressource...');
  
  try {
    const template = loadTemplate('resource-request');
    
    const variables = {
      userEmail: 'test.user@example.com',
      resourceUrl: '/ressources/guide-prospection-avancee.pdf',
      sourceUrl: 'https://laurentserre.com/ressources/meilleurs-livres/prospection-sdr',
      message: 'Bonjour, je suis très intéressé par ce guide sur la prospection avancée. Pourriez-vous me l\'envoyer dès qu\'il sera disponible ? Merci !',
      requestCount: 5,
      isHighPriority: true,
      timestamp: new Date().toLocaleString('fr-FR')
    };
    
    const htmlContent = replaceTemplateVariables(template, variables);
    
    const msg = {
      to: ADMIN_EMAIL,
      from: {
        email: SENDGRID_FROM_EMAIL,
        name: SENDGRID_FROM_NAME
      },
      subject: '🧪 Test - Nouvelle demande de ressource',
      html: htmlContent
    };

    await sgMail.send(msg);
    console.log('✅ Email de test (demande de ressource) envoyé avec succès');
    return true;
  } catch (error: any) {
    console.error('❌ Erreur lors du test du template de demande de ressource:', error.message);
    return false;
  }
}

/**
 * Test 3: Tester le template d'alerte liens morts
 */
async function testAuditAlertTemplate(): Promise<boolean> {
  console.log('\n🚨 Test 3: Template d\'alerte liens morts...');
  
  try {
    const template = loadTemplate('audit-alert');
    
    const variables = {
      brokenLinksCount: 12,
      totalLinks: 156,
      healthScore: 92,
      healthScoreClass: 'warning',
      timestamp: new Date().toLocaleString('fr-FR'),
      criticalLinks: [
        {
          url: '/ressources/guide-negociation-avancee.pdf',
          error: 'Fichier non trouvé (404)',
          seoImpact: 'Élevé',
          sourceFiles: 'page-negociation.tsx, blog-article-1.md'
        },
        {
          url: '/formation/module-prospection-digitale',
          error: 'Page non accessible (500)',
          seoImpact: 'Critique',
          sourceFiles: 'formation-page.tsx'
        }
      ],
      reportUrl: 'https://laurentserre.com/admin/audit-report-2025-01-27'
    };
    
    const htmlContent = replaceTemplateVariables(template, variables);
    
    const msg = {
      to: ADMIN_EMAIL,
      from: {
        email: SENDGRID_FROM_EMAIL,
        name: SENDGRID_FROM_NAME
      },
      subject: '🧪 Test - Alerte liens morts détectés',
      html: htmlContent
    };

    await sgMail.send(msg);
    console.log('✅ Email de test (alerte liens morts) envoyé avec succès');
    return true;
  } catch (error: any) {
    console.error('❌ Erreur lors du test du template d\'alerte:', error.message);
    return false;
  }
}

/**
 * Test 4: Tester le template de réponse automatique
 */
async function testAutoResponseTemplate(): Promise<boolean> {
  console.log('\n📬 Test 4: Template de réponse automatique...');
  
  try {
    const template = loadTemplate('auto-response');
    
    const variables = {
      resourceUrl: '/ressources/guide-prospection-avancee.pdf'
    };
    
    const htmlContent = replaceTemplateVariables(template, variables);
    
    const msg = {
      to: 'test.user@example.com', // Simuler l'envoi à un utilisateur
      from: {
        email: SENDGRID_FROM_EMAIL,
        name: SENDGRID_FROM_NAME
      },
      subject: '🧪 Test - Confirmation de votre demande de ressource',
      html: htmlContent
    };

    // Pour le test, on envoie aussi à l'admin pour vérifier
    const adminMsg = { ...msg, to: ADMIN_EMAIL };
    await sgMail.send(adminMsg);
    
    console.log('✅ Email de test (réponse automatique) envoyé avec succès');
    return true;
  } catch (error: any) {
    console.error('❌ Erreur lors du test du template de réponse automatique:', error.message);
    return false;
  }
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🚀 Démarrage des tests SendGrid...');
  console.log(`📧 Emails de test envoyés vers: ${ADMIN_EMAIL}`);
  
  const results = {
    config: await testSendGridConfig(),
    resourceRequest: await testResourceRequestTemplate(),
    auditAlert: await testAuditAlertTemplate(),
    autoResponse: await testAutoResponseTemplate()
  };
  
  console.log('\n📊 Résultats des tests:');
  console.log('- Configuration SendGrid:', results.config ? '✅' : '❌');
  console.log('- Template demande de ressource:', results.resourceRequest ? '✅' : '❌');
  console.log('- Template alerte liens morts:', results.auditAlert ? '✅' : '❌');
  console.log('- Template réponse automatique:', results.autoResponse ? '✅' : '❌');
  
  const allPassed = Object.values(results).every(result => result);
  
  if (allPassed) {
    console.log('\n🎉 Tous les tests SendGrid ont réussi !');
    console.log('📧 Vérifiez votre boîte email', ADMIN_EMAIL, 'pour voir les emails de test.');
  } else {
    console.log('\n❌ Certains tests ont échoué. Vérifiez la configuration.');
    process.exit(1);
  }
}

// Exécuter les tests
main().catch(console.error);