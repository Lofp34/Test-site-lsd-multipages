import { NextRequest, NextResponse } from 'next/server';
import { AuditDatabase } from '@/lib/audit/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '30d';

    // Calculate date range
    const days = range === '7d' ? 7 : range === '90d' ? 90 : 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get audit history for the specified range
    const { data: auditHistory } = await AuditDatabase.getSupabaseAdmin()
      .from('audit_history')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true });

    if (!auditHistory || auditHistory.length === 0) {
      return NextResponse.json([]);
    }

    // Transform data for the chart
    const healthData = auditHistory.map(audit => {
      const healthScore = audit.total_links > 0 
        ? Math.round(((audit.total_links - audit.broken_links) / audit.total_links) * 100)
        : 100;

      return {
        date: audit.created_at.split('T')[0], // Get date part only
        healthScore,
        totalLinks: audit.total_links,
        brokenLinks: audit.broken_links,
        validLinks: audit.total_links - audit.broken_links,
      };
    });

    // Group by date (in case multiple audits per day)
    const groupedData = healthData.reduce((acc, item) => {
      const existing = acc.find(d => d.date === item.date);
      if (existing) {
        // Take the latest audit of the day
        if (item.healthScore !== existing.healthScore) {
          existing.healthScore = item.healthScore;
          existing.totalLinks = item.totalLinks;
          existing.brokenLinks = item.brokenLinks;
          existing.validLinks = item.validLinks;
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, [] as typeof healthData);

    return NextResponse.json(groupedData);

  } catch (error) {
    console.error('Failed to fetch link health history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch link health history' },
      { status: 500 }
    );
  }
}