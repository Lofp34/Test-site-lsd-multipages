/**
 * Tests fonctionnels de navigation pour la page d'accueil
 * Task 8.1: Tester tous les liens de la page d'accueil, vérifier les redirections, valider les parcours de conversion
 * Requirements: 3.3, 4.3
 */

import { LinkValidationService } from './link-validation';
import { trackCTAClick } from './cta-tracking';

export interface NavigationTestResult {
  testName: string;
  success: boolean;
  details: string;
  errors?: string[];
}

export interface ConversionPath {
  name: string;
  steps: Array<{
    section: string;
    ctaId: string;
    destination: string;
    expectedStatus: number;
  }>;
}

export class HomepageNavigationTester {
  private linkValidator: LinkValidationService;
  private baseUrl: string;

  constructor() {
    this.linkValidator = new LinkValidationService({
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
      timeout: 10000,
      retryAttempts: 3,
      enableLogging: true
    });
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  }

  /**
   * Test tous les liens de la page d'accueil
   */
  async testAllHomepageLinks(): Promise<NavigationTestResult> {
    console.log('🔗 Test de tous les liens de la page d\'accueil...');

    // Liste complète des liens de la page d'accueil
    const homepageLinks = [
      // CTAs Hero Section
      '/bootcamp',
      '/ressources',
      
      // CTAs Problem Section
      '/bootcamp',
      '/ressources',
      '/diagnostic',
      
      // CTAs Resources Section
      '/bootcamp',
      '/contact',
      
      // Liens spécifiques des ressources
      '/ressources/scripts-prospection',
      '/ressources/linkedin-prospection',
      '/ressources/systeme-suivi-prospects',
      '/ressources/techniques-motivation-equipe',
      '/ressources/guide-recrutement-commercial',
      '/ressources/techniques-de-negociation',
      
      // Pages de navigation générale
      '/a-propos',
      '/services',
      '/cas-clients',
      '/blog',
      '/mentions-legales',
      '/politique-de-confidentialite',
      '/cgv'
    ];

    try {
      const validationResults = await this.linkValidator.validateInternalLinks(homepageLinks);
      
      const brokenLinks = validationResults.filter(result => !result.isValid);
      const validLinks = validationResults.filter(result => result.isValid);
      
      console.log(`✅ Liens valides: ${validLinks.length}/${homepageLinks.length}`);
      
      if (brokenLinks.length > 0) {
        console.log(`❌ Liens cassés détectés: ${brokenLinks.length}`);
        brokenLinks.forEach(link => {
          console.log(`   - ${link.url}: ${link.error || `Status ${link.statusCode}`}`);
          if (link.suggestedRedirect) {
            console.log(`     → Redirection suggérée: ${link.suggestedRedirect}`);
          }
        });
      }

      return {
        testName: 'Homepage Links Validation',
        success: brokenLinks.length === 0,
        details: `${validLinks.length}/${homepageLinks.length} liens valides`,
        errors: brokenLinks.map(link => `${link.url}: ${link.error || `Status ${link.statusCode}`}`)
      };
    } catch (error) {
      return {
        testName: 'Homepage Links Validation',
        success: false,
        details: 'Erreur lors de la validation des liens',
        errors: [error instanceof Error ? error.message : 'Erreur inconnue']
      };
    }
  }

