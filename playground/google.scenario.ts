import { describe, step, screenshot } from "@docwright/core";

describe("Suite 1", () => {
  describe("Nested Suite 1", () => {
    step("Step 1", async ({ page }) => {
      await page.goto("https://www.google.com");
      await screenshot(page);
    });

    step("Step 2", () => {});
  });

  describe("Nested Suite 2", () => {
    step("Step 3", () => {});

    step("Step 4", () => {});
  });

  describe("Nested Suite 3", () => {
    step("Step 5", () => {});

    step("Step 6", () => {});
  });
});

describe("Suite 2", () => {
  step("Step 7", () => {});

  step("Step 8", () => {});

  describe("Nested Suite 4", () => {
    step("Step 9", () => {});

    step("Step 10", () => {});
  });
});
