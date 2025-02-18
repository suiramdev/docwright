export interface Trace {
  type: string;
  data: unknown;
  children: Trace[];
}
