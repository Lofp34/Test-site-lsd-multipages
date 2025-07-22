/**
 * Mobile CTA Test Page
 * Test page for validating mobile CTA optimization
 */

'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { validateMobileCTAOptimizations, generateMobileOptimizationRecommendations } from '@/utils/mobile-cta-validator';

export default function TestMobileCTAPage() {
  const [testResults, setTestResults] = useState<string>('');
  const [currentDevice, setCurrentDevice] = useState<string>('desktop');

  const devices = [
    { name: 'Mobile', width: '375px', icon: '📱' },
    { name: 'Tablet', width: '768px', icon: '📱' },
    { name: 'Desktop', width: '100%', icon: '🖥️' }
  ];

  const runTests = () => {
    const validation = validateMobileCTAOptimizations();
    const recommendations = generateMobileOptimizationRecommendations();
    
    const report = `
Mobile CTA Validation Results:
==============================

Overall Score: ${validation.score}/100
Success: ${validation.success ? 'PASS' : 'FAIL'}
Details: ${validation.details}

Validations:
${validation.validations.map((v, i) => `
${i + 1}. ${v.passed ? '✅' : '❌'} ${v.check}
   Value: ${v.value}
   Expected: ${v.expected}
   ${v.fix ? `Fix: ${v.fix}` : ''}
`).join('')}

Recommendations:
${recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}
    `;
    
    setTestResults(report);
  };

  const simulateDevice = (deviceName: string) => {
    setCurrentDevice(deviceName.toLowerCase());
    const container = document.querySelector('.test-container') as HTMLElement;
    if (container) {
      const device = devices.find(d => d.name === deviceName);
      if (device) {
        container.style.maxWidth = device.width;
        container.style.margin = '0 auto';
      }
    }
  };

  useEffect(() => {
    // Auto-run tests on page load
    setTimeout(runTests, 1000);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-bg via-white to-mint-green/5 py-20">
      <div className="max-w-4xl mx-auto px-6 test-container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-title font-bold text-blue-ink mb-4">
            Mobile CTA Test Page
          </h1>
          <p className="text-xl text-gray-anthracite/80">
            Test and validate mobile CTA optimization
          </p>
          <div className="mt-4 p-3 bg-mint-green/10 rounded-lg">
            <span className="text-mint-green font-semibold">
              📱 Current View: {currentDevice}
            </span>
          </div>
        </div>

        {/* Device Simulation Controls */}
        <div className="bg-white/80 rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-title font-bold text-blue-ink mb-6">
            Device Simulation
          </h2>
          <div className="flex flex-wrap gap-4 mb-4">
            {devices.map(device => (
              <button
                key={device.name}
                onClick={() => simulateDevice(device.name)}
                className={`px-4 py-2 rounded-lg transition-colors font-semibold ${
                  currentDevice === device.name.toLowerCase()
                    ? 'bg-mint-green text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-mint-green/20'
                }`}
              >
                {device.icon} {device.name}
              </button>
            ))}
          </div>
        </div>

        {/* Test CTAs - Hero Section Style */}
        <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 rounded-3xl p-12 mb-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-mint-green/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-title font-bold text-white mb-6">
              Hero Section CTAs
            </h2>
            <div className="cta-group-mobile">
              <div className="cta-container-mobile lg:flex-row lg:max-w-none lg:gap-6">
                <Link href="/bootcamp" className="block">
                  <Button 
                    variant="primary"
                    size="lg"
                    icon="🚀"
                    className="cta-mobile cta-primary-mobile lg:w-auto lg:min-w-[280px]"
                  >
                    Rejoindre le Bootcamp Commercial
                  </Button>
                </Link>
                
                <Link href="/ressources" className="block">
                  <Button 
                    variant="outline"
                    size="lg"
                    icon="📚"
                    className="cta-mobile cta-secondary-mobile lg:w-auto lg:min-w-[280px] border-white text-white hover:bg-white hover:text-blue-ink"
                  >
                    Accéder aux Ressources Gratuites
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Test CTAs - Problem Section Style */}
        <div className="bg-white/80 rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-title font-bold text-blue-ink mb-6 text-center">
            Problem Section CTAs
          </h2>
          <div className="cta-group-mobile">
            <div className="cta-container-mobile sm:flex-row sm:max-w-none sm:gap-4">
              <Link href="/bootcamp" className="block">
                <Button 
                  variant="primary" 
                  size="lg" 
                  icon="🚀"
                  className="cta-mobile cta-primary-mobile sm:w-auto sm:min-w-[240px]"
                >
                  Découvrir le Bootcamp Commercial
                </Button>
              </Link>
              <Link href="/ressources" className="block">
                <Button 
                  variant="outline" 
                  size="lg" 
                  icon="📚" 
                  className="cta-mobile cta-secondary-mobile sm:w-auto sm:min-w-[240px] border-mint-green text-mint-green hover:bg-mint-green hover:text-blue-ink"
                >
                  Télécharger le Guide Gratuit
                </Button>
              </Link>
              <Link href="/diagnostic" className="block">
                <Button 
                  variant="ghost" 
                  size="lg" 
                  icon="🔍" 
                  className="cta-mobile cta-tertiary-mobile sm:w-auto sm:min-w-[200px] text-gray-anthracite hover:text-mint-green hover:bg-mint-green/5"
                >
                  Faire le Diagnostic
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Test Controls */}
        <div className="bg-white/80 rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-title font-bold text-blue-ink mb-6">
            Test Controls
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={runTests}
              className="px-6 py-3 bg-mint-green text-white rounded-lg hover:bg-mint-green/90 transition-colors font-semibold"
            >
              Run Mobile CTA Tests
            </button>
            <button
              onClick={() => {
                const validation = validateMobileCTAOptimizations();
                console.log('Mobile CTA Validation Results:', validation);
                alert(`Overall Score: ${validation.score}% - Check console for details`);
              }}
              className="px-6 py-3 bg-blue-ink text-white rounded-lg hover:bg-blue-ink/90 transition-colors font-semibold"
            >
              Console Test
            </button>
          </div>
        </div>

        {/* Test Results */}
        {testResults && (
          <div className="bg-white/80 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-6">
              Test Results
            </h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm whitespace-pre-wrap">
              {testResults}
            </pre>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-mint-green/10 rounded-2xl p-8 mt-8">
          <h2 className="text-2xl font-title font-bold text-mint-green mb-4">
            Testing Instructions
          </h2>
          <ul className="space-y-2 text-gray-anthracite">
            <li>• Use device simulation buttons to test different screen sizes</li>
            <li>• Click "Run Mobile CTA Tests" to validate implementation</li>
            <li>• Check browser console for detailed validation results</li>
            <li>• Test touch interactions on actual mobile devices</li>
            <li>• Verify accessibility with screen readers</li>
          </ul>
        </div>
      </div>
    </main>
  );
}