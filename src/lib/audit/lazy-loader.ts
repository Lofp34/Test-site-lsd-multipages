// Lazy Loading System for CPU Optimization
// Implements dynamic module loading to reduce initial CPU load

export interface LazyModule<T> {
  load(): Promise<T>;
  isLoaded(): boolean;
  unload(): void;
}

export interface LazyLoaderConfig {
  enableCaching: boolean;
  maxCacheSize: number;
  unloadTimeoutMs: number;
  enableMetrics: boolean;
}

export interface LoadingMetrics {
  moduleName: string;
  loadTime: number;
  loadCount: number;
  lastLoadedAt: Date;
  memoryUsage: number;
  isCurrentlyLoaded: boolean;
}

class LazyModuleImpl<T> implements LazyModule<T> {
  private loader: () => Promise<T>;
  private cached: T | null = null;
  private loading: Promise<T> | null = null;
  private unloadTimer: NodeJS.Timeout | null = null;
  private config: LazyLoaderConfig;
  private metrics: LoadingMetrics;

  constructor(
    private moduleName: string,
    loader: () => Promise<T>,
    config: LazyLoaderConfig
  ) {
    this.loader = loader;
    this.config = config;
    this.metrics = {
      moduleName,
      loadTime: 0,
      loadCount: 0,
      lastLoadedAt: new Date(0),
      memoryUsage: 0,
      isCurrentlyLoaded: false
    };
  }

  async load(): Promise<T> {
    // Return cached version if available
    if (this.cached && this.config.enableCaching) {
      this.resetUnloadTimer();
      return this.cached;
    }

    // Return existing loading promise if already loading
    if (this.loading) {
      return this.loading;
    }

    // Start loading
    const startTime = Date.now();
    console.log(`⏳ Lazy loading module: ${this.moduleName}`);

    this.loading = this.loader();

    try {
      const module = await this.loading;
      const loadTime = Date.now() - startTime;

      // Cache if enabled
      if (this.config.enableCaching) {
        this.cached = module;
        this.resetUnloadTimer();
      }

      // Update metrics
      if (this.config.enableMetrics) {
        this.metrics.loadTime = loadTime;
        this.metrics.loadCount++;
        this.metrics.lastLoadedAt = new Date();
        this.metrics.memoryUsage = this.estimateMemoryUsage(module);
        this.metrics.isCurrentlyLoaded = true;
      }

      console.log(`✅ Module ${this.moduleName} loaded in ${loadTime}ms`);
      return module;

    } catch (error) {
      console.error(`❌ Failed to load module ${this.moduleName}:`, error);
      throw error;

    } finally {
      this.loading = null;
    }
  }

  isLoaded(): boolean {
    return this.cached !== null;
  }

  unload(): void {
    if (this.cached) {
      console.log(`🗑️  Unloading module: ${this.moduleName}`);
      this.cached = null;
      this.metrics.isCurrentlyLoaded = false;
    }

    if (this.unloadTimer) {
      clearTimeout(this.unloadTimer);
      this.unloadTimer = null;
    }
  }

  getMetrics(): LoadingMetrics {
    return { ...this.metrics };
  }

  private resetUnloadTimer(): void {
    if (this.unloadTimer) {
      clearTimeout(this.unloadTimer);
    }

    if (this.config.unloadTimeoutMs > 0) {
      this.unloadTimer = setTimeout(() => {
        this.unload();
      }, this.config.unloadTimeoutMs);
    }
  }

  private estimateMemoryUsage(module: any): number {
    try {
      const jsonString = JSON.stringify(module);
      return new Blob([jsonString]).size;
    } catch {
      return 0; // Can't estimate for non-serializable objects
    }
  }
}

export class LazyLoader {
  private modules = new Map<string, LazyModuleImpl<any>>();
  private config: LazyLoaderConfig;

  constructor(config?: Partial<LazyLoaderConfig>) {
    this.config = {
      enableCaching: true,
      maxCacheSize: 50,
      unloadTimeoutMs: 300000, // 5 minutes
      enableMetrics: true,
      ...config
    };
  }

