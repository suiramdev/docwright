import { taskRegistry } from "@/core/registry";
import type { TaskSuiteFn } from "@/types";

export function beforeAll(fn: TaskSuiteFn) {
  taskRegistry.registerBeforeAll(fn);
}
