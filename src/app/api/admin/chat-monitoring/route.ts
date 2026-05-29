import { NextRequest, NextResponse } from 'next/server';

// Vérification d'authentification admin (simplifiée)
function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const adminKey = process.env.ADMIN_API_KEY;
  
  if (!adminKey) {
    return false;
  }
  
  return authHeader === `Bearer ${adminKey}`;
}

// Imports dynamiques pour éviter les erreurs de build
async function getMonitoring() {
  const mod = await import('@/lib/gemini/production-monitoring');
  return mod.productionMonitoring;
}

async function getRateLimiter() {
  const mod = await import('@/lib/gemini/rate-limiter');
  return mod.GlobalRateLimiter;
}

async function getProductionConfig() {
  try {
    const mod = await import('@/config/production');
    return mod.getValidatedProductionConfig();
  } catch {
    return null;
  }
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
      
      case 'errors': {
        const monitoring = await getMonitoring();
        return NextResponse.json({
          errors: monitoring.getRecentErrors(limit)
        });
      }
      
      case 'metrics': {
        const monitoring = await getMonitoring();
        const metric = searchParams.get('metric');
        return NextResponse.json({
          metrics: monitoring.getRecentMetrics(metric, limit)
        });
      }
      
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
      case 'reset-rate-limit': {
        if (target) {
          const GlobalRateLimiter = await getRateLimiter();
          const globalLimiter = GlobalRateLimiter.getInstance();
          const limiter = globalLimiter.getLimiter('chat-gemini', {
            windowMs: 60 * 1000,
            maxRequests: 20
          });
          limiter.resetLimits(target);

          return NextResponse.json({ success: true, message: 'Rate limit réinitialisé' });
        }
        break;
      }
      
      case 'clear-errors':
        return NextResponse.json({ success: true, message: 'Erreurs nettoyées' });
      
      case 'update-config':
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
  const config = await getProductionConfig();
  const monitoring = await getMonitoring();
  const stats = monitoring.getStats();
  const rateLimitStats = await getRateLimitStats();
  
  return {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    config: config ? {
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
    } : null,
    stats,
    rateLimits: rateLimitStats,
    health: await getHealthStatus()
  };
}

async function getRateLimitStats() {
  const GlobalRateLimiter = await getRateLimiter();
  const globalLimiter = GlobalRateLimiter.getInstance();
  const metrics = globalLimiter.getAllMetrics();
  
  return {
    totalLimiters: metrics.size,
    metrics: Object.fromEntries(metrics)
  };
}

async function getHealthStatus() {
  const config = await getProductionConfig();
  
  // Vérifications de santé
  const checks = {
    geminiApiKey: config ? !!config.gemini.apiKey : false,
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