import { NextRequest, NextResponse } from 'next/server';

// Paramètres HubSpot
const portalId = '7401198';
const formId = '884e2971-2d90-4ca1-86ee-eb824f43f074';
const hubspotEndpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Préparation des champs pour HubSpot
    const fields = [
      { name: 'firstname', value: body.firstName || '' },
      { name: 'lastname', value: body.lastName || '' },
      { name: 'email', value: body.email || '' },
      { name: 'phone', value: body.phone || '' },
      { name: 'message', value: body.message || '' },
    ];
    // Contexte de la page
    const context = {
      pageUri: body.pageUri || '',
      pageName: body.pageName || 'Contact via site laurentserre.com',
    };
    // Construction du payload
    const payload = {
      fields,
      context,
    };
    // Envoi à HubSpot
    const hubspotRes = await fetch(hubspotEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const hubspotData = await hubspotRes.json();
    if (hubspotRes.ok) {
      return NextResponse.json({ success: true, message: 'Votre message a bien été envoyé !', hubspot: hubspotData });
    } else {
      // Gestion du doublon
      if (hubspotData.status === 'error' && hubspotData.category === 'CONFLICT') {
        return NextResponse.json({ success: false, message: 'Un contact avec cet email existe déjà dans HubSpot.', hubspotError: hubspotData, status: 409 }, { status: 409 });
      }
      return NextResponse.json({ success: false, message: 'Erreur lors de l’envoi à HubSpot', hubspotError: hubspotData, status: hubspotRes.status }, { status: hubspotRes.status });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erreur serveur', error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
} 