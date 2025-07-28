/**
 * Tests E2E de validation du parcours utilisateur
 * Utilise Playwright pour des tests réalistes
 * Couvre les requirements 5.5, 6.5, 7.5
 */

import { test, expect, Page, Browser } from '@playwright/test';

// Configuration des tests E2E
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const TECHNIQUE_URL = `${BASE_URL}/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux`;

// Types pour les métriques de validation
interface UserJourneyMetrics {
  loadTime: number;
  interactionTime: number;
  conversionRate: number;
  accessibilityScore: number;
  mobileScore: number;
}

interface ValidationResult {
  testName: string;
  passed: boolean;
  metrics: UserJourneyMetrics;
  issues: string[];
  recommendations: string[];
}

// Tests de parcours utilisateur complet
test.describe('Validation utilisateur - Page technique négociation', () => {
  
  test.beforeEach(async ({ page }) => {
    // Configuration initiale pour tous les tests
    await page.goto(TECHNIQUE_URL);
    await page.waitForLoadState('networkidle');
  });

  test('Parcours complet de lecture - Utilisateur novice', async ({ page }) => {
    const startTime = Date.now();
    
    // 1. Vérification du chargement initial
    await expect(page.locator('h1')).toContainText('Ne jamais couper la poire en deux');
    await expect(page.locator('[data-testid="fbi-badge"]')).toBeVisible();
    
    // 2. Scroll et lecture du contenu principal
    await page.locator('[data-testid="laurent-vision"]').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-testid="laurent-vision"]')).toBeVisible();
    
    // 3. Interaction avec le guide étape par étape
    const steps = page.locator('[data-testid="step-card"]');
    const stepCount = await steps.count();
    expect(stepCount).toBeGreaterThan(0);
    
    // Clic sur chaque étape pour vérifier l'interactivité
    for (let i = 0; i < stepCount; i++) {
      await steps.nth(i).click();
      await page.waitForTimeout(500); // Animation
    }
    
    // 4. Consultation des cas clients PME
    await page.locator('[data-testid="case-studies"]').scrollIntoViewIfNeeded();
    const caseStudies = page.locator('[data-testid="case-study-card"]');
    const caseCount = await caseStudies.count();
    expect(caseCount).toBeGreaterThanOrEqual(3);
    
    // 5. Test des outils interactifs
    await page.locator('[data-testid="interactive-checklist"]').scrollIntoViewIfNeeded();
    const checklistItems = page.locator('[data-testid="checklist-item"]');
    const firstItem = checklistItems.first();
    await firstItem.click();
    await expect(firstItem).toHaveClass(/checked/);
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000); // Moins de 5 secondes pour le parcours complet
  });

  test('Téléchargement de ressources - Processus complet', async ({ page }) => {
    // 1. Localiser et cliquer sur une ressource téléchargeable
    const downloadButton = page.locator('[data-testid="download-resource"]').first();
    await downloadButton.scrollIntoViewIfNeeded();
    await downloadButton.click();
    
    // 2. Vérifier l'ouverture du modal de preview
    const modal = page.locator('[data-testid="resource-preview-modal"]');
    await expect(modal).toBeVisible();
    
    // 3. Remplir le formulaire de capture lead
    await page.fill('[data-testid="lead-form-email"]', 'test@example.com');
    await page.fill('[data-testid="lead-form-name"]', 'Test User');
    await page.fill('[data-testid="lead-form-company"]', 'Test Company');
    
    // 4. Soumettre le formulaire
    await page.click('[data-testid="submit-lead-form"]');
    
    // 5. Vérifier la confirmation et le déclenchement du téléchargement
    await expect(page.locator('[data-testid="download-success"]')).toBeVisible();
    
    // 6. Vérifier que l'événement de tracking a été déclenché
    const trackingEvents = await page.evaluate(() => {
      return (window as any).dataLayer?.filter((event: any) => 
        event.event === 'resource_download'
      ) || [];
    });
    expect(trackingEvents.length).toBeGreaterThan(0);
  });

  test('Conversion vers diagnostic gratuit', async ({ page }) => {
    // 1. Identifier et cliquer sur le CTA diagnostic principal
    const diagnosticCTA = page.locator('[data-testid="cta-diagnostic-principal"]');
    await diagnosticCTA.scrollIntoViewIfNeeded();
    await diagnosticCTA.click();
    
    // 2. Vérifier la redirection vers la page diagnostic
    await page.waitForURL('**/diagnostic**');
    await expect(page.locator('h1')).toContainText('Diagnostic');
    
    // 3. Vérifier le pré-remplissage des informations (si applicable)
    const sourceField = page.locator('[data-testid="source-field"]');
    if (await sourceField.isVisible()) {
      await expect(sourceField).toHaveValue(/technique.*negociation/i);
    }
    
    // 4. Remplir et soumettre le formulaire de diagnostic
    await page.fill('[data-testid="diagnostic-email"]', 'test@example.com');
    await page.fill('[data-testid="diagnostic-phone"]', '0123456789');
    await page.selectOption('[data-testid="company-size"]', '10-50');
    await page.fill('[data-testid="main-challenge"]', 'Améliorer les techniques de négociation');
    
    await page.click('[data-testid="submit-diagnostic"]');
    
    // 5. Vérifier la confirmation
    await expect(page.locator('[data-testid="diagnostic-confirmation"]')).toBeVisible();
  });

  test('Conversion vers bootcamp négociation', async ({ page }) => {
    // 1. Localiser le CTA bootcamp
    const bootcampCTA = page.locator('[data-testid="cta-bootcamp"]');
    await bootcampCTA.scrollIntoViewIfNeeded();
    await bootcampCTA.click();
    
    // 2. Vérifier la redirection vers la page bootcamp
    await page.waitForURL('**/formation-commerciale-pme**');
    
    // 3. Vérifier que le focus est sur le module négociation
    const negotiationModule = page.locator('[data-testid="module-negociation"]');
    await expect(negotiationModule).toBeVisible();
    
    // 4. Tester le processus d'inscription
    const inscriptionButton = page.locator('[data-testid="inscription-bootcamp"]');
    if (await inscriptionButton.isVisible()) {
      await inscriptionButton.click();
      await expect(page.locator('[data-testid="inscription-form"]')).toBeVisible();
    }
  });
});

