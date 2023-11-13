import OutputView from './view/OutputView.js';
import Event from './Event.js';

export default class Order {
  #date;
  #menus;
  #event;

  constructor(date, menus) {
    this.#date = date;
    this.#menus = menus;
    this.#event = new Event();
    this.printResultTitle(this.#date.get());
    this.printMenus(this.#menus.list());
    this.printPreviousPrice(this.#menus.previousPrice());
    this.printPresent(this.#menus);
    this.printEvents(this.#event, this.#date, this.#menus);
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
    const canPresent = this.#event.canPresentChampagne(price);
    OutputView.printPresent(canPresent);
  }

  printEvents(event, date, menus) {
    OutputView.printEvents();
    event.printEvents(date, menus);
  }
}
