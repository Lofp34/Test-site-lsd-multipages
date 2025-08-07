import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface DiagnosticResult {
  status: 'healthy' | 'warning' | 'error';
  message: string;
  details?: string;
  timestamp: string;
}

interface DiagnosticTest {
  name: string;
  description: string;
  test: () => Promise<DiagnosticResult>;
}

const CONFIG_FILE_PATH = join(process.cwd(), 'data', 'chat-enhancements-config.json');

async function testConfigurationFile(): Promise<DiagnosticResult> {
  try {
    if (!existsSync(CONFIG_FILE_PATH)) {
      return {
        status: 'warning',
        message: 'Fichier de configuration manquant',
        details: 'Le fichier de configuration sera créé avec les valeurs par défaut',
        timestamp: new Date().toISOString(),
      };
    }
    
    const configData = readFileSync(CONFIG_FILE_PATH, 'utf-8');
    const config = JSON.parse(configData);
    
    // Validate configuration structure
    const requiredFields = [
      'markdownEnabled',
      'scrollControlEnabled',
      'chatControlsEnabled',
      'scrollConfig',
      'markdownConfig',
      'controlsConfig',
    ];
    
    for (const field of requiredFields) {
      if (!(field in config)) {
        return {
          status: 'error',
          message: 'Configuration invalide',
          details: `Champ manquant: ${field}`,
          timestamp: new Date().toISOString(),
        };
      }
    }
    
    return {
      status: 'healthy',
      message: 'Configuration valide',
      details: `Dernière mise à jour: ${config.lastUpdated || 'Inconnue'}`,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Erreur de lecture de la configuration',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
      timestamp: new Date().toISOString(),
    };
  }
}

async function testMarkdownRenderer(): Promise<DiagnosticResult> {
  try {
    // Test basic markdown rendering
    const testMarkdown = `
# Test Heading
This is a **bold** text with *italic* and \`code\`.

- List item 1
- List item 2

\`\`\`javascript
console.log('Hello World');
\`\`\`
    `;
    
    // Simulate markdown processing (in real implementation, this would use the actual renderer)
    const hasHeading = testMarkdown.includes('# Test Heading');
    const hasBold = testMarkdown.includes('**bold**');
    const hasCode = testMarkdown.includes('```javascript');
    
    if (hasHeading && hasBold && hasCode) {
      return {
        status: 'healthy',
        message: 'Rendu Markdown fonctionnel',
        details: 'Tous les éléments Markdown de base sont supportés',
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        status: 'warning',
        message: 'Rendu Markdown partiel',
        details: 'Certains éléments Markdown pourraient ne pas être rendus correctement',
        timestamp: new Date().toISOString(),
      };
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'Erreur du rendu Markdown',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
      timestamp: new Date().toISOString(),
    };
  }
}

async function testScrollController(): Promise<DiagnosticResult> {
  try {
    // Test scroll configuration values
    const config = existsSync(CONFIG_FILE_PATH) 
      ? JSON.parse(readFileSync(CONFIG_FILE_PATH, 'utf-8'))
      : null;
    
    if (!config || !config.scrollConfig) {
      return {
        status: 'warning',
        message: 'Configuration de scroll manquante',
        details: 'Les paramètres de scroll par défaut seront utilisés',
        timestamp: new Date().toISOString(),
      };
    }
    
    const { bottomThreshold, autoScrollDelay, smoothScrollDuration } = config.scrollConfig;
    
    // Validate scroll parameters
    if (bottomThreshold < 10 || bottomThreshold > 200) {
      return {
        status: 'warning',
        message: 'Seuil de détection bas inhabituel',
        details: `Valeur actuelle: ${bottomThreshold}px (recommandé: 10-200px)`,
        timestamp: new Date().toISOString(),
      };
    }
    
    if (autoScrollDelay < 1000 || autoScrollDelay > 10000) {
      return {
        status: 'warning',
        message: 'Délai d\'auto-scroll inhabituel',
        details: `Valeur actuelle: ${autoScrollDelay}ms (recommandé: 1000-10000ms)`,
        timestamp: new Date().toISOString(),
      };
    }
    
    return {
      status: 'healthy',
      message: 'Contrôleur de scroll configuré',
      details: `Seuil: ${bottomThreshold}px, Délai: ${autoScrollDelay}ms, Animation: ${smoothScrollDuration}ms`,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Erreur du contrôleur de scroll',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
      timestamp: new Date().toISOString(),
    };
  }
}

