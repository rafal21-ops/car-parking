import { test, expect } from '@playwright/test';

test('add reservation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('row', { name: '142' }).getByRole('button').click();
  await page.getByPlaceholder('Imie i nazwisko').click();
  await page.getByPlaceholder('Imie i nazwisko').press('ControlOrMeta+a');
  await page.getByPlaceholder('Imie i nazwisko').fill('test');
  await page.getByRole('button', { name: 'Zapisz' }).click();
  await expect(page.getByRole('row', { name: 'test' })).toBeVisible();
});