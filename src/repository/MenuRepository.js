import MENU_LIST from '../constant/MenuList.js';
import { MenuNotExistError } from '../error/CustomError.js';
import Menu from '../model/Menu.js';

export default class MenuRepository {
  static #menus = this.#initMenuRepository();

  static #initMenuRepository() {
    const result = [];
    Object.keys(MENU_LIST).forEach(key => {
      result.push(
        new Menu(
          MENU_LIST[key].name,
          MENU_LIST[key].type,
          MENU_LIST[key].price,
        ),
      );
    });
    return result;
  }

  static getMenuByName(name) {
    const result = this.#menus.find(menu => menu.get().name === name);
    if (result === undefined) {
      throw new MenuNotExistError();
    }
    return result;
  }

  static getMenus() {
    return this.#menus;
  }
}
