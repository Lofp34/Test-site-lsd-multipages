/**
 * Types for Vercel resource monitoring and usage tracking
 */

export interface UsageMetrics {
  /** Current function invocations count */
  functionInvocations: number;
  /** Current compute hours consumed */
  computeHours: number;
  /** Percentage of monthly limit used */
  percentageOfLimit: number;
  /** Projected monthly usage based on current consumption */
  projectedMonthly: number;
  /** Timestamp of the measurement */
  timestamp: Date;
  /** Memory usage in MB */
  memoryUsage?: number;
  /** Number of errors in the current period */
  errorCount?: number;
}

export interface UsagePrediction {
  /** Predicted invocations for the month */
  predictedInvocations: number;
  /** Predicted compute hours for the month */
  predictedComputeHours: number;
  /** Confidence level of the prediction (0-1) */
  confidence: number;
  /** Days remaining in the current billing period */
  daysRemaining: number;
  /** Recommended actions based on prediction */
  recommendations: UsageRecommendation[];
  /** Risk level: 'low', 'medium', 'high', 'critical' */
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface UsageRecommendation {
  /** Type of recommendation */
  type: 'optimize' | 'upgrade' | 'alert' | 'fallback';
  /** Human-readable message */
  message: string;
  /** Priority level */
  priority: 'low' | 'medium' | 'high' | 'critical';
  /** Specific action to take */
  action?: string;
}

export interface LimitStatus {
  /** Current usage as percentage of limit */
  currentUsage: number;
  /** Limit threshold (e.g., 70, 80, 90) */
  threshold: number;
  /** Whether the threshold has been exceeded */
  exceeded: boolean;
  /** Time until limit reset */
  resetTime: Date;
  /** Limit type */
  limitType: 'invocations' | 'compute_hours' | 'memory';
}

export interface VercelPlan {
  /** Plan name */
  name: 'hobby' | 'pro' | 'enterprise';
  /** Monthly invocation limit */
  invocationLimit: number;
  /** Monthly compute hours limit (GB-hours) */
  computeHoursLimit: number;
  /** Maximum cron jobs allowed */
  cronJobsLimit: number;
  /** Memory limit per function (MB) */
  memoryLimit: number;
}

export interface AlertThreshold {
  /** Threshold percentage (70, 80, 90) */
  percentage: number;
  /** Whether alerts are enabled for this threshold */
  enabled: boolean;
  /** Last time alert was sent */
  lastAlertSent?: Date;
  /** Cooldown period in minutes */
  cooldownMinutes: number;
}

export interface VercelUsageResponse {
  /** Usage data from Vercel API */
  usage: {
    invocations: number;
    computeHours: number;
    bandwidth: number;
  };
  /** Billing period information */
  period: {
    start: string;
    end: string;
  };
  /** Plan information */
  plan: {
    name: string;
    limits: {
      invocations: number;
      computeHours: number;
    };
  };
}

export interface MonitoringConfig {
  /** Vercel API token */
  apiToken: string;
  /** Team ID (if applicable) */
  teamId?: string;
  /** Project ID */
  projectId: string;
  /** Alert thresholds */
  alertThresholds: AlertThreshold[];
  /** Current plan configuration */
  plan: VercelPlan;
  /** Monitoring interval in minutes */
  monitoringInterval: number;
}

// Degradation Management Types

export enum ServiceLevel {
  FULL = 'full',           // Toutes fonctionnalités
  ESSENTIAL = 'essential', // Audit de base seulement
  MINIMAL = 'minimal',     // Alertes critiques seulement
  FALLBACK = 'fallback'    // GitHub Actions seulement
}

export interface SystemLoad {
  /** CPU usage percentage */
  cpuUsage: number;
  /** Memory usage percentage */
  memoryUsage: number;
  /** Vercel usage percentage of limits */
  vercelUsage: number;
  /** Error rate percentage over last 5 minutes */
  errorRate: number;
  /** Average response time in milliseconds */
  responseTime: number;
  /** Number of active connections */
  activeConnections: number;
}

export interface DegradationThresholds {
  /** CPU usage threshold */
  cpuUsage: number;
  /** Memory usage threshold */
  memoryUsage: number;
  /** Vercel usage threshold */
  vercelUsage: number;
  /** Error rate threshold */
  errorRate: number;
  /** Response time threshold */
  responseTime: number;
}

export interface DegradationConfig {
  /** Thresholds for each service level */
  thresholds: {
    [key in ServiceLevel]: DegradationThresholds;
  };
  /** Check interval in milliseconds */
  checkInterval: number;
  /** Stability period before level change in milliseconds */
  stabilityPeriod: number;
  /** Notification cooldown in milliseconds */
  notificationCooldown: number;
}

export interface DegradationStatus {
  /** Current service level */
  currentLevel: ServiceLevel;
  /** Previous service level */
  previousLevel: ServiceLevel;
  /** When the level changed */
  changedAt: Date;
  /** Reason for the change */
  reason: string;
  /** Current system load metrics */
  systemLoad: SystemLoad;
  /** Next scheduled check */
  nextCheck: Date;
  /** Time remaining before next level change is possible */
  stabilityCountdown: number;
}

export interface CircuitBreakerState {
  /** Circuit breaker name */
  name: string;
  /** Current state */
  state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  /** Number of consecutive failures */
  failureCount: number;
  /** Last failure timestamp */
  lastFailureTime: Date | null;
  /** Last success timestamp */
  lastSuccessTime: Date | null;
  /** Next retry time when in OPEN state */
  nextRetryTime: Date | null;
  /** Failure threshold before opening */
  threshold: number;
  /** Timeout before retry in milliseconds */
  timeout: number;
}

export interface CircuitBreakerOptions {
  /** Operation timeout in milliseconds */
  timeout?: number;
  /** Failure threshold */
  threshold?: number;
  /** Reset timeout in milliseconds */
  resetTimeout?: number;
}