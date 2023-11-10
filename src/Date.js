import REGEXP from './constant/RegExp.js';
import { DateTypeError } from './error/CustomError.js';

export default class Date {
  #date;

  constructor(date) {
    this.#validate(date);
    this.#date = date;
  }

  #validate(date) {
    if (!REGEXP.date.test(date) || Number(date) < 1 || Number(date) > 31) {
      throw new DateTypeError(date);
    }
  }
}
