import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Gold Center/);
});

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');

  // Check if the page loads without errors
  await expect(page).toHaveURL('http://localhost:3000/');
  
  // Check main heading
  await expect(page.locator('h1')).toContainText('Gold Center\'a Hoş Geldiniz');
  
  // Check navigation
  await expect(page.locator('nav')).toBeVisible();
  await expect(page.locator('text=Ürünler')).toBeVisible();
});

test('products page loads', async ({ page }) => {
  await page.goto('/urunler');
  
  // Check products page loads
  await expect(page.locator('h1')).toContainText('Tüm Ürünler');
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  
  // Click on products link
  await page.click('text=Ürünler');
  
  // Should navigate to products page
  await expect(page).toHaveURL(/.*urunler/);
  await expect(page.locator('h1')).toContainText('Tüm Ürünler');
});