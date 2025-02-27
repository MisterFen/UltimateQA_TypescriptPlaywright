import { test, expect } from '../fixtures/complicated_page_fixtures';
import { testData } from "../fixtures/testdata_fixtures";

test('Test UltimateQA Complicated Page', async ({ complicatedPage }) => {
    await complicatedPage.navigate();

    await expect.soft(await complicatedPage.hasHeader("Skills Improved:")).toBeTruthy();
    await expect.soft(await complicatedPage.hasHeader("Section of Buttons")).toBeTruthy();
    await expect.soft(await complicatedPage.hasHeader("Section of Social Media Follows")).toBeTruthy();
    await expect.soft(await complicatedPage.hasHeader("Section of Random Stuff")).toBeTruthy();
});

test.describe('Contact form validation checks', () => {
    
    // If no forms are present, all other tests here will still pass. This check covers this
    test('3 forms are present', async ({ contactForms }) => {
        expect(contactForms).toHaveLength(3);
    });

    test.describe("Valid boundary input data checks", () => {
        for (const data of testData.validContactFormData) {
            test(`Submit with test entry: ${data.name}`, async ({ page, contactForms }) => {
                test.slow(); // This is getting a slow response from a contact form
                await test.step(`Submitting with: ${data.name} | ${data.email}`, async () => {
                    await contactForms[0].fillAndSubmit(data.name, data.email, data.message);
                    const successMessage = await contactForms[0].getSubmitMessage();
                    expect(successMessage).toHaveText("Thanks for contacting us");
                    await expect(contactForms[0].isFormGone()).resolves.toBeTruthy();
                });
            });
        };
    });

    test('Invalid email doesn\'t submit', async ({ contactForms }) => {
        for (const contactForm of contactForms) {
            await contactForm.fillAndSubmit("Bruce Wayne", "imnotbatmanbatmail.com", "I'm Batman");
            const successMessage = await contactForm.getSubmitMessage();
            expect(successMessage).toHaveText("Invalid email");
            await expect(contactForm.isFormGone()).resolves.toBeFalsy();
        }
    });

    test('Incorrect captcha doesn\'t submit', async ({ contactForms }) => {
        for (const contactForm of contactForms) {
            contactForm.fillAndSubmit("Bruce Wayne", "imnotbatman@batmail.com", "I'm Batman", { invalidCaptcha: true });
            const successMessage = await contactForm.getSubmitMessage();
            expect(successMessage).toHaveText("You entered the wrong number in captcha.");
            await expect(contactForm.isFormGone()).resolves.toBeFalsy();
        }
    });
});