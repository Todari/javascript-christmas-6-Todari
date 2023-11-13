import MESSAGES from './constant/Messages.js';
import Event from './Event.js';

export default class Events {
  #date;
  #menus;
  #events;
  #eventPrice;

  constructor(date, menus) {
    this.#date = date;
    this.#menus = menus;
    this.#eventPrice = 0;
    this.#events = {
      christmasDiscount: new Event(MESSAGES.christmasDiscount, false, 0),
      weekdayDiscount: new Event(MESSAGES.weekdayDiscount, false, 0),
      weekendDiscount: new Event(MESSAGES.weekendDiscount, false, 0),
      specialDiscount: new Event(MESSAGES.specialDiscount, false, 0),
      presentChampagne: new Event(MESSAGES.presentDiscount, false, 0),
    };
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
    if (this.#date.get() <= 25) {
      this.#events.christmasDiscount.setStatus(true);
    }
    this.#events.christmasDiscount.setAmount(
      -1000 - 100 * (this.#date.get() - 1),
    );
  }

  #setWeekdayDiscount() {
    if (!this.#date.isWeekend()) {
      this.#events.weekdayDiscount.setStatus(true);
    }
    this.#events.weekdayDiscount.setAmount(-2023 * this.#menus.types().dessert);
  }

  #setWeekendDiscount() {
    if (this.#date.isWeekend()) {
      this.#events.weekendDiscount.setStatus(true);
    }
    this.#events.weekendDiscount.setAmount(-2023 * this.#menus.types().main);
  }

  #setSpecialDiscount() {
    if (this.#date.hasStar()) {
      this.#events.specialDiscount.setStatus(true);
    }
    this.#events.specialDiscount.setAmount(-1000);
  }

  #setPresentChampagne() {
    if (this.#menus.previousPrice() >= 120000) {
      this.#events.presentChampagne.setStatus(true);
    }
    this.#events.presentChampagne.setAmount(-25000);
  }

  present() {
    if (this.#events.presentChampagne.getStatus()) {
      return MESSAGES.present;
    }
    return MESSAGES.printNoEvent;
  }

  totalEventAmount() {
    let eventPrice = 0;
    Object.keys(this.#events).forEach(key => {
      if (this.#events[key].getStatus()) {
        eventPrice += this.#events[key].getAmount();
      }
    });

    return eventPrice;
  }

  totalPrice() {
    let price = this.#menus.previousPrice() + this.totalEventAmount();
    if (this.#events.presentChampagne.getStatus()) {
      price += 25000;
    }

    return price;
  }

  eventBadge() {
    const amount = this.totalEventAmount();
    switch (true) {
      case amount <= -20000:
        return MESSAGES.badge.santa;
      case amount <= -10000:
        return MESSAGES.badge.tree;
      case amount <= -5000:
        return MESSAGES.badge.star;
      default:
        return MESSAGES.printNoEvent;
    }
  }

  appliedEvents() {
    const result = [];
    if (!this.#menus.canApplyEvent()) {
      result.push(MESSAGES.printNoEvent);

      return result;
    }
    Object.keys(this.#events).forEach(key => {
      if (this.#events[key].getStatus()) {
        result.push(this.#events[key].print());
      }
    });

    return result;
  }
}
