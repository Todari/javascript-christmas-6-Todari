import GetOrder from './domain/GetOrder.js';

class App {
  async run() {
    await new GetOrder().startOrder();
  }
}

export default App;
