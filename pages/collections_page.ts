import { Locator, Page, selectors, expect } from "@playwright/test";

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

    async isUserLoggedIn(): Promise<boolean> {
        await this.products_header().waitFor({ state: 'visible', timeout: 5000 });
    
        // Check if dashboard link is already visible (desktop view)
        if (await this.my_dashboard_link().isVisible()) {
            return true;
        }
    
        // If not visible, check if the expand button is present (mobile view)
        if (await this.dashboard_expand_button().isVisible()) {
            await this.dashboard_expand_button().click();
    
            // Wait for potential animations to complete
            await this.page.waitForTimeout(300); 
    
            // Re-check if menu actually expanded
            if (!(await this.my_dashboard_link().isVisible())) {
                await this.page.waitForTimeout(500); // Additional wait in case of delay
            }
        }
    
        // Final check to see if the dashboard link is now visible
        return await this.my_dashboard_link().isVisible().catch(() => false);
    }
}
