// Types for the audit system

export interface LinkScannerConfig {
  baseUrl: string;
  maxDepth: number;
  includeExternal: boolean;
  excludePatterns: string[];
  followRedirects: boolean;
}

export interface ScannedLink {
  url: string;
  sourceFile: string;
  sourceLine: number;
  linkType: 'internal' | 'external' | 'download' | 'anchor';
  context: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface ValidationResult {
  url: string;
  status: 'valid' | 'broken' | 'redirect' | 'timeout' | 'unknown';
  statusCode?: number;
  redirectUrl?: string;
  error?: string;
  responseTime: number;
  lastChecked: Date;
}

export interface ValidationConfig {
  timeout: number;
  retryAttempts: number;
  userAgent: string;
  followRedirects: boolean;
  checkAnchors: boolean;
  batchSize: number;
  rateLimitDelay: number;
}

export interface CorrectionSuggestion {
  originalUrl: string;
  suggestedUrl: string;
  confidence: number;
  correctionType: 'typo' | 'extension' | 'redirect' | 'moved' | 'similar';
  reasoning: string;
}

export interface CorrectionResult {
  applied: boolean;
  originalUrl: string;
  newUrl: string;
  filePath: string;
  backupCreated: boolean;
  rollbackId: string;
}

export interface SendGridConfig {
  apiKey: string;
  fromEmail: string;
  fromName: string;
  adminEmail: string;
}

export interface EmailTemplate {
  subject: string;
  htmlContent: string;
  textContent: string;
}

export interface ResourceRequestEmail {
  userEmail: string;
  resourceUrl: string;
  sourceUrl: string;
  message?: string;
  requestCount: number;
}

export interface ResourceRequest {
  id: string;
  requestedUrl: string;
  userEmail: string;
  message?: string;
  sourceUrl: string;
  timestamp: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  priority: number;
  requestCount: number;
}

export interface ResourceRequestConfig {
  adminEmail: string;
  maxRequestsPerDay: number;
  enableAutoResponse: boolean;
  sendGridConfig: SendGridConfig;
}

export interface AuditReport {
  timestamp: Date;
  summary: {
    totalLinks: number;
    validLinks: number;
    brokenLinks: number;
    correctedLinks: number;
    pendingLinks: number;
    seoHealthScore: number;
  };
  brokenLinks: BrokenLinkDetail[];
  corrections: CorrectionResult[];
  recommendations: string[];
  seoImpact: SEOImpactAnalysis;
  resourceRequests: {
    totalRequests: number;
    mostRequested: { url: string; count: number }[];
  };
}

export interface BrokenLinkDetail {
  url: string;
  sourceFiles: string[];
  linkType: string;
  priority: string;
  error: string;
  suggestedActions: string[];
  seoImpact: number;
  lastWorking?: Date;
}

export interface SEOImpactAnalysis {
  criticalIssues: number;
  estimatedTrafficLoss: number;
  affectedPages: string[];
  priorityActions: string[];
  linkHealthScore: number;
}