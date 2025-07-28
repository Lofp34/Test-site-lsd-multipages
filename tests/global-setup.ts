/**
 * Configuration globale avant l'exécution des tests Playwright
 * Prépare l'environnement pour les tests de validation utilisateur
 */

import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🔧 Configuration globale des tests de validation utilisateur...');
  
  // Créer un navigateur pour les vérifications préliminaires
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Vérifier que l'application est accessible
    const baseURL = config.projects[0].use.baseURL || 'http://localhost:3000';
    console.log(`🌐 Vérification de l'accessibilité de ${baseURL}...`);
    
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    
    // Vérifier que la page principale se charge
    await page.waitForSelector('body', { timeout: 10000 });
    console.log('✅ Application accessible');
    
    // Vérifier que la page technique existe
    const techniqueURL = `${baseURL}/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux`;
    await page.goto(techniqueURL, { waitUntil: 'networkidle' });
    await page.waitForSelector('h1', { timeout: 10000 });
    console.log('✅ Page technique accessible');
    
    // Injecter des utilitaires globaux pour les tests
    await page.addInitScript(() => {
      // Utilitaires pour mesurer les performances
      (window as any).testUtils = {
        measurePerformance: () => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          return {
            loadTime: navigation.loadEventEnd - navigation.fetchStart,
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
            firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
            firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
          };
        },
        
        // Utilitaire pour simuler des interactions utilisateur réalistes
        simulateHumanDelay: (min = 100, max = 500) => {
          return new Promise(resolve => {
            setTimeout(resolve, Math.random() * (max - min) + min);
          });
        },
        
        // Utilitaire pour vérifier l'accessibilité
        checkAccessibility: async () => {
          // Injecter axe-core si pas déjà présent
          if (!(window as any).axe) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/axe-core@4.7.0/axe.min.js';
            document.head.appendChild(script);
            
            await new Promise(resolve => {
              script.onload = resolve;
            });
          }
          
          return new Promise((resolve) => {
            (window as any).axe.run((err: any, results: any) => {
              if (err) throw err;
              resolve(results);
            });
          });
        }
      };
    });
    
    console.log('✅ Configuration globale terminée');
    
  } catch (error) {
    console.error('❌ Erreur lors de la configuration globale:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;