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

test.describe('Contact form validation checks', () => {
    let complicatedPage: ComplicatedPage;
    let contactForms: ContactForm[];

    test.beforeEach(async ({ page }) => {
        complicatedPage = new ComplicatedPage(page);
        await complicatedPage.navigate();
        contactForms = await complicatedPage.getAllForms();
    });
    
    test('Valid fields successfully submit', async ({ page }) => {
        for (const contactForm of contactForms) {
            test.setTimeout(10000); // Success message occasionally takes longer than default timeout
            await contactForm.fillAndSubmit("Bruce Wayne", "imnotbatman@batmail.com", "I'm Batman");
            const successMessage = await contactForm.getSubmitMessage();
            expect(successMessage).toHaveText("Thanks for contacting us");
            await expect(contactForm.isFormGone()).resolves.toBeTruthy();
        }
    });

    test('Invalid email doesn\'t submit', async ({ page }) => {
        for (const contactForm of contactForms) {
            await contactForm.fillAndSubmit("Bruce Wayne", "imnotbatmanbatmail.com", "I'm Batman");
            const successMessage = await contactForm.getSubmitMessage();
            expect(successMessage).toHaveText("Invalid email");
            await expect(contactForm.isFormGone()).resolves.toBeFalsy();
        }
    });

    test('Incorrect captcha doesn\'t submit', async ({ page }) => {
        for (const contactForm of contactForms) {
            contactForm.fillAndSubmit("Bruce Wayne", "imnotbatman@batmail.com", "I'm Batman", { invalidCaptcha: true });
            const successMessage = await contactForm.getSubmitMessage();
            expect(successMessage).toHaveText("You entered the wrong number in captcha.");
            await expect(contactForm.isFormGone()).resolves.toBeFalsy();
        }
    });
});