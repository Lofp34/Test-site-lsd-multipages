// Types pour l'intégration Gemini API

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
    cached?: boolean;
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

export interface GeminiConfig {
  model: 'gemini-2.5-flash' | 'gemini-2.5-pro';
  temperature: number;
  thinkingBudget: number;
  systemInstruction: string;
  maxTokens?: number;
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

export interface UseGeminiChatConfig {
  apiKey: string;
  systemInstruction: string;
  config?: Partial<GeminiConfig>;
  conversationId?: string;
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

export interface ErrorContext {
  sessionId: string;
  messageId?: string;
  operation: string;
  userAgent: string;
  timestamp: Date;
  retryCount: number;
}

export interface RecoveryAction {
  type: 'retry' | 'fallback' | 'manual';
  delay?: number;
  message?: string;
  action?: () => void;
}