import { defineConfig, devices } from '@playwright/test';

/**
 * Configuration Playwright pour les tests de validation utilisateur
 * Optimisée pour tester la page technique de négociation
 */
export default defineConfig({
  testDir: './src/utils/e2e',
  
  /* Exécuter les tests en parallèle */
  fullyParallel: true,
  
  /* Échouer la build CI si vous avez accidentellement laissé test.only */
  forbidOnly: !!process.env.CI,
  
  /* Retry sur CI seulement */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out du parallélisme sur CI */
  workers: process.env.CI ? 1 : undefined,
  
  /* Configuration du reporter */
  reporter: [
    ['html', { outputFolder: 'reports/playwright-report' }],
    ['json', { outputFile: 'reports/test-results.json' }],
    ['list']
  ],
  
  /* Configuration globale pour tous les projets */
  use: {
    /* URL de base pour les tests */
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    
    /* Collecter les traces sur les échecs */
    trace: 'on-first-retry',
    
    /* Capturer les screenshots sur les échecs */
    screenshot: 'only-on-failure',
    
    /* Enregistrer les vidéos sur les échecs */
    video: 'retain-on-failure',
    
    /* Timeout pour les actions */
    actionTimeout: 10000,
    
    /* Timeout pour la navigation */
    navigationTimeout: 30000,
  },

  /* Configuration des projets pour différents navigateurs et appareils */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Tests mobiles */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Tests tablette */
    {
      name: 'iPad',
      use: { ...devices['iPad Pro'] },
    },

    /* Tests spécifiques pour l'accessibilité */
    {
      name: 'accessibility',
      use: {
        ...devices['Desktop Chrome'],
        // Simuler un utilisateur avec des préférences d'accessibilité
        colorScheme: 'dark',
        reducedMotion: 'reduce',
      },
    },
  ],

  /* Serveur de développement local */
  webServer: process.env.CI ? undefined : {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },

  /* Dossiers à ignorer */
  testIgnore: [
    '**/node_modules/**',
    '**/dist/**',
    '**/.next/**',
  ],

  /* Configuration des timeouts */
  timeout: 60000,
  expect: {
    timeout: 10000,
  },

  /* Configuration globale des fixtures */
  globalSetup: require.resolve('./tests/global-setup.ts'),
  globalTeardown: require.resolve('./tests/global-teardown.ts'),
});