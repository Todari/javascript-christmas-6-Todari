import OrderDate from './OrderDate.js';
import OrderMenus from './OrderMenus.js';

export default class OrderController {
  #date;
  #orderDate;
  #orderMenus;

  constructor() {
    this.#orderDate = new OrderDate();
    this.#orderMenus = new OrderMenus();
  }

  async startOrder() {
    await this.#orderDate.readDate();
  }
}
