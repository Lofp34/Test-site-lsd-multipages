# Documentation Technique - Optimisation Vercel Plan Gratuit

## Vue d'ensemble

Cette documentation technique décrit l'architecture consolidée du système d'audit des liens morts, optimisée pour respecter les limites du plan Vercel Hobby tout en préservant toutes les fonctionnalités essentielles.

## Architecture Consolidée (2 Cron Jobs)

### Ancien Système (4 Cron Jobs - Dépassait les limites)
```
❌ /api/audit-links (quotidien)
❌ /api/generate-reports (hebdomadaire) 
❌ /api/send-alerts (quotidien)
❌ /api/maintenance-tasks (hebdomadaire)
```

### Nouveau Système (2 Cron Jobs - Conforme Hobby)
```
✅ /api/audit-complete (quotidien à 2h00)
✅ /api/maintenance-weekly (lundi à 9h00)
```

## Architecture Technique Détaillée

### 1. API Route Consolidée `/api/audit-complete`

**Responsabilités consolidées :**
- Audit complet des 498 liens du site
- Traitement de la queue des tâches prioritaires
- Vérification et envoi des alertes critiques
- Corrections automatiques des liens cassés
- Notifications urgentes via SendGrid

**Structure technique :**
```typescript
// src/app/api/audit-complete/route.ts
export async function GET() {
  const startTime = Date.now();
  
  try {
    // 1. Monitoring des ressources Vercel
    const usageMonitor = new VercelUsageMonitor();
    const currentUsage = await usageMonitor.getCurrentUsage();
    
    // 2. Vérification des limites (arrêt si >90%)
    if (currentUsage.percentageOfLimit > 90) {
      await triggerFallback('usage_limit_exceeded');
      return;
    }
    
    // 3. Audit par batch optimisé
    const batchProcessor = new BatchProcessor({
      batchSize: 10,
      maxConcurrency: 3,
      timeout: 5000
    });
    
    // 4. Traitement de la queue des tâches
    const taskQueue = new TaskQueue();
    await taskQueue.processBatch(10);
    
    // 5. Corrections automatiques (max 5 par exécution)
    const autoCorrector = new AutoCorrector();
    await autoCorrector.processCorrections(5);
    
    // 6. Alertes critiques temps réel
    const alertManager = new AlertManager();
    await alertManager.sendCriticalAlerts();
    
  } catch (error) {
    await handleFallback(error);
  }
}
```

### 2. API Route de Maintenance `/api/maintenance-weekly`

**Responsabilités consolidées :**
- Génération des rapports hebdomadaires optimisés
- Nettoyage de la base de données (logs >30 jours)
- Calcul des métriques et analytics business
- Vérification des quotas Vercel et projections
- Maintenance préventive du système

**Structure technique :**
```typescript
// src/app/api/maintenance-weekly/route.ts
export async function GET() {
  try {
    // 1. Génération de rapports avec cache
    const reportGenerator = new OptimizedReportGenerator();
    await reportGenerator.generateWeeklyReports();
    
    // 2. Nettoyage base de données
    const dbCleanup = new DatabaseCleanup();
    await dbCleanup.cleanOldLogs(30); // 30 jours
    
    // 3. Analytics business
    const analytics = new BusinessAnalytics();
    await analytics.calculateWeeklyMetrics();
    
    // 4. Vérification quotas Vercel
    const usageMonitor = new VercelUsageMonitor();
    await usageMonitor.generateUsageReport();
    
  } catch (error) {
    await handleMaintenanceError(error);
  }
}
```

## Système de Cache Intelligent

### Configuration du Cache
```typescript
interface CacheStrategy {
  linkResults: {
    ttl: 6 * 60 * 60 * 1000; // 6 heures
    key: (url: string) => `link:${hash(url)}`;
  };
  sitemapData: {
    ttl: 24 * 60 * 60 * 1000; // 24 heures
    key: 'sitemap_cache';
  };
  reportData: {
    ttl: 7 * 24 * 60 * 60 * 1000; // 7 jours
    key: (date: string) => `report:${date}`;
  };
}
```

### Implémentation du Cache
```typescript
// src/lib/audit/cache-strategy.ts
export class CacheStrategy {
  private redis: Redis;
  
  async get<T>(key: string): Promise<T | null> {
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }
  
  async set<T>(key: string, value: T, ttl: number): Promise<void> {
    await this.redis.setex(key, ttl / 1000, JSON.stringify(value));
  }
  
  async invalidate(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
}
```

## Optimisations de Performance

