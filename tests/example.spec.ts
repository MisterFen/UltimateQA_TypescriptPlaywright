import { test, expect } from '@playwright/test';

test('first test', async ({ page }) => {
  await page.goto('https://ultimateqa.com/automation');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation Practice - Ultimate QA/);
});
