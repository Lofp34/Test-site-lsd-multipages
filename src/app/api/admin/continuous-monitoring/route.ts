import { NextRequest, NextResponse } from 'next/server';
import { continuousMonitoring } from '@/lib/monitoring/continuous-monitoring';

/**
 * API route for managing the continuous monitoring system
 * 
 * GET /api/admin/continuous-monitoring - Get monitoring status and metrics
 * POST /api/admin/continuous-monitoring - Control monitoring (start/stop/force-check)
 * PUT /api/admin/continuous-monitoring - Update monitoring configuration
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'status':
        return NextResponse.json({
          success: true,
          data: {
            status: continuousMonitoring.getStatus(),
            currentMetrics: continuousMonitoring.getCurrentMetrics(),
            alertRules: continuousMonitoring.getAlertRules().map(rule => ({
              id: rule.id,
              name: rule.name,
              severity: rule.severity,
              enabled: rule.enabled,
              cooldownMinutes: rule.cooldownMinutes,
              lastTriggered: rule.lastTriggered
            }))
          }
        });

      case 'metrics':
        const hours = parseInt(searchParams.get('hours') || '24');
        return NextResponse.json({
          success: true,
          data: {
            current: continuousMonitoring.getCurrentMetrics(),
            history: continuousMonitoring.getMetricsHistory(hours)
          }
        });

      case 'health':
        const currentMetrics = continuousMonitoring.getCurrentMetrics();
        const status = continuousMonitoring.getStatus();
        
        return NextResponse.json({
          success: true,
          data: {
            overall: currentMetrics ? (
              currentMetrics.systemHealth.vercelStatus === 'critical' || 
              currentMetrics.systemHealth.databaseStatus === 'unhealthy'
                ? 'critical'
                : currentMetrics.systemHealth.vercelStatus === 'warning' || 
                  currentMetrics.systemHealth.databaseStatus === 'slow'
                  ? 'warning'
                  : 'healthy'
            ) : 'unknown',
            monitoring: status.isRunning ? 'active' : 'stopped',
            vercel: currentMetrics?.systemHealth.vercelStatus || 'unknown',
            database: currentMetrics?.systemHealth.databaseStatus || 'unknown',
            fallback: currentMetrics?.systemHealth.fallbackStatus || 'unknown',
            lastCheck: status.lastCheck,
            nextCheck: status.nextCheck,
            activeAlerts: currentMetrics?.alerts.activeAlerts || 0,
            criticalAlerts: currentMetrics?.alerts.criticalAlerts || 0
          }
        });

      default:
        return NextResponse.json({
          success: true,
          data: {
            status: continuousMonitoring.getStatus(),
            currentMetrics: continuousMonitoring.getCurrentMetrics()
          }
        });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du statut de monitoring:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la récupération du statut de monitoring',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...params } = body;

    switch (action) {
      case 'start':
        await continuousMonitoring.start();
        return NextResponse.json({
          success: true,
          message: 'Monitoring continu démarré',
          data: {
            status: continuousMonitoring.getStatus()
          }
        });

      case 'stop':
        continuousMonitoring.stop();
        return NextResponse.json({
          success: true,
          message: 'Monitoring continu arrêté',
          data: {
            status: continuousMonitoring.getStatus()
          }
        });

      case 'force-check':
        const metrics = await continuousMonitoring.forceMonitoringCycle();
        return NextResponse.json({
          success: true,
          message: 'Vérification forcée effectuée',
          data: {
            metrics,
            status: continuousMonitoring.getStatus()
          }
        });

      case 'test-alert':
        const { ruleId } = params;
        if (!ruleId) {
          return NextResponse.json({
            success: false,
            error: 'ruleId requis pour tester une alerte'
          }, { status: 400 });
        }

        // Créer une règle de test temporaire
        const testRule = {
          id: `test_${ruleId}_${Date.now()}`,
          name: `Test Alert - ${ruleId}`,
          condition: () => true,
          severity: 'warning' as const,
          message: () => `Test d'alerte pour la règle ${ruleId}`,
          cooldownMinutes: 1,
          enabled: true
        };

        continuousMonitoring.addAlertRule(testRule);
        
        // Forcer un cycle pour déclencher l'alerte
        await continuousMonitoring.forceMonitoringCycle();
        
        // Supprimer la règle de test
        continuousMonitoring.removeAlertRule(testRule.id);

        return NextResponse.json({
          success: true,
          message: `Alerte de test envoyée pour la règle ${ruleId}`,
          data: {
            testRuleId: testRule.id
          }
        });

      default:
        return NextResponse.json({
          success: false,
          error: `Action non supportée: ${action}`
        }, { status: 400 });
    }
  } catch (error) {
    console.error('Erreur lors de l\'action de monitoring:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de l\'exécution de l\'action',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ...config } = body;

    switch (type) {
      case 'alert-rule':
        const { ruleId, updates } = config;
        if (!ruleId || !updates) {
          return NextResponse.json({
            success: false,
            error: 'ruleId et updates requis'
          }, { status: 400 });
        }

        const success = continuousMonitoring.updateAlertRule(ruleId, updates);
        if (!success) {
          return NextResponse.json({
            success: false,
            error: `Règle d'alerte non trouvée: ${ruleId}`
          }, { status: 404 });
        }

        return NextResponse.json({
          success: true,
          message: `Règle d'alerte ${ruleId} mise à jour`,
          data: {
            ruleId,
            updates
          }
        });

      case 'thresholds':
        const { usageThresholds } = config;
        if (!usageThresholds) {
          return NextResponse.json({
            success: false,
            error: 'usageThresholds requis'
          }, { status: 400 });
        }

        // Mettre à jour les seuils dans les règles d'alerte correspondantes
        if (usageThresholds.warning) {
          continuousMonitoring.updateAlertRule('vercel_usage_warning', {
            condition: (metrics) => metrics.vercelUsage.percentageUsed >= usageThresholds.warning
          });
        }

        if (usageThresholds.error) {
          continuousMonitoring.updateAlertRule('vercel_usage_error', {
            condition: (metrics) => metrics.vercelUsage.percentageUsed >= usageThresholds.error
          });
        }

        if (usageThresholds.critical) {
          continuousMonitoring.updateAlertRule('vercel_usage_critical', {
            condition: (metrics) => metrics.vercelUsage.percentageUsed >= usageThresholds.critical
          });
        }

        return NextResponse.json({
          success: true,
          message: 'Seuils d\'usage mis à jour',
          data: {
            usageThresholds
          }
        });

      default:
        return NextResponse.json({
          success: false,
          error: `Type de configuration non supporté: ${type}`
        }, { status: 400 });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la configuration:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la mise à jour de la configuration',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ruleId = searchParams.get('ruleId');

    if (!ruleId) {
      return NextResponse.json({
        success: false,
        error: 'ruleId requis'
      }, { status: 400 });
    }

    const success = continuousMonitoring.removeAlertRule(ruleId);
    if (!success) {
      return NextResponse.json({
        success: false,
        error: `Règle d'alerte non trouvée: ${ruleId}`
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Règle d'alerte ${ruleId} supprimée`
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de la règle d\'alerte:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la suppression de la règle d\'alerte',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}