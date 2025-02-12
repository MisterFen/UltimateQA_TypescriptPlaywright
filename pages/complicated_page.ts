import { Locator, Page } from "@playwright/test";

export class ComplicatedPage {
    private page: Page;
    private contactForms: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contactForms = page.locator('.et_pb_contact_form_container');
    }

    async navigate() {
        await this.page.goto("https://ultimateqa.com/complicated-page/");
    }

    async hasHeader(headerText: string): Promise<boolean> {
        await this.page.waitForSelector('h1', { state: 'attached' }); // Wait for h1 to be attached to the page
    
        const headers = this.page.locator('h1, h2');
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

    async getAllForms(): Promise<ContactForm[]> {
        const formLocators = await this.contactForms.all();
        return formLocators.map(locator => new ContactForm(locator));
    }
}

export class ContactForm {
    private form: Locator;
    private nameField: Locator;
    private emailField: Locator;
    private messageField: Locator;
    private submitButton: Locator;
    private captchaQuestion: Locator;
    private captchaField: Locator;
    private submitMessage: Locator

    constructor(formLocator: Locator) {
        this.form = formLocator;
        // this.nameField = this.form.locator("#et_pb_contact_name_0");
        this.nameField = this.form.getByPlaceholder("Name");
        this.emailField = this.form.getByPlaceholder("Email Address");
        this.messageField = this.form.getByPlaceholder("Message");
        this.submitButton = this.form.locator(".et_pb_contact_submit.et_pb_button");
        this.captchaQuestion = this.form.locator(".et_pb_contact_captcha_question");
        this.captchaField = this.form.locator(".et_pb_contact_captcha");
        this.submitMessage = this.form.locator(".et-pb-contact-message");
    }

    async fillAndSubmit(name: string, email: string, message: string, options: { invalidCaptcha?: boolean } = {}) {
        await this.nameField.fill(name);
        await this.emailField.fill(email);
        await this.messageField.fill(message);
    
        // Solve the captcha normally
        let captchaAnswer = eval(await this.captchaQuestion.innerText());
    
        // Override if invalid captcha is requested
        if (options.invalidCaptcha) {
            captchaAnswer = captchaAnswer + 1;
        }
    
        await this.captchaField.fill(captchaAnswer.toString());
        await this.submitButton.click();
    }

    async getSubmitMessage(): Promise<Locator> {
        await this.submitMessage.waitFor({ state: "visible", timeout: 5000 });
        return await this.submitMessage;
    }

    async isFormGone(): Promise<boolean> {
        var isGone = true;
        if (await this.nameField.isVisible() || await this.emailField.isVisible() || await this.messageField.isVisible() || await this.submitButton.isVisible()) {
            isGone = false;
        }
        return isGone;
    }

}