// Tests spécifiques mobile
test.describe('Expérience mobile', () => {
  test.use({ 
    viewport: { width: 375, height: 667 } // iPhone SE
  });

  test('Navigation mobile optimisée', async ({ page }) => {
    await page.goto(TECHNIQUE_URL);
    
    // 1. Vérifier que le contenu s'affiche correctement
    await expect(page.locator('h1')).toBeVisible();
    
    // 2. Tester le menu mobile si présent
    const mobileMenu = page.locator('[data-testid="mobile-menu-toggle"]');
    if (await mobileMenu.isVisible()) {
      await mobileMenu.click();
      await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
    }
    
    // 3. Vérifier la taille des zones tactiles
    const ctaButtons = page.locator('[data-testid*="cta"]');
    const buttonCount = await ctaButtons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = ctaButtons.nth(i);
      const box = await button.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44); // Minimum 44px pour iOS
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }
    
    // 4. Test du scroll et de la performance
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    // Vérifier que les animations ne causent pas de lag
    const performanceEntries = await page.evaluate(() => {
      return performance.getEntriesByType('measure').map(entry => ({
        name: entry.name,
        duration: entry.duration
      }));
    });
    
    // Aucune animation ne devrait prendre plus de 16ms (60fps)
    const slowAnimations = performanceEntries.filter(entry => entry.duration > 16);
    expect(slowAnimations.length).toBe(0);
  });

  test('Formulaires mobiles optimisés', async ({ page }) => {
    await page.goto(TECHNIQUE_URL);
    
    // Tester le formulaire de téléchargement sur mobile
    const downloadButton = page.locator('[data-testid="download-resource"]').first();
    await downloadButton.click();
    
    const modal = page.locator('[data-testid="resource-preview-modal"]');
    await expect(modal).toBeVisible();
    
    // Vérifier que les champs sont accessibles au clavier mobile
    const emailField = page.locator('[data-testid="lead-form-email"]');
    await emailField.focus();
    await expect(emailField).toBeFocused();
    
    // Vérifier le type de clavier (email)
    const inputType = await emailField.getAttribute('type');
    expect(inputType).toBe('email');
  });
});

