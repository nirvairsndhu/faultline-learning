import { test, expect } from "@playwright/test";
test("selection screen renders at desktop and mobile widths", async ({ page }) => {
    for (const width of [320, 375, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: width < 768 ? 800 : 900 });
        await page.goto("/");
        await expect(page.getByRole("heading", { name: "Vacuum Drop" })).toBeVisible();
        await expect(page.getByText("Submission for hackathon of __________", { exact: true })).toBeVisible();
        expect(await page.locator("body").evaluate((body) => body.scrollWidth <= window.innerWidth)).toBe(true);
        expect(await page.getByRole("link", { name: "Try a scenario ↓" }).evaluate((link) => link.getBoundingClientRect().height)).toBeGreaterThanOrEqual(42);
    }
});
