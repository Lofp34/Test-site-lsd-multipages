/**
 * Security utilities for enhanced chat components
 * Implements XSS protection, content sanitization, and data encryption
 */

import DOMPurify from 'isomorphic-dompurify';
import CryptoJS from 'crypto-js';

export interface SecurityConfig {
  enableContentSanitization: boolean;
  enableXSSProtection: boolean;
  enableHistoryEncryption: boolean;
  enableURLValidation: boolean;
  allowedDomains: string[];
  maxContentLength: number;
  encryptionKey?: string;
}

export const defaultSecurityConfig: SecurityConfig = {
  enableContentSanitization: true,
  enableXSSProtection: true,
  enableHistoryEncryption: true,
  enableURLValidation: true,
  allowedDomains: ['laurent-serre-developpement.fr', 'github.com', 'linkedin.com'],
  maxContentLength: 50000, // 50KB max content
  encryptionKey: process.env.NEXT_PUBLIC_CHAT_ENCRYPTION_KEY || 'default-key-change-in-production'
};

/**
 * Content sanitization with enhanced security
 */
export class ContentSanitizer {
  private config: SecurityConfig;
  private purifyConfig: DOMPurify.Config;

  constructor(config: SecurityConfig = defaultSecurityConfig) {
    this.config = config;
    this.purifyConfig = this.createPurifyConfig();
  }

  private createPurifyConfig(): DOMPurify.Config {
    return {
      // Allowed HTML tags - very restrictive whitelist
      ALLOWED_TAGS: [
        // Text formatting
        'p', 'br', 'strong', 'em', 'u', 'del', 's', 'sup', 'sub',
        // Headings
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        // Lists
        'ul', 'ol', 'li',
        // Code
        'pre', 'code',
        // Tables
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        // Quotes and dividers
        'blockquote', 'hr',
        // Containers (limited)
        'div', 'span'
      ],

      // Allowed attributes - very restrictive
      ALLOWED_ATTR: [
        'class', 'id', 'data-*',
        'colspan', 'rowspan',
        'href', 'target', 'rel',
        'alt', 'title',
        'aria-*', 'role'
      ],

      // URL validation
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,

      // Security settings
      KEEP_CONTENT: true,
      RETURN_DOM: false,
      RETURN_DOM_FRAGMENT: false,
      SANITIZE_DOM: true,
      WHOLE_DOCUMENT: false,
      
      // Remove dangerous elements
      FORBID_TAGS: [
        'script', 'object', 'embed', 'link', 'style', 'meta',
        'form', 'input', 'button', 'textarea', 'select',
        'iframe', 'frame', 'frameset', 'applet'
      ],

      // Remove dangerous attributes
      FORBID_ATTR: [
        'onclick', 'onload', 'onerror', 'onmouseover', 'onfocus',
        'onblur', 'onchange', 'onsubmit', 'onreset', 'onselect',
        'onunload', 'onabort', 'onkeydown', 'onkeypress', 'onkeyup',
        'onmousedown', 'onmouseup', 'onmousemove', 'onmouseout',
        'style', 'background', 'bgcolor', 'dynsrc', 'lowsrc'
      ]
    };
  }

  /**
   * Sanitize HTML content with enhanced security
   */
  sanitizeHTML(content: string): string {
    if (!this.config.enableContentSanitization) {
      return content;
    }

    // Pre-validation
    if (content.length > this.config.maxContentLength) {
      throw new Error(`Content exceeds maximum length of ${this.config.maxContentLength} characters`);
    }

    // Basic XSS pattern detection
    if (this.config.enableXSSProtection && this.detectXSSPatterns(content)) {
      console.warn('Potential XSS patterns detected in content');
      // Continue with sanitization rather than blocking
    }

    // Sanitize with DOMPurify
    let sanitized = DOMPurify.sanitize(content, this.purifyConfig);

    // Additional custom sanitization
    sanitized = this.customSanitization(sanitized);

    return sanitized;
  }

