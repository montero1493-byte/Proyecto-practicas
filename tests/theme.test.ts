import { test, expect } from '@playwright/test';

test('toggle theme', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Entrar como invitado' }).click();

  const themeButton = page.getByTestId('theme-toggle');

  await expect(page.locator('html'))
    .toHaveAttribute('data-theme', 'dark');

  await expect(page.locator('body'))
    .toHaveCSS('background-color', 'rgb(38, 38, 39)');

  await themeButton.click();

  await expect(page.locator('html'))
    .toHaveAttribute('data-theme', 'light');

  await expect(page.locator('body'))
    .toHaveCSS('background-color', 'rgb(245, 245, 245)');

  await themeButton.click();

  await expect(page.locator('html'))
    .toHaveAttribute('data-theme', 'dark');
});