import MenuRepository from '../repository/MenuRepository.js';
import {
  MenuAmountError,
  MenuOnlyBeverageError,
} from '../error/CustomError.js';
import SETTING from '../constant/Setting.js';

export default class Menus {
  #menuRepository;
  #menus;

  constructor(menus) {
    this.#menuRepository = new MenuRepository();
    this.#menus = new Map();

    Object.keys(menus).forEach(key => {
      this.#menus.set(this.#menuRepository.getMenuByName(key), menus[key]);
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
    if (this.types().main + this.types().dessert === 0) {
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

  types() {
    const types = { main: 0, beverage: 0, dessert: 0 };
    this.#menus.forEach((value, key) => {
      types[key.get().type] += value;
    });

    return types;
  }
}
