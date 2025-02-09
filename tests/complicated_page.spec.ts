import { test, expect } from '@playwright/test';
import { ComplicatedPage, ContactForm } from '../pages/complicated_page';

test('Test UltimateQA Complicated Page', async ({ page }) => {
    const complicatedPage = new ComplicatedPage(page);
    
    // Navigate to the page
    await complicatedPage.navigate();

    // Verify the page title
    await expect.soft(await complicatedPage.hasHeader("Skills Improved:")).toBeTruthy();
    await expect.soft(await complicatedPage.hasHeader("Section of Buttons")).toBeTruthy();
    await expect.soft(await complicatedPage.hasHeader("Section of Social Media Follows")).toBeTruthy();
    await expect.soft(await complicatedPage.hasHeader("Section of Random Stuff")).toBeTruthy();

    // Add more interactions and assertions as needed
});

test('Contact form 1 validation checks', async ({ page }) => {
    const complicatedPage = new ComplicatedPage(page);
    const contactForm = new ContactForm(page, "#et_pb_contact_form_0");
    
    await complicatedPage.navigate();
    contactForm.fillAndSubmit("Bruce Wayne", "imnotbatman@batmail.com", "I'm Batman");
    const successMessage = await contactForm.getSuccessMessage();
    expect(successMessage).toContain("Thanks for contacting us");
});