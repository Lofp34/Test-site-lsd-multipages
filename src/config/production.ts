/**
 * Configuration de production pour le chat Gemini
 * Sécurise les variables d'environnement et configure les limites
 */

export interface ProductionConfig {
  gemini: {
    apiKey: string;
    model: string;
    temperature: number;
    thinkingBudget: number;
    maxTokens: number;
    timeout: number;
  };
  rateLimiting: {
    windowMs: number;
    maxRequests: number;
    maxRequestsPerDay: number;
    burstLimit: number;
  };
  monitoring: {
    enableErrorReporting: boolean;
    enableAnalytics: boolean;
    enablePerformanceTracking: boolean;
    logLevel: 'error' | 'warn' | 'info' | 'debug';
  };
  security: {
    enableInputSanitization: boolean;
    maxMessageLength: number;
    maxFileSize: number;
    allowedMimeTypes: string[];
    maxFilesPerRequest: number;
    enableCORS: boolean;
    trustedOrigins: string[];
  };
  cache: {
    enableResponseCache: boolean;
    cacheTTL: number;
    maxCacheSize: number;
  };
}

/**
 * Configuration de production sécurisée
 */
export const getProductionConfig = (): ProductionConfig => {
  // Validation des variables d'environnement critiques
  const requiredEnvVars = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  };

  // Vérifier que toutes les variables requises sont présentes
  for (const [key, value] of Object.entries(requiredEnvVars)) {
    if (!value) {
      throw new Error(`Variable d'environnement manquante: ${key}`);
    }
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';

  return {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY!,
      model: 'gemini-2.5-flash',
      temperature: 0.7,
      thinkingBudget: isProduction ? 0 : 1000, // Désactivé en production pour performance
      maxTokens: 2048,
      timeout: 30000, // 30 secondes
    },
    rateLimiting: {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: isProduction ? 15 : 50, // Plus restrictif en production
      maxRequestsPerDay: isProduction ? 1000 : 5000,
      burstLimit: isProduction ? 5 : 10, // Limite de burst
    },
    monitoring: {
      enableErrorReporting: isProduction,
      enableAnalytics: isProduction,
      enablePerformanceTracking: isProduction,
      logLevel: isProduction ? 'error' : 'info',
    },
    security: {
      enableInputSanitization: true,
      maxMessageLength: 4000,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      allowedMimeTypes: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'video/mp4',
        'video/webm',
        'audio/mp3',
        'audio/wav',
        'audio/ogg',
      ],
      maxFilesPerRequest: 3, // Réduit en production
      enableCORS: true,
      trustedOrigins: [
        process.env.NEXT_PUBLIC_BASE_URL!,
        'https://laurent-serre-developpement.fr',
        'https://laurentserre.com',
        ...(isDevelopment ? ['http://localhost:3000', 'http://localhost:3001'] : [])
      ],
    },
    cache: {
      enableResponseCache: isProduction,
      cacheTTL: 300, // 5 minutes
      maxCacheSize: 100, // 100 réponses en cache
    },
  };
};

/**
 * Validation de la configuration de production
 */
export const validateProductionConfig = (config: ProductionConfig): boolean => {
  try {
    // Vérifier la clé API Gemini
    if (!config.gemini.apiKey || config.gemini.apiKey.length < 20) {
      console.error('GEMINI_API_KEY invalide ou manquante');
      return false;
    }

    // Vérifier les limites de rate limiting
    if (config.rateLimiting.maxRequests <= 0 || config.rateLimiting.windowMs <= 0) {
      console.error('Configuration de rate limiting invalide');
      return false;
    }

    // Vérifier les paramètres de sécurité
    if (config.security.maxMessageLength <= 0 || config.security.maxFileSize <= 0) {
      console.error('Configuration de sécurité invalide');
      return false;
    }

    // Vérifier les origines de confiance
    if (config.security.enableCORS && config.security.trustedOrigins.length === 0) {
      console.error('Aucune origine de confiance configurée pour CORS');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la validation de la configuration:', error);
    return false;
  }
};

/**
 * Obtenir la configuration avec validation
 */
export const getValidatedProductionConfig = (): ProductionConfig => {
  const config = getProductionConfig();
  
  if (!validateProductionConfig(config)) {
    throw new Error('Configuration de production invalide');
  }

  return config;
};

/**
 * Configuration des headers de sécurité pour la production
 */
export const getSecurityHeaders = () => {
  const config = getProductionConfig();
  
  return {
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://generativelanguage.googleapis.com",
      "media-src 'self' data:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join('; '),
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-XSS-Protection': '1; mode=block',
  };
};