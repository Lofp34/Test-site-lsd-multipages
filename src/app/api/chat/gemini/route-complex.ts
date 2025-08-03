import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { RateLimiter } from '@/lib/gemini/rate-limiter';
import { InputValidator } from '@/lib/gemini/input-validator';
import { getValidatedProductionConfig, getSecurityHeaders } from '@/config/production';
import { productionMonitoring, withMonitoring } from '@/lib/gemini/production-monitoring';

// Configuration de production
const config = getValidatedProductionConfig();

// Configuration du rate limiting avec paramètres de production
const rateLimiter = new RateLimiter({
  windowMs: config.rateLimiting.windowMs,
  maxRequests: config.rateLimiting.maxRequests,
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
});

// Configuration de l'API Gemini avec paramètres sécurisés
const ai = new GoogleGenAI({
  apiKey: config.gemini.apiKey,
});

// Validation des inputs avec configuration de production
const inputValidator = new InputValidator({
  maxMessageLength: config.security.maxMessageLength,
  maxFileSize: config.security.maxFileSize,
  allowedMimeTypes: config.security.allowedMimeTypes,
  maxFilesPerRequest: config.security.maxFilesPerRequest,
});

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    // Vérification de la configuration
    if (!config.gemini.apiKey) {
      await productionMonitoring.reportError({
        level: 'error',
        message: 'GEMINI_API_KEY non configurée',
        context: {
          endpoint: '/api/chat/gemini',
          requestId,
          ip: request.ip || 'unknown'
        }
      });
      
      return NextResponse.json(
        { error: 'Service temporairement indisponible' },
        { 
          status: 503,
          headers: getSecurityHeaders()
        }
      );
    }

    // Rate limiting avec monitoring
    const clientIP = request.ip || 
                    request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    const rateLimitResult = await rateLimiter.checkLimit(clientIP);
    if (!rateLimitResult.allowed) {
      await productionMonitoring.reportError({
        level: 'warn',
        message: 'Rate limit dépassé',
        context: {
          endpoint: '/api/chat/gemini',
          requestId,
          ip: clientIP,
          userAgent: request.headers.get('user-agent') || undefined
        },
        metadata: {
          limit: rateLimitResult.limit,
          remaining: rateLimitResult.remaining,
          retryAfter: rateLimitResult.retryAfter
        }
      });

      return NextResponse.json(
        { 
          error: 'Trop de requêtes. Veuillez patienter avant de réessayer.',
          retryAfter: rateLimitResult.retryAfter 
        },
        { 
          status: 429,
          headers: {
            ...getSecurityHeaders(),
            'Retry-After': rateLimitResult.retryAfter?.toString() || '60',
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime?.toString() || '',
          }
        }
      );
    }

    // Parsing et validation du body
    const body = await request.json();
    const { message, files, config, systemInstruction } = body;

    // Validation des inputs
    const validationResult = inputValidator.validateRequest({
      message,
      files: files || [],
      config: config || {}
    });

    if (!validationResult.isValid) {
      return NextResponse.json(
        { error: validationResult.errors.join(', ') },
        { status: 400 }
      );
    }

    // Sanitisation du message
    const sanitizedMessage = inputValidator.sanitizeMessage(message);

    // Configuration par défaut sécurisée avec paramètres de production
    const safeConfig = {
      model: config.gemini.model,
      temperature: Math.min(Math.max(config?.temperature || config.gemini.temperature, 0), 1),
      maxTokens: Math.min(config?.maxTokens || config.gemini.maxTokens, 4096),
      thinkingBudget: config.gemini.thinkingBudget, // Configuré selon l'environnement
      ...config
    };

    // Sanitisation des instructions système
    const sanitizedSystemInstruction = systemInstruction ? 
      inputValidator.sanitizeMessage(systemInstruction) : undefined;

    // Préparation de la requête Gemini
    const requestData: any = {
      model: safeConfig.model,
      contents: sanitizedMessage,
      config: {
        temperature: safeConfig.temperature,
        maxTokens: safeConfig.maxTokens,
        thinkingConfig: {
          thinkingBudget: safeConfig.thinkingBudget,
        },
      }
    };

    if (sanitizedSystemInstruction) {
      requestData.config.systemInstruction = sanitizedSystemInstruction;
    }

    // Gestion des fichiers si présents
    if (files && files.length > 0) {
      // Validation supplémentaire des fichiers
      for (const file of files) {
        if (!inputValidator.validateFile(file)) {
          return NextResponse.json(
            { error: `Fichier non valide: ${file.name}` },
            { status: 400 }
          );
        }
      }

      // Traitement des fichiers (upload vers Gemini Files API)
      // Note: Implémentation simplifiée - en production, ajouter plus de sécurité
      try {
        const processedFiles = await Promise.all(
          files.map(async (file: any) => {
            // Validation du contenu du fichier
            if (!file.uri || !file.mimeType) {
              throw new Error(`Fichier incomplet: ${file.name}`);
            }
            return file;
          })
        );

        // Ajouter les fichiers à la requête
        requestData.contents = [
          {
            role: 'user',
            parts: [
              { text: sanitizedMessage },
              ...processedFiles.map(file => ({
                fileData: {
                  mimeType: file.mimeType,
                  fileUri: file.uri
                }
              }))
            ]
          }
        ];
      } catch (error) {
        console.error('Erreur lors du traitement des fichiers:', error);
        return NextResponse.json(
          { error: 'Erreur lors du traitement des fichiers' },
          { status: 400 }
        );
      }
    }

    // Appel à l'API Gemini avec monitoring
    const response = await withMonitoring(
      async () => await ai.models.generateContent(requestData),
      { endpoint: '/api/chat/gemini', operation: 'generateContent' }
    )();

    // Validation de la réponse
    if (!response || !response.text) {
      throw new Error('Réponse invalide de l\'API Gemini');
    }

    // Sanitisation de la réponse
    const sanitizedResponse = inputValidator.sanitizeMessage(response.text);
    const tokensUsed = response.text?.length || 0;

    // Enregistrer les métriques
    await productionMonitoring.recordResponseTime(
      '/api/chat/gemini',
      Date.now() - startTime,
      { ip: clientIP, requestId }
    );
    
    await productionMonitoring.recordTokenUsage(tokensUsed, {
      ip: clientIP,
      requestId,
      model: safeConfig.model
    });

    // Logging sécurisé (sans données sensibles)
    if (config.monitoring.logLevel === 'info' || config.monitoring.logLevel === 'debug') {
      console.log(`Chat API Success - IP: ${clientIP.substring(0, 8)}..., Tokens: ${tokensUsed}, Duration: ${Date.now() - startTime}ms`);
    }

    return NextResponse.json({
      text: sanitizedResponse,
      metadata: {
        model: safeConfig.model,
        tokensUsed,
        timestamp: new Date().toISOString(),
        requestId
      }
    }, {
      headers: getSecurityHeaders()
    });

  } catch (error: any) {
    const clientIP = request.ip || 'unknown';
    
    // Enregistrer l'erreur avec monitoring
    await productionMonitoring.recordGeminiError(error, {
      ip: clientIP,
      requestId,
      userAgent: request.headers.get('user-agent') || undefined,
      duration: Date.now() - startTime
    });

    // Gestion des erreurs spécifiques avec réponses appropriées
    let statusCode = 500;
    let errorMessage = 'Une erreur est survenue. Veuillez réessayer.';

    if (error.message?.includes('quota')) {
      statusCode = 429;
      errorMessage = 'Quota API dépassé. Veuillez réessayer plus tard.';
    } else if (error.message?.includes('rate')) {
      statusCode = 429;
      errorMessage = 'Trop de requêtes. Veuillez patienter.';
    } else if (error.message?.includes('safety')) {
      statusCode = 400;
      errorMessage = 'Contenu non autorisé détecté.';
    } else if (error.message?.includes('timeout')) {
      statusCode = 408;
      errorMessage = 'Délai d\'attente dépassé. Veuillez réessayer.';
    } else if (error.message?.includes('invalid')) {
      statusCode = 400;
      errorMessage = 'Requête invalide.';
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        requestId,
        timestamp: new Date().toISOString()
      },
      { 
        status: statusCode,
        headers: getSecurityHeaders()
      }
    );
  }
}

