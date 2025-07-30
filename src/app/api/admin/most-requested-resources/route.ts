import { NextResponse } from 'next/server';
import { AuditDatabase } from '@/lib/audit/database';

export async function GET() {
  try {
    // Get resource requests grouped by URL
    const { data: requests } = await AuditDatabase.getSupabaseAdmin()
      .from('resource_requests')
      .select('requested_url, status')
      .order('created_at', { ascending: false });

    if (!requests || requests.length === 0) {
      return NextResponse.json([]);
    }

    // Group by URL and count
    const urlCounts = new Map<string, { count: number; statuses: string[] }>();

    requests.forEach(request => {
      const existing = urlCounts.get(request.requested_url);
      if (existing) {
        existing.count++;
        existing.statuses.push(request.status);
      } else {
        urlCounts.set(request.requested_url, {
          count: 1,
          statuses: [request.status],
        });
      }
    });

    // Convert to array and sort by count
    const mostRequested = Array.from(urlCounts.entries())
      .map(([url, data]) => {
        // Determine overall status (completed > in_progress > pending)
        let status: 'pending' | 'in_progress' | 'completed' = 'pending';
        if (data.statuses.includes('completed')) {
          status = 'completed';
        } else if (data.statuses.includes('in_progress')) {
          status = 'in_progress';
        }

        return {
          url,
          count: data.count,
          status,
        };
      })
      .sort((a, b) => b.count - a.count);

    return NextResponse.json(mostRequested);

  } catch (error) {
    console.error('Failed to fetch most requested resources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch most requested resources' },
      { status: 500 }
    );
  }
}