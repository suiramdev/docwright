import { taskRegistry } from "@/core/registry";
import type { TaskCaseFn } from "@/types";

export async function scenario(name: string, fn: TaskCaseFn) {
  taskRegistry.registerCase(name, fn);
}