// Tests d'accessibilité
test.describe('Accessibilité WCAG 2.1 AA', () => {
  test('Contraste et lisibilité', async ({ page }) => {
    await page.goto(TECHNIQUE_URL);
    
    // Injecter axe-core pour les tests d'accessibilité
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
    
    // Exécuter les tests d'accessibilité
    const accessibilityResults = await page.evaluate(() => {
      return new Promise((resolve) => {
        (window as any).axe.run((err: any, results: any) => {
          if (err) throw err;
          resolve(results);
        });
      });
    });
    
    const violations = (accessibilityResults as any).violations;
    
    // Vérifier qu'il n'y a pas de violations critiques
    const criticalViolations = violations.filter((v: any) => 
      v.impact === 'critical' || v.impact === 'serious'
    );
    
    expect(criticalViolations.length).toBe(0);
  });

  test('Navigation au clavier', async ({ page }) => {
    await page.goto(TECHNIQUE_URL);
    
    // Tester la navigation avec Tab
    await page.keyboard.press('Tab');
    let focusedElement = await page.locator(':focus').first();
    await expect(focusedElement).toBeVisible();
    
    // Continuer la navigation et vérifier que tous les éléments interactifs sont accessibles
    const interactiveElements = await page.locator('button, a, input, [tabindex]').count();
    
    for (let i = 0; i < Math.min(interactiveElements, 10); i++) {
      await page.keyboard.press('Tab');
      focusedElement = await page.locator(':focus').first();
      
      // Vérifier que l'élément focusé est visible
      await expect(focusedElement).toBeVisible();
      
      // Vérifier qu'il y a un indicateur de focus visible
      const focusOutline = await focusedElement.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return styles.outline !== 'none' || styles.boxShadow !== 'none';
      });
      expect(focusOutline).toBe(true);
    }
  });

  test('Lecteurs d\'écran', async ({ page }) => {
    await page.goto(TECHNIQUE_URL);
    
    // Vérifier les textes alternatifs des images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const ariaLabel = await img.getAttribute('aria-label');
      
      // Chaque image doit avoir un alt ou aria-label
      expect(alt || ariaLabel).toBeTruthy();
    }
    
    // Vérifier la structure des headings
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
    expect(headings.length).toBeGreaterThan(0);
    
    // Vérifier qu'il y a un seul H1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    
    // Vérifier les labels des formulaires
    const inputs = page.locator('input, textarea, select');
    const inputCount = await inputs.count();
    
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = await label.count() > 0;
        expect(hasLabel || ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    }
  });
});

// Tests de performance
test.describe('Performance et Core Web Vitals', () => {
  test('Temps de chargement et métriques', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto(TECHNIQUE_URL);
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(2500); // Objectif < 2.5s
    
    // Mesurer les Core Web Vitals
    const webVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals: any = {};
        
        // LCP (Largest Contentful Paint)
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          vitals.lcp = lastEntry.startTime;
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // FID (First Input Delay) - simulé avec un clic
        document.addEventListener('click', (event) => {
          vitals.fid = performance.now() - (event as any).timeStamp;
        }, { once: true });
        
        // CLS (Cumulative Layout Shift)
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          vitals.cls = clsValue;
        }).observe({ entryTypes: ['layout-shift'] });
        
        setTimeout(() => resolve(vitals), 3000);
      });
    });
    
    const vitals = webVitals as any;
    
    // Vérifier les seuils Core Web Vitals
    if (vitals.lcp) expect(vitals.lcp).toBeLessThan(2500); // LCP < 2.5s
    if (vitals.cls) expect(vitals.cls).toBeLessThan(0.1);   // CLS < 0.1
    
    // Déclencher un clic pour mesurer FID
    await page.click('[data-testid="cta-diagnostic-principal"]');
    await page.waitForTimeout(100);
    
    const finalVitals = await page.evaluate(() => (window as any).webVitals || {});
    if (finalVitals.fid) expect(finalVitals.fid).toBeLessThan(100); // FID < 100ms
  });
});

// Utilitaires pour les rapports
export class ValidationReporter {
  private results: ValidationResult[] = [];

  addResult(result: ValidationResult) {
    this.results.push(result);
  }

  generateReport(): string {
    const totalTests = this.results.length;
    const passedTests = this.results.filter(r => r.passed).length;
    const successRate = (passedTests / totalTests) * 100;

    let report = `
📊 RAPPORT DE VALIDATION UTILISATEUR E2E
========================================

Résultats globaux:
- Tests exécutés: ${totalTests}
- Tests réussis: ${passedTests}
- Taux de réussite: ${successRate.toFixed(1)}%

Métriques moyennes:
- Temps de chargement: ${this.getAverageMetric('loadTime')}ms
- Score d'accessibilité: ${this.getAverageMetric('accessibilityScore')}/100
- Score mobile: ${this.getAverageMetric('mobileScore')}/100

Détail par test:
`;

    this.results.forEach(result => {
      report += `
${result.passed ? '✅' : '❌'} ${result.testName}
   Métriques: Load ${result.metrics.loadTime}ms | A11y ${result.metrics.accessibilityScore} | Mobile ${result.metrics.mobileScore}
`;
      if (result.issues.length > 0) {
        report += `   Issues: ${result.issues.join(', ')}\n`;
      }
      if (result.recommendations.length > 0) {
        report += `   Recommandations: ${result.recommendations.join(', ')}\n`;
      }
    });

    return report;
  }

  private getAverageMetric(metric: keyof UserJourneyMetrics): number {
    const values = this.results
      .map(r => r.metrics[metric])
      .filter(v => v > 0);
    
    return values.length > 0 
      ? Math.round(values.reduce((a, b) => a + b, 0) / values.length)
      : 0;
  }
}