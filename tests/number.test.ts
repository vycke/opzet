import { test, expect } from "vitest";
import { number, validate } from "../src";

test("number rules", () => {
  const obj = { count: 0, string: "string" };

  expect(
    validate(obj, {
      count: [number.type, number.min(-1), number.max(3)],
      string: [number.type],
      count2: [number.type, number.min(-1), number.max(3)],
    }),
  ).toEqual({ string: [{ error: "type" }] });

  expect(
    validate(obj, { count: [number.type, number.min(1), number.max(-3)] }),
  ).toEqual({
    count: [
      { error: "min", description: 1 },
      { error: "max", description: -3 },
    ],
  });
});
