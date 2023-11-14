import Date from '../../src/model/Date.js';
import Menus from '../../src/domain/Menus.js';
import Events from '../../src/domain/Events.js';

describe('Event domain 단위테스트', () => {
  const date = new Date('3');
  const menus = new Menus({
    티본스테이크: 1,
    크리스마스파스타: 1,
    레드와인: 1,
    제로콜라: 2,
    타파스: 1,
  });
  const event = new Events(date, menus);
  test('Event/present 를 통해 증정 메뉴를 반환해야 한다.', () => {
    expect(event.present()).toEqual('샴페인 1개');
  });

  test('Event/totalEventAmount 를 통해 총혜택 금액을 반환해야 한다.', () => {
    expect(event.totalEventAmount()).toEqual(-27200);
  });

  test('Event/totalPrice 를 통해 총할인 후 예상 결제 금액을 반환해야 한다.', () => {
    expect(event.totalPrice()).toEqual(149300);
  });

  test('Event/eventBadge 를 통해 혜택 금액에 따른 이벤트 배지를 반환해야 한다.', () => {
    expect(event.eventBadge()).toEqual('산타');
  });

  test('Event/aplliedEvents 를 통해 혜택 금액에 따른 이벤트 배지를 반환해야 한다.', () => {
    expect(event.appliedEvents()).toEqual([
      '크리스마스 디데이 할인: -1,200원',
      '특별 할인: -1,000원',
      '증정 이벤트: -25,000원',
    ]);
  });
});
