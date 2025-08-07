import { NextRequest, NextResponse } from 'next/server';
import { postDeploymentAnalytics } from '@/lib/chat/post-deployment-analytics';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const timeframe = searchParams.get('timeframe') || '7d';

    switch (type) {
      case 'metrics':
        const metrics = postDeploymentAnalytics.getMetrics();
        return NextResponse.json({ success: true, data: metrics });

      case 'feedback':
        const feedback = postDeploymentAnalytics.getFeedback();
        return NextResponse.json({ success: true, data: feedback });

      case 'alerts':
        const alerts = postDeploymentAnalytics.getAlerts();
        return NextResponse.json({ success: true, data: alerts });

      case 'report':
        const report = postDeploymentAnalytics.generateAdoptionReport();
        return NextResponse.json({ success: true, data: report });

      case 'opportunities':
        const opportunities = postDeploymentAnalytics.identifyImprovementOpportunities();
        return NextResponse.json({ success: true, data: opportunities });

      case 'iteration':
        const iteration = postDeploymentAnalytics.planNextIteration();
        return NextResponse.json({ success: true, data: iteration });

      case 'export':
        const exportData = postDeploymentAnalytics.exportAnalyticsData();
        return new NextResponse(exportData, {
          headers: {
            'Content-Type': 'application/json',
            'Content-Disposition': `attachment; filename="chat-analytics-${new Date().toISOString().split('T')[0]}.json"`
          }
        });

      default:
        // Return all data
        return NextResponse.json({
          success: true,
          data: {
            metrics: postDeploymentAnalytics.getMetrics(),
            feedback: postDeploymentAnalytics.getFeedback(),
            alerts: postDeploymentAnalytics.getAlerts()
          }
        });
    }
  } catch (error) {
    console.error('Post-deployment analytics API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'track_markdown':
        postDeploymentAnalytics.trackMarkdownUsage(data.content, data.renderTime);
        break;

      case 'track_scroll':
        postDeploymentAnalytics.trackScrollBehavior(data);
        break;

      case 'track_controls':
        postDeploymentAnalytics.trackControlsUsage(data.action);
        break;

      case 'track_performance':
        postDeploymentAnalytics.trackPerformanceMetric(data.metric, data.value);
        break;

      case 'track_error':
        postDeploymentAnalytics.trackError(new Error(data.message), data.context);
        break;

      case 'submit_feedback':
        postDeploymentAnalytics.collectFeedback(data);
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Unknown action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Post-deployment analytics tracking error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track analytics data' },
      { status: 500 }
    );
  }
}