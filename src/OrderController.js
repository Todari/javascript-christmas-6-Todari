import Order from './Order.js';
import OrderDate from './OrderDate.js';
import OrderMenus from './OrderMenus.js';
import OutputView from './view/OutputView.js';

export default class OrderController {
  #orderDate;
  #orderMenus;

  constructor() {
    this.#orderDate = new OrderDate();
    this.#orderMenus = new OrderMenus();
  }

  async startOrder() {
    OutputView.printStartOrder();
    const date = await this.#orderDate.readDate();
    const menus = await this.#orderMenus.readMenus();

    const order = new Order(date, menus);
  }
}
