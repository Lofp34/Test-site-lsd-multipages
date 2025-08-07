import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

interface Deployment {
  id: string;
  version: string;
  features: string[];
  rolloutPercentage: number;
  targetGroups: string[];
  startDate: string;
  endDate?: string;
  status: 'planned' | 'active' | 'paused' | 'completed' | 'rolled_back';
  enabled: boolean;
  rollbackThreshold: {
    errorRate: number;
    performanceScore: number;
    userComplaintRate: number;
  };
  abTestConfig?: {
    testName: string;
    variants: {
      control: { name: string; features: Record<string, any>; description: string };
      treatment: { name: string; features: Record<string, any>; description: string };
    };
    trafficSplit: number;
    successMetrics: string[];
    duration: number;
    minimumSampleSize: number;
  };
  createdAt: string;
  createdBy: string;
  metrics?: {
    totalUsers: number;
    successfulSessions: number;
    errorRate: number;
    performanceScore: number;
    userFeedbackScore: number;
    conversionRate: number;
  };
}

const DEPLOYMENTS_FILE_PATH = join(process.cwd(), 'data', 'chat-deployments.json');
const CURRENT_DEPLOYMENT_FILE_PATH = join(process.cwd(), 'data', 'current-deployment.json');

function ensureDeploymentsFile(): Deployment[] {
  try {
    if (!existsSync(DEPLOYMENTS_FILE_PATH)) {
      const dataDir = join(process.cwd(), 'data');
      if (!existsSync(dataDir)) {
        require('fs').mkdirSync(dataDir, { recursive: true });
      }
      
      writeFileSync(DEPLOYMENTS_FILE_PATH, JSON.stringify([], null, 2));
      return [];
    }
    
    const deploymentsData = readFileSync(DEPLOYMENTS_FILE_PATH, 'utf-8');
    return JSON.parse(deploymentsData);
  } catch (error) {
    console.error('Error reading deployments file:', error);
    return [];
  }
}

function saveDeployments(deployments: Deployment[]): void {
  try {
    writeFileSync(DEPLOYMENTS_FILE_PATH, JSON.stringify(deployments, null, 2));
  } catch (error) {
    console.error('Error saving deployments:', error);
  }
}

function getCurrentDeployment(): Deployment | null {
  try {
    if (!existsSync(CURRENT_DEPLOYMENT_FILE_PATH)) {
      return null;
    }
    
    const currentData = readFileSync(CURRENT_DEPLOYMENT_FILE_PATH, 'utf-8');
    return JSON.parse(currentData);
  } catch (error) {
    console.error('Error reading current deployment:', error);
    return null;
  }
}

function setCurrentDeployment(deployment: Deployment | null): void {
  try {
    if (deployment) {
      writeFileSync(CURRENT_DEPLOYMENT_FILE_PATH, JSON.stringify(deployment, null, 2));
    } else if (existsSync(CURRENT_DEPLOYMENT_FILE_PATH)) {
      require('fs').unlinkSync(CURRENT_DEPLOYMENT_FILE_PATH);
    }
  } catch (error) {
    console.error('Error setting current deployment:', error);
  }
}

