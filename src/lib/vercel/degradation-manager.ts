/**
 * DegradationManager - Système de dégradation gracieuse
 * 
 * Ce module gère la dégradation automatique des services en fonction de la charge
 * système et des ressources disponibles pour éviter les pannes complètes.
 */

import { VercelUsageMonitor } from './usage-monitor';
import { FallbackManager } from './fallback-manager';

export enum ServiceLevel {
  FULL = 'full',           // Toutes fonctionnalités
  ESSENTIAL = 'essential', // Audit de base seulement
  MINIMAL = 'minimal',     // Alertes critiques seulement
  FALLBACK = 'fallback'    // GitHub Actions seulement
}

export interface SystemLoad {
  cpuUsage: number;        // Pourcentage d'utilisation CPU
  memoryUsage: number;     // Pourcentage d'utilisation mémoire
  vercelUsage: number;     // Pourcentage des limites Vercel
  errorRate: number;       // Taux d'erreur sur les dernières 5 minutes
  responseTime: number;    // Temps de réponse moyen (ms)
  activeConnections: number; // Nombre de connexions actives
}

export interface DegradationConfig {
  thresholds: {
    [key in ServiceLevel]: {
      cpuUsage: number;
      memoryUsage: number;
      vercelUsage: number;
      errorRate: number;
      responseTime: number;
    };
  };
  checkInterval: number;     // Intervalle de vérification (ms)
  stabilityPeriod: number;   // Période de stabilité avant changement (ms)
  notificationCooldown: number; // Cooldown entre notifications (ms)
}

export interface DegradationStatus {
  currentLevel: ServiceLevel;
  previousLevel: ServiceLevel;
  changedAt: Date;
  reason: string;
  systemLoad: SystemLoad;
  nextCheck: Date;
  stabilityCountdown: number; // Temps restant avant changement possible
}

export interface CircuitBreakerState {
  name: string;
  state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  failureCount: number;
  lastFailureTime: Date | null;
  lastSuccessTime: Date | null;
  nextRetryTime: Date | null;
  threshold: number;
  timeout: number;
}

export class DegradationManager {
  private config: DegradationConfig;
  private currentStatus: DegradationStatus;
  private usageMonitor: VercelUsageMonitor;
  private fallbackManager: FallbackManager;
  private circuitBreakers: Map<string, CircuitBreakerState> = new Map();
  private lastNotification: Date | null = null;
  private systemMetrics: SystemLoad[] = [];
  private checkTimer: NodeJS.Timeout | null = null;

  constructor(config?: Partial<DegradationConfig>) {
    this.config = {
      thresholds: {
        [ServiceLevel.FULL]: {
          cpuUsage: 70,
          memoryUsage: 70,
          vercelUsage: 60,
          errorRate: 2,
          responseTime: 5000,
        },
        [ServiceLevel.ESSENTIAL]: {
          cpuUsage: 85,
          memoryUsage: 85,
          vercelUsage: 75,
          errorRate: 5,
          responseTime: 10000,
        },
        [ServiceLevel.MINIMAL]: {
          cpuUsage: 95,
          memoryUsage: 95,
          vercelUsage: 90,
          errorRate: 10,
          responseTime: 15000,
        },
        [ServiceLevel.FALLBACK]: {
          cpuUsage: 100,
          memoryUsage: 100,
          vercelUsage: 95,
          errorRate: 20,
          responseTime: 30000,
        },
      },
      checkInterval: 30 * 1000,      // 30 secondes
      stabilityPeriod: 2 * 60 * 1000, // 2 minutes
      notificationCooldown: 5 * 60 * 1000, // 5 minutes
      ...config,
    };

    // Initialize VercelUsageMonitor only if environment is properly configured
    try {
      this.usageMonitor = new VercelUsageMonitor();
    } catch (error) {
      console.warn('⚠️ VercelUsageMonitor not available - degradation will work with limited monitoring');
      this.usageMonitor = null as any; // Will be handled in assessSystemLoad
    }
    
    this.fallbackManager = new FallbackManager();

    this.currentStatus = {
      currentLevel: ServiceLevel.FULL,
      previousLevel: ServiceLevel.FULL,
      changedAt: new Date(),
      reason: 'Initialisation du système',
      systemLoad: this.getEmptySystemLoad(),
      nextCheck: new Date(Date.now() + this.config.checkInterval),
      stabilityCountdown: 0,
    };

    // Initialiser les circuit breakers pour les services critiques
    this.initializeCircuitBreakers();
  }

