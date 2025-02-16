import { z } from "zod";

export const ConfigSchema = z.object({
  glob: z.string().default("**/*.scenario.ts"),
});

export type Config = z.infer<typeof ConfigSchema>;
