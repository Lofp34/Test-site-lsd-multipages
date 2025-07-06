// Types pour HubSpot API
export interface HubSpotContact {
  properties: {
    firstname: string;
    lastname: string;
    email: string;
    company?: string;
    message?: string;
    lifecyclestage?: string;
    lead_source?: string;
  };
}

export interface HubSpotResponse {
  id: string;
  properties: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface HubSpotSearchResponse {
  results: HubSpotResponse[];
  total: number;
}

export interface HubSpotError {
  status: string;
  message: string;
  correlationId: string;
  category: string;
}

// Constantes HubSpot
export const HUBSPOT_API_BASE_URL = 'https://api.hubapi.com/crm/v3/objects';
export const HUBSPOT_FORMS_EMBED_URL = '//js.hsforms.net/forms/embed/v2.js';

// Configuration par défaut
export const DEFAULT_HUBSPOT_CONFIG = {
  region: 'na1',
  portalId: '7401198',
  formId: '884e2971-2d90-4ca1-86ee-eb824f43f074',
};