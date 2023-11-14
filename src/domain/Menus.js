import { SETTING } from '../constant/index.js';
import { MenuRepository } from '../repository/index.js';
import {
  MenuAmountError,
  MenuOnlyBeverageError,
} from '../error/CustomError.js';

export default class Menus {
  #menus;

  constructor(menus) {
    this.#menus = new Map();

    Object.keys(menus).forEach(key => {
      this.#menus.set(MenuRepository.getMenuByName(key), menus[key]);
    });

    this.#validateAmounts();
    this.#validateOnlyBeverage();
  }

  #validateAmounts() {
    let amount = 0;
    this.#menus.forEach(value => {
      amount += value;
    });

    if (amount > SETTING.maximumMenusAmount) {
      throw new MenuAmountError();
    }
  }

  #validateOnlyBeverage() {
    if (this.#onlyBeverage()) {
      throw new MenuOnlyBeverageError();
    }
  }

  list() {
    const string = [];

    this.#menus.forEach((value, key) => {
      string.push(`${key.get().name} ${value}개`);
    });

    return string;
  }

  previousPrice() {
    let price = 0;
    this.#menus.forEach((value, key) => {
      price += key.get().price * value;
    });

    return price;
  }

  canApplyEvent() {
    if (this.previousPrice() > SETTING.minimumApplyEventPrice) {
      return true;
    }
    return false;
  }

  #onlyBeverage() {
    let notBeverage = 0;
    this.#menus.forEach((value, key) => {
      if (key.get().type !== 'beverage') {
        notBeverage += value;
      }
    });

    if (notBeverage === 0) {
      return true;
    }
    return false;
  }

  types() {
    const types = { appetizer: 0, main: 0, beverage: 0, dessert: 0 };
    this.#menus.forEach((value, key) => {
      types[key.get().type] += value;
    });

    return types;
  }
}
