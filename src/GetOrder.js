import Menus from './Menus.js';
import Date from './Date.js';
import Order from './Order.js';
import OutputView from './view/OutputView.js';
import InputView from './view/InputView.js';
import { MenuDuplicatedError, MenuTypeError } from './error/CustomError.js';
import REGEXP from './constant/RegExp.js';

export default class GetOrder {
  #order;

  async startOrder() {
    const date = await this.#readDate();
    const menus = await this.#readMenus();
    this.#order = new Order(date, menus);
  }

  async #readDate() {
    while (true) {
      const date = await InputView.readDate();
      try {
        return new Date(date);
      } catch (error) {
        OutputView.printErrorMessage(error);
      }
    }
  }

  async #readMenus() {
    while (true) {
      const menus = await InputView.readMenus();
      try {
        this.#validateInputType(menus);
        return this.#stringToMenus(menus);
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
      throw new MenuDuplicatedError();
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
