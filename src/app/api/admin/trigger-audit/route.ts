import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Trigger the main audit endpoint
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const auditResponse = await fetch(`${baseUrl}/api/audit-links`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Laurent Serre Audit Dashboard',
      },
    });

    if (!auditResponse.ok) {
      throw new Error(`Audit failed with status: ${auditResponse.status}`);
    }

    const auditResult = await auditResponse.json();

    return NextResponse.json({
      success: true,
      message: 'Audit déclenché avec succès',
      result: auditResult,
    });

  } catch (error) {
    console.error('Failed to trigger audit:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to trigger audit',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}