// Streaming endpoint
export async function GET(request: NextRequest) {
  try {
    // Vérification de la clé API
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Service temporairement indisponible' },
        { status: 503 }
      );
    }

    // Rate limiting
    const clientIP = request.ip || 'unknown';
    const rateLimitResult = await rateLimiter.checkLimit(clientIP);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Trop de requêtes' },
        { status: 429 }
      );
    }

    // Récupération des paramètres de query
    const { searchParams } = new URL(request.url);
    const message = searchParams.get('message');
    const systemInstruction = searchParams.get('systemInstruction');

    if (!message) {
      return NextResponse.json(
        { error: 'Message requis' },
        { status: 400 }
      );
    }

    // Validation et sanitisation
    const validationResult = inputValidator.validateRequest({
      message,
      files: [],
      config: {}
    });

    if (!validationResult.isValid) {
      return NextResponse.json(
        { error: validationResult.errors.join(', ') },
        { status: 400 }
      );
    }

    const sanitizedMessage = inputValidator.sanitizeMessage(message);
    const sanitizedSystemInstruction = systemInstruction ? 
      inputValidator.sanitizeMessage(systemInstruction) : undefined;

    // Configuration pour streaming
    const requestData: any = {
      model: 'gemini-2.5-flash',
      contents: sanitizedMessage,
      config: {
        temperature: 0.7,
        thinkingConfig: {
          thinkingBudget: 0,
        },
      }
    };

    if (sanitizedSystemInstruction) {
      requestData.config.systemInstruction = sanitizedSystemInstruction;
    }

    // Streaming response
    const stream = await ai.models.generateContentStream(requestData);

    // Créer un ReadableStream pour la réponse
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.text) {
              const sanitizedChunk = inputValidator.sanitizeMessage(chunk.text);
              controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ text: sanitizedChunk })}\n\n`));
            }
          }
          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      }
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error: any) {
    console.error('Streaming API Error:', error);
    return NextResponse.json(
      { error: 'Erreur lors du streaming' },
      { status: 500 }
    );
  }
}

// Options pour CORS
export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}