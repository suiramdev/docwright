import {
  describe,
  scenario,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
  text,
  screenshot,
  highlight,
} from "@docwright/core";

describe("suiram.dev portfolio", () => {
  beforeAll(async () => {
    console.log("before all");
  });

  afterAll(async () => {
    console.log("after all");
  });

  beforeEach(async () => {
    console.log("before each");
  });

  afterEach(async () => {
    console.log("after each");
  });

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
