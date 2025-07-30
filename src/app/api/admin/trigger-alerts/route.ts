import { NextResponse } from 'next/server';
import { getAlertManager } from '@/lib/audit/alert-manager';

export async function POST() {
  try {
    const alertManager = getAlertManager();
    
    // Analyser les résultats d'audit et envoyer des alertes si nécessaire
    await alertManager.analyzeAuditResults();
    
    return NextResponse.json({
      success: true,
      message: 'Analyse des alertes terminée'
    });

  } catch (error) {
    console.error('Failed to trigger alerts:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to trigger alerts',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}