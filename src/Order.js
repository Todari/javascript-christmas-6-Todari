import OutputView from './view/OutputView.js';

export default class Order {
  #date;
  #menus;

  constructor(date, menus) {
    this.#date = date;
    this.#menus = menus;
  }

  printResults() {
    OutputView.printResultTitle();
  }
}
