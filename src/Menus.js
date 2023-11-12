import MenuRepository from './MenuRepository.js';

export default class Menus {
  #menuRepository;
  #menus;

  constructor(menus) {
    this.#menuRepository = new MenuRepository();
    this.#menus = new Map();

    Object.keys(menus).forEach(key => {
      this.#menus[this.#menuRepository.getMenuByName(key)] = menus[key];
    });
  }
}
