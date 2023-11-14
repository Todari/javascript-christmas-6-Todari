import { MissionUtils } from '@woowacourse/mission-utils';
import { EOL as LINE_SEPARATOR } from 'os';
import App from '../../src/App.js';
import SETTING from '../../src/constant/Setting.js';
import EventRepository from '../../src/repository/EventRepository.js';

const mockQuestions = inputs => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

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

const CHRISTMAS_WEEKDAY = '13';
const CHRISTMAS_WEEKEND = '16';
const CHRISTMAS_STAR = '24';
const NOCHRISTMAS_WEEKDAY = '27';
const NOCHRISTMAS_WEEKEND = '30';
const NOCHRISTMAS_STAR = '31';

const ALL_EVENTS = '티본스테이크-1,크리스마스파스타-1,타파스-1,제로콜라-2,샴페인-1,초코케이크-1';
const NO_EVENTS = '양송이수프-1,제로콜라-1';
const NO_DESSERT = '티본스테이크-1,해산물파스타-1,레드와인-1,시저샐러드-1';
const NO_MAIN = '레드와인-2,시저샐러드-1,초코케이크-1';
const NO_PRESENT = '크리스마스파스타-1,초코케이크-2,제로콜라-1,타파스-1';
const NO_PRESENT_MAIN = '초코케이크-2,제로콜라-1,타파스-1';
const NO_PRESENT_DESSERT = '크리스마스파스타-1,제로콜라-1,타파스-1';

