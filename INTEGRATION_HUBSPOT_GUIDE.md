# Guide d'Intégration HubSpot - Diagnostic Commercial Laurent Serre

## Vue d'ensemble

Ce guide vous permettra de connecter votre formulaire de diagnostic commercial existant à votre compte HubSpot, permettant de capturer automatiquement les leads qualifiés directement dans votre CRM.

## Prérequis

- Compte HubSpot actif
- Accès administrateur à HubSpot
- Clé API HubSpot (Token d'accès privé)
- Portal ID HubSpot

## Étape 1 : Configuration HubSpot

### 1.1 Créer une Application Privée

1. Connectez-vous à votre compte HubSpot
2. Allez dans **Paramètres** > **Intégrations** > **Applications privées**
3. Cliquez sur **Créer une application privée**
4. Donnez un nom : "Diagnostic Commercial Laurent Serre"
5. **Portées requises** :
   - `forms` (Lecture/Écriture)
   - `contacts` (Lecture/Écriture)
   - `companies` (Lecture/Écriture)
   - `tickets` (Lecture/Écriture) - Optionnel pour le suivi

### 1.2 Obtenir les Identifiants

- **Token d'accès** : Copiez le token généré (commence par `pat-`)
- **Portal ID** : Trouvable dans **Paramètres** > **Compte et facturation** > **Informations du compte**

### 1.3 Créer un Formulaire HubSpot (Optionnel)

1. Allez dans **Marketing** > **Formulaires**
2. Créez un formulaire "Diagnostic Commercial PME"
3. Ajoutez les champs :
   - Prénom (firstname)
   - Nom (lastname) 
   - Email (email)
   - Entreprise (company)
   - Téléphone (phone)
   - Nombre d'employés (nb_employees - champ personnalisé)
   - CA annuel (annual_revenue - champ personnalisé)
   - Problématique principale (main_issue - champ personnalisé)
4. Notez l'ID du formulaire

## Étape 2 : Implémentation Technique

### 2.1 Variables d'Environnement

Ajoutez à votre fichier `.env.local` :

```
HUBSPOT_API_TOKEN=votre_token_ici
HUBSPOT_PORTAL_ID=votre_portal_id_ici
HUBSPOT_FORM_ID=votre_form_id_ici
```

### 2.2 Installation des Dépendances

```bash
npm install @hubspot/api-client
```

### 2.3 API Route Next.js

Créez `src/app/api/hubspot/submit/route.ts` :

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@hubspot/api-client';

const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_API_TOKEN });

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Formatage des données pour HubSpot
    const properties = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      company: data.company,
      phone: data.phone,
      nb_employees: data.nbEmployees,
      annual_revenue: data.annualRevenue,
      main_issue: data.mainIssue,
      lead_source: 'Diagnostic Commercial Site Web',
      lifecycle_stage: 'lead'
    };

    // Création du contact
    const contactResponse = await hubspotClient.crm.contacts.basicApi.create({
      properties
    });

    // Soumission du formulaire (optionnel si formulaire HubSpot créé)
    if (process.env.HUBSPOT_FORM_ID) {
      await hubspotClient.marketing.forms.formsApi.submit(
        process.env.HUBSPOT_FORM_ID!,
        {
          fields: Object.entries(properties).map(([name, value]) => ({
            name,
            value: String(value)
          })),
          context: {
            pageUri: data.pageUri || '',
            pageName: 'Diagnostic Commercial'
          }
        }
      );
    }

    return NextResponse.json({ 
      success: true, 
      contactId: contactResponse.id,
      message: 'Données envoyées avec succès vers HubSpot' 
    });

  } catch (error) {
    console.error('Erreur HubSpot:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de l\'envoi vers HubSpot' 
      },
      { status: 500 }
    );
  }
}
```

### 2.4 Modification du Composant Diagnostic

Modifiez votre composant de diagnostic pour inclure l'envoi vers HubSpot :

```typescript
const handleSubmit = async (formData: FormData) => {
  try {
    // Votre logique existante...
    
    // Envoi vers HubSpot
    const hubspotData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      company: formData.get('company'),
      phone: formData.get('phone'),
      nbEmployees: formData.get('nbEmployees'),
      annualRevenue: formData.get('annualRevenue'),
      mainIssue: formData.get('mainIssue'),
      pageUri: window.location.href
    };

    const hubspotResponse = await fetch('/api/hubspot/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hubspotData)
    });

    if (hubspotResponse.ok) {
      console.log('Lead envoyé vers HubSpot avec succès');
    }
    
  } catch (error) {
    console.error('Erreur:', error);
  }
};
```

## Étape 3 : Configuration Avancée

### 3.1 Propriétés Personnalisées

Créez ces propriétés personnalisées dans HubSpot :

1. **nb_employees** (Nombre d'employés)
   - Type : Nombre
   - Groupe : Informations sur l'entreprise

2. **annual_revenue** (CA annuel)
   - Type : Nombre
   - Groupe : Informations sur l'entreprise

3. **main_issue** (Problématique principale)
   - Type : Texte long
   - Groupe : Qualification commerciale

### 3.2 Workflow d'Automatisation

1. Créez un workflow qui se déclenche sur "Contact créé"
2. Ajoutez des conditions basées sur les réponses du diagnostic
3. Actions possibles :
   - Assignation automatique au commercial
   - Envoi d'email de suivi personnalisé
   - Création de tâche de rappel
   - Scoring automatique du lead

### 3.3 Email de Notification

Configurez une notification email automatique :

```typescript
// Dans votre API route
const emailData = {
  emailId: VOTRE_EMAIL_TEMPLATE_ID,
  message: {
    to: [{ email: data.email, name: `${data.firstName} ${data.lastName}` }],
    from: { email: 'laurent@laurent-serre.fr', name: 'Laurent Serre' }
  }
};