  /**
   * Register a module for lazy loading
   */
  register<T>(
    moduleName: string,
    loader: () => Promise<T>
  ): LazyModule<T> {
    if (this.modules.has(moduleName)) {
      return this.modules.get(moduleName)!;
    }

    const lazyModule = new LazyModuleImpl(moduleName, loader, this.config);
    this.modules.set(moduleName, lazyModule);

    // Enforce cache size limit
    if (this.modules.size > this.config.maxCacheSize) {
      this.evictOldestModule();
    }

    return lazyModule;
  }

  /**
   * Load a module by name
   */
  async load<T>(moduleName: string): Promise<T> {
    const module = this.modules.get(moduleName);
    if (!module) {
      throw new Error(`Module ${moduleName} not registered`);
    }

    return module.load();
  }

  /**
   * Check if a module is loaded
   */
  isLoaded(moduleName: string): boolean {
    const module = this.modules.get(moduleName);
    return module ? module.isLoaded() : false;
  }

  /**
   * Unload a specific module
   */
  unload(moduleName: string): void {
    const module = this.modules.get(moduleName);
    if (module) {
      module.unload();
    }
  }

  /**
   * Unload all modules
   */
  unloadAll(): void {
    for (const module of this.modules.values()) {
      module.unload();
    }
  }

  /**
   * Get loading metrics for all modules
   */
  getMetrics(): LoadingMetrics[] {
    return Array.from(this.modules.values()).map(module => module.getMetrics());
  }

  /**
   * Get summary statistics
   */
  getSummary(): {
    totalModules: number;
    loadedModules: number;
    totalLoadTime: number;
    totalMemoryUsage: number;
    averageLoadTime: number;
  } {
    const metrics = this.getMetrics();
    const loadedModules = metrics.filter(m => m.isCurrentlyLoaded);

    return {
      totalModules: metrics.length,
      loadedModules: loadedModules.length,
      totalLoadTime: metrics.reduce((sum, m) => sum + m.loadTime, 0),
      totalMemoryUsage: loadedModules.reduce((sum, m) => sum + m.memoryUsage, 0),
      averageLoadTime: metrics.length > 0 
        ? metrics.reduce((sum, m) => sum + m.loadTime, 0) / metrics.length 
        : 0
    };
  }

  /**
   * Preload critical modules
   */
  async preloadCritical(moduleNames: string[]): Promise<void> {
    console.log(`🚀 Preloading ${moduleNames.length} critical modules...`);
    
    const startTime = Date.now();
    const loadPromises = moduleNames.map(name => this.load(name));
    
    try {
      await Promise.all(loadPromises);
      const totalTime = Date.now() - startTime;
      console.log(`✅ Critical modules preloaded in ${totalTime}ms`);
    } catch (error) {
      console.error('❌ Failed to preload critical modules:', error);
      throw error;
    }
  }

  private evictOldestModule(): void {
    let oldestModule: string | null = null;
    let oldestTime = Date.now();

    for (const [name, module] of this.modules.entries()) {
      const metrics = module.getMetrics();
      if (metrics.lastLoadedAt.getTime() < oldestTime) {
        oldestTime = metrics.lastLoadedAt.getTime();
        oldestModule = name;
      }
    }

    if (oldestModule) {
      console.log(`🗑️  Evicting oldest module: ${oldestModule}`);
      this.unload(oldestModule);
      this.modules.delete(oldestModule);
    }
  }
}

// Export singleton instance
export const lazyLoader = new LazyLoader();

