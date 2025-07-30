import { NextResponse } from 'next/server';
import { getAuditScheduler } from '@/lib/audit/scheduler';

export async function GET() {
  try {
    console.log('🕐 Traitement de la file d\'attente des audits...');
    
    const scheduler = getAuditScheduler();
    
    if (!scheduler.isEnabled()) {
      return NextResponse.json({
        success: true,
        message: 'Scheduler désactivé',
        processed: 0
      });
    }
    
    // Traiter la file d'attente
    await scheduler.processQueue();
    
    // Obtenir le statut après traitement
    const status = scheduler.getQueueStatus();
    
    console.log(`✅ File d'attente traitée - En attente: ${status.pending}, En cours: ${status.running}`);
    
    return NextResponse.json({
      success: true,
      message: 'File d\'attente traitée avec succès',
      status: {
        pending: status.pending,
        running: status.running,
        processed: true
      }
    });

  } catch (error) {
    console.error('❌ Erreur lors du traitement de la file d\'attente:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to process queue',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}