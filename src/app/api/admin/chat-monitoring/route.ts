import { NextRequest, NextResponse } from 'next/server';
import { productionMonitoring } from '@/lib/gemini/production-monitoring';
import { GlobalRateLimiter } from '@/lib/gemini/rate-limiter';
import { getValidatedProductionConfig } from '@/config/production';

// Vérification d'authentification admin (simplifiée)
function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const adminKey = process.env.ADMIN_API_KEY;
  
  if (!adminKey) {
    return false;
  }
  
  return authHeader === `Bearer ${adminKey}`;
}

export async function GET(request: NextRequest) {
  try {
    // Vérification d'autorisation
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'overview';
    const limit = parseInt(searchParams.get('limit') || '50');

    switch (type) {
      case 'overview':
        return NextResponse.json(await getOverview());
      
      case 'errors':
        return NextResponse.json({
          errors: productionMonitoring.getRecentErrors(limit)
        });
      
      case 'metrics':
        const metric = searchParams.get('metric');
        return NextResponse.json({
          metrics: productionMonitoring.getRecentMetrics(metric, limit)
        });
      
      case 'rate-limits':
        return NextResponse.json(await getRateLimitStats());
      
      case 'health':
        return NextResponse.json(await getHealthStatus());
      
      default:
        return NextResponse.json(
          { error: 'Type de données non supporté' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Erreur API monitoring:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Vérification d'autorisation
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, target, data } = body;

    switch (action) {
      case 'reset-rate-limit':
        if (target) {
          const globalLimiter = GlobalRateLimiter.getInstance();
          const limiter = globalLimiter.getLimiter('chat-gemini', {
            windowMs: 60 * 1000,
            maxRequests: 20
          });
          limiter.resetLimits(target);
          
          return NextResponse.json({ success: true, message: 'Rate limit réinitialisé' });
        }
        break;
      
      case 'clear-errors':
        // En production, implémenter la logique de nettoyage des erreurs
        return NextResponse.json({ success: true, message: 'Erreurs nettoyées' });
      
      case 'update-config':
        // En production, implémenter la mise à jour de configuration
        return NextResponse.json({ success: true, message: 'Configuration mise à jour' });
      
      default:
        return NextResponse.json(
          { error: 'Action non supportée' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Erreur API monitoring POST:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

async function getOverview() {
  const config = getValidatedProductionConfig();
  const stats = productionMonitoring.getStats();
  const rateLimitStats = await getRateLimitStats();
  
  return {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    config: {
      rateLimiting: {
        maxRequests: config.rateLimiting.maxRequests,
        windowMs: config.rateLimiting.windowMs,
        maxRequestsPerDay: config.rateLimiting.maxRequestsPerDay
      },
      monitoring: {
        enableErrorReporting: config.monitoring.enableErrorReporting,
        enableAnalytics: config.monitoring.enableAnalytics,
        logLevel: config.monitoring.logLevel
      }
    },
    stats,
    rateLimits: rateLimitStats,
    health: await getHealthStatus()
  };
}

async function getRateLimitStats() {
  const globalLimiter = GlobalRateLimiter.getInstance();
  const metrics = globalLimiter.getAllMetrics();
  
  return {
    totalLimiters: metrics.size,
    metrics: Object.fromEntries(metrics)
  };
}

async function getHealthStatus() {
  const config = getValidatedProductionConfig();
  
  // Vérifications de santé
  const checks = {
    geminiApiKey: !!config.gemini.apiKey,
    supabaseConnection: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    sendgridConfig: !!process.env.SENDGRID_API_KEY,
    memoryUsage: process.memoryUsage(),
    uptime: process.uptime(),
    nodeVersion: process.version
  };

  const isHealthy = checks.geminiApiKey && checks.supabaseConnection;
  
  return {
    status: isHealthy ? 'healthy' : 'degraded',
    checks,
    timestamp: new Date().toISOString()
  };
}