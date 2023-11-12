import OutputView from './view/OutputView.js';

export default class Order {
  #date;
  #menus;

  constructor(date, menus) {
    this.#date = date;
    this.#menus = menus;
    this.printResults(this.#date.get());
    this.printMenus(this.#menus.get());
  }

  printResults(date) {
    OutputView.printResultTitle(date);
  }

  printMenus(menus) {
    OutputView.printMenu(menus);
  }
}
