import { Task } from "./Task";
import { TaskSuite } from "./TaskSuite";
import type { TaskCaseFn } from "@/types";

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
