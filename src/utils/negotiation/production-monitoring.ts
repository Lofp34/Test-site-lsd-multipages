// Production monitoring configuration for negotiation techniques pages

export interface MonitoringConfig {
  environment: 'development' | 'staging' | 'production';
  enableAnalytics: boolean;
  enableErrorTracking: boolean;
  enablePerformanceMonitoring: boolean;
  enableUserBehaviorTracking: boolean;
}

export interface TechniquePageMetrics {
  pageId: string;
  techniqueName: string;
  loadTime: number;
  timeOnPage: number;
  bounceRate: number;
  downloadConversions: number;
  emailCaptures: number;
  crossTechniqueNavigation: number;
  errorCount: number;
  searchImpressions: number;
  searchClicks: number;
  averagePosition: number;
}

export interface AlertThreshold {
  metric: keyof TechniquePageMetrics;
  threshold: number;
  operator: 'greater_than' | 'less_than' | 'equals';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// Configuration de monitoring par environnement
export const monitoringConfigs: Record<string, MonitoringConfig> = {
  development: {
    environment: 'development',
    enableAnalytics: false,
    enableErrorTracking: true,
    enablePerformanceMonitoring: true,
    enableUserBehaviorTracking: false
  },
  staging: {
    environment: 'staging',
    enableAnalytics: true,
    enableErrorTracking: true,
    enablePerformanceMonitoring: true,
    enableUserBehaviorTracking: true
  },
  production: {
    environment: 'production',
    enableAnalytics: true,
    enableErrorTracking: true,
    enablePerformanceMonitoring: true,
    enableUserBehaviorTracking: true
  }
};

// Seuils d'alerte pour les métriques critiques
export const alertThresholds: AlertThreshold[] = [
  {
    metric: 'loadTime',
    threshold: 3000, // 3 secondes
    operator: 'greater_than',
    severity: 'high'
  },
  {
    metric: 'bounceRate',
    threshold: 70, // 70%
    operator: 'greater_than',
    severity: 'medium'
  },
  {
    metric: 'errorCount',
    threshold: 10, // 10 erreurs par heure
    operator: 'greater_than',
    severity: 'critical'
  },
  {
    metric: 'downloadConversions',
    threshold: 5, // Moins de 5% de conversion
    operator: 'less_than',
    severity: 'medium'
  },
  {
    metric: 'timeOnPage',
    threshold: 60, // Moins de 1 minute
    operator: 'less_than',
    severity: 'low'
  }
];

// Classe principale de monitoring
export class ProductionMonitor {
  private config: MonitoringConfig;
  private metrics: Map<string, TechniquePageMetrics> = new Map();
  private alertCallbacks: Array<(alert: Alert) => void> = [];

  constructor(environment: string = 'production') {
    this.config = monitoringConfigs[environment] || monitoringConfigs.production;
    this.initializeMonitoring();
  }

  private initializeMonitoring() {
    if (typeof window === 'undefined') return;

    // Initialiser Google Analytics 4
    if (this.config.enableAnalytics) {
      this.initializeGA4();
    }

    // Initialiser le tracking des erreurs
    if (this.config.enableErrorTracking) {
      this.initializeErrorTracking();
    }

    // Initialiser le monitoring de performance
    if (this.config.enablePerformanceMonitoring) {
      this.initializePerformanceMonitoring();
    }

    // Initialiser le tracking comportemental
    if (this.config.enableUserBehaviorTracking) {
      this.initializeUserBehaviorTracking();
    }
  }

