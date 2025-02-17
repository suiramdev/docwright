import { chromium, type Browser, type BrowserContext } from "playwright";
import { type Task } from "@/models/Task";
import { Tracer } from "@/core/tracer";
import { TaskSuite, type TaskSuiteFn } from "@/models/TaskSuite";
import {
  TaskCase,
  type TaskCaseContext,
  type TaskCaseFn,
} from "@/models/TaskCase";

interface TaskRunContext {
  browser: Browser;
  context: BrowserContext;
}

export class TaskRunner {
  private static instance: TaskRunner;
  private tasks: Task[] = [];
  private currentSuite: TaskSuite | null = null;

  /**
   * Get the singleton instance of the task runner.
   *
   * @returns The singleton instance of the task runner.
   */
  public static getInstance() {
    if (!TaskRunner.instance) {
      TaskRunner.instance = new TaskRunner();
    }
    return TaskRunner.instance;
  }

  /**
   * Register a task.
   *
   * @param task - The task to register.
   */
  private registerTask(task: Task) {
    if (this.currentSuite) {
      this.currentSuite.subTasks.push(task);
    } else {
      this.tasks.push(task);
    }
  }

  /**
   * Register a suite.
   *
   * @param name - The name of the suite.
   * @param fn - The function that registers the suite.
   */
  public registerSuite(name: string, fn: TaskSuiteFn) {
    const task = new TaskSuite(name, this.currentSuite);
    this.registerTask(task);

    const previousSuite = this.currentSuite;
    this.currentSuite = task;

    // Call the suite function recursively, which will register all the tasks
    fn();

    this.currentSuite = previousSuite;
  }

  /**
   * Register a case.
   *
   * @param name - The name of the case.
   * @param fn - The function that registers the case.
   */
  public registerCase(name: string, fn: TaskCaseFn) {
    const task = new TaskCase(name, fn, this.currentSuite);
    this.registerTask(task);
  }

  /**
   * Run all the tasks.
   */
  public async runAllTasks() {
    for (const task of this.tasks) {
      const browser = await chromium.launch();
      const context = await browser.newContext();

      const runContext: TaskRunContext = { browser, context };

      try {
        await this.runTask(task, runContext);
      } finally {
        await context.close();
        await browser.close();
      }
    }
  }

  /**
   * Run a task.
   *
   * @param task - The task to run.
   * @param runContext - The runner context.
   */
  public async runTask(task: Task, runContext: TaskRunContext) {
    if (task instanceof TaskSuite) {
      await this.runTaskSuite(task, runContext);
    } else if (task instanceof TaskCase) {
      await this.runTaskCase(task, runContext);
    }
  }

  /**
   * Run a suite.
   *
   * @param task - The suite to run.
   * @param runContext - The runner context.
   */
  public async runTaskSuite(task: TaskSuite, runContext: TaskRunContext) {
    Tracer.getInstance().startTrace("suite", {
      name: task.name,
    });

    try {
      for (const subTask of task.subTasks) {
        // Run the sub-task recursively
        await this.runTask(subTask, runContext);
      }
    } finally {
      Tracer.getInstance().endTrace();
    }
  }

  /**
   * Run a case.
   *
   * @param task - The case to run.
   * @param runContext - The runner context.
   */
  public async runTaskCase(task: TaskCase, runContext: TaskRunContext) {
    Tracer.getInstance().startTrace("case", {
      name: task.name,
    });

    const page = await runContext.context.newPage();

    const caseContext: TaskCaseContext = { ...runContext, page };

    try {
      await task.fn(caseContext);
    } finally {
      await page.close();
    }

    Tracer.getInstance().endTrace();
  }
}
