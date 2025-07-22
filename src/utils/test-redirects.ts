/**
 * Redirect Testing Utility
 * Tests redirect functionality and validates redirect rules
 */

import { allRedirects, getRedirectForUrl, redirectAnalytics } from '../config/redirects';

export interface RedirectTestResult {
  source: string;
  expectedDestination: string;
  actualDestination: string | null;
  isWorking: boolean;
  statusCode?: number;
  error?: string;
}

export class RedirectTester {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  /**
   * Tests all configured redirects
   */
  async testAllRedirects(): Promise<RedirectTestResult[]> {
    const results: RedirectTestResult[] = [];

    for (const redirect of allRedirects) {
      const result = await this.testSingleRedirect(redirect.source, redirect.destination);
      results.push(result);
    }

    return results;
  }

  /**
   * Tests a single redirect
   */
  async testSingleRedirect(source: string, expectedDestination: string): Promise<RedirectTestResult> {
    try {
      const url = `${this.baseUrl}${source}`;
      
      const response = await fetch(url, {
        method: 'HEAD',
        redirect: 'manual' // Don't follow redirects automatically
      });

      const actualDestination = response.headers.get('location');
      const isWorking = actualDestination === expectedDestination || 
                       actualDestination === `${this.baseUrl}${expectedDestination}`;

      return {
        source,
        expectedDestination,
        actualDestination,
        isWorking,
        statusCode: response.status
      };

    } catch (error) {
      return {
        source,
        expectedDestination,
        actualDestination: null,
        isWorking: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Tests redirect logic without making HTTP requests
   */
  testRedirectLogic(): RedirectTestResult[] {
    const testCases = [
      '/ressources/scripts-impact',
      '/ressources/aida-scripts',
      '/ressources/linkedin-guide',
      '/ressources/suivi-prospects',
      '/ressources/motivation-coaching',
      '/ressources/recrutement',
      '/ressources/unknown-page'
    ];

    return testCases.map(source => {
      const redirect = getRedirectForUrl(source);
      const expectedDestination = this.getExpectedDestination(source);
      
      return {
        source,
        expectedDestination,
        actualDestination: redirect?.destination || null,
        isWorking: redirect?.destination === expectedDestination
      };
    });
  }

  /**
   * Gets expected destination for a source URL
   */
  private getExpectedDestination(source: string): string {
    const mapping: Record<string, string> = {
      '/ressources/scripts-impact': '/ressources/scripts-prospection',
      '/ressources/aida-scripts': '/ressources/scripts-prospection',
      '/ressources/linkedin-guide': '/ressources/linkedin-prospection',
      '/ressources/suivi-prospects': '/ressources/systeme-suivi-prospects',
      '/ressources/motivation-coaching': '/ressources/techniques-motivation-equipe',
      '/ressources/recrutement': '/ressources/guide-recrutement-commercial',
      '/ressources/unknown-page': '/ressources'
    };

    return mapping[source] || '/ressources';
  }

  /**
   * Generates a test report
   */
  generateTestReport(results: RedirectTestResult[]): string {
    const totalTests = results.length;
    const passedTests = results.filter(r => r.isWorking).length;
    const failedTests = totalTests - passedTests;

    let report = `# Redirect Test Report\n\n`;
    report += `**Generated:** ${new Date().toISOString()}\n`;
    report += `**Total Tests:** ${totalTests}\n`;
    report += `**Passed:** ${passedTests}\n`;
    report += `**Failed:** ${failedTests}\n`;
    report += `**Success Rate:** ${Math.round(passedTests / totalTests * 100)}%\n\n`;

    if (failedTests > 0) {
      report += `## Failed Tests\n\n`;
      results
        .filter(r => !r.isWorking)
        .forEach(result => {
          report += `### ${result.source}\n`;
          report += `- **Expected:** ${result.expectedDestination}\n`;
          report += `- **Actual:** ${result.actualDestination || 'null'}\n`;
          if (result.statusCode) {
            report += `- **Status Code:** ${result.statusCode}\n`;
          }
          if (result.error) {
            report += `- **Error:** ${result.error}\n`;
          }
          report += `\n`;
        });
    }

    report += `## All Test Results\n\n`;
    results.forEach(result => {
      const status = result.isWorking ? '✅' : '❌';
      report += `${status} \`${result.source}\` → \`${result.actualDestination || 'null'}\`\n`;
    });

    return report;
  }

  /**
   * Tests redirect analytics
   */
  testRedirectAnalytics(): void {
    console.log('🧪 Testing redirect analytics...');

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

    // Get stats
    const stats = redirectAnalytics.getRedirectStats();
    const mostRedirected = redirectAnalytics.getMostRedirectedUrls();

    console.log('📊 Redirect Stats:', stats);
    console.log('🔝 Most Redirected URLs:', mostRedirected);

    // Clear test data
    redirectAnalytics.clearLogs();
    console.log('✅ Analytics test completed');
  }
}

// Export utility functions
export const testRedirects = async (baseUrl?: string) => {
  const tester = new RedirectTester(baseUrl);
  return await tester.testAllRedirects();
};

export const testRedirectLogic = () => {
  const tester = new RedirectTester();
  return tester.testRedirectLogic();
};

export const generateRedirectReport = (results: RedirectTestResult[]) => {
  const tester = new RedirectTester();
  return tester.generateTestReport(results);
};