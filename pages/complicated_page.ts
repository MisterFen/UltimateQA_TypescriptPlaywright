import { Locator, Page, selectors } from "@playwright/test";

export class ComplicatedPage {
    private page: Page;
    private contactForms: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contactForms = page.locator('.et_pb_contact_form_container');
    }

    async navigate() {
        await this.page.goto("complicated-page/");
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

    async getAllForms(): Promise<ContactForm[]> {
        const formLocators = await this.contactForms.all();
        return formLocators.map(locator => new ContactForm(locator));
    }
}

export class ContactForm {
    private form: Locator;

    constructor(formLocator: Locator) {
        this.form = formLocator;
        selectors.setTestIdAttribute("data-original_id");
    }

    // These methods are used to interact with potentially dynamic form fields
    nameField = () => this.form.getByTestId("name"); //These fields can be covered by placeholder value. Unlikely to change. But test-id is even more reliable
    emailField = () => this.form.getByTestId("email");
    messageField = () => this.form.getByTestId("message");
    submitButton = () => this.form.getByRole('button', { name: 'Submit' });
    captchaQuestion = () => this.form.locator(".et_pb_contact_captcha_question");
    captchaField = () => this.form.locator(".et_pb_contact_captcha");
    submitMessage = () => this.form.locator(".et-pb-contact-message");

    async fillAndSubmit(name: string, email: string, message: string, options: { invalidCaptcha?: boolean } = {}) {
        await this.nameField().fill(name);
        await this.emailField().fill(email);
        await this.messageField().fill(message);
    
        // Solve the captcha normally
        let captchaAnswer = eval(await this.captchaQuestion().innerText());
    
        // Override if invalid captcha is requested
        if (options.invalidCaptcha) {
            captchaAnswer = captchaAnswer + 1;
        }
    
        await this.captchaField().fill(captchaAnswer.toString());
        await this.submitButton().click();
    }

    async getSubmitMessage(): Promise<Locator> {
        await this.submitMessage().waitFor({ state: "visible", timeout: 5000 });
        return await this.submitMessage();
    }

    async isFormGone(): Promise<boolean> {
        var isGone = true;
        if (await this.nameField().isVisible() || await this.emailField().isVisible() || await this.messageField().isVisible() || await this.submitButton().isVisible()) {
            isGone = false;
        }
        return isGone;
    }

}