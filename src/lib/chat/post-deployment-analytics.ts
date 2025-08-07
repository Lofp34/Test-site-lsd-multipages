/**
 * Post-deployment Analytics and Monitoring System
 * Tracks adoption metrics, performance, and user feedback for chat enhancements
 */

export interface ChatEnhancementMetrics {
  // Adoption Metrics
  markdownRenderingUsage: {
    totalMessages: number;
    markdownMessages: number;
    adoptionRate: number;
    averageComplexity: number;
  };
  
  scrollControlUsage: {
    totalSessions: number;
    manualScrollEvents: number;
    autoScrollDisabled: number;
    userScrollBackFrequency: number;
  };
  
  chatControlsUsage: {
    closeButtonClicks: number;
    keyboardShortcutUsage: number;
    minimizeActions: number;
    fullscreenUsage: number;
  };
  
  // Performance Metrics
  performance: {
    markdownRenderTime: number;
    scrollResponseTime: number;
    memoryUsage: number;
    errorRate: number;
    crashRate: number;
  };
  
  // User Experience Metrics
  userExperience: {
    sessionDuration: number;
    messagesPerSession: number;
    userSatisfactionScore: number;
    featureDiscoveryRate: number;
  };
  
  // Technical Metrics
  technical: {
    browserCompatibility: Record<string, number>;
    mobileUsage: number;
    accessibilityToolUsage: number;
    errorTypes: Record<string, number>;
  };
}

export interface UserFeedback {
  id: string;
  timestamp: Date;
  userId?: string;
  sessionId: string;
  feedbackType: 'bug' | 'feature_request' | 'improvement' | 'praise' | 'complaint';
  category: 'markdown' | 'scroll' | 'controls' | 'performance' | 'accessibility' | 'general';
  rating: number; // 1-5 scale
  message: string;
  context: {
    userAgent: string;
    viewport: { width: number; height: number };
    feature: string;
    action: string;
  };
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'reviewed' | 'in_progress' | 'resolved' | 'closed';
}

export interface PerformanceAlert {
  id: string;
  timestamp: Date;
  type: 'performance_degradation' | 'error_spike' | 'adoption_drop' | 'user_complaint';
  severity: 'info' | 'warning' | 'error' | 'critical';
  metric: string;
  currentValue: number;
  threshold: number;
  description: string;
  affectedUsers: number;
  suggestedActions: string[];
}

export class PostDeploymentAnalytics {
  private metrics: ChatEnhancementMetrics;
  private feedbackQueue: UserFeedback[] = [];
  private alerts: PerformanceAlert[] = [];
  private isMonitoring = false;

  constructor() {
    this.metrics = this.initializeMetrics();
    this.startMonitoring();
  }

  private initializeMetrics(): ChatEnhancementMetrics {
    return {
      markdownRenderingUsage: {
        totalMessages: 0,
        markdownMessages: 0,
        adoptionRate: 0,
        averageComplexity: 0
      },
      scrollControlUsage: {
        totalSessions: 0,
        manualScrollEvents: 0,
        autoScrollDisabled: 0,
        userScrollBackFrequency: 0
      },
      chatControlsUsage: {
        closeButtonClicks: 0,
        keyboardShortcutUsage: 0,
        minimizeActions: 0,
        fullscreenUsage: 0
      },
      performance: {
        markdownRenderTime: 0,
        scrollResponseTime: 0,
        memoryUsage: 0,
        errorRate: 0,
        crashRate: 0
      },
      userExperience: {
        sessionDuration: 0,
        messagesPerSession: 0,
        userSatisfactionScore: 0,
        featureDiscoveryRate: 0
      },
      technical: {
        browserCompatibility: {},
        mobileUsage: 0,
        accessibilityToolUsage: 0,
        errorTypes: {}
      }
    };
  }

  // Adoption Metrics Tracking
  trackMarkdownUsage(messageContent: string, renderTime: number): void {
    this.metrics.markdownRenderingUsage.totalMessages++;
    
    const hasMarkdown = this.detectMarkdownContent(messageContent);
    if (hasMarkdown) {
      this.metrics.markdownRenderingUsage.markdownMessages++;
      this.metrics.markdownRenderingUsage.averageComplexity = 
        this.calculateMarkdownComplexity(messageContent);
    }
    
    this.metrics.markdownRenderingUsage.adoptionRate = 
      (this.metrics.markdownRenderingUsage.markdownMessages / 
       this.metrics.markdownRenderingUsage.totalMessages) * 100;
    
    this.metrics.performance.markdownRenderTime = 
      this.updateAverageMetric(this.metrics.performance.markdownRenderTime, renderTime);
  }

