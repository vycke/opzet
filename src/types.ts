export type N = undefined | null;
export type O = { [key: string]: unknown };
export type ValidationError = string;
export type ValidationErrors<T extends object> = {
  [key in keyof T]: ValidationError;
};
export type Rule = (value: unknown, obj?: O) => ValidationError | void;
export type Schema<T extends object> = Partial<{ [k in keyof T]: Rule[] }>;
// All default rules allowed on string values
export type BasicRuleSet = { type: Rule };
export type MinMaxRuleSet<T> = BasicRuleSet & {
  min: (value: T) => Rule;
  max: (value: T) => Rule;
};

export type StringRules = MinMaxRuleSet<number> & {
  email: Rule;
  url: Rule;
  uuid: Rule;
  iban: Rule;
  enum: (value: string[]) => Rule;
};
