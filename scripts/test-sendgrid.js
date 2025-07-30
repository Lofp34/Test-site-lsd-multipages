// Script de test SendGrid
const sgMail = require('@sendgrid/mail');

// Configuration
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'ls@laurentserre.com', // Votre email
  from: 'ls@laurentserre.com', // Email vérifié dans SendGrid
  subject: 'Test SendGrid - Audit des liens',
  text: 'Ceci est un test pour vérifier que SendGrid fonctionne correctement.',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1B365D;">✅ Test SendGrid réussi !</h2>
      <p>Votre configuration SendGrid fonctionne correctement.</p>
      <p>Vous pouvez maintenant recevoir les notifications d'audit des liens morts.</p>
      <hr>
      <p style="color: #666; font-size: 12px;">
        Système d'audit automatique - Laurent Serre Développement
      </p>
    </div>
  `,
};

async function testSendGrid() {
  try {
    console.log('🚀 Test d\'envoi d\'email via SendGrid...');
    await sgMail.send(msg);
    console.log('✅ Email envoyé avec succès !');
    console.log('📧 Vérifiez votre boîte mail : ls@laurentserre.com');
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi :', error.response?.body || error.message);
    
    if (error.code === 403) {
      console.log('\n💡 Solutions possibles :');
      console.log('1. Vérifiez que votre email ls@laurentserre.com est vérifié dans SendGrid');
      console.log('2. Ou utilisez un email vérifié différent comme FROM_EMAIL');
      console.log('3. Vérifiez que votre clé API est correcte');
    }
  }
}

testSendGrid();