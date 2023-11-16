import {
  MenuNameError,
  MenuTypeError,
  MenuPriceError,
} from '../error/CustomError.js';

export default class Menu {
  #type;
  #name;
  #price;

  constructor(name, type, price) {
    this.#validateMenuName(name);
    this.#validateMenuType(type);
    this.#validateMenuPrice(price);
    this.#name = name;
    this.#type = type;
    this.#price = price;
  }

  get() {
    return { name: this.#name, type: this.#type, price: this.#price };
  }

  #validateMenuName(name) {
    if (typeof name !== 'string') {
      throw new MenuNameError();
    }
  }

  #validateMenuType(type) {
    if (typeof type !== 'string') {
      throw new MenuTypeError();
    }
  }

  #validateMenuPrice(price) {
    if (typeof price !== 'number') {
      throw new MenuPriceError();
    }
  }
}
