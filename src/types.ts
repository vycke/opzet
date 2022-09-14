export type N = undefined | null;
export type O = { [key: string]: unknown };
export type ValidationErrors = { [key: string]: string[] };
export type Rule = (value: unknown, obj?: O) => string | null;
export type Schema = Record<string, Rule[]>;
