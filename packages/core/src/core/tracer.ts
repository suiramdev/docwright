import { type Trace } from "@/models/Trace";

/**
 * The tracer.
 *
 * This class is responsible for tracing the events of the worker.
 * It is used to create a tree of events, which can be used to generate
 * rendered documentation.
 */
export class Tracer {
  private static instance: Tracer;
  private traces: Trace[] = [];
  private traceStack: Trace[] = []; // Stack to track nested traces

  /**
   * Get the singleton instance of the tracer.
   *
   * @returns The singleton instance of the tracer.
   */
  public static getInstance() {
    if (!Tracer.instance) {
      Tracer.instance = new Tracer();
    }
    return Tracer.instance;
  }

  /**
   * Trace an event.
   *
   * @param type - The type of the trace.
   * @param data - The data of the trace.
   */
  public trace(type: string, data: unknown) {
    const newTrace = { type, data, children: [] };

    if (this.traceStack.length > 0) {
      this.traceStack[this.traceStack.length - 1].children.push(newTrace);
    } else {
      this.traces.push(newTrace);
    }
  }

  /**
   * Start a trace.
   *
   * @param type - The type of the trace.
   * @param data - The data of the trace.
   */
  public startTrace(type: string, data: unknown) {
    const newTrace = { type, data, children: [] };

    if (this.traceStack.length > 0) {
      this.traceStack[this.traceStack.length - 1].children.push(newTrace);
    } else {
      this.traces.push(newTrace);
    }

    this.traceStack.push(newTrace);
  }

  /**
   * End a trace.
   */
  public endTrace() {
    if (this.traceStack.length === 0) {
      throw new Error("No trace to end");
    }
    this.traceStack.pop();
  }

  /**
   * Get the traces.
   *
   * @returns The traces.
   */
  public getTraces() {
    return this.traces;
  }
}

export const tracer = Tracer.getInstance();
