# Design Document - Audit des Liens Morts

## Overview

Ce système d'audit automatisé détectera, analysera et corrigera tous les liens morts du site Laurent Serre Développement. Il comprend un scanner complet, un système de rapport détaillé, des corrections automatiques et un mécanisme de demande de ressources avec envoi d'emails via SendGrid vers ls@laurentserre.com.

## Architecture

### Composants Principaux

1. **Link Scanner Engine** - Moteur de scan des liens
2. **Link Validator** - Validateur de liens
3. **Auto-Corrector** - Correcteur automatique
4. **Report Generator** - Générateur de rapports
5. **Resource Request System** - Système de demande de ressources avec SendGrid
6. **Monitoring Dashboard** - Tableau de bord de surveillance

### Flow de Données

```mermaid
graph TD
    A[Déclenchement Audit] --> B[Link Scanner]
    B --> C[Link Validator]
    C --> D{Lien Valide?}
    D -->|Non| E[Auto-Corrector]
    D -->|Oui| F[Marquer OK]
    E --> G{Correction Possible?}
    G -->|Oui| H[Appliquer Correction]
    G -->|Non| I[Marquer pour Action Manuelle]
    H --> J[Report Generator]
    I --> J
    F --> J
    J --> K[Rapport Final]
    K --> L[Monitoring Dashboard]
    
    M[Demande Ressource] --> N[SendGrid Email]
    N --> O[ls@laurentserre.com]
```

## Components and Interfaces

### 1. Link Scanner Engine

```typescript
interface LinkScannerConfig {
  baseUrl: string;
  maxDepth: number;
  includeExternal: boolean;
  excludePatterns: string[];
  followRedirects: boolean;
}

interface ScannedLink {
  url: string;
  sourceFile: string;
  sourceLine: number;
  linkType: 'internal' | 'external' | 'download' | 'anchor';
  context: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

class LinkScanner {
  async scanSite(config: LinkScannerConfig): Promise<ScannedLink[]>
  async scanFile(filePath: string): Promise<ScannedLink[]>
  async scanComponent(componentPath: string): Promise<ScannedLink[]>
  async scanSitemap(): Promise<ScannedLink[]>
}
```

### 2. Link Validator

```typescript
interface ValidationResult {
  url: string;
  status: 'valid' | 'broken' | 'redirect' | 'timeout' | 'unknown';
  statusCode?: number;
  redirectUrl?: string;
  error?: string;
  responseTime: number;
  lastChecked: Date;
}

interface ValidationConfig {
  timeout: number;
  retryAttempts: number;
  userAgent: string;
  followRedirects: boolean;
  checkAnchors: boolean;
  batchSize: number;
  rateLimitDelay: number;
}

class LinkValidator {
  async validateLink(url: string, config: ValidationConfig): Promise<ValidationResult>
  async validateBatch(urls: string[], config: ValidationConfig): Promise<ValidationResult[]>
  async checkFileExists(filePath: string): Promise<boolean>
  async validateInternalRoute(route: string): Promise<boolean>
}
```

### 3. Auto-Corrector

```typescript
interface CorrectionSuggestion {
  originalUrl: string;
  suggestedUrl: string;
  confidence: number;
  correctionType: 'typo' | 'extension' | 'redirect' | 'moved' | 'similar';
  reasoning: string;
}

interface CorrectionResult {
  applied: boolean;
  originalUrl: string;
  newUrl: string;
  filePath: string;
  backupCreated: boolean;
  rollbackId: string;
}

class AutoCorrector {
  async suggestCorrections(brokenLinks: ScannedLink[]): Promise<CorrectionSuggestion[]>
  async applyCorrection(suggestion: CorrectionSuggestion): Promise<CorrectionResult>
  async createBackup(filePath: string): Promise<string>
  async rollbackCorrection(rollbackId: string): Promise<boolean>
  async findSimilarUrls(brokenUrl: string): Promise<string[]>
}
```

### 4. SendGrid Email System

