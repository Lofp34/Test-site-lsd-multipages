// Test des variables d'environnement HubSpot
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Vérification des Variables d\'Environnement HubSpot\n');

console.log('🔑 HUBSPOT_API_TOKEN:', process.env.HUBSPOT_API_TOKEN || '❌ NON DÉFINI');
console.log('🏢 HUBSPOT_PORTAL_ID:', process.env.HUBSPOT_PORTAL_ID || '❌ NON DÉFINI');

if (!process.env.HUBSPOT_API_TOKEN) {
  console.log('\n❌ HUBSPOT_API_TOKEN manquant');
} else if (process.env.HUBSPOT_API_TOKEN === 'your_hubspot_token_here') {
  console.log('\n⚠️  HUBSPOT_API_TOKEN est encore le placeholder');
  console.log('   Remplacez "your_hubspot_token_here" par votre vrai token');
} else {
  console.log('\n✅ HUBSPOT_API_TOKEN semble configuré');
}

if (!process.env.HUBSPOT_PORTAL_ID) {
  console.log('❌ HUBSPOT_PORTAL_ID manquant');
} else if (process.env.HUBSPOT_PORTAL_ID === 'your_portal_id_here') {
  console.log('⚠️  HUBSPOT_PORTAL_ID est encore le placeholder');
} else {
  console.log('✅ HUBSPOT_PORTAL_ID configuré');
}

console.log('\n📋 Toutes les variables d\'environnement HubSpot:');
Object.keys(process.env)
  .filter(key => key.includes('HUBSPOT'))
  .forEach(key => {
    const value = process.env[key];
    const isPlaceholder = value && (value.includes('your_') || value.includes('here'));
    console.log(`   ${key}: ${isPlaceholder ? '⚠️  (placeholder)' : '✅'} ${value}`);
  });

console.log('\n📖 Consultez CONFIGURATION_HUBSPOT.md pour les instructions complètes.');