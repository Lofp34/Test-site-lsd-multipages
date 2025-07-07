import { NextRequest, NextResponse } from 'next/server';
import { 
  HubSpotContact, 
  createHubSpotContact, 
  updateHubSpotContact, 
  searchHubSpotContactByEmail 
} from '@/utils/hubspot';

export async function POST(request: NextRequest) {
  try {
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
    } = await request.json();

    // Validation des données
    if (!firstName || !email) {
      return NextResponse.json(
        { error: 'Prénom et email sont obligatoires' },
        { status: 400 }
      );
    }

    // Configuration HubSpot avec vos variables
    const hubspotApiToken = process.env.HUBSPOT_API_TOKEN;
    const hubspotPortalId = process.env.HUBSPOT_PORTAL_ID;
    
    if (!hubspotApiToken) {
      console.error('HUBSPOT_API_TOKEN manquante');
      return NextResponse.json(
        { error: 'Configuration HubSpot manquante' },
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
        phone: phone || '',
        lifecyclestage: 'lead',
        lead_source: 'Site web Laurent Serre',
        diagnostic_score: diagnosticScore || '',
        diagnostic_level: diagnosticLevel || '',
        form_type: formType || 'Contact'
      }
    };

    try {
      // Essayer de créer le contact
      const hubspotData = await createHubSpotContact(contactData, hubspotApiToken);
      
      return NextResponse.json({
        success: true,
        contactId: hubspotData.id,
        message: 'Contact créé avec succès dans HubSpot'
      });

    } catch (error: any) {
      // Si le contact existe déjà (conflit), on le met à jour
      if (error.message.includes('CONFLICT') || error.message.includes('409')) {
        try {
          const existingContacts = await searchHubSpotContactByEmail(email, hubspotApiToken);
          
          if (existingContacts.length > 0) {
            const contactId = existingContacts[0].id;
            const updatedContact = await updateHubSpotContact(contactId, contactData, hubspotApiToken);
            
            return NextResponse.json({
              success: true,
              contactId: updatedContact.id,
              message: 'Contact mis à jour avec succès dans HubSpot'
            });
          }
        } catch (updateError) {
          console.error('Erreur lors de la mise à jour:', updateError);
        }
      }
      
      throw error;
    }

  } catch (error) {
    console.error('Erreur API HubSpot:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi vers HubSpot' },
      { status: 500 }
    );
  }
} 