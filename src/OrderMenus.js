import Menus from './Menus.js';
import OutputView from './view/OutputView.js';

export default class OrderMenus {
  #menus;

  async readMenus() {
    while (true) {
      const menus = await InputView.readMenus();
      try {
        this.#menus = new Menus(menus);
        break;
      } catch (error) {
        OutputView.printErrorMessage(error);
      }
    }
  }
}
