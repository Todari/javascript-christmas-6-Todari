import Menus from './Menus.js';
import REGEXP from './constant/RegExp.js';
import { MenuTypeError } from './error/CustomError.js';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';

export default class OrderMenus {
  #menus;

  async readMenus() {
    while (true) {
      const menus = await InputView.readMenus();
      try {
        this.#validateInputType(menus);
        this.#menus = this.#stringToMenus(menus);
        break;
      } catch (error) {
        OutputView.printErrorMessage(error);
      }
    }
  }

  #validateInputType(string) {
    if (!REGEXP.menus.test(string)) {
      throw new MenuTypeError();
    }
  }

  #validateMenuDuplicated(inputLength, resultLength) {
    if (inputLength !== resultLength) {
      throw new MenuTypeError();
    }
  }

  #stringToMenus(string) {
    const menus = {};
    string.split(',').forEach(menuInfo => {
      const menu = menuInfo.split('-')[0];
      const amount = menuInfo.split('-')[1];

      menus[`${menu}`] = Number(amount);
    });

    this.#validateMenuDuplicated(
      string.split(',').length,
      Object.keys(menus).length,
    );
    return new Menus(menus);
  }
}