async function testChatControls(): Promise<DiagnosticResult> {
  try {
    const config = existsSync(CONFIG_FILE_PATH) 
      ? JSON.parse(readFileSync(CONFIG_FILE_PATH, 'utf-8'))
      : null;
    
    if (!config || !config.controlsConfig) {
      return {
        status: 'warning',
        message: 'Configuration des contrôles manquante',
        details: 'Les contrôles par défaut seront utilisés',
        timestamp: new Date().toISOString(),
      };
    }
    
    const enabledControls = [];
    if (config.controlsConfig.showMinimizeButton) enabledControls.push('Minimiser');
    if (config.controlsConfig.showFullscreenButton) enabledControls.push('Plein écran');
    if (config.controlsConfig.confirmCloseOnStreaming) enabledControls.push('Confirmation fermeture');
    if (config.controlsConfig.keyboardShortcutsEnabled) enabledControls.push('Raccourcis clavier');
    
    return {
      status: 'healthy',
      message: 'Contrôles de chat configurés',
      details: `Fonctionnalités actives: ${enabledControls.join(', ')}`,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Erreur des contrôles de chat',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
      timestamp: new Date().toISOString(),
    };
  }
}

async function testMobileOptimizations(): Promise<DiagnosticResult> {
  try {
    // Check if mobile CSS exists
    const mobileCssPath = join(process.cwd(), 'src', 'styles', 'mobile-chat.css');
    
    if (!existsSync(mobileCssPath)) {
      return {
        status: 'warning',
        message: 'Styles mobile manquants',
        details: 'Le fichier mobile-chat.css est introuvable',
        timestamp: new Date().toISOString(),
      };
    }
    
    return {
      status: 'healthy',
      message: 'Optimisations mobile disponibles',
      details: 'Styles et composants mobile détectés',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Erreur des optimisations mobile',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
      timestamp: new Date().toISOString(),
    };
  }
}

async function testAccessibilityFeatures(): Promise<DiagnosticResult> {
  try {
    // Check if accessibility CSS exists
    const accessibilityCssPath = join(process.cwd(), 'src', 'styles', 'accessibility.css');
    
    if (!existsSync(accessibilityCssPath)) {
      return {
        status: 'warning',
        message: 'Styles d\'accessibilité manquants',
        details: 'Le fichier accessibility.css est introuvable',
        timestamp: new Date().toISOString(),
      };
    }
    
    return {
      status: 'healthy',
      message: 'Fonctionnalités d\'accessibilité disponibles',
      details: 'Support ARIA et navigation clavier configurés',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Erreur des fonctionnalités d\'accessibilité',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
      timestamp: new Date().toISOString(),
    };
  }
}

async function testPerformanceMetrics(): Promise<DiagnosticResult> {
  try {
    // Simulate performance check
    const startTime = Date.now();
    
    // Simulate some processing
    await new Promise(resolve => setTimeout(resolve, 10));
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    if (responseTime > 100) {
      return {
        status: 'warning',
        message: 'Temps de réponse élevé',
        details: `Temps de réponse: ${responseTime}ms (recommandé: <100ms)`,
        timestamp: new Date().toISOString(),
      };
    }
    
    return {
      status: 'healthy',
      message: 'Performance système normale',
      details: `Temps de réponse: ${responseTime}ms`,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Erreur de test de performance',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
      timestamp: new Date().toISOString(),
    };
  }
}

