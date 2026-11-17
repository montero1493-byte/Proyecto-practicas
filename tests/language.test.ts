import { test, expect } from '@playwright/test';

test('cambiar idioma', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Entrar como invitado' }).click();
  await expect(page.getByRole('link', { name: 'Perfil' })).toBeVisible();
  await page.getByRole('combobox').selectOption('en');
  await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();
  await page.getByRole('combobox').selectOption('es');
  await expect(page.getByRole('link', { name: 'Perfil' })).toBeVisible();
});