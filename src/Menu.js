export default class Menu {
  #type;
  #name;
  #price;

  constructor(name, type, price) {
    this.#name = name;
    this.#type = type;
    this.#price = price;
  }

  getInfo() {
    return { type: this.#type, name: this.#name, price: this.#price };
  }

  #menuTypeValidate(menus) {
    if (!REGEXP.menus.test(menus)) {
      // throw
    }
  }
}
