import SETTING from '../../src/constant/Setting.js';
import Menus from '../../src/domain/Menus.js';
import {
  MenuAmountError,
  MenuNotExistError,
  MenuOnlyBeverageError,
} from '../../src/error/CustomError.js';

describe('Menus domain 단위테스트', () => {
  test('메뉴판에 있는 메뉴만으로 구성 된 경우, 정상적으로 Menus가 생성되어야 한다.', () => {
    const MENUS = {
      티본스테이크: 1,
      크리스마스파스타: 1,
      레드와인: 1,
      제로콜라: 2,
      타파스: 1,
    };
    expect(() => new Menus(MENUS)).not.toThrowError();
  });

  test('메뉴판에 없는 메뉴가 포함된 경우, MenuNotExistError를 반환해야 한다.', () => {
    const MENUS = {
      티본스테이크: 1,
      민초로제마라트러플파스타: 1,
      레드와인: 1,
      제로콜라: 2,
      타파스: 1,
    };
    expect(() => new Menus(MENUS)).toThrowError(MenuNotExistError);
  });

  test(`메뉴의 총 갯수가 ${SETTING.maximumMenusAmount}개를 넘어가지 않은 경우, 정상적으로 Menus가 생성되어야 한다.`, () => {
    const MENUS = {
      티본스테이크: 4,
      크리스마스파스타: 5,
      레드와인: 5,
      제로콜라: 4,
      타파스: 2,
    };
    expect(() => new Menus(MENUS)).not.toThrowError();
  });

  test(`메뉴의 총 갯수가 ${SETTING.maximumMenusAmount}개를 넘어간 경우, MenuAmountError를 반환해야 한다.`, () => {
    const MENUS = {
      티본스테이크: 5,
      크리스마스파스타: 5,
      레드와인: 5,
      제로콜라: 4,
      타파스: 2,
    };
    expect(() => new Menus(MENUS)).toThrowError(MenuAmountError);
  });

  test(`메뉴의 주문이 음료만으로 구성되지 않은 경우, 정상적으로 Menus가 생성되어야 한다.`, () => {
    const MENUS = {
      레드와인: 5,
      제로콜라: 4,
      타파스: 1,
    };
    expect(() => new Menus(MENUS)).not.toThrowError();
  });

  test(`메뉴의 주문이 음료만으로 구성된 경우, MenuOnlyBeverageError를 반환해야 한다.`, () => {
    const MENUS = {
      레드와인: 5,
      제로콜라: 4,
      샴페인: 1,
    };
    expect(() => new Menus(MENUS)).toThrowError(MenuOnlyBeverageError);
  });

  test(`메뉴의 주문이 음료만으로 구성된 경우, MenuOnlyBeverageError를 반환해야 한다.`, () => {
    const MENUS = {
      레드와인: 5,
      제로콜라: 4,
      샴페인: 1,
    };
    expect(() => new Menus(MENUS)).toThrowError(MenuOnlyBeverageError);
  });

  const MENUS = {
    티본스테이크: 1,
    크리스마스파스타: 1,
    레드와인: 1,
    제로콜라: 2,
    타파스: 1,
  };
  const menus = new Menus(MENUS);

  test('Menus/list 를 통해 주문 메뉴 이름과 갯수가 올바르게 반환해야 한다', () => {
    const RESULT = [
      '티본스테이크 1개',
      '크리스마스파스타 1개',
      '레드와인 1개',
      '제로콜라 2개',
      '타파스 1개',
    ];

    expect(menus.list()).toEqual(RESULT);
  });

  test('Menus/previousPrice 를 통해 주문 메뉴의 총 금액을 올바르게 반환해야 한다.', () => {
    const RESULT = 151500;

    expect(menus.previousPrice()).toEqual(RESULT);
  });

  test(`Menus/canApplyEvent 를 통해 이벤트 적용 최소 주문 금액인 ${SETTING.minimumApplyEventPrice} 이상을 주문한 경우 true를 반환해야 한다.`, () => {
    expect(menus.canApplyEvent()).toEqual(true);
  });

  test(`Menus/canApplyEvent 를 통해 이벤트 적용 최소 주문 금액인 ${SETTING.minimumApplyEventPrice} 미만을 주문한 경우 false를 반환해야 한다.`, () => {
    const MENUS_CANTEVENT = {
      양송이수프: 1,
      제로콜라: 1,
    };
    expect(new Menus(MENUS_CANTEVENT).canApplyEvent()).toEqual(false);
  });

  test('Menus/types 를 통해 주문한 메뉴들의 종류를 올바르게 반환해야 한다.', () => {
    const RESULT = { appetizer: 1, main: 2, beverage: 3, dessert: 0 };

    expect(menus.types()).toEqual(RESULT);
  });
});