```typescript
interface SendGridConfig {
  apiKey: string; // Variable d'environnement SENDGRID_API_KEY
  fromEmail: string; // Email expéditeur vérifié
  fromName: string; // "Système Audit - Laurent Serre"
  adminEmail: string; // ls@laurentserre.com
}

interface EmailTemplate {
  subject: string;
  htmlContent: string;
  textContent: string;
}

interface ResourceRequestEmail {
  userEmail: string;
  resourceUrl: string;
  sourceUrl: string;
  message?: string;
  requestCount: number; // Nombre de fois que cette ressource a été demandée
}

class SendGridEmailService {
  private config: SendGridConfig;
  
  async sendResourceRequest(request: ResourceRequestEmail): Promise<boolean>
  async sendAuditAlert(brokenLinks: BrokenLinkDetail[]): Promise<boolean>
  async sendAutoResponse(userEmail: string, resourceUrl: string): Promise<boolean>
  async sendWeeklyReport(report: AuditReport): Promise<boolean>
  
  private generateResourceRequestTemplate(request: ResourceRequestEmail): EmailTemplate
  private generateAlertTemplate(brokenLinks: BrokenLinkDetail[]): EmailTemplate
}
```

### 5. Resource Request System

```typescript
interface ResourceRequest {
  id: string;
  requestedUrl: string;
  userEmail: string;
  message?: string;
  sourceUrl: string;
  timestamp: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  priority: number;
  requestCount: number; // Compteur global pour cette ressource
}

interface ResourceRequestConfig {
  adminEmail: string; // ls@laurentserre.com
  maxRequestsPerDay: number;
  enableAutoResponse: boolean;
  sendGridConfig: SendGridConfig;
}

class ResourceRequestSystem {
  async submitRequest(request: Omit<ResourceRequest, 'id' | 'timestamp' | 'status'>): Promise<string>
  async sendNotificationEmail(request: ResourceRequest): Promise<boolean>
  async sendAutoResponse(userEmail: string, resourceUrl: string): Promise<boolean>
  async getRequestStats(): Promise<{ total: number; pending: number; completed: number }>
  async getMostRequestedResources(): Promise<{ url: string; count: number }[]>
}
```

### 6. Report Generator

```typescript
interface AuditReport {
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

interface BrokenLinkDetail {
  url: string;
  sourceFiles: string[];
  linkType: string;
  priority: string;
  error: string;
  suggestedActions: string[];
  seoImpact: number;
  lastWorking?: Date;
}

interface SEOImpactAnalysis {
  criticalIssues: number;
  estimatedTrafficLoss: number;
  affectedPages: string[];
  priorityActions: string[];
  linkHealthScore: number;
}

class ReportGenerator {
  async generateReport(results: ValidationResult[]): Promise<AuditReport>
  async exportToJSON(report: AuditReport): Promise<string>
  async exportToHTML(report: AuditReport): Promise<string>
  async exportToCSV(report: AuditReport): Promise<string>
  async calculateSEOImpact(brokenLinks: BrokenLinkDetail[]): Promise<SEOImpactAnalysis>
}
```

## Data Models

### Base de Données Supabase

