import { Page } from "@playwright/test";

export class ComplicatedPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto("https://ultimateqa.com/complicated-page/");
    }

    async hasHeader(headerText: string): Promise<boolean> {
        await this.page.waitForSelector('h1', { state: 'attached' }); // Wait for h1 to be attached to the page
    
        const headers = this.page.locator('h1');
        const count = await headers.count();
    
        for (let i = 0; i < count; i++) {
            const headerTextContent = await headers.nth(i).innerText();
    
            // Replace non-breaking spaces (&nbsp;) with normal spaces
            const cleanedHeaderText = headerTextContent.replace(/\u00A0/g, ' ').trim();
    
            console.log("CLEANED HEADER TEXT: " + cleanedHeaderText);
    
            if (cleanedHeaderText === headerText.trim()) {
                return true;  // Header matches
            }
        }
    
        return false;  // Header not found
    }
}