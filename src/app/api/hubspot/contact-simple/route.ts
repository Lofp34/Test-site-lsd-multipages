import { NextRequest, NextResponse } from 'next/server';

// 🚀 VERSION ULTRA-SIMPLE POUR DEBUG
export async function POST(request: NextRequest) {
  console.log('🆘 API SIMPLE - Début');
  
  try {
    // Test 1: Vérifier les variables d'environnement
    const token = process.env.HUBSPOT_API_TOKEN;
    const portalId = process.env.HUBSPOT_PORTAL_ID;
    
    console.log('🔑 Variables simples:', {
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
      tokenStart: token ? token.substring(0, 10) + '...' : 'undefined',
      portalId: portalId || 'undefined'
    });
    
    if (!token) {
      console.error('❌ TOKEN MANQUANT');
      return NextResponse.json({
        error: 'Token HubSpot manquant',
        debug: {
          NODE_ENV: process.env.NODE_ENV,
          VERCEL_REGION: process.env.VERCEL_REGION,
          hasToken: !!token,
          hasPortalId: !!portalId
        }
      }, { status: 500 });
    }
    
    // Test 2: Récupérer les données du formulaire
    const body = await request.json();
    const { firstName, email } = body;
    
    if (!firstName || !email) {
      return NextResponse.json({
        error: 'Prénom et email requis'
      }, { status: 400 });
    }
    
    // Test 3: Appel minimal à HubSpot
    const hubspotData = {
      properties: {
        firstname: firstName,
        email: email,
        lifecyclestage: 'lead',
        lead_source: 'Site web Laurent Serre - Test Simple'
      }
    };
    
    console.log('📤 Données HubSpot simples:', hubspotData);
    
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(hubspotData),
    });
    
    console.log('📊 Statut HubSpot Simple:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erreur HubSpot Simple:', errorText);
      
      return NextResponse.json({
        error: 'Erreur HubSpot',
        status: response.status,
        details: errorText,
        tokenValid: !!token
      }, { status: 500 });
    }
    
    const result = await response.json();
    console.log('✅ Succès HubSpot Simple:', result);
    
    return NextResponse.json({
      success: true,
      contactId: result.id,
      message: 'Contact créé avec l\'API simple'
    });
    
  } catch (error) {
    console.error('❌ Erreur globale simple:', error);
    
    return NextResponse.json({
      error: 'Erreur interne API simple',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}