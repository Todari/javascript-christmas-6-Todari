import REGEXP from './constant/RegExp.js';
import { DateTypeError } from './error/CustomError.js';

export default class Date {
  #date;

  constructor(date) {
    this.#validate(date);
    this.#date = Number(date);
  }

  #validate(date) {
    if (!REGEXP.date.test(date) || Number(date) < 1 || Number(date) > 31) {
      throw new DateTypeError(date);
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
}
