import { NextRequest, NextResponse } from 'next/server';
import { AuditDatabase } from '@/lib/audit/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '30d';

    // Calculate date range
    const days = range === '7d' ? 7 : 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get resource requests for the specified range
    const { data: requests } = await AuditDatabase.getSupabaseAdmin()
      .from('resource_requests')
      .select('created_at, status')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true });

    if (!requests || requests.length === 0) {
      return NextResponse.json([]);
    }

    // Group requests by date
    const requestsByDate = new Map<string, { total: number; completed: number; pending: number }>();

    // Initialize all dates in range with zero values
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      const dateStr = date.toISOString().split('T')[0];
      requestsByDate.set(dateStr, { total: 0, completed: 0, pending: 0 });
    }

    // Count requests by date and status
    requests.forEach(request => {
      const date = request.created_at.split('T')[0];
      const existing = requestsByDate.get(date);
      
      if (existing) {
        existing.total++;
        if (request.status === 'completed') {
          existing.completed++;
        } else if (request.status === 'pending') {
          existing.pending++;
        }
      }
    });

    // Convert to array format for chart
    const chartData = Array.from(requestsByDate.entries()).map(([date, counts]) => ({
      date,
      requests: counts.total,
      completed: counts.completed,
      pending: counts.pending,
    }));

    return NextResponse.json(chartData);

  } catch (error) {
    console.error('Failed to fetch resource requests chart data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resource requests chart data' },
      { status: 500 }
    );
  }
}