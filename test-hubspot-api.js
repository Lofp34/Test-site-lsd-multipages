// Script de test pour l'API HubSpot
const testData = {
  firstName: "Test",
  lastName: "User", 
  email: "test@example.com",
  company: "Test Company",
  phone: "0123456789",
  message: "Test message depuis le diagnostic",
  diagnosticScore: "15",
  diagnosticLevel: "Avancé",
  formType: "Diagnostic"
};

async function testHubSpotAPI() {
  try {
    console.log('🧪 Test API HubSpot - Début');
    console.log('📤 Données envoyées:', JSON.stringify(testData, null, 2));
    
    const response = await fetch('http://localhost:3000/api/hubspot/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log('📊 Statut de la réponse:', response.status);
    console.log('📋 Headers de la réponse:', Object.fromEntries(response.headers.entries()));

    const responseData = await response.text();
    console.log('📝 Réponse brute:', responseData);

    if (!response.ok) {
      console.error('❌ Erreur API:', response.status, responseData);
    } else {
      console.log('✅ Succès!');
      try {
        const jsonData = JSON.parse(responseData);
        console.log('📄 Données JSON:', jsonData);
      } catch (e) {
        console.log('⚠️ Réponse non-JSON:', responseData);
      }
    }

  } catch (error) {
    console.error('❌ Erreur réseau:', error);
  }
}

// Lancer le test
testHubSpotAPI();