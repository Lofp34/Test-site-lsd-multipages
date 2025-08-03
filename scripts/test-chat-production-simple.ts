#!/usr/bin/env tsx

/**
 * Script de test simple pour valider le chat Gemini en production
 */

import { config } from 'dotenv';

// Charger les variables d'environnement
config();

interface TestResult {
  name: string;
  success: boolean;
  message: string;
  duration: number;
}

class SimpleChatValidator {
  private baseUrl: string;
  private results: TestResult[] = [];

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  }

  async validate(): Promise<boolean> {
    console.log('🔍 Validation simple du chat Gemini');
    console.log(`🌐 URL: ${this.baseUrl}`);
    console.log('='.repeat(50));

    await this.runTest('Health Check', () => this.testHealth());
    await this.runTest('Chat API Options', () => this.testChatOptions());
    await this.runTest('Rate Limiting', () => this.testRateLimit());
    await this.runTest('Input Validation', () => this.testInputValidation());
    await this.runTest('Security Headers', () => this.testSecurityHeaders());

    this.displayResults();
    
    const failed = this.results.filter(r => !r.success).length;
    return failed === 0;
  }

  private async runTest(name: string, testFn: () => Promise<{ success: boolean; message: string }>): Promise<void> {
    const start = Date.now();
    
    try {
      const result = await testFn();
      const duration = Date.now() - start;
      
      this.results.push({
        name,
        success: result.success,
        message: result.message,
        duration
      });

      const status = result.success ? '✅' : '❌';
      console.log(`${status} ${name}: ${result.message} (${duration}ms)`);
    } catch (error) {
      const duration = Date.now() - start;
      this.results.push({
        name,
        success: false,
        message: `Erreur: ${error}`,
        duration
      });
      console.log(`💥 ${name}: Erreur: ${error} (${duration}ms)`);
    }
  }

  private async testHealth(): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health`);
      return {
        success: response.ok,
        message: response.ok ? 'Health endpoint accessible' : `Status ${response.status}`
      };
    } catch (error) {
      return {
        success: false,
        message: `Impossible d'accéder au health endpoint`
      };
    }
  }

  private async testChatOptions(): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat/gemini`, {
        method: 'OPTIONS'
      });
      return {
        success: response.ok,
        message: response.ok ? 'API Chat accessible' : `Status ${response.status}`
      };
    } catch (error) {
      return {
        success: false,
        message: `API Chat inaccessible`
      };
    }
  }

  private async testRateLimit(): Promise<{ success: boolean; message: string }> {
    try {
      // Envoyer plusieurs requêtes pour tester le rate limiting
      const requests = Array.from({ length: 25 }, (_, i) =>
        fetch(`${this.baseUrl}/api/chat/gemini`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: `Test ${i}` })
        })
      );

      const responses = await Promise.all(requests);
      const rateLimited = responses.filter(r => r.status === 429).length;

      return {
        success: rateLimited > 0,
        message: rateLimited > 0 
          ? `Rate limiting actif (${rateLimited}/25 bloquées)` 
          : 'Rate limiting non détecté'
      };
    } catch (error) {
      return {
        success: false,
        message: `Erreur test rate limiting`
      };
    }
  }

  private async testInputValidation(): Promise<{ success: boolean; message: string }> {
    try {
      const maliciousInput = '<script>alert("xss")</script>';
      const response = await fetch(`${this.baseUrl}/api/chat/gemini`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: maliciousInput })
      });

      return {
        success: response.status === 400,
        message: response.status === 400 
          ? 'Input validation fonctionne' 
          : `Validation échouée (status: ${response.status})`
      };
    } catch (error) {
      return {
        success: false,
        message: `Erreur test validation`
      };
    }
  }

  private async testSecurityHeaders(): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat/gemini`, {
        method: 'OPTIONS'
      });

      const hasSecurityHeaders = [
        'x-frame-options',
        'x-content-type-options'
      ].some(header => response.headers.has(header));

      return {
        success: hasSecurityHeaders,
        message: hasSecurityHeaders 
          ? 'Headers de sécurité présents' 
          : 'Headers de sécurité manquants'
      };
    } catch (error) {
      return {
        success: false,
        message: `Erreur test headers sécurité`
      };
    }
  }

  private displayResults(): void {
    console.log('\n' + '='.repeat(50));
    console.log('📊 RÉSULTATS');
    console.log('='.repeat(50));
    
    const passed = this.results.filter(r => r.success).length;
    const failed = this.results.filter(r => !r.success).length;
    const totalDuration = this.results.reduce((sum, r) => sum + r.duration, 0);

    console.log(`Total: ${this.results.length} tests`);
    console.log(`✅ Réussis: ${passed}`);
    console.log(`❌ Échoués: ${failed}`);
    console.log(`⏱️  Durée totale: ${totalDuration}ms`);

    if (failed > 0) {
      console.log('\n🚨 TESTS ÉCHOUÉS:');
      this.results
        .filter(r => !r.success)
        .forEach(result => {
          console.log(`  - ${result.name}: ${result.message}`);
        });
    }

    console.log('\n' + '='.repeat(50));
    console.log(failed === 0 ? '🎉 TOUS LES TESTS SONT PASSÉS' : '💥 CERTAINS TESTS ONT ÉCHOUÉ');
    console.log('='.repeat(50));
  }
}

// Exécution
async function main() {
  const validator = new SimpleChatValidator();
  const success = await validator.validate();
  process.exit(success ? 0 : 1);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { SimpleChatValidator };