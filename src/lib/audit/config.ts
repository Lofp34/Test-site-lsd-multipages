// Configuration for the audit system
import { SendGridConfig, ValidationConfig, ResourceRequestConfig } from './types';

let _sendGridConfig: SendGridConfig | null = null;
let _validationConfig: ValidationConfig | null = null;
let _resourceRequestConfig: ResourceRequestConfig | null = null;

// SendGrid configuration (lazy-loaded)
export const sendGridConfig = (): SendGridConfig => {
  if (!_sendGridConfig) {
    _sendGridConfig = {
      apiKey: process.env.SENDGRID_API_KEY!,
      fromEmail: process.env.SENDGRID_FROM_EMAIL!,
      fromName: process.env.SENDGRID_FROM_NAME!,
      adminEmail: process.env.ADMIN_EMAIL!,
    };
  }
  return _sendGridConfig;
};

// Validation configuration (lazy-loaded)
export const validationConfig = (): ValidationConfig => {
  if (!_validationConfig) {
    _validationConfig = {
      timeout: parseInt(process.env.AUDIT_TIMEOUT || '30000'),
      retryAttempts: parseInt(process.env.AUDIT_RETRY_ATTEMPTS || '3'),
      userAgent: 'Laurent Serre Link Audit Bot/1.0',
      followRedirects: true,
      checkAnchors: true,
      batchSize: parseInt(process.env.AUDIT_BATCH_SIZE || '10'),
      rateLimitDelay: parseInt(process.env.AUDIT_RATE_LIMIT_DELAY || '1000'),
    };
  }
  return _validationConfig;
};

// Resource request configuration (lazy-loaded)
export const resourceRequestConfig = (): ResourceRequestConfig => {
  if (!_resourceRequestConfig) {
    _resourceRequestConfig = {
      adminEmail: process.env.ADMIN_EMAIL!,
      maxRequestsPerDay: parseInt(process.env.AUDIT_MAX_REQUESTS_PER_DAY || '100'),
      enableAutoResponse: process.env.AUDIT_ENABLE_AUTO_RESPONSE === 'true',
      sendGridConfig: sendGridConfig(),
    };
  }
  return _resourceRequestConfig;
};

// Base URL for the application
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://laurentserre.com';

// Validate required environment variables
export function validateConfig(): void {
  const required = [
    'SENDGRID_API_KEY',
    'SENDGRID_FROM_EMAIL',
    'SENDGRID_FROM_NAME',
    'ADMIN_EMAIL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// Default scanner configuration
export const defaultScannerConfig = {
  baseUrl,
  maxDepth: 3,
  includeExternal: true,
  excludePatterns: [
    'node_modules/**',
    '.git/**',
    '.next/**',
    'dist/**',
    'build/**',
    '*.log',
    '*.tmp',
  ],
  followRedirects: true,
};