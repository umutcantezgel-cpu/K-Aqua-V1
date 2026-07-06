import { chromium } from '@playwright/test';

async function run() {
  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE] ${msg.type()}: ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.error(`[BROWSER ERROR] ${err.message}`);
  });

  console.log("Navigating to http://localhost:3001/de/maerkte...");
  await page.goto('http://localhost:3001/de/maerkte');

  console.log("Page loaded. Checking heading...");
  const heading = await page.locator('h1').textContent();
  console.log(`Heading: ${heading.trim()}`);

  const initialItemsCount = await page.locator("a[href^='/de/maerkte/']").count();
  console.log(`Initial items count: ${initialItemsCount}`);

  // Print all buttons text
  const buttons = await page.locator('button').allTextContents();
  console.log("Available buttons:", buttons);

  console.log("Clicking 'Europa' chip...");
  // Find a button containing 'Europa'
  const europaButton = page.locator("button:has-text('Europa')");
  await europaButton.click();

  // Wait a bit for state update
  await page.waitForTimeout(1000);

  const filteredItemsCount = await page.locator("a[href^='/de/maerkte/']").count();
  console.log(`Filtered items count after clicking Europa: ${filteredItemsCount}`);

  console.log("Hovering over Frankfurt...");
  const frankfurtItem = page.locator("a[href='/de/maerkte/frankfurt']");
  await frankfurtItem.hover();
  await page.waitForTimeout(500);

  const tooltipVisible = await page.locator("div[role='status']").isVisible();
  console.log(`Tooltip visible: ${tooltipVisible}`);
  if (tooltipVisible) {
    const tooltipText = await page.locator("div[role='status']").textContent();
    console.log(`Tooltip content: ${tooltipText.trim()}`);
  }

  await browser.close();
}

run().catch(err => {
  console.error("Error running script:", err);
});
