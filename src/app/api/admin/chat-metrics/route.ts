import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

interface ChatMetrics {
  totalSessions: number;
  averageSessionDuration: number;
  markdownRenderTime: number;
  scrollResponseTime: number;
  errorRate: number;
  featureAdoptionRates: {
    markdown: number;
    scrollControl: number;
    chatControls: number;
    mobileOptimizations: number;
    accessibilityFeatures: number;
  };
  performanceMetrics: {
    memoryUsage: number;
    cpuUsage: number;
    networkLatency: number;
    renderingTime: number;
  };
  userEngagement: {
    messagesPerSession: number;
    sessionReturnRate: number;
    featureUsageFrequency: {
      closeButton: number;
      minimizeButton: number;
      fullscreenButton: number;
      keyboardShortcuts: number;
    };
  };
  errorMetrics: {
    markdownRenderErrors: number;
    scrollControlErrors: number;
    chatControlErrors: number;
    networkErrors: number;
  };
  lastUpdated: string;
}

const METRICS_FILE_PATH = join(process.cwd(), 'data', 'chat-metrics.json');

const DEFAULT_METRICS: ChatMetrics = {
  totalSessions: 0,
  averageSessionDuration: 0,
  markdownRenderTime: 0,
  scrollResponseTime: 0,
  errorRate: 0,
  featureAdoptionRates: {
    markdown: 0,
    scrollControl: 0,
    chatControls: 0,
    mobileOptimizations: 0,
    accessibilityFeatures: 0,
  },
  performanceMetrics: {
    memoryUsage: 0,
    cpuUsage: 0,
    networkLatency: 0,
    renderingTime: 0,
  },
  userEngagement: {
    messagesPerSession: 0,
    sessionReturnRate: 0,
    featureUsageFrequency: {
      closeButton: 0,
      minimizeButton: 0,
      fullscreenButton: 0,
      keyboardShortcuts: 0,
    },
  },
  errorMetrics: {
    markdownRenderErrors: 0,
    scrollControlErrors: 0,
    chatControlErrors: 0,
    networkErrors: 0,
  },
  lastUpdated: new Date().toISOString(),
};

function ensureMetricsFile(): ChatMetrics {
  try {
    if (!existsSync(METRICS_FILE_PATH)) {
      // Create data directory if it doesn't exist
      const dataDir = join(process.cwd(), 'data');
      if (!existsSync(dataDir)) {
        require('fs').mkdirSync(dataDir, { recursive: true });
      }
      
      // Generate some sample metrics for demonstration
      const sampleMetrics = generateSampleMetrics();
      writeFileSync(METRICS_FILE_PATH, JSON.stringify(sampleMetrics, null, 2));
      return sampleMetrics;
    }
    
    const metricsData = readFileSync(METRICS_FILE_PATH, 'utf-8');
    return JSON.parse(metricsData);
  } catch (error) {
    console.error('Error reading metrics file:', error);
    return DEFAULT_METRICS;
  }
}

function generateSampleMetrics(): ChatMetrics {
  // Generate realistic sample data for demonstration
  return {
    totalSessions: Math.floor(Math.random() * 1000) + 500,
    averageSessionDuration: Math.floor(Math.random() * 300) + 120, // 2-7 minutes
    markdownRenderTime: Math.floor(Math.random() * 50) + 10, // 10-60ms
    scrollResponseTime: Math.floor(Math.random() * 20) + 5, // 5-25ms
    errorRate: Math.random() * 0.05, // 0-5% error rate
    featureAdoptionRates: {
      markdown: Math.random() * 0.4 + 0.6, // 60-100%
      scrollControl: Math.random() * 0.3 + 0.7, // 70-100%
      chatControls: Math.random() * 0.2 + 0.8, // 80-100%
      mobileOptimizations: Math.random() * 0.5 + 0.3, // 30-80%
      accessibilityFeatures: Math.random() * 0.3 + 0.1, // 10-40%
    },
    performanceMetrics: {
      memoryUsage: Math.floor(Math.random() * 50) + 20, // 20-70MB
      cpuUsage: Math.floor(Math.random() * 30) + 5, // 5-35%
      networkLatency: Math.floor(Math.random() * 100) + 50, // 50-150ms
      renderingTime: Math.floor(Math.random() * 30) + 10, // 10-40ms
    },
    userEngagement: {
      messagesPerSession: Math.floor(Math.random() * 10) + 5, // 5-15 messages
      sessionReturnRate: Math.random() * 0.4 + 0.3, // 30-70%
      featureUsageFrequency: {
        closeButton: Math.random() * 0.8 + 0.2, // 20-100%
        minimizeButton: Math.random() * 0.4 + 0.1, // 10-50%
        fullscreenButton: Math.random() * 0.3 + 0.05, // 5-35%
        keyboardShortcuts: Math.random() * 0.2 + 0.05, // 5-25%
      },
    },
    errorMetrics: {
      markdownRenderErrors: Math.floor(Math.random() * 10),
      scrollControlErrors: Math.floor(Math.random() * 5),
      chatControlErrors: Math.floor(Math.random() * 3),
      networkErrors: Math.floor(Math.random() * 15),
    },
    lastUpdated: new Date().toISOString(),
  };
}

