/**
 * Cron job pour la maintenance automatique des pages temporaires
 * 
 * Cette API est appelée périodiquement pour :
 * - Nettoyer les pages temporaires obsolètes
 * - Mettre à jour le sitemap
 * - Détecter de nouvelles ressources manquantes
 */

import { NextRequest, NextResponse } from 'next/server';
import { autoDetector, defaultDetectionConfig } from '@/lib/temporary-pages/auto-detector';
import { sitemapIntegration } from '@/lib/temporary-pages/sitemap-integration';
import { temporaryPageGenerator } from '@/lib/temporary-pages/generator';

/**
 * GET - Maintenance automatique des pages temporaires
 */
export async function GET(_request: NextRequest) {
  const startTime = Date.now();
  
  try {
    console.log('🔧 Début de la maintenance automatique des pages temporaires');
    
    const results = {
      timestamp: new Date().toISOString(),
      cleanup: { removed: 0, errors: [] as string[] },
      detection: { 
        totalLinks: 0, 
        brokenLinks: 0, 
        temporaryPagesCreated: 0, 
        errors: [] as string[] 
      },
      sitemap: { updated: false, errors: [] as string[] },
      stats: {
        totalPages: 0,
        byType: {} as Record<string, number>,
        byPriority: {} as Record<string, number>,
        byStatus: {} as Record<string, number>
      },
      executionTime: 0
    };
    
    // 1. Nettoyer les pages temporaires obsolètes
    console.log('🧹 Nettoyage des pages obsolètes...');
    try {
      results.cleanup = await autoDetector.cleanupObsoletePages();
      console.log(`✅ Nettoyage terminé: ${results.cleanup.removed} pages supprimées`);
    } catch (error) {
      const errorMsg = `Erreur lors du nettoyage: ${error}`;
      results.cleanup.errors.push(errorMsg);
      console.error(errorMsg);
    }
    
    // 2. Détecter de nouvelles ressources manquantes (mode léger)
    console.log('🔍 Détection de nouvelles ressources manquantes...');
    try {
      const detectionConfig = {
        ...defaultDetectionConfig,
        maxDepth: 2, // Réduire la profondeur pour les tâches cron
        timeout: 5000, // Timeout plus court
        retryAttempts: 1
      };
      
      // Note: En production, cette détection devrait être limitée ou désactivée
      // pour éviter une charge excessive sur le serveur
      const shouldRunDetection = process.env.ENABLE_AUTO_DETECTION === 'true';
      
      if (shouldRunDetection) {
        results.detection = await autoDetector.detectAndCreateTemporaryPages(detectionConfig);
        console.log(`✅ Détection terminée: ${results.detection.temporaryPagesCreated} nouvelles pages créées`);
      } else {
        console.log('⚠️  Détection automatique désactivée (ENABLE_AUTO_DETECTION=false)');
      }
    } catch (error) {
      const errorMsg = `Erreur lors de la détection: ${error}`;
      results.detection.errors.push(errorMsg);
      console.error(errorMsg);
    }
    
    // 3. Mettre à jour le sitemap
    console.log('🗺️  Mise à jour du sitemap...');
    try {
      await sitemapIntegration.updateSitemapWithTemporaryPages();
      results.sitemap.updated = true;
      console.log('✅ Sitemap mis à jour');
    } catch (error) {
      const errorMsg = `Erreur lors de la mise à jour du sitemap: ${error}`;
      results.sitemap.errors.push(errorMsg);
      console.error(errorMsg);
    }
    
    // 4. Collecter les statistiques finales
    console.log('📊 Collecte des statistiques...');
    try {
      results.stats = await temporaryPageGenerator.getStats();
      console.log(`📈 Statistiques: ${results.stats.totalPages} pages temporaires actives`);
    } catch (error) {
      console.error('Erreur lors de la collecte des statistiques:', error);
    }
    
    // Calculer le temps d'exécution
    results.executionTime = Date.now() - startTime;
    
    console.log(`🎉 Maintenance terminée en ${results.executionTime}ms`);
    
    return NextResponse.json({
      success: true,
      message: 'Maintenance automatique terminée avec succès',
      results
    });
    
  } catch (error) {
    const executionTime = Date.now() - startTime;
    console.error('❌ Erreur lors de la maintenance automatique:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la maintenance automatique',
      details: error instanceof Error ? error.message : String(error),
      executionTime
    }, { status: 500 });
  }
}

/**
 * POST - Maintenance manuelle avec options personnalisées
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const body = await request.json();
    const {
      runCleanup = true,
      runDetection = false,
      updateSitemap = true,
      detectionConfig = {}
    } = body;
    
    console.log('🔧 Début de la maintenance manuelle des pages temporaires');
    
    const results = {
      timestamp: new Date().toISOString(),
      cleanup: { removed: 0, errors: [] as string[] },
      detection: { 
        totalLinks: 0, 
        brokenLinks: 0, 
        temporaryPagesCreated: 0, 
        errors: [] as string[] 
      },
      sitemap: { updated: false, errors: [] as string[] },
      stats: {
        totalPages: 0,
        byType: {} as Record<string, number>,
        byPriority: {} as Record<string, number>,
        byStatus: {} as Record<string, number>
      },
      executionTime: 0
    };
    
    // Nettoyage
    if (runCleanup) {
      console.log('🧹 Nettoyage des pages obsolètes...');
      try {
        results.cleanup = await autoDetector.cleanupObsoletePages();
        console.log(`✅ Nettoyage terminé: ${results.cleanup.removed} pages supprimées`);
      } catch (error) {
        const errorMsg = `Erreur lors du nettoyage: ${error}`;
        results.cleanup.errors.push(errorMsg);
        console.error(errorMsg);
      }
    }
    
    // Détection
    if (runDetection) {
      console.log('🔍 Détection de nouvelles ressources manquantes...');
      try {
        const config = {
          ...defaultDetectionConfig,
          ...detectionConfig
        };
        
        results.detection = await autoDetector.detectAndCreateTemporaryPages(config);
        console.log(`✅ Détection terminée: ${results.detection.temporaryPagesCreated} nouvelles pages créées`);
      } catch (error) {
        const errorMsg = `Erreur lors de la détection: ${error}`;
        results.detection.errors.push(errorMsg);
        console.error(errorMsg);
      }
    }
    
    // Sitemap
    if (updateSitemap) {
      console.log('🗺️  Mise à jour du sitemap...');
      try {
        await sitemapIntegration.updateSitemapWithTemporaryPages();
        results.sitemap.updated = true;
        console.log('✅ Sitemap mis à jour');
      } catch (error) {
        const errorMsg = `Erreur lors de la mise à jour du sitemap: ${error}`;
        results.sitemap.errors.push(errorMsg);
        console.error(errorMsg);
      }
    }
    
    // Statistiques
    try {
      results.stats = await temporaryPageGenerator.getStats();
    } catch (error) {
      console.error('Erreur lors de la collecte des statistiques:', error);
    }
    
    results.executionTime = Date.now() - startTime;
    
    console.log(`🎉 Maintenance manuelle terminée en ${results.executionTime}ms`);
    
    return NextResponse.json({
      success: true,
      message: 'Maintenance manuelle terminée avec succès',
      results
    });
    
  } catch (error) {
    const executionTime = Date.now() - startTime;
    console.error('❌ Erreur lors de la maintenance manuelle:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la maintenance manuelle',
      details: error instanceof Error ? error.message : String(error),
      executionTime
    }, { status: 500 });
  }
}