import { test, expect } from "vitest";
import { datetime, ERRORS_MESSAGES, validate } from "../src";

test("datetime - type", () => {
  const obj = {
    date1: new Date().toISOString(),
    date2: new Date(),
    date3: "test",
  };

  expect(
    validate(obj, {
      date1: [datetime.type],
      date2: [datetime.type],
      date3: [datetime.type],
      date4: [datetime.type],
    }),
  ).toEqual({ date3: ERRORS_MESSAGES.type });
});

test("datetime - min/max", () => {
  const obj = {
    date1: "2022-01-01T00:00:00+00:00",
    date2: "2022-01-01T00:00:00+00:00",
    date3: "test",
  };

  expect(
    validate(obj, {
      date1: [
        datetime.type,
        datetime.min("2021-01-01T00:00:00+00:00"),
        datetime.max("2023-01-01T00:00:00+00:00"),
      ],
      date2: [
        datetime.type,
        datetime.max("2021-01-01T00:00:00+00:00"),
        datetime.min("2023-01-01T00:00:00+00:00"),
      ],
      date3: [
        datetime.type,
        datetime.max("2021-01-01T00:00:00+00:00"),
        datetime.min("2023-01-01T00:00:00+00:00"),
      ],
    }),
  ).toEqual({
    date2: ERRORS_MESSAGES.datetime.max,
    date3: ERRORS_MESSAGES.type,
  });

  expect(
    validate(obj, {
      date1: [
        datetime.type,
        datetime.min("2021-01-01T00:00:00+00:00"),
        datetime.max("2023-01-01T00:00:00+00:00"),
      ],
      date2: [datetime.type, datetime.min("2023-01-01T00:00:00+00:00")],
      date3: [
        datetime.type,
        datetime.max("2021-01-01T00:00:00+00:00"),
        datetime.min("2023-01-01T00:00:00+00:00"),
      ],
    }),
  ).toEqual({
    date2: ERRORS_MESSAGES.datetime.min,
    date3: ERRORS_MESSAGES.type,
  });
});
