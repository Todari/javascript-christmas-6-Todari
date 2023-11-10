import MenuRepository from './MenuRepository.js';

class App {
  async run() {
    console.log(new MenuRepository.get())
  }
}

export default App;
