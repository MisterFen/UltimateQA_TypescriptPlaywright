import { test as base, expect } from '@playwright/test';
import { ComplicatedPage, ContactForm } from '../pages/complicated_page';

// Extend the base test with fixtures
const test = base.extend<{
    complicatedPage: ComplicatedPage;
    contactForms: ContactForm[];
}>({
    complicatedPage: async ({ page }, use) => {
        const complicatedPage = new ComplicatedPage(page);
        await complicatedPage.navigate();
        await use(complicatedPage);
    },
    contactForms: async ({ complicatedPage }, use) => {
        const forms = await complicatedPage.getAllForms();
        await use(forms);
    }
});

export { test, expect };