import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/utils/e2e',
  timeout: 60000,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:3000',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120000,
  },
});
