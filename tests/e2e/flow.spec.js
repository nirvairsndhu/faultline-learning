import { test, expect } from "@playwright/test";
test("all packs open and scenario selection works", async ({ page }) => { await page.goto("/"); await expect(page.getByText("Vacuum Drop")).toBeVisible(); for (const id of ["vacuum-drop", "collision-forces", "projectile-motion"]) {
    await page.goto(`/learn/${id}`);
    await expect(page.getByText("Cached analysis, live validation")).toBeVisible();
} });
test("vacuum prediction cannot be skipped", async ({ page }) => { await page.goto("/learn/vacuum-drop"); await page.getByLabel("They land together").check(); await page.getByRole("button", { name: "Explain your method" }).click(); await page.getByLabel("Reasoning").fill("The heavier mass has more gravity so it accelerates faster."); await page.getByRole("button", { name: "Map reasoning" }).click(); await page.getByRole("button", { name: "Make prediction" }).click(); await expect(page.getByRole("button", { name: "Unlock simulation" })).toBeDisabled(); });
