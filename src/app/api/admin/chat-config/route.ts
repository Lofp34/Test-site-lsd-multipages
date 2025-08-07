import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const CONFIG_FILE_PATH = join(process.cwd(), 'data', 'chat-enhancements-config.json');

interface ChatEnhancementConfig {
  markdownEnabled: boolean;
  scrollControlEnabled: boolean;
  chatControlsEnabled: boolean;
  mobileOptimizationsEnabled: boolean;
  accessibilityFeaturesEnabled: boolean;
  
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
  
  theme: {
    primaryColor: string;
    accentColor: string;
    borderRadius: number;
    fontSize: 'small' | 'medium' | 'large';
  };
  
  performance: {
    enableLazyLoading: boolean;
    maxHistoryLength: number;
    enableMemoryOptimization: boolean;
    enableBatteryOptimization: boolean;
  };
  
  lastUpdated: string;
  version: string;
}

const DEFAULT_CONFIG: ChatEnhancementConfig = {
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
  
  lastUpdated: new Date().toISOString(),
  version: '1.0.0',
};

function ensureConfigFile(): ChatEnhancementConfig {
  try {
    if (!existsSync(CONFIG_FILE_PATH)) {
      // Create data directory if it doesn't exist
      const dataDir = join(process.cwd(), 'data');
      if (!existsSync(dataDir)) {
        require('fs').mkdirSync(dataDir, { recursive: true });
      }
      
      writeFileSync(CONFIG_FILE_PATH, JSON.stringify(DEFAULT_CONFIG, null, 2));
      return DEFAULT_CONFIG;
    }
    
    const configData = readFileSync(CONFIG_FILE_PATH, 'utf-8');
    return JSON.parse(configData);
  } catch (error) {
    console.error('Error reading config file:', error);
    return DEFAULT_CONFIG;
  }
}

function saveConfig(config: ChatEnhancementConfig): void {
  try {
    const updatedConfig = {
      ...config,
      lastUpdated: new Date().toISOString(),
    };
    
    writeFileSync(CONFIG_FILE_PATH, JSON.stringify(updatedConfig, null, 2));
  } catch (error) {
    console.error('Error saving config file:', error);
    throw new Error('Failed to save configuration');
  }
}

export async function GET() {
  try {
    const config = ensureConfigFile();
    
    return NextResponse.json(config, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error loading chat configuration:', error);
    return NextResponse.json(
      { error: 'Failed to load configuration' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the configuration structure
    const requiredFields = [
      'markdownEnabled',
      'scrollControlEnabled',
      'chatControlsEnabled',
      'mobileOptimizationsEnabled',
      'accessibilityFeaturesEnabled',
      'scrollConfig',
      'markdownConfig',
      'controlsConfig',
      'theme',
      'performance',
    ];
    
    for (const field of requiredFields) {
      if (!(field in body)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Validate nested objects
    if (!body.scrollConfig.bottomThreshold || !body.scrollConfig.autoScrollDelay) {
      return NextResponse.json(
        { error: 'Invalid scroll configuration' },
        { status: 400 }
      );
    }
    
    if (!body.theme.primaryColor || !body.theme.accentColor) {
      return NextResponse.json(
        { error: 'Invalid theme configuration' },
        { status: 400 }
      );
    }
    
    // Save the configuration
    const configToSave: ChatEnhancementConfig = {
      ...body,
      version: '1.0.0',
    };
    
    saveConfig(configToSave);
    
    // Log configuration change for audit
    console.log('Chat enhancement configuration updated:', {
      timestamp: new Date().toISOString(),
      changes: Object.keys(body),
    });
    
    return NextResponse.json({
      success: true,
      message: 'Configuration saved successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error saving chat configuration:', error);
    return NextResponse.json(
      { error: 'Failed to save configuration' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    // Reset to default configuration
    saveConfig(DEFAULT_CONFIG);
    
    console.log('Chat enhancement configuration reset to defaults:', {
      timestamp: new Date().toISOString(),
    });
    
    return NextResponse.json({
      success: true,
      message: 'Configuration reset to defaults',
      config: DEFAULT_CONFIG,
    });
  } catch (error) {
    console.error('Error resetting chat configuration:', error);
    return NextResponse.json(
      { error: 'Failed to reset configuration' },
      { status: 500 }
    );
  }
}