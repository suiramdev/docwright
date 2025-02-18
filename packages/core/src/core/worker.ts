import * as path from "path";
import { tracer } from "./tracer";
import type { Trace, TaskCaseContext } from "@/types";
import type { Task } from "@/models/Task";
import { chromium, type Browser } from "playwright";
import { taskRegistry } from "./registry";
import { TaskCase, TaskSuite } from "@/models";

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

interface TaskRunContext {
  browser: Browser;
}

async function runTasks(tasks: Task[]) {
  const browser = await chromium.launch();

  // Run all the tasks, creating a new browser and context for each one
  // and closing them when the task is done
  for (const task of tasks) {
    const runContext: TaskRunContext = { browser };

    try {
      await runTask(task, runContext);
    } finally {
      await browser.close();
    }
  }
}

async function runTask(task: Task, runContext: TaskRunContext) {
  if (task instanceof TaskSuite) {
    await runTaskSuite(task, runContext);
  } else if (task instanceof TaskCase) {
    await runTaskCase(task, runContext);
  }
}

async function runTaskSuite(task: TaskSuite, runContext: TaskRunContext) {
  tracer.startTrace("suite", {
    name: task.name,
  });

  try {
    for (const beforeAllFn of task.beforeAllFns) {
      await beforeAllFn(runContext);
    }

    for (const subTask of task.subTasks) {
      await runTask(subTask, runContext);
    }

    for (const afterAllFn of task.afterAllFns) {
      await afterAllFn(runContext);
    }
  } finally {
    tracer.endTrace();
  }
}

async function runTaskCase(task: TaskCase, runContext: TaskRunContext) {
  tracer.startTrace("case", {
    name: task.name,
  });

  const context = await runContext.browser.newContext();
  const page = await context.newPage();

  const caseContext: TaskCaseContext = {
    browser: runContext.browser,
    context,
    page,
  };

  try {
    if (task.parentSuite) {
      for (const beforeEachFn of task.parentSuite.beforeEachFns) {
        await beforeEachFn(caseContext);
      }
    }

    await task.fn(caseContext);

    if (task.parentSuite) {
      for (const afterEachFn of task.parentSuite.afterEachFns) {
        await afterEachFn(caseContext);
      }
    }
  } finally {
    await page.close();
    await context.close();
  }

  tracer.endTrace();
}