  /**
   * Démarre le monitoring automatique de la dégradation
   */
  startMonitoring(): void {
    console.log('🔄 Démarrage du monitoring de dégradation...');
    
    if (this.checkTimer) {
      clearInterval(this.checkTimer);
    }

    this.checkTimer = setInterval(async () => {
      try {
        await this.checkAndAdjustServiceLevel();
      } catch (error) {
        console.error('❌ Erreur lors de la vérification de dégradation:', error);
      }
    }, this.config.checkInterval);

    console.log(`✅ Monitoring démarré (intervalle: ${this.config.checkInterval / 1000}s)`);
  }

  /**
   * Arrête le monitoring automatique
   */
  stopMonitoring(): void {
    if (this.checkTimer) {
      clearInterval(this.checkTimer);
      this.checkTimer = null;
      console.log('⏹️ Monitoring de dégradation arrêté');
    }
  }

  /**
   * Évalue la charge système actuelle
   */
  async assessSystemLoad(): Promise<SystemLoad> {
    console.log('📊 Évaluation de la charge système...');

    try {
      // 1. Récupérer les métriques Vercel (si disponible)
      let vercelUsage = 0;
      if (this.usageMonitor) {
        try {
          const vercelMetrics = await this.usageMonitor.getCurrentUsage();
          vercelUsage = vercelMetrics.percentageOfLimit;
        } catch (error) {
          console.warn('⚠️ Impossible de récupérer les métriques Vercel:', error.message);
        }
      }
      
      // 2. Calculer les métriques système
      const systemLoad: SystemLoad = {
        cpuUsage: await this.getCpuUsage(),
        memoryUsage: await this.getMemoryUsage(),
        vercelUsage,
        errorRate: await this.getErrorRate(),
        responseTime: await this.getAverageResponseTime(),
        activeConnections: await this.getActiveConnections(),
      };

      // 3. Stocker dans l'historique
      this.systemMetrics.push(systemLoad);
      
      // Garder seulement les 100 dernières mesures
      if (this.systemMetrics.length > 100) {
        this.systemMetrics = this.systemMetrics.slice(-100);
      }

      console.log('📈 Charge système évaluée:', {
        cpu: `${systemLoad.cpuUsage}%`,
        memory: `${systemLoad.memoryUsage}%`,
        vercel: `${systemLoad.vercelUsage}%`,
        errors: `${systemLoad.errorRate}%`,
        responseTime: `${systemLoad.responseTime}ms`,
      });

      return systemLoad;
    } catch (error) {
      console.error('❌ Erreur lors de l\'évaluation de la charge:', error);
      return this.getEmptySystemLoad();
    }
  }

  /**
   * Détermine le niveau de service approprié basé sur la charge
   */
  determineServiceLevel(systemLoad: SystemLoad): ServiceLevel {
    const levels = [ServiceLevel.FULL, ServiceLevel.ESSENTIAL, ServiceLevel.MINIMAL, ServiceLevel.FALLBACK];
    
    for (const level of levels) {
      const thresholds = this.config.thresholds[level];
      
      // Si tous les seuils sont respectés, ce niveau est approprié
      if (
        systemLoad.cpuUsage <= thresholds.cpuUsage &&
        systemLoad.memoryUsage <= thresholds.memoryUsage &&
        systemLoad.vercelUsage <= thresholds.vercelUsage &&
        systemLoad.errorRate <= thresholds.errorRate &&
        systemLoad.responseTime <= thresholds.responseTime
      ) {
        return level;
      }
    }
    
    // Si aucun seuil n'est respecté, passer en fallback
    return ServiceLevel.FALLBACK;
  }

  /**
   * Ajuste le niveau de service si nécessaire
   */
  async adjustServiceLevel(targetLevel: ServiceLevel, reason: string): Promise<boolean> {
    const currentLevel = this.currentStatus.currentLevel;
    
    if (currentLevel === targetLevel) {
      return false; // Pas de changement nécessaire
    }

    console.log(`🔄 Changement de niveau de service: ${currentLevel} → ${targetLevel}`);
    console.log(`📝 Raison: ${reason}`);

    // Vérifier la période de stabilité
    const timeSinceLastChange = Date.now() - this.currentStatus.changedAt.getTime();
    if (timeSinceLastChange < this.config.stabilityPeriod) {
      const remaining = this.config.stabilityPeriod - timeSinceLastChange;
      console.log(`⏳ Période de stabilité en cours (${Math.round(remaining / 1000)}s restantes)`);
      this.currentStatus.stabilityCountdown = remaining;
      return false;
    }

    // Effectuer le changement
    const previousLevel = this.currentStatus.currentLevel;
    this.currentStatus = {
      ...this.currentStatus,
      currentLevel: targetLevel,
      previousLevel,
      changedAt: new Date(),
      reason,
      stabilityCountdown: 0,
    };

    // Appliquer les changements selon le niveau
    await this.applyServiceLevelChanges(targetLevel, previousLevel);

    // Envoyer une notification
    await this.notifyDegradation(targetLevel, previousLevel, reason);

    // Enregistrer le changement
    await this.logServiceLevelChange(targetLevel, previousLevel, reason);

    return true;
  }

