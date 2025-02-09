import { Locator, Page } from "@playwright/test";

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
}

export class ContactForm {
    private form: Locator;
    private nameField: Locator;
    private emailField: Locator;
    private messageField: Locator;
    private submitButton: Locator;
    private captchaQuestion: Locator;
    private captchaField: Locator;
    private submitSuccessMessage: Locator

    constructor(page: Page, formSelector: string) {
        this.form = page.locator(formSelector);
        this.nameField = this.form.locator("#et_pb_contact_name_0");
        this.emailField = this.form.locator("#et_pb_contact_email_0");
        this.messageField = this.form.locator("#et_pb_contact_message_0");
        this.submitButton = this.form.locator(".et_pb_contact_submit.et_pb_button");
        this.captchaQuestion = this.form.locator(".et_pb_contact_captcha_question");
        this.captchaField = this.form.locator(".et_pb_contact_captcha");
        this.submitSuccessMessage = this.form.locator(".et-pb-contact-message");
    }

    async fillAndSubmit(name: string, email: string, message: string) {
        await this.nameField.fill(name);
        await this.emailField.fill(email);
        await this.messageField.fill(message);

        const captchaQuestionExpression = await this.captchaQuestion.innerText();
        const captchaAnswer = eval(captchaQuestionExpression);
        await this.captchaField.fill(captchaAnswer.toString());

        await this.submitButton.click();
    }

    async getSuccessMessage(): Promise<string> {
        await this.submitSuccessMessage.waitFor(); // Ensures the message is visible before retrieving it
        return await this.submitSuccessMessage.innerText();
    }
}