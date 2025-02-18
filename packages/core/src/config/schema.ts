import { z } from "zod";
import { Renderer } from "@/models";

export const OutputSchema = z.custom<Renderer>((value) => {
  return value instanceof Renderer;
});

export const ConfigSchema = z.object({
  glob: z.string().default("**/*.docwright.ts"),
  outputs: z.array(OutputSchema).default([]),
});

export type Config = z.infer<typeof ConfigSchema>;
