import MENU_LIST from './constant/MenuList.js';
import OutputView from './view/OutputView.js';

export default class Event {
  #eventPrice;

  constructor() {
    this.#eventPrice = 0;
  }

  canPresentChampagne(menus) {
    if (menus.previousPrice() >= 120000) {
      this.#eventPrice -= MENU_LIST.champagne.price;

      return true;
    }

    return false;
  }

  christmasDiscount(date) {
    if (date.get() <= 25) {
      const amount = -1000 - 100 * (date.get() - 1);
      this.#eventPrice += amount;

      return amount;
    }

    return 0;
  }

  weekdayDiscount(menus) {
    const amount = -2023 * menus.types().dessert;
    this.#eventPrice += amount;

    return amount;
  }

  weekendDiscount(menus) {
    const amount = -2023 * menus.types().main;
    this.#eventPrice += amount;

    return amount;
  }

  specialDiscount(date) {
    if (date.hasStar()) {
      const amount = -1000;
      this.#eventPrice += amount;
      return amount;
    }

    return 0;
  }

  printEvents(date, menus) {
    if (this.christmasDiscount(date) !== 0) {
      OutputView.printChristmasDiscount(this.christmasDiscount(date));
    }
    date.isWeekend()
      ? OutputView.printWeekendDiscount(this.weekendDiscount(menus))
      : OutputView.printWeekdayDiscount(this.weekdayDiscount(menus));

    if (this.specialDiscount(date) !== 0) {
      OutputView.printSpecialDiscount(this.specialDiscount(date));
    }
    if (this.canPresentChampagne(menus)) {
      OutputView.printPresentDiscount();
    }
  }
}
