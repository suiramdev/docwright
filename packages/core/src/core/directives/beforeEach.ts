import { taskRegistry } from "@/core/registry";
import { type TaskCaseFn } from "@/models/TaskCase";

export function beforeEach(fn: TaskCaseFn) {
  taskRegistry.registerBeforeEach(fn);
}
