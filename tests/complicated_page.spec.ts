import { test, expect } from '@playwright/test';
import { ComplicatedPage, ContactForm } from '../pages/complicated_page';

test('Test UltimateQA Complicated Page', async ({ page }) => {
    const complicatedPage = new ComplicatedPage(page);

    await complicatedPage.navigate();

    await expect.soft(await complicatedPage.hasHeader("Skills Improved:")).toBeTruthy();
    await expect.soft(await complicatedPage.hasHeader("Section of Buttons")).toBeTruthy();
    await expect.soft(await complicatedPage.hasHeader("Section of Social Media Follows")).toBeTruthy();
    await expect.soft(await complicatedPage.hasHeader("Section of Random Stuff")).toBeTruthy();

});

test.describe('Contact form 1 validation checks', () => {
    var contactFormId = "#et_pb_contact_form_0";

    let complicatedPage: ComplicatedPage;
    let contactForm: ContactForm;

    test.beforeEach(async ({ page }) => {
        complicatedPage = new ComplicatedPage(page);
        contactForm = new ContactForm(page, contactFormId);
        
        await complicatedPage.navigate();
    });
    
    test('Valid fields successfully submit', async ({ page }) => {
        contactForm.fillAndSubmit("Bruce Wayne", "imnotbatman@batmail.com", "I'm Batman");
        const successMessage = await contactForm.getSubmitMessage();
        expect(successMessage).toContain("Thanks for contacting us");
        await expect(contactForm.isFormGone()).resolves.toBe(true);
    });

    test('Invalid email doesn\'t submit', async ({ page }) => {
        contactForm.fillAndSubmit("Bruce Wayne", "imnotbatmanbatmail.com", "I'm Batman");
        const successMessage = await contactForm.getSubmitMessage();
        expect(successMessage).toContain("Invalid email");
        await expect(contactForm.isFormGone()).resolves.toBe(false);
    });

    test('Incorrect captcha doesn\'t submit', async ({ page }) => {
        contactForm.fillAndSubmit("Bruce Wayne", "imnotbatman@batmail.com", "I'm Batman", { invalidCaptcha: true });
        const successMessage = await contactForm.getSubmitMessage();
        expect(successMessage).toContain("You entered the wrong number in captcha.");
        await expect(contactForm.isFormGone()).resolves.toBe(false);
    });
});