// Main exports for the audit system
export { LinkScanner } from './link-scanner';
export { FileScanner } from './file-scanner';
export { SitemapScanner } from './sitemap-scanner';
export { LinkClassifier } from './link-classifier';

// Type exports
export type {
  LinkScannerConfig,
  ScannedLink,
  ValidationResult,
  ValidationConfig,
  CorrectionSuggestion,
  CorrectionResult,
  SendGridConfig,
  EmailTemplate,
  ResourceRequestEmail,
  ResourceRequest,
  ResourceRequestConfig,
  AuditReport,
  BrokenLinkDetail,
  SEOImpactAnalysis
} from './types';

export type {
  FileScanResult
} from './file-scanner';

export type {
  SitemapScanResult
} from './sitemap-scanner';

export type {
  LinkClassification,
  LinkContext,
  ClassificationStatistics
} from './link-classifier';

export type {
  LinkScanResult
} from './link-scanner';

// Configuration exports
export {
  sendGridConfig,
  validationConfig,
  resourceRequestConfig,
  baseUrl,
  validateConfig,
  defaultScannerConfig
} from './config';