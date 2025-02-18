import { taskRegistry } from "@/core/registry";
import type { TaskSuiteFn } from "@/types";

export function afterAll(fn: TaskSuiteFn) {
  taskRegistry.registerAfterAll(fn);
}
