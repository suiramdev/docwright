# docwright

docwright is a library that generates UI documentation from Playwright-style test scripts. It automates the process of documenting your application's user interface.

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

## Technical Details

docwright is a Bun-exclusive library. It leverages Bun's [Workers](https://bun.sh/docs/api/workers) and dynamic `import()` to execute your scenarios and transform them into documentation.

> **Note:** I wanted to use Node.js to execute the scenarios, but Node.js handles ES modules differently than Bun. This means that the scenarios would need to be pre-compiled into JavaScript files, which is not what I want.
> I had a workaround using [vite-node](https://www.npmjs.com/package/vite-node), but it was not reliable.

### How it works

TODO