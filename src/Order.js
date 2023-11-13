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
    this.printResultTitle();
    this.printMenus();
    this.printPreviousPrice();
    this.printPresent(this.#menus);
    this.printEvents(this.#event, this.#date, this.#menus);
    this.printEventAmounts();
    this.printTotalPrice();
    this.printBadge();
  }

  printResultTitle() {
    OutputView.printResultTitle(this.#date.get());
  }

  printMenus() {
    OutputView.printMenu(this.#menus.list());
  }

  printPreviousPrice() {
    OutputView.printPreviousPrice(this.#menus.previousPrice());
  }

  printPresent() {
    const canPresent = this.#event.canPresentChampagne(this.#menus);
    OutputView.printPresent(canPresent);
  }

  printEvents() {
    OutputView.printEvents();
    this.#event.printEvents(this.#date, this.#menus);
  }

  printEventAmounts() {
    OutputView.printEventAmounts(this.#event.totalEventAmout(this.#menus));
  }

  printTotalPrice() {
    OutputView.printTotalPrice(
      this.#menus.previousPrice() + this.#event.totalEventDiscount(),
    );
  }

  printBadge() {
    OutputView.printBadge(this.#event.totalEventAmout(this.#menus));
  }
}
