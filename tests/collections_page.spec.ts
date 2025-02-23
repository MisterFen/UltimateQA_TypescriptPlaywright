import { test, expect } from '../fixtures/login_fixtures';
import path from 'path';

test.describe('Cloudflare Protected Tests', () => {
    test.beforeEach(({ page }) => {
      if (process.env.CI) {
        test.skip(true, 'Skipped in CI due to Cloudflare issues.');
      }
    });

    test('User should not be logged in', async ({ collectionsPage }) => {
        await collectionsPage.goto();
        await expect(collectionsPage.isUserLoggedIn()).resolves.toBeFalsy();
    });

    test.describe('Authenticated User Tests', () => {
        test.use({ storageState: path.join(__dirname, '../playwright/.auth/user.json')});
    
        test('User should be logged in', async ({ collectionsPage }) => {
            await collectionsPage.goto();
            await expect(collectionsPage.isUserLoggedIn()).resolves.toBeTruthy();
        });
    });
});