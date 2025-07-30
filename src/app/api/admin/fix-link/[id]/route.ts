import { NextRequest, NextResponse } from 'next/server';
import { AuditDatabase } from '@/lib/audit/database';
import { AutoCorrector } from '@/lib/audit/auto-corrector';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const linkId = params.id;

    // Get the broken link details
    const { data: validationResult } = await AuditDatabase.getSupabaseAdmin()
      .from('validation_results')
      .select('*')
      .eq('id', linkId)
      .single();

    if (!validationResult) {
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      );
    }

    // Get the corresponding scanned link
    const { data: scannedLink } = await AuditDatabase.getSupabaseAdmin()
      .from('scanned_links')
      .select('*')
      .eq('url', validationResult.url)
      .single();

    if (!scannedLink) {
      return NextResponse.json(
        { error: 'Source link not found' },
        { status: 404 }
      );
    }

    // Try to auto-correct the link
    const autoCorrector = new AutoCorrector();
    const suggestions = await autoCorrector.suggestCorrections([{
      url: scannedLink.url,
      sourceFile: scannedLink.source_file,
      sourceLine: scannedLink.source_line || 0,
      linkType: scannedLink.link_type as any,
      context: scannedLink.context || '',
      priority: scannedLink.priority as any,
    }]);

    if (suggestions.length === 0) {
      return NextResponse.json(
        { error: 'No automatic correction available for this link' },
        { status: 400 }
      );
    }

    // Apply the best suggestion (highest confidence)
    const bestSuggestion = suggestions.sort((a, b) => b.confidence - a.confidence)[0];
    
    if (bestSuggestion.confidence < 0.7) {
      return NextResponse.json(
        { error: 'Correction confidence too low, manual intervention required' },
        { status: 400 }
      );
    }

    const correctionResult = await autoCorrector.applyCorrection(bestSuggestion);

    if (!correctionResult.applied) {
      return NextResponse.json(
        { error: 'Failed to apply correction' },
        { status: 500 }
      );
    }

    // Mark the validation result as resolved by deleting it
    await AuditDatabase.getSupabaseAdmin()
      .from('validation_results')
      .delete()
      .eq('id', linkId);

    return NextResponse.json({
      success: true,
      message: 'Link corrected successfully',
      correction: {
        originalUrl: correctionResult.originalUrl,
        newUrl: correctionResult.newUrl,
        filePath: correctionResult.filePath,
        rollbackId: correctionResult.rollbackId,
      },
    });

  } catch (error) {
    console.error('Failed to fix link:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fix link',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}