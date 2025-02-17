import type { Trace } from "@/core/tracer";

export abstract class Renderer {
  public abstract render(traces: Trace[]): Promise<void>;
}