### 1. Traitement par Batch
```typescript
// src/lib/audit/batch-processor.ts
export class BatchProcessor {
  constructor(private config: BatchConfig) {}
  
  async processBatch<T>(
    items: T[], 
    processor: (item: T) => Promise<any>
  ): Promise<any[]> {
    const batches = this.createBatches(items, this.config.batchSize);
    const results = [];
    
    for (const batch of batches) {
      const batchPromises = batch.map(processor);
      const batchResults = await Promise.allSettled(batchPromises);
      results.push(...batchResults);
      
      // Pause entre les batches pour éviter la surcharge
      await this.sleep(100);
    }
    
    return results;
  }
}
```

### 2. Optimisation Mémoire
```typescript
// src/lib/audit/memory-optimizer.ts
export class MemoryOptimizer {
  private memoryLimit = 512 * 1024 * 1024; // 512MB
  
  async processWithMemoryControl<T>(
    items: T[],
    processor: (item: T) => Promise<any>
  ): Promise<void> {
    for (let i = 0; i < items.length; i++) {
      await processor(items[i]);
      
      // Vérification mémoire tous les 10 items
      if (i % 10 === 0) {
        const memUsage = process.memoryUsage();
        if (memUsage.heapUsed > this.memoryLimit * 0.8) {
          // Force garbage collection
          if (global.gc) global.gc();
          await this.sleep(100);
        }
      }
    }
  }
}
```

### 3. Lazy Loading des Modules
```typescript
// src/lib/audit/lazy-loader.ts
export class LazyLoader {
  private modules = new Map<string, any>();
  
  async loadModule(moduleName: string): Promise<any> {
    if (!this.modules.has(moduleName)) {
      const module = await import(moduleName);
      this.modules.set(moduleName, module);
    }
    return this.modules.get(moduleName);
  }
}
```

## Système de Fallback et Résilience

### 1. Fallback Manager
```typescript
// src/lib/vercel/fallback-manager.ts
export class FallbackManager {
  private fallbacks = new Map<string, FallbackFunction>();
  
  async executeFallback(service: string, params: any): Promise<any> {
    const fallbackFn = this.fallbacks.get(service);
    if (!fallbackFn) {
      throw new Error(`No fallback registered for ${service}`);
    }
    
    return await fallbackFn(params);
  }
  
  registerFallback(service: string, fallbackFn: FallbackFunction): void {
    this.fallbacks.set(service, fallbackFn);
  }
}
```

### 2. GitHub Actions Fallback
```typescript
// src/lib/vercel/github-actions-fallback.ts
export class GitHubActionsFallback {
  async triggerWorkflow(workflow: string, inputs: any): Promise<void> {
    const response = await fetch(
      `https://api.github.com/repos/${REPO}/actions/workflows/${workflow}/dispatches`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ref: 'main', inputs }),
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to trigger workflow: ${response.statusText}`);
    }
  }
}
```

### 3. Dégradation Gracieuse
```typescript
// src/lib/vercel/degradation-manager.ts
export enum ServiceLevel {
  FULL = 'full',           // Toutes fonctionnalités
  ESSENTIAL = 'essential', // Audit de base seulement
  MINIMAL = 'minimal',     // Alertes critiques seulement
  FALLBACK = 'fallback'    // GitHub Actions seulement
}

export class DegradationManager {
  async assessSystemLoad(): Promise<ServiceLevel> {
    const metrics = await this.getSystemMetrics();
    
    if (metrics.cpuUsage > 90 || metrics.memoryUsage > 90) {
      return ServiceLevel.MINIMAL;
    } else if (metrics.cpuUsage > 70 || metrics.memoryUsage > 70) {
      return ServiceLevel.ESSENTIAL;
    } else if (metrics.errorRate > 5) {
      return ServiceLevel.ESSENTIAL;
    }
    
    return ServiceLevel.FULL;
  }
  
  async adjustServiceLevel(level: ServiceLevel): Promise<void> {
    switch (level) {
      case ServiceLevel.MINIMAL:
        await this.disableNonCriticalFeatures();
        break;
      case ServiceLevel.ESSENTIAL:
        await this.reduceProcessingLoad();
        break;
      case ServiceLevel.FALLBACK:
        await this.activateGitHubActionsFallback();
        break;
    }
  }
}
```

## Monitoring des Ressources Vercel