  /**
   * Vérifie et ajuste automatiquement le niveau de service
   */
  async checkAndAdjustServiceLevel(): Promise<void> {
    try {
      // 1. Évaluer la charge système
      const systemLoad = await this.assessSystemLoad();
      this.currentStatus.systemLoad = systemLoad;
      this.currentStatus.nextCheck = new Date(Date.now() + this.config.checkInterval);

      // 2. Déterminer le niveau approprié
      const targetLevel = this.determineServiceLevel(systemLoad);

      // 3. Générer la raison du changement
      const reason = this.generateDegradationReason(systemLoad, targetLevel);

      // 4. Ajuster si nécessaire
      await this.adjustServiceLevel(targetLevel, reason);

    } catch (error) {
      console.error('❌ Erreur lors de la vérification automatique:', error);
    }
  }

  /**
   * Applique les changements selon le niveau de service
   */
  private async applyServiceLevelChanges(newLevel: ServiceLevel, previousLevel: ServiceLevel): Promise<void> {
    console.log(`🔧 Application des changements pour le niveau ${newLevel}...`);

    switch (newLevel) {
      case ServiceLevel.FULL:
        await this.enableFullService();
        break;
      
      case ServiceLevel.ESSENTIAL:
        await this.enableEssentialService();
        break;
      
      case ServiceLevel.MINIMAL:
        await this.enableMinimalService();
        break;
      
      case ServiceLevel.FALLBACK:
        await this.enableFallbackService();
        break;
    }

    console.log(`✅ Changements appliqués pour le niveau ${newLevel}`);
  }

  /**
   * Active le service complet
   */
  private async enableFullService(): Promise<void> {
    // Réactiver tous les services
    console.log('🟢 Activation du service complet');
    
    // Réinitialiser les circuit breakers
    for (const [name, breaker] of this.circuitBreakers) {
      if (breaker.state === 'OPEN') {
        breaker.state = 'HALF_OPEN';
        breaker.nextRetryTime = new Date();
        console.log(`🔄 Circuit breaker ${name} remis en mode HALF_OPEN`);
      }
    }
  }

  /**
   * Active le service essentiel uniquement
   */
  private async enableEssentialService(): Promise<void> {
    console.log('🟡 Activation du service essentiel uniquement');
    
    // Désactiver les fonctionnalités non-essentielles
    // - Réduire la fréquence des audits
    // - Désactiver les rapports détaillés
    // - Limiter les corrections automatiques
  }

  /**
   * Active le service minimal
   */
  private async enableMinimalService(): Promise<void> {
    console.log('🟠 Activation du service minimal');
    
    // Ne garder que les alertes critiques
    // - Arrêter les audits réguliers
    // - Ne traiter que les liens critiques
    // - Alertes d'urgence seulement
  }

  /**
   * Active le mode fallback
   */
  private async enableFallbackService(): Promise<void> {
    console.log('🔴 Activation du mode fallback');
    
    // Basculer vers GitHub Actions
    try {
      await this.fallbackManager.activateFallback('urgent');
      await this.fallbackManager.activateFallback('health');
    } catch (error) {
      console.error('❌ Erreur lors de l\'activation du fallback:', error);
    }
  }

  /**
   * Envoie une notification de dégradation
   */
  async notifyDegradation(newLevel: ServiceLevel, previousLevel: ServiceLevel, reason: string): Promise<void> {
    // Vérifier le cooldown des notifications
    if (this.lastNotification) {
      const timeSinceLastNotification = Date.now() - this.lastNotification.getTime();
      if (timeSinceLastNotification < this.config.notificationCooldown) {
        console.log('⏳ Notification en cooldown, ignorée');
        return;
      }
    }

    const severity = this.getDegradationSeverity(newLevel, previousLevel);
    const message = `Service dégradé: ${previousLevel} → ${newLevel}. Raison: ${reason}`;

    console.log(`📢 Notification de dégradation (${severity}): ${message}`);

    try {
      // Intégrer avec le système d'alertes existant
      // TODO: Utiliser AlertManager pour envoyer les notifications
      
      this.lastNotification = new Date();
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi de notification:', error);
    }
  }

