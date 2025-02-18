import type { Trace } from "@/types";

export abstract class Renderer {
  public abstract render(traces: Trace[]): Promise<void>;
}
