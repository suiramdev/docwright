import { type Locator } from "playwright";

export async function highlight(locator: Locator) {
  await locator.evaluate((element) => {
    element.style.border = "2px solid red";
  });
}
