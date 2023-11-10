import REGEXP from './constant/RegExp.js';
import Date from './Date.js';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';

export default class OrderController {
  #date;

  startOrder() {
    OutputView.printStartOrder();
  }

  async readDate() {
    while (true) {
      const date = await InputView.readDate();
      try {
        this.#date = new Date(date);
        break;
      } catch (error) {
        OutputView.printErrorMessage(error);
      }
    }
  }
}
