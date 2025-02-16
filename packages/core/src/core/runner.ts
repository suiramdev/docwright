import { chromium, type Browser, type BrowserContext } from "playwright";
import {
  type Task,
  TaskCase,
  TaskSuite,
  type TaskSuiteFn,
  type TaskCaseFn,
} from "@/models/task";
import { Tracer } from "./tracer";

interface TaskRunnerContext {
  browser: Browser;
  context: BrowserContext;
}

export class TaskRunner {
  private static instance: TaskRunner;
  private tasks: Task[] = [];
  private currentSuite: TaskSuite | null = null;

  public static getInstance() {
    if (!TaskRunner.instance) {
      TaskRunner.instance = new TaskRunner();
    }
    return TaskRunner.instance;
  }

  private registerTask(task: Task) {
    if (this.currentSuite) {
      this.currentSuite.subTasks.push(task);
    } else {
      this.tasks.push(task);
    }
  }

  public registerSuite(name: string, fn: TaskSuiteFn) {
    const task = new TaskSuite(name, fn);
    this.registerTask(task);

    const previousSuite = this.currentSuite;
    this.currentSuite = task;

    fn();

    this.currentSuite = previousSuite;
  }

  public registerCase(name: string, fn: TaskCaseFn) {
    const task = new TaskCase(name, fn);
    this.registerTask(task);
  }

  public getTasks() {
    return this.tasks;
  }

  public async runAllTasks() {
    for (const task of this.tasks) {
      const browser = await chromium.launch();
      const context = await browser.newContext();

      await this.runTask(task, { browser, context });

      await context.close();
      await browser.close();
    }
  }

  public async runTask(task: Task, runnerContext: TaskRunnerContext) {
    Tracer.getInstance().startTrace(
      task instanceof TaskSuite ? "suite" : "case",
      {
        name: task.name,
      }
    );

    if (task instanceof TaskSuite) {
      for (const subTask of task.subTasks) {
        await this.runTask(subTask, runnerContext);
      }
    } else if (task instanceof TaskCase) {
      const page = await runnerContext.context.newPage();
      await task.fn({ ...runnerContext, page });
      await page.close();
    }
    Tracer.getInstance().endTrace();
  }
}