function saveMetrics(metrics: ChatMetrics): void {
  try {
    const updatedMetrics = {
      ...metrics,
      lastUpdated: new Date().toISOString(),
    };
    
    writeFileSync(METRICS_FILE_PATH, JSON.stringify(updatedMetrics, null, 2));
  } catch (error) {
    console.error('Error saving metrics file:', error);
    throw new Error('Failed to save metrics');
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '24h';
    const refresh = searchParams.get('refresh') === 'true';
    
    let metrics = ensureMetricsFile();
    
    // If refresh is requested or metrics are older than 1 hour, generate new sample data
    if (refresh || isMetricsStale(metrics)) {
      metrics = generateSampleMetrics();
      saveMetrics(metrics);
    }
    
    // Filter metrics based on time range if needed
    const filteredMetrics = filterMetricsByTimeRange(metrics, timeRange);
    
    return NextResponse.json(filteredMetrics, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error loading chat metrics:', error);
    return NextResponse.json(
      { error: 'Failed to load metrics' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;
    
    switch (action) {
      case 'record_session':
        await recordSessionMetrics(data);
        break;
      case 'record_error':
        await recordErrorMetrics(data);
        break;
      case 'record_feature_usage':
        await recordFeatureUsage(data);
        break;
      case 'record_performance':
        await recordPerformanceMetrics(data);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Metrics recorded successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error recording metrics:', error);
    return NextResponse.json(
      { error: 'Failed to record metrics' },
      { status: 500 }
    );
  }
}

function isMetricsStale(metrics: ChatMetrics): boolean {
  const lastUpdated = new Date(metrics.lastUpdated);
  const now = new Date();
  const hoursSinceUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
  
  return hoursSinceUpdate > 1; // Consider stale if older than 1 hour
}

function filterMetricsByTimeRange(metrics: ChatMetrics, timeRange: string): ChatMetrics {
  // In a real implementation, this would filter historical data
  // For now, we'll just return the current metrics
  return metrics;
}

async function recordSessionMetrics(data: any): Promise<void> {
  try {
    const metrics = ensureMetricsFile();
    
    // Update session metrics
    metrics.totalSessions += 1;
    
    if (data.duration) {
      // Calculate new average session duration
      const totalDuration = metrics.averageSessionDuration * (metrics.totalSessions - 1) + data.duration;
      metrics.averageSessionDuration = totalDuration / metrics.totalSessions;
    }
    
    if (data.messageCount) {
      // Update messages per session
      const totalMessages = metrics.userEngagement.messagesPerSession * (metrics.totalSessions - 1) + data.messageCount;
      metrics.userEngagement.messagesPerSession = totalMessages / metrics.totalSessions;
    }
    
    saveMetrics(metrics);
  } catch (error) {
    console.error('Error recording session metrics:', error);
  }
}

async function recordErrorMetrics(data: any): Promise<void> {
  try {
    const metrics = ensureMetricsFile();
    
    // Update error metrics based on error type
    switch (data.errorType) {
      case 'markdown':
        metrics.errorMetrics.markdownRenderErrors += 1;
        break;
      case 'scroll':
        metrics.errorMetrics.scrollControlErrors += 1;
        break;
      case 'controls':
        metrics.errorMetrics.chatControlErrors += 1;
        break;
      case 'network':
        metrics.errorMetrics.networkErrors += 1;
        break;
    }
    
    // Recalculate error rate
    const totalErrors = Object.values(metrics.errorMetrics).reduce((sum, count) => sum + count, 0);
    metrics.errorRate = totalErrors / metrics.totalSessions;
    
    saveMetrics(metrics);
  } catch (error) {
    console.error('Error recording error metrics:', error);
  }
}

async function recordFeatureUsage(data: any): Promise<void> {
  try {
    const metrics = ensureMetricsFile();
    
    // Update feature adoption rates
    if (data.feature && data.used) {
      const currentRate = metrics.featureAdoptionRates[data.feature as keyof typeof metrics.featureAdoptionRates];
      if (currentRate !== undefined) {
        // Simple moving average update
        metrics.featureAdoptionRates[data.feature as keyof typeof metrics.featureAdoptionRates] = 
          (currentRate * 0.9) + (data.used ? 0.1 : 0);
      }
    }
    
    // Update feature usage frequency
    if (data.action && metrics.userEngagement.featureUsageFrequency[data.action as keyof typeof metrics.userEngagement.featureUsageFrequency] !== undefined) {
      metrics.userEngagement.featureUsageFrequency[data.action as keyof typeof metrics.userEngagement.featureUsageFrequency] += 1;
    }
    
    saveMetrics(metrics);
  } catch (error) {
    console.error('Error recording feature usage:', error);
  }
}

async function recordPerformanceMetrics(data: any): Promise<void> {
  try {
    const metrics = ensureMetricsFile();
    
    // Update performance metrics
    if (data.markdownRenderTime) {
      metrics.markdownRenderTime = (metrics.markdownRenderTime + data.markdownRenderTime) / 2;
    }
    
    if (data.scrollResponseTime) {
      metrics.scrollResponseTime = (metrics.scrollResponseTime + data.scrollResponseTime) / 2;
    }
    
    if (data.memoryUsage) {
      metrics.performanceMetrics.memoryUsage = data.memoryUsage;
    }
    
    if (data.cpuUsage) {
      metrics.performanceMetrics.cpuUsage = data.cpuUsage;
    }
    
    if (data.networkLatency) {
      metrics.performanceMetrics.networkLatency = data.networkLatency;
    }
    
    if (data.renderingTime) {
      metrics.performanceMetrics.renderingTime = data.renderingTime;
    }
    
    saveMetrics(metrics);
  } catch (error) {
    console.error('Error recording performance metrics:', error);
  }
}

export async function DELETE() {
  try {
    // Reset metrics to default values
    saveMetrics(DEFAULT_METRICS);
    
    console.log('Chat metrics reset to defaults:', {
      timestamp: new Date().toISOString(),
    });
    
    return NextResponse.json({
      success: true,
      message: 'Metrics reset successfully',
      metrics: DEFAULT_METRICS,
    });
  } catch (error) {
    console.error('Error resetting chat metrics:', error);
    return NextResponse.json(
      { error: 'Failed to reset metrics' },
      { status: 500 }
    );
  }
}