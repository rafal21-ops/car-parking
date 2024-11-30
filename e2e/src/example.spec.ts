import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('#app-title').innerText()).toContain('Miejsca parkingowe');
});
