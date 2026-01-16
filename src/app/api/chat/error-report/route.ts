import { NextRequest, NextResponse } from 'next/server';
import { RateLimiter } from '@/lib/gemini/rate-limiter';

// Rate limiting pour les rapports d'erreur
const errorReportLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5, // 5 rapports par minute par IP
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
});

interface ErrorReport {
  error: {
    type: string;
    message: string;
    timestamp: string;
  };
  context: {
    sessionId: string;
    operation: string;
    retryCount: number;
    userAgent: string;
    networkStatus: string;
  };
  environment: {
    url: string;
    userAgent: string;
    timestamp: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = request.ip || 
                    request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    const rateLimitResult = await errorReportLimiter.checkLimit(clientIP);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Trop de rapports d\'erreur envoyés' },
        { status: 429 }
      );
    }

    // Validation du body
    const body: ErrorReport = await request.json();
    
    if (!body.error || !body.context || !body.environment) {
      return NextResponse.json(
        { error: 'Format de rapport invalide' },
        { status: 400 }
      );
    }

    // Validation des champs requis
    const requiredErrorFields = ['type', 'message', 'timestamp'];
    const requiredContextFields = ['sessionId', 'operation', 'userAgent'];
    
    for (const field of requiredErrorFields) {
      if (!body.error[field as keyof typeof body.error]) {
        return NextResponse.json(
          { error: `Champ requis manquant: error.${field}` },
          { status: 400 }
        );
      }
    }
    
    for (const field of requiredContextFields) {
      if (!body.context[field as keyof typeof body.context]) {
        return NextResponse.json(
          { error: `Champ requis manquant: context.${field}` },
          { status: 400 }
        );
      }
    }

    // Sanitisation des données
    const sanitizedReport = sanitizeErrorReport(body);

    // Logging sécurisé (sans données sensibles)
    console.error('Chat Error Report:', {
      type: sanitizedReport.error.type,
      operation: sanitizedReport.context.operation,
      retryCount: sanitizedReport.context.retryCount,
      networkStatus: sanitizedReport.context.networkStatus,
      timestamp: sanitizedReport.error.timestamp,
      ip: clientIP
    });

    // Enregistrement en base de données (si configuré)
    if (process.env.ERROR_REPORTING_ENABLED === 'true') {
      await saveErrorReport(sanitizedReport, clientIP);
    }

    // Alertes pour erreurs critiques
    if (isCriticalError(sanitizedReport)) {
      await sendCriticalErrorAlert(sanitizedReport, clientIP);
    }

    return NextResponse.json({
      success: true,
      message: 'Rapport d\'erreur enregistré',
      reportId: generateReportId(sanitizedReport)
    });

  } catch (error) {
    console.error('Erreur lors du traitement du rapport d\'erreur:', error);
    
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

/**
 * Sanitise le rapport d'erreur
 */
function sanitizeErrorReport(report: ErrorReport): ErrorReport {
  return {
    error: {
      type: sanitizeString(report.error.type),
      message: sanitizeString(report.error.message, 1000), // Limite à 1000 caractères
      timestamp: sanitizeString(report.error.timestamp)
    },
    context: {
      sessionId: sanitizeString(report.context.sessionId, 100),
      operation: sanitizeString(report.context.operation, 50),
      retryCount: Math.max(0, Math.min(report.context.retryCount || 0, 10)), // 0-10
      userAgent: sanitizeString(report.context.userAgent, 500),
      networkStatus: sanitizeString(report.context.networkStatus, 20)
    },
    environment: {
      url: sanitizeUrl(report.environment.url),
      userAgent: sanitizeString(report.environment.userAgent, 500),
      timestamp: sanitizeString(report.environment.timestamp)
    }
  };
}

/**
 * Sanitise une chaîne de caractères
 */
function sanitizeString(str: string, maxLength: number = 255): string {
  if (typeof str !== 'string') {
    return '';
  }
  
  // Supprimer les caractères dangereux
  const sanitized = str
    .replace(/[<>"'&]/g, '') // Supprimer les caractères HTML/JS dangereux
    .replace(/[\r\n\t]/g, ' ') // Remplacer les retours à la ligne par des espaces
    .trim();
  
  // Limiter la longueur
  return sanitized.length > maxLength ? sanitized.substring(0, maxLength) : sanitized;
}

/**
 * Sanitise une URL
 */
function sanitizeUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    
    // Vérifier que c'est une URL de notre domaine ou localhost
    const allowedHosts = [
      'laurent-serre-developpement.fr',
      'www.laurent-serre-developpement.fr',
      'localhost'
    ];
    
    if (!allowedHosts.some(host => parsedUrl.hostname.includes(host))) {
      return 'external-url';
    }
    
    // Retourner seulement le pathname pour éviter les données sensibles
    return parsedUrl.pathname;
  } catch {
    return 'invalid-url';
  }
}

/**
 * Sauvegarde le rapport d'erreur
 */
async function saveErrorReport(report: ErrorReport, clientIP: string): Promise<void> {
  try {
    // Ici, on sauvegarderait en base de données
    // Pour l'instant, on log dans un fichier ou service externe
    
    const reportData = {
      ...report,
      metadata: {
        clientIP: hashIP(clientIP), // Hash de l'IP pour la confidentialité
        serverTimestamp: new Date().toISOString(),
        version: process.env.APP_VERSION || 'unknown'
      }
    };

    // Exemple d'envoi vers un service de monitoring externe
    if (process.env.ERROR_WEBHOOK_URL) {
      await fetch(process.env.ERROR_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ERROR_WEBHOOK_TOKEN}`
        },
        body: JSON.stringify(reportData)
      });
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du rapport:', error);
  }
}

/**
 * Détermine si une erreur est critique
 */
function isCriticalError(report: ErrorReport): boolean {
  const criticalTypes = [
    'api_unavailable',
    'quota_exceeded'
  ];
  
  const criticalOperations = [
    'initialize_chat'
  ];
  
  return criticalTypes.includes(report.error.type) ||
         criticalOperations.includes(report.context.operation) ||
         report.context.retryCount >= 3;
}

/**
 * Envoie une alerte pour erreur critique
 */
async function sendCriticalErrorAlert(report: ErrorReport, clientIP: string): Promise<void> {
  try {
    const alertData = {
      level: 'critical',
      service: 'chat-gemini',
      error: report.error,
      context: report.context,
      clientIP: hashIP(clientIP),
      timestamp: new Date().toISOString()
    };

    // Envoyer vers un service d'alertes (Slack, Discord, email, etc.)
    if (process.env.ALERT_WEBHOOK_URL) {
      await fetch(process.env.ALERT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ALERT_WEBHOOK_TOKEN}`
        },
        body: JSON.stringify(alertData)
      });
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'alerte critique:', error);
  }
}

/**
 * Génère un ID unique pour le rapport
 */
function generateReportId(report: ErrorReport): string {
  const timestamp = Date.now();
  const hash = hashString(`${report.error.type}_${report.context.sessionId}_${timestamp}`);
  return `err_${timestamp}_${hash.substring(0, 8)}`;
}

/**
 * Hash une chaîne de caractères (simple)
 */
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convertir en 32bit integer
  }
  return Math.abs(hash).toString(16);
}

/**
 * Hash une IP pour la confidentialité
 */
function hashIP(ip: string): string {
  return hashString(`${ip}_${process.env.IP_SALT || 'default_salt'}`);
}

// Options pour CORS
export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}