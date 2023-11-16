import { MissionUtils } from '@woowacourse/mission-utils';
import { EOL as LINE_SEPARATOR } from 'os';
import { Date } from '../../src/model/index.js';
import { Menus, Order } from '../../src/domain/index.js';

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

const getOutput = logSpy => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach(log => {
    expect(received).toContain(log);
  });
};

describe('Order domain 출력 테스트', () => {
  const date = new Date('3');
  const menus = new Menus({
    티본스테이크: 1,
    크리스마스파스타: 1,
    레드와인: 1,
    제로콜라: 2,
    타파스: 1,
  });
  const order = new Order(date, menus);

  test('Order/print 를 통해 결과 타이틀을 올바르게 출력해야 한다.', () => {
    const logSpy = getLogSpy();
    const EXPECTED = ['12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!'];

    order.print();
    expectLogContains(getOutput(logSpy), EXPECTED);
  });

  test('Order/print 를 통해 주문 메뉴를 올바르게 출력해야 한다.', () => {
    const logSpy = getLogSpy();
    const EXPECTED = [
      '<주문 메뉴>',
      '티본스테이크 1개',
      '크리스마스파스타 1개',
      '레드와인 1개',
      '제로콜라 2개',
      '타파스 1개',
    ];

    order.print();
    expectLogContains(getOutput(logSpy), EXPECTED);
  });

  test('Order/print 를 통해 총 주문 금액을 올바르게 출력해야 한다.', () => {
    const logSpy = getLogSpy();
    const EXPECTED = ['<할인 전 총주문 금액>', '151,500원'];

    order.print();
    expectLogContains(getOutput(logSpy), EXPECTED);
  });

  test('Order/print 를 통해 증정 메뉴를 올바르게 출력해야 한다.', () => {
    const logSpy = getLogSpy();
    const EXPECTED = ['<증정 메뉴>', '샴페인 1개'];

    order.print();
    expectLogContains(getOutput(logSpy), EXPECTED);
  });

  test('Order/print 를 통해 혜택 내역을 올바르게 출력해야 한다.', () => {
    const logSpy = getLogSpy();
    const EXPECTED = [
      '<혜택 내역>',
      '크리스마스 디데이 할인: -1,200원',
      '특별 할인: -1,000원',
      '증정 이벤트: -25,000원',
    ];

    order.print();
    expectLogContains(getOutput(logSpy), EXPECTED);
  });

  test('Order/print 를 통해 총 혜택 금액을 올바르게 출력해야 한다.', () => {
    const logSpy = getLogSpy();
    const EXPECTED = ['<총혜택 금액>', '-27,200원'];

    order.print();
    expectLogContains(getOutput(logSpy), EXPECTED);
  });

  test('Order/print 를 통해 할인 후 예상 결제 금액을 올바르게 출력해야 한다.', () => {
    const logSpy = getLogSpy();
    const EXPECTED = ['<할인 후 예상 결제 금액>', '149,300원'];

    order.print();
    expectLogContains(getOutput(logSpy), EXPECTED);
  });

  test('Order/print 를 통해 할인 후 이벤트 배지를 올바르게 출력해야 한다.', () => {
    const logSpy = getLogSpy();
    const EXPECTED = ['<12월 이벤트 배지>', '산타'];

    order.print();
    expectLogContains(getOutput(logSpy), EXPECTED);
  });
});
