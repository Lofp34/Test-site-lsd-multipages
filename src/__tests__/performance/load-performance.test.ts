/**
 * Tests de charge et performance pour le système optimisé Vercel
 * 
 * Objectifs:
 * - Tester le traitement de 498 liens en moins de 3 minutes
 * - Valider l'usage mémoire <512MB par fonction
 * - Tester la concurrence avec 3 batches simultanés
 * 
 * Requirements: 3.1, 3.2, 3.4
 */

import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { performance } from 'perf_hooks';
import { LinkScanner } from '@/lib/audit/link-scanner';
import { BatchProcessor } from '@/lib/audit/batch-processor';
import { CacheStrategy } from '@/lib/audit/cache-strategy';
import { MemoryOptimizer } from '@/lib/audit/memory-optimizer';
import { StreamingProcessor } from '@/lib/audit/streaming-processor';

// Mock des dépendances externes
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: null, error: null }))
        }))
      })),
      insert: vi.fn(() => Promise.resolve({ data: null, error: null })),
      update: vi.fn(() => Promise.resolve({ data: null, error: null }))
    }))
  }
}));

interface PerformanceMetrics {
  executionTime: number;
  memoryUsage: number;
  cpuUsage: number;
  throughput: number;
  concurrentBatches: number;
}

interface LoadTestResult {
  totalLinks: number;
  processedLinks: number;
  executionTime: number;
  memoryPeak: number;
  averageResponseTime: number;
  successRate: number;
  concurrencyLevel: number;
}

