import { taskRegistry } from "@/core/registry";
import type { TaskCaseFn } from "@/types";

export function beforeEach(fn: TaskCaseFn) {
  taskRegistry.registerBeforeEach(fn);
}
