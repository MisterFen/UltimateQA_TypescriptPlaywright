import { Page } from "@playwright/test";

export class FillingOutFormsPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto("https://ultimateqa.com/filling-out-forms/");
    }

    async fillForm(name: string, message: string) {
        await this.page.fill("#et_pb_contact_name_0", name);
        await this.page.fill("#et_pb_contact_message_0", message);
    }

    async submitForm() {
        await this.page.locator("#et_pb_contact_form_0").getByRole("button", { name: "Submit" }).click();
    }

    getSuccessMessage() {
        return this.page.locator("#et_pb_contact_form_0").locator(".et-pb-contact-message");
    }
}