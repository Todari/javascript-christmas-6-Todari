import OrderController from './OrderController.js';

class App {
  #orderController;

  constructor() {
    this.#orderController = new OrderController();
  }

  async run() {
    this.#orderController.startOrder();
  }
}

export default App;
