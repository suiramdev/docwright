import type { Page } from "playwright";
import { tracer } from "@/core/tracer";

export async function screenshot(page: Page) {
  const screenshot = await page.screenshot();

  tracer.trace("screenshot", {
    value: screenshot.toString("base64"),
  });

  return screenshot;
}
