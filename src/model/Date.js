import REGEXP from '../constant/RegExp.js';
import SETTING from '../constant/Setting.js';
import { DateTypeError } from '../error/CustomError.js';

export default class Date {
  #date;

  constructor(date) {
    this.#validateDateType(date);
    this.#date = Number(date);
  }

  #validateDateType(date) {
    if (
      !REGEXP.date.test(date) ||
      Number(date) < SETTING.date.minimun ||
      Number(date) > SETTING.date.maximum
    ) {
      throw new DateTypeError(date);
    }
  }

  hasStar() {
    if (
      this.#date % SETTING.weekDays === SETTING.date.sunday ||
      this.#date === SETTING.date.christmas
    ) {
      return true;
    }
    return false;
  }

  isWeekend() {
    if (
      this.#date % SETTING.weekDays === SETTING.date.friday ||
      this.#date % SETTING.weekDays === SETTING.date.saturday
    ) {
      return true;
    }
    return false;
  }

  get() {
    return this.#date;
  }
}
