import { taskRegistry } from "@/core/registry";
import { type TaskSuiteFn } from "@/models/TaskSuite";

export function beforeAll(fn: TaskSuiteFn) {
  taskRegistry.registerBeforeAll(fn);
}
