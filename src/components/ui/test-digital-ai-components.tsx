'use client';

import React, { useState, useEffect } from 'react';
import { PerformanceMonitor, AccessibilityTester, MobilePerformanceTester } from '@/utils/performance-test';
import AIIcon from './AIIcon';
import ParticleBackground from './ParticleBackground';
import FutureRelevanceIndicator from './FutureRelevanceIndicator';
import TechnologyBadge from './TechnologyBadge';
import CommercialUseCase from './CommercialUseCase';

interface TestResults {
  performance: any;
  accessibility: any;
  mobile: any;
}

const DigitalAIComponentTester: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResults | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    
    const performanceMonitor = new PerformanceMonitor();
    const accessibilityTester = new AccessibilityTester();
    const mobilePerformanceTester = new MobilePerformanceTester();

    try {
      // Performance tests
      const performanceResults = await performanceMonitor.testDigitalAIPerformance();
      
      // Accessibility tests
      const accessibilityResults = await accessibilityTester.runFullAccessibilityAudit();
      
      // Mobile performance tests
      const mobileResults = await mobilePerformanceTester.testMobilePerformance();

      setTestResults({
        performance: performanceResults,
        accessibility: accessibilityResults,
        mobile: mobileResults
      });
    } catch (error) {
      console.error('Test execution failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-ink mb-6">
        Digital & AI Components Performance Test
      </h2>

      {/* Test Components Display */}
      <div className="mb-8 space-y-6">
        <h3 className="text-lg font-semibold text-blue-ink">
          Components Under Test
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* AI Icons */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium mb-2">AI Icons</h4>
            <div className="flex gap-2">
              <AIIcon type="brain" size="md" animated />
              <AIIcon type="robot" size="md" animated />
              <AIIcon type="circuit" size="md" animated />
            </div>
          </div>

          {/* Technology Badges */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium mb-2">Technology Badges</h4>
            <div className="space-y-2">
              <TechnologyBadge technology="IA" variant="primary" size="sm" />
              <TechnologyBadge technology="Machine Learning" variant="secondary" size="sm" />
            </div>
          </div>

          {/* Future Relevance Indicator */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium mb-2">Future Relevance</h4>
            <FutureRelevanceIndicator 
              relevanceScore={4.2} 
              trend="rising" 
              size="sm" 
              showLabel={false}
            />
          </div>
        </div>

        {/* Commercial Use Case */}
        <div className="mt-4">
          <CommercialUseCase
            useCase="Prospection automatisée par IA"
            tools={['HubSpot', 'Salesforce Einstein', 'Outreach']}
            roi="+300% de leads qualifiés"
            difficulty="Intermédiaire"
          />
        </div>

        {/* Particle Background Test Area */}
        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg overflow-hidden">
          <ParticleBackground density={20} speed={0.2} opacity={0.6} />
          <div className="relative z-10 flex items-center justify-center h-full">
            <span className="text-white font-semibold">Particle Background Test</span>
          </div>
        </div>
      </div>

      {/* Test Controls */}
      <div className="mb-6">
        <button
          onClick={runTests}
          disabled={isRunning}
          className="bg-mint-green hover:bg-mint-green/80 text-blue-ink font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRunning ? 'Running Tests...' : 'Run Performance Tests'}
        </button>
      </div>

      {/* Test Results */}
      {testResults && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-blue-ink">
            Test Results
          </h3>

          {/* Performance Results */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-3 text-blue-ink">
              Performance Metrics
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Load Time</span>
                <div className="font-semibold">
                  {testResults.performance.loadTime?.toFixed(2)}ms
                </div>
              </div>
              <div>
                <span className="text-gray-600">Render Time</span>
                <div className="font-semibold">
                  {testResults.performance.renderTime?.toFixed(2)}ms
                </div>
              </div>
              <div>
                <span className="text-gray-600">Memory Usage</span>
                <div className="font-semibold">
                  {testResults.performance.memoryUsage?.toFixed(1)}MB
                </div>
              </div>
              <div>
                <span className="text-gray-600">LCP</span>
                <div className="font-semibold">
                  {testResults.performance.coreWebVitals?.lcp?.toFixed(0)}ms
                </div>
              </div>
            </div>
          </div>

          {/* Accessibility Results */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-3 text-blue-ink">
              Accessibility Audit
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Overall Score</span>
                <span className={`font-bold ${getScoreColor(testResults.accessibility.score)}`}>
                  {testResults.accessibility.score}/100
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Keyboard Navigation</span>
                <span className={testResults.accessibility.keyboardNavigation ? 'text-green-600' : 'text-red-600'}>
                  {testResults.accessibility.keyboardNavigation ? '✓ Pass' : '✗ Fail'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Color Contrast</span>
                <span className={testResults.accessibility.colorContrast ? 'text-green-600' : 'text-red-600'}>
                  {testResults.accessibility.colorContrast ? '✓ Pass' : '✗ Fail'}
                </span>
              </div>
              {testResults.accessibility.ariaLabels.length > 0 && (
                <div className="mt-2">
                  <span className="text-red-600 text-sm">
                    ARIA Issues: {testResults.accessibility.ariaLabels.length}
                  </span>
                  <ul className="text-xs text-gray-600 mt-1">
                    {testResults.accessibility.ariaLabels.slice(0, 3).map((issue: string, index: number) => (
                      <li key={index}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Performance Results */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-3 text-blue-ink">
              Mobile Performance
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Mobile Score</span>
                <span className={`font-bold ${getScoreColor(testResults.mobile.score)}`}>
                  {testResults.mobile.score}/100
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Viewport Meta</span>
                <span className={testResults.mobile.viewportMeta ? 'text-green-600' : 'text-red-600'}>
                  {testResults.mobile.viewportMeta ? '✓ Present' : '✗ Missing'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Load Time</span>
                <span className="font-semibold">
                  {testResults.mobile.loadTime?.toFixed(2)}ms
                </span>
              </div>
              {testResults.mobile.touchTargets.length > 0 && (
                <div className="mt-2">
                  <span className="text-orange-600 text-sm">
                    Touch Target Issues: {testResults.mobile.touchTargets.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalAIComponentTester;