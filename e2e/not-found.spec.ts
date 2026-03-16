import { expect, test } from "@playwright/test";

test.describe("404 Not Found Page", () => {
  test("displays 404 page for invalid routes", async ({ page }) => {
    await page.goto("/invalid-route-that-does-not-exist");
    
    // Should show 404 error code
    const errorCode = page.locator("text=404");
    await expect(errorCode).toBeVisible();
    
    // Should show helpful title
    const title = page.locator("h1");
    await expect(title).toContainText("outside the portfolio map");
  });

  test("has working navigation links", async ({ page }) => {
    await page.goto("/invalid-route");
    
    // Return home link should work
    const homeLink = page.locator("text=Return to homepage");
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    await page.waitForURL("/");
  });

  test("shows case study suggestions", async ({ page }) => {
    await page.goto("/invalid-route");
    
    // Quick links section should exist
    const quickLinks = page.locator("text=Quick links");
    await expect(quickLinks).toBeVisible();
    
    // Should have case study links
    const suggestionLinks = page.locator("nav[aria-label='Quick links'] a");
    await expect(suggestionLinks).toHaveCount(4); // 3 cases + resume
  });

  test("has proper accessibility attributes", async ({ page }) => {
    await page.goto("/invalid-route");
    
    // Main should have proper attributes
    const main = page.locator("#main-content");
    await expect(main).toHaveAttribute("tabindex", "-1");
    
    // Quick links nav should have aria-label
    const nav = page.locator("nav[aria-label='Quick links']");
    await expect(nav).toBeVisible();
  });
});
