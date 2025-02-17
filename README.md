> 🚧 docwright is currently in development.

# docwright

docwright is a library that generates UI documentation from Playwright-style test scripts. It automates the process of documenting your application's user interface.

**📖 [Read API](./docs/api.md)**

**🛠️ [Read Technical Details](./docs/technical-details.md)**

## Quick Start

1. **Install docwright**

    ```bash
    bun install docwright
    ```

    > Due to Node.js's limitations, docwright currently only works with Bun. [Read more](#technical-details)

2. **Create a `docwright.config.ts` file.**

    ```bash
    bunx docwright init
    ```

    [Example `docwright.config.ts`](./examples/docwright.config.ts)

3. **Run docwright**

    ```bash
    bunx docwright generate
    ```

### Create your first scenario

Create a file matching your docwright.config.ts glob pattern.

Example: [portfolio.docwright.ts](./playground/portfolio.docwright.ts)

```typescript
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
```

## Roadmap

- [ ] Add support for other output formats
    - [ ] PDF
- [ ] Use [driver.js](https://github.com/kamranahmedse/driver.js) for highlighting
- [ ] Add more directives
    - [ ] `heading(level: number, text: string)`
    - [ ] `list(items: string[])`
    - [ ] `table(headers: string[], rows: string[][])`
    - [ ] `code(language: string, code: string)`
    - [ ] `html(html: string)`
    - [ ] `markdown(markdown: string)`
- [ ] Host the docs on the web
- [ ] Add integration and unit tests