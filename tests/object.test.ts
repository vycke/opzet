import { test, expect } from "vitest";
import { ERROR_TYPES, object, validate } from "../src";

test("object rules", () => {
  const obj = { key1: {}, key2: "test" };
  expect(
    validate(obj, {
      key1: [object.type],
      key2: [object.type],
    }),
  ).toEqual({ key2: ERROR_TYPES.type });
});
