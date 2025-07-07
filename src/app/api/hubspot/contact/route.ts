import { NextRequest, NextResponse } from 'next/server';
import { 
  HubSpotContact, 
  createHubSpotContact, 
  updateHubSpotContact, 
  searchHubSpotContactByEmail 
} from '@/utils/hubspot';

export async function POST(request: NextRequest) {
  console.log('🚀 API HubSpot - Début de la requête');
  
  try {
    const body = await request.json();
    console.log('📝 Données reçues:', JSON.stringify(body, null, 2));
    
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
      console.log('❌ Validation échouée - Champs requis manquants');
      return NextResponse.json(
        { error: 'Prénom et email sont obligatoires' },
        { status: 400 }
      );
    }

    // Configuration HubSpot avec vos variables
    const hubspotApiToken = process.env.HUBSPOT_API_TOKEN;
    const hubspotPortalId = process.env.HUBSPOT_PORTAL_ID;
    
    console.log('🔑 Variables d\'environnement:', {
      hasToken: !!hubspotApiToken,
      hasPortalId: !!hubspotPortalId,
      tokenStart: hubspotApiToken ? hubspotApiToken.substring(0, 8) + '...' : 'undefined',
      tokenValue: hubspotApiToken || 'undefined',
      allEnvVars: Object.keys(process.env).filter(key => key.includes('HUBSPOT'))
    });
    
    if (!hubspotApiToken || hubspotApiToken === 'your_hubspot_token_here') {
      console.error('❌ HUBSPOT_API_TOKEN manquante ou non configurée');
      console.error('📋 Variables d\'environnement HubSpot disponibles:', Object.keys(process.env).filter(key => key.includes('HUBSPOT')));
      return NextResponse.json(
        { 
          error: 'Configuration HubSpot manquante',
          details: 'Veuillez configurer HUBSPOT_API_TOKEN dans .env.local',
          currentToken: hubspotApiToken || 'undefined'
        },
        { status: 500 }
      );
    }

    // Préparer les données pour HubSpot (propriétés standard seulement)
    const contactData: HubSpotContact = {
      properties: {
        firstname: firstName,
        lastname: lastName || '',
        email: email,
        company: company || '',
        phone: phone || '',
        lifecyclestage: 'lead',
        lead_source: 'Site web Laurent Serre',
        // Stocker les infos supplémentaires dans le message
        message: `${message || ''}\n\n--- Infos diagnostic ---\nScore: ${diagnosticScore || 'N/A'}\nNiveau: ${diagnosticLevel || 'N/A'}\nType formulaire: ${formType || 'Contact'}`
      }
    };

    console.log('📤 Données préparées pour HubSpot:', JSON.stringify(contactData, null, 2));

    try {
      // Essayer de créer le contact
      console.log('📞 Appel createHubSpotContact...');
      const hubspotData = await createHubSpotContact(contactData, hubspotApiToken);
      console.log('✅ Contact créé avec succès:', hubspotData);
      
      return NextResponse.json({
        success: true,
        contactId: hubspotData.id,
        message: 'Contact créé avec succès dans HubSpot'
      });

    } catch (error: any) {
      console.log('⚠️ Erreur lors de la création, tentative de mise à jour...');
      console.error('Détails de l\'erreur:', error);
      
      // Si le contact existe déjà (conflit), on le met à jour
      if (error.message.includes('CONFLICT') || error.message.includes('409')) {
        try {
          console.log('🔍 Recherche du contact existant par email...');
          const existingContacts = await searchHubSpotContactByEmail(email, hubspotApiToken);
          console.log('📋 Contacts trouvés:', existingContacts);
          
          if (existingContacts.length > 0) {
            const contactId = existingContacts[0].id;
            console.log('🔄 Mise à jour du contact ID:', contactId);
            const updatedContact = await updateHubSpotContact(contactId, contactData, hubspotApiToken);
            console.log('✅ Contact mis à jour avec succès:', updatedContact);
            
            return NextResponse.json({
              success: true,
              contactId: updatedContact.id,
              message: 'Contact mis à jour avec succès dans HubSpot'
            });
          }
        } catch (updateError) {
          console.error('❌ Erreur lors de la mise à jour:', updateError);
        }
      }
      
      throw error;
    }

  } catch (error: any) {
    console.error('❌ Erreur API HubSpot globale:', error);
    console.error('Stack trace:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'envoi vers HubSpot',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
} 