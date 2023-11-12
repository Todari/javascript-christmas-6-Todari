import OutputView from './view/OutputView.js';

export default class Order {
  #date;
  #menus;

  constructor(date, menus) {
    this.#date = date;
    this.#menus = menus;
    this.printResultTitle(this.#date.get());
    this.printMenus(this.#menus.list());
    this.printPreviousPrice(this.#menus.previousPrice());
  }

  printResultTitle(date) {
    OutputView.printResultTitle(date);
  }

  printMenus(menus) {
    OutputView.printMenu(menus);
  }

  printPreviousPrice(price) {
    OutputView.printPreviousPrice(price);
  }
}
