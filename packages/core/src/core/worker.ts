import * as path from "path";
import { tracer } from "./tracer";
import { type Trace } from "@/models/Trace";
import type { Task } from "@/models/Task";
import { chromium, type Browser, type BrowserContext } from "playwright";
import { taskRegistry } from "./registry";
import { TaskCase, TaskSuite, type TaskCaseContext } from "@/models";

// To prevent TypeScript from complaining about the self variable
declare var self: Worker;

// The input message from the main thread
export interface InputMessage {
  file: string;
}

// The output message to the main thread
export interface OutputMessage {
  success: boolean;
  traces: Trace[];
  error?: string;
}

// The message handler
self.onmessage = async (event: MessageEvent) => {
  const message = event.data as InputMessage;

  // Run the file to register the directives
  await import(path.resolve(process.cwd(), message.file));

  // Run the tasks registered from the file
  await runTasks(taskRegistry.getTasks());

  // Get the traces
  const traces = tracer.getTraces();

  // Send the traces to the main thread
  self.postMessage({ success: true, traces });
};

self.onerror = (event: ErrorEvent) => {
  self.postMessage({ success: false, error: event.message });
};

// The task run context
interface TaskRunContext {
  browser: Browser;
  context: BrowserContext;
}

async function runTasks(tasks: Task[]) {
  // Run all the tasks, creating a new browser and context for each one
  // and closing them when the task is done
  for (const task of tasks) {
    const browser = await chromium.launch();
    const context = await browser.newContext();

    const runContext: TaskRunContext = { browser, context };

    try {
      await runTask(task, runContext);
    } finally {
      await context.close();
      await browser.close();
    }
  }
}

async function runTask(task: Task, runContext: TaskRunContext) {
  if (task instanceof TaskSuite) {
    // Run the task suite recursively
    await runTaskSuite(task, runContext);
  } else if (task instanceof TaskCase) {
    // Run the task case
    await runTaskCase(task, runContext);
  }
}

async function runTaskSuite(task: TaskSuite, runContext: TaskRunContext) {
  tracer.startTrace("suite", {
    name: task.name,
  });

  try {
    for (const subTask of task.subTasks) {
      // Run the sub-task recursively
      await runTask(subTask, runContext);
    }
  } finally {
    tracer.endTrace();
  }
}

async function runTaskCase(task: TaskCase, runContext: TaskRunContext) {
  tracer.startTrace("case", {
    name: task.name,
  });

  const page = await runContext.context.newPage();

  const caseContext: TaskCaseContext = { ...runContext, page };

  try {
    // Run the task case
    await task.fn(caseContext);
  } finally {
    await page.close();
  }

  tracer.endTrace();
}
