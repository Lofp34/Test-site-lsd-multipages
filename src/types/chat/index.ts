// Types pour le système de chat Gemini

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  files?: UploadedFile[];
  metadata?: {
    tokens?: number;
    processingTime?: number;
    confidence?: number;
  };
}

export interface UploadedFile {
  id: string;
  name: string;
  uri: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
}

export interface ChatConfiguration {
  // Configuration Gemini
  gemini: {
    model: 'gemini-2.5-flash';
    apiKey: string;
    temperature: number;
    thinkingBudget: number;
    maxTokens?: number;
  };
  
  // Instructions système Laurent Serre
  systemInstruction: string;
  
  // Paramètres UI
  ui: {
    theme: 'laurent-serre';
    position: 'bottom-right' | 'bottom-left' | 'center';
    maxHeight: string;
    maxWidth: string;
    animationDuration: number;
  };
  
  // Limites et sécurité
  limits: {
    maxMessagesPerSession: number;
    maxFileSize: number;
    allowedFileTypes: string[];
    rateLimitPerMinute: number;
  };
}

export interface ChatWidgetProps {
  position?: 'bottom-right' | 'bottom-left' | 'center';
  theme?: 'light' | 'dark' | 'auto';
  initialMessage?: string;
  expertiseContext?: string;
}

export interface ChatWidgetState {
  isOpen: boolean;
  isLoading: boolean;
  hasError: boolean;
  conversationId: string;
  messageCount: number;
}

export interface ChatInterfaceProps {
  onSendMessage: (message: string, files?: File[]) => Promise<void>;
  messages: ChatMessage[];
  isStreaming: boolean;
  streamingMessage?: string;
}

export interface FileUploaderProps {
  onFileSelect: (files: File[]) => void;
  acceptedTypes: string[];
  maxFileSize: number;
  maxFiles: number;
}

export enum ChatErrorType {
  API_UNAVAILABLE = 'api_unavailable',
  RATE_LIMIT = 'rate_limit',
  FILE_TOO_LARGE = 'file_too_large',
  UNSUPPORTED_FILE = 'unsupported_file',
  NETWORK_ERROR = 'network_error',
  QUOTA_EXCEEDED = 'quota_exceeded'
}

export interface ChatError {
  type: ChatErrorType;
  message: string;
  userMessage: string;
  retryable: boolean;
  retryAfter?: number;
}

export interface ChatAnalytics {
  session: {
    id: string;
    startTime: Date;
    endTime?: Date;
    messageCount: number;
    userAgent: string;
    referrer?: string;
  };
  
  messages: {
    userMessages: number;
    assistantMessages: number;
    averageResponseTime: number;
    totalTokensUsed: number;
  };
  
  files: {
    totalUploaded: number;
    types: Record<string, number>;
    totalSize: number;
  };
  
  engagement: {
    sessionDuration: number;
    bounceRate: boolean;
    conversionIntent: 'high' | 'medium' | 'low';
    topicsDiscussed: string[];
  };
  
  errors: {
    apiErrors: number;
    uploadErrors: number;
    networkErrors: number;
  };
}