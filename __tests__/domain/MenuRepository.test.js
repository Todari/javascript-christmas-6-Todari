import MenuRepository from '../../src/MenuRepository.js';

describe('MenuRepository 단위테스트', () => {
  test('ititMenuRepository 를 통해 MENU_LIST의 항목들이 제대로 생성되어야 한다.', () => {
    const menuRepository = new MenuRepository();
    const result = () => menuRepository.get();
    expect(result).not.toThrow();
  });
});
