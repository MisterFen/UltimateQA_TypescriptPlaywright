import { test, expect } from '../fixtures/login_fixtures';


// Authenticated tests
test.use({ storageState: 'auth.json' });

test.describe('Authenticated User Tests', () => {

    test('User should be logged in', async ({ collectionsPage }) => {
        await collectionsPage.goto();
        await expect(collectionsPage.isUserLoggedIn()).resolves.toBeTruthy();
    });
});