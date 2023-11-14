import MenuRepository from '../../src/repository/MenuRepository.js';
import { MenuNotExistError } from '../../src/error/CustomError.js';

describe('MenuRepository 단위테스트', () => {
  test('initMenuRepository 를 통해 MENU_LIST의 항목들이 제대로 생성되어야 한다.', () => {
    expect(() => MenuRepository.getMenus()).not.toThrow();
  });

  test.each(['티본스테이크', '바비큐립', '제로콜라', '타파스', '해산물파스타'])(
    'getMenuByName 을 통해 메뉴판에 있는 메뉴라면, 해당 메뉴를 불러와야 한다.',
    name => {
      expect(() => MenuRepository.getMenuByName(name)).not.toThrow();
    },
  );

  test.each([
    '민트초코케이크',
    '파인애플피자',
    '로제마라파스타',
    '솔의눈',
    '아침햇살',
  ])(
    'getMenuByName 을 통해 불러올 수 없는 메뉴판에 없는 메뉴라면, MenuNotExistError을 반환한다.',
    name => {
      expect(() => MenuRepository.getMenuByName(name)).toThrow(
        MenuNotExistError,
      );
    },
  );
});
