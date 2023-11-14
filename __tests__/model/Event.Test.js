import Event from '../../src/model/Event.js';
import EVENT_LIST from '../../src/constant/EventList.js';
import {
  EventTypeError,
  EventStatusError,
  EventAmountError,
} from '../../src/error/CustomError.js';

describe('Event model 단위테스트', () => {
  Object.keys(EVENT_LIST).forEach(key => {
    test('Event/validate 정상적으로 생성된 메뉴가 오류를 반환하지 않아야 한다.', () => {
      expect(
        () =>
          new Event(
            EVENT_LIST[key].type,
            EVENT_LIST[key].status,
            EVENT_LIST[key].amount,
          ),
      ).not.toThrowError();
    });

    test('Event/get 생성된 메뉴의 type, status, amout 를 올바르게 불러와야 한다.', () => {
      expect(
        new Event(
          EVENT_LIST[key].type,
          EVENT_LIST[key].status,
          EVENT_LIST[key].amount,
        ).get(),
      ).toEqual(EVENT_LIST[key]);
    });
  });

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

  const event = new Event('테스트 이벤트', true, 0);
  const AFTER_AMOUNT = -5000;
  const AFTER_STATUS = false;

  test('Event/setAmount 로 event의 amount가 제대로 변경되어야 한다.', () => {
    event.setAmount(AFTER_AMOUNT);

    expect(event.get().amount).toEqual(AFTER_AMOUNT);
  });

  test('Event/setStatus 로 event의 status가 제대로 변경되어야 한다.', () => {
    event.setStatus(AFTER_STATUS);

    expect(event.get().status).toEqual(AFTER_STATUS);
  });
});
