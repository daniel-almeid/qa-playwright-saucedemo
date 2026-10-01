import { Page, expect } from '@playwright/test';
export class LoginPage {
  constructor(private page: Page) {}
  async open() { await this.page.goto('/'); }
  async login(user: string, pass: string) {
    await this.page.getByPlaceholder('Username').fill(user);
    await this.page.getByPlaceholder('Password').fill(pass);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
  async expectError(text: string) { await expect(this.page.locator('[data-test="error"]')).toContainText(text); }
}
