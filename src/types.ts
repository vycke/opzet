export type N = undefined | null;
export type O = { [key: string]: unknown };
export type ValidationError = { error: string; description?: unknown };
export type ValidationErrors = { [key: string]: ValidationError[] };
export type Rule = (value: unknown, obj?: O) => ValidationError | void;
export type Schema = Record<string, Rule[]>;
