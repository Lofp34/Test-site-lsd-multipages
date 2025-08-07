import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

interface Alert {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  data: any;
  timestamp: string;
  sessionId?: string;
  resolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
  actions?: AlertAction[];
}

interface AlertAction {
  id: string;
  label: string;
  type: 'api_call' | 'redirect' | 'notification';
  config: any;
}

interface AlertRule {
  id: string;
  name: string;
  type: string;
  condition: string;
  threshold: number;
  severity: Alert['severity'];
  enabled: boolean;
  cooldownMinutes: number;
  actions: AlertAction[];
}

const ALERTS_FILE_PATH = join(process.cwd(), 'data', 'chat-alerts.json');
const ALERT_RULES_FILE_PATH = join(process.cwd(), 'data', 'chat-alert-rules.json');

const DEFAULT_ALERT_RULES: AlertRule[] = [
  {
    id: 'high_error_rate',
    name: 'Taux d\'erreur élevé',
    type: 'error_rate',
    condition: 'greater_than',
    threshold: 0.05, // 5%
    severity: 'high',
    enabled: true,
    cooldownMinutes: 15,
    actions: [
      {
        id: 'notify_admin',
        label: 'Notifier l\'administrateur',
        type: 'notification',
        config: { email: 'admin@example.com' },
      },
    ],
  },
  {
    id: 'slow_markdown_render',
    name: 'Rendu Markdown lent',
    type: 'markdown_render_time',
    condition: 'greater_than',
    threshold: 100, // 100ms
    severity: 'medium',
    enabled: true,
    cooldownMinutes: 10,
    actions: [],
  },
  {
    id: 'high_memory_usage',
    name: 'Utilisation mémoire élevée',
    type: 'memory_usage',
    condition: 'greater_than',
    threshold: 100 * 1024 * 1024, // 100MB
    severity: 'high',
    enabled: true,
    cooldownMinutes: 5,
    actions: [
      {
        id: 'trigger_gc',
        label: 'Déclencher garbage collection',
        type: 'api_call',
        config: { endpoint: '/api/admin/system/gc' },
      },
    ],
  },
  {
    id: 'critical_error',
    name: 'Erreur critique',
    type: 'critical_error',
    condition: 'any',
    threshold: 1,
    severity: 'critical',
    enabled: true,
    cooldownMinutes: 0,
    actions: [
      {
        id: 'immediate_notification',
        label: 'Notification immédiate',
        type: 'notification',
        config: { 
          email: 'admin@example.com',
          sms: '+33123456789',
          immediate: true,
        },
      },
    ],
  },
  {
    id: 'scroll_performance_degradation',
    name: 'Dégradation performance scroll',
    type: 'scroll_response_time',
    condition: 'greater_than',
    threshold: 50, // 50ms
    severity: 'medium',
    enabled: true,
    cooldownMinutes: 20,
    actions: [],
  },
];

function ensureAlertsFile(): Alert[] {
  try {
    if (!existsSync(ALERTS_FILE_PATH)) {
      const dataDir = join(process.cwd(), 'data');
      if (!existsSync(dataDir)) {
        require('fs').mkdirSync(dataDir, { recursive: true });
      }
      
      writeFileSync(ALERTS_FILE_PATH, JSON.stringify([], null, 2));
      return [];
    }
    
    const alertsData = readFileSync(ALERTS_FILE_PATH, 'utf-8');
    return JSON.parse(alertsData);
  } catch (error) {
    console.error('Error reading alerts file:', error);
    return [];
  }
}

function ensureAlertRulesFile(): AlertRule[] {
  try {
    if (!existsSync(ALERT_RULES_FILE_PATH)) {
      const dataDir = join(process.cwd(), 'data');
      if (!existsSync(dataDir)) {
        require('fs').mkdirSync(dataDir, { recursive: true });
      }
      
      writeFileSync(ALERT_RULES_FILE_PATH, JSON.stringify(DEFAULT_ALERT_RULES, null, 2));
      return DEFAULT_ALERT_RULES;
    }
    
    const rulesData = readFileSync(ALERT_RULES_FILE_PATH, 'utf-8');
    return JSON.parse(rulesData);
  } catch (error) {
    console.error('Error reading alert rules file:', error);
    return DEFAULT_ALERT_RULES;
  }
}

