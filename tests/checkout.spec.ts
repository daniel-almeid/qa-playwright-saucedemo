import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.open();
  await login.login('standard_user', 'secret_sauce');
});

test('adiciona produto ao carrinho', async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('finaliza compra com dados válidos', async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Daniel');
  await page.locator('[data-test="lastName"]').fill('Almeida');
  await page.locator('[data-test="postalCode"]').fill('26000000');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await expect(page.getByText('Thank you for your order')).toBeVisible();
});

test('checkout sem nome mostra erro de validação', async ({ page }) => {
  await page.locator('.shopping_cart_link').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
});
