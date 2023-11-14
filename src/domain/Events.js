import { MESSAGE, SETTING } from '../constant/index.js';
import { MenuRepository, EventRepository } from '../repository/index.js';

export default class Events {
  #date;
  #menus;

  constructor(date, menus) {
    this.#date = date;
    this.#menus = menus;
    if (this.#menus.canApplyEvent()) {
      this.#set();
    }
  }

  #set() {
    this.#setChristmasDiscount();
    this.#setPresentChampagne();
    this.#setSpecialDiscount();
    this.#setWeekdayDiscount();
    this.#setWeekendDiscount();
  }

  #setChristmasDiscount() {
    const amount =
      SETTING.christmasDiscount.default
      + SETTING.christmasDiscount.forDay * (this.#date.get() - 1)
    if (this.#date.get() <= SETTING.date.christmas && amount !== 0) {
      EventRepository.getEventByType(MESSAGE.christmasDiscount).setStatus(
        true,
      );
    }
    EventRepository.getEventByType(MESSAGE.christmasDiscount).setAmount(
      amount,
    );
  }

  #setWeekdayDiscount() {
    const amount = SETTING.weekDiscount * this.#menus.types().dessert;
    if (!this.#date.isWeekend() && amount !== 0) {
      EventRepository.getEventByType(MESSAGE.weekdayDiscount).setStatus(true);
    }
    EventRepository.getEventByType(MESSAGE.weekdayDiscount).setAmount(amount);
  }

  #setWeekendDiscount() {
    const amount = SETTING.weekDiscount * this.#menus.types().main;
    if (this.#date.isWeekend() && amount !== 0) {
      EventRepository.getEventByType(MESSAGE.weekendDiscount).setStatus(true);
    }
    EventRepository.getEventByType(MESSAGE.weekendDiscount).setAmount(amount);
  }

  #setSpecialDiscount() {
    if (this.#date.hasStar()) {
      EventRepository.getEventByType(MESSAGE.specialDiscount).setStatus(true);
    }
    EventRepository.getEventByType(MESSAGE.specialDiscount).setAmount(
      SETTING.specialDiscount,
    );
  }

  #setPresentChampagne() {
    if (this.#menus.previousPrice() >= SETTING.minimumPresentPrice) {
      EventRepository.getEventByType(MESSAGE.presentDiscount).setStatus(true);
    }
    EventRepository.getEventByType(MESSAGE.presentDiscount).setAmount(
      -MenuRepository.getMenuByName(SETTING.presentMenu).get().price,
    );
  }

  present() {
    if (EventRepository.getEventByType(MESSAGE.presentDiscount).get().status) {
      return MESSAGE.present;
    }
    return MESSAGE.printNoEvent;
  }

  totalEventAmount() {
    let eventPrice = 0;
    EventRepository.get().forEach(event => {
      if (event.get().status) {
        eventPrice += event.get().amount;
      }
    });

    return eventPrice;
  }

  totalPrice() {
    let price = this.#menus.previousPrice() + this.totalEventAmount();
    if (EventRepository.getEventByType(MESSAGE.presentDiscount).get().status) {
      price += MenuRepository.getMenuByName(SETTING.presentMenu).get().price;
    }

    return price;
  }

  eventBadge() {
    const amount = this.totalEventAmount();
    switch (true) {
      case amount <= SETTING.minimumAmountBadge.santa:
        return MESSAGE.badge.santa;
      case amount <= SETTING.minimumAmountBadge.tree:
        return MESSAGE.badge.tree;
      case amount <= SETTING.minimumAmountBadge.star:
        return MESSAGE.badge.star;
      default:
        return MESSAGE.printNoEvent;
    }
  }

  appliedEvents() {
    const result = [];

    if (!this.#menus.canApplyEvent()) {
      return [MESSAGE.printNoEvent];
    }
    EventRepository.get().forEach(event => {
      if (event.get().status && event.get().amount !== 0) {
        result.push(event.print());
      }
    });

    return result;
  }
}
