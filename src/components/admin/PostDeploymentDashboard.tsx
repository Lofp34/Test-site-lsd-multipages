'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChatEnhancementMetrics, 
  UserFeedback, 
  PerformanceAlert,
  postDeploymentAnalytics 
} from '@/lib/chat/post-deployment-analytics';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  MessageSquare,
  BarChart3,
  Settings,
  Download,
  RefreshCw
} from 'lucide-react';

interface DashboardProps {
  className?: string;
}

export default function PostDeploymentDashboard({ className }: DashboardProps) {
  const [metrics, setMetrics] = useState<ChatEnhancementMetrics | null>(null);
  const [feedback, setFeedback] = useState<UserFeedback[]>([]);
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  useEffect(() => {
    loadDashboardData();
    
    // Set up real-time updates
    const interval = setInterval(loadDashboardData, 30000); // Every 30 seconds
    return () => clearInterval(interval);
  }, [selectedTimeframe]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // In a real implementation, these would be API calls
      const metricsData = postDeploymentAnalytics.getMetrics();
      const feedbackData = postDeploymentAnalytics.getFeedback();
      const alertsData = postDeploymentAnalytics.getAlerts();
      
      setMetrics(metricsData);
      setFeedback(feedbackData);
      setAlerts(alertsData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    const data = postDeploymentAnalytics.exportAnalyticsData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateReport = () => {
    const report = postDeploymentAnalytics.generateAdoptionReport();
    console.log('Generated Report:', report);
    // In a real implementation, this would open a detailed report view
    alert(`Report Generated:\n${report.summary}\n\nRecommendations:\n${report.recommendations.join('\n')}`);
  };

  if (loading || !metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading analytics data...</span>
      </div>
    );
  }

  const criticalAlerts = alerts.filter(a => a.severity === 'critical').length;
  const warningAlerts = alerts.filter(a => a.severity === 'warning').length;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chat Enhancements Analytics</h1>
          <p className="text-gray-600 mt-1">Post-deployment monitoring and continuous improvement</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadDashboardData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button onClick={generateReport}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      {(criticalAlerts > 0 || warningAlerts > 0) && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-800">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              {criticalAlerts > 0 && (
                <Badge variant="destructive">
                  {criticalAlerts} Critical
                </Badge>
              )}
              {warningAlerts > 0 && (
                <Badge variant="secondary">
                  {warningAlerts} Warnings
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Markdown Adoption"
          value={`${metrics.markdownRenderingUsage.adoptionRate.toFixed(1)}%`}
          change={+2.3}
          icon={<MessageSquare className="h-4 w-4" />}
          description="Messages using markdown formatting"
        />
        <MetricCard
          title="Scroll Engagement"
          value={`${((metrics.scrollControlUsage.manualScrollEvents / Math.max(metrics.scrollControlUsage.totalSessions, 1)) * 100).toFixed(1)}%`}
          change={+5.7}
          icon={<TrendingUp className="h-4 w-4" />}
          description="Users actively scrolling"
        />
        <MetricCard
          title="Controls Usage"
          value={`${Object.values(metrics.chatControlsUsage).reduce((a, b) => a + b, 0)}`}
          change={+12.1}
          icon={<Settings className="h-4 w-4" />}
          description="Total control interactions"
        />
        <MetricCard
          title="Performance Score"
          value={`${Math.max(0, 100 - metrics.performance.errorRate).toFixed(0)}`}
          change={-1.2}
          icon={<BarChart3 className="h-4 w-4" />}
          description="Overall system health"
        />
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="adoption" className="space-y-4">
        <TabsList>
          <TabsTrigger value="adoption">Adoption Metrics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="feedback">User Feedback</TabsTrigger>
          <TabsTrigger value="improvements">Improvements</TabsTrigger>
        </TabsList>

        <TabsContent value="adoption" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Markdown Usage</CardTitle>
                <CardDescription>How users are adopting markdown formatting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Messages</span>
                    <span className="font-semibold">{metrics.markdownRenderingUsage.totalMessages}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Markdown Messages</span>
                    <span className="font-semibold">{metrics.markdownRenderingUsage.markdownMessages}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Adoption Rate</span>
                    <Badge variant={metrics.markdownRenderingUsage.adoptionRate > 30 ? "default" : "secondary"}>
                      {metrics.markdownRenderingUsage.adoptionRate.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Avg Complexity</span>
                    <span className="font-semibold">{metrics.markdownRenderingUsage.averageComplexity.toFixed(1)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scroll Behavior</CardTitle>
                <CardDescription>User interaction with scroll controls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Sessions</span>
                    <span className="font-semibold">{metrics.scrollControlUsage.totalSessions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Manual Scrolls</span>
                    <span className="font-semibold">{metrics.scrollControlUsage.manualScrollEvents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Auto-scroll Disabled</span>
                    <span className="font-semibold">{metrics.scrollControlUsage.autoScrollDisabled}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Scroll Back Events</span>
                    <span className="font-semibold">{metrics.scrollControlUsage.userScrollBackFrequency}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>System performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Markdown Render Time</span>
                    <Badge variant={metrics.performance.markdownRenderTime > 100 ? "destructive" : "default"}>
                      {metrics.performance.markdownRenderTime.toFixed(1)}ms
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Scroll Response Time</span>
                    <Badge variant={metrics.performance.scrollResponseTime > 16 ? "destructive" : "default"}>
                      {metrics.performance.scrollResponseTime.toFixed(1)}ms
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Memory Usage</span>
                    <Badge variant={metrics.performance.memoryUsage > 50 ? "destructive" : "default"}>
                      {metrics.performance.memoryUsage.toFixed(1)}MB
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Error Rate</span>
                    <Badge variant={metrics.performance.errorRate > 5 ? "destructive" : "default"}>
                      {metrics.performance.errorRate.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technical Metrics</CardTitle>
                <CardDescription>Browser and device compatibility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Mobile Usage</span>
                    <span className="font-semibold">{metrics.technical.mobileUsage.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Accessibility Tools</span>
                    <span className="font-semibold">{metrics.technical.accessibilityToolUsage}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Browser Compatibility</span>
                    <div className="mt-2 space-y-1">
                      {Object.entries(metrics.technical.browserCompatibility).map(([browser, score]) => (
                        <div key={browser} className="flex justify-between text-sm">
                          <span>{browser}</span>
                          <Badge variant={score > 90 ? "default" : "secondary"}>
                            {score}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent User Feedback</CardTitle>
              <CardDescription>Latest feedback from users about chat enhancements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedback.slice(0, 5).map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          item.priority === 'critical' ? 'destructive' :
                          item.priority === 'high' ? 'secondary' : 'outline'
                        }>
                          {item.priority}
                        </Badge>
                        <Badge variant="outline">{item.category}</Badge>
                        <span className="text-sm text-gray-500">
                          Rating: {item.rating}/5
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {item.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{item.message}</p>
                  </div>
                ))}
                {feedback.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No feedback received yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="improvements" className="space-y-4">
          <ImprovementOpportunities />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  description: string;
}

function MetricCard({ title, value, change, icon, description }: MetricCardProps) {
  const isPositive = change > 0;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {isPositive ? (
            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
          )}
          <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
            {isPositive ? '+' : ''}{change.toFixed(1)}%
          </span>
          <span className="ml-1">from last week</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

function ImprovementOpportunities() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [nextIteration, setNextIteration] = useState<any>(null);

  useEffect(() => {
    const opps = postDeploymentAnalytics.identifyImprovementOpportunities();
    const iteration = postDeploymentAnalytics.planNextIteration();
    
    setOpportunities(opps);
    setNextIteration(iteration);
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Improvement Opportunities</CardTitle>
          <CardDescription>Areas identified for enhancement based on analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {opportunities.map((opp, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{opp.area}</h4>
                  <Badge variant={
                    opp.priority === 'high' ? 'destructive' :
                    opp.priority === 'medium' ? 'secondary' : 'outline'
                  }>
                    {opp.priority} priority
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{opp.description}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Expected Impact: {opp.expectedImpact}</span>
                  <span>Effort: {opp.effort}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {nextIteration && (
        <Card>
          <CardHeader>
            <CardTitle>Next Iteration Plan</CardTitle>
            <CardDescription>Planned features for the next development cycle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span>Timeline: {nextIteration.timeline}</span>
                <span>Resources: {nextIteration.resources.join(', ')}</span>
              </div>
              
              <div className="space-y-3">
                {nextIteration.features.map((feature: any, index: number) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium">{feature.name}</h5>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Priority: {feature.priority}</Badge>
                        <Badge variant="secondary">{feature.estimatedEffort}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{feature.description}</p>
                    <p className="text-xs text-gray-500">Value: {feature.userValue}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}