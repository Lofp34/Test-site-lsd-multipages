import { expect, test } from '@playwright/test';

test('diagnostic reaches results after question 20', async ({ page }) => {
  await page.goto('/diagnostic');
  await page.getByRole('button', { name: /Commencer le diagnostic/i }).click();

  for (let index = 1; index <= 20; index += 1) {
    await expect(page.getByText(`${index}/20`)).toBeVisible();
    await page.waitForTimeout(350);
    await page.locator('.space-y-3 button:visible').first().click();
  }

  await expect(page.getByText('Analyse de vos réponses...')).toBeVisible();
  await expect(page.getByText('Score global')).toBeVisible({ timeout: 10000 });
});
