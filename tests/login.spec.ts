import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  test('login com credenciais válidas', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });
  test('usuário bloqueado vê mensagem de erro', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('locked_out_user', 'secret_sauce');
    await login.expectError('locked out');
  });
  test('senha incorreta é rejeitada', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('standard_user', 'errada');
    await login.expectError('do not match');
  });
  test('campos vazios exigem username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await page.getByRole('button', { name: 'Login' }).click();
    await login.expectError('Username is required');
  });
});
