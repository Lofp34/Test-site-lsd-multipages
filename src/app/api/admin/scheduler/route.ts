import { NextRequest, NextResponse } from 'next/server';
import { getAuditScheduler } from '@/lib/audit/scheduler';

export async function GET() {
  try {
    const scheduler = getAuditScheduler();
    const status = scheduler.getQueueStatus();
    const config = scheduler.getConfig();
    
    return NextResponse.json({
      enabled: scheduler.isEnabled(),
      config,
      status,
    });

  } catch (error) {
    console.error('Failed to get scheduler status:', error);
    return NextResponse.json(
      { error: 'Failed to get scheduler status' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const scheduler = getAuditScheduler();
    
    const { action, ...params } = body;
    
    switch (action) {
      case 'schedule_audit':
        const auditJobId = await scheduler.scheduleFullAudit(
          params.scheduledAt ? new Date(params.scheduledAt) : undefined,
          params.priority || 5
        );
        return NextResponse.json({
          success: true,
          jobId: auditJobId,
          message: 'Audit planifié avec succès'
        });
        
      case 'schedule_quick_check':
        const quickJobId = await scheduler.scheduleQuickCheck(params.priority || 3);
        return NextResponse.json({
          success: true,
          jobId: quickJobId,
          message: 'Vérification rapide planifiée'
        });
        
      case 'process_queue':
        await scheduler.processQueue();
        return NextResponse.json({
          success: true,
          message: 'File d\'attente traitée'
        });
        
      case 'cancel_job':
        if (!params.jobId) {
          return NextResponse.json(
            { error: 'Job ID required' },
            { status: 400 }
          );
        }
        const cancelled = await scheduler.cancelJob(params.jobId);
        return NextResponse.json({
          success: cancelled,
          message: cancelled ? 'Job annulé' : 'Job non trouvé'
        });
        
      case 'update_config':
        if (params.config) {
          scheduler.updateConfig(params.config);
          return NextResponse.json({
            success: true,
            message: 'Configuration mise à jour',
            config: scheduler.getConfig()
          });
        }
        return NextResponse.json(
          { error: 'Configuration required' },
          { status: 400 }
        );
        
      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Failed to process scheduler request:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}