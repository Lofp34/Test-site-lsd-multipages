#!/usr/bin/env node

/**
 * Performance and Accessibility Test Runner
 * Runs comprehensive tests for task 9.2 validation
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const testSuites = [
  {
    name: 'Core Web Vitals Validation',
    testFile: 'src/__tests__/performance/core-web-vitals-validation.test.ts',
    category: 'performance'
  },
  {
    name: 'WCAG Compliance',
    testFile: 'src/__tests__/accessibility/wcag-compliance.test.ts',
    category: 'accessibility'
  },
  {
    name: 'Screen Reader Compatibility',
    testFile: 'src/__tests__/accessibility/screen-reader-compatibility.test.ts',
    category: 'accessibility'
  },
  {
    name: 'Integration Validation',
    testFile: 'src/__tests__/e2e/chat-integration-validation.test.ts',
    category: 'integration'
  }
];

async function runTestSuite(suite) {
  console.log(`📋 Running: ${suite.name}`);
  const startTime = Date.now();
  
  try {
    const command = `npm run test -- --run ${suite.testFile}`;
    const output = execSync(command, { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    // Parse output for test counts
    const lines = output.split('\n');
    const summaryLine = lines.find(line => line.includes('Tests') && (line.includes('passed') || line.includes('failed')));
    
    let passed = 0, failed = 0, skipped = 0;
    
    if (summaryLine) {
      const passedMatch = summaryLine.match(/(\d+) passed/);
      const failedMatch = summaryLine.match(/(\d+) failed/);
      const skippedMatch = summaryLine.match(/(\d+) skipped/);
      
      passed = passedMatch ? parseInt(passedMatch[1]) : 0;
      failed = failedMatch ? parseInt(failedMatch[1]) : 0;
      skipped = skippedMatch ? parseInt(skippedMatch[1]) : 0;
    }
    
    console.log(`✅ ${suite.name}: ${passed} passed, ${failed} failed, ${skipped} skipped (${(duration/1000).toFixed(1)}s)`);
    
    return {
      suite: suite.name,
      category: suite.category,
      passed,
      failed,
      skipped,
      duration,
      success: failed === 0
    };
    
  } catch (error) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log(`❌ ${suite.name}: Test execution failed (${(duration/1000).toFixed(1)}s)`);
    console.log(`   Error: ${error.message.split('\n')[0]}`);
    
    return {
      suite: suite.name,
      category: suite.category,
      passed: 0,
      failed: 1,
      skipped: 0,
      duration,
      success: false,
      error: error.message
    };
  }
}

async function generateReport(results) {
  const totalTests = results.reduce((sum, r) => sum + r.passed + r.failed + r.skipped, 0);
  const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
  const totalFailed = results.reduce((sum, r) => sum + r.failed, 0);
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);
  
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalTests,
      totalPassed,
      totalFailed,
      passRate: totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(1) : '0',
      totalDuration: (totalDuration / 1000).toFixed(1)
    },
    results: results.map(r => ({
      suite: r.suite,
      category: r.category,
      passed: r.passed,
      failed: r.failed,
      skipped: r.skipped,
      duration: (r.duration / 1000).toFixed(1),
      success: r.success
    })),
    requirements: {
      '5.1': {
        description: 'Performance optimization and Core Web Vitals',
        status: results.find(r => r.suite.includes('Web Vitals'))?.success ? 'PASSED' : 'FAILED'
      },
      '5.2': {
        description: 'Accessibility compliance (WCAG 2.1 AA)',
        status: results.find(r => r.suite.includes('WCAG'))?.success ? 'PASSED' : 'FAILED'
      },
      '5.4': {
        description: 'Screen reader and assistive technology support',
        status: results.find(r => r.suite.includes('Screen Reader'))?.success ? 'PASSED' : 'FAILED'
      },
      '8.7': {
        description: 'Performance monitoring and metrics',
        status: results.some(r => r.suite.includes('Web Vitals') || r.suite.includes('Integration')) && 
                results.filter(r => r.suite.includes('Web Vitals') || r.suite.includes('Integration')).every(r => r.success) ? 'PASSED' : 'FAILED'
      }
    }
  };
  
  // Save JSON report
  const reportsDir = 'reports';
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  const reportPath = path.join(reportsDir, 'performance-accessibility-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  return report;
}

function printSummary(report) {
  console.log('\n' + '='.repeat(70));
  console.log('📊 PERFORMANCE & ACCESSIBILITY TEST SUMMARY');
  console.log('='.repeat(70));
  console.log(`📅 Timestamp: ${new Date(report.timestamp).toLocaleString('fr-FR')}`);
  console.log(`🧪 Total Tests: ${report.summary.totalTests}`);
  console.log(`✅ Passed: ${report.summary.totalPassed}`);
  console.log(`❌ Failed: ${report.summary.totalFailed}`);
  console.log(`📈 Pass Rate: ${report.summary.passRate}%`);
  console.log(`⏱️  Duration: ${report.summary.totalDuration}s`);
  
  console.log('\n📋 REQUIREMENTS VALIDATION');
  Object.entries(report.requirements).forEach(([reqId, req]) => {
    const statusIcon = req.status === 'PASSED' ? '✅' : '❌';
    console.log(`   ${statusIcon} ${reqId}: ${req.description} - ${req.status}`);
  });
  
  console.log('\n📊 TEST RESULTS BY CATEGORY');
  const categories = [...new Set(report.results.map(r => r.category))];
  categories.forEach(category => {
    const categoryResults = report.results.filter(r => r.category === category);
    const categoryPassed = categoryResults.reduce((sum, r) => sum + r.passed, 0);
    const categoryFailed = categoryResults.reduce((sum, r) => sum + r.failed, 0);
    const categoryIcon = categoryFailed === 0 ? '✅' : '❌';
    
    console.log(`   ${categoryIcon} ${category.toUpperCase()}: ${categoryPassed} passed, ${categoryFailed} failed`);
  });
  
  if (report.summary.totalFailed === 0) {
    console.log('\n🎉 ALL TESTS PASSED! Chat enhancements meet performance and accessibility standards.');
    console.log('✅ Requirements 5.1, 5.2, 5.4, and 8.7 are validated.');
    console.log('🚀 Ready for production deployment.');
  } else {
    console.log(`\n⚠️  ${report.summary.totalFailed} tests failed. Please review and fix before deployment.`);
    console.log('📝 Check the detailed test output above for specific issues to address.');
  }
  
  console.log(`\n📊 Report saved to: reports/performance-accessibility-report.json`);
  console.log('='.repeat(70));
}

async function main() {
  console.log('🚀 Starting Performance & Accessibility Test Suite...\n');
  
  const results = [];
  
  for (const suite of testSuites) {
    const result = await runTestSuite(suite);
    results.push(result);
    console.log(''); // Add spacing between tests
  }
  
  const report = await generateReport(results);
  printSummary(report);
  
  // Exit with appropriate code
  process.exit(report.summary.totalFailed === 0 ? 0 : 1);
}

// Run the tests
main().catch(error => {
  console.error('❌ Test suite failed:', error);
  process.exit(1);
});