import { VercelPlan, AlertThreshold, MonitoringConfig } from './types';

/**
 * Vercel Hobby plan configuration
 */
export const VERCEL_HOBBY_PLAN: VercelPlan = {
  name: 'hobby',
  invocationLimit: 100000, // 100k invocations per month
  computeHoursLimit: 100, // 100 GB-hours per month
  cronJobsLimit: 2, // Maximum 2 cron jobs
  memoryLimit: 1024, // 1GB memory per function
};

/**
 * Default alert thresholds for monitoring
 */
export const DEFAULT_ALERT_THRESHOLDS: AlertThreshold[] = [
  {
    percentage: 70,
    enabled: true,
    cooldownMinutes: 60, // 1 hour cooldown
  },
  {
    percentage: 80,
    enabled: true,
    cooldownMinutes: 30, // 30 minutes cooldown
  },
  {
    percentage: 90,
    enabled: true,
    cooldownMinutes: 15, // 15 minutes cooldown
  },
];

/**
 * Safe usage targets (80% of limits to stay within safe zone)
 */
export const SAFE_USAGE_TARGETS = {
  invocations: VERCEL_HOBBY_PLAN.invocationLimit * 0.8, // 80k invocations
  computeHours: VERCEL_HOBBY_PLAN.computeHoursLimit * 0.8, // 80 GB-hours
} as const;

/**
 * Get monitoring configuration from environment variables
 */
export function getMonitoringConfig(): MonitoringConfig {
  const apiToken = process.env.VERCEL_API_TOKEN;
  const teamId = process.env.VERCEL_TEAM_ID;
  const projectId = process.env.VERCEL_PROJECT_ID;

  if (!apiToken) {
    throw new Error('VERCEL_API_TOKEN environment variable is required');
  }

  if (!projectId) {
    throw new Error('VERCEL_PROJECT_ID environment variable is required');
  }

  return {
    apiToken,
    teamId,
    projectId,
    alertThresholds: DEFAULT_ALERT_THRESHOLDS,
    plan: VERCEL_HOBBY_PLAN,
    monitoringInterval: 15, // Check every 15 minutes
  };
}

/**
 * Vercel API endpoints
 */
export const VERCEL_API_ENDPOINTS = {
  usage: (teamId?: string) => 
    teamId 
      ? `https://api.vercel.com/v1/teams/${teamId}/usage`
      : 'https://api.vercel.com/v1/usage',
  
  projects: (teamId?: string) =>
    teamId
      ? `https://api.vercel.com/v1/teams/${teamId}/projects`
      : 'https://api.vercel.com/v1/projects',
      
  deployments: (projectId: string, teamId?: string) =>
    teamId
      ? `https://api.vercel.com/v1/teams/${teamId}/projects/${projectId}/deployments`
      : `https://api.vercel.com/v1/projects/${projectId}/deployments`,
} as const;