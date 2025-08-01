/**
 * Tests for the consolidated audit-complete API route
 */

import { NextRequest } from 'next/server';
import { POST, GET } from '@/app/api/audit-complete/route';

// Mock the dependencies
jest.mock('@/lib/vercel/usage-monitor');
jest.mock('@/lib/audit/task-queue');
jest.mock('@/lib/audit/cache-strategy');
jest.mock('@/lib/audit/link-scanner');
jest.mock('@/lib/audit/link-validator');
jest.mock('@/lib/audit/auto-corrector');
jest.mock('@/lib/audit/alert-manager');
jest.mock('@/lib/audit/config');

describe('/api/audit-complete', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock environment variables
    process.env.SENDGRID_API_KEY = 'test-key';
    process.env.SENDGRID_FROM_EMAIL = 'test@example.com';
    process.env.SENDGRID_FROM_NAME = 'Test';
    process.env.ADMIN_EMAIL = 'admin@example.com';
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-key';
  });

  describe('POST /api/audit-complete', () => {
    it('should execute consolidated audit successfully', async () => {
      // Mock successful execution
      const mockUsageMonitor = {
        getCurrentUsage: jest.fn().mockResolvedValue({
          functionInvocations: 100,
          computeHours: 0.5,
          percentageOfLimit: 10,
          projectedMonthly: 1000,
          timestamp: new Date(),
        }),
        checkLimits: jest.fn().mockResolvedValue([]),
        sendUsageAlert: jest.fn().mockResolvedValue(undefined),
      };

      const mockTaskQueue = {
        processBatch: jest.fn().mockResolvedValue({
          batchId: 'test-batch',
          totalTasks: 5,
          completedTasks: 5,
          failedTasks: 0,
          results: [],
          executionTime: 1000,
          averageTaskTime: 200,
        }),
      };

      const mockCacheStrategy = {
        getLinkResultsBatch: jest.fn().mockReturnValue({
          cached: [],
          missing: ['https://example.com'],
        }),
        setLinkResultsBatch: jest.fn(),
        invalidate: jest.fn(),
        getStats: jest.fn().mockReturnValue({
          totalHits: 10,
          totalMisses: 5,
          hitRate: 0.67,
        }),
      };

      // Mock the imports
      require('@/lib/vercel/usage-monitor').VercelUsageMonitor.mockImplementation(() => mockUsageMonitor);
      require('@/lib/audit/task-queue').TaskQueue.mockImplementation(() => mockTaskQueue);
      require('@/lib/audit/cache-strategy').CacheStrategy.mockImplementation(() => mockCacheStrategy);
      require('@/lib/audit/config').validateConfig.mockImplementation(() => {});

      const request = new NextRequest('http://localhost:3000/api/audit-complete', {
        method: 'POST',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.summary).toBeDefined();
      expect(data.resourceUsage).toBeDefined();
      expect(data.executionTime).toBeGreaterThan(0);
    });

    it('should handle execution timeout gracefully', async () => {
      // Mock timeout scenario
      const mockUsageMonitor = {
        getCurrentUsage: jest.fn().mockResolvedValue({
          functionInvocations: 100,
          computeHours: 0.5,
          percentageOfLimit: 10,
          projectedMonthly: 1000,
          timestamp: new Date(),
        }),
      };

      // Mock slow operations that would cause timeout
      const mockTaskQueue = {
        processBatch: jest.fn().mockImplementation(() => 
          new Promise(resolve => setTimeout(resolve, 35000)) // 35 seconds - exceeds 30s limit
        ),
      };

      require('@/lib/vercel/usage-monitor').VercelUsageMonitor.mockImplementation(() => mockUsageMonitor);
      require('@/lib/audit/task-queue').TaskQueue.mockImplementation(() => mockTaskQueue);
      require('@/lib/audit/config').validateConfig.mockImplementation(() => {});

      const request = new NextRequest('http://localhost:3000/api/audit-complete', {
        method: 'POST',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.errors).toContain(expect.stringContaining('timeout'));
    });

    it('should handle configuration validation errors', async () => {
      // Mock configuration error
      require('@/lib/audit/config').validateConfig.mockImplementation(() => {
        throw new Error('Missing required environment variables: SENDGRID_API_KEY');
      });

      const request = new NextRequest('http://localhost:3000/api/audit-complete', {
        method: 'POST',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.errors).toContain(expect.stringContaining('Missing required environment variables'));
    });

    it('should track resource usage correctly', async () => {
      const initialMemory = process.memoryUsage().heapUsed;
      const initialCpu = process.cpuUsage().user;

      const mockUsageMonitor = {
        getCurrentUsage: jest.fn()
          .mockResolvedValueOnce({ // Initial call
            functionInvocations: 100,
            computeHours: 0.5,
            percentageOfLimit: 10,
            projectedMonthly: 1000,
            timestamp: new Date(),
          })
          .mockResolvedValueOnce({ // Final call
            functionInvocations: 101,
            computeHours: 0.51,
            percentageOfLimit: 10.1,
            projectedMonthly: 1010,
            timestamp: new Date(),
          }),
        checkLimits: jest.fn().mockResolvedValue([]),
      };

      require('@/lib/vercel/usage-monitor').VercelUsageMonitor.mockImplementation(() => mockUsageMonitor);
      require('@/lib/audit/config').validateConfig.mockImplementation(() => {});

      const request = new NextRequest('http://localhost:3000/api/audit-complete', {
        method: 'POST',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.resourceUsage).toBeDefined();
      expect(data.resourceUsage.memoryUsed).toBeGreaterThan(0);
      expect(data.resourceUsage.cpuTime).toBeGreaterThanOrEqual(0);
      expect(data.resourceUsage.vercelUsage).toBeDefined();
      expect(data.resourceUsage.vercelUsage.increase).toBeDefined();
    });

    it('should respect batch processing limits', async () => {
      const mockTaskQueue = {
        processBatch: jest.fn().mockResolvedValue({
          batchId: 'test-batch',
          totalTasks: 10, // Exactly the batch size
          completedTasks: 10,
          failedTasks: 0,
          results: [],
          executionTime: 1000,
          averageTaskTime: 100,
        }),
      };

      const mockCacheStrategy = {
        getLinkResultsBatch: jest.fn().mockReturnValue({
          cached: [],
          missing: Array.from({ length: 10 }, (_, i) => `https://example${i}.com`),
        }),
        setLinkResultsBatch: jest.fn(),
        getStats: jest.fn().mockReturnValue({
          totalHits: 0,
          totalMisses: 10,
          hitRate: 0,
        }),
      };

      require('@/lib/audit/task-queue').TaskQueue.mockImplementation(() => mockTaskQueue);
      require('@/lib/audit/cache-strategy').CacheStrategy.mockImplementation(() => mockCacheStrategy);
      require('@/lib/audit/config').validateConfig.mockImplementation(() => {});

      const request = new NextRequest('http://localhost:3000/api/audit-complete', {
        method: 'POST',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(mockTaskQueue.processBatch).toHaveBeenCalledWith(10); // AUDIT_CONFIG.batchSize
      expect(data.summary.tasksProcessed).toBe(10);
    });

    it('should limit corrections to maximum allowed', async () => {
      const mockAutoCorrector = {
        suggestCorrection: jest.fn().mockResolvedValue({
          confidence: 0.9,
          originalUrl: 'https://broken.com',
          suggestedUrl: 'https://fixed.com',
        }),
        applyCorrection: jest.fn().mockResolvedValue(true),
      };

      require('@/lib/audit/auto-corrector').AutoCorrector.mockImplementation(() => mockAutoCorrector);
      require('@/lib/audit/config').validateConfig.mockImplementation(() => {});

      const request = new NextRequest('http://localhost:3000/api/audit-complete', {
        method: 'POST',
      });

      const response = await POST(request);
      const data = await response.json();

      // Should not exceed the maximum of 5 corrections per execution
      expect(data.summary.correctionsApplied).toBeLessThanOrEqual(5);
    });
  });

  describe('GET /api/audit-complete', () => {
    it('should return method not allowed for GET requests', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.error).toContain('Method not allowed');
    });
  });

  describe('Execution phases', () => {
    it('should execute all phases in correct order', async () => {
      const executionOrder: string[] = [];

      // Mock all components to track execution order
      const mockLinkScanner = {
        scanAllLinks: jest.fn().mockImplementation(() => {
          executionOrder.push('link-scan');
          return Promise.resolve({ links: [], summary: {} });
        }),
      };

      const mockTaskQueue = {
        processBatch: jest.fn().mockImplementation(() => {
          executionOrder.push('task-queue');
          return Promise.resolve({
            batchId: 'test',
            totalTasks: 0,
            completedTasks: 0,
            failedTasks: 0,
            results: [],
            executionTime: 100,
            averageTaskTime: 0,
          });
        }),
      };

      const mockAutoCorrector = {
        suggestCorrection: jest.fn().mockImplementation(() => {
          executionOrder.push('corrections');
          return Promise.resolve(null);
        }),
      };

      const mockAlertManager = {
        sendAlert: jest.fn().mockImplementation(() => {
          executionOrder.push('alerts');
          return Promise.resolve();
        }),
      };

      const mockUsageMonitor = {
        getCurrentUsage: jest.fn().mockImplementation(() => {
          executionOrder.push('monitoring');
          return Promise.resolve({
            functionInvocations: 100,
            computeHours: 0.5,
            percentageOfLimit: 10,
            projectedMonthly: 1000,
            timestamp: new Date(),
          });
        }),
        checkLimits: jest.fn().mockResolvedValue([]),
      };

      require('@/lib/audit/link-scanner').LinkScanner.mockImplementation(() => mockLinkScanner);
      require('@/lib/audit/task-queue').TaskQueue.mockImplementation(() => mockTaskQueue);
      require('@/lib/audit/auto-corrector').AutoCorrector.mockImplementation(() => mockAutoCorrector);
      require('@/lib/audit/alert-manager').AlertManager.mockImplementation(() => mockAlertManager);
      require('@/lib/vercel/usage-monitor').VercelUsageMonitor.mockImplementation(() => mockUsageMonitor);
      require('@/lib/audit/config').validateConfig.mockImplementation(() => {});

      const request = new NextRequest('http://localhost:3000/api/audit-complete', {
        method: 'POST',
      });

      await POST(request);

      // Verify execution order
      expect(executionOrder).toEqual([
        'monitoring', // Initial usage check
        'link-scan',  // Phase 1: Link audit
        'task-queue', // Phase 2: Task queue
        // corrections phase may not execute if no broken links
        // alerts phase may not execute if no critical issues
        'monitoring', // Phase 5: Final monitoring
      ]);
    });
  });
});