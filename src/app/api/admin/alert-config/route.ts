import { NextRequest, NextResponse } from 'next/server';
import { getAlertManager, AlertThresholds } from '@/lib/audit/alert-manager';

export async function GET() {
  try {
    const alertManager = getAlertManager();
    const config = alertManager.getConfig();
    
    return NextResponse.json(config);

  } catch (error) {
    console.error('Failed to get alert config:', error);
    return NextResponse.json(
      { error: 'Failed to get alert config' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const alertManager = getAlertManager();
    
    // Mettre à jour les seuils si fournis
    if (body.thresholds) {
      alertManager.updateThresholds(body.thresholds as Partial<AlertThresholds>);
    }
    
    // Activer/désactiver les alertes si spécifié
    if (typeof body.enabled === 'boolean') {
      alertManager.setEnabled(body.enabled);
    }
    
    const updatedConfig = alertManager.getConfig();
    
    return NextResponse.json({
      success: true,
      message: 'Configuration des alertes mise à jour',
      config: updatedConfig
    });

  } catch (error) {
    console.error('Failed to update alert config:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update alert config',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}