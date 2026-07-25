import { test,expect } from "@playwright/test";
test("selection screen renders at desktop and mobile widths",async({page})=>{await page.goto("/");await expect(page.getByText("Vacuum Drop")).toBeVisible();expect(await page.locator("body").evaluate((body)=>body.scrollWidth<=window.innerWidth)).toBe(true);});
