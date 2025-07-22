/**
 * Redirect Analytics API Endpoint
 * Provides redirect statistics and logs
 */

import { NextRequest, NextResponse } from 'next/server';
import { redirectAnalytics } from '@/config/redirects';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const type = searchParams.get('type') || 'stats';

    switch (type) {
      case 'stats':
        const stats = redirectAnalytics.getRedirectStats();
        return NextResponse.json({
          success: true,
          data: stats,
          timestamp: new Date().toISOString()
        });

      case 'logs':
        const logs = redirectAnalytics.getRecentLogs(limit);
        return NextResponse.json({
          success: true,
          data: logs,
          count: logs.length,
          timestamp: new Date().toISOString()
        });

      case 'top':
        const topUrls = redirectAnalytics.getMostRedirectedUrls(limit);
        return NextResponse.json({
          success: true,
          data: topUrls,
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid type parameter. Use: stats, logs, or top'
        }, { status: 400 });
    }

  } catch (error) {
    console.error('Error in redirect analytics API:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    redirectAnalytics.clearLogs();
    return NextResponse.json({
      success: true,
      message: 'Redirect logs cleared'
    });
  } catch (error) {
    console.error('Error clearing redirect logs:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}