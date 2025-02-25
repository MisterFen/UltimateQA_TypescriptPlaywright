import { test as base, expect } from "@playwright/test";
import { ComplicatedPage, ContactForm } from "../pages/complicated_page";
import fs from "fs";

type ContactFormData = { name: string; email: string; message: string }[];

// Extend the base test with fixtures
const test = base.extend<{
    complicatedPage: ComplicatedPage;
    contactForms: ContactForm[];
    validContactFormData: ContactFormData;
}>({
    complicatedPage: async ({ page }, use) => {
        const complicatedPage = new ComplicatedPage(page);
        await complicatedPage.navigate();
        await use(complicatedPage);
    },
    contactForms: async ({ complicatedPage }, use) => {
        const forms = await complicatedPage.getAllForms();
        await use(forms);
    },
    validContactFormData: async ({}, use) => {
        // Load test data once
        const data: ContactFormData = JSON.parse(
            fs.readFileSync("data/validContactFormData.json", "utf-8")
        );
        await use(data);
    },
});

export { test, expect };
