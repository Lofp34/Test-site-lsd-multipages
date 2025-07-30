/**
 * API Route d'administration pour les demandes de ressources
 * 
 * GET /api/admin/resource-requests - Obtenir les demandes et statistiques
 * PUT /api/admin/resource-requests/[id] - Mettre à jour une demande
 */

import { NextRequest, NextResponse } from 'next/server';
import { getResourceRequestSystem } from '@/lib/email/resource-request-system';
import { ResourceRequestAnalyticsService } from '@/lib/email/resource-request-analytics';

/**
 * Vérifier l'authentification admin (simplifié pour la démo)
 */
function verifyAdminAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  
  // En production, implémenter une vraie authentification
  // Pour la démo, on accepte n'importe quel token Bearer
  return authHeader?.startsWith('Bearer ') || false;
}

/**
 * GET - Obtenir les demandes de ressources et statistiques
 */
export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    if (!verifyAdminAuth(request)) {
      return NextResponse.json(
        { error: 'Authentification requise' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'requests';
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const requestSystem = getResourceRequestSystem();

    switch (type) {
      case 'requests': {
        // Obtenir les demandes
        let requests;
        if (status && status !== 'all') {
          // Filtrer par statut (implémentation simplifiée)
          requests = await requestSystem.getPendingRequests(limit);
        } else {
          requests = await requestSystem.getPendingRequests(limit);
        }

        return NextResponse.json({
          success: true,
          data: requests
        });
      }

      case 'stats': {
        // Obtenir les statistiques
        const stats = await requestSystem.getRequestStats();
        return NextResponse.json({
          success: true,
          data: stats
        });
      }

      case 'analytics': {
        // Obtenir les analytics avancées
        const analyticsService = new ResourceRequestAnalyticsService();
        
        const dateRange = startDate && endDate ? {
          start: new Date(startDate),
          end: new Date(endDate)
        } : undefined;

        const analytics = await analyticsService.getAnalytics(dateRange);
        
        return NextResponse.json({
          success: true,
          data: analytics
        });
      }

      case 'export': {
        // Exporter en CSV
        const analyticsService = new ResourceRequestAnalyticsService();
        
        const dateRange = startDate && endDate ? {
          start: new Date(startDate),
          end: new Date(endDate)
        } : undefined;

        const csvContent = await analyticsService.exportToCSV(dateRange);
        
        return new NextResponse(csvContent, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="resource-requests.csv"'
          }
        });
      }

      default:
        return NextResponse.json(
          { error: 'Type de requête non supporté' },
          { status: 400 }
        );
    }

  } catch (error: any) {
    console.error('Erreur dans l\'API admin resource-requests:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

/**
 * PUT - Mettre à jour le statut d'une demande
 */
export async function PUT(request: NextRequest) {
  try {
    // Vérifier l'authentification
    if (!verifyAdminAuth(request)) {
      return NextResponse.json(
        { error: 'Authentification requise' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { requestId, status, notes } = body;

    if (!requestId || !status) {
      return NextResponse.json(
        { error: 'ID de demande et statut requis' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'in_progress', 'completed', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Statut invalide' },
        { status: 400 }
      );
    }

    const requestSystem = getResourceRequestSystem();
    const success = await requestSystem.updateRequestStatus(requestId, status);

    if (!success) {
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Statut mis à jour avec succès'
    });

  } catch (error: any) {
    console.error('Erreur lors de la mise à jour:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

/**
 * POST - Actions en lot sur les demandes
 */
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    if (!verifyAdminAuth(request)) {
      return NextResponse.json(
        { error: 'Authentification requise' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, requestIds, newStatus } = body;

    if (!action || !requestIds || !Array.isArray(requestIds)) {
      return NextResponse.json(
        { error: 'Action et IDs de demandes requis' },
        { status: 400 }
      );
    }

    const requestSystem = getResourceRequestSystem();

    switch (action) {
      case 'bulk_update_status': {
        if (!newStatus) {
          return NextResponse.json(
            { error: 'Nouveau statut requis' },
            { status: 400 }
          );
        }

        const results = await Promise.all(
          requestIds.map(id => requestSystem.updateRequestStatus(id, newStatus))
        );

        const successCount = results.filter(Boolean).length;

        return NextResponse.json({
          success: true,
          message: `${successCount}/${requestIds.length} demandes mises à jour`,
          successCount,
          totalCount: requestIds.length
        });
      }

      case 'cleanup_old': {
        const deletedCount = await requestSystem.cleanupOldRequests();
        
        return NextResponse.json({
          success: true,
          message: `${deletedCount} anciennes demandes supprimées`,
          deletedCount
        });
      }

      default:
        return NextResponse.json(
          { error: 'Action non supportée' },
          { status: 400 }
        );
    }

  } catch (error: any) {
    console.error('Erreur lors de l\'action en lot:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}