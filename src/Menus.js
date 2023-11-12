import MenuRepository from './MenuRepository.js';

export default class Menus {
  #menuRepository = new MenuRepository();
  #menus = new Map();

  constructor(menus) {
    Object.keys(menus).forEach(key => {
      this.#menus[this.#menuRepository.getMenuByName(key)] = menus[key];
    });
  }
}
