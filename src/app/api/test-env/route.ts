import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    vercel: {
      region: process.env.VERCEL_REGION || 'not-vercel',
      url: process.env.VERCEL_URL || 'local',
    },
    hubspot: {
      hasToken: !!process.env.HUBSPOT_API_TOKEN,
      hasPortalId: !!process.env.HUBSPOT_PORTAL_ID,
      tokenStart: process.env.HUBSPOT_API_TOKEN ? 
        process.env.HUBSPOT_API_TOKEN.substring(0, 8) + '...' : 
        'undefined',
      portalId: process.env.HUBSPOT_PORTAL_ID || 'undefined',
    },
    allHubspotVars: Object.keys(process.env)
      .filter(key => key.includes('HUBSPOT'))
      .reduce((acc, key) => {
        acc[key] = process.env[key] ? 'SET' : 'UNSET';
        return acc;
      }, {} as Record<string, string>),
  });
}