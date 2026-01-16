/**
 * Service de cache intelligent pour le chat Gemini
 * Cache les réponses communes et optimise les performances
 */

interface CacheEntry {
  key: string;
  value: string;
  timestamp: Date;
  hits: number;
  lastAccess: Date;
  metadata?: {
    tokens: number;
    confidence: number;
    source: 'gemini' | 'template' | 'fallback';
  };
}

interface CacheConfig {
  maxEntries: number;
  ttlMs: number; // Time to live en millisecondes
  maxMemoryMB: number;
  enableCompression: boolean;
}

class ChatCacheService {
  private cache: Map<string, CacheEntry> = new Map();
  private config: CacheConfig;
  private memoryUsage = 0;

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      maxEntries: 1000,
      ttlMs: 30 * 60 * 1000, // 30 minutes
      maxMemoryMB: 50, // 50MB max
      enableCompression: true,
      ...config
    };

    // Nettoyage périodique
    setInterval(() => this.cleanup(), 5 * 60 * 1000); // Toutes les 5 minutes
  }

  /**
   * Génère une clé de cache normalisée
   */
  private generateCacheKey(input: string, context?: Record<string, any>): string {
    // Normaliser l'input
    const normalizedInput = input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, '') // Supprimer la ponctuation
      .replace(/\s+/g, ' '); // Normaliser les espaces

    // Ajouter le contexte si présent
    const contextStr = context ? JSON.stringify(context) : '';
    
    // Hash simple pour éviter les clés trop longues
    return this.simpleHash(normalizedInput + contextStr);
  }

  /**
   * Hash simple pour les clés
   */
  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convertir en 32bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Vérifie si une réponse est en cache
   */
  has(input: string, context?: Record<string, any>): boolean {
    const key = this.generateCacheKey(input, context);
    const entry = this.cache.get(key);
    
    if (!entry) return false;
    
    // Vérifier l'expiration
    if (this.isExpired(entry)) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  /**
   * Récupère une réponse du cache
   */
  get(input: string, context?: Record<string, any>): string | null {
    const key = this.generateCacheKey(input, context);
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    // Vérifier l'expiration
    if (this.isExpired(entry)) {
      this.cache.delete(key);
      this.updateMemoryUsage();
      return null;
    }
    
    // Mettre à jour les statistiques d'accès
    entry.hits++;
    entry.lastAccess = new Date();
    
    return entry.value;
  }

  /**
   * Met en cache une réponse
   */
  set(
    input: string, 
    response: string, 
    context?: Record<string, any>,
    metadata?: CacheEntry['metadata']
  ): void {
    const key = this.generateCacheKey(input, context);
    
    // Vérifier si on dépasse la limite d'entrées
    if (this.cache.size >= this.config.maxEntries) {
      this.evictLeastUsed();
    }
    
    const entry: CacheEntry = {
      key,
      value: response,
      timestamp: new Date(),
      hits: 0,
      lastAccess: new Date(),
      metadata
    };
    
    this.cache.set(key, entry);
    this.updateMemoryUsage();
    
    // Vérifier la limite de mémoire
    if (this.memoryUsage > this.config.maxMemoryMB * 1024 * 1024) {
      this.evictLargestEntries();
    }
  }

  /**
   * Vérifie si une entrée est expirée
   */
  private isExpired(entry: CacheEntry): boolean {
    const now = Date.now();
    const entryTime = entry.timestamp.getTime();
    return (now - entryTime) > this.config.ttlMs;
  }

  /**
   * Supprime les entrées les moins utilisées
   */
  private evictLeastUsed(): void {
    const entries = Array.from(this.cache.entries());
    
    // Trier par nombre de hits (ascendant) puis par dernière utilisation
    entries.sort(([, a], [, b]) => {
      if (a.hits !== b.hits) {
        return a.hits - b.hits;
      }
      return a.lastAccess.getTime() - b.lastAccess.getTime();
    });
    
    // Supprimer les 10% les moins utilisées
    const toRemove = Math.ceil(entries.length * 0.1);
    for (let i = 0; i < toRemove; i++) {
      this.cache.delete(entries[i][0]);
    }
    
    this.updateMemoryUsage();
  }

  /**
   * Supprime les plus grosses entrées pour libérer de la mémoire
   */
  private evictLargestEntries(): void {
    const entries = Array.from(this.cache.entries());
    
    // Trier par taille (descendant)
    entries.sort(([, a], [, b]) => b.value.length - a.value.length);
    
    // Supprimer jusqu'à être sous la limite
    for (const [key, entry] of entries) {
      this.cache.delete(key);
      this.updateMemoryUsage();
      
      if (this.memoryUsage <= this.config.maxMemoryMB * 1024 * 1024 * 0.8) {
        break; // Descendre à 80% de la limite
      }
    }
  }

  /**
   * Met à jour l'estimation de l'usage mémoire
   */
  private updateMemoryUsage(): void {
    let totalSize = 0;
    
    for (const entry of this.cache.values()) {
      // Estimation approximative de la taille en mémoire
      totalSize += entry.key.length * 2; // UTF-16
      totalSize += entry.value.length * 2;
      totalSize += 200; // Overhead pour les métadonnées
    }
    
    this.memoryUsage = totalSize;
  }

  /**
   * Nettoyage périodique des entrées expirées
   */
  private cleanup(): void {
    const now = Date.now();
    let removedCount = 0;
    
    for (const [key, entry] of this.cache.entries()) {
      if (this.isExpired(entry)) {
        this.cache.delete(key);
        removedCount++;
      }
    }
    
    if (removedCount > 0) {
      this.updateMemoryUsage();
      console.log(`Cache cleanup: ${removedCount} entrées expirées supprimées`);
    }
  }

  /**
   * Précharge des réponses communes
   */
  preloadCommonResponses(): void {
    const commonQuestions = [
      {
        input: "bonjour",
        response: "Je souhaite augmenter la performance de mon équipe commerciale mais j’ai du mal à prioriser, que me conseilles-tu ?",
        metadata: { tokens: 25, confidence: 0.9, source: 'template' as const }
      },
      {
        input: "qui êtes vous",
        response: "Je suis Laurent Serre, expert en développement commercial pour PME avec 20 ans d'expérience terrain à Montpellier. Je forme et accompagne les dirigeants dans leur croissance commerciale.",
        metadata: { tokens: 35, confidence: 0.95, source: 'template' as const }
      },
      {
        input: "vos services",
        response: "Je propose plusieurs services : formations en prospection et négociation, coaching personnalisé, diagnostic commercial, et accompagnement dans la transformation digitale commerciale. Que vous intéresse le plus ?",
        metadata: { tokens: 40, confidence: 0.9, source: 'template' as const }
      },
      {
        input: "tarifs prix",
        response: "Mes tarifs varient selon vos besoins : formation groupe, coaching individuel, ou accompagnement sur mesure. Contactez-moi pour un devis personnalisé adapté à votre PME.",
        metadata: { tokens: 30, confidence: 0.85, source: 'template' as const }
      },
      {
        input: "contact",
        response: "Vous pouvez me contacter via le formulaire sur le site, par email, ou prendre rendez-vous directement. Je réponds rapidement pour discuter de vos enjeux commerciaux.",
        metadata: { tokens: 30, confidence: 0.9, source: 'template' as const }
      }
    ];

    for (const item of commonQuestions) {
      this.set(item.input, item.response, undefined, item.metadata);
    }

    console.log(`${commonQuestions.length} réponses communes préchargées`);
  }

  /**
   * Obtient les statistiques du cache
   */
  getStats(): {
    entries: number;
    memoryUsageMB: number;
    hitRate: number;
    topQuestions: Array<{ key: string; hits: number; lastAccess: Date }>;
  } {
    const entries = Array.from(this.cache.values());
    const totalHits = entries.reduce((sum, entry) => sum + entry.hits, 0);
    const totalRequests = totalHits + entries.length; // Approximation
    
    const topQuestions = entries
      .sort((a, b) => b.hits - a.hits)
      .slice(0, 10)
      .map(entry => ({
        key: entry.key,
        hits: entry.hits,
        lastAccess: entry.lastAccess
      }));

    return {
      entries: this.cache.size,
      memoryUsageMB: this.memoryUsage / (1024 * 1024),
      hitRate: totalRequests > 0 ? totalHits / totalRequests : 0,
      topQuestions
    };
  }

  /**
   * Vide le cache
   */
  clear(): void {
    this.cache.clear();
    this.memoryUsage = 0;
  }

  /**
   * Exporte le cache pour sauvegarde
   */
  export(): string {
    const data = {
      entries: Array.from(this.cache.entries()),
      timestamp: new Date().toISOString(),
      config: this.config
    };
    
    return JSON.stringify(data);
  }

  /**
   * Importe un cache sauvegardé
   */
  import(data: string): boolean {
    try {
      const parsed = JSON.parse(data);
      
      if (!parsed.entries || !Array.isArray(parsed.entries)) {
        return false;
      }
      
      this.cache.clear();
      
      for (const [key, entry] of parsed.entries) {
        // Vérifier que l'entrée n'est pas expirée
        if (!this.isExpired(entry)) {
          this.cache.set(key, entry);
        }
      }
      
      this.updateMemoryUsage();
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'import du cache:', error);
      return false;
    }
  }
}

// Instance singleton
export const chatCacheService = new ChatCacheService();

// Hook pour React
export function useChatCache() {
  return {
    has: (input: string, context?: Record<string, any>) => 
      chatCacheService.has(input, context),
    get: (input: string, context?: Record<string, any>) => 
      chatCacheService.get(input, context),
    set: (input: string, response: string, context?: Record<string, any>, metadata?: any) =>
      chatCacheService.set(input, response, context, metadata),
    getStats: () => chatCacheService.getStats(),
    clear: () => chatCacheService.clear(),
    preloadCommonResponses: () => chatCacheService.preloadCommonResponses()
  };
}
