import MENU_LIST from './constant/MenuList.js';
import OutputView from './view/OutputView.js';

export default class Event {
  #eventAmount;

  constructor() {
    this.#eventAmount = 0;
  }

  canPresentChampagne(menus) {
    if (menus.previousPrice() >= 120000) {
      return true;
    }

    return false;
  }

  christmasDiscount(date) {
    const amount = -1000 - 100 * (date.get() - 1);
    this.#eventAmount += amount;

    return amount;
  }

  printWeekDiscount(date, menus) {
    date.isWeekend()
      ? OutputView.printWeekendDiscount(this.#weekendDiscount(menus))
      : OutputView.printWeekdayDiscount(this.#weekdayDiscount(menus));
  }

  #weekdayDiscount(menus) {
    const amount = -2023 * menus.types().dessert;
    this.#eventAmount += amount;
    return amount;
  }

  #weekendDiscount(menus) {
    const amount = -2023 * menus.types().main;
    this.#eventAmount += amount;

    return amount;
  }

  specialDiscount(date) {
    if (date.hasStar()) {
      const amount = -1000;
      this.#eventAmount += amount;

      return amount;
    }
  }

  totalEventAmout(menus) {
    if (this.canPresentChampagne(menus)) {
      return this.#eventAmount - MENU_LIST.champagne.price;
    }
    return this.#eventAmount;
  }

  totalEventDiscount() {
    return this.#eventAmount;
  }

  printEvents(date, menus) {
    if (date.get() <= 25) {
      OutputView.printChristmasDiscount(this.christmasDiscount(date));
    }
    this.printWeekDiscount(date, menus);
    if (date.hasStar()) {
      OutputView.printSpecialDiscount(this.specialDiscount(date));
    }
    if (menus.previousPrice() >= 12000) {
      OutputView.printPresentDiscount();
    }
  }
}
