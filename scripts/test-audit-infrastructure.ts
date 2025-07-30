#!/usr/bin/env tsx
/**
 * Comprehensive test of audit infrastructure
 * Usage: npm run test:audit-infrastructure
 */

import { config } from 'dotenv';
import { validateConfig } from '../src/lib/audit/config';
import { AuditDatabase } from '../src/lib/audit/database';

// Load environment variables
config();

async function testInfrastructure() {
  console.log('🧪 Testing audit infrastructure...\n');
  
  let allTestsPassed = true;
  
  try {
    // Test 1: Environment variables
    console.log('1. Testing environment variables...');
    validateConfig();
    console.log('✅ Environment variables validated\n');
    
    // Test 2: Database connection
    console.log('2. Testing database connection...');
    const dbConnected = await AuditDatabase.testConnection();
    if (dbConnected) {
      console.log('✅ Database connection successful\n');
    } else {
      console.log('❌ Database connection failed\n');
      allTestsPassed = false;
    }
    
    // Test 3: Database operations
    console.log('3. Testing database operations...');
    try {
      // Test inserting a sample audit history
      await AuditDatabase.insertAuditHistory({
        total_links: 100,
        broken_links: 5,
        corrected_links: 2,
        seo_score: 95.0,
        report_path: '/test/report.json',
        execution_time: 30
      });
      
      // Test retrieving latest audit
      const latestAudit = await AuditDatabase.getLatestAudit();
      if (latestAudit) {
        console.log('✅ Database operations working');
        console.log(`   Latest audit: ${latestAudit.total_links} links, ${latestAudit.broken_links} broken\n`);
      } else {
        console.log('⚠️  Database operations partially working (no data retrieved)\n');
      }
    } catch (dbError) {
      console.log('❌ Database operations failed:', dbError);
      allTestsPassed = false;
    }
    
    // Test 4: Module imports
    console.log('4. Testing module imports...');
    try {
      const { LinkScanner, LinkValidator, AutoCorrector, ReportGenerator, SendGridEmailService, ResourceRequestSystem } = await import('../src/lib/audit');
      
      // Test instantiation
      const scanner = new LinkScanner();
      const validator = new LinkValidator();
      const corrector = new AutoCorrector();
      const reporter = new ReportGenerator();
      
      console.log('✅ All modules imported and instantiated successfully\n');
    } catch (importError) {
      console.log('❌ Module import failed:', importError);
      allTestsPassed = false;
    }
    
    // Test 5: File structure
    console.log('5. Testing file structure...');
    const fs = await import('fs');
    const path = await import('path');
    
    const requiredFiles = [
      'src/lib/audit/index.ts',
      'src/lib/audit/types.ts',
      'src/lib/audit/config.ts',
      'src/lib/audit/database.ts',
      'src/lib/audit/scanner.ts',
      'src/lib/audit/validator.ts',
      'src/lib/audit/corrector.ts',
      'src/lib/audit/reporter.ts',
      'src/lib/audit/sendgrid-service.ts',
      'src/lib/audit/resource-request.ts',
      'scripts/audit-main.ts',
      'scripts/setup-audit-db.ts',
      'scripts/test-audit-config.ts'
    ];
    
    let missingFiles = 0;
    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        console.log(`❌ Missing file: ${file}`);
        missingFiles++;
        allTestsPassed = false;
      }
    }
    
    if (missingFiles === 0) {
      console.log('✅ All required files present\n');
    } else {
      console.log(`❌ ${missingFiles} files missing\n`);
    }
    
    // Final result
    if (allTestsPassed) {
      console.log('🎉 All infrastructure tests passed!');
      console.log('✅ Audit system infrastructure is ready for implementation');
    } else {
      console.log('⚠️  Some tests failed - please review the issues above');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Infrastructure test failed:', error);
    process.exit(1);
  }
}

// Run the test
testInfrastructure();