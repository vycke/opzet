export * from './rules';
import type { O, Rule, Schema, ValidationErrors } from './types';

// evaluate a single rule
function evaluate(rules: Rule[], value: unknown, obj: O): string[] {
  const errors: string[] = [];
  rules.forEach((rule) => {
    const res = rule(value, obj);
    if (res) errors.push(res);
  });

  return errors;
}

// helper that checks if a value exists (not null and not undefined)
function exists(value: unknown): boolean {
  return value !== undefined && value !== null;
}

// function to get value from tokenized path
function get(obj: O, path: string) {
  const tokens = path.split('.');
  return tokens.reduce(
    (o: unknown, k: string) =>
      o && typeof o === 'object' && exists((o as O)[k] as unknown)
        ? ((o as Record<string, unknown>)[k] as unknown)
        : undefined,
    obj
  );
}

// Function that does the actual valudation of the schema
export function validate(obj: O, schema: Schema): ValidationErrors {
  const errors: ValidationErrors = {};

  Object.entries(schema).forEach(([key, rules]) => {
    const keyErrors = evaluate(rules, get(obj, key), obj);
    if (!keyErrors.length) return;
    errors[key] = keyErrors;
  });

  return errors;
}
