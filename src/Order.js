import OutputView from './view/OutputView.js';
import Event from './Event.js';

export default class Order {
  #date;
  #menus;
  #events;

  constructor(date, menus) {
    this.#date = date;
    this.#menus = menus;
    this.#events = new Event();
    this.printResultTitle(this.#date.get());
    this.printMenus(this.#menus.list());
    this.printPreviousPrice(this.#menus.previousPrice())
    this.printPresent(this.#menus.previousPrice());
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

  printPresent(price) {
    const canPresent = this.#events.canPresentChampagne(price);
    OutputView.printPresent(canPresent);
  }
}
