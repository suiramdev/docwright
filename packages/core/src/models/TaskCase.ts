import type { Browser, BrowserContext, Page } from "playwright";
import { Task } from "./Task";
import { TaskSuite } from "./TaskSuite";

export interface TaskCaseContext {
  browser: Browser;
  context: BrowserContext;
  page: Page;
}

export type TaskCaseFn = (context: TaskCaseContext) => Promise<void> | void;

export class TaskCase extends Task {
  public name: string;
  public parentSuite: TaskSuite | null;
  public fn: TaskCaseFn;

  constructor(
    name: string,
    fn: TaskCaseFn,
    parentSuite: TaskSuite | null = null
  ) {
    super();
    this.name = name;
    this.fn = fn;
    this.parentSuite = parentSuite;
  }
}
