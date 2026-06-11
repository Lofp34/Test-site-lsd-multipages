import { NextRequest, NextResponse } from 'next/server';

const PORTAL_ID = '7401198';

/**
 * Formulaire HubSpot dédié à la newsletter.
 * Créé dans HubSpot → Marketing > Forms avec un email-only field.
 * Fallback vers le formulaire de contact principal si pas de form newsletter.
 */
const NEWSLETTER_FORM_ID = '884e2971-2d90-4ca1-86ee-eb824f43f074';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    const hubspotEndpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${NEWSLETTER_FORM_ID}`;

    const payload = {
      fields: [
        { name: 'email', value: email.trim() },
      ],
      context: {
        pageUri: request.headers.get('referer') || 'https://www.laurentserre.com',
        pageName: 'Newsletter Footer — laurentserre.com',
        hutk: '', // sera rempli par HubSpot si présent
      },
    };

    const hsRes = await fetch(hubspotEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (hsRes.ok) {
      return NextResponse.json({ success: true });
    }

    const hsData = await hsRes.json().catch(() => ({}));

    // CONFLICT = email déjà existant → on considère comme un succès
    if (hsData.status === 'error' && hsData.category === 'CONFLICT') {
      return NextResponse.json({ success: true, info: 'already registered' });
    }

    console.error('HubSpot newsletter error:', hsData);
    return NextResponse.json(
      { error: 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  } catch (err) {
    console.error('Newsletter API error:', err);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
