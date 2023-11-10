import OrderController from './OrderController.js';

class App {
  #orderController;

  constructor() {
    this.#orderController = new OrderController();
  }

  async run() {
    this.#orderController.startOrder();
    await this.#orderController.readDate();
  }
}

export default App;
