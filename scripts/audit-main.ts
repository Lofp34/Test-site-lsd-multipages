#!/usr/bin/env tsx
/**
 * Main audit script - Entry point for link auditing
 * Usage: npm run audit:links [options]
 * 
 * This script now delegates to the comprehensive CLI tool
 */

import { config } from 'dotenv';
import { spawn } from 'child_process';
import path from 'path';

// Load environment variables
config();

async function main() {
  try {
    console.log('🔍 Lancement de l\'audit des liens...');
    console.log('📋 Utilisation du CLI complet pour plus d\'options: npm run audit:cli -- --help');
    
    // Get command line arguments (skip node and script name)
    const args = process.argv.slice(2);
    
    // Default to full audit if no specific command
    const cliArgs = args.length > 0 ? ['audit', ...args] : ['audit'];
    
    // Path to the CLI script
    const cliPath = path.join(__dirname, 'cli', 'audit-cli.ts');
    
    // Spawn the CLI process
    const child = spawn('tsx', [cliPath, ...cliArgs], {
      stdio: 'inherit',
      shell: true
    });
    
    // Handle process exit
    child.on('close', (code) => {
      process.exit(code || 0);
    });
    
    child.on('error', (error) => {
      console.error('❌ Erreur lors du lancement du CLI:', error);
      process.exit(1);
    });
    
  } catch (error) {
    console.error('❌ Audit failed:', error);
    process.exit(1);
  }
}

// Run if this is the main module
main();