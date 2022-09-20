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
    if (!checkType(value, 'string')) return { error: 'type' };
  },
  email: (value) => {
    if (!checkType(value, 'string')) return;
    if (!(value as string).match(rEmail))
      return { error: 'format', description: 'email' };
  },
  url: (value) => {
    if (!checkType(value, 'string')) return;
    if (!(value as string).match(rUrl))
      return { error: 'format', description: 'url' };
  },
  uuid: (value) => {
    if (!checkType(value, 'string')) return;
    if (!(value as string).match(rUUID))
      return { error: 'format', description: 'uuid' };
  },
  iban: (value) => {
    if (!checkType(value, 'string')) return;
    if (!(value as string).match(rIBAN))
      return { error: 'format', description: 'iban' };
  },
  enum: (accepted) => (value) => {
    if (!checkType(value, 'string')) return;
    if (!accepted.includes(value as string))
      return { error: 'enum', description: accepted };
  },
  min: (num) => (value) => {
    if (!checkType(value, 'string')) return;
    if ((value as string).length < num)
      return { error: 'min', description: num };
  },
  max: (num) => (value) => {
    if (!checkType(value, 'string')) return;
    if ((value as string).length > num)
      return { error: 'max', description: num };
  },
};

// All default rules allowed on numbers
export const number: MinMaxRuleSet<number> = {
  type: (value) => {
    if (!exists(value)) return;
    if (!checkType(value, 'number')) return { error: 'type' };
  },
  min: (num) => (value) => {
    if (!checkType(value, 'number')) return;
    if ((value as number) < num) return { error: 'min', description: num };
  },
  max: (num) => (value) => {
    if (!checkType(value, 'number')) return;
    if ((value as number) > num) return { error: 'max', description: num };
  },
};

export const array: MinMaxRuleSet<number> = {
  type: (value) => {
    if (!exists(value)) return;
    if (!checkType(value, 'array')) return { error: 'type' };
  },
  min: (num) => (value) => {
    if (!checkType(value, 'array')) return;
    if ((value as unknown[]).length < num)
      return { error: 'min', description: num };
  },
  max: (num) => (value) => {
    if (!checkType(value, 'array')) return;
    if ((value as unknown[]).length > num)
      return { error: 'max', description: num };
  },
};

export const boolean: BasicRuleSet = {
  type: (value) => {
    if (!exists(value)) return;
    if (!checkType(value, 'boolean')) return { error: 'type' };
  },
};
export const object: BasicRuleSet = {
  type: (value) => {
    if (!exists(value)) return;
    if (!checkType(value, 'object')) return { error: 'type' };
  },
};
export const required: Rule = (value) => {
  if (!exists(value)) return { error: 'required' };
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
    if (!isValidDate(value as number | string | Date)) return { error: 'type' };
  },
  min: (datetime) => (value) => {
    if (!isValidDate(value as number | string | Date)) return;
    if ((value as string) < datetime)
      return { error: 'min', description: datetime };
  },
  max: (datetime) => (value) => {
    if (!isValidDate(value as number | string | Date)) return;
    if ((value as string) > datetime)
      return { error: 'max', description: datetime };
  },
};
