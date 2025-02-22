import { Locator, Page, selectors } from "@playwright/test";

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    emailField = () => this.page.locator('#user\\[email\\]');
    passwordField = () => this.page.locator('#user\\[password\\]');
    createAccountLink = () => this.page.getByRole('link', { name: 'Create a new account' });
    

    async goto() {
        await this.page.goto("https://courses.ultimateqa.com/users/sign_in");
    }

    async login(email: string, password: string) {
        await this.emailField().fill(email);
        await this.passwordField().fill(password);
        await this.page.getByRole("button", { name: "Sign in" }).click();
    }

    async selectCreateNewAccount(){
        await this.createAccountLink().click();
    }

    async hasHeader(headerText: string): Promise<boolean> {
        await this.page.waitForSelector('h1', { state: 'attached' }); // Wait for h1 to be attached to the page

        for (const header of await this.page.locator('h1, h2').all()){
            const headerTextContent = await header.innerText();
    
            // Replace non-breaking spaces (&nbsp;) with normal spaces
            const cleanedHeaderText = headerTextContent.replace(/\u00A0/g, ' ').trim();
    
            if (cleanedHeaderText === headerText.trim()) {
                return true;  // Header matches
            }
        }
    
        return false;  // Header not found
    }
}
