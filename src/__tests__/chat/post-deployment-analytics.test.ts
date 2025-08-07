import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PostDeploymentAnalytics, UserFeedback } from '@/lib/chat/post-deployment-analytics';

describe('PostDeploymentAnalytics', () => {
  let analytics: PostDeploymentAnalytics;

  beforeEach(() => {
    analytics = new PostDeploymentAnalytics();
  });

  describe('Markdown Usage Tracking', () => {
    it('should track markdown usage correctly', () => {
      const markdownContent = '# Hello\n**Bold text**\n```code```';
      const plainContent = 'Just plain text';

      analytics.trackMarkdownUsage(markdownContent, 50);
      analytics.trackMarkdownUsage(plainContent, 30);

      const metrics = analytics.getMetrics();
      
      expect(metrics.markdownRenderingUsage.totalMessages).toBe(2);
      expect(metrics.markdownRenderingUsage.markdownMessages).toBe(1);
      expect(metrics.markdownRenderingUsage.adoptionRate).toBe(50);
    });

    it('should calculate markdown complexity correctly', () => {
      const complexContent = '# Title\n**Bold**\n*Italic*\n```code```\n- List item';
      
      analytics.trackMarkdownUsage(complexContent, 100);
      
      const metrics = analytics.getMetrics();
      expect(metrics.markdownRenderingUsage.averageComplexity).toBeGreaterThan(0);
    });

    it('should update average render time', () => {
      analytics.trackMarkdownUsage('# Test', 100);
      analytics.trackMarkdownUsage('**Bold**', 50);
      
      const metrics = analytics.getMetrics();
      expect(metrics.performance.markdownRenderTime).toBe(75); // Average of 100 and 50
    });
  });

  describe('Scroll Behavior Tracking', () => {
    it('should track different scroll events', () => {
      analytics.trackScrollBehavior({ type: 'manual_scroll', responseTime: 16 });
      analytics.trackScrollBehavior({ type: 'auto_scroll_disabled' });
      analytics.trackScrollBehavior({ type: 'scroll_back' });

      const metrics = analytics.getMetrics();
      
      expect(metrics.scrollControlUsage.totalSessions).toBe(3);
      expect(metrics.scrollControlUsage.manualScrollEvents).toBe(1);
      expect(metrics.scrollControlUsage.autoScrollDisabled).toBe(1);
      expect(metrics.scrollControlUsage.userScrollBackFrequency).toBe(1);
    });

    it('should track scroll response time', () => {
      analytics.trackScrollBehavior({ type: 'manual_scroll', responseTime: 20 });
      
      const metrics = analytics.getMetrics();
      expect(metrics.performance.scrollResponseTime).toBe(20);
    });
  });

  describe('Controls Usage Tracking', () => {
    it('should track different control actions', () => {
      analytics.trackControlsUsage('close');
      analytics.trackControlsUsage('keyboard_shortcut');
      analytics.trackControlsUsage('minimize');
      analytics.trackControlsUsage('fullscreen');

      const metrics = analytics.getMetrics();
      
      expect(metrics.chatControlsUsage.closeButtonClicks).toBe(1);
      expect(metrics.chatControlsUsage.keyboardShortcutUsage).toBe(1);
      expect(metrics.chatControlsUsage.minimizeActions).toBe(1);
      expect(metrics.chatControlsUsage.fullscreenUsage).toBe(1);
    });
  });

  describe('Performance Monitoring', () => {
    it('should track performance metrics', () => {
      analytics.trackPerformanceMetric('markdownRenderTime', 150);
      analytics.trackPerformanceMetric('scrollResponseTime', 25);
      analytics.trackPerformanceMetric('memoryUsage', 60);

      const metrics = analytics.getMetrics();
      
      expect(metrics.performance.markdownRenderTime).toBe(150);
      expect(metrics.performance.scrollResponseTime).toBe(25);
      expect(metrics.performance.memoryUsage).toBe(60);
    });

    it('should create alerts for performance thresholds', () => {
      analytics.trackPerformanceMetric('markdownRenderTime', 200); // Above threshold of 100

      const alerts = analytics.getAlerts();
      expect(alerts.length).toBeGreaterThan(0);
      expect(alerts[0].type).toBe('performance_degradation');
      expect(alerts[0].metric).toBe('markdownRenderTime');
    });
  });

  describe('Error Tracking', () => {
    it('should track errors and create alerts for spikes', () => {
      const error = new Error('Test error');
      const context = { feature: 'markdown', action: 'render' };

      // Track multiple errors to trigger spike detection
      for (let i = 0; i < 12; i++) {
        analytics.trackError(error, context);
      }

      const metrics = analytics.getMetrics();
      const alerts = analytics.getAlerts();

      expect(metrics.performance.errorRate).toBe(12);
      expect(metrics.technical.errorTypes['markdown_Error']).toBe(12);
      expect(alerts.some(a => a.type === 'error_spike')).toBe(true);
    });
  });

  describe('Feedback Collection', () => {
    it('should collect and prioritize feedback', () => {
      const feedback: Omit<UserFeedback, 'id' | 'timestamp' | 'priority' | 'status'> = {
        userId: 'user123',
        sessionId: 'session456',
        feedbackType: 'bug',
        category: 'markdown',
        rating: 2,
        message: 'Markdown rendering is broken',
        context: {
          userAgent: 'test-agent',
          viewport: { width: 1920, height: 1080 },
          feature: 'markdown',
          action: 'render'
        }
      };

      analytics.collectFeedback(feedback);

      const collectedFeedback = analytics.getFeedback();
      expect(collectedFeedback.length).toBe(1);
      expect(collectedFeedback[0].priority).toBe('critical'); // Bug with rating 2
      expect(collectedFeedback[0].status).toBe('new');
    });

    it('should create alerts for critical feedback', () => {
      const criticalFeedback: Omit<UserFeedback, 'id' | 'timestamp' | 'priority' | 'status'> = {
        sessionId: 'session789',
        feedbackType: 'bug',
        category: 'performance',
        rating: 1,
        message: 'App crashes constantly',
        context: {
          userAgent: 'test-agent',
          viewport: { width: 1920, height: 1080 },
          feature: 'general',
          action: 'usage'
        }
      };

      analytics.collectFeedback(criticalFeedback);

      const alerts = analytics.getAlerts();
      expect(alerts.some(a => a.type === 'user_complaint')).toBe(true);
    });
  });

  describe('Analytics Reports', () => {
    beforeEach(() => {
      // Set up some test data
      analytics.trackMarkdownUsage('# Test', 50);
      analytics.trackMarkdownUsage('**Bold**', 75);
      analytics.trackScrollBehavior({ type: 'manual_scroll' });
      analytics.trackControlsUsage('close');
    });

    it('should generate adoption report', () => {
      const report = analytics.generateAdoptionReport();
      
      expect(report.summary).toContain('Markdown adoption');
      expect(report.summary).toContain('Scroll engagement');
      expect(report.summary).toContain('Controls usage');
      expect(report.recommendations).toBeInstanceOf(Array);
      expect(report.metrics).toBeDefined();
    });

    it('should identify improvement opportunities', () => {
      const opportunities = analytics.identifyImprovementOpportunities();
      
      expect(opportunities).toBeInstanceOf(Array);
      opportunities.forEach(opp => {
        expect(opp).toHaveProperty('area');
        expect(opp).toHaveProperty('priority');
        expect(opp).toHaveProperty('description');
        expect(opp).toHaveProperty('expectedImpact');
        expect(opp).toHaveProperty('effort');
      });
    });

    it('should plan next iteration', () => {
      const plan = analytics.planNextIteration();
      
      expect(plan).toHaveProperty('features');
      expect(plan).toHaveProperty('timeline');
      expect(plan).toHaveProperty('resources');
      expect(plan.features).toBeInstanceOf(Array);
      expect(plan.resources).toBeInstanceOf(Array);
    });
  });

  describe('Data Export', () => {
    it('should export analytics data as JSON', () => {
      analytics.trackMarkdownUsage('# Test', 50);
      analytics.collectFeedback({
        sessionId: 'test',
        feedbackType: 'improvement',
        category: 'general',
        rating: 4,
        message: 'Great feature!',
        context: {
          userAgent: 'test',
          viewport: { width: 1920, height: 1080 },
          feature: 'general',
          action: 'test'
        }
      });

      const exportData = analytics.exportAnalyticsData();
      const parsed = JSON.parse(exportData);
      
      expect(parsed).toHaveProperty('metrics');
      expect(parsed).toHaveProperty('feedback');
      expect(parsed).toHaveProperty('alerts');
      expect(parsed).toHaveProperty('timestamp');
    });
  });

  describe('Metrics Calculations', () => {
    it('should calculate scroll engagement correctly', () => {
      analytics.trackScrollBehavior({ type: 'manual_scroll' });
      analytics.trackScrollBehavior({ type: 'manual_scroll' });
      analytics.trackScrollBehavior({ type: 'scroll_back' });
      
      const report = analytics.generateAdoptionReport();
      expect(report.summary).toContain('Scroll engagement');
    });

    it('should calculate controls usage correctly', () => {
      analytics.trackControlsUsage('close');
      analytics.trackControlsUsage('keyboard_shortcut');
      analytics.trackScrollBehavior({ type: 'manual_scroll' }); // Create session
      
      const report = analytics.generateAdoptionReport();
      expect(report.summary).toContain('Controls usage');
    });
  });

  describe('Recommendations Generation', () => {
    it('should recommend markdown tutorial for low adoption', () => {
      // Create low adoption scenario
      analytics.trackMarkdownUsage('plain text', 50);
      analytics.trackMarkdownUsage('more plain text', 50);
      analytics.trackMarkdownUsage('still plain', 50);
      
      const report = analytics.generateAdoptionReport();
      expect(report.recommendations.some(r => 
        r.includes('markdown') || r.includes('formatting')
      )).toBe(true);
    });

    it('should recommend performance optimization for slow rendering', () => {
      analytics.trackPerformanceMetric('markdownRenderTime', 150);
      
      const report = analytics.generateAdoptionReport();
      expect(report.recommendations.some(r => 
        r.includes('performance') || r.includes('optimize')
      )).toBe(true);
    });

    it('should recommend keyboard shortcuts promotion for low usage', () => {
      // Create sessions without keyboard shortcut usage
      for (let i = 0; i < 15; i++) {
        analytics.trackScrollBehavior({ type: 'manual_scroll' });
      }
      
      const report = analytics.generateAdoptionReport();
      expect(report.recommendations.some(r => 
        r.includes('keyboard') || r.includes('shortcuts')
      )).toBe(true);
    });
  });
});