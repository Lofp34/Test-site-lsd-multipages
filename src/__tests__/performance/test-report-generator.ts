/**
 * Test Report Generator for Performance and Accessibility
 * Generates comprehensive reports for task 9.2 validation
 * Requirements: 5.1, 5.2, 5.4, 8.7
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

interface TestSuite {
  name: string;
  testFile: string;
  category: 'performance' | 'accessibility';
  requirements: string[];
}

interface TestResult {
  suite: string;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  coverage?: number;
  details: string[];
}

interface ComprehensiveReport {
  timestamp: string;
  summary: {
    totalTests: number;
    totalPassed: number;
    totalFailed: number;
    overallPassRate: number;
    totalDuration: number;
  };
  performance: {
    coreWebVitals: TestResult;
    loadTesting: TestResult;
    memoryUsage: TestResult;
  };
  accessibility: {
    wcagCompliance: TestResult;
    screenReaderCompatibility: TestResult;
    mobileAccessibility: TestResult;
  };
  requirements: {
    [key: string]: {
      status: 'passed' | 'failed' | 'partial';
      coverage: number;
      details: string[];
    };
  };
  recommendations: string[];
}

class TestReportGenerator {
  private testSuites: TestSuite[] = [
    {
      name: 'Core Web Vitals Validation',
      testFile: 'src/__tests__/performance/core-web-vitals-validation.test.ts',
      category: 'performance',
      requirements: ['5.1', '8.7']
    },
    {
      name: 'Chat Load Testing',
      testFile: 'src/__tests__/performance/chat-load-testing.test.ts',
      category: 'performance',
      requirements: ['5.1', '5.7']
    },
    {
      name: 'WCAG Compliance',
      testFile: 'src/__tests__/accessibility/wcag-compliance.test.ts',
      category: 'accessibility',
      requirements: ['5.2', '5.4', '8.7']
    },
    {
      name: 'Screen Reader Compatibility',
      testFile: 'src/__tests__/accessibility/screen-reader-compatibility.test.ts',
      category: 'accessibility',
      requirements: ['5.2', '5.4']
    },
    {
      name: 'Integration Validation',
      testFile: 'src/__tests__/e2e/chat-integration-validation.test.ts',
      category: 'performance',
      requirements: ['1.1', '2.7', '3.7', '5.5']
    }
  ];

  async generateComprehensiveReport(): Promise<ComprehensiveReport> {
    console.log('🚀 Generating comprehensive performance and accessibility report...\n');

    const results: TestResult[] = [];
    
    for (const suite of this.testSuites) {
      console.log(`📋 Running: ${suite.name}`);
      const result = await this.runTestSuite(suite);
      results.push(result);
      
      if (result.failed > 0) {
        console.log(`❌ ${result.failed} tests failed in ${suite.name}`);
      } else {
        console.log(`✅ All ${result.passed} tests passed in ${suite.name}`);
      }
    }

    const report = this.compileReport(results);
    await this.saveReport(report);
    await this.generateHtmlReport(report);
    
    this.printSummary(report);
    
    return report;
  }

  private async runTestSuite(suite: TestSuite): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      const command = `npm run test -- --run ${suite.testFile} --reporter=json`;
      const output = execSync(command, { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Parse test output
      const lines = output.split('\n').filter(line => line.trim());
      const summaryLine = lines.find(line => line.includes('Tests') && line.includes('passed'));
      
      let passed = 0, failed = 0, skipped = 0;
      
      if (summaryLine) {
        const passedMatch = summaryLine.match(/(\d+) passed/);
        const failedMatch = summaryLine.match(/(\d+) failed/);
        const skippedMatch = summaryLine.match(/(\d+) skipped/);
        
        passed = passedMatch ? parseInt(passedMatch[1]) : 0;
        failed = failedMatch ? parseInt(failedMatch[1]) : 0;
        skipped = skippedMatch ? parseInt(skippedMatch[1]) : 0;
      }
      
      return {
        suite: suite.name,
        passed,
        failed,
        skipped,
        duration,
        details: this.extractTestDetails(output)
      };
      
    } catch (error: any) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Parse error output for test counts
      const errorOutput = error.stdout || error.message || '';
      const lines = errorOutput.split('\n');
      const summaryLine = lines.find((line: string) => line.includes('Tests') || line.includes('failed'));
      
      let passed = 0, failed = 1, skipped = 0;
      
      if (summaryLine) {
        const passedMatch = summaryLine.match(/(\d+) passed/);
        const failedMatch = summaryLine.match(/(\d+) failed/);
        
        passed = passedMatch ? parseInt(passedMatch[1]) : 0;
        failed = failedMatch ? parseInt(failedMatch[1]) : 1;
      }
      
      return {
        suite: suite.name,
        passed,
        failed,
        skipped,
        duration,
        details: [`Error: ${error.message}`]
      };
    }
  }

  private extractTestDetails(output: string): string[] {
    const lines = output.split('\n');
    const details: string[] = [];
    
    // Extract test names and results
    lines.forEach((line: string) => {
      if (line.includes('✓') || line.includes('×')) {
        const cleanLine = line.replace(/^\s*[✓×]\s*/, '').trim();
        if (cleanLine && !cleanLine.includes('Test Files')) {
          details.push(cleanLine);
        }
      }
    });
    
    return details.slice(0, 10); // Limit to first 10 details
  }

  private compileReport(results: TestResult[]): ComprehensiveReport {
    const totalTests = results.reduce((sum, r) => sum + r.passed + r.failed + r.skipped, 0);
    const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
    const totalFailed = results.reduce((sum, r) => sum + r.failed, 0);
    const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);
    
    const performanceResults = results.filter(r => 
      r.suite.includes('Web Vitals') || r.suite.includes('Load') || r.suite.includes('Integration')
    );
    
    const accessibilityResults = results.filter(r => 
      r.suite.includes('WCAG') || r.suite.includes('Screen Reader')
    );

    // Analyze requirements coverage
    const requirements = this.analyzeRequirements(results);
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(results);

    return {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests,
        totalPassed,
        totalFailed,
        overallPassRate: totalTests > 0 ? (totalPassed / totalTests) * 100 : 0,
        totalDuration
      },
      performance: {
        coreWebVitals: results.find(r => r.suite.includes('Web Vitals')) || this.createEmptyResult('Core Web Vitals'),
        loadTesting: results.find(r => r.suite.includes('Load')) || this.createEmptyResult('Load Testing'),
        memoryUsage: results.find(r => r.suite.includes('Integration')) || this.createEmptyResult('Memory Usage')
      },
      accessibility: {
        wcagCompliance: results.find(r => r.suite.includes('WCAG')) || this.createEmptyResult('WCAG Compliance'),
        screenReaderCompatibility: results.find(r => r.suite.includes('Screen Reader')) || this.createEmptyResult('Screen Reader'),
        mobileAccessibility: results.find(r => r.suite.includes('Mobile')) || this.createEmptyResult('Mobile Accessibility')
      },
      requirements,
      recommendations
    };
  }

  private createEmptyResult(name: string): TestResult {
    return {
      suite: name,
      passed: 0,
      failed: 0,
      skipped: 0,
      duration: 0,
      details: []
    };
  }

  private analyzeRequirements(results: TestResult[]): ComprehensiveReport['requirements'] {
    const requirements: ComprehensiveReport['requirements'] = {};
    
    // Map requirements to test results
    const reqMap = {
      '5.1': 'Performance optimization and Core Web Vitals',
      '5.2': 'Accessibility compliance (WCAG 2.1 AA)',
      '5.4': 'Screen reader and assistive technology support',
      '8.7': 'Performance monitoring and metrics',
      '1.1': 'Markdown rendering with streaming',
      '2.7': 'Intelligent scroll behavior',
      '3.7': 'Chat controls and keyboard shortcuts',
      '5.5': 'Browser compatibility and integration'
    };

    Object.entries(reqMap).forEach(([reqId, description]) => {
      const relatedResults = results.filter(r => 
        this.testSuites.find(s => s.name === r.suite)?.requirements.includes(reqId)
      );
      
      const totalTests = relatedResults.reduce((sum, r) => sum + r.passed + r.failed, 0);
      const passedTests = relatedResults.reduce((sum, r) => sum + r.passed, 0);
      const failedTests = relatedResults.reduce((sum, r) => sum + r.failed, 0);
      
      let status: 'passed' | 'failed' | 'partial' = 'passed';
      if (failedTests > 0) {
        status = passedTests > 0 ? 'partial' : 'failed';
      }
      
      requirements[reqId] = {
        status,
        coverage: totalTests > 0 ? (passedTests / totalTests) * 100 : 0,
        details: [
          description,
          `${passedTests}/${totalTests} tests passed`,
          ...relatedResults.flatMap(r => r.details.slice(0, 2))
        ]
      };
    });

    return requirements;
  }

  private generateRecommendations(results: TestResult[]): string[] {
    const recommendations: string[] = [];
    
    const failedResults = results.filter(r => r.failed > 0);
    
    if (failedResults.length === 0) {
      recommendations.push('🎉 All tests passed! Chat enhancements meet performance and accessibility standards.');
      recommendations.push('✅ Ready for production deployment with confidence.');
    } else {
      recommendations.push('⚠️ Some tests failed. Review and address the following areas:');
      
      failedResults.forEach(result => {
        if (result.suite.includes('Web Vitals')) {
          recommendations.push('🔧 Optimize Core Web Vitals: Focus on reducing layout shifts and improving input responsiveness.');
        }
        if (result.suite.includes('WCAG')) {
          recommendations.push('♿ Improve accessibility: Address color contrast and keyboard navigation issues.');
        }
        if (result.suite.includes('Screen Reader')) {
          recommendations.push('🔊 Enhance screen reader support: Improve ARIA labels and live region announcements.');
        }
      });
    }
    
    // General recommendations
    recommendations.push('📊 Continue monitoring performance metrics in production.');
    recommendations.push('🧪 Run accessibility tests regularly during development.');
    recommendations.push('📱 Test on real devices for mobile accessibility validation.');
    
    return recommendations;
  }

  private async saveReport(report: ComprehensiveReport): Promise<void> {
    const reportPath = 'reports/performance-accessibility-report.json';
    const reportsDir = path.dirname(reportPath);
    
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📊 JSON report saved to: ${reportPath}`);
  }

  private async generateHtmlReport(report: ComprehensiveReport): Promise<void> {
    const htmlContent = this.generateHtmlContent(report);
    const htmlPath = 'reports/performance-accessibility-report.html';
    
    fs.writeFileSync(htmlPath, htmlContent);
    console.log(`📊 HTML report saved to: ${htmlPath}`);
  }

  private generateHtmlContent(report: ComprehensiveReport): string {
    const passRate = report.summary.overallPassRate.toFixed(1);
    const statusColor = report.summary.totalFailed === 0 ? '#10B981' : '#EF4444';
    
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Performance & Accessibility Report - Chat Enhancements</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f8fafc;
            color: #1e293b;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5rem;
            font-weight: 700;
        }
        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            padding: 30px;
            background: #f8fafc;
        }
        .metric {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .metric-value {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 5px;
        }
        .metric-label {
            color: #64748b;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .passed { color: #10B981; }
        .failed { color: #EF4444; }
        .partial { color: #F59E0B; }
        .section {
            padding: 30px;
            border-bottom: 1px solid #e2e8f0;
        }
        .section h2 {
            margin-bottom: 20px;
            color: #1e293b;
        }
        .test-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }
        .test-card {
            background: #f8fafc;
            border-radius: 8px;
            padding: 20px;
            border-left: 4px solid #e2e8f0;
        }
        .test-card.passed {
            border-left-color: #10B981;
        }
        .test-card.failed {
            border-left-color: #EF4444;
        }
        .test-card.partial {
            border-left-color: #F59E0B;
        }
        .requirements {
            margin-top: 30px;
        }
        .requirement {
            background: white;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            border-left: 4px solid #e2e8f0;
        }
        .requirement.passed {
            border-left-color: #10B981;
        }
        .requirement.failed {
            border-left-color: #EF4444;
        }
        .requirement.partial {
            border-left-color: #F59E0B;
        }
        .recommendations {
            background: #f0f9ff;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
        }
        .recommendations h3 {
            margin-top: 0;
            color: #0369a1;
        }
        .recommendations ul {
            margin: 0;
            padding-left: 20px;
        }
        .recommendations li {
            margin-bottom: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Performance & Accessibility Report</h1>
            <p>Chat Enhancements Validation - ${new Date(report.timestamp).toLocaleString('fr-FR')}</p>
        </div>
        
        <div class="summary">
            <div class="metric">
                <div class="metric-value">${report.summary.totalTests}</div>
                <div class="metric-label">Total Tests</div>
            </div>
            <div class="metric">
                <div class="metric-value passed">${report.summary.totalPassed}</div>
                <div class="metric-label">Passed</div>
            </div>
            <div class="metric">
                <div class="metric-value failed">${report.summary.totalFailed}</div>
                <div class="metric-label">Failed</div>
            </div>
            <div class="metric">
                <div class="metric-value" style="color: ${statusColor}">${passRate}%</div>
                <div class="metric-label">Pass Rate</div>
            </div>
            <div class="metric">
                <div class="metric-value">${(report.summary.totalDuration / 1000).toFixed(1)}s</div>
                <div class="metric-label">Duration</div>
            </div>
        </div>
        
        <div class="section">
            <h2>🚀 Performance Tests</h2>
            <div class="test-grid">
                <div class="test-card ${report.performance.coreWebVitals.failed > 0 ? 'failed' : 'passed'}">
                    <h3>Core Web Vitals</h3>
                    <p>✅ ${report.performance.coreWebVitals.passed} passed, ❌ ${report.performance.coreWebVitals.failed} failed</p>
                    <p>Duration: ${(report.performance.coreWebVitals.duration / 1000).toFixed(1)}s</p>
                </div>
                <div class="test-card ${report.performance.loadTesting.failed > 0 ? 'failed' : 'passed'}">
                    <h3>Load Testing</h3>
                    <p>✅ ${report.performance.loadTesting.passed} passed, ❌ ${report.performance.loadTesting.failed} failed</p>
                    <p>Duration: ${(report.performance.loadTesting.duration / 1000).toFixed(1)}s</p>
                </div>
                <div class="test-card ${report.performance.memoryUsage.failed > 0 ? 'failed' : 'passed'}">
                    <h3>Integration & Memory</h3>
                    <p>✅ ${report.performance.memoryUsage.passed} passed, ❌ ${report.performance.memoryUsage.failed} failed</p>
                    <p>Duration: ${(report.performance.memoryUsage.duration / 1000).toFixed(1)}s</p>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2>♿ Accessibility Tests</h2>
            <div class="test-grid">
                <div class="test-card ${report.accessibility.wcagCompliance.failed > 0 ? 'failed' : 'passed'}">
                    <h3>WCAG 2.1 AA Compliance</h3>
                    <p>✅ ${report.accessibility.wcagCompliance.passed} passed, ❌ ${report.accessibility.wcagCompliance.failed} failed</p>
                    <p>Duration: ${(report.accessibility.wcagCompliance.duration / 1000).toFixed(1)}s</p>
                </div>
                <div class="test-card ${report.accessibility.screenReaderCompatibility.failed > 0 ? 'failed' : 'passed'}">
                    <h3>Screen Reader Compatibility</h3>
                    <p>✅ ${report.accessibility.screenReaderCompatibility.passed} passed, ❌ ${report.accessibility.screenReaderCompatibility.failed} failed</p>
                    <p>Duration: ${(report.accessibility.screenReaderCompatibility.duration / 1000).toFixed(1)}s</p>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2>📋 Requirements Coverage</h2>
            <div class="requirements">
                ${Object.entries(report.requirements).map(([reqId, req]) => `
                    <div class="requirement ${req.status}">
                        <h4>Requirement ${reqId} - ${req.coverage.toFixed(1)}% Coverage</h4>
                        <p>${req.details[0]}</p>
                        <p><strong>Status:</strong> ${req.status.toUpperCase()}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="section">
            <div class="recommendations">
                <h3>📝 Recommendations</h3>
                <ul>
                    ${report.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  private printSummary(report: ComprehensiveReport): void {
    console.log('\n' + '='.repeat(70));
    console.log('📊 PERFORMANCE & ACCESSIBILITY TEST SUMMARY');
    console.log('='.repeat(70));
    console.log(`📅 Timestamp: ${new Date(report.timestamp).toLocaleString('fr-FR')}`);
    console.log(`🧪 Total Tests: ${report.summary.totalTests}`);
    console.log(`✅ Passed: ${report.summary.totalPassed}`);
    console.log(`❌ Failed: ${report.summary.totalFailed}`);
    console.log(`📈 Pass Rate: ${report.summary.overallPassRate.toFixed(1)}%`);
    console.log(`⏱️  Duration: ${(report.summary.totalDuration / 1000).toFixed(1)}s`);
    
    console.log('\n📋 REQUIREMENTS VALIDATION');
    Object.entries(report.requirements).forEach(([reqId, req]) => {
      const statusIcon = req.status === 'passed' ? '✅' : req.status === 'partial' ? '⚠️' : '❌';
      console.log(`   ${statusIcon} ${reqId}: ${req.coverage.toFixed(1)}% - ${req.status.toUpperCase()}`);
    });
    
    console.log('\n📝 KEY RECOMMENDATIONS');
    report.recommendations.slice(0, 3).forEach(rec => {
      console.log(`   • ${rec}`);
    });
    
    if (report.summary.totalFailed === 0) {
      console.log('\n🎉 ALL TESTS PASSED! Chat enhancements meet performance and accessibility standards.');
      console.log('✅ Ready for production deployment.');
    } else {
      console.log(`\n⚠️  ${report.summary.totalFailed} tests failed. Please review and fix before deployment.`);
    }
    
    console.log('='.repeat(70));
  }
}

// Export for use in other scripts
export { TestReportGenerator };
export type { ComprehensiveReport };

// Run if called directly
if (require.main === module) {
  const generator = new TestReportGenerator();
  generator.generateComprehensiveReport()
    .then(report => {
      process.exit(report.summary.totalFailed === 0 ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Report generation failed:', error);
      process.exit(1);
    });
}