export type N = undefined | null;
export type O = { [key: string]: unknown };
export type ValidationError = string;
export type ValidationErrors = { [key: string]: ValidationError };
export type Rule = (value: unknown, obj?: O) => ValidationError | void;
export type Schema = Record<string, Rule[]>;
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
