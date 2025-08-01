/**
 * Exemple d'intégration du DegradationManager dans les API routes existantes
 * 
 * Ce fichier montre comment intégrer le système de dégradation gracieuse
 * dans les routes API audit-complete et maintenance-weekly.
 */

import { DegradationManager, ServiceLevel } from './degradation-manager';
import { NextRequest, NextResponse } from 'next/server';

// Instance globale du DegradationManager
const degradationManager = new DegradationManager();

// Démarrer le monitoring au démarrage de l'application
degradationManager.startMonitoring();

/**
 * Exemple d'intégration dans /api/audit-complete
 */
export async function auditCompleteWithDegradation(request: NextRequest) {
  console.log('🔍 Démarrage de l\'audit complet avec dégradation gracieuse...');

  try {
    // 1. Vérifier le niveau de service actuel
    const currentStatus = degradationManager.getCurrentStatus();
    console.log(`📊 Niveau de service actuel: ${currentStatus.currentLevel}`);

    // 2. Adapter le comportement selon le niveau de service
    switch (currentStatus.currentLevel) {
      case ServiceLevel.FULL:
        return await executeFullAudit();
      
      case ServiceLevel.ESSENTIAL:
        return await executeEssentialAudit();
      
      case ServiceLevel.MINIMAL:
        return await executeMinimalAudit();
      
      case ServiceLevel.FALLBACK:
        return await executeFallbackAudit();
      
      default:
        throw new Error(`Niveau de service non reconnu: ${currentStatus.currentLevel}`);
    }

  } catch (error) {
    console.error('❌ Erreur lors de l\'audit avec dégradation:', error);
    
    // En cas d'erreur, essayer de passer en mode dégradé
    await degradationManager.forceServiceLevel(
      ServiceLevel.MINIMAL, 
      `Erreur critique: ${error.message}`
    );
    
    return NextResponse.json({
      success: false,
      error: error.message,
      serviceLevel: 'minimal',
      fallbackActivated: true
    }, { status: 500 });
  }
}

/**
 * Audit complet - Toutes les fonctionnalités
 */
async function executeFullAudit() {
  console.log('🟢 Exécution de l\'audit complet...');

  const results = await degradationManager.executeWithCircuitBreaker(
    'link_validation',
    async () => {
      // Audit de tous les 498 liens
      const auditResults = {
        totalLinks: 498,
        validLinks: 450,
        brokenLinks: 48,
        corrections: 12,
        alerts: 3,
        executionTime: 180000, // 3 minutes
      };

      // Traitement des corrections automatiques
      await degradationManager.executeWithCircuitBreaker(
        'database',
        async () => {
          console.log('🔧 Application des corrections automatiques...');
          // Logique de correction
        }
      );

      // Envoi des alertes
      await degradationManager.executeWithCircuitBreaker(
        'email_service',
        async () => {
          console.log('📧 Envoi des alertes critiques...');
          // Logique d'envoi d'alertes
        }
      );

      return auditResults;
    },
    { timeout: 300000, threshold: 2 } // 5 minutes timeout, 2 échecs max
  );

  return NextResponse.json({
    success: true,
    serviceLevel: 'full',
    results,
    message: 'Audit complet terminé avec succès'
  });
}

/**
 * Audit essentiel - Fonctionnalités de base uniquement
 */
async function executeEssentialAudit() {
  console.log('🟡 Exécution de l\'audit essentiel...');

  const results = await degradationManager.executeWithCircuitBreaker(
    'link_validation',
    async () => {
      // Audit des liens critiques seulement (top 100)
      const auditResults = {
        totalLinks: 100,
        validLinks: 92,
        brokenLinks: 8,
        corrections: 3,
        alerts: 1,
        executionTime: 60000, // 1 minute
      };

      // Corrections limitées aux liens critiques
      await degradationManager.executeWithCircuitBreaker(
        'database',
        async () => {
          console.log('🔧 Corrections limitées aux liens critiques...');
          // Logique de correction réduite
        }
      );

      return auditResults;
    },
    { timeout: 120000, threshold: 3 } // 2 minutes timeout, 3 échecs max
  );

  return NextResponse.json({
    success: true,
    serviceLevel: 'essential',
    results,
    message: 'Audit essentiel terminé - fonctionnalités réduites'
  });
}

/**
 * Audit minimal - Alertes critiques seulement
 */
