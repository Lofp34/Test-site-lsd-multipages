import { useCallback, useEffect, useRef } from 'react';
import { UserFeedback } from '@/lib/chat/post-deployment-analytics';

interface TrackingOptions {
  enableAutoTracking?: boolean;
  trackingEndpoint?: string;
  batchSize?: number;
  flushInterval?: number;
}

interface TrackingEvent {
  type: 'markdown' | 'scroll' | 'controls' | 'performance' | 'error' | 'feedback';
  data: any;
  timestamp: number;
}

export function usePostDeploymentTracking(options: TrackingOptions = {}) {
  const {
    enableAutoTracking = true,
    trackingEndpoint = '/api/admin/post-deployment-analytics',
    batchSize = 10,
    flushInterval = 30000 // 30 seconds
  } = options;

  const eventQueue = useRef<TrackingEvent[]>([]);
  const flushTimer = useRef<NodeJS.Timeout | null>(null);

  // Flush events to server
  const flushEvents = useCallback(async () => {
    if (eventQueue.current.length === 0) return;

    const events = [...eventQueue.current];
    eventQueue.current = [];

    try {
      for (const event of events) {
        await fetch(trackingEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: `track_${event.type}`,
            data: event.data
          })
        });
      }
    } catch (error) {
      console.error('Failed to flush tracking events:', error);
      // Re-queue events on failure
      eventQueue.current.unshift(...events);
    }
  }, [trackingEndpoint]);

  // Add event to queue
  const queueEvent = useCallback((event: TrackingEvent) => {
    eventQueue.current.push(event);

    // Flush if batch size reached
    if (eventQueue.current.length >= batchSize) {
      flushEvents();
    }
  }, [batchSize, flushEvents]);

  // Set up periodic flushing
  useEffect(() => {
    if (flushTimer.current) {
      clearInterval(flushTimer.current);
    }

    flushTimer.current = setInterval(flushEvents, flushInterval);

    return () => {
      if (flushTimer.current) {
        clearInterval(flushTimer.current);
      }
      // Flush remaining events on unmount
      flushEvents();
    };
  }, [flushEvents, flushInterval]);

  // Tracking functions
  const trackMarkdownUsage = useCallback((content: string, renderTime: number) => {
    queueEvent({
      type: 'markdown',
      data: { content, renderTime },
      timestamp: Date.now()
    });
  }, [queueEvent]);

  const trackScrollBehavior = useCallback((event: {
    type: 'manual_scroll' | 'auto_scroll_disabled' | 'scroll_back';
    responseTime?: number;
  }) => {
    queueEvent({
      type: 'scroll',
      data: event,
      timestamp: Date.now()
    });
  }, [queueEvent]);

  const trackControlsUsage = useCallback((action: 'close' | 'keyboard_shortcut' | 'minimize' | 'fullscreen') => {
    queueEvent({
      type: 'controls',
      data: { action },
      timestamp: Date.now()
    });
  }, [queueEvent]);

  const trackPerformance = useCallback((metric: string, value: number) => {
    queueEvent({
      type: 'performance',
      data: { metric, value },
      timestamp: Date.now()
    });
  }, [queueEvent]);

  const trackError = useCallback((error: Error, context: { feature: string; action: string }) => {
    queueEvent({
      type: 'error',
      data: { 
        message: error.message,
        stack: error.stack,
        context 
      },
      timestamp: Date.now()
    });
  }, [queueEvent]);

  const submitFeedback = useCallback(async (feedback: Omit<UserFeedback, 'id' | 'timestamp' | 'priority' | 'status'>) => {
    try {
      await fetch(trackingEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'submit_feedback',
          data: feedback
        })
      });
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      throw error;
    }
  }, [trackingEndpoint]);

  // Auto-tracking setup
  useEffect(() => {
    if (!enableAutoTracking) return;

    // Track performance metrics
    const performanceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.includes('chat') || entry.name.includes('markdown')) {
          trackPerformance('render_time', entry.duration);
        }
      }
    });

    try {
      performanceObserver.observe({ entryTypes: ['measure', 'navigation'] });
    } catch (error) {
      console.warn('Performance observer not supported:', error);
    }

    // Track memory usage
    const trackMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        trackPerformance('memory_usage', memory.usedJSHeapSize / 1024 / 1024); // MB
      }
    };

    const memoryInterval = setInterval(trackMemoryUsage, 60000); // Every minute

    // Track errors
    const errorHandler = (event: ErrorEvent) => {
      trackError(new Error(event.message), {
        feature: 'global',
        action: 'error'
      });
    };

    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      trackError(new Error(String(event.reason)), {
        feature: 'global',
        action: 'unhandled_rejection'
      });
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', unhandledRejectionHandler);

    return () => {
      performanceObserver.disconnect();
      clearInterval(memoryInterval);
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', unhandledRejectionHandler);
    };
  }, [enableAutoTracking, trackPerformance, trackError]);

  return {
    trackMarkdownUsage,
    trackScrollBehavior,
    trackControlsUsage,
    trackPerformance,
    trackError,
    submitFeedback,
    flushEvents
  };
}

// Hook for collecting user feedback
export function useFeedbackCollection() {
  const { submitFeedback } = usePostDeploymentTracking();

  const collectFeedback = useCallback(async (
    rating: number,
    message: string,
    category: 'markdown' | 'scroll' | 'controls' | 'performance' | 'accessibility' | 'general',
    feedbackType: 'bug' | 'feature_request' | 'improvement' | 'praise' | 'complaint' = 'improvement'
  ) => {
    const feedback = {
      feedbackType,
      category,
      rating,
      message,
      sessionId: generateSessionId(),
      context: {
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        feature: category,
        action: 'feedback_submission'
      }
    };

    await submitFeedback(feedback);
  }, [submitFeedback]);

  return { collectFeedback };
}

// Utility function to generate session ID
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Hook for A/B testing and feature flags
export function useFeatureAnalytics() {
  const { trackPerformance } = usePostDeploymentTracking();

  const trackFeatureUsage = useCallback((featureName: string, variant?: string) => {
    trackPerformance(`feature_usage_${featureName}${variant ? `_${variant}` : ''}`, 1);
  }, [trackPerformance]);

  const trackConversion = useCallback((goal: string, value?: number) => {
    trackPerformance(`conversion_${goal}`, value || 1);
  }, [trackPerformance]);

  return {
    trackFeatureUsage,
    trackConversion
  };
}