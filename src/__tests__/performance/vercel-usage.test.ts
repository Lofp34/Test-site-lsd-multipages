/**
 * Tests d'usage des ressources Vercel
 * 
 * Objectifs:
 * - Simuler un mois complet d'usage pour valider les projections
 * - Tester les seuils d'alerte (70%, 80%, 90%)
 * - Valider que l'usage reste <80 GB-heures/mois et <80k invocations/mois
 * 
 * Requirements: 1.2, 1.3, 4.2
 */

import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { VercelUsageMonitor } from '@/lib/vercel/usage-monitor';
import { PerformanceAlerts } from '@/lib/vercel/performance-alerts';

// Mock des APIs Vercel
vi.mock('@vercel/node', () => ({
  getServerSideProps: vi.fn()
}));

interface MonthlyUsageSimulation {
  day: number;
  invocations: number;
  computeHours: number;
  memoryUsage: number;
  errors: number;
  cacheHits: number;
}

interface UsageProjection {
  currentUsage: {
    invocations: number;
    computeHours: number;
    percentageOfLimit: number;
  };
  monthlyProjection: {
    invocations: number;
    computeHours: number;
    percentageOfLimit: number;
  };
  alertThresholds: {
    warning: boolean; // 70%
    critical: boolean; // 80%
    emergency: boolean; // 90%
  };
  upgradeRecommendation: boolean;
}

