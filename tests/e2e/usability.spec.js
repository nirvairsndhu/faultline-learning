import { test, expect } from "@playwright/test";

async function activate(page, locator, key = "Enter") {
  await locator.focus();
  await page.keyboard.press(key);
}

test("vacuum flow can be completed with the keyboard", async ({ page }) => {
  await page.goto("/learn/vacuum-drop");

  await activate(page, page.getByLabel("They land together"), "Space");
  await activate(page, page.getByRole("button", { name: "Explain your method" }));

  await page.getByLabel("Reasoning").focus();
  await page.keyboard.insertText("Mass causes acceleration.");
  await activate(page, page.getByRole("button", { name: "Map reasoning" }));

  await activate(page, page.getByRole("button", { name: "Make prediction" }));
  await activate(page, page.getByLabel("They land together"), "Space");
  await activate(page, page.getByRole("button", { name: "Unlock simulation" }));
  await activate(page, page.getByRole("button", { name: "Run simulation" }));
  await activate(page, page.getByRole("button", { name: "Explain again" }));

  await page.getByLabel("Revised reasoning").focus();
  await page.keyboard.insertText("In a vacuum, both objects have the same acceleration independent of mass.");
  await activate(page, page.getByRole("button", { name: "Verify repair" }));

  await activate(page, page.getByRole("button", { name: "Test transfer" }));
  await activate(page, page.getByLabel("They have the same acceleration and land together"), "Space");
  await page.getByLabel("Why?").focus();
  await page.keyboard.insertText("They have the same acceleration in a vacuum.");
  await activate(page, page.getByRole("button", { name: "Verify transfer" }));

  await expect(page.getByText("Method repaired. Transfer verified.")).toBeVisible();
});

test("analysis API errors are shown to the learner", async ({ page }) => {
  await page.route("**/api/analyze", async (route) => {
    await route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "Analysis service is temporarily unavailable." }),
    });
  });

  await page.goto("/learn/vacuum-drop");
  await page.getByLabel("They land together").check();
  await page.getByRole("button", { name: "Explain your method" }).click();
  await page.getByLabel("Reasoning").fill("Mass causes acceleration.");
  await page.getByRole("button", { name: "Map reasoning" }).click();

  await expect(page.locator("p[role='alert']")).toContainText("Analysis service is temporarily unavailable.");
  await expect(page.getByRole("button", { name: "Map reasoning" })).toBeEnabled();
});
