#!/usr/bin/env tsx
/**
 * Test audit system configuration
 * Usage: npm run test-audit-config
 */

import { config } from 'dotenv';
import { validateConfig, sendGridConfig, validationConfig, resourceRequestConfig } from '../src/lib/audit/config';

// Load environment variables
config();

async function testConfiguration() {
  console.log('🔧 Testing audit system configuration...\n');
  
  try {
    // Test environment variables
    console.log('1. Validating environment variables...');
    validateConfig();
    console.log('✅ All required environment variables are present\n');
    
    // Test SendGrid config
    console.log('2. Testing SendGrid configuration...');
    const sgConfig = sendGridConfig();
    console.log(`   API Key: ${sgConfig.apiKey ? '✅ Present' : '❌ Missing'}`);
    console.log(`   From Email: ${sgConfig.fromEmail}`);
    console.log(`   From Name: ${sgConfig.fromName}`);
    console.log(`   Admin Email: ${sgConfig.adminEmail}\n`);
    
    // Test validation config
    console.log('3. Testing validation configuration...');
    const valConfig = validationConfig();
    console.log(`   Timeout: ${valConfig.timeout}ms`);
    console.log(`   Retry Attempts: ${valConfig.retryAttempts}`);
    console.log(`   Batch Size: ${valConfig.batchSize}`);
    console.log(`   Rate Limit Delay: ${valConfig.rateLimitDelay}ms\n`);
    
    // Test resource request config
    console.log('4. Testing resource request configuration...');
    const reqConfig = resourceRequestConfig();
    console.log(`   Admin Email: ${reqConfig.adminEmail}`);
    console.log(`   Max Requests/Day: ${reqConfig.maxRequestsPerDay}`);
    console.log(`   Auto Response: ${reqConfig.enableAutoResponse ? '✅ Enabled' : '❌ Disabled'}\n`);
    
    console.log('✅ Configuration test completed successfully!');
    
  } catch (error) {
    console.error('❌ Configuration test failed:', error);
    process.exit(1);
  }
}

// Run if this is the main module
testConfiguration();