  /**
   * Circuit breaker pour protéger les services
   */
  async executeWithCircuitBreaker<T>(
    name: string,
    operation: () => Promise<T>,
    options?: {
      timeout?: number;
      threshold?: number;
      resetTimeout?: number;
    }
  ): Promise<T> {
    const breaker = this.getOrCreateCircuitBreaker(name, options);

    // Vérifier l'état du circuit breaker
    if (breaker.state === 'OPEN') {
      if (breaker.nextRetryTime && Date.now() < breaker.nextRetryTime.getTime()) {
        throw new Error(`Circuit breaker ${name} is OPEN. Next retry at ${breaker.nextRetryTime.toISOString()}`);
      } else {
        // Passer en mode HALF_OPEN pour tester
        breaker.state = 'HALF_OPEN';
        console.log(`🔄 Circuit breaker ${name} passé en mode HALF_OPEN`);
      }
    }

    try {
      // Exécuter l'opération avec timeout
      const timeoutMs = options?.timeout || 10000;
      const result = await Promise.race([
        operation(),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Operation timeout')), timeoutMs)
        )
      ]);

      // Succès - réinitialiser le compteur d'échecs
      breaker.failureCount = 0;
      breaker.lastSuccessTime = new Date();
      
      if (breaker.state === 'HALF_OPEN') {
        breaker.state = 'CLOSED';
        console.log(`✅ Circuit breaker ${name} fermé après succès`);
      }

      return result;
    } catch (error) {
      // Échec - incrémenter le compteur
      breaker.failureCount++;
      breaker.lastFailureTime = new Date();

      console.error(`❌ Échec dans circuit breaker ${name} (${breaker.failureCount}/${breaker.threshold}):`, error);

      // Ouvrir le circuit si le seuil est atteint
      if (breaker.failureCount >= breaker.threshold) {
        breaker.state = 'OPEN';
        breaker.nextRetryTime = new Date(Date.now() + breaker.timeout);
        console.warn(`🚫 Circuit breaker ${name} ouvert jusqu'à ${breaker.nextRetryTime.toISOString()}`);
      }

      throw error;
    }
  }

  /**
   * Obtient ou crée un circuit breaker
   */
  private getOrCreateCircuitBreaker(
    name: string,
    options?: {
      timeout?: number;
      threshold?: number;
      resetTimeout?: number;
    }
  ): CircuitBreakerState {
    if (!this.circuitBreakers.has(name)) {
      this.circuitBreakers.set(name, {
        name,
        state: 'CLOSED',
        failureCount: 0,
        lastFailureTime: null,
        lastSuccessTime: null,
        nextRetryTime: null,
        threshold: options?.threshold || 5,
        timeout: options?.resetTimeout || 60000, // 1 minute
      });
    }

    return this.circuitBreakers.get(name)!;
  }

  /**
   * Initialise les circuit breakers pour les services critiques
   */
  private initializeCircuitBreakers(): void {
    const criticalServices = [
      { name: 'database', threshold: 3, timeout: 30000 },
      { name: 'vercel_api', threshold: 5, timeout: 60000 },
      { name: 'link_validation', threshold: 10, timeout: 120000 },
      { name: 'email_service', threshold: 3, timeout: 300000 },
    ];

    for (const service of criticalServices) {
      this.getOrCreateCircuitBreaker(service.name, {
        threshold: service.threshold,
        resetTimeout: service.timeout,
      });
    }

    console.log(`🛡️ ${criticalServices.length} circuit breakers initialisés`);
  }

  /**
   * Génère une raison pour la dégradation
   */
  private generateDegradationReason(systemLoad: SystemLoad, targetLevel: ServiceLevel): string {
    const reasons: string[] = [];

    const thresholds = this.config.thresholds[targetLevel];

    if (systemLoad.cpuUsage > thresholds.cpuUsage) {
      reasons.push(`CPU élevé (${systemLoad.cpuUsage}%)`);
    }
    if (systemLoad.memoryUsage > thresholds.memoryUsage) {
      reasons.push(`Mémoire élevée (${systemLoad.memoryUsage}%)`);
    }
    if (systemLoad.vercelUsage > thresholds.vercelUsage) {
      reasons.push(`Quota Vercel élevé (${systemLoad.vercelUsage}%)`);
    }
    if (systemLoad.errorRate > thresholds.errorRate) {
      reasons.push(`Taux d'erreur élevé (${systemLoad.errorRate}%)`);
    }
    if (systemLoad.responseTime > thresholds.responseTime) {
      reasons.push(`Temps de réponse élevé (${systemLoad.responseTime}ms)`);
    }

    return reasons.length > 0 ? reasons.join(', ') : 'Système stable';
  }

  /**
   * Détermine la sévérité de la dégradation
   */
  private getDegradationSeverity(newLevel: ServiceLevel, previousLevel: ServiceLevel): 'info' | 'warning' | 'critical' {
    const levelOrder = [ServiceLevel.FULL, ServiceLevel.ESSENTIAL, ServiceLevel.MINIMAL, ServiceLevel.FALLBACK];
    const newIndex = levelOrder.indexOf(newLevel);
    const previousIndex = levelOrder.indexOf(previousLevel);

    if (newIndex > previousIndex) {
      // Dégradation
      if (newLevel === ServiceLevel.FALLBACK) return 'critical';
      if (newLevel === ServiceLevel.MINIMAL) return 'warning';
      return 'info';
    } else {
      // Amélioration
      return 'info';
    }
  }

  /**
   * Enregistre le changement de niveau de service
   */
  private async logServiceLevelChange(newLevel: ServiceLevel, previousLevel: ServiceLevel, reason: string): Promise<void> {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      await supabase
        .from('degradation_logs')
        .insert({
          changed_at: new Date().toISOString(),
          previous_level: previousLevel,
          new_level: newLevel,
          reason,
          system_load: this.currentStatus.systemLoad,
        });

      console.log('📝 Changement de niveau enregistré');
    } catch (error) {
      console.error('❌ Erreur lors de l\'enregistrement:', error);
    }
  }

  /**
   * Méthodes pour récupérer les métriques système
   */
  private async getCpuUsage(): Promise<number> {
    // Simulation - dans un vrai environnement, utiliser des métriques système
    return Math.random() * 100;
  }

  private async getMemoryUsage(): Promise<number> {
    // Simulation - dans un vrai environnement, utiliser process.memoryUsage()
    const usage = process.memoryUsage();
    const totalMemory = 512 * 1024 * 1024; // 512MB limite Vercel
    return (usage.heapUsed / totalMemory) * 100;
  }

  private async getErrorRate(): Promise<number> {
    // Simulation - dans un vrai environnement, calculer depuis les logs
    return Math.random() * 10;
  }

  private async getAverageResponseTime(): Promise<number> {
    // Simulation - dans un vrai environnement, calculer depuis les métriques
    return Math.random() * 5000 + 1000;
  }

  private async getActiveConnections(): Promise<number> {
    // Simulation - dans un vrai environnement, compter les connexions actives
    return Math.floor(Math.random() * 100);
  }

  private getEmptySystemLoad(): SystemLoad {
    return {
      cpuUsage: 0,
      memoryUsage: 0,
      vercelUsage: 0,
      errorRate: 0,
      responseTime: 0,
      activeConnections: 0,
    };
  }

  /**
   * Méthodes publiques pour obtenir l'état
   */
  getCurrentStatus(): DegradationStatus {
    return { ...this.currentStatus };
  }

  getCircuitBreakerStatus(name: string): CircuitBreakerState | null {
    return this.circuitBreakers.get(name) || null;
  }

  getAllCircuitBreakers(): CircuitBreakerState[] {
    return Array.from(this.circuitBreakers.values());
  }

  getSystemMetricsHistory(): SystemLoad[] {
    return [...this.systemMetrics];
  }

  /**
   * Force une vérification immédiate (pour les tests)
   */
  async forceCheck(): Promise<DegradationStatus> {
    await this.checkAndAdjustServiceLevel();
    return this.getCurrentStatus();
  }

  /**
   * Réinitialise un circuit breaker spécifique
   */
  resetCircuitBreaker(name: string): boolean {
    const breaker = this.circuitBreakers.get(name);
    if (breaker) {
      breaker.state = 'CLOSED';
      breaker.failureCount = 0;
      breaker.lastFailureTime = null;
      breaker.nextRetryTime = null;
      console.log(`🔄 Circuit breaker ${name} réinitialisé`);
      return true;
    }
    return false;
  }

  /**
   * Force un niveau de service spécifique (pour les tests)
   */
  async forceServiceLevel(level: ServiceLevel, reason: string = 'Force manuelle'): Promise<boolean> {
    return await this.adjustServiceLevel(level, reason);
  }
}

// Instance singleton pour l'utilisation globale
export const degradationManager = new DegradationManager();