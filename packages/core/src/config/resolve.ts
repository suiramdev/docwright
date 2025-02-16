import * as path from "path";
import { ConfigSchema, type Config } from "./schema";

/**
 * Loads the config from the given path.
 *
 * The config file can be a JavaScript or TypeScript file that exports a default object or a config object.
 *
 * @param configPath - The path to the config file.
 * @returns The loaded config.
 */
export async function loadConfig(configPath: string): Promise<Config> {
  const module = await import(path.resolve(configPath));
  if (module.default) {
    return ConfigSchema.parse(module.default);
  }

  if (module.config) {
    return ConfigSchema.parse(module.config);
  }

  throw new Error(
    "Config file must export a default object or a config object"
  );
}

/**
 * Gets the files that match the glob pattern.
 *
 * @param config - The config.
 * @returns The files that match the glob pattern.
 */
export async function getMatches(config: Config) {
  const glob = new Bun.Glob(config.glob);
  const files = await Array.fromAsync(glob.scan({ cwd: process.cwd() }));

  return files;
}
