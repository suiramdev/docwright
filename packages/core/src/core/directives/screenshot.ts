import type { Page } from "playwright";
import { Tracer } from "../tracer";

export async function screenshot(page: Page) {
  const screenshot = await page.screenshot();

  Tracer.getInstance().trace("screenshot", {
    value: screenshot.toString("base64"),
  });

  return screenshot;
}
