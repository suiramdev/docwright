import { describe, scenario, text, screenshot, highlight } from "docwright";

describe("suiram.dev portfolio", () => {
  scenario("How to book a call", async ({ page }) => {
    await text("Navigate to https://suiram.dev");
    await page.goto("https://suiram.dev");
    await text("Click the book a call button");
    await highlight(
      page.locator("a[href='https://calcom.suiram.dev/suiramdev/30min']")
    );
    await screenshot(page);
  });
});
