import { Locator, Page, selectors, expect } from "@playwright/test";
import { link } from "fs";

export class CollectionsPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    products_header = () => this.page.getByRole('heading', { name: 'Products' });
    my_dashboard_link = () => this.page.getByRole('link', { name: 'My Dashboard' });
    dashboard_expand_button = () => this.page.getByRole('button', { name: 'Toggle menu Menu' });

    async goto() {
        await this.page.goto("https://courses.ultimateqa.com/collections");
    }

    async isPageLoaded()
    {
        await this.products_header().waitFor({ state: 'visible', timeout: 10000 });
        return await this.products_header().isVisible();
    }

    async isUserLoggedIn()
    {
        await this.products_header().waitFor({ state: 'visible', timeout: 10000 });
        if (await this.dashboard_expand_button().isVisible()){
            await this.dashboard_expand_button().click();
        }
        return await this.my_dashboard_link().isVisible();
    }
}
