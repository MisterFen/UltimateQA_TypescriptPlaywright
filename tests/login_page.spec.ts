import { test, expect } from '../fixtures/login_fixtures';

    
test('Valid login', async ({ loginPage, collectionsPage }) => {
    await loginPage.goto();
    await loginPage.login("testuser@testuser.com", "password1");
    await expect(collectionsPage.isUserLoggedIn()).resolves.toBeTruthy();
});
