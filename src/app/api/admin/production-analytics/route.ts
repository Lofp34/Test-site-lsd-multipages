import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ProductionAnalytics } from '@/lib/analytics/production-analytics';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'report';

    const analytics = new ProductionAnalytics(supabase);

    switch (action) {
      case 'report': {
        const report = await analytics.generateAnalysisReport();
        return NextResponse.json(report);
      }

      case 'metrics': {
        const metrics = await analytics.collectWeeklyMetrics();
        return NextResponse.json(metrics);
      }

      default:
        return NextResponse.json(
          { error: 'Action non supportée' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Erreur API production analytics:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, recommendations } = await request.json();

    if (action !== 'apply-optimizations') {
      return NextResponse.json(
        { error: 'Action non supportée' },
        { status: 400 }
      );
    }

    const analytics = new ProductionAnalytics(supabase);
    await analytics.applyOptimizations(recommendations);

    return NextResponse.json({ 
      success: true, 
      message: 'Optimisations appliquées avec succès' 
    });
  } catch (error) {
    console.error('Erreur application optimisations:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'application des optimisations' },
      { status: 500 }
    );
  }
}