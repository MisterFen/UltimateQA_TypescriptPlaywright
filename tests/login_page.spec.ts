import { test, expect } from '../fixtures/login_fixtures';

test.describe('CI Cloudflare Protected Tests', () => {
    test.beforeEach(({ page }) => {
      if (process.env.CI) {
        test.skip(true, 'Skipped in CI due to Cloudflare issues.');
      }
    });

    test('Valid login', async ({ loginPage, collectionsPage }) => {
        await loginPage.goto();
        await loginPage.login("testuser@testuser.com", "password1");
        await expect(collectionsPage.isUserLoggedIn()).resolves.toBeTruthy();
    });

    // This test triggers cloudflare locally too...
    // test('Can access Account Creation page', async ({ loginPage, accountCreationPage }) => {
    //     await loginPage.goto();
    //     await loginPage.selectCreateNewAccount();
    //     await expect(accountCreationPage.isPageLoaded()).resolves.toBeTruthy();
    // });
});