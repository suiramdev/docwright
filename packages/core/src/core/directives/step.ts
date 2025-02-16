import { type TaskCaseFn } from "@/models/task";
import { TaskRunner } from "@/core/runner";

export async function step(name: string, fn: TaskCaseFn) {
  const taskRunner = TaskRunner.getInstance();

  taskRunner.registerCase(name, fn);
}
