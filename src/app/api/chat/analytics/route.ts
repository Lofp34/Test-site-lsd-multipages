import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

/**
 * API endpoint pour recevoir les données d'analytics du chat Gemini
 * POST /api/chat/analytics
 */

interface AnalyticsBatch {
  type: 'sessions' | 'messages' | 'errors' | 'performance' | 'conversation_analytics';
  data: any[];
}

// Stockage temporaire en mémoire (en production, utiliser une vraie DB)
const analyticsStorage = {
  sessions: [] as any[],
  messages: [] as any[],
  errors: [] as any[],
  performance: [] as any[],
  conversation_analytics: [] as any[]
};

export async function POST(request: NextRequest) {
  try {
    // Vérification de sécurité basique
    const headersList = headers();
    const contentType = headersList.get('content-type');
    
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    const batch: AnalyticsBatch = await request.json();

    // Validation du batch
    if (!batch.type || !Array.isArray(batch.data)) {
      return NextResponse.json(
        { error: 'Invalid batch format' },
        { status: 400 }
      );
    }

    // Validation du type de batch
    const validTypes = ['sessions', 'messages', 'errors', 'performance', 'conversation_analytics'];
    if (!validTypes.includes(batch.type)) {
      return NextResponse.json(
        { error: 'Invalid batch type' },
        { status: 400 }
      );
    }

    // Stockage des données
    switch (batch.type) {
      case 'sessions':
        analyticsStorage.sessions.push(...batch.data);
        break;
      case 'messages':
        analyticsStorage.messages.push(...batch.data);
        break;
      case 'errors':
        analyticsStorage.errors.push(...batch.data);
        break;
      case 'performance':
        analyticsStorage.performance.push(...batch.data);
        break;
      case 'conversation_analytics':
        analyticsStorage.conversation_analytics.push(...batch.data);
        break;
    }

    // Nettoyage périodique pour éviter la surcharge mémoire
    cleanupOldData();

    // Log pour monitoring (en production, utiliser un vrai système de logging)
    console.log(`Analytics batch received: ${batch.type}, ${batch.data.length} items`);

    return NextResponse.json({
      success: true,
      message: `Batch of ${batch.data.length} ${batch.type} items processed`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing analytics batch:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint pour récupérer les statistiques d'analytics
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '100');
    const since = searchParams.get('since');

    let data: any[] = [];

    // Sélection des données selon le type
    switch (type) {
      case 'sessions':
        data = analyticsStorage.sessions;
        break;
      case 'messages':
        data = analyticsStorage.messages;
        break;
      case 'errors':
        data = analyticsStorage.errors;
        break;
      case 'performance':
        data = analyticsStorage.performance;
        break;
      case 'conversation_analytics':
        data = analyticsStorage.conversation_analytics;
        break;
      case 'summary':
        return NextResponse.json(generateSummary());
      default:
        return NextResponse.json({
          sessions: analyticsStorage.sessions.length,
          messages: analyticsStorage.messages.length,
          errors: analyticsStorage.errors.length,
          performance: analyticsStorage.performance.length,
          conversation_analytics: analyticsStorage.conversation_analytics.length
        });
    }

    // Filtrage par date si spécifié
    if (since) {
      const sinceDate = new Date(since);
      data = data.filter(item => {
        const itemDate = new Date(item.timestamp || item.startTime);
        return itemDate >= sinceDate;
      });
    }

    // Limitation du nombre de résultats
    data = data.slice(-limit);

    return NextResponse.json({
      type,
      count: data.length,
      data,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error retrieving analytics data:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Génère un résumé des analytics
 */
function generateSummary() {
  const now = new Date();
  const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Sessions
  const totalSessions = analyticsStorage.sessions.length;
  const sessionsLast24h = analyticsStorage.sessions.filter(s => 
    new Date(s.startTime) >= last24Hours
  ).length;
  const sessionsLastWeek = analyticsStorage.sessions.filter(s => 
    new Date(s.startTime) >= lastWeek
  ).length;

  // Messages
  const totalMessages = analyticsStorage.messages.length;
  const messagesLast24h = analyticsStorage.messages.filter(m => 
    new Date(m.timestamp) >= last24Hours
  ).length;

  // Erreurs
  const totalErrors = analyticsStorage.errors.length;
  const errorsLast24h = analyticsStorage.errors.filter(e => 
    new Date(e.timestamp) >= last24Hours
  ).length;

  // Taux d'erreur
  const errorRate = totalMessages > 0 ? (totalErrors / totalMessages) * 100 : 0;
  const errorRateLast24h = messagesLast24h > 0 ? (errorsLast24h / messagesLast24h) * 100 : 0;

  // Performance moyenne
  const responseTimeMetrics = analyticsStorage.performance.filter(p => 
    p.metricType === 'response_time'
  );
  const avgResponseTime = responseTimeMetrics.length > 0
    ? responseTimeMetrics.reduce((sum, m) => sum + m.value, 0) / responseTimeMetrics.length
    : 0;

  // Types d'erreurs les plus fréquents
  const errorTypeCounts = analyticsStorage.errors.reduce((acc, error) => {
    acc[error.errorType] = (acc[error.errorType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topErrorTypes = Object.entries(errorTypeCounts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Répartition par type d'appareil
  const deviceBreakdown = analyticsStorage.sessions.reduce((acc, session) => {
    acc[session.deviceType] = (acc[session.deviceType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    overview: {
      totalSessions,
      totalMessages,
      totalErrors,
      errorRate: Math.round(errorRate * 100) / 100,
      avgResponseTime: Math.round(avgResponseTime)
    },
    last24Hours: {
      sessions: sessionsLast24h,
      messages: messagesLast24h,
      errors: errorsLast24h,
      errorRate: Math.round(errorRateLast24h * 100) / 100
    },
    lastWeek: {
      sessions: sessionsLastWeek
    },
    topErrorTypes,
    deviceBreakdown,
    timestamp: now.toISOString()
  };
}

/**
 * Nettoie les anciennes données pour éviter la surcharge mémoire
 */
function cleanupOldData() {
  const maxItems = 10000; // Maximum d'items par type
  const cutoffDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 jours

  // Nettoyer chaque type de données
  Object.keys(analyticsStorage).forEach(key => {
    const storage = analyticsStorage[key as keyof typeof analyticsStorage];
    
    // Supprimer les anciens éléments
    const filtered = storage.filter(item => {
      const itemDate = new Date(item.timestamp || item.startTime);
      return itemDate >= cutoffDate;
    });
    
    // Limiter le nombre total d'éléments
    if (filtered.length > maxItems) {
      analyticsStorage[key as keyof typeof analyticsStorage] = filtered.slice(-maxItems);
    } else {
      analyticsStorage[key as keyof typeof analyticsStorage] = filtered;
    }
  });
}

/**
 * DELETE endpoint pour nettoyer les données (admin seulement)
 */
export async function DELETE(request: NextRequest) {
  try {
    // En production, ajouter une authentification admin ici
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const confirm = searchParams.get('confirm');

    if (confirm !== 'true') {
      return NextResponse.json(
        { error: 'Confirmation required. Add ?confirm=true' },
        { status: 400 }
      );
    }

    if (type && type in analyticsStorage) {
      analyticsStorage[type as keyof typeof analyticsStorage] = [];
      return NextResponse.json({
        success: true,
        message: `${type} data cleared`,
        timestamp: new Date().toISOString()
      });
    } else if (!type) {
      // Nettoyer toutes les données
      Object.keys(analyticsStorage).forEach(key => {
        analyticsStorage[key as keyof typeof analyticsStorage] = [];
      });
      return NextResponse.json({
        success: true,
        message: 'All analytics data cleared',
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid type specified' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error clearing analytics data:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}