import { NextResponse } from 'next/server';
import { getAlertManager } from '@/lib/audit/alert-manager';

export async function GET() {
  try {
    const alertManager = getAlertManager();
    
    // Générer et envoyer le rapport hebdomadaire
    await alertManager.sendWeeklyReport();
    
    return NextResponse.json({
      success: true,
      message: 'Rapport hebdomadaire envoyé avec succès'
    });

  } catch (error) {
    console.error('Failed to send weekly report:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to send weekly report',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}