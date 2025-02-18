import { taskRegistry } from "@/core/registry";
import { type TaskSuiteFn } from "@/models/TaskSuite";

export function afterAll(fn: TaskSuiteFn) {
  taskRegistry.registerAfterAll(fn);
}
