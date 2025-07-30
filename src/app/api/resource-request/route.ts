/**
 * API Route pour les demandes de ressources
 * 
 * POST /api/resource-request
 * - Enregistre une demande de ressource en base de données
 * - Envoie un email de notification à l'administrateur via SendGrid
 * - Envoie une réponse automatique à l'utilisateur
 */

import { NextRequest, NextResponse } from 'next/server';
import { getResourceRequestSystem } from '@/lib/email/resource-request-system';

interface ResourceRequestBody {
  userEmail: string;
  resourceUrl: string;
  sourceUrl: string;
  message?: string;
}

/**
 * Valider les données de la requête
 */
function validateRequestBody(body: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!body.userEmail || typeof body.userEmail !== 'string') {
    errors.push('Email utilisateur requis');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.userEmail)) {
      errors.push('Format d\'email invalide');
    }
  }

  if (!body.resourceUrl || typeof body.resourceUrl !== 'string') {
    errors.push('URL de la ressource requise');
  }

  if (!body.sourceUrl || typeof body.sourceUrl !== 'string') {
    errors.push('URL source requise');
  }

  if (body.message && typeof body.message !== 'string') {
    errors.push('Le message doit être une chaîne de caractères');
  }

  if (body.message && body.message.length > 500) {
    errors.push('Le message ne peut pas dépasser 500 caractères');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Nettoyer et normaliser les données
 */
function sanitizeRequestBody(body: ResourceRequestBody): ResourceRequestBody {
  return {
    userEmail: body.userEmail.trim().toLowerCase(),
    resourceUrl: body.resourceUrl.trim(),
    sourceUrl: body.sourceUrl.trim(),
    message: body.message?.trim() || undefined
  };
}

/**
 * POST - Soumettre une demande de ressource
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body: ResourceRequestBody;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Corps de requête JSON invalide' },
        { status: 400 }
      );
    }

    // Validate request body
    const validation = validateRequestBody(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          error: 'Données invalides', 
          details: validation.errors 
        },
        { status: 400 }
      );
    }

    // Sanitize data
    const sanitizedBody = sanitizeRequestBody(body);

    // Get resource request system
    const requestSystem = getResourceRequestSystem();

    // Submit request
    const requestId = await requestSystem.submitRequest({
      requestedUrl: sanitizedBody.resourceUrl,
      userEmail: sanitizedBody.userEmail,
      sourceUrl: sanitizedBody.sourceUrl,
      message: sanitizedBody.message
    });

    // Return success response
    return NextResponse.json({
      success: true,
      requestId,
      message: 'Demande de ressource enregistrée avec succès'
    });

  } catch (error: any) {
    console.error('Erreur dans l\'API resource-request:', error);

    // Handle specific errors with detailed logging
    if (error.message.includes('Limite quotidienne')) {
      console.warn('Rate limit exceeded for user');
      return NextResponse.json(
        { error: 'Limite quotidienne de demandes atteinte. Réessayez demain.' },
        { status: 429 }
      );
    }

    if (error.message.includes('SENDGRID_API_KEY')) {
      console.error('SendGrid configuration error:', error.message);
      return NextResponse.json(
        { error: 'Service d\'email temporairement indisponible' },
        { status: 503 }
      );
    }

    if (error.message.includes('supabaseUrl')) {
      console.error('Database configuration error:', error.message);
      return NextResponse.json(
        { error: 'Service de base de données indisponible' },
        { status: 503 }
      );
    }

    // Log full error for debugging
    console.error('Unhandled error in resource-request API:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    // Generic error response
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

/**
 * GET - Obtenir les statistiques des demandes (pour l'administration)
 */
export async function GET(request: NextRequest) {
  try {
    // Simple auth check - in production, implement proper authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token d\'authentification requis' },
        { status: 401 }
      );
    }

    const requestSystem = getResourceRequestSystem();
    const stats = await requestSystem.getRequestStats();

    return NextResponse.json({
      success: true,
      stats
    });

  } catch (error: any) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}