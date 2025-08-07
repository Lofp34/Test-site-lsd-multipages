/**
 * Feature Flags Service for Chat Enhancements
 * 
 * This service manages feature flags for progressive deployment of chat enhancements.
 * It allows enabling/disabling features for specific users, user groups, or percentage rollouts.
 */

interface FeatureFlag {
  name: string;
  enabled: boolean;
  rolloutPercentage: number;
  userGroups: string[];
  specificUsers: string[];
  startDate?: string;
  endDate?: string;
  description: string;
  dependencies?: string[];
}

interface FeatureFlagConfig {
  flags: Record<string, FeatureFlag>;
  lastUpdated: string;
  version: string;
}

interface UserContext {
  userId?: string;
  userGroup?: string;
  sessionId: string;
  userAgent?: string;
  isAdmin?: boolean;
}

class FeatureFlagsService {
  private config: FeatureFlagConfig | null = null;
  private cache: Map<string, boolean> = new Map();
  private cacheExpiry: number = 5 * 60 * 1000; // 5 minutes
  private lastCacheUpdate: number = 0;

  constructor() {
    this.loadConfig();
  }

  /**
   * Load feature flags configuration from API or local storage
   */
  private async loadConfig(): Promise<void> {
    try {
      // Try to load from API first
      const response = await fetch('/api/admin/chat-config');
      if (response.ok) {
        const chatConfig = await response.json();
        this.config = this.mapChatConfigToFeatureFlags(chatConfig);
      } else {
        // Fallback to default configuration
        this.config = this.getDefaultConfig();
      }
      
      this.lastCacheUpdate = Date.now();
    } catch (error) {
      console.error('Failed to load feature flags config:', error);
      this.config = this.getDefaultConfig();
    }
  }

  /**
   * Map chat configuration to feature flags format
   */
  private mapChatConfigToFeatureFlags(chatConfig: any): FeatureFlagConfig {
    return {
      flags: {
        'markdown-rendering': {
          name: 'markdown-rendering',
          enabled: chatConfig.markdownEnabled || false,
          rolloutPercentage: chatConfig.markdownEnabled ? 100 : 0,
          userGroups: [],
          specificUsers: [],
          description: 'Enable Markdown rendering in chat responses',
          dependencies: [],
        },
        'scroll-control': {
          name: 'scroll-control',
          enabled: chatConfig.scrollControlEnabled || false,
          rolloutPercentage: chatConfig.scrollControlEnabled ? 100 : 0,
          userGroups: [],
          specificUsers: [],
          description: 'Enable intelligent scroll control during streaming',
          dependencies: [],
        },
        'chat-controls': {
          name: 'chat-controls',
          enabled: chatConfig.chatControlsEnabled || false,
          rolloutPercentage: chatConfig.chatControlsEnabled ? 100 : 0,
          userGroups: [],
          specificUsers: [],
          description: 'Enable chat control buttons (close, minimize, fullscreen)',
          dependencies: [],
        },
        'mobile-optimizations': {
          name: 'mobile-optimizations',
          enabled: chatConfig.mobileOptimizationsEnabled || false,
          rolloutPercentage: chatConfig.mobileOptimizationsEnabled ? 100 : 0,
          userGroups: [],
          specificUsers: [],
          description: 'Enable mobile-specific optimizations and touch handling',
          dependencies: [],
        },
        'accessibility-features': {
          name: 'accessibility-features',
          enabled: chatConfig.accessibilityFeaturesEnabled || false,
          rolloutPercentage: chatConfig.accessibilityFeaturesEnabled ? 100 : 0,
          userGroups: [],
          specificUsers: [],
          description: 'Enable accessibility features (ARIA, keyboard navigation)',
          dependencies: [],
        },
        'syntax-highlighting': {
          name: 'syntax-highlighting',
          enabled: chatConfig.markdownConfig?.enableSyntaxHighlighting || false,
          rolloutPercentage: chatConfig.markdownConfig?.enableSyntaxHighlighting ? 100 : 0,
          userGroups: [],
          specificUsers: [],
          description: 'Enable syntax highlighting in code blocks',
          dependencies: ['markdown-rendering'],
        },
        'table-support': {
          name: 'table-support',
          enabled: chatConfig.markdownConfig?.enableTables || false,
          rolloutPercentage: chatConfig.markdownConfig?.enableTables ? 100 : 0,
          userGroups: [],
          specificUsers: [],
          description: 'Enable table rendering in Markdown',
          dependencies: ['markdown-rendering'],
        },
        'keyboard-shortcuts': {
          name: 'keyboard-shortcuts',
          enabled: chatConfig.controlsConfig?.keyboardShortcutsEnabled || false,
          rolloutPercentage: chatConfig.controlsConfig?.keyboardShortcutsEnabled ? 100 : 0,
          userGroups: [],
          specificUsers: [],
          description: 'Enable keyboard shortcuts for chat controls',
          dependencies: ['chat-controls'],
        },
        'performance-optimizations': {
          name: 'performance-optimizations',
          enabled: chatConfig.performance?.enableMemoryOptimization || false,
          rolloutPercentage: chatConfig.performance?.enableMemoryOptimization ? 100 : 0,
          userGroups: [],
          specificUsers: [],
          description: 'Enable performance optimizations (lazy loading, memory management)',
          dependencies: [],
        },
        'battery-optimization': {
          name: 'battery-optimization',
          enabled: chatConfig.performance?.enableBatteryOptimization || false,
          rolloutPercentage: chatConfig.performance?.enableBatteryOptimization ? 100 : 0,
          userGroups: [],
          specificUsers: [],
          description: 'Enable battery optimization for mobile devices',
          dependencies: ['mobile-optimizations'],
        },
      },
      lastUpdated: new Date().toISOString(),
      version: '1.0.0',
    };
  }

