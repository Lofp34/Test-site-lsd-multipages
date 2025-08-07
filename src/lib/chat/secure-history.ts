/**
 * Secure chat history management with encryption and validation
 */

import { chatSecurity, SecurityConfig, defaultSecurityConfig } from './security';

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isMarkdown: boolean;
  renderingState: 'pending' | 'rendering' | 'complete' | 'error';
  metadata?: {
    hasCode: boolean;
    hasTables: boolean;
    hasLinks: boolean;
    renderTime: number;
    securityChecked: boolean;
    sanitized: boolean;
  };
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  lastActivity: Date;
  metadata: {
    totalMessages: number;
    securityEvents: number;
    encryptionEnabled: boolean;
  };
}

export class SecureChatHistory {
  private storageKey = 'secure_chat_history';
  private sessionKey = 'current_chat_session';
  private maxHistorySize = 100; // Maximum messages to keep
  private maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours
  private securityConfig: SecurityConfig;

  constructor(securityConfig: SecurityConfig = defaultSecurityConfig) {
    this.securityConfig = securityConfig;
    this.cleanupExpiredSessions();
  }

  /**
   * Add a message to the current session
   */
  addMessage(message: Omit<ChatMessage, 'id' | 'timestamp' | 'metadata'>): ChatMessage {
    try {
      // Create secure message with metadata
      const secureMessage: ChatMessage = {
        ...message,
        id: this.generateSecureId(),
        timestamp: new Date(),
        metadata: {
          hasCode: message.content.includes('```') || message.content.includes('`'),
          hasTables: message.content.includes('|'),
          hasLinks: message.content.includes('http') || message.content.includes('['),
          renderTime: 0,
          securityChecked: true,
          sanitized: true
        }
      };

      // Validate and sanitize content
      if (message.role === 'user') {
        secureMessage.content = chatSecurity.processContent(message.content, 'markdown');
      }

      // Get or create current session
      const session = this.getCurrentSession();
      session.messages.push(secureMessage);
      session.lastActivity = new Date();
      session.metadata.totalMessages = session.messages.length;

      // Trim history if too large
      if (session.messages.length > this.maxHistorySize) {
        session.messages = session.messages.slice(-this.maxHistorySize);
      }

      // Save session securely
      this.saveSession(session);

      return secureMessage;
    } catch (error) {
      console.error('Failed to add message to secure history:', error);
      throw new Error('Failed to save message securely');
    }
  }

  /**
   * Get current chat session
   */
  getCurrentSession(): ChatSession {
    try {
      const sessionId = this.getSessionId();
      const sessions = this.loadAllSessions();
      
      let session = sessions.find(s => s.id === sessionId);
      
      if (!session || this.isSessionExpired(session)) {
        // Create new session
        session = this.createNewSession();
        sessions.push(session);
        this.saveAllSessions(sessions);
        this.setSessionId(session.id);
      }

      return session;
    } catch (error) {
      console.error('Failed to get current session:', error);
      return this.createNewSession();
    }
  }

  /**
   * Get all messages from current session
   */
  getMessages(): ChatMessage[] {
    try {
      const session = this.getCurrentSession();
      return session.messages.map(message => ({
        ...message,
        timestamp: new Date(message.timestamp) // Ensure Date objects
      }));
    } catch (error) {
      console.error('Failed to get messages:', error);
      return [];
    }
  }

  /**
   * Clear current session
   */
  clearCurrentSession(): void {
    try {
      const sessionId = this.getSessionId();
      const sessions = this.loadAllSessions();
      const filteredSessions = sessions.filter(s => s.id !== sessionId);
      
      this.saveAllSessions(filteredSessions);
      this.removeSessionId();
    } catch (error) {
      console.error('Failed to clear current session:', error);
    }
  }

