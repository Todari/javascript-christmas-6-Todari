import { MENU_LIST } from '../constant/index.js';
import { Menu } from '../model/index.js';
import { MenuNotExistError } from '../error/CustomError.js';

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
}
