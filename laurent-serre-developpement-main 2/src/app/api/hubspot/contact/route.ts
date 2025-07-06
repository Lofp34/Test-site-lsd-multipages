import { NextRequest, NextResponse } from 'next/server';
import { HubSpotContact } from '@/utils/hubspot';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, company, message } = await request.json();

    // Validation des données
    if (!firstName || !email) {
      return NextResponse.json(
        { error: 'Prénom et email sont obligatoires' },
        { status: 400 }
      );
    }

    // Configuration HubSpot
    const hubspotApiKey = process.env.HUBSPOT_API_KEY;
    
    if (!hubspotApiKey) {
      console.error('HUBSPOT_API_KEY manquante');
      return NextResponse.json(
        { error: 'Configuration serveur manquante' },
        { status: 500 }
      );
    }

    // Préparer les données pour HubSpot
    const contactData: HubSpotContact = {
      properties: {
        firstname: firstName,
        lastname: lastName || '',
        email: email,
        company: company || '',
        message: message || '',
        lifecyclestage: 'lead',
        lead_source: 'Site web Laurent Serre'
      }
    };

    // Envoi vers HubSpot API
    const hubspotResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${hubspotApiKey}`,
      },
      body: JSON.stringify(contactData),
    });

    if (!hubspotResponse.ok) {
      const errorData = await hubspotResponse.json();
      console.error('Erreur HubSpot:', errorData);
      
      // Si le contact existe déjà, on update
      if (errorData.category === 'CONFLICT') {
        return await updateExistingContact(email, contactData, hubspotApiKey);
      }
      
      throw new Error(`HubSpot API Error: ${hubspotResponse.status}`);
    }

    const hubspotData = await hubspotResponse.json();
    
    return NextResponse.json({
      success: true,
      contactId: hubspotData.id,
      message: 'Contact créé avec succès dans HubSpot'
    });

  } catch (error) {
    console.error('Erreur API HubSpot:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi vers HubSpot' },
      { status: 500 }
    );
  }
}

// Fonction pour mettre à jour un contact existant
async function updateExistingContact(email: string, contactData: HubSpotContact, apiKey: string) {
  try {
    // Rechercher le contact par email
    const searchResponse = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/search`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          filterGroups: [{
            filters: [{
              propertyName: 'email',
              operator: 'EQ',
              value: email
            }]
          }]
        }),
      }
    );

    const searchData = await searchResponse.json();
    
    if (searchData.results && searchData.results.length > 0) {
      const contactId = searchData.results[0].id;
      
      // Mettre à jour le contact
      const updateResponse = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify(contactData),
        }
      );

      if (updateResponse.ok) {
        return NextResponse.json({
          success: true,
          contactId: contactId,
          message: 'Contact mis à jour avec succès dans HubSpot'
        });
      }
    }

    throw new Error('Impossible de mettre à jour le contact');
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du contact' },
      { status: 500 }
    );
  }
} 