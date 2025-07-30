import { NextResponse } from 'next/server';
import { getAlertManager } from '@/lib/audit/alert-manager';

export async function POST() {
  try {
    const alertManager = getAlertManager();
    
    // Tester le système d'alertes
    const success = await alertManager.testAlerts();
    
    return NextResponse.json({
      success,
      message: success 
        ? 'Test d\'alerte envoyé avec succès' 
        : 'Échec du test d\'alerte'
    });

  } catch (error) {
    console.error('Failed to test alerts:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to test alerts',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}