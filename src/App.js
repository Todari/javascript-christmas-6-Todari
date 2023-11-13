import GetOrder from './GetOrder.js';

class App {
  #getOrder;

  constructor() {
    this.#getOrder = new GetOrder();
  }

  async run() {
    await this.#getOrder.startOrder();
  }
}

export default App;
