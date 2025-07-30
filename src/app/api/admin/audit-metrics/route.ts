import { NextResponse } from 'next/server';
import { AuditDatabase } from '@/lib/audit/database';

export async function GET() {
  try {
    // Get latest audit data
    const latestAudit = await AuditDatabase.getLatestAudit();
    
    if (!latestAudit) {
      return NextResponse.json({
        linkHealth: {
          score: 0,
          trend: 'stable',
          totalLinks: 0,
          brokenLinks: 0,
          validLinks: 0,
        },
        resourceRequests: {
          total: 0,
          pending: 0,
          completed: 0,
          trend: 'stable',
        },
        corrections: {
          autoCorrections: 0,
          manualCorrections: 0,
          trend: 'stable',
        },
        performance: {
          avgResponseTime: 0,
          lastAuditDuration: 0,
          trend: 'stable',
        },
      });
    }

    // Calculate health score
    const healthScore = latestAudit.total_links > 0 
      ? Math.round(((latestAudit.total_links - latestAudit.broken_links) / latestAudit.total_links) * 100)
      : 100;

    // Get resource requests stats
    const { data: resourceRequests } = await AuditDatabase.getSupabaseAdmin()
      .from('resource_requests')
      .select('status')
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    const totalRequests = resourceRequests?.length || 0;
    const pendingRequests = resourceRequests?.filter(r => r.status === 'pending').length || 0;
    const completedRequests = resourceRequests?.filter(r => r.status === 'completed').length || 0;

    // Get corrections count
    const { data: corrections } = await AuditDatabase.getSupabaseAdmin()
      .from('applied_corrections')
      .select('correction_type')
      .gte('applied_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    const autoCorrections = corrections?.length || 0;

    // Get previous audit for trend calculation
    const { data: previousAudits } = await AuditDatabase.getSupabaseAdmin()
      .from('audit_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(2);

    let healthTrend = 'stable';
    if (previousAudits && previousAudits.length >= 2) {
      const current = previousAudits[0];
      const previous = previousAudits[1];
      
      const currentScore = current.total_links > 0 
        ? ((current.total_links - current.broken_links) / current.total_links) * 100
        : 100;
      const previousScore = previous.total_links > 0 
        ? ((previous.total_links - previous.broken_links) / previous.total_links) * 100
        : 100;
      
      const diff = currentScore - previousScore;
      if (diff > 2) healthTrend = `+${diff.toFixed(1)}%`;
      else if (diff < -2) healthTrend = `${diff.toFixed(1)}%`;
    }

    return NextResponse.json({
      linkHealth: {
        score: healthScore,
        trend: healthTrend,
        totalLinks: latestAudit.total_links,
        brokenLinks: latestAudit.broken_links,
        validLinks: latestAudit.total_links - latestAudit.broken_links,
      },
      resourceRequests: {
        total: totalRequests,
        pending: pendingRequests,
        completed: completedRequests,
        trend: totalRequests > 0 ? `+${totalRequests}` : 'stable',
      },
      corrections: {
        autoCorrections,
        manualCorrections: 0,
        trend: autoCorrections > 0 ? `+${autoCorrections}` : 'stable',
      },
      performance: {
        avgResponseTime: 0, // TODO: Calculate from validation results
        lastAuditDuration: latestAudit.execution_time,
        trend: 'stable',
      },
    });

  } catch (error) {
    console.error('Failed to fetch audit metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}