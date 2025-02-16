import { TaskRunner } from "@/core/runner";
import { type TaskSuiteFn } from "@/models/task";

export function describe(name: string, fn: TaskSuiteFn) {
  const taskRunner = TaskRunner.getInstance();

  taskRunner.registerSuite(name, fn);
}
