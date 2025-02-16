# docwright

docwright is an NPM library that transforms Playwright/Vitest-style scenarios into structured UI documentation, making it easy to generate user-friendly docs from test-like cases.

## Quick Start

1. **Install docwright**

    ```bash
    bun install docwright
    ```

    > Due to Node.js's limitations, docwright is currently only supported on Bun. [Read more](#technical-details)

2. Create a `docwright.config.ts` file.

    ```bash
    bunx docwright init
    ```

    [Example `docwright.config.ts`](./examples/docwright.config.ts)

## Technical Details

docwright is a Bun-only library. It uses Bun's [Transpiler](https://bun.sh/docs/api/transpiler) and [Workers](https://bun.sh/docs/api/workers) APIs to run your scenarios and transform them into structured docs.