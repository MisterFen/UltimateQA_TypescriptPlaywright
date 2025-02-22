import { test as base, expect} from '@playwright/test';
import { LoginPage } from '../pages/login_page';
import { CollectionsPage } from '../pages/collections_page';

// Extend the base test with fixtures
const test = base.extend<{
    loginPage: LoginPage;
    collectionsPage: CollectionsPage;
}>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    collectionsPage: async ({ page }, use) => {
        const collectionsPage = new CollectionsPage(page);
        await use(collectionsPage);
    }
});

export { test, expect};