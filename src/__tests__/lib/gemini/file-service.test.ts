/**
 * Tests pour le service de gestion des fichiers Gemini
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FileService, FileErrorCode } from '@/lib/gemini/file-service';

// Mock de l'API Gemini
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    files: {
      upload: vi.fn()
    }
  }))
}));

describe('FileService', () => {
  let fileService: FileService;

  beforeEach(() => {
    fileService = new FileService('test-api-key');
  });

  describe('validateFile', () => {
    it('should validate a correct image file', () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      Object.defineProperty(file, 'size', { value: 1024 * 1024 }); // 1MB

      const result = fileService.validateFile(file);

      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject file that is too large', () => {
      const file = new File(['test'], 'large.jpg', { type: 'image/jpeg' });
      Object.defineProperty(file, 'size', { value: 15 * 1024 * 1024 }); // 15MB

      const result = fileService.validateFile(file);

      expect(result.isValid).toBe(false);
      expect(result.errorCode).toBe(FileErrorCode.FILE_TOO_LARGE);
      expect(result.error).toContain('trop volumineux');
    });

    it('should reject unsupported file type', () => {
      const file = new File(['test'], 'document.pdf', { type: 'application/pdf' });
      Object.defineProperty(file, 'size', { value: 1024 }); // 1KB

      const result = fileService.validateFile(file);

      expect(result.isValid).toBe(false);
      expect(result.errorCode).toBe(FileErrorCode.UNSUPPORTED_TYPE);
      expect(result.error).toContain('Type de fichier non supporté');
    });

    it('should reject empty file', () => {
      const file = new File([''], 'empty.jpg', { type: 'image/jpeg' });
      Object.defineProperty(file, 'size', { value: 0 });

      const result = fileService.validateFile(file);

      expect(result.isValid).toBe(false);
      expect(result.errorCode).toBe(FileErrorCode.INVALID_FILE);
    });

    it('should validate video file', () => {
      const file = new File(['test'], 'video.mp4', { type: 'video/mp4' });
      Object.defineProperty(file, 'size', { value: 5 * 1024 * 1024 }); // 5MB

      const result = fileService.validateFile(file);

      expect(result.isValid).toBe(true);
    });

    it('should validate audio file', () => {
      const file = new File(['test'], 'audio.mp3', { type: 'audio/mpeg' });
      Object.defineProperty(file, 'size', { value: 2 * 1024 * 1024 }); // 2MB

      const result = fileService.validateFile(file);

      expect(result.isValid).toBe(true);
    });
  });

  describe('uploadFile', () => {
    it('should upload a valid file successfully', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      Object.defineProperty(file, 'size', { value: 1024 });

      const result = await fileService.uploadFile(file);

      expect(result).toEqual({
        id: expect.stringMatching(/^file_\d+_[a-z0-9]+$/),
        name: 'test.jpg',
        uri: expect.stringMatching(/^data:image\/jpeg;base64,/),
        mimeType: 'image/jpeg',
        size: 1024,
        uploadedAt: expect.any(Date)
      });
    });

    it('should throw error for invalid file', async () => {
      const file = new File([''], 'empty.jpg', { type: 'image/jpeg' });
      Object.defineProperty(file, 'size', { value: 0 });

      await expect(fileService.uploadFile(file)).rejects.toThrow('Fichier invalide ou vide');
    });

    it('should handle file reading error', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      Object.defineProperty(file, 'size', { value: 1024 });

      // Mock FileReader to simulate error
      const originalFileReader = global.FileReader;
      global.FileReader = vi.fn(() => ({
        readAsDataURL: vi.fn(function() {
          setTimeout(() => this.onerror && this.onerror(new Error('Read error')), 0);
        }),
        onerror: null,
        onload: null,
        result: null
      })) as any;

      await expect(fileService.uploadFile(file)).rejects.toThrow('Échec de l\'upload');

      global.FileReader = originalFileReader;
    });
  });

  describe('uploadFiles', () => {
    it('should upload multiple valid files', async () => {
      const files = [
        new File(['test1'], 'test1.jpg', { type: 'image/jpeg' }),
        new File(['test2'], 'test2.png', { type: 'image/png' })
      ];

      files.forEach((file, index) => {
        Object.defineProperty(file, 'size', { value: 1024 * (index + 1) });
      });

      const results = await fileService.uploadFiles(files);

      expect(results).toHaveLength(2);
      expect(results[0].name).toBe('test1.jpg');
      expect(results[1].name).toBe('test2.png');
      expect(results[0].mimeType).toBe('image/jpeg');
      expect(results[1].mimeType).toBe('image/png');
    });
  });

  describe('utility methods', () => {
    it('should check if file type is supported', () => {
      expect(fileService.isFileTypeSupported('image/jpeg')).toBe(true);
      expect(fileService.isFileTypeSupported('video/mp4')).toBe(true);
      expect(fileService.isFileTypeSupported('audio/mpeg')).toBe(true);
      expect(fileService.isFileTypeSupported('application/pdf')).toBe(false);
    });

    it('should return supported file types for input', () => {
      const types = fileService.getSupportedFileTypes();
      expect(types).toBe('image/*,video/*,audio/*');
    });

    it('should return file limits', () => {
      const limits = fileService.getFileLimits();
      
      expect(limits.maxFileSize).toBe(10 * 1024 * 1024);
      expect(limits.maxFileSizeFormatted).toBe('10 MB');
      expect(limits.supportedTypesForInput).toBe('image/*,video/*,audio/*');
      expect(limits.supportedTypes).toContain('image/jpeg');
    });

    it('should validate multiple files', () => {
      const validFile = new File(['test'], 'valid.jpg', { type: 'image/jpeg' });
      Object.defineProperty(validFile, 'size', { value: 1024 });

      const invalidFile = new File(['test'], 'invalid.pdf', { type: 'application/pdf' });
      Object.defineProperty(invalidFile, 'size', { value: 1024 });

      const result = fileService.validateFiles([validFile, invalidFile]);

      expect(result.valid).toHaveLength(1);
      expect(result.invalid).toHaveLength(1);
      expect(result.valid[0]).toBe(validFile);
      expect(result.invalid[0].file).toBe(invalidFile);
    });
  });
});