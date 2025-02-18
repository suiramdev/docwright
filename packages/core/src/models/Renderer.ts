import type { Trace } from "@/models/Trace";

export abstract class Renderer {
  public abstract render(traces: Trace[]): Promise<void>;
}
