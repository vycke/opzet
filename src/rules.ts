import { Rule } from './types';

// Default Regex expresssions
const rEmail =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const rUrl =
  /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

const rUUID =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

// All default rules allowed on string values
type StringRules = {
  type: Rule;
  email: Rule;
  url: Rule;
  uuid: Rule;
  min: (value: number) => Rule;
  max: (value: number) => Rule;
  enum: (value: string[]) => Rule;
};

type NumberRules = {
  type: Rule;
  min: (value: number) => Rule;
  max: (value: number) => Rule;
};

type ArrayRules = {
  type: Rule;
  min: (value: number) => Rule;
  max: (value: number) => Rule;
};

type ObjectRules = { type: Rule };
type BooleanRules = { type: Rule };

export const string: StringRules = {
  type: (value) => (typeof value === 'string' ? null : 'type'),
  email: (value) => ((value as string).match(rEmail) ? null : 'format'),
  url: (value) => ((value as string).match(rUrl) ? null : 'format'),
  uuid: (value) => ((value as string).match(rUUID) ? null : 'format'),
  enum: (accepted) => (value) =>
    accepted.includes(value as string) ? null : 'enum',
  min: (num) => (value) => (value as string).length >= num ? null : 'min',
  max: (num) => (value) => (value as string).length <= num ? null : 'max',
};

// All default rules allowed on numbers
export const number: NumberRules = {
  type: (value) => (typeof value === 'number' ? null : 'type'),
  min: (num) => (value) => (value as number) >= num ? null : 'min',
  max: (num) => (value) => (value as number) <= num ? null : 'max',
};

export const array: ArrayRules = {
  type: (value) =>
    typeof value === 'object' && Array.isArray(value) ? null : 'type',
  min: (num) => (value) => (value as unknown[]).length >= num ? null : 'min',
  max: (num) => (value) => (value as unknown[]).length <= num ? null : 'max',
};

export const boolean: BooleanRules = {
  type: (value: unknown) => (typeof value === 'boolean' ? null : 'type'),
};
export const object: ObjectRules = {
  type: (value: unknown) => (typeof value === 'object' ? null : 'type'),
};
export const required: Rule = (value) =>
  value !== undefined && value !== null ? null : 'required';
