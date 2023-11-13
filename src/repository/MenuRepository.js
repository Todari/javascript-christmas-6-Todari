import MENU_LIST from '../constant/MenuList.js';
import { MenuNotExistError } from '../error/CustomError.js';
import Menu from '../model/Menu.js';

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

  getMenuByName(name) {
    const result = this.#menus.find(menu => menu.get().name === name);
    if (result === undefined) {
      throw new MenuNotExistError();
    }
    return result;
  }
}
