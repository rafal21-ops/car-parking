import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';

import { workspaceRoot } from '@nx/devkit';

const isProduction = process.env.NODE_ENV === 'production';

const webServerDevelopment = {
  command: 'npm run start:dev',
  url: 'http://localhost:4200',
  reuseExistingServer: true,
  cwd: workspaceRoot,
}

const webServerProduction = {
  command: 'npm run start:prod',
  url: 'http://localhost:4000',
  reuseExistingServer: true,
  cwd: workspaceRoot,
}

const baseURL = isProduction ? webServerProduction.url : webServerDevelopment.url;

export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  timeout: 10000,
  webServer: isProduction ? webServerProduction : webServerDevelopment,
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
  ],
});
