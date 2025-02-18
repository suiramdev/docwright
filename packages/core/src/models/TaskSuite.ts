import { Task } from "./Task";

export type TaskSuiteFn = () => Promise<void> | void;

export class TaskSuite extends Task {
  public name: string;
  public parentSuite: TaskSuite | null;

  constructor(name: string, parentSuite: TaskSuite | null = null) {
    super();
    this.name = name;
    this.parentSuite = parentSuite;
  }
}
