import Events from './Events.js';
import { OutputView } from '../view/index.js';

export default class Order {
  #date;
  #menus;
  #events;

  constructor(date, menus) {
    this.#date = date;
    this.#menus = menus;
    this.#events = new Events(date, menus);
    this.print();
  }

  print() {
    this.#printResult();
    this.#printMenus();
    this.#printPreviousPrice();
    this.#printPresent();
    this.#printEvents();
    this.#printEventAmount();
    this.#printTotalPrice();
    this.#printEventBadge();
  }

  #printResult() {
    const date = this.#date.get();
    OutputView.printResultTitle(date);
  }

  #printMenus() {
    const menus = this.#menus.list();
    OutputView.printMenus(menus);
  }

  #printPreviousPrice() {
    const price = this.#menus.previousPrice();
    OutputView.printPreviousPrice(price);
  }

  #printPresent() {
    const present = this.#events.present();
    OutputView.printPresent(present);
  }

  #printEvents() {
    const events = this.#events.appliedEvents();
    OutputView.printEvents(events);
  }

  #printEventAmount() {
    const amount = this.#events.totalEventAmount();
    OutputView.printEventAmount(amount);
  }

  #printTotalPrice() {
    const price = this.#events.totalPrice();
    OutputView.printTotalPrice(price);
  }

  #printEventBadge() {
    const badge = this.#events.eventBadge();
    OutputView.printEventBadge(badge);
  }
}
