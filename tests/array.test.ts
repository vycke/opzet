import { test, expect } from "vitest";
import { array, ERROR_TYPES, validate } from "../src";

test("array - type & length", () => {
  const obj = { state1: [], state3: {}, state4: "test" };

  expect(
    validate(obj, {
      state1: [array.type, array.min(0), array.max(3)],
      state2: [array.type, array.min(0), array.max(3)],
      state3: [array.type, array.min(0), array.max(3)],
      state4: [array.type, array.min(0), array.max(3)],
    }),
  ).toEqual({ state3: ERROR_TYPES.type, state4: ERROR_TYPES.type });

  expect(
    validate(obj, { state1: [array.type, array.min(1), array.max(-3)] }),
  ).toEqual({
    state1: ERROR_TYPES.array.min,
  });

  expect(validate(obj, { state1: [array.type, array.max(-3)] })).toEqual({
    state1: ERROR_TYPES.array.max,
  });
});
