import { test, expect } from '@playwright/test';
//test 1
test.describe('Form Tests',async()=>{
  test('checkbox', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/formPage.html');
  await page.locator('#checky').check();
  await page.locator('[name="checkedchecky"]').uncheck();

  await expect(page.locator('#checky')).toBeChecked();
  await expect(page.locator('[name="checkedchecky"]')).not.toBeChecked();
});
  test('radio', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/formPage.html');
  await page.locator('#cheese').check();
  await page.locator('#peas').uncheck();

  await expect(page.locator('[value="cheese"]')).toBeChecked();
});
}); //end of describe block~


//test 2
test('internet app', async ({page})=>{
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').fill('SuperSecretPassword!');
  await page.getByRole('button',{name :'Login'}).click();
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
  await page.getByRole('link',{name:'Logout'}).click();
  await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
 
})

//test 3

// const { test, expect } = require('@playwright/test');
test('visual regression - homepage', async ({ page }) => {
 await page.goto('https://the-internet.herokuapp.com/secure');

 // Full page screenshot
 await expect(page).toHaveScreenshot('homepage.png',{  mask: [page.locator('#flash')],
    maxDiffPixelRatio: 0.05,});
 // Element screenshot
 await expect(page.locator('h2')).toHaveScreenshot('header.png');

 // With custom threshold
 await expect(page).toHaveScreenshot('homepage.png', {
 maxDiffPixels: 100 // Allow 100 pixels difference
 });

 // With custom threshold percentage
 await expect(page).toHaveScreenshot('homepage.png', {
 maxDiffPixelRatio: 0.2 // Allow 20% difference
 });

 // Mask dynamic content
 await expect(page).toHaveScreenshot('homepage.png', {
 mask: [page.locator('#flash')]
 });

 // Update snapshots
 // npx playwright test --update-snapshots
});

//test 4
// Advanced: Custom visual testing
// test('custom visual test', async ({ page }) => {
//  await page.goto('https://playwright.dev/');

//  // Take screenshot
//  const screenshot = await page.screenshot();

//  // Compare using external library (e.g., pixelmatch)
//  const diff = compareImages(screenshot, baselineImage);
//  expect(diff.percentDifference).toBeLessThan(5);
// });

//test 5
// Cross-browser visual testing
test('visual consistency across browsers', async ({ page, browserName }) => {
 await page.goto('https://google.com');
 await expect(page).toHaveScreenshot(`homepage-${browserName}.png`);
});

//test 6
//challenge DOM
test('Challenging DOM', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/challenging-dom');
  const filtertext = 'Definiebas5';
  await page.getByRole('row').filter({ hasText: filtertext }).getByRole('link', { name: 'Edit' }).click();
 // await page.getByRole('row').filter({ hasText: filtertext }).getByRole('link', { name: 'Delete' }).click();
});

//test 7
test('successfulOrderPlacement', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page.getByText('Swag Lab')).toBeVisible();
  await page
    .locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' })
    .getByRole('button', { name: 'Add to Cart' })
    .click();
  await page.locator('.shopping_cart_link').click();
  expect(page.getByText('Your Cart')).toBeVisible();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByPlaceholder('First Name').fill('Chetan');
  await page.getByPlaceholder('Last Name').fill('Prajapati');
  await page.getByPlaceholder('Zip/Postal Code').fill('400064');
  await page.locator('#continue').click();
  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
});

//test 8
test('rowSelection', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/challenging-dom');

  await page
    .getByRole('row')
    .filter({ hasText: 'Definiebas3' })
    .getByRole('link', { name: 'Edit' })
    .click();
});

//test 9
test('Creating browser context', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://playwright.dev/');
});
