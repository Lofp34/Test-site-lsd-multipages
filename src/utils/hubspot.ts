export interface HubSpotContact {
  properties: {
    firstname: string;
    lastname?: string;
    email: string;
    company?: string;
    message?: string;
    phone?: string;
    lifecyclestage?: string;
    lead_source?: string;
    diagnostic_score?: string;
    diagnostic_level?: string;
    form_type?: string;
  };
}

export interface HubSpotResponse {
  id: string;
  properties: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export const HUBSPOT_CONFIG = {
  BASE_URL: 'https://api.hubapi.com',
  API_VERSION: 'v3',
  ENDPOINTS: {
    CONTACTS: '/crm/v3/objects/contacts',
    SEARCH: '/crm/v3/objects/contacts/search',
  }
};

export const createHubSpotContact = async (
  contactData: HubSpotContact,
  apiToken: string
): Promise<HubSpotResponse> => {
  const response = await fetch(`${HUBSPOT_CONFIG.BASE_URL}${HUBSPOT_CONFIG.ENDPOINTS.CONTACTS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiToken}`,
    },
    body: JSON.stringify(contactData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`HubSpot API Error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  return response.json();
};

export const updateHubSpotContact = async (
  contactId: string,
  contactData: HubSpotContact,
  apiToken: string
): Promise<HubSpotResponse> => {
  const response = await fetch(`${HUBSPOT_CONFIG.BASE_URL}${HUBSPOT_CONFIG.ENDPOINTS.CONTACTS}/${contactId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiToken}`,
    },
    body: JSON.stringify(contactData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`HubSpot API Error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  return response.json();
};

export const searchHubSpotContactByEmail = async (
  email: string,
  apiToken: string
): Promise<HubSpotResponse[]> => {
  const searchBody = {
    filterGroups: [{
      filters: [{
        propertyName: 'email',
        operator: 'EQ',
        value: email
      }]
    }]
  };

  const response = await fetch(`${HUBSPOT_CONFIG.BASE_URL}${HUBSPOT_CONFIG.ENDPOINTS.SEARCH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiToken}`,
    },
    body: JSON.stringify(searchBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`HubSpot Search Error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  return data.results || [];
};