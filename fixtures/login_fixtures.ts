import { test as base, expect} from '@playwright/test';
import { LoginPage } from '../pages/login_page';
import { CollectionsPage } from '../pages/collections_page';
import { AccountCreationPage } from '../pages/account_creation_page';

// Extend the base test with fixtures
const test = base.extend<{
    loginPage: LoginPage;
    collectionsPage: CollectionsPage;
    accountCreationPage: AccountCreationPage;
}>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    collectionsPage: async ({ page }, use) => {
        const collectionsPage = new CollectionsPage(page);
        await use(collectionsPage);
    },
    accountCreationPage: async ({ page }, use) => {
        const accountCreationPage = new AccountCreationPage(page);
        await use(accountCreationPage);
    }
});

export { test, expect};