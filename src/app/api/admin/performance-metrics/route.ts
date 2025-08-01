import { NextRequest, NextResponse } from 'next/server';
import { getPerformanceAlerts, getAllPerformanceStats } from '@/lib/vercel/performance-integration';
import { withPerformanceMonitoring } from '@/lib/vercel/performance-integration';

/**
 * GET /api/admin/performance-metrics
 * Returns performance metrics and statistics for all monitored functions
 */
async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const performanceAlerts = getPerformanceAlerts();
    
    // Get all performance statistics
    const stats = getAllPerformanceStats();
    
    // Get active alerts
    const activeAlerts = performanceAlerts.getActiveAlerts();
    
    // Get common function names and their stats
    const functionStats = Object.entries(stats).map(([name, stat]) => ({
      name,
      ...stat,
    }));
    
    // Calculate summary metrics
    const summary = {
      totalFunctions: functionStats.length,
      activeAlerts: activeAlerts.length,
      functionsWithIssues: functionStats.filter(f => 
        f.averageExecutionTime > 10 || 
        f.averageMemoryUsage > 400 || 
        f.averageErrorRate > 5
      ).length,
      degradingFunctions: functionStats.filter(f => f.trend === 'degrading').length,
      improvingFunctions: functionStats.filter(f => f.trend === 'improving').length,
    };
    
    return NextResponse.json({
      success: true,
      data: {
        functionStats,
        activeAlerts,
        summary,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Failed to fetch performance metrics:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch performance metrics',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/performance-metrics
 * Update performance monitoring thresholds
 */
async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { thresholds } = body;
    
    if (!thresholds) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing thresholds in request body',
        },
        { status: 400 }
      );
    }
    
    const performanceAlerts = getPerformanceAlerts();
    performanceAlerts.updateThresholds(thresholds);
    
    return NextResponse.json({
      success: true,
      message: 'Performance thresholds updated successfully',
      thresholds,
    });
  } catch (error) {
    console.error('Failed to update performance thresholds:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update performance thresholds',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/performance-metrics
 * Clear performance metrics history
 */
async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const functionName = searchParams.get('function');
    
    const performanceAlerts = getPerformanceAlerts();
    performanceAlerts.clearHistory(functionName || undefined);
    
    return NextResponse.json({
      success: true,
      message: functionName 
        ? `Performance history cleared for ${functionName}`
        : 'All performance history cleared',
    });
  } catch (error) {
    console.error('Failed to clear performance history:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to clear performance history',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Apply performance monitoring to these API routes
export { 
  withPerformanceMonitoring(GET, '/api/admin/performance-metrics') as GET,
  withPerformanceMonitoring(POST, '/api/admin/performance-metrics') as POST,
  withPerformanceMonitoring(DELETE, '/api/admin/performance-metrics') as DELETE,
};