  trackScrollBehavior(event: {
    type: 'manual_scroll' | 'auto_scroll_disabled' | 'scroll_back';
    responseTime?: number;
  }): void {
    this.metrics.scrollControlUsage.totalSessions++;
    
    switch (event.type) {
      case 'manual_scroll':
        this.metrics.scrollControlUsage.manualScrollEvents++;
        break;
      case 'auto_scroll_disabled':
        this.metrics.scrollControlUsage.autoScrollDisabled++;
        break;
      case 'scroll_back':
        this.metrics.scrollControlUsage.userScrollBackFrequency++;
        break;
    }
    
    if (event.responseTime) {
      this.metrics.performance.scrollResponseTime = 
        this.updateAverageMetric(this.metrics.performance.scrollResponseTime, event.responseTime);
    }
  }

  trackControlsUsage(action: 'close' | 'keyboard_shortcut' | 'minimize' | 'fullscreen'): void {
    switch (action) {
      case 'close':
        this.metrics.chatControlsUsage.closeButtonClicks++;
        break;
      case 'keyboard_shortcut':
        this.metrics.chatControlsUsage.keyboardShortcutUsage++;
        break;
      case 'minimize':
        this.metrics.chatControlsUsage.minimizeActions++;
        break;
      case 'fullscreen':
        this.metrics.chatControlsUsage.fullscreenUsage++;
        break;
    }
  }

  // Performance Monitoring
  trackPerformanceMetric(metric: keyof ChatEnhancementMetrics['performance'], value: number): void {
    this.metrics.performance[metric] = this.updateAverageMetric(
      this.metrics.performance[metric], 
      value
    );
    
    this.checkPerformanceThresholds(metric, value);
  }

  trackError(error: Error, context: { feature: string; action: string }): void {
    this.metrics.performance.errorRate++;
    
    const errorType = `${context.feature}_${error.name}`;
    this.metrics.technical.errorTypes[errorType] = 
      (this.metrics.technical.errorTypes[errorType] || 0) + 1;
    
    // Create alert for error spikes
    if (this.metrics.technical.errorTypes[errorType] > 10) {
      this.createAlert({
        type: 'error_spike',
        severity: 'error',
        metric: errorType,
        currentValue: this.metrics.technical.errorTypes[errorType],
        threshold: 10,
        description: `Error spike detected in ${context.feature}`,
        affectedUsers: this.estimateAffectedUsers(errorType),
        suggestedActions: [
          'Review error logs for root cause',
          'Check recent deployments',
          'Monitor user reports'
        ]
      });
    }
  }

  // User Feedback Collection
  collectFeedback(feedback: Omit<UserFeedback, 'id' | 'timestamp' | 'priority' | 'status'>): void {
    const newFeedback: UserFeedback = {
      ...feedback,
      id: this.generateId(),
      timestamp: new Date(),
      priority: this.calculateFeedbackPriority(feedback),
      status: 'new'
    };
    
    this.feedbackQueue.push(newFeedback);
    this.processFeedback(newFeedback);
  }

  // Analytics and Insights
  generateAdoptionReport(): {
    summary: string;
    recommendations: string[];
    metrics: ChatEnhancementMetrics;
  } {
    const markdownAdoption = this.metrics.markdownRenderingUsage.adoptionRate;
    const scrollEngagement = this.calculateScrollEngagement();
    const controlsUsage = this.calculateControlsUsage();
    
    return {
      summary: `Markdown adoption: ${markdownAdoption.toFixed(1)}%, Scroll engagement: ${scrollEngagement.toFixed(1)}%, Controls usage: ${controlsUsage.toFixed(1)}%`,
      recommendations: this.generateRecommendations(),
      metrics: this.metrics
    };
  }

  identifyImprovementOpportunities(): Array<{
    area: string;
    priority: 'high' | 'medium' | 'low';
    description: string;
    expectedImpact: string;
    effort: 'low' | 'medium' | 'high';
  }> {
    const opportunities = [];
    
    // Analyze markdown adoption
    if (this.metrics.markdownRenderingUsage.adoptionRate < 30) {
      opportunities.push({
        area: 'Markdown Rendering',
        priority: 'high' as const,
        description: 'Low markdown adoption rate suggests users may not be aware of formatting capabilities',
        expectedImpact: 'Increase user engagement and content quality',
        effort: 'low' as const
      });
    }
    
    // Analyze scroll behavior
    const scrollBackRate = this.metrics.scrollControlUsage.userScrollBackFrequency / 
                          this.metrics.scrollControlUsage.totalSessions;
    if (scrollBackRate > 0.5) {
      opportunities.push({
        area: 'Scroll Control',
        priority: 'medium' as const,
        description: 'High scroll-back frequency indicates users want to review previous content',
        expectedImpact: 'Improve reading experience and content retention',
        effort: 'medium' as const
      });
    }
    
    // Analyze performance issues
    if (this.metrics.performance.markdownRenderTime > 100) {
      opportunities.push({
        area: 'Performance',
        priority: 'high' as const,
        description: 'Markdown rendering time exceeds optimal threshold',
        expectedImpact: 'Reduce user frustration and improve perceived performance',
        effort: 'medium' as const
      });
    }
    
    return opportunities;
  }

