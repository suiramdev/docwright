import type { Browser, BrowserContext, Page } from "playwright";

export interface TaskSuiteContext {
  browser: Browser;
  context: BrowserContext;
}

export type TaskSuiteFn = () => Promise<void> | void;

export class TaskSuite {
  public name: string;
  public fn: TaskSuiteFn;
  public subTasks: Task[] = [];

  constructor(name: string, fn: TaskSuiteFn) {
    this.name = name;
    this.fn = fn;
  }
}

export interface TaskCaseContext {
  browser: Browser;
  context: BrowserContext;
  page: Page;
}

export type TaskCaseFn = (context: TaskCaseContext) => Promise<void> | void;

export class TaskCase {
  public name: string;
  public fn: TaskCaseFn;

  constructor(name: string, fn: TaskCaseFn) {
    this.name = name;
    this.fn = fn;
  }
}

export type Task = TaskSuite | TaskCase;