### 1. Usage Monitor
```typescript
// src/lib/vercel/usage-monitor.ts
export class VercelUsageMonitor {
  async getCurrentUsage(): Promise<UsageMetrics> {
    const response = await fetch(`https://api.vercel.com/v1/teams/${TEAM_ID}/usage`, {
      headers: { 'Authorization': `Bearer ${VERCEL_TOKEN}` }
    });
    
    const data = await response.json();
    
    return {
      functionInvocations: data.invocations.current,
      computeHours: data.compute.current,
      percentageOfLimit: (data.compute.current / 100) * 100, // 100 GB-heures limite
      projectedMonthly: this.calculateProjection(data)
    };
  }
  
  async checkLimits(): Promise<LimitStatus> {
    const usage = await this.getCurrentUsage();
    
    return {
      isNearLimit: usage.percentageOfLimit > 70,
      isCritical: usage.percentageOfLimit > 90,
      shouldUpgrade: usage.projectedMonthly > 80,
      recommendedAction: this.getRecommendation(usage)
    };
  }
}
```

### 2. Performance Alerts
```typescript
// src/lib/vercel/performance-alerts.ts
export class PerformanceAlerts {
  async monitorFunction(functionName: string, duration: number): Promise<void> {
    if (duration > 10000) { // > 10 secondes
      await this.sendAlert({
        type: 'slow_function',
        function: functionName,
        duration,
        threshold: 10000
      });
    }
  }
  
  async monitorMemory(memoryUsage: number): Promise<void> {
    if (memoryUsage > 400 * 1024 * 1024) { // > 400MB
      await this.sendAlert({
        type: 'high_memory',
        usage: memoryUsage,
        threshold: 400 * 1024 * 1024
      });
    }
  }
}
```

## Queue de Tâches Optimisée

### 1. Task Queue
```typescript
// src/lib/audit/task-queue.ts
export class TaskQueue {
  async addTask(task: AuditTask, priority: Priority): Promise<void> {
    await this.db.query(`
      INSERT INTO task_queue (id, type, payload, priority, created_at)
      VALUES ($1, $2, $3, $4, NOW())
    `, [task.id, task.type, JSON.stringify(task.payload), priority]);
  }
  
  async processBatch(batchSize: number): Promise<TaskResult[]> {
    const tasks = await this.getHighestPriorityTasks(batchSize);
    const results = [];
    
    for (const task of tasks) {
      try {
        const result = await this.processTask(task);
        results.push(result);
        await this.markTaskCompleted(task.id);
      } catch (error) {
        await this.handleTaskError(task, error);
      }
    }
    
    return results;
  }
}
```

## Configuration et Variables d'Environnement

### Variables Requises
```bash
# Vercel API
VERCEL_TOKEN=your_vercel_token
VERCEL_TEAM_ID=your_team_id

# GitHub Actions Fallback
GITHUB_TOKEN=your_github_token
GITHUB_REPO=your_repo

# Base de données
DATABASE_URL=your_supabase_url
DATABASE_ANON_KEY=your_supabase_key

# Cache Redis
REDIS_URL=your_redis_url

# Notifications
SENDGRID_API_KEY=your_sendgrid_key
ALERT_EMAIL=admin@example.com
```

### Configuration Vercel (vercel.json)
```json
{
  "crons": [
    {
      "path": "/api/audit-complete",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/maintenance-weekly", 
      "schedule": "0 9 * * 1"
    }
  ],
  "functions": {
    "src/app/api/audit-complete/route.ts": {
      "maxDuration": 30
    },
    "src/app/api/maintenance-weekly/route.ts": {
      "maxDuration": 30
    }
  }
}
```

## Métriques et Monitoring

### Métriques Clés à Surveiller
- **Usage Vercel** : Invocations/mois, GB-heures/mois
- **Performance** : Temps d'exécution, usage mémoire
- **Qualité** : Taux d'erreur, liens cassés détectés
- **Disponibilité** : Uptime, fallbacks activés

### Dashboards de Monitoring
- **Usage Dashboard** : Métriques temps réel Vercel
- **Performance Dashboard** : Temps d'exécution, mémoire
- **Health Dashboard** : Status des services, alertes

## Sécurité et Bonnes Pratiques

### 1. Rate Limiting
```typescript
const rateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // max 100 requêtes par fenêtre
});
```

### 2. Validation des Inputs
```typescript
const schema = z.object({
  url: z.string().url(),
  priority: z.enum(['critical', 'high', 'medium', 'low'])
});
```

### 3. Circuit Breaker
```typescript
const circuitBreaker = new CircuitBreaker({
  failureThreshold: 5,
  resetTimeout: 60000
});
```

## Évolutivité et Upgrade Path

### Passage vers Vercel Pro
Lorsque les limites du plan Hobby sont atteintes :

1. **Métriques de déclenchement** :
   - Usage > 80 GB-heures/mois
   - Invocations > 80k/mois
   - Fallbacks activés > 5% du temps

2. **Migration automatisée** :
   - Extension à 4+ cron jobs
   - Augmentation des timeouts
   - Activation de fonctionnalités avancées

3. **ROI calculé automatiquement** :
   - Coût Vercel Pro vs temps économisé
   - Impact business des optimisations
   - Recommandations personnalisées

---

Cette architecture consolidée permet de respecter les limites Vercel Hobby tout en préservant toutes les fonctionnalités essentielles, avec des fallbacks robustes et une évolutivité future assurée.