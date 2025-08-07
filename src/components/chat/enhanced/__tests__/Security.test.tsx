/**
 * Comprehensive security tests for enhanced chat components
 * Tests XSS protection, content sanitization, and data encryption
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MarkdownRenderer from '../MarkdownRenderer';
import { 
  ChatSecurity, 
  ContentSanitizer, 
  HistoryEncryption, 
  InputValidator,
  SecurityMonitor,
  SecurityRateLimit,
  defaultSecurityConfig 
} from '@/lib/chat/security';
import { SecureChatHistory } from '@/lib/chat/secure-history';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light' })
}));

describe('Chat Security', () => {
  let chatSecurity: ChatSecurity;
  let contentSanitizer: ContentSanitizer;
  let historyEncryption: HistoryEncryption;
  let inputValidator: InputValidator;
  let securityMonitor: SecurityMonitor;
  let rateLimit: SecurityRateLimit;

  beforeEach(() => {
    chatSecurity = new ChatSecurity();
    contentSanitizer = new ContentSanitizer();
    historyEncryption = new HistoryEncryption();
    inputValidator = new InputValidator();
    securityMonitor = SecurityMonitor.getInstance();
    rateLimit = new SecurityRateLimit(5, 60000); // 5 attempts per minute
    
    // Clear security events
    securityMonitor.clearEvents();
  });

  describe('ContentSanitizer', () => {
    it('should sanitize dangerous HTML content', () => {
      const dangerousContent = `
        <script>alert('XSS')</script>
        <img src="x" onerror="alert('XSS')">
        <a href="javascript:alert('XSS')">Click me</a>
        <iframe src="http://evil.com"></iframe>
      `;

      const sanitized = contentSanitizer.sanitizeHTML(dangerousContent);

      expect(sanitized).not.toContain('<script>');
      expect(sanitized).not.toContain('onerror');
      expect(sanitized).not.toContain('javascript:');
      expect(sanitized).not.toContain('<iframe>');
    });

    it('should preserve safe HTML content', () => {
      const safeContent = `
        <h1>Safe Heading</h1>
        <p>Safe paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
        <ul>
          <li>Safe list item</li>
        </ul>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">Safe link</a>
      `;

      const sanitized = contentSanitizer.sanitizeHTML(safeContent);

      expect(sanitized).toContain('<h1>');
      expect(sanitized).toContain('<strong>');
      expect(sanitized).toContain('<em>');
      expect(sanitized).toContain('<ul>');
      expect(sanitized).toContain('<li>');
      expect(sanitized).toContain('href="https://example.com"');
    });

    it('should sanitize markdown content', () => {
      const dangerousMarkdown = `
        # Safe Heading
        
        <script>alert('XSS')</script>
        
        [Safe Link](https://example.com)
        [Dangerous Link](javascript:alert('XSS'))
        
        \`\`\`javascript
        console.log('Safe code');
        \`\`\`
      `;

      const sanitized = contentSanitizer.sanitizeMarkdown(dangerousMarkdown);

      expect(sanitized).toContain('# Safe Heading');
      expect(sanitized).toContain('[Safe Link](https://example.com)');
      expect(sanitized).toContain('console.log');
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).not.toContain('javascript:alert');
    });

    it('should validate URLs correctly', () => {
      const testCases = [
        { url: 'https://example.com', shouldBeValid: true },
        { url: 'http://example.com', shouldBeValid: true },
        { url: 'mailto:test@example.com', shouldBeValid: true },
        { url: 'tel:+1234567890', shouldBeValid: true },
        { url: 'javascript:alert("XSS")', shouldBeValid: false },
        { url: 'vbscript:msgbox("XSS")', shouldBeValid: false },
        { url: 'data:text/html,<script>alert("XSS")</script>', shouldBeValid: false },
        { url: 'ftp://example.com', shouldBeValid: false },
      ];

      testCases.forEach(({ url, shouldBeValid }) => {
        const result = contentSanitizer.validateURL(url);
        expect(result.isValid).toBe(shouldBeValid);
      });
    });

    it('should detect XSS patterns', () => {
      const xssPatterns = [
        '<script>alert("XSS")</script>',
        'javascript:alert("XSS")',
        'vbscript:msgbox("XSS")',
        '<img src="x" onerror="alert(\'XSS\')">',
        '<iframe src="javascript:alert(\'XSS\')"></iframe>',
        'data:text/html,<script>alert("XSS")</script>',
        'expression(alert("XSS"))',
        '@import url("javascript:alert(\'XSS\')")',
      ];

      xssPatterns.forEach(pattern => {
        const sanitized = contentSanitizer.sanitizeHTML(pattern);
        expect(sanitized).not.toContain('alert');
        expect(sanitized).not.toContain('javascript:');
        expect(sanitized).not.toContain('vbscript:');
      });
    });

    it('should handle content length limits', () => {
      const longContent = 'a'.repeat(100000); // 100KB content
      
      expect(() => {
        contentSanitizer.sanitizeHTML(longContent);
      }).toThrow('Content exceeds maximum length');
    });
  });

  describe('HistoryEncryption', () => {
    it('should encrypt and decrypt data correctly', () => {
      const testData = {
        messages: [
          { id: '1', content: 'Hello', role: 'user', timestamp: new Date() },
          { id: '2', content: 'Hi there!', role: 'assistant', timestamp: new Date() }
        ],
        sessionId: 'test-session'
      };

      const encrypted = historyEncryption.encrypt(testData);
      expect(encrypted).toBeTruthy();
      expect(encrypted).not.toContain('Hello');
      expect(encrypted).not.toContain('Hi there!');

      const decrypted = historyEncryption.decrypt(encrypted);
      expect(decrypted).toEqual(testData);
    });

    it('should handle encryption errors gracefully', () => {
      const invalidData = { circular: {} };
      invalidData.circular = invalidData; // Create circular reference

      expect(() => {
        historyEncryption.encrypt(invalidData);
      }).toThrow('Failed to encrypt chat history');
    });

    it('should handle decryption errors gracefully', () => {
      const invalidEncryptedData = 'invalid-encrypted-data';
      const result = historyEncryption.decrypt(invalidEncryptedData);
      expect(result).toBeNull();
    });

    it('should generate secure session keys', () => {
      const key1 = historyEncryption.generateSessionKey();
      const key2 = historyEncryption.generateSessionKey();

      expect(key1).toHaveLength(64); // 32 bytes * 2 hex chars
      expect(key2).toHaveLength(64);
      expect(key1).not.toBe(key2);
      expect(/^[0-9a-f]+$/.test(key1)).toBe(true);
    });
  });

  describe('InputValidator', () => {
    it('should validate safe input', () => {
      const safeInput = 'This is a safe message with normal text.';
      const result = inputValidator.validateInput(safeInput);

      expect(result.isValid).toBe(true);
      expect(result.sanitizedInput).toBe(safeInput);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect dangerous input patterns', () => {
      const dangerousInputs = [
        '<script>alert("XSS")</script>',
        'javascript:alert("XSS")',
        '<iframe src="evil.com"></iframe>',
        '<img onerror="alert(\'XSS\')" src="x">',
      ];

      dangerousInputs.forEach(input => {
        const result = inputValidator.validateInput(input);
        expect(result.errors.length).toBeGreaterThan(0);
        expect(result.errors[0]).toContain('dangerous content');
      });
    });

    it('should handle empty input', () => {
      const result = inputValidator.validateInput('   ');
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('cannot be empty');
    });

    it('should handle input length limits', () => {
      const longInput = 'a'.repeat(100000);
      const result = inputValidator.validateInput(longInput);
      
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('exceeds maximum length');
    });

    it('should sanitize input content', () => {
      const inputWithControlChars = 'Hello\x00\x01\x02World\n\tNormal text';
      const result = inputValidator.validateInput(inputWithControlChars);

      expect(result.sanitizedInput).not.toContain('\x00');
      expect(result.sanitizedInput).not.toContain('\x01');
      expect(result.sanitizedInput).not.toContain('\x02');
      expect(result.sanitizedInput).toContain('HelloWorld');
      expect(result.sanitizedInput).toContain('\n'); // Newlines should be preserved
      expect(result.sanitizedInput).toContain('\t'); // Tabs should be preserved
    });

    it('should validate file uploads', () => {
      // Mock File objects
      const validFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
      const invalidTypeFile = new File(['content'], 'test.exe', { type: 'application/x-executable' });
      const oversizedFile = new File(['x'.repeat(11 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });

      expect(inputValidator.validateFile(validFile).isValid).toBe(true);
      expect(inputValidator.validateFile(invalidTypeFile).isValid).toBe(false);
      expect(inputValidator.validateFile(oversizedFile).isValid).toBe(false);
    });
  });

  describe('SecurityMonitor', () => {
    it('should log security events', () => {
      securityMonitor.logSecurityEvent('test_event', 'medium', { test: 'data' });
      
      const events = securityMonitor.getRecentEvents(1);
      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('test_event');
      expect(events[0].severity).toBe('medium');
      expect(events[0].details).toEqual({ test: 'data' });
    });

    it('should limit stored events', () => {
      // Add more than 100 events
      for (let i = 0; i < 150; i++) {
        securityMonitor.logSecurityEvent(`event_${i}`, 'low', { index: i });
      }

      const events = securityMonitor.getRecentEvents(200);
      expect(events.length).toBeLessThanOrEqual(100);
    });

    it('should clear events', () => {
      securityMonitor.logSecurityEvent('test_event', 'low', {});
      expect(securityMonitor.getRecentEvents().length).toBeGreaterThan(0);
      
      securityMonitor.clearEvents();
      expect(securityMonitor.getRecentEvents()).toHaveLength(0);
    });
  });

  describe('SecurityRateLimit', () => {
    it('should allow requests within limit', () => {
      const identifier = 'test-user';
      
      for (let i = 0; i < 5; i++) {
        expect(rateLimit.isRateLimited(identifier)).toBe(false);
      }
    });

    it('should block requests exceeding limit', () => {
      const identifier = 'test-user-2';
      
      // Use up all attempts
      for (let i = 0; i < 5; i++) {
        rateLimit.isRateLimited(identifier);
      }
      
      // Next attempt should be blocked
      expect(rateLimit.isRateLimited(identifier)).toBe(true);
    });

    it('should reset rate limit', () => {
      const identifier = 'test-user-3';
      
      // Use up all attempts
      for (let i = 0; i < 5; i++) {
        rateLimit.isRateLimited(identifier);
      }
      
      expect(rateLimit.isRateLimited(identifier)).toBe(true);
      
      rateLimit.reset(identifier);
      expect(rateLimit.isRateLimited(identifier)).toBe(false);
    });

    it('should track remaining attempts', () => {
      const identifier = 'test-user-4';
      
      expect(rateLimit.getRemainingAttempts(identifier)).toBe(5);
      
      rateLimit.isRateLimited(identifier);
      expect(rateLimit.getRemainingAttempts(identifier)).toBe(4);
      
      rateLimit.isRateLimited(identifier);
      expect(rateLimit.getRemainingAttempts(identifier)).toBe(3);
    });
  });

  describe('SecureChatHistory', () => {
    let secureHistory: SecureChatHistory;

    beforeEach(() => {
      secureHistory = new SecureChatHistory();
      // Clear localStorage
      localStorage.clear();
      sessionStorage.clear();
    });

    it('should add messages securely', () => {
      const message = {
        content: 'Hello, this is a test message',
        role: 'user' as const,
        isMarkdown: false,
        renderingState: 'complete' as const
      };

      const addedMessage = secureHistory.addMessage(message);

      expect(addedMessage.id).toBeTruthy();
      expect(addedMessage.timestamp).toBeInstanceOf(Date);
      expect(addedMessage.content).toBe(message.content);
      expect(addedMessage.metadata?.securityChecked).toBe(true);
    });

    it('should sanitize dangerous content in messages', () => {
      const dangerousMessage = {
        content: '<script>alert("XSS")</script>Hello world',
        role: 'user' as const,
        isMarkdown: false,
        renderingState: 'complete' as const
      };

      const addedMessage = secureHistory.addMessage(dangerousMessage);

      expect(addedMessage.content).not.toContain('<script>');
      expect(addedMessage.content).not.toContain('alert');
      expect(addedMessage.content).toContain('Hello world');
    });

    it('should retrieve messages from current session', () => {
      const messages = [
        { content: 'Message 1', role: 'user' as const, isMarkdown: false, renderingState: 'complete' as const },
        { content: 'Message 2', role: 'assistant' as const, isMarkdown: true, renderingState: 'complete' as const }
      ];

      messages.forEach(msg => secureHistory.addMessage(msg));
      const retrievedMessages = secureHistory.getMessages();

      expect(retrievedMessages).toHaveLength(2);
      expect(retrievedMessages[0].content).toBe('Message 1');
      expect(retrievedMessages[1].content).toBe('Message 2');
    });

    it('should provide session statistics', () => {
      secureHistory.addMessage({
        content: 'User message',
        role: 'user',
        isMarkdown: false,
        renderingState: 'complete'
      });

      secureHistory.addMessage({
        content: 'Assistant message',
        role: 'assistant',
        isMarkdown: true,
        renderingState: 'complete'
      });

      const stats = secureHistory.getSessionStats();

      expect(stats.totalMessages).toBe(2);
      expect(stats.userMessages).toBe(1);
      expect(stats.assistantMessages).toBe(1);
      expect(stats.encryptionEnabled).toBe(true);
    });

    it('should export and import sessions', () => {
      secureHistory.addMessage({
        content: 'Test message for export',
        role: 'user',
        isMarkdown: false,
        renderingState: 'complete'
      });

      const exportedData = secureHistory.exportSession();
      expect(exportedData).toBeTruthy();
      expect(exportedData).not.toContain('Test message for export'); // Should be encrypted

      // Clear current session
      secureHistory.clearCurrentSession();
      expect(secureHistory.getMessages()).toHaveLength(0);

      // Import the session
      const importSuccess = secureHistory.importSession(exportedData);
      expect(importSuccess).toBe(true);

      const messages = secureHistory.getMessages();
      expect(messages).toHaveLength(1);
      expect(messages[0].content).toBe('Test message for export');
    });

    it('should clear sessions', () => {
      secureHistory.addMessage({
        content: 'Message to be cleared',
        role: 'user',
        isMarkdown: false,
        renderingState: 'complete'
      });

      expect(secureHistory.getMessages()).toHaveLength(1);

      secureHistory.clearCurrentSession();
      expect(secureHistory.getMessages()).toHaveLength(0);
    });
  });

  describe('MarkdownRenderer Security Integration', () => {
    it('should render safe content without issues', () => {
      const safeContent = '# Safe Heading\n\nThis is **safe** content with a [link](https://example.com).';

      render(
        <MarkdownRenderer
          content={safeContent}
          isStreaming={false}
          securityConfig={defaultSecurityConfig}
        />
      );

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Safe Heading');
      expect(screen.getByText('safe')).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');
    });

    it('should block dangerous content', () => {
      const dangerousContent = `
        # Heading
        <script>alert('XSS')</script>
        [Dangerous Link](javascript:alert('XSS'))
        <iframe src="http://evil.com"></iframe>
      `;

      render(
        <MarkdownRenderer
          content={dangerousContent}
          isStreaming={false}
          securityConfig={defaultSecurityConfig}
        />
      );

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Heading');
      expect(screen.queryByText('alert')).not.toBeInTheDocument();
      expect(screen.queryByText('javascript:')).not.toBeInTheDocument();
    });

    it('should show security warnings for blocked links', () => {
      const contentWithBadLink = '[Bad Link](javascript:alert("XSS"))';

      render(
        <MarkdownRenderer
          content={contentWithBadLink}
          isStreaming={false}
          securityConfig={defaultSecurityConfig}
        />
      );

      expect(screen.getByText(/lien bloqué/)).toBeInTheDocument();
    });

    it('should show external link warnings', async () => {
      const user = userEvent.setup();
      const contentWithExternalLink = '[External Link](https://external-site.com)';

      // Mock window.confirm
      const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false);

      render(
        <MarkdownRenderer
          content={contentWithExternalLink}
          isStreaming={false}
          securityConfig={defaultSecurityConfig}
        />
      );

      const link = screen.getByRole('link');
      await user.click(link);

      expect(confirmSpy).toHaveBeenCalledWith(
        expect.stringContaining('site externe: external-site.com')
      );

      confirmSpy.mockRestore();
    });

    it('should handle security processing errors gracefully', () => {
      // Mock chatSecurity to throw an error
      const originalProcessContent = chatSecurity.processContent;
      chatSecurity.processContent = jest.fn().mockImplementation(() => {
        throw new Error('Security processing failed');
      });

      const onRenderingStateChange = jest.fn();

      render(
        <MarkdownRenderer
          content="Test content"
          isStreaming={false}
          onRenderingStateChange={onRenderingStateChange}
          securityConfig={defaultSecurityConfig}
        />
      );

      expect(onRenderingStateChange).toHaveBeenCalledWith('error');

      // Restore original function
      chatSecurity.processContent = originalProcessContent;
    });
  });

  describe('Integration Tests', () => {
    it('should maintain security across component interactions', async () => {
      const user = userEvent.setup();
      const secureHistory = new SecureChatHistory();

      // Add a message with potential XSS
      const dangerousMessage = {
        content: 'Hello <script>alert("XSS")</script> world',
        role: 'user' as const,
        isMarkdown: false,
        renderingState: 'complete' as const
      };

      const addedMessage = secureHistory.addMessage(dangerousMessage);

      // Render the sanitized message
      render(
        <MarkdownRenderer
          content={addedMessage.content}
          isStreaming={false}
          securityConfig={defaultSecurityConfig}
        />
      );

      // Verify XSS content is not present
      expect(screen.queryByText('alert')).not.toBeInTheDocument();
      expect(screen.getByText(/Hello.*world/)).toBeInTheDocument();
    });

    it('should handle rate limiting in security system', () => {
      const testContent = 'Test message';

      // Process content multiple times to trigger rate limiting
      for (let i = 0; i < 15; i++) {
        try {
          chatSecurity.processContent(testContent);
        } catch (error) {
          if (error.message.includes('Rate limit exceeded')) {
            expect(i).toBeGreaterThan(5); // Should hit rate limit after some attempts
            break;
          }
        }
      }
    });
  });
});