import { datetime, validate } from '../src';

test('datetime - type', () => {
  const obj = {
    date1: new Date().toISOString(),
    date2: new Date(),
    date3: 'test',
  };

  expect(
    validate(obj, {
      date1: [datetime.type],
      date2: [datetime.type],
      date3: [datetime.type],
      date4: [datetime.type],
    })
  ).toEqual({ date3: [{ error: 'type' }] });
});

test('datetime - min/max', () => {
  const obj = {
    date1: '2022-01-01T00:00:00+00:00',
    date2: '2022-01-01T00:00:00+00:00',
    date3: 'test',
  };

  expect(
    validate(obj, {
      date1: [
        datetime.type,
        datetime.min('2021-01-01T00:00:00+00:00'),
        datetime.max('2023-01-01T00:00:00+00:00'),
      ],
      date2: [
        datetime.type,
        datetime.max('2021-01-01T00:00:00+00:00'),
        datetime.min('2023-01-01T00:00:00+00:00'),
      ],
      date3: [
        datetime.type,
        datetime.max('2021-01-01T00:00:00+00:00'),
        datetime.min('2023-01-01T00:00:00+00:00'),
      ],
    })
  ).toEqual({
    date2: [
      { error: 'max', description: '2021-01-01T00:00:00+00:00' },
      { error: 'min', description: '2023-01-01T00:00:00+00:00' },
    ],
    date3: [{ error: 'type' }],
  });
});
