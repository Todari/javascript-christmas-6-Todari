import REGEXP from './constant/RegExp.js';
import { SelectedDateTypeError } from './error/CustomError.js';

export default class SelectedDate {
  #date;

  constructor(date) {
    this.#validateSelectedDateType(date);
    this.#date = Number(date);
  }

  #validateSelectedDateType(date) {
    if (!REGEXP.date.test(date) || Number(date) < 1 || Number(date) > 31) {
      throw new SelectedDateTypeError(date);
    }
  }

  hasStar() {
    if (this.#date % 7 === 3 || this.#date === 25) {
      return true;
    }
    return false;
  }

  isWeekend() {
    if (this.#date % 7 === 1 || this.#date % 7 === 2) {
      return true;
    }
    return false;
  }

  get() {
    return this.#date;
  }
}
