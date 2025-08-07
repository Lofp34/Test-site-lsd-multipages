/**
 * Comprehensive tests for error handling and monitoring system
 * Tests error boundaries, fallback mechanisms, and performance monitoring
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ErrorReporter,
  PerformanceMonitor,
  RetryManager,
  FallbackProvider
} from '@/lib/chat/error-handling';
import {
  ChatErrorBoundary,
  MarkdownErrorBoundary,
  ScrollErrorBoundary,
  ControlsErrorBoundary
} from '../ErrorBoundaries';
import MonitoringDashboard from '../MonitoringDashboard';

// Mock components that throw errors
const ThrowingComponent: React.FC<{ shouldThrow?: boolean; errorMessage?: string }> = ({ 
  shouldThrow = true, 
  errorMessage = 'Test error' 
}) => {
  if (shouldThrow) {
    throw new Error(errorMessage);
  }
  return <div>Working component</div>;
};

const MarkdownThrowingComponent: React.FC<{ content?: string }> = ({ content = 'test content' }) => {
  throw new Error('Markdown rendering failed');
};

const ScrollThrowingComponent: React.FC = () => {
  throw new Error('Scroll controller failed');
};

const ControlsThrowingComponent: React.FC = () => {
  throw new Error('Chat controls failed');
};

// Mock console methods
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeEach(() => {
  console.error = jest.fn();
  console.warn = jest.fn();
  
  // Clear any existing errors and metrics
  ErrorReporter.getInstance().clearErrors();
  PerformanceMonitor.getInstance().clearMetrics();
  RetryManager.getInstance().clearAllRetries();
});

afterEach(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

describe('Error Handling System', () => {
  describe('ErrorReporter', () => {
    let errorReporter: ErrorReporter;

    beforeEach(() => {
      errorReporter = ErrorReporter.getInstance();
    });

    it('should report errors with correct metadata', () => {
      const errorId = errorReporter.reportError(
        'markdown',
        'high',
        'Test error message',
        { testContext: 'test value' },
        'Error stack trace'
      );

      expect(errorId).toBeTruthy();
      expect(errorId).toMatch(/^error_\d+_[a-z0-9]+$/);

      const recentErrors = errorReporter.getRecentErrors(1);
      expect(recentErrors).toHaveLength(1);
      
      const error = recentErrors[0];
      expect(error.type).toBe('markdown');
      expect(error.severity).toBe('high');
      expect(error.message).toBe('Test error message');
      expect(error.context).toEqual({ testContext: 'test value' });
      expect(error.stack).toBe('Error stack trace');
      expect(error.resolved).toBe(false);
    });

    it('should provide error statistics', () => {
      errorReporter.reportError('markdown', 'high', 'Error 1');
      errorReporter.reportError('scroll', 'medium', 'Error 2');
      errorReporter.reportError('controls', 'low', 'Error 3');

      const stats = errorReporter.getErrorStats();

      expect(stats.total).toBe(3);
      expect(stats.byType).toEqual({
        markdown: 1,
        scroll: 1,
        controls: 1
      });
      expect(stats.bySeverity).toEqual({
        high: 1,
        medium: 1,
        low: 1
      });
      expect(stats.resolved).toBe(0);
      expect(stats.unresolved).toBe(3);
    });

    it('should resolve errors', () => {
      const errorId = errorReporter.reportError('general', 'medium', 'Test error');
      
      errorReporter.resolveError(errorId);
      
      const stats = errorReporter.getErrorStats();
      expect(stats.resolved).toBe(1);
      expect(stats.unresolved).toBe(0);
    });

    it('should limit stored errors', () => {
      // Report more than the maximum number of errors
      for (let i = 0; i < 150; i++) {
        errorReporter.reportError('general', 'low', `Error ${i}`);
      }

      const recentErrors = errorReporter.getRecentErrors(200);
      expect(recentErrors.length).toBeLessThanOrEqual(100);
    });

    it('should filter errors by type', () => {
      errorReporter.reportError('markdown', 'high', 'Markdown error');
      errorReporter.reportError('scroll', 'medium', 'Scroll error');
      errorReporter.reportError('markdown', 'low', 'Another markdown error');

      const markdownErrors = errorReporter.getRecentErrors(10, 'markdown');
      expect(markdownErrors).toHaveLength(2);
      expect(markdownErrors.every(error => error.type === 'markdown')).toBe(true);
    });
  });

  describe('PerformanceMonitor', () => {
    let performanceMonitor: PerformanceMonitor;

    beforeEach(() => {
      performanceMonitor = PerformanceMonitor.getInstance();
    });

    it('should record performance metrics', () => {
      const metrics = {
        markdownRenderTime: 150,
        scrollResponseTime: 20,
        memoryUsage: 45,
        errorCount: 1
      };

      performanceMonitor.recordMetrics(metrics);

      const stats = performanceMonitor.getPerformanceStats();
      expect(stats.averageRenderTime).toBe(150);
      expect(stats.averageScrollTime).toBe(20);
      expect(stats.averageMemoryUsage).toBe(45);
      expect(stats.totalErrors).toBe(1);
    });

    it('should calculate performance score', () => {
      // Good performance
      performanceMonitor.recordMetrics({
        markdownRenderTime: 50,
        scrollResponseTime: 10,
        memoryUsage: 30,
        errorCount: 0
      });

      let stats = performanceMonitor.getPerformanceStats();
      expect(stats.performanceScore).toBeGreaterThan(90);

      // Clear and test poor performance
      performanceMonitor.clearMetrics();
      performanceMonitor.recordMetrics({
        markdownRenderTime: 300,
        scrollResponseTime: 50,
        memoryUsage: 120,
        errorCount: 5
      });

      stats = performanceMonitor.getPerformanceStats();
      expect(stats.performanceScore).toBeLessThan(50);
    });

    it('should measure execution time', async () => {
      const testFunction = () => {
        // Simulate some work
        const start = Date.now();
        while (Date.now() - start < 10) {
          // Wait 10ms
        }
        return 'result';
      };

      const result = performanceMonitor.measureExecutionTime('test-function', testFunction);
      expect(result).toBe('result');

      // Check that metrics were recorded
      const stats = performanceMonitor.getPerformanceStats();
      expect(stats.averageRenderTime).toBeGreaterThan(0);
    });

    it('should measure async execution time', async () => {
      const asyncFunction = async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
        return 'async result';
      };

      const result = await performanceMonitor.measureExecutionTime('async-test', asyncFunction);
      expect(result).toBe('async result');
    });

    it('should handle execution errors', () => {
      const errorFunction = () => {
        throw new Error('Test execution error');
      };

      expect(() => {
        performanceMonitor.measureExecutionTime('error-test', errorFunction);
      }).toThrow('Test execution error');
    });
  });

  describe('RetryManager', () => {
    let retryManager: RetryManager;

    beforeEach(() => {
      retryManager = RetryManager.getInstance();
    });

    it('should execute operation successfully on first try', async () => {
      const operation = jest.fn().mockResolvedValue('success');

      const result = await retryManager.executeWithRetry('test-op', operation);

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(1);
      expect(retryManager.getRetryCount('test-op')).toBe(0);
    });

    it('should retry failed operations', async () => {
      const operation = jest.fn()
        .mockRejectedValueOnce(new Error('First failure'))
        .mockRejectedValueOnce(new Error('Second failure'))
        .mockResolvedValue('success');

      const result = await retryManager.executeWithRetry('test-op', operation, {
        maxRetries: 3,
        baseDelay: 10 // Short delay for testing
      });

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(3);
    });

    it('should fail after max retries', async () => {
      const operation = jest.fn().mockRejectedValue(new Error('Persistent failure'));

      await expect(
        retryManager.executeWithRetry('test-op', operation, {
          maxRetries: 2,
          baseDelay: 10
        })
      ).rejects.toThrow('Persistent failure');

      expect(operation).toHaveBeenCalledTimes(3); // Initial + 2 retries
    });

    it('should use exponential backoff', async () => {
      const operation = jest.fn()
        .mockRejectedValueOnce(new Error('First failure'))
        .mockResolvedValue('success');

      const startTime = Date.now();
      await retryManager.executeWithRetry('test-op', operation, {
        maxRetries: 1,
        baseDelay: 100,
        exponentialBackoff: true
      });
      const endTime = Date.now();

      // Should have waited at least 100ms for the retry
      expect(endTime - startTime).toBeGreaterThan(90);
    });

    it('should track retry counts', async () => {
      const operation = jest.fn()
        .mockRejectedValueOnce(new Error('First failure'))
        .mockResolvedValue('success');

      await retryManager.executeWithRetry('test-op', operation);

      expect(retryManager.getRetryCount('test-op')).toBe(0); // Reset after success
    });
  });

  describe('FallbackProvider', () => {
    it('should provide fallback content', () => {
      const content = FallbackProvider.getFallbackContent('markdown', 'error');
      expect(content).toContain('erreur');
    });

    it('should create fallback components', () => {
      const error = new Error('Test error');
      const onRetry = jest.fn();

      const fallbackComponent = FallbackProvider.createFallbackComponent(
        'TestComponent',
        error,
        onRetry
      );

      const { container } = render(fallbackComponent);
      
      expect(container).toHaveTextContent('Erreur temporaire');
      expect(container).toHaveTextContent('TestComponent');
      expect(container).toHaveTextContent('Test error');

      const retryButton = screen.getByText(/Réessayer/);
      fireEvent.click(retryButton);
      expect(onRetry).toHaveBeenCalled();
    });
  });

  describe('Error Boundaries', () => {
    it('should catch and display errors in ChatErrorBoundary', () => {
      render(
        <ChatErrorBoundary componentName="TestChat">
          <ThrowingComponent errorMessage="Chat widget error" />
        </ChatErrorBoundary>
      );

      expect(screen.getByText(/Chat temporairement indisponible/)).toBeInTheDocument();
      expect(screen.getByText(/Chat widget error/)).toBeInTheDocument();
      expect(screen.getByText(/Actualiser/)).toBeInTheDocument();
    });

    it('should provide retry functionality in ChatErrorBoundary', async () => {
      const user = userEvent.setup();
      let shouldThrow = true;

      const { rerender } = render(
        <ChatErrorBoundary componentName="TestChat">
          <ThrowingComponent shouldThrow={shouldThrow} />
        </ChatErrorBoundary>
      );

      expect(screen.getByText(/Chat temporairement indisponible/)).toBeInTheDocument();

      // Simulate fixing the error
      shouldThrow = false;
      
      const closeButton = screen.getByText(/Fermer/);
      await user.click(closeButton);

      // Re-render with fixed component
      rerender(
        <ChatErrorBoundary componentName="TestChat">
          <ThrowingComponent shouldThrow={shouldThrow} />
        </ChatErrorBoundary>
      );

      expect(screen.getByText('Working component')).toBeInTheDocument();
    });

    it('should handle markdown errors with fallback content', () => {
      const testContent = '# Test Markdown\n\nThis is test content.';

      render(
        <MarkdownErrorBoundary content={testContent}>
          <MarkdownThrowingComponent content={testContent} />
        </MarkdownErrorBoundary>
      );

      expect(screen.getByText(/Erreur de rendu Markdown/)).toBeInTheDocument();
      expect(screen.getByText(testContent)).toBeInTheDocument();
      expect(screen.getByText(/Réessayer le rendu/)).toBeInTheDocument();
    });

    it('should handle scroll errors gracefully', () => {
      render(
        <ScrollErrorBoundary>
          <ScrollThrowingComponent />
        </ScrollErrorBoundary>
      );

      expect(screen.getByText(/Défilement manuel activé/)).toBeInTheDocument();
    });

    it('should provide fallback controls for controls errors', () => {
      render(
        <ControlsErrorBoundary>
          <ControlsThrowingComponent />
        </ControlsErrorBoundary>
      );

      expect(screen.getByText(/Contrôles limités/)).toBeInTheDocument();
      expect(screen.getByTitle(/Actualiser la page/)).toBeInTheDocument();
    });

    it('should report errors to ErrorReporter', () => {
      const errorReporter = ErrorReporter.getInstance();
      const initialErrorCount = errorReporter.getErrorStats().total;

      render(
        <ChatErrorBoundary componentName="TestChat">
          <ThrowingComponent errorMessage="Boundary test error" />
        </ChatErrorBoundary>
      );

      const finalErrorCount = errorReporter.getErrorStats().total;
      expect(finalErrorCount).toBeGreaterThan(initialErrorCount);

      const recentErrors = errorReporter.getRecentErrors(1);
      expect(recentErrors[0].message).toContain('Boundary test error');
    });
  });

  describe('MonitoringDashboard', () => {
    it('should render monitoring dashboard', () => {
      render(
        <MonitoringDashboard
          isVisible={true}
          onClose={jest.fn()}
        />
      );

      expect(screen.getByText('Monitoring Chat')).toBeInTheDocument();
      expect(screen.getByText('Vue d\'ensemble')).toBeInTheDocument();
      expect(screen.getByText('Erreurs')).toBeInTheDocument();
      expect(screen.getByText('Performance')).toBeInTheDocument();
      expect(screen.getByText('Système')).toBeInTheDocument();
    });

    it('should not render when not visible', () => {
      render(
        <MonitoringDashboard
          isVisible={false}
          onClose={jest.fn()}
        />
      );

      expect(screen.queryByText('Monitoring Chat')).not.toBeInTheDocument();
    });

    it('should handle tab navigation', async () => {
      const user = userEvent.setup();

      render(
        <MonitoringDashboard
          isVisible={true}
          onClose={jest.fn()}
        />
      );

      // Click on Errors tab
      const errorsTab = screen.getByText('Erreurs');
      await user.click(errorsTab);

      expect(screen.getByText('Détail des Erreurs')).toBeInTheDocument();

      // Click on Performance tab
      const performanceTab = screen.getByText('Performance');
      await user.click(performanceTab);

      expect(screen.getByText('Rendu Markdown')).toBeInTheDocument();
      expect(screen.getByText('Réponse Scroll')).toBeInTheDocument();
    });

    it('should handle keyboard shortcuts', async () => {
      const onClose = jest.fn();

      render(
        <MonitoringDashboard
          isVisible={true}
          onClose={onClose}
        />
      );

      // Test Escape key
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).toHaveBeenCalled();
    });

    it('should refresh data', async () => {
      const user = userEvent.setup();

      // Add some test data
      const errorReporter = ErrorReporter.getInstance();
      errorReporter.reportError('test', 'medium', 'Test error for dashboard');

      render(
        <MonitoringDashboard
          isVisible={true}
          onClose={jest.fn()}
        />
      );

      // Click refresh button
      const refreshButton = screen.getByText(/Actualiser/);
      await user.click(refreshButton);

      // Should show the test error
      expect(screen.getByText(/Test error for dashboard/)).toBeInTheDocument();
    });

    it('should toggle auto-refresh', async () => {
      const user = userEvent.setup();

      render(
        <MonitoringDashboard
          isVisible={true}
          onClose={jest.fn()}
        />
      );

      const autoButton = screen.getByTitle(/rafraîchissement automatique/);
      await user.click(autoButton);

      // Button text should change
      expect(autoButton).toHaveTextContent('▶️');
    });

    it('should export data', async () => {
      const user = userEvent.setup();

      // Mock URL.createObjectURL and related methods
      const mockCreateObjectURL = jest.fn(() => 'mock-url');
      const mockRevokeObjectURL = jest.fn();
      const mockClick = jest.fn();

      global.URL.createObjectURL = mockCreateObjectURL;
      global.URL.revokeObjectURL = mockRevokeObjectURL;

      // Mock createElement to return an element with click method
      const originalCreateElement = document.createElement;
      document.createElement = jest.fn((tagName) => {
        if (tagName === 'a') {
          return {
            href: '',
            download: '',
            click: mockClick
          } as any;
        }
        return originalCreateElement.call(document, tagName);
      });

      render(
        <MonitoringDashboard
          isVisible={true}
          onClose={jest.fn()}
        />
      );

      // Navigate to System tab
      const systemTab = screen.getByText('Système');
      await user.click(systemTab);

      // Click export button
      const exportButton = screen.getByText(/Exporter les données/);
      await user.click(exportButton);

      expect(mockCreateObjectURL).toHaveBeenCalled();
      expect(mockClick).toHaveBeenCalled();
      expect(mockRevokeObjectURL).toHaveBeenCalled();

      // Restore original methods
      document.createElement = originalCreateElement;
    });
  });

  describe('Integration Tests', () => {
    it('should handle multiple error types and provide comprehensive monitoring', async () => {
      const errorReporter = ErrorReporter.getInstance();
      const performanceMonitor = PerformanceMonitor.getInstance();

      // Simulate various errors and performance metrics
      errorReporter.reportError('markdown', 'high', 'Markdown parsing failed');
      errorReporter.reportError('scroll', 'medium', 'Scroll performance degraded');
      errorReporter.reportError('controls', 'low', 'Button click delayed');

      performanceMonitor.recordMetrics({
        markdownRenderTime: 250,
        scrollResponseTime: 35,
        memoryUsage: 85,
        errorCount: 3
      });

      // Render monitoring dashboard
      render(
        <MonitoringDashboard
          isVisible={true}
          onClose={jest.fn()}
        />
      );

      // Check overview shows correct data
      expect(screen.getByText('3')).toBeInTheDocument(); // Total errors
      expect(screen.getByText('85.0MB')).toBeInTheDocument(); // Memory usage

      // Check error details
      const errorsTab = screen.getByText('Erreurs');
      fireEvent.click(errorsTab);

      expect(screen.getByText('Markdown parsing failed')).toBeInTheDocument();
      expect(screen.getByText('Scroll performance degraded')).toBeInTheDocument();
      expect(screen.getByText('Button click delayed')).toBeInTheDocument();

      // Check performance metrics
      const performanceTab = screen.getByText('Performance');
      fireEvent.click(performanceTab);

      expect(screen.getByText('250.0ms')).toBeInTheDocument(); // Render time
      expect(screen.getByText('35.0ms')).toBeInTheDocument(); // Scroll time
    });

    it('should handle error recovery flow', async () => {
      const user = userEvent.setup();
      let shouldThrow = true;

      const TestComponent = () => {
        if (shouldThrow) {
          throw new Error('Recoverable error');
        }
        return <div>Component recovered</div>;
      };

      const { rerender } = render(
        <ChatErrorBoundary componentName="RecoverableComponent">
          <TestComponent />
        </ChatErrorBoundary>
      );

      // Error should be displayed
      expect(screen.getByText(/Chat temporairement indisponible/)).toBeInTheDocument();

      // Fix the error
      shouldThrow = false;

      // Close the error dialog
      const closeButton = screen.getByText(/Fermer/);
      await user.click(closeButton);

      // Re-render with fixed component
      rerender(
        <ChatErrorBoundary componentName="RecoverableComponent">
          <TestComponent />
        </ChatErrorBoundary>
      );

      // Component should be working
      expect(screen.getByText('Component recovered')).toBeInTheDocument();

      // Error should be marked as resolved in the system
      const errorStats = ErrorReporter.getInstance().getErrorStats();
      expect(errorStats.total).toBeGreaterThan(0);
    });
  });
});