import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { RateLimiter } from '@/lib/gemini/rate-limiter';
import { InputValidator } from '@/lib/gemini/input-validator';

// Configuration du rate limiting pour les uploads
const uploadRateLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 uploads par minute par IP
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
});

// Configuration de l'API Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

// Validation des fichiers
const fileValidator = new InputValidator({
  maxMessageLength: 1000, // Pour les métadonnées
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedMimeTypes: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'audio/mp3',
    'audio/wav',
    'audio/ogg',
    'audio/mpeg',
  ],
  maxFilesPerRequest: 1, // Un fichier par requête d'upload
});

export async function POST(request: NextRequest) {
  try {
    // Vérification de la clé API
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY non configurée');
      return NextResponse.json(
        { error: 'Service temporairement indisponible' },
        { status: 503 }
      );
    }

    // Rate limiting
    const clientIP = request.ip || 
                    request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    const rateLimitResult = await uploadRateLimiter.checkLimit(clientIP);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Trop d\'uploads. Veuillez patienter avant de réessayer.',
          retryAfter: rateLimitResult.retryAfter 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.retryAfter?.toString() || '60',
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          }
        }
      );
    }

    // Parsing du FormData
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const mimeType = formData.get('mimeType') as string;
    const displayName = formData.get('displayName') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'Fichier requis' },
        { status: 400 }
      );
    }

    // Validation du fichier
    const fileValidation = fileValidator.validateFile({
      name: displayName || file.name,
      mimeType: mimeType || file.type,
      size: file.size,
    });

    if (!fileValidation.isValid) {
      return NextResponse.json(
        { error: fileValidation.error },
        { status: 400 }
      );
    }

    // Validation de sécurité supplémentaire
    const securityReport = fileValidator.generateSecurityReport(file.name);
    if (securityReport.riskLevel === 'high') {
      console.warn(`Upload bloqué - risque élevé: ${securityReport.threats.join(', ')}`);
      return NextResponse.json(
        { error: 'Fichier non autorisé pour des raisons de sécurité' },
        { status: 400 }
      );
    }

    // Validation du contenu du fichier (vérification basique)
    const buffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);

    // Vérifier les magic numbers pour s'assurer que le type MIME correspond
    if (!validateFileMagicNumbers(uint8Array, file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non valide ou corrompu' },
        { status: 400 }
      );
    }

    // Upload vers l'API Files de Gemini
    try {
      const uploadResult = await ai.files.upload({
        file: new Blob([buffer], { type: file.type }),
        name: fileValidation.sanitizedName || file.name,
      });

      // Logging sécurisé
      console.log(`File upload success - IP: ${clientIP}, Size: ${file.size}, Type: ${file.type}`);

      return NextResponse.json({
        id: uploadResult.file.name,
        uri: uploadResult.file.uri,
        name: fileValidation.sanitizedName || file.name,
        mimeType: file.type,
        size: file.size,
        uploadedAt: new Date().toISOString(),
      });

    } catch (uploadError: any) {
      console.error(`File upload error - IP: ${clientIP}, Error: ${uploadError.message}`);

      // Gestion des erreurs spécifiques de l'API Gemini
      if (uploadError.message?.includes('quota')) {
        return NextResponse.json(
          { error: 'Quota d\'upload dépassé. Veuillez réessayer plus tard.' },
          { status: 429 }
        );
      }

      if (uploadError.message?.includes('size')) {
        return NextResponse.json(
          { error: 'Fichier trop volumineux' },
          { status: 413 }
        );
      }

      if (uploadError.message?.includes('type') || uploadError.message?.includes('format')) {
        return NextResponse.json(
          { error: 'Type de fichier non supporté' },
          { status: 415 }
        );
      }

      // Erreur générique
      return NextResponse.json(
        { error: 'Erreur lors de l\'upload du fichier' },
        { status: 500 }
      );
    }

  } catch (error: any) {
    const clientIP = request.ip || 'unknown';
    console.error(`File upload API error - IP: ${clientIP}, Error: ${error.message}`);

    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

/**
 * Valide les magic numbers d'un fichier pour vérifier son type réel
 */
function validateFileMagicNumbers(buffer: Uint8Array, mimeType: string): boolean {
  if (buffer.length < 4) return false;

  const header = Array.from(buffer.slice(0, 12))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  // Magic numbers pour les types de fichiers supportés
  const magicNumbers: Record<string, string[]> = {
    'image/jpeg': ['ffd8ff'],
    'image/png': ['89504e47'],
    'image/gif': ['474946383761', '474946383961'], // GIF87a, GIF89a
    'image/webp': ['52494646'], // RIFF (WebP commence par RIFF)
    'video/mp4': ['00000018667479704d534e56', '00000020667479704d534e56'], // ftyp
    'video/webm': ['1a45dfa3'], // EBML
    'video/quicktime': ['00000014667479707174'], // QuickTime
    'audio/mp3': ['494433', 'fffb', 'fff3', 'fff2'], // ID3, MP3 frames
    'audio/wav': ['52494646'], // RIFF
    'audio/ogg': ['4f676753'], // OggS
    'audio/mpeg': ['494433', 'fffb', 'fff3', 'fff2'], // Même que MP3
  };

  const expectedMagics = magicNumbers[mimeType];
  if (!expectedMagics) {
    // Type MIME non reconnu, mais on laisse passer
    return true;
  }

  // Vérifier si le header commence par un des magic numbers attendus
  return expectedMagics.some(magic => header.toLowerCase().startsWith(magic));
}

// Options pour CORS
export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}