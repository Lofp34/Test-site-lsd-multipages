/**
 * Types for the link validation system
 */

export interface LinkValidationResult {
  url: string;
  isValid: boolean;
  statusCode?: number;
  error?: string;
  suggestedRedirect?: string;
  redirectReason?: string;
}

export interface RedirectMapping {
  [originalUrl: string]: {
    redirectTo: string;
    reason: string;
    statusCode: 301 | 302;
  };
}

export interface ResourceLink {
  id: string;
  title: string;
  originalHref: string;
  validatedHref: string;
  isActive: boolean;
  redirectReason?: string;
  category: 'prospection' | 'closing' | 'management' | 'tools' | 'general';
}

export interface LinkValidationConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  fallbackUrl: string;
  enableLogging: boolean;
}

export interface ValidationReport {
  totalLinks: number;
  validLinks: number;
  brokenLinks: number;
  redirectedLinks: number;
  results: LinkValidationResult[];
  generatedAt: Date;
}