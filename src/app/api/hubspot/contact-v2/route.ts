import { NextRequest, NextResponse } from 'next/server';

// ⚡ VERSION ALTERNATIVE POUR VERCEL
// Cette version utilise une approche différente pour accéder aux variables d'environnement

// Force l'exposition des variables au runtime
const getEnvVar = (name: string): string | undefined => {
  // Méthodes multiples pour récupérer les variables sur Vercel
  return process.env[name];
};

interface HubSpotContactData {
  properties: {
    firstname: string;
    lastname?: string;
    email: string;
    company?: string;
    message?: string;
    phone?: string;
    lifecyclestage?: string;
    lead_source?: string;
  };
}

export async function POST(request: NextRequest) {
  console.log('🚀 API HubSpot V2 - Début (spécial Vercel)');
  
  try {
    const body = await request.json();
    console.log('📝 Données reçues V2:', JSON.stringify(body, null, 2));
    
    const { 
      firstName, 
      lastName, 
      email, 
      company, 
      message, 
      phone,
      diagnosticScore,
      diagnosticLevel,
      formType 
    } = body;

    // Validation des données
    if (!firstName || !email) {
      console.log('❌ Validation échouée V2');
      return NextResponse.json(
        { error: 'Prénom et email sont obligatoires' },
        { status: 400 }
      );
    }

    // 🔧 MÉTHODE ALTERNATIVE POUR VERCEL
    const hubspotApiToken = getEnvVar('HUBSPOT_API_TOKEN') || 
                           getEnvVar('NEXT_PUBLIC_HUBSPOT_API_TOKEN');
    const hubspotPortalId = getEnvVar('HUBSPOT_PORTAL_ID') || 
                           getEnvVar('NEXT_PUBLIC_HUBSPOT_PORTAL_ID');
    
    console.log('🔑 Variables V2 (méthodes multiples):', {
      hasToken: !!hubspotApiToken,
      hasPortalId: !!hubspotPortalId,
      tokenStart: hubspotApiToken ? hubspotApiToken.substring(0, 8) + '...' : 'undefined',
      portalId: hubspotPortalId || 'undefined',
      allEnvKeys: Object.keys(process.env).filter(k => k.includes('HUBSPOT')),
      processEnvDirect: {
        token: !!process.env.HUBSPOT_API_TOKEN,
        portal: !!process.env.HUBSPOT_PORTAL_ID,
      }
    });
    
    if (!hubspotApiToken) {
      console.error('❌ HUBSPOT_API_TOKEN manquant V2');
      return NextResponse.json(
        { 
          error: 'Configuration HubSpot manquante V2',
          debug: {
            hasProcessEnv: !!process.env.HUBSPOT_API_TOKEN,
            envKeys: Object.keys(process.env).filter(k => k.includes('HUBSPOT')),
            nodeEnv: process.env.NODE_ENV,
            vercelRegion: process.env.VERCEL_REGION,
          }
        },
        { status: 500 }
      );
    }

    // Préparer les données pour HubSpot
    const contactData: HubSpotContactData = {
      properties: {
        firstname: firstName,
        lastname: lastName || '',
        email: email,
        company: company || '',
        phone: phone || '',
        lifecyclestage: 'lead',
        lead_source: 'Site web Laurent Serre V2',
        message: `${message || ''}\n\n--- Infos diagnostic V2 ---\nScore: ${diagnosticScore || 'N/A'}\nNiveau: ${diagnosticLevel || 'N/A'}\nType formulaire: ${formType || 'Contact'}`
      }
    };

    console.log('📤 Données préparées V2:', JSON.stringify(contactData, null, 2));

    // Appel direct à l'API HubSpot (sans utilitaire externe)
    const hubspotResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${hubspotApiToken}`,
      },
      body: JSON.stringify(contactData),
    });

    console.log('📊 Statut HubSpot V2:', hubspotResponse.status);

    if (!hubspotResponse.ok) {
      const errorData = await hubspotResponse.text();
      console.error('❌ Erreur HubSpot V2:', errorData);
      
      return NextResponse.json(
        { 
          error: 'Erreur HubSpot V2',
          status: hubspotResponse.status,
          details: errorData
        },
        { status: 500 }
      );
    }

    const hubspotData = await hubspotResponse.json();
    console.log('✅ Succès HubSpot V2:', hubspotData);

    return NextResponse.json({
      success: true,
      contactId: hubspotData.id,
      message: 'Contact créé avec succès V2',
      version: 'v2-vercel-optimized'
    });

  } catch (error: unknown) {
    console.error('❌ Erreur globale V2:', error);
    const errorObj = error instanceof Error ? error : new Error(String(error));
    console.error('Stack trace V2:', errorObj.stack);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'envoi vers HubSpot V2',
        details: process.env.NODE_ENV === 'development' ? errorObj.message : undefined,
        version: 'v2-vercel-optimized'
      },
      { status: 500 }
    );
  }
}