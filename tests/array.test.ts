import { array, validate } from '../src';

test('array - type & length', () => {
  const obj = { state1: [], state3: {}, state4: 'test' };

  expect(
    validate(obj, {
      state1: [array.type, array.min(0), array.max(3)],
      state2: [array.type, array.min(0), array.max(3)],
      state3: [array.type, array.min(0), array.max(3)],
      state4: [array.type, array.min(0), array.max(3)],
    })
  ).toEqual({ state3: ['type'], state4: ['type'] });

  expect(
    validate(obj, { state1: [array.type, array.min(1), array.max(-3)] })
  ).toEqual({ state1: ['min', 'max'] });
});
