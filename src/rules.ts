import { Rule } from './types';

// Default Regex expresssions
const rEmail =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const rUrl =
  /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

const rUUID =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

const rIBAN = /^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)/;

// All default rules allowed on string values
type BasicRuleSet = { type: Rule };
type MinMaxRuleSet<T> = BasicRuleSet & {
  min: (value: T) => Rule;
  max: (value: T) => Rule;
};

type StringRules = MinMaxRuleSet<number> & {
  email: Rule;
  url: Rule;
  uuid: Rule;
  iban: Rule;
  enum: (value: string[]) => Rule;
};

function exists(value: unknown): boolean {
  return value !== undefined && value !== null;
}

function checkType(value: unknown, type: string): boolean {
  if (type === 'array')
    return exists(value) && typeof value === 'object' && Array.isArray(value);
  return exists(value) && typeof value === type;
}

export const string: StringRules = {
  type: (value) => {
    if (!exists(value)) return;
    if (!checkType(value, 'string')) return 'type';
  },
  email: (value) => {
    if (!checkType(value, 'string')) return;
    if (!(value as string).match(rEmail)) return 'format';
  },
  url: (value) => {
    if (!checkType(value, 'string')) return;
    if (!(value as string).match(rUrl)) return 'format';
  },
  uuid: (value) => {
    if (!checkType(value, 'string')) return;
    if (!(value as string).match(rUUID)) return 'format';
  },
  iban: (value) => {
    if (!checkType(value, 'string')) return;
    if (!(value as string).match(rIBAN)) return 'format';
  },
  enum: (accepted) => (value) => {
    if (!checkType(value, 'string')) return;
    if (!accepted.includes(value as string)) return 'enum';
  },
  min: (num) => (value) => {
    if (!checkType(value, 'string')) return;
    if ((value as string).length < num) return 'min';
  },
  max: (num) => (value) => {
    if (!checkType(value, 'string')) return;
    if ((value as string).length > num) return 'max';
  },
};

// All default rules allowed on numbers
export const number: MinMaxRuleSet<number> = {
  type: (value) => {
    if (!exists(value)) return;
    if (!checkType(value, 'number')) return 'type';
  },
  min: (num) => (value) => {
    if (!checkType(value, 'number')) return;
    if ((value as number) < num) return 'min';
  },
  max: (num) => (value) => {
    if (!checkType(value, 'number')) return;
    if ((value as number) > num) return 'max';
  },
};

export const array: MinMaxRuleSet<number> = {
  type: (value) => {
    if (!exists(value)) return;
    if (!checkType(value, 'array')) return 'type';
  },
  min: (num) => (value) => {
    if (!checkType(value, 'array')) return;
    if ((value as unknown[]).length < num) return 'min';
  },
  max: (num) => (value) => {
    if (!checkType(value, 'array')) return;
    if ((value as unknown[]).length > num) return 'max';
  },
};

export const boolean: BasicRuleSet = {
  type: (value) => {
    if (!exists(value)) return;
    if (!checkType(value, 'boolean')) return 'type';
  },
};
export const object: BasicRuleSet = {
  type: (value) => {
    if (!exists(value)) return;
    if (!checkType(value, 'object')) return 'type';
  },
};
export const required: Rule = (value) => {
  if (!exists(value)) return 'required';
};

function isValidDate(value: string | number | Date): boolean {
  if (!exists(value)) return true;
  try {
    new Date(value).toISOString();
    return true;
  } catch (e) {
    return false;
  }
}

export const datetime: MinMaxRuleSet<string> = {
  type: (value) => {
    if (!isValidDate(value as number | string | Date)) return 'type';
  },
  min: (datetime) => (value) => {
    if (!isValidDate(value as number | string | Date)) return;
    if ((value as string) < datetime) return 'min';
  },
  max: (datetime) => (value) => {
    if (!isValidDate(value as number | string | Date)) return;
    if ((value as string) > datetime) return 'max';
  },
};
