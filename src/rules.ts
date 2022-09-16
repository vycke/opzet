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
  type: (value) => {
    if (typeof value !== 'string') return 'type';
  },
  email: (value) => {
    if (string.type(value) || !(value as string).match(rEmail)) return 'format';
  },
  url: (value) => {
    if (string.type(value) || !(value as string).match(rUrl)) return 'format';
  },
  uuid: (value) => {
    if (string.type(value) || !(value as string).match(rUUID)) return 'format';
  },
  enum: (accepted) => (value) => {
    if (string.type(value) || !accepted.includes(value as string))
      return 'enum';
  },
  min: (num) => (value) => {
    if (string.type(value) || (value as string).length < num) return 'min';
  },
  max: (num) => (value) => {
    if (string.type(value) || (value as string).length > num) return 'max';
  },
};

// All default rules allowed on numbers
export const number: NumberRules = {
  type: (value) => {
    if (typeof value !== 'number') return 'type';
  },
  min: (num) => (value) => {
    if (number.type(value) || (value as number) < num) return 'min';
  },
  max: (num) => (value) => {
    if (number.type(value) || (value as number) > num) return 'max';
  },
};

export const array: ArrayRules = {
  type: (value) => {
    if (typeof value !== 'object' || !Array.isArray(value)) return 'type';
  },
  min: (num) => (value) => {
    if (array.type(value) || (value as unknown[]).length < num) return 'min';
  },
  max: (num) => (value) => {
    if (array.type(value) || (value as unknown[]).length > num) return 'max';
  },
};

export const boolean: BooleanRules = {
  type: (value) => {
    if (typeof value !== 'boolean') return 'type';
  },
};
export const object: ObjectRules = {
  type: (value) => {
    if (typeof value !== 'object') return 'type';
  },
};
export const required: Rule = (value) => {
  if (value === undefined || value === null) return 'required';
};
