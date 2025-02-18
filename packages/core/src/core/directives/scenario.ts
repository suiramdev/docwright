import { TaskRunner } from "@/core/runner";
import { type TaskCaseFn } from "@/models/TaskCase";

export async function scenario(name: string, fn: TaskCaseFn) {
  const taskRunner = TaskRunner.getInstance();

  taskRunner.registerCase(name, fn);
}
