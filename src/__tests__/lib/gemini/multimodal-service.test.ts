/**
 * Tests pour le service multimodal Gemini
 */

import { MultimodalService } from '@/lib/gemini/multimodal-service';
import { UploadedFile, ChatMessage } from '@/lib/gemini/types';

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock de l'API Gemini
vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn().mockImplementation(() => ({}))
}));

describe('MultimodalService', () => {
  let multimodalService: MultimodalService;
  beforeEach(() => {
    multimodalService = new MultimodalService('test-api-key');
  });

  describe('createMultimodalContent', () => {
    it('should create content with text only', () => {
      const message = { text: 'Hello world' };
      
      const result = multimodalService.createMultimodalContent(message);
      
      expect(result.hasFiles).toBe(false);
      expect(result.fileCount).toBe(0);
      expect(result.content).toEqual({
        role: 'user',
        parts: [{ text: 'Hello world' }]
      });
    });

    it('should create content with text and files (URI)', () => {
      const files: UploadedFile[] = [
        {
          id: 'file1',
          name: 'test.jpg',
          uri: 'https://example.com/file1',
          mimeType: 'image/jpeg',
          size: 1024,
          uploadedAt: new Date()
        }
      ];

      const message = { text: 'Analyze this image', files };
      
      const result = multimodalService.createMultimodalContent(message);
      
      expect(result.hasFiles).toBe(true);
      expect(result.fileCount).toBe(1);
      expect(result.content).toEqual({
        role: 'user',
        parts: [
          { text: 'Analyze this image' },
          {
            fileData: {
              mimeType: 'image/jpeg',
              fileUri: 'https://example.com/file1'
            }
          }
        ]
      });
    });

    it('should create content with text and base64 files', () => {
      const files: UploadedFile[] = [
        {
          id: 'file1',
          name: 'test.jpg',
          uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD',
          mimeType: 'image/jpeg',
          size: 1024,
          uploadedAt: new Date()
        }
      ];

      const message = { text: 'Analyze this image', files };
      
      const result = multimodalService.createMultimodalContent(message);
      
      expect(result.hasFiles).toBe(true);
      expect(result.fileCount).toBe(1);
      expect(result.content).toEqual({
        role: 'user',
        parts: [
          { text: 'Analyze this image' },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: '/9j/4AAQSkZJRgABAQEAYABgAAD'
            }
          }
        ]
      });
    });

    it('should create content with files only', () => {
      const files: UploadedFile[] = [
        {
          id: 'file1',
          name: 'test.jpg',
          uri: 'https://example.com/file1',
          mimeType: 'image/jpeg',
          size: 1024,
          uploadedAt: new Date()
        }
      ];

      const message = { text: '', files };
      
      const result = multimodalService.createMultimodalContent(message);
      
      expect(result.hasFiles).toBe(true);
      expect(result.fileCount).toBe(1);
      expect(result.content).toEqual({
        role: 'user',
        parts: [
          {
            fileData: {
              mimeType: 'image/jpeg',
              fileUri: 'https://example.com/file1'
            }
          }
        ]
      });
    });

    it('should handle multiple files', () => {
      const files: UploadedFile[] = [
        {
          id: 'file1',
          name: 'test1.jpg',
          uri: 'https://example.com/file1',
          mimeType: 'image/jpeg',
          size: 1024,
          uploadedAt: new Date()
        },
        {
          id: 'file2',
          name: 'test2.mp4',
          uri: 'https://example.com/file2',
          mimeType: 'video/mp4',
          size: 2048,
          uploadedAt: new Date()
        }
      ];

      const message = { text: 'Analyze these files', files };
      
      const result = multimodalService.createMultimodalContent(message);
      
      expect(result.hasFiles).toBe(true);
      expect(result.fileCount).toBe(2);
      expect(result.content.parts).toHaveLength(3); // text + 2 files
    });
  });

  describe('validateMultimodalMessage', () => {
    it('should validate message with text', () => {
      const message = { text: 'Hello world' };
      
      const result = multimodalService.validateMultimodalMessage(message);
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should validate message with files', () => {
      const files: UploadedFile[] = [
        {
          id: 'file1',
          name: 'test.jpg',
          uri: 'https://example.com/file1',
          mimeType: 'image/jpeg',
          size: 1024,
          uploadedAt: new Date()
        }
      ];

      const message = { text: '', files };
      
      const result = multimodalService.validateMultimodalMessage(message);
      
      expect(result.isValid).toBe(true);
    });

    it('should reject empty message', () => {
      const message = { text: '' };
      
      const result = multimodalService.validateMultimodalMessage(message);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('doit contenir du texte ou des fichiers');
    });

    it('should reject file without URI', () => {
      const files: UploadedFile[] = [
        {
          id: 'file1',
          name: 'test.jpg',
          uri: '',
          mimeType: 'image/jpeg',
          size: 1024,
          uploadedAt: new Date()
        }
      ];

      const message = { text: '', files };
      
      const result = multimodalService.validateMultimodalMessage(message);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('URI ou type MIME manquant');
    });
  });

  describe('createChatMessage', () => {
    it('should create a user message', () => {
      const message = multimodalService.createChatMessage('Hello', undefined, 'user');
      
      expect(message.role).toBe('user');
      expect(message.content).toBe('Hello');
      expect(message.files).toEqual([]);
      expect(message.timestamp).toBeInstanceOf(Date);
      expect(message.id).toMatch(/^msg_\d+_[a-z0-9]+$/);
    });

    it('should create an assistant message', () => {
      const message = multimodalService.createChatMessage('Hello', undefined, 'assistant');
      
      expect(message.role).toBe('assistant');
      expect(message.content).toBe('Hello');
    });

    it('should create message with files', () => {
      const files: UploadedFile[] = [
        {
          id: 'file1',
          name: 'test.jpg',
          uri: 'https://example.com/file1',
          mimeType: 'image/jpeg',
          size: 1024,
          uploadedAt: new Date()
        }
      ];

      const message = multimodalService.createChatMessage('Analyze this', files);
      
      expect(message.files).toEqual(files);
    });
  });

  describe('extractFileInfo', () => {
    it('should extract info from message without files', () => {
      const message: ChatMessage = {
        id: 'msg1',
        role: 'user',
        content: 'Hello',
        timestamp: new Date()
      };

      const info = multimodalService.extractFileInfo(message);
      
      expect(info.hasFiles).toBe(false);
      expect(info.fileCount).toBe(0);
      expect(info.fileTypes).toEqual([]);
      expect(info.totalSize).toBe(0);
    });

    it('should extract info from message with files', () => {
      const files: UploadedFile[] = [
        {
          id: 'file1',
          name: 'test1.jpg',
          uri: 'https://example.com/file1',
          mimeType: 'image/jpeg',
          size: 1024,
          uploadedAt: new Date()
        },
        {
          id: 'file2',
          name: 'test2.mp4',
          uri: 'https://example.com/file2',
          mimeType: 'video/mp4',
          size: 2048,
          uploadedAt: new Date()
        }
      ];

      const message: ChatMessage = {
        id: 'msg1',
        role: 'user',
        content: 'Analyze these',
        timestamp: new Date(),
        files
      };

      const info = multimodalService.extractFileInfo(message);
      
      expect(info.hasFiles).toBe(true);
      expect(info.fileCount).toBe(2);
      expect(info.fileTypes).toEqual(['image/jpeg', 'video/mp4']);
      expect(info.totalSize).toBe(3072);
    });
  });

  describe('formatMessageForDisplay', () => {
    it('should format message with files', () => {
      const files: UploadedFile[] = [
        {
          id: 'file1',
          name: 'test.jpg',
          uri: 'https://example.com/file1',
          mimeType: 'image/jpeg',
          size: 1024,
          uploadedAt: new Date()
        }
      ];

      const message: ChatMessage = {
        id: 'msg1',
        role: 'user',
        content: 'Look at this',
        timestamp: new Date(),
        files
      };

      const formatted = multimodalService.formatMessageForDisplay(message);
      
      expect(formatted.text).toBe('Look at this');
      expect(formatted.files).toHaveLength(1);
      expect(formatted.files[0].name).toBe('test.jpg');
      expect(formatted.files[0].type).toBe('Image');
      expect(formatted.files[0].size).toBe('1 KB');
      expect(formatted.files[0].preview).toBe('https://example.com/file1');
    });
  });

  describe('optimizeHistory', () => {
    it('should keep recent messages unchanged', () => {
      const messages: ChatMessage[] = [
        {
          id: 'msg1',
          role: 'user',
          content: 'Hello',
          timestamp: new Date(),
          files: []
        }
      ];

      const optimized = multimodalService.optimizeHistory(messages, 5);
      
      expect(optimized).toEqual(messages);
    });

    it('should remove files from old messages', () => {
      const files: UploadedFile[] = [
        {
          id: 'file1',
          name: 'test.jpg',
          uri: 'https://example.com/file1',
          mimeType: 'image/jpeg',
          size: 1024,
          uploadedAt: new Date()
        }
      ];

      const messages: ChatMessage[] = Array.from({ length: 25 }, (_, i) => ({
        id: `msg${i}`,
        role: i % 2 === 0 ? 'user' : 'assistant',
        content: `Message ${i}`,
        timestamp: new Date(),
        files: i < 5 ? files : []
      })) as ChatMessage[];

      const optimized = multimodalService.optimizeHistory(messages, 20);
      
      expect(optimized).toHaveLength(25);
      
      // Les 5 premiers messages (anciens) ne devraient plus avoir de fichiers pour les messages user
      optimized.slice(0, 5).forEach((msg, i) => {
        if (msg.role === 'user') {
          expect(msg.files).toEqual([]);
        }
      });
      
      // Les 20 derniers messages devraient garder leurs fichiers
      optimized.slice(-20).forEach((msg, i) => {
        const originalIndex = i + 5;
        if (originalIndex < 5 && msg.role === 'assistant') {
          expect(msg.files).toEqual(files);
        }
      });
    });
  });
});