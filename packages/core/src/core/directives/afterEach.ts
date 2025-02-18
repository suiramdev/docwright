import { taskRegistry } from "@/core/registry";
import type { TaskCaseFn } from "@/types";

export function afterEach(fn: TaskCaseFn) {
  taskRegistry.registerAfterEach(fn);
}