  /**
   * Get default feature flags configuration
   */
  private getDefaultConfig(): FeatureFlagConfig {
    return {
      flags: {
        'markdown-rendering': {
          name: 'markdown-rendering',
          enabled: true,
          rolloutPercentage: 100,
          userGroups: [],
          specificUsers: [],
          description: 'Enable Markdown rendering in chat responses',
          dependencies: [],
        },
        'scroll-control': {
          name: 'scroll-control',
          enabled: true,
          rolloutPercentage: 100,
          userGroups: [],
          specificUsers: [],
          description: 'Enable intelligent scroll control during streaming',
          dependencies: [],
        },
        'chat-controls': {
          name: 'chat-controls',
          enabled: true,
          rolloutPercentage: 100,
          userGroups: [],
          specificUsers: [],
          description: 'Enable chat control buttons (close, minimize, fullscreen)',
          dependencies: [],
        },
        'mobile-optimizations': {
          name: 'mobile-optimizations',
          enabled: true,
          rolloutPercentage: 80, // Gradual rollout for mobile
          userGroups: [],
          specificUsers: [],
          description: 'Enable mobile-specific optimizations and touch handling',
          dependencies: [],
        },
        'accessibility-features': {
          name: 'accessibility-features',
          enabled: true,
          rolloutPercentage: 100,
          userGroups: [],
          specificUsers: [],
          description: 'Enable accessibility features (ARIA, keyboard navigation)',
          dependencies: [],
        },
        'syntax-highlighting': {
          name: 'syntax-highlighting',
          enabled: true,
          rolloutPercentage: 90, // Gradual rollout due to performance impact
          userGroups: [],
          specificUsers: [],
          description: 'Enable syntax highlighting in code blocks',
          dependencies: ['markdown-rendering'],
        },
        'table-support': {
          name: 'table-support',
          enabled: true,
          rolloutPercentage: 100,
          userGroups: [],
          specificUsers: [],
          description: 'Enable table rendering in Markdown',
          dependencies: ['markdown-rendering'],
        },
        'keyboard-shortcuts': {
          name: 'keyboard-shortcuts',
          enabled: true,
          rolloutPercentage: 100,
          userGroups: [],
          specificUsers: [],
          description: 'Enable keyboard shortcuts for chat controls',
          dependencies: ['chat-controls'],
        },
        'performance-optimizations': {
          name: 'performance-optimizations',
          enabled: true,
          rolloutPercentage: 100,
          userGroups: [],
          specificUsers: [],
          description: 'Enable performance optimizations (lazy loading, memory management)',
          dependencies: [],
        },
        'battery-optimization': {
          name: 'battery-optimization',
          enabled: false,
          rolloutPercentage: 20, // Limited rollout for testing
          userGroups: ['beta-testers'],
          specificUsers: [],
          description: 'Enable battery optimization for mobile devices',
          dependencies: ['mobile-optimizations'],
        },
      },
      lastUpdated: new Date().toISOString(),
      version: '1.0.0',
    };
  }

  /**
   * Check if a feature is enabled for a specific user context
   */
  public async isFeatureEnabled(featureName: string, userContext: UserContext): Promise<boolean> {
    // Check cache first
    const cacheKey = `${featureName}-${userContext.sessionId}`;
    const now = Date.now();
    
    if (this.cache.has(cacheKey) && (now - this.lastCacheUpdate) < this.cacheExpiry) {
      return this.cache.get(cacheKey) || false;
    }

    // Refresh config if needed
    if (!this.config || (now - this.lastCacheUpdate) > this.cacheExpiry) {
      await this.loadConfig();
    }

    if (!this.config) {
      return false;
    }

    const flag = this.config.flags[featureName];
    if (!flag) {
      return false;
    }

    // Check if feature is globally disabled
    if (!flag.enabled) {
      this.cache.set(cacheKey, false);
      return false;
    }

    // Check date constraints
    if (flag.startDate && new Date() < new Date(flag.startDate)) {
      this.cache.set(cacheKey, false);
      return false;
    }

    if (flag.endDate && new Date() > new Date(flag.endDate)) {
      this.cache.set(cacheKey, false);
      return false;
    }

    // Check dependencies
    if (flag.dependencies && flag.dependencies.length > 0) {
      for (const dependency of flag.dependencies) {
        const dependencyEnabled = await this.isFeatureEnabled(dependency, userContext);
        if (!dependencyEnabled) {
          this.cache.set(cacheKey, false);
          return false;
        }
      }
    }

    // Check specific users
    if (userContext.userId && flag.specificUsers.includes(userContext.userId)) {
      this.cache.set(cacheKey, true);
      return true;
    }

    // Check user groups
    if (userContext.userGroup && flag.userGroups.includes(userContext.userGroup)) {
      this.cache.set(cacheKey, true);
      return true;
    }

    // Check admin override
    if (userContext.isAdmin) {
      this.cache.set(cacheKey, true);
      return true;
    }

    // Check rollout percentage
    const enabled = this.isInRolloutPercentage(userContext.sessionId, flag.rolloutPercentage);
    this.cache.set(cacheKey, enabled);
    return enabled;
  }

