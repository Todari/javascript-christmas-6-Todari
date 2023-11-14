import MESSAGES from '../constant/Messages.js';
import SETTING from '../constant/Setting.js';
import {
  EventTypeError,
  EventStatusError,
  EventAmountError,
} from '../error/CustomError.js';

export default class Event {
  #type;
  #status;
  #amount;

  constructor(type, status, amount) {
    this.#validateEventType(type);
    this.#validateEventStatus(status);
    this.#validateEventAmount(amount);
    this.#type = type;
    this.#status = status;
    this.#amount = amount;
  }

  #validateEventType(type) {
    if (typeof type !== 'string') {
      throw new EventTypeError();
    }
  }

  #validateEventStatus(status) {
    if (typeof status !== 'boolean') {
      throw new EventStatusError();
    }
  }

  #validateEventAmount(amount) {
    if (typeof amount !== 'number') {
      throw new EventAmountError();
    }
  }

  setAmount(amount) {
    this.#amount = amount;
  }

  setStatus(bool) {
    this.#status = bool;
  }

  getAmount() {
    return this.#amount;
  }

  getStatus() {
    return this.#status;
  }

  print() {
    return `${this.#type}: ${this.#amount.toLocaleString(SETTING.locale)}${MESSAGES.krWon
      }`;
  }
}
