import { EventRepository } from '../../src/repository/index.js';
import { EventNotExistError } from '../../src/error/CustomError.js';

describe('EventRepository 단위테스트', () => {
  test.each([
    '크리스마스 디데이 할인',
    '평일 할인',
    '주말 할인',
    '특별 할인',
    '증정 이벤트',
  ])(
    'EventRepository/getEventByType 을 통해 EVENT_LIST에 있는 이벤트라면, 해당 이벤트를 불러와야 한다.',
    type => {
      expect(() => EventRepository.getEventByType(type)).not.toThrowError();
    },
  );

  test.each([
    '파격 할인',
    '사장님이 미쳤어요',
    '1+1 이벤트',
    '추석 이벤트',
    '부처님 오신날 디데이 할인',
  ])(
    'EventRepository/getEventByType 을 통해 불러올 수 없는 이벤트라면, EventNotExistError을 반환해야 한다.',
    type => {
      expect(() => EventRepository.getEventByType(type)).toThrowError(
        EventNotExistError,
      );
    },
  );

  test('EventRepository/get 을 통해 모든 이벤트를 불러와야 한다.', () => {
    const events = [];
    EventRepository.get().forEach(event => {
      events.push(event.print());
    });
    const RESULT = [
      '크리스마스 디데이 할인: 0원',
      '평일 할인: 0원',
      '주말 할인: 0원',
      '특별 할인: 0원',
      '증정 이벤트: 0원',
    ];
    expect(events).toEqual(RESULT);
  });
});
