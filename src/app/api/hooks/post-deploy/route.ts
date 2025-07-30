import { NextRequest, NextResponse } from 'next/server';
import { getAuditScheduler } from '@/lib/audit/scheduler';

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification du webhook (optionnel)
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.DEPLOY_HOOK_SECRET;
    
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('🚀 Hook post-déploiement déclenché');

    const body = await request.json().catch(() => ({}));
    const { deployment_id, environment = 'production' } = body;

    // Ne déclencher l'audit que pour les déploiements en production
    if (environment !== 'production') {
      console.log(`ℹ️ Déploiement ${environment} ignoré`);
      return NextResponse.json({
        success: true,
        message: `Déploiement ${environment} ignoré`
      });
    }

    const scheduler = getAuditScheduler();
    
    if (!scheduler.isEnabled()) {
      console.log('🔕 Scheduler désactivé, audit post-déploiement ignoré');
      return NextResponse.json({
        success: true,
        message: 'Scheduler désactivé'
      });
    }

    // Planifier un audit avec une priorité élevée après un délai de 2 minutes
    // (pour laisser le temps au déploiement de se stabiliser)
    const scheduledAt = new Date();
    scheduledAt.setMinutes(scheduledAt.getMinutes() + 2);

    const jobId = await scheduler.scheduleFullAudit(scheduledAt, 8);
    
    console.log(`📅 Audit post-déploiement planifié: ${jobId}`);

    return NextResponse.json({
      success: true,
      message: 'Audit post-déploiement planifié',
      jobId,
      scheduledAt: scheduledAt.toISOString(),
      deploymentId: deployment_id
    });

  } catch (error) {
    console.error('❌ Erreur lors du hook post-déploiement:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to process post-deploy hook',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}