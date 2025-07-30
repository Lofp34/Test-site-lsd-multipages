import { NextResponse } from 'next/server';
import { AuditDatabase } from '@/lib/audit/database';

export async function GET() {
  try {
    // Get recent broken links from validation results
    const { data: validationResults } = await AuditDatabase.getSupabaseAdmin()
      .from('validation_results')
      .select('*')
      .eq('status', 'broken')
      .order('checked_at', { ascending: false })
      .limit(50);

    if (!validationResults || validationResults.length === 0) {
      return NextResponse.json([]);
    }

    // Get corresponding scanned links for context
    const urls = validationResults.map(v => v.url);
    const { data: scannedLinks } = await AuditDatabase.getSupabaseAdmin()
      .from('scanned_links')
      .select('*')
      .in('url', urls);

    // Combine data and format for the table
    const brokenLinks = validationResults.map(validation => {
      const scannedLink = scannedLinks?.find(s => s.url === validation.url);
      
      // Calculate SEO impact based on link type and priority
      let seoImpact = 5; // default
      if (scannedLink) {
        if (scannedLink.priority === 'critical') seoImpact = 9;
        else if (scannedLink.priority === 'high') seoImpact = 7;
        else if (scannedLink.priority === 'medium') seoImpact = 5;
        else seoImpact = 3;

        if (scannedLink.link_type === 'internal') seoImpact += 1;
      }

      // Generate suggested actions
      const suggestedActions = [];
      if (validation.status_code === 404) {
        suggestedActions.push('Vérifier si la page existe');
        suggestedActions.push('Créer une redirection 301');
        suggestedActions.push('Supprimer le lien si obsolète');
      } else if (validation.status_code && validation.status_code >= 500) {
        suggestedActions.push('Vérifier la disponibilité du serveur');
        suggestedActions.push('Réessayer plus tard');
      } else {
        suggestedActions.push('Vérifier l\'URL manuellement');
        suggestedActions.push('Corriger l\'URL si nécessaire');
      }

      return {
        id: validation.id.toString(),
        url: validation.url,
        sourceFiles: scannedLink ? [scannedLink.source_file] : ['Inconnu'],
        linkType: (scannedLink?.link_type || 'unknown') as 'internal' | 'external' | 'download' | 'anchor',
        priority: (scannedLink?.priority || 'medium') as 'critical' | 'high' | 'medium' | 'low',
        error: validation.error_message || `Erreur ${validation.status_code || 'inconnue'}`,
        suggestedActions,
        seoImpact,
        statusCode: validation.status_code,
        lastWorking: undefined, // TODO: Implement tracking of when links last worked
      };
    });

    return NextResponse.json(brokenLinks);

  } catch (error) {
    console.error('Failed to fetch broken links:', error);
    return NextResponse.json(
      { error: 'Failed to fetch broken links' },
      { status: 500 }
    );
  }
}