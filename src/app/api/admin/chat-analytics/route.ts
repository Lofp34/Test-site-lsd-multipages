import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

interface AnalyticsQuery {
  timeRange: '24h' | '7d' | '30d';
  features?: string[];
  metrics?: string[];
}

interface AnalyticsData {
  overview: {
    totalSessions: number;
    totalUsers: number;
    averageSessionDuration: number;
    totalInteractions: number;
    errorRate: number;
    performanceScore: number;
  };
  featureUsage: {
    name: string;
    usage: number;
    trend: number;
    color: string;
  }[];
  performanceMetrics: {
    timestamp: string;
    markdownRenderTime: number;
    scrollResponseTime: number;
    memoryUsage: number;
    errorCount: number;
  }[];
  userEngagement: {
    hour: string;
    sessions: number;
    interactions: number;
  }[];
  errorAnalysis: {
    type: string;
    count: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
  }[];
  deviceBreakdown: {
    device: string;
    count: number;
    percentage: number;
  }[];
  accessibilityUsage: {
    feature: string;
    usage: number;
    trend: number;
  }[];
  timeRange: string;
  generatedAt: string;
}

const ANALYTICS_CACHE_PATH = join(process.cwd(), 'data', 'chat-analytics-cache.json');
const METRICS_FILE_PATH = join(process.cwd(), 'data', 'chat-metrics.json');

function generateAnalyticsData(timeRange: string): AnalyticsData {
  // In a real implementation, this would query actual metrics data
  // For now, we'll generate realistic sample data
  
  const baseMultiplier = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : 30;
  
  return {
    overview: {
      totalSessions: Math.floor((Math.random() * 500 + 300) * baseMultiplier),
      totalUsers: Math.floor((Math.random() * 400 + 200) * baseMultiplier),
      averageSessionDuration: Math.floor(Math.random() * 200) + 120,
      totalInteractions: Math.floor((Math.random() * 2000 + 1000) * baseMultiplier),
      errorRate: Math.random() * 0.05,
      performanceScore: Math.floor(Math.random() * 20) + 80,
    },
    featureUsage: [
      { 
        name: 'Markdown Rendering', 
        usage: Math.random() * 0.4 + 0.6, 
        trend: (Math.random() - 0.5) * 0.2,
        color: '#00BDA4'
      },
      { 
        name: 'Scroll Control', 
        usage: Math.random() * 0.3 + 0.7, 
        trend: (Math.random() - 0.5) * 0.2,
        color: '#1B365D'
      },
      { 
        name: 'Chat Controls', 
        usage: Math.random() * 0.2 + 0.8, 
        trend: (Math.random() - 0.5) * 0.2,
        color: '#FFAA5C'
      },
      { 
        name: 'Mobile Optimizations', 
        usage: Math.random() * 0.5 + 0.3, 
        trend: (Math.random() - 0.5) * 0.2,
        color: '#EF4444'
      },
      { 
        name: 'Accessibility Features', 
        usage: Math.random() * 0.3 + 0.1, 
        trend: (Math.random() - 0.5) * 0.2,
        color: '#8B5CF6'
      },
      { 
        name: 'Syntax Highlighting', 
        usage: Math.random() * 0.4 + 0.5, 
        trend: (Math.random() - 0.5) * 0.2,
        color: '#10B981'
      },
    ],
    performanceMetrics: Array.from({ length: timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : 30 }, (_, i) => {
      const timestamp = timeRange === '24h' ? `${i}:00` : 
                       timeRange === '7d' ? `Jour ${i + 1}` : 
                       `${i + 1}/${new Date().getMonth() + 1}`;
      
      return {
        timestamp,
        markdownRenderTime: Math.random() * 40 + 15,
        scrollResponseTime: Math.random() * 15 + 8,
        memoryUsage: Math.random() * 30 + 25,
        errorCount: Math.floor(Math.random() * 8),
      };
    }),
    userEngagement: Array.from({ length: timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : 30 }, (_, i) => {
      const hour = timeRange === '24h' ? `${i}:00` : 
                   timeRange === '7d' ? `Jour ${i + 1}` : 
                   `${i + 1}/${new Date().getMonth() + 1}`;
      
      const baseActivity = timeRange === '24h' ? 
        (i >= 8 && i <= 22 ? 1 : 0.3) : // Higher activity during day hours
        1;
      
      return {
        hour,
        sessions: Math.floor((Math.random() * 40 + 20) * baseActivity * baseMultiplier / 10),
        interactions: Math.floor((Math.random() * 150 + 50) * baseActivity * baseMultiplier / 10),
      };
    }),
    errorAnalysis: [
      { 
        type: 'Markdown Render Error', 
        count: Math.floor(Math.random() * 15 * baseMultiplier / 10), 
        severity: 'low' 
      },
      { 
        type: 'Scroll Control Error', 
        count: Math.floor(Math.random() * 8 * baseMultiplier / 10), 
        severity: 'medium' 
      },
      { 
        type: 'Network Timeout', 
        count: Math.floor(Math.random() * 20 * baseMultiplier / 10), 
        severity: 'high' 
      },
      { 
        type: 'Memory Leak', 
        count: Math.floor(Math.random() * 3 * baseMultiplier / 10), 
        severity: 'critical' 
      },
      { 
        type: 'Chat Control Error', 
        count: Math.floor(Math.random() * 5 * baseMultiplier / 10), 
        severity: 'medium' 
      },
      { 
        type: 'Mobile Touch Error', 
        count: Math.floor(Math.random() * 12 * baseMultiplier / 10), 
        severity: 'low' 
      },
    ],
    deviceBreakdown: (() => {
      const desktop = Math.floor(Math.random() * 200 + 150) * baseMultiplier / 10;
      const mobile = Math.floor(Math.random() * 150 + 100) * baseMultiplier / 10;
      const tablet = Math.floor(Math.random() * 80 + 40) * baseMultiplier / 10;
      const total = desktop + mobile + tablet;
      
      return [
        { 
          device: 'Desktop', 
          count: desktop, 
          percentage: Math.round((desktop / total) * 100) 
        },
        { 
          device: 'Mobile', 
          count: mobile, 
          percentage: Math.round((mobile / total) * 100) 
        },
        { 
          device: 'Tablet', 
          count: tablet, 
          percentage: Math.round((tablet / total) * 100) 
        },
      ];
    })(),
    accessibilityUsage: [
      { 
        feature: 'Screen Reader Support', 
        usage: Math.random() * 0.15 + 0.05, 
        trend: (Math.random() - 0.5) * 0.1 
      },
      { 
        feature: 'Keyboard Navigation', 
        usage: Math.random() * 0.25 + 0.15, 
        trend: (Math.random() - 0.5) * 0.1 
      },
      { 
        feature: 'High Contrast Mode', 
        usage: Math.random() * 0.1 + 0.02, 
        trend: (Math.random() - 0.5) * 0.1 
      },
      { 
        feature: 'Focus Management', 
        usage: Math.random() * 0.2 + 0.1, 
        trend: (Math.random() - 0.5) * 0.1 
      },
      { 
        feature: 'ARIA Labels', 
        usage: Math.random() * 0.3 + 0.2, 
        trend: (Math.random() - 0.5) * 0.1 
      },
      { 
        feature: 'Reduced Motion', 
        usage: Math.random() * 0.08 + 0.02, 
        trend: (Math.random() - 0.5) * 0.1 
      },
    ],
    timeRange,
    generatedAt: new Date().toISOString(),
  };
}

