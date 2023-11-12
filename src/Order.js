export default class Order {
  #date;
  #menus;
  #price;

  constructor(date, menus) {
    this.#date = date;
    this.#menus = menus;
  }
}
