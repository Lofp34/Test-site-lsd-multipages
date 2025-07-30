/**
 * API pour gérer les pages temporaires
 * 
 * Cette API permet de créer, modifier et supprimer des pages temporaires
 * pour les ressources manquantes.
 */

import { NextRequest, NextResponse } from 'next/server';
import { temporaryPageGenerator, TemporaryPageConfig } from '@/lib/temporary-pages/generator';
import { autoDetector, defaultDetectionConfig } from '@/lib/temporary-pages/auto-detector';

/**
 * GET - Obtenir toutes les pages temporaires ou les statistiques
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    
    switch (action) {
      case 'stats':
        const stats = await temporaryPageGenerator.getStats();
        return NextResponse.json({ success: true, stats });
        
      case 'list':
      default:
        const pages = await temporaryPageGenerator.getAllTemporaryPages();
        return NextResponse.json({ success: true, pages });
    }
    
  } catch (error) {
    console.error('Erreur GET /api/temporary-pages:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des pages temporaires' },
      { status: 500 }
    );
  }
}

/**
 * POST - Créer une nouvelle page temporaire ou lancer la détection automatique
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;
    
    switch (action) {
      case 'create':
        // Créer une page temporaire manuelle
        const config: TemporaryPageConfig = {
          resourceUrl: data.resourceUrl,
          sourceUrl: data.sourceUrl || '/',
          resourceType: data.resourceType || 'other',
          title: data.title,
          description: data.description,
          estimatedDate: data.estimatedDate,
          priority: data.priority || 'medium',
          developmentStatus: data.developmentStatus || 'planned',
          progress: data.progress,
          alternatives: data.alternatives
        };
        
        // Validation
        if (!config.resourceUrl) {
          return NextResponse.json(
            { success: false, error: 'resourceUrl est requis' },
            { status: 400 }
          );
        }
        
        const temporaryUrl = await temporaryPageGenerator.createTemporaryPage(config);
        
        return NextResponse.json({
          success: true,
          message: 'Page temporaire créée avec succès',
          temporaryUrl,
          config
        });
        
      case 'auto-detect':
        // Lancer la détection automatique
        const detectionConfig = {
          ...defaultDetectionConfig,
          ...data.config
        };
        
        const detectionResult = await autoDetector.detectAndCreateTemporaryPages(detectionConfig);
        
        return NextResponse.json({
          success: true,
          message: 'Détection automatique terminée',
          result: detectionResult
        });
        
      case 'cleanup':
        // Nettoyer les pages obsolètes
        const cleanupResult = await autoDetector.cleanupObsoletePages();
        
        return NextResponse.json({
          success: true,
          message: 'Nettoyage terminé',
          result: cleanupResult
        });
        
      default:
        return NextResponse.json(
          { success: false, error: 'Action non reconnue' },
          { status: 400 }
        );
    }
    
  } catch (error) {
    console.error('Erreur POST /api/temporary-pages:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création de la page temporaire' },
      { status: 500 }
    );
  }
}

/**
 * PUT - Mettre à jour une page temporaire existante
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { resourceUrl, ...updates } = body;
    
    if (!resourceUrl) {
      return NextResponse.json(
        { success: false, error: 'resourceUrl est requis' },
        { status: 400 }
      );
    }
    
    await temporaryPageGenerator.updateTemporaryPage(resourceUrl, updates);
    
    return NextResponse.json({
      success: true,
      message: 'Page temporaire mise à jour avec succès'
    });
    
  } catch (error) {
    console.error('Erreur PUT /api/temporary-pages:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour de la page temporaire' },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Supprimer une page temporaire
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resourceUrl = searchParams.get('resourceUrl');
    
    if (!resourceUrl) {
      return NextResponse.json(
        { success: false, error: 'resourceUrl est requis' },
        { status: 400 }
      );
    }
    
    await temporaryPageGenerator.removeTemporaryPage(decodeURIComponent(resourceUrl));
    
    return NextResponse.json({
      success: true,
      message: 'Page temporaire supprimée avec succès'
    });
    
  } catch (error) {
    console.error('Erreur DELETE /api/temporary-pages:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression de la page temporaire' },
      { status: 500 }
    );
  }
}