import Menu from './Menu.js';
import MenuRepository from './MenuRepository.js';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';

export default class OrderMenus {
  #menuRepository;
  #orderMenus;

  constructor() {
    this.#menuRepository = new MenuRepository();
    this.#orderMenus = new Map();
  }

  async readMenus() {
    while (true) {
      const menus = await InputView.readMenus();
      try {

        this.stringToMenus(menus);
        break;
      } catch (error) {
        OutputView.printErrorMessage(error);
      }
    }
  }

  #menuIncludedValidate(menu) {
    if (!this.#menuRepository.isIncludedMenu(menu)) {
      // throw 
    }
  }

  stringToMenus(string) {
    string.split(',').forEach(menuInfo => {
      const menu = menuInfo.split('-')[0];
      const amount = Number(menuInfo.split('-')[1]);

      this.#menuIncludedValidate(menu);
      this.#orderMenus[new Menu(menu)] = amount;
    });
  }
}
