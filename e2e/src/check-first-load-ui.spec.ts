import { test, expect } from '@playwright/test';

test('check if UI has rendered on first load', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('[data-test-id="app-title"]').innerText()).toContain('Miejsca parkingowe');
  expect(await page.locator('[data-test-id="app-headline"]').innerText()).toContain('Zarezerwuj miejsce parkingowe już dziś i uzyskaj turkusowy spokój parkowania!');
  expect(await page.locator('[data-test-id="app-footer"]').innerText()).toContain('SYZYGY Warsaw ©2024 Undefined Team');
  expect(await page.locator('[data-test-id="main-calendar"]').innerText()).toContain('Kalendarz');
  expect(await page.locator('[data-test-id="main-list-title"]').innerText()).toContain('Lista miejsc');
  expect(await page.locator('[data-test-id="main-list-spot-number"]').innerText()).toContain('Numer miejsca');
  expect(await page.locator('[data-test-id="main-list-spot-status"]').innerText()).toContain('Status');
  expect(await page.locator('[data-test-id="main-list-spot-reservation"]').innerText()).toContain('Zarezerwowane przez');
  expect(await page.locator('[data-test-id="main-list-spot-action"]').innerText()).toContain('Akcje');
});
