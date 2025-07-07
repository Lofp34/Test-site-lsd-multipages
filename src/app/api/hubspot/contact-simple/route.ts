import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const logPrefix = '[HUBSPOT-SIMPLE]';
  
  try {
    console.log(`${logPrefix} 🚀 Début de la requête`);
    
    // 1. Récupération des variables d'environnement
    console.log(`${logPrefix} 🔍 Récupération des variables d'environnement...`);
    
    const hubspotToken = process.env.HUBSPOT_API_TOKEN;
    const hubspotPortalId = process.env.HUBSPOT_PORTAL_ID;
    
    console.log(`${logPrefix} 🔍 État des variables:`);
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
        email: body.email,
        company: body.company || '',
        phone: body.phone || '',
        hs_lead_status: 'NEW',
        lifecyclestage: 'lead',
        lead_source: 'Site web Laurent Serre - Diagnostic Commercial',
        ...(body.message && { hs_content_membership_notes: body.message }),
        ...(body.principal_defi_commercial && { principal_defi_commercial: body.principal_defi_commercial })
      }
    };
    
    console.log(`${logPrefix} 📋 Données pour HubSpot:`, JSON.stringify(hubspotData, null, 2));
    
    // 6. Envoi des données à HubSpot
    console.log(`${logPrefix} 🚀 Envoi des données à HubSpot...`);
    
    // ... rest of the function ...
  } catch (error) {
    console.error(`${logPrefix} ❌ Erreur lors de la requête:`, error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la requête',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}