describe('App 다양한 case에서 동작 test', () => {
  beforeEach(() => {
    EventRepository.get().forEach(event => {
      event.setAmount(0);
      event.setStatus(false);
    });
  });

  test(`case-1: 총 주문 금액이 ${SETTING.minimumApplyEventPrice}보다 작은 경우`, async () => {
    const logSpy = getLogSpy();
    mockQuestions([CHRISTMAS_WEEKDAY, NO_EVENTS]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '양송이수프 1개',
      '제로콜라 1개',
      '<할인 전 총주문 금액>',
      '9,000원',
      '<증정 메뉴>',
      '없음',
      '<혜택 내역>',
      '없음',
      '<총혜택 금액>',
      '0원',
      '<할인 후 예상 결제 금액>',
      '9,000원',
      '<12월 이벤트 배지>',
      '없음',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-2: 크리스마스o, 증정o, 특별x, 평일', async () => {
    const logSpy = getLogSpy();
    mockQuestions([CHRISTMAS_WEEKDAY, ALL_EVENTS]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '티본스테이크 1개',
      '크리스마스파스타 1개',
      '타파스 1개',
      '제로콜라 2개',
      '샴페인 1개',
      '초코케이크 1개',
      '<할인 전 총주문 금액>',
      '131,500원',
      '<증정 메뉴>',
      '샴페인 1개',
      '<혜택 내역>',
      '크리스마스 디데이 할인: -2,200원',
      '평일 할인: -2,023원',
      '증정 이벤트: -25,000원',
      '<총혜택 금액>',
      '-29,223원',
      '<할인 후 예상 결제 금액>',
      '127,277원',
      '<12월 이벤트 배지>',
      '산타',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-3: 크리스마스o, 증정o, 특별x, 주말', async () => {
    const logSpy = getLogSpy();
    mockQuestions([CHRISTMAS_WEEKEND, ALL_EVENTS]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '티본스테이크 1개',
      '크리스마스파스타 1개',
      '타파스 1개',
      '제로콜라 2개',
      '샴페인 1개',
      '초코케이크 1개',
      '<할인 전 총주문 금액>',
      '131,500원',
      '<증정 메뉴>',
      '샴페인 1개',
      '<혜택 내역>',
      '크리스마스 디데이 할인: -2,500원',
      '주말 할인: -4,046원',
      '증정 이벤트: -25,000원',
      '<총혜택 금액>',
      '-31,546원',
      '<할인 후 예상 결제 금액>',
      '124,954원',
      '<12월 이벤트 배지>',
      '산타',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-4: 크리스마스o, 증정o, 특별o, 평일', async () => {
    const logSpy = getLogSpy();
    mockQuestions([CHRISTMAS_STAR, ALL_EVENTS]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '티본스테이크 1개',
      '크리스마스파스타 1개',
      '타파스 1개',
      '제로콜라 2개',
      '샴페인 1개',
      '초코케이크 1개',
      '<할인 전 총주문 금액>',
      '131,500원',
      '<증정 메뉴>',
      '샴페인 1개',
      '<혜택 내역>',
      '크리스마스 디데이 할인: -3,300원',
      '평일 할인: -2,023원',
      '특별 할인: -1,000',
      '증정 이벤트: -25,000원',
      '<총혜택 금액>',
      '-31,323원',
      '<할인 후 예상 결제 금액>',
      '125,177원',
      '<12월 이벤트 배지>',
      '산타',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-5: 크리스마스x, 증정o, 특별x, 평일', async () => {
    const logSpy = getLogSpy();
    mockQuestions([NOCHRISTMAS_WEEKDAY, ALL_EVENTS]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '티본스테이크 1개',
      '크리스마스파스타 1개',
      '타파스 1개',
      '제로콜라 2개',
      '샴페인 1개',
      '초코케이크 1개',
      '<할인 전 총주문 금액>',
      '131,500원',
      '<증정 메뉴>',
      '샴페인 1개',
      '<혜택 내역>',
      '평일 할인: -2,023원',
      '증정 이벤트: -25,000원',
      '<총혜택 금액>',
      '-27,023원',
      '<할인 후 예상 결제 금액>',
      '129,477원',
      '<12월 이벤트 배지>',
      '산타',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-6: 크리스마스x, 증정o, 특별x, 주말', async () => {
    const logSpy = getLogSpy();
    mockQuestions([NOCHRISTMAS_WEEKEND, ALL_EVENTS]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '티본스테이크 1개',
      '크리스마스파스타 1개',
      '타파스 1개',
      '제로콜라 2개',
      '샴페인 1개',
      '초코케이크 1개',
      '<할인 전 총주문 금액>',
      '131,500원',
      '<증정 메뉴>',
      '샴페인 1개',
      '<혜택 내역>',
      '주말 할인: -4,046원',
      '증정 이벤트: -25,000원',
      '<총혜택 금액>',
      '-29,046원',
      '<할인 후 예상 결제 금액>',
      '127,454원',
      '<12월 이벤트 배지>',
      '산타',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-7: 크리스마스x, 증정o, 특별o, 평일', async () => {
    const logSpy = getLogSpy();
    mockQuestions([NOCHRISTMAS_STAR, ALL_EVENTS]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '티본스테이크 1개',
      '크리스마스파스타 1개',
      '타파스 1개',
      '제로콜라 2개',
      '샴페인 1개',
      '초코케이크 1개',
      '<할인 전 총주문 금액>',
      '131,500원',
      '<증정 메뉴>',
      '샴페인 1개',
      '<혜택 내역>',
      '평일 할인: -2,023원',
      '특별 할인: -1,000',
      '증정 이벤트: -25,000원',
      '<총혜택 금액>',
      '-28,023원',
      '<할인 후 예상 결제 금액>',
      '128,477원',
      '<12월 이벤트 배지>',
      '산타',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-8: 크리스마스o, 증정o, 특별x, 주말이지만 메인 메뉴가 없어 주말 할인이 적용되지 않는 경우', async () => {
    const logSpy = getLogSpy();
    mockQuestions([CHRISTMAS_WEEKEND, NO_MAIN]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '레드와인 2개',
      '시저샐러드 1개',
      '초코케이크 1개',
      '<할인 전 총주문 금액>',
      '143,000원',
      '<증정 메뉴>',
      '샴페인 1개',
      '<혜택 내역>',
      '크리스마스 디데이 할인: -2,500원',
      '증정 이벤트: -25,000원',
      '<총혜택 금액>',
      '-27,500원',
      '<할인 후 예상 결제 금액>',
      '140,500원',
      '<12월 이벤트 배지>',
      '산타',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-9: 크리스마스o, 증정o, 특별x, 평일이지만 디저트 메뉴가 없어 평일 할인이 적용되지 않는 경우', async () => {
    const logSpy = getLogSpy();
    mockQuestions([CHRISTMAS_WEEKDAY, NO_DESSERT]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '티본스테이크 1개',
      '해산물파스타 1개',
      '레드와인 1개',
      '시저샐러드 1개',
      '<할인 전 총주문 금액>',
      '158,000원',
      '<증정 메뉴>',
      '샴페인 1개',
      '<혜택 내역>',
      '크리스마스 디데이 할인: -2,200원',
      '증정 이벤트: -25,000원',
      '<총혜택 금액>',
      '-27,200원',
      '<할인 후 예상 결제 금액>',
      '155,800원',
      '<12월 이벤트 배지>',
      '산타',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-10: 크리스마스o, 증정o, 특별o, 평일이지만 디저트 메뉴가 없어 평일 할인이 적용되지 않는 경우', async () => {
    const logSpy = getLogSpy();
    mockQuestions([CHRISTMAS_STAR, NO_DESSERT]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '티본스테이크 1개',
      '해산물파스타 1개',
      '레드와인 1개',
      '시저샐러드 1개',
      '<할인 전 총주문 금액>',
      '158,000원',
      '<증정 메뉴>',
      '샴페인 1개',
      '<혜택 내역>',
      '크리스마스 디데이 할인: -3,300원',
      '특별 할인: -1,000원',
      '증정 이벤트: -25,000원',
      '<총혜택 금액>',
      '-29,300원',
      '<할인 후 예상 결제 금액>',
      '153,700원',
      '<12월 이벤트 배지>',
      '산타',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-11: 크리스마스x, 증정o, 특별x, 주말이지만 메인 메뉴가 없어 주말 할인이 적용되지 않는 경우', async () => {
    const logSpy = getLogSpy();
    mockQuestions([NOCHRISTMAS_WEEKEND, NO_MAIN]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '레드와인 2개',
      '시저샐러드 1개',
      '초코케이크 1개',
      '<할인 전 총주문 금액>',
      '143,000원',
      '<증정 메뉴>',
      '샴페인 1개',
      '<혜택 내역>',
      '증정 이벤트: -25,000원',
      '<총혜택 금액>',
      '-25,000원',
      '<할인 후 예상 결제 금액>',
      '143,000원',
      '<12월 이벤트 배지>',
      '산타',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-12: 크리스마스x, 증정o, 특별x, 평일이지만 디저트 메뉴가 없어 평일 할인이 적용되지 않는 경우', async () => {
    const logSpy = getLogSpy();
    mockQuestions([NOCHRISTMAS_WEEKDAY, NO_DESSERT]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '티본스테이크 1개',
      '해산물파스타 1개',
      '레드와인 1개',
      '시저샐러드 1개',
      '<할인 전 총주문 금액>',
      '158,000원',
      '<증정 메뉴>',
      '샴페인 1개',
      '<혜택 내역>',
      '증정 이벤트: -25,000원',
      '<총혜택 금액>',
      '-25,000원',
      '<할인 후 예상 결제 금액>',
      '158,000원',
      '<12월 이벤트 배지>',
      '산타',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-13: 크리스마스x, 증정o, 특별o, 평일이지만 디저트 메뉴가 없어 평일 할인이 적용되지 않는 경우', async () => {
    const logSpy = getLogSpy();
    mockQuestions([NOCHRISTMAS_STAR, NO_DESSERT]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '티본스테이크 1개',
      '해산물파스타 1개',
      '레드와인 1개',
      '시저샐러드 1개',
      '<할인 전 총주문 금액>',
      '158,000원',
      '<증정 메뉴>',
      '샴페인 1개',
      '<혜택 내역>',
      '특별 할인: -1,000원',
      '증정 이벤트: -25,000원',
      '<총혜택 금액>',
      '-26,000원',
      '<할인 후 예상 결제 금액>',
      '157,000원',
      '<12월 이벤트 배지>',
      '산타',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-14: 크리스마스o, 증정x, 특별x, 평일', async () => {
    const logSpy = getLogSpy();
    mockQuestions([CHRISTMAS_WEEKDAY, NO_PRESENT]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '크리스마스파스타 1개',
      '초코케이크 2개',
      '제로콜라 1개',
      '타파스 1개',
      '<할인 전 총주문 금액>',
      '63,500원',
      '<증정 메뉴>',
      '없음',
      '<혜택 내역>',
      '크리스마스 디데이 할인: -2,200원',
      '평일 할인: -4,046원',
      '<총혜택 금액>',
      '-6,246원',
      '<할인 후 예상 결제 금액>',
      '57,254원',
      '<12월 이벤트 배지>',
      '별',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-15: 크리스마스o, 증정x, 특별x, 주말', async () => {
    const logSpy = getLogSpy();
    mockQuestions([CHRISTMAS_WEEKEND, NO_PRESENT]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '크리스마스파스타 1개',
      '초코케이크 2개',
      '제로콜라 1개',
      '타파스 1개',
      '<할인 전 총주문 금액>',
      '63,500원',
      '<증정 메뉴>',
      '없음',
      '<혜택 내역>',
      '크리스마스 디데이 할인: -2,500원',
      '주말 할인: -2,023원',
      '<총혜택 금액>',
      '-4,523원',
      '<할인 후 예상 결제 금액>',
      '58,977원',
      '<12월 이벤트 배지>',
      '없음',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-16: 크리스마스o, 증정x, 특별o, 평일', async () => {
    const logSpy = getLogSpy();
    mockQuestions([CHRISTMAS_STAR, NO_PRESENT]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '크리스마스파스타 1개',
      '초코케이크 2개',
      '제로콜라 1개',
      '타파스 1개',
      '<할인 전 총주문 금액>',
      '63,500원',
      '<증정 메뉴>',
      '없음',
      '<혜택 내역>',
      '크리스마스 디데이 할인: -3,300원',
      '평일 할인: -4,046원',
      '특별 할인: -1,000원',
      '<총혜택 금액>',
      '-8,346원',
      '<할인 후 예상 결제 금액>',
      '55,154원',
      '<12월 이벤트 배지>',
      '별',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-17: 크리스마스x, 증정x, 특별x, 평일', async () => {
    const logSpy = getLogSpy();
    mockQuestions([NOCHRISTMAS_WEEKDAY, NO_PRESENT]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '크리스마스파스타 1개',
      '초코케이크 2개',
      '제로콜라 1개',
      '타파스 1개',
      '<할인 전 총주문 금액>',
      '63,500원',
      '<증정 메뉴>',
      '없음',
      '<혜택 내역>',
      '평일 할인: -4,046원',
      '<총혜택 금액>',
      '-4,046원',
      '<할인 후 예상 결제 금액>',
      '59,454원',
      '<12월 이벤트 배지>',
      '없음',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-18: 크리스마스x, 증정x, 특별x, 주말', async () => {
    const logSpy = getLogSpy();
    mockQuestions([NOCHRISTMAS_WEEKEND, NO_PRESENT]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '크리스마스파스타 1개',
      '초코케이크 2개',
      '제로콜라 1개',
      '타파스 1개',
      '<할인 전 총주문 금액>',
      '63,500원',
      '<증정 메뉴>',
      '없음',
      '<혜택 내역>',
      '주말 할인: -2,023원',
      '<총혜택 금액>',
      '-2,023원',
      '<할인 후 예상 결제 금액>',
      '61,477원',
      '<12월 이벤트 배지>',
      '없음',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-19: 크리스마스x, 증정x, 특별o, 평일', async () => {
    const logSpy = getLogSpy();
    mockQuestions([NOCHRISTMAS_STAR, NO_PRESENT]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '크리스마스파스타 1개',
      '초코케이크 2개',
      '제로콜라 1개',
      '타파스 1개',
      '<할인 전 총주문 금액>',
      '63,500원',
      '<증정 메뉴>',
      '없음',
      '<혜택 내역>',
      '평일 할인: -4,046원',
      '특별 할인: -1,000원',
      '<총혜택 금액>',
      '-5,046원',
      '<할인 후 예상 결제 금액>',
      '58,454원',
      '<12월 이벤트 배지>',
      '별',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-20: 크리스마스o, 증정x, 특별x, 주말이지만 메인 메뉴가 없어 주말 할인이 적용되지 않는 경우', async () => {
    const logSpy = getLogSpy();
    mockQuestions([CHRISTMAS_WEEKEND, NO_PRESENT_MAIN]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '초코케이크 2개',
      '제로콜라 1개',
      '타파스 1개',
      '<할인 전 총주문 금액>',
      '38,500원',
      '<증정 메뉴>',
      '없음',
      '<혜택 내역>',
      '크리스마스 디데이 할인: -2,500원',
      '<총혜택 금액>',
      '-2,500원',
      '<할인 후 예상 결제 금액>',
      '36,000원',
      '<12월 이벤트 배지>',
      '없음',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-21: 크리스마스o, 증정x, 특별x, 평일이지만 디저트 메뉴가 없어 평일 할인이 적용되지 않는 경우', async () => {
    const logSpy = getLogSpy();
    mockQuestions([CHRISTMAS_WEEKDAY, NO_PRESENT_DESSERT]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '크리스마스파스타 1개',
      '제로콜라 1개',
      '타파스 1개',
      '<할인 전 총주문 금액>',
      '33,500원',
      '<증정 메뉴>',
      '없음',
      '<혜택 내역>',
      '크리스마스 디데이 할인: -2,200원',
      '<총혜택 금액>',
      '-2,200원',
      '<할인 후 예상 결제 금액>',
      '31,300원',
      '<12월 이벤트 배지>',
      '없음',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-22: 크리스마스o, 증정x, 특별o, 평일이지만 디저트 메뉴가 없어 평일 할인이 적용되지 않는 경우', async () => {
    const logSpy = getLogSpy();
    mockQuestions([CHRISTMAS_STAR, NO_PRESENT_DESSERT]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '크리스마스파스타 1개',
      '제로콜라 1개',
      '타파스 1개',
      '<할인 전 총주문 금액>',
      '33,500원',
      '<증정 메뉴>',
      '없음',
      '<혜택 내역>',
      '크리스마스 디데이 할인: -3,300원',
      '특별 할인: -1,000원',
      '<총혜택 금액>',
      '-4,300원',
      '<할인 후 예상 결제 금액>',
      '29,200원',
      '<12월 이벤트 배지>',
      '없음',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-23: 크리스마스x, 증정x, 특별x, 주말이지만 메인 메뉴가 없어 주말 할인이 적용되지 않는 경우', async () => {
    const logSpy = getLogSpy();
    mockQuestions([NOCHRISTMAS_WEEKEND, NO_PRESENT_MAIN]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '초코케이크 2개',
      '제로콜라 1개',
      '타파스 1개',
      '<할인 전 총주문 금액>',
      '38,500원',
      '<증정 메뉴>',
      '없음',
      '<혜택 내역>',
      '없음',
      '<총혜택 금액>',
      '0원',
      '<할인 후 예상 결제 금액>',
      '38,500원',
      '<12월 이벤트 배지>',
      '없음',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-24: 크리스마스x, 증정x, 특별x, 평일이지만 디저트 메뉴가 없어 평일 할인이 적용되지 않는 경우', async () => {
    const logSpy = getLogSpy();
    mockQuestions([NOCHRISTMAS_WEEKDAY, NO_PRESENT_DESSERT]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '크리스마스파스타 1개',
      '제로콜라 1개',
      '타파스 1개',
      '<할인 전 총주문 금액>',
      '33,500원',
      '<증정 메뉴>',
      '없음',
      '<혜택 내역>',
      '없음',
      '<총혜택 금액>',
      '0원',
      '<할인 후 예상 결제 금액>',
      '33,500원',
      '<12월 이벤트 배지>',
      '없음',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });

  test('case-24: 크리스마스x, 증정x, 특별o, 평일이지만 디저트 메뉴가 없어 평일 할인이 적용되지 않는 경우', async () => {
    const logSpy = getLogSpy();
    mockQuestions([NOCHRISTMAS_STAR, NO_PRESENT_DESSERT]);
    const app = new App();
    await app.run();

    const RESULT = [
      '<주문 메뉴>',
      '크리스마스파스타 1개',
      '제로콜라 1개',
      '타파스 1개',
      '<할인 전 총주문 금액>',
      '33,500원',
      '<증정 메뉴>',
      '없음',
      '<혜택 내역>',
      '특별 할인: -1,000원',
      '<총혜택 금액>',
      '-1,000원',
      '<할인 후 예상 결제 금액>',
      '32,500원',
      '<12월 이벤트 배지>',
      '없음',
    ];

    expectLogContains(getOutput(logSpy), RESULT);
  });
});