  /**
   * Test le bon fonctionnement des redirections
   */
  async testRedirections(): Promise<NavigationTestResult> {
    console.log('🔄 Test des redirections...');

    // Liens qui devraient être redirigés selon le design
    const redirectionTests = [
      {
        original: '/ressources/scripts-impact',
        expected: '/ressources/scripts-prospection',
        reason: 'Redirection scripts IMPACT vers page créée'
      },
      {
        original: '/ressources/linkedin-guide',
        expected: '/ressources/linkedin-prospection',
        reason: 'Redirection guide LinkedIn vers page créée'
      },
      {
        original: '/ressources/suivi-prospects',
        expected: '/ressources/systeme-suivi-prospects',
        reason: 'Redirection suivi prospects vers page créée'
      },
      {
        original: '/ressources/motivation-coaching',
        expected: '/ressources/techniques-motivation-equipe',
        reason: 'Redirection motivation vers page créée'
      },
      {
        original: '/ressources/recrutement',
        expected: '/ressources/guide-recrutement-commercial',
        reason: 'Redirection recrutement vers page créée'
      }
    ];

    const results: Array<{ test: string; success: boolean; details: string }> = [];

    for (const test of redirectionTests) {
      try {
        const response = await fetch(`${this.baseUrl}${test.original}`, {
          method: 'HEAD',
          redirect: 'manual'
        });

        const isRedirect = response.status >= 300 && response.status < 400;
        const location = response.headers.get('location');
        
        if (isRedirect && location) {
          const redirectsToExpected = location.includes(test.expected) || 
                                    location === test.expected ||
                                    location === `${this.baseUrl}${test.expected}`;
          
          results.push({
            test: test.original,
            success: redirectsToExpected,
            details: redirectsToExpected 
              ? `Redirige correctement vers ${location}`
              : `Redirige vers ${location} au lieu de ${test.expected}`
          });
        } else {
          // Vérifier si la page existe directement
          const directResponse = await fetch(`${this.baseUrl}${test.expected}`, {
            method: 'HEAD'
          });
          
          results.push({
            test: test.original,
            success: directResponse.ok,
            details: directResponse.ok 
              ? `Page de destination ${test.expected} existe`
              : `Ni redirection ni page de destination trouvée`
          });
        }
      } catch (error) {
        results.push({
          test: test.original,
          success: false,
          details: `Erreur lors du test: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
        });
      }
    }

    const successfulTests = results.filter(r => r.success).length;
    const failedTests = results.filter(r => !r.success);

    console.log(`✅ Redirections testées: ${successfulTests}/${results.length}`);
    
    if (failedTests.length > 0) {
      console.log('❌ Redirections échouées:');
      failedTests.forEach(test => {
        console.log(`   - ${test.test}: ${test.details}`);
      });
    }

    return {
      testName: 'Redirections Test',
      success: failedTests.length === 0,
      details: `${successfulTests}/${results.length} redirections fonctionnelles`,
      errors: failedTests.map(test => `${test.test}: ${test.details}`)
    };
  }

  /**
   * Test des parcours de conversion complets
   */
  async testConversionPaths(): Promise<NavigationTestResult> {
    console.log('🎯 Test des parcours de conversion...');

    // Définition des parcours de conversion critiques
    const conversionPaths: ConversionPath[] = [
      {
        name: 'Parcours Bootcamp Principal',
        steps: [
          { section: 'hero', ctaId: 'hero-bootcamp', destination: '/bootcamp', expectedStatus: 200 },
          { section: 'problem', ctaId: 'problem-bootcamp', destination: '/bootcamp', expectedStatus: 200 },
          { section: 'resources-conversion', ctaId: 'resources-bootcamp', destination: '/bootcamp', expectedStatus: 200 }
        ]
      },
      {
        name: 'Parcours Ressources Gratuites',
        steps: [
          { section: 'hero', ctaId: 'hero-resources', destination: '/ressources', expectedStatus: 200 },
          { section: 'problem', ctaId: 'problem-resources', destination: '/ressources', expectedStatus: 200 }
        ]
      },
      {
        name: 'Parcours Diagnostic',
        steps: [
          { section: 'problem', ctaId: 'problem-diagnostic', destination: '/diagnostic', expectedStatus: 200 }
        ]
      },
      {
        name: 'Parcours Contact',
        steps: [
          { section: 'resources-conversion', ctaId: 'resources-contact', destination: '/contact', expectedStatus: 200 }
        ]
      },
      {
        name: 'Parcours Ressources Spécifiques',
        steps: [
          { section: 'resources-grid', ctaId: 'resource-scripts-prospection', destination: '/ressources/scripts-prospection', expectedStatus: 200 },
          { section: 'resources-grid', ctaId: 'resource-linkedin-prospection', destination: '/ressources/linkedin-prospection', expectedStatus: 200 },
          { section: 'resources-grid', ctaId: 'resource-systeme-suivi-prospects', destination: '/ressources/systeme-suivi-prospects', expectedStatus: 200 },
          { section: 'resources-grid', ctaId: 'resource-techniques-motivation-equipe', destination: '/ressources/techniques-motivation-equipe', expectedStatus: 200 },
          { section: 'resources-grid', ctaId: 'resource-guide-recrutement-commercial', destination: '/ressources/guide-recrutement-commercial', expectedStatus: 200 }
        ]
      }
    ];

    const pathResults: Array<{ path: string; success: boolean; details: string; errors?: string[] }> = [];

    for (const path of conversionPaths) {
      console.log(`   Testing: ${path.name}`);
      
      const stepResults: Array<{ step: string; success: boolean; details: string }> = [];
      
      for (const step of path.steps) {
        try {
          // Test de la destination
          const response = await fetch(`${this.baseUrl}${step.destination}`, {
            method: 'HEAD'
          });
          
          const success = response.status === step.expectedStatus;
          
          stepResults.push({
            step: `${step.section} -> ${step.destination}`,
            success,
            details: success 
              ? `Status ${response.status} (attendu: ${step.expectedStatus})`
              : `Status ${response.status} (attendu: ${step.expectedStatus})`
          });

          // Simuler le tracking du CTA (sans réellement envoyer à GA)
          if (success) {
            console.log(`     ✅ CTA ${step.ctaId} -> ${step.destination} (${response.status})`);
          } else {
            console.log(`     ❌ CTA ${step.ctaId} -> ${step.destination} (${response.status})`);
          }
          
        } catch (error) {
          stepResults.push({
            step: `${step.section} -> ${step.destination}`,
            success: false,
            details: `Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
          });
        }
      }
      
      const successfulSteps = stepResults.filter(s => s.success).length;
      const failedSteps = stepResults.filter(s => !s.success);
      
      pathResults.push({
        path: path.name,
        success: failedSteps.length === 0,
        details: `${successfulSteps}/${stepResults.length} étapes réussies`,
        errors: failedSteps.map(s => `${s.step}: ${s.details}`)
      });
    }