  private initializeGA4() {
    // Configuration Google Analytics 4
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (!GA_MEASUREMENT_ID) return;

    // Charger gtag
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialiser gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        'technique_id': 'dimension1',
        'user_type': 'dimension2',
        'conversion_source': 'dimension3'
      }
    });
  }

  private initializeErrorTracking() {
    // Tracking des erreurs JavaScript
    window.addEventListener('error', (event) => {
      this.trackError({
        type: 'javascript_error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: new Date().toISOString(),
        url: window.location.href
      });
    });

    // Tracking des promesses rejetées
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError({
        type: 'unhandled_promise_rejection',
        message: event.reason?.message || 'Unhandled promise rejection',
        stack: event.reason?.stack,
        timestamp: new Date().toISOString(),
        url: window.location.href
      });
    });
  }

  private initializePerformanceMonitoring() {
    // Core Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      const sendToAnalytics = (metric: any) => {
        this.trackPerformanceMetric({
          name: metric.name,
          value: metric.value,
          id: metric.id,
          timestamp: new Date().toISOString(),
          url: window.location.href
        });
      };

      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getFCP(sendToAnalytics);
      getLCP(sendToAnalytics);
      getTTFB(sendToAnalytics);
    });

    // Navigation Timing API
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          this.trackNavigationTiming(perfData);
        }, 0);
      });
    }
  }

  private initializeUserBehaviorTracking() {
    // Tracking du temps passé sur la page
    let startTime = Date.now();
    let isActive = true;

    // Détection de l'activité utilisateur
    const resetTimer = () => {
      startTime = Date.now();
      isActive = true;
    };

    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, resetTimer, true);
    });

    // Tracking de l'inactivité
    setInterval(() => {
      if (Date.now() - startTime > 30000) { // 30 secondes d'inactivité
        isActive = false;
      }
    }, 1000);

    // Tracking à la fermeture de la page
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Date.now() - startTime;
      this.trackUserBehavior({
        event: 'page_exit',
        timeOnPage,
        isActive,
        url: window.location.href,
        timestamp: new Date().toISOString()
      });
    });

    // Tracking des clics sur les liens internes
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href.includes('/techniques-de-negociation/')) {
        this.trackUserBehavior({
          event: 'internal_link_click',
          linkHref: link.href,
          linkText: link.textContent,
          sourceUrl: window.location.href,
          timestamp: new Date().toISOString()
        });
      }
    });
  }

  // Méthodes de tracking
  public trackTechniquePageView(techniqueId: string, techniqueName: string) {
    if (!this.config.enableAnalytics) return;

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'technique_page_view', {
        technique_id: techniqueId,
        technique_name: techniqueName,
        page_location: window.location.href,
        engagement_time_msec: 1000
      });
    }

    // Initialiser les métriques pour cette page
    if (!this.metrics.has(techniqueId)) {
      this.metrics.set(techniqueId, {
        pageId: techniqueId,
        techniqueName,
        loadTime: 0,
        timeOnPage: 0,
        bounceRate: 0,
        downloadConversions: 0,
        emailCaptures: 0,
        crossTechniqueNavigation: 0,
        errorCount: 0,
        searchImpressions: 0,
        searchClicks: 0,
        averagePosition: 0
      });
    }
  }

  public trackResourceDownload(resourceId: string, techniqueId: string, userEmail?: string) {
    if (!this.config.enableAnalytics) return;

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'resource_download', {
        resource_id: resourceId,
        technique_id: techniqueId,
        user_email_provided: !!userEmail,
        conversion_source: 'technique_page'
      });
    }

    // Mettre à jour les métriques
    const metrics = this.metrics.get(techniqueId);
    if (metrics) {
      metrics.downloadConversions++;
      if (userEmail) {
        metrics.emailCaptures++;
      }
      this.checkAlerts(techniqueId, metrics);
    }
  }

  public trackError(error: any) {
    if (!this.config.enableErrorTracking) return;

    console.error('Production Error:', error);

    // Envoyer à votre service de monitoring (Sentry, LogRocket, etc.)
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error);
    }

    // Mettre à jour les métriques d'erreur
    const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
    const techniqueMatch = currentUrl.match(/\/techniques-de-negociation\/([^/]+)/);
    
    if (techniqueMatch) {
      const techniqueId = techniqueMatch[1];
      const metrics = this.metrics.get(techniqueId);
      if (metrics) {
        metrics.errorCount++;
        this.checkAlerts(techniqueId, metrics);
      }
    }
  }

  public trackPerformanceMetric(metric: any) {
    if (!this.config.enablePerformanceMonitoring) return;

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true
      });
    }

    // Mettre à jour les métriques de performance
    const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
    const techniqueMatch = currentUrl.match(/\/techniques-de-negociation\/([^/]+)/);
    
    if (techniqueMatch && metric.name === 'LCP') {
      const techniqueId = techniqueMatch[1];
      const metrics = this.metrics.get(techniqueId);
      if (metrics) {
        metrics.loadTime = metric.value;
        this.checkAlerts(techniqueId, metrics);
      }
    }
  }

  public trackNavigationTiming(perfData: PerformanceNavigationTiming) {
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_load_time', {
        event_category: 'Performance',
        value: Math.round(loadTime),
        non_interaction: true
      });
    }
  }

  public trackUserBehavior(behavior: any) {
    if (!this.config.enableUserBehaviorTracking) return;

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', behavior.event, {
        event_category: 'User Behavior',
        event_label: behavior.url,
        value: behavior.timeOnPage || 0,
        non_interaction: behavior.event === 'page_exit'
      });
    }
  }

  private checkAlerts(techniqueId: string, metrics: TechniquePageMetrics) {
    alertThresholds.forEach(threshold => {
      const value = metrics[threshold.metric] as number;
      let shouldAlert = false;

      switch (threshold.operator) {
        case 'greater_than':
          shouldAlert = value > threshold.threshold;
          break;
        case 'less_than':
          shouldAlert = value < threshold.threshold;
          break;
        case 'equals':
          shouldAlert = value === threshold.threshold;
          break;
      }

      if (shouldAlert) {
        const alert: Alert = {
          techniqueId,
          metric: threshold.metric,
          value,
          threshold: threshold.threshold,
          severity: threshold.severity,
          timestamp: new Date().toISOString()
        };

        this.triggerAlert(alert);
      }
    });
  }

  private triggerAlert(alert: Alert) {
    console.warn('Production Alert:', alert);
    
    // Notifier tous les callbacks d'alerte
    this.alertCallbacks.forEach(callback => {
      try {
        callback(alert);
      } catch (error) {
        console.error('Error in alert callback:', error);
      }
    });

    // Envoyer l'alerte à votre système de monitoring
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'production_alert', {
        event_category: 'Monitoring',
        event_label: `${alert.metric}_${alert.severity}`,
        technique_id: alert.techniqueId,
        alert_value: alert.value,
        alert_threshold: alert.threshold
      });
    }
  }

  public onAlert(callback: (alert: Alert) => void) {
    this.alertCallbacks.push(callback);
  }

  public getMetrics(techniqueId?: string): TechniquePageMetrics | Map<string, TechniquePageMetrics> {
    if (techniqueId) {
      return this.metrics.get(techniqueId) || {} as TechniquePageMetrics;
    }
    return this.metrics;
  }

  public generateReport(): MonitoringReport {
    const allMetrics = Array.from(this.metrics.values());
    
    return {
      timestamp: new Date().toISOString(),
      environment: this.config.environment,
      totalPages: allMetrics.length,
      averageLoadTime: allMetrics.reduce((sum, m) => sum + m.loadTime, 0) / allMetrics.length,
      totalDownloads: allMetrics.reduce((sum, m) => sum + m.downloadConversions, 0),
      totalEmailCaptures: allMetrics.reduce((sum, m) => sum + m.emailCaptures, 0),
      totalErrors: allMetrics.reduce((sum, m) => sum + m.errorCount, 0),
      topPerformingTechniques: allMetrics
        .sort((a, b) => b.downloadConversions - a.downloadConversions)
        .slice(0, 3)
        .map(m => ({ id: m.pageId, name: m.techniqueName, conversions: m.downloadConversions }))
    };
  }
}

interface Alert {
  techniqueId: string;
  metric: keyof TechniquePageMetrics;
  value: number;
  threshold: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
}

interface MonitoringReport {
  timestamp: string;
  environment: string;
  totalPages: number;
  averageLoadTime: number;
  totalDownloads: number;
  totalEmailCaptures: number;
  totalErrors: number;
  topPerformingTechniques: Array<{
    id: string;
    name: string;
    conversions: number;
  }>;
}

// Instance globale de monitoring
export const productionMonitor = new ProductionMonitor(
  process.env.NODE_ENV || 'development'
);

// Hook React pour utiliser le monitoring
export const useProductionMonitoring = (techniqueId: string, techniqueName: string) => {
  React.useEffect(() => {
    productionMonitor.trackTechniquePageView(techniqueId, techniqueName);
  }, [techniqueId, techniqueName]);

  return {
    trackDownload: (resourceId: string, userEmail?: string) => {
      productionMonitor.trackResourceDownload(resourceId, techniqueId, userEmail);
    },
    trackError: (error: any) => {
      productionMonitor.trackError(error);
    }
  };
};