async function executeMinimalAudit() {
  console.log('🟠 Exécution de l\'audit minimal...');

  const results = await degradationManager.executeWithCircuitBreaker(
    'link_validation',
    async () => {
      // Vérification des 10 liens les plus critiques seulement
      const auditResults = {
        totalLinks: 10,
        validLinks: 9,
        brokenLinks: 1,
        corrections: 0, // Pas de corrections automatiques
        alerts: 1,
        executionTime: 15000, // 15 secondes
      };

      // Alertes d'urgence seulement
      if (auditResults.brokenLinks > 0) {
        await degradationManager.executeWithCircuitBreaker(
          'email_service',
          async () => {
            console.log('🚨 Envoi d\'alerte d\'urgence...');
            // Logique d'alerte d'urgence
          }
        );
      }

      return auditResults;
    },
    { timeout: 30000, threshold: 5 } // 30 secondes timeout, 5 échecs max
  );

  return NextResponse.json({
    success: true,
    serviceLevel: 'minimal',
    results,
    message: 'Audit minimal terminé - alertes critiques seulement'
  });
}

/**
 * Mode fallback - Délégation vers GitHub Actions
 */
async function executeFallbackAudit() {
  console.log('🔴 Activation du mode fallback...');

  try {
    // Activer le fallback GitHub Actions
    const fallbackActivated = await degradationManager.fallbackManager.activateFallback('urgent');

    if (fallbackActivated) {
      return NextResponse.json({
        success: true,
        serviceLevel: 'fallback',
        message: 'Audit délégué vers GitHub Actions',
        fallbackActivated: true,
        githubActionsUrl: 'https://github.com/your-repo/actions'
      });
    } else {
      throw new Error('Impossible d\'activer le fallback GitHub Actions');
    }
  } catch (error) {
    console.error('❌ Erreur lors de l\'activation du fallback:', error);
    
    return NextResponse.json({
      success: false,
      serviceLevel: 'fallback',
      error: 'Système en panne - fallback indisponible',
      message: 'Veuillez contacter l\'administrateur'
    }, { status: 503 });
  }
}

/**
 * Exemple d'intégration dans /api/maintenance-weekly
 */
export async function maintenanceWeeklyWithDegradation(request: NextRequest) {
  console.log('🔧 Démarrage de la maintenance hebdomadaire avec dégradation...');

  try {
    const currentStatus = degradationManager.getCurrentStatus();
    console.log(`📊 Niveau de service actuel: ${currentStatus.currentLevel}`);

    // La maintenance peut s'exécuter à tous les niveaux, mais avec des fonctionnalités réduites
    const results = await executeMaintenanceByLevel(currentStatus.currentLevel);

    return NextResponse.json({
      success: true,
      serviceLevel: currentStatus.currentLevel,
      results,
      message: 'Maintenance hebdomadaire terminée'
    });

  } catch (error) {
    console.error('❌ Erreur lors de la maintenance:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Erreur lors de la maintenance hebdomadaire'
    }, { status: 500 });
  }
}

/**
 * Exécute la maintenance selon le niveau de service
 */
async function executeMaintenanceByLevel(serviceLevel: ServiceLevel) {
  const tasks = [];

  switch (serviceLevel) {
    case ServiceLevel.FULL:
      // Maintenance complète
      tasks.push(
        executeWithCircuitBreaker('database', cleanupDatabase),
        executeWithCircuitBreaker('database', generateFullReports),
        executeWithCircuitBreaker('vercel_api', checkVercelUsage),
        executeWithCircuitBreaker('email_service', sendWeeklyReport)
      );
      break;

    case ServiceLevel.ESSENTIAL:
      // Maintenance essentielle
      tasks.push(
        executeWithCircuitBreaker('database', cleanupCriticalData),
        executeWithCircuitBreaker('database', generateEssentialReports),
        executeWithCircuitBreaker('vercel_api', checkVercelUsage)
      );
      break;

    case ServiceLevel.MINIMAL:
      // Maintenance minimale
      tasks.push(
        executeWithCircuitBreaker('database', cleanupCriticalData),
        executeWithCircuitBreaker('vercel_api', checkVercelUsage)
      );
      break;

    case ServiceLevel.FALLBACK:
      // Pas de maintenance, juste vérification de santé
      tasks.push(
        executeWithCircuitBreaker('database', healthCheck)
      );
      break;
  }

  const results = await Promise.allSettled(tasks);
  
  return {
    completedTasks: results.filter(r => r.status === 'fulfilled').length,
    failedTasks: results.filter(r => r.status === 'rejected').length,
    serviceLevel,
    details: results
  };
}

