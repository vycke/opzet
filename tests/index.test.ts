import { validate } from '../src';
import { string, number, array, object, boolean, required } from '../src/rules';
import { Rule, Schema } from '../src/types';

test('simple validate, including nested values', () => {
  const obj = { boolean: true, object: { key: 'value' }, required: 'yes' };
  const schema: Schema = {
    boolean: [boolean.type],
    object: [object.type as Rule],
    'object.key': [string.type as Rule],
    required: [required],
  };
  expect(validate(obj, schema)).toEqual({});
  expect(validate({}, schema)).toEqual({
    boolean: ['type'],
    object: ['type'],
    required: ['required'],
    'object.key': ['type'],
  });
});

test('string rules', () => {
  expect(
    validate(
      { key1: 'value', key2: 'value' },
      {
        key1: [string.min(7), string.max(3)],
        key2: [string.min(3), string.max(10)],
      }
    )
  ).toEqual({
    key1: ['min', 'max'],
  });

  expect(
    validate(
      { email1: 'value', email2: 'test@test.nl' },
      { email1: [string.email], email2: [string.email] }
    )
  ).toEqual({
    email1: ['format'],
  });

  expect(
    validate(
      { url1: 'value', url2: 'https://example.com' },
      { url1: [string.url], url2: [string.url] }
    )
  ).toEqual({ url1: ['format'] });

  expect(
    validate(
      { uuid1: 'value', uuid2: '123e4567-e89b-12d3-a456-426614174000' },
      { uuid1: [string.uuid], uuid2: [string.uuid] }
    )
  ).toEqual({
    uuid1: ['format'],
  });

  expect(
    validate(
      { enum1: 'value', enum2: 'value' },
      { enum1: [string.enum(['non'])], enum2: [string.enum(['value'])] }
    )
  ).toEqual({
    enum1: ['enum'],
  });
});

test('number rules', () => {
  const obj = { count: 0, string: 'string' };
  expect(
    validate(obj, {
      count: [number.type, number.min(-1), number.max(3)],
      string: [number.type],
    })
  ).toEqual({ string: ['type'] });
  expect(
    validate(obj, { count: [number.type, number.min(1), number.max(-3)] })
  ).toEqual({ count: ['min', 'max'] });
});

test('array rules', () => {
  const obj = { state: [], obj: {}, string: 'test' };
  expect(
    validate(obj, {
      state: [array.type, array.min(0), array.max(3)],
      obj: [array.type],
      string: [array.type],
    })
  ).toEqual({ obj: ['type'], string: ['type'] });
  expect(
    validate(obj, { state: [array.type, array.min(1), array.max(-3)] })
  ).toEqual({ state: ['min', 'max'] });
});
