import Menus from './Menus.js';
import Order from './Order.js';
import { REGEXP, SETTING } from '../constant/index.js';
import { Date } from '../model/index.js';
import { OutputView, InputView } from '../view/index.js';
import {
  MenuDuplicatedError,
  MenuOrderTypeError,
} from '../error/CustomError.js';

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
      throw new MenuOrderTypeError();
    }
  }

  #validateMenuDuplicated(inputLength, resultLength) {
    if (inputLength !== resultLength) {
      throw new MenuDuplicatedError();
    }
  }

  #stringToMenus(string) {
    const menus = {};
    string.split(SETTING.menuSplit).forEach(menuInfo => {
      const menu = menuInfo.split(SETTING.menuAmountSplit)[0];
      const amount = menuInfo.split(SETTING.menuAmountSplit)[1];
      menus[`${menu}`] = Number(amount);
    });

    this.#validateMenuDuplicated(
      string.split(SETTING.menuSplit).length,
      Object.keys(menus).length,
    );

    return new Menus(menus);
  }
}
