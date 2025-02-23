import { Locator, Page, selectors, expect } from "@playwright/test";

export class AccountCreationPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    title = () => this.page.getByRole('heading', { name: 'Create a new account' });

    async goto() {
        await this.page.goto("https://courses.ultimateqa.com/users/sign_up");
    }

    async isPageLoaded()
    {
        await this.title().waitFor({ state: "visible", timeout: 5000 });
        return await this.title().isVisible();
    }
};