  /**
   * Clear all history
   */
  clearAllHistory(): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.sessionKey);
      }
    } catch (error) {
      console.error('Failed to clear all history:', error);
    }
  }

  /**
   * Get session statistics
   */
  getSessionStats(): {
    totalMessages: number;
    userMessages: number;
    assistantMessages: number;
    sessionAge: number;
    securityEvents: number;
    encryptionEnabled: boolean;
  } {
    try {
      const session = this.getCurrentSession();
      const userMessages = session.messages.filter(m => m.role === 'user').length;
      const assistantMessages = session.messages.filter(m => m.role === 'assistant').length;
      const sessionAge = Date.now() - session.createdAt.getTime();

      return {
        totalMessages: session.messages.length,
        userMessages,
        assistantMessages,
        sessionAge,
        securityEvents: session.metadata.securityEvents,
        encryptionEnabled: session.metadata.encryptionEnabled
      };
    } catch (error) {
      console.error('Failed to get session stats:', error);
      return {
        totalMessages: 0,
        userMessages: 0,
        assistantMessages: 0,
        sessionAge: 0,
        securityEvents: 0,
        encryptionEnabled: false
      };
    }
  }

  /**
   * Export session data (encrypted)
   */
  exportSession(): string {
    try {
      const session = this.getCurrentSession();
      return chatSecurity.secureStoreHistory(session);
    } catch (error) {
      console.error('Failed to export session:', error);
      throw new Error('Failed to export session data');
    }
  }

  /**
   * Import session data
   */
  importSession(encryptedData: string): boolean {
    try {
      const sessionData = chatSecurity.secureRetrieveHistory(encryptedData);
      if (!sessionData || !this.validateSessionData(sessionData)) {
        return false;
      }

      // Create new session with imported data
      const session: ChatSession = {
        ...sessionData,
        id: this.generateSecureId(), // New ID for imported session
        createdAt: new Date(sessionData.createdAt),
        lastActivity: new Date(),
        messages: sessionData.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      };

      const sessions = this.loadAllSessions();
      sessions.push(session);
      this.saveAllSessions(sessions);
      this.setSessionId(session.id);

      return true;
    } catch (error) {
      console.error('Failed to import session:', error);
      return false;
    }
  }

  /**
   * Private methods
   */

  private createNewSession(): ChatSession {
    return {
      id: this.generateSecureId(),
      messages: [],
      createdAt: new Date(),
      lastActivity: new Date(),
      metadata: {
        totalMessages: 0,
        securityEvents: 0,
        encryptionEnabled: this.securityConfig.enableHistoryEncryption
      }
    };
  }

  private generateSecureId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${random}`;
  }

  private getSessionId(): string {
    if (typeof window === 'undefined') return '';
    return sessionStorage.getItem(this.sessionKey) || '';
  }

  private setSessionId(sessionId: string): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(this.sessionKey, sessionId);
    }
  }

  private removeSessionId(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(this.sessionKey);
    }
  }

  private loadAllSessions(): ChatSession[] {
    try {
      if (typeof window === 'undefined') return [];
      
      const encryptedData = localStorage.getItem(this.storageKey);
      if (!encryptedData) return [];

      const sessions = chatSecurity.secureRetrieveHistory(encryptedData);
      return Array.isArray(sessions) ? sessions : [];
    } catch (error) {
      console.error('Failed to load sessions:', error);
      return [];
    }
  }

  private saveAllSessions(sessions: ChatSession[]): void {
    try {
      if (typeof window === 'undefined') return;
      
      const encryptedData = chatSecurity.secureStoreHistory(sessions);
      localStorage.setItem(this.storageKey, encryptedData);
    } catch (error) {
      console.error('Failed to save sessions:', error);
    }
  }

  private saveSession(session: ChatSession): void {
    try {
      const sessions = this.loadAllSessions();
      const index = sessions.findIndex(s => s.id === session.id);
      
      if (index >= 0) {
        sessions[index] = session;
      } else {
        sessions.push(session);
      }

      this.saveAllSessions(sessions);
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  }

  private isSessionExpired(session: ChatSession): boolean {
    const age = Date.now() - new Date(session.lastActivity).getTime();
    return age > this.maxSessionAge;
  }

  private cleanupExpiredSessions(): void {
    try {
      const sessions = this.loadAllSessions();
      const validSessions = sessions.filter(session => !this.isSessionExpired(session));
      
      if (validSessions.length !== sessions.length) {
        this.saveAllSessions(validSessions);
      }
    } catch (error) {
      console.error('Failed to cleanup expired sessions:', error);
    }
  }

  private validateSessionData(data: any): boolean {
    return (
      data &&
      typeof data === 'object' &&
      Array.isArray(data.messages) &&
      typeof data.id === 'string' &&
      data.createdAt &&
      data.lastActivity &&
      data.metadata
    );
  }
}

// Export singleton instance
export const secureChatHistory = new SecureChatHistory();