  /**
   * Detect common XSS patterns
   */
  private detectXSSPatterns(content: string): boolean {
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /vbscript:/gi,
      /data:text\/html/gi,
      /on\w+\s*=/gi,
      /<iframe/gi,
      /<object/gi,
      /<embed/gi,
      /<link/gi,
      /<meta/gi,
      /expression\s*\(/gi,
      /url\s*\(/gi,
      /@import/gi
    ];

    return xssPatterns.some(pattern => pattern.test(content));
  }

  /**
   * Custom sanitization rules
   */
  private customSanitization(content: string): string {
    // Remove any remaining script-like content
    content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Remove data URLs except for safe image formats
    content = content.replace(/data:(?!image\/(png|jpg|jpeg|gif|webp|svg\+xml))[^;]*;[^"']*/gi, '');
    
    // Remove CSS expressions
    content = content.replace(/expression\s*\([^)]*\)/gi, '');
    
    // Remove import statements
    content = content.replace(/@import[^;]*;/gi, '');
    
    return content;
  }

  /**
   * Sanitize markdown content before rendering
   */
  sanitizeMarkdown(markdown: string): string {
    if (!this.config.enableContentSanitization) {
      return markdown;
    }

    // Length validation
    if (markdown.length > this.config.maxContentLength) {
      throw new Error(`Markdown content exceeds maximum length of ${this.config.maxContentLength} characters`);
    }

    // Remove potentially dangerous markdown patterns
    let sanitized = markdown;

    // Remove HTML script tags in markdown
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Remove dangerous HTML tags that might be embedded
    sanitized = sanitized.replace(/<(iframe|object|embed|link|meta|style|form)[^>]*>/gi, '');
    
    // Sanitize inline HTML
    sanitized = sanitized.replace(/<[^>]+>/g, (match) => {
      return this.sanitizeHTML(match);
    });

    return sanitized;
  }

  /**
   * Validate and sanitize URLs
   */
  validateURL(url: string): { isValid: boolean; sanitizedURL?: string; reason?: string } {
    if (!this.config.enableURLValidation) {
      return { isValid: true, sanitizedURL: url };
    }

    try {
      const urlObj = new URL(url);
      
      // Check protocol
      if (!['http:', 'https:', 'mailto:', 'tel:'].includes(urlObj.protocol)) {
        return { isValid: false, reason: 'Invalid protocol' };
      }

      // Check for dangerous patterns
      if (urlObj.href.includes('javascript:') || 
          urlObj.href.includes('vbscript:') ||
          urlObj.href.includes('data:text/html')) {
        return { isValid: false, reason: 'Dangerous URL pattern' };
      }

      // Domain validation for external links
      if (urlObj.protocol === 'https:' || urlObj.protocol === 'http:') {
        const isAllowedDomain = this.config.allowedDomains.some(domain => 
          urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
        );

        if (!isAllowedDomain) {
          // Allow but mark as external
          return { 
            isValid: true, 
            sanitizedURL: url,
            reason: 'External domain - will open with warning'
          };
        }
      }

      return { isValid: true, sanitizedURL: url };
    } catch (error) {
      return { isValid: false, reason: 'Malformed URL' };
    }
  }
}

/**
 * History encryption for local storage
 */
export class HistoryEncryption {
  private config: SecurityConfig;
  private encryptionKey: string;

  constructor(config: SecurityConfig = defaultSecurityConfig) {
    this.config = config;
    this.encryptionKey = config.encryptionKey || 'default-key';
  }

  /**
   * Encrypt chat history data
   */
  encrypt(data: any): string {
    if (!this.config.enableHistoryEncryption) {
      return JSON.stringify(data);
    }

    try {
      const jsonString = JSON.stringify(data);
      const encrypted = CryptoJS.AES.encrypt(jsonString, this.encryptionKey).toString();
      return encrypted;
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Failed to encrypt chat history');
    }
  }

  /**
   * Decrypt chat history data
   */
  decrypt(encryptedData: string): any {
    if (!this.config.enableHistoryEncryption) {
      try {
        return JSON.parse(encryptedData);
      } catch {
        return null;
      }
    }

    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
      const jsonString = decrypted.toString(CryptoJS.enc.Utf8);
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Decryption failed:', error);
      return null;
    }
  }

  /**
   * Generate a secure session key
   */
  generateSessionKey(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
}

/**
 * Input validation and sanitization
 */
export class InputValidator {
  private config: SecurityConfig;

  constructor(config: SecurityConfig = defaultSecurityConfig) {
    this.config = config;
  }

  /**
   * Validate user input before processing
   */
  validateInput(input: string): { isValid: boolean; sanitizedInput?: string; errors: string[] } {
    const errors: string[] = [];
    let sanitizedInput = input;

    // Length validation
    if (input.length > this.config.maxContentLength) {
      errors.push(`Input exceeds maximum length of ${this.config.maxContentLength} characters`);
      return { isValid: false, errors };
    }

    // Empty input check
    if (!input.trim()) {
      errors.push('Input cannot be empty');
      return { isValid: false, errors };
    }

    // XSS pattern detection
    if (this.config.enableXSSProtection) {
      const xssPatterns = [
        /<script/gi,
        /javascript:/gi,
        /vbscript:/gi,
        /on\w+\s*=/gi,
        /<iframe/gi,
        /data:text\/html/gi
      ];

      const hasXSS = xssPatterns.some(pattern => pattern.test(input));
      if (hasXSS) {
        errors.push('Input contains potentially dangerous content');
        // Continue with sanitization
      }
    }

    // Basic sanitization
    sanitizedInput = this.sanitizeInput(sanitizedInput);

    return {
      isValid: errors.length === 0,
      sanitizedInput,
      errors
    };
  }

  /**
   * Sanitize user input
   */
  private sanitizeInput(input: string): string {
    // Remove null bytes
    let sanitized = input.replace(/\0/g, '');
    
    // Normalize whitespace
    sanitized = sanitized.replace(/\s+/g, ' ').trim();
    
    // Remove control characters except newlines and tabs
    sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
    
    return sanitized;
  }

  /**
   * Validate file uploads (if applicable)
   */
  validateFile(file: File): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // File size validation (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      errors.push('File size exceeds 10MB limit');
    }

    // File type validation
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'text/plain', 'text/markdown',
      'application/pdf'
    ];