function generateDeploymentId(): string {
  return `deploy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function validateDeploymentConfig(config: any): string[] {
  const errors: string[] = [];
  
  if (!config.version) {
    errors.push('Version is required');
  }
  
  if (!Array.isArray(config.features)) {
    errors.push('Features must be an array');
  }
  
  if (typeof config.rolloutPercentage !== 'number' || config.rolloutPercentage < 0 || config.rolloutPercentage > 100) {
    errors.push('Rollout percentage must be a number between 0 and 100');
  }
  
  if (config.abTestConfig) {
    if (!config.abTestConfig.testName) {
      errors.push('A/B test name is required');
    }
    
    if (!config.abTestConfig.variants || !config.abTestConfig.variants.control || !config.abTestConfig.variants.treatment) {
      errors.push('A/B test must have control and treatment variants');
    }
    
    if (typeof config.abTestConfig.trafficSplit !== 'number' || config.abTestConfig.trafficSplit < 0 || config.abTestConfig.trafficSplit > 100) {
      errors.push('A/B test traffic split must be a number between 0 and 100');
    }
  }
  
  return errors;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let deployments = ensureDeploymentsFile();
    
    // Filter by status
    if (status) {
      deployments = deployments.filter(d => d.status === status);
    }
    
    // Sort by creation date (newest first)
    deployments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    // Pagination
    const paginatedDeployments = deployments.slice(offset, offset + limit);
    
    return NextResponse.json({
      deployments: paginatedDeployments,
      total: deployments.length,
      offset,
      limit,
      currentDeployment: getCurrentDeployment(),
    });
  } catch (error) {
    console.error('Error fetching deployments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deployments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...config } = body;
    
    if (action === 'create') {
      // Validate configuration
      const validationErrors = validateDeploymentConfig(config);
      if (validationErrors.length > 0) {
        return NextResponse.json(
          { error: 'Validation failed', details: validationErrors },
          { status: 400 }
        );
      }
      
      // Create new deployment
      const deployment: Deployment = {
        id: generateDeploymentId(),
        version: config.version,
        features: config.features || [],
        rolloutPercentage: config.rolloutPercentage || 10,
        targetGroups: config.targetGroups || [],
        startDate: config.startDate || new Date().toISOString(),
        endDate: config.endDate,
        status: 'planned',
        enabled: config.enabled !== false,
        rollbackThreshold: {
          errorRate: 0.05,
          performanceScore: 70,
          userComplaintRate: 0.02,
          ...config.rollbackThreshold,
        },
        abTestConfig: config.abTestConfig,
        createdAt: new Date().toISOString(),
        createdBy: config.createdBy || 'admin',
      };
      
      // Save deployment
      const deployments = ensureDeploymentsFile();
      deployments.push(deployment);
      saveDeployments(deployments);
      
      return NextResponse.json({
        success: true,
        deployment: {
          id: deployment.id,
          version: deployment.version,
          status: deployment.status,
          createdAt: deployment.createdAt,
        },
      });
    }
    
    if (action === 'activate') {
      const { deploymentId } = config;
      
      if (!deploymentId) {
        return NextResponse.json(
          { error: 'Deployment ID is required' },
          { status: 400 }
        );
      }
      
      // Find and activate deployment
      const deployments = ensureDeploymentsFile();
      const deploymentIndex = deployments.findIndex(d => d.id === deploymentId);
      
      if (deploymentIndex === -1) {
        return NextResponse.json(
          { error: 'Deployment not found' },
          { status: 404 }
        );
      }
      
      // Check if another deployment is active
      const currentDeployment = getCurrentDeployment();
      if (currentDeployment && currentDeployment.status === 'active') {
        return NextResponse.json(
          { error: 'Another deployment is currently active' },
          { status: 409 }
        );
      }
      
      // Activate deployment
      deployments[deploymentIndex].status = 'active';
      deployments[deploymentIndex].startDate = new Date().toISOString();
      
      // Initialize metrics
      deployments[deploymentIndex].metrics = {
        totalUsers: 0,
        successfulSessions: 0,
        errorRate: 0,
        performanceScore: 100,
        userFeedbackScore: 0,
        conversionRate: 0,
      };
      
      saveDeployments(deployments);
      setCurrentDeployment(deployments[deploymentIndex]);
      
      return NextResponse.json({
        success: true,
        message: 'Deployment activated',
        deployment: deployments[deploymentIndex],
      });
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error processing deployment request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { deploymentId, action, ...updates } = body;
    
    if (!deploymentId) {
      return NextResponse.json(
        { error: 'Deployment ID is required' },
        { status: 400 }
      );
    }
    
    const deployments = ensureDeploymentsFile();
    const deploymentIndex = deployments.findIndex(d => d.id === deploymentId);
    
    if (deploymentIndex === -1) {
      return NextResponse.json(
        { error: 'Deployment not found' },
        { status: 404 }
      );
    }
    
    const deployment = deployments[deploymentIndex];
    
    switch (action) {
      case 'pause':
        deployment.status = 'paused';
        break;
        
      case 'resume':
        deployment.status = 'active';
        break;
        
      case 'complete':
        deployment.status = 'completed';
        deployment.endDate = new Date().toISOString();
        setCurrentDeployment(null);
        break;
        
      case 'rollback':
        deployment.status = 'rolled_back';
        deployment.endDate = new Date().toISOString();
        setCurrentDeployment(null);
        break;
        
      case 'update_rollout':
        if (typeof updates.rolloutPercentage === 'number' && 
            updates.rolloutPercentage >= 0 && 
            updates.rolloutPercentage <= 100) {
          deployment.rolloutPercentage = updates.rolloutPercentage;
        } else {
          return NextResponse.json(
            { error: 'Invalid rollout percentage' },
            { status: 400 }
          );
        }
        break;
        
      case 'update_config':
        // Update allowed configuration fields
        if (updates.rollbackThreshold) {
          deployment.rollbackThreshold = { ...deployment.rollbackThreshold, ...updates.rollbackThreshold };
        }
        if (updates.targetGroups) {
          deployment.targetGroups = updates.targetGroups;
        }
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
    
    deployments[deploymentIndex] = deployment;
    saveDeployments(deployments);
    
    // Update current deployment if it's the active one
    const currentDeployment = getCurrentDeployment();
    if (currentDeployment && currentDeployment.id === deploymentId) {
      setCurrentDeployment(deployment.status === 'active' ? deployment : null);
    }
    
    return NextResponse.json({
      success: true,
      deployment: {
        id: deployment.id,
        status: deployment.status,
        rolloutPercentage: deployment.rolloutPercentage,
        endDate: deployment.endDate,
      },
    });
  } catch (error) {
    console.error('Error updating deployment:', error);
    return NextResponse.json(
      { error: 'Failed to update deployment' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deploymentId = searchParams.get('deploymentId');
    
    if (!deploymentId) {
      return NextResponse.json(
        { error: 'Deployment ID is required' },
        { status: 400 }
      );
    }
    
    const deployments = ensureDeploymentsFile();
    const deploymentIndex = deployments.findIndex(d => d.id === deploymentId);
    
    if (deploymentIndex === -1) {
      return NextResponse.json(
        { error: 'Deployment not found' },
        { status: 404 }
      );
    }
    
    const deployment = deployments[deploymentIndex];
    
    // Don't allow deletion of active deployments
    if (deployment.status === 'active') {
      return NextResponse.json(
        { error: 'Cannot delete active deployment' },
        { status: 409 }
      );
    }
    
    // Remove deployment
    deployments.splice(deploymentIndex, 1);
    saveDeployments(deployments);
    
    // Clear current deployment if it was the deleted one
    const currentDeployment = getCurrentDeployment();
    if (currentDeployment && currentDeployment.id === deploymentId) {
      setCurrentDeployment(null);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Deployment deleted',
    });
  } catch (error) {
    console.error('Error deleting deployment:', error);
    return NextResponse.json(
      { error: 'Failed to delete deployment' },
      { status: 500 }
    );
  }
}