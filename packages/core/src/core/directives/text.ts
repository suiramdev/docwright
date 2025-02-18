import { tracer } from "@/core/tracer";

export function text(value: string) {
  tracer.trace("text", {
    value,
  });
}
