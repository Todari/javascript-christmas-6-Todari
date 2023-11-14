import MENU_LIST from '../../src/constant/MenuList.js';
import {
  MenuNameError,
  MenuTypeError,
  MenuPriceError,
} from '../../src/error/CustomError.js';
import Menu from '../../src/model/Menu.js';

describe('Menu model 단위테스트', () => {
  Object.keys(MENU_LIST).forEach(key => {
    test('Menu/validate 정상적으로 생성된 메뉴가 오류를 반환하지 않아야 한다.', () => {
      expect(
        () =>
          new Menu(
            MENU_LIST[key].name,
            MENU_LIST[key].type,
            MENU_LIST[key].price,
          ),
      ).not.toThrowError();
    });

    test('Menu/get 생성된 메뉴의 name, type, price를 올바르게 불러와야 한다.', () => {
      expect(
        new Menu(
          MENU_LIST[key].name,
          MENU_LIST[key].type,
          MENU_LIST[key].price,
        ).get(),
      ).toEqual(MENU_LIST[key]);
    });
  });

  test.each([
    [
      [[], 'main', 5000],
      [3000, 'main', 5000],
      [['솔의눈'], 'main', 5000],
      [{ name: '솔의눈' }, 'main', 5000],
      [['솔의눈', 'main', 5000], 'main', 5000],
    ],
  ])(
    'Menu의 name type이 string이 아닐 경우 MenuNameError을 반환한다.',
    input => {
      expect(() => new Menu(input[0], input[1], input[2])).toThrowError(
        MenuNameError,
      );
    },
  );

  test.each([
    [
      ['파인애플피자', [], 5000],
      ['파인애플피자', 3000, 5000],
      ['파인애플피자', ['main'], 5000],
      ['파인애플피자', { type: 'main' }, 5000],
      ['파인애플피자', ['파인애플피자', 3000, 5000], 5000],
    ],
  ])(
    'Menu의 type type이 string이 아닐 경우 MenuTypeError을 반환한다.',
    input => {
      expect(() => new Menu(input[0], input[1], input[2])).toThrowError(
        MenuTypeError,
      );
    },
  );

  test.each([
    [
      ['파인애플피자', 'main', '5000'],
      ['파인애플피자', 'main', []],
      ['파인애플피자', 'main', [5000]],
      ['파인애플피자', 'main', { price: 5000 }],
      [
        '파인애플피자',
        'main',
        { name: '파인애플피자', type: 'main', price: 5000 },
      ],
    ],
  ])(
    'Menu의 price type이 number 아닐 경우 MenuPriceError을 반환한다.',
    input => {
      expect(() => new Menu(input[0], input[1], input[2])).toThrowError(
        MenuPriceError,
      );
    },
  );
});
