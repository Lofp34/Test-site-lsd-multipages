'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Settings, Activity, Bug, Palette } from 'lucide-react';

interface ChatEnhancementConfig {
  // Feature flags
  markdownEnabled: boolean;
  scrollControlEnabled: boolean;
  chatControlsEnabled: boolean;
  mobileOptimizationsEnabled: boolean;
  accessibilityFeaturesEnabled: boolean;
  
  // Customization parameters
  scrollConfig: {
    bottomThreshold: number;
    autoScrollDelay: number;
    smoothScrollDuration: number;
  };
  
  markdownConfig: {
    enableSyntaxHighlighting: boolean;
    enableTables: boolean;
    enableLinks: boolean;
    maxContentLength: number;
  };
  
  controlsConfig: {
    showMinimizeButton: boolean;
    showFullscreenButton: boolean;
    confirmCloseOnStreaming: boolean;
    keyboardShortcutsEnabled: boolean;
  };
  
  // Appearance settings
  theme: {
    primaryColor: string;
    accentColor: string;
    borderRadius: number;
    fontSize: 'small' | 'medium' | 'large';
  };
  
  // Performance settings
  performance: {
    enableLazyLoading: boolean;
    maxHistoryLength: number;
    enableMemoryOptimization: boolean;
    enableBatteryOptimization: boolean;
  };
}

interface DiagnosticInfo {
  status: 'healthy' | 'warning' | 'error';
  message: string;
  details?: string;
}

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
  };
}

