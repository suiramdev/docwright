import { Tracer } from "../tracer";

export function text(value: string) {
  const tracer = Tracer.getInstance();

  tracer.trace("text", {
    value,
  });
}
