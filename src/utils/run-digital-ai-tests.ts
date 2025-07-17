/**
 * Script to run all Digital & AI Sales section tests
 */

import { runAllTests, generateTestReport } from './digital-ai-section-tests';

// Run all tests
console.log('🧪 Running Digital & AI Sales Section Tests...\n');

const testResults = runAllTests();
const report = generateTestReport(testResults);

console.log(report);

// Export results for further analysis
export { testResults, report };