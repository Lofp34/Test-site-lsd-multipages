import { NextResponse } from 'next/server';
import { AuditDatabase } from '@/lib/audit/database';

export async function GET() {
  try {
    // Get audit history for the last 30 days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    const { data: auditHistory } = await AuditDatabase.getSupabaseAdmin()
      .from('audit_history')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true });

    if (!auditHistory || auditHistory.length === 0) {
      return NextResponse.json([]);
    }

    // Transform data for the chart
    const historyData = auditHistory.map(audit => ({
      date: audit.created_at.split('T')[0], // Get date part only
      totalLinks: audit.total_links,
      brokenLinks: audit.broken_links,
      correctedLinks: audit.corrected_links,
      seoScore: audit.seo_score,
      executionTime: audit.execution_time,
    }));

    // Group by date (take the latest audit of each day)
    const groupedData = historyData.reduce((acc, item) => {
      const existing = acc.find(d => d.date === item.date);
      if (existing) {
        // Replace with latest data for the day
        Object.assign(existing, item);
      } else {
        acc.push(item);
      }
      return acc;
    }, [] as typeof historyData);

    return NextResponse.json(groupedData);

  } catch (error) {
    console.error('Failed to fetch audit history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audit history' },
      { status: 500 }
    );
  }
}