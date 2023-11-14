import Event from '../../src/model/Event.js';
import {
  EventTypeError,
  EventStatusError,
  EventAmountError,
} from '../../src/error/CustomError.js';

describe('Event mode 단위테스트', () => {
  test.each([
    [
      [[], false, 0],
      [3000, false, 0],
      [false, false, 0],
      [['크리스마스 디데이 할인'], false, 0],
      [{ type: '크리스마스 디데이 할인' }, false, 0],
    ],
  ])(
    'Event의 type type이 string이 아닐 경우 EventTypeError을 반환한다.',
    input => {
      expect(() => new Event(input[0], input[1], input[2])).toThrowError(
        EventTypeError,
      );
    },
  );

  test.each([
    [
      ['크리스마스 디데이 할인', 0, 0],
      ['크리스마스 디데이 할인', [], 0],
      ['크리스마스 디데이 할인', 'false', 0],
      ['크리스마스 디데이 할인', [false], 0],
      ['크리스마스 디데이 할인', { status: false }, 0],
    ],
  ])(
    'Event의 status type이 boolean이 아닐 경우 EventStatsError을 반환한다.',
    input => {
      expect(() => new Event(input[0], input[1], input[2])).toThrowError(
        EventStatusError,
      );
    },
  );

  test.each([
    [
      ['크리스마스 디데이 할인', false, []],
      ['크리스마스 디데이 할인', false, [0]],
      ['크리스마스 디데이 할인', false, '0'],
      ['크리스마스 디데이 할인', false, false],
      ['크리스마스 디데이 할인', false, { amount: 0 }],
    ],
  ])(
    'Event의 amount type이 number가 아닐 경우 EventAmountError을 반환한다.',
    input => {
      expect(() => new Event(input[0], input[1], input[2])).toThrowError(
        EventAmountError,
      );
    },
  );
});
