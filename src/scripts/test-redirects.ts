#!/usr/bin/env tsx

/**
 * Redirect Testing Script
 * Tests all redirect configurations and generates a report
 */

import { RedirectTester, testRedirectLogic, generateRedirectReport } from '../utils/test-redirects';
import { redirectAnalytics } from '../config/redirects';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('🧪 Testing redirect system...\n');

  try {
    // Test redirect logic (without HTTP requests)
    console.log('🔍 Testing redirect logic...');
    const logicResults = testRedirectLogic();
    
    console.log('📊 Logic Test Results:');
    logicResults.forEach(result => {
      const status = result.isWorking ? '✅' : '❌';
      console.log(`  ${status} ${result.source} → ${result.actualDestination || 'null'}`);
    });

    const logicPassed = logicResults.filter(r => r.isWorking).length;
    const logicTotal = logicResults.length;
    console.log(`\n📈 Logic Tests: ${logicPassed}/${logicTotal} passed (${Math.round(logicPassed / logicTotal * 100)}%)\n`);

    // Test redirect analytics
    console.log('📊 Testing redirect analytics...');
    testRedirectAnalytics();

    // Generate and save report
    const report = generateRedirectReport(logicResults);
    const reportPath = path.join(process.cwd(), 'redirect-test-report.md');
    fs.writeFileSync(reportPath, report);
    console.log(`📄 Report saved to: ${reportPath}`);

    // Test with actual HTTP requests if server is running
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    console.log(`\n🌐 Testing HTTP redirects against ${baseUrl}...`);
    
    try {
      const tester = new RedirectTester(baseUrl);
      const httpResults = await tester.testAllRedirects();
      
      const httpPassed = httpResults.filter(r => r.isWorking).length;
      const httpTotal = httpResults.length;
      
      console.log(`📈 HTTP Tests: ${httpPassed}/${httpTotal} passed (${Math.round(httpPassed / httpTotal * 100)}%)`);
      
      // Show failed HTTP tests
      const failedHttp = httpResults.filter(r => !r.isWorking);
      if (failedHttp.length > 0) {
        console.log('\n❌ Failed HTTP Tests:');
        failedHttp.forEach(result => {
          console.log(`  ${result.source} → ${result.actualDestination || 'null'} (expected: ${result.expectedDestination})`);
          if (result.error) {
            console.log(`    Error: ${result.error}`);
          }
        });
      }

      // Save HTTP report
      const httpReport = generateRedirectReport(httpResults);
      const httpReportPath = path.join(process.cwd(), 'redirect-http-test-report.md');
      fs.writeFileSync(httpReportPath, httpReport);
      console.log(`📄 HTTP report saved to: ${httpReportPath}`);

    } catch (error) {
      console.log(`⚠️  Could not test HTTP redirects: ${error}`);
      console.log('   Make sure the development server is running with `npm run dev`');
    }

    console.log('\n✅ Redirect testing completed!');

  } catch (error) {
    console.error('❌ Error during redirect testing:', error);
    process.exit(1);
  }
}

function testRedirectAnalytics(): void {
  // Simulate some redirects
  redirectAnalytics.logRedirect({
    source: '/ressources/scripts-impact',
    destination: '/ressources/scripts-prospection',
    userAgent: 'Test Agent'
  });

  redirectAnalytics.logRedirect({
    source: '/ressources/linkedin-guide',
    destination: '/ressources/linkedin-prospection',
    userAgent: 'Test Agent'
  });

  redirectAnalytics.logRedirect({
    source: '/ressources/scripts-impact',
    destination: '/ressources/scripts-prospection',
    userAgent: 'Another Test Agent'
  });

  // Get stats
  const stats = redirectAnalytics.getRedirectStats();
  const mostRedirected = redirectAnalytics.getMostRedirectedUrls();
  const recentLogs = redirectAnalytics.getRecentLogs(5);

  console.log('  📊 Redirect Stats:', Object.keys(stats).length, 'unique redirects');
  console.log('  🔝 Most Redirected:', mostRedirected.slice(0, 3));
  console.log('  📝 Recent Logs:', recentLogs.length, 'entries');

  // Clear test data
  redirectAnalytics.clearLogs();
  console.log('  ✅ Analytics test completed\n');
}

// Run the script
main().catch(console.error);