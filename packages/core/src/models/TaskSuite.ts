import { Task } from "./Task";
import type { HookEachFn, HookAllFn, TaskCaseFn, TaskSuiteFn } from "@/types";

export class TaskSuite extends Task {
  public name: string;
  public parentSuite: TaskSuite | null;
  public beforeAllFns: HookAllFn[] = [];
  public afterAllFns: HookAllFn[] = [];
  public beforeEachFns: HookEachFn[] = [];
  public afterEachFns: HookEachFn[] = [];

  constructor(name: string, parentSuite: TaskSuite | null = null) {
    super();
    this.name = name;
    this.parentSuite = parentSuite;
  }

  public addBeforeAll(fn: TaskSuiteFn) {
    this.beforeAllFns.push(fn);
  }

  public addAfterAll(fn: TaskSuiteFn) {
    this.afterAllFns.push(fn);
  }

  public addBeforeEach(fn: TaskCaseFn) {
    this.beforeEachFns.push(fn);
  }

  public addAfterEach(fn: TaskCaseFn) {
    this.afterEachFns.push(fn);
  }
}
