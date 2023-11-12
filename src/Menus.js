import MenuRepository from './MenuRepository.js';
import { MenuAmountError } from './error/CustomError.js';

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
  }

  #validateAmounts() {
    let amount = 0;
    this.#menus.forEach(value => {
      amount += value;
    });

    if (amount > 20) {
      throw new MenuAmountError();
    }
  }

  #validateOnlyBeverage() {
    //   let amount = 0;
    //   this.#menus.forEach(value => {
    //     amount += value;
    //   });

    //   if (amount > 20) {
    //     throw new MenuAmountError();
    //   }
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
}
