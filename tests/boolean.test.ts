import { test, expect } from "vitest";
import { boolean, ERRORS_MESSAGES, validate } from "../src";

test("boolean rules", () => {
  const obj = { bool1: true, bool2: "test" };
  expect(
    validate(obj, {
      bool1: [boolean.type],
      bool2: [boolean.type],
    }),
  ).toEqual({ bool2: ERRORS_MESSAGES.type });
});