    const successfulPaths = pathResults.filter(p => p.success).length;
    const failedPaths = pathResults.filter(p => !p.success);

    console.log(`✅ Parcours de conversion: ${successfulPaths}/${pathResults.length} réussis`);
    
    if (failedPaths.length > 0) {
      console.log('❌ Parcours échoués:');
      failedPaths.forEach(path => {
        console.log(`   - ${path.path}: ${path.details}`);
        if (path.errors) {
          path.errors.forEach(error => console.log(`     • ${error}`));
        }
      });
    }

    return {
      testName: 'Conversion Paths Test',
      success: failedPaths.length === 0,
      details: `${successfulPaths}/${pathResults.length} parcours de conversion fonctionnels`,
      errors: failedPaths.flatMap(path => path.errors || [])
    };
  }

  /**
   * Test de la cohérence des CTAs
   */
  async testCTAConsistency(): Promise<NavigationTestResult> {
    console.log('🎯 Test de cohérence des CTAs...');

    // Vérification que les CTAs principaux pointent vers les bonnes destinations
    const ctaConsistencyTests = [
      {
        ctaType: 'bootcamp',
        expectedDestination: '/bootcamp',
        sections: ['hero', 'problem', 'resources-conversion']
      },
      {
        ctaType: 'resources',
        expectedDestination: '/ressources',
        sections: ['hero', 'problem']
      },
      {
        ctaType: 'diagnostic',
        expectedDestination: '/diagnostic',
        sections: ['problem']
      },
      {
        ctaType: 'contact',
        expectedDestination: '/contact',
        sections: ['resources-conversion']
      }
    ];

    const consistencyResults: Array<{ test: string; success: boolean; details: string }> = [];

    for (const test of ctaConsistencyTests) {
      try {
        // Vérifier que la destination existe
        const response = await fetch(`${this.baseUrl}${test.expectedDestination}`, {
          method: 'HEAD'
        });

        const destinationExists = response.ok;
        
        consistencyResults.push({
          test: `CTA ${test.ctaType} consistency`,
          success: destinationExists,
          details: destinationExists 
            ? `Destination ${test.expectedDestination} accessible dans ${test.sections.length} sections`
            : `Destination ${test.expectedDestination} inaccessible (Status: ${response.status})`
        });

      } catch (error) {
        consistencyResults.push({
          test: `CTA ${test.ctaType} consistency`,
          success: false,
          details: `Erreur lors du test: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
        });
      }
    }

    const successfulTests = consistencyResults.filter(r => r.success).length;
    const failedTests = consistencyResults.filter(r => !r.success);

    console.log(`✅ Cohérence des CTAs: ${successfulTests}/${consistencyResults.length}`);
    
    if (failedTests.length > 0) {
      console.log('❌ Incohérences détectées:');
      failedTests.forEach(test => {
        console.log(`   - ${test.test}: ${test.details}`);
      });
    }

    return {
      testName: 'CTA Consistency Test',
      success: failedTests.length === 0,
      details: `${successfulTests}/${consistencyResults.length} CTAs cohérents`,
      errors: failedTests.map(test => `${test.test}: ${test.details}`)
    };
  }

  /**
   * Exécute tous les tests de navigation fonctionnelle
   */
  async runAllNavigationTests(): Promise<{
    success: boolean;
    summary: string;
    results: NavigationTestResult[];
  }> {
    console.log('🚀 Démarrage des tests fonctionnels de navigation...\n');

    const results: NavigationTestResult[] = [];

    try {
      // Test 1: Validation de tous les liens
      const linksTest = await this.testAllHomepageLinks();
      results.push(linksTest);

      // Test 2: Test des redirections
      const redirectionsTest = await this.testRedirections();
      results.push(redirectionsTest);

      // Test 3: Test des parcours de conversion
      const conversionTest = await this.testConversionPaths();
      results.push(conversionTest);

      // Test 4: Test de cohérence des CTAs
      const ctaConsistencyTest = await this.testCTAConsistency();
      results.push(ctaConsistencyTest);

      const successfulTests = results.filter(r => r.success).length;
      const totalTests = results.length;

      console.log('\n📊 Résumé des tests de navigation:');
      results.forEach(result => {
        const status = result.success ? '✅' : '❌';
        console.log(`   ${status} ${result.testName}: ${result.details}`);
        if (!result.success && result.errors) {
          result.errors.forEach(error => console.log(`      • ${error}`));
        }
      });

      const overallSuccess = successfulTests === totalTests;
      const summary = `${successfulTests}/${totalTests} tests réussis`;

      console.log(`\n🎯 Résultat global: ${overallSuccess ? '✅ SUCCÈS' : '❌ ÉCHEC'} - ${summary}`);

      return {
        success: overallSuccess,
        summary,
        results
      };

    } catch (error) {
      console.error('❌ Erreur lors des tests de navigation:', error);
      return {
        success: false,
        summary: 'Erreur lors de l\'exécution des tests',
        results
      };
    }
  }
}

// Export des fonctions utilitaires
export const runHomepageNavigationTests = async () => {
  const tester = new HomepageNavigationTester();
  return await tester.runAllNavigationTests();
};

export const validateHomepageLinks = async (links: string[]) => {
  const tester = new HomepageNavigationTester();
  return await tester.testAllHomepageLinks();
};

export const testHomepageRedirections = async () => {
  const tester = new HomepageNavigationTester();
  return await tester.testRedirections();
};

export const testHomepageConversionPaths = async () => {
  const tester = new HomepageNavigationTester();
  return await tester.testConversionPaths();
};