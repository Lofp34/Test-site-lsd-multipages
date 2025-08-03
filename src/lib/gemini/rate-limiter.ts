/**
 * Rate Limiter pour l'API Chat Gemini
 * Implémente un système de limitation de taux côté serveur
 */

export interface RateLimitConfig {
  windowMs: number; // Fenêtre de temps en millisecondes
  maxRequests: number; // Nombre maximum de requêtes par fenêtre
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  keyGenerator?: (identifier: string) => string;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime?: number;
  retryAfter?: number;
}

export interface RateLimitEntry {
  count: number;
  resetTime: number;
  firstRequest: number;
}

export class RateLimiter {
  private config: Required<RateLimitConfig>;
  private store: Map<string, RateLimitEntry>;
  private cleanupInterval: NodeJS.Timeout;

  constructor(config: RateLimitConfig) {
    this.config = {
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
      keyGenerator: (identifier: string) => identifier,
      ...config,
    };

    this.store = new Map();

    // Nettoyage automatique des entrées expirées toutes les minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60 * 1000);
  }

  /**
   * Vérifie si une requête est autorisée
   */
  async checkLimit(identifier: string): Promise<RateLimitResult> {
    const key = this.config.keyGenerator(identifier);
    const now = Date.now();
    
    let entry = this.store.get(key);

    // Créer une nouvelle entrée si elle n'existe pas ou si la fenêtre a expiré
    if (!entry || now >= entry.resetTime) {
      entry = {
        count: 0,
        resetTime: now + this.config.windowMs,
        firstRequest: now,
      };
      this.store.set(key, entry);
    }

    // Vérifier si la limite est dépassée
    const allowed = entry.count < this.config.maxRequests;
    
    if (allowed) {
      entry.count++;
    }

    const remaining = Math.max(0, this.config.maxRequests - entry.count);
    const retryAfter = allowed ? undefined : Math.ceil((entry.resetTime - now) / 1000);

    return {
      allowed,
      limit: this.config.maxRequests,
      remaining,
      resetTime: entry.resetTime,
      retryAfter,
    };
  }

  /**
   * Enregistre une requête (pour les cas où on veut compter après traitement)
   */
  async recordRequest(identifier: string, success: boolean = true): Promise<void> {
    // Skip selon la configuration
    if ((success && this.config.skipSuccessfulRequests) || 
        (!success && this.config.skipFailedRequests)) {
      return;
    }

    const key = this.config.keyGenerator(identifier);
    const now = Date.now();
    
    let entry = this.store.get(key);

    if (!entry || now >= entry.resetTime) {
      entry = {
        count: 1,
        resetTime: now + this.config.windowMs,
        firstRequest: now,
      };
    } else {
      entry.count++;
    }

    this.store.set(key, entry);
  }

  /**
   * Réinitialise le compteur pour un identifiant
   */
  async resetLimit(identifier: string): Promise<void> {
    const key = this.config.keyGenerator(identifier);
    this.store.delete(key);
  }

  /**
   * Obtient les statistiques actuelles pour un identifiant
   */
  async getStats(identifier: string): Promise<RateLimitResult | null> {
    const key = this.config.keyGenerator(identifier);
    const entry = this.store.get(key);
    
    if (!entry) {
      return null;
    }

    const now = Date.now();
    
    // Vérifier si l'entrée a expiré
    if (now >= entry.resetTime) {
      this.store.delete(key);
      return null;
    }

    const remaining = Math.max(0, this.config.maxRequests - entry.count);
    const allowed = entry.count < this.config.maxRequests;
    const retryAfter = allowed ? undefined : Math.ceil((entry.resetTime - now) / 1000);

    return {
      allowed,
      limit: this.config.maxRequests,
      remaining,
      resetTime: entry.resetTime,
      retryAfter,
    };
  }

  /**
   * Obtient toutes les statistiques
   */
  getAllStats(): Map<string, RateLimitResult> {
    const stats = new Map<string, RateLimitResult>();
    const now = Date.now();

    for (const [key, entry] of this.store.entries()) {
      // Skip les entrées expirées
      if (now >= entry.resetTime) {
        continue;
      }

      const remaining = Math.max(0, this.config.maxRequests - entry.count);
      const allowed = entry.count < this.config.maxRequests;
      const retryAfter = allowed ? undefined : Math.ceil((entry.resetTime - now) / 1000);

      stats.set(key, {
        allowed,
        limit: this.config.maxRequests,
        remaining,
        resetTime: entry.resetTime,
        retryAfter,
      });
    }

    return stats;
  }

