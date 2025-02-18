import { TaskSuite } from "./TaskSuite";

export abstract class Task {
  public abstract name: string;
  public subTasks: Task[] = [];
  public abstract parentSuite: TaskSuite | null;
}