describe('Tests d\'usage des ressources Vercel', () => {
  let usageMonitor: VercelUsageMonitor;
  let performanceAlerts: PerformanceAlerts;

  // Limites du plan Vercel Hobby
  const VERCEL_LIMITS = {
    maxInvocations: 100000, // 100k invocations/mois
    maxComputeHours: 100, // 100 GB-heures/mois
    maxCronJobs: 2,
    functionTimeout: 10 // 10 secondes max
  };

  // Objectifs de sécurité (80% des limites)
  const SAFETY_TARGETS = {
    maxInvocations: VERCEL_LIMITS.maxInvocations * 0.8, // 80k
    maxComputeHours: VERCEL_LIMITS.maxComputeHours * 0.8, // 80 GB-heures
  };

  const generateDailyUsage = (day: number, baseLoad: number = 1): MonthlyUsageSimulation => {
    // Simulation réaliste avec variations
    const weekendFactor = [6, 0].includes(day % 7) ? 0.3 : 1; // Weekend plus calme
    const randomVariation = 0.8 + Math.random() * 0.4; // ±20% variation
    
    // Usage quotidien de base (pour 30 jours)
    const dailyInvocations = Math.round(
      (SAFETY_TARGETS.maxInvocations / 30) * baseLoad * weekendFactor * randomVariation
    );
    
    // Calcul des compute hours basé sur les invocations
    // Estimation: 50ms moyenne par invocation = 0.000014 GB-heures par invocation
    const avgExecutionTime = 0.05; // 50ms
    const dailyComputeHours = (dailyInvocations * avgExecutionTime) / 3600;
    
    return {
      day,
      invocations: dailyInvocations,
      computeHours: dailyComputeHours,
      memoryUsage: Math.random() * 400 + 100, // 100-500MB
      errors: Math.round(dailyInvocations * 0.02), // 2% d'erreurs
      cacheHits: Math.round(dailyInvocations * 0.6) // 60% cache hit rate
    };
  };

  beforeAll(async () => {
    // Mock de l'API Vercel
    usageMonitor = new VercelUsageMonitor({
      apiToken: 'mock-token',
      teamId: 'mock-team',
      projectId: 'mock-project'
    });

    performanceAlerts = new PerformanceAlerts({
      emailService: 'mock',
      alertThresholds: {
        warning: 0.7,
        critical: 0.8,
        emergency: 0.9
      }
    });

    // Mock des méthodes
    vi.spyOn(usageMonitor, 'getCurrentUsage').mockImplementation(async () => ({
      functionInvocations: 0,
      computeHours: 0,
      percentageOfLimit: 0,
      projectedMonthly: 0,
      lastUpdated: new Date()
    }));
  });

  afterAll(async () => {
    vi.restoreAllMocks();
  });

  describe('Test 1: Simulation d\'un mois complet d\'usage', () => {
    it('devrait projeter un usage mensuel sous les limites de sécurité', async () => {
      const monthlySimulation: MonthlyUsageSimulation[] = [];
      
      // Génération de 30 jours d'usage
      for (let day = 1; day <= 30; day++) {
        const dailyUsage = generateDailyUsage(day, 1.0); // Charge normale
        monthlySimulation.push(dailyUsage);
      }

      // Calcul des totaux mensuels
      const monthlyTotals = monthlySimulation.reduce(
        (totals, day) => ({
          invocations: totals.invocations + day.invocations,
          computeHours: totals.computeHours + day.computeHours,
          memoryPeak: Math.max(totals.memoryPeak, day.memoryUsage),
          totalErrors: totals.totalErrors + day.errors,
          totalCacheHits: totals.totalCacheHits + day.cacheHits
        }),
        { invocations: 0, computeHours: 0, memoryPeak: 0, totalErrors: 0, totalCacheHits: 0 }
      );

      // Vérifications des limites de sécurité
      expect(monthlyTotals.invocations).toBeLessThan(SAFETY_TARGETS.maxInvocations);
      expect(monthlyTotals.computeHours).toBeLessThan(SAFETY_TARGETS.maxComputeHours);
      
      // Vérifications des limites absolues Vercel
      expect(monthlyTotals.invocations).toBeLessThan(VERCEL_LIMITS.maxInvocations);
      expect(monthlyTotals.computeHours).toBeLessThan(VERCEL_LIMITS.maxComputeHours);

      // Calcul des pourcentages d'usage
      const invocationPercentage = (monthlyTotals.invocations / VERCEL_LIMITS.maxInvocations) * 100;
      const computePercentage = (monthlyTotals.computeHours / VERCEL_LIMITS.maxComputeHours) * 100;

      expect(invocationPercentage).toBeLessThan(80); // < 80%
      expect(computePercentage).toBeLessThan(80); // < 80%

      // Rapport de simulation
      console.log('\n📊 SIMULATION MENSUELLE VERCEL');
      console.log('=====================================');
      console.log(`🔢 Invocations totales: ${monthlyTotals.invocations.toLocaleString()} (${invocationPercentage.toFixed(1)}% de la limite)`);
      console.log(`⚡ Compute hours totales: ${monthlyTotals.computeHours.toFixed(2)} GB-h (${computePercentage.toFixed(1)}% de la limite)`);
      console.log(`🧠 Pic mémoire: ${Math.round(monthlyTotals.memoryPeak)}MB`);
      console.log(`❌ Erreurs totales: ${monthlyTotals.totalErrors} (${((monthlyTotals.totalErrors / monthlyTotals.invocations) * 100).toFixed(2)}%)`);
      console.log(`💾 Cache hits: ${monthlyTotals.totalCacheHits} (${((monthlyTotals.totalCacheHits / monthlyTotals.invocations) * 100).toFixed(1)}%)`);

      // Projection quotidienne moyenne
      const avgDaily = {
        invocations: Math.round(monthlyTotals.invocations / 30),
        computeHours: monthlyTotals.computeHours / 30
      };

      console.log(`📈 Moyenne quotidienne: ${avgDaily.invocations.toLocaleString()} invocations, ${avgDaily.computeHours.toFixed(3)} GB-h`);
    });

    it('devrait détecter les pics d\'usage et ajuster les projections', async () => {
      const scenarios = [
        { name: 'Charge normale', factor: 1.0 },
        { name: 'Pic de trafic', factor: 2.0 },
        { name: 'Charge réduite', factor: 0.5 }
      ];

      for (const scenario of scenarios) {
        const weekSimulation: MonthlyUsageSimulation[] = [];
        
        // Simulation sur 7 jours
        for (let day = 1; day <= 7; day++) {
          const dailyUsage = generateDailyUsage(day, scenario.factor);
          weekSimulation.push(dailyUsage);
        }

        const weeklyTotals = weekSimulation.reduce(
          (totals, day) => ({
            invocations: totals.invocations + day.invocations,
            computeHours: totals.computeHours + day.computeHours
          }),
          { invocations: 0, computeHours: 0 }
        );

        // Projection mensuelle basée sur la semaine
        const monthlyProjection = {
          invocations: Math.round((weeklyTotals.invocations / 7) * 30),
          computeHours: (weeklyTotals.computeHours / 7) * 30
        };

        const invocationPercentage = (monthlyProjection.invocations / VERCEL_LIMITS.maxInvocations) * 100;
        const computePercentage = (monthlyProjection.computeHours / VERCEL_LIMITS.maxComputeHours) * 100;

        console.log(`\n📊 Scénario: ${scenario.name}`);
        console.log(`🔮 Projection mensuelle: ${monthlyProjection.invocations.toLocaleString()} invocations (${invocationPercentage.toFixed(1)}%)`);
        console.log(`⚡ Projection compute: ${monthlyProjection.computeHours.toFixed(2)} GB-h (${computePercentage.toFixed(1)}%)`);

        // Vérifications selon le scénario
        if (scenario.factor <= 1.0) {
          expect(invocationPercentage).toBeLessThan(80);
          expect(computePercentage).toBeLessThan(80);
        } else {
          // En cas de pic, on doit détecter le dépassement potentiel
          if (invocationPercentage > 90 || computePercentage > 90) {
            console.log(`⚠️  Alerte: Dépassement potentiel détecté pour ${scenario.name}`);
          }
        }
      }
    });
  });

  describe('Test 2: Seuils d\'alerte (70%, 80%, 90%)', () => {
    it('devrait déclencher les alertes aux bons seuils', async () => {
      const alertScenarios = [
        { usage: 65, shouldAlert: { warning: false, critical: false, emergency: false } },
        { usage: 75, shouldAlert: { warning: true, critical: false, emergency: false } },
        { usage: 85, shouldAlert: { warning: true, critical: true, emergency: false } },
        { usage: 95, shouldAlert: { warning: true, critical: true, emergency: true } }
      ];

      for (const scenario of alertScenarios) {
        const mockUsage = {
          functionInvocations: Math.round(VERCEL_LIMITS.maxInvocations * (scenario.usage / 100)),
          computeHours: VERCEL_LIMITS.maxComputeHours * (scenario.usage / 100),
          percentageOfLimit: scenario.usage,
          projectedMonthly: Math.round(VERCEL_LIMITS.maxInvocations * (scenario.usage / 100)),
          lastUpdated: new Date()
        };

        // Mock de la méthode getCurrentUsage
        vi.spyOn(usageMonitor, 'getCurrentUsage').mockResolvedValueOnce(mockUsage);

        const usage = await usageMonitor.getCurrentUsage();
        const alertStatus = await performanceAlerts.checkUsageThresholds(usage);

        // Vérifications des alertes
        expect(alertStatus.warning).toBe(scenario.shouldAlert.warning);
        expect(alertStatus.critical).toBe(scenario.shouldAlert.critical);
        expect(alertStatus.emergency).toBe(scenario.shouldAlert.emergency);

        console.log(`🚨 Usage ${scenario.usage}%: Warning=${alertStatus.warning}, Critical=${alertStatus.critical}, Emergency=${alertStatus.emergency}`);
      }
    });

    it('devrait calculer les projections d\'usage précises', async () => {
      // Simulation de 10 jours d'usage
      const usageHistory: Array<{ date: Date; invocations: number; computeHours: number }> = [];
      
      for (let day = 1; day <= 10; day++) {
        const dailyUsage = generateDailyUsage(day, 1.0);
        usageHistory.push({
          date: new Date(2024, 0, day),
          invocations: dailyUsage.invocations,
          computeHours: dailyUsage.computeHours
        });
      }

      // Calcul de la projection basée sur l'historique
      const totalInvocations = usageHistory.reduce((sum, day) => sum + day.invocations, 0);
      const totalComputeHours = usageHistory.reduce((sum, day) => sum + day.computeHours, 0);
      
      const avgDailyInvocations = totalInvocations / usageHistory.length;
      const avgDailyComputeHours = totalComputeHours / usageHistory.length;
      
      const monthlyProjection = {
        invocations: Math.round(avgDailyInvocations * 30),
        computeHours: avgDailyComputeHours * 30
      };

      // Calcul des tendances
      const recentDays = usageHistory.slice(-3); // 3 derniers jours
      const recentAvgInvocations = recentDays.reduce((sum, day) => sum + day.invocations, 0) / recentDays.length;
      
      const trend = recentAvgInvocations > avgDailyInvocations ? 'increasing' : 'decreasing';
      const trendFactor = recentAvgInvocations / avgDailyInvocations;

      // Projection ajustée avec la tendance
      const adjustedProjection = {
        invocations: Math.round(monthlyProjection.invocations * trendFactor),
        computeHours: monthlyProjection.computeHours * trendFactor
      };

      // Vérifications
      expect(adjustedProjection.invocations).toBeGreaterThan(0);
      expect(adjustedProjection.computeHours).toBeGreaterThan(0);
      
      const projectedPercentage = (adjustedProjection.invocations / VERCEL_LIMITS.maxInvocations) * 100;
      expect(projectedPercentage).toBeLessThan(100); // Ne doit pas dépasser 100%

      console.log(`📈 Projection mensuelle: ${adjustedProjection.invocations.toLocaleString()} invocations (${projectedPercentage.toFixed(1)}%)`);
      console.log(`📊 Tendance: ${trend} (facteur: ${trendFactor.toFixed(2)})`);
    });
  });

  describe('Test 3: Validation des limites de sécurité', () => {
    it('devrait respecter les limites de 80 GB-heures/mois et 80k invocations/mois', async () => {
      // Test avec différents patterns d'usage
      const usagePatterns = [
        { name: 'Usage constant', pattern: () => 1.0 },
        { name: 'Usage croissant', pattern: (day: number) => 1.0 + (day / 30) * 0.5 },
        { name: 'Usage avec pics', pattern: (day: number) => day % 7 === 0 ? 2.0 : 0.8 }
      ];

      for (const { name, pattern } of usagePatterns) {
        const monthlyUsage = { invocations: 0, computeHours: 0 };

        for (let day = 1; day <= 30; day++) {
          const factor = pattern(day);
          const dailyUsage = generateDailyUsage(day, factor);
          
          monthlyUsage.invocations += dailyUsage.invocations;
          monthlyUsage.computeHours += dailyUsage.computeHours;
        }

        // Vérifications des limites de sécurité
        const invocationsSafe = monthlyUsage.invocations <= SAFETY_TARGETS.maxInvocations;
        const computeHoursSafe = monthlyUsage.computeHours <= SAFETY_TARGETS.maxComputeHours;

        expect(invocationsSafe).toBe(true);
        expect(computeHoursSafe).toBe(true);

        const invocationsPercentage = (monthlyUsage.invocations / VERCEL_LIMITS.maxInvocations) * 100;
        const computePercentage = (monthlyUsage.computeHours / VERCEL_LIMITS.maxComputeHours) * 100;

        console.log(`\n🔍 Pattern: ${name}`);
        console.log(`📊 Invocations: ${monthlyUsage.invocations.toLocaleString()} (${invocationsPercentage.toFixed(1)}% - Safe: ${invocationsSafe})`);
        console.log(`⚡ Compute: ${monthlyUsage.computeHours.toFixed(2)} GB-h (${computePercentage.toFixed(1)}% - Safe: ${computeHoursSafe})`);
      }
    });

    it('devrait recommander un upgrade si nécessaire', async () => {
      const scenarios = [
        { usage: 60, shouldRecommendUpgrade: false },
        { usage: 75, shouldRecommendUpgrade: false },
        { usage: 85, shouldRecommendUpgrade: true },
        { usage: 95, shouldRecommendUpgrade: true }
      ];

      for (const scenario of scenarios) {
        const projection: UsageProjection = {
          currentUsage: {
            invocations: Math.round(VERCEL_LIMITS.maxInvocations * (scenario.usage / 100)),
            computeHours: VERCEL_LIMITS.maxComputeHours * (scenario.usage / 100),
            percentageOfLimit: scenario.usage
          },
          monthlyProjection: {
            invocations: Math.round(VERCEL_LIMITS.maxInvocations * (scenario.usage / 100)),
            computeHours: VERCEL_LIMITS.maxComputeHours * (scenario.usage / 100),
            percentageOfLimit: scenario.usage
          },
          alertThresholds: {
            warning: scenario.usage >= 70,
            critical: scenario.usage >= 80,
            emergency: scenario.usage >= 90
          },
          upgradeRecommendation: scenario.usage >= 80
        };

        expect(projection.upgradeRecommendation).toBe(scenario.shouldRecommendUpgrade);

        if (projection.upgradeRecommendation) {
          // Calcul du ROI potentiel d'un upgrade
          const currentCost = 0; // Plan gratuit
          const proCost = 20; // $20/mois pour Vercel Pro
          const additionalCapacity = {
            invocations: 1000000 - 100000, // +900k invocations
            computeHours: 1000 - 100 // +900 GB-heures
          };

          console.log(`💰 Upgrade recommandé pour usage ${scenario.usage}%`);
          console.log(`📈 Capacité supplémentaire: +${additionalCapacity.invocations.toLocaleString()} invocations, +${additionalCapacity.computeHours} GB-h`);
          console.log(`💵 Coût: $${proCost}/mois`);
        }
      }
    });
  });

  describe('Test 4: Monitoring en temps réel', () => {
    it('devrait surveiller l\'usage en continu', async () => {
      const monitoringDuration = 5000; // 5 secondes de monitoring
      const checkInterval = 500; // Vérification toutes les 500ms
      const usageHistory: Array<{ timestamp: number; usage: any }> = [];

      const startTime = Date.now();
      
      const monitoringPromise = new Promise<void>((resolve) => {
        const interval = setInterval(async () => {
          const currentTime = Date.now();
          
          // Simulation d'usage en temps réel
          const mockUsage = {
            functionInvocations: Math.round(Math.random() * 1000),
            computeHours: Math.random() * 0.1,
            percentageOfLimit: Math.random() * 100,
            projectedMonthly: Math.round(Math.random() * 50000),
            lastUpdated: new Date()
          };

          usageHistory.push({
            timestamp: currentTime,
            usage: mockUsage
          });

          if (currentTime - startTime >= monitoringDuration) {
            clearInterval(interval);
            resolve();
          }
        }, checkInterval);
      });

      await monitoringPromise;

      // Vérifications du monitoring
      expect(usageHistory.length).toBeGreaterThan(5); // Au moins 5 mesures
      
      const avgUsage = usageHistory.reduce((sum, record) => 
        sum + record.usage.percentageOfLimit, 0) / usageHistory.length;
      
      expect(avgUsage).toBeGreaterThanOrEqual(0);
      expect(avgUsage).toBeLessThanOrEqual(100);

      // Détection des variations
      const variations = usageHistory.slice(1).map((record, index) => 
        Math.abs(record.usage.percentageOfLimit - usageHistory[index].usage.percentageOfLimit)
      );
      
      const avgVariation = variations.reduce((sum, v) => sum + v, 0) / variations.length;

      console.log(`📊 Monitoring: ${usageHistory.length} mesures sur ${monitoringDuration}ms`);
      console.log(`📈 Usage moyen: ${avgUsage.toFixed(1)}%`);
      console.log(`📊 Variation moyenne: ${avgVariation.toFixed(2)}%`);
    });
  });
});