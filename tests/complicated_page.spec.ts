import { test, expect } from '@playwright/test';
import { ComplicatedPage } from '../pages/complicated_page';

test('Test UltimateQA Complicated Page', async ({ page }) => {
    const complicatedPage = new ComplicatedPage(page);
    
    // Navigate to the page
    await complicatedPage.navigate();

    // Verify the page title
    // await expect.soft(await complicatedPage.hasHeader("Skills Improved:")).toBeTruthy(); //This one is a h2...
    await expect.soft(await complicatedPage.hasHeader("Section of Buttons")).toBeTruthy();
    await expect.soft(await complicatedPage.hasHeader("Section of Social Media Follows")).toBeTruthy();
    await expect.soft(await complicatedPage.hasHeader("Section of Random Stuff")).toBeTruthy();

    // Add more interactions and assertions as needed
});