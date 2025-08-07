#!/usr/bin/env tsx

/**
 * Test runner for Enhanced Chat Components
 * 
 * This script runs all tests for the enhanced chat interface components
 * and provides detailed reporting on test results and coverage.
 */

import { execSync } from 'child_process';
import chalk from 'chalk';

interface TestSuite {
  name: string;
  pattern: string;
  description: string;
}

const testSuites: TestSuite[] = [
  {
    name: 'MarkdownRenderer',
    pattern: 'src/components/chat/enhanced/__tests__/MarkdownRenderer.test.tsx',
    description: 'Tests for Markdown rendering with syntax highlighting and security'
  },
  {
    name: 'ScrollController',
    pattern: 'src/components/chat/enhanced/__tests__/ScrollController.test.tsx',
    description: 'Tests for intelligent scroll control during streaming'
  },
  {
    name: 'ChatControls',
    pattern: 'src/components/chat/enhanced/__tests__/ChatControls.test.tsx',
    description: 'Tests for chat control buttons and keyboard shortcuts'
  },
  {
    name: 'EnhancedChatWidget',
    pattern: 'src/components/chat/enhanced/__tests__/EnhancedChatWidget.test.tsx',
    description: 'Integration tests for the complete enhanced chat widget'
  }
];

async function runTestSuite(suite: TestSuite): Promise<boolean> {
  console.log(chalk.blue(`\n🧪 Running ${suite.name} tests...`));
  console.log(chalk.gray(`   ${suite.description}`));
  
  try {
    const command = `npx vitest run ${suite.pattern} --reporter=verbose`;
    execSync(command, { stdio: 'inherit' });
    console.log(chalk.green(`✅ ${suite.name} tests passed`));
    return true;
  } catch (error) {
    console.log(chalk.red(`❌ ${suite.name} tests failed`));
    return false;
  }
}

async function runAllTests(): Promise<void> {
  console.log(chalk.cyan('🚀 Enhanced Chat Interface Test Suite'));
  console.log(chalk.cyan('=====================================\n'));
  
  const results: boolean[] = [];
  
  for (const suite of testSuites) {
    const passed = await runTestSuite(suite);
    results.push(passed);
  }
  
  // Summary
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log(chalk.cyan('\n📊 Test Summary'));
  console.log(chalk.cyan('==============='));
  
  if (passed === total) {
    console.log(chalk.green(`✅ All ${total} test suites passed!`));
  } else {
    console.log(chalk.red(`❌ ${total - passed} of ${total} test suites failed`));
  }
  
  // Coverage report
  console.log(chalk.cyan('\n📈 Running coverage report...'));
  try {
    execSync('npx vitest run src/components/chat/enhanced/__tests__ --coverage', { stdio: 'inherit' });
  } catch (error) {
    console.log(chalk.yellow('⚠️  Coverage report failed'));
  }
  
  process.exit(passed === total ? 0 : 1);
}

async function runSpecificTest(testName: string): Promise<void> {
  const suite = testSuites.find(s => s.name.toLowerCase() === testName.toLowerCase());
  
  if (!suite) {
    console.log(chalk.red(`❌ Test suite "${testName}" not found`));
    console.log(chalk.yellow('Available test suites:'));
    testSuites.forEach(s => console.log(chalk.yellow(`  - ${s.name}`)));
    process.exit(1);
  }
  
  const passed = await runTestSuite(suite);
  process.exit(passed ? 0 : 1);
}

async function runWatchMode(): Promise<void> {
  console.log(chalk.cyan('👀 Running tests in watch mode...'));
  try {
    execSync('npx vitest src/components/chat/enhanced/__tests__ --watch', { stdio: 'inherit' });
  } catch (error) {
    console.log(chalk.red('❌ Watch mode failed'));
    process.exit(1);
  }
}

// CLI handling
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'watch':
    runWatchMode();
    break;
  case 'test':
    if (args[1]) {
      runSpecificTest(args[1]);
    } else {
      runAllTests();
    }
    break;
  default:
    runAllTests();
    break;
}