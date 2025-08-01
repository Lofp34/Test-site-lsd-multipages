import { VercelUsageResponse, MonitoringConfig } from './types';
import { VERCEL_API_ENDPOINTS } from './config';

/**
 * Vercel API client for fetching usage and deployment data
 */
export class VercelApiClient {
  private config: MonitoringConfig;

  constructor(config: MonitoringConfig) {
    this.config = config;
  }

  /**
   * Fetch current usage from Vercel API
   */
  async fetchUsage(): Promise<VercelUsageResponse> {
    const url = VERCEL_API_ENDPOINTS.usage(this.config.teamId);
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Vercel API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      
      // Validate response structure
      if (!data.usage) {
        throw new Error('Invalid response format: missing usage data');
      }

      return data;
    } catch (error) {
      console.error('Failed to fetch Vercel usage:', error);
      throw error;
    }
  }

  /**
   * Fetch project information
   */
  async fetchProjectInfo() {
    const url = `${VERCEL_API_ENDPOINTS.projects(this.config.teamId)}/${this.config.projectId}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch project info: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Failed to fetch project info:', error);
      throw error;
    }
  }

  /**
   * Fetch recent deployments for monitoring
   */
  async fetchRecentDeployments(limit: number = 10) {
    const url = `${VERCEL_API_ENDPOINTS.deployments(this.config.projectId, this.config.teamId)}?limit=${limit}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch deployments: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Failed to fetch deployments:', error);
      throw error;
    }
  }

  /**
   * Test API connection and permissions
   */
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      await this.fetchProjectInfo();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Unknown error testing Vercel API connection'
      };
    }
  }
}