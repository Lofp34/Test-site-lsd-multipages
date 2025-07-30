#!/usr/bin/env tsx

/**
 * Test simple du service SendGrid
 */

import { SendGridEmailService } from '../src/lib/email/sendgrid-service';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

async function testSendGridSimple() {
  console.log('🧪 Test simple du service SendGrid...\n');

  const emailService = new SendGridEmailService();

  // Test de configuration
  console.log('🔧 Test de configuration...');
  const configTest = await emailService.testConfiguration();
  console.log('Résultat:', configTest ? '✅ Configuration OK' : '❌ Configuration échouée');

  if (configTest) {
    console.log('\n✅ Le service SendGrid est correctement configuré et fonctionnel !');
    console.log('📧 Un email de test a été envoyé vers:', process.env.ADMIN_EMAIL || 'ls@laurentserre.com');
  } else {
    console.log('\n❌ Problème de configuration du service SendGrid');
    process.exit(1);
  }
}

testSendGridSimple().catch(console.error);