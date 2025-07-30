#!/usr/bin/env tsx

import { execSync } from 'child_process'
import chalk from 'chalk'
import ora from 'ora'

interface TestSuite {
  name: string
  pattern: string
  timeout?: number
  coverage?: boolean
}

const testSuites: TestSuite[] = [
  {
    name: 'Unit Tests - Link Scanner',
    pattern: 'src/__tests__/audit/unit/link-scanner.test.ts',
    timeout: 10000
  },
  {
    name: 'Unit Tests - Link Validator',
    pattern: 'src/__tests__/audit/unit/link-validator.test.ts',
    timeout: 15000
  },
  {
    name: 'Unit Tests - Auto Corrector',
    pattern: 'src/__tests__/audit/unit/auto-corrector.test.ts',
    timeout: 10000
  },
  {
    name: 'Unit Tests - Report Generator',
    pattern: 'src/__tests__/audit/unit/report-generator.test.ts',
    timeout: 10000
  },
  {
    name: 'Unit Tests - SendGrid Service',
    pattern: 'src/__tests__/audit/unit/sendgrid-service.test.ts',
    timeout: 10000
  },
  {
    name: 'Unit Tests - Resource Request System',
    pattern: 'src/__tests__/audit/unit/resource-request-system.test.ts',
    timeout: 10000
  },
  {
    name: 'Integration Tests - Full Workflow',
    pattern: 'src/__tests__/audit/integration/full-audit-workflow.test.ts',
    timeout: 30000
  },
  {
    name: 'Integration Tests - SendGrid',
    pattern: 'src/__tests__/audit/integration/sendgrid-integration.test.ts',
    timeout: 20000
  },
  {
    name: 'Performance Tests - Large Scale',
    pattern: 'src/__tests__/audit/performance/large-scale-audit.test.ts',
    timeout: 60000
  }
]

async function runTestSuite(suite: TestSuite): Promise<boolean> {
  const spinner = ora(`Running ${suite.name}...`).start()
  
  try {
    const command = [
      'npx vitest run',
      suite.pattern,
      `--reporter=verbose`,
      suite.timeout ? `--testTimeout=${suite.timeout}` : '',
      suite.coverage ? '--coverage' : ''
    ].filter(Boolean).join(' ')

    execSync(command, { 
      stdio: 'pipe',
      timeout: (suite.timeout || 30000) + 5000 // Add buffer
    })
    
    spinner.succeed(chalk.green(`✅ ${suite.name} - PASSED`))
    return true
  } catch (error) {
    spinner.fail(chalk.red(`❌ ${suite.name} - FAILED`))
    console.error(chalk.red(`Error: ${error}`))
    return false
  }
}

async function runAllTests() {
  console.log(chalk.blue.bold('\n🧪 Running Audit System Test Suite\n'))
  
  const results: boolean[] = []
  let totalTime = 0
  
  for (const suite of testSuites) {
    const startTime = Date.now()
    const result = await runTestSuite(suite)
    const endTime = Date.now()
    
    results.push(result)
    totalTime += (endTime - startTime)
    
    console.log(chalk.gray(`   Duration: ${endTime - startTime}ms\n`))
  }
  
  // Summary
  const passed = results.filter(Boolean).length
  const failed = results.length - passed
  
  console.log(chalk.blue.bold('📊 Test Summary'))
  console.log(chalk.green(`✅ Passed: ${passed}`))
  console.log(chalk.red(`❌ Failed: ${failed}`))
  console.log(chalk.gray(`⏱️  Total Time: ${totalTime}ms`))
  
  if (failed > 0) {
    console.log(chalk.red.bold('\n❌ Some tests failed. Please check the output above.'))
    process.exit(1)
  } else {
    console.log(chalk.green.bold('\n🎉 All tests passed!'))
    process.exit(0)
  }
}

// CLI interface
const args = process.argv.slice(2)

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
${chalk.blue.bold('Audit System Test Runner')}

Usage:
  npm run test:audit              # Run all tests
  npm run test:audit -- --unit   # Run only unit tests
  npm run test:audit -- --integration # Run only integration tests
  npm run test:audit -- --performance # Run only performance tests
  npm run test:audit -- --coverage    # Run with coverage report

Options:
  --unit          Run unit tests only
  --integration   Run integration tests only
  --performance   Run performance tests only
  --coverage      Generate coverage report
  --help, -h      Show this help message
`)
  process.exit(0)
}

// Filter test suites based on arguments
let filteredSuites = testSuites

if (args.includes('--unit')) {
  filteredSuites = testSuites.filter(suite => suite.pattern.includes('/unit/'))
} else if (args.includes('--integration')) {
  filteredSuites = testSuites.filter(suite => suite.pattern.includes('/integration/'))
} else if (args.includes('--performance')) {
  filteredSuites = testSuites.filter(suite => suite.pattern.includes('/performance/'))
}

if (args.includes('--coverage')) {
  filteredSuites = filteredSuites.map(suite => ({ ...suite, coverage: true }))
}

// Update testSuites for filtered run
testSuites.length = 0
testSuites.push(...filteredSuites)

// Run tests
runAllTests().catch(error => {
  console.error(chalk.red('Test runner failed:'), error)
  process.exit(1)
})