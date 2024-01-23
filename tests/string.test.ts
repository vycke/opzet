import { test, expect } from "vitest";
import { ERROR_TYPES, string, validate } from "../src";

test("string - type & length", () => {
  expect(
    validate(
      { key1: "value", key2: "value", key3: 3 },
      {
        key1: [string.type, string.min(7), string.max(3)],
        key2: [string.type, string.min(3), string.max(10)],
        key3: [string.type, string.min(3), string.max(3)],
      },
    ),
  ).toEqual({
    key1: ERROR_TYPES.string.min,
    key3: ERROR_TYPES.type,
  });

  expect(
    validate(
      { key1: "value", key2: "value", key3: 3 },
      {
        key1: [string.type, string.max(3)],
        key2: [string.type, string.min(3), string.max(10)],
        key3: [string.type, string.min(3), string.max(3)],
      },
    ),
  ).toEqual({
    key1: ERROR_TYPES.string.max,
    key3: ERROR_TYPES.type,
  });
});

test("string - email", () => {
  expect(
    validate(
      { email1: "value", email2: "test@test.nl" },
      {
        email1: [string.type, string.email],
        email2: [string.type, string.email],
        email3: [string.type, string.email],
      },
    ),
  ).toEqual({
    email1: ERROR_TYPES.string.email,
  });
});

test("string - url", () => {
  expect(
    validate(
      { url1: "value", url2: "https://example.com" },
      {
        url1: [string.type, string.url],
        url2: [string.type, string.url],
        url3: [string.type, string.url],
      },
    ),
  ).toEqual({ url1: ERROR_TYPES.string.url });
});

test("string - uuid", () => {
  expect(
    validate(
      { uuid1: "value", uuid2: "123e4567-e89b-12d3-a456-426614174000" },
      {
        uuid1: [string.type, string.uuid],
        uuid2: [string.type, string.uuid],
        uuid3: [string.type, string.uuid],
      },
    ),
  ).toEqual({
    uuid1: ERROR_TYPES.string.uuid,
  });
});

test("string - iban", () => {
  expect(
    validate(
      {
        iban1: "NL18RABO0123459876",
        iban2: "NL18RABO0123459876",
        iban3: "NL18RABO0123459876",
        iban4: "test",
      },
      {
        iban1: [string.type, string.iban],
        iban2: [string.type, string.iban],
        iban3: [string.type, string.iban],
        iban4: [string.type, string.iban],
        iban5: [string.type, string.iban],
      },
    ),
  ).toEqual({
    iban4: ERROR_TYPES.string.iban,
  });
});

test("string - enum", () => {
  expect(
    validate(
      { enum1: "value", enum2: "value" },
      {
        enum1: [string.type, string.enum(["non"])],
        enum2: [string.type, string.enum(["value"])],
        enum3: [string.type, string.enum(["value"])],
      },
    ),
  ).toEqual({
    enum1: ERROR_TYPES.string.enum,
  });
});
