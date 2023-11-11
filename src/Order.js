// import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';

export default class Order {
  #date;
  #menus;
  #price;

  constructor(date, menus) {
    this.#date = date;
    this.#menus = menus;
  }



  startOrder() {
    OutputView.printStartOrder();
  }
}
