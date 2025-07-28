/**
 * Nettoyage global après l'exécution des tests Playwright
 * Génère les rapports finaux et nettoie les ressources
 */

import { FullConfig } from '@playwright/test';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Nettoyage global après les tests de validation...');
  
  try {
    // Créer le dossier de rapports s'il n'existe pas
    const reportsDir = 'reports';
    if (!existsSync(reportsDir)) {
      mkdirSync(reportsDir, { recursive: true });
    }
    
    // Générer un résumé des tests
    const summary = {
      timestamp: new Date().toISOString(),
      config: {
        baseURL: config.projects[0].use.baseURL,
        browsers: config.projects.map(p => p.name),
        workers: config.workers,
        retries: config.retries,
      },
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        ci: !!process.env.CI,
      },
      testFiles: [
        'user-journey-validation.ts',
        // Autres fichiers de test...
      ]
    };
    
    const summaryFile = join(reportsDir, `test-summary-${Date.now()}.json`);
    writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
    
    console.log(`📊 Résumé des tests sauvegardé: ${summaryFile}`);
    
    // Nettoyer les fichiers temporaires si nécessaire
    // (screenshots, vidéos, traces seront conservés pour analyse)
    
    console.log('✅ Nettoyage global terminé');
    
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage global:', error);
    // Ne pas faire échouer les tests à cause du nettoyage
  }
}

export default globalTeardown;