// Predefined lazy modules for common audit components
export const LazyModules = {
  // Link validation modules
  linkValidator: lazyLoader.register('linkValidator', async () => {
    const { LinkValidator } = await import('./link-validator');
    return new LinkValidator();
  }),

  batchValidator: lazyLoader.register('batchValidator', async () => {
    const { BatchValidator } = await import('./batch-validator');
    return new BatchValidator();
  }),

  // Report generation modules
  reportGenerator: lazyLoader.register('reportGenerator', async () => {
    const { ReportGenerator } = await import('./report-generator');
    return new ReportGenerator();
  }),

  htmlReportGenerator: lazyLoader.register('htmlReportGenerator', async () => {
    const { HtmlReportGenerator } = await import('./html-report-generator');
    return new HtmlReportGenerator();
  }),

  csvExportGenerator: lazyLoader.register('csvExportGenerator', async () => {
    const { CsvExportGenerator } = await import('./csv-export-generator');
    return new CsvExportGenerator();
  }),

  // Auto correction modules
  autoCorrector: lazyLoader.register('autoCorrector', async () => {
    const { AutoCorrector } = await import('./auto-corrector');
    return new AutoCorrector();
  }),

  // Email and notification modules
  sendGridService: lazyLoader.register('sendGridService', async () => {
    const { SendGridService } = await import('../email/sendgrid-service');
    return new SendGridService();
  }),

  alertManager: lazyLoader.register('alertManager', async () => {
    const { AlertManager } = await import('./alert-manager');
    return new AlertManager();
  }),

  // Scanning modules
  linkScanner: lazyLoader.register('linkScanner', async () => {
    const { LinkScanner } = await import('./link-scanner');
    return new LinkScanner();
  }),

  sitemapScanner: lazyLoader.register('sitemapScanner', async () => {
    const { SitemapScanner } = await import('./sitemap-scanner');
    return new SitemapScanner();
  }),

  // Database and cache modules
  cacheStrategy: lazyLoader.register('cacheStrategy', async () => {
    const { CacheStrategy } = await import('./cache-strategy');
    return new CacheStrategy();
  }),

  // Vercel monitoring modules
  usageMonitor: lazyLoader.register('usageMonitor', async () => {
    const { VercelUsageMonitor } = await import('../vercel/usage-monitor');
    return new VercelUsageMonitor();
  }),

  fallbackManager: lazyLoader.register('fallbackManager', async () => {
    const { FallbackManager } = await import('../vercel/fallback-manager');
    return new FallbackManager();
  })
};

// Utility functions
export const LazyUtils = {
  /**
   * Create a lazy-loaded function wrapper
   */
  createLazyFunction<T extends (...args: any[]) => any>(
    moduleName: string,
    moduleLoader: () => Promise<{ [key: string]: T }>,
    functionName: string
  ): (...args: Parameters<T>) => Promise<ReturnType<T>> {
    const lazyModule = lazyLoader.register(moduleName, moduleLoader);

    return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
      const module = await lazyModule.load();
      const fn = module[functionName];
      
      if (typeof fn !== 'function') {
        throw new Error(`Function ${functionName} not found in module ${moduleName}`);
      }

      return fn(...args);
    };
  },

  /**
   * Create a lazy-loaded class wrapper
   */
  createLazyClass<T>(
    moduleName: string,
    moduleLoader: () => Promise<{ new(...args: any[]): T }>,
    constructorArgs: any[] = []
  ): () => Promise<T> {
    const lazyModule = lazyLoader.register(moduleName, async () => {
      const ModuleClass = await moduleLoader();
      return new ModuleClass(...constructorArgs);
    });

    return () => lazyModule.load();
  },

  /**
   * Measure loading performance
   */
  async measureLoadingPerformance(
    moduleNames: string[]
  ): Promise<{
    moduleName: string;
    loadTime: number;
    memoryBefore: number;
    memoryAfter: number;
    memoryDelta: number;
  }[]> {
    const results = [];

    for (const moduleName of moduleNames) {
      const memoryBefore = process.memoryUsage().heapUsed / 1024 / 1024;
      const startTime = Date.now();

      try {
        await lazyLoader.load(moduleName);
        const loadTime = Date.now() - startTime;
        const memoryAfter = process.memoryUsage().heapUsed / 1024 / 1024;

        results.push({
          moduleName,
          loadTime,
          memoryBefore: Math.round(memoryBefore),
          memoryAfter: Math.round(memoryAfter),
          memoryDelta: Math.round(memoryAfter - memoryBefore)
        });

      } catch (error) {
        console.error(`Failed to measure loading performance for ${moduleName}:`, error);
      }
    }

    return results;
  }
};