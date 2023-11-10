import MENU_LIST from './constant/MenuList.js';
import Menu from './Menu.js';

export default class MenuRepository {
  #menuRepository;

  constructor() {
    this.#menuRepository = [];
    this.#initMenuRepository();
  }

  #initMenuRepository() {
    Object.keys(MENU_LIST).forEach(key => {
      this.#menuRepository.push(
        new Menu(
          MENU_LIST[key].name,
          MENU_LIST[key].type,
          MENU_LIST[key].price,
        ),
      );
    });
  }

  get() {
    this.#menuRepository.forEach(menu => {
      menu.get();
    });
  }

  isIncludedMenu(name) {
    MenuRepository.forEach(menu => {
      if (menu.getInfo.name === name) {
        return true;
      }
    });
    return false;
  }
}
