import { ERRORS_MESSAGES } from "./errors";
import { BasicRuleSet, MinMaxRuleSet, Rule, StringRules } from "./types";

// Default Regex expresssions
const rEmail =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const rUrl =
  /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

const rUUID =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

const rIBAN = /^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)/;

function exists(value: unknown): boolean {
  return value !== undefined && value !== null;
}

function checkType(value: unknown, type: string): boolean {
  if (type === "array")
    return exists(value) && typeof value === "object" && Array.isArray(value);
  return exists(value) && typeof value === type;
}

export const string: StringRules = {
  type: (value) => {
    if (!exists(value)) return;
    if (!checkType(value, "string")) return ERRORS_MESSAGES.type;
  },
  email: (value) => {
    if (!exists(value)) return;
    if (!(value as string).match(rEmail)) return ERRORS_MESSAGES.string.email;
  },
  url: (value) => {
    if (!exists(value)) return;
    if (!(value as string).match(rUrl)) return ERRORS_MESSAGES.string.url;
  },
  uuid: (value) => {
    if (!exists(value)) return;
    if (!(value as string).match(rUUID)) return ERRORS_MESSAGES.string.uuid;
  },
  iban: (value) => {
    if (!exists(value)) return;
    if (!(value as string).match(rIBAN)) return ERRORS_MESSAGES.string.iban;
  },
  enum: (accepted) => (value) => {
    if (!exists(value)) return;
    if (!accepted.includes(value as string)) return ERRORS_MESSAGES.string.enum;
  },
  min: (num) => (value) => {
    if (!exists(value)) return;
    if ((value as string).length < num) return ERRORS_MESSAGES.string.min;
  },
  max: (num) => (value) => {
    if (!exists(value)) return;
    if ((value as string).length > num) return ERRORS_MESSAGES.string.max;
  },
};

// All default rules allowed on numbers
export const number: MinMaxRuleSet<number> = {
  type: (value) => {
    if (!exists(value)) return;
    if (!checkType(value, "number")) return ERRORS_MESSAGES.type;
  },
  min: (num) => (value) => {
    if (!exists(value)) return;
    if ((value as number) < num) return ERRORS_MESSAGES.number.min;
  },
  max: (num) => (value) => {
    if (!exists(value)) return;
    if ((value as number) > num) return ERRORS_MESSAGES.number.max;
  },
};

export const array: MinMaxRuleSet<number> = {
  type: (value) => {
    if (!exists(value)) return;
    if (!checkType(value, "array")) return ERRORS_MESSAGES.type;
  },
  min: (num) => (value) => {
    if (!exists(value)) return;
    if ((value as unknown[])?.length < num) return ERRORS_MESSAGES.array.min;
  },
  max: (num) => (value) => {
    if (!exists(value)) return;
    if ((value as unknown[])?.length > num) return ERRORS_MESSAGES.array.max;
  },
};

export const boolean: BasicRuleSet = {
  type: (value) => {
    if (!exists(value)) return;
    if (!checkType(value, "boolean")) return ERRORS_MESSAGES.type;
  },
};
export const object: BasicRuleSet = {
  type: (value) => {
    if (!exists(value)) return;
    if (!checkType(value, "object")) return ERRORS_MESSAGES.type;
  },
};
export const required: Rule = (value) => {
  if (!exists(value)) return ERRORS_MESSAGES.required;
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
    if (!isValidDate(value as number | string | Date))
      return ERRORS_MESSAGES.type;
  },
  min: (datetime) => (value) => {
    if (!exists(value)) return;
    if ((value as string) < datetime) return ERRORS_MESSAGES.datetime.min;
  },
  max: (datetime) => (value) => {
    if (!exists(value)) return;
    if ((value as string) > datetime) return ERRORS_MESSAGES.datetime.max;
  },
};
