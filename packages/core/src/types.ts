import type { Browser, BrowserContext, Page } from "playwright";

export interface TaskCaseContext {
  browser: Browser;
  context: BrowserContext;
  page: Page;
}

export type TaskCaseFn = (context: TaskCaseContext) => Promise<void> | void;
export type TaskSuiteFn = () => Promise<void> | void;

export interface HookAllContext {
  browser: Browser;
}

export interface HookEachContext {
  browser: Browser;
  context: BrowserContext;
  page: Page;
}

export type HookAllFn = (context: HookAllContext) => Promise<void> | void;
export type HookEachFn = (context: HookEachContext) => Promise<void> | void;

export interface Trace {
  type: string;
  data: unknown;
  children: Trace[];
}
