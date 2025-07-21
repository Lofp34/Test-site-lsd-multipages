#!/usr/bin/env node

/**
 * Book Pages Validation Test Runner
 * Executes comprehensive validation for task 16
 */

import { generateValidationReport, getPriorityActions, runCompleteValidation } from '../utils/book-pages-validation';

async function main() {
  console.log('🔍 Starting Book Pages Optimization Validation...\n');
  
  try {
    // Run complete validation
    const report = runCompleteValidation();
    
    // Generate and display report
    const reportText = generateValidationReport();
    console.log(reportText);
    
    // Display priority actions
    console.log('## Priority Actions\n');
    const actions = getPriorityActions();
    actions.forEach((action, index) => {
      console.log(`${index + 1}. ${action}`);
    });
    
    console.log('\n## Validation Complete');
    console.log(`✅ Success Rate: ${Math.round((report.summary.passed / report.summary.totalChecks) * 100)}%`);
    
    if (report.summary.errors > 0) {
      console.log('❌ Critical issues found - immediate action required');
      process.exit(1);
    } else if (report.summary.warnings > 0) {
      console.log('⚠️ Optimization opportunities identified');
      process.exit(0);
    } else {
      console.log('🎉 All validations passed!');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}