```sql
-- Table des liens scannés
CREATE TABLE scanned_links (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  url TEXT NOT NULL,
  source_file TEXT NOT NULL,
  source_line INTEGER,
  link_type TEXT NOT NULL CHECK (link_type IN ('internal', 'external', 'download', 'anchor')),
  priority TEXT NOT NULL CHECK (priority IN ('critical', 'high', 'medium', 'low')),
  context TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_scanned_links_url ON scanned_links(url);
CREATE INDEX idx_scanned_links_type_priority ON scanned_links(link_type, priority);

-- Table des résultats de validation
CREATE TABLE validation_results (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  url TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('valid', 'broken', 'redirect', 'timeout', 'unknown')),
  status_code INTEGER,
  redirect_url TEXT,
  error_message TEXT,
  response_time INTEGER,
  checked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_validation_results_url_status ON validation_results(url, status);
CREATE INDEX idx_validation_results_checked_at ON validation_results(checked_at);

-- Table des corrections appliquées
CREATE TABLE applied_corrections (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  original_url TEXT NOT NULL,
  corrected_url TEXT NOT NULL,
  file_path TEXT NOT NULL,
  correction_type TEXT NOT NULL CHECK (correction_type IN ('typo', 'extension', 'redirect', 'moved', 'similar')),
  confidence DECIMAL(3,2),
  rollback_id TEXT UNIQUE,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  rollback_data JSONB
);

-- Index pour les rollbacks
CREATE INDEX idx_applied_corrections_rollback_id ON applied_corrections(rollback_id);

-- Table des demandes de ressources
CREATE TABLE resource_requests (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  requested_url TEXT NOT NULL,
  user_email TEXT NOT NULL,
  message TEXT,
  source_url TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'rejected')),
  priority INTEGER DEFAULT 1,
  request_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_resource_requests_url ON resource_requests(requested_url);
CREATE INDEX idx_resource_requests_status ON resource_requests(status);

-- Table des audits
CREATE TABLE audit_history (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  total_links INTEGER,
  broken_links INTEGER,
  corrected_links INTEGER,
  seo_score DECIMAL(5,2),
  report_path TEXT,
  execution_time INTEGER, -- en secondes
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des métriques de performance
CREATE TABLE link_health_metrics (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  date DATE NOT NULL,
  total_links INTEGER,
  broken_links INTEGER,
  health_score DECIMAL(5,2),
  response_time_avg INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date)
);

-- RLS (Row Level Security) - Optionnel pour sécuriser l'accès
ALTER TABLE scanned_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE validation_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE applied_corrections ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_health_metrics ENABLE ROW LEVEL SECURITY;

-- Policies pour permettre l'accès aux services (service_role)
CREATE POLICY "Service role can manage all data" ON scanned_links FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage all data" ON validation_results FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage all data" ON applied_corrections FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage all data" ON resource_requests FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage all data" ON audit_history FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage all data" ON link_health_metrics FOR ALL USING (auth.role() = 'service_role');
```

## Configuration SendGrid

### Variables d'environnement Vercel

```bash
# SendGrid Configuration
SENDGRID_API_KEY=SG.your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@laurentserre.com
SENDGRID_FROM_NAME=Système Audit - Laurent Serre
ADMIN_EMAIL=ls@laurentserre.com

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://dghiuuvlzzfrirridqqr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnaGl1dXZsenpmcmlycmlkcXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3ODk2NDIsImV4cCI6MjA2OTM2NTY0Mn0.PTYszxgjn5rVd07ZrFxCPW9OFprvD_9gGuwHiMdl-1A
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Application
NEXT_PUBLIC_BASE_URL=https://laurentserre.com
AUDIT_SCHEDULE_ENABLED=true
```

### Templates d'emails SendGrid

#### 1. Demande de ressource
```html
<!-- Template ID: d-resource-request -->
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #1B365D;">Nouvelle demande de ressource</h2>
  
  <div style="background: #F2F5F7; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>📧 Email du demandeur :</strong> {{userEmail}}</p>
    <p><strong>📄 Ressource demandée :</strong> {{resourceUrl}}</p>
    <p><strong>🌐 Page source :</strong> {{sourceUrl}}</p>
    <p><strong>📊 Nombre de demandes :</strong> {{requestCount}} fois</p>
    {{#if message}}
    <p><strong>💬 Message :</strong></p>
    <p style="background: white; padding: 15px; border-radius: 4px;">{{message}}</p>
    {{/if}}
  </div>
  
  <p style="color: #00BDA4; font-weight: bold;">
    Cette ressource a été demandée {{requestCount}} fois ce mois-ci.
  </p>
  
  <hr style="margin: 30px 0;">
  <p style="color: #666; font-size: 12px;">
    Système d'audit automatique - Laurent Serre Développement
  </p>
</div>
```

