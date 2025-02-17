import Bun from "bun";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { Renderer, type Trace } from "docwright";

export interface MarkdownRendererOptions {
  path: string;
  mediaDir?: string;
}

export class MarkdownRenderer extends Renderer {
  private readonly options: Required<MarkdownRendererOptions>;

  constructor(options: MarkdownRendererOptions) {
    super();
    this.options = {
      mediaDir: "media",
      ...options,
    };
  }

  private async renderTrace(trace: Trace, depth: number = 0): Promise<string> {
    const headingLevel = Math.min(depth + 1, 5);
    let content = "";

    switch (trace.type) {
      case "suite":
      case "case":
        content += `${"#".repeat(headingLevel)} ${trace.data.name}\n\n`;
        break;

      case "screenshot":
        if (trace.data.value) {
          const screenshotName = `${crypto.randomUUID()}.png`;
          const screenshotPath = path.join(
            path.dirname(this.options.path),
            this.options.mediaDir,
            screenshotName
          );

          const screenshotFile = Bun.file(screenshotPath);

          // Save screenshot
          await screenshotFile.write(Buffer.from(trace.data.value, "base64"));

          // Add screenshot reference
          content += `![${screenshotName}](${this.options.mediaDir}/${screenshotName})\n\n`;
        }
        break;

      case "text":
        content += trace.data.value + "\n\n";
        break;
    }

    // Recursively render children
    for (const child of trace.children) {
      content += await this.renderTrace(child, depth + 1);
    }

    return content;
  }

  public async render(traces: Trace[]): Promise<void> {
    let filePath = this.options.path;
    if (!filePath.endsWith(".md")) {
      filePath = `${filePath}.md`;
    }

    // Ensure screenshots directory exists
    const mediaPath = path.join(path.dirname(filePath), this.options.mediaDir);
    await fs.mkdir(mediaPath, { recursive: true });

    // Render all traces
    const content = await Promise.all(
      traces.map((trace) => this.renderTrace(trace))
    );

    // Write to file
    const file = Bun.file(filePath);
    await file.write(content.join("\n"));
  }
}