  planNextIteration(): {
    features: Array<{
      name: string;
      description: string;
      priority: number;
      estimatedEffort: string;
      userValue: string;
    }>;
    timeline: string;
    resources: string[];
  } {
    const opportunities = this.identifyImprovementOpportunities();
    const userFeedback = this.analyzeFeedbackTrends();
    
    const features = [
      {
        name: 'Enhanced Markdown Tutorial',
        description: 'Interactive guide to help users discover markdown capabilities',
        priority: this.calculateFeaturePriority('markdown_tutorial'),
        estimatedEffort: '1-2 weeks',
        userValue: 'Increased feature adoption and content quality'
      },
      {
        name: 'Smart Scroll Suggestions',
        description: 'AI-powered suggestions for when to scroll back to relevant content',
        priority: this.calculateFeaturePriority('smart_scroll'),
        estimatedEffort: '2-3 weeks',
        userValue: 'Better content navigation and comprehension'
      },
      {
        name: 'Performance Optimization',
        description: 'Optimize markdown rendering and scroll performance',
        priority: this.calculateFeaturePriority('performance'),
        estimatedEffort: '1 week',
        userValue: 'Faster, smoother user experience'
      }
    ].sort((a, b) => b.priority - a.priority);
    
    return {
      features,
      timeline: this.generateIterationTimeline(features),
      resources: ['Frontend Developer', 'UX Designer', 'QA Engineer']
    };
  }

  // Private helper methods
  private detectMarkdownContent(content: string): boolean {
    const markdownPatterns = [
      /\*\*.*\*\*/,  // Bold
      /\*.*\*/,      // Italic
      /```[\s\S]*```/, // Code blocks
      /`.*`/,        // Inline code
      /^#{1,6}\s/m,  // Headers
      /^\* /m,       // Lists
      /^\d+\. /m     // Numbered lists
    ];
    
    return markdownPatterns.some(pattern => pattern.test(content));
  }