#### 2. Alerte liens morts
```html
<!-- Template ID: d-broken-links-alert -->
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #EF4444;">🚨 Alerte : Liens morts détectés</h2>
  
  <div style="background: #FEF2F2; border-left: 4px solid #EF4444; padding: 20px; margin: 20px 0;">
    <p><strong>{{brokenLinksCount}} liens morts</strong> ont été détectés sur votre site.</p>
    <p><strong>Score de santé :</strong> {{healthScore}}%</p>
  </div>
  
  <h3>Liens critiques à corriger :</h3>
  <ul>
    {{#each criticalLinks}}
    <li style="margin: 10px 0;">
      <strong>{{url}}</strong><br>
      <span style="color: #666;">{{error}} - Impact SEO: {{seoImpact}}</span>
    </li>
    {{/each}}
  </ul>
  
  <a href="{{reportUrl}}" style="background: #00BDA4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">
    Voir le rapport complet
  </a>
</div>
```

## API Routes Next.js

### 1. Demande de ressource

```typescript
// app/api/resource-request/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { SendGridEmailService } from '@/lib/sendgrid';
import { ResourceRequestSystem } from '@/lib/resource-request';

export async function POST(request: NextRequest) {
  try {
    const { userEmail, resourceUrl, sourceUrl, message } = await request.json();
    
    // Validation
    if (!userEmail || !resourceUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Enregistrer la demande
    const requestSystem = new ResourceRequestSystem();
    const requestId = await requestSystem.submitRequest({
      userEmail,
      resourceUrl,
      sourceUrl,
      message
    });
    
    // Envoyer l'email via SendGrid
    const emailService = new SendGridEmailService();
    await emailService.sendResourceRequest({
      userEmail,
      resourceUrl,
      sourceUrl,
      message,
      requestCount: await requestSystem.getRequestCount(resourceUrl)
    });
    
    // Réponse automatique à l'utilisateur
    await emailService.sendAutoResponse(userEmail, resourceUrl);
    
    return NextResponse.json({ success: true, requestId });
    
  } catch (error) {
    console.error('Resource request error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### 2. Audit automatique

```typescript
// app/api/audit-links/route.ts
import { NextResponse } from 'next/server';
import { LinkAuditSystem } from '@/lib/link-audit';
import { SendGridEmailService } from '@/lib/sendgrid';

export async function GET() {
  try {
    const auditSystem = new LinkAuditSystem();
    const results = await auditSystem.runFullAudit();
    
    // Si liens morts critiques détectés
    if (results.summary.brokenLinks > 0) {
      const emailService = new SendGridEmailService();
      await emailService.sendAuditAlert(results.brokenLinks);
    }
    
    return NextResponse.json({
      success: true,
      summary: results.summary,
      reportUrl: `/reports/${results.reportId}`
    });
    
  } catch (error) {
    console.error('Audit error:', error);
    return NextResponse.json({ error: 'Audit failed' }, { status: 500 });
  }
}
```

## Déploiement et Monitoring

### Vercel Cron Jobs

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/audit-links",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/weekly-report",
      "schedule": "0 9 * * 1"
    }
  ]
}
```

### Monitoring Dashboard

```typescript
// app/dashboard/audit/page.tsx
export default function AuditDashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-ink mb-8">
        Audit des Liens - Dashboard
      </h1>
      
      {/* Métriques en temps réel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Santé des Liens"
          value="94%"
          trend="+2%"
          color="green"
        />
        <MetricCard 
          title="Liens Morts"
          value="12"
          trend="-5"
          color="red"
        />
        <MetricCard 
          title="Demandes Ressources"
          value="23"
          trend="+8"
          color="blue"
        />
        <MetricCard 
          title="Corrections Auto"
          value="7"
          trend="+3"
          color="mint"
        />
      </div>
      
      {/* Graphiques et tableaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LinkHealthChart />
        <BrokenLinksTable />
        <ResourceRequestsChart />
        <RecentActivity />
      </div>
    </div>
  );
}
```

Cette architecture avec SendGrid vous garantit une solution robuste et professionnelle pour l'audit des liens morts avec notifications email fiables vers ls@laurentserre.com.