import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/login_page';
import { CollectionsPage } from '../pages/collections_page';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const collectionsPage = new CollectionsPage(page);
  loginPage.login("testuser@testuser.com", "password1"); //TODO: Better solution. passwords in source code is always bad
  await expect(collectionsPage.isPageLoaded()).resolves.toBeTruthy();

  await page.context().storageState({ path: authFile });
});