  /**
   * Determine if a user is in the rollout percentage based on session ID
   */
  private isInRolloutPercentage(sessionId: string, percentage: number): boolean {
    if (percentage >= 100) return true;
    if (percentage <= 0) return false;

    // Use session ID to create a consistent hash
    let hash = 0;
    for (let i = 0; i < sessionId.length; i++) {
      const char = sessionId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    // Convert to positive number and get percentage
    const positiveHash = Math.abs(hash);
    const userPercentage = positiveHash % 100;

    return userPercentage < percentage;
  }

  /**
   * Get all feature flags for a user context
   */
  public async getAllFeatureFlags(userContext: UserContext): Promise<Record<string, boolean>> {
    if (!this.config) {
      await this.loadConfig();
    }

    if (!this.config) {
      return {};
    }

    const result: Record<string, boolean> = {};
    
    for (const flagName of Object.keys(this.config.flags)) {
      result[flagName] = await this.isFeatureEnabled(flagName, userContext);
    }

    return result;
  }

  /**
   * Get feature flag configuration (admin only)
   */
  public getFeatureFlagConfig(): FeatureFlagConfig | null {
    return this.config;
  }

  /**
   * Update feature flag configuration (admin only)
   */
  public async updateFeatureFlag(flagName: string, updates: Partial<FeatureFlag>): Promise<void> {
    if (!this.config) {
      await this.loadConfig();
    }

    if (!this.config || !this.config.flags[flagName]) {
      throw new Error(`Feature flag '${flagName}' not found`);
    }

    this.config.flags[flagName] = {
      ...this.config.flags[flagName],
      ...updates,
    };

    this.config.lastUpdated = new Date().toISOString();
    
    // Clear cache
    this.cache.clear();
    this.lastCacheUpdate = 0;

    // In a real implementation, this would save to a database or API
    console.log(`Feature flag '${flagName}' updated:`, updates);
  }

  /**
   * Clear cache (useful for testing or forced refresh)
   */
  public clearCache(): void {
    this.cache.clear();
    this.lastCacheUpdate = 0;
  }

  /**
   * Get cache statistics
   */
  public getCacheStats(): { size: number; lastUpdate: number; expiry: number } {
    return {
      size: this.cache.size,
      lastUpdate: this.lastCacheUpdate,
      expiry: this.cacheExpiry,
    };
  }
}

// Singleton instance
const featureFlagsService = new FeatureFlagsService();

export default featureFlagsService;

// Convenience functions for common use cases
export async function isMarkdownEnabled(userContext: UserContext): Promise<boolean> {
  return featureFlagsService.isFeatureEnabled('markdown-rendering', userContext);
}

export async function isScrollControlEnabled(userContext: UserContext): Promise<boolean> {
  return featureFlagsService.isFeatureEnabled('scroll-control', userContext);
}

export async function areChatControlsEnabled(userContext: UserContext): Promise<boolean> {
  return featureFlagsService.isFeatureEnabled('chat-controls', userContext);
}

export async function areMobileOptimizationsEnabled(userContext: UserContext): Promise<boolean> {
  return featureFlagsService.isFeatureEnabled('mobile-optimizations', userContext);
}

export async function areAccessibilityFeaturesEnabled(userContext: UserContext): Promise<boolean> {
  return featureFlagsService.isFeatureEnabled('accessibility-features', userContext);
}

export async function isSyntaxHighlightingEnabled(userContext: UserContext): Promise<boolean> {
  return featureFlagsService.isFeatureEnabled('syntax-highlighting', userContext);
}

export async function isTableSupportEnabled(userContext: UserContext): Promise<boolean> {
  return featureFlagsService.isFeatureEnabled('table-support', userContext);
}

export async function areKeyboardShortcutsEnabled(userContext: UserContext): Promise<boolean> {
  return featureFlagsService.isFeatureEnabled('keyboard-shortcuts', userContext);
}

export async function arePerformanceOptimizationsEnabled(userContext: UserContext): Promise<boolean> {
  return featureFlagsService.isFeatureEnabled('performance-optimizations', userContext);
}

export async function isBatteryOptimizationEnabled(userContext: UserContext): Promise<boolean> {
  return featureFlagsService.isFeatureEnabled('battery-optimization', userContext);
}

// Types export
export type { FeatureFlag, FeatureFlagConfig, UserContext };