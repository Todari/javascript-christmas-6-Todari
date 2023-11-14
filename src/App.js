import { GetOrder } from './domain/index.js';

class App {
  async run() {
    await new GetOrder().startOrder();
  }
}

export default App;