function saveAlerts(alerts: Alert[]): void {
  try {
    writeFileSync(ALERTS_FILE_PATH, JSON.stringify(alerts, null, 2));
  } catch (error) {
    console.error('Error saving alerts:', error);
  }
}

function saveAlertRules(rules: AlertRule[]): void {
  try {
    writeFileSync(ALERT_RULES_FILE_PATH, JSON.stringify(rules, null, 2));
  } catch (error) {
    console.error('Error saving alert rules:', error);
  }
}

function generateAlertId(): string {
  return `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function createAlert(
  type: string,
  severity: Alert['severity'],
  title: string,
  message: string,
  data: any,
  sessionId?: string
): Alert {
  return {
    id: generateAlertId(),
    type,
    severity,
    title,
    message,
    data,
    timestamp: new Date().toISOString(),
    sessionId,
    resolved: false,
    actions: getActionsForAlertType(type),
  };
}

function getActionsForAlertType(type: string): AlertAction[] {
  const rules = ensureAlertRulesFile();
  const rule = rules.find(r => r.type === type);
  return rule?.actions || [];
}

function checkAlertRules(type: string, value: number, data: any): Alert | null {
  const rules = ensureAlertRulesFile();
  const rule = rules.find(r => r.type === type && r.enabled);
  
  if (!rule) return null;
  
  // Check cooldown
  const alerts = ensureAlertsFile();
  const recentAlert = alerts.find(a => 
    a.type === type && 
    !a.resolved && 
    Date.now() - new Date(a.timestamp).getTime() < rule.cooldownMinutes * 60 * 1000
  );
  
  if (recentAlert) return null;
  
  // Check condition
  let shouldAlert = false;
  switch (rule.condition) {
    case 'greater_than':
      shouldAlert = value > rule.threshold;
      break;
    case 'less_than':
      shouldAlert = value < rule.threshold;
      break;
    case 'equals':
      shouldAlert = value === rule.threshold;
      break;
    case 'any':
      shouldAlert = true;
      break;
  }
  
  if (!shouldAlert) return null;
  
  // Create alert
  const title = `${rule.name} détecté`;
  const message = `Valeur: ${value}, Seuil: ${rule.threshold}`;
  
  return createAlert(type, rule.severity, title, message, data);
}

function processIncomingAlert(alertData: any): Alert {
  const { type, data, sessionId } = alertData;
  
  let alert: Alert | null = null;
  
  switch (type) {
    case 'critical_error':
      alert = createAlert(
        type,
        'critical',
        'Erreur critique détectée',
        `Erreur critique dans le système: ${data.message || 'Erreur inconnue'}`,
        data,
        sessionId
      );
      break;
      
    case 'slow_response_time':
      alert = checkAlertRules('markdown_render_time', data.value, data);
      if (!alert) {
        alert = checkAlertRules('scroll_response_time', data.value, data);
      }
      break;
      
    case 'high_memory_usage':
      alert = checkAlertRules('memory_usage', data.used, data);
      break;
      
    case 'error_rate_spike':
      alert = checkAlertRules('error_rate', data.rate, data);
      break;
      
    default:
      // Generic alert
      alert = createAlert(
        type,
        'medium',
        `Alerte ${type}`,
        `Événement détecté: ${JSON.stringify(data)}`,
        data,
        sessionId
      );
  }
  
  return alert;
}

async function executeAlertActions(alert: Alert): Promise<void> {
  if (!alert.actions || alert.actions.length === 0) return;
  
  for (const action of alert.actions) {
    try {
      switch (action.type) {
        case 'notification':
          await sendNotification(alert, action.config);
          break;
          
        case 'api_call':
          await makeApiCall(action.config);
          break;
          
        case 'redirect':
          // Log redirect action (would be handled client-side)
          console.log(`Redirect action for alert ${alert.id}:`, action.config);
          break;
      }
    } catch (error) {
      console.error(`Failed to execute action ${action.id} for alert ${alert.id}:`, error);
    }
  }
}

async function sendNotification(alert: Alert, config: any): Promise<void> {
  // In a real implementation, this would send actual notifications
  console.log(`Notification for alert ${alert.id}:`, {
    severity: alert.severity,
    title: alert.title,
    message: alert.message,
    config,
  });
  
  // Simulate email/SMS sending
  if (config.email) {
    console.log(`Email sent to ${config.email}`);
  }
  
  if (config.sms) {
    console.log(`SMS sent to ${config.sms}`);
  }
}

async function makeApiCall(config: any): Promise<void> {
  try {
    const response = await fetch(config.endpoint, {
      method: config.method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      body: config.body ? JSON.stringify(config.body) : undefined,
    });
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }
    
    console.log(`API call successful: ${config.endpoint}`);
  } catch (error) {
    console.error(`API call failed:`, error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const severity = searchParams.get('severity');
    const resolved = searchParams.get('resolved');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let alerts = ensureAlertsFile();
    
    // Filter by severity
    if (severity) {
      alerts = alerts.filter(alert => alert.severity === severity);
    }
    
    // Filter by resolved status
    if (resolved !== null) {
      const isResolved = resolved === 'true';
      alerts = alerts.filter(alert => alert.resolved === isResolved);
    }
    
    // Sort by timestamp (newest first)
    alerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    // Pagination
    const paginatedAlerts = alerts.slice(offset, offset + limit);
    
    return NextResponse.json({
      alerts: paginatedAlerts,
      total: alerts.length,
      offset,
      limit,
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch alerts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data, timestamp, sessionId } = body;
    
    // Process the incoming alert
    const alert = processIncomingAlert({ type, data, sessionId });
    
    if (!alert) {
      return NextResponse.json({
        success: true,
        message: 'Alert processed but not created (cooldown or threshold not met)',
      });
    }
    
    // Save the alert
    const alerts = ensureAlertsFile();
    alerts.push(alert);
    saveAlerts(alerts);
    
    // Execute alert actions
    await executeAlertActions(alert);
    
    console.log(`Alert created: ${alert.id} (${alert.severity}) - ${alert.title}`);
    
    return NextResponse.json({
      success: true,
      alert: {
        id: alert.id,
        type: alert.type,
        severity: alert.severity,
        title: alert.title,
        timestamp: alert.timestamp,
      },
    });
  } catch (error) {
    console.error('Error creating alert:', error);
    return NextResponse.json(
      { error: 'Failed to create alert' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { alertId, action, resolvedBy } = body;
    
    const alerts = ensureAlertsFile();
    const alertIndex = alerts.findIndex(alert => alert.id === alertId);
    
    if (alertIndex === -1) {
      return NextResponse.json(
        { error: 'Alert not found' },
        { status: 404 }
      );
    }
    
    const alert = alerts[alertIndex];
    
    switch (action) {
      case 'resolve':
        alert.resolved = true;
        alert.resolvedAt = new Date().toISOString();
        alert.resolvedBy = resolvedBy;
        break;
        
      case 'unresolve':
        alert.resolved = false;
        delete alert.resolvedAt;
        delete alert.resolvedBy;
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
    
    alerts[alertIndex] = alert;
    saveAlerts(alerts);
    
    return NextResponse.json({
      success: true,
      alert: {
        id: alert.id,
        resolved: alert.resolved,
        resolvedAt: alert.resolvedAt,
        resolvedBy: alert.resolvedBy,
      },
    });
  } catch (error) {
    console.error('Error updating alert:', error);
    return NextResponse.json(
      { error: 'Failed to update alert' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const alertId = searchParams.get('alertId');
    const deleteResolved = searchParams.get('deleteResolved') === 'true';
    
    let alerts = ensureAlertsFile();
    
    if (alertId) {
      // Delete specific alert
      alerts = alerts.filter(alert => alert.id !== alertId);
    } else if (deleteResolved) {
      // Delete all resolved alerts
      alerts = alerts.filter(alert => !alert.resolved);
    } else {
      return NextResponse.json(
        { error: 'Must specify alertId or deleteResolved=true' },
        { status: 400 }
      );
    }
    
    saveAlerts(alerts);
    
    return NextResponse.json({
      success: true,
      message: alertId ? 'Alert deleted' : 'Resolved alerts deleted',
    });
  } catch (error) {
    console.error('Error deleting alerts:', error);
    return NextResponse.json(
      { error: 'Failed to delete alerts' },
      { status: 500 }
    );
  }
}