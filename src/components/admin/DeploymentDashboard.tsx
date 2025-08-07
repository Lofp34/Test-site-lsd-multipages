'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  TrendingUp, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Plus,
  Eye,
  Download
} from 'lucide-react';

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

interface NewDeploymentConfig {
  version: string;
  features: string[];
  rolloutPercentage: number;
  targetGroups: string[];
  rollbackThreshold: {
    errorRate: number;
    performanceScore: number;
    userComplaintRate: number;
  };
  abTestEnabled: boolean;
  abTestConfig?: {
    testName: string;
    trafficSplit: number;
    duration: number;
  };
}

export default function DeploymentDashboard() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [currentDeployment, setCurrentDeployment] = useState<Deployment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newDeployment, setNewDeployment] = useState<NewDeploymentConfig>({
    version: '',
    features: [],
    rolloutPercentage: 10,
    targetGroups: [],
    rollbackThreshold: {
      errorRate: 0.05,
      performanceScore: 70,
      userComplaintRate: 0.02,
    },
    abTestEnabled: false,
  });

  useEffect(() => {
    loadDeployments();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadDeployments, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadDeployments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/deployment');
      if (response.ok) {
        const data = await response.json();
        setDeployments(data.deployments);
        setCurrentDeployment(data.currentDeployment);
      }
    } catch (error) {
      console.error('Failed to load deployments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createDeployment = async () => {
    try {
      const response = await fetch('/api/admin/deployment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          ...newDeployment,
          createdBy: 'admin', // Would be actual user
        }),
      });

      if (response.ok) {
        await loadDeployments();
        setShowCreateForm(false);
        setNewDeployment({
          version: '',
          features: [],
          rolloutPercentage: 10,
          targetGroups: [],
          rollbackThreshold: {
            errorRate: 0.05,
            performanceScore: 70,
            userComplaintRate: 0.02,
          },
          abTestEnabled: false,
        });
      } else {
        const error = await response.json();
        alert(`Erreur: ${error.error}`);
      }
    } catch (error) {
      console.error('Failed to create deployment:', error);
      alert('Erreur lors de la création du déploiement');
    }
  };

  const activateDeployment = async (deploymentId: string) => {
    try {
      const response = await fetch('/api/admin/deployment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'activate',
          deploymentId,
        }),
      });

      if (response.ok) {
        await loadDeployments();
      } else {
        const error = await response.json();
        alert(`Erreur: ${error.error}`);
      }
    } catch (error) {
      console.error('Failed to activate deployment:', error);
      alert('Erreur lors de l\'activation du déploiement');
    }
  };

  const updateDeployment = async (deploymentId: string, action: string, updates?: any) => {
    try {
      const response = await fetch('/api/admin/deployment', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deploymentId,
          action,
          ...updates,
        }),
      });

      if (response.ok) {
        await loadDeployments();
      } else {
        const error = await response.json();
        alert(`Erreur: ${error.error}`);
      }
    } catch (error) {
      console.error('Failed to update deployment:', error);
      alert('Erreur lors de la mise à jour du déploiement');
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'rolled_back': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />;
      case 'planned': return <Clock className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'rolled_back': return <RotateCcw className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  const calculateDuration = (startDate: string, endDate?: string): string => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const duration = end.getTime() - start.getTime();
    
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary-title">
            Gestion des Déploiements
          </h2>
          <p className="text-primary-secondary mt-1">
            Déploiement progressif et tests A/B des améliorations de chat
          </p>
        </div>
        
        <Button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nouveau Déploiement
        </Button>
      </div>

      {/* Current Deployment Alert */}
      {currentDeployment && (
        <Alert className="border-green-200 bg-green-50">
          <Play className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Déploiement Actif</AlertTitle>
          <AlertDescription className="text-green-700">
            Version {currentDeployment.version} est actuellement déployée à {currentDeployment.rolloutPercentage}% des utilisateurs.
            {currentDeployment.abTestConfig && (
              <span> Test A/B "{currentDeployment.abTestConfig.testName}" en cours.</span>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Create Deployment Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Créer un Nouveau Déploiement</CardTitle>
            <CardDescription>
              Configurez un nouveau déploiement progressif des fonctionnalités
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  value={newDeployment.version}
                  onChange={(e) => setNewDeployment(prev => ({ ...prev, version: e.target.value }))}
                  placeholder="1.0.0"
                />
              </div>
              
              <div>
                <Label htmlFor="rollout">Pourcentage de Déploiement Initial (%)</Label>
                <Input
                  id="rollout"
                  type="number"
                  min="0"
                  max="100"
                  value={newDeployment.rolloutPercentage}
                  onChange={(e) => setNewDeployment(prev => ({ ...prev, rolloutPercentage: parseInt(e.target.value) }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="features">Fonctionnalités (séparées par des virgules)</Label>
              <Input
                id="features"
                value={newDeployment.features.join(', ')}
                onChange={(e) => setNewDeployment(prev => ({ 
                  ...prev, 
                  features: e.target.value.split(',').map(f => f.trim()).filter(f => f) 
                }))}
                placeholder="markdown-rendering, scroll-control, chat-controls"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="errorRate">Seuil Taux d'Erreur</Label>
                <Input
                  id="errorRate"
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={newDeployment.rollbackThreshold.errorRate}
                  onChange={(e) => setNewDeployment(prev => ({
                    ...prev,
                    rollbackThreshold: {
                      ...prev.rollbackThreshold,
                      errorRate: parseFloat(e.target.value)
                    }
                  }))}
                />
              </div>
              
              <div>
                <Label htmlFor="performanceScore">Score Performance Min</Label>
                <Input
                  id="performanceScore"
                  type="number"
                  min="0"
                  max="100"
                  value={newDeployment.rollbackThreshold.performanceScore}
                  onChange={(e) => setNewDeployment(prev => ({
                    ...prev,
                    rollbackThreshold: {
                      ...prev.rollbackThreshold,
                      performanceScore: parseInt(e.target.value)
                    }
                  }))}
                />
              </div>
              
              <div>
                <Label htmlFor="complaintRate">Seuil Plaintes</Label>
                <Input
                  id="complaintRate"
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={newDeployment.rollbackThreshold.userComplaintRate}
                  onChange={(e) => setNewDeployment(prev => ({
                    ...prev,
                    rollbackThreshold: {
                      ...prev.rollbackThreshold,
                      userComplaintRate: parseFloat(e.target.value)
                    }
                  }))}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="abTest"
                checked={newDeployment.abTestEnabled}
                onChange={(e) => setNewDeployment(prev => ({ ...prev, abTestEnabled: e.target.checked }))}
              />
              <Label htmlFor="abTest">Activer le test A/B</Label>
            </div>

            {newDeployment.abTestEnabled && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                <div>
                  <Label htmlFor="testName">Nom du Test</Label>
                  <Input
                    id="testName"
                    value={newDeployment.abTestConfig?.testName || ''}
                    onChange={(e) => setNewDeployment(prev => ({
                      ...prev,
                      abTestConfig: {
                        ...prev.abTestConfig,
                        testName: e.target.value,
                        trafficSplit: prev.abTestConfig?.trafficSplit || 50,
                        duration: prev.abTestConfig?.duration || 7,
                      }
                    }))}
                    placeholder="Test nouvelles fonctionnalités"
                  />
                </div>
                
                <div>
                  <Label htmlFor="trafficSplit">Répartition Trafic (%)</Label>
                  <Input
                    id="trafficSplit"
                    type="number"
                    min="0"
                    max="100"
                    value={newDeployment.abTestConfig?.trafficSplit || 50}
                    onChange={(e) => setNewDeployment(prev => ({
                      ...prev,
                      abTestConfig: {
                        ...prev.abTestConfig!,
                        trafficSplit: parseInt(e.target.value)
                      }
                    }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="duration">Durée (jours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max="30"
                    value={newDeployment.abTestConfig?.duration || 7}
                    onChange={(e) => setNewDeployment(prev => ({
                      ...prev,
                      abTestConfig: {
                        ...prev.abTestConfig!,
                        duration: parseInt(e.target.value)
                      }
                    }))}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={createDeployment}>
                Créer le Déploiement
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Deployments List */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="active">Actifs</TabsTrigger>
          <TabsTrigger value="planned">Planifiés</TabsTrigger>
          <TabsTrigger value="completed">Terminés</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p>Chargement des déploiements...</p>
            </div>
          ) : deployments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucun déploiement trouvé</p>
            </div>
          ) : (
            deployments.map((deployment) => (
              <Card key={deployment.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(deployment.status)}
                        <CardTitle className="text-lg">
                          Version {deployment.version}
                        </CardTitle>
                      </div>
                      <Badge className={getStatusColor(deployment.status)}>
                        {deployment.status}
                      </Badge>
                      {deployment.abTestConfig && (
                        <Badge variant="outline">
                          A/B Test
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      {deployment.status === 'planned' && (
                        <Button
                          size="sm"
                          onClick={() => activateDeployment(deployment.id)}
                          className="flex items-center gap-1"
                        >
                          <Play className="w-3 h-3" />
                          Activer
                        </Button>
                      )}
                      
                      {deployment.status === 'active' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateDeployment(deployment.id, 'pause')}
                            className="flex items-center gap-1"
                          >
                            <Pause className="w-3 h-3" />
                            Pause
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const newPercentage = prompt('Nouveau pourcentage de déploiement:', deployment.rolloutPercentage.toString());
                              if (newPercentage && !isNaN(parseInt(newPercentage))) {
                                updateDeployment(deployment.id, 'update_rollout', { rolloutPercentage: parseInt(newPercentage) });
                              }
                            }}
                            className="flex items-center gap-1"
                          >
                            <TrendingUp className="w-3 h-3" />
                            Augmenter
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              if (confirm('Êtes-vous sûr de vouloir effectuer un rollback ?')) {
                                updateDeployment(deployment.id, 'rollback');
                              }
                            }}
                            className="flex items-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" />
                            Rollback
                          </Button>
                        </>
                      )}
                      
                      {deployment.status === 'paused' && (
                        <Button
                          size="sm"
                          onClick={() => updateDeployment(deployment.id, 'resume')}
                          className="flex items-center gap-1"
                        >
                          <Play className="w-3 h-3" />
                          Reprendre
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <CardDescription>
                    Créé le {formatDate(deployment.createdAt)} par {deployment.createdBy}
                    {deployment.status === 'active' && (
                      <span> • Durée: {calculateDuration(deployment.startDate, deployment.endDate)}</span>
                    )}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Déploiement</div>
                      <div className="text-2xl font-bold">{deployment.rolloutPercentage}%</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500">Fonctionnalités</div>
                      <div className="text-2xl font-bold">{deployment.features.length}</div>
                    </div>
                    
                    {deployment.metrics && (
                      <>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Utilisateurs</div>
                          <div className="text-2xl font-bold">{deployment.metrics.totalUsers}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium text-gray-500">Taux d'Erreur</div>
                          <div className="text-2xl font-bold">
                            {(deployment.metrics.errorRate * 100).toFixed(2)}%
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {deployment.features.length > 0 && (
                    <div className="mt-4">
                      <div className="text-sm font-medium text-gray-500 mb-2">Fonctionnalités incluses:</div>
                      <div className="flex flex-wrap gap-2">
                        {deployment.features.map((feature, index) => (
                          <Badge key={index} variant="outline">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {deployment.abTestConfig && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-900 mb-1">
                        Test A/B: {deployment.abTestConfig.testName}
                      </div>
                      <div className="text-sm text-blue-700">
                        Répartition: {deployment.abTestConfig.trafficSplit}% traitement, {100 - deployment.abTestConfig.trafficSplit}% contrôle
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Other tabs would filter the deployments accordingly */}
        <TabsContent value="active">
          {/* Show only active deployments */}
        </TabsContent>
        
        <TabsContent value="planned">
          {/* Show only planned deployments */}
        </TabsContent>
        
        <TabsContent value="completed">
          {/* Show only completed deployments */}
        </TabsContent>
      </Tabs>
    </div>
  );
}