await hubspotClient.marketing.transactionalEmails.singleSendApi.sendEmail(emailData);
```

## Étape 4 : Tests et Validation

### 4.1 Tests de Développement

```bash
# Test en local
curl -X POST http://localhost:3000/api/hubspot/submit \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User", 
    "email": "test@example.com",
    "company": "Test Corp",
    "phone": "0123456789"
  }'
```

### 4.2 Vérifications HubSpot

1. Vérifiez la création du contact dans **Contacts**
2. Contrôlez les propriétés personnalisées
3. Validez le déclenchement des workflows
4. Testez les notifications

## Étape 5 : Monitoring et Analytics

### 5.1 Suivi des Conversions

- Configurez des événements de conversion dans HubSpot
- Trackez le taux de conversion du diagnostic
- Mesurez la qualité des leads générés

### 5.2 Reporting

- Créez des rapports sur les sources de leads
- Analysez les réponses au diagnostic
- Suivez le ROI du diagnostic

## Troubleshooting

### Erreurs Communes

1. **Token invalide** : Vérifiez les portées de l'application privée
2. **Portal ID incorrect** : Double-vérifiez dans les paramètres HubSpot
3. **Propriétés manquantes** : Créez les champs personnalisés
4. **CORS Error** : Configurez les domaines autorisés dans HubSpot

### Logs de Debug

Ajoutez des logs détaillés pour le debug :

```typescript
console.log('HubSpot submission data:', hubspotData);
console.log('HubSpot response:', await hubspotResponse.json());
```

## Sécurité

- Jamais de tokens côté client
- Validation des données côté serveur
- Rate limiting sur l'API
- Sanitisation des inputs

## Support

Pour toute question technique :
- Documentation HubSpot : https://developers.hubspot.com/
- API Client Node.js : https://github.com/HubSpot/hubspot-api-nodejs

---

**Estimation d'implémentation :** 2-4 heures
**Niveau technique :** Intermédiaire
**Maintenance :** Faible (vérification trimestrielle des tokens)