describe('Tests de charge et performance - Système optimisé Vercel', () => {
  let linkScanner: LinkScanner;
  let batchProcessor: BatchProcessor;
  let cacheStrategy: CacheStrategy;
  let memoryOptimizer: MemoryOptimizer;
  let streamingProcessor: StreamingProcessor;

  // Génération de 498 liens de test
  const generateTestLinks = (count: number = 498): string[] => {
    const baseUrls = [
      'https://laurent-serre-developpement.fr',
      'https://example.com',
      'https://httpbin.org',
      'https://jsonplaceholder.typicode.com'
    ];

    const paths = [
      '/page1', '/page2', '/page3', '/api/test', '/resources',
      '/about', '/contact', '/services', '/blog', '/portfolio'
    ];

    const links: string[] = [];
    for (let i = 0; i < count; i++) {
      const baseUrl = baseUrls[i % baseUrls.length];
      const path = paths[i % paths.length];
      const uniqueId = Math.floor(i / (baseUrls.length * paths.length));
      links.push(`${baseUrl}${path}${uniqueId > 0 ? `?id=${uniqueId}` : ''}`);
    }

    return links;
  };

  const measureMemoryUsage = (): number => {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const usage = process.memoryUsage();
      return Math.round(usage.heapUsed / 1024 / 1024); // MB
    }
    return 0;
  };

  const measurePerformance = async <T>(
    operation: () => Promise<T>
  ): Promise<{ result: T; metrics: PerformanceMetrics }> => {
    const startTime = performance.now();
    const startMemory = measureMemoryUsage();
    
    // Force garbage collection si disponible
    if (global.gc) {
      global.gc();
    }

    const result = await operation();

    const endTime = performance.now();
    const endMemory = measureMemoryUsage();
    const executionTime = endTime - startTime;

    return {
      result,
      metrics: {
        executionTime,
        memoryUsage: Math.max(endMemory - startMemory, endMemory),
        cpuUsage: 0, // Approximation
        throughput: 0,
        concurrentBatches: 0
      }
    };
  };

  beforeAll(async () => {
    // Initialisation des composants
    linkScanner = new LinkScanner();
    batchProcessor = new BatchProcessor({
      batchSize: 10,
      maxConcurrency: 3,
      timeout: 5000
    });
    cacheStrategy = new CacheStrategy();
    memoryOptimizer = new MemoryOptimizer({
      memoryLimit: 512, // MB
      enableGarbageCollection: true,
      enableStreaming: true
    });
    streamingProcessor = new StreamingProcessor();

    // Configuration du cache pour les tests
    // CacheStrategy is initialized in constructor
  });

  afterAll(async () => {
    // Nettoyage
    cacheStrategy.destroy();
  });

  describe('Test 1: Traitement de 498 liens en moins de 3 minutes', () => {
    it('devrait traiter 498 liens dans les temps impartis', async () => {
      const testLinks = generateTestLinks(498);
      const maxExecutionTime = 3 * 60 * 1000; // 3 minutes en ms

      const { result, metrics } = await measurePerformance(async () => {
        const results = await batchProcessor.processBatch(
          testLinks,
          async (link: string) => {
            // Simulation d'une validation de lien optimisée
            const cached = cacheStrategy.getLinkResult(link);
            if (cached) {
              return { url: link, status: 'cached', valid: cached.valid };
            }

            // Simulation d'une requête HTTP rapide (timeout 5s)
            const isValid = Math.random() > 0.1; // 90% de succès
            await new Promise(resolve => setTimeout(resolve, Math.random() * 100)); // 0-100ms

            await cacheStrategy.setLinkResult(link, { 
              url: link, 
              valid: isValid, 
              status: isValid ? 'valid' : 'broken',
              responseTime: Math.random() * 100,
              timestamp: Date.now()
            });
            return { url: link, status: 'validated', valid: isValid };
          }
        );

        return results;
      });

      // Vérifications
      expect(metrics.executionTime).toBeLessThan(maxExecutionTime);
      expect(result).toHaveLength(498);
      
      const successRate = result.filter((r: any) => r.valid).length / result.length;
      expect(successRate).toBeGreaterThan(0.8); // Au moins 80% de succès

      console.log(`✅ 498 liens traités en ${Math.round(metrics.executionTime)}ms (${Math.round(metrics.executionTime/1000)}s)`);
      console.log(`📊 Taux de succès: ${Math.round(successRate * 100)}%`);
    }, 4 * 60 * 1000); // Timeout de 4 minutes pour le test
  });

  describe('Test 2: Validation usage mémoire <512MB par fonction', () => {
    it('devrait maintenir l\'usage mémoire sous 512MB', async () => {
      const testLinks = generateTestLinks(498);
      const maxMemoryUsage = 512; // MB

      let peakMemory = 0;
      const memoryCheckInterval = setInterval(() => {
        const currentMemory = measureMemoryUsage();
        peakMemory = Math.max(peakMemory, currentMemory);
      }, 100);

      try {
        const { result, metrics } = await measurePerformance(async () => {
          // Utilisation du streaming processor pour optimiser la mémoire
          return await streamingProcessor.processStream(
            testLinks,
            async (batch: string[]) => {
              const results = await Promise.all(
                batch.map(async (link) => {
                  // Simulation de traitement avec optimisation mémoire
                  const result = { url: link, valid: Math.random() > 0.1 };
                  
                  // Force garbage collection périodique
                  if (Math.random() < 0.1 && global.gc) {
                    global.gc();
                  }
                  
                  return result;
                })
              );
              return results;
            },
            { batchSize: 10, maxConcurrency: 3 }
          );
        });

        clearInterval(memoryCheckInterval);

        // Vérifications
        expect(peakMemory).toBeLessThan(maxMemoryUsage);
        expect(metrics.memoryUsage).toBeLessThan(maxMemoryUsage);
        expect(result).toHaveLength(498);

        console.log(`🧠 Pic mémoire: ${peakMemory}MB (limite: ${maxMemoryUsage}MB)`);
        console.log(`📈 Usage mémoire final: ${metrics.memoryUsage}MB`);

      } finally {
        clearInterval(memoryCheckInterval);
      }
    }, 5 * 60 * 1000); // Timeout de 5 minutes
  });

  describe('Test 3: Concurrence avec 3 batches simultanés', () => {
    it('devrait gérer 3 batches simultanés sans conflit', async () => {
      const testLinks = generateTestLinks(150); // 50 liens par batch
      const batchSize = 50;
      const maxConcurrency = 3;

      const batches = [
        testLinks.slice(0, batchSize),
        testLinks.slice(batchSize, batchSize * 2),
        testLinks.slice(batchSize * 2, batchSize * 3)
      ];

      const { result, metrics } = await measurePerformance(async () => {
        // Lancement de 3 batches en parallèle
        const batchPromises = batches.map(async (batch, index) => {
          const batchId = `batch-${index}`;
          console.log(`🚀 Démarrage ${batchId} avec ${batch.length} liens`);

          const results = await batchProcessor.processBatch(
            batch,
            async (link: string) => {
              // Simulation avec délai variable pour tester la concurrence
              const delay = Math.random() * 200; // 0-200ms
              await new Promise(resolve => setTimeout(resolve, delay));
              
              return {
                url: link,
                batchId,
                processedAt: Date.now(),
                valid: Math.random() > 0.1
              };
            }
          );

          console.log(`✅ ${batchId} terminé: ${results.length} liens traités`);
          return { batchId, results };
        });

        const allResults = await Promise.all(batchPromises);
        return allResults;
      });

      // Vérifications
      expect(result).toHaveLength(3); // 3 batches
      
      const totalProcessed = result.reduce((sum: number, batch: any) => 
        sum + batch.results.length, 0
      );
      expect(totalProcessed).toBe(150);

      // Vérifier qu'il n'y a pas de doublons (pas de conflit)
      const allUrls = result.flatMap((batch: any) => 
        batch.results.map((r: any) => r.url)
      );
      const uniqueUrls = new Set(allUrls);
      expect(uniqueUrls.size).toBe(allUrls.length);

      // Vérifier que les batches ont bien été traités en parallèle
      const processingTimes = result.map((batch: any) => {
        const times = batch.results.map((r: any) => r.processedAt);
        return { min: Math.min(...times), max: Math.max(...times) };
      });

      // Il devrait y avoir des chevauchements temporels entre les batches
      const hasOverlap = processingTimes.some((batch1, i) => 
        processingTimes.some((batch2, j) => 
          i !== j && batch1.min < batch2.max && batch1.max > batch2.min
        )
      );
      expect(hasOverlap).toBe(true);

      console.log(`🔄 ${totalProcessed} liens traités en ${maxConcurrency} batches parallèles`);
      console.log(`⏱️  Temps total: ${Math.round(metrics.executionTime)}ms`);
    }, 3 * 60 * 1000); // Timeout de 3 minutes
  });

  describe('Test 4: Performance globale et métriques', () => {
    it('devrait respecter tous les critères de performance', async () => {
      const testLinks = generateTestLinks(498);
      const startTime = Date.now();

      const loadTestResult: LoadTestResult = {
        totalLinks: testLinks.length,
        processedLinks: 0,
        executionTime: 0,
        memoryPeak: 0,
        averageResponseTime: 0,
        successRate: 0,
        concurrencyLevel: 3
      };

      // Monitoring continu de la mémoire
      let memoryPeak = 0;
      const memoryMonitor = setInterval(() => {
        const current = measureMemoryUsage();
        memoryPeak = Math.max(memoryPeak, current);
      }, 50);

      try {
        const { result, metrics } = await measurePerformance(async () => {
          const results = await batchProcessor.processBatch(
            testLinks,
            async (link: string) => {
              const start = performance.now();
              
              // Simulation optimisée avec cache
              const cached = cacheStrategy.getLinkResult(link);
              if (cached) {
                return { ...cached, responseTime: performance.now() - start };
              }

              // Simulation de validation
              await new Promise(resolve => 
                setTimeout(resolve, Math.random() * 50) // 0-50ms
              );
              
              const result = {
                url: link,
                valid: Math.random() > 0.05, // 95% succès
                status: Math.random() > 0.05 ? 'valid' : 'broken',
                responseTime: performance.now() - start,
                timestamp: Date.now()
              };

              await cacheStrategy.setLinkResult(link, result);
              return result;
            }
          );

          return results;
        });

        clearInterval(memoryMonitor);

        // Calcul des métriques finales
        loadTestResult.processedLinks = result.length;
        loadTestResult.executionTime = metrics.executionTime;
        loadTestResult.memoryPeak = memoryPeak;
        loadTestResult.averageResponseTime = result.reduce((sum: number, r: any) => 
          sum + r.responseTime, 0) / result.length;
        loadTestResult.successRate = result.filter((r: any) => r.valid).length / result.length;

        // Vérifications des critères de performance
        expect(loadTestResult.executionTime).toBeLessThan(3 * 60 * 1000); // < 3 minutes
        expect(loadTestResult.memoryPeak).toBeLessThan(512); // < 512MB
        expect(loadTestResult.successRate).toBeGreaterThan(0.9); // > 90% succès
        expect(loadTestResult.averageResponseTime).toBeLessThan(100); // < 100ms moyenne
        expect(loadTestResult.processedLinks).toBe(498); // Tous les liens traités

        // Rapport de performance
        console.log('\n📊 RAPPORT DE PERFORMANCE GLOBAL');
        console.log('=====================================');
        console.log(`🔗 Liens traités: ${loadTestResult.processedLinks}/${loadTestResult.totalLinks}`);
        console.log(`⏱️  Temps d'exécution: ${Math.round(loadTestResult.executionTime)}ms (${Math.round(loadTestResult.executionTime/1000)}s)`);
        console.log(`🧠 Pic mémoire: ${loadTestResult.memoryPeak}MB`);
        console.log(`📈 Temps de réponse moyen: ${Math.round(loadTestResult.averageResponseTime)}ms`);
        console.log(`✅ Taux de succès: ${Math.round(loadTestResult.successRate * 100)}%`);
        console.log(`🔄 Niveau de concurrence: ${loadTestResult.concurrencyLevel} batches`);
        console.log(`🚀 Débit: ${Math.round(loadTestResult.processedLinks / (loadTestResult.executionTime / 1000))} liens/seconde`);

      } finally {
        clearInterval(memoryMonitor);
      }
    }, 6 * 60 * 1000); // Timeout de 6 minutes
  });

  describe('Test 5: Stress test et limites', () => {
    it('devrait gérer une charge extrême sans crash', async () => {
      const extremeLinks = generateTestLinks(1000); // Charge extrême
      let processedCount = 0;
      let errorCount = 0;

      const { result, metrics } = await measurePerformance(async () => {
        try {
          const results = await streamingProcessor.processStream(
            extremeLinks,
            async (batch: string[]) => {
              try {
                const batchResults = await Promise.all(
                  batch.map(async (link) => {
                    try {
                      processedCount++;
                      
                      // Simulation avec gestion d'erreur
                      if (Math.random() < 0.05) { // 5% d'erreurs simulées
                        throw new Error('Simulated network error');
                      }
                      
                      return { url: link, valid: true, processed: true };
                    } catch (error) {
                      errorCount++;
                      return { url: link, valid: false, error: error.message };
                    }
                  })
                );
                
                // Garbage collection forcé
                if (global.gc && Math.random() < 0.2) {
                  global.gc();
                }
                
                return batchResults;
              } catch (error) {
                console.warn(`Erreur batch: ${error.message}`);
                return [];
              }
            },
            { batchSize: 20, maxConcurrency: 5 } // Configuration plus agressive
          );

          return results;
        } catch (error) {
          console.error(`Erreur globale: ${error.message}`);
          return [];
        }
      });

      // Le système ne doit pas crasher même sous charge extrême
      expect(result).toBeDefined();
      expect(processedCount).toBeGreaterThan(900); // Au moins 90% traités
      expect(errorCount).toBeLessThan(100); // Moins de 10% d'erreurs

      const errorRate = errorCount / processedCount;
      expect(errorRate).toBeLessThan(0.1); // Moins de 10% d'erreurs

      console.log(`💪 Stress test: ${processedCount} liens traités, ${errorCount} erreurs (${Math.round(errorRate * 100)}%)`);
    }, 10 * 60 * 1000); // Timeout de 10 minutes
  });
});