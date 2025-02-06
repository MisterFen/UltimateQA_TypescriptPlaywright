import { test, expect } from "@playwright/test";
import { FillingOutFormsPage } from "../pages/filling_out_forms_page"

test("should submit the contact form and show a success message", async ({ page }) => {
    const contactForm = new FillingOutFormsPage(page);

    await contactForm.navigate();
    await contactForm.fillForm("John Doe", "Hello!");
    await contactForm.submitForm();

    await contactForm.getSuccessMessage().waitFor({ state: "visible", timeout: 5000 });
    const message = await contactForm.getSuccessMessage().textContent();
    console.log("Actual message:", message);
});