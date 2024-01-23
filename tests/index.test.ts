import { test, expect } from "vitest";
import { ERROR_TYPES, validate } from "../src";
import { string, object, boolean, required } from "../src/rules";
import { Rule, Schema } from "../src/types";

test("simple validate, including nested values", () => {
  const obj = { boolean: true, object: { key: "value" }, required: "yes" };
  const schema: Schema<object> = {
    boolean: [boolean.type],
    object: [object.type as Rule],
    "object.key": [string.type as Rule],
    required: [required],
  };
  expect(validate(obj, schema)).toEqual(undefined);
  expect(validate({}, schema)).toEqual({ required: ERROR_TYPES.required });
});