export default function ChatEnhancementsAdmin() {
  const [config, setConfig] = useState<ChatEnhancementConfig>({
    markdownEnabled: true,
    scrollControlEnabled: true,
    chatControlsEnabled: true,
    mobileOptimizationsEnabled: true,
    accessibilityFeaturesEnabled: true,
    
    scrollConfig: {
      bottomThreshold: 50,
      autoScrollDelay: 3000,
      smoothScrollDuration: 300,
    },
    
    markdownConfig: {
      enableSyntaxHighlighting: true,
      enableTables: true,
      enableLinks: true,
      maxContentLength: 50000,
    },
    
    controlsConfig: {
      showMinimizeButton: true,
      showFullscreenButton: true,
      confirmCloseOnStreaming: true,
      keyboardShortcutsEnabled: true,
    },
    
    theme: {
      primaryColor: '#1B365D',
      accentColor: '#00BDA4',
      borderRadius: 8,
      fontSize: 'medium',
    },
    
    performance: {
      enableLazyLoading: true,
      maxHistoryLength: 100,
      enableMemoryOptimization: true,
      enableBatteryOptimization: false,
    },
  });

  const [diagnostics, setDiagnostics] = useState<DiagnosticInfo[]>([]);
  const [metrics, setMetrics] = useState<ChatMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load configuration on component mount
  useEffect(() => {
    loadConfiguration();
    loadDiagnostics();
    loadMetrics();
  }, []);

  const loadConfiguration = async () => {
    try {
      const response = await fetch('/api/admin/chat-config');
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error('Failed to load configuration:', error);
    }
  };

  const saveConfiguration = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/chat-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });
      
      if (response.ok) {
        // Show success message
        console.log('Configuration saved successfully');
      }
    } catch (error) {
      console.error('Failed to save configuration:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const loadDiagnostics = async () => {
    try {
      const response = await fetch('/api/admin/chat-diagnostics');
      if (response.ok) {
        const data = await response.json();
        setDiagnostics(data);
      }
    } catch (error) {
      console.error('Failed to load diagnostics:', error);
    }
  };

  const loadMetrics = async () => {
    try {
      const response = await fetch('/api/admin/chat-metrics');
      if (response.ok) {
        const data = await response.json();
        setMetrics(data);
      }
    } catch (error) {
      console.error('Failed to load metrics:', error);
    }
  };

  const runDiagnostics = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/chat-diagnostics', {
        method: 'POST',
      });
      if (response.ok) {
        await loadDiagnostics();
      }
    } catch (error) {
      console.error('Failed to run diagnostics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetToDefaults = () => {
    // Reset configuration to default values
    setConfig({
      markdownEnabled: true,
      scrollControlEnabled: true,
      chatControlsEnabled: true,
      mobileOptimizationsEnabled: true,
      accessibilityFeaturesEnabled: true,
      
      scrollConfig: {
        bottomThreshold: 50,
        autoScrollDelay: 3000,
        smoothScrollDuration: 300,
      },
      
      markdownConfig: {
        enableSyntaxHighlighting: true,
        enableTables: true,
        enableLinks: true,
        maxContentLength: 50000,
      },
      
      controlsConfig: {
        showMinimizeButton: true,
        showFullscreenButton: true,
        confirmCloseOnStreaming: true,
        keyboardShortcutsEnabled: true,
      },
      
      theme: {
        primaryColor: '#1B365D',
        accentColor: '#00BDA4',
        borderRadius: 8,
        fontSize: 'medium',
      },
      
      performance: {
        enableLazyLoading: true,
        maxHistoryLength: 100,
        enableMemoryOptimization: true,
        enableBatteryOptimization: false,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-title">
            Administration Chat Amélioré
          </h1>
          <p className="text-primary-secondary mt-2">
            Configuration et monitoring des nouvelles fonctionnalités de chat
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={resetToDefaults}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Réinitialiser
          </Button>
          
          <Button
            onClick={saveConfiguration}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            Sauvegarder
          </Button>
        </div>
      </div>

      <Tabs defaultValue="features" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
          <TabsTrigger value="customization">Personnalisation</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
          <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
          <TabsTrigger value="metrics">Métriques</TabsTrigger>
        </TabsList>

        {/* Feature Flags Tab */}
        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Feature Flags
              </CardTitle>
              <CardDescription>
                Activez ou désactivez les nouvelles fonctionnalités de chat
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="markdown-enabled" className="text-base font-medium">
                      Rendu Markdown
                    </Label>
                    <p className="text-sm text-primary-secondary">
                      Active le rendu formaté des réponses avec coloration syntaxique
                    </p>
                  </div>
                  <Switch
                    id="markdown-enabled"
                    checked={config.markdownEnabled}
                    onCheckedChange={(checked) =>
                      setConfig(prev => ({ ...prev, markdownEnabled: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="scroll-control-enabled" className="text-base font-medium">
                      Contrôle de Défilement
                    </Label>
                    <p className="text-sm text-primary-secondary">
                      Gestion intelligente du scroll pendant le streaming
                    </p>
                  </div>
                  <Switch
                    id="scroll-control-enabled"
                    checked={config.scrollControlEnabled}
                    onCheckedChange={(checked) =>
                      setConfig(prev => ({ ...prev, scrollControlEnabled: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="chat-controls-enabled" className="text-base font-medium">
                      Contrôles de Chat
                    </Label>
                    <p className="text-sm text-primary-secondary">
                      Boutons de fermeture, minimisation et raccourcis clavier
                    </p>
                  </div>
                  <Switch
                    id="chat-controls-enabled"
                    checked={config.chatControlsEnabled}
                    onCheckedChange={(checked) =>
                      setConfig(prev => ({ ...prev, chatControlsEnabled: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="mobile-optimizations-enabled" className="text-base font-medium">
                      Optimisations Mobile
                    </Label>
                    <p className="text-sm text-primary-secondary">
                      Adaptations tactiles et gestes mobiles
                    </p>
                  </div>
                  <Switch
                    id="mobile-optimizations-enabled"
                    checked={config.mobileOptimizationsEnabled}
                    onCheckedChange={(checked) =>
                      setConfig(prev => ({ ...prev, mobileOptimizationsEnabled: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="accessibility-features-enabled" className="text-base font-medium">
                      Fonctionnalités d'Accessibilité
                    </Label>
                    <p className="text-sm text-primary-secondary">
                      Support des lecteurs d'écran et navigation clavier
                    </p>
                  </div>
                  <Switch
                    id="accessibility-features-enabled"
                    checked={config.accessibilityFeaturesEnabled}
                    onCheckedChange={(checked) =>
                      setConfig(prev => ({ ...prev, accessibilityFeaturesEnabled: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customization Tab */}
        <TabsContent value="customization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Scroll Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Configuration du Défilement</CardTitle>
                <CardDescription>
                  Paramètres de comportement du scroll intelligent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="bottom-threshold">
                    Seuil de détection bas (pixels): {config.scrollConfig.bottomThreshold}
                  </Label>
                  <Slider
                    id="bottom-threshold"
                    min={10}
                    max={200}
                    step={10}
                    value={[config.scrollConfig.bottomThreshold]}
                    onValueChange={([value]) =>
                      setConfig(prev => ({
                        ...prev,
                        scrollConfig: { ...prev.scrollConfig, bottomThreshold: value }
                      }))
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="auto-scroll-delay">
                    Délai auto-scroll (ms): {config.scrollConfig.autoScrollDelay}
                  </Label>
                  <Slider
                    id="auto-scroll-delay"
                    min={1000}
                    max={10000}
                    step={500}
                    value={[config.scrollConfig.autoScrollDelay]}
                    onValueChange={([value]) =>
                      setConfig(prev => ({
                        ...prev,
                        scrollConfig: { ...prev.scrollConfig, autoScrollDelay: value }
                      }))
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="smooth-scroll-duration">
                    Durée animation (ms): {config.scrollConfig.smoothScrollDuration}
                  </Label>
                  <Slider
                    id="smooth-scroll-duration"
                    min={100}
                    max={1000}
                    step={50}
                    value={[config.scrollConfig.smoothScrollDuration]}
                    onValueChange={([value]) =>
                      setConfig(prev => ({
                        ...prev,
                        scrollConfig: { ...prev.scrollConfig, smoothScrollDuration: value }
                      }))
                    }
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Markdown Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Configuration Markdown</CardTitle>
                <CardDescription>
                  Paramètres de rendu du contenu formaté
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="syntax-highlighting">Coloration syntaxique</Label>
                  <Switch
                    id="syntax-highlighting"
                    checked={config.markdownConfig.enableSyntaxHighlighting}
                    onCheckedChange={(checked) =>
                      setConfig(prev => ({
                        ...prev,
                        markdownConfig: { ...prev.markdownConfig, enableSyntaxHighlighting: checked }
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-tables">Support des tableaux</Label>
                  <Switch
                    id="enable-tables"
                    checked={config.markdownConfig.enableTables}
                    onCheckedChange={(checked) =>
                      setConfig(prev => ({
                        ...prev,
                        markdownConfig: { ...prev.markdownConfig, enableTables: checked }
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-links">Liens cliquables</Label>
                  <Switch
                    id="enable-links"
                    checked={config.markdownConfig.enableLinks}
                    onCheckedChange={(checked) =>
                      setConfig(prev => ({
                        ...prev,
                        markdownConfig: { ...prev.markdownConfig, enableLinks: checked }
                      }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="max-content-length">
                    Taille max contenu (caractères)
                  </Label>
                  <Input
                    id="max-content-length"
                    type="number"
                    value={config.markdownConfig.maxContentLength}
                    onChange={(e) =>
                      setConfig(prev => ({
                        ...prev,
                        markdownConfig: { ...prev.markdownConfig, maxContentLength: parseInt(e.target.value) }
                      }))
                    }
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Personnalisation de l'Apparence
              </CardTitle>
              <CardDescription>
                Configurez l'apparence du chat amélioré
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="primary-color">Couleur principale</Label>
                  <Input
                    id="primary-color"
                    type="color"
                    value={config.theme.primaryColor}
                    onChange={(e) =>
                      setConfig(prev => ({
                        ...prev,
                        theme: { ...prev.theme, primaryColor: e.target.value }
                      }))
                    }
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="accent-color">Couleur d'accent</Label>
                  <Input
                    id="accent-color"
                    type="color"
                    value={config.theme.accentColor}
                    onChange={(e) =>
                      setConfig(prev => ({
                        ...prev,
                        theme: { ...prev.theme, accentColor: e.target.value }
                      }))
                    }
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="border-radius">
                    Rayon des bordures (px): {config.theme.borderRadius}
                  </Label>
                  <Slider
                    id="border-radius"
                    min={0}
                    max={20}
                    step={1}
                    value={[config.theme.borderRadius]}
                    onValueChange={([value]) =>
                      setConfig(prev => ({
                        ...prev,
                        theme: { ...prev.theme, borderRadius: value }
                      }))
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="font-size">Taille de police</Label>
                  <select
                    id="font-size"
                    value={config.theme.fontSize}
                    onChange={(e) =>
                      setConfig(prev => ({
                        ...prev,
                        theme: { ...prev.theme, fontSize: e.target.value as 'small' | 'medium' | 'large' }
                      }))
                    }
                    className="mt-2 w-full p-2 border rounded-md"
                  >
                    <option value="small">Petite</option>
                    <option value="medium">Moyenne</option>
                    <option value="large">Grande</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Diagnostics Tab */}
        <TabsContent value="diagnostics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="w-5 h-5" />
                Outils de Diagnostic
              </CardTitle>
              <CardDescription>
                Vérifiez le bon fonctionnement des nouvelles fonctionnalités
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <p>Exécuter les tests de diagnostic</p>
                <Button
                  onClick={runDiagnostics}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Activity className="w-4 h-4" />
                  )}
                  Lancer les tests
                </Button>
              </div>

              <div className="space-y-3">
                {diagnostics.map((diagnostic, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      diagnostic.status === 'healthy'
                        ? 'bg-green-50 border-green-200'
                        : diagnostic.status === 'warning'
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {diagnostic.status === 'healthy' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      )}
                      <span className="font-medium">{diagnostic.message}</span>
                      <Badge
                        variant={
                          diagnostic.status === 'healthy'
                            ? 'default'
                            : diagnostic.status === 'warning'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {diagnostic.status}
                      </Badge>
                    </div>
                    {diagnostic.details && (
                      <p className="text-sm text-gray-600 mt-2">{diagnostic.details}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Métriques de Performance
              </CardTitle>
              <CardDescription>
                Statistiques d'utilisation des nouvelles fonctionnalités
              </CardDescription>
            </CardHeader>
            <CardContent>
              {metrics ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900">Sessions Totales</h3>
                    <p className="text-2xl font-bold text-blue-700">{metrics.totalSessions}</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-900">Durée Moyenne</h3>
                    <p className="text-2xl font-bold text-green-700">
                      {Math.round(metrics.averageSessionDuration)}s
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-900">Temps Rendu Markdown</h3>
                    <p className="text-2xl font-bold text-purple-700">
                      {metrics.markdownRenderTime}ms
                    </p>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h3 className="font-semibold text-orange-900">Réactivité Scroll</h3>
                    <p className="text-2xl font-bold text-orange-700">
                      {metrics.scrollResponseTime}ms
                    </p>
                  </div>
                  
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h3 className="font-semibold text-red-900">Taux d'Erreur</h3>
                    <p className="text-2xl font-bold text-red-700">
                      {(metrics.errorRate * 100).toFixed(2)}%
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900">Adoption Markdown</h3>
                    <p className="text-2xl font-bold text-gray-700">
                      {(metrics.featureAdoptionRates.markdown * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Chargement des métriques...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}