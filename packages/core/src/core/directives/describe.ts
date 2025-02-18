import { taskRegistry } from "@/core/registry";
import { type TaskSuiteFn } from "@/models/TaskSuite";

export function describe(name: string, fn: TaskSuiteFn) {
  taskRegistry.registerSuite(name, fn);
}
