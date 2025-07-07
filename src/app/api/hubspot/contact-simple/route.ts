import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const logPrefix = '[HUBSPOT-SIMPLE]';
  
  try {
    console.log(`${logPrefix} 🚀 Début de la requête`);
    
    // 1. Récupération des variables d'environnement
    console.log(`${logPrefix} 🔍 Récupération des variables d'environnement...`);
    
    const hubspotToken = process.env.HUBSPOT_API_TOKEN;
    const hubspotPortalId = process.env.HUBSPOT_PORTAL_ID;
    
    console.log(`${logPrefix} � État des variables:`);
    console.log(`${logPrefix}   - HUBSPOT_API_TOKEN: ${hubspotToken ? 'PRÉSENT' : 'MANQUANT'} (${hubspotToken ? hubspotToken.substring(0, 10) + '...' : 'N/A'})`);
    console.log(`${logPrefix}   - HUBSPOT_PORTAL_ID: ${hubspotPortalId ? 'PRÉSENT' : 'MANQUANT'} (${hubspotPortalId || 'N/A'})`);
    
    if (!hubspotToken || !hubspotPortalId) {
      console.error(`${logPrefix} ❌ Variables d'environnement manquantes`);
      return NextResponse.json(
        { 
          error: 'Variables d\'environnement manquantes',
          missing: {
            token: !hubspotToken,
            portalId: !hubspotPortalId
          }
        },
        { status: 500 }
      );
    }
    
    // 2. Lecture des données de la requête
    console.log(`${logPrefix} 📝 Lecture des données de la requête...`);
    const body = await request.json();
    console.log(`${logPrefix} 📋 Données reçues:`, JSON.stringify(body, null, 2));
    
    // 3. Validation des données essentielles
    if (!body.firstName || !body.lastName || !body.email) {
      console.error(`${logPrefix} ❌ Données manquantes dans la requête`);
      return NextResponse.json(
        { 
          error: 'Données manquantes',
          required: ['firstName', 'lastName', 'email'],
          received: Object.keys(body)
        },
        { status: 400 }
      );
    }
    
    // 4. Construction de l'URL HubSpot
    const hubspotUrl = `https://api.hubapi.com/crm/v3/objects/contacts`;
    console.log(`${logPrefix} 🌐 URL HubSpot: ${hubspotUrl}`);
    
    // 5. Préparation des données pour HubSpot
    const hubspotData = {
      properties: {
        firstname: body.firstName,
        lastname: body.lastName,
        email: body.email
      }
    };
    
    console.log(`${logPrefix} � Données pour HubSpot:`, JSON.stringify(hubspotData, null, 2));
    
    // 6. Préparation des headers
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${hubspotToken}`
    };
    
    console.log(`${logPrefix} 📮 Headers (sans token complet):`);
    console.log(`${logPrefix}   - Content-Type: ${headers['Content-Type']}`);
    console.log(`${logPrefix}   - Authorization: Bearer ${hubspotToken.substring(0, 10)}...`);
    
    // 7. Envoi vers HubSpot
    console.log(`${logPrefix} 🚀 Envoi vers HubSpot...`);
    
    const hubspotResponse = await fetch(hubspotUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(hubspotData),
    });
    
    console.log(`${logPrefix} 📊 Réponse HubSpot - Status: ${hubspotResponse.status}`);
    console.log(`${logPrefix} 📊 Réponse HubSpot - StatusText: ${hubspotResponse.statusText}`);
    console.log(`${logPrefix} 📊 Réponse HubSpot - Headers:`, Object.fromEntries(hubspotResponse.headers.entries()));
    
    // 8. Lecture de la réponse
    let responseData;
    const responseText = await hubspotResponse.text();
    console.log(`${logPrefix} 📄 Réponse HubSpot (brute):`, responseText);
    
    try {
      responseData = JSON.parse(responseText);
      console.log(`${logPrefix} 📄 Réponse HubSpot (parsée):`, JSON.stringify(responseData, null, 2));
    } catch (parseError) {
      console.error(`${logPrefix} ❌ Erreur de parsing JSON:`, parseError);
      responseData = { rawResponse: responseText };
    }
    
    // 9. Vérification du succès
    if (hubspotResponse.ok) {
      console.log(`${logPrefix} ✅ Succès ! Contact créé dans HubSpot`);
      
      return NextResponse.json({
        success: true,
        message: 'Contact créé avec succès dans HubSpot',
        hubspotResponse: responseData,
        debug: {
          status: hubspotResponse.status,
          statusText: hubspotResponse.statusText,
          receivedData: body,
          sentData: hubspotData
        }
      });
    } else {
      console.error(`${logPrefix} ❌ Erreur HubSpot - Status: ${hubspotResponse.status}`);
      console.error(`${logPrefix} ❌ Erreur HubSpot - Data:`, responseData);
      
      return NextResponse.json(
        { 
          error: 'Erreur lors de la création du contact dans HubSpot',
          hubspotError: responseData,
          debug: {
            status: hubspotResponse.status,
            statusText: hubspotResponse.statusText,
            receivedData: body,
            sentData: hubspotData
          }
        },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error(`${logPrefix} ❌ Erreur générale:`, error);
    
    return NextResponse.json(
      { 
        error: 'Erreur interne du serveur',
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}