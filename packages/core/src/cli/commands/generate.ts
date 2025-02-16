import { Command } from "commander";
import { loadConfig, getMatches } from "@/config/resolve";
import type { OutputMessage } from "@/core/worker";

export const generateCommand = new Command("generate")
  .description("Generate documentation from scenario files")
  .option("-c, --config <path>", "Path to config file", "docwright.config.ts")
  .action(generate);

export async function generate(options: { config: string }) {
  const config = await loadConfig(options.config);
  const files = await getMatches(config);

  for (const file of files) {
    const worker = new Worker(new URL("../../core/worker.ts", import.meta.url));
    worker.postMessage({ file });

    const workerOutput = await new Promise<OutputMessage>((resolve, reject) => {
      worker.onmessage = (event) => {
        const message = event.data as OutputMessage;

        if (message.success) {
          resolve(message);
        } else {
          reject(message);
        }
      };
    });

    const traces = workerOutput.traces;

    console.log(JSON.stringify(traces, null, 2));

    worker.terminate();
  }
}
