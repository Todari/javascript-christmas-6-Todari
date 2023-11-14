import MENU_LIST from '../constant/MenuList.js';
import MESSAGES from '../constant/Messages.js';
import SETTING from '../constant/Setting.js';
import Event from '../model/Event.js';

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
    const amount =
      SETTING.christmasDiscount.default
      + SETTING.christmasDiscount.forDay * (this.#date.get() - 1)
    if (this.#date.get() <= SETTING.date.christmas && amount !== 0) {
      this.#events.christmasDiscount.setStatus(true);
    }
    this.#events.christmasDiscount.setAmount(amount);
  }

  #setWeekdayDiscount() {
    const amount = SETTING.weekDiscount * this.#menus.types().dessert;
    if (!this.#date.isWeekend() && amount !== 0) {
      this.#events.weekdayDiscount.setStatus(true);
    }
    this.#events.weekdayDiscount.setAmount(amount);
  }

  #setWeekendDiscount() {
    const amount = SETTING.weekDiscount * this.#menus.types().dessert;
    if (this.#date.isWeekend() && amount !== 0) {
      this.#events.weekendDiscount.setStatus(true);
    }
    this.#events.weekendDiscount.setAmount(amount);
  }

  #setSpecialDiscount() {
    if (this.#date.hasStar()) {
      this.#events.specialDiscount.setStatus(true);
    }
    this.#events.specialDiscount.setAmount(SETTING.specialDiscount);
  }

  #setPresentChampagne() {
    if (this.#menus.previousPrice() >= SETTING.minimumPresentPrice) {
      this.#events.presentChampagne.setStatus(true);
    }
    this.#events.presentChampagne.setAmount(
      -MENU_LIST[SETTING.presentMenu].price,
    );
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
      price += MENU_LIST[SETTING.presentMenu].price;
    }

    return price;
  }

  eventBadge() {
    const amount = this.totalEventAmount();
    switch (true) {
      case amount <= SETTING.minimumAmountBadge.santa:
        return MESSAGES.badge.santa;
      case amount <= SETTING.minimumAmountBadge.tree:
        return MESSAGES.badge.tree;
      case amount <= SETTING.minimumAmountBadge.star:
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
      if (
        this.#events[key].getStatus() &&
        this.#events[key].getAmount() !== 0
      ) {
        result.push(this.#events[key].print());
      }
    });
    return result;
  }
}
