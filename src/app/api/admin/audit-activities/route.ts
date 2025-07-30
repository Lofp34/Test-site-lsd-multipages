import { NextResponse } from 'next/server';
import { AuditDatabase } from '@/lib/audit/database';

interface AuditActivity {
  id: string;
  type: 'audit' | 'correction' | 'resource_request' | 'alert';
  message: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error' | 'info';
  details?: {
    linksScanned?: number;
    brokenLinksFound?: number;
    correctionsApplied?: number;
    resourceUrl?: string;
    userEmail?: string;
  };
}

export async function GET() {
  try {
    const activities: AuditActivity[] = [];

    // Get recent audits
    const { data: recentAudits } = await AuditDatabase.getSupabaseAdmin()
      .from('audit_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (recentAudits) {
      recentAudits.forEach(audit => {
        const status = audit.broken_links === 0 ? 'success' : 
                     audit.broken_links < 5 ? 'warning' : 'error';
        
        activities.push({
          id: `audit-${audit.id}`,
          type: 'audit',
          message: `Audit automatique terminé`,
          timestamp: new Date(audit.created_at),
          status,
          details: {
            linksScanned: audit.total_links,
            brokenLinksFound: audit.broken_links,
            correctionsApplied: audit.corrected_links,
          },
        });
      });
    }

    // Get recent corrections
    const { data: recentCorrections } = await AuditDatabase.getSupabaseAdmin()
      .from('applied_corrections')
      .select('*')
      .order('applied_at', { ascending: false })
      .limit(5);

    if (recentCorrections) {
      recentCorrections.forEach(correction => {
        activities.push({
          id: `correction-${correction.id}`,
          type: 'correction',
          message: `Correction automatique appliquée`,
          timestamp: new Date(correction.applied_at),
          status: 'success',
          details: {
            resourceUrl: correction.original_url,
          },
        });
      });
    }

    // Get recent resource requests
    const { data: recentRequests } = await AuditDatabase.getSupabaseAdmin()
      .from('resource_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (recentRequests) {
      recentRequests.forEach(request => {
        activities.push({
          id: `request-${request.id}`,
          type: 'resource_request',
          message: `Nouvelle demande de ressource`,
          timestamp: new Date(request.created_at),
          status: 'info',
          details: {
            resourceUrl: request.requested_url,
            userEmail: request.user_email,
          },
        });
      });
    }

    // Sort all activities by timestamp
    activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    // Return the 10 most recent activities
    return NextResponse.json(activities.slice(0, 10));

  } catch (error) {
    console.error('Failed to fetch audit activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}