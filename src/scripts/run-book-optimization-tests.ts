#!/usr/bin/env tsx

/**
 * Script to run all book pages optimization tests
 * Usage: npm run test:book-optimization
 */

import { runComprehensiveTests, exportTestReport } from '../utils/comprehensive-test-runner';

async function main() {
  console.log('🚀 Starting Book Pages Optimization Test Suite');
  console.log('===============================================\n');
  
  try {
    // Run comprehensive tests
    const report = runComprehensiveTests();
    
    // Export report
    const reportJson = exportTestReport(report, `book-optimization-test-report-${new Date().toISOString().split('T')[0]}.json`);
    
    // Determine exit code based on results
    const exitCode = report.overallSuccessRate >= 95 ? 0 : 1;
    
    if (exitCode === 0) {
      console.log('\n✅ All tests passed successfully!');
    } else {
      console.log('\n❌ Some tests failed. Please review the results above.');
    }
    
    process.exit(exitCode);
    
  } catch (error) {
    console.error('❌ Test suite failed to run:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { main };