import MENU_LIST from './constant/MenuList.js';
import { MenuNotExistError } from './error/CustomError.js';
import Menu from './Menu.js';

export default class MenuRepository {
  #menus;

  constructor() {
    this.#menus = [];
    this.#initMenuRepository();
  }

  #initMenuRepository() {
    Object.keys(MENU_LIST).forEach(key => {
      this.#menus.push(
        new Menu(
          MENU_LIST[key].name,
          MENU_LIST[key].type,
          MENU_LIST[key].price,
        ),
      );
    });
  }

  isExistMenu(name) {
    this.#menus.some(menu => {
      if (menu.getInfo().name === name) {
        return true;
      }
      return false;
    });
  }

  getMenuByName(name) {
    this.#menus.some(menu => {
      if (menu.getInfo().name === name) {
        return menu;
      }
    });
  }
}