function loadMetricsData(): any {
  try {
    if (existsSync(METRICS_FILE_PATH)) {
      const data = readFileSync(METRICS_FILE_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading metrics data:', error);
  }
  return null;
}

function getCachedAnalytics(timeRange: string): AnalyticsData | null {
  try {
    if (existsSync(ANALYTICS_CACHE_PATH)) {
      const cacheData = readFileSync(ANALYTICS_CACHE_PATH, 'utf-8');
      const cache = JSON.parse(cacheData);
      
      // Check if cache is valid (less than 5 minutes old and same time range)
      const cacheAge = Date.now() - new Date(cache.generatedAt).getTime();
      if (cacheAge < 5 * 60 * 1000 && cache.timeRange === timeRange) {
        return cache;
      }
    }
  } catch (error) {
    console.error('Error reading analytics cache:', error);
  }
  return null;
}

function cacheAnalytics(data: AnalyticsData): void {
  try {
    const dataDir = join(process.cwd(), 'data');
    if (!existsSync(dataDir)) {
      require('fs').mkdirSync(dataDir, { recursive: true });
    }
    
    writeFileSync(ANALYTICS_CACHE_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error caching analytics data:', error);
  }
}

function processRealMetrics(metricsData: any, timeRange: string): Partial<AnalyticsData> {
  if (!metricsData) return {};
  
  // Process real metrics data to generate analytics
  const processed: Partial<AnalyticsData> = {};
  
  // Calculate overview from real metrics
  if (metricsData.totalSessions) {
    processed.overview = {
      totalSessions: metricsData.totalSessions,
      totalUsers: Math.floor(metricsData.totalSessions * 0.8), // Estimate unique users
      averageSessionDuration: metricsData.averageSessionDuration || 0,
      totalInteractions: metricsData.totalSessions * (metricsData.userEngagement?.messagesPerSession || 5),
      errorRate: metricsData.errorRate || 0,
      performanceScore: calculatePerformanceScore(metricsData),
    };
  }
  
  // Process feature adoption rates
  if (metricsData.featureAdoptionRates) {
    processed.featureUsage = Object.entries(metricsData.featureAdoptionRates).map(([name, usage], index) => ({
      name: formatFeatureName(name),
      usage: usage as number,
      trend: (Math.random() - 0.5) * 0.1, // Would be calculated from historical data
      color: ['#00BDA4', '#1B365D', '#FFAA5C', '#EF4444', '#8B5CF6', '#10B981'][index % 6],
    }));
  }
  
  // Process error metrics
  if (metricsData.errorMetrics) {
    processed.errorAnalysis = Object.entries(metricsData.errorMetrics).map(([type, count]) => ({
      type: formatErrorType(type),
      count: count as number,
      severity: inferErrorSeverity(type),
    }));
  }
  
  return processed;
}

function calculatePerformanceScore(metrics: any): number {
  let score = 100;
  
  // Deduct points based on performance metrics
  if (metrics.markdownRenderTime > 50) score -= 10;
  if (metrics.scrollResponseTime > 20) score -= 10;
  if (metrics.errorRate > 0.02) score -= 20;
  if (metrics.performanceMetrics?.memoryUsage > 80) score -= 15;
  
  return Math.max(0, Math.min(100, score));
}

function formatFeatureName(name: string): string {
  const nameMap: Record<string, string> = {
    'markdown': 'Markdown Rendering',
    'scrollControl': 'Scroll Control',
    'chatControls': 'Chat Controls',
    'mobileOptimizations': 'Mobile Optimizations',
    'accessibilityFeatures': 'Accessibility Features',
  };
  
  return nameMap[name] || name;
}

function formatErrorType(type: string): string {
  const typeMap: Record<string, string> = {
    'markdownRenderErrors': 'Markdown Render Error',
    'scrollControlErrors': 'Scroll Control Error',
    'chatControlErrors': 'Chat Control Error',
    'networkErrors': 'Network Error',
  };
  
  return typeMap[type] || type;
}

function inferErrorSeverity(type: string): 'low' | 'medium' | 'high' | 'critical' {
  if (type.includes('network') || type.includes('memory')) return 'high';
  if (type.includes('render') || type.includes('scroll')) return 'medium';
  if (type.includes('control')) return 'low';
  return 'medium';
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = (searchParams.get('timeRange') as '24h' | '7d' | '30d') || '24h';
    const features = searchParams.get('features')?.split(',');
    const metrics = searchParams.get('metrics')?.split(',');
    
    // Check cache first
    const cachedData = getCachedAnalytics(timeRange);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }
    
    // Load real metrics data
    const metricsData = loadMetricsData();
    
    // Generate analytics data
    let analyticsData: AnalyticsData;
    
    if (metricsData) {
      // Merge real metrics with generated data
      const realAnalytics = processRealMetrics(metricsData, timeRange);
      const generatedAnalytics = generateAnalyticsData(timeRange);
      
      analyticsData = {
        ...generatedAnalytics,
        ...realAnalytics,
        // Override with real data where available
        overview: realAnalytics.overview || generatedAnalytics.overview,
        featureUsage: realAnalytics.featureUsage || generatedAnalytics.featureUsage,
        errorAnalysis: realAnalytics.errorAnalysis || generatedAnalytics.errorAnalysis,
      };
    } else {
      analyticsData = generateAnalyticsData(timeRange);
    }
    
    // Filter by requested features/metrics if specified
    if (features) {
      analyticsData.featureUsage = analyticsData.featureUsage.filter(
        feature => features.some(f => feature.name.toLowerCase().includes(f.toLowerCase()))
      );
    }
    
    // Cache the results
    cacheAnalytics(analyticsData);
    
    return NextResponse.json(analyticsData, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating analytics data:', error);
    return NextResponse.json(
      { error: 'Failed to generate analytics data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;
    
    switch (action) {
      case 'refresh_cache':
        // Clear cache to force regeneration
        if (existsSync(ANALYTICS_CACHE_PATH)) {
          require('fs').unlinkSync(ANALYTICS_CACHE_PATH);
        }
        return NextResponse.json({ success: true, message: 'Cache cleared' });
        
      case 'export_data':
        const timeRange = data.timeRange || '24h';
        const analyticsData = getCachedAnalytics(timeRange) || generateAnalyticsData(timeRange);
        
        return NextResponse.json({
          success: true,
          data: analyticsData,
          exportedAt: new Date().toISOString(),
        });
        
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error processing analytics request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    // Clear all analytics cache
    if (existsSync(ANALYTICS_CACHE_PATH)) {
      require('fs').unlinkSync(ANALYTICS_CACHE_PATH);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Analytics cache cleared',
    });
  } catch (error) {
    console.error('Error clearing analytics cache:', error);
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    );
  }
}