  /**
   * Nettoie les entrées expirées
   */
  private cleanup(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    for (const [key, entry] of this.store.entries()) {
      if (now >= entry.resetTime) {
        expiredKeys.push(key);
      }
    }

    for (const key of expiredKeys) {
      this.store.delete(key);
    }

    // Log du nettoyage si des entrées ont été supprimées
    if (expiredKeys.length > 0) {
      console.log(`Rate limiter cleanup: removed ${expiredKeys.length} expired entries`);
    }
  }

  /**
   * Détruit le rate limiter et nettoie les ressources
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.store.clear();
  }

  /**
   * Obtient des métriques globales
   */
  getMetrics(): {
    totalEntries: number;
    activeEntries: number;
    expiredEntries: number;
    memoryUsage: number;
  } {
    const now = Date.now();
    let activeEntries = 0;
    let expiredEntries = 0;

    for (const entry of this.store.values()) {
      if (now >= entry.resetTime) {
        expiredEntries++;
      } else {
        activeEntries++;
      }
    }

    // Estimation approximative de l'usage mémoire
    const memoryUsage = this.store.size * 100; // ~100 bytes par entrée

    return {
      totalEntries: this.store.size,
      activeEntries,
      expiredEntries,
      memoryUsage,
    };
  }
}

/**
 * Rate limiter global pour l'application
 */
export class GlobalRateLimiter {
  private static instance: GlobalRateLimiter;
  private limiters: Map<string, RateLimiter>;

  private constructor() {
    this.limiters = new Map();
  }

  static getInstance(): GlobalRateLimiter {
    if (!GlobalRateLimiter.instance) {
      GlobalRateLimiter.instance = new GlobalRateLimiter();
    }
    return GlobalRateLimiter.instance;
  }

  /**
   * Obtient ou crée un rate limiter pour un endpoint
   */
  getLimiter(endpoint: string, config: RateLimitConfig): RateLimiter {
    if (!this.limiters.has(endpoint)) {
      this.limiters.set(endpoint, new RateLimiter(config));
    }
    return this.limiters.get(endpoint)!;
  }

  /**
   * Supprime un rate limiter
   */
  removeLimiter(endpoint: string): void {
    const limiter = this.limiters.get(endpoint);
    if (limiter) {
      limiter.destroy();
      this.limiters.delete(endpoint);
    }
  }

  /**
   * Obtient les métriques de tous les limiters
   */
  getAllMetrics(): Map<string, any> {
    const metrics = new Map();
    
    for (const [endpoint, limiter] of this.limiters.entries()) {
      metrics.set(endpoint, {
        ...limiter.getMetrics(),
        stats: limiter.getAllStats(),
      });
    }

    return metrics;
  }

  /**
   * Nettoie tous les limiters
   */
  cleanup(): void {
    for (const limiter of this.limiters.values()) {
      limiter.destroy();
    }
    this.limiters.clear();
  }
}

/**
 * Middleware Express-style pour Next.js
 */
export function createRateLimitMiddleware(config: RateLimitConfig) {
  const limiter = new RateLimiter(config);

  return async (identifier: string): Promise<{
    success: boolean;
    error?: string;
    headers?: Record<string, string>;
  }> => {
    try {
      const result = await limiter.checkLimit(identifier);

      const headers: Record<string, string> = {
        'X-RateLimit-Limit': result.limit.toString(),
        'X-RateLimit-Remaining': result.remaining.toString(),
      };

      if (result.resetTime) {
        headers['X-RateLimit-Reset'] = result.resetTime.toString();
      }

      if (!result.allowed && result.retryAfter) {
        headers['Retry-After'] = result.retryAfter.toString();
        
        return {
          success: false,
          error: `Trop de requêtes. Réessayez dans ${result.retryAfter} secondes.`,
          headers,
        };
      }

      return {
        success: true,
        headers,
      };
    } catch (error) {
      console.error('Rate limit middleware error:', error);
      return {
        success: true, // Fail open en cas d'erreur
      };
    }
  };
}

/**
 * Utilitaires pour différents types de rate limiting
 */
export const RateLimitPresets = {
  // Strict: pour les endpoints sensibles
  strict: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5,
  },
  
  // Modéré: pour les endpoints normaux
  moderate: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 20,
  },
  
  // Permissif: pour les endpoints publics
  permissive: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
  },
  
  // Burst: pour permettre des pics courts
  burst: {
    windowMs: 10 * 1000, // 10 secondes
    maxRequests: 10,
  },
  
  // Hourly: limitation horaire
  hourly: {
    windowMs: 60 * 60 * 1000, // 1 heure
    maxRequests: 1000,
  },
} as const;