    if (!allowedTypes.includes(file.type)) {
      errors.push('File type not allowed');
    }

    // File name validation
    const dangerousExtensions = ['.exe', '.bat', '.cmd', '.scr', '.pif', '.com'];
    const hasExt = dangerousExtensions.some(ext => 
      file.name.toLowerCase().endsWith(ext)
    );

    if (hasExt) {
      errors.push('File extension not allowed');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

/**
 * Security monitoring and logging
 */
export class SecurityMonitor {
  private static instance: SecurityMonitor;
  private securityEvents: Array<{
    timestamp: Date;
    type: string;
    severity: 'low' | 'medium' | 'high';
    details: any;
  }> = [];

  static getInstance(): SecurityMonitor {
    if (!SecurityMonitor.instance) {
      SecurityMonitor.instance = new SecurityMonitor();
    }
    return SecurityMonitor.instance;
  }

  /**
   * Log security event
   */
  logSecurityEvent(
    type: string, 
    severity: 'low' | 'medium' | 'high', 
    details: any
  ): void {
    const event = {
      timestamp: new Date(),
      type,
      severity,
      details
    };

    this.securityEvents.push(event);

    // Keep only last 100 events
    if (this.securityEvents.length > 100) {
      this.securityEvents.shift();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Security Event [${severity.toUpperCase()}]:`, type, details);
    }

    // In production, you might want to send to monitoring service
    if (process.env.NODE_ENV === 'production' && severity === 'high') {
      this.reportHighSeverityEvent(event);
    }
  }

  /**
   * Report high severity events
   */
  private reportHighSeverityEvent(event: any): void {
    // In a real application, send to monitoring service
    // For now, just log to console
    console.error('HIGH SEVERITY SECURITY EVENT:', event);
  }

  /**
   * Get recent security events
   */
  getRecentEvents(limit: number = 10): any[] {
    return this.securityEvents
      .slice(-limit)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Clear security events
   */
  clearEvents(): void {
    this.securityEvents = [];
  }
}

/**
 * Rate limiting for security
 */
export class SecurityRateLimit {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 10, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  /**
   * Check if action is rate limited
   */
  isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);

    if (!record || now > record.resetTime) {
      // Reset or create new record
      this.attempts.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs
      });
      return false;
    }

    if (record.count >= this.maxAttempts) {
      return true;
    }

    record.count++;
    return false;
  }

  /**
   * Reset rate limit for identifier
   */
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }

  /**
   * Get remaining attempts
   */
  getRemainingAttempts(identifier: string): number {
    const record = this.attempts.get(identifier);
    if (!record || Date.now() > record.resetTime) {
      return this.maxAttempts;
    }
    return Math.max(0, this.maxAttempts - record.count);
  }
}

/**
 * Main security manager
 */
export class ChatSecurity {
  private contentSanitizer: ContentSanitizer;
  private historyEncryption: HistoryEncryption;
  private inputValidator: InputValidator;
  private securityMonitor: SecurityMonitor;
  private rateLimit: SecurityRateLimit;

  constructor(config: SecurityConfig = defaultSecurityConfig) {
    this.contentSanitizer = new ContentSanitizer(config);
    this.historyEncryption = new HistoryEncryption(config);
    this.inputValidator = new InputValidator(config);
    this.securityMonitor = SecurityMonitor.getInstance();
    this.rateLimit = new SecurityRateLimit();
  }

  /**
   * Secure content processing pipeline
   */
  processContent(content: string, type: 'markdown' | 'html' = 'markdown'): string {
    try {
      // Rate limiting check
      const clientId = this.getClientIdentifier();
      if (this.rateLimit.isRateLimited(clientId)) {
        throw new Error('Rate limit exceeded');
      }

      // Input validation
      const validation = this.inputValidator.validateInput(content);
      if (!validation.isValid) {
        this.securityMonitor.logSecurityEvent(
          'input_validation_failed',
          'medium',
          { errors: validation.errors, content: content.substring(0, 100) }
        );
        throw new Error(`Input validation failed: ${validation.errors.join(', ')}`);
      }

      // Content sanitization
      const sanitized = type === 'markdown' 
        ? this.contentSanitizer.sanitizeMarkdown(validation.sanitizedInput!)
        : this.contentSanitizer.sanitizeHTML(validation.sanitizedInput!);

      return sanitized;
    } catch (error) {
      this.securityMonitor.logSecurityEvent(
        'content_processing_error',
        'high',
        { error: error.message, content: content.substring(0, 100) }
      );
      throw error;
    }
  }

  /**
   * Secure history storage
   */
  secureStoreHistory(data: any): string {
    try {
      return this.historyEncryption.encrypt(data);
    } catch (error) {
      this.securityMonitor.logSecurityEvent(
        'history_encryption_failed',
        'high',
        { error: error.message }
      );
      throw error;
    }
  }

  /**
   * Secure history retrieval
   */
  secureRetrieveHistory(encryptedData: string): any {
    try {
      return this.historyEncryption.decrypt(encryptedData);
    } catch (error) {
      this.securityMonitor.logSecurityEvent(
        'history_decryption_failed',
        'medium',
        { error: error.message }
      );
      return null;
    }
  }

  /**
   * Validate URL with security checks
   */
  validateURL(url: string): { isValid: boolean; sanitizedURL?: string; reason?: string } {
    const result = this.contentSanitizer.validateURL(url);
    
    if (!result.isValid) {
      this.securityMonitor.logSecurityEvent(
        'url_validation_failed',
        'medium',
        { url, reason: result.reason }
      );
    }

    return result;
  }

  /**
   * Get client identifier for rate limiting
   */
  private getClientIdentifier(): string {
    // In a real application, use IP address or user ID
    // For now, use a simple session-based identifier
    if (typeof window !== 'undefined') {
      let clientId = sessionStorage.getItem('chat_client_id');
      if (!clientId) {
        clientId = Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('chat_client_id', clientId);
      }
      return clientId;
    }
    return 'server';
  }

  /**
   * Get security status
   */
  getSecurityStatus(): {
    recentEvents: any[];
    rateLimitStatus: { remaining: number; resetTime?: number };
  } {
    const clientId = this.getClientIdentifier();
    return {
      recentEvents: this.securityMonitor.getRecentEvents(5),
      rateLimitStatus: {
        remaining: this.rateLimit.getRemainingAttempts(clientId)
      }
    };
  }
}

// Export singleton instance
export const chatSecurity = new ChatSecurity();