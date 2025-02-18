import type { Config } from "@docwright/core";
import { MarkdownRenderer } from "@docwright/render-markdown";

export const config: Config = {
  glob: "**/*.docwright.{js,ts}",
  outputs: [
    new MarkdownRenderer({
      path: "./dist/doc.md",
    }),
  ],
};
