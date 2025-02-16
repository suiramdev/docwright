export interface Trace {
  type: string;
  data: unknown;
  children: Trace[];
}

export class Tracer {
  private static instance: Tracer;
  private traces: Trace[] = [];
  private traceStack: Trace[] = []; // Stack to track nested traces

  public static getInstance() {
    if (!Tracer.instance) {
      Tracer.instance = new Tracer();
    }
    return Tracer.instance;
  }

  public trace(type: string, data: unknown) {
    const newTrace = { type, data, children: [] };

    if (this.traceStack.length > 0) {
      this.traceStack[this.traceStack.length - 1].children.push(newTrace);
    } else {
      this.traces.push(newTrace);
    }
  }

  public startTrace(type: string, data: unknown) {
    const newTrace = { type, data, children: [] };

    if (this.traceStack.length > 0) {
      this.traceStack[this.traceStack.length - 1].children.push(newTrace);
    } else {
      this.traces.push(newTrace);
    }

    this.traceStack.push(newTrace);
  }

  public endTrace() {
    if (this.traceStack.length === 0) {
      throw new Error("No trace to end");
    }
    this.traceStack.pop();
  }

  public getTraces() {
    return this.traces;
  }
}
