import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_PORTAL_ID = '7401198';
const DEFAULT_FORM_ID = '884e2971-2d90-4ca1-86ee-eb824f43f074';

const allowedFormIds = new Set([
  DEFAULT_FORM_ID,
  'e4741a23-ddaf-4cb5-8774-9e36f7937c79', // Diagnostic commercial
]);

function addField(fields: Array<{ name: string; value: string }>, name: string, value?: unknown) {
  if (value === undefined || value === null || value === '') {
    return;
  }

  fields.push({ name, value: String(value) });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const requestedFormId = typeof body.formId === 'string' ? body.formId : DEFAULT_FORM_ID;
    const formId = allowedFormIds.has(requestedFormId) ? requestedFormId : DEFAULT_FORM_ID;
    const hubspotEndpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${DEFAULT_PORTAL_ID}/${formId}`;

    const fields: Array<{ name: string; value: string }> = [];
    addField(fields, 'firstname', body.firstName);
    addField(fields, 'lastname', body.lastName);
    addField(fields, 'email', body.email);
    addField(fields, 'phone', body.phone);
    addField(fields, 'mobilephone', body.phone);
    addField(fields, 'company', body.company);
    addField(fields, 'message', body.message);
    addField(fields, 'principal_defi_commercial', body.principal_defi_commercial);

    const context = {
      pageUri: body.pageUri || request.headers.get('referer') || 'https://www.laurentserre.com',
      pageName: body.pageName || 'Contact via site laurentserre.com',
    };

    const payload = {
      fields,
      context,
    };

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
    }

    if (hubspotData.status === 'error' && hubspotData.category === 'CONFLICT') {
      return NextResponse.json(
        { success: false, message: 'Un contact avec cet email existe déjà dans HubSpot.', hubspotError: hubspotData, status: 409 },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Erreur lors de l’envoi à HubSpot', hubspotError: hubspotData, status: hubspotRes.status },
      { status: hubspotRes.status }
    );
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erreur serveur', error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
