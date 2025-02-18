import { taskRegistry } from "@/core/registry";
import { type TaskCaseFn } from "@/models/TaskCase";

export function afterEach(fn: TaskCaseFn) {
  taskRegistry.registerAfterEach(fn);
}