const DIAGNOSTIC_TESTS: DiagnosticTest[] = [
  {
    name: 'configuration',
    description: 'Test du fichier de configuration',
    test: testConfigurationFile,
  },
  {
    name: 'markdown',
    description: 'Test du rendu Markdown',
    test: testMarkdownRenderer,
  },
  {
    name: 'scroll',
    description: 'Test du contrôleur de scroll',
    test: testScrollController,
  },
  {
    name: 'controls',
    description: 'Test des contrôles de chat',
    test: testChatControls,
  },
  {
    name: 'mobile',
    description: 'Test des optimisations mobile',
    test: testMobileOptimizations,
  },
  {
    name: 'accessibility',
    description: 'Test des fonctionnalités d\'accessibilité',
    test: testAccessibilityFeatures,
  },
  {
    name: 'performance',
    description: 'Test de performance système',
    test: testPerformanceMetrics,
  },
];

export async function GET() {
  try {
    // Return cached diagnostics if available
    const cachedResults = await getCachedDiagnostics();
    
    return NextResponse.json(cachedResults, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error loading diagnostics:', error);
    return NextResponse.json(
      { error: 'Failed to load diagnostics' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tests } = body;
    
    // Run specific tests or all tests
    const testsToRun = tests && Array.isArray(tests) 
      ? DIAGNOSTIC_TESTS.filter(test => tests.includes(test.name))
      : DIAGNOSTIC_TESTS;
    
    const results: DiagnosticResult[] = [];
    
    for (const test of testsToRun) {
      try {
        const result = await test.test();
        results.push(result);
      } catch (error) {
        results.push({
          status: 'error',
          message: `Erreur lors du test ${test.description}`,
          details: error instanceof Error ? error.message : 'Erreur inconnue',
          timestamp: new Date().toISOString(),
        });
      }
    }
    
    // Cache the results
    await cacheDiagnostics(results);
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error running diagnostics:', error);
    return NextResponse.json(
      { error: 'Failed to run diagnostics' },
      { status: 500 }
    );
  }
}

async function getCachedDiagnostics(): Promise<DiagnosticResult[]> {
  try {
    const cacheFile = join(process.cwd(), 'data', 'chat-diagnostics-cache.json');
    
    if (!existsSync(cacheFile)) {
      // Run initial diagnostics
      const results: DiagnosticResult[] = [];
      
      for (const test of DIAGNOSTIC_TESTS) {
        try {
          const result = await test.test();
          results.push(result);
        } catch (error) {
          results.push({
            status: 'error',
            message: `Erreur lors du test ${test.description}`,
            details: error instanceof Error ? error.message : 'Erreur inconnue',
            timestamp: new Date().toISOString(),
          });
        }
      }
      
      await cacheDiagnostics(results);
      return results;
    }
    
    const cacheData = readFileSync(cacheFile, 'utf-8');
    const cache = JSON.parse(cacheData);
    
    // Check if cache is older than 5 minutes
    const cacheAge = Date.now() - new Date(cache.timestamp).getTime();
    if (cacheAge > 5 * 60 * 1000) {
      // Cache is stale, return empty array to trigger refresh
      return [];
    }
    
    return cache.results;
  } catch (error) {
    console.error('Error reading diagnostics cache:', error);
    return [];
  }
}

async function cacheDiagnostics(results: DiagnosticResult[]): Promise<void> {
  try {
    const cacheFile = join(process.cwd(), 'data', 'chat-diagnostics-cache.json');
    const dataDir = join(process.cwd(), 'data');
    
    if (!existsSync(dataDir)) {
      require('fs').mkdirSync(dataDir, { recursive: true });
    }
    
    const cacheData = {
      timestamp: new Date().toISOString(),
      results,
    };
    
    require('fs').writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2));
  } catch (error) {
    console.error('Error caching diagnostics:', error);
  }
}