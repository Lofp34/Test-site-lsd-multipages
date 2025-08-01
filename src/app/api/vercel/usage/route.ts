import { NextRequest, NextResponse } from 'next/server';
import { createVercelMonitor, checkVercelMonitoringHealth } from '@/lib/vercel';

/**
 * API route for Vercel usage monitoring
 * GET /api/vercel/usage - Get current usage metrics
 * POST /api/vercel/usage - Trigger usage check and alerts
 */

export async function GET(request: NextRequest) {
  try {
    // Check if monitoring is enabled
    if (process.env.VERCEL_MONITORING_ENABLED !== 'true') {
      return NextResponse.json(
        { error: 'Vercel monitoring is disabled' },
        { status: 503 }
      );
    }

    // Health check first
    const health = await checkVercelMonitoringHealth();
    if (!health.success) {
      return NextResponse.json(
        { 
          error: 'Vercel monitoring not properly configured',
          details: health.errors,
          warnings: health.warnings
        },
        { status: 500 }
      );
    }

    // Get usage metrics
    const monitor = createVercelMonitor();
    const currentUsage = await monitor.getCurrentUsage();
    const prediction = await monitor.predictMonthlyUsage();
    const trend = monitor.getUsageTrend();
    const limitStatuses = await monitor.checkLimits();

    return NextResponse.json({
      success: true,
      data: {
        currentUsage,
        prediction,
        trend,
        limitStatuses,
        timestamp: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error('Vercel usage API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch Vercel usage metrics',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if monitoring is enabled
    if (process.env.VERCEL_MONITORING_ENABLED !== 'true') {
      return NextResponse.json(
        { error: 'Vercel monitoring is disabled' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { action, threshold } = body;

    const monitor = createVercelMonitor();

    switch (action) {
      case 'check_usage':
        const currentUsage = await monitor.getCurrentUsage();
        const prediction = await monitor.predictMonthlyUsage();
        
        return NextResponse.json({
          success: true,
          data: { currentUsage, prediction }
        });

      case 'send_alert':
        if (!threshold || typeof threshold !== 'number') {
          return NextResponse.json(
            { error: 'Threshold parameter required for alert action' },
            { status: 400 }
          );
        }
        
        await monitor.sendUsageAlert(threshold);
        
        return NextResponse.json({
          success: true,
          message: `Alert sent for ${threshold}% threshold`
        });

      case 'check_limits':
        const limitStatuses = await monitor.checkLimits();
        const exceededLimits = limitStatuses.filter(status => status.exceeded);
        
        return NextResponse.json({
          success: true,
          data: {
            limitStatuses,
            exceededCount: exceededLimits.length,
            hasExceededLimits: exceededLimits.length > 0
          }
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported actions: check_usage, send_alert, check_limits' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Vercel usage API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process Vercel usage request',
        message: error.message 
      },
      { status: 500 }
    );
  }
}