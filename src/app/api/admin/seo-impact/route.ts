import { NextResponse } from 'next/server';
import { AuditDatabase } from '@/lib/audit/database';

export async function GET() {
  try {
    // Get latest audit data
    const latestAudit = await AuditDatabase.getLatestAudit();
    
    if (!latestAudit) {
      return NextResponse.json({
        criticalIssues: 0,
        estimatedTrafficLoss: 0,
        affectedPages: [],
        priorityActions: [],
        linkHealthScore: 100,
        trends: {
          healthScoreChange: 0,
          criticalIssuesChange: 0,
          trafficLossChange: 0,
        },
      });
    }

    // Calculate link health score
    const linkHealthScore = latestAudit.total_links > 0 
      ? Math.round(((latestAudit.total_links - latestAudit.broken_links) / latestAudit.total_links) * 100)
      : 100;

    // Get broken links with priority information
    const { data: brokenLinks } = await AuditDatabase.getSupabaseAdmin()
      .from('validation_results')
      .select(`
        url,
        status_code,
        error_message,
        scanned_links!inner(priority, source_file, link_type)
      `)
      .eq('status', 'broken')
      .order('checked_at', { ascending: false });

    // Count critical issues
    const criticalIssues = brokenLinks?.filter(link => 
      link.scanned_links?.priority === 'critical'
    ).length || 0;

    // Estimate traffic loss based on broken links and their priority
    let estimatedTrafficLoss = 0;
    if (brokenLinks) {
      brokenLinks.forEach(link => {
        const priority = link.scanned_links?.priority;
        const linkType = link.scanned_links?.link_type;
        
        let impact = 0;
        if (priority === 'critical') impact = 5;
        else if (priority === 'high') impact = 3;
        else if (priority === 'medium') impact = 1;
        else impact = 0.5;
        
        // Internal links have higher SEO impact
        if (linkType === 'internal') impact *= 1.5;
        
        estimatedTrafficLoss += impact;
      });
    }
    
    // Cap at reasonable percentage
    estimatedTrafficLoss = Math.min(estimatedTrafficLoss, 25);

    // Get affected pages (unique source files)
    const affectedPages = Array.from(new Set(
      brokenLinks?.map(link => link.scanned_links?.source_file).filter(Boolean) || []
    ));

    // Generate priority actions
    const priorityActions = [];
    if (criticalIssues > 0) {
      priorityActions.push(`Corriger ${criticalIssues} liens critiques immédiatement`);
    }
    if (latestAudit.broken_links > 10) {
      priorityActions.push('Lancer une correction automatique des liens simples');
    }
    if (affectedPages.length > 5) {
      priorityActions.push('Réviser les pages les plus affectées');
    }
    if (linkHealthScore < 90) {
      priorityActions.push('Améliorer le processus de validation des liens');
    }

    // Get previous audit for trend calculation
    const { data: previousAudits } = await AuditDatabase.getSupabaseAdmin()
      .from('audit_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(2);

    let trends = {
      healthScoreChange: 0,
      criticalIssuesChange: 0,
      trafficLossChange: 0,
    };

    if (previousAudits && previousAudits.length >= 2) {
      const current = previousAudits[0];
      const previous = previousAudits[1];
      
      const currentScore = current.total_links > 0 
        ? ((current.total_links - current.broken_links) / current.total_links) * 100
        : 100;
      const previousScore = previous.total_links > 0 
        ? ((previous.total_links - previous.broken_links) / previous.total_links) * 100
        : 100;
      
      trends.healthScoreChange = currentScore - previousScore;
      trends.criticalIssuesChange = current.broken_links - previous.broken_links;
      
      // Estimate traffic loss change (simplified)
      const currentLoss = (current.broken_links / Math.max(current.total_links, 1)) * 10;
      const previousLoss = (previous.broken_links / Math.max(previous.total_links, 1)) * 10;
      trends.trafficLossChange = currentLoss - previousLoss;
    }

    return NextResponse.json({
      criticalIssues,
      estimatedTrafficLoss: Math.round(estimatedTrafficLoss * 10) / 10,
      affectedPages,
      priorityActions,
      linkHealthScore,
      trends,
    });

  } catch (error) {
    console.error('Failed to fetch SEO impact data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SEO impact data' },
      { status: 500 }
    );
  }
}