/**
 * Fonctions utilitaires pour les tâches de maintenance
 */
async function executeWithCircuitBreaker(service: string, task: () => Promise<any>) {
  return degradationManager.executeWithCircuitBreaker(service, task);
}

async function cleanupDatabase() {
  console.log('🧹 Nettoyage complet de la base de données...');
  // Logique de nettoyage
  return { cleaned: 1000, duration: 30000 };
}

async function cleanupCriticalData() {
  console.log('🧹 Nettoyage des données critiques...');
  // Logique de nettoyage réduite
  return { cleaned: 100, duration: 5000 };
}

async function generateFullReports() {
  console.log('📊 Génération des rapports complets...');
  // Logique de génération de rapports
  return { reports: 5, duration: 60000 };
}

async function generateEssentialReports() {
  console.log('📊 Génération des rapports essentiels...');
  // Logique de génération réduite
  return { reports: 2, duration: 20000 };
}

async function checkVercelUsage() {
  console.log('📈 Vérification de l\'usage Vercel...');
  // Logique de vérification
  return { usage: 65, limit: 100 };
}

async function sendWeeklyReport() {
  console.log('📧 Envoi du rapport hebdomadaire...');
  // Logique d'envoi
  return { sent: true, recipients: 3 };
}

async function healthCheck() {
  console.log('🏥 Vérification de santé du système...');
  // Logique de health check
  return { healthy: true, checks: 5 };
}

/**
 * Middleware pour vérifier le niveau de service avant chaque requête
 */
export function withDegradationCheck(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      // Vérifier si le système est en mode fallback
      const status = degradationManager.getCurrentStatus();
      
      if (status.currentLevel === ServiceLevel.FALLBACK) {
        return NextResponse.json({
          success: false,
          error: 'Service temporairement indisponible',
          serviceLevel: 'fallback',
          message: 'Le système est en mode de récupération. Veuillez réessayer plus tard.',
          retryAfter: 300 // 5 minutes
        }, { 
          status: 503,
          headers: {
            'Retry-After': '300'
          }
        });
      }

      // Exécuter le handler normal
      return await handler(req);

    } catch (error) {
      console.error('❌ Erreur dans le middleware de dégradation:', error);
      
      // En cas d'erreur, forcer la dégradation
      await degradationManager.forceServiceLevel(
        ServiceLevel.MINIMAL,
        `Erreur middleware: ${error.message}`
      );

      return NextResponse.json({
        success: false,
        error: 'Erreur système',
        serviceLevel: 'minimal',
        message: 'Le système a été automatiquement dégradé pour assurer la stabilité.'
      }, { status: 500 });
    }
  };
}

/**
 * Fonction utilitaire pour obtenir les métriques de dégradation
 */
export function getDegradationMetrics() {
  const status = degradationManager.getCurrentStatus();
  const circuitBreakers = degradationManager.getAllCircuitBreakers();
  const metricsHistory = degradationManager.getSystemMetricsHistory();

  return {
    currentLevel: status.currentLevel,
    systemLoad: status.systemLoad,
    circuitBreakers: circuitBreakers.map(cb => ({
      name: cb.name,
      state: cb.state,
      failureCount: cb.failureCount,
      threshold: cb.threshold,
      healthy: cb.state === 'CLOSED' && cb.failureCount < cb.threshold * 0.8
    })),
    recentMetrics: metricsHistory.slice(-10),
    recommendations: generateRecommendations(status, circuitBreakers)
  };
}

/**
 * Génère des recommandations basées sur l'état du système
 */
function generateRecommendations(status: any, circuitBreakers: any[]) {
  const recommendations = [];

  if (status.currentLevel !== ServiceLevel.FULL) {
    recommendations.push({
      type: 'warning',
      message: `Système en mode ${status.currentLevel}`,
      action: 'Surveiller les métriques et optimiser les performances'
    });
  }

  const openBreakers = circuitBreakers.filter(cb => cb.state === 'OPEN');
  if (openBreakers.length > 0) {
    recommendations.push({
      type: 'critical',
      message: `${openBreakers.length} circuit breaker(s) ouvert(s)`,
      action: 'Vérifier les services affectés et résoudre les problèmes'
    });
  }

  if (status.systemLoad.vercelUsage > 80) {
    recommendations.push({
      type: 'warning',
      message: 'Usage Vercel élevé',
      action: 'Considérer un upgrade vers Vercel Pro'
    });
  }

  return recommendations;
}

// Export de l'instance pour utilisation globale
export { degradationManager };