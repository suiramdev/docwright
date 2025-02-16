import * as path from "path";
import { TaskRunner } from "@/core/runner";
import { Tracer, type Trace } from "./tracer";

// To prevent TypeScript from complaining about the self variable
declare var self: Worker;

export interface InputMessage {
  file: string;
}

export interface OutputMessage {
  success: boolean;
  traces: Trace[];
  error?: string;
}

self.onmessage = async (event: MessageEvent) => {
  const message = event.data as InputMessage;

  // Run the file to register the directives
  await import(path.resolve(process.cwd(), message.file));

  // Run the tasks registered from the file
  const taskRunner = TaskRunner.getInstance();
  await taskRunner.runAllTasks();

  // Get the traces
  const traces = Tracer.getInstance().getTraces();

  // Send the traces to the main thread
  self.postMessage({ success: true, traces });
};

self.onerror = (event: ErrorEvent) => {
  self.postMessage({ success: false, error: event.message });
};
