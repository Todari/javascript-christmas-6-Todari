import SelectedDate from './SelectedDate.js';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';

export default class OrderDate {
  #date;

  async readDate() {
    while (true) {
      const date = await InputView.readDate();
      try {
        this.#date = new SelectedDate(date);
        break;
      } catch (error) {
        OutputView.printErrorMessage(error);
      }
    }

    return this.#date;
  }
}