  private calculateMarkdownComplexity(content: string): number {
    let complexity = 0;
    
    // Count different markdown elements
    complexity += (content.match(/\*\*.*\*\*/g) || []).length; // Bold
    complexity += (content.match(/```[\s\S]*?```/g) || []).length * 3; // Code blocks
    complexity += (content.match(/^#{1,6}\s/gm) || []).length * 2; // Headers
    complexity += (content.match(/^\* /gm) || []).length; // Lists
    
    return complexity;
  }

  private updateAverageMetric(currentAverage: number, newValue: number): number {
    // For the first value, return the new value directly
    if (currentAverage === 0) {
      return newValue;
    }
    // Simple moving average - in production, you might want a more sophisticated approach
    return (currentAverage + newValue) / 2;
  }

  private checkPerformanceThresholds(metric: string, value: number): void {
    const thresholds = {
      markdownRenderTime: 100,
      scrollResponseTime: 16,
      memoryUsage: 50,
      errorRate: 5
    };
    
    const threshold = thresholds[metric as keyof typeof thresholds];
    if (threshold && value > threshold) {
      this.createAlert({
        type: 'performance_degradation',
        severity: value > threshold * 2 ? 'critical' : 'warning',
        metric,
        currentValue: value,
        threshold,
        description: `${metric} exceeded threshold`,
        affectedUsers: this.estimateAffectedUsers(metric),
        suggestedActions: this.getPerformanceActions(metric)
      });
    }
  }

  private createAlert(alert: Omit<PerformanceAlert, 'id' | 'timestamp'>): void {
    const newAlert: PerformanceAlert = {
      ...alert,
      id: this.generateId(),
      timestamp: new Date()
    };
    
    this.alerts.push(newAlert);
    
    // In production, you would send this to your monitoring system
    console.warn('Performance Alert:', newAlert);
  }

  private calculateFeedbackPriority(feedback: Partial<UserFeedback>): 'low' | 'medium' | 'high' | 'critical' {
    if (feedback.feedbackType === 'bug' && feedback.rating && feedback.rating <= 2) {
      return 'critical';
    }
    if (feedback.feedbackType === 'complaint' || (feedback.rating && feedback.rating <= 3)) {
      return 'high';
    }
    if (feedback.feedbackType === 'feature_request') {
      return 'medium';
    }
    return 'low';
  }

  private processFeedback(feedback: UserFeedback): void {
    // Auto-categorize and prioritize feedback
    if (feedback.priority === 'critical') {
      this.createAlert({
        type: 'user_complaint',
        severity: 'critical',
        metric: 'user_satisfaction',
        currentValue: feedback.rating,
        threshold: 3,
        description: `Critical user feedback: ${feedback.message}`,
        affectedUsers: 1,
        suggestedActions: ['Immediate investigation required', 'Contact user for more details']
      });
    }
  }

  private calculateScrollEngagement(): number {
    const total = this.metrics.scrollControlUsage.totalSessions;
    const engaged = this.metrics.scrollControlUsage.manualScrollEvents + 
                   this.metrics.scrollControlUsage.userScrollBackFrequency;
    return total > 0 ? (engaged / total) * 100 : 0;
  }

  private calculateControlsUsage(): number {
    const totalActions = Object.values(this.metrics.chatControlsUsage).reduce((a, b) => a + b, 0);
    const totalSessions = this.metrics.scrollControlUsage.totalSessions;
    return totalSessions > 0 ? (totalActions / totalSessions) * 100 : 0;
  }

  private generateRecommendations(): string[] {
    const recommendations = [];
    
    if (this.metrics.markdownRenderingUsage.adoptionRate < 50) {
      recommendations.push('Add markdown formatting hints or tutorial');
    }
    
    if (this.metrics.performance.markdownRenderTime > 50) {
      recommendations.push('Optimize markdown rendering performance');
    }
    
    if (this.metrics.chatControlsUsage.keyboardShortcutUsage < 10) {
      recommendations.push('Promote keyboard shortcuts to power users');
    }
    
    return recommendations;
  }

  private analyzeFeedbackTrends(): any {
    // Analyze feedback patterns and trends
    const categoryTrends = this.feedbackQueue.reduce((acc, feedback) => {
      acc[feedback.category] = (acc[feedback.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return { categoryTrends };
  }

  private calculateFeaturePriority(feature: string): number {
    // Calculate priority based on user feedback, metrics, and business value
    const baseScore = 50;
    let score = baseScore;
    
    // Adjust based on user feedback
    const relevantFeedback = this.feedbackQueue.filter(f => 
      f.message.toLowerCase().includes(feature.replace('_', ' '))
    );
    score += relevantFeedback.length * 10;
    
    // Adjust based on current metrics
    if (feature === 'performance' && this.metrics.performance.markdownRenderTime > 100) {
      score += 30;
    }
    
    return Math.min(score, 100);
  }

  private generateIterationTimeline(features: any[]): string {
    const totalWeeks = features.reduce((total, feature) => {
      const weeks = parseInt(feature.estimatedEffort.split('-')[0]);
      return total + weeks;
    }, 0);
    
    return `${totalWeeks}-${totalWeeks + 2} weeks`;
  }

  private estimateAffectedUsers(metric: string): number {
    // Estimate based on error frequency and user base
    return Math.min(this.metrics.technical.errorTypes[metric] || 1, 100);
  }

  private getPerformanceActions(metric: string): string[] {
    const actions = {
      markdownRenderTime: [
        'Implement lazy loading for complex markdown',
        'Optimize markdown parser',
        'Add performance monitoring'
      ],
      scrollResponseTime: [
        'Throttle scroll events',
        'Optimize scroll calculations',
        'Use requestAnimationFrame'
      ],
      memoryUsage: [
        'Implement memory cleanup',
        'Optimize component lifecycle',
        'Add memory monitoring'
      ]
    };
    
    return actions[metric as keyof typeof actions] || ['Investigate performance issue'];
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private startMonitoring(): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    
    // Set up periodic monitoring
    setInterval(() => {
      this.performHealthCheck();
    }, 60000); // Every minute
  }

  private performHealthCheck(): void {
    // Check system health and generate alerts if needed
    const errorRate = this.metrics.performance.errorRate;
    const memoryUsage = this.metrics.performance.memoryUsage;
    
    if (errorRate > 10) {
      this.createAlert({
        type: 'error_spike',
        severity: 'warning',
        metric: 'error_rate',
        currentValue: errorRate,
        threshold: 10,
        description: 'Error rate is elevated',
        affectedUsers: this.estimateAffectedUsers('error_rate'),
        suggestedActions: ['Review recent changes', 'Check error logs']
      });
    }
  }

  // Public API methods
  getMetrics(): ChatEnhancementMetrics {
    return { ...this.metrics };
  }

  getFeedback(): UserFeedback[] {
    return [...this.feedbackQueue];
  }

  getAlerts(): PerformanceAlert[] {
    return [...this.alerts];
  }

  exportAnalyticsData(): string {
    return JSON.stringify({
      metrics: this.metrics,
      feedback: this.feedbackQueue,
      alerts: this.alerts,
      timestamp: new Date().toISOString()
    }, null, 2);
  }
}

// Singleton instance
export const postDeploymentAnalytics = new PostDeploymentAnalytics();